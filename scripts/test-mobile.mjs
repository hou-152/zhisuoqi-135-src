#!/usr/bin/env node
// 移动端专项验收（2026-09-15 v6-responsive 新建）—— 对抗性审计实锤的阻塞项回归：
//   375×812 下顶栏曾溢出（末格右缘 503>375）、左栏旧断点直接 display:none（吞掉主题列表/内参月历）、
//   主区被 302px 网格压扁到树不可交互、已选行宽度 0。
// 本套件锁住：顶栏不溢出 · 抽屉开合/自动收起 · 画布可交互 · 内参可读 · 翻期禁用态 · 引导卡不超屏。
// 前置：node scripts/serve-135.mjs 在跑。用法：node scripts/test-mobile.mjs [url]

import path from 'node:path';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const PORT = 9600 + (process.pid % 300), PROF = '/tmp/mobile-' + process.pid;
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html';
const OUT = path.resolve(import.meta.dirname, '..', 'prototype', '预览');

const chrome = spawnProcess(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=375,812', '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-proxy-server', 'about:blank'], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const page = await waitForPage(PORT);
if (!page) { console.error('Chrome 没起来'); process.exit(2); }
const cdp = await openCDP(page.webSocketDebuggerUrl);
await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Log.enable');
await cdp.send('Page.navigate', { url: URL_ });
{
  const t0 = Date.now();
  let ok = false;
  while (Date.now() - t0 < 20000) { if (await cdp.eval('typeof DATA === "object" && Array.isArray(DATA.nodes)')) { ok = true; break; } await sleep(400); }
  if (!ok) { console.error('页面没初始化'); process.exit(3); }
}
await sleep(1500);
/* 无头 Chrome 窗口宽有 ~500px 下限，375 必须用设备仿真强制 */
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
await sleep(800);
await cdp.eval(`if (typeof resize === 'function') { resize(); computeLayout(); }`);

const ex = async x => cdp.eval(x, { onException: d => 'THREW: ' + (d.exception?.description || '').split('\n')[0] });
const fails = [];
const check = (label, got, want) => {
  const g = String(got);
  const ok = !g.startsWith('THREW') && (want === undefined || g.includes(String(want)));
  if (!ok) fails.push(`${label}：期望含「${want}」，实得「${g.slice(0, 150)}」`);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${g.slice(0, 110)}`);
};
const shot = name => cdp.screenshot(path.join(OUT, name));

/* ① 顶栏：四格全部在视口内；搜索框收起；☰ 在 */
console.log('\n① 顶栏 375px');
check('视口＝375×812', await ex(`innerWidth + 'x' + innerHeight`), '375x812');
check('四个一级导航可达（r-list 可横向滚，滚到头后末格在视口内）', await ex(`(async()=>{
  const l = document.querySelector('.r-list');
  const canScroll = getComputedStyle(l).overflowX === 'auto' || getComputedStyle(l).overflowX === 'scroll';
  l.scrollLeft = l.scrollWidth;
  await new Promise(r=>setTimeout(r,200));
  const last = [...document.querySelectorAll('.r-item')].pop();
  const r = Math.round(last.getBoundingClientRect().right);
  return (canScroll ? '可滚|' : '不可滚|') + r + '/' + innerWidth + (r <= innerWidth + 1 ? '|ok' : '|溢出');
})()`), '|ok');
check('☰ 列表按钮可见', await ex(`(()=>{const b=document.getElementById('btn-burger');
  return b && b.getBoundingClientRect().width > 0 ? 'OK' : 'NO';})()`), 'OK');
check('搜索框收起（v3 既定）', await ex(`(()=>{const q=document.getElementById('q-filter');
  return q.getBoundingClientRect().width === 0 ? 'OK' : 'NO';})()`), 'OK');

/* ② 抽屉：开合 + 行点击自动收起 */
console.log('\n② 左栏抽屉');
check('默认收起（主题列表不在视口）', await ex(`(()=>{const r=document.getElementById('list').getBoundingClientRect();
  return r.right <= 0 ? 'OK' : 'NO';})()`), 'OK');
await ex(`document.getElementById('btn-burger').click()`); await sleep(500);
check('☰ 打开：列表滑入视口', await ex(`(()=>{const r=document.getElementById('list').getBoundingClientRect();
  return (r.left >= 0 && r.left < innerWidth * 0.9 && document.body.classList.contains('list-open')) ? 'OK' : 'NO';})()`), 'OK');
check('抽屉里是 21 条主题', await ex(`String(document.querySelectorAll('#lp-body .row').length)`), '21');
await ex(`document.querySelectorAll('#lp-body .row')[1].click()`); await sleep(500);
check('点主题行：抽屉自动收起（事件委托）', await ex(`document.body.classList.contains('list-open') ? '还开着' : 'OK'`), 'OK');
check('且筛选真的生效（画布跟上了）', await ex(`filter ? 'OK' : 'NO'`), 'OK');
await ex(`setFilter(null)`); await sleep(300);

/* ③ 画布：主区全宽后可交互 */
console.log('\n③ 画布可交互');
check('画布占满视口宽（±5px）', await ex(`(()=>{const r=document.getElementById('c').getBoundingClientRect();
  return Math.abs(r.width - innerWidth) <= 5 ? 'OK' : Math.round(r.width);})()`), 'OK');
check('树投影点落在视口内（v4 审计：不可交互）', await ex(`(()=>{
  let inside = 0; const N = 400;
  for (let i = 0; i < N; i++) { const p = project(nodes[i]); if (p.sx > 0 && p.sx < W && p.sy > 0 && p.sy < H) inside++; }
  return inside + '/' + N + (inside > N * 0.02 ? '|ok' : '|空');
})()`), '|ok');
check('树头统计在（引导语或有判定数）', await ex(`document.getElementById('tree-stat').textContent.length > 4 ? 'OK' : 'NO'`), 'OK');
await shot('60-移动-我的树.png');

/* ④ 内参：抽屉里的月历/已选行可读；翻期禁用态 */
console.log('\n④ 内参移动可读');
await ex(`setView('neican')`); await sleep(600);
await ex(`document.getElementById('btn-burger').click()`); await sleep(500);
check('月历在抽屉里可见', await ex(`(()=>{const c=document.querySelector('.nei-cal');
  const r=c.getBoundingClientRect(); return (r.width > 200 && r.left >= 0) ? 'OK' : Math.round(r.width);})()`), 'OK');
check('已选行宽度 > 0 且单行（v4 审计：宽度 0 不可见）', await ex(`(()=>{
  const h=document.querySelector('.nei-cal .cf .hint'); const r=h.getBoundingClientRect();
  return (r.width > 40 && r.height <= 18 ? 'ok' : 'bad') + '|' + Math.round(r.width) + 'x' + Math.round(r.height) + '|' + h.textContent;
})()`), 'ok|');
check('最新一期：‹ 禁用、› 可用', await ex(`(()=>{
  const [p, n] = document.querySelectorAll('.nei-day .ih-nav');
  return (p && p.disabled ? '‹禁用' : '‹可用') + '|' + (n && !n.disabled ? '›可用' : '›禁用');})()`), '‹禁用|›可用');
await ex(`for (let i = 0; i < 8; i++) neiStep(1)`); await sleep(600);
check('翻到最早一期：› 也禁用（两端都锁）', await ex(`(()=>{
  const n = document.querySelectorAll('.nei-day .ih-nav')[1];
  return n && n.disabled ? 'OK' : 'NO';})()`), 'OK');
await shot('61-移动-内参抽屉月历.png');
await ex(`closeList()`); await sleep(300);
check('收起抽屉后日报卡仍整卡可见', await ex(`(()=>{const d=document.querySelector('.nei-day .dh');
  const r=d.getBoundingClientRect(); return r.right <= innerWidth + 1 ? 'OK' : Math.round(r.right);})()`), 'OK');

/* ⑤ 探索引导卡不超屏 */
console.log('\n⑤ 探索引导');
await ex(`localStorage.removeItem('zss135.explore.v1'); expStep = 0; setView('explore')`); await sleep(500);
check('引导卡在视口内（max-width 92vw 生效）', await ex(`(()=>{const c=document.querySelector('.exo-card');
  const r=c.getBoundingClientRect(); return (r.left >= 0 && r.right <= innerWidth) ? 'OK' : Math.round(r.right);})()`), 'OK');
check('下一步按钮可见可点', await ex(`(()=>{const b=document.querySelector('.exo-next');
  const r=b.getBoundingClientRect(); return (r.width > 40 && r.right <= innerWidth) ? 'OK' : 'NO';})()`), 'OK');
await shot('62-移动-探索引导.png');

/* ⑥ 系统视图退出闭环在移动端同样成立 */
console.log('\n⑥ 系统视图退出闭环（v4.1 回归）');
await ex(`expDone(); location.hash='graph=map'`); await sleep(1200);
await ex(`[...document.querySelectorAll('.r-item')].find(b=>b.dataset.view==='graph').click()`); await sleep(700);
check('顶栏知识体系把画布从总图归位（v4.1 根修）', await ex(`mode + '|' + document.getElementById('main').classList.contains('graphon')`), 'tree|false');

/* ⑦ JS 报错 */
const bad = cdp.events.filter(e =>
  e.method === 'Runtime.exceptionThrown'
  || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'
      && !/favicon/.test((e.params?.entry?.text || '') + (e.params?.entry?.url || ''))));
check('0 条 JS 报错', bad.length, '0');
for (const b of bad.slice(0, 4)) console.log('    ', JSON.stringify(b.params).slice(0, 220));

console.log(`\n截图：prototype/预览/60-移动-我的树.png · 61-移动-内参抽屉月历.png · 62-移动-探索引导.png`);
if (fails.length) {
  console.error(`\n❌ ${fails.length} 条没过：`);
  for (const f of fails) console.error('   · ' + f);
  chrome.kill();
  process.exit(1);
}
console.log('\n✅ 移动端断言全过');
chrome.kill();
process.exit(0);
