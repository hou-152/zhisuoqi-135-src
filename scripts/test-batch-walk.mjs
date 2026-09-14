#!/usr/bin/env node
// 批量走：把 76 个批量装配的学习单元，用**同一份 graph-runner** 逐个从头走一遍。
//   node scripts/test-batch-walk.mjs
//
// 每一步都是固定响应（modelMode: 'fixed'），**不调模型、不需要 serve**。
// 走的就是施工单 §2.4 那一条：
//   阅读 → 读中费曼（缺口）→ 补讲 → 只补那一处 → 回原活动 → 回阅读 → 三道决策（先答后反馈）
//   → 章末独立验收 → 应用核对 → 前进
//
// 它证明的是**连线与状态**：76 个单元都真的连成了一条能走通的路，且没有一个单元跳过流程边。
// 它**不**证明模型理解力，也**不**证明决策题的质量——题的质量由 scripts/review-gen-decisions.mjs
// 逐题独立复核（依据逐字 / 改写不照抄 / 同极性 / 三题三解 / 无捷径），这里只证明连线与状态。

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(import.meta.dirname, '..');
const DATA_REL = 'evidence/batch-units-260914/units.json';
const GRAPH_REL = 'knowledge/graph-260914/graph.json';
const R = require('./lib/graph-runner.js');

if (!fs.existsSync(path.join(ROOT, DATA_REL))) { console.log('先跑 node scripts/build-batch-units.mjs'); process.exit(1); }
if (!fs.existsSync(path.join(ROOT, GRAPH_REL))) { console.log('先跑 node scripts/build-graph.mjs'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(path.join(ROOT, DATA_REL), 'utf8'));
const g = JSON.parse(fs.readFileSync(path.join(ROOT, GRAPH_REL), 'utf8'));
const byNode = new Map(g.nodes.map((n) => [n.id, n]));
const edgeById = new Map(g.edges.map((e) => [e.id, e]));

let pass = 0, fail = 0;
const ok = (cond, label) => { if (cond) pass++; else { fail++; console.log(`  ✗ ${label}`); } };
const group = (t) => console.log(`\n${t}`);
const step = (id) => String(id).replace(/^activity:unit:[^:]+:/, '').replace(/^activity:/, '');
const short = (id) => String(id).replace('activity:unit:', '').replace('activity:', '');

const broken = [];    // 走不通的边：{ unit, at, event, reason }
const runs = [];      // 每个单元一次真实走查：{ bu, s, hops, problems, crit }
const KEY_STEPS = ['formative', 'support', 'return', 'formative', 'return', 'reading',
  'decision:1', 'review:1', 'decision:2', 'review:2', 'decision:3', 'review:3', 'summative', 'apply', 'advance'];

group('① 前置：76 个单元的材料、单元节点与活动骨架都在');
ok(data.units.length === 76, `批量单元 76 个（实际 ${data.units.length}）`);
const missing = [];
for (const bu of data.units) {
  const uid = `unit:${bu.unitId}`;
  if (!byNode.has(uid)) { missing.push(uid); continue; }
  for (const suffix of ['reading', 'formative', 'support', 'summative', 'apply', 'advance', 'return', 'resume', 'error', 'experiment']) {
    if (!byNode.has(`activity:${uid}:${suffix}`)) missing.push(`activity:${uid}:${suffix}`);
  }
  const acts = g.nodes.filter((n) => (n.meta || {}).unitId === uid);
  const dec = acts.filter((a) => a.kind === 'Decision');
  const rev = acts.filter((a) => a.kind === 'DecisionReview');
  if (dec.length !== 3 || rev.length !== 3) missing.push(`${uid} 决策活动 ${dec.length}/${rev.length}`);
  if (dec.some((a) => a.status !== 'ready')) missing.push(`${uid} 有未就绪的决策活动`);
}
ok(missing.length === 0, `76 个单元的活动骨架齐全、各带 3 个 ready 的决策活动（缺 ${missing.length}：${missing.slice(0, 3).join(' ')}）`);

/* ── 固定响应走查一个单元：预期路径逐跳写死 ── */
/* 任何一跳落到别处、走了别的守卫、或走的不是流程边，都记成问题；走不通则记进 broken。 */
function walkOne(bu) {
  const uid = `unit:${bu.unitId}`;
  const crit = (bu.feynman.checks || []).map((c) => c.id);
  const A = (s) => `activity:${uid}:${s}`;
  const verdicts = {}; for (const c of crit) verdicts[c] = 'met';
  const quotes = {}; for (const c of crit) quotes[c] = '用自己的话讲清了这一处';
  const steps = [
    ['explain', {}, A('formative'), 'always'],
    ['evaluated', { status: 'missing', criterionId: crit[0], criteria: [{ id: crit[0], status: 'missing', evidence: '这一处没讲清' }] }, A('support'), 'needSupport'],
    ['replied', { text: '只补这一处：它成立的条件是……不成立的情形是……', criteria: [{ id: crit[0], status: 'met', evidence: '把这一处补对了' }] }, A('return'), 'always'],
    ['returned', {}, A('formative'), 'targetIsFormative'],
    ['evaluated', { status: 'met', criteria: [{ id: crit[0], status: 'met', evidence: '这一处讲清了' }] }, A('return'), 'resolved'],
    ['returned', {}, A('reading'), 'targetIsReading'],
    ['proceed', {}, A('decision:1'), 'always'],
    ['answered', { choice: 0, correct: true }, A('review:1'), 'always'],
    ['reviewed', { status: 'met', gap: false }, A('decision:2'), 'hasNextDecision'],
    ['answered', { choice: 0, correct: true }, A('review:2'), 'always'],
    ['reviewed', { status: 'met', gap: false }, A('decision:3'), 'hasNextDecision'],
    ['answered', { choice: 0, correct: true }, A('review:3'), 'always'],
    ['reviewed', { status: 'met', gap: false }, A('summative'), 'practiceComplete'],
    ['assessed', { status: 'met', verdicts, quotes, attempt: { passed: true } }, A('apply'), 'summativePass'],
    ['applied', {}, A('advance'), 'formallyPassed'],
  ];
  const s = R.createSession({ graph: g, entry: { ref: A('reading') }, modelMode: 'fixed' });
  const hops = [];
  const problems = [];
  let evAfterReply = null, stackAfterReturn = null;
  if (s.current().kind !== 'Reading') problems.push(`入口不是阅读（${s.current().nodeId}）`);
  for (const [event, payload, wantTo, wantGuard] of steps) {
    const at = s.current().nodeId;
    const r = s.fire(event, payload);
    if (!r.ok) { broken.push({ unit: bu.unitId, at, event, reason: r.reason }); problems.push(`${short(at)} 上 ${event} 走不通：${r.reason}`); break; }
    const e = edgeById.get(r.edgeId);
    if (!e || e.kind !== 'transition') problems.push(`${short(at)} 上走的不是流程边（${r.edgeId}）`);
    if (r.guard !== wantGuard) problems.push(`${short(at)} 上 ${event} 走的守卫是 ${r.guard}，预期 ${wantGuard}`);
    if (r.to !== wantTo) problems.push(`${short(at)} 上 ${event} 走到了 ${short(r.to)}，预期 ${short(wantTo)}（跳过了流程边）`);
    hops.push({ event, from: at, to: r.to, guard: r.guard, effect: r.effect });
    // 只补那一处之后：学生原话必须已经进了证据账本（此时还没到章末验收）
    if (event === 'replied') evAfterReply = JSON.parse(JSON.stringify(s.state.evidenceByCriterion[crit[0]] || null));
    // 回原活动：补讲那一层必须被弹掉，栈里剩下的正是"发起补讲的那个活动"（这里是阅读中费曼）
    if (event === 'returned' && stackAfterReturn === null) stackAfterReturn = s.state.returnStack.map((x) => x.returnTo);
  }
  return { bu, s, hops, problems, crit, evAfterReply, stackAfterReturn };
}

group('② 批量走：76 个单元逐个走「阅读 → 费曼 → 补讲 → 只补一处 → 回原活动 → 章末验收 → 应用核对 → 前进」');
for (const bu of data.units) runs.push(walkOne(bu));
const failures = [];
let allPassed = 0;
for (const run of runs) {
  const { bu, s, hops, problems, crit } = run;
  if (hops.length === KEY_STEPS.length) {
    if (s.state.summativePassed !== true) problems.push('章末独立验收没有通过');
    const adv = byNode.get(hops[hops.length - 1].to);
    if (!adv || (adv.meta || {}).role !== 'advance') problems.push(`没有停在"前进"节点（${hops[hops.length - 1].to}）`);
    // 章末门是独立的：不带独立验收记录的一句"我讲清了"不许通过
    const s2 = R.createSession({ graph: g, entry: { ref: `activity:unit:${bu.unitId}:summative` }, modelMode: 'fixed' });
    const v = {}; for (const c of crit) v[c] = 'met';
    const bare = s2.fire('assessed', { status: 'met', verdicts: v });
    if (bare.ok && /apply|advance/.test(bare.to)) problems.push('不带独立验收记录的 met 也能过章末门');
    if (s2.state.summativePassed) problems.push('不带独立验收记录就写成了通过');
    if (s.state.unitPassed[`unit:${bu.unitId}`] !== true) problems.push('没有留下本单元的通过记录');
  }
  if (problems.length) failures.push({ unit: bu.unitId, problems }); else allPassed++;
}
ok(allPassed === 76, `76 个单元全部走通（通过 ${allPassed} · 失败 ${failures.length}）`);
for (const f of failures) console.log(`  ✗ ${f.unit}：\n      ` + f.problems.join('\n      '));
ok(broken.length === 0, `没有走不通的边（实际 ${broken.length} 条）`);
for (const b of broken) console.log(`  ✗ 走不通：${b.unit} 在 ${short(b.at)} 上 ${b.event} —— ${b.reason}`);

group('③ 没有单元跳过流程边：逐跳的落点、守卫与边都要能回图里查');
const seqBad = [], hopMissing = [], notTransition = [];
for (const run of runs) {
  const seq = run.hops.map((h) => step(h.to));
  if (seq.join('>') !== KEY_STEPS.join('>')) seqBad.push(`${run.bu.unitId}：${seq.join('>')}`);
  for (const k of ['formative', 'support', 'return', 'reading', 'decision:1', 'review:1', 'decision:2', 'review:2', 'decision:3', 'review:3', 'summative', 'apply', 'advance']) {
    if (!seq.includes(k)) hopMissing.push(`${run.bu.unitId} 少走了 ${k}`);
  }
  for (const h of run.hops) {
    const e = edgeById.get(`e:transition:${h.from}|${h.event}|${h.guard}|${h.to}`);
    if (!e || e.kind !== 'transition') notTransition.push(`${run.bu.unitId} ${short(h.from)} ${h.event}`);
  }
}
ok(runs.every((r) => r.hops.length === KEY_STEPS.length), `每个单元都是 ${KEY_STEPS.length} 跳（实际跳数集合：${[...new Set(runs.map((r) => r.hops.length))].sort((a, b) => a - b).join('/')}）`);
ok(seqBad.length === 0, `76 个单元的逐跳序列完全一致（不一致 ${seqBad.length}：${seqBad.slice(0, 2).join(' / ')}）`);
ok(hopMissing.length === 0, `每个单元都真的走过那 13 个关键活动（缺 ${hopMissing.length}）`);
ok(notTransition.length === 0, `每一跳都能在图里找到对应的流程边（找不到 ${notTransition.length} 跳：${notTransition.slice(0, 2).join(' ')}）`);

group('④ 走完之后的状态：通过记录、证据与日志都落在真实状态里');
let okState = 0, studentEv = 0, popped = 0, independentSummative = 0;
for (const run of runs) {
  const { bu, s, crit, evAfterReply, stackAfterReturn } = run;
  const uid = `unit:${bu.unitId}`;
  const first = crit[0];
  // 只补那一处之后：进账本的是**学生自己的原话**（source=student），不是模型的话
  if (evAfterReply && evAfterReply.status === 'met' && evAfterReply.source === 'student') studentEv++;
  // 补讲那一层被弹掉，栈里剩下的是"发起补讲的那个活动"（阅读中费曼从阅读来）
  if (stackAfterReturn && stackAfterReturn.join(',') === `activity:${uid}:reading`) popped++;
  // 章末验收是**独立**记录：它自己重判一遍，最终证据来源是 summative
  const finalEv = s.state.evidenceByCriterion[first];
  if (finalEv && finalEv.source === 'summative' && finalEv.attemptId) independentSummative++;
  const good = s.state.unitPassed[uid] === true && s.state.summativePassed === true
    && s.log.length === KEY_STEPS.length && s.log.every((l, i) => l.seq === i + 1)
    && s.log.every((l) => edgeById.get(l.edgeId) && edgeById.get(l.edgeId).kind === 'transition');
  if (good) okState++;
}
ok(studentEv === 76, `76 个单元"只补那一处"之后都留下学生原话证据（合格 ${studentEv}）`);
ok(independentSummative === 76, `76 个单元的最终判定都来自独立章末验收记录（合格 ${independentSummative}）`);
ok(popped === 76, `76 个单元补讲结束后都弹回"发起补讲的那个活动"（合格 ${popped}）`);
ok(okState === 76, `76 个单元走完后都留了通过记录与连续日志，且全程只走流程边（合格 ${okState}）`);

group('⑤ 决策题：接的是复核通过的那一份，不是补造的');
const REVIEW_REL = 'evidence/review-decisions-260914/review.json';
const DECISIONS_REL = 'evidence/gen-decisions-hybrid-v3-20260914.json';
const review = JSON.parse(fs.readFileSync(path.join(ROOT, REVIEW_REL), 'utf8'));
const decArt = JSON.parse(fs.readFileSync(path.join(ROOT, DECISIONS_REL), 'utf8'));
const verdictOf = new Map((review.units || []).map((r) => [r.unitId, r.verdict]));
const qsOf = new Map((decArt.units || []).map((u) => [u.unitId, u.questions || []]));
const fake = g.nodes.filter((n) => /^unit:batch-/.test((n.meta || {}).unitId || '') && (n.kind === 'Decision' || n.kind === 'DecisionReview'));
ok(fake.length === 456, `批量单元下 456 个决策活动（76 × 3 题 × 答/反馈；实际 ${fake.length}）`);
const wiredBad = data.units.filter((u) => JSON.stringify(u.decisions || []) !== JSON.stringify(qsOf.get(u.unitId) || []) || verdictOf.get(u.unitId) !== 'usable');
ok(wiredBad.length === 0, `76 个单元接的都是复核 verdict=usable 的那 3 道（不符 ${wiredBad.length}）`);
ok(g.stats.byKind.Decision === 251, `全图决策题 251 道（六章 18 + 单篇 3 + 夹具 2 + 批量 228；实际 ${g.stats.byKind.Decision}）`);
ok(review.verdict === 'usable' && (review.recomputed || {}).usableQuestions === 228, '复核总判定 usable，228 道全过');

console.log(`\n批量走：${allPassed} 个通过 · ${failures.length} 个失败 · 走不通的边 ${broken.length} 条`);
console.log(`  · 逐跳序列（76 个单元一致）：阅读 → ${runs[0].hops.map((h) => step(h.to)).join(' → ')}`);
console.log('  · 全程固定响应（modelMode=fixed），不调模型；只证明连线与状态，不证明模型理解力');
console.log(`\n通过 ${pass} · 失败 ${fail}`);
process.exit(fail ? 1 : 0);
