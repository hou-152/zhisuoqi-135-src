#!/usr/bin/env node
// 全链路 Graph 体检：不需要 serve、不调模型。
//   node scripts/check-graph.mjs
//
// 查的是"图本身站不站得住"：断链、未注册的守卫/效果、公共源数据有没有被写脏、
// 只有流程边能不能驱动跳转、scaffold 有没有写清原因、个人状态有没有混进公共图谱。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(import.meta.dirname, '..');
const GRAPH = path.join(ROOT, 'knowledge', 'graph-260914', 'graph.json');
const R = require('./lib/graph-runner.js');

let pass = 0, fail = 0;
const ok = (cond, label) => { if (cond) { pass++; } else { fail++; console.log(`  ✗ ${label}`); } };
const group = (t) => console.log(`\n${t}`);

if (!fs.existsSync(GRAPH)) { console.log('先跑 node scripts/build-graph.mjs'); process.exit(1); }
const g = JSON.parse(fs.readFileSync(GRAPH, 'utf8'));
const byId = new Map(g.nodes.map((n) => [n.id, n]));
const CORE = ['provenance', 'knowledge', 'curriculum', 'transition', 'evidence'];

group('① 结构：断链与必填字段');
ok(Array.isArray(g.nodes) && g.nodes.length > 0, '有节点');
ok(Array.isArray(g.edges) && g.edges.length > 0, '有边');
const broken = g.edges.filter((e) => !byId.has(e.from) || !byId.has(e.to));
ok(broken.length === 0, `没有断链（实际 ${broken.length} 条）`);
ok(g.nodes.every((n) => n.id && n.kind && n.layer && n.scope), '每个节点都有 id/kind/layer/scope');
ok(g.nodes.every((n) => ['public', 'curriculum', 'personal'].includes(n.scope)), 'scope 只有三种取值');
ok(g.edges.every((e) => e.from && e.to && e.kind && e.relation !== undefined), '每条边都有 from/to/kind/relation');

group('② 五种边只有五种，且只有流程边能驱动跳转');
const kinds = new Set(g.edges.map((e) => e.kind));
ok([...kinds].every((k) => CORE.includes(k)), `边类都在五种之内（实际 ${[...kinds].join(',')}）`);
ok(kinds.has('transition') && kinds.has('provenance') && kinds.has('knowledge') && kinds.has('curriculum'), '四类结构性边都真实存在');

group('③ 守卫与效果必须已注册（禁止 eval 执行图配置）');
const guards = new Set(Object.keys(R.GUARDS));
const effects = new Set(Object.keys(R.EFFECTS));
const unregistered = g.edges.filter((e) => e.kind === 'transition' && (!guards.has(e.guard) || !effects.has(e.effect)));
ok(unregistered.length === 0, `没有未注册的 guard/effect（实际 ${unregistered.length} 条：${unregistered.slice(0, 3).map((e) => `${e.guard}/${e.effect}`).join(' ')}）`);
const nonTransWithEvent = g.edges.filter((e) => e.kind !== 'transition' && (e.event || e.guard || e.effect));
ok(nonTransWithEvent.length === 0, '非流程边没有冒充事件/守卫/效果');

group('④ 运行器只走流程边');
let leaked = 0;
for (const n of g.nodes) {
  const outAll = g.edges.filter((e) => e.from === n.id);
  if (!outAll.length) continue;
  const session = safeSession(n.id);
  if (!session) continue;
  const allowedIds = new Set(session.allowed().map((a) => a.edgeId));
  for (const id of allowedIds) {
    const e = g.edges.find((x) => x.id === id);
    if (!e || e.kind !== 'transition') leaked++;
  }
}
function safeSession(nodeId) {
  try { return R.createSession({ graph: g, entry: { ref: nodeId } }); } catch { return null; }
}
ok(leaked === 0, `allowed() 里没有非流程边（实际 ${leaked} 条）`);

group('⑤ 公共源数据没有被写脏（只读适配的证明）');
const cmChecks = JSON.parse(fs.readFileSync(path.join(ROOT, 'knowledge', '概念地图-260913', 'manifest.json'), 'utf8')).checksums || {};
for (const [file, want] of Object.entries(cmChecks)) {
  const abs = path.join(ROOT, 'knowledge', '概念地图-260913', file);
  const got = 'sha256:' + crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
  ok(got === want, `概念地图 ${file} 校验和没变`);
}
const routesPath = path.join(ROOT, 'evidence', 'paths-260913', 'routes.json');
const routesText = fs.readFileSync(routesPath, 'utf8');
for (const bad of ['currentNode', 'passed', 'routeStepId', '"status"']) {
  ok(!routesText.includes(bad), `routes.json 里没有被塞进运行字段 ${bad}`);
}
const pub = g.nodes.filter((n) => n.scope === 'public');
const dirty = pub.filter((n) => ['currentNodeId', 'passed', 'current', 'progress'].some((k) => k in (n.meta || {})));
ok(dirty.length === 0, `公共节点上没有运行字段（实际 ${dirty.length} 个）`);

group('⑥ 状态与缺口要写清原因');
const scaffoldNoReason = g.nodes.filter((n) => n.status === 'scaffold' && !n.statusReason);
ok(scaffoldNoReason.length === 0, `scaffold 节点都有 statusReason（实际 ${scaffoldNoReason.length} 个）`);
const blockedNoReason = g.nodes.filter((n) => n.status === 'blocked' && !n.statusReason);
ok(blockedNoReason.length === 0, `blocked 节点都有 statusReason（实际 ${blockedNoReason.length} 个）`);
const noSrc = g.nodes.filter((n) => n.layer !== 'runtime' && (!n.sourceRefs || !n.sourceRefs.length));
ok(noSrc.length === 0, `公共/课程节点都有出处（实际 ${noSrc.length} 个没出处）`);
ok(g.gaps.length > 0 && g.gaps.every((x) => x.why), '缺口清单非空且每条都写了缺什么');
ok(typeof g.coverage.fullIndex === 'string' && typeof g.coverage.playable === 'string' && g.coverage.fullIndex !== g.coverage.playable,
  '「全量索引完成」与「全量课程可学」是分开陈述的');

group('⑦ 数字与源数据对得上（不是手写的）');
const units = JSON.parse(fs.readFileSync(path.join(ROOT, '内容结构化系统/模块/ai-concept-base/data/units.json'), 'utf8'));
const unitsArr = units.units || units;
ok(g.stats.byKind.SemanticUnit === unitsArr.length, `语义单元数一致（图 ${g.stats.byKind.SemanticUnit} = 源 ${unitsArr.length}）`);
const topics = JSON.parse(fs.readFileSync(path.join(ROOT, 'knowledge/概念地图-260913/topics.json'), 'utf8')).topics;
ok(g.stats.byKind.Concept === topics.length, `概念数一致（图 ${g.stats.byKind.Concept} = 源 ${topics.length}）`);
const deps = JSON.parse(fs.readFileSync(path.join(ROOT, 'knowledge/概念地图-260913/dependencies.json'), 'utf8')).dependencies;
const depEdges = g.edges.filter((e) => e.kind === 'knowledge' && e.sourceRefs.some((s) => s.path.includes('dependencies.json')));
// 源数据里有重复记录，按稳定身份去重是任务书 §4 的要求；去重条数必须出现在缺口清单里
const dups = g.gaps.filter((x) => /重复/.test(x.label));
ok(depEdges.length === deps.length - 2 && dups.length >= 1, `依赖边数 = 源 ${deps.length} 减去重复 2 条（图 ${depEdges.length}），且重复已登记进缺口清单`);
const cards = fs.readdirSync(path.join(ROOT, '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts')).filter((f) => f.endsWith('.yaml'));
ok(g.stats.byKind.DerivedAsset >= cards.length, `图鉴卡都进图了（图 ${g.stats.byKind.DerivedAsset} ≥ 卡 ${cards.length}）`);

group('⑧ 每个单元都要有判据、活动与流程连边');
for (const u of g.nodes.filter((n) => n.kind === 'Unit')) {
  const acts = g.nodes.filter((n) => n.kind !== 'Unit' && (n.meta || {}).unitId === u.id);
  const crit = g.edges.filter((e) => e.kind === 'curriculum' && e.relation === 'targets' && e.from === u.id);
  ok(acts.length >= 8, `${u.label}：活动节点 ${acts.length} 个`);
  ok(crit.length >= 1, `${u.label}：判据 ${crit.length} 条`);
  const trans = g.edges.filter((e) => e.kind === 'transition' && (e.from === u.id || acts.some((a) => a.id === e.from)));
  ok(trans.length >= 10, `${u.label}：流程边 ${trans.length} 条`);
  const reach = new Set(trans.map((e) => e.from));
  ok(acts.some((a) => a.kind === 'Reading' && reach.has(a.id)), `${u.label}：阅读活动真的连着流程边`);
  ok(acts.some((a) => a.kind === 'Summative' && reach.has(a.id)), `${u.label}：章末验收真的连着流程边`);
}

group('⑨ 夹具必须显著标注，不许冒充第二条正式课程');
const fixture = g.nodes.find((n) => n.id === 'route:fixture-shared-concept-v1');
ok(!!fixture, '夹具路线在（或明确没有）');
if (fixture) {
  ok(fixture.status === 'scaffold' && /夹具/.test(fixture.statusReason), '夹具标了 scaffold 且写清是夹具');
  ok(/不是正式课程|不是已审核路线/.test(fixture.statusReason), '夹具写清"不是正式课程"');
  ok(g.gaps.some((x) => /夹具/.test(x.label)), '夹具在缺口清单里有条目');
}
const realRoutes = g.nodes.filter((n) => n.kind === 'Route' && n.status === 'ready');
ok(realRoutes.length === 1, `正式路线仍然只有 1 条（实际 ${realRoutes.length}）`);

group('⑩ 没有 eval / Function 执行图配置');
for (const f of ['scripts/lib/graph-adapter.mjs', 'scripts/build-graph.mjs', 'scripts/lib/graph-runner.js']) {
  const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
  ok(!/\beval\s*\(/.test(t), `${f} 里没有 eval(`);
  ok(!/new Function\s*\(/.test(t), `${f} 里没有 new Function(`);
}

console.log(`\n通过 ${pass} · 失败 ${fail}`);
process.exit(fail ? 1 : 0);
