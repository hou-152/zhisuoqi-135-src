#!/usr/bin/env node
// 全链路总图：真浏览器验收（无头 Chrome + CDP）
//   node scripts/test-graph-page.mjs [url] [outdir]
// 前置：node scripts/serve-135.mjs 在跑（默认 5180，可用 PORT 或第一个参数换端口）。
//
// 查的是页面真的把**真实索引**渲染出来了，而且总图三页与学习入口连得上：
// 层卡 / 搜索 / 筛选 / 节点详情六段 / 当前路线 / 学习与轨迹 / 可运行入口 / 无 JS 报错。

import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { CHROME, openCDP, spawnProcess, waitForPage, sleep } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT_WEB = Number(process.env.PORT || 5180);
const BASE = process.argv[2] || `http://127.0.0.1:${PORT_WEB}/知所栖-壳.html`;
const OUT = process.argv[3] || path.join(ROOT, 'output', 'graph-shots');
const PORT = 9777 + (process.pid % 200);
const PROFILE = path.join(os.tmpdir(), 'graph-page-profile-' + process.pid);

mkdirSync(OUT, { recursive: true });
rmSync(PROFILE, { recursive: true, force: true });

let pass = 0, fail = 0;
const ok = (c, label) => { if (c) pass++; else { fail++; console.log(`  ✗ ${label}`); } };
const group = (t) => console.log(`\n${t}`);

const chrome = spawnProcess(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
  '--window-size=1600,1000', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', 'about:blank',
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const target = await waitForPage(PORT);
if (!target) throw new Error('Chrome 调试端口没起来');
const cdp = await openCDP(target.webSocketDebuggerUrl);
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Log.enable');
const errs = [];
const collect = (from) => {
  for (const e of cdp.events.slice(from)) {
    const bad = e.method === 'Runtime.exceptionThrown'
      || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error');
    if (!bad) continue;
    const t = e.params?.exceptionDetails?.exception?.description || e.params?.exceptionDetails?.text || e.params?.entry?.text || '';
    const u = e.params?.entry?.url || '';
    if (/favicon/.test(t) || /favicon/.test(u)) continue;
    errs.push(t.slice(0, 240));
  }
};
const ev = (expr) => cdp.eval(expr);
const text = (sel) => ev(`(document.querySelector(${JSON.stringify(sel)})||{}).innerText||''`);
const count = (sel) => ev(`document.querySelectorAll(${JSON.stringify(sel)}).length`);

async function goto(hash, waitMs = 1400) {
  const before = cdp.events.length;
  await cdp.send('Page.navigate', { url: BASE + hash });
  await sleep(waitMs);
  collect(before);
}

// ── ① 系统总图 ─────────────────────────────────────────
await goto('#graph=map', 2600);
group('① A 系统总图（#graph=map）');
ok(await ev(`location.protocol === 'http:'`), '经本地服务打开（file:// 读不到索引，页面会照实报错）');
ok(await ev(`!!window.GRAPH_RUNNER && !!window.GRAPH_VIEW`), '运行器与视图都内联进了壳');
ok(await ev(`document.querySelector('#main').classList.contains('graphon')`), '总图模式隐藏了画布，主区让给总图');
const layerCards = await ev(`document.querySelectorAll('#gv-host .gv-card').length`);
ok(layerCards >= 7, `七层都有卡（实际 ${layerCards}）`);
const head = await text('#gv-host');
// 顶栏那个数必须等于图里真实的全量节点数（原来写死成 1990–2999 的区间，图一长就会假红；
// 改成跟 window.GV.graph.stats.nodes 对，才是"不是手写的"这句断言真正的意思）
const realNodes = await ev(`(window.GV && window.GV.graph && window.GV.graph.stats && window.GV.graph.stats.nodes) || (window.GV && window.GV.graph && window.GV.graph.nodes.length) || 0`);
ok(realNodes > 0 && new RegExp('全部索引\\s*' + realNodes + '(?![0-9])').test(head), `顶栏写着真实的全量节点数（图 ${realNodes}）`);
ok(/待装配/.test(head), '顶栏同时给出待装配数');
ok(/材料与出处/.test(head) && /五类语义/.test(head) && /公共知识与关系/.test(head) && /问题与课程编排/.test(head)
  && /学习活动/.test(head) && /运行与记录/.test(head) && /模型与规则/.test(head), '七层名字齐');
ok((await ev(`document.querySelectorAll('#gv-host .gv-eb, #gv-host .gv-ea').length`)) > 0, '层与层之间画了带数量的连接摘要');

group('② 逐层展开 + 搜索 + 筛选');
await ev(`(function(){var c=document.querySelectorAll('#gv-host .gv-cardhead')[1]; if(c) c.click();})()`);
await sleep(500);
const kinds = await count('#gv-host .gv-kindrow');
ok(kinds >= 1, `点开一层能列出 kind（${kinds} 个）`);
await ev(`(function(){var k=document.querySelectorAll('#gv-host .gv-kindrow button, #gv-host .gv-kindrow')[0]; if(k) k.click();})()`);
await sleep(500);
const rowsBefore = await count('#gv-host .gv-row');
ok(rowsBefore > 0 && rowsBefore <= 80, `kind 展开后按页渲染节点（${rowsBefore} ≤ 80）`);
ok(/加载更多/.test(await text('#gv-host')) || rowsBefore < 80, '有分页或本来就不满一页');

const counts0 = await ev(`(function(){var m=document.querySelectorAll('#gv-host .gv-mm'); return m.length?m[0].innerText:'';})()`);
await ev(`(function(){var i=document.querySelector('#gv-host .gv-input'); if(!i) return; i.value='Agent'; i.dispatchEvent(new Event('input',{bubbles:true}));})()`);
await sleep(600);
const searched = await ev(`window.GRAPH_VIEW._filterNodes(window.GV.graph, document.querySelector('#gv-host .gv-input').value).length`);
ok(searched > 0 && searched < 1999, `搜索真的过滤了（Agent → ${searched} 个）`);
const shown = await count('#gv-host .gv-row');
ok(shown > 0 && shown <= 160, `搜索结果按页渲染（${shown}，含上一层已展开的列表）`);

group('③ 点节点 → 六段详情');
const before3 = cdp.events.length;
await ev(`(function(){var r=document.querySelectorAll('#gv-host .gv-row button, #gv-host .gv-row'); if(r[0]) r[0].click();})()`);
await sleep(600);
collect(before3);
const det = await text('#gv-host .gv-detail');
ok(/它是什么|来自哪里/.test(det), '详情里有「它是什么 / 来自哪里」');
ok(/连接到什么/.test(det), '详情里有「连接到什么」');
ok(/当前状态/.test(det), '详情里有「当前状态」');
ok(/缺口/.test(det), '详情里有「缺口」段');
ok(/候选|未核实/.test(det) || /连接到什么/.test(det), '未核实的边被标出来（没有未核实边时至少分类清楚）');
ok(/来源|locator|\.json|\.md/.test(det), '出处写到文件与定位，不是只写"有来源"');
await ev(`document.querySelectorAll('#gv-host .gv-tab')[0].click()`);
console.log(`  · 截图 → ${path.join(OUT, '总图-A-系统总图.png')}`);
await cdp.screenshot(path.join(OUT, '总图-A-系统总图.png'));

// ── ④ 当前路线 ─────────────────────────────────────────
await goto('#graph=route', 1800);
group('④ B 当前路线（#graph=route）');
const rt = await text('#gv-host');
ok(/RouteStep（按 meta.order）· 6 步/.test(rt) && /验证闭环/.test(rt), '六步都在（真实路线，不是样例）');
ok(/Agent|工具|Harness/.test(rt), '步骤显示真实概念名');
ok(/共享概念/.test(rt), '列出了共享概念');
await ev(`(function(){var b=Array.from(document.querySelectorAll('#gv-host button')).filter(function(x){return /展开/.test(x.innerText||'')}); if(b[0]) b[0].click();})()`);
await sleep(700);
const rt2 = await text('#gv-host');
ok(/为什么现在学/.test(rt2), '每步能展开「为什么现在学」');
ok(/用了哪条知识关系/.test(rt2), '每步能展开「用了哪条知识关系」');
ok(/开发夹具/.test(rt) && /不是正式课程/.test(rt), '夹具显著标注"不是正式课程"');
ok(/回哪里/.test(rt2) || /卡住/.test(rt2), '给出了卡住回哪里');
console.log(`  · 截图 → ${path.join(OUT, '总图-B-当前路线.png')}`);
await cdp.screenshot(path.join(OUT, '总图-B-当前路线.png'));

// ── ⑤ 学习与轨迹 ───────────────────────────────────────
await goto('#graph=trace', 1800);
group('⑤ C 学习与轨迹（#graph=trace）');
const tr = await text('#gv-host');
ok(/尚无运行记录/.test(tr) || /没有会话/.test(tr), '没有会话时照实写「尚无运行记录」，没有编一条');
ok(/固定响应|真实模型|证据级别/.test(tr), '标了证据级别（固定响应 / 真实调用）');
ok(!/undefined|NaN|\[object/.test(tr), '没有 undefined / NaN 漏到界面上');
console.log(`  · 截图 → ${path.join(OUT, '总图-C-学习与轨迹.png')}`);
await cdp.screenshot(path.join(OUT, '总图-C-学习与轨迹.png'));

// ── ⑥ 可运行入口 ───────────────────────────────────────
group('⑥ 可运行入口连回学习空间');
const hasEntries = await ev(`(function(){var g=window.GV.graph; return !!(g&&g.entries&&g.entries.length);})()`);
ok(hasEntries, `graph 带着 ${await ev('window.GV.graph.entries.length')} 个可运行入口`);
ok(await ev(`window.GV.graph.entries.some(function(e){return /^#learn=/.test(e.entry)})`), '六章入口是 #learn=<chapterId>');
ok(await ev(`window.GV.graph.entries.some(function(e){return /^#neican=/.test(e.entry)})`), '单篇入口是 #neican=<slug>');

// ── ⑦ 回学习空间跑一下，再回总图看轨迹 ─────────────────
group('⑦ 学习空间 → 总图轨迹');
await goto('#learn=agent', 2600);
const inLearn = await ev(`document.body.classList.contains('learning')`);
ok(inLearn, '进得了学习空间');
const lr = await ev(`!!window.LEARN_SESSION`);
ok(lr, '学习空间建了 graph 会话（真实运行状态，不是示意图）');
ok(await ev(`!!(window.LEARN_SESSION && /:reading$/.test(window.LEARN_SESSION.current().nodeId))`), '会话停在真实的"阅读"活动上（不是空壳）');
// 在页面上真答一道题 → 应该沿 answered／reviewed 两条流程边走
await ev(`(function(){var b=document.querySelector('#learn-q .lopt'); if(b) b.click();})()`);
await sleep(700);
const fired = await ev(`(function(){try{return window.LEARN_SESSION.log.length}catch(e){return -1}})()`);
ok(fired >= 2, `页面上作答后，会话真的沿流程边走（${fired} 条事件：proceed/answered/reviewed）`);
ok(await ev(`(function(){try{return window.LEARN_SESSION.log.some(function(l){return l.event==='answered'})}catch(e){return false}})()`), '事件日志里有 answered（先选择再记录）');
await goto('#graph=trace', 2200);
const tr2 = await text('#gv-host');
ok(!/尚无运行记录/.test(tr2), '回总图后轨迹页显示真实运行记录');
ok(/本次回答|核对了|为何走这条边|回到/.test(tr2), '五段链路至少显示到当前进度');
console.log(`  · 截图 → ${path.join(OUT, '总图-C-有运行记录.png')}`);
await cdp.screenshot(path.join(OUT, '总图-C-有运行记录.png'));

// ── ⑧ 没有 JS 报错 ─────────────────────────────────────
group('⑧ JS 报错');
ok(errs.length === 0, `全程没有页面报错（${errs.length} 条）`);
for (const e of errs.slice(0, 5)) console.log('    ! ' + e);

console.log(`\n通过 ${pass} · 失败 ${fail}`);
console.log(`截图目录：${OUT}`);
process.exit(fail ? 1 : 0);
