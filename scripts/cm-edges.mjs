#!/usr/bin/env node
// 概念地图 v2 · 第 4 步：依赖边（os-taxonomy 的 dependencies 语义：topicId depends on prerequisiteId）。
//
// 三个来源，分级标注 origin，谁也不冒充谁：
//   curated        用户自己的 context×harness 项目里已策展的 169 条关系（最高信任）
//   source-network 从两份飞书原文里逐条带证据抽出的 55 条来源关系
//   llm            模型按领域提议的前置依赖（带 reason，跑完做环检测）
//
// kind → 是否进 DAG：只有 prerequisite 才是「不懂它就没法懂」的前置。
//   part-of（from 是 to 的组成部分）**不进 DAG** —— 组成关系不等于概念依赖：
//   不懂「工具」也能懂「Harness」，只是懂得少一点。这条 2026-09-13 由审核报告抓出来
//   （curated 边里 4 条 part-of 被判 no，模型给的理由都是「可选组件不是必要构成」）。
//   contrast / used-with 同理，只进关系层。
//
// 用法：node scripts/cm-edges.mjs
// 产出：evidence/cm-260913/04-edges.json

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const SRC = path.join(ROOT, 'evidence', '概念源-260913');
const CACHE = path.join(ROOT, 'evidence', '.cm-edges-cache.json');

const ARGV = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const CONC = Number(ARGV.concurrency || 4);

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
async function askJson(system, user, { maxTokens = 24000, key = null } = {}) {
  if (key && cache[key]) return cache[key];
  let lastErr;
  // reasoning_tokens 会吃掉 max_tokens → content 空串；预算翻倍重试。
  for (const budget of [maxTokens, maxTokens * 2, 40000]) {
    const reply = await chatCompletion({ base: BASE, key: KEY, model: MODEL, json: true, maxTokens: budget,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }] });
    if (!reply.ok) { lastErr = new Error(`HTTP ${reply.status}: ${reply.detail}`); continue; }
    tokens += reply.tokens || 0;
    const txt = (reply.content || '').trim();
    if (!txt) {
      const u = reply.data?.usage || {};
      lastErr = new Error(`空回复 finish=${reply.finish} reasoning=${u.completion_tokens_details?.reasoning_tokens}`);
      await new Promise((r) => setTimeout(r, 900));
      continue;
    }
    try { const obj = JSON.parse(txt); if (key) { cache[key] = obj; saveCache(); } return obj; }
    catch { lastErr = new Error(`JSON 解析失败：${txt.slice(0, 160)}`); }
  }
  throw lastErr;
}

/* ── 节点 + 查表 ────────────────────────────────────────── */
const { nodes, domains } = JSON.parse(fs.readFileSync(path.join(DIR, '03-enriched.json'), 'utf8'));
const norm = (s) => String(s).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
const kebab = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const lookup = new Map();
const index = (k, id) => { const n = norm(k); if (n && !lookup.has(n)) lookup.set(n, id); };
for (const n of nodes) {
  index(n.name, n.id);
  if (n.nameEn) { index(n.nameEn, n.id); index(kebab(n.nameEn), n.id); }
  if (n.slug) index(n.slug, n.id);
  for (const a of n.aliases) { index(a, n.id); index(kebab(a), n.id); }
  // 「Harness 工程」↔「harness-engineering」这类再兜一层
  index(norm(n.nameEn).replace(/engineering$/, '工程'), n.id);
}
const find = (...keys) => { for (const k of keys) { const n = norm(k); if (n && lookup.has(n)) return lookup.get(n); } return null; };
const byId = new Map(nodes.map((n) => [n.id, n]));

/* ── YAML 小解析（只吃我们冻结的那两个形状） ────────────── */
function parseCurated(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const out = []; let cur = null;
  for (const l of lines) {
    let m;
    if ((m = l.match(/^- from:\s*(.+)$/))) { if (cur) out.push(cur); cur = { from: m[1].trim() }; continue; }
    if (!cur) continue;
    if ((m = l.match(/^\s+to:\s*(.+)$/))) cur.to = m[1].trim();
    else if ((m = l.match(/^\s+kind:\s*(.+)$/))) cur.kind = m[1].trim();
    else if ((m = l.match(/^\s+axis:\s*(.+)$/))) cur.axis = m[1].trim();
    else if ((m = l.match(/^\s+note:\s*(.+)$/))) cur.note = m[1].trim();
  }
  if (cur) out.push(cur);
  return out;
}
function parseSourceNet(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const out = []; let cur = null;
  for (const l of lines) {
    let m;
    if ((m = l.match(/^\s*- entry_id:\s*(.+)$/))) { if (cur) out.push(cur); cur = { entry: m[1].trim(), terms: [] }; continue; }
    if (!cur) continue;
    if ((m = l.match(/^\s+relation_paraphrase:\s*(.+)$/))) cur.note = m[1].trim();
    else if ((m = l.match(/^\s+- (.+)$/)) && cur.terms.length < 4 && !cur.note) cur.terms.push(m[1].trim());
  }
  if (cur) out.push(cur);
  return out.filter((r) => r.terms.length >= 2 && r.note);
}

/* ── 1) curated ─────────────────────────────────────────── */
const STRENGTH = { prerequisite: 'hard', 'part-of': 'hard', 'used-with': 'soft', contrast: 'soft' };
const edges = [];   // 进 DAG 的
const relations = []; // 只进关系层
const unresolved = [];
function push(fromId, toId, { kind, strength, reason, origin, axis = '', evidence = '' }) {
  relations.push({ from: fromId, to: toId, kind, strength, axis, note: reason, origin, evidence });
  if (kind !== 'prerequisite') return; // 只有 prerequisite 进 DAG
  const [t, p] = [fromId, toId];
  if (t === p) return;
  edges.push({ topicId: t, prerequisiteId: p, strength, kind, reason, origin, axis, evidence });
}

for (const r of parseCurated(path.join(SRC, 'context-harness-已策展关系-169.yaml'))) {
  const a = find(r.from, kebab(r.from)), b = find(r.to, kebab(r.to));
  if (!a || !b) { unresolved.push({ origin: 'curated', ...r }); continue; }
  push(a, b, { kind: r.kind || 'used-with', strength: STRENGTH[r.kind] || 'soft', reason: r.note || '', origin: 'curated', axis: r.axis || '' });
}
for (const r of parseSourceNet(path.join(SRC, 'SRCNET-context-engineering-26-plus-2.yaml')).concat(
  parseSourceNet(path.join(SRC, 'SRCNET-harness-engineering-28-plus-2.yaml')))) {
  const a = find(r.terms[0]), b = find(r.terms[1]);
  if (!a || !b) { unresolved.push({ origin: 'source-network', ...r }); continue; }
  push(a, b, { kind: 'used-with', strength: 'soft', reason: r.note, origin: 'source-network', evidence: r.entry });
}
console.log(`复用：curated 命中 ${relations.filter((r) => r.origin === 'curated').length} · source-network 命中 ${relations.filter((r) => r.origin === 'source-network').length} · 未解析 ${unresolved.length}`);

/* ── 2) LLM：按领域提议前置依赖 ─────────────────────────── */
const SYS = '你是概念地图的依赖建模者。只输出 JSON。前置依赖必须真的成立：不懂 B 就没法真的懂 A，才写 A 依赖 B。宁可少写，不要凑数。不要写 A 依赖 A。';
const grouped = new Map();
for (const n of nodes) {
  if (!grouped.has(n.domain)) grouped.set(n.domain, []);
  grouped.get(n.domain).push(n);
}
const labelOf = new Map(domains.map((d) => [d.id, d.label]));

const jobs = [];
for (const [dom, list] of grouped) {
  for (let i = 0; i < list.length; i += 45) jobs.push({ dom, list: list.slice(i, i + 45) });
}
console.log(`依赖提议：${jobs.length} 组（领域 × 每组 ≤45 个概念）· 并发 ${CONC}`);

const llmEdges = [];
let cursor = 0, doneJobs = 0;
const failedJobs = [];
async function worker() {
  while (cursor < jobs.length) {
    const job = jobs[cursor++];
    const body = job.list.map((n) => `${n.name}${n.nameEn ? `（${n.nameEn}）` : ''}：${n.desc || n.gloss || '（无定义）'}`).join('\n');
    const prompt = `领域：${labelOf.get(job.dom) || job.dom}（${job.dom}）

下面是这个领域里的概念。请写出**组内**的前置依赖边，12–30 条，覆盖尽量多的概念：
{"edges":[{"from":"依赖方概念名","to":"前置概念名","strength":"hard|soft","reason":"为什么不懂 to 就没法真的懂 from，一句话，≤60字"}]}

判定口径：
- hard：不懂 to 时 from 根本立不住（定义依赖、组成依赖、机制依赖）
- soft：懂 to 会让 from 更好懂，但不是必需
- 概念名必须逐字来自下面的清单，不要新造名字

概念清单：
${body}

输出 JSON：{"edges":[…]}`;
    try {
      const out = await askJson(SYS, prompt, { key: `edge-dom-v1-${job.dom}-${job.list[0].id}`, maxTokens: 24000 });
      for (const e of out.edges || []) {
        const a = find(e.from), b = find(e.to);
        if (!a || !b || a === b) continue;
        llmEdges.push({ topicId: a, prerequisiteId: b, strength: e.strength === 'hard' ? 'hard' : 'soft',
          kind: 'prerequisite', reason: String(e.reason || '').slice(0, 120), origin: 'llm', axis: 'llm-domain' });
      }
      doneJobs++;
      if (doneJobs % 5 === 0) console.log(`   …${doneJobs}/${jobs.length} 组（边 ${llmEdges.length}，tokens ${tokens}）`);
    } catch (e) { failedJobs.push({ dom: job.dom, i: job.list[0].id, err: String(e.message).slice(0, 160) }); }
  }
}
await Promise.all(Array.from({ length: CONC }, worker));

/* ── 2b) 第二轮：救孤立点（--pass2）。孤立点在第一轮里没被任何组覆盖到，
       单独成组再问一次，并允许它们连到本领域已有的枢纽概念。 ── */
if ('pass2' in ARGV) {
  const touched = new Set();
  for (const e of [...edges, ...llmEdges]) { touched.add(e.topicId); touched.add(e.prerequisiteId); }
  const iso = nodes.filter((n) => !touched.has(n.id));
  const hub = (dom) => nodes.filter((n) => n.domain === dom && touched.has(n.id))
    .sort((a, b) => b.mentionCount - a.mentionCount).slice(0, 12);
  const g2 = new Map();
  for (const n of iso) { if (!g2.has(n.domain)) g2.set(n.domain, []); g2.get(n.domain).push(n); }
  const jobs2 = [];
  for (const [dom, list] of g2) for (let i = 0; i < list.length; i += 40) jobs2.push({ dom, list: list.slice(i, i + 40) });
  console.log(`第二轮（救孤立点）：孤立 ${iso.length} 个 → ${jobs2.length} 组`);
  let c2 = 0, d2 = 0;
  const worker2 = async () => {
    while (c2 < jobs2.length) {
      const job = jobs2[c2++];
      const body = job.list.map((n) => `${n.name}${n.nameEn ? `（${n.nameEn}）` : ''}：${n.desc || n.gloss || '（无定义）'}`).join('\n');
      const hubs = hub(job.dom).map((n) => `${n.name}：${n.desc || ''}`).join('\n');
      const prompt = `领域：${labelOf.get(job.dom) || job.dom}（${job.dom}）

下面是这个领域里**还没有任何依赖边**的概念，以及本领域已有的枢纽概念。
请为每个孤立概念找出至少一条前置依赖（可以和枢纽概念相连，也可以互相连），12–30 条：
{"edges":[{"from":"依赖方概念名","to":"前置概念名","strength":"hard|soft","reason":"为什么不懂 to 就没法真的懂 from，一句话，≤60字"}]}
概念名必须逐字来自下面两份清单，不要新造名字。

孤立概念：
${body}

本领域枢纽（可以当前置）：
${hubs || '（无）'}

输出 JSON：{"edges":[…]}`;
      try {
        const out = await askJson(SYS, prompt, { key: `edge-iso-v1-${job.dom}-${job.list[0].id}`, maxTokens: 24000 });
        for (const e of out.edges || []) {
          const a = find(e.from), b = find(e.to);
          if (!a || !b || a === b) continue;
          llmEdges.push({ topicId: a, prerequisiteId: b, strength: e.strength === 'hard' ? 'hard' : 'soft',
            kind: 'prerequisite', reason: String(e.reason || '').slice(0, 120), origin: 'llm', axis: 'llm-domain' });
        }
        d2++;
        if (d2 % 4 === 0) console.log(`   …第二轮 ${d2}/${jobs2.length} 组（边 ${llmEdges.length}）`);
      } catch (e) { failedJobs.push({ dom: job.dom, i: job.list[0].id, err: String(e.message).slice(0, 160) }); }
    }
  };
  await Promise.all(Array.from({ length: CONC }, worker2));
}

/* ── 3) 环检测（DAG）：按 hard→soft、curated→source→llm 优先级保边 ── */
const RANK = { curated: 0, 'source-network': 1, llm: 2 };
const all = [...edges, ...llmEdges];
all.sort((a, b) => (a.strength === b.strength ? RANK[a.origin] - RANK[b.origin] : a.strength === 'hard' ? -1 : 1));
const adj = new Map();
const kept = [];
const dropped = [];
const reaches = (start, target) => { // start 能否沿已保留边走到 target
  const stack = [start], seen = new Set();
  while (stack.length) {
    const x = stack.pop();
    if (x === target) return true;
    if (seen.has(x)) continue;
    seen.add(x);
    for (const y of adj.get(x) || []) stack.push(y);
  }
  return false;
};
for (const e of all) {
  if (reaches(e.prerequisiteId, e.topicId)) { dropped.push({ ...e, dropReason: 'cycle' }); continue; }
  kept.push(e);
  if (!adj.has(e.topicId)) adj.set(e.topicId, []);
  adj.get(e.topicId).push(e.prerequisiteId);
}
/* ── 4) 同篇共现（确定性，只为消灭孤页；不是前置依赖，绝不进 DAG） ── */
const raw = JSON.parse(fs.readFileSync(path.join(DIR, '01-raw.json'), 'utf8'));
const byArticle = new Map();
for (const c of raw.concepts) {
  const aid = c.src.articleId || (c.src.type === 'notion' ? 'notion' : null);
  if (!aid) continue;
  const id = find(c.name);
  if (!id) continue;
  if (!byArticle.has(aid)) byArticle.set(aid, new Map());
  const m = byArticle.get(aid);
  m.set(id, (m.get(id) || 0) + 1);
}
const coSeen = new Set(relations.map((r) => `${r.from}~${r.to}`));
let coAdded = 0;
for (const [aid, m] of byArticle) {
  const list = [...m.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
  for (const id of list) {
    // 每个概念连到同篇里被提及最多的 3 个别的概念
    for (const other of list.filter((x) => x !== id).slice(0, 3)) {
      const k = [id, other].sort().join('~');
      if (coSeen.has(k)) continue;
      coSeen.add(k);
      coAdded++;
      relations.push({ from: id, to: other, kind: 'co-article', strength: 'soft', axis: 'co-occurrence',
        note: `同篇出现：${aid}`, origin: 'co-occurrence', evidence: aid });
    }
  }
}
console.log(`同篇共现：新增 ${coAdded} 条关联（只进关系层，不进 DAG）`);

// 关系层：把 LLM 边也并进去（去重）
const seenRel = new Set(relations.map((r) => `${r.from}->${r.to}:${r.kind}`));
for (const e of llmEdges) {
  const k = `${e.topicId}->${e.prerequisiteId}:prerequisite`;
  if (seenRel.has(k)) continue;
  seenRel.add(k);
  relations.push({ from: e.topicId, to: e.prerequisiteId, kind: 'prerequisite', strength: e.strength, axis: 'llm-domain', note: e.reason, origin: 'llm', evidence: '' });
}

const touched = new Set(); for (const e of kept) { touched.add(e.topicId); touched.add(e.prerequisiteId); }
const out = {
  generatedAt: new Date().toISOString(),
  stats: {
    dependencies: kept.length, byOrigin: tally(kept, 'origin'), byStrength: tally(kept, 'strength'),
    droppedForCycle: dropped.length, relations: relations.length,
    isolated: nodes.length - touched.size, unresolvedCurated: unresolved.length,
    tokens, failedJobs,
  },
  dependencies: kept,
  relations,
  dropped,
  unresolved,
};
function tally(arr, k) { const o = {}; for (const x of arr) o[x[k]] = (o[x[k]] || 0) + 1; return o; }
fs.writeFileSync(path.join(DIR, '04-edges.json'), JSON.stringify(out, null, 1));
console.log('✅ 依赖边完成');
console.log(`   保留 ${kept.length} 条（${JSON.stringify(out.stats.byOrigin)} / ${JSON.stringify(out.stats.byStrength)}）`);
console.log(`   环丢弃 ${dropped.length} · 孤立节点 ${out.stats.isolated}/${nodes.length} · tokens ${tokens}`);
