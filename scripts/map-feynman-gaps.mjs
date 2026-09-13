#!/usr/bin/env node
// 费曼漏点 → 教学动作 的确定性映射（不调用模型、不联网）。
//
// 输入：一份「判据 → 误解 → 教学动作 → 材料」映射（evidence/feynman-teaching-map/<slug>.json）
//       ＋ 学习者的复述原文。
// 输出：判定哪些判据没说到 → 每条漏点应该做什么教学动作、回到哪一条材料。
//
// 分工（三份证据不许混）：
//   ① 本脚本：确定性诊断（关键词分组命中）＋ 动作展开，可重复、可断言；
//   ② scripts/test-feynman-teaching-map.mjs：4 组固定学习者答案的证明；
//   ③ 真模型判定仍走 /api/llm 的 covered/missing 协议——本脚本只消费 missing，不冒充理解力判定。
//
// 用法：
//   node scripts/map-feynman-gaps.mjs --check                    # 校验映射表（材料指针 + 逐字引文）
//   node scripts/map-feynman-gaps.mjs --answers                  # 跑 4 组固定答案，打印诊断与动作
//   node scripts/map-feynman-gaps.mjs --diagnose "学习者的复述…"   # 诊断一段自由复述
//   node scripts/map-feynman-gaps.mjs --plan C2,C3               # 只按漏点编号展开教学动作

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAP_DIR = path.join(ROOT, 'evidence', 'feynman-teaching-map');

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

/* ── 取材料：把 ref 解析到源文件里的真实条目，并拼出可校验的文本 ── */
function resolveMaterial(source, ref) {
  const m = ref.match(/^([a-z]+)(?:\.([a-z]+))?\[(\d+)\]$/);
  if (!m) return { ok: false, why: `ref 形式不认：${ref}` };
  const [, top, sub, idxRaw] = m;
  const idx = Number(idxRaw);
  let node = source[top];
  if (node === undefined) return { ok: false, why: `${ref}：源文件没有 ${top}` };
  if (sub) node = node[sub];
  if (!Array.isArray(node)) return { ok: false, why: `${ref}：${sub || top} 不是数组` };
  const item = node[idx];
  if (item === undefined) return { ok: false, why: `${ref}：下标 ${idx} 越界（共 ${node.length} 条）` };
  const text = typeof item === 'string' ? item : Object.values(item).filter((v) => typeof v === 'string').join('\n');
  return { ok: true, item, text };
}

/* ── 校验映射表：判据齐全、材料可解析、引文逐字存在 ── */
export function checkMap(map, source) {
  const fails = [];
  const need = (cond, msg) => { if (!cond) fails.push(msg); };
  need(Array.isArray(map.criteria) && map.criteria.length > 0, '没有任何判据');
  const ids = new Set();
  for (const c of map.criteria || []) {
    const tag = c.id || '(缺 id)';
    need(!!c.id && !ids.has(c.id), `${tag}：id 缺失或重复`);
    ids.add(c.id);
    need(!!c.criterion, `${tag}：缺 criterion（判据）`);
    need(!!c.criterionQuote, `${tag}：缺 criterionQuote（判据必须逐字取自源资产）`);
    need(!!c.misconception && c.misconception.length >= 8, `${tag}：缺 misconception（误解）`);
    need(!!c.teachingAction && c.teachingAction.length >= 8, `${tag}：缺 teachingAction（教学动作）`);
    need(!/^(再讲一遍|重新讲一遍|再看看)/.test(c.teachingAction || ''), `${tag}：教学动作不能只是「再讲一遍」`);
    need(Array.isArray(c.material) && c.material.length > 0, `${tag}：缺 material（回到哪条材料）`);
    for (const mt of c.material || []) {
      const r = resolveMaterial(source, mt.ref || '');
      need(r.ok, `${tag}：${r.why || '材料指针无效'}`);
      need(!!mt.quote, `${tag}：材料 ${mt.ref} 缺 quote`);
      if (r.ok && mt.quote) need(r.text.includes(mt.quote), `${tag}：材料 ${mt.ref} 的 quote 不是逐字原文`);
      need(!!mt.label, `${tag}：材料 ${mt.ref} 缺 label`);
    }
  }
  return { ok: fails.length === 0, fails };
}

/* ── 诊断：判据的每个关键词分组都命中，才算这条判据被说到 ── */
export function diagnose(answer, criteria) {
  const text = String(answer || '');
  const hit = (groups) => groups.every((g) => g.some((k) => text.includes(k)));
  const covered = criteria.filter((c) => hit(c.keywords || [])).map((c) => c.id);
  const missing = criteria.filter((c) => !covered.includes(c.id)).map((c) => c.id);
  return { covered, missing };
}

/* ── 展开：每条漏点 → 一个教学动作（含误解与材料指针） ── */
export function plan(missing, criteria) {
  return missing.map((id) => {
    const c = criteria.find((x) => x.id === id);
    if (!c) return { id, error: '判据不存在' };
    const st = (arguments[2] && arguments[2][c.id]) || 'missing';
    if (st === 'uncertain') {
      return { id: c.id, status: 'uncertain', criterion: c.criterion, clarify: CLARIFY_ACTION, misconception: '', teachingAction: CLARIFY_ACTION.action, material: [] };
    }
    return {
      id: c.id,
      status: st,
      criterion: c.criterion,
      misconception: c.misconception,
      teachingAction: c.teachingAction,
      material: (c.material || []).map((m) => ({ kind: m.kind, ref: m.ref, label: m.label, quote: m.quote })),
    };
  });
}

/* ── 载入一篇映射（含它的源五维资产） ── */
export function loadMap(slug = 'agent-skills-api') {
  const map = readJson(path.join(MAP_DIR, `${slug}.json`));
  const source = readJson(path.join(ROOT, map.source));
  return { map, source };
}

const signature = (x) => JSON.stringify(x);

/* ── CLI ── */
const argv = process.argv.slice(2);
const arg = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
const has = (k) => argv.includes(k);

if (import.meta.filename === process.argv[1] || process.argv[1]?.endsWith('map-feynman-gaps.mjs')) {
  const slug = arg('--slug') || 'agent-skills-api';
  const { map, source } = loadMap(slug);
  const chk = checkMap(map, source);
  console.log(`映射：${map.concept}（${map.criteria.length} 条判据，源 ${map.source}）`);

  if (has('--check') || argv.length === 0) {
    console.log(chk.ok ? '✅ 映射表校验通过（判据／误解／教学动作／材料指针／逐字引文）' : `❌ 校验失败 ${chk.fails.length} 条`);
    for (const f of chk.fails) console.log('  · ' + f);
    process.exit(chk.ok ? 0 : 1);
  }

  if (has('--answers')) {
    for (const a of map.fixedAnswers || []) {
      const d = diagnose(a.text, map.criteria);
      const p = plan(d.missing, map.criteria);
      console.log(`\n【${a.id}】${a.kind}`);
      console.log(`  复述：${a.text}`);
      console.log(`  说到：${d.covered.join('、') || '无'}｜漏点：${d.missing.join('、') || '无'}`);
      for (const x of p) console.log(`  → ${x.id} ${x.criterion}\n     误解：${x.misconception}\n     教学动作：${x.teachingAction}\n     回到：${x.material.map((m) => `${m.label}（${m.ref}）`).join(' · ')}`);
      if (!p.length) console.log('  → 无需倒回：可以进入下一段材料。');
    }
    process.exit(0);
  }

  if (has('--diagnose')) {
    const d = diagnose(arg('--diagnose'), map.criteria);
    console.log(`说到：${d.covered.join('、') || '无'}｜漏点：${d.missing.join('、') || '无'}`);
    for (const x of plan(d.missing, map.criteria)) console.log(`  → ${x.id}：${x.teachingAction}｜回到 ${x.material.map((m) => m.label).join(' · ')}`);
    process.exit(0);
  }

  if (has('--plan')) {
    for (const x of plan(String(arg('--plan') || '').split(',').filter(Boolean), map.criteria)) {
      console.log(`→ ${x.id}｜${x.teachingAction}`);
      for (const m of x.material) console.log(`   材料：${m.label}｜${m.ref}｜原文：${m.quote}`);
    }
    process.exit(0);
  }
}

/* ── 逐判据状态 → 缺口（Issue 2）：只有 met 算说到；partial/missing/contradicted/uncertain 全部记为缺口；整份不可解析 → notJudged ── */
export const CLARIFY_ACTION = {
  kind: 'clarify',
  label: '先澄清，不纠错',
  action: '你这句话我还判断不了你指的是哪一层。先补一句：你说的是「资源存在技能目录里」，还是「这份资源的正文已经被读进上下文」？',
};

export function statusesToGaps(rows, criteria, parseOk = true) {
  if (!parseOk || !Array.isArray(rows) || rows.length === 0) return { missing: [], notJudged: true };
  const known = new Set(criteria.map((c) => c.id));
  if (rows.some((r) => !r || !known.has(r.id))) return { missing: [], notJudged: true };   // 未知 ID → 未判定
  const seen = new Map(rows.map((r) => [r.id, String(r.status || 'uncertain')]));
  if (seen.size !== criteria.length) return { missing: [], notJudged: true };
  return { missing: criteria.filter((c) => seen.get(c.id) !== 'met').map((c) => c.id), notJudged: false };
}
export { signature };
