#!/usr/bin/env node
// 概念网络图 · 体检（2026-09-15）
//
// 规格：docs/概念网络图-产出规格-20260915.md（R1—R8）
// 不需要 serve、不调模型：只读 knowledge/概念网络-260915/*.json 与原始材料，逐条断言。
//
// 用法：node scripts/check-concept-net.mjs [--unit <unitId>] [--quiet]

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const NETDIR = path.join(ROOT, 'knowledge', '概念网络-260915');
const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
const ONLY = arg('--unit');
const QUIET = process.argv.includes('--quiet');

const CN = (await import(path.join(ROOT, 'scripts', 'lib', 'concept-net-view.js'))).default
  || (await import(path.join(ROOT, 'scripts', 'lib', 'concept-net-view.js')));

const TOPICS = JSON.parse(fs.readFileSync(path.join(ROOT, 'knowledge', '概念地图-260913', 'topics.json'), 'utf8')).topics;
const TOPIC_IDS = new Set(TOPICS.map((t) => t.id));

let pass = 0; const fails = [];
function need(ok, msg) { if (ok) pass++; else fails.push(msg); }

/* 引用原文的比对口径：与生成器同一套（去链接/去标记/合并空白），逐字 contains */
function normalizeSource(text) {
  return String(text)
    .replace(/\[<sup>[^\]]*\]\([^)]*\)[^\]]*<\/sup>\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*`>#]/g, '')
    .replace(/\s+/g, ' ');
}

let CHAPTERS_RAW = null;
function chapterCorpus() {
  if (CHAPTERS_RAW === null) CHAPTERS_RAW = normalizeSource(fs.readFileSync(path.join(ROOT, 'evidence', 'agent-loop-260913', 'chapters.json'), 'utf8'));
  return CHAPTERS_RAW;
}
function sourceCorpus(net) {
  if (net.unitKind === 'route') return chapterCorpus();
  const f = path.join(ROOT, 'knowledge', `内参-${net.period}`, '原文', net.slug + '.md');
  return fs.existsSync(f) ? normalizeSource(fs.readFileSync(f, 'utf8')) : null;
}

const files = fs.existsSync(NETDIR)
  ? fs.readdirSync(NETDIR).filter((f) => f.endsWith('.json')).map((f) => path.join(NETDIR, f)).sort()
  : [];
if (!files.length) { console.log('✗ knowledge/概念网络-260915/ 里一张图都没有 —— 先跑 node scripts/build-concept-net.mjs --chapters'); process.exit(1); }

const stat = { units: 0, nodes: 0, edges: 0, direct: 0, weak: 0, gaps: 0, layers: 0 };

for (const f of files) {
  const net = JSON.parse(fs.readFileSync(f, 'utf8'));
  const tag = net.unitId || path.basename(f);
  if (ONLY && tag !== ONLY) continue;
  stat.units++;
  const nodes = net.nodes || [], edges = net.edges || [], layers = net.layers || [];
  const ids = new Set(nodes.map((n) => n.id));
  const layerIds = new Set(layers.map((l) => l.id));
  stat.nodes += nodes.length; stat.edges += edges.length; stat.layers += layers.length; stat.gaps += (net.gaps || []).length;

  /* R8：状态口径 */
  need(net.reviewStatus === 'generated-unreviewed', `${tag}：R8 reviewStatus 必须是 generated-unreviewed（实得 ${net.reviewStatus}）`);
  need(!!net.generatedAt, `${tag}：缺 generatedAt`);
  need(!!net.title, `${tag}：缺 title`);

  /* R5 / R6：分层 */
  need(layers.length >= 2, `${tag}：R6 至少 2 层（实得 ${layers.length}）`);
  need(layers.every((l) => l.id && l.name), `${tag}：R5 有层缺 id 或 name`);
  need(new Set(layers.map((l) => l.id)).size === layers.length, `${tag}：R5 层 id 重复`);
  for (const l of layers) need(nodes.some((n) => n.layer === l.id), `${tag}：R6 层「${l.name}」一个节点都没有`);

  /* 节点 */
  need(nodes.length >= 3, `${tag}：节点少于 3 个，不成网络`);
  need(new Set(nodes.map((n) => n.id)).size === nodes.length, `${tag}：节点 id 重复`);
  for (const n of nodes) {
    need(!!n.name, `${tag}：节点 ${n.id} 缺 name`);
    need(layerIds.has(n.layer), `${tag}：R5 节点「${n.name}」的层 ${n.layer} 不在 layers 里`);
    if (n.ref && n.ref.id) need(TOPIC_IDS.has(n.ref.id), `${tag}：R7 节点「${n.name}」的 ref.id ${n.ref.id} 在概念地图里不存在`);
  }

  /* R1 / R2 / R3 / R4：边 */
  const corpus = sourceCorpus(net);
  need(corpus !== null, `${tag}：找不到原文材料，R2 无法核对`);
  const seenPair = new Set();
  for (const e of edges) {
    need(e.basis === 'quote', `${tag}：R1 边 ${e.id} 的 basis=${e.basis}（只有 quote 能进图）`);
    need(!!e.quote && String(e.quote).trim().length >= 8, `${tag}：R1 边 ${e.id} 没有逐字引用`);
    if (e.quote && corpus) need(corpus.includes(normalizeSource(e.quote)), `${tag}：R2 边 ${e.id}「${e.label}」的引用在原文里找不到逐字原文`);
    need(!!e.label && String(e.label).length <= 14, `${tag}：R3 边 ${e.id} 的标签必须是 ≤14 字短语（实得「${e.label}」${String(e.label || '').length} 字）`);
    need(!/[。！？；]/.test(String(e.label || '')), `${tag}：R3 边 ${e.id} 的标签是整句，不是短语`);
    need(ids.has(e.from) && ids.has(e.to), `${tag}：R4 边 ${e.id} 端点断链（${e.from}→${e.to}）`);
    need(e.from !== e.to, `${tag}：R4 边 ${e.id} 自己指向自己`);
    const pk = [e.from, e.to].sort().join('|');
    need(!seenPair.has(pk), `${tag}：边 ${e.id} 与已有边端点重复`);
    seenPair.add(pk);
    if (e.evidenceStrength === 'direct') stat.direct++; else if (e.evidenceStrength === 'indirect') stat.weak++;
  }

  /* 布局：越界 / 标签压节点 —— 只有真能画出来才算数 */
  const L = CN.layout(net);
  need(L.orphans.length === 0, `${tag}：有节点落在未声明的层里（${L.orphans.join(',')}）`);
  let oob = 0, covered = 0;
  for (const id of Object.keys(L.pos)) { const p = L.pos[id]; if (p.x < 0 || p.y < 0 || p.x + p.w > L.width || p.y + p.h > L.height) oob++; }
  for (const g of L.geo) { const b = g.label; if (!b || b.x < 0 || b.y < 0 || b.x + b.w > L.width || b.y + b.h > L.height) oob++; if (g.overlap) covered++; }
  need(oob === 0, `${tag}：画布越界 ${oob} 处（nodes/labels）`);
  need(covered === 0, `${tag}：有 ${covered} 个边标签压住了别的标签，读不出来`);

  /* 渲染：不许拼出坏 HTML */
  const html = CN.render(net);
  need(html.indexOf('<svg') > -1 && html.indexOf('</svg>') > -1, `${tag}：渲染不出 svg`);
  need(!/<(script|iframe)/i.test(html), `${tag}：渲染结果里有脚本标签`);
  need((html.match(/data-id="/g) || []).length === nodes.length, `${tag}：渲染出的节点数与数据不符`);
  need((html.match(/class="cn-edge"/g) || []).length === edges.length, `${tag}：渲染出的边数与数据不符`);

  if (!QUIET) console.log(`  ${tag}：层 ${layers.length} · 节点 ${nodes.length} · 边 ${edges.length} · 画布 ${L.width}×${L.height} · gaps ${(net.gaps || []).length}`);
}

console.log(`\n概念网络图体检：${pass} 项通过 · ${fails.length} 项失败`);
console.log(`  图 ${stat.units} 张 · 层 ${stat.layers} · 节点 ${stat.nodes} · 边 ${stat.edges}（原句同时提到两端 ${stat.direct} · 只提到一端 ${stat.weak}）· 未进图的缺口 ${stat.gaps}`);
if (fails.length) { console.log('\n失败项：'); fails.slice(0, 40).forEach((m) => console.log('  ✗ ' + m)); if (fails.length > 40) console.log(`  …还有 ${fails.length - 40} 项`); process.exit(1); }
