#!/usr/bin/env node
// 决策题批量生成 · A 结构法（2026-09-14）
//
// 依据：负责人 2026-09-14 裁决 —— A/B 对比中 A（结构法）胜出（8:7，三项评分）。
//   预注册规则「B 不显著优于 A 就用 A」。B 保留为候选生成器，启用前必须先加逐句材料回指检查。
//
// 方法（零模型调用，确定性可复算）：
//   正确项 = 该单元 SOL.summary.text（逐字原文）
//   干扰项 = 该卡 boundaries 里带否定词的条目，逐字摘出被否定的那个主张，套「按这条来做」的框
//   依据   = 正确项回指 SOL 单元 ID；干扰项回指卡片 boundaries 行号
//
// ⚠ 两条自我限制：
//   ① 生成物一律 contentStatus=generated-unreviewed，**不接进页面**。
//      回执原话：「不把缺题的单元冒充可学课程」。未审的题不进学习空间。
//   ② 干扰项读起来会偏生硬（机械摘取，不是人工改写）——这是 A 法的已知代价，
//      负责人已在校准中确认接受。**事后汇报里必须把这个代价写清楚，不许说成"已解决决策题"。**
//
// 用法：node scripts/gen-decision-questions.mjs [--limit N] [--only-ready]
// 产物：evidence/gen-decisions-20260914.json + 一页汇报

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const UNITS = path.join(ROOT, 'evidence', 'batch-units-260914', 'units.json');
const CARDS = path.join(ROOT, '内容结构化系统', '01-原始素材区', '完整副本', '图鉴站产物', 'concepts');
const OUT = path.join(ROOT, 'evidence', 'gen-decisions-20260914.json');

const LIMIT = (() => { const i = process.argv.indexOf('--limit'); return i > -1 ? Number(process.argv[i + 1]) : Infinity; })();
const ONLY_READY = process.argv.includes('--only-ready');

// 单元字段是「出处信封」{text, sourceFile, sourceSha256, locator, escapeForm}，正文一律走 .text
const tx = (v) => (v && typeof v === 'object' && typeof v.text === 'string') ? v.text
  : (typeof v === 'string' ? v : '');

// boundaries 里「被否定的那个主张」——这几类词后面跟的通常就是误区
const NEG = /(不等于|不表示|不是|不要|不应|不能|不保证|不代表|不再|并非)/;

function extractNegated(line) {
  const m = line.match(NEG);
  if (!m) return null;
  // 取否定词所在的那个分句（到下一个句号／分号为止），逐字保留
  const start = line.lastIndexOf('。', m.index) + 1;
  let end = line.indexOf('。', m.index);
  if (end < 0) end = line.length;
  const clause = line.slice(start, end).trim();
  return clause.length >= 12 ? clause : null;   // 太短的摘不出可读的误区
}

function parseBoundaries(yaml) {
  const lines = yaml.split('\n');
  const i = lines.findIndex(l => /^boundaries:/.test(l));
  if (i < 0) return [];
  const out = [];
  for (let j = i + 1; j < lines.length; j++) {
    const l = lines[j];
    if (/^[a-zA-Z_]/.test(l)) break;            // 下一个顶层键
    const m = l.match(/^\s*-\s+(.*)$/);
    if (m) out.push(m[1].replace(/^["']|["']$/g, '').trim());
  }
  return out;
}

const db = JSON.parse(fs.readFileSync(UNITS, 'utf8'));
let units = db.units || [];
if (ONLY_READY) units = units.filter(u => u.status === 'ready');
units = units.slice(0, LIMIT === Infinity ? units.length : LIMIT);

const results = [], skipped = [];
for (const u of units) {
  const cardFile = path.join(ROOT, u.card?.file || '');
  if (!u.card?.file || !fs.existsSync(cardFile)) { skipped.push({ unitId: u.unitId, reason: '卡片文件不在本地' }); continue; }
  const yaml = fs.readFileSync(cardFile, 'utf8');
  const boundaries = parseBoundaries(yaml);
  const negated = boundaries.map(extractNegated).filter(Boolean);

  const solText = tx(u.solution?.summary);
  const qst = tx(u.qst?.title);
  const cas = tx(u.case?.summary);
  const solId = u.solution?.id || 'SOL';
  const solLocator = u.solution?.summary?.locator || '';

  if (!solText) { skipped.push({ unitId: u.unitId, reason: '缺 SOL.summary（正确项无来源）' }); continue; }
  if (negated.length < 2) { skipped.push({ unitId: u.unitId, reason: `可摘取的误区不足 2 条（实测 ${negated.length}）` }); continue; }

  const frames = [
    `情境：${cas}\n这一轮该怎么做？`,
    `还是同一个场景。若把「${qst}」当成要解决的问题，下面哪种做法是对的？`,
    `换个问法：这个单元主张的做事方式是哪一种？`,
  ];
  const decisions = frames.map((prompt, k) => {
    const d1 = negated[(k * 2) % negated.length];
    const d2 = negated[(k * 2 + 1) % negated.length];
    return {
      id: `decisions[${k}]`,
      prompt,
      options: [
        { text: `按这条来做：${d1}`, correct: false,
          why: `这一条正是卡片 boundaries 里被否定的主张（逐字摘取）。`,
          basis: `concepts/${u.card.slug}.yaml#boundaries`, basisQuote: d1 },
        { text: solText, correct: true, why: '',
          basis: solId, basisQuote: solText, locator: solLocator },
        { text: `按这条来做：${d2}`, correct: false,
          why: `这一条正是卡片 boundaries 里被否定的主张（逐字摘取）。`,
          basis: `concepts/${u.card.slug}.yaml#boundaries`, basisQuote: d2 },
      ],
    };
  });

  results.push({
    unitId: u.unitId, status: u.status, conceptId: u.conceptId,
    cardSlug: u.card.slug, boundariesTotal: boundaries.length, negatedTotal: negated.length,
    contentStatus: 'generated-unreviewed',
    reviewed: false, playable: false,
    decisions,
  });
}

const total = results.reduce((n, r) => n + r.decisions.length, 0);
const payload = {
  generatedAt: new Date().toISOString(),
  method: 'A-structural',
  modelCalls: 0,
  decisionAuthority: '负责人 2026-09-14 裁决：A/B 对比 A 胜（8:7），预注册规则「B 不显著优于 A 就用 A」',
  contentStatus: 'generated-unreviewed',
  notWiredIntoPage: true,
  notWiredReason: '未审的题不进学习空间 —— 回执口径「不把缺题的单元冒充可学课程」',
  knownCost: '干扰项是机械摘取 boundaries 里被否定的主张，读起来偏生硬；不是人工改写的教学误解。',
  counts: { unitsIn: units.length, unitsGenerated: results.length, unitsSkipped: skipped.length, questions: total },
  skipped,
  units: results,
};
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));

console.log(`A 结构法批量生成（零模型调用）`);
console.log(`  单元入 ${units.length} · 生成 ${results.length} · 跳过 ${skipped.length} · 题数 ${total}`);
const byReason = {};
for (const s of skipped) byReason[s.reason.replace(/（.*?）/, '')] = (byReason[s.reason.replace(/（.*?）/, '')] || 0) + 1;
for (const [r, n] of Object.entries(byReason)) console.log(`  跳过·${r}：${n}`);
console.log(`  contentStatus=generated-unreviewed · 未接页面`);
console.log(`✅ ${path.relative(ROOT, OUT)}`);
