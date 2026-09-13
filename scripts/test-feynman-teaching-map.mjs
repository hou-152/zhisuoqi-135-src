#!/usr/bin/env node
// 证明：不同理解缺口 → 不同教学动作（确定性，不调模型、不联网）。
//
// 用法：node scripts/test-feynman-teaching-map.mjs
//
// 覆盖：① 映射表本身合法（每条判据都有误解／教学动作／材料，材料指针能解析、引文逐字存在）
//       ② 4 组固定学习者答案 → 4 组不同的缺口签名 → 4 组不同的教学动作
//       ③ 动作与缺口一一对应（同一缺口永远同一个动作；不同缺口动作不同）
//       ④ 全说对的答案不倒回；只错一处只倒回一处
//       ⑤ 确定性（同一输入两次跑结果一致）＋ 不调用知乎／不调模型

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { checkMap, diagnose, plan, loadMap, statusesToGaps } from './map-feynman-gaps.mjs';

const failures = [];
const oks = [];
const check = (label, cond, detail = '') => { (cond ? oks : failures).push(label + (detail ? `（${detail}）` : '')); return cond; };

const ROOT2 = path.resolve(import.meta.dirname, '..');
const { map, source } = loadMap('agent-skills-api');
const criteria = map.criteria;
const sig = (x) => JSON.stringify(x);

/* ① 映射表合法 */
const chk = checkMap(map, source);
check('映射表校验通过（材料指针可解析、引文逐字）', chk.ok, chk.fails.join(' / '));
check('判据数 ≥ 3', criteria.length >= 3, `${criteria.length} 条`);
check('每条判据的判据原文逐字来自源资产', criteria.every((c) => {
  const all = JSON.stringify(source);
  return c.criterionQuote && all.includes(c.criterionQuote);
}));
check('每条判据都有误解（≥8 字）与教学动作（≥8 字）', criteria.every((c) => (c.misconception || '').length >= 8 && (c.teachingAction || '').length >= 8));
check('教学动作不是「再讲一遍」占位', criteria.every((c) => !/^(再讲一遍|重新讲一遍|再看看)/.test(c.teachingAction)));
check('每条判据都有 ≥1 条材料指针', criteria.every((c) => (c.material || []).length >= 1));
check('材料类型覆盖 reading／decision／experiment', new Set(criteria.flatMap((c) => c.material.map((m) => m.kind))).size >= 3);
check('判据之间互不重复', new Set(criteria.map((c) => c.criterion)).size === criteria.length);
check('误解之间互不重复', new Set(criteria.map((c) => c.misconception)).size === criteria.length);
check('教学动作之间互不重复', new Set(criteria.map((c) => c.teachingAction)).size === criteria.length);

/* ② 4 组固定答案：缺口签名与动作都要不同 */
const answers = map.fixedAnswers || [];
check('固定答案恰好 4 组', answers.length === 4, `${answers.length} 组`);
const rows = answers.map((a) => {
  const d = diagnose(a.text, criteria);
  const p = plan(d.missing, criteria);
  return { id: a.id, expect: a.expectMissing, missing: d.missing, covered: d.covered, plan: p };
});
for (const [i, r] of rows.entries()) {
  check(`第 ${i + 1} 组 ${r.id}｜漏点与预期一致`, sig(r.missing) === sig(r.expect), `实得 ${r.missing.join(',') || '无'}／预期 ${r.expect.join(',') || '无'}`);
}
check('4 组缺口签名两两不同', new Set(rows.map((r) => sig(r.missing))).size === 4, rows.map((r) => r.missing.length).join('/'));
check('4 组教学动作清单两两不同', new Set(rows.map((r) => sig(r.plan.map((p) => p.id + ':' + p.teachingAction)))).size === 4);
check('缺口越多动作越多（4/3/2/0 单调）', sig(rows.map((r) => r.plan.length)) === sig([4, 3, 2, 0]), rows.map((r) => r.plan.length).join('/'));
check('全说对的那组不倒回', rows[3].plan.length === 0 && rows[3].missing.length === 0);
check('只错脚本与边界的那组只倒回两条', sig(rows[2].plan.map((p) => p.id)) === sig(['C3', 'C4']));

/* ③ 动作与缺口一一对应 */
for (const c of criteria) {
  const once = plan([c.id], criteria);
  const twice = plan([c.id, c.id], criteria);
  check(`${c.id}｜单独漏这一条 → 恰好一个动作`, once.length === 1 && once[0].id === c.id);
  check(`${c.id}｜重复输入不改变动作内容`, sig(twice.map((x) => x.teachingAction)) === sig([once[0].teachingAction, once[0].teachingAction]));
  check(`${c.id}｜动作带材料且引文逐字存在`, once[0].material.length >= 1 && once[0].material.every((m) => JSON.stringify(source).includes(m.quote)));
  check(`${c.id}｜动作里点明了误解`, (once[0].misconception || '').length >= 8);
}

/* ④ 确定性 + 无外部调用 */
const a = sig(rows.map((r) => ({ m: r.missing, p: r.plan.map((x) => x.teachingAction) })));
const again = (map.fixedAnswers || []).map((x) => { const d = diagnose(x.text, criteria); return { m: d.missing, p: plan(d.missing, criteria).map((y) => y.teachingAction) }; });
check('同一输入两次跑结果一致（确定性）', sig(again) === a);
check('本脚本不联网、不调模型（纯函数）', !/fetch\(|require\('http|from 'http/.test(String(diagnose)) && !/api\/llm/.test(String(plan)));

/* ⑤ 边界：空答案 / 无关答案 → 全部判据都算漏 */
const empty = diagnose('', criteria);
check('空复述 → 4 条全漏', empty.missing.length === criteria.length);
const off = diagnose('我觉得这个功能挺好用的，界面也漂亮。', criteria);
check('完全无关的复述 → 也全部算漏（不会误判为说到）', off.missing.length === criteria.length);
const wrongId = plan(['C99'], criteria);
check('给不存在的判据编号 → 明确报错，不当成通过', wrongId.length === 1 && !!wrongId[0].error);


/* ⑥ Issue 2 · A 层：四判据 16 种缺口组合（预期独立写明，不由被测函数生成） */
const SUBSETS = [
  [], ['C1'], ['C2'], ['C3'], ['C4'],
  ['C1', 'C2'], ['C1', 'C3'], ['C1', 'C4'], ['C2', 'C3'], ['C2', 'C4'], ['C3', 'C4'],
  ['C1', 'C2', 'C3'], ['C1', 'C2', 'C4'], ['C1', 'C3', 'C4'], ['C2', 'C3', 'C4'],
  ['C1', 'C2', 'C3', 'C4'],
];
check('16 种组合齐全且互不重复', SUBSETS.length === 16 && new Set(SUBSETS.map((s) => s.join('+'))).size === 16);
for (const s of SUBSETS) {
  const tag = s.join('+') || '（无缺口）';
  const p = plan(s, criteria);
  check(`组合 ${tag}｜动作数量＝缺口数量`, p.length === s.length, `${p.length}/${s.length}`);
  check(`组合 ${tag}｜动作与缺口一一对应且保序`, sig(p.map((x) => x.id)) === sig(s));
  check(`组合 ${tag}｜每个动作都带材料与误解`, p.every((x) => x.material.length >= 1 && (x.misconception || '').length >= 8));
}
const onlyC2 = plan(['C2'], criteria)[0], onlyC3 = plan(['C3'], criteria)[0];
check('只缺 C2 与只缺 C3：动作不同', onlyC2.teachingAction !== onlyC3.teachingAction);
check('只缺 C2 与只缺 C3：材料不同', sig(onlyC2.material.map((m) => m.ref)) !== sig(onlyC3.material.map((m) => m.ref)));
check('只缺 C2 回指占用测量实验', onlyC2.material.some((m) => m.ref === 'experiments[3]'));
check('只缺 C3 回指脚本/输出实验', onlyC3.material.some((m) => m.ref === 'experiments[2]'));
check('判据绑定单元与判据版本', criteria.every((c) => c.unit === map.unit.slug && c.criteriaVersion === map.criteriaVersion));
check('材料带源文件与版本（sha256）', criteria.every((c) => c.material.every((m) => m.sourceFile === map.unit.sourceFile && m.sourceSha256 === map.unit.sourceSha256)));
check('C2 不再把示例 token 数当固定规律', /不背示例数字|自己测出的量级/.test(criteria.find((c) => c.id === 'C2').criterion));
check('C3 区分执行脚本与读源码，不用绝对表述', /执行脚本/.test(criteria.find((c) => c.id === 'C3').criterion) && /读取时才占用|读多少占多少/.test(criteria.find((c) => c.id === 'C3').teachingAction));
check('与源材料冲突处单列修订（不静默改原文）', Array.isArray(map.contentRevisionNotes) && map.contentRevisionNotes.length >= 2);
check('源材料 sha256 与映射登记一致', crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT2, map.unit.sourceFile))).digest('hex') === map.unit.sourceSha256);

/* ⑦ 状态 → 缺口：只有 met 算说到；未判定不得被当成通过 */
const st = (o) => criteria.map((c) => ({ id: c.id, status: o[c.id] || 'met' }));
check('四项全 met → 无缺口', statusesToGaps(st({}), criteria).missing.length === 0);
check('partial 也算缺口', statusesToGaps(st({ C2: 'partial' }), criteria).missing.join() === 'C2');
check('contradicted 也算缺口', statusesToGaps(st({ C3: 'contradicted' }), criteria).missing.join() === 'C3');
check('uncertain 也算缺口（不当通过）', statusesToGaps(st({ C4: 'uncertain' }), criteria).missing.join() === 'C4');
check('解析失败 → 未判定，不是空缺口', statusesToGaps(null, criteria, false).notJudged === true);
check('判据不全 → 未判定', statusesToGaps([{ id: 'C1', status: 'met' }], criteria).notJudged === true);
check('未知判据 ID 被忽略后仍判未判定', statusesToGaps([...st({}), { id: 'C99', status: 'met' }], criteria).notJudged === true);

console.log(`费曼教学映射验收：${oks.length} 项通过${failures.length ? `，${failures.length} 项失败` : ''}`);
if (failures.length) { for (const f of failures) console.log('  ⚠ ' + f); process.exit(1); }
console.log(`  · 概念：${map.concept}（${criteria.length} 条判据 · 源 ${map.source}）`);
console.log('  · 4 组固定答案 → 漏点 ' + rows.map((r) => r.missing.length).join('/') + ' 条 → 教学动作 ' + rows.map((r) => r.plan.length).join('/') + ' 个');
for (const r of rows) console.log(`    ${r.id}：漏 ${r.missing.join(',') || '无'} → ${r.plan.map((p) => p.id).join(',') || '不倒回'}`);
console.log('✅ 不同理解缺口 → 不同教学动作，已证明');
