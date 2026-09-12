#!/usr/bin/env node
// 倒逼层验收 —— 证明「概念图不是摆设」：不复述就不可能有绿环，说错了会被倒回先修概念。
//
// 背景（所有者 09-12 08:47 的批评）：
//   「变成了一个摆设……概念其实也就那样吧。这样子干你没法倒逼，当这种教学学习啊」
// 原来自报：点一下「学过」就变绿，零证据。这个脚本就是来证明那件事已经被拿掉了。
//
// 前置：node scripts/serve-135.mjs 在跑（LLM 判定要真模型）
// 用法：node scripts/test-daobi.mjs

import { spawn } from 'node:child_process';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9401, PROF = '/tmp/daobi-' + Date.now();
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html';

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let page;
for (let i = 0; i < 40; i++) { try { const j = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); page = j.find(t => t.type === 'page'); if (page) break; } catch {} await sleep(250); }
if (!page) { console.error('Chrome 没起来'); process.exit(2); }

const ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const waiting = new Map(); const events = [];
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } else if (m.method) events.push(m); };
const send = (me, p = {}) => { const i = ++id; ws.send(JSON.stringify({ id: i, method: me, params: p })); return new Promise(r => waiting.set(i, r)); };
const ex = async x => {
  const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return 'THREW: ' + (r.result.exceptionDetails.exception?.description || '').split('\n')[0];
  return r.result?.result?.value;
};

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await send('Page.navigate', { url: URL_ }); await sleep(2800);
await ex(`(()=>{const s=document.createElement('style');s.textContent='*{transition:none!important;animation:none!important}';document.head.appendChild(s)})()`);
await ex(`localStorage.removeItem('zss135.proof.v2')`);

const fails = [];
const check = (label, got, want) => {
  const ok = String(got).includes(want);
  if (!ok) fails.push(`${label}：期望含「${want}」，实得「${String(got).slice(0, 110)}」`);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${String(got).slice(0, 88)}`);
};

console.log('倒逼层验收 ' + URL_);

/* ① 自报通道必须已经不在了 */
await ex(`openPanel('C04')`);
check('打开概念就有复述输入框', await ex(`document.getElementById('said') ? 'OK' : 'NO'`), 'OK');
check('没有「点一下就变绿」的按钮（onclick 里不再有 setMark）',
  await ex(`document.getElementById('pbody').innerHTML.includes('setMark') ? '还在' : 'OK'`), 'OK');
check('面板上写明了不能自己标', await ex(`document.getElementById('pbody').innerText.includes('你不能自己标') ? 'OK' : 'NO'`), 'OK');

/* ② 写废话 → 必须没过，且给出漏点，且倒回先修概念 */
await ex(`document.getElementById('said').value='就是一个理论吧，感觉挺有道理的，讲人的不同方面。'`);
await ex(`judge('C04')`); await sleep(15000);
check('② 废话被判没过', await ex(`(marks['C04']||{}).state`), 'fail');
check('② 给出漏点', await ex(`((marks['C04']||{}).missing||[]).length>0 ? '有' : '无'`), '有');
check('② 倒回指向它的先修概念', await ex(`JSON.stringify((marks['C04']||{}).backTo||[])`), 'C0');
check('② 面板渲染倒回按钮', await ex(`document.querySelectorAll('.backto button').length>0 ? 'OK' : 'NO'`), 'OK');

/* ③ 照抄原文 → 明确不算过 */
await ex(`openPanel('C04'); document.getElementById('said').value=byId.get('C04').gloss; judge('C04')`); await sleep(15000);
check('③ 照抄原文不算过', await ex(`(marks['C04']||{}).state`), 'fail');

/* ④ 说清核心机制 → 才给过 */
await ex(`openPanel('C04'); document.getElementById('said').value='威尔伯的四象限是两条轴交叉：一条是内在经验 vs 外在行为，一条是个体 vs 集体，两两组合出四个格子。纯粹派和自动机各砍掉了一半现实——一个只认内在、退回无屏幕生活，一个只认外在可优化的部分。用四象限是把被砍掉的那半个现实放回来，判断一个人或一件事要同时在四个格子里看。'; judge('C04')`);
await sleep(16000);
check('④ 说清楚了才判过', await ex(`(marks['C04']||{}).state`), 'pass');
check('④ 面板渲染成「过了」', await ex(`document.getElementById('pbody').innerText.includes('复述过了') ? 'OK' : 'NO'`), 'OK');

/* ⑤ 状态进左栏、进图例、进 localStorage */
check('⑤ 左栏计数', await ex(`document.getElementById('r-mine').textContent`), '验过');
check('⑤ 图例计数', await ex(`document.getElementById('myrow').innerText.replace(/\\s+/g, ' ')`), '复述过了');
check('⑤ 落盘', await ex(`Object.keys(JSON.parse(localStorage.getItem('zss135.proof.v2')||'{}')).join(',')`), 'C04');
check('⑤ 旧的自报键已作废（不再被读）', await ex(`(localStorage.getItem('zss135.canvas.v1'), localStorage.getItem('zss135.proof.v2').includes('"state"') ? 'OK' : 'NO')`), 'OK');

/* ⑥ 一条线的倒逼链 */
await ex(`setView('curate'); openCollection('T2')`);
check('⑥ 策展面板有「开始倒逼」', await ex(`document.getElementById('pbody').innerText.includes('开始倒逼') ? 'OK' : 'NO'`), 'OK');
await ex(`startLine('T2')`); await sleep(800);
check('⑥ 链头显示第 1 步', await ex(`document.querySelector('.chainhead')?.innerText.slice(0, 26) || '无'`), '第 1/');
check('⑥ 只铺开这条线', await ex(`filter`), 'T2');

const errs = events.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error')).filter(e => !/favicon/.test(JSON.stringify(e)));
console.log(errs.length ? `\n❌ JS 报错 ${errs.length}:\n` + errs.map(e => JSON.stringify(e).slice(0, 160)).join('\n') : '\n✅ 0 条 JS 报错');
console.log(fails.length ? `❌ 断言失败 ${fails.length}:\n` + fails.join('\n') : '✅ 断言全过');
ws.close(); chrome.kill();
try { (await import('node:fs')).rmSync(PROF, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(fails.length || errs.length ? 1 : 0);
