#!/usr/bin/env node
// 公网版验收：在一个**没有 /api 的静态服务**下，页面必须能开、能切、能播回放，0 JS 报错。
//
// 关键点：必须用**非本地域名**访问（这里用 --host-resolver-rules 把 zhisuoqi-135.test
// 指到 127.0.0.1），否则会走到「本地有服务端」那条分支，测不出公网该走的路。
//
// 用法：
//   mkdir -p /tmp/pubtest && cp deploy/zhisuoqi-135/index.html /tmp/pubtest/index.html
//   (cd /tmp/pubtest && python3 -m http.server 5199 &)
//   node scripts/check-public.mjs [url]
// 或直接验收线上地址：
//   node scripts/check-public.mjs https://hou-152.github.io/zhisuoqi-135/

import { spawn } from 'node:child_process';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9388;
const PROF = '/tmp/check-public-' + Date.now();
const URL_ = process.argv[2] || 'http://zhisuoqi-135.test:5199/';
const ONLINE = /^https?:/.test(URL_) && !/zhisuoqi-135\.test/.test(URL_);

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu', '--no-first-run',
  '--host-resolver-rules=MAP zhisuoqi-135.test 127.0.0.1', 'about:blank'], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));
let page;
for (let i = 0; i < 40; i++) {
  try { const j = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); page = j.find(t => t.type === 'page'); if (page) break; } catch {}
  await sleep(250);
}
if (!page) { console.error('Chrome 调试端口没起来'); process.exit(2); }

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let id = 0; const waiting = new Map(); const events = [];
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  else if (m.method) events.push(m);
};
const send = (method, params = {}) => { const i = ++id; ws.send(JSON.stringify({ id: i, method, params })); return new Promise(r => waiting.set(i, r)); };
const ev = async expr => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return 'THREW: ' + (r.result.exceptionDetails.exception?.description || '').split('\n')[0];
  return r.result?.result?.value;
};

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await send('Page.navigate', { url: URL_ }); await sleep(2800);
// 无头 Chrome 不会把 #panel 的过渡跑完，截图/断言前先禁掉（真实浏览器里不受影响）
await ev(`(()=>{const s=document.createElement('style');s.textContent='*{transition:none!important;animation:none!important}';document.head.appendChild(s)})()`);

const fails = [];
async function step(label, action, expect) {
  const before = events.length;
  if (action) await ev(action);
  await sleep(900);
  const bad = events.slice(before)
    .filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
    .filter(e => !/favicon/.test(JSON.stringify(e)));
  for (const b of bad) fails.push(`${label}｜控制台报错：${JSON.stringify(b).slice(0, 170)}`);
  let got = null;
  if (expect) {
    got = String(await ev(expect.js));
    if (!got.includes(expect.want)) fails.push(`${label}｜期望含「${expect.want}」，实得「${got.slice(0, 100)}」`);
  }
  console.log(`  ${bad.length ? '⚠' : '·'} ${label}${got !== null ? ' ｜ ' + got.slice(0, 64) : ''}`);
}

console.log('公网版验收 ' + URL_ + (ONLINE ? '（线上）' : '（本地静态服务·假域名）'));

await step('首屏：左栏 5 格 + 10 条主题线', null,
  { js: `document.querySelectorAll('.r-item').length + '|' + document.querySelectorAll('#lrows .lrow').length`, want: '5|10' });
await step('194 个点全部有标签', null,
  { js: `const n=DATA.nodes.filter(x=>(x.tags||[]).length).length; n+'/'+DATA.nodes.length`, want: '194/194' });
await step('公网地址下不去探 /api（无 404 噪音）', null, { js: `String(LOCAL)`, want: 'false' });
await step('策展面板', `setView('curate')`, { js: `document.getElementById('pbody').innerText.slice(0,12)`, want: '策展' });
await step('某条线的路线', `openCollection('T2')`, { js: `document.querySelectorAll('.stop').length > 3 ? 'OK' : 'NO'`, want: 'OK' });
await step('Agent：烘好的 15 个 skill', `setView('chat')`,
  { js: `ALLSKILLS.length + '|' + (document.getElementById('pbody').innerText.includes('已装 15 个 skill') ? 'OK' : 'NO')`, want: '15|OK' });
await step('无 key 发消息 → 播录制回放并声明不是本次回答',
  `pickAgent('dbs-learning-beta','dbs-learning-beta'); document.getElementById('b-q').value='随便问一句'; send()`,
  { js: `(()=>{const x=document.getElementById('clist').innerText; return (x.includes('不是对你那句话的回答')?'OK':'NO')+'|'+x.length})()`, want: 'OK' });
await step('回放正文是录的那段真回答', null,
  { js: `(()=>{const x=document.getElementById('clist').innerText; return (x.includes('课题类型判定')&&x.includes('录制回放'))?'OK':'NO'})()`, want: 'OK' });
await step('key 输入框是 password 型（不明文回显）', null,
  { js: `document.getElementById('vk') ? document.getElementById('vk').type : 'none'`, want: 'password' });
await step('星球', `closePanel(); setMode('sphere')`, { js: `mode`, want: 'sphere' });
await step('只看一条线', `setView('graph'); focusTag('T2')`, { js: `filter`, want: 'T2' });
await step('待你看一眼（已策展）', `filter=null; setAxis('tag'); setView('todo')`,
  { js: `document.getElementById('pbody').innerText.includes('我自己判了') ? 'OK' : 'NO'`, want: 'OK' });

console.log(fails.length ? `\n❌ 失败 ${fails.length} 条:\n` + fails.join('\n') : '\n✅ 公网版验收全过');
ws.close(); chrome.kill();
try { (await import('node:fs')).rmSync(PROF, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(fails.length ? 1 : 0);
