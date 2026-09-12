#!/usr/bin/env node
// 默认分支上的可信闸门。
//
// 这个脚本由 workflow_run 调用：执行器来自默认分支，SUT 来自 PR 合并候选。
// 它先读取变更文件做权限边界判断，再把 SUT 交给固定 e2e-pr.mjs。它不会
// 执行 PR 提供的 workflow，也不会把 GitHub token 传入被测进程。

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';

const args = new Map(process.argv.slice(2).filter(x => x.startsWith('--')).map(x => {
  const i = x.indexOf('='); return i < 0 ? [x.slice(2), true] : [x.slice(2, i), x.slice(i + 1)];
}));
const BASE_ROOT = path.resolve(String(args.get('base-root') || path.resolve(import.meta.dirname, '..')));
const SUT = path.resolve(String(args.get('sut') || BASE_ROOT));
const RESULT = path.resolve(String(args.get('result') || path.join(String(args.get('artifacts') || '.e2e-artifacts'), 'e2e-result.json')));
const ARTIFACTS = path.resolve(String(args.get('artifacts') || path.dirname(RESULT)));
const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const prNumber = Number(process.env.PR_NUMBER || 0);
fs.mkdirSync(ARTIFACTS, { recursive: true });

async function listChanged() {
  const supplied = args.get('changed');
  if (supplied) return String(supplied).split(',').map(x => x.trim()).filter(Boolean);
  if (!repo || !token || !prNumber) return [];
  const out = [];
  for (let page = 1; page <= 10; page++) {
    const r = await fetch(`https://api.github.com/repos/${repo}/pulls/${prNumber}/files?per_page=100&page=${page}`, {
      headers: { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'user-agent': 'zss135-trusted-e2e' },
    });
    if (!r.ok) throw new Error(`GitHub changed-files API ${r.status}`);
    const rows = await r.json(); out.push(...rows.map(x => x.filename));
    if (rows.length < 100) break;
  }
  return out;
}

const critical = (file) => /^(\.github\/|scripts\/|e2e\/|evidence\/mock\/|knowledge\/|app\/|package(?:-lock)?\.json$|SOURCE_OF_TRUTH\.md$|docs\/前端契约-知所栖135\.md$)/.test(file);
const baseSha = (() => { try { return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: BASE_ROOT, encoding: 'utf8' }).trim(); } catch { return null; } })();

function writeBlocked(files, reason) {
  const data = {
    schemaVersion: 1, runId: process.env.GITHUB_RUN_ID || null, pr: prNumber || null,
    headSha: process.env.HEAD_SHA || null, baseSha: process.env.BASE_SHA || null, evaluatorSha: baseSha,
    profiles: ['full'], environment: { runner: process.env.RUNNER_OS || 'github', os: process.platform, node: process.version },
    scenarios: [{ id: 'TRUST-BOUNDARY-001', profile: 'full', status: 'BLOCKED', attempts: [{ attempt: 1, status: 'BLOCKED', error: reason }], artifacts: [] }],
    verdict: 'BLOCKED', limitations: ['可信闸门检测到执行器、测试契约、mock、地图或桌面边界变更，需人工审查后再运行。'],
    changedFiles: files,
  };
  fs.writeFileSync(RESULT, JSON.stringify(data, null, 2));
  return 1;
}

const files = await listChanged();
const criticalFiles = files.filter(critical);
if (criticalFiles.length) {
  console.log(`可信边界阻塞：${criticalFiles.join('、')}`);
  process.exit(writeBlocked(criticalFiles, '关键执行器、workflow、测试契约、mock、地图、依赖或桌面版发生变化；自动合并停止。'));
}

const runner = path.join(BASE_ROOT, 'scripts', 'e2e-pr.mjs');
const childArgs = [runner, `--root=${SUT}`, '--profile=auto', `--changed=${files.join(',')}`, `--artifacts=${ARTIFACTS}`, `--result=${RESULT}`];
const childEnv = { ...process.env, HEAD_SHA: process.env.HEAD_SHA || process.env.GITHUB_SHA || '', BASE_SHA: process.env.BASE_SHA || '', E2E_TRUSTED: '1' };
for (const key of Object.keys(childEnv)) if (/(_KEY|_TOKEN|_SECRET|PASSWORD|CREDENTIAL|LLM_API|OPENAI_API|ANTHROPIC_API|DEEPSEEK_API|ZHIHU)/i.test(key)) delete childEnv[key];

const code = await new Promise(resolve => {
  const child = spawn(process.execPath, childArgs, { cwd: BASE_ROOT, env: childEnv, stdio: 'inherit' });
  child.on('error', e => { console.error('可信执行器启动失败：' + e.message); resolve(127); });
  child.on('close', c => resolve(c ?? 1));
});

try {
  const data = JSON.parse(fs.readFileSync(RESULT, 'utf8'));
  data.evaluatorSha = baseSha;
  data.changedFiles = files;
  fs.writeFileSync(RESULT, JSON.stringify(data, null, 2));
} catch (e) {
  writeBlocked(files, `固定执行器没有生成可解析结果：${e.message}`);
  process.exit(1);
}
process.exit(code);
