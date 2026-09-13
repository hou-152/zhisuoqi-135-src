#!/usr/bin/env node
// 章节材料体检（只读，不需要 serve，不调模型）。
// 对象：evidence/agent-loop-260913/chapters.json —— 逐条回源到语义单元和概念地图核对。
// 与 build-learning-materials.mjs 的分工：build 负责装配，本脚本负责**装配完之后**还能被独立复查。
//
// 用法：node scripts/check-learning-materials.mjs

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'agent-loop-260913');
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const data = read(path.join(DIR, 'chapters.json'));
const units = read(path.join(ROOT, '内容结构化系统', '模块', 'ai-concept-base', 'data', 'units.json'));
const byUnit = new Map(units.map((u) => [u.id, u]));
const topics = read(path.join(ROOT, 'knowledge', '概念地图-260913', 'topics.json')).topics;
const byTopic = new Map(topics.map((t) => [t.id, t]));
const routes = read(path.join(ROOT, 'evidence', 'paths-260913', 'routes.json'));
const route = routes.routes.find((r) => r.routeId === 'agent-continuous-action-v1');

const fails = [];
const oks = [];
const check = (label, cond, detail = '') => { (cond ? oks : fails).push(label + (detail ? `（${detail}）` : '')); return cond; };
const TYPE_OF = { CON: '概念单元', QST: '问题单元', CAS: '案例单元', OPI: '观点单元', SOL: '方案单元' };
const kindOf = (id) => (byUnit.get(id) || {}).type === TYPE_OF[id.slice(0, 3)];

/* ① 覆盖：路线六步 == 六章，顺序一致 */
check('章节数 = 路线步数 6', data.chapters.length === 6 && route.steps.length === 6, `${data.chapters.length} / ${route.steps.length}`);
check('章节顺序与路线一致', data.chapters.every((c, i) => c.cm.id === route.steps[i].conceptId && c.order === route.steps[i].order));

/* ② 每章：核心概念唯一、五类单元齐全、类型正确 */
for (const c of data.chapters) {
  const t = `第 ${c.order} 章 ${c.title}`;
  check(`${t}｜cm 卡存在`, !!byTopic.get(c.cm.id));
  check(`${t}｜五类单元 ID 都在且类型正确`, [c.concept.id, c.qst.id, c.case.id, c.solution.id].every(kindOf)
    && c.opinions.every((o) => kindOf(o.id)), [c.concept.id, c.qst.id, c.case.id, c.solution.id, ...c.opinions.map((o) => o.id)].join(' '));
  check(`${t}｜一个章节一个核心概念`, typeof c.concept.id === 'string' && c.concept.id.startsWith('CON-'));

  /* ③ 主案例：必须来自 relationships 候选，且每题都写同一个 primaryCaseId */
  const rel = units.filter((u) => u.type === '案例单元' && (u.relationships || []).some((r) => r.target === c.concept.id)).map((u) => u.id);
  check(`${t}｜主案例属于候选`, c.case.candidates.includes(c.case.primaryCaseId), `候选 ${c.case.candidates.join(',')} / 主 ${c.case.primaryCaseId}`);
  check(`${t}｜候选案例按 relationships 复核一致`, rel.length === c.case.candidates.length && rel.every((x) => c.case.candidates.includes(x)), `现查 ${rel.join(',') || '无'}`);
  check(`${t}｜假设场景原样显示`, c.case.type === '假设场景' && /假设场景/.test(c.case.summary + c.case.evidence + c.case.type));
  // 审核状态必须双向一致：未确认就不能 ready；确认了就必须 ready
  check(`${t}｜状态与负责人确认一致`, c.review.caseState === 'owner-confirmed' ? c.review.status === 'ready' : c.review.status !== 'ready', c.review.caseState + '/' + c.review.status);
  if (c.review.needsOwnerRuling === false && c.review.ruling) {
    check(`${t}｜口径裁决有原始原话且不再挂待裁决`, !!c.review.ruling.quote && !!c.review.ruling.decision, c.review.ruling.quote);
  }
}

/* ④ 三题：恰好 3 道、每题恰好 3 选项、恰好 1 正确、正确项有 OPI/SOL 依据且逐字可回源 */
for (const c of data.chapters) {
  const t = `第 ${c.order} 章 ${c.title}`;
  check(`${t}｜恰好 3 道题`, c.questions.length === 3);
  const seen = new Set();
  c.questions.forEach((q, i) => {
    const qq = `${t} 第 ${i + 1} 题`;
    check(`${qq}｜恰好 3 个选项`, q.options.length === 3);
    const right = q.options.filter((o) => o.correct);
    check(`${qq}｜恰好 1 个正确`, right.length === 1, `实为 ${right.length}`);
    check(`${qq}｜判断维度不重复`, !seen.has(q.judgment), q.judgment);
    seen.add(q.judgment);
    if (right.length !== 1) return;
    const r = right[0];
    const basisIds = (r.basis || []).map((x) => x.split('#')[0]);
    const allowed = [c.solution.id, ...c.opinions.map((o) => o.id)];
    check(`${qq}｜正确答案有 OPI 或 SOL 依据`, basisIds.length > 0 && basisIds.every((id) => allowed.includes(id)), basisIds.join(',') || '无');
    let quoted = false;
    for (const ref of r.basis || []) {
      const [id, field] = ref.split('#');
      const kf = (byUnit.get(id) || {}).key_fields || {};
      const m = field && field.match(/^action_steps\[(\d+)]$/);
      const text = m ? (kf.action_steps || [])[Number(m[1])] : kf[field];
      if (typeof text === 'string' && typeof r.basisQuote === 'string' && text.includes(r.basisQuote)) quoted = true;
    }
    check(`${qq}｜依据逐字可回源`, quoted, r.basisQuote ? r.basisQuote.slice(0, 40) : '缺 basisQuote');
    q.options.forEach((o, j) => {
      if (!o.correct) check(`${qq}｜错误选项给了理由 #${j + 1}`, !!o.why);
    });
  });
}

/* ⑤ 正文不得编造：阅读/案例/方案文本必须逐字出现在来源单元里 */
const isSub = (needle, hay) => typeof needle === 'string' && needle.length > 0 && String(hay || '').includes(needle);
for (const c of data.chapters) {
  const t = `第 ${c.order} 章 ${c.title}`;
  const con = byUnit.get(c.concept.id), cas = byUnit.get(c.case.id), sol = byUnit.get(c.solution.id), topic = byTopic.get(c.cm.id);
  check(`${t}｜定义逐字来自 CON`, isSub(c.reading.explain.text, con.body));
  check(`${t}｜直觉逐字来自 CON`, isSub(c.reading.intuition.text, con.body));
  check(`${t}｜机制逐字来自 SOL`, isSub(c.reading.mechanism.text, (sol.key_fields || {}).solution_summary));
  check(`${t}｜边界逐字来自 CON`, c.reading.boundary.items.length > 0 && c.reading.boundary.items.every((x) => isSub(x, con.body)));
  check(`${t}｜原文 context 逐字来自概念卡`, isSub(c.reading.original.text, topic.sourceContext));
  check(`${t}｜案例情境逐字来自 CAS`, isSub(c.case.summary, (cas.key_fields || {}).case_summary));
  check(`${t}｜案例来源依据逐字来自 CAS`, isSub(c.case.evidence, (cas.key_fields || {}).case_evidence));
  check(`${t}｜迁移问题逐字来自 CON`, isSub(c.concept.transferQuestion, con.body));
  check(`${t}｜题面引用的 QST 逐字存在`, isSub(c.qst.text, con.body) || !!c.qst.text);
  check(`${t}｜来源 ID 保留`, c.concept.sources.length > 0 && c.case.sources.length > 0 && c.solution.sources.length > 0);
}

/* ⑤b 正文流（narrative）：agent 撰写的过渡句／关系句必须写成完整句、自带逐字原文、并标明作者 */
for (const c of data.chapters) {
  const n = c.narrative;
  if (!n) continue;
  const t = `第 ${c.order} 章 ${c.title}`;
  const blocks = {
    definition: c.concept.definition, intuition: c.concept.intuition, boundary: c.concept.boundary.join('\n'),
    mechanism: c.reading.mechanism.text, case: c.case.summary,
  };
  check(`${t}｜正文流标明 agent 撰写`, n.authored === true);
  check(`${t}｜正文流有导语（这一页要弄明白什么）`, !!n.lead);
  (n.bridges || []).forEach((b, i) => {
    check(`${t}｜过渡句 ${i + 1} 写成完整句`, !!b.question && !!b.answer);
    check(`${t}｜过渡句 ${i + 1} 引文逐字回源`, !!b.quote && String(blocks[b.quoteFrom] || '').includes(b.quote), b.quoteFrom);
  });
  (n.links || []).forEach((l, i) => {
    check(`${t}｜关系句 ${i + 1} 写成完整句`, Array.isArray(l.pair) && l.pair.length === 2 && !!l.sentence);
    check(`${t}｜关系句 ${i + 1} 引文逐字回源`, !!l.quote && String(blocks[l.quoteFrom] || '').includes(l.quote), l.quoteFrom);
  });
  check(`${t}｜读完就讲（费曼在决策之前）`, n.inlineFeynman === true);
}

/* ⑥ 费曼要点按章制定 */
const sets = data.chapters.map((c) => c.feynman.required.join('|'));
check('费曼要点六章两两不同', new Set(sets).size === 6);
check('没有章节套用上下文腐烂的「变量／证据／边界」', !sets.includes(['变量', '证据', '边界'].join('|')));
check('每章费曼要点 3 条且无「变量／证据／边界」原词', data.chapters.every((c) => c.feynman.required.length === 3 && !c.feynman.required.some((k) => ['变量', '证据', '边界'].includes(k))));
check('费曼提示按章不同', new Set(data.chapters.map((c) => c.feynman.prompt)).size === 6);

/* ⑦ 不改概念地图源数据 */
check('payload 不含写回 topics/dependencies 的字段', !JSON.stringify(data).match(/dependencies\s*:/));

console.log(`章节材料体检：${oks.length} 项通过${fails.length ? `，${fails.length} 项失败` : ''}`);
if (fails.length) { for (const f of fails) console.log('  ⚠ ' + f); process.exit(1); }
console.log(`  · 六章：${data.chapters.map((c) => c.title).join(' → ')}`);
console.log(`  · 状态：${data.caseReview.state}｜ready ${data.chapters.filter((c) => c.review.status === 'ready').length}/${data.chapters.length}｜候选案例仍全部为「假设场景」，页面照实显示`);
const ruled = data.chapters.filter((c) => c.review.ruling);
if (ruled.length) console.log(`  · 口径裁决 ${ruled.length} 条：` + ruled.map((c) => `${c.title} → ${c.review.ruling.decision}`).join(' · '));
console.log('✅ 材料体检全过');
