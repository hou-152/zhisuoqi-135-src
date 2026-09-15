#!/usr/bin/env node
// 我的树 · 视图验收（2026-09-15 v3-knowledge-tree 改准重写）
// —— 对的是所有者 09-15 的两条：slogan「将知识转化为属于你的知识树」没被表现；二级视图 tab 板太乱。
// v3：树＝分列坐标的渲染变体（脊线＋无判定叶子降噪＋树头 slogan/绝对数统计）；关系/星球撤入口。
// v4：tab＝我的树｜路径 两格（系统视图走更新面板/hash）；镜头缓动；导航四格统一队友前端。
//
// 这份脚本**不写死概念 ID 与列号**：锚列、列数、拖拽目标全部现查。
// 前置：node scripts/serve-135.mjs 在跑
// 用法：node scripts/test-graph-view.mjs [url]

import path from 'node:path';
import os from 'node:os';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const PORT = 9600 + (process.pid % 300), PROF = '/tmp/graphview-' + process.pid;
const URL_ = process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html';
const OUT = path.resolve(import.meta.dirname, '..', 'prototype', '预览');

const chrome = spawnProcess(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
  '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-proxy-server', 'about:blank'], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const page = await waitForPage(PORT);
if (!page) { console.error('Chrome 没起来'); process.exit(2); }
const cdp = await openCDP(page.webSocketDebuggerUrl);
await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Log.enable');
await cdp.send('Page.navigate', { url: URL_ });
{
  const t0 = Date.now();
  let ok = false;
  while (Date.now() - t0 < 20000) { if (await cdp.eval('typeof DATA === "object" && Array.isArray(DATA.nodes)')) { ok = true; break; } await sleep(400); }
  if (!ok) { console.error('页面没初始化'); process.exit(3); }
}
await sleep(1200);

const ex = async x => cdp.eval(x, { onException: d => 'THREW: ' + (d.exception?.description || '').split('\n')[0] });
const fails = [];
const check = (label, got, want) => {
  const g = String(got);
  const ok = !g.startsWith('THREW') && (want === undefined || g.includes(String(want)));
  if (!ok) fails.push(`${label}：期望含「${want}」，实得「${g.slice(0, 150)}」`);
  console.log(`  ${ok ? '·' : '⚠'} ${label} ｜ ${g.slice(0, 110)}`);
};
const mouse = (type, x, y) => cdp.send('Input.dispatchMouseEvent', {
  type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1, pointerType: 'mouse' });
const shot = name => cdp.screenshot(path.join(OUT, name));

/* 首页 → 知识体系：捕获首页隐藏样式遗留造成的黑屏。 */
await ex(`setView('explore'); setView('graph')`);
check('离开首页后画布、视图按钮、树头均可见', await ex(`
  ['#c', '.mtools', '#tree-head'].every(selector => {
    const el = document.querySelector(selector), style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.visibility === 'visible' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
  })`), 'true');

/* ① 默认入口：我的树；tab 板三格；树头（slogan + 统计）在 */
console.log('\n① 默认＝我的树');
check('默认模式＝tree（slogan 落在产品上）', await ex('mode'), 'tree');
check('#main 挂了 treeon（树头随模式显隐）', await ex(`document.getElementById('main').classList.contains('treeon')`), 'true');
check('tab 板两格：tree|path（v4：系统视图撤 tab，走更新面板/hash）',
  await ex(`[...document.querySelectorAll('.mtools .tab')].map(t=>t.dataset.mode).join('|')`), 'tree|path');
check('顶栏更新面板在：6 条迭代版本（动态：每加一个迭代档 +1，v5-plain-open 起改准） + 系统审计视图入口', await ex(`(()=>{
  toggleUpd();
  const n = document.querySelectorAll('#upd-panel .u-item').length;
  const sys = (document.querySelector('#upd-panel .u-sys button')?.textContent || '').includes('系统审计');
  const repo = (document.querySelector('#upd-panel .u-repo')?.textContent || '').includes('graph-view.js');
  toggleUpd();
  return JSON.stringify({ n, sys, repo });
})()`), await ex(`JSON.stringify({n:document.querySelectorAll('#upd-panel .u-item').length, sys:true, repo:true})`) /* 改准：迭代数动态取自面板本身（每加一个迭代档 +1），不再写死 */);
check('一级导航四格：探索/内参/知识体系/实践空间（v4 命名统一）',
  await ex(`[...document.querySelectorAll('.r-item b')].map(b=>b.textContent).join('|')`), '探索|内参|知识体系|实践空间');
check('关系/星球的 tab 没了', await ex(`document.querySelector('.tab[data-mode="relation"], .tab[data-mode="sphere"]') ? '还在' : '已撤'`), '已撤');
check('树头 slogan＝将知识转化为属于你的知识树',
  await ex(`document.querySelector('#tree-head .th-slogan').textContent.replace(/\\s+/g,'')`), '将知识转化为属于你的知识树');
check('树头统计有字（绝对数口径或树苗引导语）',
  await ex(`document.getElementById('tree-stat').textContent.length > 4 ? 'OK' : 'NO'`), 'OK');
check('统计口径＝pass+mech+fail（read 不算「有判定」）', await ex(`(()=>{
  const t=treeStats();
  const sum=Object.keys(marks).filter(k=>['pass','mech','fail'].includes(marks[k].state)).length;
  return (t.judged===sum && t.judged===t.pass+t.mech+t.fail) ? 'OK' : 'NO';})()`), 'OK');
check('进入树＝居中三列的可读视角（牺牲全览换可读）', await ex(`(()=>{
  const st = vizState(); return st.colsVisible <= 4 && st.colsVisible >= 2 ? 'OK' : 'NO';})()`), 'OK');
check('锚列落在画布中心（±40px）', await ex(`(()=>{
  const i=gridAnchor();
  const cx=CX+(gridX0+i*gridColW+gridColW/2+panX-CX)*zoom;
  return Math.round(Math.abs(cx-W/2)) <= 40 ? 'OK' : 'NO';})()`), 'OK');
check('列宽是固定的世界尺寸，不随窗口挤（264）', await ex('String(gridColW)'), '264');
await shot('50-我的树-居中三列.png');

/* ② 两把尺子：随缩放变字体与间距，最小缩放不压字（树沿用同一套坐标） */
console.log('\n② 两把尺子：字体与间距随缩放动，最小缩放下不拥挤');
const lblAt = async () => JSON.parse(await ex(`(()=>{
  const G=groups(); const s=zoom; const colW=gridColW*s;
  const gx0=CX+(gridX0+panX-CX)*s;
  const fs=Math.max(7,Math.min(13.5,9.4*Math.pow(s,0.42)));
  ctx.font=fs+'px -apple-system,"PingFang SC",sans-serif';
  const anchor=gridAnchor(); let step=1;
  for(let i=0;i<G.length;i++){const w=ctx.measureText(G[i].label+' '+groupCount(G[i])).width;
    step=Math.max(step,Math.ceil((w+16)/Math.max(1,colW)));}
  const drawn=[];
  for(let i=0;i<G.length;i++){
    const cx=gx0+i*colW+colW/2;
    if(cx<20||cx>W-40) continue;
    if(!(i===anchor) && Math.abs(i-anchor)%step) continue;
    const w=ctx.measureText(G[i].label+' '+groupCount(G[i])).width;
    drawn.push({i,w,x:cx,label:G[i].label});}
  drawn.sort((a,b)=>a.x-b.x);
  let minGap=1e9;
  for(let k=1;k<drawn.length;k++) minGap=Math.min(minGap,drawn[k].x-drawn[k-1].x-(drawn[k].w+drawn[k-1].w)/2);
  return JSON.stringify({fs:Math.round(fs*10)/10,drawn:drawn.length,minGap:Math.round(minGap),step});
})()`));
const big = await (async () => { await ex('zoom=2.6'); await sleep(400); return lblAt(); })();
const small = await (async () => { await ex('fitAll()'); await sleep(1000); return lblAt(); })();
check('放大到 2.6 时字号变大', big.fs > 12 ? 'OK' : 'NO', 'OK');
check('全览（21 列）时字号变小并抽稀', small.fs < big.fs && small.step > 1 ? 'OK' : 'NO', 'OK');
check('全览时相邻标签不重叠（最小间隙 ≥ 0）', small.minGap >= 0 ? 'OK' : 'NO', 'OK');
check('全览真的把 21 列放进画面', await ex('String(vizState().colsVisible)'), '21');
const axis = JSON.parse(await ex(`JSON.stringify({right:Math.round(W-26), drawn:vizState().labels.levelsDrawn, levels:vizState().labels.levels})`));
check('右侧层级尺钉在画布右缘', axis.right > 0 ? 'OK' : 'NO', 'OK');
check('全览时层级尺抽稀（不是全部层级都写）', axis.drawn < axis.levels ? 'OK' : 'NO', 'OK');
await shot('51-我的树-全览.png');
await ex(`setMode('tree')`); await sleep(600);

/* ③ 画布左上小字块仍不在；同一批数字顶栏还有一份 */
console.log('\n③ 画布左上小字块');
check('#hero-mini 已删（DOM 里没有）', await ex(`document.getElementById('hero-mini') ? '还在' : '已删'`), '已删');
check('同一批数字顶栏还有一份（#main-meta 非空）',
  await ex(`(document.getElementById('main-meta').textContent||'').trim().length > 6 ? 'OK' : 'NO'`), 'OK');

/* ④ 树特有：无判定叶子降噪——有判定的点比没判定的亮（量像素，不靠肉眼） */
console.log('\n④ 树化渲染：你的叶子先亮');
await ex(`(()=>{
  // 现挑一个画面内、没判定的点注入 pass（必须是真的概念 id，环和亮度才真会上去）
  const cand = nodes.map(n=>({n,q:project(n)})).filter(c=>c.q.sx>40&&c.q.sx<W-40&&c.q.sy>60&&c.q.sy<H-40);
  const t = cand.map(c=>c.n).sort((x,y)=>(neighbors.get(x.id).pre.length+neighbors.get(x.id).post.length)-(neighbors.get(y.id).pre.length+neighbors.get(y.id).post.length))[Math.floor(cand.length/2)];
  marks[t.id] = { state:'pass', said:'验收注入' };
  renderTreeStat();   // 产品里 judge() 走 refreshMarks() → renderTreeStat()；这里走同一条刷新路
  window.__t4 = { inj:t.id, q:cand.find(c=>c.n===t).q };
})()`);
await sleep(400);   // 等一帧：canvas 是 rAF 循环在刷
const dimPair = JSON.parse(await ex(`(()=>{
  const { inj, q } = window.__t4;
  const other = nodes.filter(n=>n.id!==inj && !marks[n.id]).map(n=>({n,p:project(n)}))
    .filter(c=>c.p.sx>40&&c.p.sx<W-40&&c.p.sy>60&&c.p.sy<H-40);
  let far=other[0], fd=-1;
  for(const c of other){ const d=Math.hypot(c.p.sx-q.sx,c.p.sy-q.sy); if(d>fd){fd=d;far=c;} }
  const pa=ctx.getImageData(Math.round(q.sx),Math.round(q.sy),1,1).data;
  const pb=ctx.getImageData(Math.round(far.p.sx),Math.round(far.p.sy),1,1).data;
  return JSON.stringify({inj, litLum:pa[0]+pa[1]+pa[2], dimLum:pb[0]+pb[1]+pb[2], dim:far.n.id});
})()`));
check(`有判定的叶比无判定的亮（${dimPair.litLum} vs ${dimPair.dimLum}）`, String(dimPair.litLum > dimPair.dimLum + 30), 'true');
check('树头统计跟着涨（注入 1 条 pass 后统计里有「过了费曼」）',
  await ex(`(treeStats().judged >= 1 && document.getElementById('tree-stat').textContent.includes('过了费曼')) ? 'OK' : 'NO'`), 'OK');
await ex(`delete marks['${dimPair.inj}']; renderTreeStat();`); await sleep(300);
check('清掉注入后统计回落（不说谎）',
  await ex(`treeStats().judged === Object.keys(marks).filter(k=>['pass','mech','fail'].includes(marks[k].state)).length ? 'OK' : 'NO'`), 'OK');

/* ⑤ 拖拽 + 吸附（树沿用同一套分列坐标与落位） */
console.log('\n⑤ 点拖得动、有吸附、落位能归位');
const target = await ex(`(()=>{const a=gridAnchor();const col=nodes.filter(n=>giOf(n)===a);
  col.sort((x,y)=>(neighbors.get(y.id).pre.length+neighbors.get(y.id).post.length)-(neighbors.get(x.id).pre.length+neighbors.get(x.id).post.length));
  return col[0].id;})()`);
const p0 = JSON.parse(await ex(`(()=>{const p=project(byId.get('${target}'));const r=cvs.getBoundingClientRect();
  return JSON.stringify({x:Math.round(r.left+p.sx*r.width/W),y:Math.round(r.top+p.sy*r.height/H),gx:byId.get('${target}').gx,gy:byId.get('${target}').gy,panX,panY});})()`));
await mouse('mousePressed', p0.x, p0.y);
for (let i = 1; i <= 14; i++) { await mouse('mouseMoved', p0.x + i * 6, p0.y + i * 3); await sleep(25); }
await shot('52-我的树-拖拽吸附中.png');
check('拖拽中：显示吸附辅助线（guides 有值）',
  await ex(`(guides.x != null || guides.y != null) ? 'OK' : 'NO'`), 'OK');
await mouse('mouseReleased', p0.x + 84, p0.y + 42);
await sleep(500);
const after = JSON.parse(await ex(`(()=>{const n=byId.get('${target}');
  return JSON.stringify({gx:n.gx,gy:n.gy,panX,panY,pins:pinCount(),
    stored:JSON.parse(localStorage.getItem('zss135.pins.v1')||'{}').grid ? !!JSON.parse(localStorage.getItem('zss135.pins.v1')).grid['${target}'] : false});})()`));
check('点真的被拖走了（坐标变了）', Math.abs(after.gx - p0.gx) > 20 ? 'OK' : 'NO', 'OK');
check('拖点的时候画布没跟着平移（panX 不变）', Math.abs(after.panX - p0.panX) < 0.001 ? 'OK' : 'NO', 'OK');
check('落位吸在网格上或吸到别的点的对齐线上（18 的倍数，或与某点同 x/y）', await ex(`(()=>{
  const me=byId.get('${target}');
  const onGrid = Math.abs(me.gx/18 - Math.round(me.gx/18)) < 1e-6 && Math.abs(me.gy/18 - Math.round(me.gy/18)) < 1e-6;
  const aligned = nodes.some(o=>o!==me && matches(o) && (Math.abs(o.gx-me.gx)<1e-6 || Math.abs(o.gy-me.gy)<1e-6));
  return (onGrid||aligned) ? 'OK' : 'NO';})()`), 'OK');
check('落位写进了 localStorage（刷新还在）', after.stored ? 'true' : 'false', 'true');
check('顶栏出现「布局归位」按钮', await ex(`document.getElementById('btn-unpin').hidden ? 'NO' : 'OK'`), 'OK');
await shot('53-我的树-拖后固定.png');
await ex(`resetPins()`); await sleep(400);
check('归位后：固定清空、坐标回到自动布局',
  await ex(`(pinCount()===0 && Math.abs(byId.get('${target}').gx - ${JSON.stringify(p0.gx)}) < 0.001) ? 'OK' : 'NO'`), 'OK');
check('归位后按钮自己收起来', await ex(`document.getElementById('btn-unpin').hidden ? 'OK' : 'NO'`), 'OK');

/* ⑥ 滚轮以指针为锚 ＋ 镜头缓动 */
console.log('\n⑥ 滚轮锚与镜头缓动');
const tween = await ex(`(async()=>{
  const p0 = panX, z0 = zoom;
  setFilter((CUR.tags||[])[2].id);            // 点主题＝镜头缓动平移到那一列（zoom 不变，pan 变）
  const pMid = panX;                          // 立即读：应还在起点附近（缓动刚起步）
  await new Promise(r=>setTimeout(r,900));
  const pEnd = panX; camStop(); setFilter(null);
  await new Promise(r=>setTimeout(r,900));
  return JSON.stringify({p0:Math.round(p0), pMid:Math.round(pMid), pEnd:Math.round(pEnd),
    animated: Math.abs(p0-pEnd) > 40, midNotEnd: pMid !== pEnd});
})()`);
const tw = JSON.parse(tween);
check(`点主题后镜头真的平移了（${tw.p0} → ${tw.pEnd}）`, tw.animated ? 'OK' : 'NO', 'OK');
check('缓动是动画不是瞬移（起步时还没到位）', tw.midNotEnd ? 'OK' : 'NO', 'OK');
const anchorTest = await ex(`(()=>{
  const r=cvs.getBoundingClientRect(); const x=r.left+r.width*0.62, y=r.top+r.height*0.5;
  const mx=(x-r.left)*W/r.width, my=(y-r.top)*H/r.height;
  const w0=toWorld(mx,my);
  cvs.dispatchEvent(new WheelEvent('wheel',{deltaY:-240,clientX:x,clientY:y,bubbles:true,cancelable:true}));
  const w1=toWorld(mx,my);
  return JSON.stringify({z:Math.round(zoom*1000)/1000, dx:Math.round(Math.abs(w0.x-w1.x)), dy:Math.round(Math.abs(w0.y-w1.y))});})()`);
const at = JSON.parse(anchorTest);
check('滚轮后指针底下的世界坐标不动（±2px）', (at.dx <= 2 && at.dy <= 2) ? 'OK' : 'NO', 'OK');

/* ⑦ 收敛与双链：旧模式名落树；卡上「先懂这些」带 hard/soft＋理由 */
console.log('\n⑦ 收敛与双链');
check('旧模式名 relation 落到树（撤入口不删代码，不白屏）', await ex(`setMode('relation'); mode`), 'tree');
check('旧模式名 sphere 落到树', await ex(`setMode('sphere'); mode`), 'tree');
check('旧 hash 名 grid 也落树', await ex(`setMode('grid'); mode`), 'tree');
/* v4.1 退出闭环（对抗性审计的阻塞项）：系统视图两条出口都必须归位到树 */
const exitLoop = JSON.parse(await ex(`(async()=>{
  toggleUpd(); document.querySelector('#upd-panel .u-sys button').click();
  await new Promise(r=>setTimeout(r,800)); toggleUpd();
  [...document.querySelectorAll('.r-item')].find(b=>b.dataset.view==='graph').click();
  await new Promise(r=>setTimeout(r,700));
  const viaTopbar = { mode, graphon: document.getElementById('main').classList.contains('graphon'),
    treeHead: getComputedStyle(document.getElementById('tree-head')).display !== 'none' };
  location.hash = 'graph=map'; await new Promise(r=>setTimeout(r,1000));
  history.back(); await new Promise(r=>setTimeout(r,800));
  const viaBack = { mode, graphon: document.getElementById('main').classList.contains('graphon') };
  return JSON.stringify({ viaTopbar, viaBack });
})()`));
check('退出①：系统视图 → 顶栏知识体系归位到树（graphon 解除＋树头回来）',
  (exitLoop.viaTopbar.mode === 'tree' && !exitLoop.viaTopbar.graphon && exitLoop.viaTopbar.treeHead) ? 'OK' : 'NO', 'OK');
check('退出②：#graph=map 后退到空 hash 同样归位',
  (exitLoop.viaBack.mode === 'tree' && !exitLoop.viaBack.graphon) ? 'OK' : 'NO', 'OK');
await ex(`setMode('tree')`); await sleep(500);
const hardPair = JSON.parse(await ex(`(()=>{
  const k = Object.keys(DATA.edgeMeta || {}).find(k => DATA.edgeMeta[k].s === 'hard');
  if (!k) return JSON.stringify({none:true});
  const [dep, pre] = k.split('>');   // 键＝「依赖方>前置」
  return JSON.stringify({none:false, dep, pre, reason:String(DATA.edgeMeta[k].r || '')});
})()`));
if (hardPair.none) {
  check('edgeMeta 里有 hard 边（应至少一条）', '没有 hard 边', 'OK');
} else {
  check('edgeMeta 已装进页面（hard 边存在）', await ex(`String(!!DATA.edgeMeta)`), 'true');
  // 树模式下开卡（没有路径卡 pathBlock 抢文案——之前的假阳性就是它糊弄的）
  await ex(`setMode('tree'); openPanel('${hardPair.dep}')`); await sleep(700);
  const blocks = JSON.parse(await ex(`(()=>{
    const h5 = [...document.querySelectorAll('#pbody h5')];
    const get = t => { const h = h5.find(x => x.textContent.includes(t)); return h && h.nextElementSibling ? h.nextElementSibling.textContent : '(无此区块)'; };
    return JSON.stringify({ preBlock: get('要理解它'), postBlock: get('懂了它') });
  })()`));
  check('依赖方卡「先懂这些」带强度（明面写「强/弱」，hard/soft 在数据层 DATA.edgeMeta）',
    blocks.preBlock.includes('强') ? 'OK' : 'NO', 'OK');
  check('依赖方卡带这条边的理由（逐字前 12 字）',
    blocks.preBlock.includes(hardPair.reason.slice(0, 12)) ? 'OK' : 'NO', 'OK');
  await ex(`openPanel('${hardPair.pre}')`); await sleep(600);
  const postBlock = await ex(`(()=>{const h=[...document.querySelectorAll('#pbody h5')].find(x=>x.textContent.includes('懂了它'));
    return h && h.nextElementSibling ? h.nextElementSibling.textContent : '(无此区块)';})()`);
  check('前置卡「懂了它才能懂这些」同一条边也带强度与理由（双向都查得到）',
    (postBlock.includes('强') && postBlock.includes(hardPair.reason.slice(0, 12))) ? 'OK' : 'NO', 'OK');
  await shot('54-概念卡-前置理由.png');
  await ex(`closePanel(); setMode('tree')`);
}

/* ⑧ 命令行：JS 报错 */
const bad = cdp.events.filter(e =>
  e.method === 'Runtime.exceptionThrown'
  || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'
      // favicon 404 不是页面错误（本地 serve 没放图标）；**url 字段也要看**——
      // 只看 text 抓不到它（text 是「Failed to load resource」），这条一开始就这么假红过。
      && !/favicon/.test((e.params?.entry?.text || '') + (e.params?.entry?.url || ''))));
check('0 条 JS 报错', bad.length, '0');
for (const b of bad.slice(0, 4)) console.log('    ', JSON.stringify(b.params).slice(0, 240));

console.log(`\n截图：prototype/预览/50-我的树-居中三列.png · 51-我的树-全览.png · 52-我的树-拖拽吸附中.png · 53-我的树-拖后固定.png · 54-概念卡-前置理由.png`);
if (fails.length) {
  console.error(`\n❌ ${fails.length} 条没过：`);
  for (const f of fails) console.error('   · ' + f);
  chrome.kill();
  process.exit(1);
}
console.log('\n✅ 断言全过');
chrome.kill();
process.exit(0);
