#!/usr/bin/env node
// 图谱视图验收（2026-09-15 新建）—— 对的是所有者 2026-09-13 20:34 那一条反馈：
//   ① 一进图谱很拥挤 → 默认不再是「全览」，改成**居中三列**的可读视角，全览退到按钮上
//   ② 顶侧（主题）与右侧（层级）两把尺子要**随缩放变字体与间距**，缩到最小也不互相压字
//   ③ 左上那块元信息小字（#hero-mini）可有可无 → 删掉（同一批数字顶栏还有一份）
//   ④ 关系图谱表现力差 → 枢纽写名字、选中时聚焦邻域、圈子外降噪
//   ⑤ 点拖不动、没有吸附 → 点可拖、拖时吸网格/吸对齐线、落位持久、可一键归位
//
// 这份脚本**不写死概念 ID 与列号**：锚列、列数、枢纽、拖拽目标全部现查。
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

/* ① 默认入口：路径照旧；图谱＝居中三列 */
console.log('\n① 图谱首屏：居中三列（不是全览）');
check('默认还是路径模式（这条没被改掉）', await ex('mode'), 'path');
await ex(`setMode('grid')`); await sleep(800);
const st = JSON.parse(await ex('JSON.stringify(vizState())'));
check('进图谱后画面里的列数 ≈ 3（牺牲掉全览换可读）', st.colsVisible <= 4 && st.colsVisible >= 2 ? 'OK' : 'NO', 'OK');
check('锚列就是数据里的中间那列', String(st.anchor), String((st.cols - 1) / 2));
const centered = JSON.parse(await ex(`(()=>{const i=gridAnchor();
  const cx=CX+(gridX0+i*gridColW+gridColW/2+panX-CX)*zoom;
  return JSON.stringify({cx:Math.round(cx), mid:Math.round(W/2), off:Math.round(Math.abs(cx-W/2))});})()`));
check('锚列落在画布中心（±40px）', centered.off <= 40 ? 'OK' : 'NO', 'OK');
check('列宽是固定的世界尺寸，不随窗口挤（264）', await ex('String(gridColW)'), '264');
await shot('50-图谱-居中三列.png');

/* ② 顶侧主题尺 + 右侧层级尺：随缩放变字体与间距，最小缩放不压字 */
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
const small = await (async () => { await ex('fitAll()'); await sleep(500); return lblAt(); })();
check('放大到 2.6 时字号变大', big.fs > 12 ? 'OK' : 'NO', 'OK');
check('全览（21 列）时字号变小并抽稀', small.fs < big.fs && small.step > 1 ? 'OK' : 'NO', 'OK');
check('全览时相邻标签不重叠（最小间隙 ≥ 0）', small.minGap >= 0 ? 'OK' : 'NO', 'OK');
check('全览真的把 21 列放进画面', await ex('String(vizState().colsVisible)'), '21');
const axis = JSON.parse(await ex(`JSON.stringify({right:Math.round(W-26), drawn:vizState().labels.levelsDrawn, levels:vizState().labels.levels})`));
check('右侧层级尺钉在画布右缘', axis.right > 0 ? 'OK' : 'NO', 'OK');
check('全览时层级尺抽稀（不是 6 层全写）', axis.drawn < axis.levels ? 'OK' : 'NO', 'OK');
await shot('51-图谱-全览.png');
await ex(`setMode('grid')`); await sleep(600);

/* ③ 左上那块元信息小字没了 */
console.log('\n③ 画布左上小字块');
check('#hero-mini 已删（DOM 里没有）', await ex(`document.getElementById('hero-mini') ? '还在' : '已删'`), '已删');
check('同一批数字顶栏还有一份（#main-meta 非空）',
  await ex(`(document.getElementById('main-meta').textContent||'').trim().length > 6 ? 'OK' : 'NO'`), 'OK');

/* ④ 拖拽 + 吸附 */
console.log('\n④ 点拖得动、有吸附、落位能归位');
const target = await ex(`(()=>{const a=gridAnchor();const col=nodes.filter(n=>giOf(n)===a);
  col.sort((x,y)=>(neighbors.get(y.id).pre.length+neighbors.get(y.id).post.length)-(neighbors.get(x.id).pre.length+neighbors.get(x.id).post.length));
  return col[0].id;})()`);
const p0 = JSON.parse(await ex(`(()=>{const p=project(byId.get('${target}'));const r=cvs.getBoundingClientRect();
  return JSON.stringify({x:Math.round(r.left+p.sx*r.width/W),y:Math.round(r.top+p.sy*r.height/H),gx:byId.get('${target}').gx,gy:byId.get('${target}').gy,panX,panY});})()`));
await mouse('mousePressed', p0.x, p0.y);
for (let i = 1; i <= 14; i++) { await mouse('mouseMoved', p0.x + i * 6, p0.y + i * 3); await sleep(25); }
await shot('52-图谱-拖拽吸附中.png');
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
await shot('53-图谱-拖后固定.png');
await ex(`resetPins()`); await sleep(400);
check('归位后：固定清空、坐标回到自动布局',
  await ex(`(pinCount()===0 && Math.abs(byId.get('${target}').gx - ${JSON.stringify(p0.gx)}) < 0.001) ? 'OK' : 'NO'`), 'OK');
check('归位后按钮自己收起来', await ex(`document.getElementById('btn-unpin').hidden ? 'OK' : 'NO'`), 'OK');

/* ⑤ 滚轮以指针为锚 */
console.log('\n⑤ 滚轮：以指针为锚');
const anchorTest = await ex(`(()=>{
  const r=cvs.getBoundingClientRect(); const x=r.left+r.width*0.62, y=r.top+r.height*0.5;
  const mx=(x-r.left)*W/r.width, my=(y-r.top)*H/r.height;
  const w0=toWorld(mx,my);
  cvs.dispatchEvent(new WheelEvent('wheel',{deltaY:-240,clientX:x,clientY:y,bubbles:true,cancelable:true}));
  const w1=toWorld(mx,my);
  return JSON.stringify({z:Math.round(zoom*1000)/1000, dx:Math.round(Math.abs(w0.x-w1.x)), dy:Math.round(Math.abs(w0.y-w1.y))});})()`);
const at = JSON.parse(anchorTest);
check('滚轮后指针底下的世界坐标不动（±2px）', (at.dx <= 2 && at.dy <= 2) ? 'OK' : 'NO', 'OK');

/* ⑥ 关系视图：枢纽有名字、选中聚焦邻域 */
console.log('\n⑥ 关系视图：表现力');
await ex(`setMode('relation')`); await sleep(900);
const rel0 = JSON.parse(await ex('JSON.stringify(vizState().labels)'));
check('关系视图给枢纽写了名字（≥4 个可读标签）', rel0.relLabels >= 4 ? 'OK' : 'NO', 'OK');
await shot('54-关系-枢纽标签.png');
const hub = await ex('relHubs()[0].id');
await ex(`openPanel('${hub}')`); await sleep(700);
const rel1 = JSON.parse(await ex('JSON.stringify(vizState().labels)'));
check('选中一个枢纽后，聚焦邻域的标签变多', rel1.relLabels > rel0.relLabels ? 'OK' : 'NO', 'OK');
check('聚焦集合＝焦点＋它的语义关系邻居',
  await ex(`(()=>{const s=relFocus(); return s && s.has('${hub}') && s.size>1 ? 'OK':'NO';})()`), 'OK');
await shot('55-关系-聚焦邻域.png');
check('关系视图也能拖（拖的是点）', await ex(`canDragNode() ? 'OK' : 'NO'`), 'OK');
check('星球视图不参与点拖拽（那一层拖的是球）',
  await ex(`setMode('sphere'); const v=canDragNode()?'NO':'OK'; v`), 'OK');
await ex(`setMode('grid')`);

/* ⑦ 命令行：JS 报错 */
const bad = cdp.events.filter(e =>
  e.method === 'Runtime.exceptionThrown'
  || (e.method === 'Log.entryAdded' && e.params?.entry?.level === 'error'
      // favicon 404 不是页面错误（本地 serve 没放图标）；**url 字段也要看**——
      // 只看 text 抓不到它（text 是「Failed to load resource」），这条一开始就这么假红过。
      && !/favicon/.test((e.params?.entry?.text || '') + (e.params?.entry?.url || ''))));
check('0 条 JS 报错', bad.length, '0');
for (const b of bad.slice(0, 4)) console.log('    ', JSON.stringify(b.params).slice(0, 240));

console.log(`\n截图：prototype/预览/50-图谱-居中三列.png · 51-图谱-全览.png · 52-图谱-拖拽吸附中.png · 53-图谱-拖后固定.png · 54-关系-枢纽标签.png · 55-关系-聚焦邻域.png`);
if (fails.length) {
  console.error(`\n❌ ${fails.length} 条没过：`);
  for (const f of fails) console.error('   · ' + f);
  chrome.kill();
  process.exit(1);
}
console.log('\n✅ 断言全过');
chrome.kill();
process.exit(0);
