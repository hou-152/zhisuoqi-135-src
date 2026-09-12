#!/usr/bin/env node
// 录三条真 LLM 对话，烘进公网版当「没带 key 时的回放」。
// 为什么要这个：公网版没有服务端，评委不会自带 DeepSeek key。
// 没 key 时给一段**真跑出来的**对话，并**明说这是录制回放**——不假装是实时回答。
//
// 前置：node scripts/serve-135.mjs 在跑
// 输出：evidence/公网版-录制回放-20260912.json

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'evidence', '公网版-录制回放-20260912.json');
const ENDPOINT = process.env.LLM_ENDPOINT || 'http://127.0.0.1:5180/api/llm';

const TAKES = [
  { id: 'r1', skill: '135 学习闭环', file: null, q: '我想学 Transformer 的注意力机制，从哪开始？' },
  { id: 'r2', skill: 'dbs-learning-beta', file: 'dbs-learning-beta', q: '我要不要辞掉现在的工作，全职去做独立开发？' },
  { id: 'r3', skill: 'dbs-standard-answer', file: 'dbs-standard-answer', q: '小团队到底该不该自建大模型推理，而不是调 API？' },
];

// 「135 学习闭环」是本项目自有的，没有 SKILL.md；system prompt 与壳里内置的那份逐字一致。
const SYS135 = '你是「知所栖 135」的学习编排器。固定顺序，不许跳步、不许替学习者决定：'
  + '① 1 阅读器 = 给 3 个概念，每个给三层梯度（L1 直觉 / L2 机制 / L3 应用）；'
  + '② 3 决策场 = 先让学习者自己选，再给真实案例与「条件 → 路线」表；'
  + '③ 5 实验台 = 一个 5 分钟能做的最小实验，必须让他动手判断；'
  + '④ 费曼验收 = 让他用自己的话复述，逐点查漏，漏哪倒回哪。'
  + '用户说想学什么时，你只做第 ① 步，给完 3 个概念就停，等他反馈。不要一次给完四步。';

const out = { meta: { generatedAt: new Date().toISOString(), endpoint: ENDPOINT }, takes: [] };

for (const t of TAKES) {
  process.stdout.write(`录 ${t.skill} … `);
  const body = t.file
    ? { json: false, skill: t.file, messages: [{ role: 'user', content: t.q }] }
    : { json: false, messages: [{ role: 'system', content: SYS135 }, { role: 'user', content: t.q }] };
  const r = await fetch(ENDPOINT, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const j = await r.json();
  if (j.error) { console.log('失败：' + j.error + ' ' + (j.detail || '')); process.exit(1); }
  out.takes.push({ id: t.id, skill: t.skill, file: t.file, q: t.q, a: j.content, tokens: j.tokens, model: j.model });
  console.log(`${(j.content || '').length} 字 · ${j.tokens} tokens`);
}

fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log('输出 ' + path.relative(ROOT, OUT));
