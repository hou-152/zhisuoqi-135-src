#!/usr/bin/env node
// 概念网络图 · 生成器（2026-09-15）
//
// 规格：docs/概念网络图-产出规格-20260915.md（R1—R8 是硬规则）
// 产物：knowledge/概念网络-260915/<unitId>.json
//
// 两种模式：
//   --chapters            六章路线图（边来自 chapters.json 的 narrative，已是逐字引用；模型只写短语标签）
//   --articles <期号>      内参单篇（模型给分层/边/标签，引用只能从原文句子索引里挑 ID，机器填原文）
//
// 纪律（照仓库既有做法）：**模型只回 ID 与短语，原文由机器从索引里填**。
//   所以 R2「引用必须逐字来自原文」在结构上必然成立，模型编不出引用。
//   R1「只有 quote 边进图」——模型没给有效 quoteId 的边直接丢，并记进 gaps。
//
// 用法：
//   node scripts/build-concept-net.mjs --chapters
//   node scripts/build-concept-net.mjs --articles 260914 [--limit 1] [--force]
//   node scripts/build-concept-net.mjs --all

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUTDIR = path.join(ROOT, 'knowledge', '概念网络-260915');
const CACHEDIR = path.join(ROOT, 'evidence', 'concept-net-260915', 'cache');

const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
const has = (k) => process.argv.includes(k);
const LIMIT = arg('--limit') ? Number(arg('--limit')) : Infinity;
const FORCE = has('--force');
const CONC = arg('--concurrency') ? Number(arg('--concurrency')) : 3;

const nowISO = () => new Date().toISOString();

/* ── 通用小工具 ─────────────────────────────────────────────────────────── */

/** 显示名：去掉中英文括号里的补充（「失调（misalignment）」→「失调」），太长就截。
    中文硬截 14 字；含西文词的回退到词边界再加「…」（不截在半个词上，2026-09-15 目检修正）。
    匹配/引用核对一律用 shortName（不带省略号，includes 才不会假阴）。 */
function shortName(name) {
  const s = String(name || '').replace(/[（(][^（()）]*[)）]\s*$/, '').trim();
  return s.length > 14 ? s.slice(0, 14) : s;
}
function dispName(name) {
  const s = String(name || '').replace(/[（(][^（()）]*[)）]\s*$/, '').trim();
  if (s.length <= 14) return s;
  let cut = s.slice(0, 14);
  const m = cut.match(/^(.*?[^A-Za-z0-9])([A-Za-z0-9]+)$/);
  if (m && /[A-Za-z0-9]/.test(String(s[14] || ''))) cut = m[1].replace(/\s+$/, '');
  // 纯中文正好排满 14 字节点框，不加省略号；其余（含回退过的）加「…」
  return (/^[\u4e00-\u9fa5]+$/.test(cut) && cut.length === 14) ? cut : cut + '…';
}
const norm = (x) => String(x).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
const parts = (x) => { const m = String(x).match(/^(.+?)\s*[（(]([^()（）]+)[)）]\s*$/); return m ? [m[1].trim(), m[2].trim()] : [String(x).trim()]; };

function readJSON(f) { return JSON.parse(fs.readFileSync(f, 'utf8')); }
function writeJSON(f, o) { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(o, null, 1) + '\n'); }

/* ── 概念地图索引（节点 ref.id：能对上就填，对不上留空 —— R7） ──────────── */
const CM_TOPICS = readJSON(path.join(ROOT, 'knowledge', '概念地图-260913', 'topics.json')).topics;
const CM_IDX = new Map();
for (const t of CM_TOPICS) for (const k of [t.name, t.nameEn, ...(t.aliases || [])]) if (k && !CM_IDX.has(norm(k))) CM_IDX.set(norm(k), t.id);
function cmIdOf(name) {
  const full = String(name || '');
  return parts(full).map(norm).map((k) => CM_IDX.get(k)).find(Boolean) || CM_IDX.get(norm(full)) || null;
}

/* ── 模型调用 ─────────────────────────────────────────────────────────────
   走 scripts/lib/llm.mjs 直连上游（同 build-neican-daily.mjs 的批量口径），不走 /api/llm：
   本机 serve 那个口写死 30 秒超时，一篇文章要它同时做分层＋归类＋挑 20 条带引用的边，实测会超时；
   批量脚本的超时归调用方自己定。凭证只从 .private/llm.env 读，不打印、不入库。 */
for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE, LLM_API_KEY, LLM_MODEL } = process.env;
if (!LLM_API_BASE || !LLM_API_KEY || !LLM_MODEL) {
  console.error('✗ LLM 未配置（.private/llm.env 缺 LLM_API_BASE / LLM_API_KEY / LLM_MODEL）');
  process.exit(1);
}
const TIMEOUT_MS = arg('--timeout') ? Number(arg('--timeout')) : 150000;

/* 实测：偶发空回复／超时（同一条提示词重发就好）。空回复不当结果用——重试 3 次，
   仍拿不到就抛错，由调用方记成 gaps，不静默产出一张没有依据的图。 */
async function callLLM(system, user, cacheKey) {
  fs.mkdirSync(CACHEDIR, { recursive: true });
  const cf = path.join(CACHEDIR, cacheKey + '.json');
  if (!FORCE && fs.existsSync(cf)) return { ...readJSON(cf), cached: true };
  let last = '';
  for (let attempt = 1; attempt <= 3; attempt++) {
    let reply;
    try {
      reply = await chatCompletion({
        base: LLM_API_BASE, key: LLM_API_KEY, model: LLM_MODEL, temperature: 0.2,
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
        json: true, maxTokens: 8000, signal: AbortSignal.timeout(TIMEOUT_MS),
      });
    } catch (e) {
      last = `${e && e.name === 'TimeoutError' ? 'llm-timeout' : 'llm-fetch-failed'}：${String((e && e.message) || e).slice(0, 160)}`;
      await new Promise((r) => setTimeout(r, 3000 * attempt)); continue;
    }
    if (!reply.ok) { last = `${reply.error}：${String(reply.detail || '').slice(0, 160)}`; await new Promise((r) => setTimeout(r, 3000 * attempt)); continue; }
    const raw = String(reply.content || '').replace(/^```json\s*|\s*```$/g, '');
    if (!raw) { last = `空回复（finish=${reply.finish || '?'}）`; await new Promise((r) => setTimeout(r, 3000 * attempt)); continue; }
    let parsed;
    try { parsed = JSON.parse(raw); }
    catch (e) { last = `不是 JSON（finish=${reply.finish || '?'} tokens=${reply.tokens || '?'} len=${raw.length}）：${raw.slice(0, 200)}`; await new Promise((r) => setTimeout(r, 1500)); continue; }
    const rec = { at: nowISO(), model: reply.model || null, tokens: reply.tokens || null, parsed };
    writeJSON(cf, rec);
    return { ...rec, cached: false };
  }
  throw new Error('模型连续 3 次没给出可用结果：' + last);
}

/* ══ 一、六章路线图 ══════════════════════════════════════════════════════ */

/** 章节材料里的「可引用块」：narrative 的 quote 已经在 build-learning-materials 里逐字校验过，直接用。 */
function routeEdges() {
  const ch = readJSON(path.join(ROOT, 'evidence', 'agent-loop-260913', 'chapters.json'));
  const pair = readJSON(path.join(ROOT, 'evidence', 'agent-loop-260913', 'pairings.json'));
  const nameOfUnit = new Map();
  for (const p of pair.chapters) {
    nameOfUnit.set(p.conceptId, p.cmName || p.conceptId);
    nameOfUnit.set(p.qstId, `问题：${p.cmName}`);
  }
  const edges = [];
  const chapters = ch.chapters.slice().sort((a, b) => a.order - b.order);
  for (const c of chapters) {
    const n = c.narrative || {};
    const coreUnit = (pair.chapters.find((p) => p.chapterId === c.chapterId) || {}).conceptId || null;
    for (const l of n.links || []) {
      const [a, b] = l.pair || [];
      if (!a || !b) continue;
      edges.push({
        chapter: c.chapterId, layer: 'L' + c.order, kind: 'link',
        a, b, sentence: l.sentence || '', quote: l.quote || '', quoteFrom: `narrative.links · ${l.quoteFrom}`,
        source: `chapters.json#${c.chapterId}.narrative.links`,
      });
    }
    for (const b of n.bridges || []) {
      const ids = b.basis || [];
      if (ids.length < 2) continue;
      const a = nameOfUnit.get(ids[0]) || ids[0];
      const bb = nameOfUnit.get(ids[1]) || ids[1];
      if (!a || !bb || a === bb) continue;
      edges.push({
        chapter: c.chapterId, layer: 'L' + c.order, kind: 'bridge',
        a, b: bb, sentence: b.answer || b.question || '', quote: b.quote || '', quoteFrom: `narrative.bridges · ${b.quoteFrom}`,
        source: `chapters.json#${c.chapterId}.narrative.bridges`,
      });
    }
    // 跨章：nextBridge 把本章接到下一章（顺序链的「接缝」）
    if (n.nextBridge && n.nextBridge.toChapter) {
      const nxt = pair.chapters.find((p) => p.chapterId === n.nextBridge.toChapter);
      const from = nameOfUnit.get(coreUnit) || c.title;
      const to = nxt ? (nxt.cmName || nxt.conceptId) : null;
      if (to && to !== from) {
        edges.push({
          chapter: c.chapterId, layer: 'L' + c.order, kind: 'cross',
          a: from, b: to, sentence: n.nextBridge.answer || n.nextBridge.question || '',
          quote: '', quoteFrom: '', source: `chapters.json#${c.chapterId}.narrative.nextBridge`,
        });
      }
    }
  }
  return { ch, pair, chapters, edges };
}

function routeNodeSet(chapters, pair) {
  // 节点 = 每章的 core 概念（取 cmName）＋ 该章 narrative 里出现的其它概念名
  const meta = new Map(pair.chapters.map((p) => [p.chapterId, p]));
  const nodes = [];
  const seen = new Set();
  const add = (name, chapter, role, unit) => {
    const key = norm(name);
    if (!name || seen.has(key)) return null;
    seen.add(key);
    const id = 'n' + (nodes.length + 1);
    nodes.push({ id, name: shortName(name), full: String(name), layer: null, role, chapter, ref: cmIdOf(name) ? { kind: 'cm', id: cmIdOf(name), unit: unit || null } : (unit ? { kind: 'unit', id: null, unit } : null) });
    return id;
  };
  // 先立 core：一层一个核心概念，节点的层由「谁拥有它」决定，不由「它在哪一章被提到」决定
  for (const c of chapters) {
    const m = meta.get(c.chapterId) || {};
    const id = add(m.cmName || c.title, c.chapterId, 'core', m.conceptId);
    if (id) nodes.find((n) => n.id === id).layer = 'L' + c.order;
  }
  const coreLayer = new Map(nodes.filter((n) => n.role === 'core').map((n) => [norm(n.full), n.layer]));
  const coreNames = [...coreLayer.keys()];
  for (const c of chapters) {
    const m = meta.get(c.chapterId) || {};
    for (const l of (c.narrative || {}).links || []) {
      const [a, b] = l.pair || [];
      for (const nm of [a, b]) {
        if (!nm || norm(nm) === norm(m.cmName)) continue;
        // 某个概念是别章 core 的前缀（「状态子系统」vs「状态子系统与进度持久化」）→ 并入那个 core，不另立节点
        const host = coreNames.find((k) => k !== norm(nm) && k.startsWith(norm(nm)) && norm(nm).length >= 3 && /^[\u4e00-\u9fa5]+$/.test(norm(nm)));
        if (host) continue;
        // 它自己就是别章 core（「工具」在 Agent 那章被提到）→ 层归它自己的章
        const own = coreLayer.get(norm(nm));
        const id = add(nm, c.chapterId, 'linked', null);
        if (id) nodes.find((n) => n.id === id).layer = own || ('L' + c.order);
      }
    }
  }
  for (const n of nodes) if (!n.layer) n.layer = 'L1';
  return nodes;
}

async function buildRoute() {
  const { ch, pair, chapters, edges } = routeEdges();
  const nodes = routeNodeSet(chapters, pair);
  const byName = new Map(nodes.map((n) => [norm(n.full), n]));

  // 模型只做一件事：给每条边写 ≤14 字短语标签 + 指方向。引用由机器填（来自 narrative，已逐字校验）。
  const list = edges.map((e, i) => ({ i, a: e.a, b: e.b, kind: e.kind, sentence: e.sentence.slice(0, 160) }));
  const SYS = `你在给一张「学习路线概念网络图」的边写短语标签。只输出 JSON，不要解释。
图的层就是路线的六步顺序：${chapters.map((c) => `L${c.order} ${(pair.chapters.find((p) => p.chapterId === c.chapterId) || {}).cmName || c.title}`).join(' → ')}。
给你一批边，每条边有 A、B 两个端点（概念名）和一句解释句。
对每条边输出：
{"i":序号,"from":"A或B（写哪个概念是原因/前提/上游）","to":"另一个","label":"≤14 字的短语，说清这条边是什么关系"}
要求：
- label 用中文短语，像一个箭头的名字（例：「定义里就写着」「不是同义词」「先有主体再谈手」「缺它立不住」），不要整句，不要以「的」结尾；
- 方向按语义定：前提/原因/上位/被依赖 → from；结果/下位/依赖方 → to；
- 每条边都要有输出，序号一个不漏。`;
  const out = await callLLM(SYS, JSON.stringify(list, null, 0), 'route-agent-loop');
  const labels = new Map((out.parsed.edges || out.parsed.list || []).map((x) => [Number(x.i), x]));

  const finalEdges = [];
  const gaps = [];
  const usedPair = new Set();   // 同一对端点只留一条边：图上一条关系画一根箭头，重复的进 gaps 说明
  edges.forEach((e, i) => {
    const L = labels.get(i);
    const nA = byName.get(norm(e.a)), nB = byName.get(norm(e.b));
    if (!nA || !nB) { gaps.push(`边 ${i} 端点不在节点表里（${e.a} / ${e.b}）→ 丢弃`); return; }
    if (!L || !L.label) { gaps.push(`边 ${i}（${e.a}×${e.b}）模型没给标签 → 丢弃`); return; }
    const pk = [nA.id, nB.id].sort().join('|');
    if (usedPair.has(pk)) { gaps.push(`边 ${i}（${e.a}×${e.b}）与已入图的边端点重复 → 只留先入图那条`); return; }
    const from = (L.from && norm(L.from) === norm(e.b)) ? nB.id : nA.id;
    const to = from === nA.id ? nB.id : nA.id;
    const ok = !!e.quote;
    if (!ok) { gaps.push(`边 ${i}（${e.a}×${e.b}，跨章接缝）没有逐字引用 → 按 R1 不进图`); return; }
    usedPair.add(pk);
    finalEdges.push({
      id: 'e' + (finalEdges.length + 1), from, to,
      label: String(L.label).trim().slice(0, 14),
      sentence: e.sentence, basis: 'quote',
      quote: e.quote, quoteFrom: e.quoteFrom || null,
      source: e.source, edgeKind: e.kind, chapter: e.chapter,
    });
  });

  const net = {
    version: 'v1', unitId: 'route-agent-loop', unitKind: 'route',
    title: 'Agent Loop 六步路线 · 概念网络',
    entryQuestion: ch.route && ch.route.entryQuestion ? ch.route.entryQuestion : '',
    generatedAt: nowISO(), generator: 'deterministic+llm', reviewStatus: 'generated-unreviewed',
    layers: chapters.map((c) => ({ id: 'L' + c.order, name: (pair.chapters.find((p) => p.chapterId === c.chapterId) || {}).cmName || c.title, chapter: c.chapterId })),
    nodes, edges: finalEdges.filter((e) => e.basis === 'quote'),
    gaps,
    llm: { cached: !!out.cached, model: out.model, tokens: out.tokens },
  };
  writeJSON(path.join(OUTDIR, net.unitId + '.json'), net);
  console.log(`route-agent-loop：节点 ${net.nodes.length} · 边 ${net.edges.length}（丢弃 ${gaps.length}）${out.cached ? ' · 缓存' : ' · 新调用'}`);
  return net;
}

/* ══ 二、内参单篇 ════════════════════════════════════════════════════════ */

/** 原文快照 → 句子索引（Q1..Qn）。R2 靠它成立：模型只能挑 ID。
    快照有两种语言：中文译文 ＋ 英文原文（如 260913 的 Raschka / Newport / Andrew Ng 三篇）——
    句子切分与过滤两种都得认，不然英文篇会一句候选都没有、整图 0 边（2026-09-15 实测）。 */
function sentenceIndex(text) {
  const body = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  const raw = body
    .replace(/\[<sup>[^\]]*\]\([^)]*\)[^\]]*<\/sup>\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*`>#]/g, '')
    .split(/(?<=[。！？；])|(?<=[.!?])\s+|\n{2,}/)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter((s) => s.length >= 14 && s.length <= 300
      && (/[\u4e00-\u9fa5]/.test(s) || (s.match(/[A-Za-z]/g) || []).length >= 30));
  const out = [];
  const seen = new Set();
  for (const s of raw) { if (seen.has(s)) continue; seen.add(s); out.push(s); }
  return out.map((s, i) => ({ id: 'Q' + (i + 1), text: s }));
}

async function buildArticle(period, art) {
  const slug = art.slug;
  const unitId = `neican-${period}-${slug}`;
  const rawFile = path.join(ROOT, 'knowledge', `内参-${period}`, '原文', slug + '.md');
  if (!fs.existsSync(rawFile)) return { unitId, skipped: '没有原文快照' };
  const idx = sentenceIndex(fs.readFileSync(rawFile, 'utf8'));
  const cards = art.conceptCards || [];
  if (cards.length < 3) return { unitId, skipped: `概念卡只有 ${cards.length} 张，做不成网络` };

  const concepts = cards.map((c, i) => ({ i, name: shortName(c.name), disp: dispName(c.name), full: c.name, hint: (c.quotes || [])[0] ? String(c.quotes[0]).slice(0, 120) : '' }));
  const cacheKey = `article-${period}-${slug}`.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 110);

  /* 两段式（实测：一次做完「分层＋归类＋挑 20 条带引用的边」会把输出预算全烧在推理上，
     finish=length、content 为空）。拆开之后每段的输出都短，两段各自可重跑、各自进缓存。 */
  // 第一段：只写结构（层／归类／边＋短语标签），不谈引用
  const S1 = `你在给一篇文章画「概念网络图」。只输出 JSON，不要解释。
输出形状：
{"layers":[{"id":"L1","name":"≤8字"}],
 "nodeLayer":{"c0":"L1","c1":"L2"},
 "edges":[{"from":"c0","to":"c3","label":"≤14字短语"}]}
规则：
- 层 2—5 层，按文章自己的论证顺序（前因／基础在上，后果／对策在下）。
- 每一个概念都要归到某一层（nodeLayer 一个都不能漏）。
- 边 8—18 条，只连概念列表里真实存在的编号；不要自己造概念。
- label 是箭头上的短语（例「提供人类模仿基础」「最极端形式」「改写成功定义」），不是整句，≤14 字。
- 方向：因／前提／被依赖 → from；果／依赖方 → to。`;
  let o1;
  try { o1 = await callLLM(S1, JSON.stringify({ 标题: art.title, 概念: concepts }), cacheKey + '-s1'); }
  catch (e) { return { unitId, error: '第一段（结构）：' + String(e.message || e) }; }

  const P = o1.parsed || {};
  const rawEdges = (P.edges || []).filter((e) => e && e.from != null && e.to != null && e.label);

  // 第二段：只挑引用（从机器给的句子索引里挑 ID，挑不到就 null）
  const qmap = new Map(idx.map((q) => [q.id, q.text]));
  const cmap = new Map(concepts.map((c, i) => ['c' + i, c]));
  const ask = rawEdges.slice(0, 24).map((e, i) => ({
    i, 关系: `${(cmap.get(String(e.from)) || {}).name || e.from} → ${(cmap.get(String(e.to)) || {}).name || e.to}`, label: String(e.label).slice(0, 14),
  }));

  /* 候选句检索（确定性）：概念名的汉字二元组命中数。把 65 句原文压到每条边 3 句候选，
     模型只在这 3 句里挑——它一次看 65 句 × 18 条边会推理到把输出预算烧光（实测 finish=length）。 */
  function bigrams(str) {
    const t = String(str).replace(/[^\u4e00-\u9fa5A-Za-z0-9]/g, '');
    const out = new Set();
    for (let i = 0; i + 1 < t.length; i++) out.add(t.slice(i, i + 2));
    return out;
  }
  const termsOf = new Map();
  concepts.forEach((c, i) => {
    const set = bigrams(c.full);
    for (const q of (cards[i].quotes || [])) for (const g of bigrams(String(q).slice(0, 120))) set.add(g);
    termsOf.set('c' + i, set);
  });
  function candidatesFor(e, k) {
    const tA = termsOf.get(String(e.from)) || new Set(), tB = termsOf.get(String(e.to)) || new Set();
    const scored = idx.map((q) => {
      let n = 0;
      const seen = new Set();
      const s = q.text;
      for (let i = 0; i + 1 < s.length; i++) {
        const g = s.slice(i, i + 2);
        if (seen.has(g)) continue; seen.add(g);
        if (tA.has(g)) n += 1;
        if (tB.has(g)) n += 1;
      }
      return { id: q.id, text: q.text, score: n };
    }).sort((a, b) => b.score - a.score);
    return scored.slice(0, k).filter((x) => x.score > 0);
  }
  const cands = ask.map((a, i) => candidatesFor(rawEdges[i], 3));

  const edges = [];
  const gaps = [];
  const picks = new Map();          // 边序号 → { j, by }   by = llm | retrieval
  const S2 = `下面每一条「关系」都配了 2 句以内的原文候选句。请为每条关系挑**1 句能支撑它的原句**。
只输出 JSON：{"picks":[{"i":0,"j":1},{"i":1,"j":null}]}
j 是候选句在该条关系「候选」数组里的下标；没有一句能支撑（候选缺失、或都只是碰巧提到某个词）就回 null。**不许硬凑。**`;
  /* 分批：一次给 7 条关系。实测一次给 18 条 × 3 句候选，模型把输出预算全花在推理上（finish=length、content 空）。 */
  const CHUNK = 7;
  for (let s = 0; s < ask.length; s += CHUNK) {
    const group = ask.slice(s, s + CHUNK);
    const payload = group.map((a) => ({ i: a.i, 关系: a.关系, label: a.label, 候选: cands[a.i].slice(0, 2).map((x, j) => ({ j, text: x.text.slice(0, 130) })) }));
    try {
      const o2 = await callLLM(S2, JSON.stringify(payload), `${cacheKey}-s2-${s}`);
      for (const x of ((o2.parsed || {}).picks || [])) {
        const j = (x.j === null || x.j === undefined) ? null : Number(x.j);
        picks.set(Number(x.i), { j: (j !== null && cands[Number(x.i)] && cands[Number(x.i)][j]) ? j : null, by: 'llm' });
      }
    } catch (e) {
      /* 这一批模型连试三次都给不出结果 → 退回确定性最高分句，并把这个事实写进数据（每条边的 citedBy）
         与 gaps。不假装它经过了模型确认。 */
      gaps.push(`第二段（引用）第 ${Math.floor(s / CHUNK) + 1} 批模型连续失败，改用确定性最高分句：${String(e.message || e).slice(0, 100)}`);
      for (const a of group) picks.set(a.i, { j: cands[a.i].length ? 0 : null, by: 'retrieval' });
    }
  }

  const layerIds = (P.layers || []).map((l, i) => ({ id: String(l.id || 'L' + (i + 1)), name: String(l.name || '').slice(0, 12) })).slice(0, 5);
  const layerSet = new Set(layerIds.map((l) => l.id));
  const nodeLayer = P.nodeLayer || {};

  const nodes = [];
  const nidByC = new Map();
  concepts.forEach((c, i) => {
    const ck = 'c' + i;
    let L = String(nodeLayer[ck] || '');
    if (!layerSet.has(L)) L = layerIds[0] ? layerIds[0].id : 'L1';
    const id = 'n' + (nodes.length + 1);
    nidByC.set(ck, id);
    const cm = cmIdOf(c.full);
    nodes.push({ id, name: c.disp || c.name, full: c.full, layer: L, role: i === 0 ? 'core' : 'linked', card: i, ref: cm ? { kind: 'cm', id: cm } : null });
  });

  ask.forEach((a, i) => {
    const e = rawEdges[i];
    const nf = nidByC.get(String(e.from)), nt = nidByC.get(String(e.to));
    if (!nf || !nt || nf === nt) { gaps.push(`边 ${e.from}→${e.to} 端点无效 → 丢弃`); return; }
    const p0 = picks.get(a.i);
    const pick = (!p0 || p0.j === null) ? null : cands[a.i][p0.j];
    if (!pick || !qmap.has(pick.id)) { gaps.push(`边 ${a.关系}（${a.label}）找不到支撑原句 → 按 R1/R2 不进图`); return; }
    const q = qmap.get(pick.id);
    const A = cmap.get(String(e.from)), B = cmap.get(String(e.to));
    const hit = [A, B].filter((c) => c && q.includes(shortName(c.full))).length;
    edges.push({
      id: 'e' + (edges.length + 1), from: nf, to: nt,
      label: String(e.label).trim().slice(0, 14),
      basis: 'quote', quote: q, quoteId: pick.id,
      quoteFrom: `原文 · ${pick.id}`,
      citedBy: p0.by,
      evidenceStrength: hit >= 2 ? 'direct' : (hit === 1 ? 'indirect' : 'weak'),
      source: 'llm+原文索引',
    });
  });

  const net = {
    version: 'v1', unitId, unitKind: 'article', period, slug,
    title: art.title, source: art.url || '',
    generatedAt: nowISO(), generator: 'deterministic+llm', reviewStatus: 'generated-unreviewed',
    layers: layerIds, nodes, edges, gaps,
    llm: { model: o1.model, tokens: (o1.tokens || 0), cached: !!o1.cached },
    citedByStats: { llm: edges.filter((e) => e.citedBy === 'llm').length, retrieval: edges.filter((e) => e.citedBy === 'retrieval').length },
  };
  writeJSON(path.join(OUTDIR, unitId + '.json'), net);
  const direct = edges.filter((e) => e.evidenceStrength === 'direct').length;
  console.log(`  ${unitId}：层 ${layerIds.length} · 节点 ${nodes.length} · 边 ${edges.length}（原句同时提到两端 ${direct}）· 丢弃 ${gaps.length}${o1.cached ? ' · 缓存' : ''}`);
  return net;
}

/* ══ 主流程 ═════════════════════════════════════════════════════════════ */
async function main() {
  fs.mkdirSync(OUTDIR, { recursive: true });
  const doAll = has('--all');
  if (has('--chapters') || doAll) await buildRoute();

  const periods = [];
  const single = arg('--articles');
  if (single) periods.push(single);
  else if (doAll) periods.push('260912', '260913', '260914');

  let done = 0;
  for (const p of periods) {
    const data = readJSON(path.join(ROOT, 'knowledge', `内参-${p}`, '内参-页面数据.json'));
    const arts = (data.articles || []).slice(0, LIMIT === Infinity ? undefined : LIMIT);
    console.log(`内参 ${p} 期：${arts.length} 篇`);
    for (let i = 0; i < arts.length; i += CONC) {
      const batch = arts.slice(i, i + CONC);
      const rs = await Promise.all(batch.map((a) => buildArticle(p, a).catch((e) => ({ error: String(e.message || e), slug: a.slug }))));
      for (const r of rs) { if (r && r.error) console.log(`  ✗ ${r.slug || '?'}：${r.error}`); if (r && !r.error && !r.skipped) done++; }
    }
  }
  console.log(`\n共写入 ${done} 张图 → knowledge/概念网络-260915/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
