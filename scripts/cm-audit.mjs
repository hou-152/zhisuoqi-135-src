#!/usr/bin/env node
// 概念地图 v2 · 审核报告：结构体检（确定性）＋ 分层抽检（真 LLM 挑刺）。
//
// 抽检口径：不问「这个定义好不好」，问三件可判的事——
//   ① desc 有没有超出原文支持（faithful / overstated / wrong）
//   ② 领域 / 类型 / 验收方式 判得对不对
//   ③ hard 边真的成立吗（不懂 to 就没法真懂 from？）
// 模型只负责挑刺，结论与可疑清单落在报告里，供所有者裁决。
//
// 用法：node scripts/cm-audit.mjs [--concepts=60] [--edges=40]
// 产出：docs/概念地图v2-审核报告-20260913.md ＋ evidence/cm-260913/06-audit.json

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAP = path.join(ROOT, 'knowledge', '概念地图-260913');
const WIKI = path.join(ROOT, 'knowledge', '概念wiki-260913');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const CACHE = path.join(ROOT, 'evidence', '.cm-audit-cache.json');
const ARGV = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const N_CONCEPT = Number(ARGV.concepts || 60);
const N_EDGE = Number(ARGV.edges || 40);

for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE: BASE, LLM_API_KEY: KEY, LLM_MODEL: MODEL } = process.env;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证（.private/llm.env）'); process.exit(2); }

let cache = {};
try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch { cache = {}; }
const saveCache = () => fs.writeFileSync(CACHE, JSON.stringify(cache));
let tokens = 0;
async function askJson(system, user, { maxTokens = 24000, key = null } = {}) {
  if (key && cache[key]) return cache[key];
  let lastErr;
  for (const budget of [maxTokens, maxTokens * 2, 40000]) {
    const reply = await chatCompletion({ base: BASE, key: KEY, model: MODEL, json: true, maxTokens: budget,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }] });
    if (!reply.ok) { lastErr = new Error(`HTTP ${reply.status}: ${reply.detail}`); continue; }
    tokens += reply.tokens || 0;
    const txt = (reply.content || '').trim();
    if (!txt) { lastErr = new Error(`空回复 finish=${reply.finish}`); await new Promise((r) => setTimeout(r, 800)); continue; }
    try { const o = JSON.parse(txt); if (key) { cache[key] = o; saveCache(); } return o; }
    catch { lastErr = new Error(`JSON 解析失败：${txt.slice(0, 140)}`); }
  }
  throw lastErr;
}

const topics = JSON.parse(fs.readFileSync(path.join(MAP, 'topics.json'), 'utf8')).topics;
const deps = JSON.parse(fs.readFileSync(path.join(MAP, 'dependencies.json'), 'utf8')).dependencies;
const rels = JSON.parse(fs.readFileSync(path.join(MAP, 'relations.json'), 'utf8')).relations;
const clusters = JSON.parse(fs.readFileSync(path.join(MAP, 'clusters.json'), 'utf8')).clusters;
const byId = new Map(topics.map((t) => [t.id, t]));
const labelOf = new Map(clusters.map((c) => [c.id, c.label]));
const NON_AI = new Set(['clinical-medicine', 'mind-body', 'personal-life', 'society-law', 'geo-infrastructure', 'media-culture-education', 'economy-business']);

/* ── A. 结构体检 ────────────────────────────────────────── */
const A = {};
A.total = topics.length;
A.bracketNames = topics.filter((t) => /[【】]/.test(t.name)).length;
A.emptyDesc = topics.filter((t) => !t.description || t.description.length < 6).map((t) => t.name);
A.descLen = stats(topics.map((t) => t.description.length));
A.withFeynman = topics.filter((t) => t.feynman).length;
A.withContext = topics.filter((t) => t.sourceContext).length;
A.withEvidence = topics.filter((t) => (t.evidence || []).length).length;
A.withAp = topics.filter((t) => t.assessmentPrompt).length;
function stats(a) { const s = [...a].sort((x, y) => x - y); const q = (p) => s[Math.floor((s.length - 1) * p)]; return { min: s[0], p25: q(0.25), mid: q(0.5), p75: q(0.75), max: s[s.length - 1], avg: Math.round(s.reduce((x, y) => x + y, 0) / s.length) }; }

const deg = new Map(topics.map((t) => [t.id, 0]));
for (const d of deps) { deg.set(d.topicId, deg.get(d.topicId) + 1); deg.set(d.prerequisiteId, deg.get(d.prerequisiteId) + 1); }
A.isolated = topics.filter((t) => !deg.get(t.id)).length;
A.edgeByOrigin = tally(deps, 'origin');
A.edgeByStrength = tally(deps, 'strength');
A.hardRatio = (deps.filter((d) => d.strength === 'hard').length / deps.length).toFixed(2);
A.edgeWithEmptyReason = deps.filter((d) => !d.reason || d.reason.length < 6).length;
A.shortReason = deps.filter((d) => d.reason && d.reason.length < 15).length;
A.relationKinds = tally(rels, 'kind');
A.domainSizes = clusters.map((c) => ({ label: c.label, n: c.topicCount, ai: !NON_AI.has(c.id) }));
A.nonAiShare = (topics.filter((t) => NON_AI.has(t.domain)).length / topics.length * 100).toFixed(1) + '%';
A.byType = tally(topics, 'type');
A.byStage = tally(topics, 'learningStage');
A.byVerification = tally(topics, 'verification');
A.byOrigin = { notionOnly: topics.filter((t) => t.origin.length === 1 && t.origin[0] === 'notion').length,
  contextOnly: topics.filter((t) => t.origin.length === 1 && t.origin[0] === 'context').length,
  harnessOnly: topics.filter((t) => t.origin.length === 1 && t.origin[0] === 'harness').length,
  multi: topics.filter((t) => t.origin.length > 1).length };

// 名字卫生：一个名字完整包含另一个（可能是同一概念的两种粒度）
const names = topics.map((t) => t.name);
A.contained = [];
for (const a of names) for (const b of names) {
  if (a !== b && b.length >= 4 && a.includes(b) && a.length - b.length <= 8) A.contained.push([a, b]);
}
A.contained = A.contained.slice(0, 25);

const backlinks = JSON.parse(fs.readFileSync(path.join(WIKI, 'backlinks.json'), 'utf8')).backlinks;
A.wikiPages = fs.readdirSync(path.join(WIKI, 'concepts')).filter((f) => f.endsWith('.md')).length;
A.wikiOrphans = Object.entries(JSON.parse(fs.readFileSync(path.join(WIKI, 'links.json'), 'utf8')).links)
  .filter(([p]) => !(backlinks[p] || []).length).length;

/* ── B. 抽检 ────────────────────────────────────────────── */
// 分层：先按 origin 分，层内等距取，保证四个来源、四个验收类别、23 个领域都被覆盖
function stratified(list, n) {
  const out = []; const buckets = new Map();
  for (const t of list) {
    const k = `${t.origin.length > 1 ? 'multi' : t.origin[0]}|${t.verification}`;
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(t);
  }
  const keys = [...buckets.keys()].sort();
  let i = 0;
  while (out.length < n && keys.length) {
    const k = keys[i % keys.length];
    const b = buckets.get(k);
    if (b.length) out.push(b.shift());
    else keys.splice(i % keys.length, 1);
    i++;
  }
  return out;
}
const sampleC = stratified(topics, N_CONCEPT);
const sampleE = stratified(deps.map((d) => ({ ...d, verification: byId.get(d.topicId)?.verification || 'judge', origin: [d.origin] })), N_EDGE)
  .map((x) => deps.find((d) => d.topicId === x.topicId && d.prerequisiteId === x.prerequisiteId));

const CSYS = '你是概念地图的审核员。只挑刺，不给安慰分。只输出 JSON。';
async function auditConcepts(batch, bi) {
  const body = batch.map((t, i) => `[${i}] 概念：${t.name}${t.nameEn ? `（${t.nameEn}）` : ''}
领域：${labelOf.get(t.domain) || t.domain} ｜ 类型：${t.type} ｜ 学习时机：${t.learningStage} ｜ 验收方式：${t.verification}
地图给的定义：${t.description}
原文材料：${(t.sourceContext || t.feynman || '（无）').slice(0, 500)}`).join('\n\n');
  const out = await askJson(CSYS, `逐条审核下面 ${batch.length} 个概念，对每条判三件事：

1. faithful：地图给的定义**有没有原文支持**——supported（原文说得到）/ overstated（原文没那么强，定义夸大了）/ wrong（与原文矛盾或明显是编的）/ nosource（这条没有原文材料，无法核）
2. domain_ok：领域判得对不对（true/false）
3. type_ok：类型（CONCEPTUAL/PROCEDURAL/REPRESENTATIONAL/LANGUAGE/META）判得对不对（true/false）
4. verify_ok：验收方式（compute 能算/能跑、judge 能判对错好坏、use 能拿去用、accept 只能认）判得对不对（true/false）
5. issue：一句话说哪里不对；没问题写空字符串

输出 JSON：{"items":[{"i":序号,"faithful":"supported|overstated|wrong|nosource","domain_ok":true,"type_ok":true,"verify_ok":true,"issue":""}]}

${body}`, { key: `audit-c-${bi}-${batch.map((t) => t.id).join(',')}`, maxTokens: 20000 });
  return out.items || [];
}

const ESYS = '你是概念依赖关系的审核员。只挑刺。只输出 JSON。';
async function auditEdges(batch, bi) {
  const body = batch.map((d, i) => {
    const a = byId.get(d.topicId); const b = byId.get(d.prerequisiteId);
    return `[${i}] 「${a.name}」依赖「${b.name}」（强度 ${d.strength}，来源 ${d.origin}）
${a.name} 是什么：${a.description}
${b.name} 是什么：${b.description}
地图给的理由：${d.reason}`;
  }).join('\n\n');
  const out = await askJson(ESYS, `逐条判下面 ${batch.length} 条前置依赖边**是否真的成立**。

判据：不懂「前置」那个概念，是不是就真的没法懂「依赖方」那个概念？
- hard 边要求：不通前置，依赖方根本立不住（定义依赖/组成依赖/机制依赖）
- soft 边要求：懂前置会让依赖方明显更好懂

注意两个常见错：① 只是「相关」或「常一起出现」被写成了依赖；② 方向反了（其实是前置依赖依赖方）。
输出 JSON：{"items":[{"i":序号,"holds":"yes|weak|no|reversed","issue":"一句话说哪里不对，没问题写空"}]}

${body}`, { key: `audit-e-${bi}-${batch.map((d) => d.topicId + d.prerequisiteId).join(',')}`, maxTokens: 20000 });
  return out.items || [];
}

const cBatches = chunk(sampleC, 10);
const eBatches = chunk(sampleE, 10);
function chunk(a, n) { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; }

const cRes = [];
for (let i = 0; i < cBatches.length; i++) {
  const items = await auditConcepts(cBatches[i], i);
  for (const r of items) {
    const t = cBatches[i][Number(r.i)];
    if (t) cRes.push({ id: t.id, name: t.name, domain: labelOf.get(t.domain), ...r });
  }
  console.log(`  概念抽检 ${i + 1}/${cBatches.length}（tokens ${tokens}）`);
}
const eRes = [];
for (let i = 0; i < eBatches.length; i++) {
  const items = await auditEdges(eBatches[i], i);
  for (const r of items) {
    const d = eBatches[i][Number(r.i)];
    if (d) eRes.push({ topicId: d.topicId, prerequisiteId: d.prerequisiteId, from: byId.get(d.topicId).name, to: byId.get(d.prerequisiteId).name, strength: d.strength, origin: d.origin, reason: d.reason, ...r });
  }
  console.log(`  依赖抽检 ${i + 1}/${eBatches.length}（tokens ${tokens}）`);
}

const B = {
  concepts: { n: cRes.length, faithful: tally(cRes, 'faithful'), domainOk: cRes.filter((r) => r.domain_ok).length, typeOk: cRes.filter((r) => r.type_ok).length, verifyOk: cRes.filter((r) => r.verify_ok).length },
  edges: { n: eRes.length, holds: tally(eRes, 'holds'), byOrigin: groupHolds(eRes) },
  conceptIssues: cRes.filter((r) => r.faithful !== 'supported' || !r.domain_ok || !r.type_ok || !r.verify_ok),
  edgeIssues: eRes.filter((r) => r.holds !== 'yes'),
};
function groupHolds(list) {
  const o = {};
  for (const r of list) { o[r.origin] = o[r.origin] || { yes: 0, weak: 0, no: 0, reversed: 0 }; o[r.origin][r.holds] = (o[r.origin][r.holds] || 0) + 1; }
  return o;
}

/* ── 报告 ───────────────────────────────────────────────── */
const pct = (a, b) => b ? `${(a / b * 100).toFixed(0)}%` : '—';
const R = [];
R.push('# 概念地图 v2 · 审核报告', '');
R.push(`生成：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })} ｜ 模型：${MODEL} ｜ 本轮抽检 tokens：${tokens}`, '');
R.push('> 本报告只做两件事：**结构体检**（确定性，可复现）和**分层抽检**（真 LLM 逐条挑刺）。');
R.push('> 模型只负责挑刺，不负责给结论；「过不过」由所有者看下面的可疑清单裁。', '');
R.push('---', '', '## 一、结构体检（确定性）', '');
R.push(`- 概念 **${A.total}** ｜ 依赖 **${deps.length}** ｜ 关联 **${rels.length}** ｜ 领域 **${clusters.length}**`);
R.push(`- 名字残留【】 ${A.bracketNames} ｜ 定义过短(＜6字) ${A.emptyDesc.length}${A.emptyDesc.length ? '（' + A.emptyDesc.join('、') + '）' : ''}`);
R.push(`- 定义字数：最短 ${A.descLen.min} · 中位 ${A.descLen.mid} · 最长 ${A.descLen.max} · 平均 ${A.descLen.avg}`);
R.push(`- 有费曼 ${A.withFeynman}/${A.total} ｜ 有原文 context ${A.withContext}/${A.total} ｜ 有掌握证据 ${A.withEvidence}/${A.total} ｜ 有验收问句 ${A.withAp}/${A.total}`);
R.push(`- 没有任何依赖边的概念 **${A.isolated}**（${pct(A.isolated, A.total)}）｜ wiki 无入链页 **${A.wikiOrphans}**（wiki 共 ${A.wikiPages} 页）`);
R.push(`- 依赖边来源：${Object.entries(A.edgeByOrigin).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
R.push(`- 强度：${Object.entries(A.edgeByStrength).map(([k, v]) => `${k} ${v}`).join(' · ')}（hard 占 ${A.hardRatio}）｜ reason 缺失 ${A.edgeWithEmptyReason} · 过短(<15字) ${A.shortReason}`);
R.push(`- 关联类型：${Object.entries(A.relationKinds).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
R.push(`- 类型：${Object.entries(A.byType).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
R.push(`- 学习时机：${Object.entries(A.byStage).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
R.push(`- 验收方式：${Object.entries(A.byVerification).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
R.push(`- 来源分布：Notion 独有 ${A.byOrigin.notionOnly} · Context 独有 ${A.byOrigin.contextOnly} · Harness 独有 ${A.byOrigin.harnessOnly} · 跨源 ${A.byOrigin.multi}`);
R.push(`- **非 AI 领域占比 ${A.nonAiShare}**（${[...NON_AI].map((k) => (clusters.find((c) => c.id === k) || {}).label).filter(Boolean).join(' / ')}）`);
R.push('', '### 领域分布', '', '| 领域 | 概念数 | 是否 AI 领域 |', '|---|---:|---|');
for (const d of A.domainSizes) R.push(`| ${d.label} | ${d.n} | ${d.ai ? '是' : '**否**'} |`);
if (A.contained.length) {
  R.push('', '### 疑似同概念的两种粒度（名字一个是另一个的子串，长度差 ≤8）', '');
  R.push('> 不是错，是要不要合并的判断点。', '');
  for (const [a, b] of A.contained) R.push(`- 「${a}」⊃「${b}」`);
}

R.push('', '---', '', '## 二、分层抽检（真 LLM 逐条挑刺）', '');
R.push(`抽检概念 **${B.concepts.n}** 个（按「来源 × 验收类别」分层覆盖）· 抽检依赖边 **${B.edges.n}** 条（按来源分层）`, '');
R.push('### 概念', '', '| 判项 | 结果 |', '|---|---|');
R.push(`| 定义有原文支持（supported） | **${B.concepts.faithful.supported || 0}/${B.concepts.n}（${pct(B.concepts.faithful.supported || 0, B.concepts.n)}）** |`);
R.push(`| 定义夸大（overstated） | ${B.concepts.faithful.overstated || 0} |`);
R.push(`| 定义错/编（wrong） | **${B.concepts.faithful.wrong || 0}** |`);
R.push(`| 无原文可核（nosource） | ${B.concepts.faithful.nosource || 0} |`);
R.push(`| 领域判对 | ${B.concepts.domainOk}/${B.concepts.n}（${pct(B.concepts.domainOk, B.concepts.n)}） |`);
R.push(`| 类型判对 | ${B.concepts.typeOk}/${B.concepts.n}（${pct(B.concepts.typeOk, B.concepts.n)}） |`);
R.push(`| 验收方式判对 | ${B.concepts.verifyOk}/${B.concepts.n}（${pct(B.concepts.verifyOk, B.concepts.n)}） |`);
R.push('', '### 依赖边', '', '| 判项 | 结果 |', '|---|---|');
R.push(`| 真的成立（yes） | **${B.edges.holds.yes || 0}/${B.edges.n}（${pct(B.edges.holds.yes || 0, B.edges.n)}）** |`);
R.push(`| 偏弱、算 related 不算依赖（weak） | ${B.edges.holds.weak || 0} |`);
R.push(`| 不成立（no） | **${B.edges.holds.no || 0}** |`);
R.push(`| 方向反了（reversed） | **${B.edges.holds.reversed || 0}** |`);
R.push('', '按来源：', '');
R.push('| 来源 | yes | weak | no | reversed |', '|---|---:|---:|---:|---:|');
for (const [k, v] of Object.entries(B.edges.byOrigin)) R.push(`| ${k} | ${v.yes || 0} | ${v.weak || 0} | ${v.no || 0} | ${v.reversed || 0} |`);

R.push('', '---', '', '## 三、可疑清单（模型挑出来的，逐条可核）', '');
if (B.conceptIssues.length) {
  R.push(`### 概念（${B.conceptIssues.length} 条）`, '', '| 概念 | 领域 | faithful | 领域对 | 类型对 | 验收对 | 问题 |', '|---|---|---|---|---|---|---|');
  for (const r of B.conceptIssues) R.push(`| ${r.name} | ${r.domain || ''} | ${r.faithful} | ${r.domain_ok ? '✓' : '✗'} | ${r.type_ok ? '✓' : '✗'} | ${r.verify_ok ? '✓' : '✗'} | ${String(r.issue || '').replace(/\|/g, '/')} |`);
} else R.push('### 概念', '', '本轮抽检没有挑出问题。');
if (B.edgeIssues.length) {
  R.push('', `### 依赖边（${B.edgeIssues.length} 条）`, '', '| 依赖方 | 前置 | 强度 | 来源 | 判定 | 问题 |', '|---|---|---|---|---|---|');
  for (const r of B.edgeIssues) R.push(`| ${r.from} | ${r.to} | ${r.strength} | ${r.origin} | ${r.holds} | ${String(r.issue || '').replace(/\|/g, '/')} |`);
} else R.push('', '### 依赖边', '', '本轮抽检没有挑出问题。');

R.push('', '---', '', '## 四、怎么读这份报告', '');
R.push('- **结构体检**是确定性检查，数字可复现（重跑 `node scripts/cm-audit.mjs`）。');
R.push('- **抽检**是模型逐条挑刺，它会挑错——每条可疑项都带原因，请按原因自己核，不要按结论信。');
R.push('- 抽检是**分层抽样**，不是全量；没被抽到的概念不等于没问题。');
R.push('- 复核入口：`node scripts/cm-validate.mjs`（结构）· `knowledge/概念wiki-260913/index.md`（按领域翻）· `evidence/cm-260913/03-enriched.json`（逐条判据）· `evidence/cm-260913/06-audit.json`（本次抽检原始结果）。');

fs.writeFileSync(path.join(ROOT, 'docs', '概念地图v2-审核报告-20260913.md'), R.join('\n'));
fs.writeFileSync(path.join(DIR, '06-audit.json'), JSON.stringify({ generatedAt: new Date().toISOString(), model: MODEL, tokens, structural: A, sample: B, conceptResults: cRes, edgeResults: eRes }, null, 1));
function tally(arr, k) { const o = {}; for (const x of arr) o[x[k]] = (o[x[k]] || 0) + 1; return o; }

console.log('✅ 审核报告完成');
console.log(`   定义：supported ${B.concepts.faithful.supported || 0} · overstated ${B.concepts.faithful.overstated || 0} · wrong ${B.concepts.faithful.wrong || 0} · nosource ${B.concepts.faithful.nosource || 0}`);
console.log(`   判对：领域 ${B.concepts.domainOk}/${B.concepts.n} · 类型 ${B.concepts.typeOk}/${B.concepts.n} · 验收 ${B.concepts.verifyOk}/${B.concepts.n}`);
console.log(`   依赖：yes ${B.edges.holds.yes || 0} · weak ${B.edges.holds.weak || 0} · no ${B.edges.holds.no || 0} · reversed ${B.edges.holds.reversed || 0}`);
console.log(`   → docs/概念地图v2-审核报告-20260913.md（tokens ${tokens}）`);
