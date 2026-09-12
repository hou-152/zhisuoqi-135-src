#!/usr/bin/env node
// 概念地图 v2 · 第 3 步：LLM 富化（领域词表 → 逐条标注）。
//
// 每条概念要补的字段（对齐 os-taxonomy 的 topic 形状 + 本项目 135 的验收语义）：
//   domain        闭集领域 id（第一批调用先让模型定词表）
//   type          CONCEPTUAL / PROCEDURAL / REPRESENTATIONAL / LANGUAGE / META
//   stage         now / when-needed / deep-dive（学习时机）
//   desc          一句话定义（≤80 字，忠于原文，不编）
//   evidence[2]   掌握证据：能观察到的行为，不是"理解了"
//   ap            验收问句（含 {{name}} 占位）
//   k             验收方式：compute / judge / use / accept（分类层口径）
//
// 用法：node scripts/cm-enrich.mjs [--limit=N] [--concurrency=4]
// 产出：evidence/cm-260913/03-enriched.json（带缓存 evidence/.cm-enrich-cache.json）

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const NOTION_PAGES = path.join(ROOT, 'evidence', '概念源-260913', 'notion-pages');
const CACHE = path.join(ROOT, 'evidence', '.cm-enrich-cache.json');

const ARGV = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const LIMIT = ARGV.limit ? Number(ARGV.limit) : Infinity;
const CONC = Number(ARGV.concurrency || 4);
const BATCH = 20;

/* ── 凭证（不打印） ─────────────────────────────────────── */
for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE: BASE, LLM_API_KEY: KEY, LLM_MODEL: MODEL } = process.env;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证（.private/llm.env）'); process.exit(2); }

let cache = {};
try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch { cache = {}; }
const saveCache = () => fs.writeFileSync(CACHE, JSON.stringify(cache));
let tokens = 0;

async function askJson(system, user, { maxTokens = 8000, key = null } = {}) {
  if (key && cache[key]) return cache[key];
  let lastErr;
  // 踩过：这个模型 reasoning_tokens 会把 max_tokens 吃光，content 变空串、finish=length。
  // 所以预算起步就给足，截断就翻倍重试，并把真实占用写进错误里。
  for (const budget of [maxTokens, maxTokens * 2, 40000]) {
    const reply = await chatCompletion({
      base: BASE, key: KEY, model: MODEL, json: true, maxTokens: budget,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
    });
    if (!reply.ok) { lastErr = new Error(`HTTP ${reply.status}: ${reply.detail}`); continue; }
    tokens += reply.tokens || 0;
    const txt = (reply.content || '').trim();
    if (!txt) {
      const u = reply.data?.usage || {};
      lastErr = new Error(`空回复 finish=${reply.finish} completion=${u.completion_tokens} reasoning=${u.completion_tokens_details?.reasoning_tokens}`);
      await new Promise((r) => setTimeout(r, 900));
      continue;
    }
    try {
      const obj = JSON.parse(txt);
      if (key) { cache[key] = obj; saveCache(); }
      return obj;
    } catch (e) { lastErr = new Error(`JSON 解析失败：${txt.slice(0, 160)}`); }
  }
  throw lastErr;
}

/* ── 语料 ───────────────────────────────────────────────── */
const { nodes } = JSON.parse(fs.readFileSync(path.join(DIR, '02-nodes.json'), 'utf8'));
// Notion 页正文：优先给没有飞书正文的节点补上（## context / ## 费曼一下）
function notionBody(id) {
  const f = path.join(NOTION_PAGES, `${id}.md`);
  if (!fs.existsSync(f)) return null;
  const t = fs.readFileSync(f, 'utf8').replace(/^---[\s\S]*?\n---\n/, '');
  return t.trim();
}
function corpus(n) {
  const parts = [];
  if (n.gloss) parts.push(`补充说明：${n.gloss}`);
  for (const b of n.bodies.slice(0, 2)) parts.push(b.text);
  if (!parts.length) {
    // 飞书源里没有正文 → 用 Notion 页正文
    for (const s of n.sources) {
      if (s.type === 'notion' && s.id) { const t = notionBody(s.id); if (t) { parts.push(t); break; } }
    }
  }
  if (!parts.length && n.feynmans.length) parts.push(n.feynmans[0]);
  const text = parts.join('\n').replace(/\s+/g, ' ').slice(0, 700);
  return text;
}

const pool = nodes.slice(0, LIMIT === Infinity ? nodes.length : LIMIT);
console.log(`节点 ${pool.length}（共 ${nodes.length}）· Notion 正文可用 ${pool.filter((n) => n.sources.some((s) => s.type === 'notion' && fs.existsSync(path.join(NOTION_PAGES, `${s.id}.md`)))).length}`);

/* ── 第 1 步：领域词表 ─────────────────────────────────── */
const sample = pool.filter((_, i) => i % Math.max(1, Math.floor(pool.length / 220)) === 0)
  .map((n) => n.name + (n.origin.includes('notion') && n.origin.length === 1 ? '（Notion 概念库）' : '')).slice(0, 220);

const domainsObj = await askJson(
  '你是知识图谱的领域建模者。只输出 JSON。',
  `下面是一个「AI 时代怎么做事」概念库的 220 个概念名抽样（中文为主，部分带英文）。
请把它切成 16–22 个**互斥且合起来覆盖全部**的领域（domain），每个领域给：
- id：小写英文短横线 id
- label：中文标签（4–10 字）
- question：这个领域回答的那一个问题（中文，一句话，带问号）
- order：从"眼前最具体"到"最抽象/最长期"的排序号（1 开始）

要求：领域粒度要让每个领域大约有 30–120 个概念；不要出现"其他"这种兜底领域。

概念名抽样：
${sample.join('\n')}

输出 JSON：{"domains":[{"id":"...","label":"...","question":"...","order":1}]}`,
  { key: 'domains-v2', maxTokens: 24000 },
);
const DOMAINS = domainsObj.domains || [];
console.log(`领域词表 ${DOMAINS.length} 个：${DOMAINS.map((d) => d.label).join(' / ')}`);
const domainIds = DOMAINS.map((d) => d.id);

/* ── 第 2 步：批量标注 ─────────────────────────────────── */
const SYS = `你是概念地图的标注员。只输出 JSON，不解释。忠于给定材料，材料没说的事不编。`;
const domainLines = DOMAINS.map((d) => `${d.id} = ${d.label}（${d.question}）`).join('\n');

function batchPrompt(items) {
  return `领域闭集（domain 只能取这里的 id）：
${domainLines}

类型闭集（type）：
CONCEPTUAL＝观念/机制/现象/判断准则；PROCEDURAL＝可照做的步骤/流程/方法；REPRESENTATIONAL＝具名产品/文件/格式/公式/框架；LANGUAGE＝术语约定/命名/词汇；META＝元层面（怎么学、怎么判断、怎么组织知识）

学习时机（stage）：now＝不懂就没法往下；when-needed＝用得到时再学；deep-dive＝要专门研究才懂

验收方式（k）：compute＝能算/能跑出结果；judge＝能判断对错好坏；use＝能拿去用；accept＝只能认（事实、约定、他人经验）

对下面每个概念输出一条：
{"i":序号,"domain":"<id>","type":"<枚举>","stage":"<枚举>","k":"<枚举>",
 "desc":"一句话定义，≤80字，中文",
 "evidence":["可观察的掌握证据1","可观察的掌握证据2"],
 "ap":"一句验收问句，必须含 {{name}} 占位，≤60字"}

概念清单：
${items.map((it, i) => `[${i}] ${it.name}${it.nameEn ? `（${it.nameEn}）` : ''}${it.gloss ? ` — ${it.gloss}` : ''}\n材料：${it.text || '（无正文，仅名称）'}`).join('\n\n')}

输出 JSON：{"items":[…]}`;
}

const batches = [];
for (let i = 0; i < pool.length; i += BATCH) batches.push(pool.slice(i, i + BATCH));
console.log(`分批 ${batches.length} 组（每组 ${BATCH}）· 并发 ${CONC}`);

const results = new Array(pool.length).fill(null);
let cursor = 0, doneBatches = 0, failedBatches = [];
async function worker() {
  while (cursor < batches.length) {
    const bi = cursor++;
    const batch = batches[bi];
    const items = batch.map((n) => ({ name: n.name, nameEn: n.nameEn, gloss: n.gloss, text: corpus(n) }));
    const cacheKey = 'batch-v1-' + bi + '-' + batch.map((n) => n.id).join(',');
    try {
      const out = await askJson(SYS, batchPrompt(items), { key: cacheKey, maxTokens: 24000 });
      const list = out.items || out.results || [];
      const off = bi * BATCH;
      for (const r of list) {
        const idx = Number(r.i);
        if (!Number.isInteger(idx) || idx < 0 || idx >= batch.length) continue;
        results[off + idx] = r;
      }
      doneBatches++;
      if (doneBatches % 5 === 0) console.log(`   …${doneBatches}/${batches.length} 组（tokens ${tokens}）`);
    } catch (e) {
      failedBatches.push({ bi, err: String(e.message).slice(0, 200) });
      console.log(`   ⚠ 第 ${bi} 组失败：${String(e.message).slice(0, 120)}`);
    }
  }
}
await Promise.all(Array.from({ length: CONC }, worker));

/* ── 落盘 ───────────────────────────────────────────────── */
const enriched = pool.map((n, i) => {
  const r = results[i] || {};
  const domain = domainIds.includes(r.domain) ? r.domain : 'unclassified';
  return {
    ...n,
    domain,
    type: ['CONCEPTUAL', 'PROCEDURAL', 'REPRESENTATIONAL', 'LANGUAGE', 'META'].includes(r.type) ? r.type : 'CONCEPTUAL',
    stage: ['now', 'when-needed', 'deep-dive'].includes(r.stage) ? r.stage : 'when-needed',
    k: ['compute', 'judge', 'use', 'accept'].includes(r.k) ? r.k : 'judge',
    desc: typeof r.desc === 'string' ? r.desc.trim().slice(0, 160) : '',
    evidence: Array.isArray(r.evidence) ? r.evidence.filter((x) => typeof x === 'string').slice(0, 3) : [],
    ap: typeof r.ap === 'string' ? r.ap.trim().slice(0, 120) : '',
    annotated: !!results[i],
  };
});
const stat = {
  at: new Date().toISOString(), model: MODEL, tokens,
  nodes: enriched.length,
  annotated: enriched.filter((n) => n.annotated).length,
  failedBatches,
  byType: count(enriched, 'type'), byStage: count(enriched, 'stage'), byK: count(enriched, 'k'), byDomain: count(enriched, 'domain'),
};
function count(arr, k) { const o = {}; for (const x of arr) o[x[k]] = (o[x[k]] || 0) + 1; return o; }

fs.writeFileSync(path.join(DIR, '03-enriched.json'), JSON.stringify({ generatedAt: stat.at, domains: DOMAINS, stats: stat, nodes: enriched }, null, 1));
console.log('✅ 富化完成');
console.log(`   已标注 ${stat.annotated}/${stat.nodes} · tokens ${tokens} · 失败组 ${failedBatches.length}`);
console.log(`   类型 ${JSON.stringify(stat.byType)}`);
console.log(`   验收 ${JSON.stringify(stat.byK)}`);
console.log(`   领域 ${JSON.stringify(stat.byDomain)}`);
