#!/usr/bin/env node
// 批量装配学习单元：把 76 个 CON 语义单元装配成可运行的学习单元。
//
// 施工单：docs/批量装配学习单元-施工单-20260914.md
// 契约：  docs/总图视图契约-20260914.md
//
// 输入（全部只读，一个字节都不改）：
//   内容结构化系统/模块/ai-concept-base/data/units.json   538 个语义单元（CON 76 + 反向 CAS/SOL/OPI/QST）
//   内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/*.yaml   图鉴卡 76 张
// 输出：
//   evidence/batch-units-260914/units.json
//
// 本脚本**不调用模型、不联网、不生成任何新内容**：所有正文都是逐字搬运，
// 唯一"派生"的字段是费曼判据的 point（该条边界前 12 字）与 misconception（该条边界的反面转述），
// 两者都由确定性规则从同一句话算出来，并在产物里标 derived + 规则名，供 check-batch-units.mjs 重新推导复核。
//
// 自校验（不过就 exit 1，不写产物、不降级）：
//   ① 每条材料都带 sourceFile + sourceSha256 + locator；
//   ② quote 必须能在它声称的来源里逐字找到（JSON 源允许 JSON 转义形态，并把这个形态照实记下来）；
//   ③ locator 必须真的指到那句话（按 locator 解析出来的值 === quote）。

import fs from 'node:fs';
import path from 'node:path';
import { readYamlFields } from './lib/graph-adapter.mjs';
import {
  TYPE_OF, deriveMisconception, firstChars, verbatimForm,
  resolveUnitsLocator, resolveCardLocator, sha256File,
} from './lib/batch-units-rules.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const UNITS_REL = '内容结构化系统/模块/ai-concept-base/data/units.json';
const CARD_DIR_REL = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
const OUT_REL = 'evidence/batch-units-260914/units.json';
const DECISIONS_REL = 'evidence/gen-decisions-hybrid-v3-20260914.json';        // 决策题产物（确定性生成 v3）
const REVIEW_REL = 'evidence/review-decisions-260914/review.json';            // 它的独立复核结论（接入只看这里）

const read = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const rawOf = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const fail = [];
const need = (cond, msg) => { if (!cond) fail.push(msg); };

/** 一条带出处的逐字材料。三个字段一个都不能少；找不到原文就进 fail 列表。 */
let citeCount = 0;
function cite({ source, locator, text }) {
  citeCount++;
  const t = String(text == null ? '' : text);
  const rec = {
    text: t,
    sourceFile: source.rel,
    sourceSha256: source.sha,
    locator,
    escapeForm: 'raw',
  };
  if (!t.trim()) { fail.push(`空引文：${source.rel}#${locator}`); return rec; }
  const form = verbatimForm(source.raw, t, source.json);
  if (!form) {
    fail.push(`引文在来源里逐字找不到：${source.rel}#${locator}\n    引文：${t.slice(0, 120)}`);
    return rec;
  }
  rec.escapeForm = form;
  return rec;
}
/** 引文与 locator 必须互相对得上（不只是"文件里存在这句"，还要"这一句就在这个位置上"）。 */
function citeAt(source, locator, unitsArr) {
  const got = source.json ? resolveUnitsLocator(unitsArr, locator) : resolveCardLocator(source.raw, locator, source.rel);
  if (!got.ok) { fail.push(`locator 解析失败：${source.rel}#${locator} —— ${got.why}`); return null; }
  if (typeof got.value !== 'string') { fail.push(`locator 指到的不是字符串：${source.rel}#${locator}`); return null; }
  const rec = cite({ source, locator, text: got.value });
  if (rec.text !== got.value) fail.push(`引文与 locator 不一致：${source.rel}#${locator}`);
  return rec;
}

/* ── 读源数据 ── */
const unitsArr = read(UNITS_REL);
const units = unitsArr.units || unitsArr;
const UNIT_SRC = { rel: UNITS_REL, sha: sha256File(path.join(ROOT, UNITS_REL)), raw: rawOf(UNITS_REL), json: true };
const byId = new Map(units.map((u) => [u.id, u]));
const cons = units.filter((u) => u.type === '概念单元');

const cardFiles = fs.readdirSync(path.join(ROOT, CARD_DIR_REL)).filter((f) => f.endsWith('.yaml')).sort();
const cardSrc = new Map();
for (const f of cardFiles) {
  const rel = `${CARD_DIR_REL}/${f}`;
  cardSrc.set(f.replace(/\.yaml$/, ''), { rel, sha: sha256File(path.join(ROOT, rel)), raw: rawOf(rel), json: false });
}

/* 反向关系索引：谁 relationships[].target 指向这个 CON（施工单 §0 的口径） */
const rev = new Map(cons.map((c) => [c.id, { CAS: [], SOL: [], OPI: [], QST: [] }]));
for (const u of units) {
  const slot = TYPE_OF[u.type];
  if (!slot || slot === 'CON') continue;
  for (const r of u.relationships || []) {
    if (!r || !r.target || !rev.has(r.target)) continue;
    rev.get(r.target)[slot].push({ id: u.id, relation: r.type || '关联' });
  }
}

const DECISION_GAP = '该单元的三道决策题待装配：批量装配不补造唯一正确答案（任务书 §2.3）。可用素材已经就位：CAS 情境、SOL 动作路径、该卡 boundaries 的误区清单。';
const OPI_STATUS_REASON = '缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上';

/* ── 逐个 CON 装配 ── */
const outUnits = [];
let checkCount = 0, boundaryItemCount = 0, derivedFlip = 0, derivedDenial = 0;
const seenSlugs = new Set();

for (const con of [...cons].sort((a, b) => a.id.localeCompare(b.id))) {
  const tag = con.id;
  const m = /concepts\/([a-z0-9][a-z0-9-]*)\.yaml/.exec(String(con.body || ''));
  need(!!m, `${tag}：CON 正文里找不到 concepts/<slug>.yaml，配不到图鉴卡`);
  if (!m) continue;
  const slug = m[1];
  need(!seenSlugs.has(slug), `${tag}：卡片 ${slug} 被两个 CON 同时占用`);
  seenSlugs.add(slug);
  const card = cardSrc.get(slug);
  need(!!card, `${tag}：卡片文件不在 concepts/${slug}.yaml`);
  if (!card) continue;

  const y = readYamlFields(card.raw);
  const kf = con.key_fields || {};
  const rv = rev.get(con.id);
  need(rv.CAS.length >= 1, `${tag}：没有反向 CAS 单元`);
  need(rv.SOL.length >= 1, `${tag}：没有反向 SOL 单元`);
  need(rv.QST.length >= 1, `${tag}：没有反向 QST 单元`);

  /* ① 核心概念（CON 单元的 title + key_fields，逐字） */
  const concept = {
    id: con.id,
    type: con.type,
    title: citeAt(UNIT_SRC, `units[id=${con.id}].title`, unitsArr),
    definition: citeAt(UNIT_SRC, `units[id=${con.id}].key_fields.concept_definition`, unitsArr),
    sourceDocuments: con.source_documents || [],
    status: con.status || '',
  };

  /* ② 阅读梯度：全部取自图鉴卡，逐字 */
  const mechanismItems = (y.how_to || []).map((_, i) => citeAt(card, `how_to[${i}]`, unitsArr));
  const boundaryItems = (y.boundaries || []).map((_, i) => citeAt(card, `boundaries[${i}]`, unitsArr));
  boundaryItemCount += boundaryItems.length;
  const reading = {
    original: { label: '原文 context', ...citeAt(card, 'source_context', unitsArr) },
    explain: { label: '定义', ...citeAt(card, 'remember', unitsArr) },
    intuition: { label: '直觉', ...citeAt(card, 'feynman', unitsArr) },
    mechanism: {
      label: '机制', items: mechanismItems,
      text: mechanismItems.map((x) => x.text).join('\n'),
      assembledFrom: 'how_to[]', assembleNote: '逐条拼接（只加换行，不改一个字）',
    },
    boundary: { label: '边界', items: boundaryItems },
  };
  need(mechanismItems.length > 0, `${tag}：卡片 ${slug} 的 how_to 为空`);
  need(boundaryItems.length > 0, `${tag}：卡片 ${slug} 的 boundaries 为空`);

  /* ③ 五类语义：QST / CAS / SOL / OPI 都是引用 ID（正文逐字来自 units.json，带出处） */
  const semRef = (entry, prefix) => {
    const u = byId.get(entry.id);
    need(!!u, `${tag}：反向单元 ${entry.id} 不在 units.json 里`);
    need(u && TYPE_OF[u.type] === prefix, `${tag}：${entry.id} 类型应为 ${prefix}，实为 ${u && u.type}`);
    need(!!u && (u.relationships || []).some((r) => r.target === con.id), `${tag}：${entry.id} 的 relationships 里没有 ${con.id}`);
    return u;
  };
  const qstU = semRef(rv.QST[0], 'QST');
  const casU = semRef(rv.CAS[0], 'CAS');
  const solU = semRef(rv.SOL[0], 'SOL');

  const qst = {
    id: qstU.id, title: citeAt(UNIT_SRC, `units[id=${qstU.id}].title`, unitsArr),
    relation: rv.QST[0].relation,
    questionText: citeAt(UNIT_SRC, `units[id=${qstU.id}].key_fields.question_text`, unitsArr),
  };
  const caseType = (casU.key_fields || {}).case_type || '';
  need(caseType === '假设场景', `${tag}：主案例 ${casU.id} 的 case_type 应为「假设场景」，实为「${caseType}」——本轮不许写成真实复盘`);
  const cas = {
    id: casU.id, title: citeAt(UNIT_SRC, `units[id=${casU.id}].title`, unitsArr),
    caseType,
    summary: citeAt(UNIT_SRC, `units[id=${casU.id}].key_fields.case_summary`, unitsArr),
    evidence: citeAt(UNIT_SRC, `units[id=${casU.id}].key_fields.case_evidence`, unitsArr),
    relation: rv.CAS[0].relation,
    caseHonesty: 'CAS 语义单元自述为「假设场景」，不是真实复盘；本单元照原样带出该标记',
  };
  const sol = {
    id: solU.id, title: citeAt(UNIT_SRC, `units[id=${solU.id}].title`, unitsArr),
    relation: rv.SOL[0].relation,
    targetProblem: citeAt(UNIT_SRC, `units[id=${solU.id}].key_fields.target_problem`, unitsArr),
    summary: citeAt(UNIT_SRC, `units[id=${solU.id}].key_fields.solution_summary`, unitsArr),
    actionSteps: ((solU.key_fields || {}).action_steps || []).map((_, i) => citeAt(UNIT_SRC, `units[id=${solU.id}].key_fields.action_steps[${i}]`, unitsArr)),
  };
  const opinions = rv.OPI.map((entry) => {
    const u = semRef(entry, 'OPI');
    return {
      id: u.id, relation: entry.relation,
      title: citeAt(UNIT_SRC, `units[id=${u.id}].title`, unitsArr),
      coreClaim: citeAt(UNIT_SRC, `units[id=${u.id}].key_fields.core_claim`, unitsArr),
      claimScope: citeAt(UNIT_SRC, `units[id=${u.id}].key_fields.claim_scope`, unitsArr),
    };
  });

  /* ④ 费曼判据：一条边界 = 一条判据。point / condition 逐字，misconception 是机械反面转述 */
  const checks = boundaryItems.map((b, i) => {
    const point = firstChars(b.text, 12);
    need(b.text.startsWith(point), `${tag} 判据 ${i + 1}：point 不是 condition 的开头 12 字`);
    const der = deriveMisconception(b.text);
    if (der.rule === 'negation-flip') derivedFlip++; else derivedDenial++;
    need(der.text !== b.text, `${tag} 判据 ${i + 1}：反面转述与原文相同，等于没转`);
    checkCount++;
    return {
      id: `batch-${slug}-B${i + 1}`,
      point,
      condition: b.text,
      misconception: der.text,
      misconceptionSource: 'derived',
      derivation: { rule: der.rule, flipped: der.flipped, from: `boundaries[${i}]`, note: '按确定性规则从同一条边界算出，不是 agent 撰写的教学误解' },
      sourceFile: card.rel,
      sourceSha256: card.sha,
      locator: `boundaries[${i}]`,
      escapeForm: b.escapeForm,
    };
  });

  const status = opinions.length > 0 ? 'ready' : 'scaffold';
  const gaps = [DECISION_GAP];
  if (status === 'scaffold') gaps.push(`缺 OPI：本单元（${con.id}）没有反向观点单元，决策题依据只能落在 CAS 情境与 SOL 动作路径上。`);

  outUnits.push({
    unitId: `batch-${slug}`,
    order: outUnits.length + 1,
    status,
    statusReason: status === 'ready' ? '' : OPI_STATUS_REASON,
    conceptId: con.id,
    card: { slug, file: card.rel, sha256: card.sha },
    concepts: [concept],
    reading,
    qst, case: cas, solution: sol, opinions,
    feynman: {
      prompt: `合上材料，用自己的话讲清「${(concept.title || {}).text || con.title}」：它成立的条件是什么，边界在哪。`,
      required: checks.map((c) => c.point),
      checks,
    },
    decisions: [],
    decisionPolicy: '本轮不生成决策题（施工单 §1）：批量装配不补造唯一正确答案。',
    gaps,
  });
}

/* ── 决策题接入：**复核驱动**，不是白名单 ──
   228 道决策题由 scripts/gen-decisions-hybrid-v3.mjs 确定性生成（模型调用 0 次）；
   只有 evidence/review-decisions-260914/review.json 里该单元 verdict === 'usable' 才接进单元，
   没通过 / 没复核记录就照实留空数组（空数组 ≠ 满足，闸门那一段不开）。 */
const wiredUnits = [], wiredQuestions = [];
{
  const decAbs = path.join(ROOT, DECISIONS_REL);
  const revAbs = path.join(ROOT, REVIEW_REL);
  if (!fs.existsSync(decAbs)) {
    console.warn(`⚠ 缺 ${DECISIONS_REL}（决策题产物不在）—— 76 个单元的 decisions 照实留空`);
  } else if (!fs.existsSync(revAbs)) {
    console.warn(`⚠ 缺 ${REVIEW_REL}（没有独立复核结论）—— 有题但不接入，76 个单元的 decisions 照实留空`);
  } else {
    const dec = JSON.parse(fs.readFileSync(decAbs, 'utf8'));
    const rev = JSON.parse(fs.readFileSync(revAbs, 'utf8'));
    need(rev.file === DECISIONS_REL, `复核产物指向的 ${rev.file} 与接入的 ${DECISIONS_REL} 不是同一份`);
    const verdictOf = new Map((rev.units || []).map((r) => [r.unitId, r.verdict]));
    const qsOf = new Map((dec.units || []).map((u) => [u.unitId, u.questions || []]));
    for (const u of outUnits) {
      if (verdictOf.get(u.unitId) !== 'usable') continue;
      const qs = qsOf.get(u.unitId) || [];
      need(qs.length === 3, `${u.unitId} 复核 usable 但只有 ${qs.length} 道题`);
      if (qs.length !== 3) continue;
      u.decisions = qs;
      u.decisionPolicy = '3 道决策题已接入：脚本确定性生成（模型调用 0 次），并经独立复核 verdict=usable'
        + '（依据逐字可回溯 + 正解是与依据句共享 ≥8 字连续原文的改写句 + 题干与正解同极性 + 三题三个正解）。';
      u.gaps = u.gaps.filter((g) => !/三道决策题待装配/.test(g));
      wiredUnits.push(u.unitId);
      wiredQuestions.push(...qs.map((q) => `${u.unitId}#${q.id}`));
    }
    need(wiredUnits.length === (rev.recomputed || {}).usableUnits,
      `接入了 ${wiredUnits.length} 个单元，复核说可用 ${(rev.recomputed || {}).usableUnits} 个`);
  }
}

/* ── 汇总与产物 ── */
const ready = outUnits.filter((u) => u.status === 'ready').length;
const scaffold = outUnits.filter((u) => u.status === 'scaffold').length;
const gapCount = outUnits.reduce((n, u) => n + u.gaps.length, 0);

need(cons.length === 76, `CON 应为 76 个，实为 ${cons.length}`);
need(outUnits.length === 76, `装配出的单元应为 76 个，实为 ${outUnits.length}`);
need(seenSlugs.size === cardFiles.length || cardFiles.length !== 76, `卡片数 ${cardFiles.length} 与用到的 slug 数 ${seenSlugs.size} 不一致`);
need(ready + scaffold === 76, `ready ${ready} + scaffold ${scaffold} ≠ 76`);

if (fail.length) {
  console.error(`❌ 批量装配失败 ${fail.length} 条（不写产物、不降级）：`);
  for (const f of fail.slice(0, 40)) console.error('  · ' + f);
  if (fail.length > 40) console.error(`  · …另有 ${fail.length - 40} 条`);
  process.exit(1);
}

const out = {
  version: 'v1',
  generatedAt: new Date().toISOString().slice(0, 10),
  builtAt: new Date().toISOString(),
  source: {
    units: UNITS_REL,
    cards: `${CARD_DIR_REL}/*.yaml`,
    order: 'docs/批量装配学习单元-施工单-20260914.md',
    contract: 'docs/总图视图契约-20260914.md',
  },
  sources: [
    { path: UNITS_REL, sha256: UNIT_SRC.sha, note: '538 个语义单元（唯一来源，只读）' },
    ...cardFiles.map((f) => ({ path: `${CARD_DIR_REL}/${f}`, sha256: cardSrc.get(f.replace(/\.yaml$/, '')).sha, note: '图鉴卡（只读）' })),
  ],
  policy: {
    noModel: '本产物由一个模型调用都没打的确定性脚本生成（scripts/build-batch-units.mjs）。',
    verbatim: '所有正文逐字来自 units.json 与图鉴卡；唯一派生的字段是费曼判据的 point（前 12 字）与 misconception（机械反面转述），两者都标 derived 并由 check-batch-units.mjs 重算复核。',
    noDecisions: `决策题不再由本脚本生成：228 道题来自 scripts/gen-decisions-hybrid-v3.mjs（确定性生成、模型调用 0 次），`
      + `只有 evidence/review-decisions-260914/review.json 判定 verdict='usable' 的单元才接进来（本次 ${wiredUnits.length} 个单元 / ${wiredQuestions.length} 道题）；`
      + `没通过复核的照实留空数组 —— 空数组 ≠ 满足。`,
    caseHonesty: '主案例一律来自反向 CAS 语义单元，全部自述为「假设场景」，本产物照原样保留该标记，不写成真实复盘。',
    cardFieldsUnused: '卡片字段 scenario 本轮未被任何单元字段取用（施工单 §1 的材料表没有把它指派给任何字段）；它留在卡里，供下一轮装配决策题时使用。',
  },
  stats: {
    units: outUnits.length,
    ready, scaffold,
    criteria: checkCount,
    boundaryItems: boundaryItemCount,
    citations: citeCount,
    gaps: gapCount,
    readyUnits: outUnits.filter((u) => u.status === 'ready').map((u) => u.unitId),
    scaffoldUnits: outUnits.filter((u) => u.status === 'scaffold').map((u) => u.unitId),
    misconceptionRules: { negationFlip: derivedFlip, boundaryDenial: derivedDenial },
    decisionsWired: { units: wiredUnits.length, questions: wiredQuestions.length, source: DECISIONS_REL, review: REVIEW_REL },
  },
  units: outUnits,
};

fs.mkdirSync(path.dirname(path.join(ROOT, OUT_REL)), { recursive: true });
fs.writeFileSync(path.join(ROOT, OUT_REL), JSON.stringify(out, null, 1));

console.log(`✅ 批量单元已装配：${outUnits.length} 个（ready ${ready} · scaffold ${scaffold}）`);
console.log(`  逐字材料 ${citeCount} 条 · 费曼判据 ${checkCount} 条（边界 ${boundaryItemCount} 条）· 缺口 ${gapCount} 条`);
console.log(`  反面转述规则：否定翻转 ${derivedFlip} · 整条否定 ${derivedDenial}`);
console.log(`  决策题接入：${wiredUnits.length} 个单元 / ${wiredQuestions.length} 道题（复核驱动 · ${REVIEW_REL}）`);
console.log(`  卡：${cardFiles.length} 张，用到 ${seenSlugs.size} 张`);
console.log(`  ${OUT_REL}`);
