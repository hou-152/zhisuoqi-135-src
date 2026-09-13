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
const rawRelations = load('relations.json').relations;
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

/* ── 来源索引 ───────────────────────────────────────────────
   壳里原来只带 5 个粗标签（notion / context / harness / neican / multi），
   概念卡上的「来源」是个死标签、点不动。这里补一张去重表 ＋ 每个概念的来源下标，
   前端据此渲染「来源」外链与「同源概念」，不需要额外请求。 */
const artKey = (s) => (s.article ? `A|${s.article}` : `U|${s.type || ''}|${s.url || ''}`);
const artTable = new Map();
for (const t of topics) {
  for (const s of (t.sources || [])) {
    const k = artKey(s);
    if (!artTable.has(k)) {
      artTable.set(k, { t: s.article || s.label || s.type || '', u: s.url || '', s: s.type || '', n: 0 });
    }
    artTable.get(k).n++;
  }
}
const articles = [...artTable.values()];
const artId = new Map([...artTable.keys()].map((k, i) => [k, i]));

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
    feynman: t.feynman, evidence: t.evidence,
    // 2026-09-13 补：这两个字段一直在 topics.json 里（sourceContext 919/936 · aliases 414/936），
    // 但从来没被搬进 payload —— 概念卡的「原文 context」和「别名」两栏因此一直是空的。
    sourceContext: t.sourceContext ? String(t.sourceContext).slice(0, 900) : '',
    aliases: t.aliases || [],
    // 验收问句里 922/936 条都留着没替换的 {{name}} 占位符（地图构建那步漏了），
    // 壳上会直接显示成「{{name}} 指什么？」——这里出线前替换成概念名。
    ap: t.assessmentPrompt ? String(t.assessmentPrompt).replace(/\{\{name\}\}/g, t.name) : t.assessmentPrompt,
    origin: t.origin, mentionCount: t.mentionCount,
    sa: [...new Set((t.sources || []).map((s) => artId.get(artKey(s))))]
      .filter((x) => x !== undefined).sort((a, b) => a - b),
  };
});

/* ── 关系层：只把已接受的语义关系接到壳，保留共现/拒绝边的统计 ── */
const RELATION_KINDS = new Set(['prerequisite', 'related-to', 'used-with', 'part-of', 'contrast']);
const nodeIds = new Set(nodes.map((n) => n.id));
const relationScore = (r) => (r.strength === 'hard' ? 2 : 1) + (r.note ? .25 : 0) + (r.evidence ? .1 : 0);
const relationKey = (r) => {
  if (r.kind === 'prerequisite') return `${r.kind}:${r.from}:${r.to}`;
  const [a, b] = [r.from, r.to].sort();
  return `${r.kind}:${a}:${b}`;
};
const relationMap = new Map();
for (const r of rawRelations) {
  if (!RELATION_KINDS.has(r.kind) || !nodeIds.has(r.from) || !nodeIds.has(r.to) || r.from === r.to) continue;
  const key = relationKey(r);
  if (!relationMap.has(key) || relationScore(r) > relationScore(relationMap.get(key))) relationMap.set(key, r);
}
const relations = [...relationMap.values()];
const rawByKind = {};
for (const r of rawRelations) rawByKind[r.kind] = (rawByKind[r.kind] || 0) + 1;
const relationStats = {
  visible: relations.length,
  hidden: (rawByKind['co-article'] || 0) + (rawByKind.rejected || 0),
  byKind: Object.fromEntries([...new Set([...Object.keys(rawByKind), ...[...RELATION_KINDS]])]
    .map((k) => [k, rawByKind[k] || 0])),
};

/* ── 边：hard→实线（7+），soft→虚线（<7） ────────────────── */
// 实线/虚线只看**审核后的强度**，不看来源：hard=实线，soft=虚线。
// （踩过：llm-strict 因为 origin 不等于 'llm' 被当成 curated，531 条 soft 全画成实线）
const VOTES = (e) => (e.strength === 'hard' ? 9 : 3);
const edges = dependencies.map((e) => [e.topicId, e.prerequisiteId, VOTES(e)]);

/* ── 关系视图坐标：确定性、构建时计算，避免浏览器首次打开卡住 ── */
function hash01(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 100000) / 100000;
}
function buildRelationLayout(list, rels) {
  const N = list.length;
  const index = new Map(list.map((n, i) => [n.id, i]));
  const pos = list.map((n, i) => {
    const a = 2.399963229728653 * i + hash01(n.id) * .28;
    const radius = .12 + .78 * Math.sqrt((i + .5) / Math.max(1, N));
    return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
  });
  const links = rels.map((r) => [index.get(r.from), index.get(r.to)]).filter(([a, b]) => a !== undefined && b !== undefined);
  const fx = new Float64Array(N), fy = new Float64Array(N);
  for (let iter = 0; iter < 110; iter++) {
    fx.fill(0); fy.fill(0);
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        let dx = pos[i].x - pos[j].x, dy = pos[i].y - pos[j].y;
        const d2 = Math.max(.0009, dx * dx + dy * dy);
        const f = .00016 / d2;
        dx *= f; dy *= f;
        fx[i] += dx; fy[i] += dy; fx[j] -= dx; fy[j] -= dy;
      }
    }
    for (const [a, b] of links) {
      let dx = pos[b].x - pos[a].x, dy = pos[b].y - pos[a].y;
      const d = Math.max(.001, Math.hypot(dx, dy));
      const f = (d - .18) * .010;
      dx = dx / d * f; dy = dy / d * f;
      fx[a] += dx; fy[a] += dy; fx[b] -= dx; fy[b] -= dy;
    }
    const damp = .72 * (1 - iter / 180);
    for (let i = 0; i < N; i++) {
      fx[i] -= pos[i].x * .003; fy[i] -= pos[i].y * .003;
      const dx = Math.max(-.035, Math.min(.035, fx[i] * damp));
      const dy = Math.max(-.035, Math.min(.035, fy[i] * damp));
      pos[i].x += dx; pos[i].y += dy;
    }
  }
  const minX = Math.min(...pos.map((p) => p.x)), maxX = Math.max(...pos.map((p) => p.x));
  const minY = Math.min(...pos.map((p) => p.y)), maxY = Math.max(...pos.map((p) => p.y));
  const span = Math.max(.001, maxX - minX, maxY - minY);
  const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2;
  for (const p of pos) { p.x = (p.x - midX) / span * 1.82; p.y = (p.y - midY) / span * 1.82; }
  return new Map(list.map((n, i) => [n.id, { rx: Number(pos[i].x.toFixed(5)), ry: Number(pos[i].y.toFixed(5)) }]));
}
const relationLayout = buildRelationLayout(nodes, relations);
for (const n of nodes) Object.assign(n, relationLayout.get(n.id));

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

/* ── 路线层：人工策展的前置路径（2026-09-13 加，独立于概念图谱） ──────
   PLAN §7 / HANDOFF §六：路线是**单独一份配置**，顺序不写回 topics.json / dependencies.json。
   这里把真实概念名、真实 hard/soft 前置理由、真实相关关系解析进 payload，壳只负责渲染——
   壳里不再抄一套判定逻辑，也就不会出现「页面上说的前置」和地图对不上。
   关系四分类（HANDOFF §五，数据没有 support/related 统一字段时按现有字段映射）：
     hard    ← dependencies.strength === 'hard'
     soft    ← dependencies.strength !== 'hard'
     support ← 概念的来源/原文与掌握证据（就是卡上已有的「来源」与「深看」）
     related ← relations 里除 prerequisite 外的边（相关 / 一起使用 / 组成 / 对照）
   校验：node scripts/paths-validate.mjs（ID 是否存在、预算、分支有没有理由）。 */
const ROUTE_FILE = path.join(ROOT, 'evidence', 'paths-260913', 'routes.json');
const domainLabel = (id) => (clusters.find((c) => c.id === id) || {}).label || id;
function wireRoutes() {
  if (!fs.existsSync(ROUTE_FILE)) {
    console.warn('⚠ 缺 evidence/paths-260913/routes.json —— 路径视图会是空的');
    return { source: '', routes: [] };
  }
  const cfg = JSON.parse(fs.readFileSync(ROUTE_FILE, 'utf8'));
  const depOf = (id) => dependencies.filter((e) => e.topicId === id);
  const relOf = (id) => relations.filter((r) => r.from === id || r.to === id);
  const brief = (e) => ({ id: e.prerequisiteId, name: byId.get(e.prerequisiteId).name,
    strength: e.strength, reason: e.reason || '' });
  const relBrief = (r, id) => {
    const other = byId.get(r.from === id ? r.to : r.from);
    return { id: other.id, name: other.name, kind: r.kind, strength: r.strength || '',
      note: r.note || r.evidence || '' };
  };
  const routes = (cfg.routes || []).map((rt) => {
    const steps = (rt.steps || []).map((s) => {
      const n = byId.get(s.conceptId);
      const dep = depOf(s.conceptId);
      const rel = relOf(s.conceptId).filter((r) => r.kind !== 'prerequisite');
      const declared = s.prereq ? s.prereq.conceptId : null;
      const edge = declared ? dep.find((e) => e.prerequisiteId === declared) : null;
      return {
        conceptId: s.conceptId, order: s.order, type: s.type || 'main', why: s.why || '',
        name: n.name, nameEn: n.nameEn || '', gloss: n.gloss,
        domain: n.tags[0], domainLabel: domainLabel(n.tags[0]), level: n.level, k: n.k, kwhy: n.kwhy,
        prereq: declared ? {
          id: declared, name: byId.get(declared).name,
          // 地图里有这条边 → 用地图的强度与理由；没有 → 就是人工确认的路线前置（basis: route）
          basis: edge ? edge.strength : (s.prereq.basis || 'route'),
          reason: (edge && edge.reason) || s.prereq.reason || '',
        } : null,
        fallback: s.fallback ? { id: s.fallback.conceptId, name: byId.get(s.fallback.conceptId).name,
          reason: s.fallback.reason || '' } : null,
        mapHard: dep.filter((e) => e.strength === 'hard').map(brief),
        mapSoft: dep.filter((e) => e.strength !== 'hard').map(brief),
        related: rel.slice(0, 8).map((r) => relBrief(r, s.conceptId)),
        relatedCount: rel.length,
        support: { sources: (n.sa || []).length, evidence: (n.evidence || []).length },
      };
    });
    const branches = (rt.branches || []).map((b) => ({
      after: b.after, question: b.question || '接下来你更关心什么？',
      options: (b.options || []).map((o) => ({ id: o.conceptId, name: byId.get(o.conceptId).name,
        role: o.role || 'branch', reason: o.reason || '' })),
    }));
    return {
      routeId: rt.routeId, title: rt.title, entryQuestion: rt.entryQuestion, target: rt.target,
      stopCondition: rt.stopCondition || '', topicId: rt.topicId, topicName: domainLabel(rt.topicId),
      version: rt.version || cfg.version, curator: rt.curator || cfg.curator || 'human',
      steps, branches,
    };
  });
  console.log(`路线：${routes.length} 条 · ` + routes.map((r) => `${r.title}(${r.steps.length} 步/主题 ${r.topicName})`).join(' · '));
  for (const r of routes) {
    const miss = r.steps.filter((s) => !s.prereq && s.order > 1).length;
    if (miss) console.warn(`  ⚠ ${r.routeId}：${miss} 个非首步没有前置声明`);
  }
  return { source: path.relative(ROOT, ROUTE_FILE), version: cfg.version, routes };
}

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

const routeLayer = wireRoutes();

const payload = {
  generatedAt: new Date().toISOString(),
  nodes, edges, relations, relationStats, articles,
  sources: SRC_KEYS.map((k) => ({ id: k, label: SRC[k].label, color: SRC[k].color })),
  meta,
  curation: { tags, assign, collections, edgeAuto, edgeHuman },
  kinds: { classes: {}, dist },
  routes: routeLayer,
};
fs.writeFileSync(path.join(OUT, '05-shell-payload.json'), JSON.stringify(payload, null, 1));
console.log('✅ 壳 payload 就绪');
console.log(`   节点 ${nodes.length} · 边 ${edges.length}（骨架 ${strong}）· 主题线 ${tags.length}`);
console.log(`   验收分布 ${JSON.stringify(dist)}`);
console.log(`   策展：entry/goal ${collections.length} 组 · 机器已判 ${edgeAuto.length} · 留给人 ${edgeHuman.length}`);
console.log(`   路线：${routeLayer.routes.length} 条（${routeLayer.source || '缺配置'}）`);
console.log(`   ${path.relative(ROOT, path.join(OUT, '05-shell-payload.json'))}`);
