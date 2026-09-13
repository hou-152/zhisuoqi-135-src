#!/usr/bin/env node
// 公网版构建：把「壳」烘成**纯静态、无服务端**的单文件页面。
//
// 为什么需要它：赛制必交件是「公网可访问的线上 Demo 链接」（见
// docs/知乎黑客松-赛制要求与项目差距.md）。而壳依赖 /api/llm，公网上没有那个服务端。
//
// 09-13 减法之后，壳只剩两栏：**知识体系（按主题分）+ 内参**。
// 对话 / 策展 / 待你看一眼 / 我在学 连同底部那条栏一起删了（所有者要求，留白给队友做新功能）。
// 因此公网版不再烘 skill 原文、不再有录制回放、没有 key 面板——那些都随对话层走掉了。
//
// 唯一保留的公网特化是**判定器**：静态站上没有 /api，交卷时退回机械覆盖检查，
// 只标 mech（琥珀环），**不冒充「过了」**。页面上写明了这一点。
//
// 用法：node scripts/build-public.mjs
// 输出：deploy/zhisuoqi-135/index.html（发布仓库）
//       prototype/知所栖-135-公网版.html（同一份，本地预览用）
// 注意：改这两个文件**不等于**发布。线上要 git push 才更新。

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'prototype', '知所栖-壳.html');
const OUT_REPO = path.join(ROOT, 'deploy', 'zhisuoqi-135', 'index.html');
const OUT_LOCAL = path.join(ROOT, 'prototype', '知所栖-135-公网版.html');

let html = fs.readFileSync(SRC, 'utf8');
const rep = (old, newStr, tag) => {
  const c = html.split(old).length - 1;
  if (c !== 1) throw new Error(`锚点「${tag}」命中 ${c} 次，应为 1 —— 模板改了，构建中止`);
  html = html.replace(old, newStr);
};
// 页面是给中国评委看的，UTC 会差 8 小时，看着像过期
const builtAt = new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-');

/* ── ① 判定器：公网静态站上探不到 /api 时退回机械覆盖检查 ────── */
rep(`async function judgeCall(nd, said) {
  const r = await fetch('/api/llm', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'system', content: judgeSys(kOf(nd)) },
                                      { role: 'user', content: judgeUserMsg(nd, said) }] }),
  });
  const j = await r.json();
  if (j.error) return mechJudge(nd, said);
  const txt = j.content || '{}';
  try { return JSON.parse(txt); } catch (e) { return mechJudge(nd, said); }
}`,
`async function judgeCall(nd, said) {
  const msgs = [{ role: 'system', content: judgeSys(kOf(nd)) }, { role: 'user', content: judgeUserMsg(nd, said) }];
  if (await probeServer()) {
    try {
      const r = await fetch('/api/llm', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs }) });
      const j = await r.json();
      if (!j.error) { try { return JSON.parse(j.content || '{}'); } catch (e) {} }
    } catch (e) {}
  }
  // 公网静态站没有服务端 → 机械覆盖检查。它**不会**把概念标成「过了」，只标 mech（琥珀环），
  // 因为过了关键词检查不等于懂。这一点页面上写明了。
  return mechJudge(nd, said);
}`, 'judgeCall');

/* ── ② 公网运行层：只在本地地址上探 /api ────────────────────── */
rep(`let judging = false;`,
`let judging = false;

/* ══ 公网运行层 ══════════════════════════════════════════════════
   静态站上没有 /api，硬探会在控制台留下 404 报错。所以只在本地地址上探——
   公网版和本地壳是同一份代码，本地地址下自动走服务端，公网地址下不问。 */
const LOCAL = /^(127\\.0\\.0\\.1|localhost|\\[::1\\])$/.test(location.hostname) || location.protocol === 'file:';
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
}`, 'public runtime');

/* ── ③ 公网快照角标：模板里默认 display:none，这里显示出来 ────── */
rep(`<span class="pubtag" id="pubtag" style="display:none">公网快照</span>`,
    `<span class="pubtag" id="pubtag" title="公网快照：概念地图与内参都是 ${builtAt} 烘焙好的静态数据；静态站上没有服务端，交卷走机械覆盖检查">公网快照</span>`,
    'brand');

/* ── ④ 学习材料边界：未经负责人确认的章节不进公网产物 ────────────
   evidence/agent-loop-260913/chapters.json 里的六章是**候选装配稿**
   （主案例是「假设场景」、负责人尚未确认）。公网版只接受 review.status === 'ready' 的章节；
   不够格的一律从 DATA.learning.chapters 里摘掉——宁可在公网上没有学习入口，
   也不把候选材料发成公网学习材料。 */
{
  const lines = html.split('\n');
  const i = lines.findIndex((l) => l.startsWith('const DATA = '));
  if (i < 0) throw new Error('公网构建找不到 const DATA 行 —— 模板改了，构建中止');
  const data = JSON.parse(lines[i].slice('const DATA = '.length, -1));
  const all = (data.learning && data.learning.chapters) || [];
  const ready = all.filter((c) => c.review && c.review.status === 'ready');
  if (all.length !== ready.length) {
    console.log(`学习材料边界：${all.length} 章候选装配稿未获负责人确认，已从公网产物剥离（保留 ready ${ready.length} 章）`);
  }
  data.learning = { ...(data.learning || {}), chapters: ready, publicNote: '候选装配稿不进公网产物（scripts/build-public.mjs ④）' };
  // 与 build-shell.mjs 同一条转义：内联 JSON 里的 </ 必须写成 <\/ ，否则字符串里的 </script> 会提前关掉脚本标签
  lines[i] = 'const DATA = ' + JSON.stringify(data).replace(/<\//g, '<\\/') + ';';
  html = lines.join('\n');
}

/* ── 写盘 ─────────────────────────────────────────────────── */
html = html.replace('</title>', `</title>\n<!-- 知所栖 135 · 公网快照 ${builtAt}
     概念地图与内参是烘焙好的静态数据，不依赖服务端。
     公网无服务端时，交卷判定退回机械覆盖检查（只标 mech，不冒充「过了」）。 -->`);

for (const out of [OUT_REPO, OUT_LOCAL]) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}
console.log(`公网版 ${(html.length / 1024).toFixed(0)} KB · 烘于 ${builtAt}`);
console.log(`  → ${path.relative(ROOT, OUT_REPO)}（改这个文件 ≠ 发布，线上要 git push）`);
console.log(`  → ${path.relative(ROOT, OUT_LOCAL)}`);
