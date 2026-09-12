#!/usr/bin/env node
// 知所栖-135 本地服务桥：静态页面 + 真实 API
//   GET  /                     → prototype/知所栖-135-基础框架.html
//   POST /api/search {query}   → 知乎数据开放平台 全网搜索（spawn 项目内 zhihu CLI，真实数据）
//   POST /api/llm    {messages, json?}→ 转发 OpenAI 兼容接口（env: LLM_API_BASE / LLM_API_KEY / LLM_MODEL）
//                    json:false = 自由文本（对话）；缺省 = JSON 对象（费曼判定）
// 用法：node scripts/serve-135.mjs   → http://127.0.0.1:5180
// 凭证：自动加载 .private/llm.env（已在 .gitignore，600）；已存在的环境变量优先，不被文件覆盖。
// 说明：页面双击打开时无 /api，自动走内置回退（规则引擎 + 烘焙检索快照）；
//       经本服务访问时，费曼检验走「真实检索 + LLM」管线（即 AB 实验的 C1 轻量 agent 形态）。
import http from 'node:http';
import { spawn } from 'node:child_process';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PORT = Number(process.env.PORT || 5180);

/* 加载本地凭证：只补未设置的变量，不覆盖 shell 里已有的。文件不存在则静默跳过（页面自动回退规则引擎）。 */
const ENV_FILE = join(ROOT, '.private', 'llm.env');
if (existsSync(ENV_FILE)) {
  for (const line of readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^\s*export\s+([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css' };

function readBody(req) {
  return new Promise((res, rej) => {
    let b = '';
    req.on('data', d => { b += d; if (b.length > 1e6) req.destroy(); });
    req.on('end', () => { try { res(JSON.parse(b || '{}')); } catch (e) { rej(e); } });
    req.on('error', rej);
  });
}
function zhihuSearch(query) {
  return new Promise((resolve) => {
    const p = spawn(join(ROOT, 'scripts', 'zhihu'), ['search', 'zhihu', '--query', query, '--count', '3'], { cwd: ROOT });
    let out = '';
    p.stdout.on('data', d => out += d);
    p.on('error', () => resolve({ error: 'cli-spawn-failed' }));
    p.on('close', () => {
      try {
        const j = JSON.parse(out);
        const items = (j.Data?.Items || []).map(it => ({
          title: it.Title, author: it.AuthorName, url: it.Url,
          excerpt: (it.ContentText || '').replace(/\s+/g, ' ').slice(0, 200),
        }));
        resolve({ items });
      } catch { resolve({ error: 'cli-parse-failed' }); }
    });
  });
}
async function llmForward(messages, opts = {}) {
  const base = process.env.LLM_API_BASE, key = process.env.LLM_API_KEY, model = process.env.LLM_MODEL;
  if (!base || !key || !model) return { error: 'llm-not-configured（设 LLM_API_BASE / LLM_API_KEY / LLM_MODEL）' };
  // 默认走 JSON 模式（费曼判定用）。DeepSeek 的 JSON 模式要求提示词里出现 "json" 字样，否则 400；
  // 失败时原样带出上游报错，免得只看到 llm-http-400 却不知道为什么（2026-09-12 踩过）。
  // opts.json === false 时走自由文本（对话用，2026-09-12 加）。
  const res = await fetch(`${base.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, messages, temperature: 0,
      ...(opts.json === false ? {} : { response_format: { type: 'json_object' } }) }),
  });
  if (!res.ok) {
    const detail = (await res.text().catch(() => '')).slice(0, 300);
    return { error: `llm-http-${res.status}`, detail };
  }
  const data = await res.json();
  return { content: data.choices?.[0]?.message?.content || '', tokens: data.usage?.total_tokens ?? 0, model: data.model };
}

/* ── 真 skill 调用 ─────────────────────────────────────────────────
   壳里的三张卡片原来只是把 SKILL.md 大意手抄成三行 system prompt —— 那不是「调用 skill」。
   这里让壳直接读项目里装好的 .agents/skills/<name>/SKILL.md，原样当 system prompt 发出去。
   （所有者 2026-09-12 问：「怎么样去调用 DBS 的 skill 啊？」）  */
const SKILLS_DIR = join(ROOT, '.agents', 'skills');
function listSkills() {
  if (!existsSync(SKILLS_DIR)) return [];
  const out = [];
  for (const name of readdirSync(SKILLS_DIR)) {
    const f = join(SKILLS_DIR, name, 'SKILL.md');
    if (!existsSync(f)) continue;
    const txt = readFileSync(f, 'utf8');
    const m = txt.match(/^---\n([\s\S]*?)\n---/);
    const desc = m ? (m[1].match(/^description:\s*(.+)$/m)?.[1] || '') : '';
    out.push({ name, description: desc.replace(/^["']|["']$/g, ''), bytes: Buffer.byteLength(txt) });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}
function readSkill(name) {
  if (!/^[a-z0-9-]+$/i.test(String(name || ''))) return null;   // 防目录穿越
  const f = join(SKILLS_DIR, String(name), 'SKILL.md');
  return existsSync(f) ? readFileSync(f, 'utf8') : null;
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  if (url.pathname === '/api/health') {
    return res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({
      ok: true,
      llm: !!(process.env.LLM_API_BASE && process.env.LLM_API_KEY && process.env.LLM_MODEL),
    }));
  }
  if (url.pathname === '/api/skills') {
    return res.writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify({ dir: '.agents/skills', skills: listSkills() }));
  }
  if (url.pathname === '/api/search' && req.method === 'POST') {
    const body = await readBody(req);
    return res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(await zhihuSearch(String(body.query || '').slice(0, 80))));
  }
  if (url.pathname === '/api/llm' && req.method === 'POST') {
    const body = await readBody(req);
    let messages = body.messages || [];
    let skillNote = null;
    // skill: 'dbs-learning-beta' → 用真 SKILL.md 当 system prompt（覆盖前端传来的简写版）
    if (body.skill) {
      const txt = readSkill(body.skill);
      if (!txt) return res.writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ error: 'skill-not-found', skill: body.skill }));
      const rest = messages.filter(m => m.role !== 'system');
      messages = [{ role: 'system', content: txt }, ...rest];
      skillNote = body.skill;
    }
    const out = await llmForward(messages, { json: body.json });
    if (skillNote && !out.error) out.skill = skillNote;
    return res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(out));
  }
  // 修：url.pathname 是百分号编码的，中文文件名（如 /知所栖-壳.html）不解码就永远 404。
  let decoded; try { decoded = decodeURIComponent(url.pathname); } catch { decoded = url.pathname; }
  const path = decoded === '/' ? '/知所栖-135-基础框架.html' : decoded;
  const file = join(ROOT, 'prototype', path);
  if (existsSync(file)) {
    return res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' }).end(readFileSync(file));
  }
  res.writeHead(404).end('not found');
}).listen(PORT, '127.0.0.1', () => console.log(`知所栖-135 服务: http://127.0.0.1:${PORT}  （/api/search 真实知乎检索 · /api/llm ${process.env.LLM_API_KEY ? '已配置' : '未配置，设 LLM_API_BASE/LLM_API_KEY/LLM_MODEL'}）`));
