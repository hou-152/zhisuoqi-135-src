#!/usr/bin/env node
// 一期「AI 内参」的第一站：把某一天 Readwise Reader **Inbox**（location=new）的新增收藏抓成快照。
//
// 口径（照 lobster-daily skill 的严格过滤规则）：
//   日报期 = 目标日期当天（Asia/Shanghai 00:00–24:00），按 `saved_at` 严格筛，不看 updated_at；
//   只收 location=new（手动存进 Inbox 的），RSS 订阅流（location=feed）**不算**——那是信息流的流水，
//   一夜几十条，与「昨天我存了什么」不是一件事。
//
// 用法：
//   node scripts/pull-readwise-inbox.mjs --date 2026-09-13 [--issue 260913] [--limit=100]
// 产出：
//   evidence/内参-<issue>/readwise-原始返回.json     候选快照（含被排除的 feed 条目，便于事后追查）
//   knowledge/内参-<issue>/原文/<slug>.md            每篇：元信息 + 正文（Reader Markdown）
//   knowledge/内参-<issue>/issue.json                本期清单（build-neican-daily / build-neican 读它）
// 证据等级：实测（数据来自 Readwise Reader API，未经人工核对）

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const ARGV = (() => {                        // 两种写法都收：--date 2026-09-13 与 --date=2026-09-13
  const a = process.argv.slice(2), o = {};
  for (let i = 0; i < a.length; i++) {
    const m = a[i].match(/^--([^=]+)(?:=(.*))?$/);
    if (!m) continue;
    o[m[1]] = m[2] !== undefined ? m[2] : (a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true);
  }
  return o;
})();
const DATE = ARGV.date;                       // 2026-09-13
if (!/^\d{4}-\d{2}-\d{2}$/.test(DATE || '')) { console.error('用法：node scripts/pull-readwise-inbox.mjs --date 2026-09-13 [--issue 260913]'); process.exit(2); }
const ISSUE = ARGV.issue || DATE.slice(2).replace(/-/g, '');
const LIMIT = Number(ARGV.limit || 100);

const EVID = path.join(ROOT, 'evidence', `内参-${ISSUE}`);
const OUT = path.join(ROOT, 'knowledge', `内参-${ISSUE}`);
fs.mkdirSync(EVID, { recursive: true });
fs.mkdirSync(path.join(OUT, '原文'), { recursive: true });

/* ── 可读 slug：默认从 URL 派生，认不出来的用 id 兜底；下面这张表只覆盖「派生出来不可读」的 ── */
const SLUG = {
  '01m2cy05975thrfk8sb394ryn8': 'dario-pace-the-frontier',
  '01m2cy0navcy8cgqkcxn9tswmj': 'openai-astra-skills-and-prompts',
  '01m2cy1wkrzz18hz7ek9jjty8h': 'apple-ceo-ternus',
  '01m2d09v2d8wsj2f1jyreqqtca': 'andrew-ng-ai-engineering-skills-map',
  '01m2djd4b88fzm01gh05ekmvwa': 'archify',
  '01m2djdx3pd0a8y67x73vm22hg': 'raschka-gpt6-astra-looped-transformers',
  '01m2dje2j5mwtrg022f2c88z29': 'calnewport-ai-agent-civilizations',
  '01m2djgk9a5ea5jq6fhhygwg8y': 'ai-apps-not-a-good-business',
};
const TAG = {                                  // 条目类型：只有这几种，用于列表角标与配图字形
  '01m2cy05975thrfk8sb394ryn8': '观点文',
  '01m2cy0navcy8cgqkcxn9tswmj': '官方文档',
  '01m2cy1wkrzz18hz7ek9jjty8h': '行业观察',
  '01m2d09v2d8wsj2f1jyreqqtca': '技能地图',
  '01m2djd4b88fzm01gh05ekmvwa': '开源项目',
  '01m2djdx3pd0a8y67x73vm22hg': '技术拆解',
  '01m2dje2j5mwtrg022f2c88z29': '观点文',
  '01m2djgk9a5ea5jq6fhhygwg8y': '商业观察',
};

function readwise(args) {
  const out = execFileSync('readwise', ['--json', ...args], { maxBuffer: 64 * 1024 * 1024 });
  return JSON.parse(out.toString('utf8'));
}
function slugOf(d) {
  if (SLUG[d.id]) return SLUG[d.id];
  try {
    const u = new URL(d.source_url || d.url);
    const host = u.hostname.replace(/^www\./, '').split('.')[0].replace(/[^a-z0-9]/gi, '');
    const last = u.pathname.split('/').filter(Boolean).pop() || '';
    const p = last.replace(/\.[a-z]+$/i, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    if (p.length >= 4) return `${host}-${p}`.slice(0, 60);
    return `${host}-${d.id.slice(-6)}`;
  } catch { return 'doc-' + d.id; }
}
const FIELDS = ['url', 'title', 'author', 'category', 'location', 'tags', 'site_name', 'word_count',
  'reading_time', 'created_at', 'updated_at', 'published_date', 'summary', 'source_url', 'saved_at',
  'last_moved_at', 'is_deleted'];

// ── 1. 候选：Inbox（location=new），updated_after 只用来放宽范围，最终按 saved_at 严格筛 ──
const lo = new Date(`${DATE}T00:00:00+08:00`);
const hi = new Date(lo.getTime() + 86400000);
const raw = readwise(['reader-list-documents', '--location', 'new', '--limit', String(LIMIT),
  '--updated-after', new Date(lo.getTime() - 30 * 86400000).toISOString(),
  '--response-fields', FIELDS.join(',')]);
const all = raw.results || [];
const at = (s) => (s ? new Date(s) : null);
const inbox = all.filter((d) => {
  const t = at(d.saved_at);
  return t && t >= lo && t < hi && d.is_deleted !== true && d.location === 'new';
}).sort((a, b) => new Date(a.saved_at) - new Date(b.saved_at));
const skippedFeed = all.filter((d) => { const t = at(d.saved_at); return t && t >= lo && t < hi && d.location !== 'new'; });

// 同期的 RSS 订阅流（location=feed）另存一份：**不纳入本期**，只作「那天还涌进来多少条」的凭证
let feedAll = [];
try {
  feedAll = (readwise(['reader-list-documents', '--location', 'feed', '--limit', '100',
    '--updated-after', lo.toISOString(), '--response-fields', FIELDS.join(',')]).results || [])
    .filter((d) => { const t = at(d.saved_at); return t && t >= lo && t < hi; });
} catch (e) { console.warn('⚠ 订阅流快照抓取失败：' + String(e.message || e).slice(0, 80)); }

console.log(`候选 ${all.length} 条 · ${DATE} 当天 Inbox ${inbox.length} 篇 · 同期 RSS 订阅流 ${feedAll.length} 条（不纳入本期，仅留凭证）`);

// ── 2. 逐篇取正文 ────────────────────────────────────────────────────────
const details = [];
for (const d of inbox) {
  const det = readwise(['reader-get-document-details', '--document-id', d.id]);
  details.push({ list: d, detail: det });
  const slug = slugOf(d);
  const body = String(det.content || '').trim();
  const meta = [
    `# ${d.title}`,
    '',
    `- 标题：${d.title}`,
    `- 来源：${d.site_name || ''}`,
    `- 原文：${d.source_url || d.url || ''}`,
    `- 作者：${d.author || '未署名'}`,
    `- 类型：${TAG[d.id] || '文章'}`,
    `- 摘要：${(d.summary || '').trim()}`,
    `- 收藏于：${new Date(d.saved_at).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })}`,
    `- 抓取：Reader 快照（${new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })}）`,
    `- 字数：${body.length}`,
    '',
    '---',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(OUT, '原文', slug + '.md'), meta + body + '\n');
  console.log(`  · ${slug}（${body.length} 字）${d.title.slice(0, 40)}`);
}

// ── 3. 快照与清单 ────────────────────────────────────────────────────────
fs.writeFileSync(path.join(EVID, 'readwise-原始返回.json'), JSON.stringify({
  date: DATE, issue: ISSUE, pulledAt: new Date().toISOString(),
  query: { location: 'new', limit: LIMIT, fields: FIELDS },
  fetched: all, inbox, skippedNotInbox: skippedFeed, feedWindow: feedAll,
}, null, 1));

const weekday = '日一二三四五六'[hi.getDay() === 0 ? 0 : new Date(`${DATE}T12:00:00+08:00`).getDay()];
const items = inbox.map((d, i) => ({
  slug: slugOf(d), no: i + 1, id: d.id, title: d.title, tag: TAG[d.id] || '文章',
  source: d.site_name || '', author: d.author || '', url: d.source_url || d.url || '',
  savedAt: d.saved_at, category: d.category,
  words: fs.readFileSync(path.join(OUT, '原文', slugOf(d) + '.md'), 'utf8').split('\n---\n').slice(1).join('\n---\n').trim().length,
}));
const issue = {
  period: ISSUE, date: DATE,
  weekday: '星期' + '日一二三四五六'[new Date(`${DATE}T12:00:00+08:00`).getDay()],
  source: `Readwise Inbox ${DATE} 新增收藏 ${items.length} 篇（同期 RSS 订阅流 ${skippedFeed.length} 条未纳入）`,
  pipeline: '原文快照 → 三级笔记 → 概念辞典 → AI 费曼示范',
  pulledAt: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }),
  items,
  skipped: [],
};
fs.writeFileSync(path.join(OUT, 'issue.json'), JSON.stringify(issue, null, 1));
console.log(`✅ ${path.relative(ROOT, OUT)}/issue.json（${items.length} 篇）· 快照 ${path.relative(ROOT, path.join(EVID, 'readwise-原始返回.json'))}`);
console.log(`   ${weekday ? '' : ''}日期 ${DATE} 星期${issue.weekday.slice(-1)}`);
