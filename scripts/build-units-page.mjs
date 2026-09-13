#!/usr/bin/env node
// 语义单元索引页构建：把 538 个内容单元烘成**一个自包含 HTML**，零服务端、零依赖。
//
// 为什么需要它：538 个单元只躺在私有仓库里，队友要拿到必须先 clone（还要有权限）。
// 这一页解决的是「发一条链接，点开就能读、能搜、能按类型/主题筛」。
//
// 数据源是 ai-concept-base 模块里已冻结的那两份（**不重新解析 Markdown**）：
//   内容结构化系统/模块/ai-concept-base/data/units.json   538 条全文（含 key_fields 与 body）
//   内容结构化系统/模块/ai-concept-base/data/index.json   538 条轻量索引（带 gloss）
//
// 用法：node scripts/build-units-page.mjs
// 输出：deploy/zhisuoqi-135/units.html（发布仓库，改完要 git push 才上线）
//       prototype/基本盘-538单元.html（同一份，本地预览）

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATA = path.join(ROOT, '内容结构化系统', '模块', 'ai-concept-base', 'data');
const OUT_REPO = path.join(ROOT, 'deploy', 'zhisuoqi-135', 'units.html');
const OUT_LOCAL = path.join(ROOT, 'prototype', '基本盘-538单元.html');

const units = JSON.parse(fs.readFileSync(path.join(DATA, 'units.json'), 'utf8'));
const index = JSON.parse(fs.readFileSync(path.join(DATA, 'index.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(DATA, 'manifest.json'), 'utf8'));

// index.json 里的 gloss 是给检索用的短句，合并进单元，省得前端再查一次
const gloss = new Map(index.map(x => [x.id, x.gloss || '']));
const rows = units.map(u => ({
  id: u.id, type: u.type, title: u.title,
  themes: [...new Set(u.themes || [])],
  keywords: u.keywords || [],
  status: u.status || '',
  source: (u.source_documents || []).join(' '),
  gloss: gloss.get(u.id) || '',
  rel: (u.relationships || []).map(r => `${r.type} → ${r.target}`),
  kf: u.key_fields || {},
  body: u.body || '',
}));

const TYPES = ['问题单元', '概念单元', '观点单元', '案例单元', '方案单元'];
const counts = Object.fromEntries(TYPES.map(t => [t, rows.filter(r => r.type === t).length]));
const themes = [...new Set(rows.flatMap(r => r.themes))].sort((a, b) => a.localeCompare(b, 'zh'));
const builtAt = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false });

const html = `<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI 概念基本盘 · ${rows.length} 个语义单元</title>
<style>
:root{--bg:#08090a;--fg:#f7f8f8;--fg2:#8a8f98;--fg3:#62666d;--fg4:#3c3f44;--line:#1b1c1e;--card:#0e0f11;--acc:#7c93c9}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);
  font-family:-apple-system,BlinkMacSystemFont,"Inter","PingFang SC","Helvetica Neue",Arial,sans-serif;
  font-size:14px;line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:var(--acc);text-decoration:none} a:hover{text-decoration:underline}
.wrap{max-width:1000px;margin:0 auto;padding:34px 22px 90px}
.brand{font-size:12px;color:var(--fg3);letter-spacing:.08em}
.brand b{color:var(--fg2);font-weight:600}
h1{font-size:22px;margin:12px 0 6px;font-weight:600;letter-spacing:-.01em}
h1 em{font-style:normal;color:var(--acc)}
.sub{color:var(--fg2);font-size:13px;margin:0 0 22px}
.sub code{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:var(--fg2);background:var(--card);padding:1px 5px;border-radius:4px}
.ctrl{position:sticky;top:0;background:linear-gradient(180deg,var(--bg) 78%,transparent);padding:10px 0 12px;z-index:5}
#q{width:100%;background:var(--card);border:1px solid var(--line);color:var(--fg);border-radius:8px;
  padding:10px 12px;font-size:14px;font-family:inherit;outline:none}
#q:focus{border-color:#2a2c30}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0}
.chip{border:1px solid var(--line);background:transparent;color:var(--fg2);border-radius:999px;
  padding:4px 11px;font-size:12.5px;cursor:pointer;font-family:inherit}
.chip:hover{color:var(--fg)}
.chip.on{background:#15171a;color:var(--fg);border-color:#2a2c30}
.chip i{font-style:normal;color:var(--fg3);margin-left:5px;font-variant-numeric:tabular-nums}
#theme{background:var(--card);border:1px solid var(--line);color:var(--fg2);border-radius:999px;
  padding:4px 10px;font-size:12.5px;font-family:inherit;margin-left:2px}
.meta{color:var(--fg3);font-size:12px;margin:2px 0 14px;font-variant-numeric:tabular-nums}
.card{border:1px solid var(--line);border-radius:10px;padding:12px 14px;margin:0 0 8px;background:var(--card);cursor:pointer}
.card:hover{border-color:#2a2c30}
.card .top{display:flex;gap:9px;align-items:baseline}
.tag{font-size:11px;color:var(--fg3);border:1px solid var(--line);border-radius:4px;padding:0 5px;flex:0 0 auto;white-space:nowrap}
.ttl{font-size:14.5px;font-weight:500;letter-spacing:-.01em}
.gloss{color:var(--fg2);font-size:13px;margin:5px 0 0}
.id{color:var(--fg4);font-size:11.5px;font-family:ui-monospace,Menlo,monospace;margin-top:5px}
.det{display:none;margin-top:12px;border-top:1px solid var(--line);padding-top:11px}
.card.open .det{display:block}
.card.open{border-color:#2f3237}
.kf{margin:0 0 10px}
.kf .k{color:var(--fg3);font-size:11.5px;font-family:ui-monospace,Menlo,monospace}
.kf .v{color:var(--fg);font-size:13.5px;margin:1px 0 8px;white-space:pre-wrap}
.kf ol{margin:2px 0 8px;padding-left:20px}
.rel{color:var(--fg2);font-size:12.5px;margin:2px 0 0}
.body{display:none;white-space:pre-wrap;color:var(--fg2);font-size:12.5px;background:#0b0c0d;
  border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin-top:10px;max-height:420px;overflow:auto}
.card.open .body.show{display:block}
details summary{cursor:pointer;color:var(--fg3);font-size:12px;margin-top:8px}
footer{margin-top:34px;padding-top:16px;border-top:1px solid var(--line);color:var(--fg3);font-size:12px}
footer code{font-family:ui-monospace,Menlo,monospace;background:var(--card);padding:1px 5px;border-radius:4px;color:var(--fg2)}
.more{width:100%;background:var(--card);border:1px solid var(--line);color:var(--fg2);border-radius:8px;
  padding:9px;font-family:inherit;font-size:13px;cursor:pointer;margin-top:6px}
.more:hover{color:var(--fg)}
</style></head>
<body><div class="wrap">
<div class="brand">知所栖 <b>135</b> · 内容结构化系统</div>
<h1>AI 概念基本盘 · <em>${rows.length}</em> 个语义单元</h1>
<p class="sub">五类内容单元：<b>问题 ${counts['问题单元']}</b> · <b>概念 ${counts['概念单元']}</b> · <b>观点 ${counts['观点单元']}</b> · <b>案例 ${counts['案例单元']}</b> · <b>方案 ${counts['方案单元']}</b>
　｜　来源：Context Engineering 28 篇 ＋ Harness Engineering 30 篇 ＋ 图鉴站 76 张已审计概念卡
　｜　按 <code>/dbs-content-system</code> 的内容工程建，<b>全程 0 次 LLM 调用</b></p>
<div class="ctrl">
  <input id="q" type="search" placeholder="搜标题 / 关键词 / 字段 / 正文……（按 / 聚焦）" autocomplete="off">
  <div class="chips" id="chips"></div>
</div>
<div class="meta" id="meta"></div>
<main id="list"></main>
<button class="more" id="more" style="display:none"></button>
<footer>
  数据：<code>内容结构化系统/模块/ai-concept-base/data/units.json</code>（${rows.length} 条，校验和 ${String(manifest.sha256 || manifest.hash || '见 manifest.json').slice(0, 16)}…）<br>
  重新生成：<code>python3 内容结构化系统/07-脚本与工具/build-units.py</code> → <code>node scripts/build-units-page.mjs</code>　｜　本页构建于 ${builtAt}
</footer>
</div>
<script>
const ROWS = ${JSON.stringify(rows)};
const TYPE_ORDER = ${JSON.stringify(TYPES)};
const PAGE = 80;
let type = null, theme = '', q = '', shown = PAGE;

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const hay = r => (r.id + ' ' + r.title + ' ' + r.gloss + ' ' + r.keywords.join(' ') + ' ' + r.themes.join(' ') + ' ' + JSON.stringify(r.kf) + ' ' + r.body).toLowerCase();

$('chips').innerHTML = [['', '全部', ROWS.length]]
  .concat(TYPE_ORDER.map(t => [t, t.replace('单元', ''), ROWS.filter(r => r.type === t).length]))
  .map(([v, label, n]) => \`<button class="chip\${v === '' ? ' on' : ''}" data-t="\${v}">\${label}<i>\${n}</i></button>\`).join('')
  + \`<select id="theme"><option value="">全部主题（\${new Set(ROWS.flatMap(r => r.themes)).size} 条）</option>\`
  + [...new Set(ROWS.flatMap(r => r.themes))].sort((a, b) => a.localeCompare(b, 'zh')).map(t => \`<option>\${esc(t)}</option>\`).join('') + '</select>';
document.querySelectorAll('.chip').forEach(c => c.onclick = () => {
  document.querySelectorAll('.chip').forEach(x => x.classList.remove('on'));
  c.classList.add('on'); type = c.dataset.t || null; shown = PAGE; render();
});
$('theme').onchange = e => { theme = e.target.value; shown = PAGE; render(); };
$('q').oninput = e => { q = e.target.value.trim().toLowerCase(); shown = PAGE; render(); };
$('more').onclick = () => { shown += PAGE * 2; render(); };
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== $('q')) { e.preventDefault(); $('q').focus(); }
  if (e.key === 'Escape') { $('q').value = ''; q = ''; render(); }
});

function hit(r) {
  if (type && r.type !== type) return false;
  if (theme && !r.themes.includes(theme)) return false;
  if (q && !hay(r).includes(q)) return false;
  return true;
}
function kfHtml(kf) {
  const label = { question_text: '问题', question_type: '类型', user_stage: '阶段', applicable_topics: '适用主题',
    concept_definition: '定义', concept_function: '作用', core_claim: '主张', claim_scope: '适用范围', why_it_matters: '为什么重要',
    case_subject: '主体', case_summary: '场景', case_process: '过程', case_result: '结果', case_type: '案例类型', case_evidence: '证据范围',
    target_problem: '要解决的问题', solution_summary: '方案要点', action_steps: '动作路径', expected_result: '预期结果' };
  return Object.entries(kf).map(([k, v]) => {
    const name = label[k] || k;
    const val = Array.isArray(v)
      ? '<ol>' + v.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol>'
      : '<div class="v">' + esc(v) + '</div>';
    return \`<div class="kf"><div class="k">\${name}　\${esc(k)}</div>\${val}</div>\`;
  }).join('');
}
function cardHtml(r) {
  return \`<div class="card" id="\${esc(r.id)}" data-id="\${esc(r.id)}">
    <div class="top"><span class="tag">\${esc(r.type.replace('单元', ''))}</span><span class="ttl">\${esc(r.title)}</span></div>
    \${r.gloss ? \`<div class="gloss">\${esc(r.gloss)}</div>\` : ''}
    <div class="id">\${esc(r.id)}</div>
    <div class="det">\${kfHtml(r.kf)}
      \${r.rel.length ? \`<div class="rel">关系：\${r.rel.map(esc).join('　·　')}</div>\` : ''}
      <div class="rel">来源：\${esc(r.source)}　·　主题：\${r.themes.map(esc).join(' / ')}　·　状态：\${esc(r.status)}</div>
      <details><summary>看正文（Markdown 原文）</summary><div class="body">\${esc(r.body)}</div></details>
    </div></div>\`;
}
function render() {
  const list = ROWS.filter(hit);
  $('meta').textContent = \`命中 \${list.length} / \${ROWS.length}\` + (q ? \`　关键词「\${q}」\` : '') + (theme ? \`　主题「\${theme}」\` : '');
  const slice = list.slice(0, shown);
  $('list').innerHTML = slice.map(cardHtml).join('') || '<div class="meta">没有命中。</div>';
  $('more').style.display = list.length > shown ? '' : 'none';
  $('more').textContent = \`再看 \${Math.min(PAGE * 2, list.length - shown)} 条（还有 \${list.length - shown} 条）\`;
  document.querySelectorAll('.card').forEach(c => c.onclick = e => {
    if (e.target.closest('details')) return;
    c.classList.toggle('open');
  });
}
render();
// 深链：#CON-context-rot 直接展开那一条。
// 注意：列表默认只渲染 80 条，目标不一定在里面 —— 所以先把关键词设成这个 id 再渲染。
if (location.hash) {
  const id = decodeURIComponent(location.hash.slice(1));
  if (ROWS.some(r => r.id === id)) {
    $('q').value = id; q = id.toLowerCase(); type = null; theme = ''; shown = PAGE; render();
    const el = document.getElementById(id);
    if (el) { el.classList.add('open'); el.scrollIntoView({ block: 'center' }); }
  }
}
</script></body></html>`;

fs.mkdirSync(path.dirname(OUT_REPO), { recursive: true });
fs.writeFileSync(OUT_REPO, html);
fs.writeFileSync(OUT_LOCAL, html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`语义单元索引页 ${kb} KB · ${rows.length} 条（${TYPES.map(t => t.replace('单元', '') + ' ' + counts[t]).join(' / ')}）· ${themes.length} 条主题`);
console.log('  → deploy/zhisuoqi-135/units.html（改这个文件 ≠ 发布，线上要 git push）');
console.log('  → prototype/基本盘-538单元.html');
