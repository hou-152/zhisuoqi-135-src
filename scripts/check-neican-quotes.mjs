#!/usr/bin/env node
// 内参三产物引文体检：概念辞典引用块 > 必须逐字命中原文（硬门）；三级笔记「」引语逐字核对（警告级）。
// 用法：node scripts/check-neican-quotes.mjs --issue 260915
// 规则：比对前把两边做同一归一化（去空白与 * ` > # 标记符），归一化后 <10 字的片段跳过不计。
// 退出码：概念辞典有未命中 → 1；文件缺失 → 2。证据等级：实测（程序化逐字比对）。

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const ARGV = {};
for (let i = 0; i < argv.length; i++) {
  const m = argv[i].match(/^--([^=]+)(?:=(.*))?$/);
  if (!m) continue;
  ARGV[m[1]] = m[2] !== undefined ? m[2] : (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true);
}
const ISSUE = ARGV.issue;
if (!ISSUE) { console.error('用法：node scripts/check-neican-quotes.mjs --issue 260915'); process.exit(2); }

const SRC = path.join(ROOT, 'knowledge', `内参-${ISSUE}`);
const norm = (s) => String(s).replace(/\s+/g, '').replace(/[*>`#]/g, '');
const issue = JSON.parse(fs.readFileSync(path.join(SRC, 'issue.json'), 'utf8'));

let hardFail = 0, missing = 0;
for (const it of issue.items) {
  const slug = it.slug;
  const srcFile = path.join(SRC, '原文', slug + '.md');
  const srcRaw = fs.existsSync(srcFile) ? fs.readFileSync(srcFile, 'utf8') : null;
  const srcN = srcRaw ? norm(srcRaw) : '';
  const lines = [`── ${slug}（${it.title.slice(0, 30)}）`];

  if (!srcRaw) { missing++; console.log(lines[0] + ' ❌ 原文缺失'); continue; }

  // 三产物存在性
  for (const d of ['三级笔记', '概念辞典', 'AI费曼']) {
    const f = path.join(SRC, d, slug + '.md');
    if (!fs.existsSync(f) || fs.statSync(f).size < 200) { missing++; lines.push(`   ❌ 缺 ${d}/${slug}.md`); }
  }

  // 概念辞典引用块：硬门
  const dictFile = path.join(SRC, '概念辞典', slug + '.md');
  if (fs.existsSync(dictFile)) {
    const dict = fs.readFileSync(dictFile, 'utf8');
    const quotes = [...dict.matchAll(/^\s*>\s?(.+)$/gm)].map((m) => m[1])
      .filter((q) => !q.includes('针对《') && norm(q).length >= 10);
    let hit = 0; const bad = [];
    for (const q of quotes) (srcN.includes(norm(q)) ? hit++ : bad.push(q));
    lines.push(`   概念辞典引用块：${hit}/${quotes.length} 逐字命中` + (bad.length ? ` ❌ 未命中 ${bad.length} 条：` + bad.slice(0, 3).map((b) => norm(b).slice(0, 24) + '…').join(' | ') : ''));
    hardFail += bad.length;
  }

  // 三级笔记「」引语：警告级
  const noteFile = path.join(SRC, '三级笔记', slug + '.md');
  if (fs.existsSync(noteFile)) {
    const note = fs.readFileSync(noteFile, 'utf8');
    const spans = [...note.matchAll(/「([^「」]{8,})」/g)].map((m) => m[1]);
    const bad = spans.filter((s) => !srcN.includes(norm(s)));
    lines.push(`   三级笔记「」引语：${spans.length - bad.length}/${spans.length} 命中` + (bad.length ? ` ⚠ 未命中：` + bad.slice(0, 3).map((b) => norm(b).slice(0, 24) + '…').join(' | ') : ''));
  }

  // 费曼字数
  const feyFile = path.join(SRC, 'AI费曼', slug + '.md');
  if (fs.existsSync(feyFile)) {
    const body = fs.readFileSync(feyFile, 'utf8').trim();
    lines.push(`   AI费曼：${body.length} 字${body.length > 700 ? ' ⚠ 超 350 字上限（约 ' + body.length + '）' : ''}`);
  }

  console.log(lines.join('\n'));
}

console.log('');
if (missing) { console.error(`❌ 缺文件 ${missing} 处 —— 先补齐再跑`); process.exit(2); }
if (hardFail) { console.error(`❌ 概念辞典引用块未命中 ${hardFail} 条（硬门未过，逐条改到逐字为止）`); process.exit(1); }
console.log('✅ 引文体检全过：概念辞典引用块全部逐字命中原文');
