#!/usr/bin/env node
// 概念地图 v2 · 第 7 步：把地图翻译成「壳」要的 payload（形状与旧管线一致，内容全换）。
//
// 输出：evidence/cm-260913/05-shell-payload.json
//   nodes[{id,name,src,type,gloss,level,ci,tags,k,kwhy}] · edges[[t,p,votes]] · sources · meta
//   curation{tags,assign,collections,edgeAuto,edgeHuman,active} · kinds{classes,dist}
//
// 用法：node scripts/cm-wire.mjs

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAP = path.join(ROOT, 'knowledge', '概念地图-260913');
const OUT = path.join(ROOT, 'evidence', 'cm-260913');
const load = (f) => JSON.parse(fs.readFileSync(path.join(MAP, f), 'utf8'));

const topics = load('topics.json').topics;
const dependencies = load('dependencies.json').dependencies;
const clusters = load('clusters.json').clusters;

const SRC = {
  notion: { label: 'Notion 概念库', color: '#5B8FF9' },
  context: { label: 'Context Engineering', color: '#61DDAA' },
  harness: { label: 'Harness Engineering', color: '#F6BD16' },
  neican: { label: 'AI 内参 260912', color: '#E8684A' },
  multi: { label: '跨源概念', color: '#9661BC' },
};
const SRC_KEYS = Object.keys(SRC);
// 领域配色（21 个，按序循环一套可区分的色）
const PALETTE = ['#5B8FF9', '#61DDAA', '#F6BD16', '#9661BC', '#F6903D', '#00B5A3', '#F08BB4', '#E8684A',
  '#6DC8EC', '#A078DB', '#7C9CFF', '#5AD8A6', '#F6BD16', '#945FB9', '#FF9845', '#1E9493', '#FF99C3',
  '#E8684A', '#6395FA', '#79C7E3', '#C2A5CF'];

/* ── 节点 ───────────────────────────────────────────────── */
const srcOf = (t) => (t.origin.length > 1 ? 'multi' : t.origin[0]);
const nodes = topics.map((t) => {
  const src = srcOf(t);
  return {
    id: t.id, name: t.name, src, type: t.type,
    gloss: t.description || t.name,
    level: t.depth,
    ci: SRC_KEYS.indexOf(src),
    tags: [t.domain],
    k: t.verification,
    kwhy: (t.evidence && t.evidence[0]) || t.feynman?.slice(0, 40) || '',
    // 壳里没用到、但留着方便点开就是完整卡
    nameEn: t.nameEn, centrality: t.centrality, stage: t.learningStage,
    feynman: t.feynman, evidence: t.evidence, ap: t.assessmentPrompt,
    origin: t.origin, mentionCount: t.mentionCount,
  };
});

/* ── 边：hard→实线（7+），soft→虚线（<7） ────────────────── */
// 实线/虚线只看**审核后的强度**，不看来源：hard=实线，soft=虚线。
// （踩过：llm-strict 因为 origin 不等于 'llm' 被当成 curated，531 条 soft 全画成实线）
const VOTES = (e) => (e.strength === 'hard' ? 9 : 3);
const edges = dependencies.map((e) => [e.topicId, e.prerequisiteId, VOTES(e)]);

/* ── 策展：领域即主题线，路线沿真实依赖边走 ─────────────── */
const byId = new Map(nodes.map((n) => [n.id, n]));
const pre = new Map(nodes.map((n) => [n.id, []]));
const nxt = new Map(nodes.map((n) => [n.id, []]));
for (const e of dependencies) { pre.get(e.topicId).push(e.prerequisiteId); nxt.get(e.prerequisiteId).push(e.topicId); }
const inDomain = new Map(clusters.map((c) => [c.id, new Set(topics.filter((t) => t.domain === c.id).map((t) => t.id))]));

// 域内最长链（DP + 记忆化）
function longest(id, set, memo, seen = new Set()) {
  if (memo.has(id)) return memo.get(id);
  seen.add(id);
  let best = [id];
  for (const p of pre.get(id)) {
    if (!set.has(p) || seen.has(p)) continue;
    const cand = [...longest(p, set, memo, seen), id];
    if (cand.length > best.length) best = cand;
  }
  seen.delete(id);
  memo.set(id, best);
  return best;
}

const tags = clusters.map((c, i) => ({ id: c.id, name: c.label, why: c.question, color: PALETTE[i % PALETTE.length] }));
const tagOrder = new Map(tags.map((t, i) => [t.id, i]));
const assign = {};
for (const t of topics) assign[t.id] = [t.domain];

const inDeg = new Map(nodes.map((n) => [n.id, 0]));
for (const e of dependencies) inDeg.set(e.prerequisiteId, (inDeg.get(e.prerequisiteId) || 0) + 1);

const collections = clusters.map((c, i) => {
  const set = inDomain.get(c.id);
  const list = nodes.filter((n) => set.has(n.id));
  const memo = new Map();
  let route = [];
  for (const n of list) { const r = longest(n.id, set, memo); if (r.length > route.length) route = r; }
  const entry = list.filter((n) => !pre.get(n.id).some((p) => set.has(p)))
    .sort((a, b) => b.centrality - a.centrality).slice(0, 3)
    .map((n) => ({ id: n.id, name: n.name, unlocks: nxt.get(n.id).length }));
  const goal = [...list].sort((a, b) => (inDeg.get(b.id) || 0) - (inDeg.get(a.id) || 0)).slice(0, 4)
    .map((n) => ({ id: n.id, name: n.name, level: n.level }));
  return {
    tagId: c.id, name: c.label, why: c.question, color: tags[i].color,
    size: list.length, primary: list.filter((n) => (n.tags || []).length === 1 && n.tags[0] === c.id).length,
    entry, goal,
    route: route.map((id, k) => ({ id, name: byId.get(id).name, level: byId.get(id).level,
      edgeFromPrev: k === 0 ? 'start' : (edges.find((e) => e[0] === id && e[1] === route[k - 1])?.[2] >= 7 ? 'skel' : 'cand') })),
  };
}).sort((a, b) => (tagOrder.get(a.tagId) - tagOrder.get(b.tagId)));

// 机器已判 / 留给人看
// 「机器已判」＝全量审核判成 yes 的边（模型逐条确认过「不懂前置就立不住」）
const edgeAuto = dependencies.filter((e) => e.audit === 'yes')
  .map((e) => ({ key: `${e.topicId}_${e.prerequisiteId}`, verdict: 'keep', conf: 0.9, why: e.reason }));
// 留给人看的＝模型自己跨源连出来的硬边：一端只在 Notion、另一端只在 Context/Harness。
// 同源内部的关系模型有原文可依；跨源的推断才是真需要人过一眼的。
const originOf = new Map(topics.map((t) => [t.id, new Set(t.origin)]));
const disjoint = (a, b) => [...a].every((x) => !b.has(x));
const edgeHuman = dependencies.filter((e) => (e.origin === 'llm' || e.origin === 'llm-strict') && e.strength === 'hard'
  && disjoint(originOf.get(e.topicId) || new Set(), originOf.get(e.prerequisiteId) || new Set()))
  .slice(0, 60).map((e) => `${e.topicId}_${e.prerequisiteId}`);

/* ── 验收方式分布 ───────────────────────────────────────── */
const dist = {};
for (const n of nodes) dist[n.k] = (dist[n.k] || 0) + 1;

/* ── meta ───────────────────────────────────────────────── */
const strong = edges.filter((e) => e[2] >= 7).length;
const top = [...nodes].sort((a, b) => b.centrality - a.centrality)[0];
const srcCount = SRC_KEYS.filter((k) => k !== 'multi' || nodes.some((n) => n.src === 'multi')).length;
const meta = {
  kicker: `Notion 概念库 × Context Engineering × Harness Engineering · 2026-09`,
  stats: `<b>${nodes.length}</b> 个概念 · <b>${edges.length}</b> 条依赖<br>`
    + `<b>${tags.length}</b> 条主题线 · 已标 <b>${nodes.filter((n) => n.tags.length).length}</b>/${nodes.length}<br>`
    + `<b>${strong}</b> 条骨架（实线）· <b>${edges.length - strong}</b> 条候选（虚线）<br>`
    + `<b>${Math.max(...nodes.map((n) => n.level)) + 1}</b> 层深度 · <b>${srcCount}</b> 个来源<br>`
    + `枢纽：${top ? top.name : '—'}`,
};

const payload = {
  generatedAt: new Date().toISOString(),
  nodes, edges,
  sources: SRC_KEYS.map((k) => ({ id: k, label: SRC[k].label, color: SRC[k].color })),
  meta,
  curation: { tags, assign, collections, edgeAuto, edgeHuman },
  kinds: { classes: {}, dist },
};
fs.writeFileSync(path.join(OUT, '05-shell-payload.json'), JSON.stringify(payload, null, 1));
console.log('✅ 壳 payload 就绪');
console.log(`   节点 ${nodes.length} · 边 ${edges.length}（骨架 ${strong}）· 主题线 ${tags.length}`);
console.log(`   验收分布 ${JSON.stringify(dist)}`);
console.log(`   策展：entry/goal ${collections.length} 组 · 机器已判 ${edgeAuto.length} · 留给人 ${edgeHuman.length}`);
console.log(`   ${path.relative(ROOT, path.join(OUT, '05-shell-payload.json'))}`);
