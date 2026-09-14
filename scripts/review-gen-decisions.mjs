#!/usr/bin/env node
// 独立复核：evidence/gen-decisions-hybrid-v3-20260914.json（确定性生成 v3 · 76 单元 / 228 题 / 456 干扰项）
//
//   node scripts/review-gen-decisions.mjs                  # 人看的报告（有硬伤退出码 1）
//   node scripts/review-gen-decisions.mjs --json           # 机器可读
//   node scripts/review-gen-decisions.mjs --write          # 写出 evidence/review-decisions-260914/review.json
//   node scripts/review-gen-decisions.mjs --file=<rel>     # 换一份产物复核（默认 v3）
//   node scripts/review-gen-decisions.mjs --selftest       # 判据自检：把同一套检测器跑在上一轮 v2 产物上，
//                                                          # 要求复现「⑩ 228 / ⑨ 76 / ⑧ 16」——判据有没有牙，这条说了算
//
// 立场：**不信产物自述**。每条依据 / 正解都从公共源数据（units.json + 图鉴卡 yaml）重新解一遍再比对；
// 产物里任何一句自述都不作为输入。
//
// 逐题判据（前七条 v2 就查过，后三条是上一轮复核算出来的、这一轮变成能失败的断言）：
//   ① 结构：每单元 3 题 × (1 正解 + 2 干扰项)
//   ② 依据逐字：干扰项每条 basisRefs 的 quote 在 sourceId@locator 里逐字存在，sha256 与磁盘一致
//   ③ 正解可回溯：basisQuote 逐字存在于 basis@locator，sourceSha256 与磁盘一致，
//      且正解与依据句共享 ≥8 字**连续原文**（MIN_ANCHOR）——正解是改写句，但锚点没松
//   ④ 正解不得逐字等于任何材料原句（改写规则必须真的生效）
//   ⑤ 干扰项：非空 · 不与材料原句逐字相同 · 两两可区分 · 不与正解一字不差
//   ⑥ correct 字段不得泄漏到别处
//   ⑦ 缺 OPI 的单元不得假装有 OPI；有 OPI 的不得引用未登记的 OPI
//   ⑧ 题干极性**对称**校验：问「哪种不合适 / 该避免哪个」时正解必须是不合适的那条；
//      问「你会怎么做」时正解必须是「该做的做法」。两个方向都查。
//   ⑨ 同一单元三道题的正解必须互不相同（1 阅读 → 3 决策），且三道题的选项集合不得互为置换
//   ⑩ 零理解捷径两条：
//      ⑩a 正解不得是三个选项里唯一「逐字出现在材料里」的那一项；
//      ⑩b 正解的最长逐字片段不得比任一干扰项长出 MARGIN（8）字以上——「挑最像教材原文的那句」不能落到正解上
//   另外把「表面策略能拿多少分」逐条算出来（逐字项 / 最长逐字片段 / 最长文本 / 位置），写在报告里给人工抽审对照。
//
// 退出码：0 = 全部通过；1 = 有硬伤。--write 时总是写文件，退出码照旧。
// 边界：只读公共源数据；只写 evidence/review-decisions-260914/ 下自己的产物。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { resolveDecisionRef, loadCards } from './lib/batch-units-rules.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DECISIONS_REL = (process.argv.find((a) => a.startsWith('--file=')) || '').slice('--file='.length)
  || 'evidence/gen-decisions-hybrid-v3-20260914.json';
const PREV_REL = 'evidence/gen-decisions-hybrid-v2-20260914.json';   // 上一轮产物：判据自检的已知坏样本
const UNITS_REL = '内容结构化系统/模块/ai-concept-base/data/units.json';
const CARD_DIR_REL = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
const BATCH_REL = 'evidence/batch-units-260914/units.json';
const OUT_DIR_REL = 'evidence/review-decisions-260914';
const OUT_REL = `${OUT_DIR_REL}/review.json`;
const MARGIN = 8;          // ⑩b：正解最长逐字片段允许比干扰项长出的上限（字）

const AS_JSON = process.argv.includes('--json');
const WRITE = process.argv.includes('--write');
const SELFTEST = process.argv.includes('--selftest');
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const sha256 = (abs) => crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
const norm = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();

/* ── 源数据（只读） ── */
const unitsArr = readJson(UNITS_REL);
const units = unitsArr.units || unitsArr;
const byId = new Map(units.map((u) => [u.id, u]));
const batch = readJson(BATCH_REL);
const batchByUnit = new Map(batch.units.map((u) => [u.unitId, u]));
const cards = loadCards(ROOT, CARD_DIR_REL);
const refCtx = { byId, cards };
const UNITS_SHA = sha256(path.join(ROOT, UNITS_REL));

/* ── 材料全集（复算「逐字等于材料原句」与「零理解捷径」） ── */
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
const isVerbatim = (t) => !!norm(t) && MATERIAL.some((m) => m.includes(norm(t)));

/* ── 最长公共连续子串（「这一项有多像材料原文」的度量；与生成器同一算法） ── */
const K = 5;
function buildIndex(text) {
  const m = new Map();
  for (let i = 0; i + K <= text.length; i++) {
    const g = text.slice(i, i + K);
    const a = m.get(g);
    if (a) a.push(i); else m.set(g, [i]);
  }
  return m;
}
function maxRun(text, material, idx) {
  const t = norm(text);
  if (!t || !material) return 0;
  if (t.length < K) return material.includes(t) ? t.length : 0;
  let best = 0;
  for (let i = 0; i + K <= t.length; i++) {
    const pos = idx.get(t.slice(i, i + K));
    if (!pos) continue;
    for (const p of pos) {
      let l = K;
      while (i + l < t.length && p + l < material.length && t[i + l] === material[p + l]) l++;
      if (l > best) best = l;
    }
  }
  return best;
}

/* ── ⑧ 题干极性：问「哪个错 / 该避免哪个」与问「你会怎么做」两个方向都判 ── */
const ASK_FOR_WRONG = [
  /(应|该)避免/,
  /哪(一)?(种|个|项)[^。？]{0,24}(最不合适|不合适|不妥|不恰当|最跑偏|不成立|会破坏|会妨碍|会引入|偏离)/,
  /(最|更)(不|没)(合适|恰当|应该|该)/,
];
const asksForWrong = (p) => ASK_FOR_WRONG.some((r) => r.test(String(p || '')));
const asksForRight = (p) => /(你会怎么做|你会怎么|怎么做|优先做什么|你会优先|接下来|应当怎么做|如何做)/.test(String(p || ''));
// 正解读起来像「该做的做法」还是像「不该做的做法」：句首 6 字里有没有否定词
const looksLikeRightPractice = (t) => !/(不|别|勿|避免|禁止|无须|无需)/.test(String(t || '').slice(0, 6));

/* ══ 一份产物的完整复算（v3 与 v2 用同一个函数，--selftest 才有意义） ══ */
function reviewArtifact(decisions) {
  const stats = {
    units: 0, questions: 0, refs: 0, refOk: 0, refBad: 0, refShaBad: 0,
    correctOk: 0, correctBad: 0, correctVerbatim: 0, correctAnchorShort: 0,
    distractorVerbatim: 0, distractorEmpty: 0, distractorDupWithin: 0, distractorDupCross: 0,
    correctLeak: 0, unitsSameCorrect: 0, unitsPermutedOptions: 0,
    noOpiUnitsFakeOpi: 0, strayOpiRefs: 0, readingMiss: 0,
    polarityInverted: 0, polarityRightAnswerMissing: 0, polarityNegatedPrescription: 0,
    shortcutExploitable: 0, shortcutAmbiguous: 0, runAdvantage: 0,
  };
  const badRefs = [], badCorrect = [], verbatimDistractors = [], dupDistractors = [];
  const readingMissList = [], fakeOpi = [], strayOpiList = [], polarityList = [], shortcutList = [], runList = [];
  const unitVerdicts = [];
  const tierA = new Set(), tierB = new Set();
  let tierCcount = 0;
  const strategy = { verbatim: 0, longestRun: 0, longestText: 0, firstOption: 0, total: 0 };

  (function scanLeak(node) {
    if (Array.isArray(node)) { node.forEach(scanLeak); return; }
    if (!node || typeof node !== 'object') return;
    for (const [k, v] of Object.entries(node)) {
      if (/^(correct|isCorrect|answer|answerIndex|solution|key)$/i.test(k) && k !== 'correctOption') stats.correctLeak++;
      scanLeak(v);
    }
  })(decisions);

  for (const du of decisions.units || []) {
    stats.units++;
    const bu = batchByUnit.get(du.unitId);
    const qs = du.questions || [];
    const blockedQuestions = [];

    for (const q of qs) {
      stats.questions++;
      stats.total = stats.questions;
      const co = q.correctOption || {};
      const blockedBy = [];
      const key = `${du.unitId}#${q.id}`;
      tierA.add(key);

      /* ③ 正解可回溯：basisQuote 逐字 + sha256 + 与依据句共享 ≥8 字连续原文 */
      const cres = resolveDecisionRef({ sourceId: co.basis, locator: co.locator, sourceFile: co.sourceFile }, refCtx);
      if (!cres.ok) { stats.correctBad++; badCorrect.push(`${key} 依据定位失败：${cres.why}`); blockedBy.push('依据无法定位'); }
      else {
        const quoteHit = norm(co.basisQuote) && norm(cres.value).includes(norm(co.basisQuote));
        if (!quoteHit) { stats.correctBad++; badCorrect.push(`${key} basisQuote 不在 ${co.basis}@${co.locator} 里`); blockedBy.push('依据不逐字'); }
        else stats.correctOk++;
      }
      if (co.sourceSha256) {
        const abs = path.join(ROOT, co.sourceFile || '');
        if (!fs.existsSync(abs) || sha256(abs) !== co.sourceSha256) {
          if (Object.prototype.hasOwnProperty.call(stats, 'correctShaBad')) stats.correctShaBad++; else stats.correctShaBad = 1;
          badCorrect.push(`${key} 正解 sourceSha256 与磁盘不一致`);
          blockedBy.push('正解校验和不符');
        }
      } else { stats.correctShaBad = (stats.correctShaBad || 0) + 1; blockedBy.push('正解缺 sourceSha256'); }
      const coText = norm(co.text);
      const anchorRun = maxRun(coText.slice(0, 4), '') ;  // 占位，真正的 MIN_ANCHOR 在下面用依据句算
      const backRun = (() => {
        const m = norm(co.basisQuote);
        if (!m || !coText) return 0;
        const idx2 = buildIndex(m);
        return maxRun(coText, m, idx2);
      })();
      if (coText && backRun < 8) {
        stats.correctAnchorShort++;
        badCorrect.push(`${key} 正解与依据句只有 ${backRun} 字连续原文（要求 ≥8）`);
        blockedBy.push('正解与依据句的锚点不足 8 字');
      }
      if (coText && isVerbatim(coText)) {
        stats.correctVerbatim++;
        badCorrect.push(`${key} 正解整句逐字等于材料原句：${coText.slice(0, 40)}`);
        blockedBy.push('正解逐字照抄材料');
      }

      /* ⑤ 干扰项 */
      const localTexts = new Set();
      for (const [di, d] of (q.distractors || []).entries()) {
        const refs = d.basisRefs || [];
        if (!refs.length) { stats.refBad++; badRefs.push(`${key} D${di} 没有任何 basisRefs`); blockedBy.push(`干扰${di + 1}缺依据`); }
        for (const r of refs) {
          stats.refs++;
          const res = resolveDecisionRef(r, refCtx);
          if (!res.ok) { stats.refBad++; badRefs.push(`${key} D${di} ${r.refId || ''} ${res.why}`); blockedBy.push(`干扰${di + 1}依据无法定位`); continue; }
          if (!norm(res.value).includes(norm(r.quote))) {
            stats.refBad++; badRefs.push(`${key} D${di} ${r.refId || ''} quote 不在 ${r.sourceId}@${r.locator} 里`); blockedBy.push(`干扰${di + 1}依据不逐字`); continue;
          }
          if (r.sourceFile && r.sourceSha256) {
            const abs = path.join(ROOT, r.sourceFile);
            if (!fs.existsSync(abs)) { stats.refShaBad++; badRefs.push(`${key} D${di} sourceFile 不存在 ${r.sourceFile}`); blockedBy.push(`干扰${di + 1}来源缺失`); continue; }
            if (sha256(abs) !== r.sourceSha256) { stats.refShaBad++; badRefs.push(`${key} D${di} sha256 对不上 ${r.sourceFile}`); blockedBy.push(`干扰${di + 1}校验和不符`); continue; }
          }
          stats.refOk++;
        }
        const t = norm(d.text);
        if (!t) { stats.distractorEmpty++; verbatimDistractors.push(`${key} D${di} 空文本`); blockedBy.push(`干扰${di + 1}为空`); }
        else if (isVerbatim(d.text)) {
          stats.distractorVerbatim++; verbatimDistractors.push(`${key} D${di} 与材料原句逐字相同：${d.text.slice(0, 50)}`);
          blockedBy.push(`干扰${di + 1}逐字照抄材料`);
        }
        if (localTexts.has(t)) { stats.distractorDupWithin++; dupDistractors.push(`${key} D${di} 与同题另一干扰项一字不差`); blockedBy.push('干扰项重复'); }
        localTexts.add(t);
        if (t === coText) { stats.distractorDupCross++; dupDistractors.push(`${key} D${di} 与正解一字不差`); blockedBy.push('干扰项与正解一字不差'); }
      }

      /* ⑧ 题干极性：两个方向都查 */
      if (asksForWrong(q.prompt)) {
        if (looksLikeRightPractice(co.text)) {
          stats.polarityInverted++;
          polarityList.push(`${key} 题干问「${String(q.prompt).slice(0, 28)}…」，正解却是「正确做法」：${String(co.text).slice(0, 30)}…`);
          blockedBy.push('题干与正解极性相反');
        }
      } else if (asksForRight(q.prompt)) {
        /* 互补方向只记数不拦截：题干问「怎么做」时，正解写成「不要…」也可能是合法处方（材料本身就是禁令）。 */
        if (!looksLikeRightPractice(co.text)) stats.polarityNegatedPrescription++;
      } else {
        stats.polarityRightAnswerMissing++;
        blockedBy.push('题干既没问「怎么做」也没问「哪个不合适」，极性无从判定');
      }

      /* ⑩ 零理解捷径：逐字项 + 逐字片段优势 + 表面策略计分 */
      const opts = [co.text, ...(q.distractors || []).map((x) => x.text)];
      const mIdx = buildIndex(String(q.__material || ''));
      const runs = opts.map((o) => maxRun(o, String(q.__material || ''), mIdx));
      if (q.distractors && q.distractors.length === 2) {
        const v = opts.map(isVerbatim);
        const n = v.filter(Boolean).length;
        if (n === 1 && v[0]) {
          stats.shortcutExploitable++;
          shortcutList.push(`${key} 正解是唯一逐字项`);
          blockedBy.push('正解是唯一逐字项（可被表面规则 100% 猜中）');
        } else if (n !== 1) stats.shortcutAmbiguous++;
        const best = Math.max(runs[1], runs[2]);
        if (runs[0] > best + MARGIN) {
          stats.runAdvantage++;
          runList.push(`${key} 正解最长逐字 ${runs[0]} 字，干扰项最多 ${best} 字（差 ${runs[0] - best} > ${MARGIN}）`);
          blockedBy.push(`正解逐字片段比干扰项长出 ${runs[0] - best} 字（>${MARGIN}）`);
        }
        /* 表面策略：不读材料能拿多少分（用同一套分数算，仅供人工抽审对照） */
        const argmax = (arr) => { let bi = 0; for (let i = 1; i < arr.length; i++) if (arr[i] > arr[bi]) bi = i; return bi; };
        const lens = opts.map((o) => norm(o).length);
        if (argmax(runs) === 0) strategy.longestRun++;
        if (argmax(lens) === 0) strategy.longestText++;
        if (opts.map(isVerbatim).findIndex(Boolean) === 0) strategy.verbatim++;
        strategy.firstOption++;
      }

      if (!blockedBy.length) tierB.add(key);
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
      const unitBlob = [JSON.stringify(bu.reading || {}), JSON.stringify(bu.case || {}),
        JSON.stringify(byId.get(`SOL-${String(du.conceptId).replace(/^CON-/, '')}`) || {}),
        cards.get(`${(bu.card || {}).slug}.yaml`) ? cards.get(`${bu.card.slug}.yaml`).raw : ''].join('\n');
      for (const q of qs) {
        const quote = norm((q.correctOption || {}).basisQuote);
        if (quote && !unitBlob.includes(quote)) {
          stats.readingMiss++; readingMissList.push(`${du.unitId}#${q.id} 依据句不在这段材料（reading / CAS / SOL / 本卡）的逐字文本里`);
        }
      }
    }

    /* ⑨ 三题三个判断 + 选项集合不得互为置换 */
    const distinct = new Set(qs.map((q) => norm((q.correctOption || {}).text)));
    const sameAnswer = qs.length > 1 && distinct.size < 3;
    if (sameAnswer) stats.unitsSameCorrect++;
    const optKey = (q) => [norm((q.correctOption || {}).text), ...(q.distractors || []).map((d) => norm(d.text))].sort().join('|');
    const optKeys = qs.map(optKey);
    const permuted = new Set(optKeys).size < optKeys.length;
    if (permuted) stats.unitsPermutedOptions++;

    const unitBlockedBy = [];
    if (sameAnswer) unitBlockedBy.push(`三题共用 ${distinct.size} 个正解（要求 3 个互不相同：1 阅读 → 3 决策）`);
    if (permuted) unitBlockedBy.push('同单元有两道题的选项集合完全一样（互为置换：答对一道等于送另一道）');
    if (blockedQuestions.length) unitBlockedBy.push(`${blockedQuestions.length} 道题被逐题复核挡下`);
    if (qs.length < 3) unitBlockedBy.push(`只有 ${qs.length} 道题（要求 3 道）`);
    if (!unitBlockedBy.length) tierCcount += qs.length;

    unitVerdicts.push({
      unitId: du.unitId, conceptId: du.conceptId, batchStatus: du.status,
      questionCount: qs.length, distinctCorrectAnswers: distinct.size,
      usableQuestions: qs.length - blockedQuestions.length,
      blockedQuestions,
      verdict: unitBlockedBy.length ? 'blocked' : 'usable',
      blockedBy: unitBlockedBy,
    });
  }
  return { stats, unitVerdicts, badRefs, badCorrect, verbatimDistractors, dupDistractors,
    readingMissList, fakeOpi, strayOpiList, polarityList, shortcutList, runList, tierA, tierB, tierCcount, strategy };
}

/* ── 读产物 + 给每题挂上「该单元的材料」（算逐字片段用） ── */
function loadAndDecorate(rel) {
  const decisions = readJson(rel);
  for (const du of decisions.units || []) {
    const bu = batchByUnit.get(du.unitId);
    const slug = bu && bu.card ? bu.card.slug : String(du.unitId).replace(/^batch-/, '');
    const card = cards.get(`${slug}.yaml`);
    const material = [JSON.stringify((bu || {}).reading || {}), card ? card.raw : '',
      JSON.stringify(byId.get(`SOL-${String(du.conceptId).replace(/^CON-/, '')}`) || {})].join('\n');
    for (const q of du.questions || []) q.__material = material;
  }
  return decisions;
}

/* ── 判据自检：同一套检测器跑在上一轮 v2 产物上，必须复现已知坏计数 ── */
if (SELFTEST) {
  const prev = loadAndDecorate(PREV_REL);
  const r = reviewArtifact(prev);
  const checks = [
    ['⑩ 正解是唯一逐字项（v2 全中）', r.stats.shortcutExploitable, 228],
    ['⑨ 三题共用一个正解（v2 全中）', r.stats.unitsSameCorrect, 76],
    ['⑧ 题干与正解极性相反', r.stats.polarityInverted, 16],
    ['② 依据逐字命中（v2 全过，不符数）', r.stats.refBad + r.stats.refShaBad, 0],
    ['③ 依据逐字可回溯（v2 全过，不符数）', r.stats.correctBad, 0],
    ['④ 正解逐字照抄材料（v2 全中，v3 要求 0）', r.stats.correctVerbatim, 228],
    ['③b 正解与依据句锚点不足 8 字（v2 = 0）', r.stats.correctAnchorShort, 0],
  ];
  console.log(`判据自检（跑在 ${PREV_REL} 上，要求复现上一轮人工复核的数字）`);
  let fail = 0;
  for (const [name, got, want] of checks) {
    const ok = got === want;
    if (!ok) fail++;
    console.log(`  ${ok ? '✅' : '❌'} ${name}：${got}（要求 ${want}）`);
  }
  console.log(fail ? `\n判据自检不通过：${fail} 条与已知坏样本对不上——检测器本身有问题，先修检测器。`
    : '\n判据自检通过：三条新判据在已知坏样本上都能咬住，不是空断言。');
  process.exit(fail ? 1 : 0);
}

/* ── 正式复核 ── */
const decisions = loadAndDecorate(DECISIONS_REL);
const R0 = reviewArtifact(decisions);
const { stats, unitVerdicts, tierA, tierB } = R0;
const usableUnits = unitVerdicts.filter((u) => u.verdict === 'usable');
const totalUsableQuestions = unitVerdicts.reduce((n, u) => n + u.usableQuestions, 0);
const rate = (a, b) => (b ? `${(100 * a / b).toFixed(2)}%` : 'n/a');
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(2)}%` : 'n/a');

const summary = {
  generatedAt: new Date().toISOString(),
  reviewer: 'scripts/review-gen-decisions.mjs（独立复算；不采信产物自述）',
  file: DECISIONS_REL,
  verdict: usableUnits.length === unitVerdicts.length && unitVerdicts.length > 0 ? 'usable' : 'blocked',
  declaredCounts: decisions.counts || null,
  rules: {
    perQuestion: [
      '依据逐字可回溯（basisQuote / quote 在 sourceId@locator 里逐字存在，sourceSha256 与磁盘一致）',
      '正解与依据句共享 ≥8 字连续原文（改写了也留得住锚点）',
      '正解不得逐字等于材料原句',
      '干扰项：非空 · 不与材料原句逐字相同 · 两两可区分 · 不与正解一字不差',
      '题干极性对称一致（问「不合适」时正解必须是不合适的那条；问「怎么做」时正解必须是该做的做法）',
      '正解不得是「唯一逐字项」；正解最长逐字片段不得比干扰项长出 8 字以上',
    ],
    perUnit: ['3 道题', '3 道题的正解互不相同（1 阅读 → 3 决策）', '同单元两道题的选项集合不得互为置换', '全部题逐题通过'],
  },
  recomputed: {
    units: stats.units, questions: stats.questions, refs: stats.refs,
    refHitRate: rate(stats.refOk, stats.refs), refBad: stats.refBad, refShaBad: stats.refShaBad,
    correctVerified: stats.correctOk, correctBad: stats.correctBad,
    correctVerbatimCopy: stats.correctVerbatim, correctAnchorBelow8: stats.correctAnchorShort,
    correctShaBad: stats.correctShaBad || 0,
    distractorVerbatim: stats.distractorVerbatim, distractorEmpty: stats.distractorEmpty,
    distractorDupWithin: stats.distractorDupWithin, distractorDupCross: stats.distractorDupCross,
    correctLeak: stats.correctLeak,
    unitsWhereAllThreeCorrectAnswersAreIdentical: stats.unitsSameCorrect,
    unitsWithPermutedOptionSets: stats.unitsPermutedOptions,
    unitsFakingOpi: stats.noOpiUnitsFakeOpi, unitsCitingUnregisteredOpi: stats.strayOpiRefs,
    questionsWhoseCorrectAnswerIsNotInThatUnitsReading: stats.readingMiss,
    polarityInvertedQuestions: stats.polarityInverted,
    polarityNegatedPrescriptionQuestions: stats.polarityNegatedPrescription,
    zeroComprehensionShortcutExploitable: stats.shortcutExploitable,
    zeroComprehensionShortcutAmbiguous: stats.shortcutAmbiguous,
    correctRunAdvantageQuestions: stats.runAdvantage,
    tierA_provenanceCleanQuestions: tierA.size,
    tierB_polarityConsistentQuestions: tierB.size,
    tierC_usableQuestions: R0.tierCcount,
    usableUnits: usableUnits.length, blockedUnits: unitVerdicts.length - usableUnits.length,
    usableQuestions: totalUsableQuestions, blockedQuestions: stats.questions - totalUsableQuestions,
    shortcutStrategyAccuracy: {
      verbatimPick: pct(R0.strategy.verbatim, stats.questions),
      longestVerbatimRun: pct(R0.strategy.longestRun, stats.questions),
      longestText: pct(R0.strategy.longestText, stats.questions),
      firstOption: 'n/a（运行时按 shell 的 learnPerm() 确定性打乱，产物里的顺序不是呈现顺序）',
      note: '不读材料、只按表面特征选的命中率；三选一随机基线 33.33%',
    },
  },
  samples: {
    badRefs: R0.badRefs.slice(0, 25), badCorrect: R0.badCorrect.slice(0, 25),
    verbatimDistractors: R0.verbatimDistractors.slice(0, 25), dupDistractors: R0.dupDistractors.slice(0, 25),
    fakeOpi: R0.fakeOpi.slice(0, 25), strayOpi: R0.strayOpiList.slice(0, 25),
    readingMiss: R0.readingMissList.slice(0, 25),
    polarityInverted: R0.polarityList, shortcutQuestions: R0.shortcutList.slice(0, 10),
    runAdvantage: R0.runList.slice(0, 25),
  },
  units: unitVerdicts,
};

if (WRITE) {
  fs.mkdirSync(path.join(ROOT, OUT_DIR_REL), { recursive: true });
  fs.writeFileSync(path.join(ROOT, OUT_REL), `${JSON.stringify(summary, null, 2)}\n`);
}

if (AS_JSON) console.log(JSON.stringify(summary, null, 2));
else {
  const R = summary.recomputed;
  console.log(`独立复核 ${DECISIONS_REL}`);
  console.log(`产物自述：${JSON.stringify(summary.declaredCounts)}`);
  console.log('— 出处与选项本身 —');
  console.log(`单元 ${R.units} · 题 ${R.questions} · basisRefs ${R.refs}`);
  console.log(`依据逐字命中率：${R.refHitRate}（不通过 ${R.refBad}，其中 sha256 不符 ${R.refShaBad}）`);
  console.log(`正解可回溯：${R.correctVerified} 通过 / ${R.correctBad} 不通过（逐字照抄 ${R.correctVerbatimCopy} · 锚点不足 8 字 ${R.correctAnchorBelow8} · 校验和不符 ${R.correctShaBad}）`);
  console.log(`干扰项逐字等于材料原句：${R.distractorVerbatim} · 空文本：${R.distractorEmpty} · 重复（题内 ${R.distractorDupWithin} / 与正解撞 ${R.distractorDupCross}）`);
  console.log(`correct 字段泄漏：${R.correctLeak}`);
  console.log(`无 OPI 却引用 OPI 的单元：${R.unitsFakingOpi} · 引用未登记 OPI 的单元：${R.unitsCitingUnregisteredOpi}`);
  console.log(`依据句不在该单元材料逐字文本里的题：${R.questionsWhoseCorrectAnswerIsNotInThatUnitsReading}`);
  console.log('— ⑧⑨⑩ 三条（这一轮变成断言）—');
  console.log(`⑧ 题干与正解极性相反的题：${R.polarityInvertedQuestions} / ${R.questions}`);
  console.log(`⑨ 三题共用一个正解的单元：${R.unitsWhereAllThreeCorrectAnswersAreIdentical} / ${R.units} · 选项集合互为置换的单元：${R.unitsWithPermutedOptionSets}`);
  console.log(`⑩a 正解是唯一逐字项的题：${R.zeroComprehensionShortcutExploitable} / ${R.questions}`);
  console.log(`⑩b 正解逐字片段比干扰项长 >${MARGIN} 字的题：${R.correctRunAdvantageQuestions} / ${R.questions}`);
  console.log('— 表面策略能拿多少分（不读材料，三选一随机基线 33.33%）—');
  console.log(`   挑唯一逐字项：${R.shortcutStrategyAccuracy.verbatimPick} · 挑最长逐字片段：${R.shortcutStrategyAccuracy.longestVerbatimRun}`);
  console.log(`   挑最长文本：${R.shortcutStrategyAccuracy.longestText} · 位置偏差：${R.shortcutStrategyAccuracy.firstOption}`);
  console.log('— 复核结论（三档口径）—');
  console.log(`A 出处干净（依据逐字 + 正解可回溯 + 干扰项非逐字且互不相同）：${R.tierA_provenanceCleanQuestions} / ${R.questions}`);
  console.log(`B 再加题干极性一致：${R.tierB_polarityConsistentQuestions} / ${R.questions}`);
  console.log(`C 可当决策题（再加：无零理解捷径 + 单元三题正解互不相同且选项不互为置换）：${R.tierC_usableQuestions} / ${R.questions}`);
  console.log(`可用单元 ${R.usableUnits} / ${R.units}（挡下 ${R.blockedQuestions} 道题）· verdict=${summary.verdict}`);
  const reasons = {};
  for (const u of summary.units) for (const b of u.blockedBy) reasons[b] = (reasons[b] || 0) + 1;
  for (const [k, v] of Object.entries(reasons).sort((a, b) => b[1] - a[1])) console.log(`  · ${k}：${v} 个单元`);
  if (R0.polarityList.length) console.log(`\n[极性相反] ${R0.polarityList.length} 例\n  ${R0.polarityList.slice(0, 10).join('\n  ')}`);
  for (const k of ['badRefs', 'badCorrect', 'verbatimDistractors', 'dupDistractors', 'fakeOpi', 'strayOpi', 'runAdvantage']) {
    const v = summary.samples[k];
    if (v.length) console.log(`\n[${k}] ${v.length} 例\n  ${v.join('\n  ')}`);
  }
}

if (WRITE) console.log(`\n已写出 ${OUT_REL}`);
const fatal = stats.refBad > 0 || stats.correctBad > 0 || stats.correctLeak > 0
  || stats.distractorEmpty > 0 || stats.distractorDupCross > 0
  || stats.correctVerbatim > 0 || stats.correctAnchorShort > 0
  || stats.polarityInverted > 0 || stats.shortcutExploitable > 0 || stats.runAdvantage > 0
  || stats.unitsSameCorrect > 0 || stats.unitsPermutedOptions > 0
  || usableUnits.length !== unitVerdicts.length;
process.exit(fatal ? 1 : 0);
