#!/usr/bin/env node
// 概念提取视图 v2 · P1：多期概念辞典/页面数据 → 确定性重组
//   → knowledge/概念提取-260915/{cards.json, byConcept.json, manifest.json}
//
// 零 LLM。主源＝各期 内参-页面数据.json 的 article.conceptCards（name/quotes/feynman），
// 交叉核对＝概念辞典 md（同源，不重抽）+ 概念地图 topics.json（ref 匹配，与 build-shell 同口径）。
// 引文保真度分级（L1 逐字 / L2 空白归一 / L3 标点归一 / FAIL 未定位）在 check-concept-cards.mjs 里如实报告。
//
// 用法：node scripts/build-concept-cards.mjs [--periods 260910,260911,260912,260913,260914]

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'knowledge', '概念提取-260915');

// 与 build-shell.mjs 的匹配口径保持一致（\p{P}\p{S} 那套，\W 只认 ASCII 会吃光中文）
const norm = (x) => String(x).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
const normWs = (x) => String(x).replace(/[\s]+/gu, '');
const parts = (x) => { const m = String(x).match(/^(.+?)\s*[（(]([^()（）]+)[)）]\s*$/); return m ? [m[1].trim(), m[2].trim()] : [String(x).trim()]; };

const DEFAULT_PERIODS = ['260914', '260913', '260912', '260911', '260910']; // 新 → 旧
const argP = process.argv.find(a => a.startsWith('--periods='));
const PERIODS = argP ? argP.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : DEFAULT_PERIODS;

// ── 概念地图 topics（ref 匹配）──────────────────────────────────────────────
const topicsFile = path.join(ROOT, 'knowledge', '概念地图-260913', 'topics.json');
const topics = JSON.parse(readFileSync(topicsFile, 'utf8')).topics;
const topicById = new Map(topics.map(t => [t.id, t]));
const idx = new Map();
for (const t of topics) for (const k of [t.name, t.nameEn, ...(t.aliases || [])]) if (k && !idx.has(norm(k))) idx.set(norm(k), t.id);

// 与 build-shell 同款匹配：剥括号的中文名 / 括号里的英文名 / 整串
function matchTopic(full) {
  const id = parts(full).map(norm).map(k => idx.get(k)).find(Boolean) || idx.get(norm(full)) || null;
  return id ? { kind: 'cm', id } : null;
}

// ── 原文快照定位（引文 from 里的「原文快照定位」）────────────────────────────
function locateParas(period, slug, text) {
  const f = path.join(ROOT, 'knowledge', `内参-${period}`, '原文', `${slug}.md`);
  if (!existsSync(f)) return [];
  const orig = readFileSync(f, 'utf8');
  const out = [];
  // 去掉 frontmatter（第一个 --- 之后才算正文）
  const body = orig.replace(/^---[\s\S]*?---\s*/, '');
  let from = 0;
  const probe = normWs(text);
  while (from <= body.length) {
    const hit = body.indexOf(probe, from);
    if (hit < 0) break;
    const para = body.slice(0, hit).split(/\n\s*\n/).length;
    out.push(`para ${para}`);
    from = hit + Math.max(1, probe.length);
  }
  return out;
}

// ── 主流程 ─────────────────────────────────────────────────────────────────
const rawByPeriod = {};   // period → 原始卡数（对账用）
const occs = [];          // 每张原始卡一条 occurrence
let totalRaw = 0, skippedEmpty = 0, quoteCount = 0;

for (const period of PERIODS) {
  const dir = path.join(ROOT, 'knowledge', `内参-${period}`);
  const pdFile = path.join(dir, '内参-页面数据.json');
  if (!existsSync(pdFile)) { console.warn(`⚠ 缺 ${period} 页面数据，跳过`); continue; }
  const pd = JSON.parse(readFileSync(pdFile, 'utf8'));
  let n = 0;
  for (const art of pd.articles || []) {
    for (const c of art.conceptCards || []) {
      n++;
      const name = String(c.name || '').trim();
      if (!name || !norm(name)) { skippedEmpty++; continue; }
      for (const q of c.quotes || []) if (String(q || '').trim()) quoteCount++;
      occs.push({
        period, slug: art.slug, title: art.title, name,
        quotes: (c.quotes || []).map(q => String(q).trim()).filter(Boolean),
        feynman: String(c.feynman || '').trim(),
      });
    }
  }
  rawByPeriod[period] = n;
  totalRaw += n;
  console.log(`内参 ${period} 期：概念卡 ${n} 张`);
}

// 合并：同 norm(id) 的卡并成一张（跨期/跨篇聚合的重点）
const byId = new Map();
for (const o of occs) {
  const id = norm(o.name);
  let card = byId.get(id);
  if (!card) {
    card = {
      id, name: o.name, ref: matchTopic(o.name), quotes: [], feynman: '',
      appearances: [], reviewStatus: 'generated-unreviewed',
    };
    byId.set(id, card);
  }
  // name：出现最多；平票取期更新
  card._nameCount = (card._nameCount || 0) + 1;
  if (!card._nameWins || card._nameWins < card._nameCount || (card._nameWins === card._nameCount && o.period > card._period)) {
    card._nameWins = card._nameCount; card._name = o.name; card._period = o.period;
  }
  // feynman：取最长（信息量最大）
  if (o.feynman.length > card.feynman.length) card.feynman = o.feynman;
  // quotes：按空白归一去重；同一引文在多个 appearance 出现时，from 全记
  for (const q of o.quotes) {
    const k = normWs(q);
    let qo = card._quotes?.find(x => x.k === k);
    if (!qo) { qo = { text: q, k, froms: [] }; (card._quotes ||= []).push(qo); }
    const loc = `${o.period} · ${o.title} · 原文快照 ${locateParas(o.period, o.slug, q).join('/') || '（未逐字定位）'}`;
    if (!qo.froms.includes(loc)) qo.froms.push(loc);
  }
  // appearances
  if (!card.appearances.find(a => a.period === o.period && a.slug === o.slug)) {
    card.appearances.push({ period: o.period, slug: o.slug, article: o.title });
  }
}

const cards = [...byId.values()].map(c => {
  delete c._nameCount; delete c._nameWins; delete c._name; delete c._period;
  const quotes = (c._quotes || []).map(q => ({ text: q.text, from: q.froms.join('；') }));
  delete c._quotes;
  c.quotes = quotes;
  c.appearances.sort((a, b) => a.period === b.period ? (a.slug < b.slug ? -1 : 1) : (a.period > b.period ? -1 : 1));
  return c;
}).sort((a, b) => (b.appearances.length - a.appearances.length) || (a.id < b.id ? -1 : 1));

// byConcept：跨期聚合视图（反链 chips 与人工对账用）
const concepts = {};
for (const c of cards) {
  const periods = [...new Set(c.appearances.map(a => a.period))].sort().reverse();
  concepts[c.id] = {
    id: c.id, name: c.name, ref: c.ref,
    periodCount: periods.length, periods,
    appearances: c.appearances,
  };
}

// 校验和
const sha = (obj) => createHash('sha256').update(JSON.stringify(obj)).digest('hex');
const cardsSum = sha(cards);
const byConceptSum = sha(concepts);
const manifest = {
  schema: 'concept-card-v1',
  generatedAt: new Date().toISOString(),
  periods: PERIODS,
  rawCards: rawByPeriod, totalRaw, skippedEmpty,
  mergedCards: cards.length, quoteCount,
  files: { 'cards.json': cardsSum, 'byConcept.json': byConceptSum },
};

mkdirSync(OUT, { recursive: true });
writeFileSync(path.join(OUT, 'cards.json'), JSON.stringify(cards, null, 1));
writeFileSync(path.join(OUT, 'byConcept.json'), JSON.stringify(concepts, null, 1));
writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 1));

console.log(`\n概念提取 v1 落盘 → ${OUT}`);
console.log(`原始卡 ${totalRaw}（${PERIODS.map(p => `${p}:${rawByPeriod[p] ?? 0}`).join(' ') }）· 空名跳过 ${skippedEmpty}`);
console.log(`合并后 ${cards.length} 张 · 引文 ${quoteCount} 条 · 命中地图 ref ${cards.filter(c => c.ref).length} 张`);
console.log(`跨期卡（≥2 期出现）${cards.filter(c => c.appearances.length > 1).length} 张`);
console.log(`manifest 校验和：cards ${cardsSum.slice(0, 12)}… · byConcept ${byConceptSum.slice(0, 12)}…`);