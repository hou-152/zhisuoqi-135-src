#!/usr/bin/env node
// 概念地图 v2 · 把「AI 内参 260912」的 10 篇概念辞典并进地图（第四个源）。
//
// 背景（所有者 2026-09-13 原话）：
//   「怎么图他没有去改呢？内参的图没有去改」「他说内参的，他应该是得放到那里面去啊」
// 现象：内参那一栏的 88 个概念，在地图 v2 里只命中 8 个 —— 它是一座孤岛，换地图时没跟着走。
//
// 做法：**只追加，不动已有的 856 个节点**（保住它们的 id 与全部缓存），
//   ① 从 10 篇 `概念辞典/*.md` 抽概念（名称 + 原文引文 + 费曼一下）
//   ② 先用「剥括号 + 归一化」去撞现有节点，撞上的只记一条「同一个概念的另一处出场」
//   ③ 撞不上的才作为新节点，LLM 补齐领域/类型/学习时机/验收方式/定义/掌握证据/验收问句
//   ④ 给新节点用严判据生成前置依赖边
//
// 用法：node scripts/cm-add-neican.mjs [--issue=260913] [--concurrency=5] [--dry]
//      不给 --issue 时按 260912 期（这条链最早那一期）。
// 产出：改写 evidence/cm-260913/03-enriched.json 与 04-edges.json（备份 *.pre-neican-<期>.bak）
//      记账 evidence/cm-260913/08-neican-merge-<期>.json

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const ARGV = (() => {                        // 两种写法都收：--issue 260913 与 --issue=260913
  const a = process.argv.slice(2), o = {};
  for (let i = 0; i < a.length; i++) {
    const m = a[i].match(/^--([^=]+)(?:=(.*))?$/);
    if (!m) continue;
    o[m[1]] = m[2] !== undefined ? m[2] : (a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true);
  }
  return o;
})();
const ISSUE = String(ARGV.issue || '260912');
const TAG = `AI 内参 ${ISSUE}`;                 // 节点来源标签（260912 期写的是「AI 内参 260912」）
const SRC = path.join(ROOT, 'knowledge', `内参-${ISSUE}`);
const CACHE = path.join(ROOT, 'evidence', `.cm-neican-cache-${ISSUE}.json`);
const CONC = Number(ARGV.concurrency || 5);
const DRY = 'dry' in ARGV;

for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE: BASE, LLM_API_KEY: KEY, LLM_MODEL: MODEL } = process.env;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证（.private/llm.env）'); process.exit(2); }

let cache = {};
try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch { cache = {}; }
let tokens = 0;
async function askJson(system, user, key, maxTokens = 24000) {
  if (cache[key]) return cache[key];
  let lastErr;
  for (const budget of [maxTokens, maxTokens * 2, 40000]) {
    const reply = await chatCompletion({ base: BASE, key: KEY, model: MODEL, json: true, maxTokens: budget,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }] });
    if (!reply.ok) { lastErr = new Error(`HTTP ${reply.status}`); continue; }
    tokens += reply.tokens || 0;
    const txt = (reply.content || '').trim();
    if (!txt) { lastErr = new Error('空回复'); await new Promise((r) => setTimeout(r, 800)); continue; }
    try { const o = JSON.parse(txt); cache[key] = o; fs.writeFileSync(CACHE, JSON.stringify(cache)); return o; }
    catch { lastErr = new Error('JSON 解析失败'); }
  }
  throw lastErr;
}

const enriched = JSON.parse(fs.readFileSync(path.join(DIR, '03-enriched.json'), 'utf8'));
const edgeFile = JSON.parse(fs.readFileSync(path.join(DIR, '04-edges.json'), 'utf8'));
const nodes = enriched.nodes;
const domainIds = enriched.domains.map((d) => d.id);
const labelOf = new Map(enriched.domains.map((d) => [d.id, d.label]));

// 归一化必须与 cm-merge 一致：JS 的 \W 只认 [A-Za-z0-9_]，会把中文整个吃掉、
// 让所有纯中文名归一化成空串互相假命中（2026-09-13 踩过：88 条里 72 条假命中）。
const norm = (s) => String(s).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
const hash8 = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
const stripParen = (s) => { const m = String(s).match(/^(.+?)\s*[（(]([^()（）]+)[)）]\s*$/); return m ? m[1].trim() : String(s).trim(); };
const ascii = (s) => (String(s).match(/[\x00-\x7F]/g) || []).length / Math.max(String(s).length, 1);

/* ── ① 抽内参概念 ───────────────────────────────────────── */
const meta = JSON.parse(fs.readFileSync(path.join(SRC, '内参-页面数据.json'), 'utf8'));
const titleOf = new Map(meta.articles.map((a) => [a.slug, a]));
const raw = [];
for (const f of fs.readdirSync(path.join(SRC, '概念辞典')).filter((x) => x.endsWith('.md'))) {
  const slug = f.replace(/\.md$/, '');
  const md = fs.readFileSync(path.join(SRC, '概念辞典', f), 'utf8');
  const art = titleOf.get(slug) || {};
  for (const chunk of md.split(/\n###\s+/).slice(1)) {
    const [head, ...rest] = chunk.split('\n');
    const full = head.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').trim();
    if (!full) continue;
    const body = rest.join('\n');
    const quotes = [...body.matchAll(/^\s*>\s?(.*)$/gm)].map((m) => m[1].trim()).filter(Boolean);
    const feyn = (body.match(/- \*\*费曼一下\*\*：([\s\S]*?)(?=\n- \*\*|\n###|$)/) || [, ''])[1].trim();
    const name = stripParen(full);
    const paren = (full.match(/[（(]([^()（）]+)[)）]\s*$/) || [, ''])[1].trim();
    raw.push({ slug, name, full, nameEn: paren && ascii(paren) > 0.85 ? paren : '', gloss: paren && ascii(paren) <= 0.85 ? paren : '',
      quotes, feynman: feyn, article: art.title || slug, url: art.url || '' });
  }
}
console.log(`内参概念辞典：${new Set(raw.map((r) => r.slug)).size} 篇 → 概念 ${raw.length} 条`);

/* ── ② 撞现有节点 ───────────────────────────────────────── */
const lookup = new Map();
for (const n of nodes) for (const k of [n.name, n.nameEn, n.slug, ...(n.aliases || [])]) if (k) lookup.set(norm(k), n);
const hits = []; const fresh = [];
for (const r of raw) {
  const t = lookup.get(norm(r.name)) || (r.nameEn && lookup.get(norm(r.nameEn))) || lookup.get(norm(r.full));
  if (t) hits.push({ ...r, node: t.id, nodeName: t.name }); else fresh.push(r);
}
console.log(`撞上现有节点 ${hits.length} · 新概念 ${fresh.length}`);

/* ── ③ LLM 补齐新概念 ───────────────────────────────────── */
const SYS = '你是概念地图的标注员。只输出 JSON。忠于给定材料，材料没说的事不编。';
const domainLines = enriched.domains.map((d) => `${d.id} = ${d.label}（${d.question}）`).join('\n');
function prompt(items) {
  return `领域闭集（domain 只能取这里的 id）：
${domainLines}

类型：CONCEPTUAL 观念/机制/现象/判据 ｜ PROCEDURAL 可照做的步骤 ｜ REPRESENTATIONAL 具名产品/文件/格式/框架 ｜ LANGUAGE 术语约定 ｜ META 元层面
学习时机 stage：now 不懂就没法往下 ｜ when-needed 用得到时再学 ｜ deep-dive 要专门研究
验收方式 k：compute 能算/能跑出结果 ｜ judge 能判断对错好坏 ｜ use 能拿去用 ｜ accept 只能认（事实、约定、立场、他人经验）
注意：这些概念来自一篇**具体文章**，有些是文章里的细节术语。学习者做不到的事不要判 compute/use。

对下面每个概念输出一条：
{"i":序号,"domain":"<id>","type":"<枚举>","stage":"<枚举>","k":"<枚举>",
 "desc":"一句话定义，≤60字，中文，只用材料支持得住的内容",
 "evidence":["可观察的掌握证据1","可观察的掌握证据2"],
 "ap":"一句验收问句，必须含 {{name}} 占位，≤60字"}

概念清单：
${items.map((it, i) => `[${i}] ${it.full}
原文引文：${it.quotes.join(' ').slice(0, 320) || '（无）'}
费曼一下：${it.feynman.slice(0, 260) || '（无）'}`).join('\n\n')}

输出 JSON：{"items":[…]}`;
}
const B = 15;
const batches = [];
for (let i = 0; i < fresh.length; i += B) batches.push(fresh.slice(i, i + B));
const ann = new Array(fresh.length).fill(null);
let cur = 0, done = 0; const failed = [];
const worker = async () => {
  while (cur < batches.length) {
    const bi = cur++;
    const batch = batches[bi];
    try {
      const r = await askJson(SYS, prompt(batch), `neican-${ISSUE}-${bi}-${batch.map((x) => norm(x.name)).join(',')}`);
      for (const it of r.items || []) {
        const idx = Number(it.i);
        if (Number.isInteger(idx) && idx >= 0 && idx < batch.length) ann[bi * B + idx] = it;
      }
      done++;
      if (done % 2 === 0) console.log(`  …${done}/${batches.length} 组（tokens ${tokens}）`);
    } catch (e) { failed.push({ bi, err: String(e.message).slice(0, 120) }); }
  }
};
console.log(`新概念补齐：${batches.length} 组 · 并发 ${CONC}`);
await Promise.all(Array.from({ length: CONC }, worker));

const TYPES = new Set(['CONCEPTUAL', 'PROCEDURAL', 'REPRESENTATIONAL', 'LANGUAGE', 'META']);
const VERIF = new Set(['compute', 'judge', 'use', 'accept']);
const STAGES = new Set(['now', 'when-needed', 'deep-dive']);
const newNodes = [];
fresh.forEach((r, i) => {
  const a = ann[i] || {};
  newNodes.push({
    key: norm(r.name),
    name: r.name, nameEn: r.nameEn || '', gloss: r.gloss || '',
    aliases: [r.nameEn, r.gloss].filter(Boolean),
    origin: ['neican'],
    articles: 1,
    sources: [{ type: 'neican', label: TAG, article: r.article, url: r.url, id: `${r.slug}#${r.name}` }],
    bodies: r.quotes.length ? [{ source: TAG, article: r.article, text: r.quotes.join('\n\n') }] : [],
    feynmans: r.feynman ? [r.feynman] : [],
    values: [],
    sourceCount: 1, mentionCount: r.quotes.length || 1, merges: 0,
    domain: domainIds.includes(a.domain) ? a.domain : 'unclassified',
    type: TYPES.has(a.type) ? a.type : 'CONCEPTUAL',
    stage: STAGES.has(a.stage) ? a.stage : 'when-needed',
    k: VERIF.has(a.k) ? a.k : 'judge',
    desc: String(a.desc || '').trim().slice(0, 120) || r.gloss || `${r.name}（来自 ${TAG}）`,
    evidence: Array.isArray(a.evidence) ? a.evidence.slice(0, 3) : [],
    ap: String(a.ap || '').trim().slice(0, 120),
    annotated: !!ann[i],
  });
  newNodes[newNodes.length - 1].id = 'cm_' + hash8(norm(r.name));
  newNodes[newNodes.length - 1].slug = (r.nameEn || r.name).replace(/[\\/:*?"<>|#^[\]]/g, '').replace(/\s+/g, '-').slice(0, 60);
});
// id 撞车就补后缀
const taken = new Set(nodes.map((n) => n.id));
for (const n of newNodes) { while (taken.has(n.id)) n.id = n.id + 'a'; taken.add(n.id); }

console.log(`新节点 ${newNodes.length} · 已标注 ${newNodes.filter((n) => n.annotated).length} · 失败组 ${failed.length}`);
const byDom = {}; for (const n of newNodes) byDom[labelOf.get(n.domain) || n.domain] = (byDom[labelOf.get(n.domain) || n.domain] || 0) + 1;
console.log('  按领域：' + Object.entries(byDom).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · '));

/* ── ④ 新概念的前置依赖边（严判据）──────────────────────── */
const find = (k) => lookup.get(norm(k)) || newNodes.find((n) => norm(n.name) === norm(k))?.id || null;
const existing = new Set(edgeFile.dependencies.map((d) => d.topicId + '->' + d.prerequisiteId));
const groups = new Map();
for (const n of newNodes) { if (!groups.has(n.domain)) groups.set(n.domain, []); groups.get(n.domain).push(n); }
const edgeJobs = [...groups.entries()].filter(([, l]) => l.length >= 2);
const newEdges = [];
let c2 = 0;
const worker2 = async () => {
  while (c2 < edgeJobs.length) {
    const [dom, list] = edgeJobs[c2++];
    const body = list.map((n) => `${n.name}：${n.desc}`).join('\n');
    const prompt2 = `领域：${labelOf.get(dom) || dom}

下面是 **${TAG}** 这一期新收进地图的概念。请写出**组内**真正成立的前置依赖边，3–10 条，宁少勿滥。
只有「不懂前置，依赖方就立不住」才算依赖；只是相关、只是例子、只是可选组件都不算。

每条要能造出这句话：「不懂【前置】，就做不了【依赖方】的 ⟨具体哪件事⟩」。

概念清单：
${body}

输出 JSON：{"edges":[{"from":"依赖方概念名","to":"前置概念名","strength":"hard|soft","cannot":"不懂【to】就做不了【from】的 ⟨具体哪件事⟩"}]}`;
    try {
      const r = await askJson(SYS, prompt2, `neican-edge-${ISSUE}-${dom}-${list[0].id}`, 16000);
      for (const e of r.edges || []) {
        const a = find(e.from), b = find(e.to);
        if (!a || !b || a === b) continue;
        const key = a + '->' + b;
        if (existing.has(key)) continue;
        existing.add(key);
        newEdges.push({ topicId: a, prerequisiteId: b, strength: e.strength === 'hard' ? 'hard' : 'soft',
          kind: 'prerequisite', reason: String(e.cannot || '').slice(0, 140), origin: 'llm-strict', axis: 'neican' });
      }
    } catch { /* 单组失败不影响整体 */ }
  }
};
console.log(`新概念补边：${edgeJobs.length} 组`);
await Promise.all(Array.from({ length: Math.min(CONC, 4) }, worker2));

if (DRY) { console.log(`（--dry）将新增节点 ${newNodes.length} · 新边 ${newEdges.length}，没有写文件`); process.exit(0); }

/* ── ⑤ 落盘 ─────────────────────────────────────────────── */
enriched.nodes = [...nodes, ...newNodes];
enriched.stats = { ...enriched.stats, neicanAdded: newNodes.length };
enriched.neicanAt = new Date().toISOString();
edgeFile.dependencies = [...edgeFile.dependencies, ...newEdges];
const touched = new Set(); for (const e of edgeFile.dependencies) { touched.add(e.topicId); touched.add(e.prerequisiteId); }
edgeFile.stats = { ...edgeFile.stats, dependencies: edgeFile.dependencies.length, isolated: enriched.nodes.length - touched.size,
  byOrigin: tally(edgeFile.dependencies, 'origin'), byStrength: tally(edgeFile.dependencies, 'strength') };
function tally(arr, k) { const o = {}; for (const x of arr) o[x[k]] = (o[x[k]] || 0) + 1; return o; }
for (const [f, obj] of [['03-enriched.json', enriched], ['04-edges.json', edgeFile]]) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p + `.pre-neican-${ISSUE}.bak`)) fs.copyFileSync(p, p + `.pre-neican-${ISSUE}.bak`);
  fs.writeFileSync(p, JSON.stringify(obj, null, 1));
}
fs.writeFileSync(path.join(DIR, `08-neican-merge-${ISSUE}.json`), JSON.stringify({
  generatedAt: new Date().toISOString(), model: MODEL, tokens,
  parsed: raw.length, hitExisting: hits.length, added: newNodes.length, edges: newEdges.length, failed,
  hits: hits.map((h) => ({ neican: h.name, article: h.article, node: h.nodeName })),
  added_nodes: newNodes.map((n) => ({ id: n.id, name: n.name, domain: labelOf.get(n.domain) || n.domain, desc: n.desc, article: n.sources[0].article })),
}, null, 1));
console.log(`✅ ${TAG} 概念已并入地图`);
console.log(`  内参概念 ${raw.length} → 撞上已有 ${hits.length} · 新增 ${newNodes.length} · 新边 ${newEdges.length}`);
console.log(`  节点 ${nodes.length} → ${enriched.nodes.length} · 依赖 ${edgeFile.dependencies.length} · 孤立 ${edgeFile.stats.isolated}`);
console.log('  下一步：cm-build-map → cm-build-wiki → cm-wire → cm-validate → build-shell → build-public');
