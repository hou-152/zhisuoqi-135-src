#!/usr/bin/env node
// 概念图生成可行性验证 —— 「LLM 能不能从概念池生成可靠的前置依赖边？」
//
// 背景：Marble Skill Taxonomy（withmarbleapp/os-taxonomy）的形式是
//   点 = 1,590 个 micro-topic；边 = 3,221 条 prerequisite（hard/soft + 一句话 reason）。
//   边/点 = 2.03。94% 的边不跨 subject —— 学科是依赖关系自己聚出来的，不是先分类再连线。
//   135 现在只有 3 个孤立的点、零条边，这是「不单一、不泛化」的结构性来源。
//
// 本脚本验证整个方案押的唯一假设：抽象概念（"AI 时代怎么做事"）之间
// 能不能生成可靠的【认知前置】边。能 → 方案成立；不能 → 退回人工分类。
//
// ── 预注册（跑之前写死，防事后解释）─────────────────────────────
// 取样：12 篇文章各取原文前 3 个概念 = 36 个（不挑选，取抄录顺序，避免挑好看的）
// 提示词：见 buildPrompt()，跑之前不动
// 温度：0
//
// 失败判据（命中任一即判定该假设不成立）：
//   F1 边数 < 24      → 太稀，图不成立（Marble 比例 2.03/点，36 点应≈73 条）
//   F2 边数 > 180     → 太稠，在编关系（36 点完全图 630 条）
//   F3 出现环          → 不是 DAG，纵轴（依赖深度）算不出来
//   F4 空话理由 > 30%  → reason 无信息量
//   F5 孤立点 = 0      → LLM 不肯留白，说明它在给每个概念硬凑边
//
// 成功：同时满足 24 ≤ 边数 ≤ 180、无环、空话 ≤ 30%、孤立点 > 0
// 抽检：人工判 12 条边（脚本按固定间隔取，不挑）
//
// 用法：node scripts/gen-concept-graph.mjs
// 输出：evidence/concept-graph-verify-20260912.json

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
const ARGV = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, '').split('=')));
const PER_ARTICLE = Number(ARGV.per || 3);
const ONLY_ARTICLE = ARGV.article || null;   // --article=S12 只取该篇
const TAG = ARGV.tag || 'verify-20260912';
const EXTRA_RULE = ARGV.rule === 'noparallel'
  ? '\n7. 并列、同类、互斥的概念之间不连边，即使它们出自同一篇文章——它们是同一层的选项，不是彼此的认知前提。' : '';
const OUT = path.join(ROOT, 'evidence', `concept-graph-${TAG}.json`);

// ── env（.private/llm.env，600，不打印）─────────────────────────
const envTxt = fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8');
for (const line of envTxt.split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const BASE = process.env.LLM_API_BASE, KEY = process.env.LLM_API_KEY, MODEL = process.env.LLM_MODEL;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM_API_BASE / LLM_API_KEY / LLM_MODEL'); process.exit(2); }

// ── 解析概念池 ────────────────────────────────────────────────
const md = fs.readFileSync(POOL, 'utf8');
const concepts = [];
let art = null;
for (const L of md.split('\n')) {
  if (L.startsWith('## 第二部分')) break;   // 之后是统计表，不是概念
  const h = L.match(/^### (S\d+)\s+(.+?)\s*｜/);
  if (h) { art = { id: h[1], title: h[2] }; continue; }
  if (!art || !L.startsWith('| ') || L.startsWith('| 概念原文') || L.startsWith('|---')) continue;
  const c = L.split('|').map(s => s.trim());
  if (c.length < 5 || !c[1]) continue;
  concepts.push({ art: art.id, artTitle: art.title, name: c[1], type: c[2], gloss: c[4] });
}
// 每篇取前 PER_ARTICLE 个，不挑选
const picked = [];
const seen = new Map();
for (const c of concepts) {
  if (ONLY_ARTICLE && c.art !== ONLY_ARTICLE) continue;
  const n = seen.get(c.art) || 0;
  if (n >= PER_ARTICLE) continue;
  seen.set(c.art, n + 1);
  picked.push({ ...c, cid: 'C' + String(picked.length + 1).padStart(2, '0') });
}
console.log(`概念池 ${concepts.length} 条 / ${seen.size} 篇 → 取样 ${picked.length} 个`);

// ── 提示词（预注册，跑之前不动）───────────────────────────────
function buildPrompt(items) {
  const list = items.map(c =>
    `${c.cid} ｜ ${c.art}《${c.artTitle}》｜ ${c.name} ｜ ${c.gloss}`).join('\n');
  return `下面 ${items.length} 个概念，抄自 12 篇「AI 时代怎么做事」主题的文章。

${list}

任务：找出概念之间的【前置依赖】关系，产出一张有向无环图，输出 JSON。

边的方向定义：topicId depends on prerequisiteId
读作：**要真正理解 B，必须先理解 A** → B = topicId，A = prerequisiteId

严格要求：
1. 只在确有「必须先懂 A 才可能懂 B」的认知顺序时才连边。两个概念只是**相关、并列、同属一个话题、可以互相印证**，一律不连。
2. 宁缺毋滥。孤立节点是允许的，也是预期结果之一，不要为了让每个概念都有边而硬凑。
3. 每条边必须给 reason：一句话，具体说明「不懂 A 会卡在哪里」。禁止「前者是后者的基础」「后者依赖前者」这类空话，reason 里必须出现 A 或 B 的具体内容。
4. strength：hard = 不懂 A 就完全无法理解 B；soft = 有帮助但非必须。
5. 严禁环：不许出现 A→B 的同时 B→A，也不许更长的环。
6. 一个概念可以有多条前置，也可以一条都没有。${EXTRA_RULE}

只输出这个 JSON，不要别的内容：
{"edges":[{"topicId":"C12","prerequisiteId":"C03","strength":"hard","reason":"..."}],"isolated":["C05","C07"]}`;
}

// ── 调 LLM ───────────────────────────────────────────────────
const prompt = buildPrompt(picked);
console.log(`prompt ${prompt.length} 字符，调用 ${MODEL} …`);
const t0 = Date.now();
const res = await fetch(`${BASE.replace(/\/$/, '')}/chat/completions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
  body: JSON.stringify({
    model: MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0,
    response_format: { type: 'json_object' },
  }),
});
const raw = await res.text();
if (!res.ok) { console.error(`HTTP ${res.status}:`, raw.slice(0, 400)); process.exit(3); }
const data = JSON.parse(raw);
const content = data.choices?.[0]?.message?.content || '';
const usage = data.usage || {};
console.log(`返回 ${content.length} 字符，${usage.total_tokens ?? '?'} tokens，${((Date.now() - t0) / 1000).toFixed(1)}s`);

let parsed;
try { parsed = JSON.parse(content); }
catch (e) { console.error('JSON 解析失败：', content.slice(0, 400)); process.exit(4); }

// ── 校验 ─────────────────────────────────────────────────────
const ids = new Set(picked.map(c => c.cid));
const byCid = new Map(picked.map(c => [c.cid, c]));
const all = (parsed.edges || []).filter(e => ids.has(e.topicId) && ids.has(e.prerequisiteId) && e.topicId !== e.prerequisiteId);
const bad = (parsed.edges || []).length - all.length;
const isolated = (parsed.isolated || []).filter(i => ids.has(i));

// 环检测（DFS 三色）
const adj = new Map(picked.map(c => [c.cid, []]));
for (const e of all) adj.get(e.topicId).push(e.prerequisiteId);
const color = new Map(), cycles = [];
function dfs(n, stack) {
  color.set(n, 1); stack.push(n);
  for (const p of adj.get(n)) {
    if (color.get(p) === 1) cycles.push([...stack.slice(stack.indexOf(p)), p].join('→'));
    else if (!color.get(p)) dfs(p, stack);
  }
  stack.pop(); color.set(n, 2);
}
for (const c of picked) if (!color.get(c.cid)) dfs(c.cid, []);

// 空话理由启发式
const VAGUE = /^(前者|后者|A|B|该概念|这个概念)?(是|为|作为)?(后者|前者)?的?(基础|前提|前置|先决条件|背景)[。，,.]?$/;
const vague = all.filter(e => !e.reason || e.reason.length < 12 || VAGUE.test(e.reason.trim()));

// 图指标
const indeg = new Map(picked.map(c => [c.cid, 0])), outdeg = new Map(picked.map(c => [c.cid, 0]));
for (const e of all) { indeg.set(e.topicId, indeg.get(e.topicId) + 1); outdeg.set(e.prerequisiteId, outdeg.get(e.prerequisiteId) + 1); }
const memo = new Map();
function depth(id, seen) {
  if (memo.has(id)) return memo.get(id);
  seen.add(id);
  let m = 0;
  for (const e of all.filter(x => x.topicId === id)) {
    if (seen.has(e.prerequisiteId)) { m = -1; break; }
    const d = depth(e.prerequisiteId, seen); if (d < 0) { m = -1; break; }
    m = Math.max(m, d + 1);
  }
  seen.delete(id); memo.set(id, m); return m;
}
let maxDepth = 0;
for (const c of picked) maxDepth = Math.max(maxDepth, depth(c.cid, new Set()));

const hardN = all.filter(e => e.strength === 'hard').length;
const stats = {
  nodes: picked.length, edges: all.length,
  edgesPerNode: +(all.length / picked.length).toFixed(2),
  hard: hardN, soft: all.length - hardN,
  isolatedDeclared: isolated.length,
  nodesWithNoEdge: picked.filter(c => indeg.get(c.cid) === 0 && outdeg.get(c.cid) === 0).map(c => c.cid).length,
  danglingRefs: bad, cycles: cycles.length, vagueReasons: vague.length,
  vagueRate: all.length ? +(vague.length / all.length).toFixed(3) : 0,
  maxDepth,
};

// 预注册判据
const fails = [];
if (all.length < 24) fails.push(`F1 边数 ${all.length} < 24`);
if (all.length > 180) fails.push(`F2 边数 ${all.length} > 180`);
if (cycles.length) fails.push(`F3 出现 ${cycles.length} 个环`);
if (stats.vagueRate > 0.3) fails.push(`F4 空话理由占比 ${(stats.vagueRate * 100).toFixed(0)}% > 30%`);
if (isolated.length === 0 && stats.nodesWithNoEdge === 0) fails.push('F5 零孤立点');

// 固定间隔抽检 12 条（不挑）
const step = Math.max(1, Math.floor(all.length / 12));
const sample = all.filter((_, i) => i % step === 0).slice(0, 12).map(e => ({
  edge: `${byCid.get(e.topicId).name}  ← 依赖 ←  ${byCid.get(e.prerequisiteId).name}`,
  topicId: e.topicId, prerequisiteId: e.prerequisiteId,
  strength: e.strength, reason: e.reason,
  verdict: null,   // 人工填：ok / wrong / weak
}));

const out = {
  meta: {
    generatedAt: new Date().toISOString(),
    model: MODEL, temperature: 0, perArticle: PER_ARTICLE,
    source: 'research/内参概念池-AI时代怎么做事-20260912.md',
    reference: 'Marble Skill Taxonomy v1: 1590 topics / 3221 edges = 2.03 edges per node, 94% intra-subject',
    verdict: fails.length ? 'FAIL' : 'PASS',
    fails,
  },
  stats,
  nodes: picked.map(c => ({ cid: c.cid, art: c.art, name: c.name, type: c.type, gloss: c.gloss })),
  edges: all.map(e => ({ topicId: e.topicId, prerequisiteId: e.prerequisiteId, strength: e.strength, reason: e.reason })),
  isolated,
  cycles,
  manualSample: sample,
  prompt,
  usage,
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));

// ── 打印 ─────────────────────────────────────────────────────
console.log('\n=== 图指标 ===');
console.log(JSON.stringify(stats, null, 1));
console.log('\n=== 环 ===', cycles.length ? cycles.slice(0, 5) : '无');
console.log('\n=== 自动判定 ===', fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS（待人工抽检）');
console.log('\n=== 抽检样本（12 条，人工判 ok/wrong/weak）===');
for (const s of sample) console.log(`  [${s.strength}] ${s.edge}\n      ${s.reason}`);
console.log(`\n写入 ${path.relative(ROOT, OUT)}`);
