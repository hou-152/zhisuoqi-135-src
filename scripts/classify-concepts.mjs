#!/usr/bin/env node
// 概念分类：不问「这讲的是什么」，问「**这个概念该要求学习者做到什么，才算学会了**」。
//
// 起因（所有者 09-12 09:0x）：「概念分类一般吧，我觉得」
// 原分类是主题聚类（人机分工 / 智能体工作流 / …）——那是「这讲的是什么」，
// 任何模型都能吐一批，而且对学习没用：知道它属于哪条线，不告诉你该拿它干什么。
//
// 更要紧的是上一版有个真 bug：194 个概念用了**同一个验收标准**，
// 包括「第二次文艺复兴」这种没有机制可复述的世界观概念——那是在假考。
//
// 本脚本判的是**验收方式**，四选一：
//   compute 能算的 —— 有可检验的正确答案，复述机制
//   judge   能判的 —— 有判据无唯一解，要说自己的判据与代价
//   use     能用的 —— 具名工具/流程/框架，要给一个真用过的例子
//   accept  只能认的 —— 世界观/立场/比喻，**不设验收**（硬考就是假学习）
//
// 用法：node scripts/classify-concepts.mjs
// 输出：evidence/concept-classes-20260912.json

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';
import { parseConceptPool } from './lib/pool.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
const AXES = path.join(ROOT, 'evidence', 'axis-labels-20260912.json');
const OUT = path.join(ROOT, 'evidence', 'concept-classes-20260912.json');

for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const BASE = process.env.LLM_API_BASE, KEY = process.env.LLM_API_KEY, MODEL = process.env.LLM_MODEL;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证'); process.exit(2); }

const CACHE = path.join(ROOT, 'evidence', '.classify-cache.json');
let cache = {};
try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch (e) { cache = {}; }

async function jsonCached(system, user, maxTokens, cacheKey) {
  if (cache[cacheKey]) { console.log(`   （用缓存 ${cacheKey}）`); return cache[cacheKey]; }
  const reply = await chatCompletion({ base: BASE, key: KEY, model: MODEL,
    messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
    json: true, maxTokens });
  if (!reply.ok) throw new Error(`HTTP ${reply.status}: ${reply.detail}`);
  const d = reply.data;
  const txt = reply.content;
  if (!txt.trim()) throw new Error(`空回复：finish=${d.choices?.[0]?.finish_reason}，reasoning=${d.usage?.completion_tokens_details?.reasoning_tokens}`);
  const out = { obj: JSON.parse(txt), tokens: d.usage?.total_tokens ?? 0 };
  cache[cacheKey] = out;
  fs.writeFileSync(CACHE, JSON.stringify(cache));
  return out;
}

/* ── 概念池（与 build-shell.mjs 同序） ───────────────────── */
const md = fs.readFileSync(POOL, 'utf8');
const nodes = parseConceptPool(md).map(({ id, name, type, gloss }) =>
  ({ id, name, type, gloss }));
const axes = JSON.parse(fs.readFileSync(AXES, 'utf8'));
axes.rows.forEach((r, i) => { if (nodes[i]) { nodes[i].a = r.a; nodes[i].b = r.b; } });

const SYS = '你在给一份学习概念图谱定**验收方式**。输出必须是 json。';

const RULES = `任务：给**每一条**判一件事——**这个概念该要求学习者做到什么，才算学会了？**

四选一（k 只能是这四个字符串之一）：

- "compute" 能算的：有可检验的正确答案。公式、机制、事实、可复现的因果。
  过的方式：复述核心机制 + 不违反事实。
- "judge" 能判的：有判据，但没有唯一正确答案。该不该做某事、值不值、哪个更好。
  过的方式：说出**你自己的判据和代价**，而不是背出某个结论。
- "use" 能用的：一个具名的工具、流程、框架、公式——拿去做就有产出。
  过的方式：给一个**你真用它做过的具体例子**。
- "accept" 只能认的：世界观、立场、比喻、时代命名。**没有对错，也没有机制可复述。**
  **这一类不该被考。** 硬考就是假学习。
  过的方式：不设验收，只记「读过」。

硬要求：
1. **必须判完给出的每一条，一条不漏。**
2. "accept" 只给**真的没有可检验内容**的：作者的世界观、立场、命名、比喻。
   不要因为「它是个观点」就丢进去——**如果这个观点后面跟着一套判据，它是 judge。**
3. compute / judge 分不清时看一条：**有没有唯一正确答案**？有 → compute，没有 → judge。
4. use 与 compute 分不清时看一条：**它是不是一个能直接拿去用的具名东西**？是 → use。
5. 每条一句 why（12–28 字），说清**凭什么这么判**。why 里**不许出现 C01 这种编号**。

只输出这个 json（cls 的键必须正好是给出的那些 id）：
{"cls":{"C01":{"k":"accept","why":"…"},"C02":{"k":"compute","why":"…"}}}`;

// 分批：194 条一次给会把 max_tokens 吃光（实测在 C179 处被截断）。
const BATCH = 50;
const chunks = [];
for (let i = 0; i < nodes.length; i += BATCH) chunks.push(nodes.slice(i, i + BATCH));

const cls = {};
let tokens = 0;
for (let i = 0; i < chunks.length; i++) {
  const list = chunks[i].map(n => `${n.id} ｜ ${n.name} ｜ ${n.type} ｜ A${n.a} B${n.b} ｜ ${n.gloss}`).join('\n');
  const ask = `下面 ${chunks[i].length} 条概念抄自「AI 时代怎么做事」主题的文章。\n`
    + '每条给了：类型（概念型/工具型/事件型）、抽象层级 A（1 具体操作 → 5 世界观立场）、'
    + '理解门槛 B（1–5）、以及一句话它讲的是什么。\n\n'
    + list + '\n\n' + RULES;
  console.log(`  批 ${i + 1}/${chunks.length}（${chunks[i].length} 条）…`);
  const r = await jsonCached(SYS, ask, 16000, 'cls-b' + i);
  tokens += r.tokens;
  const got = r.obj.cls || r.obj.classes || r.obj;
  for (const n of chunks[i]) if (got[n.id]) cls[n.id] = got[n.id];
}

// 补跑漏掉的（一次一条也行，模型偶尔会跳）
const VALID = new Set(['compute', 'judge', 'use', 'accept']);
let missing = nodes.filter(n => !cls[n.id] || !VALID.has(cls[n.id].k));
if (missing.length) {
  console.log(`   ⚠ 漏 ${missing.length} 条，补跑…`);
  const list = missing.map(n => `${n.id} ｜ ${n.name} ｜ ${n.type} ｜ A${n.a} B${n.b} ｜ ${n.gloss}`).join('\n');
  const r2 = await jsonCached(SYS, `下面 ${missing.length} 条概念。\n\n${list}\n\n${RULES}`, 16000, 'cls-fill-' + missing.length);
  const got = r2.obj.cls || r2.obj.classes || r2.obj;
  for (const n of missing) if (got[n.id]) cls[n.id] = got[n.id];
  tokens += r2.tokens;
}

const bad = [];
for (const n of nodes) {
  const v = cls[n.id];
  if (!v || !VALID.has(v.k)) { bad.push(n.id); continue; }
  n.k = v.k; n.why = String(v.why || '').slice(0, 60);
}
if (bad.length) { console.error('❌ 仍有未分类或非法类别：' + bad.join(', ')); process.exit(3); }

/* ── 落盘 ───────────────────────────────────────────────── */
const dist = {};
for (const n of nodes) dist[n.k] = (dist[n.k] || 0) + 1;
const out = {
  meta: { generatedAt: new Date().toISOString(), model: MODEL, tokens,
          total: nodes.length, dist },
  classes: {
    compute: { name: '能算的', color: '#5B8FF9' },
    judge:   { name: '能判的', color: '#F6BD16' },
    use:     { name: '能用的', color: '#61DDAA' },
    accept:  { name: '只能认的', color: '#9661BC' },
  },
  assign: Object.fromEntries(nodes.map(n => [n.id, { k: n.k, why: n.why }])),
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));

const N = { compute: '能算的', judge: '能判的', use: '能用的', accept: '只能认的' };
console.log('分类结果：');
for (const k of ['compute', 'judge', 'use', 'accept']) {
  console.log(`  ${N[k].padEnd(5, '　')} ${String(dist[k] || 0).padStart(3)} 条`);
  for (const n of nodes.filter(x => x.k === k).slice(0, 3)) console.log(`        · ${n.name} —— ${n.why}`);
}
console.log(`输出 ${path.relative(ROOT, OUT)}  (${tokens} tokens)`);
