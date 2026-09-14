#!/usr/bin/env node
// 测「一次学习」的最快全程：进章 → 6 道决策（全对，本机一题一判）→ 费曼章末验收（真 LLM 判定）→ 通过。
//   node scripts/measure-learn-fastest.mjs [chapterId] …   （默认 agent verification-loop 两章采样）
// 前置：serve 在跑（默认 5180，费曼判定真调上游 LLM）。
// 输出：各环节耗时（导航/决策/费曼判定）＋全程；落 evidence/learn-fastest-260915.json。

import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { CHROME, openCDP, spawnProcess, waitForPage, sleep } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASE = `http://127.0.0.1:${Number(process.env.PORT || 5180)}/知所栖-壳.html`;
const CHAPTERS = process.argv.slice(2).length ? process.argv.slice(2) : ['agent', 'verification-loop'];
const OUT = path.join(ROOT, 'evidence', 'learn-fastest-260915.json');
const PROFILE = path.join(os.tmpdir(), 'learn-fast-profile-' + process.pid);
const PORT = 9960 + (process.pid % 100);
rmSync(PROFILE, { recursive: true, force: true });
mkdirSync(path.dirname(OUT), { recursive: true });

const chrome = spawnProcess(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
  '--window-size=1600,1000', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', 'about:blank',
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const target = await waitForPage(PORT);
const cdp = await openCDP(target.webSocketDebuggerUrl);
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
const ev = (expr) => cdp.eval(expr);

const samples = [];
for (const ch of CHAPTERS) {
  const t0 = Date.now();
  await cdp.send('Page.navigate', { url: `${BASE}#learn=${ch}&review=1` });
  await sleep(1500);
  const navMs = Date.now() - t0;

  // 6 道决策：全部一次选对（本机一题一判，无 LLM）
  const decStart = Date.now();
  const perQ = [];
  for (let qi = 0; qi < 6; qi++) {
    const q0 = Date.now();
    await ev(`(function(){ const c=chapterById('${ch}'); const qi=${qi}; if(qi>=c.questions.length) return 'done';
      learnChoose(c.questions[qi].options.findIndex(o=>o.correct)); learnNext(); return 'ok'; })()`);
    await sleep(120);
    perQ.push(Date.now() - q0);
  }
  const decMs = Date.now() - decStart;
  const nDone = await ev(`(chapterById('${ch}')||{questions:[]}).questions.length`);

  // 费曼：用本章阅读块的「定义＋机制」原文拼复述（真材实料，真 LLM 判定）
  const said = await ev(`(function(){ const c=chapterById('${ch}');
    const parts = [c.reading.explain && c.reading.explain.text, c.reading.mechanism && c.reading.mechanism.text]
      .filter(Boolean).map(x=>String(x).slice(0,600));
    if (c.feynman.required.indexOf('与模型的区别') > -1 && c.cm && c.cm.description) parts.push('与模型的区别：' + String(c.cm.description).slice(0,200));
    return '我会这样向外行讲：' + parts.join('。') + '。'; })()`);
  await ev(`document.getElementById('learn-final-said').value = ${JSON.stringify(said)}`);
  const fyStart = Date.now();
  await ev(`document.getElementById('learn-submit').click()`);
  let verdict = null;
  for (let i = 0; i < 60; i++) {                       // 轮询判定结果，最长 60s
    await sleep(1000);
    verdict = await ev(`(function(){ const el=document.getElementById('learn-fres'); if(!el) return null;
      return { cls: el.className, text: el.textContent.slice(0,160) }; })()`);
    if (verdict && /on (ok|fail|wait)/.test(verdict.cls) && !/正在尝试/.test(verdict.text || '')) break;
  }
  const fyMs = Date.now() - fyStart;
  const total = Date.now() - t0;
  const pass = !!(verdict && / ok/.test(' ' + verdict.cls));
  samples.push({ chapter: ch, questions: nDone, navMs, decMs, perQ, feynmanMs: fyMs, totalMs: total, pass, verdict: verdict ? verdict.text : null });
  console.log(`${ch}：决策 ${decMs}ms（6 题）· 费曼判定 ${fyMs}ms · 全程 ${(total / 1000).toFixed(1)}s · ${pass ? '通过' : '未通过'}${verdict ? ' · ' + verdict.text.slice(0, 60) : ''}`);
}
const fastest = samples.filter((s) => s.pass).sort((a, b) => a.totalMs - b.totalMs)[0] || null;
const out = { at: new Date().toISOString(), base: BASE, samples, fastest };
writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
console.log(`\n最快全程：${fastest ? (fastest.totalMs / 1000).toFixed(1) + 's（' + fastest.chapter + '，含真 LLM 费曼判定）' : '无通过样本'} → ${path.relative(ROOT, OUT)}`);
process.exit(0);
