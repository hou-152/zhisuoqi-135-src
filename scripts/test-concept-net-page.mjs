#!/usr/bin/env node
// 概念网络图：真浏览器验收（无头 Chrome + CDP）
//   node scripts/test-concept-net-page.mjs [url] [outdir]
// 前置：node scripts/serve-135.mjs 在跑（默认 5180）。
//
// 查的是「接线」这一层（数据层归 scripts/check-concept-net.mjs）：
// 内参单篇「概念网络」签出真图（图在上 · 概念卡列表一个不删）· 点节点看得逐字原文 ·
// 六章章内顶部出路线图并高亮本章层 · 没图的篇目照实不摆 · 全程 0 JS 报错。

import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { CHROME, openCDP, spawnProcess, waitForPage, sleep } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASE = process.argv[2] || `http://127.0.0.1:${Number(process.env.PORT || 5180)}/知所栖-壳.html`;
const OUT = process.argv[3] || path.join(ROOT, 'output', 'concept-net-shots');
const PORT = 9900 + (process.pid % 200);
const PROFILE = path.join(os.tmpdir(), 'cn-page-profile-' + process.pid);

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
    errs.push((t + ' ' + u).slice(0, 240));
  }
};
const ev = (expr) => cdp.eval(expr);
const count = (sel) => ev(`document.querySelectorAll(${JSON.stringify(sel)}).length`);
const txt = (sel) => ev(`(document.querySelector(${JSON.stringify(sel)})||{innerText:''}).innerText`);

async function goto(hash, waitMs = 1600) {
  const before = cdp.events.length;
  await cdp.send('Page.navigate', { url: BASE + hash });
  await sleep(waitMs);
  collect(before);
}
async function shot(name) { await cdp.screenshot(path.join(OUT, name)); }

// ── ① 模块与数据装进壳 ─────────────────────────────────
await goto('#graph=map', 2200);
group('① 模块与数据');
ok(await ev(`!!window.CONCEPT_NET && CONCEPT_NET.VERSION === 'v1'`), 'concept-net-view 内联进了壳（window.CONCEPT_NET v1）');
const nNets = await ev(`Object.keys(CN_NETS).length`);
ok(nNets > 0, `图数据装进壳（${nNets} 张）`);
ok(await ev(`!!CN_NETS['route-agent-loop']`), '六章路线图 route-agent-loop 在');
const bengioKey = await ev(`Object.keys(CN_NETS).find(function(k){ return k.indexOf('260914') > -1 && /bengio/i.test(k); }) || ''`);
ok(!!bengioKey, `Bengio 篇的图在（${bengioKey || '没有'}）`);

// ── ② 内参单篇「概念网络」签 ───────────────────────────
if (bengioKey) {
  group('② 内参单篇 · 概念网络签（Bengio 篇）');
  const bengioSlug = bengioKey.replace(/^neican-\d{6}-/, '');
  await goto('#neican=' + bengioSlug, 1800);
  ok(await ev(`!!document.getElementById('nei-body')`), '单篇页开了');
  await ev(`neiTab('concept')`);
  await sleep(500);
  ok(await count('#nei-body .cn-fig') === 1, '概念网络签里有一张图（图在上）');
  ok(await ev(`(document.querySelector('#nei-body .cn-fig')||{}).dataset === undefined ? false : document.querySelector('#nei-body .cn-fig').dataset.unit === '${bengioKey}'`), '图的数据单元对得上这一篇');
  const nNodes = await count('#nei-body .cn-node');
  ok(nNodes >= 5, `图画出了节点（${nNodes} 个）`);
  const nLabels = await count('#nei-body .cn-elabel');
  ok(nLabels >= 3, `每条关系带短语标签（${nLabels} 个标签）`);
  ok(await ev(`Array.from(document.querySelectorAll('#nei-body .cn-elabel text')).every(function(t){ return t.textContent.trim().length > 0 && t.textContent.length <= 14; })`), '标签都是 ≤14 字短语（R3）');
  ok(await ev(`Array.from(document.querySelectorAll('#nei-body .cn-edge')).every(function(p){ return p.getAttribute('data-a') && p.getAttribute('data-b'); })`), '每条边都标了两端节点（R4）');
  ok((await txt('#nei-body .cn-legend')).includes('未经人工审核'), '图例照实写「机器生成，未经人工审核」（R8）');
  ok(await count('#nei-body .concept') >= 5, '概念卡列表还在（原有内容一个不删）');
  ok(await count('#nei-body .concept[id^="nei-card-"]') === await count('#nei-body .concept'), '每张概念卡都带锚点（点节点能滚过去）');
  await ev(`document.querySelector('#nei-body .cn-node').dispatchEvent(new Event('click'))`);
  await sleep(300);
  ok(await ev(`document.querySelector('#nei-body .cn-detail') && !document.querySelector('#nei-body .cn-detail').hidden`), '点节点展开了详情');
  ok((await txt('#nei-body .cn-detail .cn-q')).length > 0, '详情里给得出逐字原文（R2 的页面呈现）');
  await shot('内参-bengio-概念网络.png');
}

// ── ③ 六章章内路线图 ──────────────────────────────────
group('③ 学习空间 · 六章路线图');
await goto('#learn=agent&review=1', 2000);
ok(await count('#learn .lbody .cn-fig') === 1, '章内顶部有一张路线图');
ok(await ev(`(document.querySelector('#learn .cn-fig')||{dataset:{}}).dataset.unit === 'route-agent-loop'`), '数据单元 = route-agent-loop');
ok(await ev(`(document.querySelector('#learn .cn-host')||{dataset:{}}).dataset.hi === 'L1'`), '本章层高亮 = L1（agent）');
const nBands = await count('#learn .cn-band');
ok(nBands >= 6, `六条层带都画了（${nBands}）`);
const nRouteNodes = await count('#learn .cn-node');
ok(nRouteNodes >= 10, `路线节点画了（${nRouteNodes} 个）`);
ok(await count('#learn .lcard') >= 5, '正文流原内容一个不删');
ok(await ev(`!!document.getElementById('learn-q')`), '决策题照常渲染');
await ev(`document.querySelector('#learn .cn-node').dispatchEvent(new Event('click'))`);
await sleep(250);
ok(await ev(`!!document.querySelector('#learn .cn-detail .cn-jump')`), '路线节点给得出「跳地图」入口（R7 的页面呈现）');
await shot('学习章-路线图.png');
await goto('#learn=verification-loop&review=1', 1800);
ok(await ev(`(document.querySelector('#learn .cn-host')||{dataset:{}}).dataset.hi === 'L6'`), '第 6 章高亮 = L6（高亮跟着章走，不是写死）');

// ── ④ 没图的篇目照实不摆 ──────────────────────────────
group('④ 没图的篇目');
const bareSlug = await ev(`(function(){ const iss = (DATA.neican.issues || []).find(function(i){ return i.period === '260913'; }); if (!iss) return ''; const a = (iss.articles || []).find(function(a){ return (a.conceptCards || []).length >= 3; }); return a ? a.slug : ''; })()`);
if (bareSlug) {
  await goto('#neican=' + bareSlug, 1600);
  await ev(`neiTab('concept')`);
  await sleep(400);
  const hasNet = await ev(`!!CN_NETS['neican-260913-${bareSlug}']`);
  if (hasNet) ok(true, '这篇有图，出图');
  else {
    ok(await count('#nei-body .cn-fig') === 0, '这篇没图就不摆（不硬造）');
    ok(await count('#nei-body .concept') >= 3, '概念卡列表照常在');
  }
} else {
  ok(true, '260913 没有可测篇目（跳过）');
}

// ── ⑤ JS 报错 ─────────────────────────────────────────
group('⑤ 报错');
collect(0);
ok(errs.length === 0, errs.length ? `JS 报错：${errs[0]}` : '全程 0 JS 报错');

console.log(`\n概念网络图页面验收：${pass} 通过 · ${fail} 失败`);
console.log(`截图 → ${OUT}`);
process.exit(fail ? 1 : 0);
