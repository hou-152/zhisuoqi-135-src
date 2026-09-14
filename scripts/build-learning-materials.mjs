#!/usr/bin/env node
// 把「Agent Loop 六章」的材料配对装配成壳可用的章节数据。
//
// 输入（全部只读）：
//   evidence/agent-loop-260913/pairings.json   人工材料配对索引（cm_* ↔ CON-* ↔ CAS/OPI/SOL）
//   evidence/agent-loop-260913/authored.json   agent 撰写的题目与费曼要点（带 basis + basisQuote）
//   内容结构化系统/模块/ai-concept-base/data/units.json   五类语义单元唯一来源
//   knowledge/概念地图-260913/topics.json      概念地图 v2 唯一来源
//   evidence/paths-260913/routes.json          路线顺序唯一来源
// 输出：
//   evidence/agent-loop-260913/chapters.json   章节数据（正文一律逐字搬运，不改写）
//
// 本脚本不调用模型。任何 ID 对不上、类型不对、主案例不在候选里、题目不是「三选一恰好一对」、
// basisQuote 在该字段里找不到原文，都会直接失败——缺材料时宁可构建不出来，也不编造补齐。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'agent-loop-260913');
const UNITS = path.join(ROOT, '内容结构化系统', '模块', 'ai-concept-base', 'data', 'units.json');
const TOPICS = path.join(ROOT, 'knowledge', '概念地图-260913', 'topics.json');
const ROUTES = path.join(ROOT, 'evidence', 'paths-260913', 'routes.json');
const OUT = path.join(DIR, 'chapters.json');

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const pairings = read(path.join(DIR, 'pairings.json'));
const authored = read(path.join(DIR, 'authored.json'));
const units = read(UNITS);
const byUnit = new Map(units.map((u) => [u.id, u]));
const topics = read(TOPICS).topics;
const byTopic = new Map(topics.map((t) => [t.id, t]));
const route = read(ROUTES).routes.find((r) => r.routeId === 'agent-continuous-action-v1');
if (!route) throw new Error('routes.json 里找不到 agent-continuous-action-v1');

/* 来源链（scripts/build-source-chain.mjs 产出）：58 篇 → 49 个原始来源 → 76 张卡。
   章节只带「这张卡引用了哪些原始来源」，让页面能显示知识根；链本身的核对在链脚本里做。 */
const CHAIN = read(path.join(DIR, 'source-chain.json'));
const chainSource = new Map(CHAIN.sources.map((s) => [s.id, s]));
const chainCard = new Map(CHAIN.cards.map((c) => [c.slug, c]));
const PRIMARY_TYPE = /^(paper|research|report)$/;

const fail = [];
const need = (cond, msg) => { if (!cond) fail.push(msg); };
const TYPE_OF = { CON: '概念单元', QST: '问题单元', CAS: '案例单元', OPI: '观点单元', SOL: '方案单元' };
const unit = (id, prefix) => {
  const u = byUnit.get(id);
  need(!!u, `单元不存在：${id}`);
  if (!u) return null;
  need(u.type === TYPE_OF[prefix], `${id} 类型应为 ${TYPE_OF[prefix]}，实为 ${u.type}`);
  return u;
};

/* ── CON 正文解析：定义／费曼一下／边界／迁移问题／分类问题／来源依据 ── */
const cut = (re) => re && re[1] ? re[1].trim() : '';
function parseConceptBody(body) {
  const definition = cut(body.match(/\*\*定义（remember）\*\*：([\s\S]*?)(?=\n\n\*\*)/));
  const intuition = cut(body.match(/\*\*费曼一下\*\*：([\s\S]*?)(?=\n\n\*\*)/));
  const boundaryBlock = cut(body.match(/\*\*边界（明确不成立的用法）\*\*\n([\s\S]*?)(?=\n\*\*迁移问题)/));
  const transfer = cut(body.match(/\*\*迁移问题\*\*：([\s\S]*?)(?=\n\n\*\*)/));
  const category = cut(body.match(/\*\*分类问题\*\*：([\s\S]*?)(?=\n\n##|$)/));
  const srcBlock = cut(body.match(/\n## 来源依据\n([\s\S]*?)(?=\n## )/));
  return {
    definition, intuition, transfer, category,
    boundary: boundaryBlock.split('\n').map((l) => l.replace(/^-\s*/, '').trim()).filter(Boolean),
    sourceLines: srcBlock.split('\n').map((l) => l.replace(/^-\s*/, '').trim()).filter(Boolean),
  };
}

/* ── basis 解析与逐字校验 ── */
function resolveBasis(ref) {
  const [id, field] = ref.split('#');
  /* 方案丙并入的机器题里，有一条正解依据落在图鉴卡上（concepts/agent.yaml#boundaries[0]）：
     卡片依据照样要逐字回源，所以这里一起解，不因为它不是 SOL/OPI 就跳过。 */
  if (/^concepts\/[a-z0-9-]+\.yaml$/.test(id)) {
    const slug = id.replace(/^concepts\//, '').replace(/\.yaml$/, '');
    const card = chainCard.get(slug);
    if (!card) return { ok: false, why: `basis 卡片不在来源链里：${id}` };
    const raw = fs.readFileSync(path.join(ROOT, '内容结构化系统', '01-原始素材区', '完整副本', '图鉴站产物', 'concepts', `${slug}.yaml`), 'utf8');
    const m = /^([a-z_]+)\[(\d+)]$/.exec(field || '');
    if (m) {
      const lines = raw.split('\n');
      const items = [];
      let inBlock = false;
      for (const line of lines) {
        if (new RegExp(`^${m[1]}:`).test(line)) { inBlock = true; continue; }
        if (inBlock && /^[a-z_]+:/.test(line)) break;
        if (inBlock) { const t = line.replace(/^\s*-\s?/, '').trim(); if (t) items.push(t); }
      }
      const text = items[Number(m[2])];
      if (typeof text !== 'string' || !text.trim()) return { ok: false, why: `basis 卡片字段为空：${ref}` };
      return { ok: true, text, card: id };
    }
    return { ok: false, why: `basis 卡片字段名不认：${ref}` };
  }
  const u = byUnit.get(id);
  if (!u) return { ok: false, why: `basis 单元不存在：${id}` };
  const kf = u.key_fields || {};
  let text;
  const m = field && field.match(/^action_steps\[(\d+)]$/);
  if (m) text = (kf.action_steps || [])[Number(m[1])];
  else if (field === 'target_problem') text = kf.target_problem;
  else if (field === 'solution_summary') text = kf.solution_summary;
  else if (field === 'core_claim') text = kf.core_claim;
  else if (field === 'claim_scope') text = kf.claim_scope;
  else return { ok: false, why: `basis 字段名不认：${ref}` };
  if (typeof text !== 'string' || !text.trim()) return { ok: false, why: `basis 指向的字段为空：${ref}` };
  return { ok: true, text };
}

/* ══ 方案丙（负责人 2026-09-14 拍板）：把 6 个重复批量单元的产出反向补进对应章节 ══
   六章仍是对外唯一入口；同一个 CON 的机器版本标 superseded、不再作为独立可学单元
   （标记在 evidence/batch-units-260914/units.json，准入门读它）。丙的价值在这里：
     · 机器题：只并入 evidence/review-decisions-260914/review.json 判定 verdict=usable 的那 3 道
       （引用复核产物，不重新生成一套），排在人工三题之后，逐条标 origin；
     · 机器判据：卡片 boundaries 派生（未通过理解判据复核 verdict=unusable），
       放进 feynman.machineChecks 并标 gate:false —— 显示为「机器派生补充判据」，**不参与本章通过判定**；
     · 人工内容优先：人工三题与三条判据一个字不改，机器内容一律带 kind='machine' 的来源标签。 */
const BATCH_ARTIFACT_REL = 'evidence/batch-units-260914/units.json';
const DECISIONS_ARTIFACT_REL = 'evidence/gen-decisions-hybrid-v3-20260914.json';
const DECISIONS_REVIEW_REL = 'evidence/review-decisions-260914/review.json';
const CRITERIA_REVIEW_REL = 'evidence/review-criteria-260914/review.json';
const batchArtifact = fs.existsSync(path.join(ROOT, BATCH_ARTIFACT_REL)) ? read(path.join(ROOT, BATCH_ARTIFACT_REL)) : null;
const decisionsReview = fs.existsSync(path.join(ROOT, DECISIONS_REVIEW_REL)) ? read(path.join(ROOT, DECISIONS_REVIEW_REL)) : null;
const criteriaReview = fs.existsSync(path.join(ROOT, CRITERIA_REVIEW_REL)) ? read(path.join(ROOT, CRITERIA_REVIEW_REL)) : null;
const batchByConcept = new Map(((batchArtifact || {}).units || []).filter((u) => u.superseded).map((u) => [u.conceptId, u]));
const decisionVerdict = new Map(((decisionsReview || {}).units || []).map((r) => [r.unitId, r.verdict]));
const criteriaVerdict = new Map(((criteriaReview || {}).units || []).map((r) => [r.unitId, r.verdict]));

/** 机器题（v3 形态）→ 章节题形态。只做字段搬运，不改一个字；错项的理由用干扰项自带的 why。 */
function machineQuestionsOf(bu) {
  const out = [];
  if (!bu) return out;
  if (decisionVerdict.get(bu.unitId) !== 'usable') return out;
  for (const [i, q] of (bu.decisions || []).entries()) {
    const co = q.correctOption || {};
    const field = String(co.locator || '').replace(/^units\[id=[^\]]+]\.key_fields\./, '');
    const basisRef = co.basis && field ? `${co.basis}#${field}` : '';
    const options = [
      { text: co.text, correct: true, why: '', basis: basisRef ? [basisRef] : [], basisQuote: co.basisQuote || '' },
      ...(q.distractors || []).map((d) => ({
        text: d.text, correct: false, why: d.why || '与材料里那一条动作不一致。',
        basis: [], basisQuote: '',
      })),
    ];
    need(!!basisRef, `${bu.unitId} 第 ${i + 1} 道机器题没有可搬运的依据引用`);
    need(options.length === 3 && options.filter((o) => o.correct).length === 1, `${bu.unitId} 第 ${i + 1} 道机器题不是三选一恰好一对`);
    out.push({
      judgment: `机器复核题 ${i + 1}｜来自 ${bu.unitId} 第 ${i + 1} 道（已独立复核 verdict=usable）`,
      prompt: q.prompt,
      options,
      origin: {
        kind: 'machine', unitId: bu.unitId, questionId: q.id,
        artifact: `${BATCH_ARTIFACT_REL}#units[unitId=${bu.unitId}].decisions[${i}]`,
        generatedFrom: `${DECISIONS_ARTIFACT_REL}#units[unitId=${bu.unitId}].questions[${i}]`,
        review: `${DECISIONS_REVIEW_REL}#units[unitId=${bu.unitId}]`,
        verdict: 'usable',
        note: '脚本确定性生成（模型调用 0 次）＋独立复核通过；人工三题排在本章最前，机器题不覆盖人工内容',
      },
    });
  }
  return out;
}

/** 卡片 boundaries 派生判据（原样搬运，标 derived 与复核结论；gate=false 表示不参与本章通过判定）。 */
function machineChecksOf(bu) {
  const out = [];
  if (!bu) return out;
  for (const [i, c] of ((bu.feynman || {}).checks || []).entries()) {
    out.push({
      id: c.id, point: c.point, condition: c.condition, misconception: c.misconception,
      misconceptionSource: c.misconceptionSource, derivation: c.derivation,
      sourceFile: c.sourceFile, sourceSha256: c.sourceSha256, locator: c.locator, escapeForm: c.escapeForm,
      gate: false,
      origin: {
        kind: 'machine', unitId: bu.unitId, checkId: c.id,
        artifact: `${BATCH_ARTIFACT_REL}#units[unitId=${bu.unitId}].feynman.checks[${i}]`,
        derivedFrom: `${bu.card.file}#${c.locator}`,
        review: `${CRITERIA_REVIEW_REL}#units[unitId=${bu.unitId}]`,
        verdict: criteriaVerdict.get(bu.unitId) || 'unreviewed',
        note: 'misconception 是卡片 boundaries 的机械反面转述，独立复核 verdict=unusable：可当复习提示，不作为本章通过判据',
      },
    });
  }
  return out;
}

/* ══ 逐章装配 ═════════════════════════════════════════════ */
const chapters = [];
const feynmanSets = [];

for (const ch of pairings.chapters) {
  const tag = `第 ${ch.order} 章 ${ch.chapterId}`;
  const topic = byTopic.get(ch.cmId);
  need(!!topic, `${tag}：概念地图里没有 ${ch.cmId}`);
  const routeStep = (route.steps || []).find((s) => s.conceptId === ch.cmId);
  need(!!routeStep, `${tag}：路线里没有 ${ch.cmId}`);
  need(routeStep && routeStep.order === ch.order, `${tag}：路线 order=${routeStep && routeStep.order}，配对记录 order=${ch.order}`);

  const con = unit(ch.conceptId, 'CON');
  const qst = unit(ch.qstId, 'QST');
  const sol = unit(ch.solutionIds[0], 'SOL');
  const casList = (ch.caseIds || []).map((id) => unit(id, 'CAS'));
  const opis = (ch.opinionIds || []).map((id) => unit(id, 'OPI'));
  const body = parseConceptBody((con && con.body) || '');

  // 候选案例必须来自 relationships.target，不按标题猜
  const casByRelation = units.filter((u) => u.type === '案例单元' && (u.relationships || []).some((r) => r.target === ch.conceptId)).map((u) => u.id);
  for (const id of ch.caseIds) need(casByRelation.includes(id), `${tag}：${id} 不是 ${ch.conceptId} 的 relationships 候选案例（候选：${casByRelation.join(',') || '无'}）`);
  need(ch.caseIds.includes(ch.primaryCaseId), `${tag}：primaryCaseId ${ch.primaryCaseId} 不属于 caseIds`);

  // 依据单元必须挂在同一个概念上
  for (const id of [...(ch.opinionIds || []), ...(ch.solutionIds || [])]) {
    const u = byUnit.get(id);
    need(!!u && (u.relationships || []).some((r) => r.target === ch.conceptId), `${tag}：${id} 的 relationships 里没有 ${ch.conceptId}`);
  }

  const a = authored.chapters[ch.chapterId];
  need(!!a, `${tag}：authored.json 里没有这一章`);
  const questions = (a && a.questions) || [];
  need(questions.length === 3, `${tag}：题目应为 3 道，实为 ${questions.length}`);
  const judgments = new Set();
  questions.forEach((q, qi) => {
    const no = `${tag} 第 ${qi + 1} 题`;
    need(Array.isArray(q.options) && q.options.length === 3, `${no}：选项应为 3 个，实为 ${(q.options || []).length}`);
    const right = (q.options || []).filter((o) => o.correct === true);
    need(right.length === 1, `${no}：正确选项应为 1 个，实为 ${right.length}`);
    if (right.length === 1) {
      const r = right[0];
      need(Array.isArray(r.basis) && r.basis.length > 0, `${no}：正确选项没有 basis`);
      const resolved = [];
      for (const ref of r.basis || []) {
        const id = ref.split('#')[0];
        need([...(ch.opinionIds || []), ...(ch.solutionIds || [])].includes(id), `${no}：basis ${ref} 不属于本章的 OPI/SOL（${[...(ch.opinionIds || []), ...(ch.solutionIds || [])].join(',') || '无'}）`);
        const got = resolveBasis(ref);
        need(got.ok, `${no}：${got.why || ''}`);
        if (got.ok) resolved.push({ ref, text: got.text });
      }
      // basisQuote 必须在**其中至少一个**被引用的字段里逐字存在（一个答案可以同时落在两步动作上）
      need(resolved.some((x) => x.text.includes(r.basisQuote)),
        `${no}：basisQuote 在所有被引用字段里都找不到原文\n    引用：${r.basisQuote}\n    字段：${resolved.map((x) => x.ref + ' → ' + x.text.slice(0, 120)).join('\n          ')}`);
    }
    for (const o of q.options || []) {
      // 错误选项必须写清为什么错；正确选项由 basis 承担「凭什么对」
      need(o.correct === true || !!o.why, `${no}：错误选项缺 why（解释）`);
    }
    need(!judgments.has(q.judgment), `${no}：判断维度与前面重复（${q.judgment}）`);
    judgments.add(q.judgment);
  });

  const fey = a && a.feynman;
  need(!!fey && Array.isArray(fey.required) && fey.required.length === 3, `${tag}：费曼要点应为 3 条`);
  if (fey) feynmanSets.push({ chapterId: ch.chapterId, required: fey.required });

  /* ── 费曼要点：稳定 ID ＋ 成立条件 ＋ 常见误解（交接件 §4.3） ──
     加 ID 不得改动题面与既有要点措辞：这里逐条卡住 ID 形状、顺序和 point 与 required 的逐字一致。 */
  if (fey) {
    const ck = fey.checks;
    need(Array.isArray(ck) && ck.length === fey.required.length,
      `${tag}：费曼要点每条都要带 checks（稳定 ID／成立条件／常见误解），应有 ${fey.required.length} 条`);
    const checkIds = new Set();
    (Array.isArray(ck) ? ck : []).forEach((x, i) => {
      const no = `${tag} 费曼要点 ${i + 1}`;
      need(x.id === `${ch.chapterId}-F${i + 1}` && !checkIds.has(x.id), `${no}：稳定 ID 应为 ${ch.chapterId}-F${i + 1}（实得 ${x.id}）`);
      checkIds.add(x.id);
      need(x.point === fey.required[i], `${no}：point 必须与 required[${i}] 逐字一致（实得「${x.point}」）`);
      need((x.condition || '').length >= 8, `${no}：缺成立条件（condition，≥8 字）`);
      need((x.misconception || '').length >= 8, `${no}：缺常见误解（misconception，≥8 字）`);
    });
  }

  /* ── 正文流（narrative）：连线写成解释句。句子是 agent 撰写的，quote 必须逐字回源 ── */
  const nar = a && a.narrative;
  if (nar) {
    const primaryKf = (byUnit.get(ch.primaryCaseId) || {}).key_fields || {};
    const blocks = {
      definition: body.definition, intuition: body.intuition, boundary: body.boundary.join('\n'),
      mechanism: (sol.key_fields || {}).solution_summary || '', case: primaryKf.case_summary || '',
    };
    need(nar.authored === true, `${tag}：narrative 必须标 authored:true（agent 撰写，不得冒充原文）`);
    need(!!nar.lead, `${tag}：narrative 缺 lead（这一页要弄明白什么）`);
    (nar.bridges || []).forEach((b, i) => {
      const no = `${tag} 过渡句 ${i + 1}`;
      need(!!b.question && !!b.answer, `${no}：缺 question／answer`);
      need(Array.isArray(b.basis) && b.basis.length > 0 && b.basis.every((id) => byUnit.has(id)), `${no}：basis 必须是存在的单元 ID`);
      need(!!b.quote && String(blocks[b.quoteFrom] || '').includes(b.quote), `${no}：quote 在本章 ${b.quoteFrom} 里找不到逐字原文`);
    });
    (nar.links || []).forEach((l, i) => {
      const no = `${tag} 关系句 ${i + 1}`;
      need(Array.isArray(l.pair) && l.pair.length === 2 && !!l.sentence, `${no}：缺 pair／sentence`);
      need(!!l.quote && String(blocks[l.quoteFrom] || '').includes(l.quote), `${no}：quote 在本章 ${l.quoteFrom} 里找不到逐字原文`);
    });
    need(nar.inlineFeynman === true, `${tag}：narrative.inlineFeynman 必须为 true（读完就讲）`);
    if (nar.nextBridge) need(!!nar.nextBridge.question && !!nar.nextBridge.answer, `${tag}：nextBridge 缺 question／answer`);
  }

  if (fail.length) continue;   // 有硬伤就不产出这一章，避免半成品混进页面

  const cm = {
    id: topic.id, name: topic.name, description: topic.description || '', feynman: topic.feynman || '',
    sourceContext: topic.sourceContext || '', aliases: topic.aliases || [], evidence: topic.evidence || [],
    assessmentPrompt: String(topic.assessmentPrompt || '').replace(/\{\{name}}/g, topic.name),
    domain: topic.domain, level: topic.level, kind: topic.kind || '',
  };
  const primary = byUnit.get(ch.primaryCaseId);
  const cardSlug = (body.sourceLines.join('\n').match(/concepts\/([a-z0-9-]+)\.yaml/) || [])[1] || '';
  const card = chainCard.get(cardSlug);
  need(!!card, `${tag}：来源链里找不到卡片 ${cardSlug || '(CON 的 sourceLines 没写 concepts/*.yaml)'}`);
  const originalSources = ((card && card.sourceIds) || []).map((id) => chainSource.get(id)).filter(Boolean)
    .map((s) => ({ id: s.id, title: s.title, author: s.author, url: s.url, type: s.sourceType, primary: PRIMARY_TYPE.test(s.sourceType) }));
  need(originalSources.length > 0, `${tag}：卡片 ${cardSlug} 没有可解析的原始来源`);
  const chapter = {
    chapterId: ch.chapterId,
    order: ch.order,
    title: cm.name,
    routeId: route.routeId,
    routeTitle: route.title,
    routeStep: routeStep.order,
    routeSteps: route.steps.length,
    why: routeStep.why || '',
    cm,
    concept: {
      id: con.id, title: con.title, definition: body.definition, intuition: body.intuition,
      boundary: body.boundary, transferQuestion: body.transfer, categoryQuestion: body.category,
      sourceLines: body.sourceLines, sources: con.source_documents || [], status: con.status,
    },
    qst: { id: qst.id, title: qst.title, text: (qst.key_fields || {}).question_text || '', type: (qst.key_fields || {}).question_type || '' },
    case: {
      id: primary.id, title: primary.title, summary: (primary.key_fields || {}).case_summary || '',
      type: (primary.key_fields || {}).case_type || '', evidence: (primary.key_fields || {}).case_evidence || '',
      candidates: casByRelation, primaryCaseId: ch.primaryCaseId, sources: primary.source_documents || [],
    },
    opinions: opis.map((o) => ({ id: o.id, title: o.title, claim: (o.key_fields || {}).core_claim || '', scope: (o.key_fields || {}).claim_scope || '', sources: o.source_documents || [] })),
    solution: {
      id: sol.id, title: sol.title, targetProblem: (sol.key_fields || {}).target_problem || '',
      summary: (sol.key_fields || {}).solution_summary || '', actionSteps: (sol.key_fields || {}).action_steps || [],
      sources: sol.source_documents || [],
    },
    reading: {
      original: { label: '原文 context', text: cm.sourceContext },
      explain: { label: '定义', text: body.definition, from: con.id },
      intuition: { label: '直觉', text: body.intuition, from: con.id },
      mechanism: { label: '机制', text: (sol.key_fields || {}).solution_summary || '', from: sol.id },
      boundary: { label: '边界', items: body.boundary, from: con.id },
    },
    framingNote: (ch.correspondence && ch.correspondence.framingDifference) || '',
    questions: [
      ...questions.map((q, qi) => ({
        judgment: q.judgment, prompt: q.prompt,
        options: q.options.map((o) => ({ text: o.text, correct: !!o.correct, why: o.why || '', basis: o.basis || [], basisQuote: o.basisQuote || '' })),
        origin: { kind: 'hand', file: `evidence/agent-loop-260913/authored.json#chapters.${ch.chapterId}.questions[${qi}]`, note: '人工撰写；本章通过判定只用这三道' },
      })),
      ...machineQuestionsOf(batchByConcept.get(ch.conceptId)),
    ],
    feynman: {
      prompt: fey.prompt, required: fey.required,
      checks: (fey.checks || []).map((x, xi) => ({ ...x, origin: { kind: 'hand', file: `evidence/agent-loop-260913/authored.json#chapters.${ch.chapterId}.feynman.checks[${xi}]`, note: '人工撰写；本章通过判定只用这三条' } })),
      machineChecks: machineChecksOf(batchByConcept.get(ch.conceptId)),
    },
    schemeC: (() => {
      const bu = batchByConcept.get(ch.conceptId);
      if (!bu) return null;
      return {
        decidedBy: 'owner', at: '2026-09-14', ruling: '方案丙',
        supersededUnit: bu.unitId,
        supersededReason: (bu.superseded || {}).reason || '',
        merged: {
          machineQuestions: machineQuestionsOf(bu).length,
          machineChecks: machineChecksOf(bu).length,
          decisionsReview: DECISIONS_REVIEW_REL,
          criteriaReview: CRITERIA_REVIEW_REL,
          criteriaVerdict: criteriaVerdict.get(bu.unitId) || 'unreviewed',
        },
        note: '六章仍是对外唯一入口：机器版本不再作为独立可学单元（标 superseded、写进缺口清单），'
          + '它已复核的决策题与卡片 boundaries 派生判据并入本章，逐条标了来源。',
      };
    })(),
    narrative: nar || null,
    review: {
      status: ch.status, statusNote: ch.statusNote,
      caseState: pairings.caseReview.state, caseMeaning: pairings.caseReview.meaning,
      confirmedAt: pairings.caseReview.confirmedAt || '', confirmedBy: pairings.caseReview.confirmedBy || '',
      ownerQuote: pairings.caseReview.ownerQuote || '',
      correspondence: ch.correspondence,
      needsOwnerRuling: !!(ch.correspondence && ch.correspondence.needsOwnerRuling),
      ruling: (ch.correspondence && ch.correspondence.ruling) || null,
    },
    sourceChain: {
      card: cardSlug, cardFile: `concepts/${cardSlug}.yaml`,
      docs: CHAIN.docs.map((d) => d.id),
      originalSources,
      primaryCount: originalSources.filter((s) => s.primary).length,
      note: '58 篇（Context 28 ＋ Harness 30）→ 图鉴站卡片 → 本单元的 CON/CAS/SOL；卡片 source_ids 指向的原始来源见 originalSources。',
    },
  };
  /* ── 方案丙并入内容的自校验：题量、依据逐字、判据出处 sha 一致、人工内容没被覆盖 ──
     对不上就不产出这一章（下面的 fail 检查会直接失败退出，不写半成品）。 */
  {
    const supBu = batchByConcept.get(ch.conceptId);
    if (supBu) {
      need(supBu.card.slug === cardSlug, `${tag}：batch 单元的卡片 ${supBu.card.slug} 与本章卡片 ${cardSlug} 不是同一张`);
      const mq = chapter.questions.filter((q) => (q.origin || {}).kind === 'machine');
      const mc = (chapter.feynman.machineChecks || []);
      need(questions.length === 3 && chapter.questions.length === 6, `${tag}：并入后应为人工 3 题 + 机器 3 题（实为 ${chapter.questions.length}）`);
      need(mq.length === 3, `${tag}：并入的机器题应为 3 道（实为 ${mq.length}）`);
      need(mc.length === (supBu.feynman.checks || []).length, `${tag}：并入的机器判据数应等于 batch 单元的判据数`);
      need(decisionVerdict.get(supBu.unitId) === 'usable', `${tag}：并入的机器题必须来自复核 verdict=usable 那一批（实为 ${decisionVerdict.get(supBu.unitId)}）`);
      need(criteriaVerdict.get(supBu.unitId) !== 'usable', `${tag}：机器判据复核 verdict 变了——它现在是 ${criteriaVerdict.get(supBu.unitId)}，要重新决定能不能进通过判定`);
      mq.forEach((q, qi) => {
        const r = q.options.find((o) => o.correct);
        const got = resolveBasis((r.basis || [])[0] || '');
        need(got.ok && got.text.includes(r.basisQuote), `${tag} 机器题 ${qi + 1}：basisQuote 在依据字段里找不到逐字原文（${(r.basis || [])[0]}）`);
        need(new Set(q.options.map((o) => o.text)).size === 3, `${tag} 机器题 ${qi + 1}：选项有重复`);
        need(q.options.filter((o) => !o.correct).every((o) => !!o.why), `${tag} 机器题 ${qi + 1}：错误选项缺 why`);
      });
      const sha = (rel) => crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, rel), 'utf8')).digest('hex');
      mc.forEach((c, ci) => {
        need(c.sourceFile === `concepts/${cardSlug}.yaml` || c.sourceFile.endsWith(`concepts/${cardSlug}.yaml`), `${tag} 机器判据 ${ci + 1}：出处不是本章卡片`);
        need(sha(c.sourceFile) === c.sourceSha256, `${tag} 机器判据 ${ci + 1}：卡片 sha256 与磁盘不一致`);
        need(c.gate === false && c.misconceptionSource === 'derived', `${tag} 机器判据 ${ci + 1}：必须标 derived 且 gate=false`);
        need(c.origin && c.origin.verdict !== 'usable', `${tag} 机器判据 ${ci + 1}：必须带上复核结论（不能冒充已通过）`);
      });
      need((chapter.feynman.checks || []).length === 3 && chapter.feynman.required.length === 3,
        `${tag}：人工判据必须仍是 3 条、required 仍是 3 条（机器判据另放 machineChecks，不进通过判定）`);
    } else {
      need(!(chapter.questions || []).some((q) => (q.origin || {}).kind === 'machine'),
        `${tag}：这一章没有对应的 superseded 批量单元，不该有机器题`);
    }
  }

  chapters.push(chapter);
}

/* ── 费曼要点必须按章制定 ── */
const keys = feynmanSets.map((f) => f.required.join('|'));
need(new Set(keys).size === keys.length, `费曼要点有重复章节：${feynmanSets.filter((f, i) => keys.indexOf(f.required.join('|')) !== i).map((f) => f.chapterId).join(',')}`);
const CONTEXT_ROT = ['变量', '证据', '边界'].join('|');
need(!keys.includes(CONTEXT_ROT), '有章节直接套用了上下文腐烂那一章的费曼要点（变量／证据／边界）');
for (const f of feynmanSets) {
  const overlap = f.required.filter((k) => ['变量', '证据', '边界'].includes(k));
  need(overlap.length === 0, `${f.chapterId} 的费曼要点与上下文腐烂重叠：${overlap.join(',')}`);
}

if (fail.length) {
  console.error(`❌ 材料体检失败 ${fail.length} 条：`);
  for (const f of fail) console.error('  · ' + f);
  process.exit(1);
}

const out = {
  version: pairings.version,
  generatedAt: pairings.generatedAt,
  builtAt: new Date().toISOString(),
  source: {
    pairings: 'evidence/agent-loop-260913/pairings.json',
    authored: 'evidence/agent-loop-260913/authored.json',
    units: '内容结构化系统/模块/ai-concept-base/data/units.json',
    topics: 'knowledge/概念地图-260913/topics.json',
    routes: 'evidence/paths-260913/routes.json',
  },
  route: { routeId: route.routeId, title: route.title, entryQuestion: route.entryQuestion, target: route.target, stopCondition: route.stopCondition, curator: route.curator || 'human' },
  caseReview: pairings.caseReview,
  gaps: pairings.gaps || [],
  chapters,
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));

console.log(`✅ 章节数据就绪：${chapters.length} 章`);
for (const c of chapters) {
  console.log(`  第 ${c.order} 章 ${c.title}｜cm ${c.cm.id} ↔ ${c.concept.id}｜候选案例 ${c.case.candidates.length}（主案例 ${c.case.id}·${c.case.type}）｜OPI ${c.opinions.length}｜SOL ${c.solution.actionSteps.length} 步｜题 ${c.questions.length}（人工 ${c.questions.filter((q) => (q.origin || {}).kind === 'hand').length} + 机器 ${c.questions.filter((q) => (q.origin || {}).kind === 'machine').length}）｜费曼判据 ${(c.feynman.checks || []).length} 人工 + ${(c.feynman.machineChecks || []).length} 机器派生（不进通过判定）｜费曼要点 ${c.feynman.required.join('/')}`);
}
console.log(`  状态：${pairings.caseReview.state}（ready ${chapters.filter((c) => c.review.status === 'ready').length} 章 / 共 ${chapters.length} 章）`);
console.log(`  ${path.relative(ROOT, OUT)}`);
