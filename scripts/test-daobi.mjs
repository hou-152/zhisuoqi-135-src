#!/usr/bin/env node
// 倒逼层 + 分类层验收 —— 证明「概念图不是摆设」：
//   · 不能自己标「学过」，只有复述过判才可能有绿环
//   · 判定按验收类别分支：能算的 / 能判的 / 能用的 / 只能认的（这一类不考）
//   · 说错了会被倒回先修概念
//
// 背景（所有者 09-12 08:47 / 09:0x 的两次批评）：
//   「变成了一个摆设……概念其实也就那样吧。这样子干你没法倒逼，当这种教学学习啊」
//   「概念分类一般吧，我觉得」
// 原来自报：点一下「学过」就变绿，零证据。这个脚本就是来证明那件事已经被拿掉了。
//
// 前置：node scripts/serve-135.mjs 在跑（LLM 判定要真模型）
// 用法：node scripts/test-daobi.mjs [url]

import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const PORT = 9401, PROF = '/tmp/daobi-' + Date.now();
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html';

const chrome = spawnProcess(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu', '--no-first-run', 'about:blank'], { stdio: 'ignore' });

const page = await waitForPage(PORT);
if (!page) { console.error('Chrome 没起来'); process.exit(2); }

const cdp = await openCDP(page.webSocketDebuggerUrl);
const send = (me, p = {}) => cdp.send(me, p);
const events = cdp.events;
const ex = async x => {
  return cdp.eval(x, { onException: details => 'THREW: ' + (details.exception?.description || '').split('\n')[0] });
};

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await send('Page.navigate', { url: URL_ });
await sleep(3000);
await ex(`localStorage.removeItem('zss135.proof.v2')`);
await ex(`marks = {}; refreshMarks(); renderList()`);

const fails = [];
// 期望串太短会误命中：'read' 能命中 'reading'，一个 THREW 被当成通过。显式挡掉。
// 通过侧断言要重试：deepseek-flash 是推理模型，temperature=0 也不保证逐字复现，
// 边界答案会翻。翻的时候先看判定器给的 why —— 多数情况下它挑得对，是答案不够硬。
async function checkPass(label, cid, again) {
  let st = await ex(`marks['${cid}'].state`);
  if (st === 'pass') { check(label, st, 'pass'); return; }
  const why = await ex(`(marks['${cid}']||{}).why || ''`);
  console.log(`  ↻ ${label} 首判 ${st}，重跑一次（判定器说：${String(why).slice(0, 50)}）`);
  await again();
  st = await ex(`marks['${cid}'].state`);
  check(label, st, 'pass');
}

const check = (label, got, want) => {
  const g = String(got);
  const ok = !g.startsWith('THREW') && g.includes(String(want));
  if (!ok) fails.push(`${label}：期望含「${want}」，实得「${g.slice(0, 110)}」`);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${g.slice(0, 88)}`);
};

/* ── 等判定落地 ──────────────────────────────────────────────
   judge() 有 judging 守卫：前一次还在飞时，后一次会被静默丢弃。
   固定 sleep 会踩这个坑（09-12 实测：判定变慢后第二次调用被丢，
   状态停在上一次，测试误判成「判定器不认好答案」）。所以轮询 at 时间戳。 */
async function waitJudge(cid, prevAt, label, maxMs = 90000) {
  const t0 = Date.now();
  while (Date.now() - t0 < maxMs) {
    const at = await ex(`(marks['${cid}']||{}).at || 0`);
    if (typeof at === 'number' && at !== prevAt) return true;
    await sleep(1500);
  }
  console.log(`  ⚠ ${label}：等判定超时（${maxMs}ms）`);
  return false;
}
// saidExpr 是**浏览器端**表达式：字符串自己 JSON.stringify，取原文可直接写 byId.get('C08').gloss
async function submit(cid, saidExpr, label) {
  const prevAt = await ex(`(marks['${cid}']||{}).at || 0`);
  await ex(`openPanel('${cid}'); document.getElementById('said').value=(${saidExpr}); judge('${cid}')`);
  return waitJudge(cid, prevAt, label);
}
const S = JSON.stringify;   // 字符串字面量的简写

console.log('倒逼 + 分类验收 ' + URL_);

/* ① 自报通道必须已经不在了 */
await ex(`openPanel('C08')`);
check('打开概念就有复述输入框', await ex(`document.getElementById('said') ? 'OK' : 'NO'`), 'OK');
check('没有「点一下就变绿」的按钮', await ex(`document.getElementById('pbody').innerHTML.includes('setMark') ? '还在' : 'OK'`), 'OK');
check('面板写明不能自己标', await ex(`document.getElementById('pbody').innerText.includes('你不能自己标') ? 'OK' : 'NO'`), 'OK');

/* ②③④ 能算的（C08）：废话 / 照抄 / 说清机制 */
await submit('C08', S('就是一个说法吧，感觉挺有道理的，讲 AI 的一些限制。'), '②');
check('② 能算的·废话没过', await ex(`marks['C08'].state`), 'fail');
check('② 给出漏点', await ex(`(marks['C08'].missing||[]).length > 0 ? '有' : '无'`), '有');
check('② 面板渲染倒回按钮', await ex(`document.querySelectorAll('.backto button').length > 0 ? 'OK' : 'NO'`), 'OK');

await submit('C08', `byId.get('C08').gloss`, '③');
check('③ 能算的·照抄原文不算过', await ex(`marks['C08'].state`), 'fail');

await submit('C08', S('AI 的输出是从训练数据里学到的已知模式里重组出来的，它没有自己的视角、也没有从亲身经验里扎进未知的能力。所以凡是需要「来自经验、指向未知」的判断，它给不了，那部分只能由人来。这不是说 AI 没用，是说它擅长的是已知信息的加工。'), '④');
check('④ 能算的·说清机制才过', await ex(`marks['C08'].state`), 'pass');

/* ⑤ 能用的（C04）：只解释「它是什么」不够，必须给一个真用过的例子
   下面这条答案是**对着真判定器验过才写进来的**。前两版都被挑出真错：
     第一版：把「外在·集体」说成右上角（四象限里上面是个体、下面是集体，应是右下角）
     第二版：行列混用（把一格说成「一整行」），且说要补内在却填了外在
   第三版仍然没过，理由更准：C04 的定义就是「定位纯粹派与自动机各砍掉哪半个现实」，
   我只拿它算自己的时间账，根本没落到那两个人身上。
   现在的版本在真壳里验过才写进来，判定器回 missing:[] wrong:[]。
   判定器是对的，是我的答案错。这不是测试在放水，是它在挑刺。
   ⚠️ 已知：deepseek-flash 是推理模型，temperature=0 也不保证逐字复现——
   边界答案会翻。所以这两条断言用的是**判定器明确认过**的答案；若偶发翻转，
   先看判定器给的 why，多数情况下它挑得对。 */
await submit('C04', S('威尔伯的四象限是把现实分成内在/外在、个体/集体四个格子，用来定位一个人或一件事被砍掉了哪半边。'), '⑤a');
check('⑤ 能用的·只有定义没有用例 → 没过', await ex(`marks['C04'].state`), 'fail');

await submit('C04', S("四象限是「内在经验 vs 外在行为」× 「个体 vs 集体」两条轴交叉出的四个格子，用来定位一个人砍掉了哪半个现实、补哪一格。我先拿它定位两个人：拒绝用任何 AI、退回纸笔的朋友（纯粹派），他把整个「外在」那一行都砍了，只剩内在；把每个决定都丢给模型的朋友（自动机），他把整个「内在」那一列都砍了，只剩外在。然后我拿它算自己上周的时间账：写代码 30 小时（外在·个体）、开会 8 小时（外在·集体）、冥想 5 小时（内在·个体），而内在·集体那一格是 0——我没有任何跟人共享意义感的来源。所以我把周三晚上固定成和两个朋友聊各自在做的事，四周后再记一次账，那一格才不再是 0。"), '⑤b');
await checkPass('⑤ 能用的·给了真用过的例子 → 过', 'C04',
  () => submit('C04', S("四象限是「内在经验 vs 外在行为」× 「个体 vs 集体」两条轴交叉出的四个格子，用来定位一个人砍掉了哪半个现实、补哪一格。我先拿它定位两个人：拒绝用任何 AI、退回纸笔的朋友（纯粹派），他把整个「外在」那一行都砍了，只剩内在；把每个决定都丢给模型的朋友（自动机），他把整个「内在」那一列都砍了，只剩外在。然后我拿它算自己上周的时间账：写代码 30 小时（外在·个体）、开会 8 小时（外在·集体）、冥想 5 小时（内在·个体），而内在·集体那一格是 0——我没有任何跟人共享意义感的来源。所以我把周三晚上固定成和两个朋友聊各自在做的事，四周后再记一次账，那一格才不再是 0。"), '⑤b-retry'));

/* ⑥ 能判的（C05）：只复述原文不算过，必须写出自己的判据与代价 */
await submit('C05', `byId.get('C05').gloss`, '⑥a');
check('⑥ 能判的·只复述原文 → 没过', await ex(`marks['C05'].state`), 'fail');

await submit('C05', S("我的判据是：这几项之间有没有互相借力，而不是各自能赚多少。判断借力真假我用一个可核对的办法——看过去三个月的记录里，做 A 的那一周 B 的产出有没有跟着变多。有，它们是一棵树，值得一起点；连着三个月都没有，那就是两份工作，我只留一份。钱、心智、身体这三条线，我要求任何一条不能连续两个月是 0，因为一条停在 0 会让别的线在别处输。代价是短期内没有一项能单独拿出来吹，每一项都停在够用而不是最强，前六个月收入明显低于死磕一项。失效边界是现金流：连续两个月收不抵支，我就不再谈互联，先挑一项能最快换钱的单点打透。这门手艺我选的是写作——它同时喂养判断（心智）和接活的议价（钱），跑步是给身体那条线保底。"), '⑥b');
await checkPass('⑥ 能判的·写出自己的判据与代价 → 过', 'C05',
  () => submit('C05', S("我的判据是：这几项之间有没有互相借力，而不是各自能赚多少。判断借力真假我用一个可核对的办法——看过去三个月的记录里，做 A 的那一周 B 的产出有没有跟着变多。有，它们是一棵树，值得一起点；连着三个月都没有，那就是两份工作，我只留一份。钱、心智、身体这三条线，我要求任何一条不能连续两个月是 0，因为一条停在 0 会让别的线在别处输。代价是短期内没有一项能单独拿出来吹，每一项都停在够用而不是最强，前六个月收入明显低于死磕一项。失效边界是现金流：连续两个月收不抵支，我就不再谈互联，先挑一项能最快换钱的单点打透。这门手艺我选的是写作——它同时喂养判断（心智）和接活的议价（钱），跑步是给身体那条线保底。"), '⑥b-retry'));

/* ⑦ 只能认的（C01）：不设验收，也没有交卷按钮 */
await ex(`openPanel('C01')`);
check('⑦ 只能认的·不设验收', await ex(`document.getElementById('pbody').innerText.includes('这一类不设验收') ? 'OK' : 'NO'`), 'OK');
check('⑦ 只能认的·没有交卷按钮', await ex(`document.getElementById('pbody').innerText.includes('交卷') ? '还有' : 'OK'`), 'OK');
await ex(`markRead('C01')`); await sleep(400);
check('⑦ 只能认的·只记读过，不判过没过', await ex(`marks['C01'].state`), 'read');

/* ⑧ 三栏外壳 + 落盘 */
check('⑧ 三栏都在（导航|列表|主区）', await ex(`['rail','list','main'].filter(i => document.getElementById(i)).length`), '3');
check('⑧ 列表栏 194 行', await ex(`document.querySelectorAll('#lp-body .row').length`), '194');
check('⑧ 落盘到 proof.v2', await ex(`Object.keys(JSON.parse(localStorage.getItem('zss135.proof.v2')||'{}')).sort().join(',')`), 'C01');
check('⑧ 左栏·我在学＝验过的条数', await ex(`document.getElementById('r-mine').textContent`), await ex(`String(Object.keys(marks).length)`));
check('⑧ 左栏·待你看一眼不是 10', await ex(`document.getElementById('r-todo').textContent`), '16');
// 底部固定渲染 过/没过/读过 三态（mech 出现时才加第四个）
check('⑧ 底部状态点是三态', await ex(`document.querySelectorAll('#myrow .dot').length`), '3');
check('⑧ 底部计数与实际一致', await ex(`(()=>{const t=document.getElementById('myrow').innerText.replace(/\\s+/g,' ').trim();
  const st=Object.values(marks); const p=st.filter(m=>m.state==='pass').length, r=st.filter(m=>m.state==='read').length;
  return t.startsWith(p+' '+p) || (t.includes(String(p)) && t.includes(String(r))) ? 'OK' : t})()`), 'OK');

/* ⑨ 分类决定系统对你做什么 */
await ex(`closePanel(); setAxis('kind')`);
check('⑨ 默认轴＝「要你怎么处理它」四列', await ex(`JSON.stringify(groups().map(g => g.label))`), '能算的');
check('⑨ 194 条全有验收类别', await ex(`DATA.nodes.filter(n => n.k).length + '/' + DATA.nodes.length`), '194/194');
check('⑨ 能算的·任务词', await ex(`openPanel(nodes.find(n => n.k === 'compute').id); document.getElementById('pbody').innerText.includes('说清它的机制') ? 'OK' : 'NO'`), 'OK');
check('⑨ 能判的·任务词', await ex(`openPanel(nodes.find(n => n.k === 'judge').id); document.getElementById('pbody').innerText.includes('它给的是什么判据') ? 'OK' : 'NO'`), 'OK');
check('⑨ 能用的·任务词', await ex(`openPanel(nodes.find(n => n.k === 'use').id); document.getElementById('pbody').innerText.includes('真拿它做过') ? 'OK' : 'NO'`), 'OK');

/* ⑩ 一条线的倒逼链 */
await ex(`closePanel(); setView('curate'); openCollection('T2')`);
check('⑩ 策展面板有「开始倒逼」', await ex(`document.getElementById('pbody').innerText.includes('开始倒逼') ? 'OK' : 'NO'`), 'OK');
await ex(`startLine('T2')`); await sleep(800);
check('⑩ 链头显示第 1 步', await ex(`document.querySelector('.chainhead')?.innerText.slice(0, 26) || '无'`), '第 1/');
check('⑩ 只铺开这条线', await ex(`filter`), 'T2');

const errs = events
  .filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
  .filter(e => !/favicon/.test(JSON.stringify(e)));
console.log(errs.length ? `\n❌ JS 报错 ${errs.length}:\n` + errs.map(e => JSON.stringify(e).slice(0, 160)).join('\n') : '\n✅ 0 条 JS 报错');
console.log(fails.length ? `❌ 断言失败 ${fails.length}:\n` + fails.join('\n') : '✅ 断言全过');

cdp.close(); chrome.kill();
try { (await import('node:fs')).rmSync(PROF, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(fails.length || errs.length ? 1 : 0);
