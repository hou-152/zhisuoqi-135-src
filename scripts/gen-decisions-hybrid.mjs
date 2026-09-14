#!/usr/bin/env node
// 决策题 · 混合生成（2026-09-14）
//
// 分工（负责人 2026-09-14 指示：不手写 456 个干扰项；一问一答，其余错误答案交 AI）：
//   正确项 = 机器逐字取 solution.summary.text（可回指 SOL 单元 ID + locator）
//   干扰项 = AI 生成（2 个 / 题）
//   校验   = 逐句材料回指检查 —— 这是负责人给 B 法开的启用条件，必须真跑
//
// 校验三关（任一不过则该题退回，不冒充成品）：
//   ① 结构：恰好 3 选项、恰好 1 个 correct、两个干扰项都有 why
//   ② 不照抄：干扰项不得与材料里的句子逐字相同（照抄陈述句正是上一版失败的原因）
//   ③ 不跑出材料：干扰项不得含材料中不存在的主张 —— 用「材料关键词覆盖率」做可复算的近似，
//      低于阈值即标记 needsReview（不静默通过）
//
// ⚠ 未过校验或未人工复核的题一律 contentStatus=generated-unreviewed · playable=false，**不接页面**。
//
// 用法：node scripts/gen-decisions-hybrid.mjs [--limit N] [--only-ready] [--dry]
// 前置：node scripts/serve-135.mjs

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const UNITS = path.join(ROOT, 'evidence', 'batch-units-260914', 'units.json');
const WS = path.join(ROOT, 'evidence', 'decision-worksheet-20260914.json');
const OUT = path.join(ROOT, 'evidence', 'gen-decisions-hybrid-20260914.json');

const li = process.argv.indexOf('--limit');
const LIMIT = li > -1 ? Number(process.argv[li + 1]) : Infinity;
const ONLY_READY = process.argv.includes('--only-ready');
const DRY = process.argv.includes('--dry');

const tx = (v) => (v && typeof v === 'object' && typeof v.text === 'string') ? v.text : (typeof v === 'string' ? v : '');
const db = JSON.parse(fs.readFileSync(UNITS, 'utf8'));
const ws = JSON.parse(fs.readFileSync(WS, 'utf8'));
const byId = new Map((db.units || []).map(u => [u.unitId, u]));

let sheets = ws.sheets || [];
if (ONLY_READY) sheets = sheets.filter(s => s.status === 'ready');
if (LIMIT !== Infinity) sheets = sheets.slice(0, LIMIT);

// 材料关键词：用于「不跑出材料」的近似校验（可复算，不含模型判断）
const STOP = new Set(['的', '了', '是', '在', '和', '与', '或', '不', '也', '就', '都', '而', '把', '被', '对', '从', '到', '中', '上', '下', '一个', '这个', '那个', '可以', '需要', '应该']);
const keywords = (s) => new Set(String(s).replace(/[，。；：、""''（）()《》·—…\s]/g, ' ').split(' ').filter(w => w.length >= 2 && !STOP.has(w)));

function buildPrompt(sheet, u) {
  const opis = (u.opinions || []).map(o => `- ${tx(o.coreClaim) || tx(o.title)}`).join('\n');
  const bounds = (sheet.distractorCandidates || []).map(b => `- ${b.text}`).join('\n');
  return `你在为一个中文学习单元出 3 道决策题。只输出 JSON 数组，不要解释。

【材料】只能用它，不许引入材料之外的事实或名词。
问题：${sheet.qst}
情境：${sheet.casPreview}
行动路径（正确答案就在这里）：${sheet.correctOption.text}
判断依据：
${opis}
卡片边界（供你参考什么叫"错"，但**不许照抄这些句子**）：
${bounds}

【输出】长度 3 的 JSON 数组，每项：
{"prompt":"题干（一个具体情境下的选择，不超过 60 字）",
 "distractors":[{"text":"错误做法（不超过 50 字）","why":"它为什么与行动路径或判断依据相悖（不超过 60 字）"},{"text":"...","why":"..."}]}

【硬要求】
1. 每题给且只给 2 个错误做法；正确做法由系统另行填写，你不要写。
2. 错误做法必须是**具体做法**（"把 X 全量塞进窗口"这种），**不是陈述句**（"A 不等于 B"这种一律不合格）。
3. 不许照抄材料里的任何原句；要改写成做法。
4. 两个错误做法要错得不一样，别是同一个意思换个说法。
5. 不许出现材料里没有的专有名词、产品名、人名、数字。`;
}

const results = [], failed = [];
let calls = 0;
for (const sheet of sheets) {
  const u = byId.get(sheet.unitId);
  const correct = sheet.correctOption;
  if (DRY) { results.push({ unitId: sheet.unitId, dry: true }); continue; }
  let out;
  try {
    const res = await fetch('http://127.0.0.1:5180/api/llm', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'system', content: buildPrompt(sheet, u) }, { role: 'user', content: '出题' }], json: true }),
    });
    const j = await res.json();
    calls++;
    const raw = String(j.content || j.reply || '').replace(/^```json\s*|\s*```$/g, '').trim();
    out = JSON.parse(raw);
    if (!Array.isArray(out)) throw new Error('返回不是数组');
  } catch (e) { failed.push({ unitId: sheet.unitId, reason: String(e.message || e) }); continue; }

  const material = [sheet.qst, sheet.casPreview, correct.text,
    ...(u.opinions || []).map(o => tx(o.coreClaim) || tx(o.title)),
    ...(sheet.distractorCandidates || []).map(b => b.text)].join('\n');
  const materialKw = keywords(material);
  const materialSentences = material.split(/[。；]/).map(s => s.trim()).filter(s => s.length >= 8);

  const questions = out.slice(0, 3).map((q, i) => {
    const ds = (q.distractors || []).slice(0, 2);
    const checks = [];
    if (ds.length !== 2) checks.push('干扰项不是 2 个');
    if (ds.some(d => !d.text || !d.why)) checks.push('干扰项缺 text 或 why');
    // ② 不照抄
    const copied = ds.filter(d => materialSentences.some(ms => ms.includes(String(d.text).trim())));
    if (copied.length) checks.push(`照抄材料（${copied.length} 条）`);
    // ③ 不跑出材料（近似）
    const lowCov = ds.filter(d => {
      const kw = [...keywords(d.text)];
      if (!kw.length) return true;
      const hit = kw.filter(w => materialKw.has(w) || [...materialKw].some(m => m.includes(w) || w.includes(m))).length;
      return hit / kw.length < 0.34;
    });
    if (lowCov.length) checks.push(`关键词覆盖率过低（${lowCov.length} 条，疑跑出材料）`);
    // 陈述句形态（"不等于/不是/并非" 开头）——上一版失败的直接原因
    const declarative = ds.filter(d => /^(?!.*(把|用|先|按|直接|只|全部|每次|让|从)).*(不等于|不是|并非|不代表)/.test(String(d.text)));
    if (declarative.length) checks.push(`干扰项是陈述句而非做法（${declarative.length} 条）`);

    return {
      id: `decisions[${i}]`, prompt: q.prompt || '',
      correctOption: correct,
      distractors: ds,
      status: checks.length ? 'needsReview' : 'generated-unreviewed',
      reviewNotes: checks,
      reviewed: false, playable: false,
    };
  });

  results.push({
    unitId: sheet.unitId, status: sheet.status, conceptId: sheet.conceptId,
    contentStatus: 'generated-unreviewed', reviewed: false, playable: false,
    questions,
  });
}

const totalQ = results.reduce((n, r) => n + (r.questions || []).length, 0);
const clean = results.reduce((n, r) => n + (r.questions || []).filter(q => q.status === 'generated-unreviewed').length, 0);
const payload = {
  generatedAt: new Date().toISOString(), kind: 'hybrid',
  method: 'M1 正确项机器逐字取材料 + M2 干扰项 AI 生成 + M3 逐句材料回指校验（结构/不照抄/不跑出材料/非陈述句）',
  modelCalls: calls,
  contentStatus: 'generated-unreviewed', notWiredIntoPage: true,
  counts: { units: results.length, questions: totalQ, clean, needsReview: totalQ - clean, unitsFailed: failed.length },
  authority: '负责人 2026-09-14：不手写干扰项；一问一答，其余错误答案交 AI；启用 B 前须加逐句材料回指检查（本脚本即为该检查）',
  failed, units: results,
};
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
console.log(`混合生成：${results.length} 单元 / ${totalQ} 题（模型 ${calls} 次）`);
console.log(`  一次过（generated-unreviewed）：${clean} · 需人看（needsReview）：${totalQ - clean} · 单元失败：${failed.length}`);
console.log(`  未接页面 · playable 全 false`);
console.log(`✅ ${path.relative(ROOT, OUT)}`);
