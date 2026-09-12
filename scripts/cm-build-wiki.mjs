#!/usr/bin/env node
// 概念地图 v2 · 第 6 步：按 nashsu/llm_wiki 的模式建概念链接层。
//
// llm-wiki 的三层在这里的落法：
//   原始源（不可变）  evidence/概念源-260913/（已冻结 + SHA-256）
//   维基层（LLM 写）  knowledge/概念wiki-260913/concepts/<slug>.md —— 一概念一页，[[双链]]
//   模式层（告诉 Agent 怎么维护）  knowledge/概念wiki-260913/README.md
// 另加 index.md（内容目录）与 log.md（时间线，前缀可 grep）。
//
// 用法：node scripts/cm-build-wiki.mjs
// 产出：knowledge/概念wiki-260913/{README.md,index.md,log.md,backlinks.json,links.json,concepts/*.md}

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAP = path.join(ROOT, 'knowledge', '概念地图-260913');
const OUT = path.join(ROOT, 'knowledge', '概念wiki-260913');
const PAGES = path.join(OUT, 'concepts');
fs.mkdirSync(PAGES, { recursive: true });

const topics = JSON.parse(fs.readFileSync(path.join(MAP, 'topics.json'), 'utf8')).topics;
const deps = JSON.parse(fs.readFileSync(path.join(MAP, 'dependencies.json'), 'utf8')).dependencies;
const rels = JSON.parse(fs.readFileSync(path.join(MAP, 'relations.json'), 'utf8')).relations;
const clusters = JSON.parse(fs.readFileSync(path.join(MAP, 'clusters.json'), 'utf8')).clusters;

const byId = new Map(topics.map((t) => [t.id, t]));

/* ── 页名：同名就带 id 后缀，保证 [[链接]] 唯一 ─────────── */
const used = new Map();
const pageOf = new Map();
for (const t of topics) {
  let base = (t.nameEn ? `${t.name} ${t.nameEn}` : t.name)
    .replace(/[\\/:*?"<>|#^[\]]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80) || t.id;
  const n = used.get(base) || 0;
  used.set(base, n + 1);
  if (n) base = `${base} (${t.id.slice(3, 7)})`;
  pageOf.set(t.id, base);
}
const linkFor = (id) => `[[${pageOf.get(id)}]]`;
const NAME = { compute: '能算', judge: '能判', use: '能用', accept: '只能认' };
const STAGE = { now: '现在先懂', 'when-needed': '做到这里再懂', 'deep-dive': '深入研究再懂' };
const ORIGIN = { notion: 'Notion 概念库', context: 'Context Engineering', harness: 'Harness Engineering' };

/* ── 邻接 ───────────────────────────────────────────────── */
const needs = new Map(), unlocks = new Map(), related = new Map();
const push = (m, k, v) => { if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
for (const d of deps) {
  push(needs, d.topicId, { id: d.prerequisiteId, ...d });
  push(unlocks, d.prerequisiteId, { id: d.topicId, ...d });
}
const depKey = new Set(deps.map((d) => `${d.topicId}->${d.prerequisiteId}`));
for (const r of rels) {
  if (r.kind === 'prerequisite' && depKey.has(`${r.from}->${r.to}`)) continue;
  if (r.kind === 'prerequisite' && depKey.has(`${r.to}->${r.from}`)) continue;
  push(related, r.from, { id: r.to, ...r });
  push(related, r.to, { id: r.from, ...r, flipped: true });
}
const KIND = { 'part-of': '组成', contrast: '对照', 'used-with': '常一起用', prerequisite: '前置', 'co-article': '同篇出现' };
// 关系少的节点优先被链到——否则枢纽页自己的相关列表太长，把冷门页挤成孤页。
const relCount = new Map();
for (const [k, v] of related) relCount.set(k, v.length);
const rareFirst = (a, b) => (relCount.get(a.id) || 0) - (relCount.get(b.id) || 0);
const AXIS = { 'engineering-scope': '工程范围轴', 'system-responsibility': '系统职责轴', 'concept-boundary': '概念边界', 'runtime-composition': '运行时组成', workflow: '工作流', 'llm-domain': '同领域依赖' };

/* ── 一概念一页 ─────────────────────────────────────────── */
const links = {};   // page -> 出链
const backlinks = {}; // page -> 入链
for (const t of topics) {
  const page = pageOf.get(t.id);
  const L = [];
  const fm = [
    '---',
    `id: ${t.id}`,
    `name: ${t.name}`,
    t.nameEn ? `nameEn: ${t.nameEn}` : null,
    `type: ${t.type}`,
    `subject: ${t.subject}`,
    `domain: ${t.domain}`,
    `learningStage: ${t.learningStage}`,
    `verification: ${t.verification}`,
    `centrality: ${t.centrality}`,
    `depth: ${t.depth}`,
    `origin: [${t.origin.join(', ')}]`,
    `aliases: [${t.aliases.map((a) => JSON.stringify(a)).join(', ')}]`,
    `sources: ${t.sources.length}`,
    '---',
  ].filter(Boolean).join('\n');

  const body = [fm, '', `# ${t.name}${t.nameEn ? ` · ${t.nameEn}` : ''}`, ''];
  body.push(`> ${t.description || '（暂无定义）'}`, '');
  body.push(`**领域** ${t.domain} ｜ **类型** ${t.type} ｜ **什么时候学** ${STAGE[t.learningStage]} ｜ **怎么算会了** ${NAME[t.verification]} ｜ **中心度** ${t.centrality}`, '');

  if (t.feynman) body.push('## 费曼一下', '', t.feynman, '');
  if (t.sourceContext) body.push('## 原文 context', '', t.sourceContext, '');
  if (t.evidence?.length) body.push('## 掌握证据（做到这些才算会）', '', ...t.evidence.map((e) => `- ${e}`), '');
  if (t.assessmentPrompt) body.push('## 验收问句', '', `> ${t.assessmentPrompt}`, '');

  const nd = (needs.get(t.id) || []).sort((a, b) => (a.strength === b.strength ? 0 : a.strength === 'hard' ? -1 : 1));
  if (nd.length) {
    body.push(`## 先懂这些（前置 ${nd.length}）`, '');
    for (const d of nd) { const l = linkFor(d.id); L.push(l); body.push(`- ${l} · **${d.strength}** — ${d.reason || ''}`); }
    body.push('');
  }
  const ul = unlocks.get(t.id) || [];
  if (ul.length) {
    body.push(`## 懂了它才能懂（解锁 ${ul.length}）`, '');
    for (const d of ul.slice(0, 40)) { const l = linkFor(d.id); L.push(l); body.push(`- ${l} — ${d.reason || ''}`); }
    if (ul.length > 40) body.push(`- …另有 ${ul.length - 40} 个`);
    body.push('');
  }
  const rl = related.get(t.id) || [];
  if (rl.length) {
    body.push('## 相关', '');
    for (const r of [...rl].sort(rareFirst).slice(0, 60)) {
      const l = linkFor(r.id); L.push(l);
      body.push(`- ${l} · ${KIND[r.kind] || r.kind}${r.axis ? `（${AXIS[r.axis] || r.axis}）` : ''} — ${r.note || ''}`);
    }
    body.push('');
  }
  body.push('## 出场', '');
  for (const s of t.sources.slice(0, 8)) {
    const where = s.article ? `《${s.article}》` : (s.label || '');
    body.push(`- ${ORIGIN[s.type] || s.type} ｜ ${where}${s.url ? ` ｜ ${s.url}` : ''}`);
  }
  if (t.aliases.length) body.push('', `## 别名`, '', t.aliases.map((a) => `\`${a}\``).join('、'), '');

  fs.writeFileSync(path.join(PAGES, `${page}.md`), body.join('\n'));
  links[page] = [...new Set(L)];
}
for (const [page, outs] of Object.entries(links)) {
  for (const l of outs) {
    const target = l.slice(2, -2);
    if (!backlinks[target]) backlinks[target] = [];
    if (!backlinks[target].includes(page)) backlinks[target].push(page);
  }
}
// 把反链写回每页（llm_wiki 的交叉引用是常驻的，不是查询时才算）
for (const t of topics) {
  const page = pageOf.get(t.id);
  const bl = (backlinks[page] || []).filter((p) => p !== page);
  if (!bl.length) continue;
  const f = path.join(PAGES, `${page}.md`);
  fs.appendFileSync(f, ['', '## 反链', '', ...bl.slice(0, 40).map((p) => `- [[${p}]]`), ''].join('\n'));
}

/* ── index.md ───────────────────────────────────────────── */
const byDomain = new Map();
for (const t of topics) { if (!byDomain.has(t.domain)) byDomain.set(t.domain, []); byDomain.get(t.domain).push(t); }
const idx = ['# 概念索引 · 知所栖 135', '',
  `> ${topics.length} 个概念 · ${deps.length} 条前置依赖 · ${clusters.length} 个领域 · 源：Notion 概念库 + Context Engineering(28篇) + Harness Engineering(30篇)`,
  '',
  '查一个概念：先在本页按领域找，再进 `concepts/`。想知道「从哪开始学」，看每个领域的枢纽概念。', ''];
for (const c of clusters) {
  const list = (byDomain.get(c.id) || []).sort((a, b) => b.centrality - a.centrality);
  idx.push(`## ${c.label}（${c.topicCount}）`, '', `> ${c.question}`, '');
  idx.push(`**枢纽**：${c.hubNames.map((n) => {
    const t = list.find((x) => x.name === n); return t ? linkFor(t.id) : n;
  }).join(' · ')}`, '');
  idx.push('<details><summary>全部</summary>', '');
  idx.push(list.map((t) => `- ${linkFor(t.id)} — ${t.description || ''}`).join('\n'), '', '</details>', '');
}
fs.writeFileSync(path.join(OUT, 'index.md'), idx.join('\n'));

/* ── README.md（模式层：告诉 Agent 怎么维护） ──────────── */
fs.writeFileSync(path.join(OUT, 'README.md'), `# 概念 wiki · 维护约定

本目录是 **LLM 写、人读** 的一层，落在原始源与产品之间。模式来自 nashsu/llm_wiki。

## 三层

| 层 | 在哪 | 谁能改 |
|---|---|---|
| 原始源 | \`evidence/概念源-260913/\`（Notion 概念库快照 + 两份飞书主题合集 + 已策展关系） | **不可变**，只读；改动只能新增快照 |
| 维基 | 本目录 \`concepts/*.md\`、\`index.md\`、\`log.md\` | Agent 生成的产物；由脚本从地图重建，**不要手改** |
| 模式 | 本文件 | 人与 Agent 共同演进 |

## 上游地图（唯一真源）

数据不是在这里编的，全部来自 \`knowledge/概念地图-260913/\`：

- \`topics.json\` — 概念节点（id / 领域 / 定义 / 掌握证据 / 验收问句 / 中心度）
- \`dependencies.json\` — 前置依赖 DAG（\`topicId depends on prerequisiteId\`，hard／soft + reason）
- \`relations.json\` — 非前置关联（组成 / 对照 / 常一起用）
- \`clusters.json\` — 领域分簇
- \`manifest.json\` — 计数与逐文件 SHA-256

要改内容 → 改地图的生成脚本（\`scripts/cm-*.mjs\`）→ 重跑 → 本目录自动重建。

## 页面格式

每页 YAML frontmatter + 五个固定小节：费曼一下 / 原文 context / 掌握证据 / 验收问句 / 关系（先懂这些 · 懂了它才能懂 · 相关）/ 出场 / 反链。
链接一律 \`[[页名]]\`，页名 = \`中文名 英文名\`，重名时补 id 短码。

## 操作

- **收录（ingest）**：新源 → 冻结进 \`evidence/概念源-*/\` 并记 SHA-256 → 重跑 \`cm-extract → cm-merge → cm-enrich → cm-edges → cm-build-map → cm-build-wiki\` → 在 \`log.md\` 追加一条。
- **查询（query）**：先读 \`index.md\` 定位领域，再进具体页；答案若值得留下，写成新页而不是停在对话里。
- **体检（lint）**：查无入链的孤页、有提及无页面的概念、被更新源推翻的旧断言、缺交叉引用的页。\`scripts/cm-validate.mjs\` 跑结构体检。
`);

/* ── log.md（时间线） ──────────────────────────────────── */
const stamp = new Date().toISOString().slice(0, 10);
const logPath = path.join(OUT, 'log.md');
if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, '# 变更日志\n\n前缀固定为 `## [日期] 动作 | 摘要`，可直接 grep。\n');
fs.appendFileSync(logPath, `
## [${stamp}] ingest | 概念地图 v2 首次建成
- 源：Notion 概念库 509 条（含页面正文）· 飞书-Context-Engineering-26+2（28 篇）· 飞书-Harness-Engineering-28+2（30 篇）
- 节点 ${topics.length} · 前置依赖 ${deps.length} · 领域 ${clusters.length}
- 复用：用户已策展关系 + 原文来源关系网络，LLM 补同领域前置依赖（带 reason），环已剔除
- 链接层：${topics.length} 个概念页 · ${Object.values(backlinks).reduce((a, b) => a + b.length, 0)} 条反链
`);

fs.writeFileSync(path.join(OUT, 'links.json'), JSON.stringify({ generatedAt: new Date().toISOString(), pages: topics.length, links }, null, 1));
fs.writeFileSync(path.join(OUT, 'backlinks.json'), JSON.stringify({ generatedAt: new Date().toISOString(), backlinks }, null, 1));
fs.writeFileSync(path.join(OUT, 'page-map.json'), JSON.stringify(Object.fromEntries(pageOf), null, 1));

console.log('✅ 概念 wiki 建成');
console.log(`   ${path.relative(ROOT, OUT)}/  ${topics.length} 页 · ${Object.values(backlinks).reduce((a, b) => a + b.length, 0)} 条反链`);
const orphan = topics.filter((t) => !(backlinks[pageOf.get(t.id)] || []).length);
console.log(`   无入链页 ${orphan.length}${orphan.length ? '：' + orphan.slice(0, 6).map((t) => t.name).join(' / ') : ''}`);
