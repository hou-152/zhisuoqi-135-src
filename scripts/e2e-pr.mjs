#!/usr/bin/env node
// PR E2E 闸门执行器：固定 profile、无密钥运行、一次重试、结果回执。
//
// 该脚本是确定性执行层。它不让模型自由探索，也不接受模型改写 verdict。
// AI 解释任务只能读取这里生成的 JSON 与已脱敏 artifacts。

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawn } from 'node:child_process';

const HERE = path.resolve(import.meta.dirname, '..');
const argv = new Map(process.argv.slice(2).filter(x => x.startsWith('--')).map(x => {
  const i = x.indexOf('='); return i < 0 ? [x.slice(2), true] : [x.slice(2, i), x.slice(i + 1)];
}));
const ROOT = path.resolve(String(argv.get('root') || HERE));
const ARTIFACTS = path.resolve(String(argv.get('artifacts') || path.join(ROOT, '.e2e-artifacts')));
const RESULT_PATH = path.resolve(String(argv.get('result') || path.join(ARTIFACTS, 'e2e-result.json')));
const REQUESTED_PROFILE = String(argv.get('profile') || 'auto');
const RETRIES = 1;
const timeoutMs = Number(argv.get('timeout-ms') || 15 * 60 * 1000);
const runId = process.env.GITHUB_RUN_ID || `${Date.now()}-${crypto.randomUUID()}`;

fs.mkdirSync(ARTIFACTS, { recursive: true });
const CONTRACT = path.join(ROOT, 'e2e', 'pr-contract.json');
if (!fs.existsSync(CONTRACT)) throw new Error(`缺少固定 E2E 契约：${CONTRACT}`);
const contract = JSON.parse(fs.readFileSync(CONTRACT, 'utf8'));
for (const id of ['E2E-CORE-001', 'E2E-FAIL-002', 'E2E-BOUNDARY-003']) {
  if (!contract.scenarios?.some(s => s.id === id && s.required)) throw new Error(`固定 E2E 契约缺少必测场景：${id}`);
}

// Never pass credentials from a developer shell or a hosted runner into the
// process under test.  In particular serve-135 can load .private/llm.env;
// PR E2E uses a static server and offline fixtures, so no credential is needed.
const env = { ...process.env, CI: '1', ZSS_E2E: '1', ZSS_LOAD_ENV: '0' };
for (const key of Object.keys(env)) {
  if (/(_KEY|_TOKEN|_SECRET|PASSWORD|CREDENTIAL|LLM_API|OPENAI_API|ANTHROPIC_API|DEEPSEEK_API|ZHIHU)/i.test(key)) delete env[key];
}
env.PATH = process.env.PATH || env.PATH;

const redact = (value) => String(value || '')
  .replace(/Bearer\s+[A-Za-z0-9._\-+/=]+/gi, 'Bearer [REDACTED]')
  .replace(/(?:sk|key|token|secret)[-_]?[A-Za-z0-9]{8,}/gi, '[REDACTED]')
  .replace(/(LLM_API_KEY|OPENAI_API_KEY|ANTHROPIC_API_KEY|DEEPSEEK_API_KEY)\s*=\s*[^\s\n]+/gi, '$1=[REDACTED]');

function command(command, args, { cwd = ROOT, timeout = timeoutMs, label } = {}) {
  return new Promise(resolve => {
    const started = Date.now();
    const child = spawn(command, args, { cwd, env, detached: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '', stderr = '', timedOut = false, settled = false;
    child.stdout.on('data', d => { stdout += d; });
    child.stderr.on('data', d => { stderr += d; });
    const timer = setTimeout(() => {
      timedOut = true;
      try { process.kill(-child.pid, 'SIGTERM'); } catch { child.kill('SIGTERM'); }
      setTimeout(() => { try { process.kill(-child.pid, 'SIGKILL'); } catch {} }, 1500).unref();
    }, timeout);
    const finish = (code, signal, spawnError) => {
      if (settled) return; settled = true; clearTimeout(timer);
      const out = redact(stdout), err = redact(stderr);
      const base = safeLabel(label || command);
      const stdoutFile = path.join(ARTIFACTS, `${base}.stdout.log`);
      const stderrFile = path.join(ARTIFACTS, `${base}.stderr.log`);
      fs.writeFileSync(stdoutFile, out); fs.writeFileSync(stderrFile, err);
      resolve({ command, args, code: code ?? 1, signal, timedOut, spawnError: spawnError?.message,
        durationMs: Date.now() - started, stdout: out, stderr: err,
        artifacts: [path.basename(stdoutFile), path.basename(stderrFile)] });
    };
    child.on('error', e => finish(127, null, e));
    child.on('close', finish);
  });
}

function safeLabel(s) { return String(s).replace(/[^\w\-]+/g, '_').slice(0, 80); }

async function startStaticServer(directory, port) {
  const child = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
    cwd: directory, env, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
  let out = '', err = '';
  child.stdout.on('data', d => { out += d; }); child.stderr.on('data', d => { err += d; });
  const started = Date.now();
  let ready = false;
  while (Date.now() - started < 15000) {
    try { const r = await fetch(`http://127.0.0.1:${port}/`); if (r.ok) { ready = true; break; } } catch {}
    await new Promise(r => setTimeout(r, 150));
  }
  if (!ready) {
    try { process.kill(-child.pid, 'SIGTERM'); } catch { child.kill('SIGTERM'); }
    throw new Error(`静态服务未就绪：${directory}；${redact(err || out).slice(0, 300)}`);
  }
  return { child, stop: () => { try { process.kill(-child.pid, 'SIGTERM'); } catch { child.kill('SIGTERM'); } } };
}

function changedFiles() {
  const explicit = argv.get('changed');
  if (explicit) return String(explicit).split(',').map(x => x.trim()).filter(Boolean);
  const base = process.env.BASE_SHA || process.env.GITHUB_BASE_SHA;
  const head = process.env.HEAD_SHA || process.env.GITHUB_SHA || 'HEAD';
  if (!base) return [];
  return new Promise(resolve => {
    const p = spawn('git', ['diff', '--name-only', `${base}...${head}`], { cwd: ROOT, env, stdio: ['ignore', 'pipe', 'ignore'] });
    let out = ''; p.stdout.on('data', d => out += d); p.on('close', () => resolve(out.split('\n').filter(Boolean)));
    p.on('error', () => resolve([]));
  });
}

async function selectProfiles() {
  if (REQUESTED_PROFILE !== 'auto') {
    if (REQUESTED_PROFILE === 'full') return ['delivery', 'core-135', 'shell-public', 'desktop'];
    return [...new Set(['delivery', REQUESTED_PROFILE])];
  }
  const files = await changedFiles();
  const has = (pattern) => files.some(file => pattern.test(file));
  const profiles = ['delivery'];
  if (!files.length || has(/prototype\/知所栖-135-基础框架|scripts\/(serve|e2e|lib\/cdp|verify-135|test-daobi)/)) profiles.push('core-135');
  if (has(/prototype\/知所栖-壳|deploy\/zhisuoqi-135|scripts\/(build-public|check-public|shot-shell)/)) profiles.push('shell-public');
  if (has(/^app\//) || has(/scripts\/build-app/)) profiles.push('desktop');
  if (has(/^(\.github\/|scripts\/|e2e\/|evidence\/mock\/|SOURCE_OF_TRUTH\.md$|knowledge\/)/)) return ['delivery', 'core-135', 'shell-public', 'desktop'];
  return [...new Set(profiles)];
}

async function runScenario(profile, scenario, fn, { retries = RETRIES } = {}) {
  const attempts = [];
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    const started = Date.now();
    let r;
    try { r = await fn(); }
    catch (e) { r = { code: 127, spawnError: e.message, stdout: '', stderr: '', artifacts: [] }; }
    const childVerdict = r.stdout?.match(/"verdict"\s*:\s*"(PASS|FAIL|BLOCKED|UNSTABLE)"/)?.[1];
    const status = r.timedOut || r.spawnError || childVerdict === 'BLOCKED' ? 'BLOCKED' : r.code === 0 ? 'PASS' : 'FAIL';
    attempts.push({ attempt, status, durationMs: Date.now() - started, command: r.command, args: r.args,
      artifacts: r.artifacts || [], error: r.spawnError || (r.code ? redact((r.stderr || r.stdout || '').slice(-1200)) : undefined) });
    if (status === 'PASS') {
      return { id: scenario, profile, status: attempt > 1 ? 'UNSTABLE' : 'PASS', attempts, artifacts: r.artifacts || [] };
    }
    if (attempt <= retries) continue;
    return { id: scenario, profile, status, attempts, artifacts: r.artifacts || [] };
  }
}

const node = (...args) => command(process.execPath, args, { label: args[0] });

async function runProfile(profile) {
  const scenarios = [];
  if (profile === 'delivery') {
    const commands = [
      ['DELIVERY-CM-VALIDATE', ['scripts/cm-validate.mjs']],
      ['DELIVERY-SMOKE', ['scripts/test-delivery-smoke.mjs']],
      ['DELIVERY-ADVERSARIAL', ['scripts/test-delivery-adversarial.mjs', '--no-browser']],
      ['DELIVERY-MOCK', ['scripts/verify-mock.mjs']],
      ['DELIVERY-MOCK-BROWSER', ['scripts/verify-mock-browser.mjs']],
    ];
    for (const [id, args] of commands) scenarios.push(await runScenario(profile, id, () => node(...args)));
  }
  if (profile === 'core-135') {
    const staticServer = await startStaticServer(path.join(ROOT, 'prototype'), 5198);
    try {
      const out = path.join(ARTIFACTS, 'core-blackbox'); fs.mkdirSync(out, { recursive: true });
      const coreResult = path.join(out, 'e2e-blackbox.json');
      const coreEntry = await runScenario(profile, 'E2E-CORE-001', () => node('scripts/e2e-blackbox.mjs', `--url=http://127.0.0.1:5198/知所栖-135-基础框架.html`, `--artifacts=${out}`, `--result=${coreResult}`), { retries: 1 });
      scenarios.push(coreEntry);
      // e2e-blackbox also runs the boundary case; surface it as its own row in
      // the parent receipt so a reviewer does not have to open a nested JSON.
      try {
        const nested = JSON.parse(fs.readFileSync(coreResult, 'utf8'));
        for (const value of nested.artifacts || []) coreEntry.artifacts.push(path.join('core-blackbox', value));
        for (const item of nested.scenarios?.flatMap(x => [
          ...(x.artifacts || []),
          ...(x.steps || []).map(step => step.evidence).filter(Boolean),
        ]) || []) {
          const values = typeof item === 'string' ? [item] : [item.text, item.screenshot];
          for (const value of values.filter(Boolean)) coreEntry.artifacts.push(path.join('core-blackbox', value));
        }
        const boundary = nested.scenarios?.find(x => x.id === 'E2E-BOUNDARY-003');
        if (boundary) scenarios.push({ ...boundary, profile, source: path.relative(ARTIFACTS, coreResult) });
      } catch { /* the parent E2E-CORE row already records the failure */ }
      const failureOut = path.join(ARTIFACTS, 'failure-blackbox');
      const failureResult = path.join(failureOut, 'e2e-blackbox.json');
      const failureEntry = await runScenario(profile, 'E2E-FAIL-002', () => node('scripts/e2e-blackbox.mjs', '--failure', '--failure-only', `--url=http://127.0.0.1:5198/知所栖-135-基础框架.html`, `--artifacts=${failureOut}`, `--result=${failureResult}`), { retries: 1 });
      scenarios.push(failureEntry);
      try {
        const nested = JSON.parse(fs.readFileSync(failureResult, 'utf8'));
        for (const value of nested.artifacts || []) failureEntry.artifacts.push(path.join('failure-blackbox', value));
        for (const item of nested.scenarios?.flatMap(x => [
          ...(x.artifacts || []),
          ...(x.steps || []).map(step => step.evidence).filter(Boolean),
        ]) || []) {
          const values = typeof item === 'string' ? [item] : [item.text, item.screenshot];
          for (const value of values.filter(Boolean)) failureEntry.artifacts.push(path.join('failure-blackbox', value));
        }
      } catch { /* wrapper row still carries stdout/stderr */ }
    } finally { staticServer.stop(); }
  }
  if (profile === 'shell-public') {
    const dir = path.join(ROOT, 'deploy', 'zhisuoqi-135');
    if (!fs.existsSync(path.join(dir, 'index.html'))) {
      scenarios.push({ id: 'PUBLIC-ARTIFACT', profile, status: 'BLOCKED', attempts: [{ attempt: 1, status: 'BLOCKED', error: 'deploy/zhisuoqi-135/index.html 不存在' }] });
    } else {
      const server = await startStaticServer(dir, 5199);
      try { scenarios.push(await runScenario(profile, 'E2E-PUBLIC-004', () => node('scripts/check-public.mjs', 'http://zhisuoqi-135.test:5199/'))); }
      finally { server.stop(); }
    }
  }
  if (profile === 'desktop') {
    if (process.platform !== 'darwin') scenarios.push({ id: 'E2E-DESKTOP-005', profile, status: 'NOT_APPLICABLE', attempts: [], artifacts: [] });
    else scenarios.push(await runScenario(profile, 'E2E-DESKTOP-005', () => node('scripts/test-app.mjs')));
  }
  return scenarios;
}

const profiles = await selectProfiles();
const all = [];
for (const profile of profiles) {
  try { all.push(...await runProfile(profile)); }
  catch (e) { all.push({ id: `${profile.toUpperCase()}-PROFILE`, profile, status: 'BLOCKED', attempts: [{ attempt: 1, status: 'BLOCKED', error: e.message }] }); }
}

const statuses = all.map(x => x.status);
const verdict = statuses.includes('BLOCKED') || statuses.includes('NOT_APPLICABLE') ? 'BLOCKED'
  : statuses.includes('FAIL') ? 'FAIL'
    : statuses.includes('UNSTABLE') ? 'UNSTABLE'
      : 'PASS';
const result = {
  schemaVersion: 1, runId, pr: process.env.PR_NUMBER || process.env.GITHUB_EVENT_NUMBER ? Number(process.env.PR_NUMBER || process.env.GITHUB_EVENT_NUMBER) : null,
  headSha: process.env.HEAD_SHA || process.env.GITHUB_SHA || null,
  baseSha: process.env.BASE_SHA || process.env.GITHUB_BASE_SHA || null,
  candidateSha: (() => { try { return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim(); } catch { return null; } })(),
  evaluatorSha: (() => { try { return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim(); } catch { return null; } })(),
  profiles, environment: { os: process.platform, node: process.version, runner: process.env.RUNNER_OS || 'local' },
  scenarios: all, verdict,
  limitations: ['普通 PR 不读取 .private/llm.env、知乎凭证或生产数据。', '截图、DOM 和日志只能辅助复核，不能单独改变机器 verdict。', '真实 LLM／知乎检索需受保护的独立 workflow。'],
};
fs.writeFileSync(RESULT_PATH, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
process.exit(verdict === 'PASS' ? 0 : 1);
