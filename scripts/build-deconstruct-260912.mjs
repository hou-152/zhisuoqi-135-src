#!/usr/bin/env node
// 五维拆解（260912 期）：三级笔记 + 概念提取之后，把每篇拆成 135 通路素材——
// 3 概念 / 1 阅读梯度 / 3 决策案例 / 5 实验 / 费曼验收要点。
// 输入：knowledge/内参-260912/ 已有产物（三级笔记·概念辞典·AI费曼·原文，只读）
// 输出：knowledge/内参-260912/拆解五维/<slug>.md + .json
// LLM：DeepSeek（json 模式，含 "json" 字样满足其约束）；空产物翻倍重试 3 次。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = path.join(ROOT, 'knowledge', '内参-260912');
const OUT = path.join(BASE, '拆解五维');
fs.mkdirSync(OUT, { recursive: true });

for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Z_]+)=(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE, LLM_API_KEY, LLM_MODEL } = process.env;
if (!LLM_API_BASE || !LLM_API_KEY || !LLM_MODEL) { console.error('❌ LLM 未配置'); process.exit(2); }

const SOP = `你是「知所栖 135」学习通路的设计者。输入是一篇文章的原文与已有产物（三级笔记、概念辞典、AI 费曼示范）。你的任务：把它拆解成五个语义维度，串起 1 阅读 → 3 决策 → 5 实验 → 费曼验收。只依据给定材料，不引入外部知识，不编造材料里没有的支撑。

只输出一个 JSON 对象（本段即要求输出 json，不要输出其它文字）：
{
 "concepts":   [{"name":"概念名","points":["要点1","要点2"]}],
 "reading":    {"hook":"一句话钩子：为什么值得读","ladder":[{"level":"直觉","text":""},{"level":"机制","text":""},{"level":"边界","text":""}]},
 "decisions":  [{"situation":"读者可能遇到的真实情境","choice":"这篇文章支持的做法","condition":"适用条件/何时不适用"}],
 "experiments":[{"do":"动手做什么","observe":"观察什么","conclude":"验证什么结论"}],
 "feynman":    {"demo":"AI 费曼示范一段话（≤120字）","rubric":[{"concept":"概念名","points":["讲到才算过的要点1","要点2"]}]}
}

硬规则：
- concepts：恰好 3 个，从材料的概念辞典里挑最承重的三个，每个 2-3 条要点，要点必须能在材料正文找到支撑。
- reading.ladder：恰好 3 层（直觉→机制→边界），对应 dbs-learning 三层梯度：先直觉后细节，边界层说清何时不成立。
- decisions：恰好 3 个，情境必须可迁移到读者自己的工作/学习，不给唯一正确答案，condition 写清适用条件。
- experiments：恰好 5 个，必须可动手（改参数/做对照/复现/写结论），其中至少 2 个不依赖任何付费工具。
- feynman.rubric：3 个概念各 2-3 条「讲到才算过」的判定要点，供费曼验收引擎用，措辞不直接泄露给学习者。
- 全部中文。`;

const calls = [];
async function gen(slug) {
  const read = (p) => fs.readFileSync(path.join(BASE, p, slug + '.md'), 'utf8').trim();
  const user = `# 原文（节选头 6000 字）\n${read('原文').slice(0, 6000)}\n\n# 三级笔记\n${read('三级笔记')}\n\n# 概念辞典\n${read('概念辞典').slice(0, 12000)}\n\n# AI 费曼示范\n${read('AI费曼')}`;
  let mt = 8192, last = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const t0 = Date.now();
    const r = await chatCompletion({ base: LLM_API_BASE, key: LLM_API_KEY, model: LLM_MODEL, temperature: 0.3,
      messages: [{ role: 'system', content: SOP }, { role: 'user', content: user }], maxTokens: mt, json: true });
    const empty = r.ok && !String(r.content || '').trim();
    calls.push({ label: slug + (attempt > 1 ? `#${attempt}` : ''), ok: r.ok && !empty, tokens: r.tokens || 0, ms: Date.now() - t0, note: empty ? `空产物(reasoning吃满${mt})` : '' });
    if (r.ok && !empty) {
      try {
        return JSON.parse(r.content.trim().replace(/^```(?:json)?\s*|\s*```$/g, ''));
      } catch (e) {
        calls.push({ label: slug + `/JSON解析失败#${attempt}`, ok: false, tokens: 0, ms: 0, note: String(e.message).slice(0, 80) });
        last = e; mt = Math.min(32768, mt * 2); continue; // 模型 JSON 拼写错误 → 重试
      }
    }
    if (!r.ok) { last = new Error(`${slug}: ${r.error} ${(r.detail || '').slice(0, 150)}`); break; }
    last = new Error(`${slug}: 空产物`); mt = Math.min(32768, mt * 2);
  }
  throw last;
}

const mdOf = (slug, d) => {
  const li = (a, f) => a.map(f).join('\n');
  return `# 五维拆解 · ${slug}

## ① 概念 ×3
${li(d.concepts, c => `- **${c.name}**：${c.points.join('；')}`)}

## ② 阅读 ×1（三层梯度）
> ${d.reading.hook}

- **直觉**：${d.reading.ladder[0]?.text || ''}
- **机制**：${d.reading.ladder[1]?.text || ''}
- **边界**：${d.reading.ladder[2]?.text || ''}

## ③ 决策 ×3
${li(d.decisions, x => `- **情境**：${x.situation}\n  - 做法：${x.choice}\n  - 适用条件：${x.condition}`)}

## ④ 实验 ×5
${li(d.experiments, (x, i) => `${i + 1}. **做**：${x.do}\n   - 观察：${x.observe}\n   - 结论：${x.conclude}`)}

## ⑤ 费曼验收
**AI 示范**：${d.feynman.demo}

**判定要点**（引擎用）：
${li(d.feynman.rubric, r => `- ${r.concept}：${r.points.join('；')}`)}
`;
};

const slugs = fs.readdirSync(path.join(BASE, '三级笔记')).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
const fails = [];
let done = 0;
const queue = [...slugs];
const worker = async () => {
  while (queue.length) {
    const slug = queue.shift();
    try {
      JSON.parse(fs.readFileSync(path.join(OUT, slug + '.json'), 'utf8'));
      done++; continue; // 已有产物跳过（断点重跑）
    } catch { /* 不存在则生成 */ }
    try {
      const d = await gen(slug);
      for (const [k, n] of [['concepts', 3], ['decisions', 3], ['experiments', 5]]) {
        if (!Array.isArray(d[k]) || d[k].length !== n) throw new Error(`${slug}: ${k} 数量=${d[k]?.length}，应为 ${n}`);
      }
      if (!d.reading?.ladder || d.reading.ladder.length !== 3) throw new Error(`${slug}: reading.ladder 应为 3 层`);
      if (!d.feynman?.rubric?.length) throw new Error(`${slug}: feynman.rubric 缺失`);
      fs.writeFileSync(path.join(OUT, slug + '.json'), JSON.stringify(d, null, 1) + '\n');
      fs.writeFileSync(path.join(OUT, slug + '.md'), mdOf(slug, d));
      done++;
      console.log(`  [${done}/${slugs.length}] ✅ ${slug}（概念${d.concepts.length}/决策${d.decisions.length}/实验${d.experiments.length}）`);
    } catch (e) {
      fails.push(String(e.message || e).slice(0, 200));
      done++;
      console.log(`  [${done}/${slugs.length}] ❌ ${e.message}`);
    }
  }
};
await Promise.all([worker(), worker(), worker()]);

const totalTokens = calls.reduce((s, c) => s + c.tokens, 0);
fs.appendFileSync(path.join(OUT, '拆解日志.md'), `# 五维拆解日志 · ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })}\n` +
  `- 成功 ${slugs.length - fails.length}/${slugs.length}，${totalTokens} tokens\n` +
  (fails.length ? `- 失败：\n${fails.map(f => `  - ${f}`).join('\n')}\n` : '') +
  `- 证据等级：实测（真 LLM 输出，结构校验通过；内容未人工复核）\n\n`);

console.log(fails.length ? `❌ ${fails.length} 篇失败` : `✅ 五维拆解完成：${slugs.length} 篇 → ${path.relative(ROOT, OUT)}（${totalTokens} tokens）`);
process.exit(fails.length ? 1 : 0);
