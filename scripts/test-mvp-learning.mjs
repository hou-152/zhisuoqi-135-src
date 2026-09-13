#!/usr/bin/env node
// 黑盒验收一个最小学习单元：阅读 → 一题一判 × 3 → 费曼。
// 默认只替换浏览器内的费曼响应，验证状态门本身不靠模型随机性；最后可另行做本地 /api/llm 冒烟。

import { mkdirSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/mvp-decision-context-rot.html';
const port = 9600 + (process.pid % 250);
const profile = path.join(os.tmpdir(), 'mvp-learning-profile-' + process.pid);
const chrome = spawnProcess(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--window-size=1280,1000', '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-proxy-server', 'about:blank',
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const target = await waitForPage(port);
if (!target) throw new Error('Chrome 调试端口没起来');
const cdp = await openCDP(target.webSocketDebuggerUrl);
const ex = expression => cdp.eval(expression, { onException: d => 'THREW: ' + (d.exception?.description || d.text || '') });
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Network.enable');
await cdp.send('Log.enable');
await cdp.send('Page.navigate', { url: URL_ });

const t0 = Date.now();
while (Date.now() - t0 < 10000) {
  if (await ex('typeof window.__MVP === "object"')) break;
  await sleep(150);
}
if (await ex('typeof window.__MVP !== "object"') === true) throw new Error('MVP 页面没有初始化');

const failures = [];
const check = (label, got, expected) => {
  const ok = String(got) === String(expected);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${got}`);
  if (!ok) failures.push(`${label}：期望 ${expected}，实得 ${got}`);
};
const text = expr => ex(`(${expr}).replace(/\\s+/g,' ').trim()`);

console.log('页面：' + URL_);
check('材料包含五类语义单元', await ex(`document.querySelectorAll('.pairing > div').length`), 5);
check('当前材料有主案例且标明假设场景', await ex(`document.querySelector('.case').innerText.includes('主案例') && document.querySelector('.case').innerText.includes('假设场景')`), 'true');
check('来源 ID 保留在页面', await ex(`['QST-context-rot','CON-context-rot','OPI-CTX-03-03','CAS-context-rot','SOL-context-rot'].every(x=>document.body.innerText.includes(x))`), 'true');

console.log('\n阅读 → 决策');
await ex('startDecisions()');
check('阅读隐藏，决策显示', await ex(`document.getElementById('reading').classList.contains('hidden') && !document.getElementById('decisions').classList.contains('hidden')`), 'true');
check('第一题恰好 3 个选项', await ex(`document.querySelectorAll('#decision-list .option').length`), 3);
check('未作答不能下一题', await ex(`document.getElementById('next-decision').disabled`), 'true');

console.log('\n错误选择 → 保持当前题');
await ex('choose(0)');
check('错误选项显示反馈', await ex(`document.querySelector('.option.wrong') !== null && document.querySelector('.feedback').innerText.includes('无法')`), 'true');
check('答错不能绕过当前题', await ex(`document.getElementById('next-decision').disabled && window.__MVP.currentQuestion === 0`), 'true');
await ex('choose(1)');
check('第一题选对后才能继续', await ex(`!document.getElementById('next-decision').disabled`), 'true');
await ex('nextDecision()');
check('进入第二题，仍只有 3 个选项', await ex(`window.__MVP.currentQuestion === 1 && document.querySelectorAll('#decision-list .option').length === 3`), 'true');
await ex('choose(0); nextDecision()');
check('进入第三题', await ex(`window.__MVP.currentQuestion === 2`), 'true');
await ex('choose(2)');
check('第三题选对后按钮文案变为进入费曼', await text('document.getElementById("next-decision").innerText'), '三题通过，进入费曼');
await ex('nextDecision()');
check('三题全对才显示费曼', await ex(`document.getElementById('feynman').classList.contains('hidden')`), 'false');

console.log('\n费曼状态门');
await ex(`document.getElementById('feynman-input').value='太短'`);
await ex('finish()');
check('过短复述不判通过', await ex(`window.__MVP.feynmanStatus !== 'ok' && document.getElementById('feynman-result').innerText.includes('至少说清')`), 'true');
check('格式解析器拒绝非 JSON', await ex(`window.parseVerdict('这不是 JSON') === null`), 'true');

// 用固定响应验证“本地模型通过”只在协议完整时出现；这不是模型效果样本。
await ex(`document.getElementById('feynman-input').value='变量是模型、任务、关键证据和评分方法；证据是只分档增加无关输入后可靠性逐档变化；边界是不能把更大窗口当成更可靠，也不能超出本次测量范围。'`);
await ex(`window.fetch=async()=>({ok:true,json:async()=>({content:JSON.stringify({covered:['变量','证据','边界'],missing:[],next:'用真实任务复测'})})})`);
await ex('finish()');
await sleep(100);
check('完整协议响应才显示费曼通过', await ex(`window.__MVP.feynmanStatus === 'ok' && document.getElementById('feynman-result').innerText.includes('费曼通过')`), 'true');
check('通过后最后进度点才完成', await ex(`document.querySelectorAll('.dot.done').length`), 4);

const requested = cdp.events.filter(e => e.method === 'Network.requestWillBeSent').map(e => e.params.request.url);
check('本页没有知乎请求', requested.some(url => /zhihu/i.test(url)), 'false');
const shot = path.join('/tmp', 'mvp-decision-context-rot.png');
await cdp.screenshot(shot);
console.log('\n截图：' + shot);
const errors = cdp.events.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
  .filter(e => !/favicon/i.test(JSON.stringify(e)));
console.log(errors.length ? `⚠ JS 报错 ${errors.length} 条\n${errors.map(e => (e.params?.exceptionDetails?.exception?.description || e.params?.exceptionDetails?.text || e.params?.entry?.text || '').slice(0,240)).join('\n')}` : '✅ 0 条 JS 报错');
console.log(failures.length ? `❌ 断言失败 ${failures.length}\n${failures.join('\n')}` : '✅ MVP 黑盒验收全过');
cdp.close();
chrome.kill();
try { rmSync(profile, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(failures.length || errors.length ? 1 : 0);
