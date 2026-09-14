#!/usr/bin/env node
// 内参某期 → Notion「DaCapo · serious AI」空间落库（后端）。
//
// 口径：日报库（serious AI 日报 ｜daily）一行一期；阅读库（serious AI 阅读库｜reads）一行一篇，
// 页面正文 = 三级笔记 + 概念辞典 + AI 费曼 三段原始产物（不改写）。
// 属性映射：stars→信息质量分 · summary→一句话介绍 · tag→信息类型 · words→字数 ·
//           url→source link · 进度=2.2 已笔记+概念 · 概念提取+入库？=✓ · 🐻 日报=本期行（双向关系自动同步）。
// 幂等：按 source link 查重，已存在就跳过，可断点重跑。
//
// 前置：build-neican-daily.mjs（三产物）+ build-neican.mjs（内参-页面数据.json，取 stars/summary）
// 用法：node scripts/neican-to-notion.mjs --issue 260915 [--dry-run]
// 证据等级：实测（写入 Notion 为真调用；跑完打印每行 URL 供人工抽查）

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const NTN = path.join(process.env.HOME, '.local', 'bin', 'ntn');

// DaCapo · serious AI 空间（实测于 2026-09-15：ntn api /v1/data_sources/<id>）
const DS_READS = 'd52679b1-08ff-825d-99b9-87bb06e191a7';   // serious AI 阅读库｜reads
const DS_DAILY = '2cc679b1-08ff-834b-9acc-07819069899b';   // serious AI 日报 ｜daily

const ARGV = (() => {
  const a = process.argv.slice(2), o = {};
  for (let i = 0; i < a.length; i++) {
    const m = a[i].match(/^--([^=]+)(?:=(.*))?$/);
    if (!m) continue;
    o[m[1]] = m[2] !== undefined ? m[2] : (a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true);
  }
  return o;
})();
const ISSUE = ARGV.issue;
const DRY = 'dry-run' in ARGV;
if (!ISSUE) { console.error('用法：node scripts/neican-to-notion.mjs --issue 260915 [--dry-run]'); process.exit(2); }

const SRC = path.join(ROOT, 'knowledge', `内参-${ISSUE}`);
const PAGE_DATA = path.join(SRC, '内参-页面数据.json');
if (!fs.existsSync(PAGE_DATA)) { console.error(`❌ 缺 ${path.relative(ROOT, PAGE_DATA)} —— 先跑 build-neican.mjs --issue ${ISSUE}`); process.exit(2); }
const pd = JSON.parse(fs.readFileSync(PAGE_DATA, 'utf8'));
const issue = JSON.parse(fs.readFileSync(path.join(SRC, 'issue.json'), 'utf8'));
const DATE = pd.date || issue.date;

const ntn = (args, label) => {
  if (DRY) { console.log(`   [dry] ${label || args.join(' ').slice(0, 80)}`); return '{}'; }
  const out = execFileSync(NTN, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const t = (out || '').trim();
  return t.startsWith('{') || t.startsWith('[') ? out : '{}';
};
const api = (method, p, body, label) => JSON.parse(ntn(['api', '-X', method, p, '-d', JSON.stringify(body), '--json'], label || `${method} ${p}`));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 信息源映射（按域名；未命中回落 blog）
const sourceOf = (url) => {
  const h = (url || '').match(/https?:\/\/([^/]+)/)?.[1] || '';
  if (/weixin\.qq\.com/.test(h)) return '公众号';
  if (/(^|\.)x\.com$|twitter\.com$/.test(h)) return 'X / Twitter';
  if (/^github\.com$/.test(h)) return 'GitHub Blog';
  if (/^openai\.com$/.test(h)) return 'OpenAI';
  if (/^claude\.com$|^anthropic\.com$/.test(h)) return 'anthropic';
  return 'blog';
};

const readProduct = (it, dir) => {
  const f = path.join(SRC, dir, `${it.slug}.md`);
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8').trim() : '';
};

async function findDailyRow() {
  const name = `${ISSUE} 期`;
  const r = api('POST', '/v1/data_sources/' + DS_DAILY + '/query', {
    filter: { property: 'Name', title: { equals: name } }, page_size: 5,
  }, `查日报行 ${name}`);
  return (r.results || [])[0] || null;
}

async function createDailyRow() {
  const r = api('POST', '/v1/pages', { parent: { data_source_id: DS_DAILY }, properties: {
    'Name': { title: [{ text: { content: `${ISSUE} 期` } }] },
    '日期': { date: { start: DATE } },
    'agent': { select: { name: '内参编辑 agent' } },
    '精选入库？': { checkbox: true },
    '阅读进度': { status: { name: 'In progress' } },
  } }, `建日报行 ${ISSUE} 期`);
  console.log(`✅ 日报行「${ISSUE} 期」 ${r.url}`);
  return r;
}

async function findReadRow(url) {
  const r = api('POST', '/v1/data_sources/' + DS_READS + '/query', {
    filter: { property: 'source link', url: { equals: url } }, page_size: 5,
  }, `查重 ${(url || '').slice(0, 60)}`);
  return (r.results || [])[0] || null;
}

// ntn pages create 只收 markdown（含正文），/v1/pages PATCH 补结构化属性 —— 两步合一只此一处
async function createReadRow(it, stars, dailyPageId) {
  const note = readProduct(it, '三级笔记'), dict = readProduct(it, '概念辞典'), fey = readProduct(it, 'AI费曼');
  const parts = [];
  parts.push(`> 知所栖 135 · AI 内参 ${ISSUE} 期 · 第 ${it.no} 篇` + (it.topic ? ` · ${it.topic}` : '') + (it.starReason ? `\n> 入选理由：${it.starReason}` : ''));
  if (note) parts.push('# 三级笔记\n\n' + note);
  if (dict) parts.push('# 概念辞典\n\n' + dict);
  if (fey) parts.push('# AI 费曼\n\n' + fey);
  const content = parts.join('\n\n---\n\n') || `（${ISSUE} 期 · 第 ${it.no} 篇 · 三产物缺失，待补跑 build-neican-daily.mjs）`;

  const created = JSON.parse(ntn(['pages', 'create', '--parent', `data-source:${DS_READS}`, '--content', content, '--json'], `建页+正文 ${it.slug}`));
  if (!created || !created.id) throw new Error('ntn pages create 失败：' + JSON.stringify(created).slice(0, 200));

  const props = {
    '标题': { title: [{ text: { content: it.title } }] },
    'source link': { url: it.url || null },
    '发布日期': { date: { start: DATE } },
    '信息源': { select: { name: sourceOf(it.url) } },
    '信息类型': { multi_select: it.tag ? [{ name: it.tag }] : [] },
    '信息质量分': { select: { name: '★'.repeat(stars) + '☆'.repeat(5 - stars) } },
    '字数': { number: it.words || null },
    '进度': { status: { name: '2.2 已笔记+概念' } },
    '概念提取+入库？': { checkbox: true },
    '🐻 日报': { relation: [{ id: dailyPageId }] },
  };
  if (it.author) props['作者'] = { select: { name: it.author } };
  if (it.summary) props['一句话介绍'] = { rich_text: [{ text: { content: String(it.summary).slice(0, 1800) } }] };
  api('PATCH', '/v1/pages/' + created.id, { properties: props }, `补属性 ${it.slug}`);
  return created;
}

const daily = DRY ? { id: 'dry-daily' } : ((await findDailyRow()) || (await createDailyRow()));

let done = 0, skipped = 0, failed = 0;
for (const it of pd.articles) {
  const stars = Math.max(1, Math.min(5, Number(it.stars) || 3));
  try {
    if (!DRY) {
      const exists = await findReadRow(it.url);
      if (exists) { skipped++; console.log(`⏭  已存在，跳过：${it.title.slice(0, 40)}`); continue; }
      await sleep(400);
      const row = await createReadRow(it, stars, daily.id);
      done++;
      console.log(`✅ [${it.no}] ${it.title.slice(0, 40)} → ${row.url}`);
    } else {
      done++;
      console.log(`   [dry] [${it.no}] ${it.title.slice(0, 40)} ★${stars} ${sourceOf(it.url)}`);
    }
  } catch (e) {
    failed++;
    console.error(`❌ [${it.no}] ${it.title.slice(0, 40)}：${String(e.message).slice(0, 300)}`);
  }
  await sleep(400);
}

if (!DRY && daily.id && daily.id !== 'dry-daily') {
  try {
    await sleep(400);
    api('PATCH', '/v1/pages/' + daily.id, { properties: { '阅读进度': { status: { name: 'Done' } } } }, '日报行置 Done');
    console.log('✅ 日报行阅读进度 → Done');
  } catch (e) { console.error(`❌ 日报行置 Done 失败：${String(e.message).slice(0, 200)}`); }
}

console.log(`\n${ISSUE} 期落库：新建 ${done} · 跳过 ${skipped} · 失败 ${failed}${DRY ? '（dry-run，未写入）' : ''}`);
