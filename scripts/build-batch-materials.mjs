#!/usr/bin/env node
// 把 76 个批量装配单元编译成**与六章同一种**的阅读器载荷（准入门改版第一步：阅读载荷）。
//
// 依据：docs/准入门改版-区分度自证-20260914.md
//   「76 个批量单元的阅读材料还在 units.json，没编译成六章那种 reader 载荷（页面上标着 readerMissing）」
//   所以本脚本只做一件事：把已经装配好的材料**逐字搬运**成壳里 #learn 阅读器认的那份形状
//   （evidence/agent-loop-260913/chapters.json 的 chapter 对象），一个字段都不新编。
//
// 输入（只读）：
//   evidence/batch-units-260914/units.json                     76 个单元的逐字材料（build-batch-units.mjs 产出）
//   evidence/gen-decisions-hybrid-v3-20260914.json             228 道决策题
//   evidence/review-decisions-260914/review.json               它的独立复核结论（只有 verdict=usable 才接）
//   evidence/review-criteria-260914/review.json                264 条费曼判据的独立复核结论
//   evidence/agent-loop-260913/source-chain.json               58 篇 → 49 来源 → 76 卡（知识根）
//   evidence/trajectories-260914/*.json                        真实轨迹（准入门第二条、第三条的唯一来源）
//   内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/*.yaml   图鉴卡原文（重算逐字命中用）
// 输出：
//   evidence/batch-units-260914/readers.json                   76 份阅读器载荷 ＋ 每条判据的准入结论
//
// 自校验（不过就 exit 1，不写产物、不降级）：
//   ① 每份载荷的每一条逐字材料都能在它声称的来源里找到（indexOf）且 sha256 与磁盘一致；
//   ② 每个单元的三道题逐字等于复核 verdict=usable 的那一份（不改一个字）；
//   ③ 每条判据的三条机器条件都是现算的，不是抄结论；
//   ④ 绑不到逐字原文 / 没有可用决策题的单元照实标 isAllowedToOpen=false，不硬开。
//
// 本脚本**不调用模型、不联网、不生成任何新内容**。

import fs from 'node:fs';
import path from 'node:path';
import { readYamlFields } from './lib/graph-adapter.mjs';
import { sha256File, verbatimForm, resolveUnitsLocator, resolveCardLocator } from './lib/batch-units-rules.mjs';
import { machineQuestionsOf } from './lib/machine-questions.mjs';
import { judgeCriterion } from './lib/criteria-activation.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const BATCH_REL = 'evidence/batch-units-260914/units.json';
const DECISIONS_REL = 'evidence/gen-decisions-hybrid-v3-20260914.json';
const DECISIONS_REVIEW_REL = 'evidence/review-decisions-260914/review.json';
const CRITERIA_REVIEW_REL = 'evidence/review-criteria-260914/review.json';
const CHAIN_REL = 'evidence/agent-loop-260913/source-chain.json';
const TRAJ_DIR_REL = 'evidence/trajectories-260914';
const OUT_REL = 'evidence/batch-units-260914/readers.json';
const CARD_DIR_REL = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';

const read = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const fail = [];
const need = (cond, msg) => { if (!cond) fail.push(msg); };

const batch = read(BATCH_REL);
const decisions = read(DECISIONS_REL);
const decisionsReview = read(DECISIONS_REVIEW_REL);
const criteriaReview = read(CRITERIA_REVIEW_REL);
const chain = read(CHAIN_REL);
const chainCard = new Map(chain.cards.map((c) => [c.slug, c]));
const chainSource = new Map(chain.sources.map((s) => [s.id, s]));
const decisionVerdict = new Map((decisionsReview.units || []).map((r) => [r.unitId, r.verdict]));
const criteriaVerdictOf = new Map((criteriaReview.units || []).map((r) => [r.unitId, r]));
const decisionQ = new Map((decisions.units || []).map((u) => [u.unitId, u.questions || []]));
const primaryType = /^(paper|research|report)$/;

/* ── 真实轨迹：准入门第二条、第三条只认这里 ── */
const TRAJ_REL = `${TRAJ_DIR_REL}/trajectories.json`;
const trajFiles = fs.existsSync(path.join(ROOT, TRAJ_REL)) ? [TRAJ_REL] : [];
const trajectories = trajFiles.length ? (read(TRAJ_REL).trajectories || []) : [];
const realTrajectories = trajectories.filter((t) => t.learnerIs && t.learnerIs.realHuman === true);
console.log(`真实轨迹：${trajectories.length} 份（其中 learnerIs.realHuman=true 的 ${realTrajectories.length} 份）`);

/* ── 逐字材料的总校验：把载荷里每个带出处的节点都重查一遍（indexOf + sha256 + locator） ── */
const unitsSource = read('内容结构化系统/模块/ai-concept-base/data/units.json');
const unitsArr = unitsSource.units || unitsSource;
let citations = 0, badCitations = [];
const sourceCache = new Map();
function sourceOf(rel, isJson) {
  if (!sourceCache.has(rel)) sourceCache.set(rel, { raw: fs.readFileSync(path.join(ROOT, rel), 'utf8'), sha: sha256File(path.join(ROOT, rel)), json: !!isJson });
  return sourceCache.get(rel);
}
function checkCitation(where, c) {
  if (!c || typeof c.text !== 'string' || !c.sourceFile || !c.locator) return;
  citations++;
  const abs = path.join(ROOT, c.sourceFile);
  if (!fs.existsSync(abs)) { badCitations.push(`${where}：来源文件不在 ${c.sourceFile}`); return; }
  const isJson = c.sourceFile.endsWith('.json');
  const s = sourceOf(c.sourceFile, isJson);
  if (s.sha !== c.sourceSha256) { badCitations.push(`${where}：sha256 与磁盘不一致 ${c.sourceFile}`); return; }
  if (!verbatimForm(s.raw, c.text, isJson)) { badCitations.push(`${where}：引文逐字找不到 ${c.sourceFile}#${c.locator}`); return; }
  const got = isJson ? resolveUnitsLocator(unitsArr, c.locator) : resolveCardLocator(s.raw, c.locator, c.sourceFile);
  if (!got.ok) { badCitations.push(`${where}：locator 解不开 ${c.sourceFile}#${c.locator}（${got.why}）`); return; }
  if (got.value !== c.text) badCitations.push(`${where}：locator 指到的不是这句话 ${c.sourceFile}#${c.locator}`);
}

const readers = [];
const perUnit = [];

for (const bu of batch.units) {
  const tag = bu.unitId;
  const card = chainCard.get(bu.card.slug);
  need(!!card, `${tag}：来源链里没有这张卡 ${bu.card.slug}`);
  const cardPath = path.join(ROOT, CARD_DIR_REL, `${bu.card.slug}.yaml`);
  const cardRaw = fs.readFileSync(cardPath, 'utf8');
  const cardY = readYamlFields(cardRaw);
  const cardSha = sha256File(cardPath);

  /* ── 阅读块：逐字搬运 ── */
  const reading = {
    original: { label: '原文 context', text: bu.reading.original.text, citation: bu.reading.original },
    explain: { label: '定义', text: bu.reading.explain.text, from: bu.conceptId, citation: bu.reading.explain },
    intuition: { label: '直觉', text: bu.reading.intuition.text, from: bu.conceptId, citation: bu.reading.intuition },
    mechanism: {
      label: '机制', text: (bu.reading.mechanism.items || []).map((x) => x.text).join(''), from: bu.solution.id,
      /* 逐条材料各自带出处；文本取材料自己的 text（不能再取 citation.text —— 那是同一句，取错也不会报错，只会静默对不上） */
      citations: (bu.reading.mechanism.items || []).map((x) => ({ text: x.text, sourceFile: x.sourceFile, sourceSha256: x.sourceSha256, locator: x.locator })),
      citation: (bu.reading.mechanism.items || [])[0] || null,
    },
    boundary: { label: '边界', items: (bu.reading.boundary.items || []).map((x) => x.text), from: bu.conceptId, citations: bu.reading.boundary.items || [] },
  };
  checkCitation(`${tag} 原文 context`, bu.reading.original);
  checkCitation(`${tag} 定义`, bu.reading.explain);
  checkCitation(`${tag} 直觉`, bu.reading.intuition);
  (bu.reading.mechanism.items || []).forEach((x, i) => checkCitation(`${tag} 机制[${i}]`, x));
  (bu.reading.boundary.items || []).forEach((x, i) => checkCitation(`${tag} 边界[${i}]`, x));

  /* ── 决策题：逐字搬 v3 里复核通过的那一份（字段搬运，不改一个字） ── */
  const verdict = decisionVerdict.get(bu.unitId) || null;
  const src = decisionQ.get(bu.unitId) || [];
  need(JSON.stringify(bu.decisions || []) === JSON.stringify(src), `${tag}：单元里的题与决策题产物不一致（被改过）`);
  const questions = machineQuestionsOf({
    unitId: bu.unitId, decisions: bu.decisions || [], verdict,
    artifactRel: BATCH_REL, decisionsRel: DECISIONS_REL, reviewRel: DECISIONS_REVIEW_REL,
  });
  if (verdict === 'usable') need(questions.length === 3, `${tag}：复核 verdict=usable 但搬出来的题不是 3 道（${questions.length}）`);
  else need(questions.length === 0, `${tag}：复核 verdict=${verdict}，不该搬题`);
  questions.forEach((q, qi) => {
    need((q.options || []).length === 3 && q.options.filter((o) => o.correct).length === 1, `${tag} 第 ${qi + 1} 题不是三选一恰好一对`);
    const r = (q.options || []).find((o) => o.correct) || {};
    need(!!r.basisQuote, `${tag} 第 ${qi + 1} 题正解没有 basisQuote`);
  });

  /* ── 费曼判据：逐条搬，逐条现算三条机器条件（三条准入线的落点） ── */
  const checks = (bu.feynman.checks || []).map((c) => {
    checkCitation(`${tag} 判据 ${c.id}`, c);
    const j = judgeCriterion(
      { id: c.id, unitId: bu.unitId, point: c.point, condition: c.condition, misconception: c.misconception,
        text: c.condition, sourceFile: c.sourceFile, sourceSha256: c.sourceSha256, locator: c.locator, escapeForm: c.escapeForm },
      { trajectories: realTrajectories, unitSource: { raw: sourceOf(bu.reading.original.sourceFile, true).raw, json: true } },
    );
    return {
      id: c.id, point: c.point, condition: c.condition, misconception: c.misconception,
      misconceptionSource: c.misconceptionSource, derivation: c.derivation,
      sourceFile: c.sourceFile, sourceSha256: c.sourceSha256, locator: c.locator, escapeForm: c.escapeForm,
      origin: {
        kind: 'machine', unitId: bu.unitId, checkId: c.id,
        artifact: `${BATCH_REL}#units[unitId=${bu.unitId}].feynman.checks[]`,
        derivedFrom: `${bu.card.file}#${c.locator}`,
        review: `${CRITERIA_REVIEW_REL}#units[unitId=${bu.unitId}]`,
        verdict: (criteriaVerdictOf.get(bu.unitId) || {}).verdict || 'unreviewed',
        note: 'misconception 是卡片 boundaries 的机械反面转述（独立复核 verdict=blocked）：默认「待验证区分度」，不参与通过判定；'
          + '走出一条真实轨迹后按三条机器条件自动激活。',
      },
      admission: j,
      gate: j.active === true,     // 只有三条机器条件全过才进通过判定
    };
  });
  need(checks.length === (bu.feynman.required || []).length, `${tag}：判据数与 required 不一致`);
  need(checks.every((c, i) => c.point === bu.feynman.required[i]), `${tag}：判据 point 与 required 不逐字一致`);

  /* ── 知识根（58 篇 → 卡 → 本单元） ── */
  const cardFile = `${CARD_DIR_REL}/${bu.card.slug}.yaml`;
  need(cardSha === bu.card.sha256, `${tag}：卡片 sha256 与装配时不一致`);
  const originalSources = ((card && card.sourceIds) || []).map((id) => chainSource.get(id)).filter(Boolean)
    .map((s) => ({ id: s.id, title: s.title, author: s.author, url: s.url, type: s.sourceType, primary: primaryType.test(s.sourceType) }));

  const isAllowed = !bu.superseded && verdict === 'usable' && questions.length === 3 && citationsOkForUnit(tag);
  function citationsOkForUnit(t) { return !badCitations.some((x) => x.startsWith(t + ' ')); }

  const reader = {
    chapterId: bu.unitId,
    order: bu.order,
    title: `${cardY.name_zh || bu.conceptId}`,
    kind: 'batch',
    cm: {
      id: bu.conceptId, name: cardY.name_zh || bu.conceptId, description: cardY.remember || '',
      feynman: cardY.feynman || '', sourceContext: cardY.source_context || '',
      aliases: cardY.aliases || [], evidence: [], assessmentPrompt: cardY.transfer_question || '',
      domain: cardY.category_id || '', level: cardY.learning_stage || '', kind: cardY.definition_status || '',
    },
    concept: {
      id: bu.conceptId, title: (bu.concepts[0] || {}).title ? bu.concepts[0].title.text : (cardY.name_zh || bu.conceptId),
      definition: bu.reading.explain.text, intuition: bu.reading.intuition.text,
      boundary: (bu.reading.boundary.items || []).map((x) => x.text),
      transferQuestion: cardY.transfer_question || '', categoryQuestion: '',
      sourceLines: [], sources: (bu.concepts[0] || {}).sourceDocuments || [], status: (bu.concepts[0] || {}).status || '',
    },
    qst: { id: bu.qst.id, title: bu.qst.title.text, text: bu.qst.questionText.text, type: '' },
    case: {
      id: bu.case.id, title: bu.case.title.text, summary: bu.case.summary.text, type: bu.case.caseType,
      evidence: bu.case.evidence.text, candidates: [bu.case.id], primaryCaseId: bu.case.id, sources: [],
    },
    opinions: (bu.opinions || []).map((o) => ({ id: o.id, title: o.title.text, claim: o.claim ? o.claim.text : '', scope: '', sources: [] })),
    solution: {
      id: bu.solution.id, title: bu.solution.title.text, targetProblem: bu.solution.targetProblem.text,
      summary: bu.solution.summary.text, actionSteps: (bu.solution.actionSteps || []).map((x) => x.text), sources: [],
    },
    reading,
    framingNote: '',
    questions,
    feynman: {
      prompt: bu.feynman.prompt,
      required: bu.feynman.required,
      checks,
      machineChecks: [],   // 本单元自己的判据就在 checks 里（每条带 admission 结论），不再另放一份
    },
    schemeC: null,
    narrative: null,
    review: {
      status: bu.status, statusNote: bu.statusReason || '',
      caseState: 'candidate', caseMeaning: bu.case.caseHonesty, confirmedAt: '', confirmedBy: '', ownerQuote: '',
      correspondence: null, needsOwnerRuling: false, ruling: null,
    },
    sourceChain: {
      card: bu.card.slug, cardFile: `concepts/${bu.card.slug}.yaml`,
      docs: chain.docs.map((d) => d.id), originalSources,
      primaryCount: originalSources.filter((s) => s.primary).length,
      note: '58 篇（Context 28 ＋ Harness 30）→ 图鉴站卡片 → 本单元；逐字材料由 build-batch-units.mjs 装配，本脚本只编译成阅读器载荷。',
    },
    routeId: 'batch-units-v1', routeTitle: '批量装配单元（76）', routeStep: bu.order, routeSteps: batch.units.length,
    why: `本单元的材料已装配：阅读（逐字原文）· 决策（${questions.length} 道，独立复核 verdict=${verdict || '缺'}）· 费曼判据（${checks.length} 条）。`,
    batchOrigin: {
      unitId: bu.unitId, order: bu.order, status: bu.status, statusReason: bu.statusReason || '',
      superseded: bu.superseded || null,
      card: { slug: bu.card.slug, file: bu.card.file, sha256: bu.card.sha256 },
      gaps: bu.gaps || [],
      decisionsWired: questions.length, decisionVerdict: verdict,
      criteriaTotal: checks.length, criteriaActive: checks.filter((c) => c.gate).length,
      criteriaPending: checks.filter((c) => !c.gate).length,
      reader: OUT_REL, builtBy: 'scripts/build-batch-materials.mjs',
      sourceChain: { chain: CHAIN_REL, docs: chain.docs.length, sources: originalSources.length },
      note: '这一份是批量单元的阅读器载荷：正文一律逐字搬运（每条带 sourceFile + sha256 + locator），'
        + '不新编内容、不调用模型。判据默认「待验证区分度」，走出一条真实轨迹后按三条机器条件自动激活。',
    },
    isAllowedToOpen: isAllowed,
    blockedBy: [
      bu.superseded ? `已被手工章节 ${bu.superseded.by} 取代（superseded，永久不开放）` : null,
      verdict !== 'usable' ? `决策题独立复核 verdict=${verdict || '缺'}（没有可用的决策题就不开放）` : null,
      questions.length !== 3 ? `搬出来的决策题只有 ${questions.length} 道` : null,
      citationsOkForUnit(tag) ? null : '有逐字材料过不了 indexOf + sha256 校验（绑不到原文就不写、不开放）',
    ].filter(Boolean),
  };
  readers.push(reader);
  perUnit.push(reader);
}

/* ── 出口自校验：任何一条对不上都不写产物 ── */
const badSha = badCitations.filter((x) => /sha256/.test(x));
need(badCitations.length === 0, `逐字校验失败 ${badCitations.length} 条：\n    ` + badCitations.slice(0, 10).join('\n    '));
const allowed = readers.filter((r) => r.isAllowedToOpen);
const superseded = readers.filter((r) => r.batchOrigin.superseded);
const criteriaTotal = readers.reduce((n, r) => n + r.feynman.checks.length, 0);
const criteriaActive = readers.reduce((n, r) => n + r.feynman.checks.filter((c) => c.gate).length, 0);

if (fail.length) {
  console.error(`❌ 阅读载荷编译失败 ${fail.length} 条：`);
  for (const f of fail) console.error('  · ' + f);
  process.exit(1);
}

const out = {
  version: 'v1',
  builtAt: new Date().toISOString(),
  source: {
    units: BATCH_REL, decisions: DECISIONS_REL, decisionsReview: DECISIONS_REVIEW_REL,
    criteriaReview: CRITERIA_REVIEW_REL, sourceChain: CHAIN_REL,
    trajectories: trajectories,          // 轨迹原文随载荷一起落盘（准入判定读它；合成轨迹也照实留着、标了 realHuman:false）
    cards: CARD_DIR_REL,
  },
  policy: {
    noModel: '本产物由一个模型调用都没打的确定性脚本生成（scripts/build-batch-materials.mjs）。',
    verbatim: '所有正文逐字来自 evidence/batch-units-260914/units.json 与图鉴卡；编译时对每条材料重做 indexOf + sha256 + locator 三查（见 stats.citationsChecked）。',
    admission: '每条判据的准入结论（admission）由 scripts/lib/criteria-activation.mjs 现算：①绑了逐字原文 ②有真实轨迹证明它从 not-met 走到 met ③缺口在轨迹上真的下降过。三条不全 → 标「待验证区分度」，不参与通过判定、也不挡单元进入。',
    realHumanOnly: '第二批只认 learnerIs.realHuman === true 的轨迹：脚本扮演的合成轨迹不算「真实轨迹」，照实排除。',
    noEffectClaim: '本产物不声称任何学习效果；它只证明材料逐字可回溯、准入判定可复算。',
  },
  stats: {
    readers: readers.length,
    allowedToOpen: allowed.length,
    superseded: superseded.length,
    pendingAssembly: readers.length - allowed.length,
    citationsChecked: citations,
    criteriaTotal,
    criteriaActive,
    criteriaPending: criteriaTotal - criteriaActive,
    realTrajectories: realTrajectories.length,
    trajectoryFiles: trajectories.length,
  },
  readers,
};

fs.writeFileSync(path.join(ROOT, OUT_REL), JSON.stringify(out, null, 1));
console.log(`✅ 阅读载荷编译完成：${readers.length} 份 → ${OUT_REL}`);
console.log(`   逐字材料 ${citations} 条全部通过 indexOf + sha256 + locator 三查（失败 ${badCitations.length} 条）`);
console.log(`   可开放 ${allowed.length} 份（未被取代 + 决策题复核 usable + 逐字材料全过）；待装配 ${readers.length - allowed.length} 份（superseded ${superseded.length}）`);
console.log(`   判据 ${criteriaTotal} 条：激活 ${criteriaActive} 条 · 待验证区分度 ${criteriaTotal - criteriaActive} 条（真实轨迹 ${realTrajectories.length} 份）`);
if (superseded.length) console.log(`   6 个 superseded 永久不开放：${superseded.map((r) => r.batchOrigin.unitId).join(', ')}`);
