#!/usr/bin/env node
// 拉取内参 AI 精选文章全文（串行、Retry-After 感知）。
// 2026-09-13 00:1x 定时任务用：56 篇 AI 文章的 /articles/{id}/markdown。
// 退出码：0=全部成功；3=仍被限速（下次再跑，断点续传：已有文件跳过）。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'knowledge', 'llm-wiki', 'neican-ai-markdown');
fs.mkdirSync(OUT, { recursive: true });

let key = process.env.NEICAN_API_KEY;
if (!key) {
  for (const line of fs.readFileSync(path.join(process.env.HOME, '.zshrc'), 'utf8').split('\n')) {
    const m = line.match(/^export NEICAN_API_KEY=(.*)$/);
    if (m) key = m[1].replace(/^["']|["']$/g, '');
  }
}
if (!key) { console.error('❌ NEICAN_API_KEY 未找到'); process.exit(2); }

const sel = JSON.parse(fs.readFileSync(path.join(ROOT, 'knowledge', 'llm-wiki', '内参74-AI筛选.json'), 'utf8'));
const todo = sel.ai_ids.filter(id => {
  const f = path.join(OUT, id + '.md');
  return !(fs.existsSync(f) && fs.statSync(f).size > 500);
});
console.log(`待拉 ${todo.length}/${sel.ai_ids.length}`);
if (!todo.length) { console.log('✅ 全部已有'); process.exit(0); }

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let ok = 0, fail = 0, waited = 0;
for (const id of todo) {
  let done = false;
  for (let attempt = 0; attempt < 3 && !done; attempt++) {
    const r = await fetch(`https://ai-api.candobear.com/articles/${id}/markdown`, { headers: { Authorization: 'Bearer ' + key } });
    if (r.status === 429) {
      const body = await r.json().catch(() => ({}));
      const waitS = Math.min(3600, Number(body.retryAfterSeconds || r.headers.get('retry-after') || 60));
      console.log(`  429，等 ${waitS}s（第 ${attempt + 1} 次）`);
      await sleep((waitS + 5) * 1000); waited += waitS;
      continue;
    }
    const body = await r.text();
    if (r.ok && body.length > 500 && !body.trimStart().startsWith('{')) {
      fs.writeFileSync(path.join(OUT, id + '.md'), body);
      ok++; done = true;
    } else { fail++; console.log(`  ✗ ${id.slice(0, 8)} HTTP ${r.status}: ${body.slice(0, 60)}`); done = true; }
  }
  await sleep(1200);
}
console.log(`完成：成功 ${ok}，失败 ${fail}，累计等待 ${Math.round(waited / 60)} 分钟`);
process.exit(fail > 0 || ok < todo.length ? 3 : 0);
