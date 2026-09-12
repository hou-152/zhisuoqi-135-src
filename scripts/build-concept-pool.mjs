#!/usr/bin/env node
// 组装 llm-wiki 统一概念池（260912 v1）：把四个已有概念源合并、去重、标来源，一个不丢。
// 源：A 内参 73 篇详情概念区（1145 段）· B Notion 概念库（509 条名称+别名）·
//     C 260912 日报 10 篇概念辞典 · D 194 概念池（research/）
// 产出：knowledge/llm-wiki/概念池-260912.json / .md / 组装日志.md
// 只读四个源，不写回任何源（Notion/内参/日报产物均不动）。

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseConceptPool } from './lib/pool.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'knowledge', 'llm-wiki');
fs.mkdirSync(OUT, { recursive: true });

/* ── 源 A：内参 73 篇详情里的概念区 ────────────────────── */
const details = JSON.parse(fs.readFileSync(path.join(ROOT, 'evidence', 'neican-74-details-20260912.json'), 'utf8'));
const rawA = [];
for (const a of details.articles) {
  const det = a.detail || {};
  const art = det.article || {};
  for (const s of det.conceptSections || []) {
    if (!s.heading) continue;
    // 结构性容器标题（几乎每篇都有）不是概念
    const base = s.heading.replace(/\s*[（(][^()（）]*[)）]\s*$/, '').trim();
    if (['关键概念', '核心概念', '概念网络', '核心概念解析'].includes(base)) continue;
    // 概念名形如「中文（English）」：括号部分进别名，两条语言形态都能被合并命中
    const m = s.heading.match(/^(.+?)\s*[（(]([^()（）]+)[)）]\s*$/);
    const name = (m ? m[1] : s.heading).trim();
    const aliases = m ? [m[2].trim()] : [];
    rawA.push({
      name, aliases, body: (s.markdown || '').trim(),
      src: { type: '内参73篇', article: art.title || a.title, url: art.sourceUrl || '', id: art.id || a.id },
    });
  }
}

/* ── 源 B：Notion 概念库（名称 + 别名，纯索引无正文） ───── */
import { spawnSync } from 'node:child_process';
function notionConcepts() {
  const rows = [];
  let cursor = null;
  for (let page = 0; page < 40; page++) {
    const args = ['datasources', 'query', 'be5679b1-08ff-8337-bba6-87833bd1ec59', '--limit', '100'];
    if (cursor) args.push('--start-cursor', cursor);
    const r = spawnSync('ntn', args, { encoding: 'utf8', cwd: '/tmp' });
    const all = (r.stdout || '') + (r.stderr || ''); // ntn 的「还有下一页」提示打在 stderr
    for (const line of String(r.stdout || '').split('\n')) {
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}/.test(line)) continue;
      const col = line.split('\t');
      if (!col[1] || !col[1].trim()) continue;
      rows.push({ id: col[0], name: col[1].trim(), aliases: (col[2] || '').split(/[,，；;、]+/).map(s => s.trim()).filter(Boolean) });
    }
    const m = all.match(/--start-cursor (\S+)/);
    if (m && m[1] !== cursor) cursor = m[1]; else break;
  }
  return rows;
}
const rawB = notionConcepts().map(r => ({
  name: r.name,
  aliases: r.aliases,
  body: '',
  src: { type: 'Notion概念库', article: '', url: '', id: r.id },
}));

/* ── 源 C：260912 日报概念辞典 ─────────────────────────── */
const rawC = [];
const dailyDir = path.join(ROOT, 'knowledge', '内参-260912', '概念辞典');
for (const f of fs.readdirSync(dailyDir).filter(f => f.endsWith('.md'))) {
  const slug = f.replace(/\.md$/, '');
  const md = fs.readFileSync(path.join(dailyDir, f), 'utf8');
  const orig = fs.readFileSync(path.join(ROOT, 'knowledge', '内参-260912', '原文', slug + '.md'), 'utf8');
  const url = (orig.match(/^-\s*原文：(\S+)/m) || [, ''])[1];
  const title = (orig.match(/^#\s+(.+)$/m) || [, slug])[1];
  const sec = md.split(/^##\s+二、概念架构图/m)[0];
  for (const chunk of sec.split(/^###\s+/m).slice(1)) {
    const nm = chunk.match(/^(?:\d+[.、]?\s*)?\*\*(.+?)\*\*/) || chunk.match(/^(.+)/);
    if (!nm) continue;
    const name = nm[1].replace(/[（(].*?[)）]\s*$/, '').trim();
    const aliasEn = (chunk.match(/\*\*.+?\*\*[（(](.+?)[)）]/) || [, ''])[1].trim();
    const body = chunk.replace(/^[^\n]*\n/, '').trim();
    if (!name || name.length > 60) continue;
    rawC.push({ name, aliases: aliasEn ? [aliasEn] : [], body, src: { type: '日报260912', article: title, url, id: slug } });
  }
}

/* ── 源 D：194 概念池 ─────────────────────────────────── */
const poolMd = fs.readFileSync(path.join(ROOT, 'research', '内参概念池-AI时代怎么做事-20260912.md'), 'utf8');
const rawD = parseConceptPool(poolMd).map(n => {
  const m = String(n.name || '').match(/^(.+?)\s*[（(]([^()（）]+)[)）]\s*$/);
  return {
    name: (m ? m[1] : n.name).trim(), aliases: m ? [m[2].trim()] : [], body: n.gloss || '',
    src: { type: '池194', article: n.src || '', url: '', id: n.id },
    type: n.type,
  };
});

/* ── 合并：按规范化名称（含别名碰撞）去重 ───────────────── */
const norm = (s) => String(s).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
const pool = new Map(); // key -> entry
const aliasIndex = new Map(); // norm(alias) -> key
const stat = { raw: { 内参73篇: rawA.length, Notion概念库: rawB.length, 日报260912: rawC.length, 池194: rawD.length }, merged: 0 };

function add(item) {
  const nName = norm(item.name);
  let key = nName;
  if (!pool.has(key)) {
    const viaAlias = aliasIndex.get(nName);
    if (viaAlias && pool.has(viaAlias)) key = viaAlias;
  }
  const hit = pool.get(key);
  if (hit) {
    hit.merges += 1;
    for (const al of item.aliases || []) if (!hit.aliases.includes(al)) hit.aliases.push(al);
    hit.sources.push(item.src);
    if (item.body && !hit.bodies.some(b => b.body === item.body)) hit.bodies.push({ source: item.src.type, article: item.src.article, body: item.body });
    if (!hit.type && item.type) hit.type = item.type;
    return;
  }
  const entry = {
    name: item.name, aliases: [...(item.aliases || [])], type: item.type || '',
    sources: [item.src], bodies: item.body ? [{ source: item.src.type, article: item.src.article, body: item.body }] : [],
    merges: 0,
  };
  pool.set(key, entry);
  for (const al of entry.aliases) {
    const na = norm(al);
    if (na && !aliasIndex.has(na)) aliasIndex.set(na, key);
  }
}
for (const it of [...rawD, ...rawB, ...rawA, ...rawC]) add(it); // 先索引型后内容型，正文随内容型带入
stat.merged = pool.size;

/* ── 产出 ───────────────────────────────────────────── */
const entries = [...pool.values()].map(e => ({
  name: e.name, aliases: e.aliases, type: e.type,
  sources: e.sources, bodies: e.bodies,
  sourceCount: e.sources.length,
}));
entries.sort((a, b) => b.sourceCount - a.sourceCount || b.bodies.length - a.bodies.length);
fs.writeFileSync(path.join(OUT, '概念池-260912.json'), JSON.stringify({ generatedAt: new Date().toISOString(), stats: { ...stat, unique: entries.length }, concepts: entries }, null, 1));

const backbone = entries.filter(e => new Set(e.sources.map(s => s.type)).size >= 2).slice(0, 40);
const md = [`# llm-wiki 统一概念池 · 260912 v1`, '',
  `- 原始条目：${Object.values(stat.raw).reduce((a, b) => a + b, 0)}（${Object.entries(stat.raw).map(([k, v]) => `${k} ${v}`).join(' · ')}）`,
  `- 合并后唯一概念：**${entries.length}**`, '',
  `## 骨干概念（跨 ≥2 个源，llm-wiki 的核心节点候选）`, '',
  ...backbone.map(e => `- **${e.name}**${e.aliases.length ? `（${e.aliases.slice(0, 3).join(' / ')}）` : ''} —— ${[...new Set(e.sources.map(s => s.type))].join(' + ')}，${e.sources.length} 处`),
  '', `> 完整数据见 概念池-260912.json；源文件均未改动。`,
].join('\n');
fs.writeFileSync(path.join(OUT, '概念池-260912.md'), md);

const log = [`# 组装日志 · ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })}`, '',
  `- 源 A 内参73篇概念段：${rawA.length}（来自 73 篇详情，未动原文件）`,
  `- 源 B Notion概念库：${rawB.length}（只读 ntn 查询）`,
  `- 源 C 日报260912概念辞典：${rawC.length}（10 篇解析）`,
  `- 源 D 池194：${rawD.length}`,
  `- 合并后唯一概念：${entries.length}；跨源骨干（≥2 源）：${entries.filter(e => new Set(e.sources.map(s => s.type)).size >= 2).length}`,
  `- 证据等级：实测（全部来自已落盘数据/只读接口，无 LLM 参与，无外部新增）`,
].join('\n');
fs.writeFileSync(path.join(OUT, '组装日志.md'), log);

console.log(`✅ 概念池组装完成：原始 ${Object.values(stat.raw).reduce((a, b) => a + b, 0)} → 唯一 ${entries.length}`);
console.log(`   按源：${Object.entries(stat.raw).map(([k, v]) => `${k}=${v}`).join(' ')}`);
console.log(`   骨干（跨≥2源）：${entries.filter(e => new Set(e.sources.map(s => s.type)).size >= 2).length} 个 → ${path.relative(ROOT, path.join(OUT, '概念池-260912.md'))}`);
