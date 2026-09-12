#!/usr/bin/env node
// 概念地图 v2 · 把全量审核的判决落到数据上（可回滚）。
//
// 规则：
//   概念  desc_fix / domain_fix / type_fix / verify_fix 非空就替换；空字符串一律不动。
//   依赖  yes      → 留在 DAG，强度按审核给的 hard/soft
//         weak     → 留在 DAG，但强制降成 **soft**（审核原话就是「应该降成 soft 或踢出依赖图」；
//                    踢出去会让图稀到没意义，降级 + 虚线更诚实也更有用）
//         no       → **踢出 DAG**，进关系层标 rejected（保留审核理由，可翻案）
//         reversed → 翻转方向；翻转后重复或成环就丢弃
//         没判到   → 原样保留并标 unaudited
//
// 原文件先备份成 *.pre-audit.json，随时可回滚。
// 用法：node scripts/cm-apply-audit.mjs [--dry]
// 之后：cm-build-map → cm-build-wiki → cm-wire → cm-validate

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const DRY = 'dry' in Object.fromEntries(process.argv.slice(2).map((a) => [a.replace(/^--/, ''), true]));

const audit = JSON.parse(fs.readFileSync(path.join(DIR, '06-audit-full.json'), 'utf8'));
const enriched = JSON.parse(fs.readFileSync(path.join(DIR, '03-enriched.json'), 'utf8'));
const edgeFile = JSON.parse(fs.readFileSync(path.join(DIR, '04-edges.json'), 'utf8'));

const domainIds = new Set(enriched.domains.map((d) => d.id));
const TYPES = new Set(['CONCEPTUAL', 'PROCEDURAL', 'REPRESENTATIONAL', 'LANGUAGE', 'META']);
const VERIF = new Set(['compute', 'judge', 'use', 'accept']);

/* ── 1. 概念 ────────────────────────────────────────────── */
const cstat = { descFixed: 0, domainFixed: 0, typeFixed: 0, verifyFixed: 0, unaudited: 0 };
for (const n of enriched.nodes) {
  const v = audit.concepts[n.id];
  if (!v) { cstat.unaudited++; continue; }
  if (v.desc_fix && String(v.desc_fix).trim()) { n.desc = String(v.desc_fix).trim().slice(0, 160); cstat.descFixed++; }
  if (v.domain_fix && domainIds.has(v.domain_fix) && v.domain_fix !== n.domain) { n.domain = v.domain_fix; cstat.domainFixed++; }
  if (v.type_fix && TYPES.has(v.type_fix) && v.type_fix !== n.type) { n.type = v.type_fix; cstat.typeFixed++; }
  if (v.verify_fix && VERIF.has(v.verify_fix) && v.verify_fix !== n.k) { n.k = v.verify_fix; cstat.verifyFixed++; }
  n.audit = { faithful: v.faithful || '', issue: v.issue || '' };
}

/* ── 2. 依赖边 ──────────────────────────────────────────── */
const ESTAT = { kept: 0, downgraded: 0, rejected: 0, reversed: 0, unaudited: 0, dropReversed: 0 };
const kept = [];
const extraRelations = [];
const dropReversed = [];
const seen = new Set();
for (const d of edgeFile.dependencies) {
  const v = audit.edges[d.topicId + '->' + d.prerequisiteId];
  const a = enriched.nodes.find((n) => n.id === d.topicId);
  const b = enriched.nodes.find((n) => n.id === d.prerequisiteId);
  if (!v) { kept.push({ ...d, audit: 'unaudited' }); ESTAT.unaudited++; continue; }
  if (v.holds === 'yes') {
    const strength = v.strength === 'hard' ? 'hard' : 'soft';
    kept.push({ ...d, strength, audit: 'yes', auditIssue: v.issue || '' });
    ESTAT.kept++;
  } else if (v.holds === 'reversed') {
    const key = d.prerequisiteId + '->' + d.topicId;
    if (seen.has(key)) { ESTAT.dropReversed++; dropReversed.push({ ...d, audit: 'reversed-dup', auditIssue: v.issue || '' }); continue; }
    seen.add(key);
    kept.push({ ...d, topicId: d.prerequisiteId, prerequisiteId: d.topicId, strength: v.strength === 'hard' ? 'hard' : 'soft', audit: 'reversed-fixed', auditIssue: v.issue || '' });
    ESTAT.reversed++;
  } else if (v.holds === 'weak') {
    kept.push({ ...d, strength: 'soft', audit: 'weak', auditIssue: v.issue || '' });
    ESTAT.downgraded++;
  } else {
    extraRelations.push({
      from: d.topicId, to: d.prerequisiteId, kind: 'rejected',
      strength: 'soft', axis: 'audit', note: (v.issue || '').slice(0, 120), origin: d.origin, evidence: 'audit:no',
    });
    ESTAT.rejected++;
  }
  seen.add(d.topicId + '->' + d.prerequisiteId);
}

/* ── 3. 重新做环检测（翻转/改强度后必须重来） ───────────── */
const RANK = { curated: 0, 'source-network': 1, llm: 2 };
const sorted = [...kept].sort((a, b) => (a.strength === b.strength ? (RANK[a.origin] ?? 3) - (RANK[b.origin] ?? 3) : a.strength === 'hard' ? -1 : 1));
const adj = new Map(); const final = []; const cycleDropped = [];
const reaches = (s, t) => { const st = [s], seen2 = new Set(); while (st.length) { const x = st.pop(); if (x === t) return true; if (seen2.has(x)) continue; seen2.add(x); for (const y of adj.get(x) || []) st.push(y); } return false; };
for (const e of sorted) {
  if (reaches(e.prerequisiteId, e.topicId)) { cycleDropped.push(e); continue; }
  final.push(e);
  if (!adj.has(e.topicId)) adj.set(e.topicId, []);
  adj.get(e.topicId).push(e.prerequisiteId);
}
const ids = new Set(enriched.nodes.map((n) => n.id));
const relSeen = new Set(edgeFile.relations.map((r) => `${r.from}->${r.to}:${r.kind}`));
const newRel = extraRelations.filter((r) => ids.has(r.from) && ids.has(r.to) && !relSeen.has(`${r.from}->${r.to}:${r.kind}`));

// 关系层也要跟着洗：审核前的 prerequisite 关系已经过期（有的被判 no、有的降成 soft），
// 一律丢掉重建，否则 relations.json 里会留着已经不成立的旧边（踩过：1050 vs 647）。
const stalePrereq = edgeFile.relations.filter((r) => r.kind === 'prerequisite');
const keepRel = edgeFile.relations.filter((r) => r.kind !== 'prerequisite');
const E = edgeFile;
E.dependencies = final;
E.relations = [
  ...keepRel,
  ...newRel,
  ...final.map((d) => ({ from: d.topicId, to: d.prerequisiteId, kind: 'prerequisite', strength: d.strength,
    axis: d.axis || '', note: d.reason, origin: d.origin, evidence: `audit:${d.audit || ''}` })),
];
E.stalePrereqDropped = stalePrereq.length;
E.dropped = [...(edgeFile.dropped || []), ...cycleDropped, ...dropReversed];
E.stats = {
  ...edgeFile.stats,
  dependencies: final.length,
  relations: E.relations.length,
  byOrigin: tally(final, 'origin'), byStrength: tally(final, 'strength'),
  droppedForCycle: cycleDropped.length,
  audit: ESTAT,
};
E.auditedAt = audit.generatedAt;
function tally(arr, k) { const o = {}; for (const x of arr) o[x[k]] = (o[x[k]] || 0) + 1; return o; }

const touched = new Set(); for (const e of final) { touched.add(e.topicId); touched.add(e.prerequisiteId); }
E.stats.isolated = enriched.nodes.length - touched.size;

console.log('审核判决落盘：');
console.log(`  概念：改定义 ${cstat.descFixed} · 改领域 ${cstat.domainFixed} · 改类型 ${cstat.typeFixed} · 改验收 ${cstat.verifyFixed} · 未审 ${cstat.unaudited}`);
console.log(`  依赖：留下 ${ESTAT.kept} · 降成 soft ${ESTAT.downgraded} · 判否 rejected ${ESTAT.rejected} · 翻转 ${ESTAT.reversed}（重复丢弃 ${ESTAT.dropReversed}）· 未审 ${ESTAT.unaudited}`);
console.log(`  环丢弃 ${cycleDropped.length} · DAG ${edgeFile.dependencies.length} → ${final.length} · 孤立点 ${E.stats.isolated}/${enriched.nodes.length}`);
console.log(`  关系层 ${edgeFile.relations.length}（新增 ${newRel.length}，清掉过期 prerequisite ${stalePrereq.length}）`);

if (DRY) { console.log('（--dry：没有写文件）'); process.exit(0); }
for (const [f, obj] of [['03-enriched.json', enriched], ['04-edges.json', E]]) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p + '.pre-audit.bak')) fs.copyFileSync(p, p + '.pre-audit.bak');
  fs.writeFileSync(p, JSON.stringify(obj, null, 1));
}
console.log('  已写入（备份 *.pre-audit.bak）');
