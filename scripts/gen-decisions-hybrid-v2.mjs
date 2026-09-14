#!/usr/bin/env node
// 决策题 · 混合生成 v2（2026-09-14，按负责人审定的校验层）
//
// 正确项 = 机器逐字取 solution.summary.text；干扰项 = AI 生成；引用 = AI 选 refId，机器填全字段。
// 九条硬门槛（任一不过 → 该题退回）：结构可解析 / 每题 3 选项 / 每题 1 正确项 /
//   正确项逐字来自 SOL / 正确项带 SOL ID+sourceFile+locator / 干扰项必须有 why /
//   干扰项不得与材料原句逐字相同 / 干扰项不能是空句·陈述句·重复 / 材料信封完整可解析
// 降级为提示（不改 status）：sourceCoverageWarning —— 干扰项本来就该改写成做法，
//   与材料逐字复用越少，不代表越可能跑出材料。
// basisRefs 硬校验：**AI 只回 refId，sourceId·locator·quote 由机器从自建索引填**，
//   故这三项不可能被编造；机器只查存在性与逐字性，不证明语义成立。
// ⚠ 全部 contentStatus=generated-unreviewed · playable=false，不接页面。
// 用法：node scripts/gen-decisions-hybrid-v2.mjs [--units a,b,c] [--limit N] [--merge]

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const UNITS = path.join(ROOT, 'evidence', 'batch-units-260914', 'units.json');
const WS = path.join(ROOT, 'evidence', 'decision-worksheet-20260914.json');
const OUT = path.join(ROOT, 'evidence', 'gen-decisions-hybrid-v2-20260914.json');

const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
const ONLY = (arg('--units') || '').split(',').map(s => s.trim()).filter(Boolean);
const LIMIT = arg('--limit') ? Number(arg('--limit')) : Infinity;
const ONLY_READY = process.argv.includes('--only-ready');
const MERGE = process.argv.includes('--merge');

const tx = (v) => (v && typeof v === 'object' && typeof v.text === 'string') ? v.text : (typeof v === 'string' ? v : '');
const HEX64 = /^[0-9a-f]{64}$/;
const db = JSON.parse(fs.readFileSync(UNITS, 'utf8'));
const ws = JSON.parse(fs.readFileSync(WS, 'utf8'));
const byId = new Map((db.units || []).map(u => [u.unitId, u]));

function buildRefs(u, sheet) {
  const refs = [];
  const push = (sourceId, locator, quote, sourceFile, sha) => {
    const q = String(quote || '').trim();
    if (!q || q.length < 8) return;
    refs.push({ refId: `R${refs.length + 1}`, sourceId, locator, quote: q, sourceFile, sourceSha256: sha });
  };
  const s = u.solution?.summary;
  push(u.solution?.id, s?.locator, tx(s), s?.sourceFile, s?.sourceSha256);
  const c = u.case?.summary;
  push(u.case?.id, c?.locator, tx(c), c?.sourceFile, c?.sourceSha256);
  const t = u.qst?.title;
  push(u.qst?.id, t?.locator, tx(t), t?.sourceFile, t?.sourceSha256);
  for (const o of (u.opinions || [])) push(o.id, o.coreClaim?.locator, tx(o.coreClaim) || tx(o.title), o.coreClaim?.sourceFile, o.coreClaim?.sourceSha256);
  for (const b of (sheet.distractorCandidates || [])) push(`concepts/${u.card?.slug}.yaml`, `boundaries:L${b.line}`, b.text, u.card?.file, u.card?.sha256);
  return refs;
}

let sheets = ws.sheets || [];
if (ONLY.length) sheets = sheets.filter(s => ONLY.includes(s.unitId));
if (ONLY_READY) sheets = sheets.filter(s => s.status === 'ready');
if (LIMIT !== Infinity) sheets = sheets.slice(0, LIMIT);

const STOP = new Set(['的','了','是','在','和','与','或','不','也','就','都','而','把','被','对','从','到','中','上','下','一个','这个','可以','需要','应该']);
const kws = (s) => String(s).replace(/[，。；：、""''（）()《》·—…\s]/g,' ').split(' ').filter(w => w.length >= 2 && !STOP.has(w));

const prompt = (sheet, refs) => `你在为一个中文学习单元出 3 道决策题。只输出 JSON 数组。

【材料】只能用它，不许引入材料之外的事实、产品名、人名、数字。
问题：${sheet.qst}
情境：${sheet.casPreview}
行动路径（正确答案的出处，你不要写正确项）：${sheet.correctOption.text}

【可引用材料】写 refIds 时只能从这里选，不许自己编句子：
${refs.map(r => `[${r.refId}] ${r.quote.slice(0,150)}`).join('\n')}

【输出】长度 3 的 JSON 数组：
[{"prompt":"题干（具体情境下的选择，≤60 字）",
  "distractors":[{"text":"错误做法（≤50 字，必须是具体做法不是陈述句）","why":"为什么与行动路径相悖（≤60 字）","refIds":["R2"]},
                 {"text":"...","why":"...","refIds":["R5"]}]}]

【硬要求】
1. 每题只给 2 个错误做法；正确做法由系统另填。
2. 错误做法必须是做法（"把 X 全量塞进窗口"），不许是陈述句（"A 不等于 B"）。不许照抄材料原句。
3. 两个错误做法要错得不一样。4. 每个错误做法至少给 1 个 refIds。`;

const results = [], failed = [];
let calls = 0;
for (const sheet of sheets) {
  const u = byId.get(sheet.unitId);
  const refs = buildRefs(u, sheet);
  const refById = new Map(refs.map(r => [r.refId, r]));
  let out;
  try {
    const res = await fetch('http://127.0.0.1:5180/api/llm', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'system', content: prompt(sheet, refs) }, { role: 'user', content: '出题' }], json: true }),
    });
    const j = await res.json(); calls++;
    out = JSON.parse(String(j.content ?? j.reply ?? '').replace(/^```json\s*|\s*```$/g,'').trim());
    if (!Array.isArray(out)) throw new Error('返回不是数组');
  } catch (e) { failed.push({ unitId: sheet.unitId, kind: 'format', reason: `模型输出格式失败，可重试：${String(e.message || e)}` }); continue; }

  const sentences = refs.flatMap(r => r.quote.split(/[。；]/).map(x => x.trim()).filter(x => x.length >= 8));
  const solText = tx(u.solution?.summary);

  const questions = out.slice(0,3).map((q, i) => {
    const ds = (q.distractors || []).slice(0,2);
    const fail = [], warn = [];
    if (ds.length !== 2) fail.push('干扰项不是 2 个');
    if (ds.some(d => !String(d.text||'').trim())) fail.push('干扰项有空句');
    if (ds.some(d => !String(d.why||'').trim())) fail.push('干扰项缺 why');
    const texts = ds.map(d => String(d.text||'').trim());
    if (new Set(texts).size !== texts.length) fail.push('干扰项重复');
    if (ds.some(d => /(不等于|不是|并非|不代表|不同于)/.test(String(d.text)) && !/(把|用|先|按|直接|只|全部|每次|让|从)/.test(String(d.text)))) fail.push('干扰项是陈述句而非做法');
    if (ds.some(d => sentences.some(x => x.includes(String(d.text||'').trim())))) fail.push('干扰项与材料原句逐字相同');
    for (const [k, d] of ds.entries()) {
      const ids = d.refIds || [];
      if (!ids.length) { fail.push(`干扰项${k+1} 缺 basisRefs`); continue; }
      for (const id of ids) if (!refById.has(id)) fail.push(`干扰项${k+1} 引用了不存在的 refId ${id}`);
    }
    if (tx(u.solution?.summary) !== solText) fail.push('正确项与 SOL 原文不一致');
    if (!u.solution?.id || !u.solution?.summary?.sourceFile || !u.solution?.summary?.locator) fail.push('正确项缺 SOL ID/sourceFile/locator');
    if (!HEX64.test(String(u.solution?.summary?.sourceSha256 || ''))) fail.push('SOL 信封 sha256 不可解析');
    if (!fail.length) {
      const mk = new Set(kws(refs.map(r => r.quote).join(' ')));
      const cov = ds.map(d => { const k = kws(d.text); return k.length ? k.filter(w => mk.has(w)).length / k.length : 0; });
      if (cov.some(c => c < 0.34)) warn.push('sourceCoverageWarning: 关键词覆盖率低，仅提示人工复核，不改变 status');
    }
    return { id: `decisions[${i}]`, prompt: q.prompt || '', correctOption: sheet.correctOption,
      distractors: ds.map(d => ({ text: String(d.text||'').trim(), why: String(d.why||'').trim(),
        basisRefs: (d.refIds||[]).map(id => refById.get(id)).filter(Boolean) })),
      status: fail.length ? 'rejected' : 'generated-unreviewed',
      reviewNotes: fail, warnings: warn, reviewed: false, playable: false };
  });
  results.push({ unitId: sheet.unitId, status: sheet.status, conceptId: sheet.conceptId,
    contentStatus: 'generated-unreviewed', reviewed: false, playable: false, questions });
}

let units = results, prev = { units: [], failed: [], counts: {} };
if (MERGE && fs.existsSync(OUT)) {
  prev = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  const reran = new Set(results.map(r => r.unitId));
  units = [...(prev.units||[]).filter(r => !reran.has(r.unitId)), ...results];
}
const totalQ = units.reduce((n,r) => n + (r.questions||[]).length, 0);
const ok = units.reduce((n,r) => n + (r.questions||[]).filter(q => q.status === 'generated-unreviewed').length, 0);
const allFailed = [...(prev.failed||[]).filter(f => !results.some(r => r.unitId === f.unitId)), ...failed];
const payload = { generatedAt: new Date().toISOString(), kind: 'hybrid-v2',
  hardGates: ['结构可解析','每题 3 选项','每题 1 正确项','正确项逐字来自 SOL','正确项带 SOL ID/sourceFile/locator','干扰项必须有 why','干扰项不得与材料原句逐字相同','干扰项不能是空句/陈述句/重复','材料信封完整可解析'],
  demotedToWarning: ['sourceCoverageWarning：关键词覆盖率低，仅提示人工复核，不改变 status'],
  basisRefsRule: 'AI 只回 refId；sourceId·locator·quote 由机器从自建索引填，不可编造。机器只查存在性与逐字性，不证明语义成立。',
  modelCalls: calls, contentStatus: 'generated-unreviewed', notWiredIntoPage: true,
  counts: { units: units.length, questions: totalQ, generatedUnreviewed: ok, rejected: totalQ - ok, unitsFailed: allFailed.length },
  failed: allFailed, units };
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
console.log(`混合生成 v2：本次 ${results.length} 单元 / ${results.reduce((n,r)=>n+r.questions.length,0)} 题（模型 ${calls} 次）`);
console.log(`  合计 ${payload.counts.units} 单元 / ${totalQ} 题 · 生成态 ${ok} · 退回 ${totalQ-ok} · 单元失败 ${allFailed.length}`);
console.log(`  未接页面 · playable 全 false`);
console.log(`✅ ${path.relative(ROOT, OUT)}`);
