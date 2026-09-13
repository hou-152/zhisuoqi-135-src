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

  if (fail.length) continue;   // 有硬伤就不产出这一章，避免半成品混进页面

  const body = parseConceptBody(con.body || '');
  const cm = {
    id: topic.id, name: topic.name, description: topic.description || '', feynman: topic.feynman || '',
    sourceContext: topic.sourceContext || '', aliases: topic.aliases || [], evidence: topic.evidence || [],
    assessmentPrompt: String(topic.assessmentPrompt || '').replace(/\{\{name}}/g, topic.name),
    domain: topic.domain, level: topic.level, kind: topic.kind || '',
  };
  const primary = byUnit.get(ch.primaryCaseId);
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
    questions: questions.map((q) => ({
      judgment: q.judgment, prompt: q.prompt,
      options: q.options.map((o) => ({ text: o.text, correct: !!o.correct, why: o.why || '', basis: o.basis || [], basisQuote: o.basisQuote || '' })),
    })),
    feynman: { prompt: fey.prompt, required: fey.required },
    review: {
      status: ch.status, statusNote: ch.statusNote,
      caseState: pairings.caseReview.state, caseMeaning: pairings.caseReview.meaning,
      correspondence: ch.correspondence, needsOwnerRuling: !!(ch.correspondence && ch.correspondence.needsOwnerRuling),
    },
  };
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
  console.log(`  第 ${c.order} 章 ${c.title}｜cm ${c.cm.id} ↔ ${c.concept.id}｜候选案例 ${c.case.candidates.length}（主案例 ${c.case.id}·${c.case.type}）｜OPI ${c.opinions.length}｜SOL ${c.solution.actionSteps.length} 步｜三题 ${c.questions.length}｜费曼要点 ${c.feynman.required.join('/')}`);
}
console.log(`  状态：${pairings.caseReview.state}（六章全部为候选装配稿）`);
console.log(`  ${path.relative(ROOT, OUT)}`);
