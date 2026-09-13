#!/usr/bin/env node
// 压力测试 · 交付包 —— 「队友拿这份数据做界面/做检索，规模上会不会崩」
//
// 压力测试测的是**规模**，不是正确性（正确性归冒烟和对抗）。
// 每个指标都记真实数字，只在「病态退化」时才判红 —— 阈值放得很宽，
// 目的是抓「某天数据涨 10 倍后突然变慢/爆内存」，不是卡今天这点量。
//
//   node scripts/test-delivery-stress.mjs            # 纯数据压力（不需要 serve）
//   node scripts/test-delivery-stress.mjs --serve    # 额外起一个真服务端做并发压测

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { performance } from 'node:perf_hooks';

const ROOT = path.resolve(import.meta.dirname, '..');
const P = (...p) => path.join(ROOT, ...p);
const MAP = P('knowledge', '概念地图-260913');
const WITH_SERVE = process.argv.includes('--serve');

let pass = 0, fail = 0;
const ok = (c, msg) => { c ? (pass++, console.log('  ✓ ' + msg)) : (fail++, console.log('  ✗ ' + msg)); };
const ms = (t) => `${t.toFixed(1)}ms`;
const mb = (b) => `${(b / 1048576).toFixed(1)}MB`;
const heap = () => { if (global.gc) global.gc(); return process.memoryUsage().heapUsed; };
const time = (fn) => { const t = performance.now(); const r = fn(); return { r, t: performance.now() - t }; };

console.log('\n=== 压力测试 · 交付包 ===\n');
const H0 = heap();

/* ── 1. 冷启动：读 + parse 四个 JSON ──────────────────────── */
console.log('[1] 冷启动 —— 读盘 + JSON.parse');
const FILES = ['topics.json', 'dependencies.json', 'relations.json', 'clusters.json'];
const parsed = {};
let readMs = 0, parseMs = 0, bytes = 0;
for (const f of FILES) {
  const a = time(() => fs.readFileSync(path.join(MAP, f), 'utf8'));
  readMs += a.t; bytes += Buffer.byteLength(a.r);
  const b = time(() => JSON.parse(a.r));
  parseMs += b.t; parsed[f] = b.r;
}
console.log(`    磁盘 ${mb(bytes)} · 读 ${ms(readMs)} · parse ${ms(parseMs)} · 合计 ${ms(readMs + parseMs)}`);
ok(readMs + parseMs < 4000, `冷启动 <4s（实测 ${ms(readMs + parseMs)}）`);
const H1 = heap();
console.log(`    解析后常驻堆 ${mb(H1 - H0)}（原始磁盘 ${mb(bytes)}，膨胀 ${(H1 - H0) / bytes > 0 ? ((H1 - H0) / bytes).toFixed(1) : '?'}×）`);

const topics = parsed['topics.json'].topics;
const deps = parsed['dependencies.json'].dependencies;
const rels = parsed['relations.json'].relations;
const clusters = parsed['clusters.json'].clusters;

/* ── 2. 图构建：邻接表 ───────────────────────────────────── */
console.log('\n[2] 图构建 —— 邻接表（前端画图前的第一件事）');
const build = time(() => {
  // 命名要说清方向，否则自己都会写反 —— 第一版把两张表的方向搞混了，
  // 结果「拓扑序只覆盖 511/936、最长链 0 层」。**数据没错，是测试错了**。
  //   needs[x]   = x 必须先会的前置
  //   unlocks[p] = 会了 p 之后解锁的
  const needs = new Map(), unlocks = new Map();
  for (const t of topics) { needs.set(t.id, []); unlocks.set(t.id, []); }
  for (const d of deps) { needs.get(d.topicId).push(d.prerequisiteId); unlocks.get(d.prerequisiteId).push(d.topicId); }
  return { needs, unlocks };
});
const { needs, unlocks } = build.r;
console.log(`    ${topics.length} 点 / ${deps.length} 边 · 建表 ${ms(build.t)}`);
ok(build.t < 500, `建表 <500ms（实测 ${ms(build.t)}）`);

/* ── 3. 全源可达性：936 个起点，最坏情况 ─────────────────── */
console.log('\n[3] 全源可达性 —— 从每个概念出发 BFS（最坏情况遍历）');
const reach = (start, adj) => {
  const seen = new Set([start]); const q = [start];
  while (q.length) { const x = q.pop(); for (const y of adj.get(x) || []) if (!seen.has(y)) { seen.add(y); q.push(y); } }
  return seen.size;
};
const bfsDown = time(() => { let tot = 0, max = 0, who = null; for (const t of topics) { const n = reach(t.id, unlocks); tot += n; if (n > max) { max = n; who = t.name; } } return { tot, max, who }; });
const bfsUp = time(() => { let tot = 0, max = 0, who = null; for (const t of topics) { const n = reach(t.id, needs); tot += n; if (n > max) { max = n; who = t.name; } } return { tot, max, who }; });
console.log(`    下游（会了它能解锁多少）总访问 ${bfsDown.r.tot} · ${ms(bfsDown.t)}`);
console.log(`      最广：「${bfsDown.r.who}」解锁 ${bfsDown.r.max}/${topics.length} 个`);
console.log(`    上游（学它之前要会多少）总访问 ${bfsUp.r.tot} · ${ms(bfsUp.t)}`);
console.log(`      最深：「${bfsUp.r.who}」需要 ${bfsUp.r.max} 个前置`);
ok(bfsDown.t + bfsUp.t < 6000, `双向全源 BFS <6s（实测 ${ms(bfsDown.t + bfsUp.t)}）`);

/* ── 4. 拓扑排序 + 最长依赖链 ────────────────────────────── */
console.log('\n[4] 拓扑排序 + 最长链（学习路径排序要用）');
const topo = time(() => {
  const indeg = new Map(topics.map(t => [t.id, needs.get(t.id).length]));
  const q = [...indeg].filter(([, v]) => v === 0).map(([k]) => k);
  const order = []; const dist = new Map(topics.map(t => [t.id, 0]));
  while (q.length) {
    const x = q.shift(); order.push(x);
    for (const y of unlocks.get(x) || []) {
      dist.set(y, Math.max(dist.get(y), dist.get(x) + 1));
      indeg.set(y, indeg.get(y) - 1); if (indeg.get(y) === 0) q.push(y);
    }
  }
  let maxD = 0, maxId = null;
  for (const [k, v] of dist) if (v > maxD) { maxD = v; maxId = k; }
  return { order, maxD, maxId };
});
const nameOf = new Map(topics.map(t => [t.id, t.name]));
console.log(`    拓扑序 ${topo.r.order.length}/${topics.length} · 最长依赖链 ${topo.r.maxD} 层（最深终点：「${nameOf.get(topo.r.maxId)}」）· ${ms(topo.t)}`);
ok(topo.r.order.length === topics.length, `拓扑序覆盖全部概念（无环）`);
ok(topo.r.maxD > 0, `最长链 >0 层（实测 ${topo.r.maxD}）—— 等于 0 就是边方向算反了`);
ok(topo.t < 1000, `拓扑排序 <1s（实测 ${ms(topo.t)}）`);

/* ── 5. 度数分布 / 最坏节点 ──────────────────────────────── */
console.log('\n[5] 度数分布 —— 最坏的节点长什么样');
let maxPre = 0, maxPreId = null, maxUnl = 0, maxUnlId = null, root = 0, isolated = 0;
for (const t of topics) {
  const p = needs.get(t.id).length, u = unlocks.get(t.id).length;
  if (p > maxPre) { maxPre = p; maxPreId = t.id; }
  if (u > maxUnl) { maxUnl = u; maxUnlId = t.id; }
  if (p === 0 && u === 0) isolated++; else if (p === 0) root++;
}
console.log(`    前置最多 ${maxPre} → 「${nameOf.get(maxPreId)}」`);
console.log(`    解锁最多 ${maxUnl} → 「${nameOf.get(maxUnlId)}」`);
console.log(`    无前置（可作起点）${root} 个 · 完全孤立 ${isolated} 个`);
ok(maxPre < 20, `单个概念前置 ≤20（实测 ${maxPre}）—— 前置过多等于没前置，用户不会照着学`);
ok(isolated / topics.length < 0.35, `完全孤立点占比 <35%（实测 ${(isolated / topics.length * 100).toFixed(1)}%）`);

/* ── 6. JSON 往返 ────────────────────────────────────────── */
console.log('\n[6] JSON 往返 —— 序列化 + 再解析（前端要往 localStorage 塞）');
const round = time(() => {
  const s = JSON.stringify(parsed['topics.json']);
  return JSON.parse(s);
});
console.log(`    序列化+再解析 ${ms(round.t)}`);
ok(round.t < 3000, `往返 <3s（实测 ${ms(round.t)}）`);
ok(round.r.topics.length === topics.length, '往返后条数不变');

/* ── 7. wiki 全量读 ─────────────────────────────────────── */
console.log('\n[7] wiki 链接层 —— 918 个文件全量读');
const WIKI = P('knowledge', '概念wiki-260913', 'concepts');
const wiki = time(() => {
  const files = fs.readdirSync(WIKI).filter(f => f.endsWith('.md'));
  let total = 0;
  for (const f of files) total += fs.readFileSync(path.join(WIKI, f), 'utf8').length;
  return { n: files.length, total };
});
console.log(`    ${wiki.r.n} 个文件 · ${mb(wiki.r.total)} 正文 · ${ms(wiki.t)}`);
ok(wiki.t < 3000, `全量读 <3s（实测 ${ms(wiki.t)}）—— Obsidian/编辑器打开这一层要多久`);

/* ── 8. 壳 payload ──────────────────────────────────────── */
console.log('\n[8] 单文件壳 —— 内联 payload 的 parse 成本');
// deploy/ 是**独立的产物仓库**，不在源仓库里 —— 全新 clone 里没有它。
// 所以这里按优先级找现成的那个，一个都没有就跳过，不能崩。
const ARTIFACTS = [
  ['deploy/zhisuoqi-135/index.html', '公网版（产物仓库）'],
  ['prototype/知所栖-壳.html', '壳（源仓库里有）'],
];
const found = ARTIFACTS.map(([p, label]) => [P(p), label, fs.existsSync(P(p))]).find(([, , e]) => e);
if (!found) {
  console.log('    （找不到任何已构建的单文件产物，跳过 —— deploy/ 是独立仓库，clone 里本来就没有）');
} else {
  const [pubPath, label] = found;
  const pubSrc = fs.readFileSync(pubPath, 'utf8');
  console.log(`    被测：${path.relative(ROOT, pubPath)}（${label}）`);
  const m = pubSrc.match(/const DATA\s*=\s*(\{[\s\S]*?\});\s*\n/);
  ok(!!m, `能在单文件里定位内联 DATA（文件 ${mb(Buffer.byteLength(pubSrc))}）`);
  if (m) {
    const p = time(() => JSON.parse(m[1]));
    console.log(`    payload ${mb(Buffer.byteLength(m[1]))} · parse ${ms(p.t)}`);
    ok(p.t < 1000, `payload parse <1s（实测 ${ms(p.t)}）—— 弱机首屏就卡在这`);
    console.log(`    首屏成本 = 下载 ${mb(Buffer.byteLength(pubSrc))} + parse ${ms(p.t)}` +
      `（3G 网络约 ${(Buffer.byteLength(pubSrc) * 8 / 1.6e6).toFixed(1)}s 下载）`);
  }
}

/* ── 9. 服务端并发 ──────────────────────────────────────── */
console.log('\n[9] 服务端并发');
if (!WITH_SERVE) {
  console.log('    （加 --serve 才跑；跳过）');
} else {
  const PORT = 5187;
  const srv = spawn(process.execPath, [P('scripts', 'serve-135.mjs')], {
    env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore', detached: false,
  });
  const base = `http://127.0.0.1:${PORT}`;
  let up = false;
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(base + '/api/health'); if (r.ok) { up = true; break; } } catch {}
    await new Promise(r => setTimeout(r, 250));
  }
  if (!up) { fail++; console.log('    ✗ serve 起不来，并发压测没跑成'); }
  else {
    for (const N of [50, 200]) {
      const t0 = performance.now();
      const rs = await Promise.all(Array.from({ length: N }, () => fetch(base + '/api/health').then(r => r.status).catch(() => 0)));
      const dt = performance.now() - t0;
      const good = rs.filter(s => s === 200).length;
      console.log(`    ${String(N).padStart(3)} 并发 /api/health · 成功 ${good}/${N} · ${ms(dt)} · ${(N / (dt / 1000)).toFixed(0)} req/s`);
      ok(good === N, `${N} 并发全部成功`);
      ok(dt < 15000, `${N} 并发 <15s（实测 ${ms(dt)}）`);
    }
    // 静态大文件并发（公网版那个 787KB）
    const t1 = performance.now();
    const r2 = await Promise.all(Array.from({ length: 30 }, () => fetch(base + '/知所栖-壳.html').then(r => r.status).catch(() => 0)));
    const dt2 = performance.now() - t1;
    ok(r2.every(s => s === 200), `30 并发取 721KB 页面全部 200（${ms(dt2)}）`);
  }
  try { srv.kill('SIGTERM'); } catch {}
}

/* ── 10. 稳定性：同一件事跑 3 轮 ─────────────────────────── */
console.log('\n[10] 稳定性 —— 同样遍历跑 3 轮，看耗时是否抖动');
const runs = [];
for (let i = 0; i < 3; i++) {
  const t = time(() => {
    let n = 0;
    for (const x of rels) { if (needs.has(x.from)) n++; }
    for (const x of deps) { if (unlocks.has(x.prerequisiteId)) n++; }
    return n;
  });
  runs.push(t.t);
}
const spread = Math.max(...runs) - Math.min(...runs);
console.log(`    3 轮：${runs.map(ms).join(' / ')} · 极差 ${ms(spread)}`);
ok(spread < 300, `轮间极差 <300ms（实测 ${ms(spread)}）`);

console.log(`\n=== ${pass} 通过 · ${fail} 失败 ===\n`);
process.exit(fail ? 1 : 0);
