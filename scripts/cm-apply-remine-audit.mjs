#!/usr/bin/env node
// 概念地图 v2 · 把低度节点补边的审计结果合并回 canonical 边文件。
// 只有 yes / 可安全翻转的 reversed 会进入 DAG；weak 保留在候选与审计证据中。

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const candidate = JSON.parse(fs.readFileSync(path.join(DIR, '04-edges-remine.json'), 'utf8'));
const audit = JSON.parse(fs.readFileSync(path.join(DIR, '06-audit-remine.json'), 'utf8'));
const edgePath = path.join(DIR, '04-edges.json');
const edgeFile = JSON.parse(fs.readFileSync(edgePath, 'utf8'));
const byKey = new Map(candidate.candidates.map((e) => [`${e.topicId}->${e.prerequisiteId}`, e]));
const accepted = [];
const held = [];
const rejected = [];
const missing = [];
const baseKeys = new Set(edgeFile.dependencies.map((e) => `${e.topicId}->${e.prerequisiteId}`));

for (const [key, verdict] of Object.entries(audit.edges || {})) {
  const e = byKey.get(key);
  if (!e || !verdict) continue;
  if (verdict.holds === 'yes') {
    accepted.push({ ...e, strength: verdict.strength === 'hard' ? 'hard' : 'soft', audit: 'yes', auditIssue: verdict.issue || '' });
  } else if (verdict.holds === 'reversed') {
    accepted.push({ ...e, topicId: e.prerequisiteId, prerequisiteId: e.topicId,
      strength: verdict.strength === 'hard' ? 'hard' : 'soft', audit: 'reversed-fixed', auditIssue: verdict.issue || '' });
  } else if (verdict.holds === 'weak') held.push({ ...e, audit: 'weak', auditIssue: verdict.issue || '' });
  else rejected.push({ ...e, audit: verdict.holds || 'no', auditIssue: verdict.issue || '' });
}
for (const e of candidate.candidates) {
  if (!audit.edges?.[`${e.topicId}->${e.prerequisiteId}`]) missing.push(e);
}

const reaches = (adj, source, target) => {
  const stack = [source]; const seen = new Set();
  while (stack.length) {
    const x = stack.pop();
    if (x === target) return true;
    if (seen.has(x)) continue;
    seen.add(x);
    for (const y of adj.get(x) || []) stack.push(y);
  }
  return false;
};
const adj = new Map();
for (const e of edgeFile.dependencies) {
  if (!adj.has(e.topicId)) adj.set(e.topicId, []);
  adj.get(e.topicId).push(e.prerequisiteId);
}
const kept = [];
const cycleDropped = [];
const seen = new Set(baseKeys);
for (const e of accepted) {
  const key = `${e.topicId}->${e.prerequisiteId}`;
  if (seen.has(key) || e.topicId === e.prerequisiteId || reaches(adj, e.prerequisiteId, e.topicId)) {
    cycleDropped.push({ ...e, dropReason: seen.has(key) ? 'duplicate' : e.topicId === e.prerequisiteId ? 'self' : 'cycle' });
    continue;
  }
  seen.add(key); kept.push(e);
  if (!adj.has(e.topicId)) adj.set(e.topicId, []);
  adj.get(e.topicId).push(e.prerequisiteId);
}

if (kept.length) {
  if (!fs.existsSync(edgePath + '.pre-remine.bak')) fs.copyFileSync(edgePath, edgePath + '.pre-remine.bak');
  edgeFile.dependencies.push(...kept);
  const relSeen = new Set(edgeFile.relations.map((r) => `${r.from}->${r.to}:${r.kind}`));
  for (const e of kept) {
    const rk = `${e.topicId}->${e.prerequisiteId}:prerequisite`;
    if (relSeen.has(rk)) continue;
    relSeen.add(rk);
    edgeFile.relations.push({ from: e.topicId, to: e.prerequisiteId, kind: 'prerequisite', strength: e.strength,
      axis: e.axis || '', note: e.reason, origin: e.origin, evidence: `audit:${e.audit || ''}` });
  }
  const touched = new Set();
  for (const e of edgeFile.dependencies) { touched.add(e.topicId); touched.add(e.prerequisiteId); }
  edgeFile.stats = { ...edgeFile.stats, dependencies: edgeFile.dependencies.length, relations: edgeFile.relations.length,
    byOrigin: tally(edgeFile.dependencies, 'origin'), byStrength: tally(edgeFile.dependencies, 'strength'),
    isolated: (JSON.parse(fs.readFileSync(path.join(DIR, '03-enriched.json'), 'utf8')).nodes.length - touched.size) };
  edgeFile.remineAt = audit.generatedAt;
  edgeFile.remine = { scope: candidate.scope, targetCount: candidate.targetCount, generated: candidate.candidates.length,
    accepted: kept.length, held: held.length, rejected: rejected.length, missing: missing.length, cycleDropped: cycleDropped.length };
  fs.writeFileSync(edgePath, JSON.stringify(edgeFile, null, 1));
}

function tally(arr, key) { const out = {}; for (const x of arr) out[x[key]] = (out[x[key]] || 0) + 1; return out; }
console.log('✅ 补边审计结果已处理');
console.log(`  通过 ${kept.length} · weak 候选 ${held.length} · 判否 ${rejected.length} · 未审 ${missing.length} · 环/重复丢弃 ${cycleDropped.length}`);
console.log(`  canonical DAG ${edgeFile.dependencies.length}${kept.length ? '（已写入）' : '（无新增）'}`);
if (held.length) console.log('  weak 候选仍在 evidence/cm-260913/04-edges-remine.json，不进入默认学习路径');
