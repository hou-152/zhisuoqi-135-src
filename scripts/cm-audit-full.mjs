#!/usr/bin/env node
// 概念地图 v2 · 全量审核：把 1156 个概念和 892 条依赖边逐条送审，拿到可执行的修改指令。
//
// 与 cm-audit.mjs（抽样、出报告给人看）的分工：
//   这个脚本不写给人看的报告，它产出**可机械应用的判决**（06-audit-full.json），
//   交给 cm-apply-audit.mjs 落到 03-enriched.json / 04-edges.json 上。
//
// 用法：node scripts/cm-audit-full.mjs [--concurrency=6] [--phase=concepts|edges|both]
//       [--candidate=04-edges-remine.json]
// 产出：evidence/cm-260913/06-audit-full.json，或候选对应的 06-audit-remine.json

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAP = path.join(ROOT, 'knowledge', '概念地图-260913');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const CACHE = path.join(ROOT, 'evidence', '.cm-audit-full-cache.json');
const ARGV = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const CONC = Number(ARGV.concurrency || 6);
const PHASE = ARGV.phase || 'both';
const CANDIDATE_FILE = ARGV.candidate || '';

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

const topicsAll = JSON.parse(fs.readFileSync(path.join(MAP, 'topics.json'), 'utf8')).topics;
const candidate = CANDIDATE_FILE
  ? JSON.parse(fs.readFileSync(path.join(DIR, CANDIDATE_FILE), 'utf8'))
  : null;
const depsAll = candidate
  ? candidate.candidates
  : JSON.parse(fs.readFileSync(path.join(MAP, 'dependencies.json'), 'utf8')).dependencies;
const clusters = JSON.parse(fs.readFileSync(path.join(MAP, 'clusters.json'), 'utf8')).clusters;
const byId = new Map(topicsAll.map((t) => [t.id, t]));
const labelOf = new Map(clusters.map((c) => [c.id, c.label]));
const chunk = (a, n) => { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; };

// 分阶段跑时读回已有结果再合并，别把上一阶段审过的覆盖掉（2026-09-13 踩过：--phase=edges 把概念判决冲没了）
const auditOut = candidate ? '06-audit-remine.json' : '06-audit-full.json';
let prev = {};
try { prev = JSON.parse(fs.readFileSync(path.join(DIR, auditOut), 'utf8')); } catch { prev = {}; }
const out = { generatedAt: new Date().toISOString(), model: MODEL, concepts: prev.concepts || {}, edges: prev.edges || {} };

/* ── 概念全审 ───────────────────────────────────────────── */
if (PHASE === 'concepts' || PHASE === 'both') {
  const domains = clusters.map((c) => `${c.id} = ${c.label}`).join('\n');
  const SYS = '你是概念地图的审核员。只挑刺，不给安慰分。只输出 JSON。';
  const batches = chunk(topicsAll, 10);
  let done = 0, failed = [];
  let cur = 0;
  const worker = async () => {
    while (cur < batches.length) {
      const bi = cur++;
      const batch = batches[bi];
      const body = batch.map((t, i) => `[${i}] 概念：${t.name}${t.nameEn ? `（${t.nameEn}）` : ''}
现在判定 → 领域：${t.domain} ｜ 类型：${t.type} ｜ 验收方式：${t.verification}
地图给的定义：${t.description}
原文材料：${(t.sourceContext || t.feynman || '（无）').slice(0, 480)}`).join('\n\n');
      const prompt = `逐条审核下面 ${batch.length} 个概念。每条你要给出**可直接执行的修改指令**（不用改就留空字符串）。

判定口径：
- faithful：地图给的定义有没有原文支持。supported=原文说得到 / overstated=原文没那么强，定义夸大了 / wrong=与原文矛盾或是编的 / nosource=没有原文可核
- 定义字数上限 60 字，只保留原文支持得住的部分

领域闭集（domain_fix 只能取这里的 id，判对就留空）：
${domains}

类型闭集（type_fix）：CONCEPTUAL 观念/机制/现象/判据 ｜ PROCEDURAL 可照做的步骤 ｜ REPRESENTATIONAL 具名产品/文件/格式/框架 ｜ LANGUAGE 术语约定/命名 ｜ META 元层面
验收闭集（verify_fix）：compute=能算/能跑出结果 ｜ judge=能判断对错好坏 ｜ use=能拿去用 ｜ accept=只能认（事实、约定、立场、他人经验）。注意：学习者做不到的事不要判 compute/use

**特别检查 verify**：这条概念的验收方式，一个普通学习者真的做得到吗？做不到就改成 judge 或 accept。

输出 JSON：{"items":[{"i":序号,
 "faithful":"supported|overstated|wrong|nosource",
 "desc_fix":"仅当 overstated/wrong 时给：按原文重写的一句话定义（≤60字）；否则空字符串",
 "domain_fix":"判错才填 id，否则空字符串",
 "type_fix":"判错才填枚举，否则空字符串",
 "verify_fix":"判错才填枚举，否则空字符串",
 "issue":"一句话说哪里不对，没问题写空字符串"}]}

${body}`;
      try {
        const r = await askJson(SYS, prompt, { key: `full-c-${bi}-${batch.map((t) => t.id).join(',')}`, maxTokens: 24000 });
        for (const it of r.items || []) {
          const t = batch[Number(it.i)];
          if (t) out.concepts[t.id] = it;
        }
        done++;
        if (done % 10 === 0) console.log(`  概念 ${done}/${batches.length}（tokens ${tokens}）`);
      } catch (e) { failed.push({ bi, err: String(e.message).slice(0, 140) }); }
    }
  };
  console.log(`概念全审：${topicsAll.length} 条 → ${batches.length} 组 · 并发 ${CONC}`);
  await Promise.all(Array.from({ length: CONC }, worker));
  out.conceptFailed = failed;
  const v = {};
  for (const r of Object.values(out.concepts)) v[r.faithful] = (v[r.faithful] || 0) + 1;
  console.log(`  概念审完 ${Object.keys(out.concepts).length}/${topicsAll.length} · ${JSON.stringify(v)} · 失败 ${failed.length}`);
}

/* ── 依赖边全审 ─────────────────────────────────────────── */
if (PHASE === 'edges' || PHASE === 'both') {
  const SYS = '你是概念依赖关系的审核员。只挑刺。只输出 JSON。';
  const batches = chunk(depsAll, 10);
  let done = 0; const failed = [];
  let cur = 0;
  const worker = async () => {
    while (cur < batches.length) {
      const bi = cur++;
      const batch = batches[bi];
      const body = batch.map((d, i) => {
        const a = byId.get(d.topicId); const b = byId.get(d.prerequisiteId);
        return `[${i}] 「${a.name}」依赖「${b.name}」（当前强度 ${d.strength}）
${a.name}：${a.description}
${b.name}：${b.description}
地图给的理由：${d.reason}`;
      }).join('\n\n');
      const prompt = `逐条判下面 ${batch.length} 条前置依赖边。

判据：**不懂「前置」，是不是就真的没法懂「依赖方」？**
- yes：不通前置，依赖方根本立不住（定义依赖 / 组成依赖 / 机制依赖）
- weak：懂前置会更好懂，但不懂也能立住 → 应该降成 soft 或踢出依赖图
- no：其实不构成依赖（只是相关、只是例子、只是可选组件）
- reversed：方向反了（其实是「前置」依赖「依赖方」）

判成 yes 时还要说这条算 hard 还是 soft：
- hard：定义/机制上离不开
- soft：有帮助但非必需

输出 JSON：{"items":[{"i":序号,"holds":"yes|weak|no|reversed","strength":"hard|soft","issue":"一句话说哪里不对，没问题写空"}]}

${body}`;
      try {
        const r = await askJson(SYS, prompt, { key: `${candidate ? 'remine' : 'full'}-e-${bi}-${batch.map((d) => d.topicId + d.prerequisiteId).join(',')}`, maxTokens: 24000 });
        for (const it of r.items || []) {
          const d = batch[Number(it.i)];
          if (d) out.edges[d.topicId + '->' + d.prerequisiteId] = it;
        }
        done++;
        if (done % 10 === 0) console.log(`  边 ${done}/${batches.length}（tokens ${tokens}）`);
      } catch (e) { failed.push({ bi, err: String(e.message).slice(0, 140) }); }
    }
  };
  console.log(`${candidate ? '候选边' : '边'}全审：${depsAll.length} 条 → ${batches.length} 组 · 并发 ${CONC}`);
  await Promise.all(Array.from({ length: CONC }, worker));
  out.edgeFailed = failed;
  const v = {};
  for (const r of Object.values(out.edges)) v[r.holds] = (v[r.holds] || 0) + 1;
  console.log(`  边审完 ${Object.keys(out.edges).length}/${depsAll.length} · ${JSON.stringify(v)} · 失败 ${failed.length}`);
}

out.tokens = tokens;
out.candidate = CANDIDATE_FILE || null;
fs.writeFileSync(path.join(DIR, auditOut), JSON.stringify(out, null, 1));
console.log(`✅ ${candidate ? '候选边' : '全量'}审核完成 · tokens ${tokens} → evidence/cm-260913/${auditOut}`);
