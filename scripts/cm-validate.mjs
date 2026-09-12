#!/usr/bin/env node
// 概念地图 v2 · 体检（对齐 os-taxonomy 的 scripts/validate.mjs）：
// 结构、引用完整性、DAG 无环、计数一致、manifest 校验和。任何一项失败就非零退出。
//
// 用法：node scripts/cm-validate.mjs [--dir=knowledge/概念地图-260913]

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, (process.argv.find((a) => a.startsWith('--dir=')) || '').split('=')[1] || 'knowledge/概念地图-260913');
const WIKI = path.join(ROOT, 'knowledge', '概念wiki-260913');
const load = (f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));

const errors = [];
const warns = [];
const check = (c, m) => { if (!c) errors.push(m); };

const topics = load('topics.json');
const deps = load('dependencies.json');
const rels = load('relations.json');
const clusters = load('clusters.json');
const manifest = load('manifest.json');

/* ── 计数 ───────────────────────────────────────────────── */
check(topics.count === topics.topics.length, `topics.count ${topics.count} != ${topics.topics.length}`);
check(deps.count === deps.dependencies.length, `dependencies.count ${deps.count} != ${deps.dependencies.length}`);
check(clusters.count === clusters.clusters.length, `clusters.count ${clusters.count} != ${clusters.clusters.length}`);
check(manifest.topics === topics.topics.length, `manifest.topics ${manifest.topics} != ${topics.topics.length}`);
check(manifest.dependencies === deps.dependencies.length, `manifest.dependencies ${manifest.dependencies} != ${deps.dependencies.length}`);
check(manifest.clusters === clusters.clusters.length, `manifest.clusters ${manifest.clusters} != ${clusters.clusters.length}`);

/* ── 分布合计必须等于概念数 ──────────────────────────────────
   2026-09-13 加：byOrigin 曾硬编码三个来源桶，第 08 步并入 neican 后
   80 条既不算 *Only 也不算 multi —— manifest 自称 936、byOrigin 合计 856，静默漏计。
   任何一张分布表漏掉一类，这里就红。 */
for (const key of ['byType', 'byStage', 'byVerification', 'byOrigin']) {
  const sum = Object.values(manifest[key] || {}).reduce((a, b) => a + b, 0);
  check(sum === topics.topics.length,
    `manifest.${key} 合计 ${sum} != topics ${topics.topics.length}（有类型/来源没被计入）`);
}

/* ── topics ─────────────────────────────────────────────── */
const TYPES = new Set(['CONCEPTUAL', 'PROCEDURAL', 'REPRESENTATIONAL', 'LANGUAGE', 'META']);
const STAGES = new Set(['now', 'when-needed', 'deep-dive']);
const VERIF = new Set(['compute', 'judge', 'use', 'accept']);
const ids = new Set();
for (const t of topics.topics) {
  check(/^cm_[0-9a-f]{8}$/.test(t.id), `topic id 形态不对：${t.id}`);
  if (ids.has(t.id)) errors.push(`topic id 重复：${t.id}`);
  ids.add(t.id);
  check(TYPES.has(t.type), `topic ${t.id} type 非法：${t.type}`);
  check(STAGES.has(t.learningStage), `topic ${t.id} learningStage 非法：${t.learningStage}`);
  check(VERIF.has(t.verification), `topic ${t.id} verification 非法：${t.verification}`);
  check(typeof t.name === 'string' && t.name.length > 0, `topic ${t.id} 缺 name`);
  check(typeof t.description === 'string' && t.description.length > 0, `topic ${t.id}（${t.name}）缺 description`);
  check(typeof t.centrality === 'number' && t.centrality >= 0 && t.centrality <= 1, `topic ${t.id} centrality 越界`);
  check(Array.isArray(t.sources) && t.sources.length > 0, `topic ${t.id} 无来源`);
}

/* ── dependencies：引用 + 自环 + DAG ────────────────────── */
for (const d of deps.dependencies) {
  check(ids.has(d.topicId), `dependency topicId 悬空：${d.topicId}`);
  check(ids.has(d.prerequisiteId), `dependency prerequisiteId 悬空：${d.prerequisiteId}`);
  check(d.topicId !== d.prerequisiteId, `dependency 自环：${d.topicId}`);
  check(d.strength === 'hard' || d.strength === 'soft', `dependency strength 非法：${d.strength}`);
  check(['curated', 'source-network', 'llm', 'llm-strict'].includes(d.origin), `dependency origin 非法：${d.origin}`);
  check(typeof d.reason === 'string' && d.reason.length > 0, `dependency ${d.topicId}->${d.prerequisiteId} 缺 reason`);
}
for (const r of rels.relations) {
  check(ids.has(r.from), `relation from 悬空：${r.from}`);
  check(ids.has(r.to), `relation to 悬空：${r.to}`);
}
// DAG：Kahn 拓扑
const indeg = new Map([...ids].map((i) => [i, 0]));
const out = new Map([...ids].map((i) => [i, []]));
for (const d of deps.dependencies) { indeg.set(d.topicId, indeg.get(d.topicId) + 1); out.get(d.prerequisiteId).push(d.topicId); }
const q = [...indeg].filter(([, v]) => v === 0).map(([k]) => k);
let seen = 0;
while (q.length) { const x = q.pop(); seen++; for (const y of out.get(x)) { indeg.set(y, indeg.get(y) - 1); if (indeg.get(y) === 0) q.push(y); } }
check(seen === ids.size, `依赖图有环：拓扑排序只走了 ${seen}/${ids.size}`);

/* ── clusters ───────────────────────────────────────────── */
const domainOf = new Map(topics.topics.map((t) => [t.domain, (topics.topics.filter((x) => x.domain === t.domain)).length]));
for (const c of clusters.clusters) {
  check(domainOf.has(c.id), `cluster ${c.id} 在 topics 里没有对应 domain`);
  check(c.topicCount === domainOf.get(c.id), `cluster ${c.id} topicCount ${c.topicCount} != ${domainOf.get(c.id)}`);
  for (const h of c.hubTopics) check(ids.has(h), `cluster ${c.id} hubTopic 悬空：${h}`);
}

/* ── manifest 校验和 ────────────────────────────────────── */
for (const [f, want] of Object.entries(manifest.checksums)) {
  const got = 'sha256:' + crypto.createHash('sha256').update(fs.readFileSync(path.join(DIR, f))).digest('hex');
  check(got === want, `manifest 校验和不符：${f}`);
}

/* ── wiki 层 ────────────────────────────────────────────── */
if (fs.existsSync(WIKI)) {
  const pages = fs.readdirSync(path.join(WIKI, 'concepts')).filter((f) => f.endsWith('.md'));
  check(pages.length === topics.topics.length, `wiki 页数 ${pages.length} != 概念数 ${topics.topics.length}`);
  for (const f of ['index.md', 'log.md', 'README.md', 'backlinks.json', 'links.json']) {
    check(fs.existsSync(path.join(WIKI, f)), `wiki 缺文件：${f}`);
  }
  const bl = JSON.parse(fs.readFileSync(path.join(WIKI, 'backlinks.json'), 'utf8')).backlinks;
  const names = new Set(Object.keys(bl));
  const links = JSON.parse(fs.readFileSync(path.join(WIKI, 'links.json'), 'utf8')).links;
  let broken = 0, total = 0;
  for (const [page, outs] of Object.entries(links)) {
    for (const l of outs) { total++; if (!names.has(l.slice(2, -2))) broken++; }
  }
  check(broken === 0, `wiki 断链 ${broken}/${total}`);
  const orphans = Object.entries(links).filter(([p]) => !(bl[p] || []).length).length;
  if (orphans) warns.push(`wiki 无入链页 ${orphans} 个`);
} else warns.push('未找到 wiki 层（先跑 node scripts/cm-build-wiki.mjs）');

/* ── 报告 ───────────────────────────────────────────────── */
console.log(`地图体检：${path.relative(ROOT, DIR)}`);
console.log(`  topics ${topics.topics.length} · dependencies ${deps.dependencies.length} · relations ${rels.relations.length} · clusters ${clusters.clusters.length}`);
for (const w of warns) console.log(`  ⚠ ${w}`);
if (errors.length) {
  console.log(`  ✗ ${errors.length} 项失败：`);
  for (const e of errors.slice(0, 30)) console.log(`    - ${e}`);
  process.exit(1);
}
console.log('  ✓ 全部通过');
