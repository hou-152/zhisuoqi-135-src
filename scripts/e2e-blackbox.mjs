#!/usr/bin/env node
// 知所栖 135 的黑盒浏览器验收。
//
// 这里故意只通过用户可见文字、稳定的 DOM 语义和 URL 操作页面：不读取
// state、CONCEPTS、judge、route 等业务内部变量，也不调用业务函数。
// 失败时保留截图、DOM 快照和控制台事件，供第二天不在线的人复核。

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const args = new Map(process.argv.slice(2).filter(x => x.startsWith('--')).map(x => {
  const i = x.indexOf('=');
  return i < 0 ? [x.slice(2), true] : [x.slice(2, i), x.slice(i + 1)];
}));
const URL_ = String(args.get('url') || 'http://127.0.0.1:5198/知所栖-135-基础框架.html');
const OUT = path.resolve(String(args.get('artifacts') || path.join(os.tmpdir(), `zss135-e2e-${process.pid}`)));
const RESULT = args.get('result') ? path.resolve(String(args.get('result'))) : path.join(OUT, 'e2e-blackbox.json');
const INCLUDE_FAILURE = args.has('failure');
const FAILURE_ONLY = args.has('failure-only');
const PORT = 9400 + (process.pid % 400);
const PROFILE = path.join(os.tmpdir(), `zss135-e2e-profile-${process.pid}`);

fs.mkdirSync(OUT, { recursive: true });
fs.rmSync(PROFILE, { recursive: true, force: true });
const contract = JSON.parse(fs.readFileSync(path.join(ROOT, 'e2e', 'pr-contract.json'), 'utf8'));
for (const id of ['E2E-CORE-001', 'E2E-BOUNDARY-003', ...(INCLUDE_FAILURE ? ['E2E-FAIL-002'] : [])]) {
  if (!contract.scenarios.some(s => s.id === id && s.required)) throw new Error(`黑盒契约缺少必测场景：${id}`);
}
for (const selector of ['.concept-card', '#c1 .option', '#c3 .option', '#moveseg button', '#feyn-input', '#feyn-btn', '#toast']) {
  if (!contract.stableSelectors?.includes(selector)) throw new Error(`黑盒契约缺少稳定选择器：${selector}`);
}

const result = {
  schemaVersion: 1,
  runner: 'scripts/e2e-blackbox.mjs',
  url: URL_,
  headSha: process.env.HEAD_SHA || process.env.GITHUB_SHA || null,
  environment: { os: process.platform, node: process.version, browser: CHROME },
  scenarios: [],
  limitations: [
    '黑盒使用离线页面与合成用户输入；未验证实时知乎、真实 LLM 或生产数据。',
    '依赖失败场景验证页面不冒充「验收通过」；当前产品若降级到规则引擎，报告会保留该事实。',
  ],
};

let chrome;
let cdp;
const errors = [];
const network = [];
const traceEvents = [];
let traceDone = null;
let tracingStarted = false;
const safeName = (s) => String(s).replace(/[^\w\-\u4e00-\u9fff]+/g, '_').slice(0, 70);
const pageText = () => cdp.eval('document.body ? document.body.innerText : ""');
const pageUrl = () => cdp.eval('location.href');
const saveEvidence = async (label) => {
  const n = safeName(label);
  const text = await pageText();
  fs.writeFileSync(path.join(OUT, `${n}.txt`), text);
  try { await cdp.screenshot(path.join(OUT, `${n}.png`)); } catch { /* 页面关闭时仍保留文本 */ }
  return { text: `${n}.txt`, screenshot: `${n}.png`, url: await pageUrl() };
};

async function waitForText(text, timeoutMs = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if ((await pageText()).includes(text)) return true;
    await sleep(120);
  }
  return false;
}

async function clickVisible(text, selector = 'button') {
  const needle = JSON.stringify(String(text));
  const sel = JSON.stringify(selector);
  return cdp.eval(`(() => {
    const b = [...document.querySelectorAll(${sel})].find(x => (x.innerText || x.textContent || '').includes(${needle}));
    if (!b) return false;
    b.scrollIntoView({block:'center'}); b.click(); return true;
  })()`);
}

async function clickCss(selector) {
  const s = JSON.stringify(selector);
  return cdp.eval(`(() => { const b = document.querySelector(${s}); if (!b) return false; b.scrollIntoView({block:'center'}); b.click(); return true; })()`);
}

async function fill(selector, value) {
  const s = JSON.stringify(selector);
  const v = JSON.stringify(value);
  return cdp.eval(`(() => { const e = document.querySelector(${s}); if (!e) return false; e.focus(); e.value = ${v}; e.dispatchEvent(new Event('input', {bubbles:true})); return true; })()`);
}

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

async function step(scenario, label, action, predicate, timeoutMs = 12000) {
  const started = Date.now();
  if (action) expect(await action(), `${label}：找不到可操作的界面元素`);
  if (predicate) expect(await waitForText(predicate, timeoutMs), `${label}：未看到「${predicate}」`);
  const evidence = await saveEvidence(`${scenario.id}-${label}`);
  scenario.steps.push({
    label,
    expected: predicate ? `页面包含「${predicate}」` : '用户可见操作元素存在并可操作',
    actual: `断言通过；详见 ${evidence.text}`,
    status: 'PASS',
    durationMs: Date.now() - started,
    evidence,
  });
}

async function navigate(url = URL_) {
  await cdp.send('Page.navigate', { url });
  expect(await waitForText('当前问题', 20000), '页面未加载到 135 主线');
}

async function runCore() {
  const s = {
    id: 'E2E-CORE-001',
    expected: contract.scenarios.find(x => x.id === 'E2E-CORE-001')?.pass || '所有 135 用户路径断言通过',
    status: 'PASS', attempts: 1, steps: [], artifacts: [],
  };
  const longAnswer = '景别是取景距离决定画面信息量，远景交代环境，近景聚焦情绪和细节，单一景别连续使用会像 PPT。运镜是在时间轴上引导注意力和视线，推是强调、拉是交代、摇是展示空间、移是跟随；不动或固定机位会让画面呆。镜头提示词的结构是景别、运镜、主体动作、光线和风格，要逐镜头写分镜，写清怎么变、动作和运动，而不是只写静态的是什么。';
  try {
    await step(s, '首屏', null, '互动阅读器');
    await step(s, '进入概念', () => cdp.eval(`(() => { const b=[...document.querySelectorAll('.concept-card')].find(x => (x.innerText||'').includes('景别'))?.querySelector('button'); if(!b)return false;b.click();return true; })()`), '1 阅读器');
    await step(s, '打开阅读器', () => clickVisible('1 阅读器'), '互动阅读器');
    await step(s, '完成阅读', () => clickVisible('读完，标记已读'), '案例决策场');
    await step(s, '先做决策', () => clickCss('#c1 .option:nth-child(2)'), '历史同构比较');
    await step(s, '修订决策', () => clickCss('#c3 .option:nth-child(3)'), '你的决策轨迹');
    await step(s, '进入实验台', () => clickVisible('下一步：5 实验台验证你的选择'), '已试');
    for (let i = 1; i <= 3; i++) {
      await step(s, `运镜选择 ${i}`, () => clickCss(`#moveseg button:nth-child(${i})`), '待播放');
      await step(s, `运镜播放 ${i}`, () => clickVisible('播放'), i === 3 ? '已试 3/3 种运镜' : '播放');
    }
    await step(s, '实验完成', null, '实验完成');
    await step(s, '进入费曼验收', () => clickVisible('进费曼演练室验收'), '费曼演练室');
    await step(s, '提交完整复述', async () => { expect(await fill('#feyn-input', longAnswer), '费曼输入框不存在'); return clickVisible('开始检验'); }, '验收通过', 35000);
    await step(s, '回到主线', () => clickVisible('返回主线'), '当前问题');
    await step(s, '保存断点', () => clickVisible('保存断点'), '断点已保存');
    await cdp.send('Page.reload', { ignoreCache: true });
    expect(await waitForText('当前问题', 20000), '刷新后主线未恢复');
    await step(s, '恢复断点', () => clickVisible('恢复断点'), '当前问题');
    const recovered = await pageText();
    expect(recovered.includes('✓ 已开始') && recovered.includes('✓ 已决策') && recovered.includes('✓ 已动手'), '刷新后没有看到已恢复的主流程状态');
    s.artifacts.push(await saveEvidence('E2E-CORE-001-刷新后状态'));
    s.actual = '所有黑盒步骤通过；刷新后仍显示已开始、已决策、已动手';
  } catch (e) {
    s.status = 'FAIL';
    s.error = e.message;
    s.actual = `断言失败：${e.message}`;
    s.artifacts.push(await saveEvidence('E2E-CORE-001-失败'));
  }
  result.scenarios.push(s);
}

async function runDependencyFailure() {
  const s = {
    id: 'E2E-FAIL-002',
    expected: contract.scenarios.find(x => x.id === 'E2E-FAIL-002')?.pass || '失败状态可见且不冒充通过',
    status: 'PASS', attempts: 1, steps: [], artifacts: [],
  };
  try {
    const mock = fs.readFileSync(path.join(ROOT, 'evidence', 'mock', 'mock-fetch.js'), 'utf8');
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: mock });
    await navigate(URL_);
    expect(await cdp.eval(`typeof window.__MOCK__ === 'object' && typeof window.__MOCK__.force === 'function'`), '失败场景 mock 没有注入');
    await cdp.eval(`window.__MOCK__.force('POST /api/llm · 失败态')`);
    await cdp.send('Page.navigate', { url: URL_ + '#/feynman' });
    expect(await waitForText('费曼演练室', 20000), '失败场景未进入费曼页');
    expect(await fill('#feyn-input', '我知道它会像 PPT，但还没有讲清楚原因。'), '失败场景输入框不存在');
    expect(await clickVisible('开始检验'), '失败场景按钮不存在');
    expect(await waitForText('有漏点', 35000), '依赖失败后没有显示可见的未通过状态');
    const text = await pageText();
    expect(!text.includes('验收通过'), '依赖失败被错误显示为验收通过');
    s.artifacts.push(await saveEvidence('E2E-FAIL-002-依赖失败'));
    s.actual = '页面显示有漏点，且没有显示验收通过';
  } catch (e) {
    s.status = 'FAIL';
    s.error = e.message;
    s.actual = `断言失败：${e.message}`;
    s.artifacts.push(await saveEvidence('E2E-FAIL-002-失败'));
  }
  result.scenarios.push(s);
}

async function runBoundary() {
  const s = {
    id: 'E2E-BOUNDARY-003',
    expected: contract.scenarios.find(x => x.id === 'E2E-BOUNDARY-003')?.pass || '空输入被明确拒绝',
    status: 'PASS', attempts: 1, steps: [], artifacts: [],
  };
  try {
    await cdp.send('Page.navigate', { url: URL_ + '#/feynman' });
    expect(await waitForText('费曼演练室', 20000), '边界场景未进入费曼页');
    expect(await fill('#feyn-input', ''), '边界场景输入框不存在');
    expect(await clickVisible('开始检验'), '边界场景按钮不存在');
    expect(await waitForText('再多写几句', 5000), '空输入没有显示明确约束');
    s.actual = '空输入显示再多写几句，未发起无效判定';
    s.artifacts.push(await saveEvidence('E2E-BOUNDARY-003-空输入'));
  } catch (e) {
    s.status = 'FAIL'; s.error = e.message; s.actual = `断言失败：${e.message}`;
    s.artifacts.push(await saveEvidence('E2E-BOUNDARY-003-失败'));
  }
  result.scenarios.push(s);
}

try {
  chrome = spawnProcess(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
    '--window-size=1280,900', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', '--no-proxy-server', 'about:blank',
  ], { stdio: 'ignore' });
  const target = await waitForPage(PORT, { attempts: 80, intervalMs: 250 });
  if (!target) throw new Error(`Chrome 调试端口没起来（${CHROME}）`);
  cdp = await openCDP(target.webSocketDebuggerUrl, { onEvent: event => {
    if (event.method === 'Tracing.dataCollected') traceEvents.push(...(event.params?.value || []));
    if (event.method === 'Tracing.tracingComplete') { traceDone?.(); traceDone = null; }
    if (event.method === 'Network.requestWillBeSent') {
      network.push({ method: event.params.request?.method, url: event.params.request?.url });
    }
    if (event.method === 'Runtime.exceptionThrown' || (event.method === 'Log.entryAdded' && event.params?.entry?.level === 'error')) {
      const raw = event.params?.exceptionDetails?.exception?.description || event.params?.entry?.text || '';
      // 无后端的离线 profile 会故意探 /api/health；这类 404 是测试前提，
      // 不把它当页面 JS 错误。其余控制台错误照实留在回执里。
      if (!/favicon|\/api\//i.test(raw)) errors.push(String(raw).replace(/\s+/g, ' ').slice(0, 500));
    }
  }});
  await cdp.send('Page.enable'); await cdp.send('Runtime.enable'); await cdp.send('Log.enable'); await cdp.send('Network.enable');
  try {
    await cdp.send('Tracing.start', { categories: 'devtools.timeline,devtools.network', options: 'record-until-full' });
    tracingStarted = true;
  } catch { /* trace 是辅助证据，不能遮蔽产品断言 */ }
  await navigate();
  if (!FAILURE_ONLY) {
    await runCore();
    await runBoundary();
  }
  if (INCLUDE_FAILURE) await runDependencyFailure();
} catch (e) {
  result.runnerError = e.message;
} finally {
  if (tracingStarted && cdp) {
    try {
      const done = new Promise(resolve => {
        traceDone = resolve;
        setTimeout(resolve, 3000).unref();
      });
      await cdp.send('Tracing.end');
      await done;
    } catch { /* trace 收集失败仍保留其它证据 */ }
  }
  result.consoleErrors = errors;
  result.network = network.map(item => ({ ...item, url: String(item.url || '').split('?')[0] }));
  fs.writeFileSync(path.join(OUT, 'network.json'), JSON.stringify(result.network, null, 2));
  fs.writeFileSync(path.join(OUT, 'browser-trace.json'), JSON.stringify({ traceEvents }, null, 2));
  result.artifacts = [...(result.artifacts || []), 'network.json', 'browser-trace.json'];
  result.verdict = result.runnerError ? 'BLOCKED' : result.scenarios.some(s => s.status === 'FAIL') ? 'FAIL' : 'PASS';
  fs.writeFileSync(RESULT, JSON.stringify(result, null, 2));
  cdp?.close();
  chrome?.kill();
  fs.rmSync(PROFILE, { recursive: true, force: true, maxRetries: 5, retryDelay: 120 });
}

console.log(JSON.stringify(result, null, 2));
process.exit(result.verdict === 'PASS' ? 0 : 1);
