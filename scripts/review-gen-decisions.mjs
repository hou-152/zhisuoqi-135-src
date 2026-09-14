#!/usr/bin/env node
// 独立复核：evidence/gen-decisions-hybrid-v2-20260914.json（76 单元 / 228 题 / 456 干扰项）
//
//   node scripts/review-gen-decisions.mjs                  # 人看的报告（有硬伤退出码 1）
//   node scripts/review-gen-decisions.mjs --json           # 机器可读
//   node scripts/review-gen-decisions.mjs --write          # 写出 evidence/review-decisions-260914/review.json
//
// 立场：**不信产物自述的「九条硬门槛全过」**。本脚本从公共源数据（units.json + 图鉴卡 yaml）
// 把每条 basisRefs / correctOption 重新解一遍，自己数命中率；产物里任何一句自述都不作为输入。
//
// 复算十件事（前七条是它自己声称过的，后三条是它没查的）：
//   ① 结构：76 单元 × 3 题 × (1 正解 + 2 干扰项)
//   ② basisRefs 逐字：sourceId 指向的单元/卡片里，quote 是否逐字存在，locator 是否指到同一句，sha256 是否对
//   ③ 正解逐字：correctOption.text === basisQuote 且逐字来自它声称的 SOL/CAS
//   ④ 干扰项不得逐字等于材料原句（它自己的硬门槛之一，这里重算）
//   ⑤ 干扰项两两可区分 + 不得与正解一字不差
//   ⑥ correct 字段是否泄漏到不该在的地方
//   ⑦ 57 个缺 OPI 的单元有没有假装有 OPI；有 OPI 的有没有引用未登记的 OPI
//   ⑧ 【新】题干极性：问「哪种做法不合适 / 应避免哪个」的题，正解必须也是「不合适的那种做法」；
//      正解若是「正确做法」，学习者按题意推理就选不中它
//   ⑨ 【新】三题是否三个判断：同一单元 3 道题若共用一个正解，这个单元的「3 决策」其实是 1 决策问 3 遍
//   ⑩ 【新】零理解捷径：正解逐字来自材料、干扰项一律不许逐字——「挑那句像教材原文的」能否 100% 答对
//
// 退出码：0 = 全部通过；1 = 有硬伤。--write 时总是写文件，退出码照旧。
//
// 边界：只读公共源数据；只写 evidence/review-decisions-260914/ 下自己的产物。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { resolveDecisionRef, loadCards } from './lib/batch-units-rules.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DECISIONS_REL = 'evidence/gen-decisions-hybrid-v2-20260914.json';
const UNITS_REL = '内容结构化系统/模块/ai-concept-base/data/units.json';
const CARD_DIR_REL = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
const BATCH_REL = 'evidence/batch-units-260914/units.json';
const OUT_DIR_REL = 'evidence/review-decisions-260914';
const OUT_REL = `${OUT_DIR_REL}/review.json`;

const AS_JSON = process.argv.includes('--json');
const WRITE = process.argv.includes('--write');
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const sha256 = (abs) => crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
const norm = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();

/* ── 源数据（只读） ── */
const decisions = readJson(DECISIONS_REL);
const unitsArr = readJson(UNITS_REL);
const units = unitsArr.units || unitsArr;
const byId = new Map(units.map((u) => [u.id, u]));
const batch = readJson(BATCH_REL);
const batchByUnit = new Map(batch.units.map((u) => [u.unitId, u]));

const cards = loadCards(ROOT, CARD_DIR_REL);
const refCtx = { byId, cards };

/* ── 材料全集（复算「干扰项不得逐字等于材料原句」与「零理解捷径」） ── */
const MATERIAL = (() => {
  const chunks = [];
  for (const u of units) {
    for (const v of Object.values(u.key_fields || {})) {
      if (typeof v === 'string') chunks.push(v);
      else if (Array.isArray(v)) v.forEach((x) => typeof x === 'string' && chunks.push(x));
    }
  }
  for (const c of cards.values()) chunks.push(c.raw);
  return chunks;
})();
const isVerbatim = (t) => !!norm(t) && MATERIAL.some((m) => m.includes(t));

/* ── ⑧ 题干极性：问「哪个错 / 该避免哪个」的题干 ── */
const ASK_FOR_WRONG = [
  /(应|该)避免/,
  /哪(一)?(种|个|项)[^。？]{0,24}(最不合适|不合适|不妥|不恰当|最跑偏|不成立|会破坏|会妨碍|会引入|偏离)/,
];
const asksForWrong = (p) => ASK_FOR_WRONG.some((r) => r.test(String(p || '')));
// 正解是不是「正确做法」（开头没有否定词 = 它陈述的是该做的事）
const looksLikeRightPractice = (t) => !/(不|别|勿|避免|禁止|无须|无需)/.test(String(t || '').slice(0, 6));

/* ── 遍历产物 ── */
const stats = {
  units: 0, questions: 0, refs: 0,
  refOk: 0, refBad: 0, refShaBad: 0,
  correctOk: 0, correctBad: 0,
  distractorVerbatim: 0, distractorEmpty: 0,
  distractorDupWithin: 0, distractorDupCross: 0,
  correctLeak: 0,
  unitsSameCorrect: 0, noOpiUnitsFakeOpi: 0, strayOpiRefs: 0, readingMiss: 0,
  polarityInverted: 0, shortcutExploitable: 0, shortcutAmbiguous: 0,
};
const badRefs = [], badCorrect = [], verbatimDistractors = [], dupDistractors = [];
const readingMissList = [], fakeOpi = [], strayOpiList = [];
const polarityList = [], shortcutList = [];
const unitVerdicts = [];
/* 三档口径：让「哪一条挡下了多少」可见，而不是只给一个 0。
   A 出处干净：①②③④⑤ 全过（逐字可回溯 + 干扰项非逐字且互不相同）
   B 加上极性：A − 题干极性相反
   C 可当决策题：B − 零理解捷径，且所在单元三题正解互不相同 */
const tierA = new Set(), tierB = new Set(), tierAll = [];

// 全文件扫 correct 泄漏
(function scanLeak(node, trail) {
  if (Array.isArray(node)) { node.forEach((x, i) => scanLeak(x, `${trail}[${i}]`)); return; }
  if (!node || typeof node !== 'object') return;
  for (const [k, v] of Object.entries(node)) {
    if (/^(correct|isCorrect|answer|answerIndex|solution|key)$/i.test(k) && k !== 'correctOption') {
      stats.correctLeak++;
    }
    scanLeak(v, `${trail}.${k}`);
  }
})(decisions, '$');

for (const du of decisions.units || []) {
  stats.units++;
  const bu = batchByUnit.get(du.unitId);
  const qs = du.questions || [];
  const blockedQuestions = [];

  for (const q of qs) {
    stats.questions++;
    const co = q.correctOption || {};
    const blockedBy = [];
    const key = `${du.unitId}#${q.id}`;
    tierAll.push(key);

    /* ③ 正解逐字 */
    const cres = resolveDecisionRef({ sourceId: co.basis, locator: co.locator, sourceFile: co.sourceFile }, refCtx);
    if (!cres.ok) { stats.correctBad++; badCorrect.push(`${du.unitId}#${q.id} 正解定位失败：${cres.why}`); blockedBy.push('正解无法定位'); }
    else {
      const hit = norm(co.text) && norm(cres.value).includes(norm(co.text));
      const quoteHit = norm(co.basisQuote) && norm(cres.value).includes(norm(co.basisQuote));
      if (!hit) { stats.correctBad++; badCorrect.push(`${du.unitId}#${q.id} 正解文本不在 ${co.basis}@${co.locator} 里`); blockedBy.push('正解不逐字'); }
      else if (!quoteHit) { stats.correctBad++; badCorrect.push(`${du.unitId}#${q.id} basisQuote 与正解文本对不上`); blockedBy.push('basisQuote 与正解不一致'); }
      else stats.correctOk++;
    }
    if (norm(co.text) && !isVerbatim(co.text)) {
      stats.correctBad++; badCorrect.push(`${du.unitId}#${q.id} 正解不在任何材料源里`); blockedBy.push('正解不在材料里');
    }

    /* ② / ④ / ⑤ 干扰项 */
    const localTexts = new Set();
    for (const [di, d] of (q.distractors || []).entries()) {
      const refs = d.basisRefs || [];
      if (!refs.length) { stats.refBad++; badRefs.push(`${du.unitId}#${q.id} D${di} 没有任何 basisRefs`); blockedBy.push(`干扰${di + 1}缺依据`); }
      for (const r of refs) {
        stats.refs++;
        const res = resolveDecisionRef(r, refCtx);
        if (!res.ok) { stats.refBad++; badRefs.push(`${du.unitId}#${q.id} D${di} ${r.refId || ''} ${res.why}`); blockedBy.push(`干扰${di + 1}依据无法定位`); continue; }
        if (!norm(res.value).includes(norm(r.quote))) {
          stats.refBad++; badRefs.push(`${du.unitId}#${q.id} D${di} ${r.refId || ''} quote 不在 ${r.sourceId}@${r.locator} 里`); blockedBy.push(`干扰${di + 1}依据不逐字`); continue;
        }
        if (r.sourceFile && r.sourceSha256) {
          const abs = path.join(ROOT, r.sourceFile);
          if (!fs.existsSync(abs)) { stats.refShaBad++; badRefs.push(`${du.unitId}#${q.id} D${di} sourceFile 不存在 ${r.sourceFile}`); blockedBy.push(`干扰${di + 1}来源缺失`); continue; }
          if (sha256(abs) !== r.sourceSha256) { stats.refShaBad++; badRefs.push(`${du.unitId}#${q.id} D${di} sha256 对不上 ${r.sourceFile}`); blockedBy.push(`干扰${di + 1}校验和不符`); continue; }
        }
        stats.refOk++;
      }
      const t = norm(d.text);
      if (!t) { stats.distractorEmpty++; verbatimDistractors.push(`${du.unitId}#${q.id} D${di} 空文本`); blockedBy.push(`干扰${di + 1}为空`); }
      else if (isVerbatim(d.text)) {
        stats.distractorVerbatim++; verbatimDistractors.push(`${du.unitId}#${q.id} D${di} 与材料原句逐字相同：${d.text.slice(0, 50)}`);
        blockedBy.push(`干扰${di + 1}逐字照抄材料`);
      }
      if (localTexts.has(t)) { stats.distractorDupWithin++; dupDistractors.push(`${du.unitId}#${q.id} D${di} 与同题另一干扰项一字不差`); blockedBy.push('干扰项重复'); }
      localTexts.add(t);
      if (t === norm(co.text)) { stats.distractorDupCross++; dupDistractors.push(`${du.unitId}#${q.id} D${di} 与正解一字不差`); blockedBy.push('干扰项与正解一字不差'); }
    }

    /* A 档：到这里只可能被 ②③④⑤ 挡下（出处与选项本身干净） */
    if (!blockedBy.length) tierA.add(key);

    /* ⑧ 题干极性 */
    if (asksForWrong(q.prompt) && looksLikeRightPractice(co.text)) {
      stats.polarityInverted++;
      polarityList.push(`${du.unitId}#${q.id} 题干问「${q.prompt.slice(0, 30)}…」，正解却是「正确做法」：${co.text.slice(0, 34)}…`);
      blockedBy.push('题干与正解极性相反');
    }

    /* B 档：出处干净 + 题干极性一致 */
    if (tierA.has(key) && !blockedBy.includes('题干与正解极性相反')) tierB.add(key);

    /* ⑩ 零理解捷径：同一题里正解是唯一逐字项 */
    if (q.distractors && q.distractors.length === 2) {
      const opts = [co.text, ...q.distractors.map((x) => x.text)];
      const v = opts.map(isVerbatim);
      const n = v.filter(Boolean).length;
      if (n === 1 && v[0]) {
        stats.shortcutExploitable++;
        shortcutList.push(`${du.unitId}#${q.id}`);
        blockedBy.push('正解是唯一逐字项（可被表面规则 100% 猜中）');
      } else if (n !== 1) stats.shortcutAmbiguous++;
    }

    if (blockedBy.length) blockedQuestions.push({ id: q.id, blockedBy: [...new Set(blockedBy)] });
  }

  /* ⑦ OPI 对照 */
  if (bu) {
    const declaredOpi = (bu.opinions || []).map((o) => o.id);
    const unitBasis = qs.flatMap((q) => [
      String((q.correctOption || {}).basis || ''),
      ...(q.distractors || []).flatMap((d) => (d.basisRefs || []).map((r) => String(r.sourceId || ''))),
    ]);
    const opiRefs = unitBasis.filter((x) => /^OPI-/.test(x));
    if (declaredOpi.length === 0 && opiRefs.length) {
      stats.noOpiUnitsFakeOpi++; fakeOpi.push(`${du.unitId} 无 OPI（units.json opinions=[]）却引用了 ${[...new Set(opiRefs)].join(',')}`);
    }
    const strayOpi = [...new Set(opiRefs)].filter((x) => !declaredOpi.includes(x));
    if (declaredOpi.length && strayOpi.length) {
      stats.strayOpiRefs++; strayOpiList.push(`${du.unitId} 引用了未登记的 OPI：${strayOpi.join(',')}`);
    }
    const readingBlob = JSON.stringify(bu.reading || {});
    for (const q of qs) {
      const txt = norm((q.correctOption || {}).text);
      if (txt && readingBlob && !readingBlob.includes(txt)) {
        stats.readingMiss++; readingMissList.push(`${du.unitId}#${q.id} 正解不在这段 reading 的逐字文本里`);
      }
    }
  }

  /* ⑨ 三题是不是三个判断 */
  const distinct = new Set(qs.map((q) => norm((q.correctOption || {}).text)));
  const sameAnswer = distinct.size < 3;
  if (sameAnswer && qs.length > 1) stats.unitsSameCorrect++;

  const unitBlockedBy = [];
  if (sameAnswer && qs.length > 1) unitBlockedBy.push(`三题共用 ${distinct.size} 个正解（要求 3 个互不相同：1 阅读 → 3 决策）`);
  if (blockedQuestions.length) unitBlockedBy.push(`${blockedQuestions.length} 道题被逐题复核挡下`);
  if (qs.length < 3) unitBlockedBy.push(`只有 ${qs.length} 道题（要求 3 道）`);

  unitVerdicts.push({
    unitId: du.unitId,
    conceptId: du.conceptId,
    batchStatus: du.status,
    questionCount: qs.length,
    distinctCorrectAnswers: distinct.size,
    usableQuestions: qs.length - blockedQuestions.length,
    blockedQuestions,
    verdict: unitBlockedBy.length ? 'blocked' : 'usable',
    blockedBy: unitBlockedBy,
  });
}

/* ── 汇总 ── */
const rate = (a, b) => (b ? `${(100 * a / b).toFixed(2)}%` : 'n/a');
const usableUnits = unitVerdicts.filter((u) => u.verdict === 'usable');
const totalUsableQuestions = unitVerdicts.reduce((n, u) => n + u.usableQuestions, 0);
const summary = {
  generatedAt: new Date().toISOString(),
  reviewer: 'scripts/review-gen-decisions.mjs（独立复算；不采信产物自述）',
  file: DECISIONS_REL,
  declaredCounts: decisions.counts || null,
  rules: {
    perQuestion: [
      'basisRefs 逐字可回溯（quote 在 sourceId@locator 里逐字存在，sha256 与磁盘一致）',
      '正解逐字可回溯到 SOL/CAS 并带 locator',
      '干扰项不得逐字等于材料原句',
      '干扰项两两可区分、不得与正解一字不差',
      '题干极性必须与正解一致（问「哪个不合适」时正解必须是不合适的那一个）',
      '正解不得是「唯一逐字项」（否则存在零理解捷径）',
    ],
    perUnit: ['3 道题', '3 道题的正解互不相同（1 阅读 → 3 决策）', '全部题逐题通过'],
  },
  recomputed: {
    units: stats.units,
    questions: stats.questions,
    refs: stats.refs,
    refHitRate: rate(stats.refOk, stats.refs),
    refBad: stats.refBad,
    refShaBad: stats.refShaBad,
    correctVerified: stats.correctOk,
    correctBad: stats.correctBad,
    distractorVerbatim: stats.distractorVerbatim,
    distractorEmpty: stats.distractorEmpty,
    distractorDupWithin: stats.distractorDupWithin,
    distractorDupCross: stats.distractorDupCross,
    correctLeak: stats.correctLeak,
    unitsWhereAllThreeCorrectAnswersAreIdentical: stats.unitsSameCorrect,
    unitsFakingOpi: stats.noOpiUnitsFakeOpi,
    unitsCitingUnregisteredOpi: stats.strayOpiRefs,
    questionsWhoseCorrectAnswerIsNotInThatUnitsReading: stats.readingMiss,
    polarityInvertedQuestions: stats.polarityInverted,
    zeroComprehensionShortcutExploitable: stats.shortcutExploitable,
    zeroComprehensionShortcutAmbiguous: stats.shortcutAmbiguous,
    tierA_provenanceCleanQuestions: tierA.size,
    tierB_polarityConsistentQuestions: tierB.size,
    tierC_usableQuestions: totalUsableQuestions,
    usableUnits: usableUnits.length,
    blockedUnits: unitVerdicts.length - usableUnits.length,
    usableQuestions: totalUsableQuestions,
    blockedQuestions: stats.questions - totalUsableQuestions,
  },
  samples: {
    badRefs: badRefs.slice(0, 25),
    badCorrect: badCorrect.slice(0, 25),
    verbatimDistractors: verbatimDistractors.slice(0, 25),
    dupDistractors: dupDistractors.slice(0, 25),
    fakeOpi: fakeOpi.slice(0, 25),
    strayOpi: strayOpiList.slice(0, 25),
    readingMiss: readingMissList.slice(0, 25),
    polarityInverted: polarityList,
    shortcutQuestions: shortcutList.slice(0, 10),
  },
  units: unitVerdicts,
};

if (WRITE) {
  fs.mkdirSync(path.join(ROOT, OUT_DIR_REL), { recursive: true });
  fs.writeFileSync(path.join(ROOT, OUT_REL), `${JSON.stringify(summary, null, 2)}\n`);
}

if (AS_JSON) { console.log(JSON.stringify(summary, null, 2)); }
else {
  const R = summary.recomputed;
  console.log(`独立复核 ${DECISIONS_REL}`);
  console.log(`产物自述：${JSON.stringify(summary.declaredCounts)}`);
  console.log('— 它声称过的（复算）—');
  console.log(`单元 ${R.units} · 题 ${R.questions} · basisRefs ${R.refs}`);
  console.log(`basisRefs 逐字命中率：${R.refHitRate}（不通过 ${R.refBad}，其中 sha256 不符 ${R.refShaBad}）`);
  console.log(`正解逐字可回溯：${R.correctVerified} 通过 / ${R.correctBad} 不通过`);
  console.log(`干扰项逐字等于材料原句：${R.distractorVerbatim} · 空文本：${R.distractorEmpty}`);
  console.log(`干扰项重复（题内 ${R.distractorDupWithin} / 与正解撞 ${R.distractorDupCross}）`);
  console.log(`correct 字段泄漏：${R.correctLeak}`);
  console.log(`无 OPI 却引用 OPI 的单元：${R.unitsFakingOpi} · 引用未登记 OPI 的单元：${R.unitsCitingUnregisteredOpi}`);
  console.log(`正解不在该单元 reading 逐字文本里的题：${R.questionsWhoseCorrectAnswerIsNotInThatUnitsReading}`);
  console.log('— 它没查的（复算）—');
  console.log(`⑧ 题干极性相反的题：${R.polarityInvertedQuestions} / ${R.questions}`);
  console.log(`⑨ 三题共用一个正解的单元：${R.unitsWhereAllThreeCorrectAnswersAreIdentical} / ${R.units}`);
  console.log(`⑩ 可被「挑唯一逐字项」100% 猜中的题：${R.zeroComprehensionShortcutExploitable} / ${R.questions}（不适用 ${R.zeroComprehensionShortcutAmbiguous}）`);
  console.log('— 复核结论（三档口径）—');
  console.log(`A 出处干净（逐字可回溯 + 干扰项非逐字且互不相同）：${R.tierA_provenanceCleanQuestions} / ${R.questions}`);
  console.log(`B 再加题干极性一致：${R.tierB_polarityConsistentQuestions} / ${R.questions}`);
  console.log(`C 可当决策题（再加：无零理解捷径 + 单元三题正解互不相同）：${R.tierC_usableQuestions} / ${R.questions}`);
  console.log(`可用单元 ${R.usableUnits} / ${R.units}（挡下 ${R.blockedQuestions} 道题）`);
  const reasons = {};
  for (const u of summary.units) for (const b of u.blockedBy) reasons[b] = (reasons[b] || 0) + 1;
  for (const [k, v] of Object.entries(reasons).sort((a, b) => b[1] - a[1])) console.log(`  · ${k}：${v} 个单元`);
  if (polarityList.length) console.log(`\n[极性相反] ${polarityList.length} 例\n  ${polarityList.join('\n  ')}`);
  for (const k of ['badRefs', 'badCorrect', 'verbatimDistractors', 'dupDistractors', 'fakeOpi', 'strayOpi']) {
    const v = summary.samples[k];
    if (v.length) console.log(`\n[${k}] ${v.length} 例\n  ${v.join('\n  ')}`);
  }
}

if (WRITE) console.log(`\n已写出 ${OUT_REL}`);
const fatal = stats.refBad > 0 || stats.correctBad > 0 || stats.correctLeak > 0
  || stats.distractorEmpty > 0 || stats.distractorDupCross > 0
  || stats.polarityInverted > 0 || stats.shortcutExploitable > 0
  || stats.unitsSameCorrect > 0;
process.exit(fatal ? 1 : 0);
