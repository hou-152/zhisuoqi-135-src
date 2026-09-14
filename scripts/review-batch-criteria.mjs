#!/usr/bin/env node
// 独立复核：批量 76 个单元的费曼判据（264 条）—— misconception 到底是不是机械反面转述。
//
//   node scripts/review-batch-criteria.mjs              # 人看的报告（verdict≠usable 时退出码 1）
//   node scripts/review-batch-criteria.mjs --json       # 机器可读
//   node scripts/review-batch-criteria.mjs --write      # 写出 evidence/review-criteria-260914/review.json
//   node scripts/review-batch-criteria.mjs --selftest   # 判据自检：正控（已知机械转述）× 负控（六章人工判据）
//
// 立场（与 review-gen-decisions.mjs 同一套）：**不信产物自述**。
// condition / point / misconception 一律从公共源数据（units.json 的 CON 正文与反向语义单元、76 张图鉴卡）
// 重新解一遍再比对；产物里的 derivation / misconceptionSource 只当作"被检对象"，不作为输入。
//
// 逐条判据（四类，全部可从源数据复算）：
//   ① 出处可回溯：condition 逐字等于该卡 boundaries[locator] 原文 · point 是该条前 12 字 ·
//      sha256 与磁盘一致 · derivation.from 指到同一条边界（三者指向同一件事的一半）
//   ② 机械反面转述（三种形态，命中任一条即"没有误解信息增量"）：
//      ②a 用生成器同一张 FLIP 表重算，重算结果逐字等于 misconception（证明它就是那条规则算出来的）
//      ②b 整条否定：misconception = 「误以为这条边界不成立：」+ condition（去掉前缀后逐字相同）
//      ②c 误解句里逐字包含完整正确条件（≥20 字）——这不是误解，是把正确答案抄进了误解
//   ③ 信息增量：novelChars = 把 misconception 与 condition 的最长公共连续子串贪心抠掉后剩下的字符数。
//      真实的教学误解要说出"学生错在哪"（人写的 18 条实测 22–49 字）；机械转述的增量 ≈ 0–11 字。
//   ④ 复述边界就能满足：condition 逐字就在学习者能看到的材料里（卡片 boundaries/how_to/remember/
//      feynman/source_context ＋ CON 正文），且 required[] 每条都是 condition 的连续子串
//      —— 照抄 boundaries 就全过，它不构成理解判据。
//   ⑤ 同一单元判据互相重复：condition / point / misconception 逐字撞，或两两最长公共子串覆盖率 ≥ 0.5
//   ⑥ 极性一致（point / condition / misconception 指向同一件事）：
//      ⑥a 同一出处（point 是 condition 开头 · derivation.from 与 locator 是同一条边界）
//      ⑥b 误解句含完整正确条件（同 ②c，从极性角度再记一次）
//      ⑥c 部分翻转：condition 里有 ≥2 个 FLIP 短语却只翻了一个，其余否定原样留在误解句里
//          —— 误解指向的是另一句，极性无从判定（生成器的 indexOf 取的是列表序不是句中位置）
//      ⑥d 否定极性确实反转（condition 否定 / misconception 肯定）：记通过项，不是硬门槛
//
// 三档口径：
//   A 出处干净 · B 再加"有真实误解信息增量"（②未命中且 ③ 达标）· C 可当理解判据（再加 ④⑤⑥ 未命中）
//   verdict：C = 总数 → usable · C = 0 → unusable · 否则 needs-fix
//
// 退出码：0 = verdict=usable；1 = 有判据不达标。--write 时总是写文件，退出码照旧。
// 边界：只读公共源数据与产物；只写 evidence/review-criteria-260914/ 下自己的产物。

import fs from 'node:fs';
import path from 'node:path';
import { readYamlFields } from './lib/graph-adapter.mjs';
import { FLIP, DENIAL_PREFIX, deriveMisconception, firstChars, sha256File } from './lib/batch-units-rules.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const ARTIFACT_REL = (process.argv.find((a) => a.startsWith('--file=')) || '').slice('--file='.length)
  || 'evidence/batch-units-260914/units.json';
const UNITS_REL = '内容结构化系统/模块/ai-concept-base/data/units.json';
const CARD_DIR_REL = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
const CHAPTERS_REL = 'evidence/agent-loop-260913/chapters.json';   // 负控：六章 18 条人工判据
const OUT_DIR_REL = 'evidence/review-criteria-260914';
const OUT_REL = `${OUT_DIR_REL}/review.json`;

const MIN_NOVEL = 20;      // ③ 误解信息增量下限（人写 18 条实测最小 22；机械转述最大 11）
const DUP_RATIO = 0.5;     // ⑤ 判据互相重复的覆盖率阈值
const MIN_QUOTE = 20;      // ②c / ⑥b 「误解句里含完整正确条件」的最短长度

const AS_JSON = process.argv.includes('--json');
const WRITE = process.argv.includes('--write');
const SELFTEST = process.argv.includes('--selftest');
const read = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const norm = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();

/* ── 最长公共连续子串：既用来量"有多像"，也用来抠出"新增内容" ── */
function lcs(a, b) {
  a = norm(a); b = norm(b);
  let best = 0, bestText = '';
  const idx = new Map();
  const K = 3;
  for (let i = 0; i + K <= b.length; i++) {
    const g = b.slice(i, i + K);
    if (!idx.has(g)) idx.set(g, []);
    idx.get(g).push(i);
  }
  for (let i = 0; i + K <= a.length; i++) {
    const p = idx.get(a.slice(i, i + K));
    if (!p) continue;
    for (const q of p) {
      let l = K;
      while (i + l < a.length && q + l < b.length && a[i + l] === b[q + l]) l++;
      if (l > best) { best = l; bestText = a.slice(i, i + l); }
    }
  }
  return { len: best, text: bestText };
}
/** 误解相对条件的新增内容：反复抠掉最长公共片段，剩下的字符数。 */
function novelChars(condition, misconception) {
  const c = norm(condition);
  let rest = norm(misconception);
  for (let guard = 0; guard < 50; guard++) {
    const r = lcs(rest, c);
    if (r.len < 6) break;
    rest = rest.replace(r.text, '');
  }
  return rest.length;
}
const flipsIn = (s) => FLIP.filter(([neg]) => norm(s).includes(neg));

/* ── 源数据（只读） ── */
const unitsArrRaw = read(UNITS_REL);
const unitsArr = unitsArrRaw.units || unitsArrRaw;
const byUnit = new Map(unitsArr.map((u) => [u.id, u]));
const cards = new Map();
for (const f of fs.readdirSync(path.join(ROOT, CARD_DIR_REL)).filter((x) => x.endsWith('.yaml'))) {
  const rel = `${CARD_DIR_REL}/${f}`;
  const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  cards.set(f.replace(/\.yaml$/, ''), { rel, raw, fields: readYamlFields(raw), sha: sha256File(path.join(ROOT, rel)) });
}
/** 该 CON 的学习者可见材料（公共源数据重算，不用产物里的 reading 自述）。 */
function materialOf(conceptId, cardSlug) {
  const chunks = [];
  const con = byUnit.get(conceptId);
  if (con) chunks.push(String(con.body || ''), String(con.title || ''), JSON.stringify(con.key_fields || {}));
  const card = cards.get(cardSlug);
  if (card) {
    const y = card.fields;
    for (const k of ['remember', 'feynman', 'source_context', 'transfer_question']) if (y[k]) chunks.push(String(y[k]));
    for (const k of ['boundaries', 'how_to']) for (const x of (y[k] || [])) chunks.push(String(x));
    chunks.push(card.raw);
  }
  // 反向语义单元（QST/CAS/SOL/OPI）也是页面上会出现的材料
  for (const u of unitsArr) {
    if (u.type === '概念单元') continue;
    if ((u.relationships || []).some((r) => r && r.target === conceptId)) chunks.push(JSON.stringify(u.key_fields || {}));
  }
  return chunks.join('\n');
}

/** 一条判据的完整复算。criterion 形如 { id, point, condition, misconception, sourceFile, sourceSha256, locator, derivation } */
function judgeCriterion(cr, ctx) {
  const cond = norm(cr.condition);
  const mis = norm(cr.misconception);
  const point = norm(cr.point);
  const card = ctx.card || null;
  const loc = String(cr.locator || '');
  const flags = [];
  const notes = {};

  /* ① 出处可回溯 */
  let cardText = null;
  if (card) {
    const m = /^boundaries\[(\d+)]$/.exec(loc);
    if (m) cardText = (card.fields.boundaries || [])[Number(m[1])];
  }
  const verbatimHit = !!cond && cardText !== undefined && norm(cardText) === cond;
  const shaOk = !!card && cr.sourceSha256 === card.sha && (!cr.sourceFile || cr.sourceFile === card.rel);
  const pointIsPrefix = !!cond && !!point
    && String(cr.condition || '').startsWith(String(cr.point || ''))
    && String(cr.point || '') === firstChars(String(cr.condition || ''), 12);
  const sourceAligned = !cr.derivation || norm((cr.derivation || {}).from) === loc;
  if (!verbatimHit) flags.push('① condition 不是图鉴卡同一条 boundaries[locator] 的原文');
  if (!shaOk) flags.push('① sourceSha256 / sourceFile 与磁盘不一致');
  if (!pointIsPrefix) flags.push('① point 不是 condition 的前 12 字');
  if (!sourceAligned) flags.push('① derivation.from 与 locator 不是同一条边界');
  notes.provenance = { verbatimHit, shaOk, pointIsPrefix, sourceAligned };

  /* ② 机械反面转述（三种形态） */
  const redrive = deriveMisconception(cond);
  const mechRedrive = !!mis && redrive.rule === 'negation-flip' && redrive.text === mis;  // ②a（否定翻转族）
  const mechDenial = !!cond && (mis === DENIAL_PREFIX + cond
    || (mis.startsWith(DENIAL_PREFIX) && mis.slice(DENIAL_PREFIX.length) === cond));      // ②b
  const misHasFullCondition = cond.length >= MIN_QUOTE && mis.includes(cond);             // ②c
  const mech = mechRedrive || mechDenial || misHasFullCondition;
  if (mech) {
    flags.push(`② 机械反面转述（${[mechRedrive && `②a 与 FLIP 重算逐字相同（翻转「${redrive.flipped}」）`,
      mechDenial && '②b 整条否定（前缀＋原文）', misHasFullCondition && '②c 误解句里逐字含完整正确条件']
      .filter(Boolean).join(' + ')}）`);
  }

  /* ③ 信息增量 */
  const shared = lcs(cond, mis);
  const novel = novelChars(cond, mis);
  const lcsRatio = cond.length ? +(shared.len / cond.length).toFixed(3) : 0;
  const enough = novel >= MIN_NOVEL;
  if (!enough) flags.push(`③ 误解信息增量不足（新增 ${novel} 字 < ${MIN_NOVEL}；与条件共享 ${shared.len}/${cond.length} 字，覆盖率 ${lcsRatio}）`);

  /* ④ 复述边界就能满足：
     condition 逐字就在学习者可见的材料里（卡片 boundaries 段本身），
     且 required[] 的每一条都能在本单元的某条 condition（=边界原文）里逐字找到
     —— 也就是说：把卡片 boundaries 原样复述一遍，要点全部满足，判据不构成理解检查。 */
  const inMaterial = !!cond && ctx.material.includes(cond);
  const requiredCovered = (ctx.required || []).length > 0
    && (ctx.required || []).every((r) => (ctx.siblings || []).some((s) => norm(s.condition).includes(norm(r))));
  const reciteShortcut = inMaterial && requiredCovered;
  if (reciteShortcut) flags.push('④ 照抄这条边界原文即可满足（condition 逐字在可见材料里，required 每条都能在 boundaries 里逐字找到）');
  notes.recite = { inMaterial, requiredCovered };

  /* ⑤ 同单元判据互相重复 */
  for (const other of ctx.siblings || []) {
    if (other.id === cr.id) continue;
    if (norm(other.condition) === cond) { flags.push(`⑤ 与同单元 ${other.id} 的 condition 一字不差`); break; }
    if (point && norm(other.point) === point) { flags.push(`⑤ 与同单元 ${other.id} 的 point 一字不差（要点撞车）`); break; }
    if (mis && norm(other.misconception) === mis) { flags.push(`⑤ 与同单元 ${other.id} 的 misconception 一字不差`); break; }
    const cover = lcs(cond, other.condition).len / Math.max(1, Math.min(cond.length, norm(other.condition).length));
    if (cover >= DUP_RATIO) { flags.push(`⑤ 与同单元 ${other.id} 的 condition 覆盖 ${(cover * 100).toFixed(0)}%（≥${DUP_RATIO * 100}%）`); break; }
  }

  /* ⑥ 极性一致 */
  const flippedList = flipsIn(cond);
  /* ⑥c 翻转翻错位置：condition 里最靠前的那条否定短语才是主断言；若 derivation 记的 flipped
     不是它（生成器按表序取短语、不看句中位置），误解就翻在从句上，指向的是另一句。 */
  let earliest = null;
  for (const [neg] of flippedList) {
    const i = cond.indexOf(neg);
    if (i < 0) continue;
    if (!earliest || i < earliest.i || (i === earliest.i && neg.length > earliest.neg.length)) earliest = { neg, i };
  }
  const partialFlip = cr.derivation && cr.derivation.rule === 'negation-flip'
    && !!earliest && cr.derivation.flipped !== earliest.neg;
  if (partialFlip) flags.push(`⑥c 翻转翻错位置：句中最靠前的否定是「${earliest.neg}」，被翻的却是「${cr.derivation.flipped}」——误解指向另一句`);
  const negCond = flippedList.length > 0;
  const negMis = flipsIn(mis).length > 0;
  notes.polarity = { negCond, negMis, inverted: negCond !== negMis, earliest: earliest ? earliest.neg : '' };

  const tierA = flags.every((f) => !f.startsWith('①'));
  const tierB = tierA && !mech && enough;
  const tierC = tierB && !reciteShortcut && !flags.some((f) => f.startsWith('⑤') || f.startsWith('⑥'));
  return {
    id: cr.id, tierA, tierB, tierC, flags,
    metrics: { condLen: cond.length, misLen: mis.length, sharedRun: shared.len, lcsRatio, novel, flipped: (cr.derivation || {}).flipped || '', flipRule: (cr.derivation || {}).rule || '', mechForms: [mechRedrive && '②a', mechDenial && '②b', misHasFullCondition && '②c'].filter(Boolean) },
    notes,
  };
}

/* ── 复核一份产物（批量产物与六章人工判据共用同一个函数，--selftest 才有意义） ── */
function reviewCriteria(list, label) {
  const stats = {
    total: 0, tierA: 0, tierB: 0, tierC: 0,
    mech: 0, mechA: 0, mechB: 0, mechC: 0, novelShort: 0, recite: 0, dup: 0, polarity: 0, provenance: 0,
    novelMin: null, novelMax: null, novelSum: 0, lcsRatioMax: 0,
    units: new Set(), unitsWithDup: new Set(), unitsWithPartialFlip: new Set(),
  };
  const rows = [];
  for (const item of list) {
    stats.total++;
    stats.units.add(item.unitId);
    const r = judgeCriterion(item.criterion, item.ctx);
    const forms = r.metrics.mechForms;
    if (forms.length) { stats.mech++; if (forms.includes('②a')) stats.mechA++; if (forms.includes('②b')) stats.mechB++; if (forms.includes('②c')) stats.mechC++; }
    if (!r.tierB && r.metrics.novel < MIN_NOVEL) stats.novelShort++;
    if (r.flags.some((f) => f.startsWith('④'))) stats.recite++;
    if (r.flags.some((f) => f.startsWith('⑤'))) { stats.dup++; stats.unitsWithDup.add(item.unitId); }
    if (r.flags.some((f) => f.startsWith('⑥'))) { stats.polarity++; stats.unitsWithPartialFlip.add(item.unitId); }
    if (r.flags.some((f) => f.startsWith('①'))) stats.provenance++;
    if (r.tierA) stats.tierA++;
    if (r.tierB) stats.tierB++;
    if (r.tierC) stats.tierC++;
    stats.novelSum += r.metrics.novel;
    stats.novelMin = stats.novelMin === null ? r.metrics.novel : Math.min(stats.novelMin, r.metrics.novel);
    stats.novelMax = stats.novelMax === null ? r.metrics.novel : Math.max(stats.novelMax, r.metrics.novel);
    stats.lcsRatioMax = Math.max(stats.lcsRatioMax, r.metrics.lcsRatio);
    rows.push({ unitId: item.unitId, ...r });
  }
  stats.units = stats.units.size;
  stats.unitsWithDup = stats.unitsWithDup.size;
  stats.unitsWithPartialFlip = stats.unitsWithPartialFlip.size;
  stats.novelAvg = stats.total ? +(stats.novelSum / stats.total).toFixed(1) : 0;
  stats.verdict = stats.tierC === stats.total && stats.total > 0 ? 'usable'
    : (stats.tierC === 0 ? 'unusable' : 'needs-fix');
  return { label, stats, rows };
}

/* ── 批量产物：逐单元组装（判据 + 同单元兄弟 + 可见材料 + required） ── */
function loadArtifactItems(rel) {
  const data = read(rel);
  const items = [];
  const perUnit = [];
  for (const u of data.units || []) {
    const con = (u.concepts || [])[0] || {};
    const ctxBase = { card: cards.get(u.card.slug) || null, material: materialOf(u.conceptId, u.card.slug), required: (u.feynman || {}).required || [] };
    const checks = (u.feynman || {}).checks || [];
    for (const c of checks) {
      items.push({ unitId: u.unitId, conceptId: u.conceptId, criterion: c, ctx: { ...ctxBase, siblings: checks } });
    }
    perUnit.push({ unitId: u.unitId, conceptId: u.conceptId, checkCount: checks.length, card: u.card.slug, status: u.status, superseded: !!u.superseded });
  }
  return { data, items, perUnit };
}

/* ── 六章人工判据（负控：从 chapters.json 重算，见 lib/graph-adapter 之外的独立口径） ── */
function loadHumanItems() {
  const ch = read(CHAPTERS_REL);
  const items = [];
  for (const c of ch.chapters || []) {
    const cardSlug = ((c.sourceChain || {}).card || '').replace(/\.yaml$/, '')
      || String((c.concept || {}).body || '').match(/concepts\/([a-z0-9-]+)\.yaml/)?.[1] || '';
    const ctxBase = { card: cards.get(cardSlug) || null, material: materialOf(c.concept.id, cardSlug), required: (c.feynman || {}).required || [] };
    const checks = (c.feynman || {}).checks || [];
    for (const k of checks) items.push({ unitId: c.chapterId, conceptId: c.concept.id, criterion: k, ctx: { ...ctxBase, siblings: checks } });
  }
  return items;
}

/* ══ --selftest：正控（必须咬住已知机械转述）× 负控（不许误杀六章人工判据） ══ */
if (SELFTEST) {
  const { items } = loadArtifactItems(ARTIFACT_REL);
  const R = reviewCriteria(items, '批量判据（正控）');
  const H = reviewCriteria(loadHumanItems(), '六章人工判据（负控）');
  const checks = [
    [`正控 · ② 机械反面转述命中（②a 翻转重算 ${R.stats.mechA} + ②b 整条否定 ${R.stats.mechB} + ②c 含完整正确条件）`,
      R.stats.mech, (s) => s >= 179],
    ['正控 · ③ 误解信息增量不足的条数', R.stats.novelShort, (s) => s === R.stats.total],
    ['正控 · ④ 照抄边界原文即可满足的条数', R.stats.recite, (s) => s === R.stats.total],
    ['正控 · ④ 逐字命中可见材料的条数（材料侧复算）', R.rows.filter((r) => r.notes.recite.inMaterial).length, (s) => s === R.stats.total],
    ['正控 · B 档（有真实误解信息增量）条数', R.stats.tierB, (s) => s === 0],
    [`负控 · 六章人工判据被误判成机械转述的条数（${H.stats.total} 条）`, H.stats.mech, (s) => s === 0],
    ['负控 · 六章人工判据信息增量不足的条数', H.stats.novelShort, (s) => s === 0],
    ['负控 · 六章人工判据被判成"照抄原文即满足"的条数', H.stats.recite, (s) => s === 0],
    ['负控 · 六章人工判据被判成互相重复的条数', H.stats.dup, (s) => s === 0],
    ['负控 · 六章人工判据被判成极性不一致的条数', H.stats.polarity, (s) => s === 0],
    [`负控 · 六章人工判据信息增量最小值（要求 ≥ ${MIN_NOVEL}）`, H.stats.novelMin, (s) => s >= MIN_NOVEL],
  ];
  console.log(`判据自检：正控跑在 ${ARTIFACT_REL}（${R.stats.total} 条）；负控跑在六章人工判据（${H.stats.total} 条）`);
  console.log(`  两组的信息增量（novelChars）实测：机械 ${R.stats.novelMin}–${R.stats.novelMax}（均值 ${R.stats.novelAvg}）｜人工 ${H.stats.novelMin}–${H.stats.novelMax}（均值 ${H.stats.novelAvg}）`);
  let fail = 0;
  for (const [name, got, want] of checks) {
    const ok = want(got);
    if (!ok) fail++;
    console.log(`  ${ok ? '✅' : '❌'} ${name}：${got}`);
  }
  console.log(fail ? `\n判据自检不通过：${fail} 条不达标——检测器本身有问题，先修检测器。`
    : '\n判据自检通过：正控 264 条机械转述全部咬住，负控 18 条人工判据一条没误杀。');
  process.exit(fail ? 1 : 0);
}

/* ── 正式复核 ── */
const { data, items, perUnit } = loadArtifactItems(ARTIFACT_REL);
const R = reviewCriteria(items, '批量费曼判据');
const H = reviewCriteria(loadHumanItems(), '六章人工判据（对照）');
const { stats, rows } = R;
const byUnitRows = new Map();
for (const r of rows) {
  if (!byUnitRows.has(r.unitId)) byUnitRows.set(r.unitId, []);
  byUnitRows.get(r.unitId).push(r);
}
const unitVerdicts = perUnit.map((u) => {
  const mine = byUnitRows.get(u.unitId) || [];
  const bad = mine.filter((r) => !r.tierC);
  return {
    unitId: u.unitId, conceptId: u.conceptId, card: u.card, checkCount: u.checkCount, status: u.status,
    superseded: u.superseded,
    tierA: mine.filter((r) => r.tierA).length, tierB: mine.filter((r) => r.tierB).length, tierC: mine.filter((r) => r.tierC).length,
    usableCriteria: mine.filter((r) => r.tierC).length,
    verdict: bad.length === 0 ? 'usable' : 'blocked',
    blockedBy: [...new Set(bad.flatMap((r) => r.flags))].slice(0, 4),
  };
});

const summary = {
  generatedAt: new Date().toISOString(),
  reviewer: 'scripts/review-batch-criteria.mjs（独立复算；不采信产物自述与 derivation.note）',
  file: ARTIFACT_REL,
  verdict: stats.verdict,
  rules: {
    perCriterion: [
      '① 出处可回溯：condition 逐字 = 图鉴卡同一条 boundaries[locator] · point = 前 12 字 · sha256 一致 · derivation.from 指向同一条',
      '② 机械反面转述：②a FLIP 表重算逐字相同 · ②b 整条否定（前缀＋原文）· ②c 误解句逐字含完整正确条件',
      `③ 误解信息增量 ≥ ${MIN_NOVEL} 字（novelChars：抠掉与 condition 的最长公共片段后的新增字符数）`,
      '④ 不得"照抄边界原文即满足"：condition 逐字在可见材料里且 required 全是它的连续子串',
      `⑤ 同单元判据不得重复（逐字撞或两两覆盖率 ≥ ${DUP_RATIO * 100}%）`,
      '⑥ 极性一致：同一出处 · 误解句不含完整正确条件 · 不得部分翻转（≥2 个否定短语只翻一个）',
    ],
  },
  thresholds: { MIN_NOVEL, DUP_RATIO, MIN_QUOTE },
  recomputed: {
    total: stats.total, units: stats.units,
    tierA_provenanceClean: stats.tierA,
    tierB_hasMisconceptionGain: stats.tierB,
    tierC_usableAsUnderstandingCheck: stats.tierC,
    mechanicalRestatement: stats.mech,
    mechanicalForms: { redriveFlip: stats.mechA, wholeDenial: stats.mechB, containsFullCondition: stats.mechC },
    insufficientGain: stats.novelShort,
    recitableFromBoundaries: stats.recite,
    duplicatedWithinUnit: stats.dup,
    unitsWithDuplicatedCriteria: stats.unitsWithDup,
    polarityInconsistent: stats.polarity,
    unitsWithPartialFlip: stats.unitsWithPartialFlip,
    provenanceFailures: stats.provenance,
    novelChars: { min: stats.novelMin, max: stats.novelMax, avg: stats.novelAvg, lcsRatioMax: stats.lcsRatioMax },
    humanControl: {
      total: H.stats.total, mechanicalRestatement: H.stats.mech, insufficientGain: H.stats.novelShort,
      recitable: H.stats.recite, duplicated: H.stats.dup, polarityInconsistent: H.stats.polarity,
      novelChars: { min: H.stats.novelMin, max: H.stats.novelMax, avg: H.stats.novelAvg, lcsRatioMax: H.stats.lcsRatioMax },
    },
    usableUnits: unitVerdicts.filter((u) => u.verdict === 'usable').length,
    blockedUnits: unitVerdicts.filter((u) => u.verdict !== 'usable').length,
  },
  examples: {
    mechanicalRedriveFlip: rows.filter((r) => r.metrics.mechForms.includes('②a')).slice(0, 5).map((r) => ({ id: r.id, novel: r.metrics.novel, flipped: r.metrics.flipped })),
    wholeDenial: rows.filter((r) => r.metrics.mechForms.includes('②b')).slice(0, 5).map((r) => ({ id: r.id, novel: r.metrics.novel })),
    partialFlip: rows.filter((r) => r.flags.some((f) => f.startsWith('⑥c'))).map((r) => ({ id: r.id, flag: r.flags.find((f) => f.startsWith('⑥c')) })),
    duplicated: rows.filter((r) => r.flags.some((f) => f.startsWith('⑤'))).map((r) => ({ id: r.id, flag: r.flags.find((f) => f.startsWith('⑤')) })),
    bestOfBatch: [...rows].sort((a, b) => b.metrics.novel - a.metrics.novel).slice(0, 5)
      .map((r) => ({ id: r.id, novel: r.metrics.novel, lcsRatio: r.metrics.lcsRatio })),
  },
  units: unitVerdicts,
};

if (WRITE) {
  fs.mkdirSync(path.join(ROOT, OUT_DIR_REL), { recursive: true });
  fs.writeFileSync(path.join(ROOT, OUT_REL), `${JSON.stringify(summary, null, 2)}\n`);
}

if (AS_JSON) console.log(JSON.stringify(summary, null, 2));
else {
  const X = summary.recomputed;
  console.log(`独立复核 ${ARTIFACT_REL}`);
  console.log(`产物自述的判据规则分布：${JSON.stringify((data.stats || {}).misconceptionRules || {})}`);
  console.log('— 出处与形态 —');
  console.log(`单元 ${X.units} · 判据 ${X.total}（每单元 ${[...new Set(perUnit.map((u) => u.checkCount))].sort().join('/')} 条）`);
  console.log(`① 出处干净：${X.tierA_provenanceClean} / ${X.total}（不符 ${X.provenanceFailures}）`);
  console.log(`② 机械反面转述：${X.mechanicalRestatement} / ${X.total}`
    + `（②a 翻转重算 ${X.mechanicalForms.redriveFlip} · ②b 整条否定 ${X.mechanicalForms.wholeDenial} · ②c 误解句含完整正确条件 ${X.mechanicalForms.containsFullCondition}）`);
  console.log(`③ 误解信息增量不足（< ${MIN_NOVEL} 字）：${X.insufficientGain} / ${X.total}`
    + `（实测新增 ${X.novelChars.min}–${X.novelChars.max} 字，均值 ${X.novelChars.avg}；与条件覆盖率最高 ${X.novelChars.lcsRatioMax}）`);
  console.log(`④ 照抄这条边界原文即可满足：${X.recitableFromBoundaries} / ${X.total}`);
  console.log(`⑤ 同单元判据互相重复：${X.duplicatedWithinUnit} 条（涉及 ${X.unitsWithDuplicatedCriteria} 个单元）`);
  console.log(`⑥ 极性不一致：${X.polarityInconsistent} 条（其中部分翻转 ${X.unitsWithPartialFlip} 个单元）`);
  console.log('— 负控：六章 18 条人工判据（同一套检测器）—');
  const HC = X.humanControl;
  console.log(`   ② 机械反面转述 ${HC.mechanicalRestatement} · ③ 增量不足 ${HC.insufficientGain} · ④ 照抄即满足 ${HC.recitable}`
    + ` · ⑤ 重复 ${HC.duplicated} · ⑥ 极性 ${HC.polarityInconsistent}`);
  console.log(`   人工判据信息增量 ${HC.novelChars.min}–${HC.novelChars.max} 字（均值 ${HC.novelChars.avg}）——与机械转述的 ${X.novelChars.min}–${X.novelChars.max} 字不重叠`);
  console.log('— 复核结论（三档口径）—');
  console.log(`A 出处干净：${X.tierA_provenanceClean} / ${X.total}`);
  console.log(`B 再加"有真实误解信息增量"：${X.tierB_hasMisconceptionGain} / ${X.total}`);
  console.log(`C 可当理解判据（再加 ④⑤⑥ 未命中）：${X.tierC_usableAsUnderstandingCheck} / ${X.total}`);
  console.log(`可用单元 ${X.usableUnits} / ${X.units} · verdict=${summary.verdict}`);
  if (summary.examples.partialFlip.length) console.log(`\n[⑥c 部分翻转] ${summary.examples.partialFlip.length} 例\n  ${summary.examples.partialFlip.slice(0, 6).map((x) => `${x.id}：${x.flag}`).join('\n  ')}`);
  if (summary.examples.duplicated.length) console.log(`\n[⑤ 同单元重复] ${summary.examples.duplicated.length} 例\n  ${summary.examples.duplicated.slice(0, 6).map((x) => `${x.id}：${x.flag}`).join('\n  ')}`);
  console.log(`\n[批量里信息增量最大的 5 条（仍是机械转述）] ${summary.examples.bestOfBatch.map((x) => `${x.id}(+${x.novel}字/覆盖${x.lcsRatio})`).join(' · ')}`);
}

if (WRITE) console.log(`\n已写出 ${OUT_REL}`);
process.exit(summary.verdict === 'usable' ? 0 : 1);
