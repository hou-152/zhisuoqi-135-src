#!/usr/bin/env node
// 260912 期 AI 内参日报：今日 Readwise 精选 → 倒推三产物 → 日报。
// SOP 用法与壳的 Agent 卡片同一路数：把 note-taking-pro / concept-learning 的
// SKILL.md 原文当 system prompt，不做二次摘要。失败就跳过 + 记账（内参编辑 SOP）。
// 输入快照：/tmp/daily260912/（Reader html_content 与直抓原文）
// 输出：knowledge/内参-260912/（原文存档 + 三产物 + 日报 md/html + 编辑日志）

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = '/tmp/daily260912';
const OUT = path.join(ROOT, 'knowledge', '内参-260912');
for (const d of ['原文', '三级笔记', '概念辞典', 'AI费曼']) fs.mkdirSync(path.join(OUT, d), { recursive: true });

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

const readText = (id) => fs.readFileSync(path.join(SRC, 'text', id + '.txt'), 'utf8').trim();
const meta = (id) => JSON.parse(fs.readFileSync(path.join(SRC, id + '.json'), 'utf8'));

const ITEMS = [
  {
    slug: 'agent-skills-api', id: '01m2axmf', source: 'platform.claude.com',
    title: 'Using Agent Skills with the API（用 API 使用 Agent Skills）', tag: '概念文',
  },
  {
    slug: 'openai-habitat-storage', id: '01m2axg2', source: 'openai.com',
    title: 'Rapidly scaling online storage to serve over 1 billion ChatGPT users（存储平台 Habitat 的扩容复盘）', tag: '工程复盘',
  },
  {
    slug: 'baoyu-ai-native-workflow', id: '01m2ay2n', source: 'baoyu.io',
    title: '我的 AI 原生开发流程：一个真实案例的完整复盘', tag: '实践复盘',
  },
  {
    slug: 'linear-principles', id: '01m2axt1', source: 'linear.app',
    title: '原则与实践（Linear 的产品原则）', tag: '观点文',
  },
  {
    slug: 'agent-skills-lesson-1', id: '01m2axjd', source: 'academy.claude.com',
    title: 'Claude 官方课程 · 第 1 课：什么是 Agent Skills', tag: '课程',
  },
  {
    slug: 'agent-skills-lesson-2', id: '01m2axjx', source: 'academy.claude.com',
    title: 'Claude 官方课程 · 第 2 课：技能的结构（SKILL.md 与 frontmatter）', tag: '课程',
  },
  {
    slug: 'agent-skills-lesson-3', id: '01m2axkm', source: 'academy.claude.com',
    title: 'Claude 官方课程 · 第 3 课：写好 name 与 description', tag: '课程',
  },
  {
    slug: 'agent-skills-vs-features', id: '01m2axkr', source: 'academy.claude.com',
    title: 'Claude 官方课程 · Skills 与其他 Claude Code 功能的比较', tag: '课程',
  },
  {
    slug: 'agent-skills-lesson-5', id: '01m2axkv', source: 'academy.claude.com',
    title: 'Claude 官方课程 · 第 5 课：技能的分发与共享', tag: '课程',
  },
  {
    slug: 'agent-skills-lesson-6', id: '01m2axky', source: 'academy.claude.com',
    title: 'Claude 官方课程 · 第 6 课：技能排障', tag: '课程',
  },
];
const SKIPPED = [
  { title: 'The Information（Just a moment...）', reason: 'Cloudflare 反爬，Reader 与直抓均无正文（41 字）', source: 'theinformation.com' },
];

const calls = [];
// deepseek-flash 是思考型模型：reasoning 会消耗 max_tokens。空 content = 思考吃满预算，
// 处理：max_tokens 给足（32k），空产物翻倍重试（最多 3 次）。
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
const cached = (rel) => { try { const f = path.join(OUT, rel); return fs.statSync(f).size > 200 ? fs.readFileSync(f, 'utf8').trim() : null; } catch { return null; } };

async function runOne(item, conc) {
  const m = meta(item.id);
  const text = readText(item.id);
  const url = m.source_url;
  const user = `《${item.title}》\n来源：${item.source}｜作者：${m.author || '未署名'}｜原文：${url}\n\n全文如下：\n\n${text}`;

  let notes, concepts, feyn;
  try {
    notes = cached(`三级笔记/${item.slug}.md`) || await gen(item.slug + '/三级笔记', { system: SOP_NOTES, user, maxTokens: 32768 });
    concepts = cached(`概念辞典/${item.slug}.md`) || await gen(item.slug + '/概念辞典', { system: SOP_CONCEPTS, user, maxTokens: 32768 });
    feyn = cached(`AI费曼/${item.slug}.md`) || await gen(item.slug + '/AI费曼', { system: SOP_FEYNMAN, user, maxTokens: 8192 });
  } catch (e) {
    return { ...item, ok: false, error: String(e.message || e).slice(0, 200) };
  }

  // 原文存档（证据：来源 URL + 抓取方式）
  const via = item.id === '01m2ay2n' ? '直抓原文（Reader 快照仅 79 字，正文为 JS 渲染未同步）' : 'Reader 快照';
  fs.writeFileSync(path.join(OUT, '原文', item.slug + '.md'),
    `# ${item.title}\n\n- 来源：${item.source}\n- 原文：${url}\n- 抓取：${via}（2026-09-12）\n- 字数：${text.length}\n\n---\n\n${text}\n`);
  fs.writeFileSync(path.join(OUT, '三级笔记', item.slug + '.md'), notes + '\n');
  fs.writeFileSync(path.join(OUT, '概念辞典', item.slug + '.md'), concepts + '\n');
  fs.writeFileSync(path.join(OUT, 'AI费曼', item.slug + '.md'), feyn + '\n');
  const gist = (notes.match(/##\s*一句话主旨\s*\n+([^\n]+)/) || [, ''])[1].trim();
  return { ...item, ok: true, url, gist: gist || feyn.trim().slice(0, 60), words: text.length };
}

// 并发 3 跑
const results = [];
{ let i = 0;
  const worker = async () => { while (i < ITEMS.length) results.push(await runOne(ITEMS[i++], 3)); };
  await Promise.all([worker(), worker(), worker()]);
}
results.sort((a, b) => ITEMS.findIndex(x => x.slug === a.slug) - ITEMS.findIndex(x => x.slug === b.slug));

// ---------- 组装日报 ----------
const fmtMin = (w) => Math.max(1, Math.round(w / 400));
const ok = results.filter(r => r.ok);
const bad = results.filter(r => !r.ok);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const card = (r, i) => {
  const notes = fs.readFileSync(path.join(OUT, '三级笔记', r.slug + '.md'), 'utf8');
  const concepts = fs.readFileSync(path.join(OUT, '概念辞典', r.slug + '.md'), 'utf8');
  const feyn = fs.readFileSync(path.join(OUT, 'AI费曼', r.slug + '.md'), 'utf8');
  const block = (title, body) => `<details${title === 'AI 费曼示范' ? ' open' : ''}><summary>${title}</summary><div class="body">${body}</div></details>`;
  return `<article>
  <h2><span class="no">${i + 1}</span> <a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a></h2>
  <p class="meta">${esc(r.source)} ｜ ${esc(r.tag)} ｜ 约 ${fmtMin(r.words)} 分钟 ｜ ${r.words.toLocaleString()} 字</p>
  <p class="gist">一句话主旨：${esc(r.gist)}</p>
  ${block('AI 费曼示范', feyn)}
  ${block('三级笔记（骨架 + 血肉）', notes)}
  ${block('概念辞典（概念 + 费曼一下 + 架构图）', concepts)}
</article>`;
};
const mdCard = (r, i) => {
  const notes = fs.readFileSync(path.join(OUT, '三级笔记', r.slug + '.md'), 'utf8');
  const concepts = fs.readFileSync(path.join(OUT, '概念辞典', r.slug + '.md'), 'utf8');
  const feyn = fs.readFileSync(path.join(OUT, 'AI费曼', r.slug + '.md'), 'utf8');
  return `## ${i + 1}｜[${r.title}](${r.url})\n\n> ${r.source} ｜ ${r.tag} ｜ 约 ${fmtMin(r.words)} 分钟\n\n**一句话主旨**：${r.gist}\n\n### AI 费曼示范\n\n${feyn}\n\n### 三级笔记\n\n${notes}\n\n### 概念辞典\n\n${concepts}\n\n---\n`;
};

const totalTokens = calls.reduce((s, c) => s + c.tokens, 0);
const totalMs = Math.max(...calls.map(c => c.ms));
const genAt = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });

const head = `# AI 内参 · 260912 期（倒推版）

- **期数**：260912（2026-09-12）
- **来源**：今日 Readwise 精选 ${ITEMS.length + SKIPPED.length} 篇 → 处理 ${ok.length} 篇，跳过 ${SKIPPED.length + bad.length} 篇（见文末记账）
- **流水线**：原文快照 → 三级笔记（note-taking-pro SOP）→ 概念辞典（concept-learning SOP）→ AI 费曼示范 ｜ 模型 ${LLM_MODEL} ｜ ${totalTokens.toLocaleString()} tokens
- **生成时间**：${genAt}

## 今日导读

${ok.map((r, i) => `${i + 1}. **${r.title}**（${r.source}）—— ${r.gist}`).join('\n')}

---
`;

const htmlHead = `<!doctype html><html lang="zh"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI 内参 · 260912 期</title>
<style>
:root{--fg:#1a1a1a;--dim:#6b7280;--line:#e5e7eb;--bg:#fafafa}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);
font:15px/1.75 -apple-system,"PingFang SC","Segoe UI",sans-serif}
main{max-width:760px;margin:0 auto;padding:40px 20px 80px}
h1{font-size:26px;margin:0 0 6px}.sub{color:var(--dim);font-size:13px;margin-bottom:28px}
.toc{background:#fff;border:1px solid var(--line);border-radius:10px;padding:16px 20px;margin-bottom:28px}
.toc li{margin:6px 0}.toc a{color:var(--fg);text-decoration:none}.toc a:hover{text-decoration:underline}
article{background:#fff;border:1px solid var(--line);border-radius:12px;padding:24px 26px;margin-bottom:22px}
article h2{font-size:19px;margin:0 0 4px;line-height:1.4}.no{color:var(--dim);font-weight:400}
article a{color:var(--fg)}
.meta{color:var(--dim);font-size:12.5px;margin:2px 0 10px}
.gist{font-size:14px;margin:0 0 14px;padding:10px 14px;background:#f4f4f5;border-radius:8px}
summary{cursor:pointer;font-weight:600;font-size:14px;padding:8px 0;color:#374151;user-select:none}
details{border-top:1px dashed var(--line)}
.body{font-size:14.5px;padding:4px 2px 12px;overflow-x:auto}
.body h1,.body h2,.body h3{font-size:15.5px;margin:16px 0 6px}.body pre{background:#f4f4f5;padding:12px;border-radius:8px;overflow-x:auto;font-size:12.5px}
.body code{background:#f4f4f5;padding:1px 5px;border-radius:4px;font-size:13px}
.skip{color:var(--dim);font-size:13px}.foot{color:var(--dim);font-size:12.5px;margin-top:36px;border-top:1px solid var(--line);padding-top:16px}
</style><main>`;

const html = htmlHead + `
<h1>AI 内参 · 260912 期 <span style="font-size:13px;color:var(--dim)">倒推版</span></h1>
<p class="sub">今日 Readwise 精选 ${ITEMS.length + SKIPPED.length} 篇 ｜ 处理 ${ok.length} · 跳过 ${SKIPPED.length + bad.length} ｜ ${LLM_MODEL} ｜ ${totalTokens.toLocaleString()} tokens ｜ ${genAt}</p>
<div class="toc"><strong>今日导读</strong><ol>${ok.map(r => `<li><a href="#${r.slug}">${esc(r.title)}</a> —— ${esc(r.gist)}</li>`).join('')}</ol></div>
${ok.map((r, i) => card(r, i).replace('<article>', `<article id="${r.slug}">`)).join('\n')}
<p class="skip"><strong>跳过记账</strong>：${[...SKIPPED, ...bad].map(s => `${esc(s.title)}（${esc(s.reason)}）`).join('；')}</p>
<p class="foot">流水线：原文快照 → 三级笔记（note-taking-pro SOP）→ 概念辞典（concept-learning SOP，含 Mermaid 架构图源码）→ AI 费曼示范。产物与记账：knowledge/内参-260912/。</p>
</main></html>`;

const md = head + ok.map(mdCard).join('\n') + `\n## 跳过记账\n\n${[...SKIPPED, ...bad].map(s => `- ${s.title} —— ${s.reason}`).join('\n')}\n`;

fs.writeFileSync(path.join(OUT, '日报-260912.md'), md);
fs.writeFileSync(path.join(OUT, '日报-260912.html'), html);

const log = [`# 260912 期编辑日志（${genAt}）`, '',
  `## 成功 ${ok.length}`,
  ...ok.map(r => `- ✅ ${r.title}（${r.slug}）原文 ${r.words} 字`),
  `## 跳过/失败 ${SKIPPED.length + bad.length}`,
  ...SKIPPED.map(s => `- ⏭ ${s.title} —— ${s.reason}`),
  ...bad.map(s => `- ❌ ${s.title} —— ${s.error}`), '',
  `## LLM 调用记录（${calls.length} 次，${totalTokens} tokens）`,
  ...calls.map(c => `- ${c.label}：${c.ok ? 'ok' : 'FAIL'} ${c.tokens}t ${c.ms}ms ${c.model || ''}${c.note ? ' ⚠' + c.note : ''}`), '',
  `- 证据等级：实测（LLM 产物为真调用输出；未做人核对，引用前抽查）`,
].join('\n');
fs.writeFileSync(path.join(OUT, '编辑日志.md'), log);

console.log(`✅ 日报完成：${ok.length}/${ITEMS.length} 篇 → ${OUT}`);
console.log(`   日报-260912.html / 日报-260912.md / 编辑日志.md`);
ok.forEach(r => console.log(`   · ${r.slug}（${r.words} 字）`));
if (bad.length) console.log(`   ❌ 失败：` + bad.map(b => b.slug).join('、'));
process.exit(bad.length ? 1 : 0);
