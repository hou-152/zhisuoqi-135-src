#!/usr/bin/env node
// 冒烟测试 · 交付包 —— 「一个新队友 clone 下来，最短路径能不能开工」
//
// 冒烟测试的定义：不验证边界，只验证**主干通不通**。
// 这里的主干 = 契约 §三 点名的三个数据源 + §二 的 7 个接口 + mock 包，
// 从磁盘上的原始 JSON 一路走到「前端能画出图」。
//
// 不需要 serve，不需要 key，不需要网络。
//
//   node scripts/test-delivery-smoke.mjs

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
let pass = 0, fail = 0;
const ok = (c, msg) => { c ? (pass++, console.log('  ✓ ' + msg)) : (fail++, console.log('  ✗ ' + msg)); };
const P = (...p) => path.join(ROOT, ...p);
const read = (...p) => fs.readFileSync(P(...p), 'utf8');
const J = (...p) => JSON.parse(read(...p));
const sha = (buf) => 'sha256:' + crypto.createHash('sha256').update(buf).digest('hex');

console.log('\n=== 冒烟测试 · 交付包（新队友从零开工） ===\n');
const t0 = Date.now();

/* ── 1. 文件在不在（契约 §三 点名的每一个） ───────────────── */
console.log('[1] 交付件清单');
const REQUIRED = [
  ['knowledge/概念地图-260913/topics.json', '概念（918）'],
  ['knowledge/概念地图-260913/dependencies.json', '前置依赖（591）'],
  ['knowledge/概念地图-260913/relations.json', '关联（3369）'],
  ['knowledge/概念地图-260913/clusters.json', '领域（21）'],
  ['knowledge/概念地图-260913/manifest.json', '清单 + 校验和'],
  ['knowledge/概念wiki-260913/index.md', 'wiki 索引'],
  ['knowledge/内参-260912/内参-页面数据.json', '契约 §三.2'],
  ['内容结构化系统/模块/ai-concept-base/data/index.json', '契约 §三.3 index'],
  ['内容结构化系统/模块/ai-concept-base/data/units.json', '契约 §三.3 units'],
  ['内容结构化系统/模块/ai-concept-base/data/lines.json', '契约 §三.3 lines'],
  ['evidence/mock/mock-fetch.js', 'mock（离线开工）'],
  ['evidence/mock/fixtures.json', 'mock 样本'],
  ['docs/前端契约-知所栖135.md', '契约本体'],
  ['scripts/serve-lib.mjs', '唯一一份服务'],
  ['scripts/shell.template.html', '界面源文件'],
];
for (const [f, why] of REQUIRED) ok(fs.existsSync(P(f)), `${f}  ← ${why}`);

/* ── 2. 四个 JSON 能解析 + count 自洽 ────────────────────── */
console.log('\n[2] 四个地图文件：可解析 + count 自洽');
const topics = J('knowledge/概念地图-260913/topics.json');
const deps = J('knowledge/概念地图-260913/dependencies.json');
const rels = J('knowledge/概念地图-260913/relations.json');
const clusters = J('knowledge/概念地图-260913/clusters.json');
const manifest = J('knowledge/概念地图-260913/manifest.json');

ok(topics.count === topics.topics.length, `topics.count ${topics.count} == 实际 ${topics.topics.length}`);
ok(deps.count === deps.dependencies.length, `dependencies.count ${deps.count} == 实际 ${deps.dependencies.length}`);
ok(clusters.count === clusters.clusters.length, `clusters.count ${clusters.count} == 实际 ${clusters.clusters.length}`);
ok(rels.count === rels.relations.length, `relations.count ${rels.count} == 实际 ${rels.relations.length}`);

/* ── 3. manifest 说的 == 文件实际 ────────────────────────── */
console.log('\n[3] manifest 计数 vs 文件实况');
ok(manifest.topics === topics.topics.length, `manifest.topics ${manifest.topics} == ${topics.topics.length}`);
ok(manifest.dependencies === deps.dependencies.length, `manifest.dependencies ${manifest.dependencies} == ${deps.dependencies.length}`);
ok(manifest.relations === rels.relations.length, `manifest.relations ${manifest.relations} == ${rels.relations.length}`);
ok(manifest.clusters === clusters.clusters.length, `manifest.clusters ${manifest.clusters} == ${clusters.clusters.length}`);

/* ── 4. 校验和：manifest 是不是**真的**在校验 ──────────────── */
console.log('\n[4] manifest 校验和 vs 文件 SHA-256');
for (const f of ['topics.json', 'dependencies.json', 'relations.json', 'clusters.json']) {
  const want = manifest.checksums[f];
  const got = sha(fs.readFileSync(P('knowledge/概念地图-260913', f)));
  ok(want === got, `${f} 校验和一致`);
}

/* ── 5. 图能建起来（前端第一天要做的事） ──────────────────── */
console.log('\n[5] 图能建起来');
const ids = new Set(topics.topics.map((x) => x.id));
ok(ids.size === topics.topics.length, `概念 id 无重复（${ids.size} 个）`);
ok(topics.topics.every((x) => /^cm_[0-9a-f]{8}$/.test(x.id)), 'id 全部符合 ^cm_[0-9a-f]{8}$');

const dangling = deps.dependencies.filter((d) => !ids.has(d.topicId) || !ids.has(d.prerequisiteId));
ok(dangling.length === 0, `依赖无悬空引用（悬空 ${dangling.length} 条）`);

const rDangling = rels.relations.filter((r) => !ids.has(r.from) || !ids.has(r.to));
ok(rDangling.length === 0, `关联无悬空引用（悬空 ${rDangling.length} 条）`);

const linked = new Set();
for (const d of deps.dependencies) { linked.add(d.topicId); linked.add(d.prerequisiteId); }
ok(linked.size > 0, `图非空：${linked.size} 个概念至少有一条依赖边`);
ok(clusters.clusters.length === 21, `21 个领域都在（${clusters.clusters.length}）`);
ok(clusters.clusters.every((c) => c.topicCount > 0), '每个领域都有概念（无空领域）');

/* ── 6. 契约 §二 的 7 个接口 == serve-lib 实际路由 ────────── */
console.log('\n[6] 契约写的接口 vs 服务端真实路由');
const contract = read('docs/前端契约-知所栖135.md');
const declared = [...contract.matchAll(/`(\/api\/[a-z]+)`/g)].map((m) => m[1]);
const impl = [...new Set([...read('scripts/serve-lib.mjs').matchAll(/\/api\/[a-z]+/g)].map((m) => m[0]))];
const uniqDeclared = [...new Set(declared)];
ok(uniqDeclared.length > 0, `契约里声明了 ${uniqDeclared.length} 个接口`);
const notImpl = uniqDeclared.filter((x) => !impl.includes(x));
ok(notImpl.length === 0, `契约声明的接口全部有实现${notImpl.length ? '（缺：' + notImpl.join(',') + '）' : ''}`);
const notDoc = impl.filter((x) => !uniqDeclared.includes(x));
ok(notDoc.length === 0, `服务端路由全部写进契约${notDoc.length ? '（未登记：' + notDoc.join(',') + '）' : ''}`);

/* ── 7. mock 能加载（离线开工的那一行） ──────────────────── */
console.log('\n[7] mock 包可用');
const mockSrc = read('evidence/mock/mock-fetch.js');
ok(/__MOCK__/.test(mockSrc), 'mock-fetch.js 暴露 __MOCK__ 开关');
ok(/api\/health/.test(mockSrc) && /api\/llm/.test(mockSrc), 'mock 覆盖 health + llm');
const fixtures = J('evidence/mock/fixtures.json');
ok(fixtures.endpoints && Object.keys(fixtures.endpoints).length >= 4, `样本覆盖 ${Object.keys(fixtures.endpoints || {}).length} 个端点`);

/* ── 8. wiki 页数 == 概念数 ─────────────────────────────── */
console.log('\n[8] wiki 链接层');
const wikiDir = P('knowledge/概念wiki-260913/concepts');
const pages = fs.readdirSync(wikiDir).filter((f) => f.endsWith('.md'));
ok(pages.length === topics.topics.length, `wiki 页数 ${pages.length} == 概念数 ${topics.topics.length}`);
const pageMap = J('knowledge/概念wiki-260913/page-map.json');
ok(Object.keys(pageMap).length === topics.topics.length, `page-map 覆盖 ${Object.keys(pageMap).length} 个概念`);

/* ── 9. 壳 payload 形状（契约 §三.1 那 6 个键） ───────────── */
console.log('\n[9] 壳 payload 形状（契约 §三.1）');
const shellSrc = read('prototype/知所栖-壳.html');
const m = shellSrc.match(/const DATA\s*=\s*(\{[\s\S]*?\});\s*\n/);
ok(!!m, '壳里能找到内联 const DATA');
if (m) {
  const d = JSON.parse(m[1]);
  ok(Array.isArray(d.nodes) && d.nodes.length === topics.topics.length, `nodes ${d.nodes.length} == 概念数`);
  ok(Array.isArray(d.edges), `edges 是数组（${d.edges.length}）`);
  ok(d.curation && Array.isArray(d.curation.tags) && d.curation.tags.length === 21, `curation.tags 21 条主题线`);
  ok(d.curation && Array.isArray(d.curation.collections), 'curation.collections 在');
  ok(d.kinds && d.kinds.dist, 'kinds.dist 在');
  const sum = Object.values(d.kinds.dist).reduce((a, b) => a + b, 0);
  ok(sum === d.nodes.length, `kinds.dist 合计 ${sum} == nodes ${d.nodes.length}`);
}

console.log(`\n=== ${pass} 通过 · ${fail} 失败 ===   （${((Date.now() - t0) / 1000).toFixed(2)}s）\n`);
process.exit(fail ? 1 : 0);
