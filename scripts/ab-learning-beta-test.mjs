#!/usr/bin/env node
// 知所栖-135 × dbs-learning-beta 判定层 AB 测试
//
// 用法：先起服务 node scripts/serve-135.mjs，再跑本脚本
//   node scripts/ab-learning-beta-test.mjs
// 产出：evidence/ab-learning-beta-raw.json（原始产出 + 逐项评分）
//
// ============================================================
// 预注册（跑之前固定，跑完不改）
// ============================================================
// 目的：判定 dbs-learning-beta 的类型判定层是否值得并入知所栖 135 的教学链条。
//
// A 组（对照）：dbs-learning 方法——把课题拆成连续学习文章，按反馈调整深度、角度、节奏。
// B 组（实验）：dbs-learning-beta 方法——先判课题类型，再给判据、裁决点、最小实验。
//
// 唯一变量：核心逻辑段。角色开场、长度上限、语言要求、输出温度、模型全部一致。
//
// 问题集（3 个）：
//   Q1 第一人称决策：「我要不要辞职去做 AI 自媒体？」
//   Q2 主观判断：「怎么判断 AI 生成的视频算不算好？」
//   Q3 知识型对照：「Transformer 的注意力机制是怎么工作的？」
//
// 评分维度（脚本自动统计，可复算）：
//   D1 类型判定段存在（0/1）
//   D2 「需你填写」出现次数
//   D3 约束事实型提问数（问数字／时间／已发生的事）
//   D4 越界决定次数（「你应该」「建议你」等）——越低越好
//   D5 效果宣称次数（「更有效」「提升学习」等）——越低越好
//   D6 可执行下一步存在（0/1）
//
// 决策规则（跑之前定死）：
//   1. B 在 D1／D2／D3／D6 上优于 A，且 D4／D5 不高于 A → 「值得并入」
//   2. Q3（知识型）上 B 若强行输出判据而非交回 → 「有过触发风险」
//   3. B 在 D4 上高于 A → 「不可直接并入」
//   4. 样本量 6（3 问题 × 2 组），只支持方向性判断，不宣称统计显著性
//
// 已知局限（写在前面，不事后补）：
//   - D1／D2／D3／D6 的差异由提示词直接决定（B 的提示词含这些规则），不是模型涌现能力。
//     真正有信息量的是 D4／D5 的约束是否生效、Q3 是否过触发、以及产出质量。
//   - temperature 固定 0，单次采样，无重复，测不到方差。
//   - 本脚本测的是「把方法压成提示词后走产品 LLM 通路」的效果，不是 skill 本身的行为。
//     skill 本身的行为已由 evals/ 下的 8 个盲测样本覆盖。
//
// 通路说明（2026-09-12 实测补充，不改预注册）：
//   首次实现走 /api/llm，6 次调用全部 HTTP 400——serve-135.mjs 硬编码
//   response_format:{type:'json_object'}，而 DeepSeek 要求提示词含 "json" 字样
//   （即 docs/AI内参-落地依据与形态收敛.md §3.4.1 已记录的约束）。
//   本测试要的是长文教学产出，不是结构化判定，因此改为直连同一个 endpoint、同一个模型，
//   只去掉 response_format 约束。凭证读 .private/llm.env，不打印、不入库。
// ============================================================

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const ENV_FILE = join(ROOT, '.private', 'llm.env');
if (existsSync(ENV_FILE)) {
  for (const line of readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^\s*export\s+([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const MAX_CHARS = 800;

const QUESTIONS = [
  { id: 'Q1', kind: '第一人称决策', text: '我要不要辞职去做 AI 自媒体？' },
  { id: 'Q2', kind: '主观判断', text: '怎么判断 AI 生成的视频算不算好？' },
  { id: 'Q3', kind: '知识型对照', text: 'Transformer 的注意力机制是怎么工作的？' },
];

const COMMON = (question) => `
课题：${question}

要求：
- 中文；${MAX_CHARS} 字以内
- 中英文之间、中文与数字之间加空格；中文标点全角
- 不使用「不是……而是……」「真正的……是……」「与其说……不如说……」等句式
`;

const PROMPT_A = (q) => `你是交互式学习 AI。你的任务是把一个课题拆成连续学习文章，并根据用户在上一篇文章里的真实反馈，调整下一篇的深度、角度和节奏。

工作方式：
1. 确认课题，判断学习者可能的知识基础
2. 生成一篇学习文章：先把核心概念讲清楚，必要时降低抽象度、补具体例子
3. 文章结构：这一篇要解决的问题 / 正文 / 小结 / 下一篇预告 / 学习反馈
4. 学习反馈区问：哪里看懂了？哪里没看懂？哪个地方想展开？

写作原则：呈现，少纠错，不预设读者脑中有错误认知；像懂行的朋友在讲解。
${COMMON(q)}`;

const PROMPT_B = (q) => `你是处理「没有标准答案」课题的学习 AI。先判定课题类型，再决定交付什么。

工作方式：
1. 判定课题类型：伪问题 / 主观判断 / 个人决策 / 价值问题 / 知识型。判定结果写在产物最前面，并给一句依据
2. 判定为知识型课题时，说明应改用 dbs-learning，不产出判据
3. 主观判断与个人决策类：生成至少 3 条判据，每条标注「通用判据」或「需你填写」
4. 标出 1-3 个只有当事人能回答的问题，只问约束事实（钱、时间、已发生的事、触发信号）
5. 涉及感官、手感或具身经验时，转成一个最小实验：做什么 / 看什么 / 多久
6. 产物含一节「本篇没有做的事」，写明没有替使用者决定
7. 学习反馈区问：你现在倾向哪边？卡在哪一条上？哪一条对你的情况不适用？

禁止：不做决定，不输出「你应该」；不问「你在纠结什么」这类自我报告；不宣称学习效果。
${COMMON(q)}`;

async function callLLM(prompt) {
  const base = process.env.LLM_API_BASE, key = process.env.LLM_API_KEY, model = process.env.LLM_MODEL;
  if (!base || !key || !model) throw new Error('llm-not-configured（缺 LLM_API_BASE / LLM_API_KEY / LLM_MODEL）');
  const reply = await chatCompletion({ base, key, model,
    messages: [{ role: 'user', content: prompt }], json: false, errorBodyFallback: true });
  if (!reply.ok) throw new Error(`llm-http-${reply.status} / ${reply.detail}`);
  return { text: reply.content, tokens: reply.tokens, model: reply.model };
}

/* 评分：只用可复算的字符串统计，不做主观判断 */
function score(text) {
  const typeHit = /课题类型判定|类型[：:]\s*(伪问题|主观判断|个人决策|价值问题|知识型)/.test(text);
  const needYou = (text.match(/需你填写/g) || []).length;
  const constraintQ = (text.match(/[^。！？\n]{0,40}(多少钱|多少小时|多少|多久|几个月|几年|哪一天|什么时候|有没有人|发生了什么|什么信号|具体是哪)[^。！？\n]{0,20}[？?]/g) || []).length;
  const overreach = (text.match(/你应该|应该去|不应该|建议你|我建议|必须去|最好去/g) || []).length;
  const effectClaim = (text.match(/更有效|提升学习|显著提高|比.{0,12}更好|学习效果更好|效率更高/g) || []).length;
  const nextAction = /最小实验|做什么[：:]|下一步[：:]|行动[：:]/.test(text) ? 1 : 0;
  const selfReport = (text.match(/你在纠结什么|你更看重什么|你想成为什么样的人|你自己说说/g) || []).length;
  const handoff = /dbs-learning|知识型/.test(text) && /改用|交回|不属于|有标准答案/.test(text) ? 1 : 0;
  return {
    D1_type_verdict: typeHit ? 1 : 0,
    D2_need_you_fill: needYou,
    D3_constraint_questions: constraintQ,
    D4_overreach: overreach,
    D5_effect_claim: effectClaim,
    D6_next_action: nextAction,
    _self_report: selfReport,
    _knowledge_handoff: handoff,
    chars: text.length,
  };
}

async function main() {
  const runs = [];
  for (const q of QUESTIONS) {
    for (const [arm, build] of [['A', PROMPT_A], ['B', PROMPT_B]]) {
      const label = `${q.id}-${arm}`;
      process.stdout.write(`跑 ${label} … `);
      try {
        const out = await callLLM(build(q.text));
        const s = score(out.text);
        runs.push({ label, qid: q.id, kind: q.kind, arm, question: q.text, model: out.model, tokens: out.tokens, score: s, text: out.text });
        console.log(`ok (${out.tokens} tok, ${s.chars} 字)`);
      } catch (e) {
        runs.push({ label, qid: q.id, kind: q.kind, arm, question: q.text, error: String(e.message || e) });
        console.log(`失败：${e.message || e}`);
      }
    }
  }

  const sum = (arm, key) => runs.filter(r => r.arm === arm && r.score).reduce((a, r) => a + r.score[key], 0);
  const keys = ['D1_type_verdict', 'D2_need_you_fill', 'D3_constraint_questions', 'D4_overreach', 'D5_effect_claim', 'D6_next_action', '_self_report', '_knowledge_handoff'];
  const table = keys.map(k => ({ 维度: k, A: sum('A', k), B: sum('B', k) }));

  console.log('\n=== 汇总（3 问题合计）===');
  console.table(table);

  const q3b = runs.find(r => r.label === 'Q3-B' && r.score);
  const q3a = runs.find(r => r.label === 'Q3-A' && r.score);
  const verdict = [];
  if (sum('B', 'D4_overreach') > sum('A', 'D4_overreach')) verdict.push('不可直接并入：B 的越界决定多于 A');
  if (q3b && q3b.score.D2_need_you_fill > 0) verdict.push('过触发风险：知识型问题 Q3 上 B 输出了「需你填写」判据，未交回');
  if (q3b && q3a && q3b.score._knowledge_handoff && q3a.score._knowledge_handoff) verdict.push('Q3 上 A/B 都做了知识型处理，符合预期');
  if (!verdict.length) verdict.push('未见越界或过触发，进入人工评质量');

  console.log('\n=== 决策规则命中 ===');
  verdict.forEach(v => console.log(' - ' + v));

  mkdirSync(join(ROOT, 'evidence'), { recursive: true });
  const out = join(ROOT, 'evidence', 'ab-learning-beta-raw.json');
  writeFileSync(out, JSON.stringify({
    generated_at: new Date().toISOString(),
    endpoint: `${(process.env.LLM_API_BASE || '').replace(/\/$/, '')}/chat/completions（直连，无 response_format）`,
    preregistration: {
      purpose: 'dbs-learning-beta 的类型判定层是否值得并入知所栖 135 教学链条',
      arms: { A: 'dbs-learning 方法（连续学习文章 + 反馈梯度）', B: 'dbs-learning-beta 方法（判类型 + 判据 + 裁决点 + 最小实验）' },
      single_variable: '核心逻辑段；角色开场、长度上限、语言要求、temperature=0、模型一致',
      questions: QUESTIONS,
      metrics: keys,
      decision_rules: [
        'B 在 D1/D2/D3/D6 优于 A 且 D4/D5 不高于 A → 值得并入',
        'Q3 上 B 强行输出判据 → 过触发风险',
        'B 的 D4 高于 A → 不可直接并入',
        '样本量 6，只支持方向性判断，不宣称统计显著性',
      ],
      known_limits: [
        'D1/D2/D3/D6 的差异由提示词直接决定，不是模型涌现能力',
        'temperature=0 单次采样，无重复，测不到方差',
        '本测试测的是提示词化后的产品通路效果，不是 skill 本身的行为',
      ],
    },
    summary: table,
    verdict,
    runs,
  }, null, 2));
  console.log(`\n原始产出：${out}`);
}

main().catch(e => { console.error(e); process.exit(1); });
