#!/usr/bin/env node
// 真模型走查：不替换页面里的 fetch，实际走完「阅读 → 三题 → 费曼判定」。
// 与 test-mvp-learning.mjs 的分工：
//   test-mvp-learning.mjs  用固定响应验证状态门（黑盒，不依赖模型随机性）；
//   本脚本                 用真实 /api/llm 走一遍，证明接口与协议在真实调用下也成立。
// 两者都不是学习效果样本。输出证据：evidence/agent-loop-260913/mvp-real-llm-walk.json
//
// 用法：node scripts/walk-mvp-real-llm.mjs [url]

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/mvp-decision-context-rot.html';
const OUT_DIR = path.join(ROOT, 'evidence', 'agent-loop-260913');
fs.mkdirSync(OUT_DIR, { recursive: true });

const port = 9600 + (process.pid % 250);
const profile = path.join(os.tmpdir(), 'mvp-real-llm-' + process.pid);
const chrome = spawnProcess(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--window-size=1280,1000', '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-proxy-server', 'about:blank',
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const log = [];
const record = (step, value) => { log.push({ step, value, at: new Date().toISOString() }); console.log(`  · ${step} ｜ ${typeof value === 'string' ? value.slice(0, 160) : JSON.stringify(value).slice(0, 160)}`); };

const target = await waitForPage(port);
if (!target) throw new Error('Chrome 调试端口没起来');
const cdp = await openCDP(target.webSocketDebuggerUrl);
const ex = (expression) => cdp.eval(expression, { onException: (d) => 'THREW: ' + (d.exception?.description || d.text || '') });
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
if (await ex('typeof window.__MVP !== "object"')) throw new Error('MVP 页面没有初始化');

// 模型可用性预检：llm:false 时本次走查只能得到「待人工复核」，必须在这份证据里说清。
const health = await (await fetch('http://127.0.0.1:5180/api/health')).json();
record('api-health', health);

/* ① 阅读 */
const reading = await ex(`document.getElementById('reading').innerText.replace(/\\s+/g,' ').trim()`);
record('阅读-正文', reading);
record('阅读-五类材料 ID', await ex(`[...document.querySelectorAll('.pairing .small')].map(e=>e.textContent).join(' | ')`));
record('阅读-主案例标记', await ex(`document.querySelector('.case').innerText.includes('假设场景')`));
await cdp.screenshot(path.join(OUT_DIR, 'walk-1-reading.png'));

/* ② 三道决策：真实点击，先故意选错一次 */
await ex('startDecisions()');
const decisions = [];
for (let i = 0; i < 3; i++) {
  const prompt = await ex(`document.querySelector('#decision-list h3').innerText`);
  const options = await ex(`[...document.querySelectorAll('#decision-list .option')].map(b=>b.innerText)`);
  const correctIdx = await ex(`window.__MVP.decisions[window.__MVP.currentQuestion].options.findIndex(o=>o[2])`);
  // 第一题先答错一次，验证「错选停在当前题」在真模型路径下也成立
  if (i === 0) {
    const wrongIdx = (correctIdx + 1) % 3;
    await ex(`choose(${wrongIdx})`);
    decisions.push({ q: i + 1, prompt, options, firstChoice: wrongIdx, firstChoiceCorrect: false,
      stayed: await ex(`window.__MVP.currentQuestion === 0 && document.getElementById('next-decision').disabled`),
      feedback: await ex(`document.querySelector('.feedback').innerText`) });
  }
  await ex(`choose(${correctIdx})`);
  const nextLabel = await ex(`document.getElementById('next-decision').innerText`);
  if (i < 2) {
    await ex('nextDecision()');
    if (i === 0) decisions[0].nextLabel = nextLabel;
  } else {
    decisions.push({ q: i + 1, prompt, options, chosen: correctIdx, chosenCorrect: true, nextLabel });
  }
  if (i > 0) decisions[i] = { q: i + 1, prompt, options, chosen: correctIdx, chosenCorrect: true, nextLabel };
}
record('三道决策', decisions);
await cdp.screenshot(path.join(OUT_DIR, 'walk-2-decisions.png'));

await ex('nextDecision()');
record('进入费曼', await ex(`!document.getElementById('feynman').classList.contains('hidden')`));

/* ③ 真实费曼判定：先交一份漏点复述，再交一份完整复述 */
const SHORT = '上下文腐烂说的是输入越长模型越差，所以窗口越大越好用，平时尽量把资料都塞进去就行。';
const FULL = '变量是模型、任务、关键证据和评分方法，只让输入长度这一个量变化。证据是固定这些条件后只分档增加无关材料，观察模型是否开始漏用证据、混入干扰项或放弃作答。边界是上下文窗口的容量不等于长上下文的利用可靠性，这里没有统一失效阈值，也不能把结论推广到所有模型。';

async function submit(text) {
  await ex(`document.getElementById('feynman-input').value=${JSON.stringify(text)}`);
  await ex('finish()');
  for (let i = 0; i < 120; i++) {
    const done = await ex(`window.__MVP.feynmanStatus !== 'not-submitted' && window.__MVP.feynmanStatus !== 'wait'`);
    const busy = await ex(`document.getElementById('submit-feynman').disabled`);
    if (done && !busy) break;
    await sleep(500);
  }
  return {
    status: await ex(`window.__MVP.feynmanStatus`),
    text: await ex(`document.getElementById('feynman-result').innerText`),
    dots: await ex(`document.querySelectorAll('.dot.done').length`),
  };
}

const shortResult = await submit(SHORT);
record('费曼-漏点复述', shortResult);
await cdp.screenshot(path.join(OUT_DIR, 'walk-3-feynman-missing.png'));

const fullResult = await submit(FULL);
record('费曼-完整复述', fullResult);
await cdp.screenshot(path.join(OUT_DIR, 'walk-4-feynman-pass.png'));

const requested = cdp.events.filter(e => e.method === 'Network.requestWillBeSent').map(e => e.params.request.url);
const zhihu = requested.filter(u => /zhihu/i.test(u));
const llmCalls = requested.filter(u => /\/api\/llm/.test(u)).length;
record('本页请求', { total: requested.length, llm: llmCalls, zhihu: zhihu.length });
record('JS 报错', cdp.events.filter(e => e.method === 'Runtime.exceptionThrown').length);

const evidence = {
  generatedAt: new Date().toISOString(),
  page: URL_,
  purpose: '真实模型走查（不替换 fetch）。不是学习效果样本，也不替代 test-mvp-learning.mjs 的状态门黑盒。',
  health,
  llmCalls,
  zhihuRequests: zhihu.length,
  log,
};
fs.writeFileSync(path.join(OUT_DIR, 'mvp-real-llm-walk.json'), JSON.stringify(evidence, null, 1));
console.log(`\n证据：${path.relative(ROOT, path.join(OUT_DIR, 'mvp-real-llm-walk.json'))}`);
console.log(`截图：evidence/agent-loop-260913/walk-{1..4}-*.png`);
console.log(`真实 /api/llm 调用 ${llmCalls} 次｜知乎请求 ${zhihu.length} 次`);

cdp.close();
chrome.kill();
try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5 }); } catch {}
