#!/usr/bin/env node
// ai-concept-base · 检索：在 538 条索引里找单元（本地、只读、不联网）
//
// 用法：
//   node scripts/query.mjs --q 关键词
//   node scripts/query.mjs --type 方案单元 --theme "AI 如何持续行动" --limit 10
//   node scripts/query.mjs --q harness --json
//   node scripts/query.mjs --id CON-agent-harness      # 看一条的全文
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(HERE, '..', 'data');
const argv = process.argv.slice(2);
const arg = (k, d = null) => {
  const i = argv.indexOf('--' + k);
  return i >= 0 ? (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true) : d;
};

const index = JSON.parse(fs.readFileSync(path.join(DATA, 'index.json'), 'utf8'));
const wantJson = Boolean(arg('json', false));

if (arg('id')) {
  const units = JSON.parse(fs.readFileSync(path.join(DATA, 'units.json'), 'utf8'));
  const u = units.find((x) => x.id === arg('id'));
  if (!u) { console.error('没找到：' + arg('id')); process.exit(1); }
  if (wantJson) { console.log(JSON.stringify(u, null, 1)); } else {
    console.log(`# ${u.title}\n`);
    console.log(`id: ${u.id}｜type: ${u.type}｜status: ${u.status}`);
    console.log(`themes: ${[].concat(u.themes).join(' / ')}｜keywords: ${[].concat(u.keywords).join(' / ')}`);
    console.log(`source: ${[].concat(u.source_documents).join(', ')}\n`);
    console.log(u.body);
  }
  process.exit(0);
}

const q = String(arg('q', '') || '').toLowerCase();
const type = arg('type', null);
const theme = arg('theme', null);
const limit = Number(arg('limit', 15));

const hit = (u) => {
  if (type && u.type !== type) return false;
  if (theme && ![].concat(u.themes).some((t) => String(t).includes(String(theme)))) return false;
  if (!q) return true;
  const hay = [u.id, u.title, u.gloss, ...[].concat(u.keywords), ...[].concat(u.themes)].join(' ').toLowerCase();
  return hay.includes(q);
};

const rows = index.filter(hit).slice(0, limit);
if (wantJson) { console.log(JSON.stringify(rows, null, 1)); } else {
  console.log(`${rows.length} 条（共 ${index.length}）\n`);
  for (const r of rows) {
    console.log(`${r.id}\n  ${r.type}｜${r.title}`);
    console.log(`  ${String(r.gloss).slice(0, 110)}`);
  }
  if (rows.length) console.log(`\n看全文：node scripts/query.mjs --id ${rows[0].id}`);
}
