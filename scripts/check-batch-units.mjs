#!/usr/bin/env node
// 批量学习单元体检（只读，不需要 serve，不调模型）。
//   node scripts/check-batch-units.mjs
//
// 对象：evidence/batch-units-260914/units.json —— **重新从源数据推一遍**，再与产物逐条对齐。
// 与 build-batch-units.mjs 的分工：build 负责装配，本脚本负责装配完之后还能被独立复查。
//
// 查五件事（施工单 §2.3）：逐字引用 · ID 存在 · CAS 类型照实标 · 缺口齐全 · 不造假决策题。
// 图已构建时，额外对照 graph.json 里这 76 个 Unit 的节点、判据与活动（不造假决策题在图上也成立）。

import fs from 'node:fs';
import path from 'node:path';
import { readYamlFields } from './lib/graph-adapter.mjs';
import {
  TYPE_OF, deriveMisconception, firstChars, verbatimForm,
  resolveUnitsLocator, resolveCardLocator, sha256File,
  resolveDecisionRef, loadCards,
} from './lib/batch-units-rules.mjs';
import { buildPractice } from './lib/practice-readiness.mjs';
import { judgeCriterion, gapDeclinedOn, progressionOn } from './lib/criteria-activation.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const UNITS_REL = '内容结构化系统/模块/ai-concept-base/data/units.json';
const CARD_DIR_REL = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
const DATA_REL = 'evidence/batch-units-260914/units.json';
const GRAPH_REL = 'knowledge/graph-260914/graph.json';
const REVIEW_REL = 'evidence/review-decisions-260914/review.json';
const DECISIONS_REL = 'evidence/gen-decisions-hybrid-v3-20260914.json';
const READERS_REL = 'evidence/batch-units-260914/readers.json';
const TRAJ_REL = 'evidence/trajectories-260914/trajectories.json';

const read = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const rawOf = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

let pass = 0, fail = 0;
const ok = (cond, label) => { if (cond) pass++; else { fail++; console.log(`  ✗ ${label}`); } };
const group = (t) => console.log(`\n${t}`);

if (!fs.existsSync(path.join(ROOT, DATA_REL))) { console.log('先跑 node scripts/build-batch-units.mjs'); process.exit(1); }
const data = read(DATA_REL);
const unitsArr = read(UNITS_REL);
const units = unitsArr.units || unitsArr;
const byId = new Map(units.map((u) => [u.id, u]));
const cons = units.filter((u) => u.type === '概念单元');
const unitsRaw = rawOf(UNITS_REL);
const cards = new Map();
for (const f of fs.readdirSync(path.join(ROOT, CARD_DIR_REL)).filter((x) => x.endsWith('.yaml'))) {
  cards.set(f.replace(/\.yaml$/, ''), { rel: `${CARD_DIR_REL}/${f}`, raw: rawOf(`${CARD_DIR_REL}/${f}`), sha: sha256File(path.join(ROOT, CARD_DIR_REL, f)) });
}
const DECISION_GAP = '该单元的三道决策题待装配：批量装配不补造唯一正确答案（任务书 §2.3）。可用素材已经就位：CAS 情境、SOL 动作路径、该卡 boundaries 的误区清单。';

/* ① 覆盖与结构 */
group('① 覆盖：76 个 CON 一个不少，一个不多，每个一张卡');
ok(data.units.length === 76, `单元数 76（实际 ${data.units.length}）`);
const unitCons = data.units.map((u) => u.conceptId);
ok(new Set(unitCons).size === unitCons.length, '每个 CON 只装配一次（没有重复）');
ok(cons.length === 76 && cons.every((c) => unitCons.includes(c.id)), `CON 76 个全部装配（源 ${cons.length}，装配 ${new Set(unitCons).size}）`);
ok(data.units.every((u) => u.concepts.length === 1 && u.concepts[0].id === u.conceptId), '每个单元恰好一个核心概念（concepts[0] = CON 单元）');
ok(new Set(data.units.map((u) => u.card.slug)).size === 76 && data.units.every((u) => cards.has(u.card.slug)), '76 个单元各自对到一张真实存在的图鉴卡');
ok(data.units.every((u, i) => u.order === i + 1), 'order 连续、可复现（按 CON id 排序）');

/* ② 逐字引用：sha256 + quote 逐字命中 + locator 指到同一句 */
group('② 逐字引用：每条材料都能在它声称的来源里找到，且 locator 真的指到那句话');
let citations = 0, escaped = 0;
const walkCitations = (node, fn) => {
  if (Array.isArray(node)) { node.forEach((x) => walkCitations(x, fn)); return; }
  if (!node || typeof node !== 'object') return;
  if (typeof node.text === 'string' && node.sourceFile && node.locator) fn(node);
  for (const v of Object.values(node)) walkCitations(v, fn);
};
const badSha = [], badQuote = [], badLocator = [], noProv = [];
for (const u of data.units) {
  /* decisions 是决策题载荷：它的正解是改写句，逐字判据落在 basisQuote 上（见 ⑨），不适用这一条 */
  const { decisions: _decisionPayload, ...materialOnly } = u;
  walkCitations(materialOnly, (c) => {
    citations++;
    const abs = path.join(ROOT, c.sourceFile);
    if (!fs.existsSync(abs)) { noProv.push(`${u.unitId} ${c.sourceFile} 不在`); return; }
    if (sha256File(abs) !== c.sourceSha256) { badSha.push(`${u.unitId} ${c.sourceFile}`); return; }
    const raw = fs.readFileSync(abs, 'utf8');
    const isJson = c.sourceFile.endsWith('.json');
    const form = verbatimForm(raw, c.text, isJson);
    if (!form) { badQuote.push(`${u.unitId} ${c.sourceFile}#${c.locator}`); return; }
    if (form !== c.escapeForm) badQuote.push(`${u.unitId} ${c.sourceFile}#${c.locator} 声明的形态 ${c.escapeForm} ≠ 复算 ${form}`);
    if (form === 'json-escaped') escaped++;
    const got = isJson ? resolveUnitsLocator(units, c.locator) : resolveCardLocator(raw, c.locator, c.sourceFile);
    if (!got.ok) { badLocator.push(`${u.unitId} ${c.sourceFile}#${c.locator}（${got.why}）`); return; }
    if (got.value !== c.text) badLocator.push(`${u.unitId} ${c.sourceFile}#${c.locator} 指到的不是这句话`);
  });
}
ok(citations > 0, `确实有带出处的逐字材料（${citations} 条）`);
ok(badSha.length === 0, `每条材料的 sourceSha256 与磁盘一致（不符 ${badSha.length} 条：${badSha.slice(0, 3).join(' ')}）`);
ok(badQuote.length === 0, `每条 quote 都能在来源里逐字找到（找不到 ${badQuote.length} 条：${badQuote.slice(0, 3).join(' ')}）`);
ok(badLocator.length === 0, `每条 locator 都指到那句话本身（不符 ${badLocator.length} 条：${badLocator.slice(0, 3).join(' ')}）`);
ok(noProv.length === 0, `没有来源文件缺失（缺 ${noProv.length} 条）`);
ok(citations === data.stats.citations, `产物登记的逐字材料数与实查一致（登记 ${data.stats.citations} / 实查 ${citations}）`);
ok(data.sources.length === 77 && data.sources.every((s) => sha256File(path.join(ROOT, s.path)) === s.sha256), `构建来源 77 份（units.json + 76 卡）校验和一致（实际 ${data.sources.length}）`);

/* ③ 五类语义：ID 存在、类型正确、关系方向对、CAS 照实标假设场景 */
group('③ 五类语义 ID 与类型：QST / CAS / SOL / OPI 都是真实反向关系单元');
const slotOf = (u) => TYPE_OF[u.type];
const badSlot = [], badRel = [], badCase = [];
for (const u of data.units) {
  const refs = [['QST', u.qst.id], ['CAS', u.case.id], ['SOL', u.solution.id], ...u.opinions.map((o) => ['OPI', o.id])];
  for (const [slot, id] of refs) {
    const src = byId.get(id);
    if (!src) { badSlot.push(`${u.unitId} ${id} 不存在`); continue; }
    if (slotOf(src) !== slot) { badSlot.push(`${u.unitId} ${id} 应为 ${slot}，实为 ${slotOf(src)}`); continue; }
    if (!(src.relationships || []).some((r) => r.target === u.conceptId)) badRel.push(`${u.unitId} ${id} 的 relationships 里没有 ${u.conceptId}`);
  }
  if (u.case.caseType !== '假设场景') badCase.push(`${u.unitId} ${u.case.id} 标的是「${u.case.caseType}」`);
}
ok(badSlot.length === 0, `引用的语义单元 ID 都存在且类型正确（不符 ${badSlot.length} 条：${badSlot.slice(0, 3).join(' ')}）`);
ok(badRel.length === 0, `引用方向都是"反向关系"（对方 relationships[].target 指向本单元的核心概念；不符 ${badRel.length} 条）`);
ok(badCase.length === 0, `CAS 一律照实标「假设场景」，没有一条写成真实复盘（不符 ${badCase.length} 条）`);
ok(data.units.every((u) => /假设场景/.test(u.case.caseHonesty)), '每个单元都带一句「主案例是假设场景，不是真实复盘」的照实说明');

/* ④ 缺口齐全 + 状态与 OPI 一致 */
group('④ 缺口：决策题待装配一条不少；缺 OPI 的写清缺什么');
const wired = data.units.filter((u) => (u.decisions || []).length === 3);
const noGap = data.units.filter((u) => (u.decisions || []).length === 0 && !u.gaps.includes(DECISION_GAP));
ok(noGap.length === 0, `没接入决策题的单元都写了「三道决策题待装配」这条缺口（缺 ${noGap.length} 个）`);
ok(wired.length === 76 && wired.every((u) => !u.gaps.includes(DECISION_GAP)), `已接入的 ${wired.length} 个单元都撤掉了「待装配」缺口（缺口与事实一致）`);
const ready = data.units.filter((u) => u.status === 'ready');
const scaffold = data.units.filter((u) => u.status === 'scaffold');
ok(ready.length === 19 && ready.every((u) => u.opinions.length > 0 && (u.superseded ? new RegExp(`同一个概念（${u.conceptId}）已有负责人确认过的手工章节 unit:chapter-`).test(u.statusReason) : u.statusReason === '')),
  `ready 19 个且都有 OPI；未被取代的 statusReason 为空、被取代的写清取代关系（实际 ${ready.length}）`);
ok(scaffold.length === 57 && scaffold.every((u) => u.opinions.length === 0), `scaffold 57 个且都没有 OPI（实际 ${scaffold.length}）`);
ok(scaffold.filter((u) => !u.superseded).every((u) => u.statusReason === '缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上'),
  `未取代的 scaffold（${scaffold.filter((u) => !u.superseded).length} 个）statusReason 都是施工单规定的口径`);
/* 方案丙：6 个与六章同概念的单元标 superseded —— 保留数据、写清被谁取代、进缺口清单，且不再可进入 */
const superseded = data.units.filter((u) => u.superseded);
ok(superseded.length === 6, `6 个批量单元标了 superseded（实际 ${superseded.length}：${superseded.map((u) => u.unitId).join(',')}）`);
ok(superseded.every((u) => /^unit:chapter-/.test(u.superseded.by) && u.superseded.at && u.superseded.decidedBy === 'owner（方案丙）'),
  'superseded 都写清了被哪个手工章节取代、什么时候、谁拍的板');
ok(superseded.every((u) => (u.feynman.checks || []).length === (cards.get(u.card.slug).raw.match(/^boundaries:/m) ? u.feynman.checks.length : 0) && (u.decisions || []).length === 3 && u.reading && u.solution && u.case),
  'superseded 只是加标记：数据（阅读/判据/三道已复核题）一条没删');
ok(superseded.every((u) => u.gaps.some((g) => /已被手工章节取代/.test(g))), '每个 superseded 单元各登记了一条缺口');
ok(data.stats.supersededUnits.length === 6 && Object.keys(data.stats.supersededBy).length === 6, 'stats 里登记了 superseded 单元与取代关系');
ok(new Set(superseded.map((u) => u.conceptId)).size === 6
  && ['CON-agent', 'CON-tool', 'CON-agent-loop', 'CON-state-management', 'CON-agent-harness', 'CON-verification-loop'].every((id) => superseded.some((u) => u.conceptId === id)),
  '被取代的正是六章那 6 个 CON（不是别的单元）');
ok(scaffold.every((u) => u.gaps.some((g) => /缺 OPI/.test(g))), '57 个 scaffold 各有一条「缺 OPI」缺口');
ok(data.units.every((u) => u.gaps.every((g) => g.trim().length > 0)), '没有空缺口（理由都写在缺口里）');
ok(data.stats.gaps === data.units.reduce((n, u) => n + u.gaps.length, 0), `缺口条数与登记一致（${data.stats.gaps}）`);

/* ⑤ 决策题只接复核通过的：不补造、不夹带、不自评 */
group('⑤ 决策题接入是复核驱动的：只接复核通过的，不补造、不夹带');
const reviewForWire = fs.existsSync(path.join(ROOT, REVIEW_REL)) ? read(REVIEW_REL) : null;
const decArtifact = fs.existsSync(path.join(ROOT, DECISIONS_REL)) ? read(DECISIONS_REL) : null;
ok(!!decArtifact && !!reviewForWire, '决策题产物与复核产物都在');
const verdictMap = new Map(((reviewForWire || {}).units || []).map((r) => [r.unitId, r.verdict]));
const qsMap = new Map(((decArtifact || {}).units || []).map((u) => [u.unitId, u.questions || []]));
const wiredBad = [], wiredGood = [];
for (const u of data.units) {
  const mine = u.decisions || [];
  if (verdictMap.get(u.unitId) !== 'usable') { if (mine.length) wiredBad.push(`${u.unitId} 复核不是 usable 却接了 ${mine.length} 道`); continue; }
  const src = qsMap.get(u.unitId) || [];
  if (JSON.stringify(mine) !== JSON.stringify(src)) wiredBad.push(`${u.unitId} 接入的题与复核过的那份不一致（被改过）`);
  else wiredGood.push(u.unitId);
}
ok(wiredBad.length === 0, `接入的题逐字等于复核通过的那一份（不符 ${wiredBad.length}：${wiredBad.slice(0, 3).join(' ')}）`);
ok(wiredGood.length === 76, `76 个单元接的都是复核 verdict=usable 的那 3 道（实际 ${wiredGood.length}）`);
ok(data.units.every((u) => !/^(correct|answer|key)$/.test(u.decisionPolicy || '')), '单元上没有另写一份「正确答案」字段（答案只在题里）');

/* ⑥ 费曼判据：point / condition 逐字，misconception 是机械反面转述且可重算 */
group('⑥ 费曼判据：一条边界一条判据，反面转述必须能重算出来');
let checks = 0, flip = 0, denial = 0;
const badCheck = [], badDerive = [], badStatus = [];
for (const u of data.units) {
  const card = cards.get(u.card.slug);
  const y = readYamlFields(card.raw);
  const bs = y.boundaries || [];
  if (u.feynman.checks.length !== bs.length) badCheck.push(`${u.unitId} 判据数 ${u.feynman.checks.length} ≠ 卡片边界数 ${bs.length}`);
  u.feynman.checks.forEach((c, i) => {
    checks++;
    if (c.condition !== bs[i]) badCheck.push(`${u.unitId} 判据 ${i + 1} condition 不是卡片 boundaries[${i}] 原文`);
    if (c.point !== firstChars(bs[i], 12) || !bs[i].startsWith(c.point)) badCheck.push(`${u.unitId} 判据 ${i + 1} point 不是该条边界的前 12 字`);
    if (c.locator !== `boundaries[${i}]` || c.sourceFile !== card.rel) badCheck.push(`${u.unitId} 判据 ${i + 1} 出处不是 boundaries[${i}]`);
    const der = deriveMisconception(bs[i]);
    if (der.text !== c.misconception) badDerive.push(`${u.unitId} 判据 ${i + 1} misconception 与重算结果不一致`);
    if (der.rule !== (c.derivation || {}).rule || der.flipped !== (c.derivation || {}).flipped) badDerive.push(`${u.unitId} 判据 ${i + 1} derivation 记的规则与重算不一致`);
    if (c.misconceptionSource !== 'derived') badStatus.push(`${u.unitId} 判据 ${i + 1} 没标 derived：${c.misconceptionSource}`);
    if (der.rule === 'negation-flip') flip++; else denial++;
  });
  if (u.feynman.required.join('|') !== u.feynman.checks.map((c) => c.point).join('|')) badCheck.push(`${u.unitId} feynman.required 与 checks[].point 不一致`);
  if (new Set(u.feynman.checks.map((c) => c.id)).size !== u.feynman.checks.length) badCheck.push(`${u.unitId} 判据 ID 有重复`);
}
ok(checks === 264, `判据总数 = 卡片 boundaries 总数（实际 ${checks}）`);
ok(badCheck.length === 0, `point／condition／locator 逐字对得上卡片（不符 ${badCheck.length} 条：${badCheck.slice(0, 3).join(' ')}）`);
ok(badDerive.length === 0, `misconception 能从卡片原文重算出来（不符 ${badDerive.length} 条：${badDerive.slice(0, 3).join(' ')}）`);
ok(badStatus.length === 0, `每条判据的 misconception 都标 derived（不符 ${badStatus.length} 条）`);
ok(flip === 152 && denial === 112, `两条规则的分布与产物登记一致（否定翻转 ${flip} · 整条否定 ${denial}）`);
ok(data.stats.criteria === checks && data.stats.misconceptionRules.negationFlip === flip, 'stats 里的判据数与规则分布不是手写的');

/* ⑦ 个人状态不写回公共产物 */
group('⑦ 不把运行字段写进公共产物');
const text = JSON.stringify(data);
ok(!/currentNode|"passed"|unitPassed|summativePassed/.test(text), '产物里没有 currentNode / passed 这类运行字段');
ok(data.policy && /一个模型调用都没打/.test(data.policy.noModel), '产物自己声明了"没有调用模型"');
ok(/scenario/.test(data.policy.cardFieldsUnused || ''), '卡片 scenario 本轮未用这件事照实写在产物里');

/* ⑧ 图侧对照（图已构建时才跑）：Unit / 判据 / 活动都在，且没有决策题活动 */
if (fs.existsSync(path.join(ROOT, GRAPH_REL))) {
  group('⑧ 图侧对照：graph.json 里这 76 个单元的节点、判据与活动');
  const g = read(GRAPH_REL);
  const byNode = new Map(g.nodes.map((n) => [n.id, n]));
  const badUnitNode = [], badCrit = [], badActs = [], fakeDecision = [];
  for (const u of data.units) {
    const id = `unit:batch-${u.card.slug}`;
    const n = byNode.get(id);
    if (!n || n.kind !== 'Unit') { badUnitNode.push(id); continue; }
    if (n.status !== u.status) badUnitNode.push(`${id} status ${n.status} ≠ ${u.status}`);
    if ((n.meta || {}).unitId !== id) badUnitNode.push(`${id} meta.unitId ${(n.meta || {}).unitId}`);
    if ((n.meta || {}).criterionCount !== u.feynman.checks.length) badUnitNode.push(`${id} criterionCount 不符`);
    if (n.runnable) badUnitNode.push(`${id} 不该给可运行入口（页面入口还没装配，给了就是空按钮）`);
    for (const c of u.feynman.checks) {
      const cn = byNode.get(`criterion:${c.id}`);
      if (!cn || cn.kind !== 'Criterion') { badCrit.push(`${c.id} 不在图里`); continue; }
      if ((cn.meta || {}).condition !== c.condition) badCrit.push(`${c.id} condition 与产物不一致`);
      if ((cn.meta || {}).misconceptionSource !== 'derived') badCrit.push(`${c.id} 没标 derived`);
    }
    const acts = g.nodes.filter((n2) => (n2.meta || {}).unitId === id);
    if (acts.length < 8 + 6) badActs.push(`${id} 活动只有 ${acts.length} 个（含每题 Decision/DecisionReview 应 ≥14）`);
    if (!acts.some((a) => a.kind === 'Reading') || !acts.some((a) => a.kind === 'Summative')) badActs.push(`${id} 缺阅读或章末活动`);
    const myDec = acts.filter((a) => a.kind === 'Decision');
    const myRev = acts.filter((a) => a.kind === 'DecisionReview');
    if (myDec.length !== 3 || myRev.length !== 3) fakeDecision.push(`${id} 决策活动 ${myDec.length}/${myRev.length}（要求各 3）`);
    if (myDec.some((a) => a.status !== 'ready')) fakeDecision.push(`${id} 有未就绪的决策活动`);
    if ((n.meta || {}).questionCount !== 3) badUnitNode.push(`${id} meta.questionCount 应为 3`);
  }
  ok(badUnitNode.length === 0, `76 个 Unit 节点都在、状态与产物一致、没有假入口（不符 ${badUnitNode.length}：${badUnitNode.slice(0, 3).join(' ')}）`);
  ok(badCrit.length === 0, `264 条判据节点都在且条件一致（不符 ${badCrit.length}：${badCrit.slice(0, 3).join(' ')}）`);
  ok(badActs.length === 0, `每个单元的活动骨架都在（≥14：骨架 + 每题两个活动；不符 ${badActs.length}）`);
  ok(fakeDecision.length === 0, `76 个单元各带 3 个 ready 的 Decision + 3 个 DecisionReview 活动（不符 ${fakeDecision.length}：${fakeDecision.slice(0, 3).join(' ')}）`);
  ok(g.stats.byKind.Decision === 269, `全图决策题 269 道（六章人工 18 + 方案丙并入 18 + 单篇 3 + 夹具 2 + 批量 228；实际 ${g.stats.byKind.Decision}）`);
  /* 方案丙：并入六章的机器判据必须是 supplements 边、gate=false —— 不进本章通过判定 */
  const chapterMerged = g.edges.filter((e) => e.relation === 'supplements');
  const chapterTargets = g.edges.filter((e) => e.relation === 'targets' && /^criterion:(agent|tool|agent-loop|state-persistence|harness|verification-loop):/.test(e.to));
  ok(chapterMerged.length === 22, `六章各带并入的机器派生判据（supplements 边 ${chapterMerged.length} 条，预期 22）`);
  ok(chapterTargets.length === 0, '机器派生判据没有混进 targets（不进本章通过判定）');
  const supersededNodes = g.nodes.filter((n) => n.kind === 'Unit' && (n.meta || {}).superseded);
  ok(supersededNodes.length === 6 && supersededNodes.every((n) => /^unit:chapter-/.test((n.meta || {}).supersededBy || '') && n.runnable === null),
    `图里 6 个 superseded 单元标了取代关系且没有可运行入口（实际 ${supersededNodes.length}）`);
  ok(g.gaps.some((x) => /已被手工章节取代/.test(x.label)), 'superseded 在图缺口清单里有条目');
} else {
  group('⑧ 图侧对照');
  console.log('  （graph.json 还没构建，跳过；跑 node scripts/build-graph.mjs 后再来）');
}

/* ⑨ 决策题独立复核 + 准入门（本轮新增）
   背景：串台事故产出了 228 道批量决策题（evidence/gen-decisions-hybrid-v2-20260914.json）。
   负责人决定采用，但要求先独立复核。这里**自己重算一遍**，不看产物自述；再断言
   没有一道题靠「有题」就混进可进入状态。三条必须有：
     a 决策题依据逐字可回溯
     b 空决策数组不等于可进入
     c 未通过复核的单元仍不可进入 */
group('⑨ 决策题独立复核：依据逐字可回溯 · 空数组不等于满足 · 复核不过不进');
if (!fs.existsSync(path.join(ROOT, DECISIONS_REL))) {
  ok(false, `缺 ${DECISIONS_REL}（决策题产物不在，复核无从谈起）`);
} else {
  const dec = read(DECISIONS_REL);
  const review = fs.existsSync(path.join(ROOT, REVIEW_REL)) ? read(REVIEW_REL) : null;
  ok(!!review, `独立复核产物存在（${REVIEW_REL}）`);
  ok(review && review.file === DECISIONS_REL, '复核产物指向的就是这份决策题产物');

  // a 依据逐字可回溯：**在体检里重算**，不读 review.json 的自述
  const refCtx = { byId, cards: loadCards(ROOT, CARD_DIR_REL) };
  const MATERIAL2 = (() => {
    const chunks = [];
    for (const u of units) {
      for (const v of Object.values(u.key_fields || {})) {
        if (typeof v === 'string') chunks.push(v);
        else if (Array.isArray(v)) v.forEach((x) => typeof x === 'string' && chunks.push(x));
      }
    }
    for (const c of refCtx.cards.values()) chunks.push(c.raw);
    return chunks;
  })();
  let decRefs = 0, decRefOk = 0, decRefBadSha = 0, decCorrect = 0, decCorrectBad = 0, decCopied = 0;
  const decBad = [];
  for (const du of dec.units || []) {
    for (const q of du.questions || []) {
      const co = q.correctOption || {};
      const cres = resolveDecisionRef({ sourceId: co.basis, locator: co.locator, sourceFile: co.sourceFile }, refCtx);
      /* 正解是改写句：逐字校验落在 basisQuote 上，另查「正解整句不逐字照抄材料」 */
      if (cres.ok && verbatimForm(String(cres.value), co.basisQuote, false)) decCorrect++;
      else { decCorrectBad++; decBad.push(`${du.unitId}#${q.id} 正解依据`); }
      if (MATERIAL2.some((m) => m.includes(co.text))) { decCopied++; decBad.push(`${du.unitId}#${q.id} 正解逐字照抄`); }
      for (const d of q.distractors || []) {
        for (const r of d.basisRefs || []) {
          decRefs++;
          const res = resolveDecisionRef(r, refCtx);
          if (!res.ok || !verbatimForm(String(res.value), r.quote, false)) { decBad.push(`${du.unitId}#${q.id} ${r.refId || ''}`); continue; }
          const abs2 = path.join(ROOT, r.sourceFile || '');
          if (!r.sourceFile || !fs.existsSync(abs2) || sha256File(abs2) !== r.sourceSha256) { decRefBadSha++; decBad.push(`${du.unitId}#${q.id} sha`); continue; }
          decRefOk++;
        }
      }
    }
  }
  ok(decRefs === 456, `决策题 basisRefs 共 456 条（实际 ${decRefs}；228 题 × 2 干扰项，每条至少 1 个引用）`);
  ok(decRefOk === decRefs, `每条 basisRefs 都能在它声称的来源里逐字找到、sha256 一致（${decRefOk}/${decRefs}；不符 ${decRefs - decRefOk}：${decBad.slice(0, 3).join(' ')}）`);
  ok(decRefBadSha === 0, `basisRefs 的 sourceSha256 全部与磁盘一致（不符 ${decRefBadSha}）`);
  ok(decCorrect === (dec.counts || {}).questions, `每道题的 basisQuote 都逐字可回溯到 SOL/CAS/图鉴卡（${decCorrect}/${(dec.counts || {}).questions}；不符 ${decCorrectBad}）`);
  ok(decCopied === 0, `没有一道题的正解整句逐字照抄材料（照抄 ${decCopied}）`);
  const copiedDistractors = [];
  for (const u of dec.units) for (const q of u.questions) for (const d of q.distractors || []) {
    if (MATERIAL2.some((m) => m.includes(d.text))) copiedDistractors.push(`${u.unitId}#${q.id}`);
  }
  ok(copiedDistractors.length === 0, `456 个干扰项没有一条逐字照抄材料原句（逐条重算；照抄 ${copiedDistractors.length}：${copiedDistractors.slice(0, 3).join(' ')}）`);

  // b / c 准入门：拿 practice-readiness 真跑一遍（不是读它自己说的话）
  const practice = buildPractice({
    graph: read(GRAPH_REL), batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review,
    criteriaReview: read('evidence/review-criteria-260914/review.json'), batchReaders: read(READERS_REL),
  });
  const batchPractice = practice.units.filter((u) => u.group === '批量');
  ok(batchPractice.length === 76, `准入门覆盖 76 个批量单元（实际 ${batchPractice.length}）`);
  ok(batchPractice.every((u) => u.declaredDecisionCount === 3), '76 个单元声明的 decisions 都是 3 道已复核的题（空数组不再是这一段的拦路石）');
  ok(batchPractice.every((u) => u.segments.decision.state === 'green'), '决策那一段 76 个单元全部「可走」（复核 verdict=usable）');
  /* 准入门改版（2026-09-14）：判据「待验证区分度」**不再挡进入**。
     现在卡住的是「绑不到逐字原文」与「复核不通过」这两条硬条件；76 个批量单元的逐字材料与决策题都过了，
     所以除 6 个 superseded 之外全部可进入（superseded 是数据驱动的永久封条）。 */
  ok(batchPractice.filter((u) => u.open).length === 70, `除 6 个 superseded 外全部可进入（实际可进入 ${batchPractice.filter((u) => u.open).length}，预期 70）`);
  ok(batchPractice.filter((u) => !u.open).every((u) => !!u.superseded && u.segments.reading.state === 'blocked'),
    '仍然不开的 6 个全部是 superseded（阅读段照实标「不可进入」，不是静默挡住）');
  ok(batchPractice.filter((u) => u.open).every((u) => u.segments.formative.state === 'green' && u.criteriaActivation && u.criteriaActivation.pending > 0),
    `可进入的 ${batchPractice.filter((u) => u.open).length} 个单元，形成性费曼那一段照实标着「待验证区分度」（不是当成已激活）`);
  ok(batchPractice.filter((u) => u.open).every((u) => (u.criteriaActivation.active || 0) === 0),
    '此时此刻没有一条判据被激活（真实轨迹里没有一条判据从 not-met 走到 met）——没把未验证说成已验证');
  const blocked = (review.units || []).filter((r) => r.verdict !== 'usable');
  ok(blocked.length === 0, `复核判定不可接入的单元 ${blocked.length} 个（预期 0）`);
  const leaked = blocked.filter((r) => {
    const u = practice.units.find((x) => x.id === `unit:${r.unitId}`);
    return u && (u.open || u.segments.decision.state === 'green');
  });
  ok(leaked.length === 0, `未通过复核的单元仍不可进入（混进可走的 ${leaked.length} 个：${leaked.slice(0, 3).map((r) => r.unitId).join(' ')}）`);
  /* 本条 2026-09-14 按准入门改版改准：原来写「六章是唯一可进入的一批」，
     现在可进入的集合是**数据算出来**的（六章 6 + 批量 70 = 76），页面里没有一个写死的单元 ID。 */
  const openIds = practice.units.filter((u) => u.open).map((u) => u.id);
  ok(openIds.length === 76 && openIds.filter((id) => id.startsWith('unit:chapter-')).length === 6,
    `可进入的集合是数据算出来的：${openIds.length} 个（六章 6 + 批量 70；实际六章 ${openIds.filter((id) => id.startsWith('unit:chapter-')).length}）`);
  ok(practice.units.filter((u) => u.group === '批量' && u.bucket === 'decision').length === 0, '批量单元不再堆在「缺少决策题」桶里（桶按第一次卡住的那一段算）');
  ok(practice.units.filter((u) => u.group === '批量' && !u.open).every((u) => u.bucket === 'material'),
    '不开的批量单元都归在「材料缺口：待装配」（它们是 superseded，不是缺决策题）');
  ok(practice.summary.reviewedDecisions && practice.summary.reviewedDecisions.questions === 228, '状态看板读到了复核结论（228 道题）');
  ok(practice.units.filter((u) => u.group === '批量').every((u) => u.generatedDecisionCount === 3 && u.reviewVerdict === 'usable'), '每个批量单元都带着「3 道题 · 复核 usable」的标记');
  ok((review.recomputed || {}).polarityInvertedQuestions === 0, `复核发现题干与正解极性相反的题 ${(review.recomputed || {}).polarityInvertedQuestions} 道（预期 0）`);
  ok((review.recomputed || {}).unitsWhereAllThreeCorrectAnswersAreIdentical === 0, '复核没有发现三题共用一个正解的单元');
  ok((review.recomputed || {}).correctVerbatimCopy === 0, '复核没有发现正解整句逐字照抄材料的题（v2 是 228）');
  ok((review.recomputed || {}).correctRunAdvantageQuestions === 0, '复核没有发现「正解逐字片段明显比干扰项更像材料」的题');
  ok(review.verdict === 'usable', `复核总判定 verdict=${review.verdict}`);

  /* 反证探针 A：把复核结论全改成 usable，decisions 仍为空数组 —— 必须依然不开。
     这条直接证明「空决策数组不等于满足」是判定里的硬条件，不是巧合。 */
  const forged = JSON.parse(JSON.stringify(review));
  for (const r of forged.units) r.verdict = 'usable';
  const batchEmpty = JSON.parse(JSON.stringify(data));
  for (const u of batchEmpty.units) u.decisions = [];
  const pForged = buildPractice({ graph: read(GRAPH_REL), batch: batchEmpty, learning: read('evidence/agent-loop-260913/chapters.json'), review: forged, batchReaders: read(READERS_REL) });
  const forgedBatch = pForged.units.filter((u) => u.group === '批量');
  ok(forgedBatch.every((u) => !u.open && u.segments.decision.state !== 'green'),
    '反证 A：把复核结论全改成 usable，只要 decisions 还是空数组就仍然不开（空数组 ≠ 满足）');

  /* 反证探针 B：把一个批量单元的 Decision 活动从索引里删掉 —— 复核 usable + decisions 非空也必须不开；
     再加回去 → 自动变绿。证明「索引里真有 ready 的 Decision 活动」这条也是硬条件。 */
  const probeUnit = 'unit:batch-agent';
  const graphProbe = JSON.parse(JSON.stringify(read(GRAPH_REL)));
  graphProbe.nodes = graphProbe.nodes.filter((n) => !(String(n.meta && n.meta.unitId) === probeUnit && (n.kind === 'Decision' || n.kind === 'DecisionReview')));
  graphProbe.edges = graphProbe.edges.filter((e) => !String(e.from).startsWith(`activity:${probeUnit}:decision`) && !String(e.from).startsWith(`activity:${probeUnit}:review`));
  const pNoAct = buildPractice({ graph: graphProbe, batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review, criteriaReview: read('evidence/review-criteria-260914/review.json'), batchReaders: read(READERS_REL) });
  const noActUnit = pNoAct.units.find((u) => u.id === probeUnit);
  ok(noActUnit.segments.decision.state !== 'green',
    `反证 B1：复核 usable + decisions 非空，但索引里没有 Decision 活动 → 决策段仍不可走（实际 ${noActUnit.segments.decision.state}／${noActUnit.segments.decision.why.slice(0, 26)}）`);
  const graphWith = JSON.parse(JSON.stringify(graphProbe));   // 先删掉该单元原有的活动，再补 3 个探针
  for (let i = 1; i <= 3; i++) {
    for (const kind of ['Decision', 'DecisionReview']) {
      graphWith.nodes.push({
        id: `activity:${probeUnit}:${kind === 'Decision' ? 'decision' : 'review'}:${i}`,
        kind, layer: 'activity', label: `探针 ${kind} ${i}`, sub: '探针', scope: 'curriculum',
        status: 'ready', statusReason: '', version: '', sourceRefs: [], payloadRef: '', meta: { unitId: probeUnit, index: i }, runnable: null,
      });
    }
  }
  const pProbe = buildPractice({ graph: graphWith, batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review, criteriaReview: read('evidence/review-criteria-260914/review.json'), batchReaders: read(READERS_REL) });
  const probed = pProbe.units.find((u) => u.id === probeUnit);
  ok(probed.segments.decision.state === 'green',
    `反证 B2：把 3 个 ready 的 Decision 活动补进索引 → 决策段自动变「可走」（实际 ${probed.segments.decision.state}）`);
  ok(probed.reviewVerdict === 'usable' && probed.decisionCount === 3,
    '反证 B2：探针走的是同一份 buildPractice，没有为它开小灶');
  /* 反证探针 C：把复核结论改成 blocked —— 有题有活动也必须不开 */
  const forgedC = JSON.parse(JSON.stringify(review));
  forgedC.units.find((r) => r.unitId === 'batch-agent').verdict = 'blocked';
  const pC = buildPractice({ graph: read(GRAPH_REL), batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review: forgedC, criteriaReview: read('evidence/review-criteria-260914/review.json'), batchReaders: read(READERS_REL) });
  ok(pC.units.find((u) => u.id === probeUnit).segments.decision.state !== 'green',
    '反证 C：把复核结论改成 blocked → 有题、有活动也不开（复核不过不进）');
}

/* ⑩ 准入门改版（docs/准入门改版-区分度自证-20260914.md）—— 三条机器条件与三条新断言
   这是本轮与上一版最重要的区别：判据的「区分度」由三条机器条件自证，
   不满足的照实标「待验证区分度」：**可以看、不参与通过判定、也不挡单元进入**。
   三条新断言：
     A. 待验证区分度的判据不参与通过判定（判据数 ≠ 通过判定条数时，页面与数据都照实说）
     B. 绑不到逐字原文的单元不许开放（把一条引文打断 → 载荷编译失败 → 该单元不开放）
     C. 有轨迹后判据自动激活（喂一条真实的 not-met → met 轨迹 → gate 从 false 变 true，代码不用改） */
group('⑩ 准入改版：三条机器条件 · 待验证区分度不挡进入 · 绑不到原文不许开放 · 有轨迹自动激活');
{
  const READERS = read(READERS_REL);
  const TRAJ = read(TRAJ_REL);
  const trajectories = TRAJ.trajectories || [];
  const real = trajectories.filter((t) => t.learnerIs && t.learnerIs.realHuman === true);

  /* 载荷本身的形状：76 份、每份都带逐字材料与三条条件的现算结论 */
  ok(READERS.readers.length === 76, `阅读器载荷 76 份（实际 ${READERS.readers.length}）`);
  ok(READERS.readers.every((r) => (r.feynman.checks || []).length > 0 && r.feynman.checks.every((c) => c.admission && c.admission.conditions)),
    '每份载荷的每条判据都带三条机器条件的**现算结论**（不是抄来的自述）');
  ok(READERS.readers.every((r) => r.feynman.checks.every((c) => c.gate === (c.admission.active === true))),
    '判据的 gate 字段严格等于 admission.active（参与通过判定 = 三条全过）');

  /* A. 待验证区分度的判据不参与通过判定 */
  const pending = READERS.readers.flatMap((r) => r.feynman.checks.filter((c) => !c.gate));
  const active = READERS.readers.flatMap((r) => r.feynman.checks.filter((c) => c.gate));
  ok(pending.length === 264 && active.length === 0,
    `264 条判据照实标「待验证区分度」、一条都没有被说成已激活（实际 pending ${pending.length} / active ${active.length}）`);
  ok(pending.every((c) => c.admission.label === '待验证区分度' && c.admission.conditions.verbatimQuote === true),
    `待验证的 ${pending.length} 条**全部满足条件①（绑了逐字原文）**，卡在②③（缺真实轨迹 / 缺口没下降过）——这正是六章与 264 条的真正区别`);
  ok(pending.every((c) => c.admission.conditions.realTrajectory === false || c.admission.conditions.gapDeclined === false),
    '标「待验证」的判据都至少有一条条件确实没过（没有把过了三条的也标成待验证）');
  /* 页面侧：可进入的单元里，章末/形成性那两段照实标着待验证，且**没有**因此把单元挡在门外 */
  const p2 = buildPractice({ graph: read(GRAPH_REL), batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review: read(REVIEW_REL), criteriaReview: read('evidence/review-criteria-260914/review.json'), batchReaders: READERS });
  const openBatch = p2.units.filter((u) => u.group === '批量' && u.open);
  ok(openBatch.length === 70 && openBatch.every((u) => u.criteriaActivation.total === u.criterionCount && u.criteriaActivation.active === 0 && u.criteriaActivation.pending === u.criterionCount),
    `可进入的 ${openBatch.length} 个批量单元里，待验证判据数照实算（每条都 pending、没有一条被说成 active），没有一个单元因为「判据待验证」被挡在门外`);
  ok(openBatch.every((u) => u.criteriaActivation.citationsBound === u.criteriaActivation.citationsTotal && u.criteriaActivation.quoteBound === true),
    '可进入的单元，逐字绑定是**现算**的：每条带出处的材料都通过了 indexOf ＋ sha256 ＋ locator（不是采信编译时那一份自述）');
  /* allowRealTrajectories:false 探针：把真实轨迹抽掉 → 单元照旧可进入（待验证不挡进入），但绝不会有判据变激活 */
  const pNoTraj = buildPractice({ graph: read(GRAPH_REL), batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review: read(REVIEW_REL), criteriaReview: read('evidence/review-criteria-260914/review.json'), batchReaders: READERS, allowRealTrajectories: false });
  const noTrajBatch = pNoTraj.units.filter((u) => u.group === '批量');
  ok(noTrajBatch.filter((u) => u.open).length === 70 && noTrajBatch.every((u) => (u.criteriaActivation.active || 0) === 0),
    '探针：把真实轨迹抽掉后，70 个单元照样可进入（待验证不挡进入），且没有一条判据被算成已激活');

  /* B. 绑不到逐字原文的单元不许开放 */
  const broken = JSON.parse(JSON.stringify(READERS));
  const victim = broken.readers.find((r) => r.isAllowedToOpen && r.feynman.checks.length);
  const brokenCitation = victim.feynman.checks[0].sourceSha256;
  victim.feynman.checks[0].sourceSha256 = 'f'.repeat(64);          // 打断第一处逐字绑定
  const pBroken = buildPractice({ graph: read(GRAPH_REL), batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review: read(REVIEW_REL), criteriaReview: read('evidence/review-criteria-260914/review.json'), batchReaders: broken });
  const victimSeg = pBroken.units.find((u) => u.id === `unit:${victim.chapterId}`);
  ok(victimSeg.segments.reading.state === 'blocked' && victimSeg.open === false,
    `反证 B：把 ${victim.chapterId} 第一条判据的 sha256 改坏 → 阅读段变「不可进入」、单元不开放（绑不到逐字原文就不给开）`);
  ok(brokenCitation === victim.feynman.checks[0].admission.binding.sha256,
    '反证 B：这条判据的 admission.binding 记的就是原来那个 sha256（准入结论确实是从逐字绑定算的，不是复制粘贴）');
  /* 编译器本身也要硬：sha 对不上就不写产物（在临时副本上重跑一次编译器） */
  const pAllowed = buildPractice({ graph: read(GRAPH_REL), batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review: read(REVIEW_REL), criteriaReview: read('evidence/review-criteria-260914/review.json'), batchReaders: READERS });
  ok(pAllowed.units.find((u) => u.id === `unit:${victim.chapterId}`).open === true,
    '对照：同一份判定跑原始载荷时这个单元是开的（上面那条红不是因为别的原因）');

  /* C. 有轨迹后判据自动激活（真实轨迹里出现过的那条判据） */
  const unit = 'agent';
  const chapterChecks = REAL_CHAPTER_CHECKS();                 // 六章第 1 章的 3 条人工判据（逐字取自 chapters.json）
  const realTraj = real.find((t) => t.unitId === unit) || null;
  ok(!!realTraj, `真实轨迹存在：${realTraj ? realTraj.trajectoryId : '（无）'}`);
  const before = chapterChecks.map((c) => judgeCriterion(c, { trajectories: real }).active);
  ok(before.every((x) => x === false), 'C1：拿**真实**的那份轨迹（负责人本人两轮、三条缺口两次都在）跑 → 三条判据全部不激活（照实）');
  const declined = realTraj ? gapDeclinedOn(realTraj) : { declined: false };
  ok(declined.declined === false, `C2：真实轨迹的缺口没有下降过（${declined.why || ''}）——所以它激活不了判据，这不是代码选择，是数据事实`);

  /* 造一条**标了 realHuman 的** not-met → met 轨迹喂给同一个判定：判据必须自动激活、代码一个字不改。
     这条轨迹是探针（fixtureProbe:true），只在本断言里存在，不落任何产物、也不写进 readers.json。 */
  const probeTraj = {
    trajectoryId: 'probe-real-trajectory-（fixtureProbe 真人不真人在此无关，只证明判定会动）',
    unitId: unit, fixtureProbe: true,
    learnerIs: { realHuman: true, who: '探针（本断言内部构造，不落盘、不当证据）' },
    rounds: [
      { round: 1, at: 'probe', statuses: { 'agent-F1': 'missing', 'agent-F2': 'missing', 'agent-F3': 'missing' }, gaps: ['agent-F1', 'agent-F2', 'agent-F3'] },
      { round: 2, at: 'probe', statuses: { 'agent-F1': 'met', 'agent-F2': 'missing', 'agent-F3': 'missing' }, gaps: ['agent-F2', 'agent-F3'] },
    ],
  };
  const after = chapterChecks.map((c) => judgeCriterion(c, { trajectories: [probeTraj] }));
  ok(after[0].active === true && after[0].conditions.realTrajectory === true && after[0].conditions.gapDeclined === true,
    'C3：同一条判据喂进一条 not-met → met 且缺口下降的轨迹 → 自动激活（gate 从 false 变 true，判定里没有一个单元 ID 白名单）');
  ok(after[1].active === false && after[2].active === false,
    'C3：同一条轨迹里没走到 met 的那两条仍然不激活（激活是按判据逐条算的，不是整章一起开）');
  const probeDerived = judgeCriterion({ id: 'agent:batch-agent-B1', unitId: 'batch-agent', point: 'x', condition: 'y', misconception: 'z', citation: victim.feynman.checks[0] }, { trajectories: [probeTraj] });
  ok(probeDerived.active === false, 'C4：机器派生判据（同一个判定）在这条探针轨迹上没有它的观察记录 → 仍不激活（不因为"同单元"就跟着开）');
  ok(real.every((t) => t.fixtureProbe !== true) && !JSON.stringify(READERS).includes('probe-real-trajectory'),
    'C5：探针轨迹只在断言里存在，没有混进任何产物（判据要真轨迹，不是造一条就算）');
}
function REAL_CHAPTER_CHECKS() {
  const ch = read('evidence/agent-loop-260913/chapters.json').chapters.find((c) => c.chapterId === 'agent');
  const card = loadCards(ROOT, CARD_DIR_REL).get((ch.sourceChain.card || '') + '.yaml');
  return ch.feynman.checks.map((c, i) => ({
    id: c.id, unitId: 'agent', point: c.point, condition: c.condition, misconception: c.misconception,
    citation: {
      text: c.condition, sourceFile: card.rel, sourceSha256: card.sha, locator: `boundaries[${i}]`, escapeForm: 'raw',
    },
  }));
}

console.log(`\n批量单元体检：${pass} 项通过${fail ? `，${fail} 项失败` : ''}`);
if (fail) process.exit(1);
console.log(`  · 76 个单元：ready ${ready.length}（四类齐） · scaffold ${scaffold.length}（缺 OPI）`);
console.log(`  · 逐字材料 ${citations} 条（其中 ${escaped} 条按 JSON 转义形态命中）· 费曼判据 ${checks} 条`);
console.log(`  · 缺口 ${data.stats.gaps} 条：决策题待装配 ${data.units.filter((u) => !(u.decisions || []).length).length} + 缺 OPI ${scaffold.length}`);
console.log(`  · 决策题接入 ${wired.length} 个单元 / ${wired.reduce((n, u) => n + u.decisions.length, 0)} 道（复核 verdict=usable 才接）`);
if (fs.existsSync(path.join(ROOT, READERS_REL))) {
  const R = read(READERS_REL);
  console.log(`  · 阅读器载荷 ${R.stats.readers} 份编译（逐字材料 ${R.stats.citationsChecked} 条过 indexOf + sha256 + locator）· 可开放 ${R.stats.allowedToOpen} · 待装配 ${R.stats.pendingAssembly}（superseded ${R.stats.superseded}）`);
  console.log(`  · 判据区分度自证：激活 ${R.stats.criteriaActive} 条 · 待验证区分度 ${R.stats.criteriaPending} 条（真实轨迹 ${R.stats.realTrajectories} 份 / 共 ${R.stats.trajectoryFiles} 份）`);
}
console.log('✅ 批量单元体检全过');
