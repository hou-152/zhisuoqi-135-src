#!/usr/bin/env node
// 真模型走查：学习空间里**不替换 fetch**，实际走完一章的「阅读 → 三题 → 真实费曼判定」。
// 与 test-learn-agent-loop.mjs 的分工：
//   那份  用固定响应验证状态门与解锁门（不依赖模型随机性）；
//   本份  真调本地 /api/llm，证明这一章的判定协议在真实调用下也成立。
// 两者都不是学习效果样本；样本量各 1 章。
//
// 用法：node scripts/walk-learn-agent-loop.mjs [chapterId]

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'evidence', 'agent-loop-260913');
const SHOT_DIR = path.join(ROOT, 'prototype', '预览');
const BASE = 'http://127.0.0.1:5180/知所栖-壳.html';
const CHAPTER = process.argv[2] || 'agent';
fs.mkdirSync(OUT_DIR, { recursive: true });

const port = 9600 + (process.pid % 250);
const profile = path.join(os.tmpdir(), 'learn-real-llm-' + process.pid);
const chrome = spawnProcess(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--window-size=1440,1000', '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-proxy-server', 'about:blank',
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const log = [];
const shotOf = async (sel, file) => { if (sel) { await ex(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(e&&e.scrollIntoView) e.scrollIntoView({block:'center'}); return true})()`); await sleep(220); } await cdp.screenshot(path.join(SHOT_DIR, file)); };
const record = (step, value) => { log.push({ step, value, at: new Date().toISOString() }); console.log(`  · ${step} ｜ ${typeof value === 'string' ? value.replace(/\s+/g, ' ').slice(0, 200) : JSON.stringify(value).slice(0, 200)}`); };

const target = await waitForPage(port);
if (!target) throw new Error('Chrome 调试端口没起来');
const cdp = await openCDP(target.webSocketDebuggerUrl);
const ex = (expression) => cdp.eval(expression, { onException: (d) => 'THREW: ' + (d.exception?.description || d.text || '') });
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Network.enable');
await cdp.send('Log.enable');
await cdp.send('Page.navigate', { url: BASE + '#learn=' + CHAPTER + '&review=1' });

const t0 = Date.now();
while (Date.now() - t0 < 15000) {
  if (await ex('typeof openLearn === "function" && document.getElementById("learn").classList.contains("on")')) break;
  await sleep(200);
}
if (!await ex('typeof openLearn === "function"')) throw new Error('壳没有初始化');

const health = await (await fetch('http://127.0.0.1:5180/api/health')).json();
record('api-health', health);
record('章节', await ex(`chapterById(learnCur).order + ' ' + chapterById(learnCur).title + ' | ' + chapterById(learnCur).cm.id + ' ↔ ' + chapterById(learnCur).concept.id`));
record('主案例（候选／假设场景）', await ex(`chapterById(learnCur).case.id + ' · ' + chapterById(learnCur).case.type + ' · 候选 ' + chapterById(learnCur).case.candidates.join('、')`));
record('审核状态', await ex(`chapterById(learnCur).review.caseState + ' / ' + chapterById(learnCur).review.status`));
record('阅读区摘要', (await ex(`document.getElementById('learn-wrap').innerText`)).slice(0, 700));
await shotOf('.lpair', '54-学习空间-真模型走查-阅读.png');

/* 三道决策：真实点击，第一题故意先错一次 */
for (let i = 0; i < 3; i++) {
  const prompt = await ex('chapterById(learnCur).questions[learnQ].prompt');
  const right = await ex('chapterById(learnCur).questions[learnQ].options.findIndex(o=>o.correct)');
  if (i === 0) {
    const wrong = await ex('chapterById(learnCur).questions[learnQ].options.findIndex(o=>!o.correct)');
    await ex(`learnChoose(${wrong})`);
    record('第 1 题先答错', { 选: wrong, 停留: await ex('learnQ'), 通过: await ex('stOf(learnCur).decisions[0]'), 反馈: (await ex(`document.querySelector('#learn-q .lfb').innerText`)).replace(/\s+/g, ' ').slice(0, 120) });
  }
  await ex(`learnChoose(${right})`);
  record(`第 ${i + 1} 题选对`, { prompt, 选项号: right, 通过: await ex(`stOf(learnCur).decisions[${i}]`) });
  if (i < 2) await ex('learnNext()');
}
await ex('learnNext()');
record('费曼区已出现', await ex(`document.getElementById('learn-said')!==null`));
await shotOf('#learn-fey', '55-学习空间-真模型走查-三题通过.png');

/* 真实费曼判定：先漏点，再补齐 */
const required = await ex(`chapterById(learnCur).feynman.required`);
record('本章费曼要点', required);
const SHORT = '这个概念说的是 AI 不只是回答问题，它还会自己决定下一步，做错了也能自己调整，反正在外面有一套东西管着它。';
// 通过侧用本章自己的材料组织一份复述：要点逐字取自本章 feynman.required，
// 内容是本章 reading 的原文重组——用来验证「通过」这条协议在真模型下走得通，
// 不代表学习效果，也不代表这段复述是用户写的。
const FULL = await ex(`(()=>{const c=chapterById(learnCur);
  return '按本章要点讲清楚：' + c.feynman.required.join('、') + '。'
    + '原文 context 是：' + c.reading.original.text + ' '
    + '定义：' + c.reading.explain.text + ' '
    + '直觉：' + c.reading.intuition.text + ' '
    + '机制：' + c.reading.mechanism.text + ' '
    + '边界是：' + c.reading.boundary.items.join('；') + '。';})()`);

async function submit(text) {
  await ex(`document.getElementById('learn-said').value=${JSON.stringify(text)}`);
  await ex('learnSaidChanged(); learnFeynman()');
  for (let i = 0; i < 180; i++) {
    const st = await ex('stOf(learnCur).feynman');
    const busy = await ex(`document.getElementById('learn-submit').disabled`);
    if (st && st !== 'wait' && !busy) break;
    if (st === 'wait' && !busy && i > 6) break;
    await sleep(500);
  }
  return { status: await ex('stOf(learnCur).feynman'), text: (await ex(`document.getElementById('learn-fres').innerText`)).replace(/\s+/g, ' ').slice(0, 400), unlocked2: await ex('chapterUnlocked(1)') };
}

const shortResult = await submit(SHORT);
record('费曼-漏点复述（真模型）', shortResult);
await shotOf('#learn-fres', '56-学习空间-真模型走查-费曼未通过.png');

const fullResult = await submit(FULL);
record('费曼-补齐复述（真模型）', fullResult);
await shotOf('#learn-fres', '57-学习空间-真模型走查-费曼通过.png');

record('编辑复述后旧状态清除', await ex(`(()=>{const b=document.getElementById('learn-said'); b.value=b.value+' 再补一句。'; learnSaidChanged(); return stOf(learnCur).feynman+'|'+chapterUnlocked(1)})()`));

const requested = cdp.events.filter((e) => e.method === 'Network.requestWillBeSent').map((e) => e.params.request.url);
const zhihu = requested.filter((u) => /zhihu/i.test(u));
const llmCalls = requested.filter((u) => /\/api\/llm/.test(u)).length;
record('本页请求', { total: requested.length, llm: llmCalls, zhihu: zhihu.length });
record('JS 报错', cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length);

fs.writeFileSync(path.join(OUT_DIR, `learn-real-llm-walk-${CHAPTER}.json`), JSON.stringify({
  generatedAt: new Date().toISOString(),
  page: BASE + '#learn=' + CHAPTER + '&review=1',
  chapter: CHAPTER,
  purpose: '真实模型走查学习空间的一章（不替换 fetch）。样本 1 章，不是学习效果样本，也不替代黑盒状态门验收。',
  health, llmCalls, zhihuRequests: zhihu.length, log,
}, null, 1));
console.log(`\n证据：evidence/agent-loop-260913/learn-real-llm-walk-${CHAPTER}.json`);
console.log(`真实 /api/llm 调用 ${llmCalls} 次｜知乎请求 ${zhihu.length} 次`);

cdp.close();
chrome.kill();
try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5 }); } catch {}
