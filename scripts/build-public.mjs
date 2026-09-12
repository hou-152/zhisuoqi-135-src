#!/usr/bin/env node
// 公网版构建：把「壳」烘成**纯静态、无服务端**的单文件页面。
//
// 为什么需要它：赛制必交件是「公网可访问的线上 Demo 链接」（见
// docs/知乎黑客松-赛制要求与项目差距.md）。而壳依赖 /api/llm 与 /api/skills，
// 公网上没有那个服务端。
//
// 三条路，页面按顺序自己试：
//   ① 本地开着 serve-135 → 走 /api/llm（服务端持 key，最完整；与本地壳行为一致）
//   ② 访客自带 DeepSeek key → 浏览器直连 api.deepseek.com（CORS 已实测通过，
//      key 只存在访客自己浏览器的 localStorage，绝不进仓库、绝不上传）
//   ③ 都没有 → 播**录制回放**（evidence/公网版-录制回放-20260912.json 里真跑出来的），
//      并在气泡上明说「这不是对你那句话的回答」
//
// 用法：node scripts/build-public.mjs
// 输出：deploy/zhisuoqi-135/index.html（发布仓库）
//       prototype/知所栖-135-公网版.html（同一份，本地预览用）

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'prototype', '知所栖-壳.html');
const REPLAY = path.join(ROOT, 'evidence', '公网版-录制回放-20260912.json');
const SKILLS_DIR = path.join(ROOT, '.agents', 'skills');
const OUT_REPO = path.join(ROOT, 'deploy', 'zhisuoqi-135', 'index.html');
const OUT_LOCAL = path.join(ROOT, 'prototype', '知所栖-135-公网版.html');
const PUB_MODEL = 'deepseek-chat';

// 公网版**烘进页面**的 skill 原文。只烘演示要用的两个，其余 12 个只列名字与描述——
// 第三方 skill 原文的再分发范围由所有者定，这里取最小集。
const BAKE_MD = ['dbs-learning-beta', 'dbs-standard-answer'];

let html = fs.readFileSync(SRC, 'utf8');
const rep = (old, newStr, tag) => {
  const c = html.split(old).length - 1;
  if (c !== 1) throw new Error(`锚点「${tag}」命中 ${c} 次，应为 1 —— 模板改了，构建中止`);
  html = html.replace(old, newStr);
};

/* ── 烘焙数据 ─────────────────────────────────────────────── */
const replays = fs.existsSync(REPLAY) ? JSON.parse(fs.readFileSync(REPLAY, 'utf8')) : { takes: [] };
if (!replays.takes?.length) console.warn('⚠ 没有录制回放，公网版在无 key 时会没东西可播');

const skills = [];
const skillMD = {};
for (const name of fs.readdirSync(SKILLS_DIR).sort()) {
  const f = path.join(SKILLS_DIR, name, 'SKILL.md');
  if (!fs.existsSync(f)) continue;
  const txt = fs.readFileSync(f, 'utf8');
  const desc = (txt.match(/^---\n[\s\S]*?^description:\s*(.+)$/m)?.[1] || '').replace(/^["']|["']$/g, '');
  skills.push({ name, description: desc, bytes: Buffer.byteLength(txt) });
  if (BAKE_MD.includes(name)) skillMD[name] = txt;
}

const PUB = {
  // 用本地时间——页面是给中国评委看的，UTC 会差 8 小时，看着像过期
  builtAt: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
  model: PUB_MODEL,
  skills,
  skillMD,
  replays: replays.takes || [],
  replayAt: replays.meta?.generatedAt || null,
};

/* ── ① 注入烘焙数据 ───────────────────────────────────────── */
// 构建产物里 DATA 已经是真 JSON（占位符已被 build-shell 换掉），所以按行首定位。
{
  const at = html.indexOf('const DATA = ');
  const nl = html.indexOf('\n', at);
  if (at < 0 || nl < 0) throw new Error('找不到 DATA 行 —— 模板改了，构建中止');
  html = html.slice(0, nl + 1)
       + 'window.__PUBLIC__ = ' + JSON.stringify(PUB).replace(/<\//g, '<\\/') + ';\n'
       + html.slice(nl + 1);
}

/* ── ② Agent 面板：不再问 /api/skills ─────────────────────── */
rep(`  renderAgent(PINNED, '载入中…');
  try {
    const r = await fetch('/api/skills');
    const j = await r.json();
    ALLSKILLS = j.skills || [];
  } catch (e) { ALLSKILLS = []; }
  renderAgent(PINNED, ALLSKILLS.length
    ? \`已装 \${ALLSKILLS.length} 个 skill：<code>\${ALLSKILLS[0].name}</code> … <code>\${ALLSKILLS[ALLSKILLS.length - 1].name}</code>\`
    : '（离线·读不到 <code>.agents/skills/</code>，只有上面三个内置的可用）');`,
`  ALLSKILLS = PUB.skills || [];
  const baked = Object.keys(PUB.skillMD || {});
  renderAgent(PINNED, \`已装 \${ALLSKILLS.length} 个 skill（烘进页面的快照）· 其中 <code>\${baked.join('</code> · <code>')}</code> 带完整 SKILL.md 原文\`);`,
'openAgent');

/* ── ③ 对话：三条路 ───────────────────────────────────────── */
rep(`    const payload = activeFile
      ? { json: false, skill: activeFile, messages: history }              // 服务端读真 SKILL.md
      : { json: false, messages: [{ role: 'system', content: (SKILLS[activeSkill] || {}).sys || '' }, ...history] };
    const r = await fetch('/api/llm', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = await r.json();
    const out = j.error
      ? \`（没跑起来：\${j.error}\${j.detail ? ' — ' + String(j.detail).slice(0, 160) : ''}）\`
      : (j.content ?? j.text ?? j.choices?.[0]?.message?.content
         ?? j.data?.content ?? (typeof j === 'string' ? j : JSON.stringify(j)));
    msgs[msgs.length - 1] = { role: 'assistant', content: out };`,
`    const sys = (activeFile && PUB.skillMD[activeFile]) ? PUB.skillMD[activeFile]
              : (SKILLS[activeSkill] || {}).sys || '';
    const res = await llmCall(sys, history, activeFile);
    if (res.ok) {
      msgs[msgs.length - 1] = { role: 'assistant', content: res.content + '\\n\\n—— ' + res.via };
    } else if (res.replay) {
      const t = (PUB.replays || []).find(x => x.skill === activeSkill);
      const note = { role: 'note', content:
        '公网版没有服务端，你也没填 key，所以**下面这段不是对你那句话的回答**。\\n'
        + '这是 2026-09-12 用真模型跑同一个 skill 录下来的一段。想真跑就填个 DeepSeek key。' };
      if (t) msgs.splice(msgs.length - 1, 1, note,
        { role: 'user', content: t.q },
        { role: 'assistant', content: t.a + '\\n\\n—— 以上是 2026-09-12 的**录制回放**，不是对你这句话的回答。' });
      else msgs.splice(msgs.length - 1, 1, note,
        { role: 'assistant', content: '（这个 skill 没有录制回放。填一个 DeepSeek key 就能真跑。）' });
    } else {
      msgs[msgs.length - 1] = { role: 'assistant', content: '（没跑起来：' + res.why + '）' };
    }`,
'send');

/* ── ③b 判定器：公网版同样三条路，没有模型时退回机械覆盖检查 ──── */
rep(`async function judgeCall(nd, said) {
  const r = await fetch('/api/llm', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'system', content: JUDGE_SYS },
                                      { role: 'user', content: judgeUserMsg(nd, said) }] }),
  });
  const j = await r.json();
  if (j.error) return mechJudge(nd, said);
  const txt = j.content || '{}';
  try { return JSON.parse(txt); } catch (e) { return mechJudge(nd, said); }
}`,
`async function judgeCall(nd, said) {
  const msgs = [{ role: 'system', content: JUDGE_SYS }, { role: 'user', content: judgeUserMsg(nd, said) }];
  if (await probeServer()) {
    try {
      const r = await fetch('/api/llm', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs }) });
      const j = await r.json();
      if (!j.error) { try { return JSON.parse(j.content || '{}'); } catch (e) {} }
    } catch (e) {}
  }
  const key = getKey();
  if (key) {
    try {
      const r = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
        body: JSON.stringify({ model: PUB.model || 'deepseek-chat', temperature: 0,
          response_format: { type: 'json_object' }, messages: msgs }),
      });
      const j = await r.json();
      if (!j.error) { try { return JSON.parse(j.choices?.[0]?.message?.content || '{}'); } catch (e) {} }
    } catch (e) {}
  }
  // 两个都没有 → 机械覆盖检查。它**不会**把概念标成「过了」，只标 mech（琥珀环），
  // 因为过了关键词检查不等于懂。这一点页面上写明了。
  return mechJudge(nd, said);
}`,
'judgeCall');

/* ── ④ 离线兜底改写（公网版不存在 file:// 那套说辞） ───────── */
rep(`      '（离线）没连上本地服务，所以这句不是真回答。\\n'
      + '要真对话：项目根目录跑 \`node scripts/serve-135.mjs\`，然后开 http://127.0.0.1:5180/知所栖-壳.html —— 同一个地址下 /api/llm 才通。' };`,
`      '（请求失败）' + (e && e.message ? e.message : '未知错误') + '\\n'
      + '公网版可以填一个 DeepSeek key 直连，或在你本机跑 node scripts/serve-135.mjs。' };`,
'catch');

/* ── ⑤ 注入公网运行层 + key 面板 ──────────────────────────── */
rep(`var activeSkill = null;
var activeFile = null;   // 非空 = 用 .agents/skills/<activeFile>/SKILL.md 当 system prompt
var msgs = [];`,
`var activeSkill = null;
var activeFile = null;   // 非空 = 用 .agents/skills/<activeFile>/SKILL.md 当 system prompt
var msgs = [];

/* ══ 公网运行层 ══════════════════════════════════════════════════
   无服务端时的三条路。key 只进访客自己的 localStorage，
   **不进仓库、不上传、不落任何日志**。 */
const PUB = window.__PUBLIC__ || { skills: [], skillMD: {}, replays: [] };
const KEY_LS = 'zss135.visitor.key';
const getKey = () => { try { return localStorage.getItem(KEY_LS) || ''; } catch (e) { return ''; } };
function saveKey(v) {
  try { v ? localStorage.setItem(KEY_LS, v.trim()) : localStorage.removeItem(KEY_LS); } catch (e) {}
  renderConv();
}
window.saveKey = saveKey;

// 公网静态站上没有 /api，硬探会在控制台留下 404 报错。所以只在本地地址上探——
// 公网版和本地壳是同一份代码，本地地址下自动走服务端，公网地址下不问。
const LOCAL = /^(127\.0\.0\.1|localhost|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';
let serverMode = null;
async function probeServer() {
  if (!LOCAL) return (serverMode = false);
  if (serverMode !== null) return serverMode;
  try {
    const r = await fetch('/api/health');
    if (!r.ok) return (serverMode = false);
    const j = await r.json();
    serverMode = !!j.ok;
  } catch (e) { serverMode = false; }
  return serverMode;
}

async function llmCall(sys, history, file) {
  if (await probeServer()) {
    const payload = file
      ? { json: false, skill: file, messages: history }
      : { json: false, messages: [{ role: 'system', content: sys }, ...history] };
    const r = await fetch('/api/llm', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload) });
    const j = await r.json();
    if (j.error) return { ok: false, why: j.error + (j.detail ? ' — ' + String(j.detail).slice(0, 140) : '') };
    return { ok: true, content: j.content || '', via: '服务端（' + (j.model || '') + '）' };
  }
  const key = getKey();
  if (!key) return { ok: false, replay: true };
  try {
    const r = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({ model: PUB.model || 'deepseek-chat', temperature: 0,
        messages: sys ? [{ role: 'system', content: sys }, ...history] : history }),
    });
    const j = await r.json();
    if (j.error) return { ok: false, why: 'DeepSeek 拒了：' + (j.error.message || JSON.stringify(j.error)) };
    return { ok: true, content: j.choices?.[0]?.message?.content || '', via: '你的 key 直连 DeepSeek' };
  } catch (e) {
    return { ok: false, why: '直连 DeepSeek 失败：' + e.message + '（网络不通或 key 无效）' };
  }
}

/* key 面板：只在没有本地服务端时出现 */
function convTools() {
  const has = !!getKey();
  return \`<div class="keyrow\">
    <input id="vk" type="password" placeholder="\${has ? '已填 key · 只存在你这台浏览器' : '粘贴 DeepSeek key 就能真跑（留空＝看回放）'}"
      value="\${has ? '••••••••••••' : ''}">
    <button onclick="saveKey(document.getElementById('vk').value.startsWith('••') ? '' : document.getElementById('vk').value)">\${has ? '清除' : '用这个 key'}</button>
  </div>
  <div class="mut" style="font-size:10.5px;margin:-4px 0 8px">
    key 只写进你这台浏览器的 localStorage，本站不上传、不记录。不想填就直接发消息，会播 2026-09-12 的录制回放。
  </div>\`;
}`,
'PUB runtime');

rep(`  body.innerHTML = head + hint
    + \`<div class="clist" id="clist">\${rows || (activeSkill ? '<div class="mut">说吧，你想学什么。</div>' : '')}</div>\`;`,
`  body.innerHTML = head + hint + (activeSkill ? convTools() : '')
    + \`<div class="clist" id="clist">\${rows || (activeSkill ? '<div class="mut">说吧，你想学什么。</div>' : '')}</div>\`;`,
'renderConv');

/* ── ⑥ 样式 + 公网标注 ────────────────────────────────────── */
rep(`.cmsg.pend{opacity:.55}`,
`.cmsg.pend{opacity:.55}
.cmsg.note{background:#1c1a12;border:1px solid #3b3524;color:#d6c894;font-size:11.5px}
.keyrow{display:flex;gap:6px;margin:8px 0 4px}
.keyrow input{flex:1;background:#10141a;border:1px solid #242b36;border-radius:8px;padding:7px 10px;
  color:#e6ebf2;font-size:11.5px;outline:none;font-family:inherit}
.keyrow button{background:#1a2029;border:1px solid #2f3a48;border-radius:8px;color:#c7ced8;
  font-size:11px;padding:0 12px;cursor:pointer;font-family:inherit;white-space:nowrap}
.keyrow button:hover{background:#222b36}`,
'note css');

rep(`<div class="r-brand">知所栖<span>135</span></div>`,
`<div class="r-brand">知所栖<span>135</span><span class="pubtag" title="公网快照：194 个概念与 10 条策展线是 2026-09-12 烘焙好的">公网快照</span></div>`,
'brand');

rep(`.r-brand span{margin-left:7px;font-size:11px;font-weight:400;color:#6b7684;
  border:1px solid #262c37;border-radius:20px;padding:1px 8px}`,
`.r-brand span{margin-left:7px;font-size:11px;font-weight:400;color:#6b7684;
  border:1px solid #262c37;border-radius:20px;padding:1px 8px}
.r-brand .pubtag{border-color:#33507a;color:#7fa8e0}`,
'brand css');

/* ── 写盘 ─────────────────────────────────────────────────── */
// 构建横幅：告诉看的人数据是什么时候烘的
html = html.replace('</title>', `</title>\n<!-- 知所栖 135 · 公网快照 ${PUB.builtAt} · 194 概念 / 10 条策展线 / 15 个 skill
     概念与策展是烘焙好的静态数据，不依赖服务端。
     「对话」有三条路：本地服务端 → 访客自带 DeepSeek key → 录制回放。 -->`);

for (const out of [OUT_REPO, OUT_LOCAL]) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}
console.log(`公网版 ${(html.length / 1024).toFixed(0)} KB`);
console.log(`  skill ${PUB.skills.length} 个（烘原文 ${Object.keys(PUB.skillMD).join(' / ')}）`);
console.log(`  录制回放 ${PUB.replays.length} 段 · 烘于 ${PUB.builtAt}`);
console.log(`  → ${path.relative(ROOT, OUT_REPO)}`);
console.log(`  → ${path.relative(ROOT, OUT_LOCAL)}`);
