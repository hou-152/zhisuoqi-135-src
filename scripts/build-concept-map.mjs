#!/usr/bin/env node
// 把概念图数据注入 HTML 模板，生成可双击打开的单文件原型。
//
// 用法：
//   node scripts/build-concept-map.mjs                              # 用最近一次补边结果
//   node scripts/build-concept-map.mjs --from=evidence/xxx.json     # 指定数据源
//   node scripts/build-concept-map.mjs --edges=evidence/voted-cross.json  # 指定投票后的边
//
// 输出：prototype/知所栖-135-概念图.html

import fs from 'node:fs';
import path from 'node:path';
import { parseConceptPool } from './lib/pool.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
const TPL = path.join(ROOT, 'scripts', 'concept-map.template.html');
const ARGV = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));

// 文章 → 图例短名
const SHORT = {
  S1: '三类人', S2: '原生方法论', S3: '技能地图', S4: '手敲代码',
  S5: '实习生', S6: 'Claude Code', S7: '五条规则', S8: '隐性地图',
  S9: 'OpenAI PM', S10: '别学 Marc', S11: '数学家的 AI', S12: '内驱式学习',
};

// ── 概念池 ─────────────────────────────────────────────────
const md = fs.readFileSync(POOL, 'utf8');
const nodes = parseConceptPool(md).map(({ id, src, name, type, gloss }) =>
  ({ id, src, name, type, gloss }));
const byId = new Map(nodes.map(n => [n.id, n]));

// ── 边 ────────────────────────────────────────────────────
const fromFile = ARGV.from || 'evidence/concept-graph-union.json';
const edgesFile = ARGV.edges;
let raw, edgeSrc;
if (edgesFile) {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, edgesFile), 'utf8'));
  raw = j.edges; edgeSrc = edgesFile;
} else {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, fromFile), 'utf8'));
  raw = j.edges || j.mergedEdges; edgeSrc = fromFile;
}
// 每条边带票数：基线（多次投票产生）7–9，补边候选 1–4。票数决定线的实/虚。
const edges = raw
  .filter(e => byId.has(e.topicId) && byId.has(e.prerequisiteId))
  .map(e => [e.topicId, e.prerequisiteId, e.votes ?? 5]);
const strongEdges = edges.filter(e => e[2] >= 7).length;
console.log(`节点 ${nodes.length} | 边 ${edges.length}（骨架 ${strongEdges} / 候选 ${edges.length - strongEdges}）| 来源 ${edgeSrc}`);

// ── 依赖深度（最长路径）───────────────────────────────────
const pre = new Map(nodes.map(n => [n.id, []]));
for (const [t, p] of edges) pre.get(t).push(p);
const memo = new Map();
function dep(id, seen) {
  if (memo.has(id)) return memo.get(id);
  seen.add(id); let m = 0;
  for (const p of pre.get(id)) {
    if (seen.has(p)) { m = -1; break; }
    const x = dep(p, seen); if (x < 0) { m = -1; break; }
    m = Math.max(m, x + 1);
  }
  seen.delete(id); memo.set(id, m); return m;
}
let maxLevel = 0;
for (const n of nodes) {
  const d = dep(n.id, new Set());
  n.level = d < 0 ? 0 : d;
  maxLevel = Math.max(maxLevel, n.level);
}

// ── 来源 ──────────────────────────────────────────────────
const srcIds = [...new Set(nodes.map(n => n.src))].sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
const sources = srcIds.map(id => ({ id, label: SHORT[id] || id }));
const ciOf = new Map(sources.map((s, i) => [s.id, i]));
for (const n of nodes) n.ci = ciOf.get(n.src) ?? 0;

// ── 统计 ──────────────────────────────────────────────────
const touched = new Set(); for (const [a, b] of edges) { touched.add(a); touched.add(b); }
const iso = nodes.length - touched.size;
const inDeg = {}, outDeg = {};
for (const [t, p] of edges) { inDeg[t] = (inDeg[t] || 0) + 1; outDeg[p] = (outDeg[p] || 0) + 1; }
const degOf = id => (inDeg[id] || 0) + (outDeg[id] || 0);
const top = [...nodes].sort((a, b) => degOf(b.id) - degOf(a.id))[0];

const meta = {
  kicker: `AI 内参 · ${sources.length} 篇 · 2026-09`,
  stats: `<b>${nodes.length}</b> 个概念 · <b>${edges.length}</b> 条依赖<br>`
       + `<b>${strongEdges}</b> 条骨架（实线）· <b>${edges.length - strongEdges}</b> 条候选（虚线）<br>`
       + `<b>${maxLevel + 1}</b> 层深度 · <b>${sources.length}</b> 个来源`
       + (iso ? ` · <b>${iso}</b> 个待归类` : '')
       + `<br>枢纽：${top ? top.name : '—'}`,
};

// ── 注入 ──────────────────────────────────────────────────
const payload = {
  nodes: nodes.map(n => ({ id: n.id, name: n.name, src: n.src, type: n.type, gloss: n.gloss, level: n.level, ci: n.ci })),
  edges, sources, meta,
};
const tpl = fs.readFileSync(TPL, 'utf8');
const json = JSON.stringify(payload).replace(/<\//g, '<\\/');
const html = tpl.replace('/*__DATA__*/', json);

const OUT = path.join(ROOT, 'prototype', '知所栖-135-概念图.html');
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);

console.log(`层级: ${Array.from({ length: maxLevel + 1 }, (_, i) =>
  'L' + i + ':' + nodes.filter(n => n.level === i).length).join(' ')}`);
console.log(`孤立 ${iso} | 输出 ${path.relative(ROOT, OUT)} (${(html.length / 1024).toFixed(0)} KB)`);
