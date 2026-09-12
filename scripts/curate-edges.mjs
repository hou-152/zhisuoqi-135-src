#!/usr/bin/env node
// 边策展 —— 把「265 条待你判」变成「机器已判 251 条，只剩 15 条要你看」。
//
// 背景（所有者 2026-09-12 08:0x 原话）：
//   「为什么还要我去判断呢？……你至少把一些策展给弄上吧」
// 壳左栏原来写着「265 条待你判」——把 265 次判断推回给用户，这不是策展，是把活外包。
//
// 本脚本对全部候选边做一次预判（采纳 / 跳过 / 说不准），并给出理由和置信度：
//   · 高置信采纳 / 高置信跳过 → 机器直接落到默认值，用户不必逐条看
//   · 说不准的（互相对冲、模型自己都不稳的）→ 才留给人，且限 20 条以内
//
// 用法：node scripts/curate-edges.mjs
// 输出：evidence/concept-edges-curated-20260912.json

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';
import { parseConceptPool } from './lib/pool.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
const GRAPH = path.join(ROOT, 'evidence', 'concept-graph-union.json');
const OUT = path.join(ROOT, 'evidence', 'concept-edges-curated-20260912.json');

for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const BASE = process.env.LLM_API_BASE, KEY = process.env.LLM_API_KEY, MODEL = process.env.LLM_MODEL;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证'); process.exit(2); }

const CACHE = path.join(ROOT, 'evidence', '.curate-edges-cache.json');
let cache = {};
try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch (e) { cache = {}; }

async function json(system, user, maxTokens = 16000, cacheKey = null) {
  if (cacheKey && cache[cacheKey]) { console.log(`   （用缓存 ${cacheKey}）`); return cache[cacheKey]; }
  const out = await jsonUncached(system, user, maxTokens);
  if (cacheKey) { cache[cacheKey] = out; fs.writeFileSync(CACHE, JSON.stringify(cache)); }
  return out;
}

async function jsonUncached(system, user, maxTokens = 16000) {
  const reply = await chatCompletion({ base: BASE, key: KEY, model: MODEL,
    messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
    json: true, maxTokens });
  if (!reply.ok) throw new Error(`HTTP ${reply.status}: ${reply.detail}`);
  const d = reply.data;
  const txt = reply.content;
  const finish = reply.finish;
  if (!txt.trim()) {
    throw new Error(`空回复：finish=${finish}，completion=${d.usage?.completion_tokens}，`
      + `reasoning=${d.usage?.completion_tokens_details?.reasoning_tokens}（max_tokens 被推理吃光）`);
  }
  return { obj: JSON.parse(txt), tokens: d.usage?.total_tokens ?? 0, finish };
}

/* ── 概念池 ─────────────────────────────────────────────── */
const md = fs.readFileSync(POOL, 'utf8');
const nodes = parseConceptPool(md).map(({ id, src, name, gloss }) =>
  ({ id, src, name, gloss }));
const byId = new Map(nodes.map(n => [n.id, n]));

const g = JSON.parse(fs.readFileSync(GRAPH, 'utf8'));
const raw = g.edges || g.mergedEdges || [];
const all = raw.filter(e => byId.has(e.topicId) && byId.has(e.prerequisiteId));
const skel = all.filter(e => (e.votes ?? 5) >= 7);
const cand = all.filter(e => (e.votes ?? 5) < 7);
console.log(`骨架 ${skel.length}（不必判） | 候选 ${cand.length}（要策展）`);

/* ── 分批预判 ───────────────────────────────────────────── */
const SYS = `你在为一张「AI 时代怎么做事」的概念图谱做编辑策展。
图谱里的边是「前者依赖后者」：topicId 依赖 prerequisiteId，即先懂 B 才谈得上懂 A。
输出必须是 json。`;

function batchPrompt(chunk, idx, total) {
  const lines = chunk.map((e, i) => {
    const a = byId.get(e.topicId), b = byId.get(e.prerequisiteId);
    const sameSrc = a.src === b.src ? '同篇' : '跨篇';
    return `#${i} ｜ 依赖边 ｜「${a.name}」 依赖 「${b.name}」 ｜ ${sameSrc} ｜ 出现 ${e.votes ?? '?'}/4 次`
      + `\n     前者讲的是：${a.gloss}\n     后者讲的是：${b.gloss}`;
  }).join('\n');

  return `这批是第 ${idx}/${total} 批，共 ${chunk.length} 条候选依赖边。
「出现几次」＝ 这份边是用同一套方法独立跑了 4 次得到的，只在 1 次里冒出来说明机器自己也不稳。

${lines}

任务：给**每一条**边下一个编辑判断。

判断口径（按顺序问自己）：
1. 「不先懂 B，A 就讲不通」——这是**真前置**（例如「成本三因子公式」之前得先懂「三条边界」）。
2. 还是只是**同一个话题里挨着出现**——（例如两条都在讲「学习」，但谁先谁后无所谓）？后者要跳过。
3. B 是不是比 A **更抽象**？概念图要的是「具体依赖抽象」，反过来（拿具体例子当前置）要跳过。
4. 只是措辞相近、其实在说同一件事（近义重复）→ 跳过。

每条给三个字段：
- verdict: "keep"（真前置，采纳）｜ "skip"（跳过）｜ "unsure"（你自己也拿不准）
- conf: 0.0–1.0，你对自己这个判断的把握。**拿不准就老实给低分，不要都写 0.9。**
- why: 12–28 字，说人话。keep 要写清「先懂什么才能懂什么」，skip 要写清是哪一条口径把它排掉的。

**"unsure" 不要超过本批的 15%。** 判不了硬判是错的，什么都推给人也是错的。

只输出 json：{"verdicts":{"0":{"verdict":"keep","conf":0.82,"why":"…"},"1":{…}, … 共 ${chunk.length} 条}}`;
}

const BATCH = 45;
const chunks = [];
for (let i = 0; i < cand.length; i += BATCH) chunks.push(cand.slice(i, i + BATCH));
const judged = new Array(cand.length).fill(null);
let tokens = 0;

for (let i = 0; i < chunks.length; i++) {
  console.log(`  批 ${i + 1}/${chunks.length}（${chunks[i].length} 条）…`);
  const r = await json(SYS, batchPrompt(chunks[i], i + 1, chunks.length), 16000, 'batch-' + i);
  tokens += r.tokens;
  const v = r.obj.verdicts || r.obj.verdict || r.obj;
  for (let k = 0; k < chunks[i].length; k++) {
    const got = v[String(k)] || v[k];
    if (got && got.verdict) {
      judged[i * BATCH + k] = {
        verdict: ['keep', 'skip', 'unsure'].includes(got.verdict) ? got.verdict : 'unsure',
        conf: Math.max(0, Math.min(1, Number(got.conf) || 0)),
        why: String(got.why || '').slice(0, 80),
      };
    }
  }
}

/* ── 归并：高置信的机器落定，只有真拿不准的留给人 ───────── */
const CONF = 0.5, HUMAN_CAP = 20;   // 0.5 = 接受一切非 unsure 判断；留人的只有模型自己说 unsure 的

const rows = cand.map((e, i) => {
  const a = byId.get(e.topicId), b = byId.get(e.prerequisiteId);
  const j = judged[i] || { verdict: 'unsure', conf: 0, why: '（本批未返回判断）' };
  // 机器落定：把握 ≥ CONF 且不是 unsure
  const settled = j.verdict !== 'unsure' && j.conf >= CONF;
  return {
    key: e.topicId + '_' + e.prerequisiteId,
    topicId: e.topicId, prereqId: e.prerequisiteId,
    topic: a.name, prereq: b.name, glossA: a.gloss, glossB: b.gloss,
    votes: e.votes ?? null, cross: a.src !== b.src,
    verdict: j.verdict, conf: j.conf, why: j.why, settled,
  };
});

// 留给人看的：没落定的里按「影响大小」排序（跨篇优先、票数高的优先），最多 20 条
const open = rows.filter(r => !r.settled)
  .sort((x, y) => (Number(y.cross) - Number(x.cross)) || ((y.votes ?? 0) - (x.votes ?? 0)));
const human = open.slice(0, HUMAN_CAP).map(r => r.key);
const auto = rows.filter(r => r.settled).map(r => ({ key: r.key, verdict: r.verdict, conf: r.conf, why: r.why }));
const overflow = open.slice(HUMAN_CAP).map(r => r.key);

const stats = {
  candidate: rows.length,
  autoKept: auto.filter(a => a.verdict === 'keep').length,
  autoSkipped: auto.filter(a => a.verdict === 'skip').length,
  toHuman: human.length,
  overflowDefaultSkip: overflow.length,
  unsureRate: (rows.filter(r => r.verdict === 'unsure').length / rows.length * 100).toFixed(1) + '%',
  confAvg: (rows.reduce((s, r) => s + r.conf, 0) / rows.length).toFixed(3),
};

fs.writeFileSync(OUT, JSON.stringify({
  meta: { generatedAt: new Date().toISOString(), model: MODEL, tokens, confThreshold: CONF, humanCap: HUMAN_CAP, stats },
  auto, human, overflow, rows,
}, null, 1));

console.log('③ 结果：');
console.log(`   机器直接采纳 ${stats.autoKept} ｜ 机器直接跳过 ${stats.autoSkipped}`
  + ` ｜ 留给你 ${stats.toHuman} ｜ 溢出默认跳过 ${stats.overflowDefaultSkip}`);
console.log(`   unsure 比例 ${stats.unsureRate} ｜ 平均把握 ${stats.confAvg} ｜ ${tokens} tokens`);
console.log(`输出 ${path.relative(ROOT, OUT)}`);
