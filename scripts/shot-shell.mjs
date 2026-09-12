#!/usr/bin/env node
// 用无头 Chrome 验收「壳」：加载 → 检查 JS 报错 → 点各个入口 → 截图。
// 用法：node scripts/shot-shell.mjs [url] [outdir]
// 前置：node scripts/serve-135.mjs 在跑。

import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const ROOT = path.resolve(import.meta.dirname, '..');
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html';
const OUT = process.argv[3] || path.join(ROOT, 'prototype', '预览');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;
const PROFILE = path.join(os.tmpdir(), 'shot-shell-profile-' + process.pid);

mkdirSync(OUT, { recursive: true });
rmSync(PROFILE, { recursive: true, force: true });

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
  '--window-size=1440,900', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', 'about:blank',
], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function cdpTargets() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const j = await r.json();
      const page = j.find(t => t.type === 'page');
      if (page) return page;
    } catch (e) { /* 还没起来 */ }
    await sleep(250);
  }
  throw new Error('Chrome 调试端口没起来');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); this.events = []; }
  static async open(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const c = new CDP(ws);
    ws.onmessage = ev => {
      const m = JSON.parse(ev.data);
      if (m.id && c.waiting.has(m.id)) { c.waiting.get(m.id)(m); c.waiting.delete(m.id); }
      else if (m.method) c.events.push(m);
    };
    return c;
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise(res => this.waiting.set(id, res));
  }
  async eval(expr) {
    const r = await this.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.text + ' :: ' + expr.slice(0, 80));
    return r.result?.result?.value;
  }
  async shot(name) {
    const r = await this.send('Page.captureScreenshot', { format: 'png' });
    const f = path.join(OUT, name);
    writeFileSync(f, Buffer.from(r.result.data, 'base64'));
    return f;
  }
}

const target = await cdpTargets();
const cdp = await CDP.open(target.webSocketDebuggerUrl);
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

await step('首屏 · 按主题分列', async () => { shots.push(await cdp.shot('10-壳-按主题分列.png')); });

const rail = await cdp.eval(`JSON.stringify([...document.querySelectorAll('.r-item')].map(b=>b.querySelector('b').textContent+' ‖ '+b.querySelector('i').textContent))`);
console.log('左栏：', JSON.parse(rail).join('  |  '));

await step('左栏 策展', async () => {
  await cdp.eval(`setView('curate')`);
  shots.push(await cdp.shot('11-壳-策展.png'));
});

await step('某一條线 · 路线', async () => {
  await cdp.eval(`openCollection('T2')`);
  shots.push(await cdp.shot('12-壳-一条线.png'));
});

await step('只看这条线', async () => {
  await cdp.eval(`focusTag('T2')`);
  shots.push(await cdp.shot('13-壳-只看一条线.png'));
});

await step('待你看一眼（已策展）', async () => {
  await cdp.eval(`filter=null; setAxis('tag'); setView('todo')`);
  shots.push(await cdp.shot('14-壳-待你看一眼.png'));
});

await step('按来源分列（旧轴仍在）', async () => {
  await cdp.eval(`closePanel(); setAxis('src')`);
  shots.push(await cdp.shot('15-壳-按来源.png'));
});

await step('Agent · 真 skill 列表', async () => {
  await cdp.eval(`setAxis('tag'); setView('chat')`);
  shots.push(await cdp.shot('16-壳-agent真skill.png'));
});

await step('真对话（dbs-learning-beta）', async () => {
  await cdp.eval(`pickAgent('dbs-learning-beta','dbs-learning-beta')`);
  await cdp.eval(`document.getElementById('b-q').value='我要不要辞掉工作去做独立开发？'; send()`);
  await sleep(9000);
  shots.push(await cdp.shot('17-壳-真skill对话.png'));
  return null;
});

const conv = await cdp.eval(`document.getElementById('clist') ? document.getElementById('clist').innerText.slice(-420) : '(无会话)'`);
console.log('--- 会话结尾 ---\n' + conv + '\n---');

await step('星球', async () => {
  await cdp.eval(`closePanel(); setMode('sphere')`);
  shots.push(await cdp.shot('18-壳-星球.png'));
});

console.log('\n截图：');
for (const s of shots) console.log('  ' + path.relative(ROOT, s));
console.log(errs.length ? `\n❌ JS 报错 ${errs.length} 条：\n` + errs.join('\n') : '\n✅ 0 条 JS 报错');

cdp.ws.close();
chrome.kill();
try { rmSync(PROFILE, { recursive: true, force: true, maxRetries: 5 }); } catch (e) {}
process.exit(errs.length ? 1 : 0);
