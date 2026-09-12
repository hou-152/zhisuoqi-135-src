#!/usr/bin/env node
// 知所栖-135 本地服务桥（命令行版）。
//   静态页 + /api/search + /api/llm + /api/skills
// 用法：node scripts/serve-135.mjs   → http://127.0.0.1:5180
// 凭证：自动加载 .private/llm.env（已在 .gitignore，600）；已存在的环境变量优先，不被文件覆盖。
//
// 09-12 起，服务本体搬到了 scripts/serve-lib.mjs —— 桌面版（app/main.js）import 的是
// 同一份代码，不再是两份实现。这个文件现在只是「命令行壳 + 端口 5180 的默认值」。

import path from 'node:path';
import { createZssServer } from './serve-lib.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = Number(process.env.PORT || 5180);

const { port } = await createZssServer({ root: ROOT, port: PORT, host: '127.0.0.1' });

console.log(`知所栖-135 服务: http://127.0.0.1:${port}  `
  + `（/api/search 真实知乎检索 · /api/llm ${process.env.LLM_API_KEY ? '已配置' : '未配置，设 LLM_API_BASE/LLM_API_KEY/LLM_MODEL'}）`);
console.log('  桌面版（能写本地文件）：cd app && npm start');
