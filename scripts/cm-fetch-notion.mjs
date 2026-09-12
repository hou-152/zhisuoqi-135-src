#!/usr/bin/env node
// 概念地图 v2 · 第 1.5 步：抓 Notion 概念库 509 页正文（只读，带本地缓存，可断点续跑）。
//
// 依据：`ntn pages get <page_id>` 返回 Markdown，正文里同样有 `## context` 与 `## 费曼一下`。
// 这不改 Notion 任何内容；缓存落 evidence/概念源-260913/notion-pages/。
//
// 用法：node scripts/cm-fetch-notion.mjs [--limit=N]

import fs from 'node:fs';
import path from 'node:path';


const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'evidence', '概念源-260913');
const DIR = path.join(SRC, 'notion-pages');
fs.mkdirSync(DIR, { recursive: true });

const NTN = path.join(process.env.HOME, '.local', 'bin', 'ntn');
const list = JSON.parse(fs.readFileSync(path.join(SRC, 'notion-概念库-509.json'), 'utf8')).concepts;
const limitArg = process.argv.find((a) => a.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : list.length;

let done = 0, skipped = 0;
const failed = [];
const todo = list.slice(0, limit).filter((c) => {
  const file = path.join(DIR, `${c.id}.md`);
  if (fs.existsSync(file) && fs.statSync(file).size > 40) { skipped++; return false; }
  return true;
});
const CONC = Number((process.argv.find((a) => a.startsWith('--concurrency=')) || '').split('=')[1] || 8);

let cursor = 0;
async function worker() {
  const { spawn } = await import('node:child_process');
  while (cursor < todo.length) {
    const c = todo[cursor++];
    const out = await new Promise((resolve) => {
      const p = spawn(NTN, ['pages', 'get', c.id], { cwd: '/tmp' });
      let buf = '';
      p.stdout.on('data', (d) => { buf += d; });
      p.on('close', () => resolve(buf.trim()));
      p.on('error', () => resolve(''));
    });
    if (!out || /^error/i.test(out)) { failed.push({ id: c.id, name: c.name, err: out.slice(0, 160) }); continue; }
    fs.writeFileSync(path.join(DIR, `${c.id}.md`), out + '\n');
    done++;
    if (done % 25 === 0) console.log(`   …已抓 ${done}/${todo.length}（跳过 ${skipped}，失败 ${failed.length}）`);
  }
}
await Promise.all(Array.from({ length: CONC }, worker));

fs.writeFileSync(path.join(SRC, 'notion-pages-fetch.log.json'), JSON.stringify({
  at: new Date().toISOString(), total: list.length, fetched: done, skipped, failed,
}, null, 1));
console.log(`✅ Notion 正文抓取：新抓 ${done} · 跳过 ${skipped} · 失败 ${failed.length} · 目录 ${path.relative(ROOT, DIR)}`);
if (failed.length) console.log('   失败样例：' + failed.slice(0, 5).map((f) => f.name).join(' / '));
