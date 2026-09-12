#!/usr/bin/env node
// /dbs 编排闭环验收：组合接口的边界 + 壳里的「生成 → 待发送 → 发送后收据」。
// 下游发送在浏览器侧用固定响应替身，避免验收重复消耗知乎和 LLM 配额；真实发送已由本地服务路径单独实测。

import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createZssServer } from './serve-lib.mjs';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browserPort = 9340 + (process.pid % 300);
const profile = `/tmp/zss-orch-test-${process.pid}`;
const { server, port } = await createZssServer({ root: ROOT, port: 0, host: '127.0.0.1' });
const base = `http://127.0.0.1:${port}`;
const fails = [];
const check = (label, got, want) => {
  const g = String(got);
  const ok = g.includes(String(want));
  if (!ok) fails.push(`${label}：期望含「${want}」，实得「${g.slice(0, 180)}」`);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${g.slice(0, 120)}`);
};
const post = async (path, body) => {
  const r = await fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return r.json();
};

let chrome, cdp;
try {
  console.log('/dbs 编排验收 · ' + base);
  const preview = await post('/api/orchestrate', {
    task: '我是否应该辞职做独立开发？',
    skills: ['dbs-learning-beta', 'dbs-standard-answer', 'zhihu'],
    prompt: '主 Skill：/dbs-learning-beta\n辅助 Skill：/dbs-standard-answer、/zhihu',
    preview: true,
  });
  check('① 预览接口回 ok', JSON.stringify(preview), '"ok":true');
  check('① 预览保留 3 个 skill', JSON.stringify(preview.skills), 'zhihu');
  check('① 预览保留组合提示词', preview.prompt, 'dbs-learning-beta');
  check('② 超过 3 个 skill 被拒绝', JSON.stringify(await post('/api/orchestrate', {
    task: 'x', skills: ['a', 'b', 'c', 'd'], prompt: 'x', preview: true,
  })), 'too-many-skills');
  check('② 不存在的 skill 被拒绝', JSON.stringify(await post('/api/orchestrate', {
    task: 'x', skills: ['missing-skill'], prompt: 'x', preview: true,
  })), 'skill-not-found');

  chrome = spawnProcess(CHROME, [
    '--headless=new', `--remote-debugging-port=${browserPort}`, `--user-data-dir=${profile}`,
    '--window-size=1440,900', '--no-first-run', '--no-default-browser-check', '--disable-gpu', 'about:blank',
  ]);
  const target = await waitForPage(browserPort);
  if (!target) throw new Error('Chrome 调试端口没起来');
  cdp = await openCDP(target.webSocketDebuggerUrl);
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Log.enable');
  await cdp.send('Page.navigate', { url: `${base}/知所栖-壳.html` });
  await sleep(1700);
  // 让 UI 走完整发送状态机，同时不发真实请求。
  await cdp.eval(`(()=>{const real=window.fetch; window.fetch=async (input, init) => {
    if (String(input).includes('/api/orchestrate')) return new Response(JSON.stringify({
      ok:true, skills:['dbs-learning-beta','dbs-standard-answer','zhihu'], model:'stub-model', tokens:123,
      sources:[{title:'验收来源',author:'验收作者',url:'https://www.zhihu.com/question/1'}], content:'验收下游结果'
    }), {status:200,headers:{'Content-Type':'application/json'}});
    return real(input, init);
  };})()`);
  await cdp.eval(`document.getElementById('b-q').value='/dbs 我是否应该辞职做独立开发？'; send()`);
  await sleep(650);
  const draft = await cdp.eval(`JSON.stringify({status:document.querySelector('.orch-status')?.innerText||'', prompt:document.querySelector('.orch-prompt')?.innerText||'', button:document.querySelector('.orch-send')?.innerText||''})`);
  check('③ 输入 /dbs 后停在待发送', draft, '待发送');
  check('③ 页面有完整提示词', draft, '最终只交付一份');
  check('③ 页面有发送按钮', draft, '发送到下游');
  await cdp.eval('sendOrchestration()');
  await sleep(700);
  const done = await cdp.eval(`JSON.stringify({status:document.querySelector('.orch-status')?.innerText||'', receipt:document.querySelector('.orch-receipt')?.innerText||'', answer:document.querySelector('.cmsg.assistant:last-child')?.innerText||''})`);
  check('④ 点击发送后状态完成', done, '已完成');
  check('④ 执行收据记录 3 个 skill', done, '/dbs-learning-beta、/dbs-standard-answer、/zhihu');
  check('④ 执行收据记录知乎来源', done, '知乎来源：1 条');
  check('④ 下游结果回到会话', done, '验收下游结果');

  const errors = cdp.events.filter(e => e.method === 'Runtime.exceptionThrown'
    || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
    .filter(e => !/favicon/.test(JSON.stringify(e)));
  check('⑤ 浏览器无 JS 报错', errors.length, 0);
} catch (e) {
  fails.push('脚本异常：' + (e.stack || e));
} finally {
  cdp?.close();
  chrome?.kill();
  server.close();
  try { (await import('node:fs')).rmSync(profile, { recursive: true, force: true }); } catch {}
}

console.log(fails.length ? `❌ 失败 ${fails.length} 项：\n` + fails.join('\n') : '✅ 编排验收全过');
process.exit(fails.length ? 1 : 0);
