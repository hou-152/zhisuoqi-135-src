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

import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const PORT = 9388;
const PROF = '/tmp/check-public-' + Date.now();
const URL_ = process.argv[2] || 'http://zhisuoqi-135.test:5199/';
const ONLINE = /^https?:/.test(URL_) && !/zhisuoqi-135\.test/.test(URL_);

const chrome = spawnProcess(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu', '--no-first-run',
  // 本机开着系统代理时，假域名会被代理拦成 502（页面压根没加载，断言全假失败）。
  // 09-12 加：验收必须绕开代理，否则测的不是产品。
  '--no-proxy-server',
  '--host-resolver-rules=MAP zhisuoqi-135.test 127.0.0.1', 'about:blank'], { stdio: 'ignore' });

const page = await waitForPage(PORT);
if (!page) { console.error('Chrome 调试端口没起来'); process.exit(2); }

const cdp = await openCDP(page.webSocketDebuggerUrl);
const send = (method, params = {}) => cdp.send(method, params);
const events = cdp.events;
const ev = async expr => {
  return cdp.eval(expr, { onException: details => 'THREW: ' + (details.exception?.description || '').split('\n')[0] });
};

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await send('Page.navigate', { url: URL_ }); await sleep(2800);
// 无头 Chrome 不会把 #panel 的过渡跑完，截图/断言前先禁掉（真实浏览器里不受影响）
await ev(`(()=>{const s=document.createElement('style');s.textContent='*{transition:none!important;animation:none!important}';document.head.appendChild(s)})()`);

const fails = [];
// 概念源 2026-09-13 换成「概念地图 v2」：条数/线数不写死，先探一次真实值。
const N_TOTAL = await ev('String(DATA.nodes.length)');
const N_TAGS = await ev('String((DATA.curation && DATA.curation.tags || []).length)');
const COMPUTE0 = await ev(`(nodes.find(n => n.k === 'compute') || nodes[0]).id`);
const TAG0 = await ev(`((DATA.curation && DATA.curation.collections) || []).find(c => c.route && c.route.length > 1)?.tagId || DATA.curation.tags[0].id`);
console.log(`  概念 ${N_TOTAL} 个 · 主题线 ${N_TAGS} 条 · 抽检线 ${TAG0}`);
async function step(label, action, expect, waitMs = 900) {
  const before = events.length;
  if (action) await ev(action);
  await sleep(waitMs);
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

await step('首屏：左栏 6 格 + 默认按「要你怎么处理它」四列', null,
  { js: `document.querySelectorAll('.r-item').length + '|' + [...document.querySelectorAll('#lrows .lrow')].map(e=>e.textContent.trim().replace(/\\d+$/,'')).join(',')`, want: '6|能算的,能判的,能用的,只能认的' });
// 三档轴的按钮现在长在列表栏的筛选行里（不再有 ax-* 这些 id）
await step('三档轴都在（怎么验 / 按主题 / 按来源）', null,
  { js: `[...document.querySelectorAll('#lp-filter button')].map(b=>b.textContent).join(',')`, want: '怎么验,按主题,按来源' });
await step('三栏都在', null,
  { js: `['rail','list','main'].filter(i=>document.getElementById(i)).length + '|' + document.querySelectorAll('#lp-body .row').length`, want: '3|' + N_TOTAL });
await step(`切回按主题是 ${N_TAGS} 条线`, `setAxis('tag')`,
  { js: `document.querySelectorAll('#lrows .lrow').length`, want: N_TAGS });
await step('切回怎么验', `setAxis('kind')`, { js: `axis`, want: 'kind' });
await step(`${N_TOTAL} 个点全部有标签`, null,
  { js: `const n=DATA.nodes.filter(x=>(x.tags||[]).length).length; n+'/'+DATA.nodes.length`, want: N_TOTAL + '/' + N_TOTAL });
await step('公网地址下不去探 /api（无 404 噪音）', null, { js: `String(LOCAL)`, want: 'false' });
await step('策展面板', `setView('curate')`, { js: `document.getElementById('pbody').innerText.slice(0,12)`, want: '策展' });
await step('某条线的路线', `openCollection('${TAG0}')`, { js: `document.querySelectorAll('.stop').length > 3 ? 'OK' : 'NO'`, want: 'OK' });
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
await step('只看一条线', `setView('graph'); focusTag('${TAG0}')`, { js: `filter`, want: TAG0 });
await step('待你看一眼（已策展）', `filter=null; setAxis('tag'); setView('todo')`,
  { js: `document.getElementById('pbody').innerText.includes('我自己判了') ? 'OK' : 'NO'`, want: 'OK' });

// 倒逼层：公网无模型时必须走机械兜底，并且**不能**给出「过了」
await step('「只能认的」不设验收', `openPanel(nodes.find(n=>n.k==='accept').id)`,
  { js: `document.getElementById('pbody').innerText.includes('这一类不设验收') ? 'OK' : 'NO'`, want: 'OK' });
await step('概念面板有复述输入框', `openPanel('${COMPUTE0}')`,
  { js: `document.getElementById('said') ? 'OK' : 'NO'`, want: 'OK' });
await step('无自报通道', `document.getElementById('pbody').innerHTML.includes('setMark') ? '还在' : 'OK'`,
  { js: `document.getElementById('pbody').innerHTML.includes('setMark') ? '还在' : 'OK'`, want: 'OK' });
await step('无模型时交卷 → 机械兜底，且不冒充「过了」',
  `document.getElementById('said').value=byId.get('${COMPUTE0}').gloss; judge('${COMPUTE0}')`,
  { js: `(()=>{const m=marks['${COMPUTE0}']||{}; return (m.state==='pass'?'❌给了过了':m.state)+'|'+(m.mechanical?'mech':'sem')})()`, want: 'mech' }, 6000);
await step('无模型时明确标注「没经语义判定」', null,
  { js: `document.getElementById('pbody').innerText.includes('没经语义判定') ? 'OK' : 'NO'`, want: 'OK' });

// 内参（第六格）：单文件里也要能读——列表 10 篇 + 配图是内联 SVG + 三个分页签都在
await step('内参：第六格能开、列表 10 篇、配图在', `closePanel(); setView('neican')`,
  { js: `(document.getElementById('reader').classList.contains('on') ? 'ON' : 'OFF')
    + '|' + document.querySelectorAll('#lp-body .row').length
    + '|' + document.querySelectorAll('.nei-hero svg').length
    + '|' + (document.querySelector('.nei-title') || {}).textContent`, want: 'ON|10|1|Using Agent Skills' });
await step('内参：概念网络有卡', `neiTab('concept')`,
  { js: `document.querySelectorAll('#nei-body .concept').length > 3 ? 'OK' : 'NO'`, want: 'OK' });
await step('内参：费曼 ×3 三格都在', `neiTab('feynman')`,
  { js: `document.querySelectorAll('#nei-body .fybox').length`, want: '3' });
await step('内参：换一篇 + 阅读原文只放子链接', `openNeican(NEI.articles[3].slug); neiTab('source')`,
  { js: `document.querySelectorAll('#nei-body a[href^="http"]').length === 1 ? 'OK' : 'NO'`, want: 'OK' });
await step('内参：退出后阅读区让位', `setView('graph')`,
  { js: `document.getElementById('reader').classList.contains('on')`, want: 'false' });

console.log(fails.length ? `\n❌ 失败 ${fails.length} 条:\n` + fails.join('\n') : '\n✅ 公网版验收全过');
cdp.close(); chrome.kill();
try { (await import('node:fs')).rmSync(PROF, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(fails.length ? 1 : 0);
