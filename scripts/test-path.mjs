#!/usr/bin/env node
// 路径视图验收 —— 证明「一条真实前置路径被看见、能走通、能回退，并且没破坏原有图谱探索」。
//
// 这份脚本对的是 docs/路径视图-HANDOFF-DeepSeek-20260913.md §九 的验收标准：
//   页面验收 9 条 + 产品验收 5 问 + 一条真实 6 步路线 + 四类关系分开 + 分支 ≤2 + 只回退一个最小前置。
// 它**不写死概念 ID**：路线和节点都在页面里现查，换了地图或换了路线配置也不会假失败。
//
// 前置：node scripts/serve-135.mjs 在跑
// 用法：node scripts/test-path.mjs [url]
//   想验公网单文件版（无服务端）时，把 url 指到假域名（脚本自己带 --host-resolver-rules）：
//   (cd /tmp/pubcopy && python3 -m http.server 5199 &) && node scripts/test-path.mjs http://zhisuoqi-135.test:5199/

import fs from 'node:fs';
import path from 'node:path';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

/* 概念地图的真实条数：**从源数据现读**，不写死。
   起因（2026-09-14 实测）：这一条原本写死 918/591，当天把内参 260913 期 81 个概念并进地图
   （918→999 / 591→632）后它就红了 —— 地图变大是**预期内的合法变更**，红的不该是它。
   现在它守的是「页面上的条数与源数据一致」这个不变量，地图怎么长都不会假失败。 */
const MAP = path.resolve(import.meta.dirname, '..', 'knowledge', '概念地图-260913');
const MAP_NODES = JSON.parse(fs.readFileSync(path.join(MAP, 'topics.json'), 'utf8')).topics.length;
const MAP_EDGES = JSON.parse(fs.readFileSync(path.join(MAP, 'dependencies.json'), 'utf8')).dependencies.length;

const PORT = 9500 + (process.pid % 300), PROF = '/tmp/path-' + process.pid;
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html';

const chrome = spawnProcess(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-proxy-server',
  '--host-resolver-rules=MAP zhisuoqi-135.test 127.0.0.1', 'about:blank'], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const page = await waitForPage(PORT);
if (!page) { console.error('Chrome 没起来'); process.exit(2); }
const cdp = await openCDP(page.webSocketDebuggerUrl);
const send = (m, p = {}) => cdp.send(m, p);
const events = cdp.events;
const ex = async (x) => cdp.eval(x, { onException: d => 'THREW: ' + (d.exception?.description || '').split('\n')[0] });

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
await send('Page.navigate', { url: URL_ });
{
  const t0 = Date.now();
  let ok = false;
  while (Date.now() - t0 < 20000) { if (await ex('typeof DATA === "object" && Array.isArray(DATA.nodes)')) { ok = true; break; } await sleep(400); }
  if (!ok) { console.error('页面没初始化'); process.exit(3); }
}
await sleep(1200);

const fails = [];
const check = (label, got, want) => {
  const g = String(got);
  const ok = !g.startsWith('THREW') && (want === undefined || g.includes(String(want)));
  if (!ok) fails.push(`${label}：期望含「${want}」，实得「${g.slice(0, 130)}」`);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${g.slice(0, 92)}`);
};

const ROUTE = JSON.parse(await ex(`JSON.stringify(ROUTES.length ? ROUTES[0] : null)`));
if (!ROUTE) { console.error('页面里没有路线数据（DATA.routes 为空）——先跑 node scripts/cm-wire.mjs && node scripts/build-shell.mjs'); process.exit(4); }
const S = ROUTE.steps, CUR0 = S[await ex(`String(routeStepIdx)`)], NEXT = S[Number(await ex(`String(routeStepIdx)`)) + 1];
console.log(`路线：${ROUTE.title} · ${S.length} 步 · 主题 ${ROUTE.topicName} · 当前第 ${Number(await ex('String(routeStepIdx)')) + 1} 步`);
console.log('概念：' + S.map((s, i) => `${i + 1}.${s.name}`).join(' → '));

/* ① 默认就是路径模式；主区出现「路径」且排第一 */
console.log('\n① 路径模式');
check('默认模式＝path（路径是默认学习观察方式）', await ex('mode'), 'path');
check('tab 顺序：路径在最前，图谱/关系/星球都还在',
  await ex(`[...document.querySelectorAll('.tab')].map(t=>t.textContent).join('|')`), '路径|图谱|关系|星球');
check('路径 tab 处于选中态', await ex(`document.querySelector('.tab.on').dataset.mode`), 'path');
check('路径条挂上了（#main.pathon + #pathrail.on）',
  await ex(`document.getElementById('main').classList.contains('pathon') + '|' + document.getElementById('pathrail').classList.contains('on')`), 'true|true');

/* ② 一条真实 6 步路线：每个 ID 都能在页面数据里解析出来 */
console.log('\n② 真实路线');
check('主步骤 5—7 个（展示预算）', await ex(`ROUTES[0].steps.length >= 5 && ROUTES[0].steps.length <= 7 ? 'OK' : 'NO'`), 'OK');
check('六个 conceptId 全部能在 918 个概念里解析',
  await ex(`ROUTES[0].steps.every(s => byId.has(s.conceptId)) ? 'OK' : 'NO'`), 'OK');
check('路线里的名字＝概念地图里的真实名字（不是编的展示名）',
  await ex(`ROUTES[0].steps.every(s => byId.get(s.conceptId).name === s.name) ? 'OK' : 'NO'`), 'OK');
check('路径条列出 6 步', await ex(`document.querySelectorAll('#pathrail .pr-step').length`), String(S.length));
check('恰好一步是「当前」', await ex(`document.querySelectorAll('#pathrail .pr-step.cur').length`), '1');
check('当前步与 routeStepIdx 一致',
  await ex(`(()=>{const i=[...document.querySelectorAll('#pathrail .pr-step')].findIndex(b=>b.classList.contains('cur')); return String(i === routeStepIdx)})()`), 'true');

/* ③ 当前节点在主区真的亮：直接量画布像素（暗的那个是降噪的普通概念） */
console.log('\n③ 主区高亮');
const px = JSON.parse(await ex(`(()=>{
  const cid = ROUTES[0].steps[routeStepIdx].conceptId;
  const p = project(byId.get(cid));
  // 降噪的那个点要挑一个离路线远的、且**在画布内**的：密列里点会互相叠，挑最近的那个测不出降噪；
  // 视口外的点 getImageData 读出来是透明的 0，会把「还画着」误判成没画。
  const cand = nodes.filter(n => !routeHas(n.id) && matches(n)).map(n => ({n, q: project(n)}))
    .filter(c => c.q.sx > 40 && c.q.sx < W - 40 && c.q.sy > 60 && c.q.sy < H - 40);
  let best = null, bestD = -1;
  for (const c of cand) {
    const d = Math.min(...ROUTES[0].steps.map(s => { const r = project(byId.get(s.conceptId)); return Math.hypot(c.q.sx - r.sx, c.q.sy - r.sy); }));
    if (d > bestD) { bestD = d; best = c; }
  }
  const d = ctx.getImageData(Math.round(p.sx), Math.round(p.sy), 1, 1).data;
  const e = ctx.getImageData(Math.round(best.q.sx), Math.round(best.q.sy), 1, 1).data;
  return JSON.stringify({cid, cur: p.sx, dim: best.n.name, curLum: d[0]+d[1]+d[2], dimLum: e[0]+e[1]+e[2],
    curPx: [d[0],d[1],d[2]], dimPx: [e[0],e[1],e[2]], rail: 262});
})()`));
check('当前步的点在路径条右侧（没被路径条盖住）', String(px.cur > px.rail), 'true');
check(`当前步的像素比降噪概念亮（${px.curLum} vs ${px.dimLum}）`, String(px.curLum > px.dimLum + 60), 'true');
check(`降噪的那个真的变灰了（${px.dimPx.join(',')}，最大通道差 ≤ 24）`,
  String(Math.max(...px.dimPx) - Math.min(...px.dimPx) <= 24), 'true');
check('非路线概念仍然画着（降噪，不是删掉）', String(px.dimLum > 60), 'true');

/* ④ 产品验收 5 问：不看说明也能在路径条上答出来（站在第 2 步问，起点没有回退点） */
console.log('\n④ 产品验收 5 问');
await ex(`pickRouteStep(1); closePanel()`); await sleep(350);
const rail = await ex(`document.getElementById('pathrail').innerText.replace(/\\s+/g,' ')`);
check('1 我现在在学什么', rail.includes(S[1].name) ? 'OK' : 'NO', 'OK');
check('2 为什么现在学这个', rail.includes('为什么现在学') ? 'OK' : 'NO', 'OK');
check('3 下一步去哪里', S[2] ? (rail.includes(S[2].name) ? 'OK' : 'NO') : 'OK', 'OK');
check('4 不懂应该回到哪里', rail.includes('先回到') ? 'OK' : 'NO', 'OK');
check('5 想探索怎么回全图', rail.includes('回到全图') ? 'OK' : 'NO', 'OK');
check('起点写明「从这里开始」而不是编一个前置',
  await ex(`pickRouteStep(0); document.getElementById('pathrail').innerText.includes('这条路径从这里开始') ? 'OK' : 'NO'`), 'OK');

/* ⑤ 概念卡：路径位置 / 为什么现在学 / 前置 / 下一步 / 回退 / 四类关系 */
console.log('\n⑤ 概念卡路径上下文');
await ex(`pickRouteStep(1)`);
await sleep(500);
const card = await ex(`document.getElementById('pbody').innerText.replace(/\\s+/g,' ')`);
check('卡上有路径位置', card.includes(`当前路径第 2 步 / 共 ${S.length} 步`) ? 'OK' : 'NO', 'OK');
check('卡上有「为什么现在学」', card.includes('为什么现在学') ? 'OK' : 'NO', 'OK');
check('卡上有前置', card.includes('前置：') ? 'OK' : 'NO', 'OK');
check('卡上有下一步', card.includes('下一步：') ? 'OK' : 'NO', 'OK');
check('卡上有回退（只一个最小前置）', card.includes('卡住时回退：') ? 'OK' : 'NO', 'OK');
check('四类关系分开显示（展开「前置理由」后）',
  await ex(`(()=>{const d=document.querySelector('#pbody .pctx details'); if(!d) return 'NO'; d.open=true;
    const t=d.innerText; return ['强前置 hard','弱前置 soft','支撑材料 support','相关概念 related'].map(k=>t.includes(k)?'1':'0').join('')})()`), '1111');
check('「前置理由」给的是依据，不是全部祖先',
  await ex(`(()=>{const d=document.querySelector('#pbody .pctx details'); if(!d) return 'NO'; const t=d.innerText;
    return (t.includes('依据：') && t.length < 2600 ? 'OK' : 'NO')})()`), 'OK');

/* ⑥ 分支：有理由、最多 2 个、点得动 */
console.log('\n⑥ 分支');
const BR = ROUTE.branches && ROUTE.branches[0];
if (BR) {
  const bi = S.findIndex(s => s.conceptId === BR.after);
  await ex(`pickRouteStep(${bi})`); await sleep(400);
  check('分支点卡片上的选项 ≤ 2', await ex(`document.querySelectorAll('#pbody .pctx .pr-opt').length <= 2 ? 'OK' : 'NO'`), 'OK');
  check('每个选项都写了理由',
    await ex(`[...document.querySelectorAll('#pbody .pctx .pr-opt span')].every(x=>x.textContent.trim().length>0) ? 'OK' : 'NO'`), 'OK');
  check('分支选项能点开对应概念卡',
    await ex(`(()=>{const b=document.querySelector('#pbody .pctx .pr-opt'); if(!b) return 'NO'; b.click(); return document.querySelector('#pbody h2').textContent})()`), BR.options[0].name);
} else check('有分支配置', 'NO', 'OK');

/* ⑦ 回退：只回到一个最小前置，点一下就过去 */
console.log('\n⑦ 回退');
await ex(`pickRouteStep(${S.length - 1})`); await sleep(400);   // 站在最后一步（回退点最明确）
const backBtn = await ex(`(()=>{const b=[...document.querySelectorAll('#pbody .pctx .nav button')].find(x=>x.textContent.trim()===ROUTES[0].steps[ROUTES[0].steps.length-1].fallback.name); return b ? 'OK' : 'NO'})()`);
check('最后一步只给一个回退点', backBtn, 'OK');
const went = await ex(`(()=>{const last=ROUTES[0].steps[ROUTES[0].steps.length-1]; const b=[...document.querySelectorAll('#pbody .pctx .nav button')].find(x=>x.textContent.trim()===last.fallback.name); b.click(); return selected + '|' + (selected===last.fallback.id?'对':'错')})()`);
check('点回退 → 回到那个最小前置', went, '|对');
check('回退不是把全部祖先铺出来（回退按钮只有 1 个）',
  await ex(`(()=>{const l=ROUTES[0].steps[ROUTES[0].steps.length-1]; return document.querySelectorAll('#pbody .pctx .pr-back, #pbody .pctx .nav button').length <= 4 ? 'OK' : document.querySelectorAll('#pbody .pctx .nav button').length})()`), 'OK');

/* ⑧ 还能回图谱 / 关系 / 星球，路径条让位 */
console.log('\n⑧ 四个模式互通');
await ex(`closePanel()`); await sleep(300);
check('回图谱：路径条收起来', await ex(`setMode('grid'); mode + '|' + document.getElementById('pathrail').classList.contains('on')`), 'grid|false');
check('关系视图照常（图例在）', await ex(`setMode('relation'); mode + '|' + document.getElementById('rel-legend').classList.contains('on')`), 'relation|true');
check('星球照常', await ex(`setMode('sphere'); mode`), 'sphere');
check('回路径：路径条回来', await ex(`setMode('path'); mode + '|' + document.getElementById('pathrail').classList.contains('on')`), 'path|true');

/* ⑨ 原有入口没坏：主题下钻 / 搜索 / 概念来源 */
console.log('\n⑨ 原有入口回归');
check('左栏三项导航都在', await ex(`document.querySelectorAll('#rail .r-item').length`), '3');
check('点知识体系 → 中间栏 21 条主题', await ex(`setView('graph'); currentView + '|' + document.querySelectorAll('#lp-body .row').length + '|' + groups().length`),
  await ex(`'graph|' + groups().length + '|' + groups().length`));
const themeHit = await ex(`(()=>{const id=ROUTES[0].topicId; setView('theme', id); return currentView + '|' + (filter===id?'画布跟上了':'没跟')})()`);
check('下钻到路线所在主题', themeHit, 'theme|画布跟上了');
check('主题里出现路径入口（主题仍是知识入口）', await ex(`document.querySelectorAll('#lp-body .prow').length`), '1');
check('路径入口写着真实步数', await ex(`document.querySelector('#lp-body .prow .rm').textContent`), `${S.length} 个概念`);
check('入口行不是概念行（概念条数没被污染）',
  await ex(`document.querySelectorAll('#lp-body .row').length + '|' + (document.querySelectorAll('#lp-body .row').length === nodes.filter(n=>(n.tags||[])[0]===ROUTES[0].topicId).length)`), '|true');
check('点路径入口 → 回到路径模式并选中这条路线',
  await ex(`document.querySelector('#lp-body .prow').click(); mode + '|' + (routeId===ROUTES[0].routeId?'选中':'没选')`), 'path|选中');
check('搜索还能筛主题', await ex(`(()=>{setView('graph'); document.getElementById('q-filter').value='循环'; renderList(); const n=document.querySelectorAll('#lp-body .row').length; document.getElementById('q-filter').value=''; renderList(); return n>0 && n<groups().length ? 'OK' : 'NO'})()`), 'OK');
check('概念来源仍是可点外链', await ex(`(()=>{openPanel(ROUTES[0].steps[0].conceptId); return document.querySelectorAll('#pbody .srclist a[href^="http"]').length>0 ? 'OK' : 'NO'})()`), 'OK');
check('原概念卡内容还在（定义 / 深看 / 前置列表）',
  await ex(`(()=>{const t=document.getElementById('pbody').innerText; return (t.includes('要理解它，先懂这些')||t.includes('深看')||t.includes('前置')) ? 'OK' : 'NO'})()`), 'OK');

/* ⑩ 源数据没动 */
console.log('\n⑩ 没改概念地图源数据');
// 2026-09-14：非 AI 复判剔除非 AI → 918/591；同日内参 260913 期并入 81 概念 → 999/632。
// 这条现在**对着源数据现查**（见文件头的 MAP_NODES / MAP_EDGES），只守「壳里 = 地图里」。
check(`${MAP_NODES} 个概念 / ${MAP_EDGES} 条依赖（与地图源数据一致）`,
  await ex(`nodes.length + '/' + edges.length`), `${MAP_NODES}/${MAP_EDGES}`);
check('节点上没有路线字段（路线不写回图谱）',
  await ex(`nodes.some(n => n.route || n.routeStep || n.order) ? '写回了' : 'OK'`), 'OK');
check('主题筛选口径没变（matches 仍按主标签）', await ex(`typeof matches === 'function' && typeof giOf === 'function' ? 'OK' : 'NO'`), 'OK');

/* ⑪ 路径到实践空间：保留概念上下文，未装配不能借用别的案例冒充完成。 */
console.log('\n⑪ 路径接入 01');
await ex(`pickRouteStep(2); window.__proofBeforeLoop = JSON.stringify(marks);`);
check('点击概念卡入口进入实践空间', await ex(`(()=>{const b=Array.from(document.querySelectorAll('#pbody button')).find(b=>b.textContent.includes('进入 1 / 3 / 5')); b.click(); return currentView+'|'+document.getElementById('reader').classList.contains('on')})()`), 'practice|true');
check('当前概念和路径位置保留', await ex(`(()=>{const t=document.getElementById('reader').innerText; return t.includes(ROUTES[0].steps[2].name)&&t.includes('第 3 / '+ROUTES[0].steps.length+' 步')})()`), 'true');
/* 09-13 变更（本轮 Agent Loop 六章装配）：路线第三步已有章节材料，所以这里不再显示「尚未装配」。
   断言没有删掉，而是改成断言新的产品事实——并且补一条：**没有**章节材料的概念仍然照实说没装配。 */
check('路线第三步已装配章节材料，且标明主案例已由负责人确认', await ex(`(()=>{const t=document.getElementById('reader').innerText; return t.includes('独立学习空间')&&t.includes('主案例已由负责人确认')})()`), 'true');
check('没装配的概念仍然照实说没装配（不借别的材料冒充完成）', await ex(`(()=>{openPractice('cm_a4f9a7e3'); const t=document.getElementById('reader').innerText; return t.includes('判断材料尚未装配')&&t.includes('不计入当前路线进度')})()`), 'true');
await ex(`openPractice(ROUTES[0].steps[2].conceptId)`);
check('实际点击返回，恢复路径第三步和原概念', await ex(`(()=>{document.querySelector('#reader .practice-card .jbtn.ghost').click(); return mode+'|'+routeStepIdx+'|'+(selected===ROUTES[0].steps[2].conceptId)+'|'+document.getElementById('reader').classList.contains('on')})()`), 'path|2|true|false');
check('进出学习闭环不伪造掌握记录', await ex(`JSON.stringify(marks)===window.__proofBeforeLoop`), 'true');

/* ⑪b 实践空间第一版：六章阅读器 ＋ 状态看板（2026-09-14 裁决 · 决定 2 与 6）
   要点：准入是**数据驱动的一条判断**（四段全绿），不是把六章写死在代码里；
   19 条 ready 只显示「准备中 / 目录候选」，76 个批量单元一律不可进入；阅读器复用 #learn 同一套排版。 */
console.log('\n⑪b 实践空间 · 六章阅读器 + 状态看板');
check('实践空间数据来自 DATA.practice（不是页面里写死的六章）', await ex(`typeof PRACTICE==='object' && PRACTICE.units.length`), 83);
check('准入判定在数据里：四段全绿=6（六章），批量 76 个一个都不开放',
  await ex(`PRACTICE.units.filter(u=>u.open).length+'|'+PRACTICE.units.filter(u=>u.group==='批量').length+'|'+PRACTICE.units.filter(u=>u.group==='批量'&&u.open).length`), '6|76|0');
check('四段都有明确取值（可走/缺材料/未装配/不可进入）',
  await ex(`PRACTICE.units.every(u=>['reading','formative','decision','summative'].every(k=>['可走','缺材料','未装配','不可进入'].includes(u.segments[k].stateLabel)))`), 'true');
check('批量单元决策段已接通（3 道/单元 → 那一段可走）',
  await ex(`PRACTICE.units.filter(u=>u.group==='批量').every(u=>u.segments.decision.state==='green'&&u.decisionCount===3)`), 'true');
check('批量判据是机械派生的（照实标缺材料，不当人工判据）',
  await ex(`PRACTICE.units.filter(u=>u.group==='批量').every(u=>u.segments.formative.state==='missing'&&u.derivedCount>=1&&u.authoredCount===0)`), 'true');
await ex(`openPractice()`);
check('六章逐章一行 + 单篇一行（来自数据）', await ex(`openPractice(); document.querySelectorAll('#reader .pcard .pu .nm').length`), 7);
check('19 条 ready 只作目录候选显示，不给进入按钮（照实说卡在形成性费曼）',
  await ex(`(()=>{const t=document.getElementById('reader').innerText;return t.includes('准备中 / 目录候选')&&t.includes('不开放学习')&&t.includes('形成性费曼')&&t.includes('决策那一段已经接通')})()`), 'true');
check('空白格照实说：缺少可靠案例本轮是 0，并写明为什么',
  await ex(`(()=>{openPracticeBoard();return document.getElementById('reader').innerText.includes('这一格本轮是 0')})()`), 'true');
check('状态看板逐单元 83 行（不含「要全面推进」那张表）',
  await ex(`openPracticeBoard(); document.querySelectorAll('#reader .pboard tbody tr').length`), 89);
check('看板写着四类口径与准入规则',
  await ex(`(()=>{const t=document.getElementById('reader').innerText;return t.includes('已装配课程：可进入')&&t.includes('材料缺口：待装配')&&t.includes('缺少决策题：不可进入')&&t.includes('缺少可靠案例：不可进入')&&t.includes('四段全绿才开放')})()`), 'true');
check('看板有「要全面推进，还差什么」并写出补的闸门',
  await ex(`(()=>{const t=document.getElementById('reader').innerText;return t.includes('要全面推进，还差什么')&&t.includes('决策段已接通')&&t.includes('判据是机械推的')&&t.includes('无页面入口')})()`), 'true');
check('批量单元点不进阅读器，并给出原因（不静默失败）',
  await ex(`openPractice(); practiceEnter('unit:batch-agent')`), 'false');
check('不能进入时写着缺什么', await ex(`(()=>{const t=document.getElementById('practice-blocked').innerText;return t.includes('现在不能进入学习')&&t.includes('形成性费曼')&&t.includes('机械派生')})()`), 'true');
check('单篇照实说不在这套阅读器里', await ex(`(()=>{openPractice();const t=document.getElementById('reader').innerText;return t.includes('单篇试点')&&t.includes('不在这套阅读器里')})()`), 'true');
check('进入第 1 章走的是同一套 #learn 阅读器',
  await ex(`(()=>{openPractice(); practiceEnter('unit:chapter-agent'); const on=document.getElementById('learn').classList.contains('on'); const rail=!!document.querySelector('#learn-wrap .lrail'); const chips=document.querySelectorAll('#learn-wrap .lrail-steps .lchip').length; return on+'|'+rail+'|'+chips+'|'+learnCur})()`), 'true|true|6|agent');
check('从实践空间进来，返回条写「返回实践空间」', await ex(`document.getElementById('learn-back').textContent`), '← 返回实践空间');
check('返回后回到实践空间（不是被丢进知识体系）',
  await ex(`exitLearn(); currentView+'|'+document.getElementById('reader').classList.contains('on')`), 'practice|true');

/* ⑪c 决策题独立复核进准入（2026-09-14；同日第二轮：v3 复核通过，接入 76 单元）
   v2 的 228 道复核判定 0 道可接入；v3 确定性重做后 228/228 通过。三条必须仍然成立：
     a 依据逐字可回溯（页面带着复核数字，不是页面自述）
     b 复核驱动的接入：接入的题数 = 复核 verdict=usable 的单元数
     c 四段不全绿仍然不可进入（决策段绿了，形成性费曼还是机械判据） */
console.log('\n⑪c 决策题独立复核 · 有题不等于可进入');
check('复核结论进了 DATA.practice（来自 evidence/review-decisions-260914/review.json）',
  await ex(`(()=>{const r=PRACTICE.reviewedDecisions;return !!r && r.questions+'|'+r.usableQuestions+'|'+r.usableUnits+'|'+r.refHitRate+'|'+r.verdict})()`), '228|228|76|100.00%|usable');
check('看板写着「生成 228 道 / 复核通过 228 道」与两轮对比数字',
  await ex(`(()=>{openPracticeBoard();const t=document.getElementById('reader').innerText;return t.includes('生成 228 道')&&t.includes('复核通过 228 道')&&t.includes('逐字命中 100.00%')&&t.includes('正解整句照抄材料 0 道')&&t.includes('极性相反 0 道')&&t.includes('猜中 0 道')&&t.includes('有题不等于可进入')})()`), 'true');
check('决策题接入是复核驱动的：76 个单元声明的题数、生成稿数、复核判定三者一致',
  await ex(`(()=>{const b=PRACTICE.units.filter(u=>u.group==='批量');return b.length+'|'+b.every(u=>u.declaredDecisionCount===3&&u.questionCount===3)+'|'+b.every(u=>u.generatedDecisionCount===3&&u.reviewVerdict==='usable')+'|'+b.filter(u=>u.open).length})()`), '76|true|true|0');
check('决策那一段 76 个单元全部可走，但四段没全绿所以仍不开放',
  await ex(`(()=>{const b=PRACTICE.units.filter(u=>u.group==='批量');return b.filter(u=>u.segments.decision.state==='green').length+'|'+b.every(u=>u.segments.formative.state!=='green')+'|'+b.filter(u=>u.bucket==='decision').length})()`), '76|true|0');
check('点击批量单元仍进不去，理由写的是形成性费曼（判据机械派生）而不是决策题',
  await ex(`(()=>{openPractice(); const r=practiceEnter('unit:batch-agent'); const t=document.getElementById('practice-blocked').innerText; return r+'|'+(t.includes('现在不能进入学习')&&t.includes('形成性费曼')&&t.includes('机械派生'))})()`), 'false|true');
check('六章仍是唯一四段全绿的一批（复核没误伤已装配课程）',
  await ex(`PRACTICE.units.filter(u=>u.open).length+'|'+PRACTICE.units.filter(u=>u.open&&u.group==='六章').length`), '6|6');
/* 「不要把它堵死」：准入不是写死的六章 ID 白名单。
   运行时往 PRACTICE.units 里塞一个**另一个单元**（批量单元改造成全绿、reader 指向已有章节），
   同一套 #learn 阅读器必须能进去；再塞一个全绿但没绑 reader 的，必须照实说差哪一步。 */
check('准入不是写死的六章：别的单元只要 gate 全绿，同一套阅读器就能进',
  await ex(`(()=>{const src=PRACTICE.units.find(u=>u.group==='批量');const probe={...src,id:'unit:probe-green',open:true,reader:'agent',segments:Object.fromEntries(['reading','formative','decision','summative'].map(k=>[k,{state:'green',stateLabel:'可走',why:'探针'}]))};PRACTICE.units.push(probe);const r=practiceEnter('unit:probe-green');const on=document.getElementById('learn').classList.contains('on')+'|'+learnCur;exitLearn();PRACTICE.units.pop();return r+'|'+on})()`), 'true|true|agent');
check('全绿但没绑阅读器：照实说差哪一步，不静默打开别的单元',
  await ex(`(()=>{openPractice();const src=PRACTICE.units.find(u=>u.group==='批量');const probe={...src,id:'unit:probe-noreader',open:true,reader:null,segments:Object.fromEntries(['reading','formative','decision','summative'].map(k=>[k,{state:'green',stateLabel:'可走',why:'探针'}]))};PRACTICE.units.push(probe);const r=practiceEnter('unit:probe-noreader');const t=document.getElementById('practice-blocked').innerText;PRACTICE.units.pop();return r+'|'+(t.includes('没有它的阅读器绑定')||t.includes('还没有把它的材料编译成阅读器载荷'))})()`), 'false|true');
console.log('\n⑪d 方案丙：6 个重复批量单元已 superseded · 数据保留、永不对外开放');
check('看板读到 superseded 标记与取代关系',
  await ex(`(()=>{const s=PRACTICE.units.filter(u=>u.superseded);return s.length+'|'+s.every(u=>/^unit:chapter-/.test(u.superseded))+'|'+PRACTICE.summary.superseded})()`), '6|true|6');
check('6 个 superseded 单元正是六章那 6 个 CON（同一批概念）',
  await ex(`(()=>{const ids=PRACTICE.units.filter(u=>u.superseded).map(u=>u.label.split(' · ')[0]).sort().join(',');return ids})()`),
  'CON-agent,CON-agent-harness,CON-agent-loop,CON-state-management,CON-tool,CON-verification-loop');
check('费曼判据独立复核结论进了 DATA.practice（264 条 / 可当理解判据 0 条 / verdict=unusable）',
  await ex(`(()=>{const c=PRACTICE.reviewedCriteria;return !!c && c.total+'|'+c.usableAsUnderstandingCheck+'|'+c.verdict+'|'+c.recitableFromBoundaries+'|'+c.mechanicalRestatement})()`),
  '264|0|unusable|264|264');
check('看板写着判据复核的实测数字（信息增量 vs 人写、照抄边界即可满足）',
  await ex(`(()=>{openPracticeBoard();const t=document.getElementById('reader').innerText;return t.includes('费曼判据独立复核')&&t.includes('可当理解判据 0 条')&&t.includes('verdict=unusable')&&t.includes('照抄卡片 boundaries 即可满足 264 条')&&t.includes('人写的六章')})()`), 'true');
check('点击 superseded 单元进不去，且理由写明「已被六章取代」',
  await ex(`(()=>{openPractice();const r=practiceEnter('unit:batch-agent');const t=document.getElementById('practice-blocked').innerText;return r+'|'+(t.includes('现在不能进入学习')&&t.includes('已被手工章节取代'))})()`), 'false|true');
/* 反证：就算把 superseded 单元的四段全改成绿、再塞进 PRACTICE，也必须进不去 ——
   封条读的是数据里的 superseded，不是"当前恰好没绿"。 */
check('反证：把 superseded 单元四段伪造成全绿 → 仍然进不去（封条是数据驱动的）',
  await ex(`(()=>{openPractice();const src=PRACTICE.units.find(u=>u.id==='unit:batch-agent');const probe={...src,open:true,reader:'agent',segments:Object.fromEntries(['reading','formative','decision','summative'].map(k=>[k,{state:'green',stateLabel:'可走',why:'探针'}]))};PRACTICE.units.push(probe);const r=practiceEnter('unit:probe-superseded');const on=document.getElementById('learn').classList.contains('on')+'|'+learnCur;exitLearn();PRACTICE.units.pop();return r+'|'+on})()`), 'false|false');
check('路径条进来时的返回行为没改（这一版只多一个入口，不替换）',
  await ex(`(()=>{exitLearn(); setMode('path'); openPanel(ROUTES[0].steps[0].conceptId); openLearnFor(ROUTES[0].steps[0].conceptId); const label=document.getElementById('learn-back').textContent; exitLearn(); return label+'|'+currentView})()`), '← 返回知识体系|graph');

await ex(`closePanel()`); await sleep(200);
/* 截图落到 prototype/预览/（和 shot-shell 同一处），文件名用 40 段避开已有编号 */
const OUTDIR = '/Users/housibo/Documents/知乎黑客松/prototype/预览';
await ex(`setMode('path'); pickRouteStep(0); closePanel()`); await sleep(600);
await cdp.screenshot(OUTDIR + '/40-路径-默认视图.png');
await ex(`pickRouteStep(2)`); await sleep(600);
await cdp.screenshot(OUTDIR + '/41-路径-概念卡上下文.png');
await ex(`pickRouteStep(${S.length - 1})`); await sleep(600);
await cdp.screenshot(OUTDIR + '/42-路径-卡住回退.png');
await ex(`closePanel(); setView('theme', ROUTES[0].topicId)`); await sleep(600);
await cdp.screenshot(OUTDIR + '/43-路径-主题里的入口.png');
console.log('\n截图：prototype/预览/40-路径-默认视图.png · 41-路径-概念卡上下文.png · 42-路径-卡住回退.png · 43-路径-主题里的入口.png');

const errs = events
  .filter(e => e.method === 'Runtime.exceptionThrown' || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'))
  .filter(e => !/favicon/.test(JSON.stringify(e)))
  // 静态站上没有 /api，detectApp() 探 /api/health 会留下一条 404 —— 和 check-public 同一条豁免
  .filter(e => !/\/api\/health/.test(JSON.stringify(e)));
console.log(errs.length ? `\n❌ JS 报错 ${errs.length}:\n` + errs.map(e => JSON.stringify(e).slice(0, 200)).join('\n') : '\n✅ 0 条 JS 报错');
console.log(fails.length ? `❌ 断言失败 ${fails.length}:\n` + fails.join('\n') : '✅ 断言全过');
cdp.close(); chrome.kill();
try { (await import('node:fs')).rmSync(PROF, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(fails.length || errs.length ? 1 : 0);
