// 知所栖 135 的本地服务：静态页 + 搜索 / skill / LLM / 编排接口。CLI 壳在 scripts/serve-135.mjs，
// 桌面版（app/main.js）直接 import 这个模块——两边跑的是同一份代码，不是两份。
//
//   GET  /api/health           → {ok, llm}
//   GET  /api/skills           → .agents/skills/ 下的清单
//   POST /api/search {query}   → 知乎数据开放平台全网搜索（spawn 项目内 zhihu CLI）
//   POST /api/llm {messages, json?, skill?}
//   POST /api/save {name, text} → 只有桌面版开放：写进数据目录（见下）
//
// 数据目录（桌面版）：~/Documents/知所栖-135/
//   把「自己的那棵树」和 skill 产物存成真文件，而不是浏览器 localStorage——
//   这是所有者 05:09 那句「保留它本地嘛」的落点，也是 dbs-learning-beta
//   的 SKILL.md 里写死的产物路径能第一次被真正兑现的地方。

import http from 'node:http';
import { spawn } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chatCompletion } from './lib/llm.mjs';

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json',
  '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp',
};

function loadEnvFile(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*export\s+([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

function readBody(req, limit = 4e6) {
  return new Promise((res, rej) => {
    let b = '';
    req.on('data', d => { b += d; if (b.length > limit) req.destroy(); });
    req.on('end', () => { try { res(JSON.parse(b || '{}')); } catch (e) { rej(e); } });
    req.on('error', rej);
  });
}

export function createZssServer(opts = {}) {
  const ROOT = opts.root;
  const PORT = Number(opts.port || 0);          // 0 = 让系统给一个空闲端口（桌面版用）
  const HOST = opts.host || '127.0.0.1';
  const DATA_DIR = opts.dataDir || null;        // 非空 = 开放 /api/save（桌面版）
  const STATIC_ROOT = join(ROOT, opts.staticRoot || 'prototype');
  const DEFAULT_PAGE = opts.defaultPage || '/知所栖-135-基础框架.html';

  // 凭证来源：桌面版打包后**绝不内置 key**（AGENTS.md 硬边界：key 不进任何会被分发的东西）。
  // 打包版读用户自己的 ~/Documents/知所栖-135/llm.env；开发态读项目的 .private/llm.env。
  loadEnvFile(opts.envFile || join(ROOT, '.private', 'llm.env'));
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

  async function llmForward(messages, o = {}) {
    const base = process.env.LLM_API_BASE, key = process.env.LLM_API_KEY, model = process.env.LLM_MODEL;
    if (!base || !key || !model) return { error: 'llm-not-configured（设 LLM_API_BASE / LLM_API_KEY / LLM_MODEL）' };
    // 默认走 JSON 模式（费曼判定用）。DeepSeek 的 JSON 模式要求提示词里出现 "json" 字样，
    // 否则 400；失败时原样带出上游报错，免得只看到 llm-http-400 却不知道为什么。
    // o.json === false 时走自由文本（对话用）。
    const reply = await chatCompletion({ base, key, model, messages,
      json: o.json !== false, errorBodyFallback: true });
    if (!reply.ok) return { error: `llm-http-${reply.status}`, detail: reply.detail };
    return { content: reply.content, tokens: reply.tokens, model: reply.model };
  }

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    const json = (o) => res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(o));

    if (url.pathname === '/api/health') {
      return json({ ok: true, llm: !!(process.env.LLM_API_BASE && process.env.LLM_API_KEY && process.env.LLM_MODEL),
                    app: !!DATA_DIR, dataDir: DATA_DIR || null, version: opts.version || null,
                    packaged: !!opts.packaged, root: ROOT });
    }
    if (url.pathname === '/api/skills') return json({ dir: '.agents/skills', skills: listSkills() });

    if (url.pathname === '/api/search' && req.method === 'POST') {
      const body = await readBody(req);
      return json(await zhihuSearch(String(body.query || '').slice(0, 80)));
    }
    if (url.pathname === '/api/llm' && req.method === 'POST') {
      const body = await readBody(req);
      let messages = body.messages || [];
      let skillNote = null;
      if (body.skill) {
        const txt = readSkill(body.skill);
        if (!txt) return json({ error: 'skill-not-found', skill: body.skill });
        messages = [{ role: 'system', content: txt }, ...messages.filter(m => m.role !== 'system')];
        skillNote = body.skill;
      }
      const out = await llmForward(messages, { json: body.json });
      if (skillNote && !out.error) out.skill = skillNote;
      return json(out);
    }

    // /dbs 的两段式交接：先把组合提示词交给用户审阅，再由按钮触发这里。
    // 这里才真正加载多个 SKILL.md，并把知乎搜索结果放进同一轮下游上下文。
    if (url.pathname === '/api/orchestrate' && req.method === 'POST') {
      const body = await readBody(req);
      const task = String(body.task || '').trim().slice(0, 4000);
      const requested = Array.isArray(body.skills) ? body.skills : [];
      const skills = [...new Set(requested.map(x => String(x || '').trim()).filter(Boolean))].slice(0, 3);
      if (!task) return json({ error: 'task-required' });
      if (!skills.length) return json({ error: 'skills-required' });
      if (requested.length > 3) return json({ error: 'too-many-skills（最多 1 个主 Skill + 2 个辅助 Skill）' });

      const skillTexts = [];
      for (const name of skills) {
        const txt = readSkill(name);
        if (!txt) return json({ error: 'skill-not-found', skill: name });
        skillTexts.push({ name, text: txt });
      }

      const prompt = String(body.prompt || '').trim().slice(0, 20000);
      if (!prompt) return json({ error: 'prompt-required' });
      if (body.preview) {
        return json({ ok: true, preview: true, task, skills, prompt, sources: [] });
      }

      let sources = [];
      let sourceError = null;
      if (skills.includes('zhihu')) {
        const found = await zhihuSearch(task.slice(0, 80));
        if (found.error) sourceError = found.error;
        sources = found.items || [];
      }
      const sourceBlock = sources.length
        ? '\n\n知乎检索材料（只作为待核验来源，不把摘要当全文）：\n'
          + sources.map((s, i) => `${i + 1}. ${s.title || '无标题'} — ${s.author || '未知作者'}\n${s.excerpt || ''}\n${s.url || ''}`).join('\n')
        : (sourceError ? `\n\n知乎检索失败：${sourceError}。请在结果中明确标注材料缺口。` : '');
      const system = [
        '你正在执行一次由 /dbs 编排的组合任务。严格遵守下面的任务提示词、Skill 原文、顺序和停止条件。',
        '最终只交付一份由主 Skill 统领的结果；区分事实、推断、未知；保留用户的决定权。',
        '—— 组合提示词 ——\n' + prompt,
        ...skillTexts.map(s => `\n—— /${s.name} · SKILL.md 原文 ——\n${s.text}`),
        sourceBlock,
      ].join('\n');
      const out = await llmForward([
        { role: 'system', content: system },
        { role: 'user', content: task },
      ], { json: false });
      if (out.error) return json({ ...out, task, skills, prompt, sources, sourceError });
      return json({ ok: true, ...out, task, skills, prompt, sources, sourceError });
    }

    // 写文件：只有桌面版开放（DATA_DIR 非空）。这是网页版做不到的那一件事——
    // dbs-learning-beta 的 SKILL.md 要求把产物写到 ~/Documents/dbskill-open-learning/<课题>/01.md。
    if (url.pathname === '/api/save' && req.method === 'POST') {
      if (!DATA_DIR) return json({ error: 'read-only（网页版没有写文件权限）' });
      const { rel, text } = await readBody(req);
      const parts = String(rel || '').replace(/\\/g, '/').split('/').filter(Boolean);
      // 踩过：原来是「把 .. 过滤掉」——`../../../../tmp/x.md` 会被静默改写成
      // DATA_DIR/tmp/x.md 写下去。它确实没跳出目录，但**把一次越界尝试变成了一次成功的写入**，
      // 调用方还以为自己写对了地方。越界就直说越界。
      if (!parts.length || parts.some(x => x === '..') || !/\.(md|txt|json)$/i.test(parts[parts.length - 1])) {
        return json({ error: 'bad-path（只允许 .md/.txt/.json；路径里不许出现 ..）' });
      }
      const full = join(DATA_DIR, ...parts);
      if (!full.startsWith(DATA_DIR + '/')) return json({ error: 'bad-path（解析后跑到数据目录外了）' });
      mkdirSync(join(full, '..'), { recursive: true });
      writeFileSync(full, String(text ?? ''));
      return json({ ok: true, path: full });
    }

    // 自己的那棵树 / 学习记录：网页版存 localStorage，桌面版额外落一份真文件
    if (url.pathname === '/api/data' && req.method === 'POST') {
      if (!DATA_DIR) return json({ error: 'read-only' });
      const body = await readBody(req);
      mkdirSync(DATA_DIR, { recursive: true });
      const f = join(DATA_DIR, '学习记录.json');
      writeFileSync(f, JSON.stringify({ savedAt: new Date().toISOString(), ...body }, null, 1));
      return json({ ok: true, path: f });
    }

    // 静态页。url.pathname 是百分号编码的，中文文件名不解码就永远 404（踩过）。
    let decoded; try { decoded = decodeURIComponent(url.pathname); } catch { decoded = url.pathname; }
    const p = decoded === '/' ? DEFAULT_PAGE : decoded;
    const file = join(STATIC_ROOT, p);
    if (file.startsWith(STATIC_ROOT) && existsSync(file)) {
      return res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' }).end(readFileSync(file));
    }
    res.writeHead(404).end('not found');
  });

  return new Promise((resolve) => {
    server.listen(PORT, HOST, () => resolve({ server, port: server.address().port, host: HOST }));
  });
}
