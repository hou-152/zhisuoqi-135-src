#!/usr/bin/env node
// 概念提取视图 v2 · P1 体检（零 LLM）
//   node scripts/check-concept-cards.mjs
// A 类（硬断言，全过才算绿）：manifest 校验和 · id 唯一且==norm(name) · reviewStatus 照实 ·
//   ref 存在且名字轮转能撞回 · 对账（原始卡数不丢）· byConcept 与 cards 一一对应 · appearance 可解析
// B 类（如实报告，不参与红绿）：引文保真度 L1 逐字 / L2 空白归一 / L3 标点归一同 / FAIL 未定位，
//   FAIL 逐条列出照实记账——现有 LLM 引文有改写/截断/语言不一致，检查只报告不粉饰。

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'knowledge', '概念提取-260915');
const norm = (x) => String(x).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
const normWs = (x) => String(x).replace(/[\s]+/gu, '');
const normP = (x) => String(x).replace(/[\s\p{P}\p{S}]+/gu, '');
const parts = (x) => { const m = String(x).match(/^(.+?)\s*[（(]([^()（）]+)[)）]\s*$/); return m ? [m[1].trim(), m[2].trim()] : [String(x).trim()]; };

let pass = 0, fail = 0;
const ok = (c, label) => { console.log(`${c ? '  ✓' : '  ✗'} ${label}`); if (c) pass++; else fail++; };

if (!existsSync(path.join(OUT, 'cards.json'))) { console.error(`缺 ${OUT}/cards.json —— 先跑 node scripts/build-concept-cards.mjs`); process.exit(2); }
const cards = JSON.parse(readFileSync(path.join(OUT, 'cards.json'), 'utf8'));
const concepts = JSON.parse(readFileSync(path.join(OUT, 'byConcept.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(path.join(OUT, 'manifest.json'), 'utf8'));
const topics = JSON.parse(readFileSync(path.join(ROOT, 'knowledge', '概念地图-260913', 'topics.json'), 'utf8')).topics;
const topicById = new Map(topics.map(t => [t.id, t]));
const idx = new Map();
for (const t of topics) for (const k of [t.name, t.nameEn, ...(t.aliases || [])]) if (k && !idx.has(norm(k))) idx.set(norm(k), t.id);

console.log(`概念提取 v1 体检：${cards.length} 张卡 · ${cards.reduce((s, c) => s + c.quotes.length, 0)} 条引文`);

// ── A 类硬断言 ────────────────────────────────────────────────────────────
console.log('\n[A 类 · 硬断言]');
const sha = (obj) => createHash('sha256').update(JSON.stringify(obj)).digest('hex');
ok(sha(cards) === manifest.files['cards.json'], 'manifest · cards.json 校验和一致');
ok(sha(concepts) === manifest.files['byConcept.json'], 'manifest · byConcept.json 校验和一致');

// id 唯一 && id==norm(name)
const ids = cards.map(c => c.id);
ok(new Set(ids).size === ids.length, `id 唯一（${ids.length} 张无重复）`);
const badId = cards.filter(c => c.id !== norm(c.name));
ok(badId.length === 0, `id==norm(name)（${badId.length} 张不符${badId[0] ? '，如 ' + badId[0].name : ''}）`);

// reviewStatus 照实
ok(cards.every(c => c.reviewStatus === 'generated-unreviewed'), 'reviewStatus 全部 generated-unreviewed（不冒充已审核）');

// ref 存在 + 名字轮转能撞回（防错配）
const badRef = [];
for (const c of cards) {
  if (!c.ref) continue;
  const t = topicById.get(c.ref.id);
  if (!t) { badRef.push(`${c.name}→${c.ref.id}（图里无此 id）`); continue; }
  const hit = parts(c.name).map(norm).map(k => idx.get(k)).find(Boolean) || idx.get(norm(c.name));
  if (hit !== c.ref.id) badRef.push(`${c.name}→${c.ref.id}（轮转撞到 ${hit}）`);
}
ok(badRef.length === 0, `ref 在图里且名字轮转能撞回（${badRef.length} 处不符${badRef[0] ? '：' + badRef[0] : ''}）`);

// 对账：原始卡数不丢
let rawTotal = 0; const rawBad = [];
for (const [period, n] of Object.entries(manifest.rawCards || {})) {
  const pdFile = path.join(ROOT, 'knowledge', `内参-${period}`, '内参-页面数据.json');
  if (!existsSync(pdFile)) { rawBad.push(`${period} 页面数据缺`); continue; }
  const pd = JSON.parse(readFileSync(pdFile, 'utf8'));
  const n2 = (pd.articles || []).reduce((s, a) => s + (a.conceptCards || []).length, 0);
  rawTotal += n2;
  if (n2 !== n) rawBad.push(`${period} 记录 ${n} ≠ 实测 ${n2}`);
}
ok(rawBad.length === 0 && rawTotal === manifest.totalRaw, `对账：原始卡数不丢（实测 ${rawTotal} = 记录 ${manifest.totalRaw}${rawBad[0] ? '；' + rawBad.join(',') : ''}）`);

// byConcept 与 cards 一一对应
const cidSet = new Set(cards.map(c => c.id));
const kidIds = Object.keys(concepts);
ok(kidIds.length === ids.length && kidIds.every(k => cidSet.has(k)), `byConcept 与 cards 一一对应（${kidIds.length} ≡ ${ids.length}）`);
const appMismatch = cards.filter(c => JSON.stringify(concepts[c.id]?.appearances) !== JSON.stringify(c.appearances));
ok(appMismatch.length === 0, `byConcept.appearances 与 cards.appearances 全等（${appMismatch.length} 张不符）`);

// appearance 可解析（期+slug 都在该期页面数据里）
const appBad = [];
for (const c of cards) for (const a of c.appearances) {
  const pdFile = path.join(ROOT, 'knowledge', `内参-${a.period}`, '内参-页面数据.json');
  if (!existsSync(pdFile)) { appBad.push(`${c.id}→${a.period} 页面数据缺`); continue; }
  const pd = JSON.parse(readFileSync(pdFile, 'utf8'));
  if (!(pd.articles || []).some(x => x.slug === a.slug)) appBad.push(`${c.id}→${a.period}/${a.slug} 无此文`);
}
ok(appBad.length === 0, `appearances 的期/篇可解析（${appBad.length} 处异常${appBad[0] ? '：' + appBad[0] : ''}）`);

// ── B 类：引文保真度（如实报告）───────────────────────────────────────────
console.log('\n[B 类 · 引文保真度 — 如实报告，不参与红绿]');
let L1 = 0, L2 = 0, L3 = 0, FAIL = 0, qTotal = 0, noQuoteCards = 0;
const failSamples = [];
const bodies = new Map(); // period/slug → 原文正文（去 frontmatter）
const src = (period, slug) => {
  const k = period + '/' + slug;
  if (!bodies.has(k)) {
    const f = path.join(ROOT, 'knowledge', `内参-${period}`, '原文', `${slug}.md`);
    let b = '';
    try { b = readFileSync(f, 'utf8').replace(/^---[\s\S]*?---\s*/, ''); } catch {}
    bodies.set(k, b);
  }
  return bodies.get(k);
};
for (const c of cards) {
  if (!c.quotes.length) noQuoteCards++;
  for (const q of c.quotes) {
    qTotal++;
    const text = String(q.text || '');
    if (!text.trim()) { FAIL++; if (failSamples.length < 20) failSamples.push(`${c.name} :: 空引文`); continue; }
    let found = false;
    for (const a of c.appearances) {
      const orig = src(a.period, a.slug);
      if (!orig) continue;
      if (orig.includes(text)) { L1++; found = true; break; }
      const ow = normWs(orig);
      if (ow.includes(normWs(text))) { L2++; found = true; break; }
      const op = normP(orig);
      if (op.includes(normP(text))) { L3++; found = true; break; }
    }
    if (!found) { FAIL++; if (failSamples.length < 20) failSamples.push(`${c.name} :: ${text.slice(0, 46)}`); }
  }
}
const pct = (n) => `${n}（${(n / Math.max(1, qTotal) * 100).toFixed(1)}%）`;
console.log(`引文 ${qTotal} 条 · L1 逐字 ${pct(L1)} · L2 空白归一同 ${L2} · L3 标点归一同 ${pct(L3)} · FAIL 未定位 ${pct(FAIL)}`);
console.log(`无引文卡 ${noQuoteCards} 张（md 无 blockquote 引用 → 页面数据 quotes 为空，照实）`);
if (failSamples.length) {
  console.log(`FAIL 样例（前 ${failSamples.length} 条）：`);
  for (const f of failSamples) console.log('  -', f);
  console.log('  → 引文改写/截断/语言不一致是既有 LLM 产物的实况；零 LLM 边界下只报告不修复，是否重烧由验收方裁决。');
}

console.log(`\n体检：A 类 ${pass - 0} 过 / ${fail} 败 · B 类照实报告`);
process.exit(fail ? 1 : 0);