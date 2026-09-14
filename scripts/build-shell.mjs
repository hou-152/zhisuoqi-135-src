#!/usr/bin/env node
// 把概念图数据注入「壳」模板（左栏 + import/insert/Agent 三入口），生成可双击打开的单文件原型。
//
// 概念源（2026-09-13 起）：**概念地图 v2**
//   Notion 概念库 509 + 飞书-Context-Engineering(28篇) + 飞书-Harness-Engineering(30篇)
//   → knowledge/概念地图-260913/（os-taxonomy 形态）→ evidence/cm-260913/05-shell-payload.json
//   管线：cm-extract → cm-merge → cm-enrich → cm-edges → cm-build-map → cm-wire
//
// 旧概念源（194 内参概念池）保留在 --legacy 分支，便于对照与回退。
//
// 用法：
//   node scripts/build-shell.mjs              # 用概念地图 v2
//   node scripts/build-shell.mjs --legacy     # 用旧的 194 概念池
// 输出：prototype/知所栖-壳.html

import fs from 'node:fs';
import path from 'node:path';
import { parseConceptPool } from './lib/pool.mjs';
import { buildPractice } from './lib/practice-readiness.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const TPL = path.join(ROOT, 'scripts', 'shell.template.html');
const NEW_PAYLOAD = path.join(ROOT, 'evidence', 'cm-260913', '05-shell-payload.json');
const ARGV = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const LEGACY = 'legacy' in ARGV || !fs.existsSync(NEW_PAYLOAD);

// 内参一栏：由 scripts/build-neican.mjs 生成（真 LLM 元数据 + 三产物 + 配图 SVG）
// 2026-09-14：改成**多期集合**——knowledge/内参-<期>/内参-页面数据.json 全部读进来（新 → 旧），
// 壳的上方日期条靠它切换；一期一个目录、一份页面数据，互不覆盖。
function loadNeican() {
  const K = path.join(ROOT, 'knowledge');
  const dirs = fs.existsSync(K)
    ? fs.readdirSync(K).filter((d) => /^内参-\d{6}$/.test(d) && fs.existsSync(path.join(K, d, '内参-页面数据.json'))).sort().reverse()
    : [];
  if (!dirs.length) {
    console.warn('⚠ 没有任何一期内参（knowledge/内参-YYMMDD/内参-页面数据.json）—— 先跑 pull-readwise-inbox.mjs + build-neican-daily.mjs + build-neican.mjs');
    return { issues: [] };
  }
  // 内参的概念卡要接回地图：能对上的填 nodeId，点名字直接跳到地图那张卡。
  // 归一化必须用 \p{P}\p{S} 那一套（JS 的 \W 只认 ASCII，中文会被吃光 → 假命中）。
  const topics = JSON.parse(fs.readFileSync(path.join(ROOT, 'knowledge', '概念地图-260913', 'topics.json'), 'utf8')).topics;
  const norm = (x) => String(x).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
  const parts = (x) => { const m = String(x).match(/^(.+?)\s*[（(]([^()（）]+)[)）]\s*$/); return m ? [m[1].trim(), m[2].trim()] : [String(x).trim()]; };
  const idx = new Map();
  for (const t of topics) for (const k of [t.name, t.nameEn, ...(t.aliases || [])]) if (k && !idx.has(norm(k))) idx.set(norm(k), t.id);
  const issues = [];
  for (const d of dirs) {
    const data = JSON.parse(fs.readFileSync(path.join(K, d, '内参-页面数据.json'), 'utf8'));
    let linked = 0, total = 0;
    for (const art of data.articles || []) for (const c of art.conceptCards || []) {
      total++;
      const full = c.name || '';
      // 三种写法都要试：剥括号的中文名 / 括号里的英文名 / 整串（「代理技能（Agent Skills）」要能撞上「Agent Skills」）
      const id = parts(full).map(norm).map((k) => idx.get(k)).find(Boolean) || idx.get(norm(full)) || null;
      if (id) { c.nodeId = id; linked++; }
    }
    data._link = { total, linked };
    issues.push(data);
    console.log(`内参 ${data.period} 期：${(data.articles || []).length} 篇 · 概念卡 ${total} 张 · 已接回地图 ${linked} 张`);
  }
  const fail = topics.filter((t) => t.origin.includes('neican')).length;
  console.log(`  地图里来自内参的节点 ${fail} 个 · 共 ${issues.length} 期（新 → 旧：${issues.map((i) => i.period).join(' / ')}）`);
  return { issues };
}

/* 独立学习空间：Agent Loop 六章（scripts/build-learning-materials.mjs 装配 → chapters.json）
   候选装配稿也只进本地壳；公网产物由 build-public.mjs 按审核状态决定是否剥离。 */
function loadLearning() {
  const f = path.join(ROOT, 'evidence', 'agent-loop-260913', 'chapters.json');
  if (!fs.existsSync(f)) {
    console.warn('⚠ 缺 evidence/agent-loop-260913/chapters.json —— 先跑 node scripts/build-learning-materials.mjs');
    return { chapters: [], caseReview: {}, gaps: [] };
  }
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  const ready = d.chapters.filter((c) => c.review.status === 'ready').length;
  console.log(`学习空间：${d.chapters.length} 章 · ready ${ready} 章 · 主案例审核状态 ${d.caseReview.state}（${d.caseReview.confirmedAt || '未确认'}）`);
  console.log(`  ${d.chapters.map((c) => `${c.order}.${c.title}(${c.cm.id}↔${c.concept.id})`).join(' · ')}`);
  return d;
}

/* 实践空间：单元链路就绪度（六章 6 + 单篇 1 + 批量 76）。
   数据来自 graph.json（单元/活动/判据/缺口/入口）+ units.json（批量装配声明）+ chapters.json（六章）
   + review-decisions-260914/review.json（228 道批量决策题的独立复核结论）。
   准入规则只有一条、且是数据算出来的：「四段全绿才开放」——页面不写死六章。
   19 条 ready 只显示「准备中 / 目录候选」，76 个批量单元一律不可进入：
   它们的决策题已生成，但独立复核判定不可接入（见 evidence/review-decisions-260914/）。 */
function loadPractice(learning) {
  const g = path.join(ROOT, 'knowledge', 'graph-260914', 'graph.json');
  const b = path.join(ROOT, 'evidence', 'batch-units-260914', 'units.json');
  const r = path.join(ROOT, 'evidence', 'review-decisions-260914', 'review.json');
  if (!fs.existsSync(g)) { console.warn('⚠ 缺 knowledge/graph-260914/graph.json —— 先跑 node scripts/build-graph.mjs（实践空间会没有状态看板）'); return null; }
  const graph = JSON.parse(fs.readFileSync(g, 'utf8'));
  const batch = fs.existsSync(b) ? JSON.parse(fs.readFileSync(b, 'utf8')) : { units: [] };
  if (!fs.existsSync(b)) console.warn('⚠ 缺 evidence/batch-units-260914/units.json —— 批量 76 个单元不会出现在状态看板里');
  const review = fs.existsSync(r) ? JSON.parse(fs.readFileSync(r, 'utf8')) : null;
  if (!review) console.warn('⚠ 缺 evidence/review-decisions-260914/review.json —— 决策题一律按未复核处理（不开放）');
  const p = buildPractice({ graph, batch, learning, review });
  console.log(`实践空间：单元 ${p.summary.units} 个 · 可进入 ${p.summary.open}（四段全绿）· ` +
    p.buckets.map((x) => `${x.label} ${x.count}`).join(' · '));
  if (p.summary.reviewedDecisions) {
    const d = p.summary.reviewedDecisions;
    console.log(`  决策题独立复核：生成 ${d.questions} 道 / 复核通过 ${d.usableQuestions} 道 · 可用单元 ${d.usableUnits}/${d.units}`);
  }
  return p;
}

const payload = LEGACY ? buildLegacy() : buildFromMap();
payload.neican = loadNeican();
payload.learning = loadLearning();
payload.practice = loadPractice(payload.learning);

const tpl = fs.readFileSync(TPL, 'utf8');
const json = JSON.stringify(payload).replace(/<\//g, '<\\/');
// 全链路 Graph：运行时与视图作为独立模块内联进来（UMD → window.GRAPH_RUNNER / window.GRAPH_VIEW）。
// 页面与 Node 验收脚本用的是**同一份文件**，所以「图驱动实际学习」不是旁边另画的一张图。
const RUNNER_SRC = fs.readFileSync(path.join(ROOT, 'scripts', 'lib', 'graph-runner.js'), 'utf8');
const VIEW_SRC = fs.readFileSync(path.join(ROOT, 'scripts', 'lib', 'graph-view.js'), 'utf8');
const html = tpl.replace('/*__DATA__*/', json)
  .replace('/*__GRAPH_RUNNER__*/', () => RUNNER_SRC)
  .replace('/*__GRAPH_VIEW__*/', () => VIEW_SRC);

const OUT = path.join(ROOT, 'prototype', '知所栖-壳.html');
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log(`输出 ${path.relative(ROOT, OUT)} (${(html.length / 1024).toFixed(0)} KB) · 概念源 ${LEGACY ? 'legacy 194' : '概念地图 v2'}`);

/* ══ 新：概念地图 v2 ═══════════════════════════════════════ */
function buildFromMap() {
  const p = JSON.parse(fs.readFileSync(NEW_PAYLOAD, 'utf8'));
  const { nodes, edges } = p;
  const strong = edges.filter((e) => e[2] >= 7).length;
  const levels = nodes.map((n) => n.level);
  console.log(`概念地图 v2：节点 ${nodes.length} | 边 ${edges.length}（骨架 ${strong}）`);
  console.log(`  主题线 ${p.curation.tags.length} 条（${p.curation.tags.map((t) => t.name).join('/')}）`);
  console.log(`  来源 ${p.sources.map((s) => `${s.label} ${nodes.filter((n) => n.src === s.id).length}`).join(' · ')}`);
  console.log(`  验收方式：` + Object.entries(p.kinds.dist).map(([k, v]) => `${k} ${v}`).join(' / '));
  console.log(`  层级: ${Array.from({ length: Math.max(...levels) + 1 }, (_, i) => 'L' + i + ':' + levels.filter((l) => l === i).length).join(' ')}`);
  return p;
}

/* ══ 旧：194 概念池（保留，勿删） ═════════════════════════ */
function buildLegacy() {
  const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
  const CURATION = path.join(ROOT, 'evidence', 'concept-curation-20260912.json');
  const EDGECUR = path.join(ROOT, 'evidence', 'concept-edges-curated-20260912.json');
  const CLASSES = path.join(ROOT, 'evidence', 'concept-classes-20260912.json');
  const ACTIVE = path.join(ROOT, 'evidence', 'concept-active-20260912.json');
  // 文章 → 图例短名
  const SHORT = {
    S1: '三类人', S2: '原生方法论', S3: '技能地图', S4: '手敲代码',
    S5: '实习生', S6: 'Claude Code', S7: '五条规则', S8: '隐性地图',
    S9: 'OpenAI PM', S10: '别学 Marc', S11: '数学家的 AI', S12: '内驱式学习',
  };

  const md = fs.readFileSync(POOL, 'utf8');
  const nodes = parseConceptPool(md).map(({ id, src, name, type, gloss }) => ({ id, src, name, type, gloss }));
  const byId = new Map(nodes.map((n) => [n.id, n]));

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
  const edges = raw.filter((e) => byId.has(e.topicId) && byId.has(e.prerequisiteId))
    .map((e) => [e.topicId, e.prerequisiteId, e.votes ?? 5]);
  const strongEdges = edges.filter((e) => e[2] >= 7).length;
  console.log(`节点 ${nodes.length} | 边 ${edges.length}（骨架 ${strongEdges} / 候选 ${edges.length - strongEdges}）| 来源 ${edgeSrc}`);

  const pre = new Map(nodes.map((n) => [n.id, []]));
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
  for (const n of nodes) { const d = dep(n.id, new Set()); n.level = d < 0 ? 0 : d; maxLevel = Math.max(maxLevel, n.level); }

  const srcIds = [...new Set(nodes.map((n) => n.src))].sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
  const sources = srcIds.map((id) => ({ id, label: SHORT[id] || id }));
  const ciOf = new Map(sources.map((s, i) => [s.id, i]));
  for (const n of nodes) n.ci = ciOf.get(n.src) ?? 0;

  const touched = new Set(); for (const [a, b] of edges) { touched.add(a); touched.add(b); }
  const iso = nodes.length - touched.size;
  const inDeg = {}, outDeg = {};
  for (const [t, p] of edges) { inDeg[t] = (inDeg[t] || 0) + 1; outDeg[p] = (outDeg[p] || 0) + 1; }
  const degOf = (id) => (inDeg[id] || 0) + (outDeg[id] || 0);
  const top = [...nodes].sort((a, b) => degOf(b.id) - degOf(a.id))[0];

  let curation = { tags: [], assign: {}, collections: [], edgeAuto: [], edgeHuman: [] };
  if (fs.existsSync(CURATION)) {
    const c = JSON.parse(fs.readFileSync(CURATION, 'utf8'));
    curation.tags = c.tags || []; curation.assign = c.assign || []; curation.collections = c.collections || [];
  } else console.warn('⚠ 缺 evidence/concept-curation-20260912.json —— 先跑 node scripts/curate-concepts.mjs');
  if (fs.existsSync(EDGECUR)) {
    const e = JSON.parse(fs.readFileSync(EDGECUR, 'utf8'));
    curation.edgeAuto = e.auto || []; curation.edgeHuman = e.human || [];
  } else console.warn('⚠ 缺 evidence/concept-edges-curated-20260912.json —— 先跑 node scripts/curate-edges.mjs');
  if (fs.existsSync(ACTIVE)) {
    const a = JSON.parse(fs.readFileSync(ACTIVE, 'utf8'));
    curation.active = a;
    curation.collections = a.collections || curation.collections;
  } else console.warn('⚠ 缺 evidence/concept-active-20260912.json —— 先跑 node scripts/build-active-layer.mjs');

  let kinds = { meta: { dist: {} }, classes: {}, assign: {} };
  if (fs.existsSync(CLASSES)) kinds = JSON.parse(fs.readFileSync(CLASSES, 'utf8'));
  else console.warn('⚠ 缺 evidence/concept-classes-20260912.json —— 先跑 node scripts/classify-concepts.mjs');
  const KINDS = kinds.assign || {};
  const kindOf = (id) => (KINDS[id] || {}).k || 'compute';
  const kindDist = {};
  for (const n of nodes) kindDist[kindOf(n.id)] = (kindDist[kindOf(n.id)] || 0) + 1;

  const tagged = nodes.filter((n) => (curation.assign[n.id] || []).length).length;
  console.log(`验收方式：` + Object.entries(kindDist).map(([k, v]) => (kinds.classes[k]?.name || k) + ' ' + v).join(' / '));
  console.log(`策展 ${curation.tags.length} 条线（${curation.tags.map((t) => t.name).join('/')}）`
    + ` | 已打标 ${tagged}/${nodes.length}`
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
  console.log(`层级: ${Array.from({ length: maxLevel + 1 }, (_, i) => 'L' + i + ':' + nodes.filter((n) => n.level === i).length).join(' ')}`);
  console.log(`孤立 ${iso}`);
  return {
    nodes: nodes.map((n) => ({ id: n.id, name: n.name, src: n.src, type: n.type, gloss: n.gloss,
      level: n.level, ci: n.ci, tags: curation.assign[n.id] || [],
      k: kindOf(n.id), kwhy: (KINDS[n.id] || {}).why || '' })),
    edges, sources, meta, curation,
    kinds: { classes: kinds.classes || {}, dist: kindDist },
  };
}
