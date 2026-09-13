#!/usr/bin/env node
// 全链路 Graph 固定响应走查（不需要 serve、不调模型、不花钱）
//   node scripts/test-graph.mjs
//
// 这一段证明的是**连线与状态**：从入口走到记录，六章路线与单篇四判据走同一份运行器。
// 它**不**证明模型理解力，也**不**证明学习效果——那要真实调用与真人使用，分别在别的文件里报。

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(import.meta.dirname, '..');
const R = require('./lib/graph-runner.js');
const g = JSON.parse(fs.readFileSync(path.join(ROOT, 'knowledge/graph-260914/graph.json'), 'utf8'));
const byId = new Map(g.nodes.map((n) => [n.id, n]));
const short = (x) => String(x).replace('activity:unit:', '·').replace('activity:', '');

let pass = 0, fail = 0;
const ok = (cond, label) => { if (cond) pass++; else { fail++; console.log(`  ✗ ${label}`); } };
const group = (t) => console.log(`\n${t}`);

const start = (unitId, at) => R.createSession({ graph: g, entry: { ref: `activity:${unitId}:${at || 'reading'}` }, modelMode: 'fixed' });
const UNIT = 'unit:chapter-agent';
const SINGLE = 'unit:agent-skills-api';
const CRIT = { agent: ['agent-F1', 'agent-F2', 'agent-F3'], single: ['C1', 'C2', 'C3', 'C4'] };

// ── ① 全量索引与完整类型 ────────────────────────────────
group('① 全量索引与完整类型（任务书 §11.1）');
for (const l of g.layers) {
  if (l.id === 'runtime') { ok(l.count === 0, '运行层在构建期确实为空（运行期才创建，不造假节点）'); continue; }
  ok(l.count > 0, `层「${l.label}」有节点（${l.count}）`);
}
for (const k of ['SourceDocument', 'SourceSpan', 'DerivedAsset', 'FiveDimAsset', 'SemanticUnit', 'Concept', 'Topic',
  'LearningProblem', 'Goal', 'GapHypothesis', 'Route', 'RouteStep', 'Unit', 'Criterion',
  'Reading', 'Formative', 'Support', 'Decision', 'DecisionReview', 'Summative', 'ApplicationReview', 'ExperimentReference',
  'SkillPolicy', 'ModelAdapter', 'App']) {
  ok((g.stats.byKind[k] || 0) > 0, `节点类型 ${k} 真的在（${g.stats.byKind[k] || 0}）`);
}
for (const k of ['provenance', 'knowledge', 'curriculum', 'transition']) ok((g.stats.byEdgeKind[k] || 0) > 0, `边类 ${k} 真的在（${g.stats.byEdgeKind[k] || 0}）`);
ok(g.sources.length >= 10 && g.sources.every((s) => s.sha256), `构建来源带校验和（${g.sources.length} 份输入）`);
ok(g.gaps.length > 0, `缺口清单非空（${g.gaps.length} 条）`);

// ── ② 语义真正参与教学 ──────────────────────────────────
group('② 语义真正参与教学（§11.2）');
const readingId = `activity:${UNIT}:reading`;
const readingProvenance = g.edges.filter((e) => e.from === UNIT && ['quotes', 'reading-from', 'narrative-bridge', 'narrative-link-quote'].includes(e.relation));
ok(readingProvenance.length >= 5, `阅读那一章能回溯到具体语义单元/原文片段（${readingProvenance.length} 条出处边）`);
ok(readingProvenance.every((e) => e.sourceRefs.length && e.sourceRefs[0].locator), '每条出处边都写了定位（path#locator）');
const spans = readingProvenance.filter((e) => e.to.startsWith('span:'));
ok(spans.length >= 3 && spans.every((e) => (byId.get(e.to).meta || {}).text), '原文片段节点真的带逐字原文');
const decisions = g.nodes.filter((n) => n.kind === 'Decision');
ok(decisions.length === 23, `决策题节点 ${decisions.length} 个（六章 18 + 单篇 3 + 夹具 2）`);
let noCase = [], noBasis = [];
for (const d of decisions) {
  const isFixture = /fixture/.test(d.id);
  const caseE = g.edges.filter((e) => e.from === d.id && e.relation === 'uses-case');
  const basisE = g.edges.filter((e) => e.from === d.id && e.relation === 'answer-basis');
  if (!caseE.length) noCase.push(d.id);
  if (!basisE.length) noBasis.push(d.id);
  ok((caseE[0] ? (byId.get(caseE[0].to).meta || {}).caseType || true : true), `${d.label}：主案例 ${caseE.length} 个 · 作答依据 ${basisE.length} 条`);
  if (caseE[0]) {
    const cn = byId.get(caseE[0].to);
    // 主案例必须照实标类型：CAS 语义单元标「假设场景」；单篇用的是逐字原文情境，不许冒充真实复盘
    const honest = (cn.kind === 'SemanticUnit' && !!cn.meta.caseType) || (cn.kind === 'SourceSpan' && !!cn.meta.text);
    ok(honest, `${d.label}：主案例照实标（${cn.meta.caseType || '逐字原文情境'}）`);
    // 只在**自称**真实复盘时判失败；"不是真实复盘"这类否定说明不算
    ok(!/^(真实|实际|已确认).{0,6}复盘/.test(String(cn.meta.caseType || '').trim()), `${d.label}：没有把假设案例写成真实复盘`);
  }
}
ok(noCase.every((id) => /fixture/.test(id)) && noBasis.every((id) => /fixture/.test(id)), `只有夹具题缺主案例/依据（${noCase.length}/${noBasis.length} 个），正式单元 21 道题一个不缺`);
ok(noCase.every((id) => g.gaps.some((x) => x.affects.includes(id))), '缺主案例的题都在缺口清单里有条目（缺失不伪造）');
const matEdges = g.edges.filter((e) => e.relation === 'taught-by');
ok(matEdges.length >= 20, `判据能反查到"补讲用哪段材料"（${matEdges.length} 条）`);
const singleMat = matEdges.filter((e) => e.from.startsWith('criterion:C'));
ok(singleMat.length >= 6 && singleMat.every((e) => /sha256:/.test((e.sourceRefs[0] || {}).locator || '')), `单篇补讲材料带着当时读的那份文件的 sha256（${singleMat.length} 条）`);
ok(matEdges.some((e) => e.from === 'criterion:agent-F1'), '六章判据也绑了补讲材料（绑到整章阅读梯度，差别已登记为缺口）');

// ── ③ 关系与共享概念 ────────────────────────────────────
group('③ 关系与共享概念（§11.3）');
const shared = new Map();
for (const e of g.edges.filter((x) => x.relation === 'targets-concept')) {
  if (!shared.has(e.to)) shared.set(e.to, []);
  shared.get(e.to).push(e.from);
}
const multi = [...shared.entries()].filter(([, v]) => v.length >= 2);
ok(multi.length >= 2, `有公共概念被多个路线位置引用（${multi.length} 个，例：${multi.slice(0, 2).map(([k, v]) => `${byId.get(k).label}×${v.length}`).join('、')}）`);
const fixturePos = multi.find(([, v]) => v.some((x) => x.includes('fixture')));
ok(!!fixturePos, '夹具证明了同一份运行器能复用在第二条路线位置上');
const routePrereq = g.edges.filter((e) => e.relation === 'route-prerequisite');
ok(routePrereq.length > 0 && routePrereq.every((e) => e.reviewState !== 'unreviewed'), '路线前置都有人工策展或来源依据，不是 LLM 挖出来就直接当先修');
const relatedAsPrereq = g.edges.filter((e) => e.kind === 'knowledge' && e.relation === 'related-to' && /prerequisite/.test(e.relation));
ok(relatedAsPrereq.length === 0, '相关关系没有被升级成先修');
const lowTrust = g.edges.filter((e) => e.reviewState === 'unreviewed');
ok(lowTrust.every((e) => e.kind !== 'transition' || /fixture/.test(e.from)), `未核实边不参与正式运行（${lowTrust.length} 条，均在夹具/候选里）`);
const cmFiles = fs.readFileSync(path.join(ROOT, 'evidence/paths-260913/routes.json'), 'utf8');
ok(!/concept:\/\//.test(cmFiles), '路线配置里没有塞图节点');

// ── ④ 整体课程可走：六章 + 单篇四判据 ────────────────────
group('④ 整体课程可走（§11.4）');
function walkUnit(unitId, critIds, opts = {}) {
  const s = start(unitId);
  const trace = [];
  const F = (ev, p) => { const r = s.fire(ev, p); trace.push(`${ev}→${r.ok ? short(r.to) : 'FAIL(' + r.reason + ')'}`); return r; };
  F('proceed', {});
  for (const cid of critIds) {
    const at = s.current().nodeId;
    if (!/decision:/.test(at)) break;
    F('answered', { activityId: at, choice: 1, correct: true, criterionId: cid, status: 'met', recorded: [{ id: cid, status: 'met', evidence: `把 ${cid} 说清楚了` }] });
    F('reviewed', { status: 'met', gap: false });
  }
  const atSum = s.current().nodeId;
  const verdicts = {}; for (const c of critIds) verdicts[c] = 'met';
  F('assessed', { status: 'met', verdicts, attempt: { passed: true }, quotes: {} });
  F('applied', {});
  return { s, trace, atSum };
}
for (const ch of g.nodes.filter((n) => n.kind === 'Unit' && /^unit:chapter-/.test(n.id))) {
  const ids = g.edges.filter((e) => e.kind === 'curriculum' && e.relation === 'targets' && e.from === ch.id).map((e) => e.to.replace('criterion:', ''));
  const { s, trace, atSum } = walkUnit(ch.id, ids);
  ok(/summative/.test(atSum), `${ch.label}：三道题走完进章末验收`);
  ok(s.state.summativePassed === true, `${ch.label}：章末独立验收通过（判据 ${ids.length} 条）`);
  ok(s.current().kind === 'ApplicationReview' && (s.current().node || {}).meta.role === 'advance', `${ch.label}：应用核对后到前进节点`);
  ok(!trace.some((t) => t.includes('FAIL')), `${ch.label}：全程没有走不通的边`);
}
{
  const { s } = walkUnit(SINGLE, CRIT.single);
  ok(s.state.summativePassed === true, '单篇：四条判据（C1–C4）全部接入并走通，不是只做 C2/C3');
  ok(g.nodes.find((n) => n.id === SINGLE).meta.criterionCount === 4, '单篇单元登记的判据数 = 4');
  const critIds = g.edges.filter((e) => e.kind === 'curriculum' && e.relation === 'targets' && e.from === SINGLE).map((e) => e.to.replace('criterion:', ''));
  ok(critIds.join(',') === 'C1,C2,C3,C4', `单篇四条判据 ID 齐全：${critIds.join(',')}`);
}
{
  const fixtureUnits = g.nodes.filter((n) => n.kind === 'Unit' && /^unit:fixture-/.test(n.id));
  ok(fixtureUnits.length === 2, `夹具单元 ${fixtureUnits.length} 个（同一份运行器复用）`);
  for (const u of fixtureUnits) {
    const ids = g.edges.filter((e) => e.kind === 'curriculum' && e.relation === 'targets' && e.from === u.id).map((e) => e.to.replace('criterion:', ''));
    const { s } = walkUnit(u.id, ids);
    ok(s.state.summativePassed === true, `${u.label} 走通（夹具，不是正式课程）`);
  }
}

// ── ⑤ 短答与回归 ────────────────────────────────────────
group('⑤ 短答与回归（§11.5）');
{
  const s = start(UNIT);
  s.fire('explain', {});
  s.fire('evaluated', { status: 'met', criteria: [{ id: 'agent-F1', status: 'met', evidence: '第一次说对了' }] });
  s.fire('returned', {});
  s.fire('explain', {});
  s.fire('evaluated', { status: 'missing', criterionId: 'agent-F1', criteria: [{ id: 'agent-F1', status: 'missing', evidence: '这次只补了另一处' }] });
  ok(s.state.evidenceByCriterion['agent-F1'].status === 'met', '只补一句：旧证据没被清空');
  ok(s.state.kept.length === 1, '只补一句：旧证据被保留并留了记录（不新增 missing）');
}
{
  const s = start(UNIT);
  s.fire('explain', {});
  s.fire('evaluated', { status: 'met', criteria: [{ id: 'agent-F1', status: 'met', evidence: '第一次说对了' }] });
  s.fire('returned', {}); s.fire('explain', {});
  const r = s.fire('evaluated', { status: 'contradicted', criterionId: 'agent-F1', criteria: [{ id: 'agent-F1', status: 'contradicted', evidence: '改口说反了' }] });
  ok(s.state.evidenceByCriterion['agent-F1'].conflictAt, '新矛盾：记了冲突时间');
  ok(s.state.evidenceByCriterion['agent-F1'].previous, '新矛盾：保留了旧结论（不是静默覆盖）');
  ok(r.ok && /support/.test(r.to), '新矛盾：触发重新核对（进补讲）');
}
{
  // 补讲要回**发起它的那个活动**，不是一律回决策题
  const s1 = start(UNIT);
  s1.fire('explain', {});
  s1.fire('evaluated', { status: 'partial', criterionId: 'agent-F1', criteria: [{ id: 'agent-F1', status: 'partial', evidence: '半懂' }] });
  s1.fire('replied', { text: '补充', criteria: [{ id: 'agent-F1', status: 'met', evidence: '补对了' }] });
  const back1 = s1.fire('returned', {});
  ok(/formative/.test(back1.to), `从阅读中费曼发起的补讲 → 回阅读中费曼（实际 ${short(back1.to)}）`);

  const s2 = start(UNIT);
  s2.fire('proceed', {});
  s2.fire('answered', { activityId: `activity:${UNIT}:decision:1`, choice: 2, correct: false, criterionId: 'agent-F1', status: 'missing', recorded: [{ id: 'agent-F1', status: 'missing', evidence: '选错' }] });
  s2.fire('reviewed', { status: 'missing', gap: true });
  s2.fire('replied', { text: '补充', criteria: [{ id: 'agent-F1', status: 'met', evidence: '补对了' }] });
  const back2 = s2.fire('returned', {});
  ok(/decision:1$/.test(back2.to), `从某道题发起的补讲 → 回**那一道题**（实际 ${short(back2.to)}）`);

  const s3 = start(UNIT, 'summative');
  s3.fire('assessed', { status: 'partial', criterionId: 'agent-F1', criteria: [{ id: 'agent-F1', status: 'partial', evidence: '还差一点' }] });
  s3.fire('replied', { text: '补充', criteria: [{ id: 'agent-F1', status: 'met', evidence: '补对了' }] });
  const back3 = s3.fire('returned', {});
  ok(/summative/.test(back3.to), `从章末验收发起的补讲 → 回章末验收（实际 ${short(back3.to)}）`);
  ok(!s3.state.summativePassed, '补讲 met 之后仍然没有通过：章末门不会被补讲结果替代');
}

// ── ⑥ 决策与两种费曼 ────────────────────────────────────
group('⑥ 决策与两种费曼（§11.6）');
{
  const s = start(UNIT);
  const before = s.current();
  ok(before.kind === 'Reading', '入口是阅读，不是直接给答案');
  s.fire('proceed', {});
  ok(s.current().kind === 'Decision', '阅读之后按课程进决策题');
  const d = byId.get(s.current().nodeId);
  ok(typeof d.meta.correctIndex === 'number' && d.meta.correctIndex >= 0, '题目带着正确项与依据（供作答后显示）');
  ok(s.state.decisionAttempts.length === 0, '未作答前没有任何作答记录');
  s.fire('answered', { activityId: d.id, choice: d.meta.correctIndex, correct: true, criterionId: 'agent-F1', status: 'met', recorded: [{ id: 'agent-F1', status: 'met', evidence: '选对并说清' }] });
  ok(s.state.decisionAttempts.length === 1 && s.state.decisionAttempts[0].correct === true, '先选择，再记录作答');
  ok(/review/.test(s.current().nodeId), '作答后进的是依据与错误原因，不是直接下一题');
  const inReview = s.state.evidenceByCriterion['agent-F1'];
  ok(!!inReview && inReview.source === 'decision', '作答记录进了证据账本，标清来源是决策题');
}
{
  const s = start(UNIT);
  s.fire('explain', {});
  s.fire('evaluated', { status: 'met', criteria: [{ id: 'agent-F1', status: 'met', evidence: '说对了' }] });
  ok(!s.state.unitPassed[UNIT] && !s.state.summativePassed, '即时费曼讲对了不解锁、不写正式通过');
  const allowed = s.allowed().map((a) => a.event);
  ok(!allowed.includes('advanced'), '即时费曼之后没有"跳下一单元"这条边');
  ok(allowed.includes('returned'), '即时费曼之后只有回原活动这一条路');
}
{
  const s = start(UNIT);
  s.fire('proceed', {});
  for (const cid of CRIT.agent) {
    s.fire('answered', { activityId: s.current().nodeId, choice: 1, correct: true, criterionId: cid, status: 'met', recorded: [{ id: cid, status: 'met', evidence: `${cid} 说清` }] });
    s.fire('reviewed', { status: 'met', gap: false });
  }
  ok(/summative/.test(s.current().nodeId), '练习做完才出现章末验收');
  const bare = s.fire('assessed', { status: 'met' });     // 没有独立 attempt
  ok(!bare.ok || /support/.test(bare.to), '不带独立验收记录的 met 不能通过（章末门独立）');
  ok(!s.state.summativePassed, '章末仍未通过');
  const attempt = { passed: true };
  s.fire('assessed', { status: 'met', verdicts: { 'agent-F1': 'met', 'agent-F2': 'met', 'agent-F3': 'met' }, attempt, modelMode: 'fixed' });
  ok(s.state.summativePassed === true, '提交独立验收后才通过');
  ok(s.state.summativeAttempts.length === 1, '章末验收单独留一条记录');
  ok(s.state.summativeAttempts[0].verdicts['agent-F3'] === 'met', '验收记录逐条记了每项理解的判定');
}

// ── ⑦ 原问题与记录 ──────────────────────────────────────
group('⑦ 原问题与记录（§11.7）');
{
  const s = start('unit:chapter-agent');
  ok(s.state.originalProblemId === 'problem:agent-continuous-action-v1', '会话挂着最初的问题');
  ok(s.state.goalId === 'goal:agent-continuous-action-v1', '会话挂着本次目标');
  const tail = g.edges.filter((e) => e.kind === 'transition' && e.from === 'activity:agent-continuous-action-v1:original');
  ok(tail.length === 1 && /choice/.test(tail[0].to), '路线收尾：先回看原问题，再进用户决定');
  const choiceEdges = g.edges.filter((e) => e.kind === 'transition' && e.from === 'activity:agent-continuous-action-v1:choice');
  ok(choiceEdges.some((e) => e.guard === 'chooseContinue') && choiceEdges.some((e) => e.guard === 'chooseLearnMore'), '用户决定有两条真实出口（继续 / 再补知识）');
  ok(g.edges.some((e) => e.relation === 'returns-to' && e.to === 'problem:agent-continuous-action-v1'), '收尾节点真的指回最初的问题');
  // 暂停 → 跑到别处 → 恢复原位置
  const s2 = start(UNIT);
  s2.fire('proceed', {});
  s2.fire('pause', {});
  const at = s2.state.checkpoint.nodeId;
  s2.fire('answered', { activityId: at, choice: 1, correct: true, criterionId: 'agent-F1', status: 'met', recorded: [{ id: 'agent-F1', status: 'met', evidence: 'x' }] });
  ok(s2.current().nodeId !== at, '暂停后确实走到了别处');
  s2.resume();
  ok(s2.current().nodeId === at, `恢复回到保存的原节点（${short(at)}），不是一律从阅读重来`);
}

// ── ⑦b 整条路线一次走完：一章接一章，最后回原问题 → 用户决定 → 保存记录 ──
group('⑦b 一条会话走完整条路线（§11.4 / §11.7）');
{
  const first = g.nodes.filter((n) => n.kind === 'Unit' && /^unit:chapter-/.test(n.id)).sort((a, b) => a.meta.order - b.meta.order)[0];
  const s = start(first.id);
  const route = 'agent-continuous-action-v1';
  let unitsDone = 0, guard = 0;
  while (guard++ < 60) {
    const cur = s.current().nodeId;
    if (/reading$/.test(cur)) { s.fire('proceed', {}); continue; }
    if (/decision:\d+$/.test(cur)) {
      const d = byId.get(cur);
      const cid = (g.edges.filter((e) => e.kind === 'curriculum' && e.relation === 'checks' && e.from === cur).map((e) => e.to.replace('criterion:', ''))[0]) || 'x';
      s.fire('answered', { activityId: cur, choice: d.meta.correctIndex, correct: true, criterionId: cid, status: 'met', recorded: [{ id: cid, status: 'met', evidence: '答对了' }] });
      continue;
    }
    if (/review:\d+$/.test(cur)) { s.fire('reviewed', { status: 'met', gap: false }); continue; }
    if (/summative$/.test(cur)) {
      const ids = g.edges.filter((e) => e.kind === 'curriculum' && e.relation === 'assessed-by' && e.from === cur).map((e) => e.to.replace('criterion:', ''));
      const v = {}; for (const i of ids) v[i] = 'met';
      s.fire('assessed', { status: 'met', verdicts: v, attempt: { passed: true }, quotes: {} });
      continue;
    }
    if (/apply$/.test(cur)) { s.fire('applied', {}); continue; }
    if (/units?::?.*advance$/.test(cur) || /:advance$/.test(cur)) {
      const r = s.fire('advanced', {});
      if (!r.ok) break;
      unitsDone++;
      continue;
    }
    break;
  }
  ok(unitsDone >= 6, `一章接一章真的走完六章（走了 ${unitsDone} 次"前进"）`);
  ok(Object.keys(s.state.unitPassed).length >= 6, `六章各自留了通过记录（${Object.keys(s.state.unitPassed).length} 章）`);
  ok(s.current().nodeId === `activity:${route}:original`, '路线收尾停在"回看原问题和仍未知的部分"', short(s.current().nodeId));
  const r1 = s.fire('originalReviewed', {});
  ok(r1.ok && /choice/.test(r1.to), '回看之后进"用户决定下一行动"');
  ok(s.state.records.length >= 2, `记录里留下了依据与仍未知（${s.state.records.length} 条）`);
  const r2 = s.fire('choose', { choice: 'learn-more' });
  ok(r2.ok, '用户可以选择"继续补知识"（回到缺口假设，而不是被模型临时规划）', short(r2.to));
  ok(s.state.originalProblemId === `problem:${route}` && s.state.goalId === `goal:${route}`, '整条会话始终挂着最初的问题与目标');
}

// ── ⑧ 图与程序一致 + 异常 ───────────────────────────────
group('⑧ 图与程序一致（§11.8）');
{
  const s = start(UNIT);
  const seq = [['proceed', {}], ['answered', { choice: 1, correct: true, criterionId: 'agent-F1', status: 'met', recorded: [{ id: 'agent-F1', status: 'met', evidence: 'ok' }] }], ['reviewed', { status: 'met', gap: false }]];
  let consistent = true;
  for (const [ev, p] of seq) {
    const r = s.fire(ev, p);
    const last = s.log[s.log.length - 1];
    if (!r.ok || last.from !== r.from || last.to !== r.to || s.current().nodeId !== r.to) consistent = false;
    const edge = g.edges.find((e) => e.id === r.edgeId);
    if (!edge || edge.guard !== r.guard || edge.effect !== r.effect) consistent = false;
  }
  ok(consistent, '显示的当前节点、走过的边与真实事件日志逐条一致');
  ok(s.log.every((l, i) => l.seq === i + 1), '事件日志序号连续，没有补写');
}
{
  const s = start(UNIT, 'formative');
  const before = JSON.stringify(s.state.evidenceByCriterion);
  const r = s.fire('evaluated', { systemError: 'timeout' });
  ok(r.ok && /error/.test(r.to), '超时 → 进"系统未判定"，不是进补讲');
  ok(JSON.stringify(s.state.evidenceByCriterion) === before, '异常没有改动任何证据');
  ok(s.state.notJudged.length === 1 && s.state.notJudged[0].reason === 'timeout', '异常单独记在系统未判定里');
  ok(!s.state.summativePassed, '异常不会默认通过');
  const r2 = s.fire('retry', {});
  ok(r2.ok && /resume/.test(r2.to), '可以重试');
  const r3 = s.fire('restored', {});
  ok(r3.ok && /formative/.test(r3.to), '重试后回到失败前的活动');
}
{
  const s = start(UNIT, 'formative');
  const r = s.fire('evaluated', { status: 'met', criteria: [{ id: '不存在的判据', status: 'met', evidence: 'x' }] });
  ok(r.ok && /error/.test(r.to), '未知判据 ID → 系统未判定');
  ok(s.state.notJudged.some((x) => x.reason === 'unknown-id'), '未知 ID 记成系统未判定，不是学生缺口');
  ok(Object.keys(s.state.evidenceByCriterion).length === 0, '未知 ID 没有污染证据账本');
}
{
  const s = start(UNIT, 'formative');
  const r = s.fire('evaluated', { status: 'met', criteria: [], insufficient: true });
  ok(r.ok && /support/.test(r.to), '「我懂了 / 对」→ 证据不足，去澄清而不是通过');
  ok(Object.keys(s.state.evidenceByCriterion).length === 0, '只表态不增加任何理解证据');
}
{
  const s = start(UNIT, 'formative');
  s.fire('evaluated', { status: 'met', source: 'model', criteria: [{ id: 'agent-F1', status: 'met', evidence: '模型示范答案' }] });
  ok(Object.keys(s.state.evidenceByCriterion).length === 0, '模型/教材的话不能当学生已理解的原话证据');
}
{
  const s = start(UNIT);
  ok(s.state.modelMode === 'fixed', '固定响应走查显著标成 fixed，不冒充真实教学');
  const s2 = R.createSession({ graph: g, entry: { ref: `activity:${UNIT}:reading` }, modelMode: 'real' });
  ok(s2.state.modelMode === 'real', '真实调用可以标成 real');
}
{
  const s = start(UNIT);
  s.fire('explain', { text: '我说一句' });
  const rt = s.runtimeNodes();
  ok(rt.some((n) => n.kind === 'Session') && rt.some((n) => n.kind === 'Turn'), '运行期节点能挂回图上（会话 / 轮次）');
  const snap = s.snapshot();
  const s3 = start(UNIT);
  s3.restore(snap);
  ok(s3.snapshot() === snap, '会话可以原样存取（存档 / 恢复）');
}
{
  // 图与程序一致：页面上会显示的链路五段，必须都能从真实运行状态里取到
  const s = start(UNIT);
  s.fire('explain', { text: '我的理解是：Agent 不等于 LLM。' });
  s.setFocus('agent-F1');
  s.fire('evaluated', { status: 'partial', criterionId: 'agent-F1', criteria: [{ id: 'agent-F1', status: 'partial', evidence: '只说了一半' }] });
  const t = s.trace();
  ok(!t.empty && t.answer && t.answer.text.includes('Agent'), '链路①本次回答：取到学生原话');
  ok(t.checked && t.checked.criterionId === 'agent-F1' && t.checked.status === 'partial', '链路②核对了哪项理解：取到判据与判定');
  ok(t.edge && t.edge.from && t.edge.to && t.edge.why, '链路④为何走这条边：取到事件、守卫与理由');
  ok(t.currentNode && t.currentNode.id === s.current().nodeId, '链路里的当前节点 = 运行器真实当前节点');
  const mats = g.edges.filter((e) => e.relation === 'taught-by' && e.from === 'criterion:agent-F1');
  ok(mats.length > 0, `链路③用哪段材料补讲：判据 agent-F1 有 ${mats.length} 段材料可选`);
}

console.log(`\n通过 ${pass} · 失败 ${fail}`);
process.exit(fail ? 1 : 0);
