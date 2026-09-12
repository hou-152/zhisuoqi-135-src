#!/usr/bin/env node
// 把概念图数据注入「壳」模板（左栏 + import/insert/Agent 三入口），生成可双击打开的单文件原型。
//
// 用法：
//   node scripts/build-concept-map.mjs                              # 用最近一次补边结果
//   node scripts/build-concept-map.mjs --from=evidence/xxx.json     # 指定数据源
//   node scripts/build-concept-map.mjs --edges=evidence/voted-cross.json  # 指定投票后的边
//
// 输出：prototype/知所栖-壳.html

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
const TPL = path.join(ROOT, 'scripts', 'shell.template.html');
const CURATION = path.join(ROOT, 'evidence', 'concept-curation-20260912.json');
const EDGECUR  = path.join(ROOT, 'evidence', 'concept-edges-curated-20260912.json');
const CLASSES  = path.join(ROOT, 'evidence', 'concept-classes-20260912.json');
const ARGV = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));

// 文章 → 图例短名
const SHORT = {
  S1: '三类人', S2: '原生方法论', S3: '技能地图', S4: '手敲代码',
  S5: '实习生', S6: 'Claude Code', S7: '五条规则', S8: '隐性地图',
  S9: 'OpenAI PM', S10: '别学 Marc', S11: '数学家的 AI', S12: '内驱式学习',
};

// ── 概念池 ─────────────────────────────────────────────────
const md = fs.readFileSync(POOL, 'utf8');
const nodes = [];
{
  let art = null, artTitle = {};
  for (const L of md.split('\n')) {
    if (L.startsWith('## 第二部分')) break;
    const h = L.match(/^### (S\d+)\s+(.+?)\s*｜/);
    if (h) { art = h[1]; artTitle[art] = h[2]; continue; }
    if (!art || !L.startsWith('| ') || L.startsWith('| 概念原文') || L.startsWith('|---')) continue;
    const c = L.split('|').map(s => s.trim());
    if (c.length < 5 || !c[1]) continue;
    nodes.push({ id: 'C' + String(nodes.length + 1).padStart(2, '0'), src: art, name: c[1], type: c[2], gloss: c[4] });
  }
}
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

/* ── 策展层：主题标签 + 策展集 + 机器已判的边 ─────────────── */
let curation = { tags: [], assign: {}, collections: [], edgeAuto: [], edgeHuman: [] };
if (fs.existsSync(CURATION)) {
  const c = JSON.parse(fs.readFileSync(CURATION, 'utf8'));
  curation.tags = c.tags || [];
  curation.assign = c.assign || {};
  curation.collections = c.collections || [];
} else {
  console.warn('⚠ 缺 evidence/concept-curation-20260912.json —— 先跑 node scripts/curate-concepts.mjs');
}
if (fs.existsSync(EDGECUR)) {
  const e = JSON.parse(fs.readFileSync(EDGECUR, 'utf8'));
  curation.edgeAuto = e.auto || [];
  curation.edgeHuman = e.human || [];
} else {
  console.warn('⚠ 缺 evidence/concept-edges-curated-20260912.json —— 先跑 node scripts/curate-edges.mjs');
}
// 验收方式分类：compute 能算的 / judge 能判的 / use 能用的 / accept 只能认的
let kinds = { meta: { dist: {} }, classes: {}, assign: {} };
if (fs.existsSync(CLASSES)) {
  kinds = JSON.parse(fs.readFileSync(CLASSES, 'utf8'));
} else {
  console.warn('⚠ 缺 evidence/concept-classes-20260912.json —— 先跑 node scripts/classify-concepts.mjs');
}
const KINDS = kinds.assign || {};
const kindOf = id => (KINDS[id] || {}).k || 'compute';
const kindDist = {};
for (const n of nodes) kindDist[kindOf(n.id)] = (kindDist[kindOf(n.id)] || 0) + 1;

const tagged = nodes.filter(n => (curation.assign[n.id] || []).length).length;
console.log(`验收方式：` + Object.entries(kindDist).map(([k, v]) => (kinds.classes[k]?.name || k) + ' ' + v).join(' / '));
console.log(`策展 ${curation.tags.length} 条线（${curation.tags.map(t => t.name).join('/')}）`
  + ` | 已打标 ${nodes.filter(n => (curation.assign[n.id] || []).length).length}/${nodes.length}`
  + ` | 边预判 ${curation.edgeAuto.length} 条，留人 ${curation.edgeHuman.length} 条`);

const meta = {
  kicker: `AI 内参 · ${sources.length} 篇 · 2026-09`,
  stats: `<b>${nodes.length}</b> 个概念 · <b>${edges.length}</b> 条依赖<br>`
       + `<b>${curation.tags.length}</b> 条主题线 · 已标 <b>${tagged}</b>/${nodes.length}<br>`
       + `<b>${strongEdges}</b> 条骨架（实线）· <b>${edges.length - strongEdges}</b> 条候选（虚线）<br>`
       + `<b>${maxLevel + 1}</b> 层深度 · <b>${sources.length}</b> 个来源`
       + (iso ? ` · <b>${iso}</b> 个待归类` : '')
       + `<br>枢纽：${top ? top.name : '—'}`,
};

// ── 注入 ──────────────────────────────────────────────────
const payload = {
  nodes: nodes.map(n => ({ id: n.id, name: n.name, src: n.src, type: n.type, gloss: n.gloss,
                           level: n.level, ci: n.ci, tags: curation.assign[n.id] || [],
                           k: kindOf(n.id), kwhy: (KINDS[n.id] || {}).why || '' })),
  edges, sources, meta, curation,
  kinds: { classes: kinds.classes || {}, dist: kindDist },
};
const tpl = fs.readFileSync(TPL, 'utf8');
const json = JSON.stringify(payload).replace(/<\//g, '<\\/');
const html = tpl.replace('/*__DATA__*/', json);

const OUT = path.join(ROOT, 'prototype', '知所栖-壳.html');
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);

console.log(`层级: ${Array.from({ length: maxLevel + 1 }, (_, i) =>
  'L' + i + ':' + nodes.filter(n => n.level === i).length).join(' ')}`);
console.log(`孤立 ${iso} | 输出 ${path.relative(ROOT, OUT)} (${(html.length / 1024).toFixed(0)} KB)`);
