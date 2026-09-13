#!/usr/bin/env node
// 黑盒验收：Agent Loop 六章 · 独立学习空间。
//
// 分工（三份证据不许混）：
//   ① node scripts/check-learning-materials.mjs   材料体检（不需要 serve，不调模型）
//   ② 本脚本                                      页面状态门黑盒：用固定响应验证判定协议与解锁门，
//                                                  不依赖模型随机性、也不代表学习效果
//   ③ node scripts/walk-learn-agent-loop.mjs      真模型走查：真调 /api/llm 走完一章
//
// 用法：node scripts/test-learn-agent-loop.mjs [url]
// 前置：node scripts/serve-135.mjs（壳必须经服务打开）

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html';
const SHOT_DIR = path.join(ROOT, 'prototype', '预览');
fs.mkdirSync(SHOT_DIR, { recursive: true });

const port = 9600 + (process.pid % 250);
const profile = path.join(os.tmpdir(), 'learn-shell-profile-' + process.pid);
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
const note = (label, got) => console.log(`  · ${label} ｜ ${got}`);
// 截图前把目标区域滚进视口——否则每张图都是页面顶部，几张图会长得一模一样
const shotOf = async (sel, file) => { if (sel) { await ex(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(e&&e.scrollIntoView) e.scrollIntoView({block:'center'}); return true})()`); await sleep(220); } await cdp.screenshot(path.join(SHOT_DIR, file)); };

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
while (Date.now() - t0 < 15000) {
  if (await ex('typeof window.LEARN === "undefined" && typeof openLearn === "function"')) break;
  await sleep(200);
}
if (await ex('typeof openLearn !== "function"')) throw new Error('壳没有初始化（学习空间函数不存在）');
check('壳里带上了六章学习材料', await ex('LEARN.length'), 6);
check('六章顺序与路线一致', await ex(`LEARN.map(c=>c.order+':'+c.title).join(' → ')`),
  '1:Agent → 2:工具 → 3:Agent loop → 4:状态子系统与进度持久化 → 5:Harness → 6:验证闭环');
check('每章一个核心概念（cm_* ↔ CON-*）', await ex(`LEARN.every(c=>c.cm.id.startsWith('cm_')&&c.concept.id.startsWith('CON-'))`), 'true');
check('cm_* 与 CON-* 对应关系逐章写明', await ex(`LEARN.every(c=>c.review.correspondence&&c.review.correspondence.basis.length>10)`), 'true');
check('主案例都属于该概念的候选案例', await ex(`LEARN.every(c=>c.case.candidates.includes(c.case.primaryCaseId))`), 'true');
check('主案例全部标明假设场景', await ex(`LEARN.every(c=>c.case.type==='假设场景')`), 'true');
check('负责人已确认 → 六章状态 ready', await ex(`LEARN_CFG.caseReview.state==='owner-confirmed' && LEARN.every(c=>c.review.status==='ready')`), 'true');
check('确认后仍逐章标明场景类型是假设场景', await ex(`LEARN.every(c=>c.case.type==='假设场景' && c.review.caseState==='owner-confirmed')`), 'true');
check('每题三选项、恰好一个正确', await ex(`LEARN.every(c=>c.questions.every(q=>q.options.length===3&&q.options.filter(o=>o.correct).length===1))`), 'true');
check('正确答案都带 OPI/SOL 依据', await ex(`LEARN.every(c=>c.questions.every(q=>{const r=q.options.find(o=>o.correct);return r.basis.length>0&&r.basis.every(b=>b.startsWith('OPI-')||b.startsWith('SOL-'))}))`), 'true');
check('费曼要点按章不同、且不含「变量／证据／边界」', await ex(`new Set(LEARN.map(c=>c.feynman.required.join('|'))).size===6 && !LEARN.some(c=>c.feynman.required.some(k=>['变量','证据','边界'].includes(k)))`), 'true');

/* ① 从路径条上的「学习这个」进入 */
console.log('\n① 路径 → 学习这个');
await ex('localStorage.removeItem("zss135.learn.v1"); loadLearnState();');
await ex(`openPanel('${await ex('ROUTES[0].steps[0].conceptId')}')`);
await sleep(120);
check('路径第 1 步的按钮改成了「学习这个 · 第 1 章」', await ex(`Array.from(document.querySelectorAll('#pbody .pctx .acts button')).map(b=>b.textContent).join(' | ')`).then(s => s.includes('学习这个 · 第 1 章')), 'true');
check('进入前图谱与主题列表是显示的', await ex(`getComputedStyle(document.getElementById('rail')).display!=='none' && getComputedStyle(document.getElementById('list')).display!=='none' && getComputedStyle(document.getElementById('main')).display!=='none'`), 'true');
await ex(`Array.from(document.querySelectorAll('#pbody .pctx .acts button')).find(b=>b.textContent.includes('学习这个')).click()`);
await sleep(150);
check('学习空间已打开', await ex(`document.getElementById('learn').classList.contains('on')`), 'true');
check('学习时隐藏全量图谱', await ex(`getComputedStyle(document.getElementById('main')).display`), 'none');
check('学习时隐藏主题列表', await ex(`getComputedStyle(document.getElementById('list')).display`), 'none');
check('学习时隐藏左栏导航', await ex(`getComputedStyle(document.getElementById('rail')).display`), 'none');
check('阅读区带出五类材料 ID', await ex(`['QST-','CON-','CAS-','SOL-'].every(p=>document.getElementById('learn-wrap').innerText.includes(p))`), 'true');
check('页面显示主案例已由负责人确认', await ex(`document.getElementById('learn-wrap').innerText.includes('主案例已由负责人确认')`), 'true');
check('显示假设场景标记', await ex(`document.getElementById('learn-wrap').innerText.includes('假设场景')`), 'true');
await shotOf('.lpair', '50-学习空间-第一章阅读.png');

/* ② 一题一判：答错留在当前题，答对才放行 */
console.log('\n② 三道决策 · 一题一判');
check('第一题恰好 3 个选项', await ex(`document.querySelectorAll('#learn-q .lopt').length`), 3);
check('费曼一下在阅读之后就出现（读完就讲，不必等三道题）', await ex(`document.getElementById('learn-said')!==null`), 'true');
const wrongIdx = await ex(`chapterById(learnCur).questions[0].options.findIndex(o=>!o.correct)`);
const rightIdx = await ex(`chapterById(learnCur).questions[0].options.findIndex(o=>o.correct)`);
await ex(`learnChoose(${wrongIdx})`);
check('答错留在当前题', await ex(`learnCur && stOf(learnCur).decisions[0]===false && document.getElementById('learn-next').disabled`), 'true');
check('答错给出原因', await ex(`document.querySelector('#learn-q .lfb').innerText.includes('留在本题')`), 'true');
await ex(`learnChoose(${rightIdx})`);
check('答对才允许下一题', await ex(`!document.getElementById('learn-next').disabled`), 'true');
await ex('learnNext()');
check('进入第二题', await ex(`learnQ`), 1);
await ex(`learnChoose(chapterById(learnCur).questions[1].options.findIndex(o=>o.correct)); learnNext()`);
check('进入第三题', await ex(`learnQ`), 2);
check('第三题的按钮文案变成进入费曼', await ex(`document.getElementById('learn-next').textContent`), '三题通过，进入费曼');
check('费曼框全章只有一份（走完三题不重复渲染）', await ex(`document.querySelectorAll('#learn-wrap #learn-said').length`), 1);
await ex(`learnChoose(chapterById(learnCur).questions[2].options.findIndex(o=>o.correct)); learnNext()`);
check('三题全对后才出现费曼', await ex(`document.getElementById('learn-said')!==null`), 'true');
await shotOf('#learn-fey', '51-学习空间-决策与费曼.png');

/* ③ 费曼状态门：固定响应，不依赖模型随机性 */
console.log('\n③ 费曼状态门（固定响应）');
await ex(`document.getElementById('learn-said').value='太短'`);
await ex(`learnSaidChanged(); learnFeynman()`);
await sleep(120);
check('过短复述不判通过', await ex(`stOf(learnCur).feynman`), 'wait');
check('格式解析器拒绝非 JSON', await ex(`parseLearnVerdict('这不是 JSON',['a'])===null`), 'true');
check('covered 缺一项就不通过', await ex(`parseLearnVerdict(JSON.stringify({covered:['a'],missing:['b'],next:''}),['a','b']).pass`), 'false');

await ex(`localStorage.setItem('__probe', JSON.stringify(chapterById(learnCur).feynman.required))`);
await ex(`document.getElementById('learn-said').value='变量是模型、任务、关键证据和评分方法；证据是分档增加无关材料后可靠性逐档变化；边界是窗口容量不等于利用可靠性，也不能超出本次测量范围，还要说明测量范围与条件。'`);
await ex(`window.fetch=async()=>({ok:true,json:async()=>({content:JSON.stringify({covered:JSON.parse(localStorage.getItem('__probe')),missing:[],next:'用真实任务复测'})})})`);
await ex('learnFeynman()');
await sleep(200);
check('漏点为空且要点齐全才显示通过', await ex(`stOf(learnCur).feynman`), 'ok');
check('通过后章节状态可查', await ex(`chapterCleared(learnCur)`), 'true');
check('通过后下一章按钮立刻解锁（不用整页重渲染）', await ex(`document.querySelectorAll('#learn-wrap .lchip')[1].disabled`), 'false');
check('选项顺序是稳定打乱（正解不再固定在某个位置）', await ex(`(()=>{const p=[];for(const c of LEARN)c.questions.forEach((q,i)=>{const perm=learnPerm(c.chapterId,i);p.push(perm.indexOf(q.options.findIndex(o=>o.correct)));});return new Set(p).size;})()`), 3);
check('页面渲染顺序 = 稳定打乱结果', await ex(`(()=>{const c=chapterById(learnCur),q=c.questions[learnQ],perm=learnPerm(c.chapterId,learnQ);learnRenderQ();const btns=Array.from(document.querySelectorAll('#learn-q .lopt')).map(b=>b.textContent.replace(/^[ABC]\\.\\s*/,''));return perm.every((src,j)=>btns[j]===q.options[src].text);})()`), 'true');
await shotOf('#learn-fres', '52-学习空间-费曼通过.png');

/* ④ 重新编辑复述 → 清除旧的通过状态 */
console.log('\n④ 重新编辑复述 → 清掉通过状态');
await ex(`document.getElementById('learn-said').value='我改一下：最小构成、行动来源、与模型的区别。'`);
await ex(`learnSaidChanged()`);
await sleep(80);
check('编辑后旧的通过状态被清除', await ex(`stOf(learnCur).feynman===null`), 'true');
check('提示写明了旧状态已清除', await ex(`document.getElementById('learn-fstatus').innerText.includes('已清除')`), 'true');

/* 重新判回通过，用来验证解锁门 */
await ex(`plotAgain()`).catch(() => {});
await ex(`document.getElementById('learn-said').value='变量是模型、任务、关键证据和评分方法；证据是分档增加无关材料后可靠性逐档变化；边界是窗口容量不等于利用可靠性，还要说明测量范围与条件，不能推广到所有模型。'`);
await ex(`window.fetch=async()=>({ok:true,json:async()=>({content:JSON.stringify({covered:JSON.parse(localStorage.getItem('__probe')),missing:[],next:'复测'})})})`);
await ex('learnFeynman()');
await sleep(200);
check('重新提交后可以再次通过', await ex(`stOf(learnCur).feynman`), 'ok');

/* ④b 判定竞态 + 草稿落盘 */
console.log('\n④b 判定竞态与草稿落盘');
await ex(`window.__pend=null; window.fetch=()=>new Promise(r=>{window.__pend=()=>r({ok:true,json:async()=>({content:JSON.stringify({covered:JSON.parse(localStorage.getItem('__probe')),missing:[],next:''})})})});`);
await ex(`document.getElementById('learn-said').value='这一版会被改掉：最小构成、行动来源、与模型的区别都写了，但用户马上会改。'`);
await ex('void learnFeynman(); "submitted"');   // 不 await：fetch 挂起中，eval 会等 promise
await sleep(120);
check('提交进行中复述框被锁住', await ex(`document.getElementById('learn-said').disabled`), 'true');
check('提交进行中的状态是待复核', await ex(`stOf(learnCur).feynman`), 'wait');
await ex(`document.getElementById('learn-said').disabled=false; document.getElementById('learn-said').value='改过的版本'; learnSaidChanged();`);
check('草稿改动立刻落盘（刷新不丢）', await ex(`JSON.parse(localStorage.getItem('zss135.learn.v1'))[learnCur].said`), '改过的版本');
await ex('window.__pend()');
await sleep(220);
check('判定返回时复述已被改过 → 旧结果作废，不算通过', await ex(`stOf(learnCur).feynman`), 'null');
check('作废后下一章重新锁上', await ex(`chapterUnlocked(1)`), 'false');

/* ⑤ 解锁门：费曼未通过／待复核都不解锁下一章 */
console.log('\n⑤ 费曼没过 → 不解锁下一章');
await ex(`stOf('agent').feynman='fail'; saveLearnState(); renderLearn()`);
await sleep(80);
check('费曼未通过时第 2 章是锁的', await ex(`chapterUnlocked(1)`), 'false');
check('锁着的章节按钮 disabled', await ex(`document.querySelectorAll('#learn-wrap .lchip')[1].disabled`), 'true');
check('直接跳第 2 章会被挡回', await ex(`(()=>{const ok=openLearn('tool'); return ok+'|'+learnCur})()`), 'false|agent');
await ex(`stOf('agent').feynman='wait'; saveLearnState(); renderLearn()`);
check('费曼待复核时第 2 章仍是锁的', await ex(`chapterUnlocked(1)`), 'false');
await ex(`stOf('agent').feynman='ok'; saveLearnState(); renderLearn()`);
check('费曼通过后才解锁第 2 章', await ex(`chapterUnlocked(1)`), 'true');
check('第 2 章按钮解锁', await ex(`document.querySelectorAll('#learn-wrap .lchip')[1].disabled`), 'false');
check('第 6 章仍未解锁（要逐章过）', await ex(`chapterUnlocked(5)`), 'false');

/* ⑥ 返回知识体系：恢复原路线、原步骤、原概念 */
console.log('\n⑥ 返回知识体系');
await ex('exitLearn()');
await sleep(200);
check('学习空间已关闭', await ex(`document.getElementById('learn').classList.contains('on')`), 'false');
check('图谱恢复显示', await ex(`getComputedStyle(document.getElementById('main')).display`), 'block');
check('主题列表恢复显示', await ex(`getComputedStyle(document.getElementById('list')).display`), 'flex');
check('恢复原路线', await ex(`activeRoute().routeId`), 'agent-continuous-action-v1');
check('恢复原步骤（第 1 步）', await ex(`routeStepIdx`), 0);
check('恢复原概念（Agent 那张卡）', await ex(`selected===ROUTES[0].steps[0].conceptId`), 'true');
check('恢复为路径模式', await ex(`mode`), 'path');
await shotOf('#pbody .pctx', '53-学习空间-返回知识体系.png');

/* ⑦ 地址可复现 + 边界 */
console.log('\n⑦ 可复现入口与边界');
// 只改 hash 不会重新加载页面，先离开再进来，确保走的是 boot() 里的 #learn= 分支
await cdp.send('Page.navigate', { url: 'about:blank' });
await sleep(200);
await cdp.send('Page.navigate', { url: URL_.split('#')[0] + '#learn=verification-loop' });
await sleep(1200);
check('地址入口不绕过解锁：第 6 章未解锁 → 挡回它的上一章', await ex(`document.getElementById('learn').classList.contains('on') && learnCur`), 'harness');
check('挡回时写明原因', await ex(`document.getElementById('learn-wrap').innerText.includes('还没解锁')`), 'true');
await cdp.send('Page.navigate', { url: 'about:blank' });
await sleep(150);
await cdp.send('Page.navigate', { url: URL_.split('#')[0] + '#learn=verification-loop&review=1' });
await sleep(1200);
check('只有 review=1（审核／复现用）才可直达该章', await ex(`document.getElementById('learn').classList.contains('on') && learnCur`), 'verification-loop');
check('复现入口能带出该章三题', await ex(`chapterById(learnCur).questions.length`), 3);

/* ⑧ 正文流页（第 5 章 Harness）：连线写成解释句 · 读完就讲 · 右栏是本次课题 */
console.log('\n⑧ 正文流一页（Harness）');
await cdp.send('Page.navigate', { url: 'about:blank' });
await sleep(150);
await cdp.send('Page.navigate', { url: URL_.split('#')[0] + '#learn=harness&review=1' });
await sleep(1200);
check('打开第 5 章 Harness', await ex(`learnCur`), 'harness');
check('右栏＝本次课题的单元（六步、当前章高亮）', await ex(`(()=>{const r=document.querySelector('#learn-wrap .lrail');if(!r)return false;const on=document.querySelector('#learn-wrap .lrail-steps li.on .lchip');return r.innerText.includes('本次课题') && document.querySelectorAll('#learn-wrap .lrail-steps .lchip').length===6 && !!on && on.textContent.includes('Harness')})()`), 'true');
check('正文有过渡句：上一单元留下了什么问题', await ex(`(()=>{const t=document.getElementById('learn-wrap').innerText;return t.includes('上一单元留下了什么问题')&&t.includes('谁组织调用、接收结果、安排下一步')})()`), 'true');
check('关系句写成完整句、并带逐字原文', await ex(`(()=>{const t=document.getElementById('learn-wrap').innerText;return t.includes('这些概念是怎么连起来的')&&t.includes('真正执行的是 Harness')&&t.includes('逐字原文')})()`), 'true');
check('费曼一下排在决策之前（读完就讲）', await ex(`(()=>{const t=document.getElementById('learn-wrap').innerText;const a=t.indexOf('读完就用自己的话讲一遍'),b=t.indexOf('三道决策，按顺序通过');return a>0&&b>0&&a<b})()`), 'true');
check('这一页末尾给出下一站', await ex(`(()=>{const t=document.getElementById('learn-wrap').innerText;return t.includes('下一站')&&t.includes('谁来判断它这一趟到底做对了没有')})()`), 'true');
check('页面显示知识根（58 篇 → 卡片 → 单元）与原始来源链接', await ex(`(()=>{const t=document.getElementById('learn-wrap').innerText;const a=document.querySelector('#learn-wrap a[href^="http"]');return t.includes('知识根')&&t.includes('SRC-EXT-001')&&t.includes('concepts/agent-harness.yaml')&&!!a&&a.textContent.length>4})()`), 'true');
const requested = cdp.events.filter((e) => e.method === 'Network.requestWillBeSent').map((e) => e.params.request.url);
check('全程没有知乎请求', requested.some((u) => /zhihu/i.test(u)), 'false');
check('没有把学习进度写进倒逼记录（marks 保持独立）', await ex(`Object.keys(marks).length`), 0);

const errors = cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
  .filter((e) => !/favicon/i.test(JSON.stringify(e)));
console.log(errors.length ? `⚠ JS 报错 ${errors.length} 条\n${errors.map((e) => (e.params?.exceptionDetails?.exception?.description || e.params?.exceptionDetails?.text || e.params?.entry?.text || '').slice(0, 300)).join('\n')}` : '✅ 0 条 JS 报错');
console.log('\n截图：prototype/预览/50-学习空间-第一章阅读.png · 51-…决策与费曼 · 52-…费曼通过 · 53-…返回知识体系');
console.log(failures.length ? `❌ 断言失败 ${failures.length}\n${failures.join('\n')}` : '✅ 学习空间黑盒验收全过');
cdp.close();
chrome.kill();
try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(failures.length || errors.length ? 1 : 0);
