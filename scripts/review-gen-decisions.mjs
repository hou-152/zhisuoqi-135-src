#!/usr/bin/env node
// 独立复核：evidence/gen-decisions-hybrid-v2-20260914.json（228 题 / 76 单元）
//
//   node scripts/review-gen-decisions.mjs [--json]
//
// 立场：**不信产物自述的「九条硬门槛全过」**。本脚本从公共源数据（units.json + 图鉴卡 yaml）
// 把每条 basisRefs / correctOption 重新解一遍，自己数命中率；产物里任何一句自述都不作为输入。
//
// 复算的七件事：
//   ① 结构：76 单元 × 3 题 × (1 正解 + 2 干扰项)
//   ② basisRefs 逐字：sourceId 指向的单元/卡片里，quote 是否逐字存在，locator 是否指到同一句，sha256 是否对
//   ③ 正解逐字：correctOption.text === basisQuote 且逐字来自它声称的 SOL/CAS
//   ④ 干扰项不得逐字等于材料原句（它自己的硬门槛之一，这里重算）
//   ⑤ 干扰项两两可区分（不是同一句换皮）+ 不得与正解同义复用
//   ⑥ correct 字段是否泄漏到不该在的地方
//   ⑦ 题目是否依赖该单元的 reading；57 个缺 OPI 的单元有没有假装有 OPI
//
// 退出码：0 = 全部通过；1 = 有硬伤（逐字命中率 < 100% / 有泄漏 / 有空 basisRefs 等）
//
// 边界：只读。不改 units.json、不改图鉴卡、不改任何公共源数据。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { readYamlFields } from './lib/graph-adapter.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DECISIONS_REL = 'evidence/gen-decisions-hybrid-v2-20260914.json';
const UNITS_REL = '内容结构化系统/模块/ai-concept-base/data/units.json';
const CARD_DIR_REL = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
const BATCH_REL = 'evidence/batch-units-260914/units.json';

const AS_JSON = process.argv.includes('--json');
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const sha256 = (abs) => crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
const norm = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();

/* ── 源数据（只读） ── */
const decisions = readJson(DECISIONS_REL);
const unitsArr = readJson(UNITS_REL);
const units = unitsArr.units || unitsArr;
const byId = new Map(units.map((u) => [u.id, u]));
const unitsRaw = fs.readFileSync(path.join(ROOT, UNITS_REL), 'utf8');
const batch = readJson(BATCH_REL);
const batchByUnit = new Map(batch.units.map((u) => [u.unitId, u]));

const cards = new Map();
for (const f of fs.readdirSync(path.join(ROOT, CARD_DIR_REL)).filter((x) => x.endsWith('.yaml'))) {
  const rel = `${CARD_DIR_REL}/${f}`;
  cards.set(f, { rel, raw: fs.readFileSync(path.join(ROOT, rel), 'utf8'), sha: sha256(path.join(ROOT, rel)), fields: null });
}
const cardFields = (slugFile) => {
  const c = cards.get(slugFile);
  if (!c) return null;
  if (!c.fields) c.fields = readYamlFields(c.raw);
  return c.fields;
};

const findings = { hard: [], warn: [], info: [] };
const hard = (m) => findings.hard.push(m);
const warn = (m) => findings.warn.push(m);

/* ── ② 解析一条 ref：sourceId + locator + quote ── */
// sourceId 两种形态：'SOL-x'/'CAS-x'/'OPI-x'/'QST-x' → units.json；
//                     'concepts/foo.yaml'             → 图鉴卡
function resolveRef(ref) {
  const sid = String(ref.sourceId || '');
  const loc = String(ref.locator || '');
  const out = { ok: false, why: '', value: undefined, kind: '' };

  if (sid.startsWith('concepts/')) {
    out.kind = 'card';
    const file = sid.slice('concepts/'.length);
    const c = cards.get(file);
    if (!c) { out.why = `图鉴卡目录里没有 ${file}`; return out; }
    if (ref.sourceFile && ref.sourceFile !== c.rel) { out.why = `sourceFile 与 sourceId 不是同一张卡（${ref.sourceFile}）`; return out; }
    // 行号定位 boundaries:Lnn
    const lm = /^boundaries:L(\d+)$/.exec(loc);
    if (lm) {
      const line = c.raw.split('\n')[Number(lm[1]) - 1];
      if (line === undefined) { out.why = `行号越界 ${loc}`; return out; }
      out.value = line.replace(/^\s*-\s?/, '').trim();
      out.ok = true;
      return out;
    }
    const y = cardFields(file);
    const m = /^([a-z_]+)\[(\d+)]$/.exec(loc);
    if (m) {
      const arr = y[m[1]];
      if (!Array.isArray(arr)) { out.why = `${loc} 不是列表`; return out; }
      if (arr[Number(m[2])] === undefined) { out.why = `${loc} 越界`; return out; }
      out.value = arr[Number(m[2])];
      out.ok = true;
      return out;
    }
    if (!Object.prototype.hasOwnProperty.call(y, loc)) { out.why = `卡里没有字段 ${loc}`; return out; }
    out.value = y[loc];
    out.ok = true;
    return out;
  }

  out.kind = 'unit';
  const m = /^units\[id=([^\]]+)]\.(.+)$/.exec(loc);
  if (!m) { out.why = `locator 形状不认：${loc}`; return out; }
  if (m[1] !== sid) { out.why = `sourceId ${sid} 与 locator 里的 ${m[1]} 不一致`; return out; }
  const u = byId.get(sid);
  if (!u) { out.why = `units.json 里没有单元 ${sid}`; return out; }
  let cur = u;
  for (const seg of m[2].split('.')) {
    const mm = /^(.+)\[(\d+)]$/.exec(seg);
    if (mm) {
      cur = cur[mm[1]];
      if (!Array.isArray(cur)) { out.why = `${loc} 里 ${seg} 不是数组`; return out; }
      cur = cur[Number(mm[2])];
    } else cur = cur[seg];
    if (cur === undefined) { out.why = `${loc} 里 ${seg} 取不到`; return out; }
  }
  out.value = cur;
  out.ok = true;
  return out;
}

/* ── 材料全集（用于「干扰项不得逐字等于材料原句」的复算） ── */
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

/* ── 遍历产物 ── */
const stats = {
  units: 0, questions: 0, refs: 0,
  refOk: 0, refBad: 0, refShaBad: 0,
  correctOk: 0, correctBad: 0,
  distractorVerbatim: 0, distractorEmpty: 0,
  distractorDupWithin: 0, distractorDupCross: 0,
  correctLeak: 0,
  unitsSameCorrect: 0, noOpiUnitsFakeOpi: 0, strayOpiRefs: 0, readingMiss: 0,
  questionsPerUnit: {}, distinctCorrectPerUnit: {},
};
const badRefs = [], badCorrect = [], verbatimDistractors = [], dupDistractors = [], readingMissList = [], fakeOpi = [], strayOpiList = [], sameCorrectUnits = [];

// 全文件扫 correct 泄漏
(function scanLeak(node, trail) {
  if (Array.isArray(node)) { node.forEach((x, i) => scanLeak(x, `${trail}[${i}]`)); return; }
  if (!node || typeof node !== 'object') return;
  for (const [k, v] of Object.entries(node)) {
    if (/^(correct|isCorrect|answer|answerIndex|solution|key)$/i.test(k) && k !== 'correctOption') {
      stats.correctLeak++; hard(`correct 字段泄漏：${trail}.${k} = ${JSON.stringify(v).slice(0, 80)}`);
    }
    scanLeak(v, `${trail}.${k}`);
  }
})(decisions, '$');

for (const du of decisions.units || []) {
  stats.units++;
  const bu = batchByUnit.get(du.unitId);
  const nQ = (du.questions || []).length;
  stats.questionsPerUnit[nQ] = (stats.questionsPerUnit[nQ] || 0) + 1;
  if (nQ !== 3) warn(`${du.unitId} 不是 3 道题（${nQ}）`);

  const unitTexts = new Set();
  for (const q of du.questions || []) {
    stats.questions++;
    const co = q.correctOption || {};

    /* ③ 正解逐字 */
    const cres = resolveRef({ sourceId: co.basis, locator: co.locator, sourceFile: co.sourceFile });
    if (!cres.ok) { stats.correctBad++; badCorrect.push(`${du.unitId}#${q.id} 正解定位失败：${cres.why}`); }
    else {
      const hit = norm(co.text) && norm(cres.value).includes(norm(co.text));
      const quoteHit = norm(co.basisQuote) && norm(cres.value).includes(norm(co.basisQuote));
      if (!hit) { stats.correctBad++; badCorrect.push(`${du.unitId}#${q.id} 正解文本不在 ${co.basis}@${co.locator} 里`); }
      else if (!quoteHit) { stats.correctBad++; badCorrect.push(`${du.unitId}#${q.id} basisQuote 与正解文本对不上`); }
      else stats.correctOk++;
    }
    // 正解自身必须逐字出现在某个材料源里
    if (norm(co.text) && !MATERIAL.some((m) => m.includes(co.text))) {
      stats.correctBad++; badCorrect.push(`${du.unitId}#${q.id} 正解不在任何材料源里`);
    }
    unitTexts.add(norm(co.text));

    /* ② / ④ / ⑤ 干扰项 */
    const localTexts = new Set();
    for (const [di, d] of (q.distractors || []).entries()) {
      const refs = d.basisRefs || [];
      if (!refs.length) { stats.refBad++; badRefs.push(`${du.unitId}#${q.id} D${di} 没有任何 basisRefs`); }
      for (const r of refs) {
        stats.refs++;
        const res = resolveRef(r);
        if (!res.ok) { stats.refBad++; badRefs.push(`${du.unitId}#${q.id} D${di} ${r.refId || ''} ${res.why}`); continue; }
        if (!norm(res.value).includes(norm(r.quote))) {
          stats.refBad++; badRefs.push(`${du.unitId}#${q.id} D${di} ${r.refId || ''} quote 不在 ${r.sourceId}@${r.locator} 里`); continue;
        }
        if (r.sourceFile && r.sourceSha256) {
          const abs = path.join(ROOT, r.sourceFile);
          if (!fs.existsSync(abs)) { stats.refShaBad++; badRefs.push(`${du.unitId}#${q.id} D${di} sourceFile 不存在 ${r.sourceFile}`); continue; }
          if (sha256(abs) !== r.sourceSha256) { stats.refShaBad++; badRefs.push(`${du.unitId}#${q.id} D${di} sha256 对不上 ${r.sourceFile}`); continue; }
        }
        stats.refOk++;
      }
      // ④ 干扰项不得逐字等于材料原句
      const t = norm(d.text);
      if (!t) { stats.distractorEmpty++; verbatimDistractors.push(`${du.unitId}#${q.id} D${di} 空文本`); }
      else if (MATERIAL.some((m) => m.includes(d.text))) {
        stats.distractorVerbatim++; verbatimDistractors.push(`${du.unitId}#${q.id} D${di} 与材料原句逐字相同：${d.text.slice(0, 50)}`);
      }
      // ⑤ 两两可区分
      if (localTexts.has(t)) { stats.distractorDupWithin++; dupDistractors.push(`${du.unitId}#${q.id} D${di} 与同题另一干扰项一字不差`); }
      localTexts.add(t);
      if (t === norm(co.text)) { stats.distractorDupCross++; dupDistractors.push(`${du.unitId}#${q.id} D${di} 与正解一字不差`); }
      if (!norm(d.why)) warn(`${du.unitId}#${q.id} D${di} 缺 why`);
    }
  }

  /* ⑦ 该单元的 reading 与题目依据的对应 */
  const correctLocs = (du.questions || []).map((q) => String((q.correctOption || {}).basis || ''));
  const solIds = [...new Set(correctLocs.filter((x) => x.startsWith('SOL-')))];
  if (bu) {
    // 该单元在 units.json 里登记的 OPI 观点单元（空数组 = 这个单元没有 OPI）
    const declaredOpi = (bu.opinions || []).map((o) => o.id);
    // reading 里是否真出现这句话：用 reading.original/explain/intuition/mechanism/boundary 拼一串
    const readingBlob = bu ? JSON.stringify(bu.reading || {}) : '';
    for (const q of du.questions || []) {
      const txt = norm((q.correctOption || {}).text);
      if (txt && readingBlob && !readingBlob.includes(txt)) {
        stats.readingMiss++; readingMissList.push(`${du.unitId}#${q.id} 正解不在这段 reading 的逐字文本里`);
      }
    }
    /* 缺 OPI 的单元不许有 OPI 依据 */
    const unitSolBasis = (du.questions || []).flatMap((q) => [
      String((q.correctOption || {}).basis || ''),
      ...(q.distractors || []).flatMap((d) => (d.basisRefs || []).map((r) => String(r.sourceId || ''))),
    ]);
    const opiRefs = unitSolBasis.filter((x) => /^OPI-/.test(x));
    if (declaredOpi.length === 0 && opiRefs.length) {
      stats.noOpiUnitsFakeOpi++; fakeOpi.push(`${du.unitId} 无 OPI（units.json opinions=[]）却引用了 ${[...new Set(opiRefs)].join(',')}`);
    }
    // 反过来：有 OPI 的单元，OPI 只能来自它自己登记的那几个
    const strayOpi = [...new Set(opiRefs)].filter((x) => !declaredOpi.includes(x));
    if (declaredOpi.length && strayOpi.length) {
      stats.strayOpiRefs++; strayOpiList.push(`${du.unitId} 引用了未登记的 OPI：${strayOpi.join(',')}（登记 ${declaredOpi.join(',')}）`);
    }
  }

  /* 同一单元内正解是否同一句 */
  const distinct = new Set((du.questions || []).map((q) => norm((q.correctOption || {}).text)));
  stats.distinctCorrectPerUnit[distinct.size] = (stats.distinctCorrectPerUnit[distinct.size] || 0) + 1;
  if (distinct.size === 1 && nQ > 1) { stats.unitsSameCorrect++; sameCorrectUnits.push(du.unitId); }
}

/* ── 汇总 ── */
const rate = (a, b) => (b ? (100 * a / b).toFixed(2) + '%' : 'n/a');
const summary = {
  file: DECISIONS_REL,
  declaredCounts: decisions.counts || null,
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
    questionsPerUnit: stats.questionsPerUnit,
    distinctCorrectAnswersPerUnit: stats.distinctCorrectPerUnit,
  },
  samples: {
    badRefs: badRefs.slice(0, 25),
    badCorrect: badCorrect.slice(0, 25),
    verbatimDistractors: verbatimDistractors.slice(0, 25),
    dupDistractors: dupDistractors.slice(0, 25),
    fakeOpi: fakeOpi.slice(0, 25),
    strayOpi: strayOpiList.slice(0, 25),
    readingMiss: readingMissList.slice(0, 25),
    sameCorrectUnits: sameCorrectUnits.slice(0, 25),
  },
  hardFindings: findings.hard.length,
  warnFindings: findings.warn.length,
};

if (AS_JSON) { console.log(JSON.stringify(summary, null, 2)); }
else {
  const R = summary.recomputed;
  console.log(`独立复核 ${DECISIONS_REL}`);
  console.log(`产物自述：${JSON.stringify(summary.declaredCounts)}`);
  console.log('— 复算结果 —');
  console.log(`单元 ${R.units} · 题 ${R.questions} · basisRefs ${R.refs}`);
  console.log(`basisRefs 逐字命中率：${R.refHitRate}（不通过 ${R.refBad}，其中 sha256 不符 ${R.refShaBad}）`);
  console.log(`正解逐字可回溯：${R.correctVerified} 通过 / ${R.correctBad} 不通过`);
  console.log(`干扰项逐字等于材料原句：${R.distractorVerbatim} · 空文本：${R.distractorEmpty}`);
  console.log(`干扰项重复（题内 ${R.distractorDupWithin} / 与正解撞 ${R.distractorDupCross}）`);
  console.log(`correct 字段泄漏：${R.correctLeak}`);
  console.log(`三题正解全都同一句的单元：${R.unitsWhereAllThreeCorrectAnswersAreIdentical}`);
  console.log(`每单元不同正解数分布：${JSON.stringify(R.distinctCorrectAnswersPerUnit)}`);
  console.log(`无 OPI 却引用 OPI 的单元：${R.unitsFakingOpi} · 引用未登记 OPI 的单元：${R.unitsCitingUnregisteredOpi}`);
  console.log(`正解不在该单元 reading 逐字文本里的题：${R.questionsWhoseCorrectAnswerIsNotInThatUnitsReading}`);
  for (const [k, v] of Object.entries(summary.samples)) {
    if (v.length) console.log(`\n[${k}] ${v.length} 例\n  ${v.join('\n  ')}`);
  }
  if (findings.warn.length) console.log(`\n提示 ${findings.warn.length} 条：\n  ${findings.warn.slice(0, 20).join('\n  ')}`);
}

const fatal = stats.refBad > 0 || stats.correctBad > 0 || stats.correctLeak > 0 || stats.distractorEmpty > 0 || stats.distractorDupCross > 0;
process.exit(fatal ? 1 : 0);
