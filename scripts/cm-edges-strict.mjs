#!/usr/bin/env node
// 概念地图 v2 · 严判据补边。
//
// 为什么要有这个脚本：第一轮生成的 655 条边被审核判掉 64%，模型给的理由几乎都是同一句——
// 「只是相关 / 只是例子 / 只是可选组件」。问题在判据太松，不在数据。
// 这个脚本把审核用的判据直接写进生成提示词，并且强制模型**先说出依赖类型再写边**。
//
// 三条硬要求：
//   ① 每条边必须能填出 dependency_type：definition（不懂前置就定义不了）/ mechanism（机制上离不开）
//      / composition（前置是必需构件，注意：可选组件不算）/ measurement（前置是度量或口径前提）
//   ② 写不出「不懂 B 就做不了 A 这件事」这句话的，不许写
//   ③ 宁少勿滥：每组 30 个概念里挑 8–15 条，不要凑数
//
// 用法：node scripts/cm-edges-strict.mjs [--concurrency=6]
// 产出：把新边并入 evidence/cm-260913/04-edges.json（origin=llm-strict），随后要再跑一次审核

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const CACHE = path.join(ROOT, 'evidence', '.cm-edges-strict-cache.json');
const ARGV = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const CONC = Number(ARGV.concurrency || 6);

for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE: BASE, LLM_API_KEY: KEY, LLM_MODEL: MODEL } = process.env;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证（.private/llm.env）'); process.exit(2); }

let cache = {};
try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch { cache = {}; }
let tokens = 0;
async function askJson(system, user, key, maxTokens = 24000) {
  if (cache[key]) return cache[key];
  let lastErr;
  for (const budget of [maxTokens, maxTokens * 2, 40000]) {
    const reply = await chatCompletion({ base: BASE, key: KEY, model: MODEL, json: true, maxTokens: budget,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }] });
    if (!reply.ok) { lastErr = new Error(`HTTP ${reply.status}: ${reply.detail}`); continue; }
    tokens += reply.tokens || 0;
    const txt = (reply.content || '').trim();
    if (!txt) { lastErr = new Error('空回复'); await new Promise((r) => setTimeout(r, 800)); continue; }
    try { const o = JSON.parse(txt); cache[key] = o; fs.writeFileSync(CACHE, JSON.stringify(cache)); return o; }
    catch { lastErr = new Error(`JSON 解析失败：${txt.slice(0, 140)}`); }
  }
  throw lastErr;
}

const enriched = JSON.parse(fs.readFileSync(path.join(DIR, '03-enriched.json'), 'utf8'));
const edgeFile = JSON.parse(fs.readFileSync(path.join(DIR, '04-edges.json'), 'utf8'));
const nodes = enriched.nodes;
const labelOf = new Map(enriched.domains.map((d) => [d.id, d.label]));
const byId = new Map(nodes.map((n) => [n.id, n]));
const norm = (s) => String(s).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, '');
const lookup = new Map();
for (const n of nodes) { for (const k of [n.name, n.nameEn, n.slug, ...(n.aliases || [])]) if (k) lookup.set(norm(k), n.id); }
const find = (k) => lookup.get(norm(k)) || null;

const existing = new Set(edgeFile.dependencies.map((d) => d.topicId + '->' + d.prerequisiteId));
const deg = new Map(nodes.map((n) => [n.id, 0]));
for (const d of edgeFile.dependencies) { deg.set(d.topicId, deg.get(d.topicId) + 1); deg.set(d.prerequisiteId, deg.get(d.prerequisiteId) + 1); }
const iso = nodes.filter((n) => !deg.get(n.id));
console.log(`现有 DAG ${edgeFile.dependencies.length} 条 · 孤立点 ${iso.length}/${nodes.length}`);

const SYS = `你是概念依赖关系的建模者。只输出 JSON。
你的判据比一般人严：**只有「不懂前置，依赖方就立不住」才算依赖**。
下面这些都不算，一条都不许写：
- 只是相关、只是常一起出现
- 前置只是依赖方的一个例子或案例
- 前置只是依赖方的一个可选组件（可有可无的都不算）
- 范围包含（A 包住 B）不等于 B 是 A 的前置
- 方向：写的是「依赖方 依赖 前置」，别写反`;

const groups = new Map();
for (const n of nodes) { if (!groups.has(n.domain)) groups.set(n.domain, []); groups.get(n.domain).push(n); }
// 孤立点优先分组，保证它们一定被送到模型面前
const jobs = [];
for (const [dom, list] of groups) {
  const isoList = list.filter((n) => !deg.get(n.id));
  const rest = list.filter((n) => deg.get(n.id));
  for (let i = 0; i < isoList.length; i += 30) jobs.push({ dom, list: isoList.slice(i, i + 30), pass: 'iso' });
  for (let i = 0; i < rest.length; i += 30) jobs.push({ dom, list: rest.slice(i, i + 30), pass: 'rest' });
}
console.log(`严判据补边：${jobs.length} 组`);

const added = [];
let cur = 0, done = 0; const failed = [];
const worker = async () => {
  while (cur < jobs.length) {
    const job = jobs[cur++];
    const body = job.list.map((n) => `${n.name}：${n.desc || '（无定义）'}`).join('\n');
    const prompt = `领域：${labelOf.get(job.dom) || job.dom}（${job.dom}）

下面是这个领域的 ${job.list.length} 个概念。请写出**组内**真正成立的前置依赖边，**8–15 条**（组小就少写，宁少勿滥）。

每条边必须：
1. 填得出 dependency_type，只能是这四种之一：
   definition ＝ 不懂前置，依赖方的定义就下不出来
   mechanism  ＝ 依赖方的机制里必须用到前置
   composition＝ 前置是依赖方**必需**的构件（可选组件不算）
   measurement＝ 前置是判断依赖方好坏所必需的度量或口径
2. 能造出这句话：「不懂【前置】，就做不了【依赖方】的 ⟨具体哪件事⟩」
3. strength：hard＝定义/机制上离不开；soft＝有帮助但非必需（每组最多写 3 条 soft）

概念清单：
${body}

输出 JSON：
{"edges":[{"from":"依赖方概念名","to":"前置概念名","dependency_type":"definition|mechanism|composition|measurement","strength":"hard|soft","cannot":"不懂【to】就做不了【from】的 ⟨具体哪件事⟩","reason":"一句话，≤50字"}]}
概念名必须逐字来自上面的清单。一条都写不出来就返回 {"edges":[]}。`;
    try {
      const r = await askJson(SYS, prompt, `strict-${job.pass}-${job.dom}-${job.list[0].id}`);
      let n = 0;
      for (const e of r.edges || []) {
        const a = find(e.from); const b = find(e.to);
        if (!a || !b || a === b) continue;
        if (!['definition', 'mechanism', 'composition', 'measurement'].includes(e.dependency_type)) continue;
        const key = a + '->' + b;
        if (existing.has(key)) continue;
        existing.add(key);
        added.push({ topicId: a, prerequisiteId: b, strength: e.strength === 'hard' ? 'hard' : 'soft',
          kind: 'prerequisite', reason: String(e.cannot || e.reason || '').slice(0, 140),
          origin: 'llm-strict', axis: e.dependency_type });
        n++;
      }
      done++;
      if (done % 8 === 0) console.log(`  …${done}/${jobs.length} 组（新边 ${added.length}，tokens ${tokens}）`);
    } catch (e) { failed.push({ dom: job.dom, pass: job.pass, err: String(e.message).slice(0, 140) }); }
  }
};
await Promise.all(Array.from({ length: CONC }, worker));

/* 环检测 */
const all = [...edgeFile.dependencies, ...added];
const RANK = { curated: 0, 'source-network': 1, llm: 2, 'llm-strict': 3 };
all.sort((a, b) => (a.strength === b.strength ? (RANK[a.origin] ?? 9) - (RANK[b.origin] ?? 9) : a.strength === 'hard' ? -1 : 1));
const adj = new Map(); const final = []; const dropped = [];
const reaches = (s, t) => { const st = [s], seen = new Set(); while (st.length) { const x = st.pop(); if (x === t) return true; if (seen.has(x)) continue; seen.add(x); for (const y of adj.get(x) || []) st.push(y); } return false; };
for (const e of all) {
  if (reaches(e.prerequisiteId, e.topicId)) { dropped.push({ ...e, dropReason: 'cycle' }); continue; }
  final.push(e);
  if (!adj.has(e.topicId)) adj.set(e.topicId, []);
  adj.get(e.topicId).push(e.prerequisiteId);
}
edgeFile.dependencies = final;
edgeFile.dropped = [...(edgeFile.dropped || []), ...dropped];
const touched = new Set(); for (const e of final) { touched.add(e.topicId); touched.add(e.prerequisiteId); }
edgeFile.stats = { ...edgeFile.stats, dependencies: final.length, byOrigin: tally(final, 'origin'), byStrength: tally(final, 'strength'), droppedForCycle: (edgeFile.dropped || []).filter((d) => d.dropReason === 'cycle').length, isolated: nodes.length - touched.size };
edgeFile.strictAt = new Date().toISOString();
function tally(arr, k) { const o = {}; for (const x of arr) o[x[k]] = (o[x[k]] || 0) + 1; return o; }
fs.writeFileSync(path.join(DIR, '04-edges.json'), JSON.stringify(edgeFile, null, 1));

console.log('✅ 严判据补边完成');
console.log(`  新增 ${added.length} 条 · 环丢 ${dropped.length} · DAG ${final.length} · 孤立点 ${edgeFile.stats.isolated}/${nodes.length}`);
console.log(`  来源 ${JSON.stringify(edgeFile.stats.byOrigin)} · 强度 ${JSON.stringify(edgeFile.stats.byStrength)}`);
console.log(`  失败组 ${failed.length} · tokens ${tokens}`);
console.log('  ⚠ 新边还没审：接着跑 node scripts/cm-audit-full.mjs --phase=edges');
