#!/usr/bin/env node
// 语义单元索引页验收：538 条在不在、五类计数对不对、筛选/搜索/展开/深链能不能用、0 JS 报错。
//
// 用法（先用静态服务把 deploy/zhisuoqi-135/ 或它的副本挂起来）：
//   cp deploy/zhisuoqi-135/units.html /tmp/pubtest/units.html
//   (cd /tmp/pubtest && python3 -m http.server 5199 &)
//   node scripts/check-units-page.mjs [url]
// 验线上：
//   node scripts/check-units-page.mjs https://hou-152.github.io/zhisuoqi-135/units.html
//
// 端口按 pid 散开并杀掉自己起的 Chrome —— 9388 那个坑（遗留浏览器 + 旧缓存页面 → 假失败）
// 在 check-public.mjs 里踩过一次，这里不再踩。

import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const PORT = 9800 + (process.pid % 150);
const PROF = '/tmp/check-units-' + Date.now();
const URL_ = process.argv[2] || 'http://127.0.0.1:5199/units.html';
const ONLINE = !/127\.0\.0\.1|localhost/.test(URL_);

const chrome = spawnProcess(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-proxy-server', 'about:blank'], { stdio: 'ignore' });
const killChrome = () => { try { chrome.kill('SIGKILL'); } catch {} };
process.on('exit', killChrome);
process.on('SIGINT', () => { killChrome(); process.exit(130); });

const page = await waitForPage(PORT);
if (!page) { console.error('Chrome 调试端口没起来'); process.exit(2); }
const cdp = await openCDP(page.webSocketDebuggerUrl);
const send = (m, p = {}) => cdp.send(m, p);
const events = cdp.events;
const ev = async expr => cdp.eval(expr, { onException: d => 'THREW: ' + (d.exception?.description || '').split('\n')[0] });

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await send('Page.navigate', { url: URL_ }); await sleep(900);
{
  const t0 = Date.now();
  let ready = false;
  while (Date.now() - t0 < (ONLINE ? 45000 : 15000)) {
    if (await ev('typeof ROWS === "object" && Array.isArray(ROWS) && ROWS.length > 0')) { ready = true; break; }
    await sleep(400);
  }
  console.log(`  页面就绪：${ready ? 'OK' : '超时'}（${((Date.now() - t0) / 1000).toFixed(1)}s${ONLINE ? ' · 线上' : ''}）`);
  if (!ready) { console.error('页面没初始化，后面断言都会是假失败，先停。'); process.exit(3); }
}
const fails = [];
async function step(label, action, expect, waitMs = 350) {
  const before = events.length;
  if (action) await ev(action);
  await sleep(waitMs);
  events.slice(before)
    .filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
    .filter(e => !/favicon/.test(JSON.stringify(e)))
    .forEach(e => fails.push(`${label}｜控制台报错：${JSON.stringify(e).slice(0, 160)}`));
  let got = null;
  if (expect) {
    got = String(await ev(expect.js));
    if (!got.includes(expect.want)) fails.push(`${label}｜期望含「${expect.want}」，实得「${got.slice(0, 120)}」`);
  }
  console.log(`  · ${label}${got !== null ? ' ｜ ' + got.slice(0, 70) : ''}`);
}

console.log('语义单元索引页验收 ' + URL_ + (ONLINE ? '（线上）' : '（本地）'));

await step('538 条都在，五类计数正确', null,
  { js: `ROWS.length + '|' + ['问题单元','概念单元','观点单元','案例单元','方案单元'].map(t => ROWS.filter(r => r.type === t).length).join(',')`, want: '538|141,76,169,76,76' });
await step('口径与来源标注在页首', null,
  { js: `(document.querySelector('.sub').textContent.match(/0 次 LLM 调用/) || ['无'])[0]`, want: '0 次 LLM 调用' });
await step('默认列表 + 命中数', null,
  { js: `document.querySelectorAll('.card').length + '|' + document.getElementById('meta').textContent`, want: '80|命中 538 / 538' });
await step('点「方案单元」→ 只剩 76 条', `[...document.querySelectorAll('.chip')].find(c => c.textContent.startsWith('方案')).click()`,
  { js: `document.getElementById('meta').textContent + '|' + [...new Set([...document.querySelectorAll('.card .tag')].map(t => t.textContent))].join(',')`, want: '命中 76 / 538|方案' });
await step('点「全部」→ 回到 538', `[...document.querySelectorAll('.chip')].find(c => c.textContent.startsWith('全部')).click()`,
  { js: `document.getElementById('meta').textContent`, want: '命中 538 / 538' });
await step('搜「上下文腐烂」→ 命中里必须有 CON-context-rot', `(() => { const q = document.getElementById('q'); q.value = '上下文腐烂'; q.dispatchEvent(new Event('input')); })()`,
  { js: `document.getElementById('meta').textContent + '|' + [...document.querySelectorAll('.card')].map(c => c.dataset.id).join(',')`, want: 'CON-context-rot' });
await step('展开第一条 → 详情真的有内容', `document.querySelector('.card').click()`,
  { js: `(document.querySelector('.card').classList.contains('open') ? 'open' : '没开') + '|' + (document.querySelector('.card .det').offsetHeight > 40 ? '有内容' : '空')`, want: 'open|有内容' });
await step('主题筛选存在且是 9 条', null,
  { js: `(document.getElementById('theme').options.length - 1) + '|' + (document.getElementById('theme').options[1].textContent.length > 0)`, want: '9|true' });
await step('深链 #CON-context-rot 能直接展开', `location.hash='#CON-context-rot'; location.reload()`, null, 2500);
await step('深链生效', null,
  { js: `document.getElementById('CON-context-rot').classList.contains('open') ? 'open' : '没开'`, want: 'open' });

if (fails.length) {
  console.error(`\n❌ 失败 ${fails.length} 条:`);
  fails.forEach(f => console.error('  ' + f));
  process.exit(1);
}
console.log('\n✅ 语义单元索引页验收全过');
process.exit(0);
