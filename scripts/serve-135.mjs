#!/usr/bin/env node
// 知所栖-135 本地服务桥：静态页面 + 真实 API
//   GET  /                     → prototype/知所栖-135-基础框架.html
//   POST /api/search {query}   → 知乎数据开放平台 全网搜索（spawn 项目内 zhihu CLI，真实数据）
//   POST /api/llm    {messages}→ 转发 OpenAI 兼容接口（env: LLM_API_BASE / LLM_API_KEY / LLM_MODEL）
// 用法：node scripts/serve-135.mjs   → http://127.0.0.1:5180
// 凭证：自动加载 .private/llm.env（已在 .gitignore，600）；已存在的环境变量优先，不被文件覆盖。
// 说明：页面双击打开时无 /api，自动走内置回退（规则引擎 + 烘焙检索快照）；
//       经本服务访问时，费曼检验走「真实检索 + LLM」管线（即 AB 实验的 C1 轻量 agent 形态）。
import http from 'node:http';
import { spawn } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
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
async function llmForward(messages) {
  const base = process.env.LLM_API_BASE, key = process.env.LLM_API_KEY, model = process.env.LLM_MODEL;
  if (!base || !key || !model) return { error: 'llm-not-configured（设 LLM_API_BASE / LLM_API_KEY / LLM_MODEL）' };
  // DeepSeek 的 JSON 模式要求提示词里出现 "json" 字样，否则 400。
  // 本产品的费曼提示词含「只输出 JSON」，满足条件；这里在失败时原样带出上游报错，
  // 免得只看到 llm-http-400 却不知道为什么（2026-09-12 踩过）。
  const res = await fetch(`${base.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, messages, temperature: 0, response_format: { type: 'json_object' } }),
  });
  if (!res.ok) {
    const detail = (await res.text().catch(() => '')).slice(0, 300);
    return { error: `llm-http-${res.status}`, detail };
  }
  const data = await res.json();
  return { content: data.choices?.[0]?.message?.content || '', tokens: data.usage?.total_tokens ?? 0, model: data.model };
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  if (url.pathname === '/api/health') {
    return res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({
      ok: true,
      llm: !!(process.env.LLM_API_BASE && process.env.LLM_API_KEY && process.env.LLM_MODEL),
    }));
  }
  if (url.pathname === '/api/search' && req.method === 'POST') {
    const body = await readBody(req);
    return res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(await zhihuSearch(String(body.query || '').slice(0, 80))));
  }
  if (url.pathname === '/api/llm' && req.method === 'POST') {
    const body = await readBody(req);
    return res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(await llmForward(body.messages || [])));
  }
  let path = url.pathname === '/' ? '/知所栖-135-基础框架.html' : url.pathname;
  const file = join(ROOT, 'prototype', path);
  if (existsSync(file)) {
    return res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' }).end(readFileSync(file));
  }
  res.writeHead(404).end('not found');
}).listen(PORT, '127.0.0.1', () => console.log(`知所栖-135 服务: http://127.0.0.1:${PORT}  （/api/search 真实知乎检索 · /api/llm ${process.env.LLM_API_KEY ? '已配置' : '未配置，设 LLM_API_BASE/LLM_API_KEY/LLM_MODEL'}）`));
