#!/usr/bin/env node
// 用无头 Chrome 验收「壳」：加载 → 检查 JS 报错 → 点各个入口 → 截图。
// 用法：node scripts/shot-shell.mjs [url] [outdir]
// 前置：node scripts/serve-135.mjs 在跑。

import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { CHROME, openCDP, spawnProcess, waitForPage, sleep } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html';
const OUT = process.argv[3] || path.join(ROOT, 'prototype', '预览');
const PORT = 9333 + (process.pid % 400);
const PROFILE = path.join(os.tmpdir(), 'shot-shell-profile-' + process.pid);

mkdirSync(OUT, { recursive: true });
rmSync(PROFILE, { recursive: true, force: true });

const chrome = spawnProcess(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
  '--window-size=1440,900', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', 'about:blank',
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const target = await waitForPage(PORT);
if (!target) throw new Error('Chrome 调试端口没起来');
const cdp = await openCDP(target.webSocketDebuggerUrl);
const shot = name => cdp.screenshot(path.join(OUT, name));
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Log.enable');

const errs = [];
const shots = [];
async function step(label, fn) {
  const before = cdp.events.length;
  if (fn) await fn();
  await sleep(950);
  const newEv = cdp.events.slice(before);
  const bad = newEv.filter(e =>
    (e.method === 'Runtime.exceptionThrown') ||
    (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'));
  for (const b of bad) {
    const t = b.params?.exceptionDetails?.exception?.description
           || b.params?.exceptionDetails?.text || b.params?.entry?.text || '';
    if (/favicon/.test(t)) continue;
    errs.push(`[${label}] ${t.slice(0, 220)}`);
  }
  // 面板断言：截图眼看不一定准，直接量。
  const probe = await cdp.eval(`(()=>{const p=document.getElementById('panel');
    const r=p.getBoundingClientRect();
    return JSON.stringify({on:p.classList.contains('on'),x:Math.round(r.x),right:Math.round(r.right),
      vis:getComputedStyle(p).transform,body:document.getElementById('pbody').innerText.replace(/\\s+/g,' ').slice(0,46)});})()`);
  const q = JSON.parse(probe);
  const okp = !q.on || (q.right <= 1440 && q.x >= 0 && q.vis === 'none');
  console.log(`  ${bad.filter(b => !/favicon/.test(JSON.stringify(b))).length ? '⚠' : '·'} ${label}`
    + `  ｜ 面板 ${q.on ? 'on' : 'off'} x=${q.x} right=${q.right} ${okp ? '' : '❌越界'} ｜ ${q.body}`);
  if (q.on && !okp) errs.push(`[${label}] 面板越界 x=${q.x} right=${q.right}`);
}

console.log('加载 ' + URL_);
await cdp.send('Page.navigate', { url: URL_ });
await sleep(2600);
// 踩过：无头 Chrome 不会把 #panel 的 translateX 过渡跑完，captureScreenshot 抓到的是旧帧
// —— DOM 里面板已经是 on x=1040 right=1440，图里却看不到。禁掉过渡再拍，图才可信。
// （真实浏览器里 0.26s 过渡正常，这是测试工装的问题，不是产品的问题。）
await cdp.eval(`(()=>{const s=document.createElement('style');
  s.textContent='*{transition:none!important;animation:none!important}';
  document.head.appendChild(s); return 'ok';})()`);
await sleep(400);

// 概念源 2026-09-13 换成「概念地图 v2」：id 现查。
const USE0 = await cdp.eval(`(nodes.find(n=>n.k==='use')||{}).id`);
const JUDGE0 = await cdp.eval(`(nodes.find(n=>n.k==='judge')||nodes[0]).id`);
console.log(`  抽检：能用的 ${USE0} ｜ 能判的 ${JUDGE0}`);

// 坐标回归：画布位于两栏之后，事件坐标必须先换成画布内坐标。
// （09-15 v3 改准：这套分列坐标现在是「我的树」在用——图谱/关系/星球已撤入口，setMode 旧名落树）
await step('我的树 · 画布偏移命中回归', async () => {
  const probe = JSON.parse(await cdp.eval(`(()=>{
    setMode('tree'); closePanel(); filter=null; computeLayout(); camStop();   // v4：冻结缓动再取坐标，否则镜头还在动、点击落空
    const ps = nodes.map(n => ({n,p:project(n)})).filter(x => x.p.sx > 40 && x.p.sx < W - 40 && x.p.sy > 80 && x.p.sy < H - 40);
    let best = ps[0]; let bestGap = -1;
    for (const x of ps) {
      const gap = Math.min(...ps.filter(y => y.n.id !== x.n.id).map(y => Math.hypot(x.p.sx-y.p.sx, x.p.sy-y.p.sy)));
      if (gap > bestGap) { bestGap = gap; best = x; }
    }
    const r = cvs.getBoundingClientRect();
    return JSON.stringify({id:best.n.id, clientX:r.left+best.p.sx*r.width/W, clientY:r.top+best.p.sy*r.height/H, gap:bestGap});
  })()`));
  if (!probe?.id) throw new Error('没有可用于命中回归的节点');
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: probe.clientX, y: probe.clientY });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: probe.clientX, y: probe.clientY, button: 'left', clickCount: 1 });
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: probe.clientX, y: probe.clientY, button: 'left', clickCount: 1 });
  await sleep(220);
  const result = JSON.parse(await cdp.eval(`JSON.stringify({selected, target:'${probe.id}', title:document.querySelector('#pbody h2')?.textContent||'', pinned:document.getElementById('main').classList.contains('pinned')})`));
  if (result.selected !== result.target || !result.pinned) throw new Error(`命中错位：${JSON.stringify(result)}`);
  shots.push(await shot('24-命中偏移-面板.png'));
  await cdp.eval(`closePanel(); setMode('tree')`);
});

await step('我的树 · 树头（slogan + 绝对数统计）', async () => {
  await cdp.eval(`closePanel(); setMode('tree')`);
  const result = JSON.parse(await cdp.eval(`JSON.stringify({mode, treeon:document.getElementById('main').classList.contains('treeon'),
    slogan:!!document.querySelector('#tree-head .th-slogan'), stat:document.getElementById('tree-stat').textContent.length,
    hidden:relationStats.hidden, forbidden:relations.filter(r=>r.kind==='co-article'||r.kind==='rejected').length})`));
  if (result.mode !== 'tree' || !result.treeon || !result.slogan || result.stat < 5 || result.forbidden) throw new Error(`我的树异常：${JSON.stringify(result)}`);
  shots.push(await shot('29-我的树-树头.png'));
});

await step('二级 · 全部主题（左栏只剩导航，中间栏 21 条）', async () => { shots.push(await shot('25-主题-首屏.png')); });

await step('三级 · 点一条主题下钻', async () => {
  await cdp.eval(`document.querySelectorAll('#lp-body .row')[2].click()`);
  shots.push(await shot('25b-主题-下钻概念.png'));
});
await step('下钻后点「← 全部主题」回二级', async () => {
  await cdp.eval(`setView('graph')`);
  shots.push(await shot('25c-主题-返回全部主题.png'));
});

const rail = await cdp.eval(`JSON.stringify([...document.querySelectorAll('.r-item')].map(b=>b.querySelector('b').textContent+' ‖ '+((b.querySelector('i')||{}).textContent||'—')))`);
console.log('顶栏：', JSON.parse(rail).join('  |  '));

// 内参（第六格）：**上方日期条 ＋ 中间「内参日报集合」**（2026-09-14 所有者口径：
// 「在内参的二级页面中排一个日期选择功能，日期放在上方。中间的阅读位置替换为内参日报集合」）。
// 单篇阅读没删——从日报集合里点进去。
await step('内参 · 日报集合（从导航进，上方月历选日期）', async () => {
  await cdp.eval(`setView('neican')`);
  shots.push(await shot('33-内参-日报集合.png'));
});

await step('内参 · 月历点一天 → 只留那天的日报', async () => {
  await cdp.eval(`neiPick(NEI_ALL[NEI_ALL.length-1].period)`);
  shots.push(await shot('33b-内参-月历选到最早一期.png'));
});

await step('内参 · 分类 / 标签 / 策展 三组筛选', async () => {
  await cdp.eval(`neiPick(''); neiSetFilt('tag', NEI_ALL[0].articles[0].tag)`);
  shots.push(await shot('33c-内参-分类筛选.png'));
});

await step('内参 · 策展那组打开', async () => {
  await cdp.eval(`neiClearFilt(); neiFoldToggle('star')`);
  shots.push(await shot('33d-内参-策展组.png'));
});

await step('内参 · 收起筛选组，回到全部', async () => {
  await cdp.eval(`neiFoldToggle('star'); neiClearFilt()`);
  shots.push(await shot('33e-内参-筛选收起.png'));
});

await step('内参 · 单篇三级笔记', async () => {
  await cdp.eval(`neiPick(''); openNeican(NEI_ALL[0].articles[0].slug); document.getElementById('reader').scrollTop=620`);
  shots.push(await shot('34-内参-三级笔记正文.png'));
});

await step('内参 · 概念网络', async () => {
  await cdp.eval(`neiTab('concept'); document.getElementById('reader').scrollTop=900`);
  shots.push(await shot('35-内参-概念网络.png'));
});

await step('内参 · 费曼', async () => {
  await cdp.eval(`neiTab('feynman'); document.getElementById('reader').scrollTop=560`);
  shots.push(await shot('36-内参-费曼.png'));
});

await step('内参 · 换一篇 · 阅读原文', async () => {
  await cdp.eval(`openNeican(NEI_ALL[1].articles[3].slug); neiTab('source'); document.getElementById('reader').scrollTop=330`);
  shots.push(await shot('37-内参-阅读原文.png'));
});

await step('回到知识体系（阅读区应让位）', async () => {
  await cdp.eval(`setView('graph')`);
  shots.push(await shot('38-内参-退出后回到知识体系.png'));
});



await step('「只能认的」不设验收', async () => {
  await cdp.eval(`closePanel(); openPanel(nodes.find(n=>n.k==='accept').id)`);
  shots.push(await shot('26-分类-只能认的不考.png'));
});

await step('「能用的」任务词', async () => {
  await cdp.eval(`openPanel(nodes.find(n=>n.k==='use').id)`);
  shots.push(await shot('27-分类-能用的要给用例.png'));
});

await step('概念 · 倒逼输入框', async () => {
  await cdp.eval(`closePanel(); filter=null; localStorage.removeItem('zss135.proof.v2'); marks={}; refreshMarks(); openPanel('${JUDGE0}')`);
  shots.push(await shot('21-倒逼-输入框.png'));
});

await step('没过 · 漏点 · 倒回先修', async () => {
  await cdp.send('Runtime.evaluate', { expression: `document.getElementById('said').value='就是一个说法吧，感觉挺有道理的，讲 AI 的一些限制。'; judge('${JUDGE0}')`, awaitPromise: false, returnByValue: true });
  await sleep(15000);
  shots.push(await shot('22-倒逼-没过倒回.png'));
});

await step('说清楚了才给过', async () => {
  await cdp.send('Runtime.evaluate', { expression: `openPanel('${JUDGE0}'); document.getElementById('said').value='我判断一段代码算不算 Harness，用一条线：把它整个删掉之后模型自己的本事有没有变化。模型权重没动，但工具调用、文件读写、循环控制、权限确认、状态保存这些东西没了之后模型就干不成活，那这些就是 Harness。换成我的处境：我在做一个每天自动整理素材的 Agent，一开始把「这次失败要不要重试」也交给模型自己判，结果它在一篇反爬失败的文章上重试了 11 次，烧掉一整天的额度。后来我把重试上限和失败分诊挪进 Harness 的确定性代码里，模型的活只剩判断内容值不值得留。代价是 Harness 变厚了，每加一条规则，我都要在模型升级之后回去看它是不是过时。所以我的口径是：Harness 越薄越好，但薄不等于没有；判断哪一步该沉到确定性代码里、哪一步该留给模型，才是这门工程真正的手艺。'; judge('${JUDGE0}')`, awaitPromise: false, returnByValue: true });
  await sleep(16000);
  shots.push(await shot('23-倒逼-过了.png'));
});


await step('系统视图（v4 撤 tab：经 hash 直达，入口在更新面板）', async () => {
  await cdp.eval(`closePanel(); location.hash='graph=map'`);
  await sleep(1500);   // 总图要拉真实 /api/graph 索引，等它挂上
  shots.push(await shot('18-壳-系统视图.png'));
});

console.log('\n截图：');
for (const s of shots) console.log('  ' + path.relative(ROOT, s));
console.log(errs.length ? `\n❌ JS 报错 ${errs.length} 条：\n` + errs.join('\n') : '\n✅ 0 条 JS 报错');

cdp.close();
chrome.kill();
try { rmSync(PROFILE, { recursive: true, force: true, maxRetries: 5 }); } catch (e) {}
process.exit(errs.length ? 1 : 0);
