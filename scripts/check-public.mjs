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

import fs from 'node:fs';
import path from 'node:path';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');

// 端口按 pid 散开，并在退出时杀掉自己起的 Chrome。
// 起因（2026-09-13 实测）：这里原本写死 9388，而脚本从不杀 Chrome —— 9 小时前遗留的一个
// headless Chrome 还占着 9388，新 run 的 waitForPage 直接接管了**旧浏览器**，
// 读到的还是几小时前缓存的旧页面（快照 04:15:04），于是线上验收稳定报 4 条假失败
// （中间栏 936 而不是 21、lp-back 为 null）。页面本身没问题，是验收环境脏了。
const PORT = 9388 + (process.pid % 400);
const PROF = '/tmp/check-public-' + Date.now();
const URL_ = process.argv[2] || 'http://zhisuoqi-135.test:5199/';
const ONLINE = /^https?:/.test(URL_) && !/zhisuoqi-135\.test/.test(URL_);

const chrome = spawnProcess(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu', '--no-first-run',
  // 本机开着系统代理时，假域名会被代理拦成 502（页面压根没加载，断言全假失败）。
  // 09-12 加：验收必须绕开代理，否则测的不是产品。
  '--no-proxy-server',
  '--host-resolver-rules=MAP zhisuoqi-135.test 127.0.0.1', 'about:blank'], { stdio: 'ignore' });
const killChrome = () => { try { chrome.kill('SIGKILL'); } catch {} };
process.on('exit', killChrome);
process.on('SIGINT', () => { killChrome(); process.exit(130); });

const page = await waitForPage(PORT);
if (!page) { console.error('Chrome 调试端口没起来'); process.exit(2); }

const cdp = await openCDP(page.webSocketDebuggerUrl);
const send = (method, params = {}) => cdp.send(method, params);
const events = cdp.events;
const ev = async expr => {
  return cdp.eval(expr, { onException: details => 'THREW: ' + (details.exception?.description || '').split('\n')[0] });
};

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await send('Page.navigate', { url: URL_ }); await sleep(1200);
// 线上是 730KB 单文件 + GitHub Pages 延迟，固定 2.8s 会在页面还没初始化时就开始断言
// （2026-09-13 对线上跑时踩到：DATA is not defined，一堆假失败）。改成轮询到页面就绪。
{
  const t0 = Date.now();
  let ready = false;
  while (Date.now() - t0 < (ONLINE ? 45000 : 15000)) {
    if (await ev('typeof DATA === "object" && Array.isArray(DATA.nodes)')) { ready = true; break; }
    await sleep(500);
  }
  console.log(`  页面就绪：${ready ? 'OK' : '超时'}（${((Date.now() - t0) / 1000).toFixed(1)}s${ONLINE ? ' · 线上' : ''}）`);
  if (!ready) { console.error('页面没初始化，后面断言都会是假失败，先停。'); process.exit(3); }
}
// 无头 Chrome 不会把 #panel 的过渡跑完，截图/断言前先禁掉（真实浏览器里不受影响）
await ev(`(()=>{const s=document.createElement('style');s.textContent='*{transition:none!important;animation:none!important}';document.head.appendChild(s)})()`);

const fails = [];
// 概念源 2026-09-13 换成「概念地图 v2」：条数/线数不写死，先探一次真实值。
const N_TOTAL = await ev('String(DATA.nodes.length)');
const N_TAGS = await ev('String((DATA.curation && DATA.curation.tags || []).length)');
// 内参期数与最早一期：**从源目录现查**（knowledge/内参-<期>/内参-页面数据.json），不写死期数 ——
// 每加一期都自动对上；公网产物里必须能看到全部这些期。
const NEI_PERIODS = fs.readdirSync(path.join(ROOT, 'knowledge'))
  .filter((d) => /^内参-\d{6}$/.test(d) && fs.existsSync(path.join(ROOT, 'knowledge', d, '内参-页面数据.json')))
  .map((d) => d.replace(/^内参-/, '')).sort().reverse();
const N_ISSUES = NEI_PERIODS.length;
const NEI_TOTAL_ARTICLES = NEI_PERIODS.reduce((n, p) =>
  n + (JSON.parse(fs.readFileSync(path.join(ROOT, 'knowledge', `内参-${p}`, '内参-页面数据.json'), 'utf8')).articles || []).length, 0);
const OLDEST_PERIOD = NEI_PERIODS[NEI_PERIODS.length - 1];
const COMPUTE0 = await ev(`(nodes.find(n => n.k === 'compute') || nodes[0]).id`);
console.log(`  概念 ${N_TOTAL} 个 · 主题线 ${N_TAGS} 条`);
async function step(label, action, expect, waitMs = 900) {
  const before = events.length;
  if (action) await ev(action);
  await sleep(waitMs);
  const bad = events.slice(before)
    .filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
    .filter(e => !/favicon/.test(JSON.stringify(e)))
    // /api/health 的 404 是公网版故意探服务端（探不到才走无服务端分支），不是缺陷
    .filter(e => !/\/api\/health/.test(JSON.stringify(e)));
  for (const b of bad) fails.push(`${label}｜控制台报错：${JSON.stringify(b).slice(0, 170)}`);
  let got = null;
  if (expect) {
    got = String(await ev(expect.js));
    if (!got.includes(expect.want)) fails.push(`${label}｜期望含「${expect.want}」，实得「${got.slice(0, 100)}」`);
  }
  console.log(`  ${bad.length ? '⚠' : '·'} ${label}${got !== null ? ' ｜ ' + got.slice(0, 64) : ''}`);
}

console.log('公网版验收 ' + URL_ + (ONLINE ? '（线上）' : '（本地静态服务·假域名）'));

// 2026-09-14 改准：左栏现在是 3 格导航（内参 · 知识体系 · 实践空间），
// 此前写死 2 格（少了 09-13 深夜加的「实践空间」），一直是过期断言。
await step('首屏：左栏 3 格导航（内参在上）+ 中间栏就是那 21 条主题', null,
  { js: `[...document.querySelectorAll('.r-item b')].map(b=>b.textContent).join('|') + '｜' + document.querySelectorAll('#lp-body .row').length + '｜' + groups().length`, want: '内参|知识体系|实践空间｜' + N_TAGS + '｜' + N_TAGS });
await step('点一条主题 → 下钻到三级', `document.querySelectorAll('#lp-body .row')[0].click()`,
  { js: `currentView + '|' + (filter === DATA.curation.tags[0].id ? '画布跟上了' : '画布没跟') + '|' + (document.getElementById('lp-back').style.display === '' ? '有返回' : '没返回')`, want: 'theme|画布跟上了|有返回' });
await step('「← 全部主题」回到二级', `setView('graph')`,
  { js: `currentView + '|' + String(filter) + '|' + document.querySelectorAll('#lp-body .row').length`, want: 'graph|null|' + N_TAGS });
await step('09-13 减法：底部那条栏已删', null,
  { js: `document.getElementById('bar') ? '还在' : 'OK'`, want: 'OK' });
await step('09-13 减法：已删的四个入口不再是导航项，旧轴函数也没了', null,
  { js: `['curate','todo','mine','chat'].filter(v => document.querySelector('.r-item[data-view="'+v+'"]')).length + '|' + typeof window.setAxis`, want: '0|undefined' });
await step('顶栏 + 两栏都在（一级导航在顶栏；列表栏列的是主题，不是 936 条概念）', null,
  { js: `['topbar','list','main'].filter(i=>document.getElementById(i)).length + '|' + document.querySelectorAll('#topbar .r-item').length + '|' + document.querySelectorAll('#lp-body .row').length`, want: '3|3|' + N_TAGS });
await step(`${N_TOTAL} 个点全部有标签`, null,
  { js: `const n=DATA.nodes.filter(x=>(x.tags||[]).length).length; n+'/'+DATA.nodes.length`, want: N_TOTAL + '/' + N_TOTAL });
await step('关系视图：语义边与图例可切换', `setMode('relation')`,
  { js: `mode+'|'+relations.length+'|'+(document.getElementById('rel-legend').classList.contains('on')?'图例':'无图例')+'|'+relations.filter(r=>r.kind==='co-article'||r.kind==='rejected').length`, want: 'relation|' });
await step('关系视图：默认不含共现与拒绝边', null,
  { js: `relations.filter(r=>r.kind==='co-article'||r.kind==='rejected').length`, want: '0' });
await step('回到默认依赖视图', `setMode('grid')`, { js: `mode`, want: 'grid' });
await step('公网地址下不去探 /api（无 404 噪音）', null, { js: `String(LOCAL)`, want: 'false' });
await step('星球', `closePanel(); setMode('sphere')`, { js: `mode`, want: 'sphere' });

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

// 内参（第六格）：**上方日期条 ＋ 中间「内参日报集合」**（2026-09-14 所有者口径）。
// 单文件里也要能读：日报集合按期倒序、日期条能筛、点一篇进单篇阅读、概念网络接回地图。
await step('内参：中间栏换成 日期/分类/标签/策展（不再是篇目列表）', `closePanel(); setView('neican')`,
  { js: `document.querySelectorAll('#lp-body .row').length
    + '|' + (document.querySelector('#lp-body .nei-cal') ? '月历在中间栏' : '月历不在中间栏')
    + '|' + document.querySelectorAll('#lp-body .nei-facets .fg').length`, want: '0|月历在中间栏|2' });

await step('内参：日报集合能开（每期一张日报卡）', null,
  { js: `(()=>{const ym=String(NEI_ALL[0].date).slice(0,7);
    const k=NEI_ALL.filter(i=>String(i.date).slice(0,7)===ym).length;
    return (document.getElementById('reader').classList.contains('on') ? 'ON' : 'OFF')
      + '|' + (document.querySelector('.nei-cal') ? '有月历' : '缺月历')
      + '|' + (document.querySelectorAll('.nei-cal .cd.has').length === k ? '点亮对上' : '点亮对不上')
      + '|' + document.querySelectorAll('.nei-day').length})()`, want: 'ON|有月历|点亮对上|' + N_ISSUES });

await step('内参：月历点一天 → 只留那一天的日报', `neiPick(NEI_ALL[NEI_ALL.length-1].period)`,
  { js: `(()=>{const d=document.querySelector('.nei-day .dh b');
    return document.querySelectorAll('.nei-day').length + '|' + (d ? d.textContent : '无')
      + '|' + document.querySelectorAll('.nei-cal .cd.has.on').length})()`,
    want: '1|第 ' + OLDEST_PERIOD + ' 期|1' });

await step('内参：月历能翻月（翻到没内参的月份是空的）', `neiPick(''); neiCalMove(-1)`,
  { js: `document.querySelectorAll('.nei-cal .cd.has').length + '|' + ((document.querySelector('.nei-cal .hint')||{}).textContent||'')`,
    want: '0|这个月没有内参' });

await step('内参：翻回来能接着选', `neiCalMove(1)`,
  { js: `(document.querySelector('.nei-cal .ch b')||{}).textContent + '|' + document.querySelectorAll('.nei-cal .cd.has').length`,
    want: '20' + OLDEST_PERIOD.slice(0, 2) + ' 年 ' + Number(OLDEST_PERIOD.slice(2, 4)) + ' 月|' + N_ISSUES });

// 2026-09-14 第三版：日期下面依次是 分类 / 标签 / 策展 三组筛选（所有者给的 Reader 侧栏顺序）
// 2026-09-14 所有者：「标签我不知道，分类吧」——「标签」那一组撤掉，只剩分类与策展
await step('内参：分类 / 策展 两组筛选都在（日期在上，其次两组）', `neiPick('')`,
  { js: `[...document.querySelectorAll('.nei-facets .fh')].map(b => b.textContent.replace(/[▾▸]/g, '')).join('|')
    + '｜' + (document.querySelector('.nei-side .nei-cal') ? '日期在上' : '日期不在上')
    + '｜' + (document.querySelector('.nei-facets .fh') && document.querySelector('.nei-facets').innerText.includes('标签') ? '标签还在' : '标签已撤')`,
    want: '分类|策展 · 重要等级｜日期在上｜标签已撤' });

await step('内参：点一个分类 → 只剩这一类（侧栏选中态 + 计数跟着变）', `neiSetFilt('tag', '观点文')`,
  { js: `(()=>{const all=NEI_ALL.flatMap(i=>i.articles||[]);
    const k=all.filter(a=>(a.tag||'文章')==='观点文').length;
    const rows=document.querySelectorAll('.nei-day .drow').length;
    const cnt=(document.querySelector('.lp-head .cnt')||{}).textContent;
    return (rows===k?'卡片行数对上':'卡片行数对不上') + '|' + (String(cnt)===String(k)?'计数对上':'计数对不上')
      + '|' + (document.querySelector('.nei-facets .fchip.on') ? '有选中态' : '缺选中态')})()`,
    want: '卡片行数对上|计数对上|有选中态' });

await step('内参：清空筛选 → 回到全部篇目', `neiClearFilt()`,
  { js: `document.querySelectorAll('.nei-day .drow').length`, want: String(NEI_TOTAL_ARTICLES) });

await step('内参：点一篇进单篇阅读（配图是内联 SVG、标题与集合里那篇一致）', `neiPick(''); openNeican(NEI_ALL[0].articles[0].slug)`,
  { js: `(()=>{const t=(document.querySelector('.nei-title')||{}).textContent||'';
    return document.querySelectorAll('.nei-hero svg').length
      + '|' + (t === NEI_ALL[0].articles[0].title)
      + '|' + (document.querySelector('.nei-body').innerText.length > 400 ? '正文在' : '正文空')})()`,
    want: '1|true|正文在' });

// 内参的概念卡必须接回地图（所有者 2026-09-13 指出的漏项：内参那一栏曾是孤岛）
await step('内参：概念网络已接回地图（不是孤岛）', `openNeican(NEI_ALL[1].articles[0].slug); neiTab('concept')`,
  { js: `(()=>{const x=document.getElementById('nei-body').innerText;
    return (x.includes('已并进概念地图')?'有统计':'缺统计')+'|'+(document.querySelectorAll('#nei-body .tomap').length>0?'有跳转':'缺跳转')})()`,
    want: '有统计|有跳转' });
await step('内参：点概念名能跳到地图那张卡', null,
  { js: `(()=>{const b=document.querySelector('#nei-body .tomap'); if(!b) return 'NO-BTN';
    b.click(); const p=document.getElementById('panel');
    return (p && p.classList.contains('on') ? 'OK' : 'NO') + '|' + (document.getElementById('reader').classList.contains('on') ? '阅读区没关' : '已回地图')})()`,
    want: 'OK|已回地图' });
await step('内参：概念网络有卡', `closePanel(); setView('neican'); openNeican(NEI_ALL[1].articles[0].slug); neiTab('concept')`,
  { js: `document.querySelectorAll('#nei-body .concept').length > 3 ? 'OK' : 'NO'`, want: 'OK' });
// 2026-09-14：内参到第三期，期数只会继续长。这条原先写死 NEI_ALL[1]（当时那一期正好是五维期 260912），
// 加了 260914 期之后 [1] 变成三产物期，就假红了。改成按**内容特征**现查：
// dim 非空 ＝ 有拆解五维（费曼 ×3）；dim 空 ＝ 只有三产物（示范一段）。
const FIVE_SLUG = await ev(`(()=>{const p=(NEI_ALL.flatMap(i=>i.articles||[]).find(a=>a.dim&&Object.keys(a.dim).length))||null; return p?p.slug:''})()`);
const PLAIN_SLUG = await ev(`(()=>{const p=(NEI_ALL.flatMap(i=>i.articles||[]).find(a=>!(a.dim&&Object.keys(a.dim).length)))||null; return p?p.slug:''})()`);
await step('内参：有拆解五维的那期，费曼分页 ×3', FIVE_SLUG ? `openNeican('${FIVE_SLUG}'); neiTab('feynman')` : null,
  { js: `document.querySelectorAll('#nei-body .fybox').length`, want: '3' });
await step('内参：只有三产物的一期，费曼是示范一段', PLAIN_SLUG ? `openNeican('${PLAIN_SLUG}'); neiTab('feynman')` : null,
  { js: `document.querySelectorAll('#nei-body .fybox').length`, want: '1' });
await step('内参：换一篇 + 阅读原文只放子链接', `openNeican(NEI_ALL[1].articles[3].slug); neiTab('source')`,
  { js: `document.querySelectorAll('#nei-body a[href^="http"]').length === 1 ? 'OK' : 'NO'`, want: 'OK' });
await step('内参：回到日报集合（点返回）', `openNeicanHome()`,
  { js: `document.querySelectorAll('.nei-day').length`, want: String(N_ISSUES) });
await step('内参：退出后阅读区让位', `setView('graph')`,
  { js: `document.getElementById('reader').classList.contains('on')`, want: 'false' });

console.log(fails.length ? `\n❌ 失败 ${fails.length} 条:\n` + fails.join('\n') : '\n✅ 公网版验收全过');
cdp.close(); chrome.kill();
try { (await import('node:fs')).rmSync(PROF, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(fails.length ? 1 : 0);
