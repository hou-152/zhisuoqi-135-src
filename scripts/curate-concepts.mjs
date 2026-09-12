#!/usr/bin/env node
// 全量策展 —— 给 194 个概念打主题标签 + 生成策展集（路线），让「待你判」变成「已策展」。
//
// 背景（所有者 2026-09-12 08:0x 原话）：
//   「你有没有去全量铺开嘛？为什么还要我去判断呢？你不说把这些标签全部都弄上，
//     但你至少把一些策展给弄上吧」
// 现状：壳里横轴是「12 个来源分列」——那是权宜，不是策展。
//       左栏写着「265 条待你判」——把判断推回给用户，正是被骂的那件事。
//
// 本脚本做三件事：
//   ① 词表：让模型从 194 个概念里提 10 个主题标签（每个带一句「为什么值得走这条线」）
//   ② 打标：194 个概念全部多标签（1–3 个，闭集）
//   ③ 策展：每个标签一条路线 —— 入口（低门槛）→ 目标（高抽象），
//           路线用真实依赖边串，不由模型编。
//
// 用法：node scripts/curate-concepts.mjs
// 输出：evidence/concept-curation-20260912.json

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
const AXES = path.join(ROOT, 'evidence', 'axis-labels-20260912.json');
const GRAPH = path.join(ROOT, 'evidence', 'concept-graph-union.json');
const OUT = path.join(ROOT, 'evidence', 'concept-curation-20260912.json');

/* ── 凭证（不打印） ─────────────────────────────────────── */
for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const BASE = process.env.LLM_API_BASE, KEY = process.env.LLM_API_KEY, MODEL = process.env.LLM_MODEL;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证（.private/llm.env）'); process.exit(2); }

const CACHE = path.join(ROOT, 'evidence', '.curate-cache.json');
let cache = {};
try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch (e) { cache = {}; }
const saveCache = () => fs.writeFileSync(CACHE, JSON.stringify(cache));

async function json(system, user, maxTokens = 16000, cacheKey = null) {
  if (cacheKey && cache[cacheKey]) {
    console.log(`   （用缓存 ${cacheKey}，省一次调用）`);
    return cache[cacheKey];
  }
  const out = await jsonUncached(system, user, maxTokens);
  if (cacheKey) { cache[cacheKey] = out; saveCache(); }
  return out;
}

async function jsonUncached(system, user, maxTokens = 16000) {
  const res = await fetch(`${BASE.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: MODEL, temperature: 0, max_tokens: maxTokens,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const d = await res.json();
  const txt = d.choices?.[0]?.message?.content || '';
  const finish = d.choices?.[0]?.finish_reason;
  // 踩过：max_tokens 被 reasoning_tokens 吃光时 content 是空串，
  // 老写法 `|| '{}'` 会把它伪装成「模型返回了空对象」，看不出真因。这里显式报错。
  if (!txt.trim()) {
    throw new Error(`空回复：finish=${finish}，completion=${d.usage?.completion_tokens}，`
      + `reasoning=${d.usage?.completion_tokens_details?.reasoning_tokens}`);
  }
  try {
    return { obj: JSON.parse(txt), tokens: d.usage?.total_tokens ?? 0, finish };
  } catch (e) {
    fs.writeFileSync(path.join(ROOT, 'evidence', '_curate-raw-error.txt'), txt);
    throw new Error(`JSON 解析失败（finish=${finish}，原文已存 evidence/_curate-raw-error.txt）: ${txt.slice(0, 200)}`);
  }
}
// 模型偶尔不用我们要求的键名——按别名捞，没捞到就把原样落盘备查（不猜、不假装成功）。
function pick(obj, keys, tag) {
  for (const k of keys) if (obj && obj[k] != null) return obj[k];
  fs.writeFileSync(path.join(ROOT, 'evidence', `_curate-raw-${tag}.json`), JSON.stringify(obj, null, 1));
  return null;
}

/* ── 读概念池（与 build-shell.mjs 同序，C0n ↔ N00n） ─────── */
const md = fs.readFileSync(POOL, 'utf8');
const nodes = [];
{
  let art = null;
  for (const L of md.split('\n')) {
    if (L.startsWith('## 第二部分')) break;
    const h = L.match(/^### (S\d+)\s+(.+?)\s*｜/);
    if (h) { art = h[1]; continue; }
    if (!art || !L.startsWith('| ') || L.startsWith('| 概念原文') || L.startsWith('|---')) continue;
    const c = L.split('|').map(s => s.trim());
    if (c.length < 5 || !c[1]) continue;
    nodes.push({ id: 'C' + String(nodes.length + 1).padStart(2, '0'), src: art, name: c[1], type: c[2], gloss: c[4] });
  }
}

/* ── 合并抽象层级 A / 理解门槛 B ─────────────────────────── */
const axes = JSON.parse(fs.readFileSync(AXES, 'utf8'));
axes.rows.forEach((r, i) => { if (nodes[i]) { nodes[i].a = r.a; nodes[i].b = r.b; } });

/* ── 合并依赖边，算 level ───────────────────────────────── */
const g = JSON.parse(fs.readFileSync(GRAPH, 'utf8'));
const rawEdges = g.edges || g.mergedEdges || [];
const byId = new Map(nodes.map(n => [n.id, n]));
const edges = rawEdges.filter(e => byId.has(e.topicId) && byId.has(e.prerequisiteId))
  .map(e => [e.topicId, e.prerequisiteId, e.votes ?? 5]);
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
for (const n of nodes) n.level = Math.max(0, dep(n.id, new Set()));

console.log(`概念 ${nodes.length} | 边 ${edges.length}`);

/* ── ① 词表 ─────────────────────────────────────────────── */
const list = nodes.map(n => `${n.id} ｜ ${n.name} ｜ ${n.gloss}`).join('\n');

const SYS1 = `你在为一份「AI 时代怎么做事」的概念图谱做编辑策展。
输出必须是 json。`;
const ASK1 = `下面是 ${nodes.length} 条概念（逐字抄自 12 篇 AI 内参文章的小标题），每条给了「它讲的是什么」。

${list}

任务：设计一套**主题标签词表**，把这 ${nodes.length} 条概念分成若干条「值得单独走一遍的线」。

硬要求：
1. 出 10 条标签，不多不少。
2. 每条标签名 **2–6 个汉字**，是学习者会挂在嘴边的话（例如「人机分工」「判断力」「一人企业」），
   不要用「认知升级」这类空洞词，不要用英文，不要带标点。
3. 10 条标签要**互斥性尽量高、合起来覆盖尽量全**：每条至少能装 12 条概念，最多不超过 40 条。
4. 每条标签给一句 why：**为什么这条线值得单独走一遍**（25–45 字，说人话，不喊口号，不用「赋能」「闭环」「生态」这类词）。
   **why 里绝对不许出现 C01、S3 这种编号**——那是内部 id，读者看不懂。
5. 每条标签给一个 color：从这 10 个里挑，不要重复：
   #5B8FF9 #61DDAA #F6BD16 #7262FD #78D3F8 #9661BC #F6903D #008685 #F08BB4 #7C8CE0

只输出这个 json：
{"tags":[{"id":"T1","name":"…","why":"…","color":"#……"}, … 共 10 条]}`;

console.log('① 让模型提词表…');
const r1 = await json(SYS1, ASK1, 16000, 'vocab-v1');
const tags = pick(r1.obj, ['tags', '标签', 'labels', 'themes'], 'vocab') || [];
if (!Array.isArray(tags) || tags.length !== 10) { console.error('词表条数不对：', Array.isArray(tags) ? tags.length : typeof tags, '（原样见 evidence/_curate-raw-vocab.json）'); process.exit(3); }
console.log('   词表：' + tags.map(t => t.name).join(' / ') + `  (${r1.tokens} tokens)`);

/* ── ② 全量打标 ─────────────────────────────────────────── */
const vocab = tags.map(t => `${t.id} = ${t.name}`).join('\n');
const SYS2 = `你在给概念图谱打主题标签。输出必须是 json。`;
const ASK2 = `标签词表（闭集，只能用这 10 个 id）：
${vocab}

概念清单：
${list}

任务：给**每一条**概念打标。

硬要求：
1. **必须覆盖全部 ${nodes.length} 条，一条不漏。** 漏一条就算失败。
2. 每条打 **1–3 个**标签，按相关度从高到低排。第一条是主标签。
3. 只能用在上面词表里的 id，不许发明新 id、不许用标签名代替 id。
4. 一条概念如果横跨两条线，就打两个——不要为了均匀而硬凑。

只输出这个 json（assign 的键必须正好是那 ${nodes.length} 个 id）：
{"assign":{"C01":["T1","T3"],"C02":["T2"], …}}`;

console.log('② 全量打标…');
const r2 = await json(SYS2, ASK2, 16000, 'assign-v1');
const assign = pick(r2.obj, ['assign', 'assignment', 'labels', 'map', 'tags'], 'assign') || {};
const valid = new Set(tags.map(t => t.id));
const missing = nodes.filter(n => !assign[n.id]);
// 兜底：模型偶发漏条，按主标签词表补一次；仍漏则记为未分类（照实记，不假装）
if (missing.length) {
  console.log(`   ⚠ 漏 ${missing.length} 条，补跑…`);
  const ASK2b = `${vocab}\n\n只给这些概念打标（同上面规则，1–3 个 id）：\n`
    + missing.map(n => `${n.id} ｜ ${n.name} ｜ ${n.gloss}`).join('\n')
    + `\n\n只输出 json：{"assign":{"C07":["T1"], …}}`;
  const r2b = await json(SYS2, ASK2b, 16000, 'assign-fill-' + missing.length);
  Object.assign(assign, r2b.obj.assign || {});
}
let clean = 0, dropped = 0, stillMissing = [];
for (const n of nodes) {
  const a = (assign[n.id] || []).filter(x => valid.has(x)).slice(0, 3);
  if (!a.length) { stillMissing.push(n.id); continue; }
  if (a.length !== (assign[n.id] || []).length) dropped++;
  assign[n.id] = a; clean++;
}
console.log(`   打标 ${clean}/${nodes.length}${dropped ? `（丢弃非法 id ${dropped} 条）` : ''}`
  + (stillMissing.length ? ` ⚠ 仍未分类 ${stillMissing.length}: ${stillMissing.join(',')}` : '') + `  (${r2.tokens} tokens)`);

/* ── ③ 策展：每个标签一条真实依赖路线 ───────────────────── */
// 入口 = 组内 level 最低且门槛 B 最低的 3 条；目标 = level 最高的 2 条。
// 路线 = 沿组内真实边从入口走到目标（最长可达）；走不通就只给「入口 → 目标」两跳，不编边。
const adj = new Map(nodes.map(n => [n.id, []]));
for (const [t, p] of edges) adj.get(p).push(t);          // p 是先修，t 是后继

function routeIn(groupIds, start, goals) {
  const inG = new Set(groupIds), goalSet = new Set(goals);
  let best = [start];
  const seen = new Set();
  (function walk(cur, path) {
    if (path.length > best.length) best = path.slice();
    if (goalSet.has(cur) && path.length >= 2) { if (path.length > best.length) best = path.slice(); return; }
    if (path.length > 8 || seen.has(cur)) return;
    seen.add(cur);
    for (const nx of (adj.get(cur) || [])) {
      if (!inG.has(nx) || path.includes(nx)) continue;
      path.push(nx); walk(nx, path); path.pop();
    }
    seen.delete(cur);
  })(start, [start]);
  return best;
}

// 入度 = 组内有多少条边指向它（＝要先懂几个别的）；出度 = 组内有多少条边从它出发（＝懂它能解锁几个）。
const inD = new Map(nodes.map(n => [n.id, 0])), outD = new Map(nodes.map(n => [n.id, 0]));
for (const [tt, pp] of edges) { inD.set(tt, (inD.get(tt) || 0) + 1); outD.set(pp, (outD.get(pp) || 0) + 1); }

const collections = tags.map(t => {
  const ids = nodes.filter(n => (assign[n.id] || []).includes(t.id));
  const inT = new Set(ids.map(x => x.id));
  const deg = id => {
    let i = 0, o = 0;
    for (const [tt, pp] of edges) {
      if (tt === id && inT.has(pp)) i++;
      if (pp === id && inT.has(tt)) o++;
    }
    return { i, o };
  };
  const d = new Map(ids.map(x => [x.id, deg(x.id)]));
  // 入口 = 组内没有前置（i===0）里解锁最多的 3 个；一个都没有就退回「层级最低、门槛最低」
  let pool = ids.filter(x => d.get(x.id).i === 0);
  if (pool.length < 3) pool = ids;
  const entry = [...pool].sort((x, y) =>
      (d.get(y.id).o - d.get(x.id).o)
   || ((x.level - y.level))
   || ((x.b ?? 3) - (y.b ?? 3))).slice(0, 3);
  // 目标 = 组内被依赖最多（i 最大）、且处在链条末端（o 最小）的 2 个
  const goal = [...ids].sort((x, y) =>
      (d.get(y.id).i - d.get(x.id).i)
   || (d.get(x.id).o - d.get(y.id).o)
   || ((y.level - x.level))).slice(0, 2);
  // 从最强的入口出发找一条最长可达路线
  let route = [];
  for (const e of entry) {
    const r = routeIn(ids.map(n => n.id), e.id, goal.map(n => n.id));
    if (r.length > route.length) route = r;
  }
  const skeleton = new Set(edges.filter(e => e[2] >= 7).map(e => e[0] + '>' + e[1]));
  return {
    tagId: t.id, name: t.name, why: t.why, color: t.color,
    size: ids.length,
    primary: nodes.filter(x => (assign[x.id] || [])[0] === t.id).length,
    entry: entry.map(n => ({ id: n.id, name: n.name, level: n.level, b: n.b ?? null, unlocks: d.get(n.id).o })),
    goal: goal.map(n => ({ id: n.id, name: n.name, level: n.level, a: n.a ?? null, needs: d.get(n.id).i })),
    route: route.map((id, i, arr) => ({
      id, name: byId.get(id).name, level: byId.get(id).level,
      edgeFromPrev: i === 0 ? null : (skeleton.has(arr[i - 1] + '>' + id) ? 'skel' : 'cand'),
    })),
  };
});

/* ── 统计 ───────────────────────────────────────────────── */
const used = new Map(tags.map(t => [t.id, 0]));
for (const n of nodes) for (const x of (assign[n.id] || [])) used.set(x, (used.get(x) || 0) + 1);
const multi = nodes.filter(n => (assign[n.id] || []).length > 1).length;
const levelDist = {};
for (const n of nodes) levelDist[n.level] = (levelDist[n.level] || 0) + 1;

const out = {
  meta: {
    generatedAt: new Date().toISOString(),
    model: MODEL,
    concepts: nodes.length,
    edges: edges.length,
    multiLabel: multi,
    unclassified: stillMissing,
    tokens: { vocab: r1.tokens, assign: r2.tokens },
    perTag: Object.fromEntries([...used].map(([k, v]) => [tags.find(t => t.id === k).name, v])),
    levelDist,
  },
  tags, assign, collections,
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));

console.log('③ 策展集：');
for (const c of collections) {
  console.log(`   ${c.name.padEnd(6, '　')} ${String(c.size).padStart(3)} 条 · 入口 ${c.entry.map(e => e.name).join('、')}`
    + ` · 路线 ${c.route.length} 跳`);
}
console.log(`多标签 ${multi} / ${nodes.length} | 输出 ${path.relative(ROOT, OUT)}`);
