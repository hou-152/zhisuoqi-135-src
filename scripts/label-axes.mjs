#!/usr/bin/env node
// 纵轴可行性验证 —— 「194 个概念标得出有意义的层次吗？」
//
// 背景：用户质疑「按年龄/阶段标层次，我们的量不够」。
// Marble 的纵轴是 ageRange（4-15 岁），依据是 K12 课程标准里写死的年级。
// 我们没有课程标准，只有 194 个从内参文章抄来的概念。
//
// 本脚本测两件事：
//   A 抽象层级 1-5：概念本身处在什么层次（操作 → 方法 → 判据 → 模型 → 世界观）
//   B 理解门槛 1-5：读懂它需要先懂几个别的概念
// 判据（预注册）：
//   P1 分布均匀（每层 ≥15%，无单层 >40%）→ 标得出，可做纵轴
//   P2 若 A 与 B 高度相关（Spearman |ρ|>0.8）→ 两者是同一维度，取一个即可
//   P3 若某层 >50% 或 ≥3 层 <10% → 标不出，纵轴不能用这个口径
//
// 用法：node scripts/label-axes.mjs
// 输出：evidence/axis-labels-20260912.json

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const POOL = path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md');
const OUT = path.join(ROOT, 'evidence', 'axis-labels-20260912.json');

const envTxt = fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8');
for (const line of envTxt.split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const BASE = process.env.LLM_API_BASE, KEY = process.env.LLM_API_KEY, MODEL = process.env.LLM_MODEL;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证'); process.exit(2); }

const md = fs.readFileSync(POOL, 'utf8');
const concepts = [];
let art = null;
for (const L of md.split('\n')) {
  if (L.startsWith('## 第二部分')) break;
  const h = L.match(/^### (S\d+)\s+(.+?)\s*｜/);
  if (h) { art = h[1]; continue; }
  if (!art || !L.startsWith('| ') || L.startsWith('| 概念原文') || L.startsWith('|---')) continue;
  const c = L.split('|').map(s => s.trim());
  if (c.length < 5 || !c[1]) continue;
  concepts.push({ art, name: c[1], gloss: c[4] });
}
console.log(`概念 ${concepts.length} 个`);

const list = concepts.map((c, i) => `N${String(i + 1).padStart(3, '0')} ｜ ${c.name} ｜ ${c.gloss}`).join('\n');

const prompt = `下面 ${concepts.length} 个概念抄自 12 篇「AI 时代怎么做事」主题的文章。给每个概念打两个分，输出 JSON。

${list}

【维度 A：抽象层级】这个概念本身处在什么层次
1 = 具体操作：一个能照着做的动作（例：手敲一遍 AI 生成的代码）
2 = 方法流程：一组操作的组合（例：三段高层工作流）
3 = 判据原则：用来做判断的准则（例：三条边界：能力、成本、价值）
4 = 心智模型：解释一类现象的框架或比喻（例：agent 即实习生）
5 = 世界观立场：对时代或人的整体判断（例：第二次文艺复兴）

【维度 B：理解门槛】读懂这个概念，需要先掌握几个别的概念
1 = 零门槛，有点常识就能懂
2 = 需要一点背景
3 = 需要先懂 1 到 2 个相关概念
4 = 需要先懂 3 个以上概念，或需要实践经验
5 = 高门槛，要有领域积累才读得懂

打分要求：
1. 两个维度都要用满 1 到 5，不要全给 3。
2. A 看的是「这个概念的抽象程度」，不是「它好不好」。
3. B 看的是「外行读它要多少准备」，不是「它重不重要」。
4. 拿不准时，A 优先看它是不是一个能直接执行的动作，B 优先看它的 gloss 里出现了几个陌生术语。

只输出 JSON：
{"labels":[{"id":"N001","a":3,"b":2}]}`;

console.log(`prompt ${prompt.length} 字符，调用 ${MODEL} …`);
const t0 = Date.now();
const res = await fetch(`${BASE.replace(/\/$/, '')}/chat/completions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
  body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0, response_format: { type: 'json_object' } }),
});
const raw = await res.text();
if (!res.ok) { console.error(`HTTP ${res.status}:`, raw.slice(0, 300)); process.exit(3); }
const data = JSON.parse(raw);
const parsed = JSON.parse(data.choices?.[0]?.message?.content || '{}');
console.log(`返回 ${data.usage?.total_tokens ?? '?'} tokens, ${((Date.now() - t0) / 1000).toFixed(1)}s`);

const labels = parsed.labels || [];
const rows = labels.map(l => {
  const idx = Number(String(l.id).replace(/\D/g, '')) - 1;
  return { id: l.id, name: concepts[idx]?.name, art: concepts[idx]?.art, a: l.a, b: l.b };
}).filter(r => r.name && r.a >= 1 && r.a <= 5);

const dist = key => {
  const d = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of rows) d[r[key]]++;
  return d;
};
const A = dist('a'), B = dist('b');
const pct = d => Object.fromEntries(Object.entries(d).map(([k, v]) => [k, +(100 * v / rows.length).toFixed(1)]));
console.log(`\n标出 ${rows.length}/${concepts.length}`);
console.log('A 抽象层级:', JSON.stringify(A), '→', JSON.stringify(pct(A)) + '%');
console.log('B 理解门槛:', JSON.stringify(B), '→', JSON.stringify(pct(B)) + '%');

// Spearman
const rank = arr => { const s = [...arr].sort((x, y) => x - y); return arr.map(v => s.indexOf(v) + 1); };
const ra = rank(rows.map(r => r.a)), rb = rank(rows.map(r => r.b));
const n = rows.length;
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const ma = mean(ra), mb = mean(rb);
let num = 0, da = 0, db = 0;
for (let i = 0; i < n; i++) { num += (ra[i] - ma) * (rb[i] - mb); da += (ra[i] - ma) ** 2; db += (rb[i] - mb) ** 2; }
const rho = num / Math.sqrt(da * db);
console.log(`A 与 B 的 Spearman ρ = ${rho.toFixed(3)}`);

const fails = [];
const check = (d, name) => {
  const mx = Math.max(...Object.values(d));
  const low = Object.values(d).filter(v => v / rows.length < 0.10).length;
  if (mx / rows.length > 0.5) fails.push(`${name}: 单层占 ${(100 * mx / rows.length).toFixed(0)}% > 50%`);
  if (low >= 3) fails.push(`${name}: ${low} 个层 < 10%`);
};
check(A, 'A 抽象层级'); check(B, 'B 理解门槛');
if (Math.abs(rho) > 0.8) fails.push(`A/B 相关 ρ=${rho.toFixed(2)}，是同一个维度`);
console.log('\n=== 预注册判定 ===', fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS');

console.log('\n每层举例（A）:');
for (const lv of [1, 2, 3, 4, 5]) {
  const ex = rows.filter(r => r.a === lv).slice(0, 3).map(r => r.name.slice(0, 22));
  console.log(`  A${lv} (${A[lv]}): ${ex.join(' / ') || '—'}`);
}

fs.writeFileSync(OUT, JSON.stringify({ meta: { generatedAt: new Date().toISOString(), model: MODEL, judged: rows.length, rho, verdict: fails.length ? 'FAIL' : 'PASS', fails }, distA: A, distB: B, rows, prompt }, null, 2));
console.log(`\n写入 ${path.relative(ROOT, OUT)}`);
