#!/usr/bin/env node
// 内参「主题特刊」装配：把两份飞书主题精选（图文版，含全部正文）切成标准一期内参的原料。
//
//   Context Engineering（26+2 篇） → knowledge/内参-260910/
//   Harness Engineering（28+2 篇） → knowledge/内参-260911/
//
// 期号排在现有三期（260912–14）前面：日报集合与月历按期号排序，10 号 / 11 号自然点亮。
// 本脚本只做**确定性切分**（零 LLM）：原文快照 ＋ issue.json。三产物跑 build-neican-daily.mjs，
// 页面数据跑 build-neican.mjs——与 Readwise 日常期同一条产线、同一套断点缓存。
//
// url／作者归属：用图鉴站 sources.yaml 的 49 个来源标题做逐字 probe（同 build-source-chain.mjs
// 的口径：去引号取前 26 字），落在哪一篇的正文段里就归属哪一篇；对不上的照实留空，不硬凑。
//
// 用法：node scripts/build-neican-special.mjs [--write]   （不带 --write 只核对，不落盘）

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const WRITE = process.argv.includes('--write');
const EV = path.join(ROOT, 'evidence', '概念源-260913');
const ATLAS_SOURCES = path.join(ROOT, '内容结构化系统', '01-原始素材区', '完整副本', '图鉴站产物', 'sources.yaml');

const ISSUES = [
  {
    period: '260910', date: '2026-09-10', weekday: '星期四', prefix: 'ctx',
    file: path.join(EV, '飞书-Context-Engineering-26+2.md'),
    source: 'AI 内参主题精选 · 图文版：Context Engineering（Howie 原清单 26 篇 ＋ Codex 补充 2 篇；原清单更新于 2026-08-02）',
    theme: 'Context Engineering',
  },
  {
    period: '260911', date: '2026-09-11', weekday: '星期五', prefix: 'hn',
    file: path.join(EV, '飞书-Harness-Engineering-28+2.md'),
    source: 'AI 内参主题精选 · 图文版：Harness Engineering（Howie 原清单 28 篇 ＋ Codex 补充 2 篇；原清单更新于 2026-08-02）',
    theme: 'Harness Engineering',
  },
];

/* ── 图鉴站 49 个原始来源（与 build-source-chain.mjs 同一套极简 YAML 解析） ── */
function parseSources(file) {
  const text = fs.readFileSync(file, 'utf8');
  return text.split(/\n(?=- id:)/).filter((b) => b.trim().startsWith('- id:')).map((b) => {
    const get = (k) => { const m = b.match(new RegExp(`^\\s*(?:-\\s*)?${k}:\\s*(.+)$`, 'm')); return m ? m[1].trim().replace(/^["']|["']$/g, '') : ''; };
    return { id: get('id'), title: get('title'), author: get('author'), url: get('url') };
  }).filter((s) => s.id);
}
const probe = (t) => String(t || '').replace(/[“”"]/g, '').slice(0, 26);
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

/* ── 切分一份主题精选 ────────────────────────────────────────────── */
function splitCollection({ file, prefix }) {
  const text = fs.readFileSync(file, 'utf8');
  const markerRe = /^(HOWIE 原清单|CODEX 补充推荐)\s*·\s*(\d{2}|A\d)\s*$/gm;
  const marks = [];
  for (const m of text.matchAll(markerRe)) marks.push({ at: m.index, kind: m[1], id: m[2].toLowerCase() });
  const articles = marks.map((mk, i) => {
    const seg = text.slice(mk.at, i + 1 < marks.length ? marks[i + 1].at : undefined);
    const title = (seg.match(/^# (.+)$/m) || [])[1]?.trim() || '';
    const brief = (seg.match(/^\*\*(?:内容说明|补充推荐词)：\*\*(.+)$/m) || [])[1]?.trim() || '';
    const curators = (seg.match(/^\*\*(?:策展人按|Codex 按)：\*\*(.+)$/m) || [])[1]?.trim() || '';
    const bodyStart = seg.indexOf('以下为 AI 内参下载的 Markdown 正文');
    let body = bodyStart > -1 ? seg.slice(seg.indexOf('\n', bodyStart) + 1) : '';
    body = body.replace(/\n+$/, '');
    return { slug: `${prefix}-${mk.id}`, no: i + 1, title, brief, curators, body, seg };
  });
  return articles;
}

let bad = 0;
const need = (ok, msg) => { if (!ok) { bad++; console.error('  ✗ ' + msg); } };

for (const issue of ISSUES) {
  console.log(`\n══ ${issue.period} · ${issue.theme}`);
  const articles = splitCollection(issue);
  const expect = { ctx: 28, hn: 30 }[issue.prefix];
  need(articles.length === expect, `篇数 ${articles.length} ≠ 预期 ${expect}`);
  need(articles.every((a) => a.title), '有篇缺标题');
  need(articles.every((a) => a.body.length > 500), '有篇正文 < 500 字（切分串了？）');
  const dup = articles.length !== new Set(articles.map((a) => a.slug)).size;
  need(!dup, 'slug 重复');

  // url／作者归属：来源标题 probe 落进哪篇正文段就归哪篇（一篇可对多个来源，取第一个命中）
  const sources = parseSources(ATLAS_SOURCES);
  for (const a of articles) {
    const hit = sources.find((s) => probe(s.title).length > 6 && a.seg.includes(probe(s.title)));
    a.url = hit ? hit.url : '';
    a.site = hit ? (host(hit.url) || hit.id) : '';
    a.author = hit ? (hit.author || host(hit.url) || '') : '';
  }
  const withUrl = articles.filter((a) => a.url).length;
  console.log(`  ${articles.length} 篇 · url 归属 ${withUrl}（图鉴站来源 ${sources.length} 个）`);
  articles.slice(0, 3).forEach((a) => console.log(`    · ${a.slug} 《${a.title}》 ${a.url || '(无 url)'}`));

  if (!WRITE) continue;
  const SRC = path.join(ROOT, 'knowledge', `内参-${issue.period}`);
  if (fs.existsSync(SRC)) { console.error(`  ❌ ${path.relative(ROOT, SRC)} 已存在——不覆盖，先人工看过`); bad++; continue; }
  fs.mkdirSync(path.join(SRC, '原文'), { recursive: true });
  for (const a of articles) {
    const meta = [
      `# ${a.title}`, '',
      `- 标题：${a.title}`,
      `- 来源：${a.site || 'AI 内参主题精选'}`,
      `- 原文：${a.url}`,
      `- 作者：${a.author || '未署名'}`,
      `- 类型：主题特刊`,
      `- 摘要：${a.brief.slice(0, 220)}`,
      `- 收藏于：—（主题特刊；清单更新于 2026-08-02）`,
      `- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）`,
      `- 字数：${a.body.length}`,
      `- 策展人按：${a.curators}`, '',
      '---',
      a.body, '',
    ].join('\n');
    fs.writeFileSync(path.join(SRC, '原文', a.slug + '.md'), meta);
  }
  const issueJson = {
    period: issue.period,
    date: issue.date,
    weekday: issue.weekday,
    source: issue.source,
    pipeline: '原文快照 → 三级笔记 → 概念辞典 → AI 费曼示范',
    pulledAt: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }),
    items: articles.map((a) => ({
      slug: a.slug, no: a.no, id: a.slug, title: a.title, tag: '主题特刊',
      source: a.site || '', author: a.author || '', url: a.url,
      savedAt: '', category: 'article', words: a.body.length,
    })),
    skipped: [],
  };
  fs.writeFileSync(path.join(SRC, 'issue.json'), JSON.stringify(issueJson, null, 1) + '\n');
  console.log(`  ✓ 写入 ${SRC}（原文 ${articles.length} 份 ＋ issue.json）`);
}

console.log(bad ? `\n❌ ${bad} 处问题，未当通过` : '\n✓ 核对通过' + (WRITE ? '' : '（未落盘；加 --write 写入）'));
process.exit(bad ? 1 : 0);
