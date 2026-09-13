#!/usr/bin/env node
// 只读体检：把「概念地图 v2」里 origin 含 context 的概念逐条重新判一遍 AI 相关性。
// 不写任何数据文件（只落一份报告到 evidence/），不改地图、不删概念。
//
// 用法：node scripts/cm-audit-context-ai.mjs [--concurrency=4] [--all]
//   --all 时判全部 936 条，默认只判 context 源的 315 条。

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAP = path.join(ROOT, 'knowledge', '概念地图-260913', 'topics.json');
const OUT = path.join(ROOT, 'evidence', 'cm-260913', '09-context-ai-audit.json');
const ARGV = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const CONC = Number(ARGV.concurrency || 4);
const ALL = 'all' in ARGV;

for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE: BASE, LLM_API_KEY: KEY, LLM_MODEL: MODEL } = process.env;
if (!BASE || !KEY || !MODEL) { console.error('缺少 LLM 凭证（.private/llm.env）'); process.exit(2); }

const topics = JSON.parse(fs.readFileSync(MAP, 'utf8')).topics;
const nodes = ALL ? topics : topics.filter((t) => (t.origin || '').includes('context'));
const chunk = (a, n) => { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; };
const batches = chunk(nodes, 25);
console.log(`AI 相关性复判（只读）：${nodes.length} 条 → ${batches.length} 组 · 并发 ${CONC}`);

let tokens = 0;
const verdicts = {};
let cur = 0; let done = 0; const failed = [];

const worker = async () => {
  while (cur < batches.length) {
    const bi = cur++;
    const batch = batches[bi];
    const body = batch.map((n, i) => `[${i}] ${n.name}${n.nameEn ? `（${n.nameEn}）` : ''} — ${n.description || ''}`).join('\n');
    const prompt = `下面是一个「AI 知识体系」概念库里的 ${batch.length} 个概念。请逐条判：**它是不是在讲 AI？**

keep 的标准（满足任一）：
- 讲 AI / LLM / agent / 模型本身的能力、原理、限制、训练、评测
- 讲上下文工程或 harness 工程：上下文、记忆、工具、循环、沙箱、权限、验证、多 agent 编排
- 讲 AI 产品、AI 组织与岗位、AI 商业模式与经济、AI 安全与治理、AI 监管
- 讲「人怎么和 AI 协作」「人该怎么用 AI 做事」

drop 的标准（满足任一且不满足上面任何一条）：
- 纯医学、临床、生物、生理
- 纯心理学 / 神经科学（与 AI 认知无关）
- 纯个人生活、关系、健康
- 纯法律条文、社会制度、地缘政治（与 AI 监管无关）
- 纯文化、娱乐、音乐、影视（与 AI 内容生产无关）
- 传统商业 / 经济 / 投资（与 AI 产业无关）
- 航空 / 天文 / 材料 / 物理等纯自然科学

拿不准就 keep。

概念清单：
${body}

输出 JSON：{"items":[{"i":序号,"ai":"keep|drop","why":"≤15字"}]}`;
    for (const budget of [16000, 32000]) {
      const reply = await chatCompletion({ base: BASE, key: KEY, model: MODEL, json: true, maxTokens: budget,
        messages: [{ role: 'system', content: '你是概念库的筛选员。只输出 JSON，不解释。' }, { role: 'user', content: prompt }] });
      if (!reply.ok) { failed.push({ bi, err: `HTTP ${reply.status}` }); break; }
      tokens += reply.tokens || 0;
      let parsed = null;
      try { parsed = JSON.parse((reply.content || '').trim()); } catch { parsed = null; }
      if (!parsed) { if (budget === 32000) failed.push({ bi, err: 'JSON 解析失败' }); continue; }
      for (const it of parsed.items || []) {
        const n = batch[Number(it.i)];
        if (n) verdicts[n.id] = { ai: it.ai === 'drop' ? 'drop' : 'keep', why: String(it.why || '').slice(0, 40) };
      }
      done++;
      if (done % 4 === 0) console.log(`  …${done}/${batches.length} 组（tokens ${tokens}）`);
      break;
    }
  }
};
await Promise.all(Array.from({ length: CONC }, worker));

const dropped = nodes.filter((n) => verdicts[n.id]?.ai === 'drop');
const undecided = nodes.filter((n) => !verdicts[n.id]);
const out = {
  generatedAt: new Date().toISOString(), model: MODEL, scope: ALL ? 'all' : 'origin~context', tokens,
  total: nodes.length, keep: nodes.length - dropped.length - undecided.length, drop: dropped.length,
  undecided: undecided.length, failed,
  droppedList: dropped.map((n) => ({ id: n.id, name: n.name, origin: n.origin, domain: n.domain, why: verdicts[n.id].why })),
  verdicts,
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log(`\n判 drop ${dropped.length} · undecided ${undecided.length} · tokens ${tokens}`);
console.log('drop 清单：');
for (const d of out.droppedList) console.log(`  ${d.id}  ${d.name}  [${d.origin} · ${d.domain}]  ${d.why}`);
console.log(`\n报告：${path.relative(ROOT, OUT)}（未改任何数据）`);
