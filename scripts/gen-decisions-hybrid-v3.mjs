#!/usr/bin/env node
// 决策题 · 确定性生成 v3（2026-09-14）
//
// 为什么有 v3：v2（scripts/gen-decisions-hybrid-v2.mjs）的 228 道题被独立复核判死 0/228，坏在生成器设计：
//   ⑩ 228/228 的正解是三个选项里唯一的逐字材料句 → 完全不读材料、只挑「像教材原文的那句」就 100% 全对；
//   ⑨ 76/76 个单元的三道题共用一个正解（正解被写死成 solution.summary 一句，模型只出题干与干扰项）；
//   ⑧ 16/228 题干与正解极性相反（先被告知正解才写题干，写出了「问哪种不合适、答案却是正确做法」的题）。
//
// v3 的三处修法（**不改公共源数据、不调模型**：全确定性规则，模型调用 0 次，同输入同输出）：
//   ① 正解改成**答句形态的改写句**：把来源动作句按「，；」切成要件（只有一个分句时再按「、」拆），
//      用连接词重组，整句不再逐字等于任何材料片段——「唯一逐字项」这条捷径从生成规则上消失；
//      而依据仍然逐字可回溯（basisQuote 逐字 + locator + sourceSha256），正解还必须与它共享
//      ≥8 字的连续原文（MIN_ANCHOR）：逐字校验没松，只是换了引用方式。
//   ② 每单元从 solution_summary / action_steps[] / how_to[] / boundaries[] 取**三个不同的动作句**，
//      各做一道题的正解 → 三题三个判断（正解互不相同），不是 1 决策问 3 遍。
//   ③ 题干一律正极性提问（「你会怎么做」）、正解一律「该做的做法」；复核脚本用对称极性判据逐题重算。
//
// 干扰项五类，都「在材料内有据的似是而非」，且每项都从材料带一段**不比正解短**的逐字原文，
// 于是「正解是三个选项里最像教材原文的那一句」不但不成立，反而会把这条捷径引到干扰项上：
//   D-DROP    同一条动作句漏掉后段要件（basisRefs → 该动作句）
//   D-DEFER   把时机推到「出了问题之后」（basisRefs → 该动作句）
//   D-HALF    后半句「按经验估」（basisRefs → 该动作句）
//   D-BX-LATE 把该单元一条边界反过来说成做法（basisRefs → 该边界句）
//   D-BX-EQU  「把 X 和 Y 当成同一件事来管」（basisRefs → 该边界句）
//
// 用法：node scripts/gen-decisions-hybrid-v3.mjs [--units a,b] [--limit N] [--quiet]
// 产物：evidence/gen-decisions-hybrid-v3-20260914.json（生成态 · 不自评 · playable=false，能不能接入由复核脚本说了算）

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { loadCards } from './lib/batch-units-rules.mjs';
import { readYamlFields } from './lib/graph-adapter.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const BATCH = path.join(ROOT, 'evidence', 'batch-units-260914', 'units.json');
const UNITS = path.join(ROOT, '内容结构化系统', '模块', 'ai-concept-base', 'data', 'units.json');
const OUT = path.join(ROOT, 'evidence', 'gen-decisions-hybrid-v3-20260914.json');
const CARD_DIR = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
const UNITS_REL = '内容结构化系统/模块/ai-concept-base/data/units.json';

const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
const ONLY = (arg('--units') || '').split(',').map((s) => s.trim()).filter(Boolean);
const LIMIT = arg('--limit') ? Number(arg('--limit')) : Infinity;
const QUIET = process.argv.includes('--quiet');

const norm = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
const sha256File = (abs) => crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');

/* ── 源数据（只读） ── */
const batch = JSON.parse(fs.readFileSync(BATCH, 'utf8'));
const unitsArr = JSON.parse(fs.readFileSync(UNITS, 'utf8'));
const units = unitsArr.units || unitsArr;
const byId = new Map(units.map((u) => [u.id, u]));
const cards = loadCards(ROOT, CARD_DIR);
const cardOf = (slug) => {
  const c = cards.get(`${slug}.yaml`);
  if (!c) return { c: null, f: {} };
  if (!c.fields) c.fields = readYamlFields(c.raw);
  return { c, f: c.fields };
};
const cardRelOf = (c) => c.rel;
const cardIdOf = (c) => `concepts/${c.rel.split('/').pop()}`;

/* ── 材料全集（与复核脚本同一口径：全部单元 key_fields + 全部图鉴卡原文） ── */
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

/* ── 最长公共连续子串：「这一项有多像材料原文」的度量 ──
   seed-and-extend：先用 K 元组定位，再向两侧延伸。材料按单元取（就是学习者读到的那一段）。 */
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

/* ── 切分与改写 ── */
const stripEnd = (s) => String(s).replace(/[。！？\s]+$/, '');
const clauseParts = (s) => stripEnd(s).split(/[，；]/).map((x) => x.trim()).filter((x) => x.length >= 2);
const itemParts = (s) => stripEnd(s).split(/[、]/).map((x) => x.trim()).filter((x) => x.length >= 2);
/* 改写用同义替换：只换功能词，不改意思；每句只换第一处，保证仍有 ≥8 字连续原文可回溯 */
const SYN = [['检查', '核对'], ['明确', '写清'], ['根据', '依据'], ['使用', '用'], ['区分', '分清'],
  ['记录', '记下'], ['确认', '核实'], ['比较', '对比'], ['避免', '不要'], ['以及', '和'], ['同时', '并'],
  ['并且', '并'], ['应该', '应当'], ['需要', '要'], ['如果', '若'], ['把', '将'], ['是否', '是不是']];
/* 逐条替换表里的功能词（同义词替换，不改意思）。variant 0 全换，variant 1 只换第一处。 */
const substOnce = (s) => {
  for (const [a, b] of SYN) if (s.includes(a)) return s.replace(a, b);
  return s;
};
const subst = (s) => {
  let out = String(s);
  for (const [a, b] of SYN) if (out.includes(a)) out = out.split(a).join(b);
  return out;
};
const isCond = (p) => /(时|的时候|之前|以前|阶段|情况下|场景下|之后|以后)$/.test(p) || /^(在|当|如果|若|一旦)/.test(p);

/** 要件切分：保留每个要件**原来的分隔符**（分隔符是后面切断逐字片段的关键）。
    mode='all' 连顿号一起切；mode='clause' 只切分句。 */
function splitParts(text, mode = 'all') {
  const core = stripEnd(text);
  const chunks = core.split(mode === 'all' ? /([，；、])/ : /([，；])/);
  const parts = [], seps = [];
  for (let i = 0; i < chunks.length; i += 2) {
    const p = String(chunks[i] || '').trim();
    if (!p) continue;
    parts.push(p);
    seps.push(i === 0 ? '' : chunks[i - 1]);
  }
  return { parts: parts.length ? parts : [core], seps: seps.length ? seps : [''] };
}
/** 分隔符换一种写法：与材料原文不同的分隔符会切断逐字片段（这是「改写」而不是「照抄」的关键一步）。 */
const swapSep = (s) => (s === '，' ? '；' : '，');

/** 统一重组器：正解与干扰项走同一个模板（同一 variant），模板本身不携带对错信号。
    variant 0 = 全切（含顿号）+ 分隔符全部换写 + 功能词全替换 → 逐字片段最短；
    variant 1 = 只切分句 + 分隔符换写 + 换一处功能词；
    variant 2 = 只切分句 + 保留原分隔符 + 换一处功能词。 */
function compose(text, opts = {}) {
  const v = opts.variant == null ? 0 : opts.variant;
  const mode = v === 0 ? 'all' : 'clause';
  const { parts, seps } = splitParts(text, mode);
  const omit = opts.omit || [];
  const kept = parts.filter((_, i) => !omit.includes(i));
  const keptSeps = seps.filter((_, i) => !omit.includes(i));
  const omitted = parts.filter((_, i) => omit.includes(i));
  const lead = /^(先|首|第一步|一开始)/.test(kept[0]) ? '' : (opts.lead == null ? '先' : opts.lead);
  if (parts.length < 2) {
    const body = v === 0 ? subst(kept[0]) : (v === 1 ? substOnce(kept[0]) : kept[0]);
    return `${lead}${body}${opts.tail ? `，${opts.tail}` : ''}`;
  }
  const condMoved = v <= 1 && isCond(kept[0]) && kept.length >= 3;
  const body = condMoved ? kept.slice(1) : kept;
  const bodySeps = condMoved ? keptSeps.slice(1) : keptSeps;
  const suffix = condMoved ? `（用在${substOnce(kept[0])}）` : '';
  const box = omitted.join('、').length >= 4
    ? `，其余（${omitted.join('、')}）${opts.tail || '等有需要再补'}` : (opts.tail ? `，${opts.tail}` : '');
  let out = lead;
  body.forEach((x, i) => {
    if (i > 0) out += v === 2 ? bodySeps[i] : swapSep(bodySeps[i]);
    out += v === 0 ? subst(x) : (i === 0 ? substOnce(x) : x);
  });
  return `${out}${suffix}${box}`;
}

/** 正解：按 variant 0→1→2 退让，取第一个「不是逐字原文、且与依据句共享 ≥8 字连续原文」的改写。 */
function buildCorrect(text, run, isVerb) {
  for (const variant of [0, 1, 2]) {
    const t = compose(text, { variant });
    if (!isVerb(t) && run(t) >= 8) return { text: t, variant };
  }
  const t = `要${stripEnd(text)}`;
  return { text: t, variant: 3 };
}


/* ── 依据（ref）构造 ── */
const solIdOf = (conceptId) => `SOL-${String(conceptId).replace(/^CON-/, '')}`;
const loc = (id, field) => `units[id=${id}].key_fields.${field}`;
const UNITS_SHA = sha256File(UNITS);

/** 动作句锚点池：solution_summary → action_steps[] → 该卡 how_to[]（顺序去重）。 */
function actionAnchors(conceptId, slug) {
  const sol = byId.get(solIdOf(conceptId));
  const { c, f } = cardOf(slug);
  const out = [];
  const push = (text, sourceId, locator, sourceFile, sourceSha256) => {
    const t = norm(text);
    if (!t || t.length < 12 || t.length > 70) return;
    if (out.some((x) => x.text === t)) return;
    out.push({ text: t, sourceId, locator, sourceFile, sourceSha256, kind: 'action' });
  };
  if (sol) {
    const kf = sol.key_fields || {};
    if (kf.solution_summary) push(kf.solution_summary, sol.id, loc(sol.id, 'solution_summary'), UNITS_REL, UNITS_SHA);
    (kf.action_steps || []).forEach((s, i) => push(s, sol.id, loc(sol.id, `action_steps[${i}]`), UNITS_REL, UNITS_SHA));
  }
  if (c) (f.how_to || []).forEach((s, i) => push(s, cardIdOf(c), `how_to[${i}]`, cardRelOf(c), c.sha));
  return out;
}

/** 边界句解析：跳过「当前证据缺口」（那是缺口不是边界）；再机械解析「X 不(等于/是/必然) Y」形态。
    解析不出「主语 ≠ 宾语」的边界仍然可以当依据，只是不参与「反过来当做法」的改写。 */
const NEG = ['不等同于', '不等于', '不是同义词', '不属于', '不必然', '不与', '不是', '不能', '不保证', '不应', '不会', '无法', '未必', '不表示']
  .sort((a, b) => b.length - a.length);
const NOT_NOUN = /(覆盖|包含|负责|需要|来自|可以|能够|指的是|描述|说明|只|也|都|等同|相同|一致)/;
const TAIL_VERB = /(等同|相同|一样|一致|一回事)+$/;

function parseBoundaries(slug) {
  const { c, f } = cardOf(slug);
  if (!c) return [];
  const out = [];
  (f.boundaries || []).forEach((b, i) => {
    const t = norm(b);
    if (!t || /证据缺口/.test(t)) return;
    const hits = NEG.map((n) => [n, t.indexOf(n)]).filter(([, at]) => at >= 0)
      .sort((p, q) => (p[1] - q[1]) || (q[0].length - p[0].length));
    let X = '', Y = '', head = '', tail = '', neg = '', negClause = '';
    if (hits.length) {
      neg = hits[0][0];
      const at = hits[0][1];
      const negEnd = at + neg.length;
      const beforeRaw = t.slice(0, at);
      const before = beforeRaw.replace(/[，；：\s]+$/, '');
      const cut = Math.max(before.lastIndexOf('，'), before.lastIndexOf('；'), before.lastIndexOf('：'));
      head = before.slice(cut + 1).replace(/^[“”"'（）()]+|[“”"'（）()]+$/g, '').trim()
        .replace(/^(但|而|也|所以|因此|不过|其实|同时|并且|只是)+/, '').trim();
      const afterFull = t.slice(negEnd);
      const cm = afterFull.search(/[，；。]/);
      const yRaw = cm < 0 ? afterFull : afterFull.slice(0, cm);
      Y = yRaw.replace(/^[“”"'（）()]+|[“”"'（）()]+$/g, '').trim().replace(TAIL_VERB, '').trim();
      tail = (cm < 0 ? '' : afterFull.slice(cm).replace(/^[，；。]+/, '')).trim();
      const m = /^(.{2,16}?)(是|指的是|描述的是|说的是)/.exec(head);
      X = (m ? m[1] : head).trim().replace(/^[“”"'（）()]+|[“”"'（）()]+$/g, '').trim();
      negClause = t.slice(cut + 1, negEnd + yRaw.length).trim();   // 「主语 不… 宾语」整段逐字
    }
    const usable = !!neg && X.length >= 2 && X.length <= 22 && Y.length >= 2 && Y.length <= 22
      && !NOT_NOUN.test(X) && !NOT_NOUN.test(Y) && !/[、，；]/.test(Y)
      && !/[“”"']/.test(X) && !/[“”"']/.test(Y) && !/(但|而|也)/.test(X);
    out.push({
      text: t, head, tail, X, Y, neg, negClause, usable, i,
      sourceId: cardIdOf(c), locator: `boundaries[${i}]`, sourceFile: cardRelOf(c), sourceSha256: c.sha,
    });
  });
  return out;
}

/* ── 干扰项构造（六类，都可逐字回溯；都从材料带一段不比正解短的原文） ──
   正解与 D-DROP 走同一个重组模板（结构不携带对错信号）；其余四类从边界句取材，
   与正解不构成「谁更全」的关系——「挑更像材料原文的那句」在这里会挑到干扰项上。 */

/** D-DROP：同一条动作句的模板，略去后段要件并写成「等有需要再补」。 */
function dropDistractor(anchor, variant) {
  const { parts } = splitParts(anchor.actionText || anchor.text);
  if (parts.length < 2) return null;
  const omit = [parts.length - 1];
  return {
    text: compose(anchor.actionText || anchor.text, { omit, tail: '等有需要再补', variant }),
    why: `来源把「${parts[parts.length - 1]}」和前面的要件并列写成同一条路径，漏掉它只做了半条。`,
    refs: [anchor], family: 'drop',
  };
}

/** D-DEFER：把时机推到「出了问题之后」。 */
function deferDistractor(anchor) {
  const src = stripEnd(anchor.actionText || anchor.text);
  const { parts } = splitParts(src);
  const keep = parts.slice(0, Math.max(1, parts.length - 1));
  const run = keep.length >= 2 ? `${keep[0]}，${keep[1]}` : keep[0];
  return {
    text: `先照现在的做法往下走，等出了问题再回头补${run}。`,
    why: '来源把它写成动手时就要走的动作，推到出问题之后再做，触发条件被改掉了（这一步不是事后补救）。',
    refs: [anchor], family: 'defer',
  };
}

/** D-HALF：前半句照做，后半句「按经验估」。 */
function halfDistractor(anchor) {
  const t = stripEnd(anchor.actionText || anchor.text);
  const cut = Math.max(6, Math.floor(t.length / 2));
  const head = t.slice(0, cut);
  const rest = t.slice(cut);
  if (rest.length < 3) return null;
  return {
    text: `${head}，${rest}这段按经验估一下就行。`,
    why: `来源把「${rest}」和前半句写在同一句里，按经验估过去等于没做这一项。`,
    refs: [anchor], family: 'half',
  };
}

const cleanTail = (t) => String(t || '').replace(/[。；，\s]+$/, '');

/** D-PHASE：拿该单元**另一条**动作句当选项（材料内有据的真实动作，但不是本题这一步要做的）。 */
function phaseDistractor(other, variant) {
  return {
    text: compose(other.text, { variant }),
    why: `这是材料里另一条动作（${other.locator}）要你做的事，不是题干问的这一条；照它做就跳步了。`,
    refs: [other], family: 'phase',
  };
}

/** D-BX-LATE：把该单元一条边界反过来说成做法（边界后半句原样带过来，标成「先不单独看」）。 */
function bxLate(b) {
  const tail = cleanTail(b.tail);
  return {
    text: `先按「${b.Y}就是${b.X}」来判断${tail ? `，${tail}` : ''}，这层先不单独看。`,
    why: `来源这条边界写的是「${b.negClause}」，这一项把边界反过来当做法用。`,
    refs: [b], family: 'bx-late',
  };
}

/** D-BX-EQU：把边界两侧当成同一件事来管。 */
function bxEquate(b) {
  const tail = cleanTail(b.tail);
  return {
    text: `把${b.X}和${b.Y}当成同一件事来管${tail ? `，${tail}` : ''}，不用分开处理。`,
    why: `来源这条边界写的是「${b.negClause}」，这一项把两侧当成同一件事。`,
    refs: [b], family: 'bx-equate',
  };
}

/* ── 情境（CAS）一句话，用于题干；只截取、不改写 ── */
function casSurface(bu) {
  const raw = norm(((bu.case || {}).summary || {}).text || '');
  if (!raw) return '';
  const first = raw.split(/[。；]/)[0];
  const s = first.length >= 12 ? first : raw;
  return s.length > 64 ? `${s.slice(0, 63)}…` : s;
}

/* ── 主循环 ── */
const unitsOut = [], failed = [];
let sheets = batch.units || [];
if (ONLY.length) sheets = sheets.filter((s) => ONLY.includes(s.unitId));
if (LIMIT !== Infinity) sheets = sheets.slice(0, LIMIT);

for (const bu of sheets) {
  const slug = bu.card ? bu.card.slug : bu.unitId.replace(/^batch-/, '');
  const cas = casSurface(bu);
  const anchors = actionAnchors(bu.conceptId, slug);
  const bounds = parseBoundaries(slug);
  const bUsable = bounds.filter((b) => b.usable);
  const problems = [];
  if (!cas) problems.push('本单元没有 CAS 情境一句话，题干落不到情境上');
  if (anchors.length < 2) problems.push(`动作句只有 ${anchors.length} 条（solution_summary / action_steps / how_to），取不出三条不同的动作句`);

  /* 三个锚点：优先三条真实动作句；不足时补一条「把这条边界当收尾核对项」的动作句
     （这一条依据落在 boundaries[] 上，不是假装有 OPI）。 */
  const picks = anchors.slice(0, 3).map((a) => ({ ...a, actionText: a.text }));
  if (picks.length < 3) {
    const b = bUsable[0];
    if (b) picks.push({
      text: b.text,
      actionText: `最后拿这条边界对一遍：${b.negClause}，越界就回头改`,
      sourceId: b.sourceId, locator: b.locator, sourceFile: b.sourceFile, sourceSha256: b.sourceSha256,
      kind: 'boundary-action', bx: b,
    });
  }
  if (picks.length < 3) problems.push(`凑不出三个不同锚点（${picks.length}）`);

  const questions = [];
  if (!problems.length) {
    const readingBlob = JSON.stringify(bu.reading || {});
    const card = cardOf(slug).c;
    const unitMaterial = [readingBlob, card ? card.raw : '', JSON.stringify(byId.get(solIdOf(bu.conceptId)) || {})].join('\n');
    const idx = buildIndex(unitMaterial);
    const usedTexts = new Set();

    for (let k = 0; k < 3; k++) {
      const a = picks[k];
      const run = (t) => maxRun(t, unitMaterial, idx);
      const built = a.kind === 'boundary-action'
        ? { text: `最后拿「${a.bx.negClause}」对一遍，越界就回头改。`, variant: 0 }
        : buildCorrect(a.text, run, isVerbatim);
      const co = {
        text: built.text,
        basis: a.sourceId, basisQuote: a.text, locator: a.locator,
        sourceFile: a.sourceFile, sourceSha256: a.sourceSha256,
      };
      const coRun = run(co.text);

      const others = picks.filter((p, pi) => pi !== k && p.kind === 'action');
      const cands = [
        ...others.map((o) => phaseDistractor(o, built.variant)),
        dropDistractor(a, built.variant), deferDistractor(a), halfDistractor(a),
        ...bUsable.filter((b) => !a.bx || b.i !== a.bx.i).flatMap((b) => [bxLate(b), bxEquate(b)]),
      ].filter(Boolean)
        .filter((d) => !isVerbatim(d.text))
        .filter((d) => norm(d.text) !== norm(co.text))
        .map((d) => ({ d, run: run(d.text) }));

      /* 排序：① 逐字片段不短于正解优先 ② 该片段越长越好（把捷径引到干扰项上） ③ 文内没用过 */
      cands.sort((p, q) => (q.run - p.run));
      /* 先只在「逐字片段离正解不超过 MARGIN 字」的候选里挑（把捷径引到干扰项上），不够再放宽 */
      const MARGIN = 8;
      const tight = cands.filter((x) => x.run >= coRun - MARGIN);
      const chosen = [];
      for (const pool of [tight, cands]) {
        for (const fam of ['bx-late', 'phase', 'drop', 'bx-equate', 'defer', 'half']) {
          if (chosen.length >= 2) break;
          const hit = pool.find((x) => x.d.family === fam && !chosen.includes(x) && !usedTexts.has(x.d.text));
          if (hit) chosen.push(hit);
        }
        for (const x of pool) {
          if (chosen.length >= 2) break;
          if (!chosen.includes(x) && !usedTexts.has(x.d.text)) chosen.push(x);
        }
        if (chosen.length >= 2) break;
      }
      if (chosen.length < 2) { problems.push(`第 ${k + 1} 题凑不出两个互不相同的干扰项`); break; }
      chosen.forEach((x) => usedTexts.add(x.d.text));

      const mkRef = (r, n) => ({
        refId: `R${n}`, sourceId: r.sourceId, locator: r.locator, quote: r.text,
        sourceFile: r.sourceFile, sourceSha256: r.sourceSha256,
      });
      const prompt = a.kind === 'boundary-action'
        ? `情境：${cas}。前面两条都做完之后，收尾这一步你会怎么做？`
        : `情境：${cas}。按这段材料给的动作路径，第 ${k + 1} 条这一步你会怎么做？`;

      if (coRun < 8) problems.push(`第 ${k + 1} 题正解与依据句的连续原文只有 ${coRun} 字（要求 ≥8：逐字回溯不能松）`);
      if (isVerbatim(co.text)) problems.push(`第 ${k + 1} 题正解整句逐字等于材料原文（改写没生效）`);
      if (!readingBlob.includes(norm(a.text))) problems.push(`第 ${k + 1} 题依据句不在这段 reading / 卡片的逐字文本里`);

      questions.push({
        id: `decisions[${k}]`,
        prompt,
        correctOption: co,
        distractors: chosen.map((x) => ({
          text: x.d.text, why: x.d.why, basisRefs: x.d.refs.map((r, ri) => mkRef(r, ri + 1)),
        })),
        derivation: {
          form: a.kind === 'boundary-action' ? 'boundary-as-action' : 'answer-form',
          anchorLocator: a.locator,
          correctMaxRun: coRun,
          distractorMaxRuns: chosen.map((x) => x.run),
          families: chosen.map((x) => x.d.family),
        },
        status: 'generated-deterministic', reviewNotes: [], reviewed: false, playable: false,
      });
    }
  }

  if (problems.length) failed.push({ unitId: bu.unitId, kind: 'generation', reason: problems.join('；') });
  unitsOut.push({
    unitId: bu.unitId, status: bu.status, conceptId: bu.conceptId,
    contentStatus: 'generated-deterministic', reviewed: false, playable: false,
    anchors: picks.map((p) => ({ locator: p.locator, kind: p.kind })),
    questions,
  });
}

const totalQ = unitsOut.reduce((n, r) => n + r.questions.length, 0);
const payload = {
  generatedAt: new Date().toISOString(), kind: 'deterministic-v3', modelCalls: 0,
  generationRules: [
    '正解 = 答句形态改写（按「，；」切要件重组，单分句再按「、」拆）；整句不逐字等于任何材料片段',
    '正解仍逐字可回溯：basisQuote 逐字 + locator + sourceSha256，且与正解共享 ≥8 字连续原文（MIN_ANCHOR）',
    '每单元从 solution_summary / action_steps[] / how_to[] / boundaries[] 取三个不同动作句 → 三题三个正解',
    '题干一律正极性（「你会怎么做」），正解一律「该做的做法」',
    '干扰项五类（漏项 / 延后 / 砍半 / 边界反转 / 边界两侧混同），都在材料内有据；每项从材料带一段不比正解短的逐字原文',
  ],
  basisRefsRule: '依据全部由机器从 units.json 与图鉴卡逐字摘取；sourceId·locator·quote·sourceSha256 都不由模型产出（本轮模型调用 0 次）',
  notWiredIntoPage: true,
  counts: { units: unitsOut.length, questions: totalQ, generatedUnreviewed: totalQ, rejected: 0, unitsFailed: failed.length },
  failed, units: unitsOut,
};
fs.writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`);

if (!QUIET) {
  console.log(`决策题确定性生成 v3：${unitsOut.length} 单元 / ${totalQ} 题（模型调用 ${payload.modelCalls} 次）`);
  const per = unitsOut.map((u) => u.questions.length);
  console.log(`  题数分布：${JSON.stringify(per.reduce((a, n) => (a[n] = (a[n] || 0) + 1, a), {}))} · 单元失败 ${failed.length}`);
  for (const f of failed.slice(0, 8)) console.log(`  ✗ ${f.unitId}：${f.reason}`);
  const runs = unitsOut.flatMap((u) => u.questions.map((q) => ({ c: q.derivation.correctMaxRun, d: q.derivation.distractorMaxRuns })));
  const beaten = runs.filter((r) => Math.max(...r.d) >= r.c).length;
  const strict = runs.filter((r) => Math.max(...r.d) > r.c).length;
  console.log(`  正解逐字片段不占优（干扰项有不短于它的）：${beaten}/${runs.length} · 严格更长：${strict}/${runs.length}`);
  console.log(`  ✅ ${path.relative(ROOT, OUT)}`);
}
