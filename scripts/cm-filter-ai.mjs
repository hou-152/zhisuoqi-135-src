#!/usr/bin/env node
// 概念地图 v2 · AI 相关性过滤：只留「跟 AI / agent / LLM / 上下文工程 / harness 工程有关，
// 或者直接为『用 AI 做事』服务」的概念，其余整条拿掉。
//
// 为什么按概念判、不按领域一刀切：领域是粗粒度的，AI 领域里混着非 AI 概念
// （「采样伦理」「短睡眠时长」），非 AI 领域里也有 AI 概念（「AI 算力基建」）。
//
// 用法：node scripts/cm-filter-ai.mjs [--concurrency=6] [--dry]
// 产出：evidence/cm-260913/07-ai-filter.json（逐条判定 + 理由 + 被删清单）
//       就地改写 03-enriched.json / 04-edges.json（备份 *.pre-ai.bak），随后重建地图

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const CACHE = path.join(ROOT, 'evidence', '.cm-ai-filter-cache.json');
const ARGV = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const CONC = Number(ARGV.concurrency || 6);
const DRY = 'dry' in ARGV;

for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE: BASE, LLM_API_KEY: KEY, LLM_MODEL: MODEL } = process.env;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证（.private/llm.env）'); process.exit(2); }

let cache = {};
try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch { cache = {}; }
let tokens = 0;
async function askJson(user, key) {
  if (cache[key]) return cache[key];
  let lastErr;
  for (const budget of [16000, 32000, 40000]) {
    const reply = await chatCompletion({ base: BASE, key: KEY, model: MODEL, json: true, maxTokens: budget,
      messages: [{ role: 'system', content: '你是概念库的筛选员。只输出 JSON，不解释。' }, { role: 'user', content: user }] });
    if (!reply.ok) { lastErr = new Error(`HTTP ${reply.status}`); continue; }
    tokens += reply.tokens || 0;
    const txt = (reply.content || '').trim();
    if (!txt) { lastErr = new Error('空回复'); await new Promise((r) => setTimeout(r, 700)); continue; }
    try { const o = JSON.parse(txt); cache[key] = o; fs.writeFileSync(CACHE, JSON.stringify(cache)); return o; }
    catch { lastErr = new Error('JSON 解析失败'); }
  }
  throw lastErr;
}

const enriched = JSON.parse(fs.readFileSync(path.join(DIR, '03-enriched.json'), 'utf8'));
const edgeFile = JSON.parse(fs.readFileSync(path.join(DIR, '04-edges.json'), 'utf8'));
const nodes = enriched.nodes;
const labelOf = new Map(enriched.domains.map((d) => [d.id, d.label]));
const chunk = (a, n) => { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; };

const batches = chunk(nodes, 25);
console.log(`AI 相关性判定：${nodes.length} 条 → ${batches.length} 组 · 并发 ${CONC}`);

const verdicts = {};
let done = 0; const failed = [];
let cur = 0;
const worker = async () => {
  while (cur < batches.length) {
    const bi = cur++;
    const batch = batches[bi];
    const body = batch.map((n, i) => `[${i}] ${n.name}${n.nameEn ? `（${n.nameEn}）` : ''}${n.desc ? ` — ${n.desc}` : ''}`).join('\n');
    const prompt = `下面是一个概念库的 ${batch.length} 个概念。请逐条判：**它是不是在讲 AI？**

keep 的标准（满足任一即 keep）：
- 讲 AI / LLM / agent / 模型本身的能力、原理、限制、训练、评测
- 讲上下文工程（context engineering）或 harness 工程：上下文、记忆、工具、循环、沙箱、权限、验证、多 agent 编排
- 讲 AI 产品、AI 组织与岗位、AI 商业模式与经济、AI 安全与治理、AI 监管
- 讲「人怎么和 AI 协作」「人该怎么学 AI / 怎么用 AI 做事」

drop 的标准（满足任一且不满足上面任何一条即 drop）：
- 纯医学、临床、生物、生理
- 纯心理学 / 神经科学（跟 AI 认知无关的那种）
- 纯个人生活、关系、健康
- 纯法律条文、社会制度、地缘政治（跟 AI 监管无关的）
- 纯文化、娱乐、音乐、影视史（跟 AI 内容生产无关的）
- 传统商业 / 经济 / 投资（跟 AI 产业无关的）

拿不准就 keep（宁可多留）。

概念清单：
${body}

输出 JSON：{"items":[{"i":序号,"ai":"keep|drop","why":"≤15字"}]}`;
    try {
      const r = await askJson(prompt, `ai-${bi}-${batch.map((n) => n.id).join(',')}`);
      for (const it of r.items || []) {
        const n = batch[Number(it.i)];
        if (n) verdicts[n.id] = { ai: it.ai === 'drop' ? 'drop' : 'keep', why: String(it.why || '').slice(0, 40) };
      }
      done++;
      if (done % 10 === 0) console.log(`  …${done}/${batches.length} 组（tokens ${tokens}）`);
    } catch (e) { failed.push({ bi, err: String(e.message).slice(0, 120) }); }
  }
};
await Promise.all(Array.from({ length: CONC }, worker));

// 没判到的按 domain 兜底：AI 领域留，明显非 AI 的领域删
const NON_AI_DOMAIN = new Set(['clinical-medicine', 'mind-body', 'personal-life', 'society-law', 'geo-infrastructure', 'media-culture-education', 'economy-business']);
let fallback = 0;
for (const n of nodes) {
  if (!verdicts[n.id]) { verdicts[n.id] = { ai: NON_AI_DOMAIN.has(n.domain) ? 'drop' : 'keep', why: '未判到·按领域兜底' }; fallback++; }
}

const dropped = nodes.filter((n) => verdicts[n.id].ai === 'drop');
const keptIds = new Set(nodes.filter((n) => verdicts[n.id].ai === 'keep').map((n) => n.id));
console.log(`判定完成：keep ${keptIds.size} · drop ${dropped.length}（未判到按领域兜底 ${fallback}）· 失败组 ${failed.length}`);

const byDomain = {};
for (const n of dropped) byDomain[labelOf.get(n.domain) || n.domain] = (byDomain[labelOf.get(n.domain) || n.domain] || 0) + 1;
console.log('删除的按领域：' + Object.entries(byDomain).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · '));

const out = {
  generatedAt: new Date().toISOString(), model: MODEL, tokens,
  total: nodes.length, keep: keptIds.size, drop: dropped.length, fallback, failed,
  byDomain,
  droppedList: dropped.map((n) => ({ id: n.id, name: n.name, domain: labelOf.get(n.domain) || n.domain, why: verdicts[n.id].why })),
  verdicts,
};
fs.writeFileSync(path.join(DIR, '07-ai-filter.json'), JSON.stringify(out, null, 1));

if (DRY) { console.log('（--dry：没有改数据）'); process.exit(0); }

/* ── 落盘：节点、边、关系一起过滤 ───────────────────────── */
enriched.nodes = nodes.filter((n) => keptIds.has(n.id));
const before = { nodes: nodes.length, deps: edgeFile.dependencies.length, rels: edgeFile.relations.length };
edgeFile.dependencies = edgeFile.dependencies.filter((d) => keptIds.has(d.topicId) && keptIds.has(d.prerequisiteId));
edgeFile.relations = edgeFile.relations.filter((r) => keptIds.has(r.from) && keptIds.has(r.to));
edgeFile.dropped = (edgeFile.dropped || []).filter((d) => keptIds.has(d.topicId) && keptIds.has(d.prerequisiteId));
const touched = new Set(); for (const e of edgeFile.dependencies) { touched.add(e.topicId); touched.add(e.prerequisiteId); }
edgeFile.stats = { ...edgeFile.stats, dependencies: edgeFile.dependencies.length, relations: edgeFile.relations.length,
  isolated: enriched.nodes.length - touched.size, aiFilteredAt: out.generatedAt, aiDroppedNodes: dropped.length };
edgeFile.aiFilter = { dropped: dropped.length, kept: keptIds.size };

for (const [f, obj] of [['03-enriched.json', enriched], ['04-edges.json', edgeFile]]) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p + '.pre-ai.bak')) fs.copyFileSync(p, p + '.pre-ai.bak');
  fs.writeFileSync(p, JSON.stringify(obj, null, 1));
}
console.log(`已写入（备份 *.pre-ai.bak）`);
console.log(`  节点 ${before.nodes} → ${enriched.nodes.length}`);
console.log(`  依赖 ${before.deps} → ${edgeFile.dependencies.length}`);
console.log(`  关联 ${before.rels} → ${edgeFile.relations.length}`);
console.log(`  孤立点 ${edgeFile.stats.isolated}/${enriched.nodes.length}`);
console.log('  下一步：cm-build-map → cm-build-wiki → cm-wire → cm-validate → build-shell');
