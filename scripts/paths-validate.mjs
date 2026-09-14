#!/usr/bin/env node
// 路径视图 · 路线配置体检
//
// 为什么要有它：路线是**人工策展**的，最容易出的错不是写错文案，而是
//   ① 猜了一个不存在的 conceptId（PLAN/HANDOFF 里的示例名和真实 ID 并不一致）；
//   ② 把「路线顺序」说成「概念地图里的 hard 依赖」——那是两回事，这里逐条对照
//      dependencies.json，把「地图真有这条边吗、是 hard 还是 soft」印出来；
//   ③ 超预算：主步骤超过 7 个、一个分支点超过 2 个选项。
// 它只读概念地图，不改任何源数据；结论落 evidence/paths-260913/validate.json。
//
// 用法：node scripts/paths-validate.mjs

import fs from 'node:fs';
import path from 'node:path';
import { relationLedgerOf } from './lib/relation-kinds.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAP = path.join(ROOT, 'knowledge', '概念地图-260913');
const CFG = path.join(ROOT, 'evidence', 'paths-260913', 'routes.json');
const OUT = path.join(ROOT, 'evidence', 'paths-260913', 'validate.json');
const load = (f) => JSON.parse(fs.readFileSync(path.join(MAP, f), 'utf8'));

const topics = load('topics.json').topics;
const dependencies = load('dependencies.json').dependencies;
const relations = load('relations.json').relations;
const clusters = load('clusters.json').clusters;
const byId = new Map(topics.map((t) => [t.id, t]));
const clusterIds = new Set(clusters.map((c) => c.id));

const cfg = JSON.parse(fs.readFileSync(CFG, 'utf8'));
const fails = [], warns = [], report = { generatedAt: new Date().toISOString(), source: path.relative(ROOT, CFG), routes: [] };

const depOf = (id) => dependencies.filter((e) => e.topicId === id);
// 「相关」的口径与壳**同源**（scripts/lib/relation-kinds.mjs：kind 白名单 + 同一套去重）。
// 以前这里把 co-article（同一篇里出现过）与 rejected（已被判不成立）也算进"相关"，
// 于是 validate.json 报 Harness 271、壳里报 21 —— 同一个名字差 13 倍。
// 现在两个数分开写：related（画得出来、去重后）+ relatedHidden（默认不绘制），两边必然一致。
const relOf = (id) => relationLedgerOf(relations, id).related;
const nm = (id) => (byId.get(id) || {}).name || `（不存在）${id}`;

for (const rt of cfg.routes || []) {
  const R = { routeId: rt.routeId, title: rt.title, topicId: rt.topicId, steps: [], branches: [], problems: [] };
  const stepIds = (rt.steps || []).map((s) => s.conceptId);

  if (rt.topicId && !clusterIds.has(rt.topicId)) fails.push(`${rt.routeId}：topicId「${rt.topicId}」不在 clusters.json 里`);
  for (const s of rt.steps || []) {
    if (!byId.has(s.conceptId)) fails.push(`${rt.routeId}：conceptId「${s.conceptId}」不在 topics.json 里（不许猜 ID）`);
    if (!s.why) warns.push(`${rt.routeId} 第 ${s.order} 步缺 why（「为什么现在学」会开天窗）`);
  }
  const n = stepIds.length;
  if (n < 5 || n > 7) fails.push(`${rt.routeId}：主步骤 ${n} 个，超出 5—7 的展示预算`);
  const orders = (rt.steps || []).map((s) => s.order).join(',');
  if (orders !== [...(rt.steps || [])].map((s) => s.order).sort((a, b) => a - b).join(',')) fails.push(`${rt.routeId}：order 不是递增的（${orders}）`);
  if (new Set(stepIds).size !== stepIds.length) fails.push(`${rt.routeId}：主路径里有重复概念`);

  for (const s of rt.steps || []) {
    const t = byId.get(s.conceptId) || {};
    const dep = depOf(s.conceptId);
    const hard = dep.filter((e) => e.strength === 'hard');
    const soft = dep.filter((e) => e.strength !== 'hard');
    const rel = relOf(s.conceptId);
    const prev = stepIds[stepIds.indexOf(s.conceptId) - 1];
    const declared = s.prereq ? s.prereq.conceptId : null;
    const mapEdge = declared ? dep.find((e) => e.prerequisiteId === declared) : null;
    // 「路线前置」与「地图 hard 前置」必须分开说：地图里没有这条边时，不许在页面上写成 hard。
    const basis = declared ? (mapEdge ? mapEdge.strength : (s.prereq.basis || 'route')) : 'none';
    if (declared && !byId.has(declared)) fails.push(`${rt.routeId}：第 ${s.order} 步的 prereq「${declared}」不存在`);
    if (declared && prev && declared !== prev) warns.push(`${rt.routeId}：第 ${s.order} 步的 prereq 不是上一步（${nm(declared)} ≠ ${nm(prev)}）——确认这是有意的`);
    if (s.prereq && s.prereq.basis === 'hard' && !mapEdge) fails.push(`${rt.routeId}：第 ${s.order} 步声称 hard 前置，但 dependencies.json 里没有这条边`);
    if (s.fallback && !byId.has(s.fallback.conceptId)) fails.push(`${rt.routeId}：第 ${s.order} 步的 fallback「${s.fallback.conceptId}」不存在`);
    R.steps.push({
      order: s.order, conceptId: s.conceptId, name: t.name, nameEn: t.nameEn || '',
      domain: t.domain, level: t.depth, verification: t.verification,
      prereqDeclared: declared, prereqBasis: basis,
      mapHard: hard.map((e) => ({ id: e.prerequisiteId, name: nm(e.prerequisiteId), reason: e.reason })),
      mapSoft: soft.map((e) => ({ id: e.prerequisiteId, name: nm(e.prerequisiteId), reason: e.reason })),
      relatedCount: rel.length, relatedHiddenCount: relationLedgerOf(relations, s.conceptId).hidden.length,
      supportCount: (t.sources || []).length,
      fallback: s.fallback ? s.fallback.conceptId : null,
    });
  }

  for (const b of rt.branches || []) {
    const opts = b.options || [];
    if (!stepIds.includes(b.after)) fails.push(`${rt.routeId}：分支点「${b.after}」不在主路径上`);
    if (opts.length > 2) fails.push(`${rt.routeId}：分支点「${nm(b.after)}」有 ${opts.length} 个选项，超出「最多 2 个」的预算`);
    for (const o of opts) if (!byId.has(o.conceptId)) fails.push(`${rt.routeId}：分支选项「${o.conceptId}」不存在`);
    for (const o of opts) if (!o.reason) fails.push(`${rt.routeId}：分支选项「${nm(o.conceptId)}」没有理由（不允许无理由分支）`);
    R.branches.push({ after: b.after, afterName: nm(b.after), question: b.question,
      options: opts.map((o) => ({ id: o.conceptId, name: nm(o.conceptId), role: o.role || 'branch', reason: o.reason })) });
  }
  R.problems = [...fails, ...warns].filter((x) => x.startsWith(rt.routeId));
  report.routes.push(R);
}

report.summary = { routes: report.routes.length, fails: fails.length, warns: warns.length };
fs.writeFileSync(OUT, JSON.stringify(report, null, 1));

for (const R of report.routes) {
  console.log(`■ ${R.title}（${R.routeId}）· 主题 ${R.topicId}（${(clusters.find((c) => c.id === R.topicId) || {}).label || '?'}）`);
  for (const s of R.steps) {
    console.log(`  ${s.order}. ${s.name} ｜ ${s.domain} · L${s.level} · ${s.verification}`);
    console.log(`     前置（路线声明）：${s.prereqDeclared ? nm(s.prereqDeclared) + ' [' + s.prereqBasis + ']' : '—'}`
      + ` ｜ 地图 hard ${s.mapHard.length} · soft ${s.mapSoft.length} ｜ 相关 ${s.relatedCount} · 来源 ${s.supportCount}`
      + `（另有 ${s.relatedHiddenCount} 条共现/已否，默认不绘制）`);
    for (const h of s.mapHard) console.log(`       hard ← ${h.name}：${String(h.reason).slice(0, 40)}`);
    console.log(`     卡住回退：${s.fallback ? nm(s.fallback) : '—（起点，无回退）'}`);
  }
  for (const b of R.branches) {
    console.log(`  ⑂ ${b.afterName} 之后 · ${b.question}`);
    for (const o of b.options) console.log(`      [${o.role}] ${o.name} —— ${o.reason}`);
  }
}
console.log(fails.length ? `\n❌ 硬失败 ${fails.length}：\n` + fails.join('\n') : '\n✅ 路线配置合法（ID 全部存在 · 预算内 · 分支有理由）');
if (warns.length) console.log(`⚠ 提醒 ${warns.length}：\n` + warns.join('\n'));
console.log(`→ ${path.relative(ROOT, OUT)}`);
process.exit(fails.length ? 1 : 0);
