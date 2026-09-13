#!/usr/bin/env node
// 黑盒验收：内参单篇「阅读中的即时费曼」页面闭环（Issue 2 · B 层试点 agent-skills-api）。
//
// ⚠ 这是**固定响应测试，不是真模型证明**：本脚本用 CDP 把 window.fetch 换成固定返回，
//   用来验证「页面拿到一份诊断之后怎么校验、挑哪一处、存到哪里、什么不许动」。
//   固定响应只写进 zss135.neican.feynman.v1 的测试轮次，不冒充真实诊断证据。
//
// 接口已收窄为 /api/learn（交接件 §6.1／§6.2）：浏览器只发「单元 ID ＋ 复述 ＋ 输入版本 ＋ 请求 ID」，
//   材料与提示词（含 C1～C4 五档规则）由服务端装配。因此本脚本证明的是**页面这一侧**：
//   拿到的判定怎么校验、怎么展示、怎么存；服务端那一侧（提示词逐字、限流、停用开关、
//   模型返回畸形时的未判定）见 scripts/test-learn-api.mjs。
//
// 覆盖（对应任务书 §5）：
//   ⓪ 从现有入口进得来：地址直达、默认落在五维签、读完阅读梯度就能讲
//   ① 材料回指：补讲点回阅读梯度里真实存在的那一条（ref → DOM id → 逐字原文）
//   ② 一次只处理一处重点：第一个非 met 的判据；至多一个追问；同一缺口再漏 → 换下一条材料
//   ③ 再次解释：改完整复述再提交，反馈随之改变，不机械重播第一次的动作列表
//   ④ 草稿恢复：改草稿立刻落盘，刷新后仍在
//   ⑤ 过期请求隔离：请求在途时改草稿／切单元 → 旧结果不得覆盖当前状态
//   ⑥ 不越权：即时反馈不写正式掌握状态、不解锁任何一章、不碰倒逼记录 marks
//   ⑦ 未判定不冒充通过：服务端说未判定／判据不全／未知 ID／非法档位／超时 → 未判定，不算漏点
//   ⑧ 窄接口契约：只打 /api/learn，请求体只有 unit/said/inputVersion/requestId，提示词不在浏览器
//   ⑨ experiments 只作可折叠参考，不是完成本轮学习的必经操作
//   ⑩ 超限与被停用：页面照实报错，不静默降级
//
// 用法：node scripts/test-neican-inline-feynman.mjs [url]
// 前置：node scripts/serve-135.mjs

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASE = (process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html').split('#')[0];
const PILOT = BASE + '#neican=agent-skills-api';
const SHOT_DIR = path.join(ROOT, 'prototype', '预览');
fs.mkdirSync(SHOT_DIR, { recursive: true });

const port = 9900 + (process.pid % 90);
const profile = path.join(os.tmpdir(), 'nfx-shell-profile-' + process.pid);
const chrome = spawnProcess(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--window-size=1440,1000', '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-proxy-server',
  '--disable-features=Translate', 'about:blank',
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const failures = [];
const check = (label, got, expected) => {
  const ok = String(got) === String(expected);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${got}`);
  if (!ok) failures.push(`${label}：期望 ${expected}，实得 ${got}`);
};
const checkIn = (label, got, needle) => {
  const ok = String(got).includes(needle);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${ok ? '包含' : '缺'}「${needle}」`);
  if (!ok) failures.push(`${label}：实得 ${String(got).slice(0, 200)} 里找不到「${needle}」`);
};
const checkNot = (label, got, needle) => {
  const ok = !String(got).includes(needle);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${ok ? '不含' : '却含'}「${needle}」`);
  if (!ok) failures.push(`${label}：实得 ${String(got).slice(0, 200)} 里不该出现「${needle}」`);
};

const target = await waitForPage(port);
if (!target) throw new Error('Chrome 调试端口没起来');
const cdp = await openCDP(target.webSocketDebuggerUrl);
const ex = (expression) => cdp.eval(expression, { onException: (d) => 'THREW: ' + (d.exception?.description || d.text || '') });
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Network.enable');
await cdp.send('Log.enable');

const goto = async (url, wait = 1600) => {
  await cdp.send('Page.navigate', { url: 'about:blank' });
  await sleep(200);
  await cdp.send('Page.navigate', { url });
  await sleep(wait);
};
const shotOf = async (sel, file) => {
  if (sel) { await ex(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(e&&e.scrollIntoView) e.scrollIntoView({block:'center'}); return true})()`); await sleep(260); }
  await cdp.screenshot(path.join(SHOT_DIR, file));
};
/* 注入固定响应：__nfxQueue 按提交顺序消费；hang:true 挂着等 __nfxResolve()；abort:true 等真实 abort */
const injectFixed = (payloads) => ex(`(()=>{
  window.__nfxCalls = [];
  window.__nfxQueue = ${JSON.stringify(payloads)};
  window.fetch = async (url, opt) => {
    window.__nfxCalls.push({ url: String(url), body: JSON.parse((opt && opt.body) || '{}') });
    const p = window.__nfxQueue.length ? window.__nfxQueue.shift() : { content: '{}' };
    if (p.hang) return new Promise(res => {
      const done = () => res({ ok: true, status: 200, json: async () => (p.json !== undefined ? p.json : { content: p.content || '' }) });
      const sig = opt && opt.signal;
      if (sig) sig.addEventListener('abort', done);          // 页面 15 秒超时兜底：abort 时也让在途请求落地
      window.__nfxResolve = done;
    });
    if (p.abort) return new Promise((_, rej) => {
      const sig = opt && opt.signal;
      const boom = () => { const e = new Error('aborted'); e.name = 'AbortError'; rej(e); };
      if (sig) { if (sig.aborted) return boom(); sig.addEventListener('abort', boom); }
    });
    return { ok: p.httpOk !== false, status: p.status || 200, json: async () => {
      if (p.json === null) throw new Error('not json');            // 真服务 404 回的是纯文本 'not found'
      return p.json !== undefined ? p.json : { content: p.content || '' };
    } };
  };
  return true;
})()`);
/* 固定响应分两种形状：
   · /api/learn 的服务端返回 → srv({...})（ok:true 带 criteria，或 ok:false 带 error）
   · 模型原始返回（只有服务端测试用得到）→ { content: '…' } */
const srvRow = (s) => ({ ok: true, unit: 'agent-skills-api', unitVersion: 'v3-20260914', criteria: Object.entries(s).map(([id, status]) => ({ id, status, evidence: `学习者原话依据（${id}）` })), nextPrompt: '说说你指的是哪一层？\n第二行不该被展示' });
const srv = (o) => ({ json: o });
const row = (s) => JSON.stringify({ criteria: Object.entries(s).map(([id, status]) => ({ id, status, evidence: `学习者原话依据（${id}）` })), nextPrompt: '说说你指的是哪一层？\n第二行不该被展示' });
const stats = () => ex(`JSON.stringify(nfxState('agent-skills-api').rounds.slice(-1)[0])`);
const say = (text) => ex(`(()=>{const b=document.getElementById('nfx-said'); b.value=${JSON.stringify(text)}; nfxChanged(); return b.value.length})()`);
const submit = async (text, wait = 340) => { if (text !== undefined) await say(text); await ex('void nfxSubmit(neiSlug); "sent"'); await sleep(wait); };

await goto(PILOT);

/* ⓪ 从现有入口进得来 */
console.log('\n⓪ 入口与页面结构（固定响应测试）');
check('地址入口直达试点篇', await ex(`neiSlug`), 'agent-skills-api');
check('默认落在五维签', await ex(`neiTabName`), 'dim');
checkIn('五维签名字点明即时费曼', await ex(`Array.from(document.querySelectorAll('.nei-tabs button')).map(b=>b.textContent.trim()).join(' | ')`), '五维 · 即时费曼');
check('即时费曼卡在页面里', await ex(`document.getElementById('nfx')!==null`), 'true');
check('有复述输入框', await ex(`document.getElementById('nfx-said')!==null`), 'true');
check('卡上写明单元与判据版本', await ex(`document.querySelector('.nfx-h').innerText.replace(/\\s+/g,' ')`),
  '阅读中的即时费曼 单元 agent-skills-api · 判据 4 条 · 判据版本 v3-20260914');
checkIn('卡上写明即时反馈不改正式掌握/不解锁', await ex(`document.getElementById('nfx').innerText`), '不改正式掌握状态');
check('读完阅读梯度就说（费曼在决策题之前）', await ex(`(()=>{const t=document.getElementById('nei-body').innerText;
  const r=t.indexOf('阅读梯度（读完这一段就能提交复述）'), f=t.indexOf('阅读中的即时费曼'), d=t.indexOf('决策题（');return (r>0&&f>r&&d>f)})()`), 'true');
check('决策题默认折叠、不构成"必须先答"', await ex(`(()=>{const d=document.getElementById('nfx-fold-decisions');return d? (d.open===false) : 'missing'})()`), 'true');
check('experiments 只作可折叠参考', await ex(`(()=>{const d=document.getElementById('nfx-fold-experiments');return d? (d.open===false && d.innerText.includes('不是完成本轮学习的必经操作')) : 'missing'})()`), 'true');
check('未提交时明确说"还没有提交过"', await ex(`document.getElementById('nfx-res').innerText.includes('还没有提交过')`), 'true');
check('本地服务才开判定（公网静态版不发请求）', await ex(`isLocalHost()`), 'true');
await shotOf('#nfx', '60-即时费曼-入口与阅读梯度.png');

/* ⑧ 窄接口契约（浏览器这一侧只发单元与复述） */
console.log('\n⑧ 窄接口契约（发往 /api/learn 的实际请求）');
await injectFixed([srv(srvRow({ C1: 'met', C2: 'partial', C3: 'missing', C4: 'missing' }))]);
await submit('技能是分三级加载的：启动时先给名字和描述，匹配之后读 SKILL.md，引用的文件再读。');
check('确实打到了 /api/learn（不再是 /api/llm）', await ex(`(window.__nfxCalls[0]||{}).url`), '/api/learn');
check('请求体只带 unit/said/inputVersion/requestId', await ex(`Object.keys((window.__nfxCalls[0]||{}).body||{}).join(',')`), 'unit,said,inputVersion,requestId');
check('单元 ID 就是这一篇', await ex(`String((window.__nfxCalls[0]||{}).body.unit)`), 'agent-skills-api');
check('复述原样发出（学习者输入不打折）', await ex(`String((window.__nfxCalls[0]||{}).body.said).startsWith('技能是分三级加载的')`), 'true');
check('输入版本是整数', await ex(`Number.isInteger((window.__nfxCalls[0]||{}).body.inputVersion)`), 'true');
check('浏览器不再自带 system prompt／messages', await ex(`(()=>{const b=(window.__nfxCalls[0]||{}).body||{};return b.messages===undefined&&b.json===undefined&&b.model===undefined&&b.system===undefined})()`), 'true');
check('浏览器里已经没有拼提示词的函数（材料与五档规则只在服务端）', await ex(`typeof nfxPrompt`), 'undefined');
checkNot('请求体里没有 C1～C4 的分档规则', await ex(`JSON.stringify((window.__nfxCalls[0]||{}).body||{})`), '是该条唯一的判定口径');
const r0 = await stats();
checkIn('落盘轮次绑定单元', r0, '"unit":"agent-skills-api"');
checkIn('落盘轮次绑定判据版本', r0, '"unitVersion":"v3-20260914"');
checkIn('落盘轮次绑定输入版本', r0, '"inputVersion":1');
check('落盘轮次绑定请求 ID（与本次请求一致）', await ex(`(()=>{const r=nfxState('agent-skills-api').rounds.slice(-1)[0].requestId;return Number.isInteger(r)&&r>0})()`), 'true');
check('请求 ID 与页面发出去的那个一致', await ex(`(()=>{const b=(window.__nfxCalls[0]||{}).body||{};return String(b.requestId)===String(nfxState('agent-skills-api').rounds.slice(-1)[0].requestId)})()`), 'true');

/* ① 材料回指 + ② 一次只处理一处 */
console.log('\n① 一处重点补讲 ＋ 材料回指');
check('四个判据状态都在页面上（不是只显示一个）', await ex(`document.querySelectorAll('#nfx-res .nfx-st').length`), 4);
checkIn('状态逐条可读', await ex(`document.getElementById('nfx-res').innerText`), 'C2 说到但不完整');
check('只展示一处重点（第一个非 met 的判据 C2）', await ex(`(document.querySelector('#nfx-res .nfx-focus')||{}).dataset.cid`), 'C2');
check('这一处指回真实材料 reading.ladder[1]', await ex(`(document.querySelector('#nfx-res .nfx-focus')||{}).dataset.ref`), 'reading.ladder[1]');
check('材料引文逐字取自源资产', await ex(`document.getElementById('nfx-mat-reading-ladder-1-').innerText.includes(${JSON.stringify('请求匹配 description 后，Claude 用 bash 读 SKILL.md（正文不足 5k tokens）')})`), 'true');
check('材料回指能定位到页面上那条（nfxGo 成功）', await ex(`nfxGo('reading.ladder[1]')`), 'true');
check('回指后该条被高亮', await ex(`document.getElementById('nfx-mat-reading-ladder-1-').classList.contains('nfx-hit')`), 'true');
checkIn('补讲用绑定的教学动作（C2 的对账动作）', await ex(`document.querySelector('#nfx-res .nfx-focus').innerText`), '技能目录里存在的东西列一行');
check('追问只有一个（模型给了两行，只留第一行）', await ex(`document.querySelectorAll('#nfx-res .nfx-q').length`), 1);
checkNot('追问没有把第二行带出来', await ex(`document.getElementById('nfx-res').innerText`), '第二行不该被展示');
checkNot('页面不把模型回的 evidence 当结论展示', await ex(`document.getElementById('nfx-res').innerText`), '学习者原话依据');
check('一处重点补讲不是「再讲一遍」空话', await ex(`!/^\\s*(再讲一遍|重新讲一遍)/.test(document.querySelector('#nfx-res .nfx-focus').innerText)`), 'true');
await shotOf('#nfx-res', '61-即时费曼-单处重点补讲.png');

/* ② b 同一缺口再漏 → 换材料 */
console.log('\n② b 同一处再漏 → 换材料，不机械重播');
await injectFixed([srv(srvRow({ C1: 'met', C2: 'partial', C3: 'missing', C4: 'missing' }))]);
await submit('技能分三级加载：启动带 name 和 description，匹配后读 SKILL.md，引用文件再读。脚本那块我还没想清楚。');
check('第二次仍只展示一处重点', await ex(`(document.querySelector('#nfx-res .nfx-focus')||{}).dataset.cid`), 'C2');
check('同一个缺口这次换了另一条材料 reading.ladder[0]', await ex(`(document.querySelector('#nfx-res .nfx-focus')||{}).dataset.ref`), 'reading.ladder[0]');
checkIn('页面明说这次换的是哪条材料、不是重念上次动作', await ex(`document.querySelector('#nfx-res .nfx-focus').innerText`), '不是把上一次的动作再念一遍');
check('换掉的那条材料仍然逐字可核', await ex(`document.getElementById('nfx-mat-reading-ladder-0-').innerText.includes(${JSON.stringify('平时只先交给他一张技能清单，真遇到做 PPT 或填 PDF 表格，才去翻对应手册、附件和工具')})`), 'true');
check('两轮补讲不是同一条材料', await ex(`(()=>{const a=nfxState('agent-skills-api').rounds;return a[a.length-1].focus.ref!==a[a.length-2].focus.ref})()`), 'true');

/* ⑦ 未判定不冒充通过 */
console.log('\n⑦ 未判定：解析失败／判据不全／未知 ID');
for (const [name, content] of [
  ['服务端说未判定', srv({ ok: false, error: 'not-judged', reason: '判定返回不是可解析的 JSON（返回里没有 JSON 对象）', raw: '这不是 JSON' })],
  ['服务端返回判据不全', srv({ ok: true, criteria: [{ id: 'C1', status: 'met' }, { id: 'C2', status: 'met' }] })],
  ['服务端返回未知判据 ID', srv({ ok: true, criteria: [{ id: 'C9', status: 'met', evidence: 'x' }, { id: 'C1', status: 'met' }, { id: 'C2', status: 'met' }, { id: 'C3', status: 'met' }] })],
]) {
  await injectFixed([content]);
  await submit(`第 ${name} 这一轮的复述：技能按需加载，分三级，脚本交给 bash 跑。`);
  const last = await stats();
  check(`${name} → 记未判定`, last.includes('"notJudged":"'), 'true');
  check(`${name} → 不冒充通过`, await ex(`nfxState('agent-skills-api').rounds.slice(-1)[0].passed`), 'false');
  check(`${name} → 不当成"空缺口"（gaps 不记）`, await ex(`nfxState('agent-skills-api').rounds.slice(-1)[0].gaps.length`), 0);
  checkIn(`${name} → 页面照实说是未判定`, await ex(`document.getElementById('nfx-res').innerText`), '未判定');
  checkNot(`${name} → 没有给出重点补讲`, await ex(`document.getElementById('nfx-res').innerText`), '重点补讲 ·');
}
/* 非法状态值 → 降级 uncertain，只给澄清 */
await injectFixed([srv(srvRow({ C1: 'met', C2: 'met', C3: 'passed', C4: 'met' }))]);
await submit('这一轮用来试非法档位：技能分三级按需加载，脚本交给 bash 跑，边界上沙箱没有网络。');
check('非法状态值降级为 uncertain（不得通过）', await ex(`(()=>{const r=nfxState('agent-skills-api').rounds.slice(-1)[0];return r.passed===false && r.statuses.C3==='uncertain'})()`), 'true');
check('uncertain 只给澄清追问', await ex(`document.getElementById('nfx-res').innerText.includes('只给澄清追问')`), 'true');
checkNot('uncertain 不套用已确认误解的纠错动作', await ex(`document.querySelector('#nfx-res .nfx-focus').innerText`), '可能的误解');
await shotOf('#nfx-res', '63-即时费曼-未判定与澄清.png');

/* ⑦ b 超时 → 未判定，且必须还能继续用（真实 AbortController 路径） */
console.log('\n⑦ b 超时（真实 20 秒 abort 路径，最长等 23 秒）');
await injectFixed([{ abort: true }]);
await say('超时这一轮的复述：技能分三级加载，脚本交给 bash 运行，沙箱没有网络也不能装包。');
await ex('void nfxSubmit(neiSlug); "sent"');
await sleep(400);
checkIn('提交中提示写明正在判定', await ex(`document.getElementById('nfx-status').innerText`), '正在判定');
await sleep(20800);
checkIn('超时 → 按未判定记录', await ex(`document.getElementById('nfx-res').innerText`), '判定超时（20 秒），按未判定记录');
check('超时不算通过', await ex(`nfxState('agent-skills-api').rounds.slice(-1)[0].passed`), 'false');
check('超时后按钮解锁（不会永久卡在提交中）', await ex(`document.getElementById('nfx-submit').disabled`), 'false');
check('超时后输入框解锁', await ex(`document.getElementById('nfx-said').disabled`), 'false');
check('失败保留草稿', await ex(`document.getElementById('nfx-said').value.length>10`), 'true');

/* ⑥ 不越权 */
console.log('\n⑥ 不越权：即时反馈不写正式状态');
check('即时反馈存在自己的键上', await ex(`localStorage.getItem('zss135.neican.feynman.v1')!==null`), 'true');
check('章末验收键（zss135.learn.v1）始终没被写过', await ex(`localStorage.getItem('zss135.learn.v1')`), 'null');
check('倒逼记录 marks 没被写过', await ex(`Object.keys(marks).length`), 0);
check('即时反馈键里只有试点篇一个单元', await ex(`Object.keys(JSON.parse(localStorage.getItem('zss135.neican.feynman.v1'))).join(',')`), 'agent-skills-api');
check('轮次里没有任何"正式掌握"字段（只有本轮的判定与展示所需）', await ex(`(()=>{const r=nfxState('agent-skills-api').rounds.slice(-1)[0];return Object.keys(r).join(',')})()`),
  'n,at,unit,unitVersion,inputVersion,requestId,ms,notJudged,statuses,evidence,gaps,focus,nextPrompt,passed,raw');

/* ③ 再次解释 → 新反馈 */
console.log('\n③ 再次解释 → 新反馈（不重播首次动作列表）');
const roundsBeforeThird = await ex(`nfxState('agent-skills-api').rounds.length`);
await injectFixed([srv(srvRow({ C1: 'met', C2: 'met', C3: 'met', C4: 'missing' }))]);
await submit('技能按需加载分三级：启动只有 name 和 description，匹配后才读 SKILL.md，被引用的文件读取时才进上下文——存着和已加载是两回事。脚本交给 bash 执行，回到上下文的是输出，源码要读多少才占多少。边界我还没想过。');
check('这一轮确实落了一条新记录', await ex(`nfxState('agent-skills-api').rounds.length`), roundsBeforeThird + 1);
check('C2/C3 讲对后不再补讲这两条', await ex(`(()=>{const r=nfxState('agent-skills-api').rounds.slice(-1)[0];return r.statuses.C2==='met'&&r.statuses.C3==='met'&&r.gaps.join()==='C4'})()`), 'true');
check('这一轮的重点换成了 C4', await ex(`(document.querySelector('#nfx-res .nfx-focus')||{}).dataset.cid`), 'C4');
check('C4 的材料回指到边界那条阅读梯度', await ex(`(document.querySelector('#nfx-res .nfx-focus')||{}).dataset.ref`), 'reading.ladder[2]');
checkIn('页面显示这一轮的判据状态行（逐条 met）', await ex(`document.getElementById('nfx-res').innerText`), 'C2 说到了');
check('缺口数只剩 1（全部缺口都存着，展示只一处）', await ex(`nfxState('agent-skills-api').rounds.slice(-1)[0].gaps.length`), 1);

await injectFixed([srv(srvRow({ C1: 'met', C2: 'met', C3: 'met', C4: 'met' }))]);
await submit('技能分三级按需加载；脚本交给 bash 跑，回到上下文的是输出，源码读多少占多少；边界上它不等于随处可用：沙箱没有网络、不能装包，也不跨产品面同步，不在 ZDR 覆盖内。');
check('四条都讲到 → 不再给基础补讲', await ex(`document.querySelector('#nfx-res .nfx-focus')===null`), 'true');
checkIn('宣布局部讲清（四条判据都讲到）', await ex(`document.getElementById('nfx-res').innerText`), '这一轮把 4 条判据都讲到了');
checkIn('明说这不是正式掌握、也不解锁任何一章', await ex(`document.getElementById('nfx-res').innerText`), '不改正式掌握状态，也不解锁任何一章');
checkNot('不宣布"已掌握"', await ex(`document.getElementById('nfx-res').innerText`), '已掌握');
check('"讲全了"不等于写正式通过状态', await ex(`localStorage.getItem('zss135.learn.v1')`), 'null');
await shotOf('#nfx-res', '62-即时费曼-讲全一轮.png');

/* ⑤ 过期请求隔离 */
console.log('\n⑤ 过期请求隔离：改草稿／切单元 → 旧结果作废');
await injectFixed([{ json: srvRow({ C1: 'met', C2: 'missing', C3: 'missing', C4: 'missing' }), hang: true }]);
await say('这一版会被改掉：技能就是一段提示词，写清楚模型就照着做。');
await ex('void nfxSubmit(neiSlug); "sent"');
await sleep(250);
check('请求在途时提交按钮锁住', await ex(`document.getElementById('nfx-submit').disabled`), 'true');
const roundsBeforeHang = await ex(`nfxState('agent-skills-api').rounds.length`);
await say('改过的版本：技能分三级按需加载，启动只有 name 和 description。');
checkIn('改草稿立刻提示在途结果已作废', await ex(`document.getElementById('nfx-status').innerText`), '旧判定已作废');
await ex(`window.__nfxResolve && window.__nfxResolve()`);
await sleep(400);
check('旧结果返回后没有写进状态（轮次数没变）', await ex(`nfxState('agent-skills-api').rounds.length`), roundsBeforeHang);
checkNot('旧结果没有渲染出来（C2 缺失的补讲没出现）', await ex(`document.getElementById('nfx-res').innerText`), '重点补讲 · C2');
check('提交锁已释放（挂起后返回的旧响应不把人锁死）', await ex(`document.getElementById('nfx-submit').disabled`), 'false');

/* 切单元：另一篇没有判据映射 → 不开判定；切回来状态还在 */
await ex(`openNeican('openai-habitat-storage')`);
await sleep(500);
check('切到没有判据映射的另一篇：不开即时判定', await ex(`document.getElementById('nfx')===null`), 'true');
check('另一篇的五维签名字里没有「即时费曼」', await ex(`Array.from(document.querySelectorAll('.nei-tabs button')).map(b=>b.textContent.trim()).join('|')`), '三级笔记|概念网络|费曼 ×3|阅读原文|五维');
check('点进另一篇的五维签也能正常切换', await ex(`(()=>{Array.from(document.querySelectorAll('.nei-tabs button')).find(b=>b.textContent.includes('五维')).click();return neiTabName})()`), 'dim');
await sleep(300);
checkIn('另一篇照实说没有判据映射，不拿通用模板冒充', await ex(`document.getElementById('nei-body').innerText`), '这一篇还没有判据映射，因此不开即时判定（本轮试点只有 agent-skills-api）；不拿通用模板冒充这一篇的判据。');
check('另一篇照实显示材料缺口，不补齐', await ex(`document.getElementById('nei-body').innerText.includes('装配缺口')`), 'true');
const roundsBeforeBack = await ex(`nfxState('agent-skills-api').rounds.length`);
await ex(`openNeican('agent-skills-api')`);
await sleep(500);
check('切回试点篇：轮次记录没被另一篇覆盖', await ex(`nfxState('agent-skills-api').rounds.length`), roundsBeforeBack);
check('另一篇没有往试点篇的键里写东西', await ex(`Object.keys(JSON.parse(localStorage.getItem('zss135.neican.feynman.v1'))).join(',')`), 'agent-skills-api');

/* ④ 草稿恢复 */
console.log('\n④ 草稿与结果落盘：刷新可继续');
const draftNow = await ex(`document.getElementById('nfx-said').value`);
await goto(PILOT, 1700);
check('刷新后草稿仍在', await ex(`document.getElementById('nfx-said').value`), draftNow);
check('刷新后轮次记录仍在', await ex(`nfxState('agent-skills-api').rounds.length`), roundsBeforeBack);
checkIn('刷新后仍能看到上一轮反馈（不退回空白态）', await ex(`document.getElementById('nfx-res').innerText`), '判据');
checkNot('刷新后没有退回空白态', await ex(`document.getElementById('nfx-res').innerText`), '还没有提交过');
check('刷新后提交按钮可用（不卡在提交中）', await ex(`document.getElementById('nfx-submit').disabled`), 'false');
await shotOf('#nfx', '60-即时费曼-入口与阅读梯度.png');

/* ⑨ 窄屏 */
console.log('\n⑨ 窄屏渲染（布局证明，不单独证明调用了真模型）');
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 420, height: 900, deviceScaleFactor: 2, mobile: true });
await sleep(500);
await ex(`(()=>{const e=document.getElementById('nfx'); if(e&&e.scrollIntoView) e.scrollIntoView({block:'center'}); return true})()`);
await sleep(320);
check('窄屏下即时费曼卡不横向溢出', await ex(`(()=>{const w=document.documentElement.clientWidth;
  return Array.from(document.querySelectorAll('#nfx *')).filter(e=>e.getBoundingClientRect().right>w+2).length})()`), 0);
check('窄屏下复述框仍在', await ex(`document.getElementById('nfx-said')!==null`), 'true');
check('窄屏下阅读区整幅（不会被左栏挤到只剩一条）', await ex(`(()=>{const r=document.getElementById('reader');
  const n=document.querySelector('#nei-wrap.nei, .nei');
  const w=document.documentElement.clientWidth;
  return n ? (w - Math.round(n.getBoundingClientRect().width) <= 40) : 'missing'})()`), 'true');
check('窄屏下正文没有被右侧裁掉（滚动宽度与视口一致）', await ex(`(()=>{const r=document.getElementById('reader');
  return r.scrollWidth - r.clientWidth})()`), 0);
await cdp.screenshot(path.join(SHOT_DIR, '64-即时费曼-窄屏.png'));
await cdp.send('Emulation.clearDeviceMetricsOverride');
await sleep(300);

/* ⑩ 超限与被停用：页面照实报错，不静默降级（服务端那一侧的 429／503 见 scripts/test-learn-api.mjs） */
console.log('\n⑩ 超限与被停用：明确报错，不静默降级');
await injectFixed([{ status: 429, httpOk: false, json: { error: 'llm-rate-limited', note: '限流：60000 ms 内最多 20 次模型调用，本次没有发出请求（不是静默降级）。', windowMs: 60000, max: 20, used: 20, retryAfterMs: 30000 } }]);
await submit('限流这一轮的复述：技能分三级加载，启动只有 name 和 description，脚本交给 bash 跑。');
checkIn('超限 → 页面明确说「本地服务限流」', await ex(`document.getElementById('nfx-res').innerText`), '本地服务限流');
check('超限 → 记未判定，不当通过', await ex(`nfxState('agent-skills-api').rounds.slice(-1)[0].passed`), 'false');
check('超限 → 不当成空缺口', await ex(`nfxState('agent-skills-api').rounds.slice(-1)[0].gaps.length`), 0);
checkNot('超限 → 不给重点补讲', await ex(`document.getElementById('nfx-res').innerText`), '重点补讲 ·');
await injectFixed([{ status: 404, httpOk: false, json: null }]);
await submit('旧服务这一轮的复述：技能分三级加载，启动只有 name 和 description，脚本交给 bash 跑。');
checkIn('旧服务没有 /api/learn → 直接说「重启服务」，不当通过', await ex(`document.getElementById('nfx-res').innerText`), '重启 node scripts/serve-135.mjs');
check('旧服务 404 → 记未判定', await ex(`nfxState('agent-skills-api').rounds.slice(-1)[0].passed`), 'false');
await injectFixed([{ status: 503, httpOk: false, json: { error: 'llm-disabled', note: '本机服务已用 LLM_DISABLED 停用模型调用：这次请求没有发出，也不会回落成本地假判定。' } }]);
await submit('被停用这一轮的复述：技能分三级加载，脚本交给 bash 跑，边界上沙箱没有网络。');
checkIn('被停用 → 页面明确说 LLM_DISABLED', await ex(`document.getElementById('nfx-res').innerText`), 'LLM_DISABLED');
check('被停用 → 记未判定，不当通过', await ex(`nfxState('agent-skills-api').rounds.slice(-1)[0].passed`), 'false');
checkNot('被停用 → 不宣布讲全', await ex(`document.getElementById('nfx-res').innerText`), '都讲到了');

const errors = cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
  .filter((e) => !/favicon/i.test(JSON.stringify(e)));
console.log(errors.length ? `⚠ JS 报错 ${errors.length} 条\n${errors.map((e) => (e.params?.exceptionDetails?.exception?.description || e.params?.exceptionDetails?.text || e.params?.entry?.text || '').slice(0, 300)).join('\n')}` : '✅ 0 条 JS 报错');
console.log('\n截图：prototype/预览/60-即时费曼-入口与阅读梯度.png · 61-…单处重点补讲 · 62-…讲全一轮 · 63-…未判定与澄清 · 64-…窄屏');
console.log('⚠ 本脚本全部使用固定响应：它证明页面语义与状态保护，不证明模型判定质量，也不构成学习效果证据。');
console.log('   提示词／材料由服务端装配：见 scripts/test-learn-api.mjs（假上游固定响应，不需要真凭证、不花额度）。');
console.log(failures.length ? `❌ 断言失败 ${failures.length}\n${failures.join('\n')}` : '✅ 即时费曼页面闭环（固定响应）全过');
cdp.close();
chrome.kill();
try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(failures.length || errors.length ? 1 : 0);
