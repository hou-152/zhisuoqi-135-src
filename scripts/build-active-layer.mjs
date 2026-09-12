#!/usr/bin/env node
// 从现有图谱、策展和分类证据生成主动层派生数据。
// 原始概念池与 concept-graph-union.json 永远不在这里改写。

import fs from 'node:fs';
import path from 'node:path';
import { parseConceptPool } from './lib/pool.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
const GRAPH = path.join(ROOT, 'evidence', 'concept-graph-union.json');
const CURATION = path.join(ROOT, 'evidence', 'concept-curation-20260912.json');
const EDGE_CUR = path.join(ROOT, 'evidence', 'concept-edges-curated-20260912.json');
const CLASSES = path.join(ROOT, 'evidence', 'concept-classes-20260912.json');
const OUT = path.join(ROOT, 'evidence', 'concept-active-20260912.json');

const nodes = parseConceptPool(fs.readFileSync(POOL, 'utf8')).map(({ id, src, name, type, gloss }) =>
  ({ id, src, name, type, gloss }));
const byId = new Map(nodes.map(n => [n.id, n]));
const graph = JSON.parse(fs.readFileSync(GRAPH, 'utf8'));
const curation = JSON.parse(fs.readFileSync(CURATION, 'utf8'));
const edgeCuration = JSON.parse(fs.readFileSync(EDGE_CUR, 'utf8'));
const classes = JSON.parse(fs.readFileSync(CLASSES, 'utf8'));

const candidateIds = new Set(curation.collections.flatMap(c => c.route.map(r => r.id)));
const auto = new Map((edgeCuration.auto || []).map(r => [r.key, r]));
const rawEdges = (graph.edges || []).filter(e => byId.has(e.topicId) && byId.has(e.prerequisiteId));
const activeEdges = rawEdges.filter(e => {
  if ((e.votes ?? 5) >= 7) return true;
  return auto.get(`${e.topicId}_${e.prerequisiteId}`)?.verdict === 'keep';
}).map(e => ({
  topicId: e.topicId,
  prerequisiteId: e.prerequisiteId,
  votes: e.votes ?? 5,
  source: (e.votes ?? 5) >= 7 ? 'skeleton' : 'curated-keep',
}));
const activeEdgeSource = new Map(activeEdges.map(e => [`${e.topicId}_${e.prerequisiteId}`, e.source]));

const activeSet = new Set(candidateIds);
const activeNodes = nodes.filter(n => activeSet.has(n.id));
const pre = new Map(activeNodes.map(n => [n.id, []]));
const post = new Map(activeNodes.map(n => [n.id, []]));
for (const e of activeEdges) {
  if (!activeSet.has(e.topicId) || !activeSet.has(e.prerequisiteId)) continue;
  pre.get(e.topicId).push(e.prerequisiteId);
  post.get(e.prerequisiteId).push(e.topicId);
}

const levelMemo = new Map();
function level(id, seen = new Set()) {
  if (levelMemo.has(id)) return levelMemo.get(id);
  if (seen.has(id)) throw new Error(`主动层出现环：${id}`);
  seen.add(id);
  const value = Math.max(0, ...(pre.get(id) || []).map(p => level(p, seen) + 1));
  seen.delete(id); levelMemo.set(id, value); return value;
}
activeNodes.forEach(n => { n.level = level(n.id); });

function routeIn(groupIds, start, goals) {
  const group = new Set(groupIds), goalSet = new Set(goals);
  let best = [start];
  function walk(cur, path) {
    if (path.length > best.length) best = path.slice();
    if (goalSet.has(cur) && path.length >= 2) return;
    if (path.length >= 10) return;
    for (const next of post.get(cur) || []) {
      if (!group.has(next) || path.includes(next)) continue;
      path.push(next); walk(next, path); path.pop();
    }
  }
  walk(start, [start]);
  return best;
}

const routes = curation.collections.map(collection => {
  const ids = activeNodes.filter(n => (curation.assign[n.id] || []).includes(collection.tagId));
  const group = new Set(ids.map(n => n.id));
  const indeg = id => (pre.get(id) || []).filter(x => group.has(x)).length;
  const outdeg = id => (post.get(id) || []).filter(x => group.has(x)).length;
  let entries = ids.filter(n => indeg(n.id) === 0);
  if (entries.length < 3) entries = ids;
  entries = [...entries].sort((a, b) => outdeg(b.id) - outdeg(a.id) || a.level - b.level).slice(0, 3);
  const goals = [...ids].sort((a, b) => indeg(b.id) - indeg(a.id) || outdeg(a.id) - outdeg(b.id) || b.level - a.level).slice(0, 2);
  let route = [];
  for (const entry of entries) {
    const candidate = routeIn(ids.map(n => n.id), entry.id, goals.map(n => n.id));
    if (candidate.length > route.length) route = candidate;
  }
  return {
    ...collection,
    size: ids.length,
    primary: ids.filter(n => (curation.assign[n.id] || [])[0] === collection.tagId).length,
    entry: entries.map(n => ({ id: n.id, name: n.name, level: n.level, unlocks: outdeg(n.id) })),
    goal: goals.map(n => ({ id: n.id, name: n.name, level: n.level, needs: indeg(n.id) })),
    route: route.map((id, i) => ({
      id, name: byId.get(id).name, level: byId.get(id).level,
      kind: classes.assign[id]?.k || 'compute',
      background: classes.assign[id]?.k === 'accept',
      edgeFromPrev: i === 0 ? null : (activeEdgeSource.get(`${id}_${route[i - 1]}`) === 'skeleton' ? 'skel' : 'cand'),
    })),
  };
});

const activeAccept = activeNodes.filter(n => classes.assign[n.id]?.k === 'accept').map(n => n.id);
const skipped = (edgeCuration.rows || []).filter(r => r.verdict === 'skip').map(r => r.key);
const unsure = (edgeCuration.rows || []).filter(r => r.verdict === 'unsure').map(r => r.key);
const originalRouteKeys = new Set(curation.collections.flatMap(c => c.route.slice(1).map((n, i) => `${n.id}_${c.route[i].id}`)));
const originalInvalidRouteEdges = [...originalRouteKeys].filter(k => skipped.includes(k) || unsure.includes(k));
const routeKeys = new Set(routes.flatMap(c => c.route.slice(1).map((n, i) => `${n.id}_${c.route[i].id}`)));
const invalidRouteEdges = [...routeKeys].filter(k => skipped.includes(k) || unsure.includes(k));

const output = {
  meta: {
    generatedAt: new Date().toISOString(),
    source: 'concept-graph-union.json + concept-curation-20260912.json + concept-edges-curated-20260912.json',
    rawNodeCount: nodes.length,
    candidateNodeCount: activeNodes.length,
    activeEdgeCount: activeEdges.length,
    routeCount: routes.length,
    activeAcceptCount: activeAccept.length,
    originalRouteAdjacencies: originalRouteKeys.size,
    originalInvalidRouteEdges: originalInvalidRouteEdges.length,
    invalidRouteEdges: invalidRouteEdges.length,
  },
  candidateNodeIds: activeNodes.map(n => n.id),
  backgroundAcceptIds: activeAccept,
  edges: activeEdges,
  collections: routes,
  audit: { skipped, unsure, originalInvalidRouteEdges, invalidRouteEdges },
};
fs.writeFileSync(OUT, JSON.stringify(output, null, 1) + '\n');
console.log(`主动层：${activeNodes.length} 节点 | ${activeEdges.length} 条边 | ${routes.length} 条路线`);
console.log(`背景 accept：${activeAccept.length} | 路线中的 skip/unsure：${invalidRouteEdges.length}`);
console.log(`输出 ${path.relative(ROOT, OUT)}`);
