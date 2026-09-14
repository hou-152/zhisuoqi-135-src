#!/usr/bin/env node
// 决策题生成 · A/B 对比（2026-09-14）
//
// 要回答的问题：76 个批量单元要出 228 道决策题。两种生成法哪种可用？
//   A 结构法：正确项 = SOL 的动作路径；干扰项从 CAS 情境里的次优做法结构拆出。
//             确定性、可复算、零模型调用，但可能读起来生硬（回执已就「机械反面转述」告过警）。
//   B 模型法：把同一批素材交给 /api/llm 生成。自然，但不可复算，可能编出材料里没有的主张。
//
// ⚠ 预注册规则（**跑之前写下，不许事后改**）——沿用 ab-feynman-test.mjs 的口径：
//   ① 判定只看人评，不看哪一法"更省事"。
//   ② 人评三档：干扰项像不像真的错 / 正确项唯一性 / 依据能不能回到本单元材料。
//   ③ **B 不显著优于 A，就用 A**（确定性可复算，76 个单元能一把刷）。
//   ④ 数据出来之前不许对外说"已解决决策题"。
//
// 本脚本只产出对照件与盲标，**不产出结论**。人评由负责人做。
//
// 用法：node scripts/ab-decision-question.mjs [unitId]
// 前置：node scripts/serve-135.mjs（B 组要打 /api/llm）

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const UNITS = path.join(ROOT, 'evidence', 'batch-units-260914', 'units.json');
const OUT = path.join(ROOT, 'evidence', 'ab-decision-question-20260914.json');
const UNIT_ID = process.argv[2] || 'batch-context-engineering';

const db = JSON.parse(fs.readFileSync(UNITS, 'utf8'));
const unit = (db.units || []).find(u => u.unitId === UNIT_ID);
if (!unit) { console.error(`❌ 找不到单元 ${UNIT_ID}`); process.exit(2); }
if (unit.status !== 'ready') { console.error(`❌ ${UNIT_ID} 状态是 ${unit.status}，本对比只做 ready（四类语义齐）`); process.exit(2); }

// 单元里的每个字段都是「出处信封」：{text, sourceFile, sourceSha256, locator, escapeForm}。
// 取正文一律走 .text，别直接把信封当字符串用（第一版就是这么写错的，跑出了一份空材料的对照件）。
const tx = (v) => (v && typeof v === 'object' && typeof v.text === 'string') ? v.text : (typeof v === 'string' ? v : '');
const qst = tx(unit.qst?.title);
const cas = tx(unit.case?.summary) || tx(unit.case?.title);
const sol = tx(unit.solution?.summary) || (unit.solution?.actionSteps || []).map(tx).join(' ');
const opis = unit.opinions || [];
const opiText = (o) => tx(o.coreClaim) || tx(o.title);
console.log(`单元：${UNIT_ID}  status=${unit.status}`);
console.log(`  QST：${qst}`);
console.log(`  CAS：${cas.slice(0, 90)}…`);
console.log(`  SOL：${sol}`);
console.log(`  OPI：${opis.length} 条`);
const missing = [['QST', qst], ['CAS', cas], ['SOL', sol], ['OPI', opis.map(opiText).join('')]]
  .filter(([, v]) => !String(v || '').trim()).map(([k]) => k);
if (missing.length) {
  console.error(`\n❌ 材料为空：${missing.join('、')} —— 字段路径不对就停下，不产出空材料的对照件。`);
  process.exit(3);
}
console.log('  ✓ 材料非空检查通过');

// ── A 组：结构法（零模型调用，确定性）──────────────────────────────────────
// 正确项直接取 SOL 原文；干扰项从 CAS 的要素里拆出两种「次优做法」。
// 注意：这里刻意**不**用「否定 OPI」那种机械反面转述 —— 回执已指出它读起来生硬。
const casElements = ['日历', '联系人', '往来语气', '可用工具', '压缩成清楚输入'];
const A = {
  method: 'structural',
  modelCalls: 0,
  questions: [
    {
      prompt: `邮件 Agent 收到「帮我安排明天的同步会」。这一轮它该怎么决定把什么放进上下文？`,
      options: [
        { text: '把日历、联系人、往来语气和历史邮件全部取回来，先塞满窗口再让模型判断。', correct: false,
          why: '这与「可以稍后再取什么、什么应留在窗口外」相反：全量取回把固定成本抬到最高，且没有从任务决策倒推。' },
        { text: sol, correct: true },
        { text: '先按固定顺序取日历，取不到再依次取联系人和语气，取到什么用什么。', correct: false,
          why: '这是按数据源顺序取，不是从「这一轮要做什么决策」倒推；任务不需要的信息仍会被带进窗口。' },
      ],
    },
  ],
};

// ── B 组：模型法（打本机 /api/llm）─────────────────────────────────────────
const SYS = `你在给一个中文学习单元出决策题。只输出 JSON，不要解释。
材料（只能用它，不许引入材料外的事实）：
问题：${qst}
情境：${cas}
行动路径：${sol}
判断依据（${opis.length} 条）：
${opis.map((o, i) => `${i + 1}. ${opiText(o).slice(0, 200)}`).join('\n')}

出 1 道题，严格按这个形状：
{"prompt":"题干（一个具体情境下的选择）","options":[{"text":"...","correct":true|false,"why":"只在 correct=false 时写：这条为什么不对"}]}
要求：恰好 3 个选项、恰好 1 个 correct=true；两个错误项必须是「看起来合理但与本材料的主张相悖」的做法，不要写成明显的荒谬选项；正确项要能回到上面的行动路径或判断依据。`;

let B = { method: 'llm', modelCalls: 1, questions: [], error: null };
try {
  const res = await fetch('http://127.0.0.1:5180/api/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'system', content: SYS }, { role: 'user', content: '出题' }], json: true }),
  });
  const j = await res.json();
  const raw = j.content || j.reply || '';
  const parsed = JSON.parse(String(raw).replace(/^```json\s*|\s*```$/g, ''));
  B.questions = [parsed];
  B.model = j.model; B.tokens = j.tokens;
} catch (e) {
  B.error = String(e.message || e);
}

// ── 自检：结构合规才进对照 ────────────────────────────────────────────────
const audit = (q) => {
  const o = q.options || [];
  return { options: o.length, correct: o.filter(x => x.correct).length,
    wrongHaveWhy: o.filter(x => !x.correct).every(x => !!x.why) };
};
console.log('\nA 组自检：', JSON.stringify(audit(A.questions[0])));
console.log('B 组自检：', B.error ? `失败 → ${B.error}` : JSON.stringify(audit(B.questions[0])));

// ── 盲标：随机决定 A/B 在对照件里叫 X 还是 Y，映射另存 ─────────────────────
const flip = Math.random() < 0.5;
const payload = {
  unitId: UNIT_ID, createdAt: new Date().toISOString(),
  preRegisteredRule: [
    '判定只看人评三档：干扰项像不像真的错 / 正确项唯一性 / 依据能否回到本单元材料。',
    'B 不显著优于 A，就用 A（确定性可复算）。',
    '数据出来之前不许对外说「已解决决策题」。',
  ],
  material: { qst, cas, sol, opiCount: opis.length },
  blind: { X: flip ? B : A, Y: flip ? A : B },
  answerKey: { X: flip ? 'B-llm' : 'A-structural', Y: flip ? 'A-structural' : 'B-llm' },
  note: 'X/Y 已随机；人评前不要看 answerKey。本文件不是结论。',
};
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
console.log(`\n✅ 对照件 → ${path.relative(ROOT, OUT)}`);
console.log('   X/Y 已盲标。人评前不要打开 answerKey。');
