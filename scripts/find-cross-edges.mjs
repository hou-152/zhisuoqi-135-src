#!/usr/bin/env node
// 补边实验 —— 「把 28 个碎片连起来，顺便看看意外连接出不出得来」
//
// 现状（evidence/concept-graph-voted.json，5 次投票 ≥3）：
//   87 条边覆盖 111/194 个概念 → 28 个弱连通分量（12,8,8,7,6,6,6,5,5,5,4,3,3,3,3,3,2×12）
//   83 个概念一条边都没有；度分布 72 个点只有 1 条边。
//   用户原话：「两块毫不相干的东西居然连上了，我会觉得比较好，比较有意思」
//
// 本脚本只做一件事：让 LLM 找【还没被发现】的边，重点跨主题 + 救孤立点。
//
// ── 预注册 ────────────────────────────────────────────────
// 输入：194 概念 + 已有 87 条边（明确列出，禁止重复）
// 提示词：见 buildPrompt()
// 温度：0
// 成功判据：
//   S1 新增边 ≥ 30（27 条跨分量边就能把 28 个碎片连成一片）
//   S2 孤立点减少 ≥ 30（83 → ≤ 53）
//   S3 合并后无环
//   S4 新增边里跨文章占比 ≥ 30%（这次就是奔着跨主题去的）
// 失败判据：
//   F1 新增边 < 15         → 补不出来，横轴这条路走不通
//   F2 合并后出现环         → 不是 DAG
//   F3 孤立点没减少         → 救不活
//
// 用法：node scripts/find-cross-edges.mjs
// 输出：evidence/concept-graph-cross-edges-20260912.json

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';
import { parseConceptPool } from './lib/pool.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
const VOTED = path.join(ROOT, 'evidence', 'concept-graph-voted.json');
const ARGV = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));
const TAG = ARGV.tag || '20260912';
const OUT = path.join(ROOT, 'evidence', `concept-graph-cross-edges-${TAG}.json`);

const envTxt = fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8');
for (const line of envTxt.split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const BASE = process.env.LLM_API_BASE, KEY = process.env.LLM_API_KEY, MODEL = process.env.LLM_MODEL;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证'); process.exit(2); }

// ── 重建 cid（必须与 gen-concept-graph.mjs 全量跑一致：按概念池顺序 C01..）──
const md = fs.readFileSync(POOL, 'utf8');
const nodes = parseConceptPool(md).map(({ id: cid, src: art, name, type, gloss }) =>
  ({ cid, art, name, type, gloss }));
const byCid = new Map(nodes.map(n => [n.cid, n]));
const voted = JSON.parse(fs.readFileSync(VOTED, 'utf8'));

// 一致性断言：voted 里的名字必须对得上
let mismatch = 0;
for (const e of voted.edges) {
  if (byCid.get(e.topicId)?.name !== e.topic) mismatch++;
  if (byCid.get(e.prerequisiteId)?.name !== e.prerequisite) mismatch++;
}
if (mismatch) { console.error(`cid 对不上：${mismatch} 处，拒绝继续`); process.exit(4); }
console.log(`节点 ${nodes.length} | 已有边 ${voted.edges.length} | cid 校验通过`);

const have = new Set(voted.edges.map(e => e.prerequisiteId + '>' + e.topicId));
const touched = new Set(); for (const e of voted.edges) { touched.add(e.topicId); touched.add(e.prerequisiteId); }
const isolated = nodes.filter(n => !touched.has(n.cid)).map(n => n.cid);
console.log(`已有边覆盖 ${touched.size} 个 | 孤立 ${isolated.length} 个`);

// ── 提示词 ───────────────────────────────────────────────────
function buildPrompt() {
  const edgeList = voted.edges.map(e => `${e.prerequisiteId} ${e.prerequisite} → ${e.topicId} ${e.topic}`).join('\n');
  const conceptList = nodes.map(n =>
    `${n.cid}${touched.has(n.cid) ? '  ' : ' ○'} [${n.art}] ${n.name} ｜ ${n.gloss}`).join('\n');
  return `下面 ${nodes.length} 个概念抄自 12 篇「AI 时代怎么做事」主题的文章。目前已经发现 ${voted.edges.length} 条前置依赖边。

【已有的边，禁止重复】
${edgeList}

【概念清单】带 ○ 的表示目前一条边都没有，共 ${isolated.length} 个
${conceptList}

任务：找出【还没被发现】的前置依赖边，输出 JSON。

边的方向：topicId depends on prerequisiteId
读作：要真正理解 B，必须先理解 A → B = topicId，A = prerequisiteId

这次的重点和常规不同，请特别注意：
1. **优先跨主题**：如果两个概念来自不同文章、表面上毫不相干，但你发现其中一个确实是另一个的认知前提，这种边最有价值，务必写出来。
2. **优先救孤立点**：带 ○ 的概念一条边都没有，它们多是文章里的论点。请判断它依赖什么、或被什么依赖。
3. 已有的边一条都不要重复。
4. 仍然只在确有「必须先懂 A 才可能懂 B」的认知顺序时连边，不要因为「相关」就连。但这次**不要过度保守**：跨主题、救孤立的边，即使把握只有七成也请写出来，把把握程度写进 confidence。
5. reason 一句话，必须具体，里面要出现 A 或 B 的具体内容，禁止「前者是后者的基础」这类空话。
6. strength：hard = 不懂 A 就完全无法理解 B；soft = 有帮助但非必须。confidence：high / medium / low。
7. 严禁环：不许 A→B 同时 B→A，也不许更长的环。

只输出这个 JSON：
{"edges":[{"topicId":"C012","prerequisiteId":"C003","strength":"hard","confidence":"medium","reason":"..."}]}`;
}

const prompt = buildPrompt();
console.log(`prompt ${prompt.length} 字符，调用 ${MODEL} …`);
const t0 = Date.now();
const reply = await chatCompletion({ base: BASE, key: KEY, model: MODEL,
  messages: [{ role: 'user', content: prompt }], json: true });
if (!reply.ok) { console.error(`HTTP ${reply.status}:`, reply.raw.slice(0, 300)); process.exit(3); }
const data = reply.data;
const parsed = JSON.parse(reply.content || '{}');
console.log(`返回 ${data.usage?.total_tokens ?? '?'} tokens, ${((Date.now() - t0) / 1000).toFixed(1)}s`);

// ── 过滤 ─────────────────────────────────────────────────────
const rawEdges = parsed.edges || [];
const newEdges = rawEdges.filter(e =>
  byCid.has(e.topicId) && byCid.has(e.prerequisiteId) &&
  e.topicId !== e.prerequisiteId && !have.has(e.prerequisiteId + '>' + e.topicId));
const dup = rawEdges.length - newEdges.length;

// ── 合并 + 环检测 ─────────────────────────────────────────────
const merged = [...voted.edges.map(e => ({ ...e, source: 'voted' })), ...newEdges.map(e => ({ ...e, source: 'new' }))];
const adj = new Map(nodes.map(n => [n.cid, []]));
for (const e of merged) adj.get(e.topicId).push(e.prerequisiteId);
const color = new Map(), cycles = [];
function dfs(n, stack) {
  color.set(n, 1); stack.push(n);
  for (const p of adj.get(n)) {
    if (color.get(p) === 1) cycles.push([...stack.slice(stack.indexOf(p)), p].join('→'));
    else if (!color.get(p)) dfs(p, stack);
  }
  stack.pop(); color.set(n, 2);
}
for (const n of nodes) if (!color.get(n.cid)) dfs(n.cid, []);

// 环里涉及的 new 边 → 标出来（不自动删，交人工/报告）
const inCycle = newEdges.filter(e => cycles.some(c => c.includes(e.topicId) && c.includes(e.prerequisiteId)));

// ── 指标 ────────────────────────────────────────────────────
function components(edges) {
  const a = new Map();
  const t = c => { if (!a.has(c)) a.set(c, new Set()); };
  for (const e of edges) { t(e.topicId); t(e.prerequisiteId); a.get(e.topicId).add(e.prerequisiteId); a.get(e.prerequisiteId).add(e.topicId); }
  const seen = new Set(), comps = [];
  for (const n of a.keys()) {
    if (seen.has(n)) continue;
    const q = [n], c = []; seen.add(n);
    while (q.length) { const x = q.pop(); c.push(x); for (const y of a.get(x)) if (!seen.has(y)) { seen.add(y); q.push(y); } }
    comps.push(c);
  }
  return comps.sort((x, y) => y.length - x.length);
}
const compsBefore = components(voted.edges), compsAfter = components(merged);
const isoAfter = nodes.filter(n => !merged.some(e => e.topicId === n.cid || e.prerequisiteId === n.cid));
const crossArtNew = newEdges.filter(e => byCid.get(e.topicId).art !== byCid.get(e.prerequisiteId).art);

// 深度
const memo = new Map();
function dep(id, seen) {
  if (memo.has(id)) return memo.get(id);
  seen.add(id); let m = 0;
  for (const p of adj.get(id)) { if (seen.has(p)) { m = -1; break; } const x = dep(p, seen); if (x < 0) { m = -1; break; } m = Math.max(m, x + 1); }
  seen.delete(id); memo.set(id, m); return m;
}
let maxDepth = 0; const lv = {};
for (const n of nodes) { const d = dep(n.cid, new Set()); if (d < 0) continue; maxDepth = Math.max(maxDepth, d); (lv[d] ||= []).push(n); }
// 深度但排除孤立
const lvNonIso = {};
for (const n of nodes) { if (isoAfter.some(x => x.cid === n.cid)) continue; const d = dep(n.cid, new Set()); if (d >= 0) (lvNonIso[d] ||= []).push(n); }

const stats = {
  newEdges: newEdges.length, duplicatesFiltered: dup,
  isolatedBefore: isolated.length, isolatedAfter: isoAfter.length,
  componentsBefore: compsBefore.length, componentsAfter: compsAfter.length,
  largestComponentBefore: compsBefore[0]?.length, largestComponentAfter: compsAfter[0]?.length,
  crossArticleNew: crossArtNew.length,
  crossArticleRate: newEdges.length ? +(crossArtNew.length / newEdges.length).toFixed(2) : 0,
  cycles: cycles.length, edgesInCycle: inCycle.length,
  maxDepth, totalEdges: merged.length,
};
console.log('\n=== 合并后指标 ===');
console.log(JSON.stringify(stats, null, 1));

const fails = [];
if (newEdges.length < 15) fails.push(`F1 新增 ${newEdges.length} < 15`);
if (cycles.length) fails.push(`F2 出现 ${cycles.length} 个环`);
if (isoAfter.length >= isolated.length) fails.push(`F3 孤立点没减少（${isolated.length} → ${isoAfter.length}）`);
const succ = [];
if (newEdges.length >= 30) succ.push('S1 新增 ≥30');
if (isolated.length - isoAfter.length >= 30) succ.push('S2 孤立减少 ≥30');
if (!cycles.length) succ.push('S3 无环');
if (stats.crossArticleRate >= 0.3) succ.push('S4 跨文章 ≥30%');
console.log('\n=== 预注册判定 ===', fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS\n  ' + succ.join('\n  '));
console.log(`\n碎片：${compsBefore.length} → ${compsAfter.length}（最大 ${compsBefore[0]?.length} → ${compsAfter[0]?.length}）`);
console.log(`孤立：${isolated.length} → ${isoAfter.length}`);
console.log(`深度：${maxDepth}`);
console.log('\n新层级分布（排除孤立）:', Object.keys(lvNonIso).map(Number).sort((a, b) => a - b).map(k => `L${k}:${lvNonIso[k].length}`).join(' '));

console.log('\n=== 新增边抽样（跨文章优先，最多 25 条）===');
const show = [...crossArtNew, ...newEdges.filter(e => !crossArtNew.includes(e))].slice(0, 25);
for (const e of show) {
  const a = byCid.get(e.prerequisiteId), b = byCid.get(e.topicId);
  console.log(`  [${e.strength}/${e.confidence}] ${a.art}→${b.art} ${a.name.slice(0, 16)} ⇒ ${b.name.slice(0, 16)}\n      ${e.reason}`);
}

fs.writeFileSync(OUT, JSON.stringify({
  meta: { generatedAt: new Date().toISOString(), model: MODEL, verdict: fails.length ? 'FAIL' : 'PASS', fails, success: succ, stats },
  newEdges: newEdges.map(e => ({ ...e, topic: byCid.get(e.topicId).name, prerequisite: byCid.get(e.prerequisiteId).name, topicArt: byCid.get(e.topicId).art, prerequisiteArt: byCid.get(e.prerequisiteId).art })),
  cycles, edgesInCycle: inCycle, isolatedBefore: isolated, isolatedAfter: isoAfter.map(n => n.cid),
  componentsBefore: compsBefore.map(c => c.length), componentsAfter: compsAfter.map(c => c.length),
  mergedEdges: merged, prompt,
}, null, 2));
console.log(`\n写入 ${path.relative(ROOT, OUT)}`);
