#!/usr/bin/env node
// 跨簇补边投票合并 —— 把 N 次独立找边结果取多数，压成高置信骨架。
//
// 背景：同一个 prompt 单次跑出的边数方差极大（87 条基线之外，四次补边分别
// 得到 112 / 119 / … 条新边），单次结果不能直接进产品。做法与 concept-graph-voted 一致：
// 同一条边在 ≥ 半数 的跑次里出现才采纳。
//
// 输入：
//   evidence/concept-graph-voted.json                    （87 条基线，5 次投票 ≥3 产生）
//   evidence/concept-graph-cross-edges-*.json            （每次补边的 newEdges）
// 输出：
//   evidence/concept-graph-final.json                    （最终边集，供 build-concept-map.mjs --edges= 使用）
//
// 用法：node scripts/vote-merge-edges.mjs [--min=3]

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const EV = path.join(ROOT, 'evidence');
const ARGV = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));

const base = JSON.parse(fs.readFileSync(path.join(EV, 'concept-graph-voted.json'), 'utf8'));
const files = fs.readdirSync(EV)
  .filter(f => /^concept-graph-cross-edges-.*\.json$/.test(f))
  .sort();
if (!files.length) { console.error('没有找到补边结果文件'); process.exit(2); }

const runs = files.map(f => JSON.parse(fs.readFileSync(path.join(EV, f), 'utf8')));
console.log(`基线 ${base.edges.length} 条 | 补边跑次 ${runs.length}：${files.join(', ')}`);

const MIN = Number(ARGV.min || Math.ceil(runs.length / 2));

// ── 投票 ─────────────────────────────────────────────────
const votes = new Map();   // key: "pid>tid" → {n, runs, e}
for (let i = 0; i < runs.length; i++) {
  for (const e of runs[i].newEdges || []) {
    const k = e.prerequisiteId + '>' + e.topicId;
    if (!votes.has(k)) votes.set(k, { n: 0, runs: [], e });
    const v = votes.get(k); v.n++; v.runs.push(i + 1); v.e = e;
  }
}
const baseKeys = new Set(base.edges.map(e => e.prerequisiteId + '>' + e.topicId));
const all = [...votes.values()];
const kept = all.filter(v => v.n >= MIN && !baseKeys.has(v.e.prerequisiteId + '>' + v.e.topicId));
console.log(`候选新边 ${all.length} 条 | 出现 ≥${MIN}/${runs.length} 次：${all.filter(v => v.n >= MIN).length} 条`
  + ` | 去掉与基线重复后 ${kept.length} 条`);
const dist = {};
for (const v of all) dist[v.n] = (dist[v.n] || 0) + 1;
console.log('出现次数分布:', JSON.stringify(dist));

// ── 合并 ─────────────────────────────────────────────────
const merged = [
  ...base.edges.map(e => ({ topicId: e.topicId, prerequisiteId: e.prerequisiteId, strength: e.strength, reason: e.reason, votes: e.votes, origin: 'base' })),
  ...kept.map(v => ({ topicId: v.e.topicId, prerequisiteId: v.e.prerequisiteId, strength: v.e.strength, reason: v.e.reason, votes: v.n, origin: 'cross' })),
];

// ── 环检测 ───────────────────────────────────────────────
const ids = new Set();
for (const e of merged) { ids.add(e.topicId); ids.add(e.prerequisiteId); }
const adj = new Map([...ids].map(i => [i, []]));
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
for (const i of ids) if (!color.get(i)) dfs(i, []);

// ── 图指标 ───────────────────────────────────────────────
const a2 = new Map([...ids].map(i => [i, new Set()]));
for (const e of merged) { a2.get(e.topicId).add(e.prerequisiteId); a2.get(e.prerequisiteId).add(e.topicId); }
const seen = new Set(), comps = [];
for (const n of a2.keys()) {
  if (seen.has(n)) continue;
  const q = [n], c = []; seen.add(n);
  while (q.length) { const x = q.pop(); c.push(x); for (const y of a2.get(x)) if (!seen.has(y)) { seen.add(y); q.push(y); } }
  comps.push(c.length);
}
comps.sort((x, y) => y - x);
const inDeg = {}, outDeg = {};
for (const e of merged) { inDeg[e.topicId] = (inDeg[e.topicId] || 0) + 1; outDeg[e.prerequisiteId] = (outDeg[e.prerequisiteId] || 0) + 1; }

console.log(`\n最终 ${merged.length} 条边 | 覆盖 ${ids.size} 个概念`);
console.log(`碎片 ${comps.length} 个: ${JSON.stringify(comps.slice(0, 15))}${comps.length > 15 ? ' …' : ''}`);
console.log(`环 ${cycles.length} 个${cycles.length ? ': ' + cycles.slice(0, 3).join(' ') : ''}`);

const cross = kept.filter(v => v.e.topicArt !== v.e.prerequisiteArt).length;
console.log(`新增里跨文章 ${cross}/${kept.length} (${kept.length ? (100 * cross / kept.length).toFixed(0) : 0}%)`);

const OUT = path.join(EV, 'concept-graph-final.json');
fs.writeFileSync(OUT, JSON.stringify({
  meta: {
    generatedAt: new Date().toISOString(),
    baseEdges: base.edges.length, crossRuns: runs.length, crossMinVotes: MIN,
    edgeCount: merged.length, nodeCount: ids.size,
    components: comps.length, largestComponent: comps[0], cycles: cycles.length,
    crossRate: kept.length ? +(cross / kept.length).toFixed(2) : 0,
  },
  edges: merged, cycles, components: comps,
}, null, 2));
console.log(`\n写入 ${path.relative(ROOT, OUT)}`);

// ── 并集模式 ─────────────────────────────────────────────
// 为什么不能只取交集：补边的任务性质与基线不同。基线找的是「框架 → 子概念」这类
// 结构性关系，多次跑高度一致；补边找的是「两个不相干的东西之间有没有路」，
// 四次跑三次把孤立点补到 0，但每次补的是**不同的洞**，交集等于一个都没补上。
// 正确做法是并集 + 置信分档：高票的当骨架，低票的当待筛候选。
const unionPool = [
  ...base.edges.map(e => ({ topicId: e.topicId, prerequisiteId: e.prerequisiteId, strength: e.strength, reason: e.reason, votes: runs.length + (e.votes || 3), origin: 'base' })),
  ...[...votes.values()].map(v => ({ topicId: v.e.topicId, prerequisiteId: v.e.prerequisiteId, strength: v.e.strength, reason: v.e.reason, votes: v.n, origin: 'cross' })),
];
unionPool.sort((a, b) => b.votes - a.votes);
const unlock = new Map();               // 前置 → 后置列表
for (const e of unionPool) { if (!unlock.has(e.topicId)) unlock.set(e.topicId, []); if (!unlock.has(e.prerequisiteId)) unlock.set(e.prerequisiteId, []); }
function wouldCycle(tid, pid) {         // 加 pid→tid 后成环 ⟺ tid 沿「解锁」方向能到达 pid
  const seen = new Set(), q = [tid];
  while (q.length) {
    const x = q.pop();
    if (x === pid) return true;
    if (seen.has(x)) continue;
    seen.add(x);
    for (const y of unlock.get(x) || []) q.push(y);
  }
  return false;
}
const uEdges = [];
let skipped = 0;
for (const e of unionPool) {
  if (wouldCycle(e.topicId, e.prerequisiteId)) { skipped++; continue; }
  unlock.get(e.prerequisiteId).push(e.topicId);
  uEdges.push(e);
}
const hist = {}; for (const e of uEdges) hist[e.votes] = (hist[e.votes] || 0) + 1;
const uTouched = new Set(); for (const e of uEdges) { uTouched.add(e.topicId); uTouched.add(e.prerequisiteId); }
const UOUT = path.join(EV, 'concept-graph-union.json');
fs.writeFileSync(UOUT, JSON.stringify({
  meta: {
    generatedAt: new Date().toISOString(), mode: 'union',
    baseEdges: base.edges.length, candidates: all.length, crossRuns: runs.length,
    edgeCount: uEdges.length, nodeCount: uTouched.size, skippedByCycle: skipped, votesHistogram: hist,
  },
  edges: uEdges,
}, null, 2));
console.log(`\n=== 并集模式 ===`);
console.log(`${uEdges.length} 条边（成环跳过 ${skipped}）| 覆盖 ${uTouched.size}/194 | 票数分布 ${JSON.stringify(hist)}`);
console.log(`写入 ${path.relative(ROOT, UOUT)}`);
