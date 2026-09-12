#!/usr/bin/env node
// 概念地图 v2 · 第 2 步：合并去重 → 节点集（os-taxonomy 的 topics 雏形）。
//
// 规则（确定性，无 LLM）：
//   · 归一化名 = 小写 + 去空白/标点/括号
//   · 同一归一化名或命中别名索引 → 合并成一张卡；三条来源、所有正文都保留
//   · 不合并近义条（「harness」与「agent harness」是两张卡，由边表达关系）
//
// 用法：node scripts/cm-merge.mjs
// 产出：evidence/cm-260913/02-nodes.json

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'evidence', 'cm-260913');
const raw = JSON.parse(fs.readFileSync(path.join(OUT, '01-raw.json'), 'utf8'));

const norm = (s) => String(s).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
const hash8 = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
const slugify = (s) => String(s).trim()
  .replace(/[\\/:*?"<>|#^[\]]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .slice(0, 60);

const pool = new Map();      // normName -> node
const aliasIndex = new Map(); // normAlias -> normName

function add(c) {
  const nName = norm(c.name);
  if (!nName) return;
  let key = nName;
  if (!pool.has(key)) {
    const via = aliasIndex.get(nName);
    if (via && pool.has(via)) key = via;
  }
  const hit = pool.get(key);
  const src = { ...c.src, source: c.source };
  if (hit) {
    hit.merges += 1;
    if (!hit.sources.some((s) => JSON.stringify(s) === JSON.stringify(src))) hit.sources.push(src);
    for (const a of c.aliases || []) if (a && !hit.aliases.includes(a)) hit.aliases.push(a);
    if (c.nameEn && !hit.nameEn) hit.nameEn = c.nameEn;
    if (c.gloss && !hit.gloss) hit.gloss = c.gloss;
    if (c.body && !hit.bodies.some((b) => b.text === c.body)) hit.bodies.push({ source: c.src.label, article: c.src.article, text: c.body });
    if (c.feynman && !hit.feynmans.includes(c.feynman)) hit.feynmans.push(c.feynman);
    if (c.value && !hit.values.includes(c.value)) hit.values.push(c.value);
    return;
  }
  const node = {
    key,
    name: c.name,
    nameEn: c.nameEn || '',
    gloss: c.gloss || '',
    aliases: [...(c.aliases || [])],
    sources: [src],
    bodies: c.body ? [{ source: c.src.label, article: c.src.article, text: c.body }] : [],
    feynmans: c.feynman ? [c.feynman] : [],
    values: c.value ? [c.value] : [],
    merges: 0,
  };
  pool.set(key, node);
  for (const a of [node.name, ...node.aliases]) {
    const na = norm(a);
    if (na && !aliasIndex.has(na)) aliasIndex.set(na, key);
  }
}
// Notion 先建索引（索引型），飞书正文随后合并进来
const order = [...raw.concepts].sort((a, b) => (a.src.type === 'notion' ? -1 : 0) - (b.src.type === 'notion' ? -1 : 0));
for (const c of order) add(c);

/* ── 出卡 ───────────────────────────────────────────────── */
const nodes = [...pool.values()].map((n) => {
  const srcTypes = [...new Set(n.sources.map((s) => s.type))];
  const articles = new Set(n.sources.map((s) => s.src?.articleId || s.src?.article || s.src?.id).filter(Boolean));
  const domains = srcTypes.filter((t) => t !== 'notion');
  return {
    id: 'cm_' + hash8(n.key),
    slug: slugify(n.nameEn || n.name) || 'cm_' + hash8(n.key),
    name: n.name,
    nameEn: n.nameEn,
    gloss: n.gloss,
    aliases: n.aliases,
    origin: srcTypes,                     // notion / context / harness
    primaryOrigin: domains[0] || 'notion',
    articles: articles.size,
    sources: n.sources,
    bodies: n.bodies,
    feynmans: n.feynmans,
    values: n.values,
    sourceCount: srcTypes.length,
    mentionCount: n.sources.length,
    merges: n.merges,
  };
});
nodes.sort((a, b) => b.mentionCount - a.mentionCount || b.articles - a.articles || a.name.localeCompare(b.name, 'zh'));

const stats = {
  raw: raw.stats,
  unique: nodes.length,
  byOrigin: {
    notionOnly: nodes.filter((n) => n.origin.length === 1 && n.origin[0] === 'notion').length,
    contextOnly: nodes.filter((n) => n.origin.length === 1 && n.origin[0] === 'context').length,
    harnessOnly: nodes.filter((n) => n.origin.length === 1 && n.origin[0] === 'harness').length,
    multi: nodes.filter((n) => n.origin.length > 1).length,
  },
  withBody: nodes.filter((n) => n.bodies.length).length,
  withFeynman: nodes.filter((n) => n.feynmans.length).length,
  collisions: nodes.filter((n) => n.merges > 0).length,
};

fs.writeFileSync(path.join(OUT, '02-nodes.json'), JSON.stringify({ generatedAt: new Date().toISOString(), stats, nodes }, null, 1));
console.log('✅ 合并完成');
console.log(`   原始 ${raw.stats.total} → 唯一节点 ${stats.unique}`);
console.log(`   仅 Notion ${stats.byOrigin.notionOnly} · 仅 Context ${stats.byOrigin.contextOnly} · 仅 Harness ${stats.byOrigin.harnessOnly} · 跨源 ${stats.byOrigin.multi}`);
console.log(`   有正文 ${stats.withBody} · 有费曼 ${stats.withFeynman} · 发生过合并 ${stats.collisions}`);
console.log('   跨源命中示例：' + nodes.filter((n) => n.origin.length > 1).slice(0, 8).map((n) => n.name).join(' / '));
