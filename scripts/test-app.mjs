#!/usr/bin/env node
// 桌面版验收：真启动 Electron，连 CDP，验「网页版做不到的那两件事」真的做到了。
//
// 为什么单独一个脚本：桌面版和网页版跑的是同一个服务，差别只在**能写真文件**。
// 所以这里只验三件事：
//   ① /api/health 回 app:true 且给出数据目录
//   ② 界面认出来了（角标变「桌面版」，我在学里出现「存成本地文件」）
//   ③ /api/save 真把文件写到磁盘上，且拒绝跳出数据目录的路径
//
// 用法：node scripts/test-app.mjs

import { spawn } from 'node:child_process';
import { existsSync, readFileSync, rmSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { homedir, tmpdir } from 'node:os';

const APP_DIR = join(import.meta.dirname, '..', 'app');
const ELECTRON = join(APP_DIR, 'node_modules', '.bin', 'electron');
const PORT = 9455;
const DATA_DIR = join(homedir(), 'Documents', '知所栖-135');

if (!existsSync(ELECTRON)) { console.error('没装 electron：cd app && npm install'); process.exit(2); }

const sleep = ms => new Promise(r => setTimeout(r, ms));
const child = spawn(ELECTRON, ['.', `--remote-debugging-port=${PORT}`], { cwd: APP_DIR, stdio: 'ignore' });

let page = null;
for (let i = 0; i < 60; i++) {
  try {
    const j = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    page = j.find(t => t.type === 'page' && /^http:\/\/127\.0\.0\.1:\d+/.test(t.url));
    if (page) break;
  } catch {}
  await sleep(400);
}
if (!page) { console.error('Electron 窗口没起来（CDP 找不到页面）'); child.kill(); process.exit(2); }

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let id = 0; const waiting = new Map(); const events = [];
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  else if (m.method) events.push(m);
};
const send = (me, p = {}) => { const i = ++id; ws.send(JSON.stringify({ id: i, method: me, params: p })); return new Promise(r => waiting.set(i, r)); };
const ex = async x => {
  const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return 'THREW: ' + (r.result.exceptionDetails.exception?.description || '').split('\n')[0];
  return r.result?.result?.value;
};

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await sleep(3000);
await ex(`(()=>{const s=document.createElement('style');s.textContent='*{transition:none!important}';document.head.appendChild(s)})()`);
// alert 在 Electron 里是原生弹窗、会阻塞；测试期间挡掉
await ex(`window.alert = m => { window.__lastAlert = String(m); };`);

const fails = [];
const check = (label, got, want) => {
  const g = String(got);
  const ok = !g.startsWith('THREW') && g.includes(String(want));
  if (!ok) fails.push(`${label}：期望含「${want}」，实得「${g.slice(0, 130)}」`);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${g.slice(0, 96)}`);
};

const appPort = new URL(page.url).port;
console.log('桌面版验收 · 窗口 ' + page.url);

/* ① 服务认得出自己是桌面版 */
check('① /api/health 回 app:true', await ex(`fetch('/api/health').then(r=>r.text())`), '"app":true');
check('① 给出数据目录', await ex(`fetch('/api/health').then(r=>r.json()).then(j=>j.dataDir)`), '知所栖-135');

/* ② 界面认出来了 */
check('② 角标变「桌面版」', await ex(`document.getElementById('pubtag')?.textContent || '无'`), '桌面版');
await ex(`setView('mine')`); await sleep(600);
check('② 我在学里出现「存成本地文件」', await ex(`document.getElementById('lp-filter')?.innerText || '无'`), '把学习记录存成本地文件');

/* ③ 真写真文件 */
const probe = join(DATA_DIR, '产物', '__验收探针.md');
rmSync(probe, { force: true });
const saved = await ex(`fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json'},
  body:JSON.stringify({rel:'产物/__验收探针.md',text:'# 探针\\n这是桌面版验收写的。'})}).then(r=>r.json())`);
check('③ /api/save 回 ok', JSON.stringify(saved), '"ok":true');
check('③ 文件真的在磁盘上', existsSync(probe) ? 'OK' : '没有', 'OK');
check('③ 内容对', existsSync(probe) ? readFileSync(probe, 'utf8').split('\n')[0] : '无', '# 探针');

/* ④ 不许跳出数据目录 */
check('④ 拒绝 ../ 跳出', await ex(`fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json'},
  body:JSON.stringify({rel:'../../../../tmp/evil.md',text:'x'})}).then(r=>r.json()).then(j=>j.error||'居然写了')`), 'bad-path');
check('④ 拒绝非 md/txt/json', await ex(`fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json'},
  body:JSON.stringify({rel:'x.sh',text:'x'})}).then(r=>r.json()).then(j=>j.error||'居然写了')`), 'bad-path');
check('④ 没在 /tmp 留下东西', existsSync('/tmp/evil.md') ? '泄漏了' : 'OK', 'OK');

/* ⑤ 学习记录存文件 */
await ex(`marks = { C08: { state:'pass', said:'验收探针', at: Date.now() } }; refreshMarks(); renderList()`);
await ex(`saveRecord()`); await sleep(1200);
const rec = join(DATA_DIR, '学习记录.json');
check('⑤ 学习记录.json 落盘', existsSync(rec) ? 'OK' : '没有', 'OK');
check('⑤ 里面有刚才那条', existsSync(rec) ? readFileSync(rec, 'utf8').includes('C08') : '无', 'true');

/* ⑥ 0 报错 + 截图 */
const errs = events.filter(e => e.method === 'Runtime.exceptionThrown' ||
  (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error')).filter(e => !/favicon/.test(JSON.stringify(e)));
for (const e of errs) console.log('  控制台：' + JSON.stringify(e).slice(0, 170));

const shot = await send('Page.captureScreenshot', { format: 'png' });
(await import('node:fs')).writeFileSync(join(import.meta.dirname, '..', 'prototype', '预览', '32-桌面版.png'),
  Buffer.from(shot.result.data, 'base64'));
console.log('  截图 prototype/预览/32-桌面版.png');

rmSync(probe, { force: true });
console.log(errs.length ? `\n❌ JS 报错 ${errs.length}` : '\n✅ 0 条 JS 报错');
console.log(fails.length ? `❌ 断言失败 ${fails.length}:\n` + fails.join('\n') : '✅ 断言全过');
ws.close(); child.kill();
process.exit(fails.length || errs.length ? 1 : 0);
