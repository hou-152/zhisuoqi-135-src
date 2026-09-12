#!/usr/bin/env node
// 真浏览器验证 evidence/mock/：**在完全没有任何服务的页面上**接管 /api/*。
//
// 为什么要有这一步：verify-mock.mjs 只证「形状对」（静态断言 + 语法可解析），
// 证不了「前端真的能不连服务把界面做出来」。这个脚本在 about:blank 上跑 ——
// 那里根本没有同源后端，真 fetch('/api/*') 必然失败；mock 能返回内容，就说明是真接管。

import os from 'node:os';
import path from 'node:path';
import { rmSync, readFileSync } from 'node:fs';
import { CHROME, openCDP, spawnProcess, waitForPage, sleep } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = 9344;
const PROFILE = path.join(os.tmpdir(), 'verify-mock-profile-' + process.pid);
rmSync(PROFILE, { recursive: true, force: true });

const mockSrc = readFileSync(path.join(ROOT, 'evidence', 'mock', 'mock-fetch.js'), 'utf8');
const fixtures = JSON.parse(readFileSync(path.join(ROOT, 'evidence', 'mock', 'fixtures.json'), 'utf8'));
const JUDGE_ID = fixtures.payloadSample.nodes[0].id;

let pass = 0, fail = 0;
const ok = (c, msg) => { c ? (pass++, console.log('  ✓ ' + msg)) : (fail++, console.log('  ✗ ' + msg)); };

console.log('\n=== evidence/mock 真浏览器验收（about:blank，无任何服务） ===\n');

const chrome = spawnProcess(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
  '--window-size=900,600', '--no-first-run', '--no-default-browser-check', '--disable-gpu',
  'about:blank',
], { stdio: 'ignore' });

let cdp;
try {
  const target = await waitForPage(PORT);
  if (!target) throw new Error('Chrome 调试端口没起来（' + CHROME + '）');
  cdp = await openCDP(target.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await sleep(300);

  // 先证明「没有 mock 就真的没有后端」——否则后面的通过没有意义
  const noBackend = await cdp.eval(`fetch('/api/health').then(()=> 'REACHED').catch(e => 'BLOCKED:' + e.name)`);
  ok(String(noBackend).startsWith('BLOCKED'), '注入前 fetch 确实到不了后端（' + noBackend + '）');

  cdp.eval('1'); // noop
  await cdp.send('Runtime.evaluate', { expression: mockSrc });
  const hijacked = await cdp.eval('typeof window.__MOCK__ === "object" && typeof window.__MOCK__.force === "function"');
  ok(hijacked === true, 'mock-fetch.js 注入成功，window.__MOCK__ 与 force() 可用');

  const r = await cdp.eval(`(async () => {
    const out = {};
    const j = async (u, o) => { const r = await fetch(u, o); return r.json(); };
    out.health = await j('/api/health');
    out.search = await j('/api/search', { method:'POST', headers:{'Content-Type':'application/json'}, body:'{"query":"x"}' });
    out.reading = await j('/api/llm', { method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ json:false, skill:'dbs-learning', messages:[{role:'user',content:'讲一下 Harness'}] }) });
    out.judgeMiss = await j('/api/llm', { method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ messages:[{role:'user',content:'判断 covered 是否覆盖'}] }) });
    out.judgePass = await j('/api/llm', { method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ messages:[{role:'user',content:'判断每一条 covered 是否覆盖。' + '学习者复述：'.padEnd(500,'啊') }] }) });
    out.save = await j('/api/save', { method:'POST', headers:{'Content-Type':'application/json'}, body:'{}' });
    window.__MOCK__.force('POST /api/llm · 失败态');
    out.forced = await j('/api/llm', { method:'POST', headers:{'Content-Type':'application/json'}, body:'{}' });
    window.__MOCK__.force(null);
    try { await fetch('/api/not-mocked'); out.fallback = 'REACHED'; }
    catch (e) { out.fallback = 'BLOCKED:' + e.name; }
    return out;
  })()`);

  // 屏 0：概念图数据
  ok(r.health && r.health.ok === true && r.health.llm === true, '/api/health → ok:true, llm:true');
  ok(Array.isArray(r.search.items) && r.search.items[0] && r.search.items[0].title,
    '/api/search → items[0].title = ' + JSON.stringify(String(r.search.items?.[0]?.title || '').slice(0, 24)));

  // 屏 1：1 阅读
  ok(typeof r.reading.content === 'string' && r.reading.content.length > 500,
    '/api/llm（skill=dbs-learning）→ content ' + (r.reading.content || '').length + ' 字');
  ok(r.reading.skill === 'dbs-learning', '回执带 skill 名（确认服务端用了该 SKILL.md）');

  // 屏 4：费曼判定两种态
  let miss = null, hit = null;
  try { miss = JSON.parse(r.judgeMiss.content).result[JUDGE_ID]; } catch {}
  try { hit = JSON.parse(r.judgePass.content).result[JUDGE_ID]; } catch {}
  ok(miss && miss.pass === false, '短复述 → 判定「有漏点」（pass:false, covered:[])');
  ok(hit && hit.pass === true && Array.isArray(hit.covered) && hit.covered.length > 0,
    '长复述 → 判定「通过」（pass:true, covered:' + JSON.stringify(hit && hit.covered) + '）');

  // 状态反馈
  ok(r.save && r.save.ok === true, '/api/save → ok:true（mock 不写盘）');
  ok(r.forced && r.forced.error, '__MOCK__.force() 能强制失败态 → ' + JSON.stringify(String(r.forced.error).slice(0, 30)));
  ok(String(r.fallback).startsWith('BLOCKED'), '未接管的路径落回真 fetch（不会把页面弄死）：' + r.fallback);
} catch (e) {
  fail++;
  console.log('  ✗ 运行出错：' + e.message);
} finally {
  cdp?.close();
  chrome.kill();
  rmSync(PROFILE, { recursive: true, force: true });
}

console.log(`\n=== ${pass} 通过 · ${fail} 失败 ===\n`);
process.exit(fail ? 1 : 0);
