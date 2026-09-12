#!/usr/bin/env node
// 概念地图 v2 · 第 1 步：从三个原始源抽取概念（逐字，不改写、不合近义）。
//
// 源（全部已冻结在 evidence/概念源-260913/，带 SHA256SUMS.txt）：
//   A 用户 Notion 概念库 509 条（Name + alias，只读 ntn 查询的落盘快照）
//   B 飞书-Context-Engineering-26+2.md   28 篇 → ## 概念网络 里的概念块
//   C 飞书-Harness-Engineering-28+2.md   30 篇 → 同上
//
// 篇内概念块有两种排版，都要吃下：
//   ① `### 上下文工程（context engineering）` ＋ `**context**：…` / `**费曼一下**：…`
//   ② `- **【Action Space】（行动空间）**` ＋ `- **context**：…` / `- **费曼一下**：…`
//
// 用法：node scripts/cm-extract.mjs
// 产出：evidence/cm-260913/01-raw.json

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'evidence', '概念源-260913');
const OUT = path.join(ROOT, 'evidence', 'cm-260913');
fs.mkdirSync(OUT, { recursive: true });

const sha256 = (s) => 'sha256:' + crypto.createHash('sha256').update(s).digest('hex');
const read = (f) => fs.readFileSync(path.join(SRC, f), 'utf8');

/* ── 源 A：Notion 概念库（+ 已抓到的页面正文） ──────────── */
const PAGE_DIR = path.join(SRC, 'notion-pages');
let notionPages = 0;
function notionPage(id, heading) {
  const f = path.join(PAGE_DIR, `${id}.md`);
  if (!fs.existsSync(f)) return '';
  const t = fs.readFileSync(f, 'utf8')
    .replace(/^---[\s\S]*?\n---\n?/, '')      // frontmatter
    .replace(/^出处：[^\n]*\n?/m, '');         // 「出处：」引用行
  const re = new RegExp(`^##\\s*${heading}[^\\n]*\\n([\\s\\S]*?)(?=^## |$(?![\s\S]))`, 'm');
  const m = t.match(re);
  return m ? m[1].trim() : '';
}
const notion = JSON.parse(read('notion-概念库-509.json'));
const rawA = notion.concepts.map((c) => {
  let body = notionPage(c.id, 'context');
  let feynman = notionPage(c.id, '费曼一下');
  if (!body && !feynman) {
    // 没有标准小节 → 整页正文当材料（截断，别把整页塞进提示词）
    const f = path.join(PAGE_DIR, `${c.id}.md`);
    if (fs.existsSync(f)) {
      body = fs.readFileSync(f, 'utf8').replace(/^---[\s\S]*?\n---\n?/, '').replace(/^出处：[^\n]*\n?/m, '').trim().slice(0, 1500);
    }
  }
  if (body || feynman) notionPages++;
  return {
    name: c.name.trim(),
    aliases: c.alias.split(/[,，；;、]+/).map((s) => s.trim()).filter(Boolean),
    nameEn: '',
    gloss: '',
    body,
    feynman,
    src: { type: 'notion', label: 'Notion 概念库', article: '', url: c.url || '', id: c.id },
    source: 'notion-概念库-509.json',
  };
});

/* ── 源 B/C：飞书主题合集 ──────────────────────────────── */
const CONTAINERS = new Set([
  '关键概念', '核心概念', '核心概念解析', '概念网络', '概念拆解', '概念清单', '概念图谱',
  '核心链条', '关系说明', '概念总结', '一句话总结',
  'coreconcepts', 'conceptnetwork', '核心概念解析coreconcepts', '概念网络conceptnetwork',
]);
const isContainer = (n) => CONTAINERS.has(n.toLowerCase().replace(/[\s（()）]/g, ''));

// 「上下文工程（context engineering）」→ name=上下文工程, en=context engineering
// 「harness（把 agent 管住的那套工装）」→ 括号是中文释义，进 gloss 不进 nameEn
// 「【Action Space】（行动空间）」→ 剥掉【】，括号是中文释义
function splitName(heading) {
  let clean = heading.trim()
    .replace(/^[-*]\s*/, '')
    .replace(/\*\*/g, '')
    .trim();

  const PAIRS = [['【', '】'], ['「', '」'], ['『', '』'], ['[', ']']];
  const wrapPair = PAIRS.find(([o, c]) => clean.startsWith(o) && clean.endsWith(c) && clean.length > o.length + c.length);
  // 第 1 步：整名被一对括号包住（`【skills（x/y）】`）→ 先剥这一对
  if (wrapPair) clean = clean.slice(wrapPair[0].length, -wrapPair[1].length).trim();

  // 第 2 步：拆尾部的（…）/(...)——全 ASCII 的当英文名，否则当补充说明
  const m = clean.match(/^(.+?)\s*[（(]([^()（）]+)[)）]\s*$/);
  let name = m ? m[1].trim() : clean;
  const paren = m ? m[2].trim() : '';

  // 第 3 步：名字自己还带一对括号（`【独立视频】`）→ 剥到闭括号为止。
  // 只在**开头就是开括号**时剥，避免把 `编排循环与「dumb loop」` 这种名字内部的引号也切掉。
  // 条件与第 1 步相同：只有**整名被一对括号包住**才剥。
  // `「垃圾回收」型 agent` 这种名字内部的引号不能动。
  const inner = PAIRS.find(([o, c]) => name.startsWith(o) && name.endsWith(c) && name.length > o.length + c.length);
  if (inner) name = name.slice(inner[0].length, -inner[1].length).trim();

  if (!paren) return { name, nameEn: '', gloss: '' };
  const ascii = (paren.match(/[\x00-\x7F]/g) || []).length / Math.max(paren.length, 1);
  if (ascii > 0.85 && /[a-zA-Z]/.test(paren)) return { name, nameEn: paren, gloss: '' };
  return { name, nameEn: '', gloss: paren };
}

// 标签化正文：`**context**：…` / `- **context**` / `- **概念解释**：…` 都吃
const LABELS = ['context', '费曼一下', '概念解释', '概念价值', '一句话总结', '费曼'];
const LABEL_LINE = `^[ \\t]*-?[ \\t]*\\*\\*(?:${LABELS.join('|')})\\*\\*[ \\t]*[：:]?[ \\t]*`;

/** 把概念块切成 { label: text }。标签可与正文同行（`**context**：正文`），也可独占一行。 */
function bodyOf(chunk) {
  const out = {};
  const hits = [];
  const re = new RegExp(`^[ \\t]*-?[ \\t]*\\*\\*(${LABELS.join('|')})\\*\\*[ \\t]*[：:]?[ \\t]*`, 'gm');
  let m;
  while ((m = re.exec(chunk))) hits.push({ label: m[1], start: m.index });
  for (let i = 0; i < hits.length; i++) {
    const raw = chunk.slice(hits[i].start, i + 1 < hits.length ? hits[i + 1].start : chunk.length);
    const text = raw.replace(new RegExp(LABEL_LINE), '').split(/^#{2,4}\s/m)[0].trim();
    if (!out[hits[i].label] || text.length > out[hits[i].label].length) out[hits[i].label] = text;
  }
  return {
    ctx: out['context'] || out['概念解释'] || '',
    fey: out['费曼一下'] || out['费曼'] || '',
    value: out['概念价值'] || '',
  };
}

/** 找出段里所有概念锚点：### 标题，或「- **【名称】**」独立成行（标签行不算）。 */
function anchors(section) {
  const found = [];
  const notLabel = `(?!(?:${LABELS.join('|')})\\*\\*)`;
  const re = new RegExp(`^(?:#{3,4}[ \\t]+(.+?)[ \\t]*|[ \\t]*-[ \\t]*\\*\\*${notLabel}([^*\\n]{2,80})\\*\\*[ \\t]*)$`, 'gm');
  let m;
  while ((m = re.exec(section))) {
    const raw = (m[1] || m[2] || '').trim();
    if (!raw || /[：:]$/.test(raw)) continue;
    const { name, nameEn, gloss } = splitName(raw);
    if (!name || name.length > 60 || isContainer(name)) continue;
    found.push({ idx: m.index, end: m.index + m[0].length, name, nameEn, gloss });
  }
  return found;
}

/** 取「## 概念网络」这一节（到下一个 ## 标题为止）；没有就返回 null。 */
function sectionOf(block) {
  const lines = block.split('\n');
  const start = lines.findIndex((l) => /^##\s*概念(?:网络|图谱|清单)\s*$/.test(l));
  if (start < 0) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i]) && !/^###/.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start + 1, end).join('\n');
}

function articleMeta(block) {
  const g = (k) => {
    const m = block.match(new RegExp(`^-\\s*${k}：\\s*(.+)$`, 'm'));
    return m ? m[1].trim() : '';
  };
  return {
    title: (block.match(/^#\s+(.+)$/m) || [, ''])[1].trim(),
    originTitle: g('原文标题'),
    author: g('作者'),
    url: g('原文'),
    date: g('内参日期'),
    tags: g('标签'),
    note: (block.match(/^\*\*内容说明：\*\*\s*(.+)$/m) || [, ''])[1].trim(),
  };
}

const DOCS = [
  { file: '飞书-Context-Engineering-26+2.md', type: 'context', label: 'Context Engineering' },
  { file: '飞书-Harness-Engineering-28+2.md', type: 'harness', label: 'Harness Engineering' },
];

const rawBC = [];
const articles = [];
const sourceHashes = {};
for (const doc of DOCS) {
  const text = read(doc.file);
  sourceHashes[doc.file] = sha256(text);
  const parts = text.split(/^(?=(?:HOWIE 原清单|CODEX 补充推荐)\s*·\s*\S+\s*$)/m);
  for (const block of parts) {
    const marker = block.match(/^((?:HOWIE 原清单|CODEX 补充推荐)\s*·\s*\S+)\s*$/m);
    if (!marker) continue;
    const meta = articleMeta(block);
    if (!meta.title) continue;
    const seq = marker[1].replace(/\s+/g, ' ');
    const aid = `${doc.type}-${(seq.match(/(\d+|A\d+)$/) || [, '?'])[1]}`;
    // 概念区：优先 ## 概念网络；没有就用整篇
    const secM = sectionOf(block);
    const section = secM ?? block;
    const as = anchors(section);
    let count = 0;
    for (let i = 0; i < as.length; i++) {
      const a = as[i];
      const chunk = section.slice(a.end, i + 1 < as.length ? as[i + 1].idx : section.length);
      const { ctx, fey, value } = bodyOf(chunk);
      count++;
      rawBC.push({
        name: a.name,
        aliases: a.nameEn ? [a.nameEn] : [],
        nameEn: a.nameEn,
        gloss: a.gloss,
        body: ctx,
        feynman: fey,
        value,
        src: {
          type: doc.type, label: doc.label, article: meta.title, articleId: aid,
          seq, url: meta.url, date: meta.date, author: meta.author, note: meta.note,
        },
        source: doc.file,
      });
    }
    articles.push({ id: aid, doc: doc.type, seq, concepts: count, sectioned: !!secM, ...meta });
  }
}

const raw = [...rawA, ...rawBC];
const payload = {
  extractedAt: new Date().toISOString(),
  sources: { 'notion-概念库-509.json': sha256(read('notion-概念库-509.json')), ...sourceHashes },
  stats: {
    notion: rawA.length,
    context: rawBC.filter((c) => c.src.type === 'context').length,
    harness: rawBC.filter((c) => c.src.type === 'harness').length,
    articles: articles.length,
    total: raw.length,
  },
  articles,
  concepts: raw,
};
fs.writeFileSync(path.join(OUT, '01-raw.json'), JSON.stringify(payload, null, 1));

console.log('✅ 抽取完成');
console.log(`   Notion 概念库 ${payload.stats.notion} · Context ${payload.stats.context} · Harness ${payload.stats.harness}`);
console.log(`   文章 ${payload.stats.articles} 篇 · 原始概念条目 ${payload.stats.total}`);
const bad = articles.filter((a) => a.concepts === 0);
if (bad.length) console.log(`   ⚠ ${bad.length} 篇抽到 0 个概念：${bad.map((a) => a.id).join(' ')}`);
const noBody = rawBC.filter((c) => !c.body && !c.feynman).length;
if (noBody) console.log(`   ⚠ ${noBody} 条无 context/费曼正文`);
