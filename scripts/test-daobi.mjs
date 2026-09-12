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
  // 踩过：String(got).includes(want) 里 want 太短会误命中——'read' 命中了 'reading'，
  // 一个 THREW 被当成通过。这里显式挡掉抛错串。
  const ok = !String(got).startsWith('THREW') && String(got).includes(want);
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

/* ② 能算的（C08）：废话必须没过 + 给漏点 + 倒回先修 */
await ex(`openPanel('C08'); document.getElementById('said').value='就是一个说法吧，感觉挺有道理的，讲 AI 的一些限制。'`);
await ex(`judge('C08')`); await sleep(16000);
check('② 能算的·废话没过', await ex(`(marks['C08']||{}).state`), 'fail');
check('② 给出漏点', await ex(`((marks['C08']||{}).missing||[]).length>0 ? '有' : '无'`), '有');
check('② 面板渲染倒回按钮', await ex(`document.querySelectorAll('.backto button').length>0 ? 'OK' : 'NO'`), 'OK');

/* ③ 能算的：照抄原文不算过 */
await ex(`openPanel('C08'); document.getElementById('said').value=byId.get('C08').gloss; judge('C08')`); await sleep(16000);
check('③ 照抄原文不算过', await ex(`(marks['C08']||{}).state`), 'fail');

/* ④ 能算的：说清机制才给过 */
await ex(`openPanel('C08'); document.getElementById('said').value='AI 的输出是从训练数据里学到的已知模式里重组出来的，它没有自己的视角、也没有从亲身经验里扎进未知的能力。所以凡是需要「来自经验、指向未知」的判断，它给不了，那部分只能由人来。这不是说 AI 没用，是说它擅长的是已知信息的加工。'; judge('C08')`);
await sleep(17000);
check('④ 能算的·说清机制才过', await ex(`(marks['C08']||{}).state`), 'pass');

/* ⑤ 能用的（C04）：只解释「它是什么」不够，必须给一个真用过的例子 */
await ex(`openPanel('C04'); document.getElementById('said').value='威尔伯的四象限是把现实分成内在/外在、个体/集体四个格子，用来定位一个人或一件事被砍掉了哪半边。'; judge('C04')`);
await sleep(17000);
check('⑤ 能用的·只有定义没有用例 → 没过', await ex(`(marks['C04']||{}).state`), 'fail');
await ex(`openPanel('C04'); document.getElementById('said').value='四象限是内在/外在 × 个体/集体四个格子，用来定位被砍掉的那半边现实。我上周拿它拆过自己：我写代码（外在·个体）和跑步（外在·个体）都在同一格，内在那一列几乎空白，集体那一行也没有。所以我加了每周一次跟人对着讲我在做什么（外在·集体），补的就是右上角的空缺。'; judge('C04')`);
await sleep(18000);
check('⑤ 能用的·给了真用过的例子 → 过', await ex(`(marks['C04']||{}).state`), 'pass');

/* ⑥ 能判的（C05）：只复述原文不算过，必须写出自己的判据与代价 */
await ex(`openPanel('C05'); document.getElementById('said').value=byId.get('C05').gloss; judge('C05')`);
await sleep(17000);
check('⑨ 能判的·只复述原文 → 没过', await ex(`(marks['C05']||{}).state`), 'fail');
await ex(`openPanel('C05'); document.getElementById('said').value='我的判据是：先看这门手艺有没有「复利」——做得越多，作品本身会不会替我说话。会，就深耕；不会，就把精力摊到互相能借力的几项上。我愿意付的代价是：深耕的那一项在前 6 个月几乎看不到外部反馈，我得忍住不换；摊开的那几项则接受每一项都到不了前 10%。这条判据的失效边界是：如果我的现金流撑不过 6 个月，那深耕就不成立，只能先摊开换钱。'; judge('C05')`);
await sleep(18000);
check('⑨ 能判的·写出自己的判据与代价 → 过', await ex(`(marks['C05']||{}).state`), 'pass');

/* ⑦ 只能认的（C01）：不设验收，也没有交卷按钮 */
await ex(`openPanel('C01')`);
check('⑩ 只能认的·不设验收', await ex(`document.getElementById('pbody').innerText.includes('这一类不设验收') ? 'OK' : 'NO'`), 'OK');
check('⑩ 只能认的·没有交卷按钮', await ex(`document.getElementById('pbody').innerText.includes('交卷') ? '还有' : 'OK'`), 'OK');
await ex(`markRead('C01')`); await sleep(400);
check('⑩ 只能认的·只记读过，不判过没过', await ex(`(marks['C01']||{}).state`), 'read');

/* ⑧ 落盘与计数 */
check('⑧ 落盘', await ex(`Object.keys(JSON.parse(localStorage.getItem('zss135.proof.v2')||'{}')).sort().join(',')`), 'C01');
check('⑧ 左栏计数', await ex(`document.getElementById('r-mine').textContent`), '过 3');
check('⑧ 图例四态都在', await ex(`document.getElementById('myrow').innerText.replace(/\\s+/g,' ')`), '读过（不考）');

/* ⑨ 分类决定系统对你做什么 */
await ex(`closePanel(); setAxis('kind')`);
check('⑨ 默认轴＝「要你怎么处理它」，四列', await ex(`JSON.stringify(groups().map(g=>g.label))`), '能算的');
check('⑨ 194 条全有验收类别', await ex(`String(DATA.nodes.filter(n=>n.k).length)+'/'+DATA.nodes.length`), '194/194');
check('⑨ 「只能认的」面板不设验收', await ex(`openPanel(nodes.find(n=>n.k==='accept').id); document.getElementById('pbody').innerText.includes('这一类不设验收')?'OK':'NO'`), 'OK');
check('⑨ 「只能认的」没有交卷按钮', await ex(`document.querySelector('.jbtn') && document.getElementById('pbody').innerText.includes('交卷')?'还有':'OK'`), 'OK');
await ex(`markRead(selected)`); await sleep(400);
check('⑨ 「能判的」任务词不一样', await ex(`openPanel(nodes.find(n=>n.k==='judge').id); document.getElementById('pbody').innerText.includes('它给的是什么判据')?'OK':'NO'`), 'OK');
check('⑨ 「能用的」任务词不一样', await ex(`openPanel(nodes.find(n=>n.k==='use').id); document.getElementById('pbody').innerText.includes('真拿它做过')?'OK':'NO'`), 'OK');
check('⑨ 「能算的」任务词不一样', await ex(`openPanel(nodes.find(n=>n.k==='compute').id); document.getElementById('pbody').innerText.includes('说清它的机制')?'OK':'NO'`), 'OK');

/* ⑩ 一条线的倒逼链 */
await ex(`closePanel(); setView('curate'); openCollection('T2')`);
check('⑩ 策展面板有「开始倒逼」', await ex(`document.getElementById('pbody').innerText.includes('开始倒逼') ? 'OK' : 'NO'`), 'OK');
await ex(`startLine('T2')`); await sleep(800);
check('⑩ 链头显示第 1 步', await ex(`document.querySelector('.chainhead')?.innerText.slice(0, 26) || '无'`), '第 1/');
check('⑩ 只铺开这条线', await ex(`filter`), 'T2');

const errs = events.filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error')).filter(e => !/favicon/.test(JSON.stringify(e)));
console.log(errs.length ? `\n❌ JS 报错 ${errs.length}:\n` + errs.map(e => JSON.stringify(e).slice(0, 160)).join('\n') : '\n✅ 0 条 JS 报错');
console.log(fails.length ? `❌ 断言失败 ${fails.length}:\n` + fails.join('\n') : '✅ 断言全过');
ws.close(); chrome.kill();
try { (await import('node:fs')).rmSync(PROF, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(fails.length || errs.length ? 1 : 0);
