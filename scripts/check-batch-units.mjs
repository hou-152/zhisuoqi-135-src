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

const ROOT = path.resolve(import.meta.dirname, '..');
const UNITS_REL = '内容结构化系统/模块/ai-concept-base/data/units.json';
const CARD_DIR_REL = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
const DATA_REL = 'evidence/batch-units-260914/units.json';
const GRAPH_REL = 'knowledge/graph-260914/graph.json';

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
  walkCitations(u, (c) => {
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
const noGap = data.units.filter((u) => !u.gaps.includes(DECISION_GAP));
ok(noGap.length === 0, `每个单元都写了「三道决策题待装配」这条缺口（缺 ${noGap.length} 个）`);
const ready = data.units.filter((u) => u.status === 'ready');
const scaffold = data.units.filter((u) => u.status === 'scaffold');
ok(ready.length === 19 && ready.every((u) => u.opinions.length > 0 && u.statusReason === ''), `ready 19 个且都有 OPI（实际 ${ready.length}）`);
ok(scaffold.length === 57 && scaffold.every((u) => u.opinions.length === 0), `scaffold 57 个且都没有 OPI（实际 ${scaffold.length}）`);
ok(scaffold.every((u) => u.statusReason === '缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上'), '57 个 scaffold 的 statusReason 都是施工单规定的口径');
ok(scaffold.every((u) => u.gaps.some((g) => /缺 OPI/.test(g))), '57 个 scaffold 各有一条「缺 OPI」缺口');
ok(data.units.every((u) => u.gaps.every((g) => g.trim().length > 0)), '没有空缺口（理由都写在缺口里）');
ok(data.stats.gaps === data.units.reduce((n, u) => n + u.gaps.length, 0), `缺口条数与登记一致（${data.stats.gaps}）`);

/* ⑤ 不造假决策题：产物里没有题；图里也没有这道题的活动 */
group('⑤ 不造假决策题：本轮一个都不生成，也不许拿别的单元顶替');
ok(data.units.every((u) => Array.isArray(u.decisions) && u.decisions.length === 0), '76 个单元的 decisions 都是空数组（没有补造选项、没有补造正确答案）');
ok(!/"correct"\s*:/.test(JSON.stringify(data.units)), '产物里没有任何 correct 字段（没有偷偷造正确答案）');
ok(data.units.every((u) => /不生成决策题|不补造唯一正确答案/.test(u.decisionPolicy)), '每个单元都写清了"本轮不生成决策题"的依据');

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
    if ((n.meta || {}).questionCount !== 0) badUnitNode.push(`${id} questionCount 应为 0`);
    if (n.runnable) badUnitNode.push(`${id} 不该给可运行入口（页面入口还没装配，给了就是空按钮）`);
    for (const c of u.feynman.checks) {
      const cn = byNode.get(`criterion:${c.id}`);
      if (!cn || cn.kind !== 'Criterion') { badCrit.push(`${c.id} 不在图里`); continue; }
      if ((cn.meta || {}).condition !== c.condition) badCrit.push(`${c.id} condition 与产物不一致`);
      if ((cn.meta || {}).misconceptionSource !== 'derived') badCrit.push(`${c.id} 没标 derived`);
    }
    const acts = g.nodes.filter((n2) => (n2.meta || {}).unitId === id);
    if (acts.length < 8) badActs.push(`${id} 活动只有 ${acts.length} 个`);
    if (!acts.some((a) => a.kind === 'Reading') || !acts.some((a) => a.kind === 'Summative')) badActs.push(`${id} 缺阅读或章末活动`);
    if (acts.some((a) => a.kind === 'Decision' || a.kind === 'DecisionReview')) fakeDecision.push(id);
  }
  ok(badUnitNode.length === 0, `76 个 Unit 节点都在、状态与产物一致、没有假入口（不符 ${badUnitNode.length}：${badUnitNode.slice(0, 3).join(' ')}）`);
  ok(badCrit.length === 0, `264 条判据节点都在且条件一致（不符 ${badCrit.length}：${badCrit.slice(0, 3).join(' ')}）`);
  ok(badActs.length === 0, `每个单元的活动骨架都在（≥8，含阅读与章末；不符 ${badActs.length}）`);
  ok(fakeDecision.length === 0, `图里没有为这 76 个单元造出任何决策题活动（造了 ${fakeDecision.length} 个）`);
  ok(g.stats.byKind.Decision === 23, `全图决策题仍是 23 道（六章 18 + 单篇 3 + 夹具 2；实际 ${g.stats.byKind.Decision}）`);
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
const REVIEW_REL = 'evidence/review-decisions-260914/review.json';
const DECISIONS_REL = 'evidence/gen-decisions-hybrid-v2-20260914.json';
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
  let decRefs = 0, decRefOk = 0, decRefBadSha = 0, decCorrect = 0, decCorrectBad = 0;
  const decBad = [];
  for (const du of dec.units || []) {
    for (const q of du.questions || []) {
      const co = q.correctOption || {};
      const cres = resolveDecisionRef({ sourceId: co.basis, locator: co.locator, sourceFile: co.sourceFile }, refCtx);
      if (cres.ok && verbatimForm(String(cres.value), co.text, false)) decCorrect++;
      else { decCorrectBad++; decBad.push(`${du.unitId}#${q.id} 正解`); }
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
  ok(decRefs === 754, `决策题 basisRefs 共 754 条（实际 ${decRefs}；228 题 × 2 干扰项，每条至少 1 个引用）`);
  ok(decRefOk === decRefs, `每条 basisRefs 都能在它声称的来源里逐字找到、sha256 一致（${decRefOk}/${decRefs}；不符 ${decRefs - decRefOk}：${decBad.slice(0, 3).join(' ')}）`);
  ok(decRefBadSha === 0, `basisRefs 的 sourceSha256 全部与磁盘一致（不符 ${decRefBadSha}）`);
  ok(decCorrect === (dec.counts || {}).questions, `每道题的正解都逐字可回溯到 SOL/CAS（${decCorrect}/${(dec.counts || {}).questions}；不符 ${decCorrectBad}）`);
  const copiedDistractors = [];
  for (const u of dec.units) for (const q of u.questions) for (const d of q.distractors || []) {
    if (MATERIAL2.some((m) => m.includes(d.text))) copiedDistractors.push(`${u.unitId}#${q.id}`);
  }
  ok(copiedDistractors.length === 0, `456 个干扰项没有一条逐字照抄材料原句（逐条重算；照抄 ${copiedDistractors.length}：${copiedDistractors.slice(0, 3).join(' ')}）`);

  // b / c 准入门：拿 practice-readiness 真跑一遍（不是读它自己说的话）
  const practice = buildPractice({
    graph: read(GRAPH_REL), batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review,
  });
  const batchPractice = practice.units.filter((u) => u.group === '批量');
  ok(batchPractice.length === 76, `准入门覆盖 76 个批量单元（实际 ${batchPractice.length}）`);
  ok(batchPractice.every((u) => u.declaredDecisionCount === 0), '76 个单元声明的 decisions 仍是空数组（P0 修复没被绕过）');
  ok(batchPractice.every((u) => u.open === false), '空决策数组不等于可进入：76 个批量单元一个都没开（open=false）');
  ok(batchPractice.every((u) => u.segments.decision.state !== 'green'), '决策那一段一个都不是「可走」');
  const blocked = (review.units || []).filter((r) => r.verdict !== 'usable');
  ok(blocked.length === 76, `复核判定不可接入的单元 ${blocked.length} 个（预期 76）`);
  const leaked = blocked.filter((r) => {
    const u = practice.units.find((x) => x.id === `unit:${r.unitId}`);
    return u && (u.open || u.segments.decision.state === 'green');
  });
  ok(leaked.length === 0, `未通过复核的单元仍不可进入（混进可走的 ${leaked.length} 个：${leaked.slice(0, 3).map((r) => r.unitId).join(' ')}）`);
  ok(practice.units.filter((u) => u.open).length === 6, `六章仍是唯一四段全绿的一批（可进入 ${practice.units.filter((u) => u.open).length} 个，预期 6）`);
  ok(practice.summary.reviewedDecisions && practice.summary.reviewedDecisions.questions === 228, '状态看板读到了复核结论（228 道题）');
  ok(practice.units.filter((u) => u.group === '批量').every((u) => u.generatedDecisionCount === 3 && u.reviewVerdict === 'blocked'), '每个批量单元都带着「有 3 道生成稿但复核 blocked」的照实标记');
  ok((review.recomputed || {}).polarityInvertedQuestions === 16, `复核发现题干与正解极性相反的题 ${(review.recomputed || {}).polarityInvertedQuestions} 道（预期 16）`);
  ok((review.recomputed || {}).unitsWhereAllThreeCorrectAnswersAreIdentical === 76, '复核发现 76 个单元三题共用一个正解');

  /* 反证探针 A：把复核结论全改成 usable，decisions 仍是空数组 —— 必须依然不开。
     这条直接证明「空决策数组不等于满足」是判定里的硬条件，不是巧合。 */
  const forged = JSON.parse(JSON.stringify(review));
  for (const r of forged.units) r.verdict = 'usable';
  const pForged = buildPractice({ graph: read(GRAPH_REL), batch: data, learning: read('evidence/agent-loop-260913/chapters.json'), review: forged });
  const forgedBatch = pForged.units.filter((u) => u.group === '批量');
  ok(forgedBatch.every((u) => !u.open && u.segments.decision.state !== 'green'),
    '反证 A：把复核结论全改成 usable，只要 decisions 还是空数组就仍然不开（空数组 ≠ 满足）');

  /* 反证探针 B：给批量单元补上「声明的题 + 索引里 3 个 ready 的 Decision 活动 + 复核 usable」，
     决策那一段必须**自动**变绿 —— 证明准入是数据算的，不是写死的六章白名单。 */
  const probeUnit = 'unit:batch-agent';
  const graphProbe = JSON.parse(JSON.stringify(read(GRAPH_REL)));
  for (let i = 1; i <= 3; i++) {
    for (const kind of ['Decision', 'DecisionReview']) {
      graphProbe.nodes.push({
        id: `activity:${probeUnit}:${kind === 'Decision' ? 'decision' : 'review'}:${i}`,
        kind, layer: 'activity', label: `探针 ${kind} ${i}`, sub: '探针', scope: 'curriculum',
        status: 'ready', statusReason: '', version: '', sourceRefs: [], payloadRef: '', meta: { unitId: probeUnit, index: i }, runnable: null,
      });
    }
  }
  const batchProbe = JSON.parse(JSON.stringify(data));
  batchProbe.units.find((u) => u.unitId === 'batch-agent').decisions = [{ probe: 1 }, { probe: 2 }, { probe: 3 }];
  const reviewProbe = JSON.parse(JSON.stringify(review));
  reviewProbe.units.find((r) => r.unitId === 'batch-agent').verdict = 'usable';
  const pProbe = buildPractice({ graph: graphProbe, batch: batchProbe, learning: read('evidence/agent-loop-260913/chapters.json'), review: reviewProbe });
  const probed = pProbe.units.find((u) => u.id === probeUnit);
  ok(probed.segments.decision.state === 'green',
    `反证 B：补齐题 + 索引活动 + 复核 usable 之后，决策那一段自动变「可走」（实际 ${probed.segments.decision.state}／${probed.segments.decision.why.slice(0, 30)}）`);
  ok(pProbe.units.find((u) => u.id === probeUnit).reviewVerdict === 'usable' && pProbe.units.find((u) => u.id === probeUnit).decisionCount === 3,
    '反证 B：探针走的是同一份 buildPractice，没有为它开小灶');
}

console.log(`\n批量单元体检：${pass} 项通过${fail ? `，${fail} 项失败` : ''}`);
if (fail) process.exit(1);
console.log(`  · 76 个单元：ready ${ready.length}（四类齐） · scaffold ${scaffold.length}（缺 OPI）`);
console.log(`  · 逐字材料 ${citations} 条（其中 ${escaped} 条按 JSON 转义形态命中）· 费曼判据 ${checks} 条`);
console.log(`  · 缺口 ${data.stats.gaps} 条：决策题待装配 76 + 缺 OPI ${scaffold.length}`);
console.log('✅ 批量单元体检全过');
