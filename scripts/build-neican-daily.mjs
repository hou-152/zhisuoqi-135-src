#!/usr/bin/env node
// 「AI 内参」一期的倒推三产物：原文快照 → 三级笔记 → 概念辞典 → AI 费曼示范。
//
// SOP 用法与 260912 期同路数：把 note-taking-pro / concept-learning 的 SKILL.md 正文当 system prompt，
// 不做二次摘要；AI 费曼是内联的一段 SOP（260912 起沿用）。产物写进 knowledge/内参-<期>/。
// 失败就跳过 + 记账，不静默吞掉。
//
// 用法：node scripts/build-neican-daily.mjs --issue 260913 [--concurrency=3] [--force]
// 前置：node scripts/pull-readwise-inbox.mjs --date 2026-09-13
// 产出：三级笔记/<slug>.md · 概念辞典/<slug>.md · AI费曼/<slug>.md · 日报-<期>.md · 编辑日志.md
// 证据等级：实测（LLM 产物为真调用输出，未做人核对，引用前抽查）

import fs from 'node:fs';
import path from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const ARGV = (() => {
  const a = process.argv.slice(2), o = {};
  for (let i = 0; i < a.length; i++) {
    const m = a[i].match(/^--([^=]+)(?:=(.*))?$/);
    if (!m) continue;
    o[m[1]] = m[2] !== undefined ? m[2] : (a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true);
  }
  return o;
})();
const ISSUE = ARGV.issue;
if (!ISSUE) { console.error('用法：node scripts/build-neican-daily.mjs --issue 260913'); process.exit(2); }
const CONC = Number(ARGV.concurrency || 3);
const FORCE = 'force' in ARGV;

const SRC = path.join(ROOT, 'knowledge', `内参-${ISSUE}`);
const ISSUE_JSON = path.join(SRC, 'issue.json');
if (!fs.existsSync(ISSUE_JSON)) { console.error(`❌ 缺 ${path.relative(ROOT, ISSUE_JSON)} —— 先跑 pull-readwise-inbox.mjs`); process.exit(2); }
const issue = JSON.parse(fs.readFileSync(ISSUE_JSON, 'utf8'));
for (const d of ['三级笔记', '概念辞典', 'AI费曼']) fs.mkdirSync(path.join(SRC, d), { recursive: true });

// 凭证：只补未设置的变量（与 serve-135.mjs 同规则），不打印任何值
for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Z_]+)=(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE, LLM_API_KEY, LLM_MODEL } = process.env;
if (!LLM_API_BASE || !LLM_API_KEY || !LLM_MODEL) {
  console.error('❌ LLM 未配置（.private/llm.env 缺 LLM_API_BASE / LLM_API_KEY / LLM_MODEL）');
  process.exit(2);
}

const sop = (name) => fs.readFileSync(path.join(process.env.HOME, '.agents', 'skills', name, 'SKILL.md'), 'utf8')
  .replace(/^---[\s\S]*?---\n/, ''); // 去掉 frontmatter，正文即 SOP
const SOP_NOTES = sop('note-taking-pro');
const SOP_CONCEPTS = sop('concept-learning');
const SOP_FEYNMAN = `你是「费曼示范」环节：把这篇文章讲给一个聪明但不在该领域的外行听。
- 先用两三句大白话说清文章在回答什么问题、答案是什么；
- 再把核心机制讲清，不堆术语，出现术语就用一句话拆掉；
- 给一个日常生活类比；
- 最后指出作者承认的一个边界或代价。
不超过 350 字，中文，markdown，用连贯的话讲，不要列表堆砌。只依据原文，不补外部知识。`;

const readSource = (slug) => {
  const md = fs.readFileSync(path.join(SRC, '原文', slug + '.md'), 'utf8');
  const field = (k) => (md.match(new RegExp(`^- ${k}：(.*)$`, 'm')) || [])[1]?.trim() || '';
  return {
    title: field('标题'), site: field('来源'), url: field('原文'), author: field('作者'),
    summary: field('摘要'), tag: field('类型') || '文章',
    body: md.split(/\n---\n/).slice(1).join('\n---\n').trim(),
  };
};

const calls = [];
// deepseek-flash 是思考型模型：reasoning 会消耗 max_tokens。空 content = 思考吃满预算，
// 处理：max_tokens 给足（32k），空产物翻倍重试（最多 3 次）。—— 与 260912 期同一处理
async function gen(label, { system, user, maxTokens }) {
  let mt = maxTokens, last = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const t0 = Date.now();
    const r = await chatCompletion({ base: LLM_API_BASE, key: LLM_API_KEY, model: LLM_MODEL, temperature: 0.3,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }], maxTokens: mt });
    const empty = r.ok && !String(r.content || '').trim();
    calls.push({ label: label + (attempt > 1 ? `#${attempt}` : ''), ok: r.ok && !empty, tokens: r.tokens || 0,
      ms: Date.now() - t0, model: r.model, note: empty ? `空产物(reasoning吃满${mt})` : '' });
    if (r.ok && !empty) return r.content.trim();
    if (!r.ok) { last = new Error(`${label}: ${r.error} ${r.detail || ''}`); break; }
    last = new Error(`${label}: 空产物（reasoning 吃满 ${mt}）`); mt = Math.min(65536, mt * 2);
  }
  throw last;
}
const cached = (rel) => {
  if (FORCE) return null;
  try { const f = path.join(SRC, rel); return fs.statSync(f).size > 200 ? fs.readFileSync(f, 'utf8').trim() : null; } catch { return null; }
};

async function runOne(item) {
  const src = readSource(item.slug);
  const user = `《${src.title}》\n来源：${src.site}｜作者：${src.author || '未署名'}｜原文：${src.url}\n\n全文如下：\n\n${src.body}`;
  let notes, concepts, feyn;
  try {
    notes = cached(`三级笔记/${item.slug}.md`) || await gen(item.slug + '/三级笔记', { system: SOP_NOTES, user, maxTokens: 32768 });
    concepts = cached(`概念辞典/${item.slug}.md`) || await gen(item.slug + '/概念辞典', { system: SOP_CONCEPTS, user, maxTokens: 32768 });
    feyn = cached(`AI费曼/${item.slug}.md`) || await gen(item.slug + '/AI费曼', { system: SOP_FEYNMAN, user, maxTokens: 8192 });
  } catch (e) {
    return { ...item, ok: false, error: String(e.message || e).slice(0, 200) };
  }
  fs.writeFileSync(path.join(SRC, '三级笔记', item.slug + '.md'), notes + '\n');
  fs.writeFileSync(path.join(SRC, '概念辞典', item.slug + '.md'), concepts + '\n');
  fs.writeFileSync(path.join(SRC, 'AI费曼', item.slug + '.md'), feyn + '\n');
  const gist = (notes.match(/##\s*一句话主旨\s*\n+([^\n]+)/) || [, ''])[1].trim();
  return { ...item, ok: true, url: src.url, gist: gist || feyn.trim().replace(/\s+/g, ' ').slice(0, 60), words: src.body.length };
}

// 并发跑
const results = [];
{ let i = 0;
  const worker = async () => { while (i < issue.items.length) results.push(await runOne(issue.items[i++])); };
  await Promise.all(Array.from({ length: Math.min(CONC, issue.items.length) }, worker));
}
results.sort((a, b) => issue.items.findIndex((x) => x.slug === a.slug) - issue.items.findIndex((x) => x.slug === b.slug));

// ── 组装日报（人读的那份；壳里渲染的是 build-neican.mjs 出的页面数据） ──────
const ok = results.filter((r) => r.ok);
const bad = results.filter((r) => !r.ok);
const totalTokens = calls.reduce((s, c) => s + c.tokens, 0);
const genAt = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });
const fmtMin = (w) => Math.max(1, Math.round(w / 400));

const md = `# AI 内参 · ${ISSUE} 期（${issue.date}）

- **期数**：${ISSUE}（${issue.date} ${issue.weekday}）
- **来源**：${issue.source}
- **流水线**：${issue.pipeline} ｜ 模型 ${LLM_MODEL} ｜ ${totalTokens.toLocaleString()} tokens
- **生成时间**：${genAt}

## 今日导读

${ok.map((r, i) => `${i + 1}. **${r.title}**（${r.site || r.source}）—— ${r.gist}`).join('\n')}

---

${ok.map((r, i) => `## ${i + 1}｜[${r.title}](${r.url})

> ${r.source} ｜ ${r.tag} ｜ 约 ${fmtMin(r.words)} 分钟 ｜ ${r.words.toLocaleString()} 字

**一句话主旨**：${r.gist}

### AI 费曼示范

${fs.readFileSync(path.join(SRC, 'AI费曼', r.slug + '.md'), 'utf8').trim()}

### 三级笔记

${fs.readFileSync(path.join(SRC, '三级笔记', r.slug + '.md'), 'utf8').trim()}

### 概念辞典

${fs.readFileSync(path.join(SRC, '概念辞典', r.slug + '.md'), 'utf8').trim()}

---`).join('\n')}

## 记账

${bad.length ? bad.map((b) => `- ❌ ${b.title} —— ${b.error}`).join('\n') : '- 本期无失败条目'}
`;
fs.writeFileSync(path.join(SRC, `日报-${ISSUE}.md`), md);

const log = [`# ${ISSUE} 期编辑日志（${genAt}）`, '',
  `## 成功 ${ok.length}`,
  ...ok.map((r) => `- ✅ ${r.title}（${r.slug}）原文 ${r.words} 字`),
  `## 跳过/失败 ${bad.length}`,
  ...bad.map((s) => `- ❌ ${s.title} —— ${s.error}`), '',
  `## LLM 调用记录（${calls.length} 次，${totalTokens} tokens）`,
  ...calls.map((c) => `- ${c.label}：${c.ok ? 'ok' : 'FAIL'} ${c.tokens}t ${c.ms}ms ${c.model || ''}${c.note ? ' ⚠' + c.note : ''}`), '',
  `- 证据等级：实测（LLM 产物为真调用输出；未做人核对，引用前抽查）`,
].join('\n');
fs.writeFileSync(path.join(SRC, '编辑日志.md'), log);

console.log(`✅ ${ISSUE} 期三产物完成：${ok.length}/${issue.items.length} 篇 · LLM ${calls.length} 次 / ${totalTokens.toLocaleString()} tokens`);
ok.forEach((r) => console.log(`   · ${r.slug}（${r.words} 字）★ ${r.gist.slice(0, 40)}`));
if (bad.length) console.log(`   ❌ 失败：` + bad.map((b) => b.slug).join('、'));
process.exit(bad.length ? 1 : 0);
