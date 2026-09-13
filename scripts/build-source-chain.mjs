#!/usr/bin/env node
// 来源链：58 篇（Context 28 ＋ Harness 30）→ 49 个原始来源 → 76 张图鉴站卡片 → 六章的 CON/CAS/SOL。
//
// 起因：负责人质疑「Context 28 篇 + Harness 30 篇是图鉴站的根」。
// 实测：图鉴站 sources.yaml 里 49 个来源的标题，49/49 都能在那两份飞书文档里逐字找到；
//       但两边互不引用（卡片写 source_ids → 原始 URL；文档里 0 次提「图鉴」，sources.yaml 里 0 次提「内参/飞书」）。
// 所以本脚本只做一件事：把这条链**逐条核对并落盘**，让页面能显示「这张卡的知识根在哪」。
//
// 输入（全部只读）：
//   内容结构化系统/01-原始素材区/完整副本/飞书-Context-Engineering-26+2.md   SRC-EXT-001（28 篇）
//   内容结构化系统/01-原始素材区/完整副本/飞书-Harness-Engineering-28+2.md   SRC-EXT-002（30 篇）
//   内容结构化系统/01-原始素材区/完整副本/图鉴站产物/sources.yaml            49 个原始来源
//   内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/*.yaml         76 张卡（含 source_ids）
// 输出：
//   evidence/agent-loop-260913/source-chain.json
//
// 用法：node scripts/build-source-chain.mjs

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC_DIR = path.join(ROOT, '内容结构化系统', '01-原始素材区', '完整副本');
const ATLAS = path.join(SRC_DIR, '图鉴站产物');
const DOCS = {
  'SRC-EXT-001': path.join(SRC_DIR, '飞书-Context-Engineering-26+2.md'),
  'SRC-EXT-002': path.join(SRC_DIR, '飞书-Harness-Engineering-28+2.md'),
};
const OUT = path.join(ROOT, 'evidence', 'agent-loop-260913', 'source-chain.json');

/* ── 49 个原始来源（图鉴站 sources.yaml，极简 YAML：- id / title / author / url / source_type） ── */
function parseSources(file) {
  const text = fs.readFileSync(file, 'utf8');
  const blocks = text.split(/\n(?=- id:)/).filter((b) => b.trim().startsWith('- id:'));
  return blocks.map((b) => {
    const get = (k) => {
      const m = b.match(new RegExp(`^\\s*(?:-\\s*)?${k}:\\s*(.+)$`, 'm'));
      return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
    };
    return { id: get('id'), title: get('title'), author: get('author'), url: get('url'), sourceType: get('source_type') };
  }).filter((s) => s.id);
}

/* ── 76 张卡（只取 id / name_zh / source_ids，正文不搬） ── */
function parseCards(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort();
  return files.map((f) => {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    const one = (k) => { const m = text.match(new RegExp(`^${k}:\\s*(.+)$`, 'm')); return m ? m[1].trim() : ''; };
    const srcBlock = (text.match(/^source_ids:\n((?:\s+-\s+.+\n?)+)/m) || [])[1] || '';
    const sourceIds = [...srcBlock.matchAll(/-\s+(\S+)/g)].map((m) => m[1]);
    return { file: `concepts/${f}`, slug: f.replace(/\.yaml$/, ''), nameZh: one('name_zh'), sourceIds };
  });
}

const sources = parseSources(path.join(ATLAS, 'sources.yaml'));
const cards = parseCards(path.join(ATLAS, 'concepts'));
const bySource = new Map(sources.map((s) => [s.id, s]));

/* ── 链的第一环：每个来源的标题能不能在 58 篇里找到（逐字） ── */
const docsText = Object.fromEntries(Object.entries(DOCS).map(([k, p]) => [k, fs.readFileSync(p, 'utf8')]));
const allDocs = Object.values(docsText).join('\n');
const probe = (t) => t.replace(/["“”]/g, '').slice(0, 26);
const chain = sources.map((s) => {
  const key = probe(s.title);
  const inDocs = key.length > 6 && allDocs.includes(key);
  const which = Object.entries(docsText).filter(([, t]) => key.length > 6 && t.includes(key)).map(([k]) => k);
  return { ...s, inDocs, docIds: which, docCount: which.length };
});

/* ── 链的第二环：每张卡引用了哪些来源；哪些卡引用了一手来源（论文／研究） ── */
const PRIMARY = /^(paper|research|report)$/;
const cardRows = cards.map((c) => {
  const srcs = c.sourceIds.map((id) => bySource.get(id)).filter(Boolean);
  return {
    slug: c.slug, nameZh: c.nameZh, sourceIds: c.sourceIds,
    missing: c.sourceIds.filter((id) => !bySource.has(id)),
    primarySourceIds: srcs.filter((s) => PRIMARY.test(s.sourceType)).map((s) => s.id),
    sourceTypes: [...new Set(srcs.map((s) => s.sourceType))],
  };
});

const stats = {
  docs: Object.keys(DOCS).length,
  sources: sources.length,
  sourcesFoundInDocs: chain.filter((c) => c.inDocs).length,
  cards: cards.length,
  cardsWithSources: cardRows.filter((c) => c.sourceIds.length > 0).length,
  cardsWithPrimarySource: cardRows.filter((c) => c.primarySourceIds.length > 0).length,
  cardsWithMissingSource: cardRows.filter((c) => c.missing.length > 0).length,
  sourceTypeCount: sources.reduce((a, s) => { a[s.sourceType] = (a[s.sourceType] || 0) + 1; return a; }, {}),
};

const out = {
  version: 'v1',
  generatedAt: new Date().toISOString().slice(0, 10),
  note: '58 篇（Context 28 ＋ Harness 30）→ 49 个原始来源 → 76 张图鉴站卡片。inDocs 表示该来源标题能在 58 篇里逐字找到（这是「58 篇是根」的可核对证据，不是因果断言）。',
  docs: Object.entries(DOCS).map(([id, p]) => ({ id, path: path.relative(ROOT, p) })),
  stats,
  sources: chain,
  cards: cardRows,
};

fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log(`✅ 来源链就绪：${stats.sources} 个来源（在 58 篇里逐字命中 ${stats.sourcesFoundInDocs}）｜${stats.cards} 张卡（带来源 ${stats.cardsWithSources}｜带一手来源 ${stats.cardsWithPrimarySource}｜来源缺失 ${stats.cardsWithMissingSource}）`);
console.log(`   来源类型：${Object.entries(stats.sourceTypeCount).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
console.log(`   一手来源（可抽真实案例）：${chain.filter((s) => PRIMARY.test(s.sourceType)).map((s) => s.id).join(', ')}`);
console.log(`   ${path.relative(ROOT, OUT)}`);
