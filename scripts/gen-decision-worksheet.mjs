#!/usr/bin/env node
// 决策题 · 可自动化部分的生产线（2026-09-14）
//
// 分工（依据 2026-09-14 裁决与实测：机械摘取 boundaries 直接当选项不合格，见 batch-agent 抽查）：
//   ✅ 机器做：正确项（逐字取 SOL）· 依据回指（SOL 单元 ID + locator）· 候选误区清单（逐条带行号）
//              · 题干骨架 · 结构校验 · 逐字命中校验
//   ❌ 人来做：把候选误区改写成「做法式」错误选项 · 写 why
//
// 上一版 `gen-decision-questions.mjs` 把 boundaries 当选项生成源，产出 123 题但抽查即废
//   （教训：「Agent 不等于 LLM」是真陈述，不是错误做法）。本脚本不再伪造选项，只出工作单。
//
// 用法：node scripts/gen-decision-worksheet.mjs [--only-ready] [--limit N]
// 产物：evidence/decision-worksheet-20260914.json + evidence/decision-worksheet-20260914.md

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const UNITS = path.join(ROOT, 'evidence', 'batch-units-260914', 'units.json');
const OUT_JSON = path.join(ROOT, 'evidence', 'decision-worksheet-20260914.json');
const OUT_MD = path.join(ROOT, 'evidence', 'decision-worksheet-20260914.md');

const ONLY_READY = process.argv.includes('--only-ready');
const li = process.argv.indexOf('--limit');
const LIMIT = li > -1 ? Number(process.argv[li + 1]) : Infinity;

const tx = (v) => (v && typeof v === 'object' && typeof v.text === 'string') ? v.text : (typeof v === 'string' ? v : '');
const NEG = /(不等于|不表示|不是|不要|不应|不能|不保证|不代表|不再|并非)/;

/** 摘 boundaries：返回 {line, text, negHint}。negHint 只是提示「这条可能带误区形状」，不是判定。 */
function parseBoundaries(yaml) {
  const lines = yaml.split('\n');
  const start = lines.findIndex(l => /^boundaries:/.test(l));
  if (start < 0) return [];
  const out = [];
  for (let j = start + 1; j < lines.length; j++) {
    const l = lines[j];
    if (/^[a-zA-Z_]/.test(l)) break;
    const m = l.match(/^\s*-\s+(.*)$/);
    if (!m) continue;
    const text = m[1].replace(/^["']|["']$/g, '').trim();
    out.push({ line: j + 1, text, negHint: NEG.test(text) });
  }
  return out;
}

const db = JSON.parse(fs.readFileSync(UNITS, 'utf8'));
let units = db.units || [];
if (ONLY_READY) units = units.filter(u => u.status === 'ready');
if (LIMIT !== Infinity) units = units.slice(0, LIMIT);

const sheets = [], skipped = [];
for (const u of units) {
  const cardPath = u.card?.file ? path.join(ROOT, u.card.file) : '';
  if (!cardPath || !fs.existsSync(cardPath)) { skipped.push({ unitId: u.unitId, reason: '卡片不在本地' }); continue; }

  const boundaries = parseBoundaries(fs.readFileSync(cardPath, 'utf8'));
  const solText = tx(u.solution?.summary);
  const solId = u.solution?.id || 'SOL';
  const solLocator = u.solution?.summary?.locator || '';
  const qst = tx(u.qst?.title);
  const cas = tx(u.case?.summary);

  if (!solText) { skipped.push({ unitId: u.unitId, reason: '缺 SOL.summary —— 正确项无来源，整单元不可做' }); continue; }

  sheets.push({
    unitId: u.unitId, status: u.status, conceptId: u.conceptId,
    qst, casPreview: cas.slice(0, 120),
    // ✅ 机器产出：正确项与依据（逐字 + 可回指）
    correctOption: { text: solText, basis: solId, basisQuote: solText, locator: solLocator, source: 'solution.summary.text' },
    // ✅ 机器产出：候选误区清单（人从这里挑，不是选项）
    distractorCandidates: boundaries,
    candidateStats: { total: boundaries.length, negHint: boundaries.filter(b => b.negHint).length },
    // ❌ 人填：3 道题 × (2 干扰项 + 2 why)。留空槽位，不预填假内容。
    slots: [0, 1, 2].map(i => ({
      index: i,
      distractorA: null, whyA: null,
      distractorB: null, whyB: null,
      TODO: '从 distractorCandidates 挑一条，改写成「做法式」错误选项（不是照抄陈述），并写 why 说明它为什么与 SOL/OPI 相悖',
    })),
    contentStatus: 'worksheet-unfilled',
    reviewed: false, playable: false,
  });
}

const auto = sheets.length;
const humanSlots = auto * 3 * 2;   // 每个单元 3 题 × 2 个干扰项
const payload = {
  generatedAt: new Date().toISOString(),
  kind: 'worksheet',
  division: {
    machine: ['正确项（逐字取 SOL）', '依据回指（SOL 单元 ID + locator）', '候选误区清单（逐条带行号）', '题干骨架', '结构校验'],
    human: ['把候选误区改写成做法式错误选项', '写 why'],
    why: '2026-09-14 实测：机械摘取 boundaries 直接当选项不合格（batch-agent 抽查两个干扰项皆废）。机器不再伪造选项。',
  },
  counts: {
    unitsIn: units.length, worksheets: auto, skipped: skipped.length,
    machineDone: { correctOptions: auto, candidateBoundaries: sheets.reduce((n, s) => n + s.candidateStats.total, 0) },
    humanTodo: { units: auto, questions: auto * 3, distractors: humanSlots, whys: humanSlots },
  },
  skipped,
  sheets,
};
fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2));

// 一页 Markdown 工作单：给人直接照着写
const md = [`# 决策题工作单（${payload.generatedAt.slice(0, 10)}）`, '',
  `机器已完成：正确项 ${auto} 个 · 候选误区 ${payload.counts.machineDone.candidateBoundaries} 条。`,
  `待人工：${auto} 单元 × 3 题 × 2 干扰项 = **${humanSlots} 个干扰项 + ${humanSlots} 条 why**。`, '',
  `> 干扰项**不许照抄**候选里的陈述句 —— 要改写成「按这个做」的做法式选项。`, ''];
for (const s of sheets) {
  md.push(`## ${s.unitId}（${s.status}）`, '');
  md.push(`- QST：${s.qst}`);
  md.push(`- **正确项（机器已填）**：${s.correctOption.text}`);
  md.push(`  - 依据：\`${s.correctOption.basis}\`${s.correctOption.locator ? ` · ${s.correctOption.locator}` : ''}`);
  md.push(`- 候选误区 ${s.candidateStats.total} 条（★ = 含否定词，可能更像误区）：`);
  for (const c of s.distractorCandidates) md.push(`  - ${c.negHint ? '★' : '　'} L${c.line} ${c.text}`);
  md.push('- [ ] 干扰项 A：______　why：______');
  md.push('- [ ] 干扰项 B：______　why：______', '');
}
fs.writeFileSync(OUT_MD, md.join('\n'));

console.log('决策题工作单（机器部分已做完，零模型调用）');
console.log(`  单元入 ${units.length} · 工作单 ${auto} · 跳过 ${skipped.length}`);
console.log(`  机器已填：正确项 ${auto} · 候选误区 ${payload.counts.machineDone.candidateBoundaries} 条`);
console.log(`  待人工：${humanSlots} 个干扰项 + ${humanSlots} 条 why`);
console.log(`✅ ${path.relative(ROOT, OUT_JSON)}`);
console.log(`✅ ${path.relative(ROOT, OUT_MD)}`);
