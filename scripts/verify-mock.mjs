#!/usr/bin/env node
// 校验 evidence/mock/ —— 「怎么算通过」的那条命令。
//
// 断言两件事：
//   A. mock 自己的形状自洽（键在、类型对、判定 JSON 能解析、covered 下标不越界）
//   B. mock 的键**真的**是前端代码在读的那批键（从真实源文件里现查，不是我以为）
// B 是关键：代码改了字段名，这条命令就会红，逼你重录 mock——mock 不会悄悄过期。

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
let pass = 0, fail = 0;
const ok = (c, msg) => { c ? (pass++, console.log('  ✓ ' + msg)) : (fail++, console.log('  ✗ ' + msg)); };
const S = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

console.log('\n=== evidence/mock 验收 ===\n');

// ---------- 文件在 ----------
const MOCK = path.join(ROOT, 'evidence', 'mock');
for (const f of ['fixtures.json', 'mock-fetch.js', 'README.md']) {
  ok(fs.existsSync(path.join(MOCK, f)), `evidence/mock/${f} 存在`);
}
const F = JSON.parse(S('evidence/mock/fixtures.json'));
const E = F.endpoints;
const manifest = JSON.parse(S('knowledge/概念地图-260913/manifest.json'));
const topics = JSON.parse(S('knowledge/概念地图-260913/topics.json'));
const dependencies = JSON.parse(S('knowledge/概念地图-260913/dependencies.json'));
const clusters = JSON.parse(S('knowledge/概念地图-260913/clusters.json'));

// ---------- A. 接口形状（契约 §二） ----------
console.log('\n[接口形状]');
const health = E['GET /api/health'].body;
ok(health && health.ok === true, 'health.ok 为 true');
ok(typeof health.llm === 'boolean' && typeof health.app === 'boolean',
  'health 有 llm / app 两个布尔（前端靠它选运行模式）');

const search = E['POST /api/search'].body;
ok(Array.isArray(search.items), 'search.items 是数组');
ok(search.items.length > 0, 'search 录到了真结果（不是空数组）');
ok(search.items.every(i => 'title' in i && 'author' in i && 'url' in i && 'excerpt' in i),
  'search 每条含 title / author / url / excerpt');
ok(search.items.every(i => typeof i.excerpt === 'string' && i.excerpt.length <= 220),
  'excerpt 是字符串且被截断（≤200 + 余量）');

const llmKeys = Object.keys(E).filter(k => k.startsWith('POST /api/llm'));
ok(llmKeys.length >= 4, `录到 ${llmKeys.length} 条 /api/llm 样本（阅读 / 判定过 / 判定漏 / 失败）`);
for (const k of llmKeys) {
  const b = E[k].body;
  if (k.includes('失败态')) { ok(!!b.error, `${k}：是 {error} 形状`); continue; }
  ok(typeof b.content === 'string' && b.content.length > 0, `${k}：有 content 字符串`);
  ok(typeof b.tokens === 'number' && typeof b.model === 'string', `${k}：有 tokens 与 model`);
}
ok(E['POST /api/llm · 1 阅读（skill=dbs-learning）'].body.skill === 'dbs-learning',
  '阅读样本带 skill 回执（服务端确实用了该 SKILL.md 当 system prompt）');

// ---------- A. 费曼判定 JSON 能不能真用 ----------
console.log('\n[费曼判定 JSON]');
const node = F.payloadSample.nodes[0];
for (const [k, wantPass] of [['POST /api/llm · 费曼判定（过）', true], ['POST /api/llm · 费曼判定（有漏点）', false]]) {
  let parsed = null;
  try { parsed = JSON.parse(E[k].body.content); } catch { /* 下面报错 */ }
  ok(!!parsed, `${k}：content 能被 JSON.parse`);
  const r = parsed && parsed.result && parsed.result[node.id];
  ok(!!r, `${k}：含 result.${node.id}`);
  if (!r) continue;
  ok(r.pass === wantPass, `${k}：pass === ${wantPass}`);
  ok(Array.isArray(r.covered) && r.covered.every(i => Number.isInteger(i)), `${k}：covered 是整数数组`);
  const total = (node.evidence || []).length;
  ok(r.covered.every(i => i >= 0 && i < total), `${k}：covered 下标都在要点范围内（0..${total - 1}）`);
}

// ---------- A. 屏幕 0 的 payload 样本 ----------
console.log('\n[壳 payload 样本]');
const CONTRACT_NODE_KEYS = ['id', 'name', 'nameEn', 'src', 'type', 'gloss', 'level', 'tags',
  'k', 'kwhy', 'centrality', 'stage', 'feynman', 'evidence', 'ap', 'origin', 'mentionCount'];
const n0 = F.payloadSample.nodes[0];
ok(CONTRACT_NODE_KEYS.every(k => k in n0), `节点含契约 §三 列的全部 ${CONTRACT_NODE_KEYS.length} 个键`);
ok(['compute', 'judge', 'use', 'accept'].includes(n0.k), 'k 落在四类验收方式内（compute/judge/use/accept）');
ok(F.payloadSample.edges.every(e => Array.isArray(e) && e.length === 3
  && typeof e[0] === 'string' && typeof e[1] === 'string' && typeof e[2] === 'number'),
  'edges 是 [from, to, 权重] 三元组');
ok(['compute', 'judge', 'use', 'accept'].every(k => typeof F.payloadSample.kinds.dist[k] === 'number'),
  'kinds.dist 四类齐全（前端四列分组靠它）');
ok(F.payloadSample.nodes.length >= 3 && F.payloadSample.edges.length >= 1,
  '样本够画「选中 → 邻居」（≥3 点、≥1 边）');
const liveCounts = { nodes: topics.topics.length, edges: dependencies.dependencies.length, tags: clusters.clusters.length };
ok(manifest.topics === liveCounts.nodes && manifest.dependencies === liveCounts.edges && manifest.clusters === liveCounts.tags,
  `概念地图 manifest 与文件实况一致（${liveCounts.nodes} / ${liveCounts.edges} / ${liveCounts.tags}）`);
ok(JSON.stringify(F.payloadSample._counts) === JSON.stringify(liveCounts),
  `样本自报的规模与现行概念地图一致（${liveCounts.nodes} / ${liveCounts.edges} / ${liveCounts.tags}）`);

// ---------- A. 五语义单元 ----------
console.log('\n[五语义单元样本]');
for (const t of ['CAS', 'SOL', 'OPI']) {
  const arr = F.unitsSample[t];
  ok(Array.isArray(arr) && arr.length > 0, `${t} 有样本`);
  if (arr && arr[0]) ok(['id', 'type', 'title'].every(k => k in arr[0]), `${t} 含 id / type / title`);
}
const total538 = Object.values(F.unitsSample._counts).reduce((a, b) => a + b, 0);
ok(total538 === 538, `五语义总数 538（实测 ${total538}）`);

// ---------- B. mock 的键确实是前端在读的键（现查源码） ----------
console.log('\n[与真实代码对账 —— 防止 mock 悄悄过期]');
const base = S('prototype/知所栖-135-基础框架.html');
const shell = S('scripts/shell.template.html');
const srv = S('scripts/serve-lib.mjs');
const READS = [
  [base, "j.items", '前端读检索结果 j.items'],
  [base, "it.excerpt", '前端读 it.excerpt'],
  [base, "j.content", '前端读 LLM 回包 j.content'],
  [base, "j.tokens", '前端读 j.tokens'],
  [base, "parsed?.result?.[c.id]", '前端读判定 parsed.result[id]'],
  [base, "r.covered", '前端读 r.covered'],
  [base, "/api/health", '前端探活 /api/health'],
  [shell, "const DATA", '壳的概念数据是内联 const DATA'],
  [srv, "j.Data?.Items", '服务端从知乎 CLI 的 Data.Items 取值（大小写坑）'],
  [srv, "excerpt:", '服务端确实产出 excerpt 字段'],
];
for (const [src, needle, what] of READS) ok(src.includes(needle), what);

// 失败态必须真的来自服务端代码
ok(srv.includes('llm-not-configured') && E['POST /api/llm · 失败态'].body.error.includes('llm-not-configured'),
  '失败态样本与服务端 llm-not-configured 分支一致');

// ---------- B. 拦截器语法与接管面 ----------
console.log('\n[mock-fetch.js]');
const mf = S('evidence/mock/mock-fetch.js');
try { new Function(mf); ok(true, '语法可解析'); } catch (e) { ok(false, '语法错误：' + e.message); }
for (const p of ['/api/health', '/api/search', '/api/llm', '/api/save']) {
  ok(mf.includes(p), `接管 ${p}`);
}
ok(mf.includes('window.fetch = function'), '是替换 window.fetch（业务代码不用改）');
ok(mf.includes('return real(input, init)'), '未接管的请求落回真 fetch（不会把页面弄死）');

// ---------- 结论 ----------
console.log(`\n=== ${pass} 通过 · ${fail} 失败 ===\n`);
if (fail) {
  console.log('mock 与代码对不上了。重跑：node scripts/make-mock.mjs --record\n');
  process.exit(1);
}
console.log('前端可以开工：加一行 <script src="evidence/mock/mock-fetch.js"></script> 即可离线做 5 屏。\n');
