#!/usr/bin/env node
// 概念地图 v2 · 非 AI 概念剔除（按复判报告落盘）。
//
// 由来：2026-09-13 那次 AI 过滤（cm-filter-ai.mjs，1156 → 856）是按批判的，
// 会漏；2026-09-14 用 cm-audit-context-ai.mjs 把 936 条逐条重判一遍，
// 得 18 条 keep 判错（含 neican 12 / notion 4 / harness 1 / context 1）。
// 本脚本把这 18 条按同一套落盘规则（节点、依赖、关联一起过滤）真正拿掉。
//
// 数据源：evidence/cm-260913/09-context-ai-audit.json（逐条判定 + 理由，人工可翻案）
// 用法：node scripts/cm-drop-non-ai.mjs [--dry]
// 产出：就地改写 03-enriched.json / 04-edges.json（备份 *.pre-nonai.bak），随后重建：
//   cm-build-map → cm-build-wiki → cm-wire → cm-validate → build-shell

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const AUDIT = path.join(DIR, '09-context-ai-audit.json');
const ARGV = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const DRY = 'dry' in ARGV;

const audit = JSON.parse(fs.readFileSync(AUDIT, 'utf8'));
const enriched = JSON.parse(fs.readFileSync(path.join(DIR, '03-enriched.json'), 'utf8'));
const edgeFile = JSON.parse(fs.readFileSync(path.join(DIR, '04-edges.json'), 'utf8'));

const nodes = enriched.nodes;
const byId = new Map(nodes.map((n) => [n.id, n]));
const dropped = nodes.filter((n) => audit.verdicts[n.id]?.ai === 'drop');
const keptIds = new Set(nodes.filter((n) => audit.verdicts[n.id]?.ai !== 'drop').map((n) => n.id));

console.log(`非 AI 剔除：地图 ${nodes.length} 条，判定 drop ${dropped.length} 条`);
for (const n of dropped) console.log(`  − ${n.id}  ${n.name}  [${n.origin.join(',')} · ${n.domain}]  ${audit.verdicts[n.id].why}`);

// 安全检查：被删的必须都在复判报告里（不许脚本自己凭空判）
const unjudged = nodes.filter((n) => !audit.verdicts[n.id]);
if (unjudged.length) {
  console.error(`✗ 有 ${unjudged.length} 条没有复判结论，拒绝落盘：${unjudged.slice(0, 5).map((n) => n.name).join(' / ')}`);
  process.exit(3);
}

if (DRY) { console.log('（--dry：没有改数据）'); process.exit(0); }

const before = { nodes: nodes.length, deps: edgeFile.dependencies.length, rels: edgeFile.relations.length };
enriched.nodes = nodes.filter((n) => keptIds.has(n.id));
edgeFile.dependencies = edgeFile.dependencies.filter((d) => keptIds.has(d.topicId) && keptIds.has(d.prerequisiteId));
edgeFile.relations = edgeFile.relations.filter((r) => keptIds.has(r.from) && keptIds.has(r.to));
edgeFile.dropped = (edgeFile.dropped || []).filter((d) => keptIds.has(d.topicId) && keptIds.has(d.prerequisiteId));
const touched = new Set();
for (const e of edgeFile.dependencies) { touched.add(e.topicId); touched.add(e.prerequisiteId); }
edgeFile.stats = {
  ...edgeFile.stats,
  dependencies: edgeFile.dependencies.length,
  relations: edgeFile.relations.length,
  isolated: enriched.nodes.length - touched.size,
};
edgeFile.nonAiFilter = { at: new Date().toISOString(), audit: path.relative(ROOT, AUDIT),
  dropped: dropped.map((n) => n.id), kept: keptIds.size };

for (const [f, obj] of [['03-enriched.json', enriched], ['04-edges.json', edgeFile]]) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p + '.pre-nonai.bak')) fs.copyFileSync(p, p + '.pre-nonai.bak');
  fs.writeFileSync(p, JSON.stringify(obj, null, 1));
}

console.log(`已写入（备份 *.pre-nonai.bak）`);
console.log(`  节点 ${before.nodes} → ${enriched.nodes.length}`);
console.log(`  依赖 ${before.deps} → ${edgeFile.dependencies.length}`);
console.log(`  关联 ${before.rels} → ${edgeFile.relations.length}`);
console.log(`  孤立点 ${edgeFile.stats.isolated}/${enriched.nodes.length}`);
console.log('  下一步：cm-build-map → cm-build-wiki → cm-wire → cm-validate → build-shell');
