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

const PORT = 9401 + (process.pid % 400), PROF = '/tmp/daobi-' + process.pid;
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html';

const chrome = spawnProcess(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

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

/* 概念源已换成「概念地图 v2」（Notion 概念库 × Context × Harness）。
   这里不写死 id，按名字在页面里现查，换了地图也不用改测试。 */
const cidOf = async (name) => await ex(`(nodes.find(n => n.name === ${JSON.stringify(name)}) || {}).id || ''`);
const NODE = {
  compute: await cidOf('错误复利'),
  use: await cidOf('上下文压缩'),
  judge: await cidOf('Harness'),
  // accept 类不需要预备答案，直接取第一个「只能认的」——审核重分类后名字会变，写死名字会假失败
  accept: await ex(`(nodes.find(n => n.k === 'accept') || {}).id || ''`),
};
const TOTAL = await ex('String(nodes.length)');
console.log('  目标概念：' + JSON.stringify(NODE) + ` ｜ 共 ${TOTAL} 个`);
for (const [k, v] of Object.entries(NODE)) if (!v) { console.error(`找不到目标概念：${k}`); process.exit(2); }
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
// saidExpr 是**浏览器端**表达式：字符串自己 JSON.stringify；取某概念的原文可写 byId.get('<id>').gloss
async function submit(cid, saidExpr, label) {
  const prevAt = await ex(`(marks['${cid}']||{}).at || 0`);
  await ex(`openPanel('${cid}'); document.getElementById('said').value=(${saidExpr}); judge('${cid}')`);
  return waitJudge(cid, prevAt, label);
}
const S = JSON.stringify;   // 字符串字面量的简写

console.log('倒逼 + 分类验收 ' + URL_);

/* ① 自报通道必须已经不在了 */
await ex(`openPanel('${NODE.compute}')`);
check('打开概念就有复述输入框', await ex(`document.getElementById('said') ? 'OK' : 'NO'`), 'OK');
check('没有「点一下就变绿」的按钮', await ex(`document.getElementById('pbody').innerHTML.includes('setMark') ? '还在' : 'OK'`), 'OK');
check('面板写明不能自己标（讲一遍·我来挑漏）', await ex(`document.getElementById('pbody').innerText.includes('我来挑漏') ? 'OK' : 'NO'`), 'OK');

/* ②③④ 能算的（错误复利）：废话 / 照抄 / 说清机制 */
await submit(NODE.compute, S('就是一个说法吧，感觉挺有道理的，讲 AI 的一些限制。'), '②');
check('② 能算的·废话没过', await ex(`marks['${NODE.compute}'].state`), 'fail');
check('② 给出漏点', await ex(`(marks['${NODE.compute}'].missing||[]).length > 0 ? '有' : '无'`), '有');
// 倒回按钮只在判定器真的指回某个前置概念时才渲染；这个概念没有前置时不该硬造。
{
  const preN = await ex(`(neighbors.get('${NODE.compute}').pre || []).length`);
  const has = await ex(`document.querySelectorAll('.backto button').length > 0 ? 'OK' : 'NO'`);
  const verdict = await ex(`document.querySelector('.jverdict') ? 'OK' : 'NO'`);
  check('② 面板渲染判定结果块', verdict, 'OK');
  check(`② 判定面板自洽（前置 ${preN} 个；有前置才要求倒回按钮）`, Number(preN) > 0 ? has : 'OK', 'OK');
}

await submit(NODE.compute, `byId.get('${NODE.compute}').gloss`, '③');
check('③ 能算的·照抄原文不算过', await ex(`marks['${NODE.compute}'].state`), 'fail');

await submit(NODE.compute, S('多步流程的端到端成功率是每一步成功率的连乘，不是相加。单步 99%，十步下来是 0.99 的十次方，只剩大约 90.4%；单步降到 95%，十步就只剩 59.9%。所以步数一多，每一步那点小概率失败会被乘在一起放大，整体可靠性掉得比直觉快得多，而且这个衰减是复利的、不是线性的。要压住它得给失败分诊：哪些是瞬时抖动可以直接重试、哪些是模型自己能恢复的、哪些必须让用户来修、哪些是没见过的意外，同时给重试设上限，免得在注定失败的路上一直烧钱。'), '④');
check('④ 能算的·说清机制才过', await ex(`marks['${NODE.compute}'].state`), 'pass');

/* ⑤ 能用的（上下文压缩）：只解释「它是什么」不够，必须给一个真用过的例子 */
await submit(NODE.use, S('上下文压缩就是在上下文快满的时候把内容缩减一下。'), '⑤a');
check('⑤ 能用的·只有定义没有用例 → 没过', await ex(`marks['${NODE.use}'].state`), 'fail');

const USE_ANSWER = '上下文压缩是在窗口快满时用摘要或丢弃内容把上下文缩短，但不能以破坏稳定前缀为代价——前缀一变，缓存全废。我在做一个每天自动跑的素材整理 Agent 时用过：它顺序读 40 篇文章，读到第 25 篇就爆窗口。第一次我让它每读 5 篇就把前面的总结成一段，结果提示词缓存命中率从 80% 掉到 12%，因为这个 Agent 的系统指令和项目说明是固定前缀，我把摘要插在了最前面，等于每轮都改写了前缀。后来改成把摘要追加到对话尾部、系统指令那段一个字不动，命中率回到 75%，同一批材料跑完的输出 token 也从 12 万降到 4.3 万。';
await submit(NODE.use, S(USE_ANSWER), '⑤b');
await checkPass('⑤ 能用的·给了真用过的例子 → 过', NODE.use, () => submit(NODE.use, S(USE_ANSWER), '⑤b-retry'));

/* ⑥ 能判的（Harness）：只复述原文不算过，必须写出自己的判据与代价 */
await submit(NODE.judge, `byId.get('${NODE.judge}').gloss`, '⑥a');
check('⑥ 能判的·只复述原文 → 没过', await ex(`marks['${NODE.judge}'].state`), 'fail');

const JUDGE_ANSWER = '我判断一段代码算不算 Harness，用一条线：把它整个删掉之后模型自己的本事有没有变化。模型权重没动，但工具调用、文件读写、循环控制、权限确认、状态保存这些东西没了之后模型就干不成活，那这些就是 Harness。换成我的处境：我在做一个每天自动整理素材的 Agent，一开始把「这次失败要不要重试」也交给模型自己判，结果它在一篇反爬失败的文章上重试了 11 次，烧掉一整天的额度。后来我把重试上限和失败分诊挪进 Harness 的确定性代码里，模型的活只剩判断内容值不值得留。代价是 Harness 变厚了，每加一条规则，我都要在模型升级之后回去看它是不是过时——上次升级后有一条「先摘要再入库」的规则就变成了纯浪费。所以我的口径是：Harness 越薄越好，但薄不等于没有；判断哪一步该沉到确定性代码里、哪一步该留给模型，才是这门工程真正的手艺。';
await submit(NODE.judge, S(JUDGE_ANSWER), '⑥b');
await checkPass('⑥ 能判的·写出自己的判据与代价 → 过', NODE.judge, () => submit(NODE.judge, S(JUDGE_ANSWER), '⑥b-retry'));

/* ⑦ 只能认的（不可见的劳动）：不设验收，也没有交卷按钮 */
await ex(`openPanel('${NODE.accept}')`);
check('⑦ 只能认的·不用讲一遍', await ex(`document.getElementById('pbody').innerText.includes('这一类不用讲一遍') ? 'OK' : 'NO'`), 'OK');
check('⑦ 只能认的·没有交卷按钮', await ex(`document.getElementById('pbody').innerText.includes('交卷') ? '还有' : 'OK'`), 'OK');
await ex(`markRead('${NODE.accept}')`); await sleep(400);
check('⑦ 只能认的·只记读过，不判过没过', await ex(`marks['${NODE.accept}'].state`), 'read');

/* ⑧ 三栏外壳 + 落盘 + 09-13 减法后的边界 */
check('⑧ 导航四格：探索/内参/知识体系/实践空间（09-15 v4：探索置顶第一；模块名统一队友前端改回知识体系）', await ex(`[...document.querySelectorAll('.r-item b')].map(b => b.textContent).join('|')`), '探索|内参|知识体系|实践空间');
check('⑧ 底部那条栏已删', await ex(`document.getElementById('bar') ? '还在' : 'OK'`), 'OK');
check('⑧ 两栏都在（列表|主区）', await ex(`['list','main'].filter(i => document.getElementById(i)).length`), '2');
/* 09-15 v4：一级导航四格（探索/内参/知识体系/实践空间），仍在顶栏；左栏整条撤掉 */
check('⑧ 一级导航在顶栏（不在左栏）', await ex(`document.querySelectorAll('#topbar .r-item').length + '|' + (document.getElementById('rail') ? '左栏还在' : '左栏已撤')`), '4|左栏已撤');
check('⑧ 顶栏横跨整页、贴在最上方', await ex(`(()=>{const t=document.getElementById('topbar').getBoundingClientRect();
  const l=document.getElementById('list').getBoundingClientRect();
  return [Math.round(t.top), Math.round(t.width), (t.bottom<=l.top+1?'在上':'不在上')].join('|');})()`),
  await ex(`[0, window.innerWidth, '在上'].join('|')`));
check('⑧ 二级视图 tab 板仍在知识体系里面（不在顶栏）', await ex(`(()=>{const t=document.getElementById('topbar');
  const m=document.querySelector('.mtools'); return (t.contains(m)?'跑到顶栏了':(document.getElementById('main').contains(m)?'OK':'没了'));})()`), 'OK');
check(`⑧ 中间栏 ${await ex('String(groups().length)')} 条主题（二级）`, await ex(`document.querySelectorAll('#lp-body .row').length`), await ex(`String(groups().length)`));
// 09-13 v1-shell-ia phase 02：主题从左栏搬到中间栏，936 条概念默认不再出现（三级）
check('⑧ 三级概念默认隐藏（中间栏不是 936 行）', await ex(`document.querySelectorAll('#lp-body .row').length === DATA.nodes.length ? '还是 936' : 'OK'`), 'OK');
check('⑧ 主题图例不在任何栏里（减法后没回来）', await ex(`document.getElementById('lrows') ? '还有图例' : '干净'`), '干净');
check('⑧ 主题行有圆点有数字', await ex(`(()=>{const r=document.querySelector('#lp-body .row'); return r ? (r.querySelector('.rd')?'有圆点':'缺') + (r.querySelector('.rm')?'有数字':'缺') : '无行'})()`), '有圆点有数字');
check('⑧ 点一条主题 → 下钻到三级', await ex(`(()=>{const rows=document.querySelectorAll('#lp-body .row'); const label=rows[1].querySelector('.rn').textContent; const id=(CUR.tags.find(t=>t.name===label)||{}).id; rows[1].click(); return currentView + '|' + (themeId===id?'主题对':'主题错') + '|' + (filter===id?'画布跟上了':'画布没跟') + '|' + (document.getElementById('lp-back').style.display===''?'有返回':'没返回')})()`), 'theme|主题对|画布跟上了|有返回');
check('⑧ 三级只列这条主题的概念', await ex(`(()=>{const want=nodes.filter(n=>(n.tags||[])[0]===themeId).length; const got=document.querySelectorAll('#lp-body .row').length; return got + '/' + want + '|' + (got===want && got < nodes.length ? 'OK' : '不对')})()`), 'OK');
check('⑧ 点「← 全部主题」回到二级', await ex(`(()=>{setView('graph'); return currentView + '|' + String(filter) + '|' + (document.getElementById('lp-back').style.display==='none'?'返回已藏':'还露着') + '|' + document.querySelectorAll('#lp-body .row').length})()`), await ex(`'graph|null|返回已藏|' + groups().length`));
check('⑧ 顶栏没有多余的底部状态点', await ex(`document.querySelector('#topbar .r-foot, #myrow, #rhint') ? '还在' : 'OK'`), 'OK');
check('⑧ 顶栏＝四格导航 + 更新 + 搜索框', await ex(`document.querySelectorAll('#topbar .r-item').length + '|' + (document.getElementById('btn-upd') ? 'OK' : 'NO') + '|' + (document.getElementById('q-filter') ? 'OK' : 'NO')`), '4|OK|OK');
/* 回归（所有者 2026-09-15 报「内参每次打开都得再刷新一遍」）：
   根因＝实践空间把 #reader 整个 innerHTML 换掉，连 #nei-wrap 一起删了，之后点内参必抛
   Cannot read properties of null。这条断言把「实践空间 → 内参」这条路径钉住。 */
await ex(`openPractice()`); await sleep(700);
await ex(`setView('neican')`); await sleep(900);
check('⑧ 从实践空间回内参能打开（#nei-wrap 会自己重建）',
  await ex(`document.getElementById('reader').classList.contains('on') + '|' + (document.getElementById('nei-wrap') ? '有容器' : '没容器') + '|' + (((document.getElementById('nei-wrap')||{}).innerText||'').length > 200 ? '正文在' : '正文空')`),
  'true|有容器|正文在');
await ex(`setView('graph')`); await sleep(400);

/* ⑨ 分类决定系统对你做什么 */
await ex(`closePanel(); filter=null`);
check('⑨ 唯一分组轴＝主题（数字与 CUR.tags 一致）', await ex(`String(groups().length)`), await ex(`String((CUR.tags || []).length)`));
check('⑨ 主题列＝21 条线，非空', await ex(`groups().length > 5 ? 'OK' : 'NO'`), 'OK');
check(`⑨ ${TOTAL} 条全有验收类别`, await ex(`DATA.nodes.filter(n => n.k).length + '/' + DATA.nodes.length`), `${TOTAL}/${TOTAL}`);
check('⑨ 能算的·任务词', await ex(`openPanel(nodes.find(n => n.k === 'compute').id); document.getElementById('pbody').innerText.includes('说清它的机制') ? 'OK' : 'NO'`), 'OK');
check('⑨ 能判的·任务词', await ex(`openPanel(nodes.find(n => n.k === 'judge').id); document.getElementById('pbody').innerText.includes('它给的是什么判据') ? 'OK' : 'NO'`), 'OK');
check('⑨ 能用的·任务词', await ex(`openPanel(nodes.find(n => n.k === 'use').id); document.getElementById('pbody').innerText.includes('真拿它做过') ? 'OK' : 'NO'`), 'OK');

/* ⑩ 概念卡：来源可点 ＋ 「费曼一下 / 原文 context」不再锁在「过了才给」后面
   2026-09-13 追加。起因（所有者）：原文 context 与费曼一下要能直接看到、来源要能回溯，
   但**不新开栏目**（原文/三级笔记留在隐性层，挂在概念上）。
   数据面：payload.articles 294 条（65 篇原文 ＋ 229 个 Notion 页），每个概念用 sa 指过来。 */
const FRESH = await ex(`(nodes.find(n => !marks[n.id] && n.feynman && n.sourceContext) || {}).id || ''`);
check('⑩ 来源表覆盖全部概念', await ex(`DATA.nodes.filter(n => (n.sa || []).length).length + '/' + DATA.nodes.length`), `${TOTAL}/${TOTAL}`);
await ex(`openPanel('${NODE.judge}')`); await sleep(300);
check('⑩ 来源不是死标签（有外链）', await ex(`document.querySelectorAll('#pbody .srclist a[href^="http"]').length > 0 ? 'OK' : 'NO'`), 'OK');
check('⑩ 同源概念能点回地图', await ex(`document.querySelectorAll('#pbody .srclist .sib button').length > 0 ? 'OK' : 'NO'`), 'OK');
await ex(`openPanel('${FRESH}')`); await sleep(300);
check('⑩ 没验过也能看费曼一下（门已拆）', await ex(`document.getElementById('pbody').innerText.includes('随时可看，不用先答') ? 'OK' : 'NO'`), 'OK');
/* 这条是 2026-09-13 查出来的真 bug：sourceContext 一直在 topics.json 里（919/936），
   却没被 cm-wire 搬进 payload —— 卡上「原文 context」和「别名」两栏一直是空的。 */
check('⑩ 原文 context 真的有内容（不是空壳）', await ex(`(()=>{const d=[...document.querySelectorAll('#pbody details')].find(x=>x.innerText.includes('原文里的说法')); if(!d) return 'NO'; d.open=true; const t=d.innerText.replace(/\\s/g,''); return t.length > 80 ? 'OK' : 'NO'})()`), 'OK');
check('⑩ 拆门不影响倒逼状态机', await ex(`marks['${FRESH}'] ? 'NO（被写了状态）' : 'OK'`), 'OK');
/* 同一个 bug 的第二半：验收问句里 922/936 条留着没替换的 {{name}}，页面上直接显示「{{name}} 指什么？」 */
check('⑩ 验收问句没有 {{name}} 占位符', await ex(`String(DATA.nodes.filter(n => /\\{\\{name\\}\\}/.test(String(n.ap || ''))).length)`), '0');

const errs = events
  .filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
  .filter(e => !/favicon/.test(JSON.stringify(e)));
console.log(errs.length ? `\n❌ JS 报错 ${errs.length}:\n` + errs.map(e => JSON.stringify(e).slice(0, 160)).join('\n') : '\n✅ 0 条 JS 报错');
console.log(fails.length ? `❌ 断言失败 ${fails.length}:\n` + fails.join('\n') : '✅ 断言全过');

cdp.close(); chrome.kill();
try { (await import('node:fs')).rmSync(PROF, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(fails.length || errs.length ? 1 : 0);
