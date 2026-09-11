// 知所栖-135 基础框架 v3 自动验证：无头 Chrome + CDP（Node 24 内置 WebSocket，零依赖）
// 前置：node scripts/serve-135.mjs（5180 端口，同时验证 /api/health、静态服务、真实检索代理）
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9223;
const BASE = 'http://127.0.0.1:5180/';
const { spawn } = await import('node:child_process');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--user-data-dir=/tmp/zss135-profile', '--window-size=1280,1400', BASE,
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill(); } catch {} });

let targets = null;
for (let i = 0; i < 40; i++) {
  await sleep(250);
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json`);
    targets = await res.json();
    if (targets.some(t => t.type === 'page' && t.webSocketDebuggerUrl)) break;
  } catch {}
}
if (!targets) { console.error('FATAL: Chrome devtools 端口未就绪'); process.exit(2); }
const page = targets.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let mid = 0;
const pending = new Map();
const jsErrors = [];
ws.onmessage = (e) => {
  const msg = JSON.parse(typeof e.data === 'string' ? e.data : e.data.toString());
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  if (msg.method === 'Runtime.exceptionThrown')
    jsErrors.push(msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text || 'unknown');
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error')
    jsErrors.push('console.error: ' + JSON.stringify(msg.params.args?.map(a => a.value ?? a.description)));
};
function send(method, params = {}) {
  return new Promise((res) => { const id = ++mid; pending.set(id, res); ws.send(JSON.stringify({ id, method, params })); });
}
async function ev(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) throw new Error('页面异常: ' + JSON.stringify(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text));
  return r.result?.result?.value;
}
const clickByText = (sel, text) => ev(`(() => { const el = [...document.querySelectorAll('${sel}')].find(b => b.textContent.trim().includes('${text}')); if (!el) return 'MISS:${text}'; el.click(); return 'OK'; })()`);

await send('Runtime.enable');
await send('Page.enable');
await send('Page.navigate', { url: BASE });
await sleep(1500);

const checks = [];
function check(name, ok, detail = '') { checks.push({ name, ok, detail }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + name + (detail ? ' | ' + detail : '')); }

// ① 主线：135 步骤条 + 方法论标签
check('主线渲染135步骤条（4步）', (await ev(`document.querySelectorAll('.stepper .step').length`)) === 4);
check('四步均标注方法论出处', (await ev(`document.querySelectorAll('.stepper .skill-chip').length`)) === 4);
check('dbs-learning 标签可见', ((await ev(`document.body.textContent`)) || '').includes('dbs-learning'));
check('dbs-standard-answer 标签可见', ((await ev(`document.body.textContent`)) || '').includes('dbs-standard-answer'));
check('概念卡渲染3张', (await ev(`document.querySelectorAll('.concept-card').length`)) === 3);

// ② 1 互动阅读器：三层梯度 + 反馈驱动
check('进入景别概念', (await clickByText('.concept-card button', '进入')) === 'OK');
await sleep(80);
const btnTexts = (await ev(`[...document.querySelectorAll('main .row .btn')].map(b=>b.textContent.trim()).join('|')`)) || '';
check('概念页顺序 1<3<5', btnTexts.indexOf('阅读器') < btnTexts.indexOf('决策场') && btnTexts.indexOf('决策场') < btnTexts.indexOf('实验台'), btnTexts);
check('打开 1 阅读器', (await clickByText('button', '阅读器')) === 'OK');
await sleep(80);
check('默认 L1 直觉层', ((await ev(`document.getElementById('layer-body').textContent`)) || '').includes('五档由远到近'));
check('反馈：想看怎么用 → 切 L3', (await clickByText('button', '想看怎么用')) === 'OK');
await sleep(80);
check('已切到 L3 应用层', ((await ev(`document.getElementById('layer-body').textContent`)) || '').includes('怎么用'));
check('阅读器含真实延伸阅读', (await ev(`!!document.querySelector('.case-card a[href*="zhuanlan.zhihu.com"]')`)) === true);
check('反馈：讲明白了 ✓', (await clickByText('button', '讲明白了')) === 'OK');
await sleep(80);
check('反馈已记录', ((await ev(`document.getElementById('fb-note').textContent`)) || '').includes('确认理解'));

// ③ 读完 → 3 决策场
check('读完跳决策场', (await clickByText('button', '读完，标记已读')) === 'OK');
await sleep(80);
check('hash 到案例页', (await ev(`location.hash`)) === '#/case');
check('阅读已记录', (await ev(`state.read['shot-size']`)) === true);

// ④ 3 案例决策场：决策 → 同构比较 → 带条件标准答案 → 修订
check('先选A', (await clickByText('#c1 .option', '推倒重来')) === 'OK');
await sleep(80);
check('真实案例揭示3条', (await ev(`document.querySelectorAll('.case-card').length`)) === 3);
check('案例卡含知乎原文链接', (await ev(`document.querySelectorAll('.case-card a[href*="zhuanlan.zhihu.com"]').length`)) === 3);
check('带条件标准答案表出现', ((await ev(`document.querySelector('table.std')?.textContent`)) || '').includes('预算 = 0'));
check('方法论标注：先决策后比较', ((await ev(`document.body.textContent`)) || '').includes('先决策，再做历史同构比较'));
check('修订为B', (await clickByText('#c3 .option', '先剪再说')) === 'OK');
await sleep(80);
check('决策轨迹呈现', ((await ev(`document.getElementById('c4').textContent`)) || '').includes('A → 案例后修订为 B'));
check('讲评后去 5 实验台', (await clickByText('#c4 button', '实验台验证')) !== 'MISS:实验台验证');
check('案例状态记录', (await ev(`state.caseDone`)) === true);

// ⑤ 5 技术实验台（运镜，讲评 CTA 直达）
await sleep(80);
check('CTA 跳到运镜实验', (await ev(`location.hash`)) === '#/lab/camera-move');
for (const m of ['推', '拉', '摇']) {
  await clickByText('#moveseg button', m);
  await clickByText('button', '播放');
  await sleep(60);
}
check('运镜已试3种', (await ev(`document.getElementById('movetry').textContent`)) === '3');
check('运镜实验记录', (await ev(`state.lab['camera-move']`)) === true);
check('完成后引导去费曼', ((await ev(`document.getElementById('labdone').textContent`)) || '').includes('费曼演练室'));
check('独立结论可保存', (await clickByText('button', '保存结论')) !== 'MISS:保存结论');

// ⑥ 景别实验
await ev(`location.hash = '#/lab/shot-size'`);
await sleep(80);
for (const s of ['全景', '中景']) await clickByText('#sizeseg button', s);
await sleep(80);
check('景别实验完成', ((await ev(`document.getElementById('labdone').textContent`)) || '').includes('实验完成'));

// ⑦ 提示词实验
await ev(`location.hash = '#/lab/shot-prompt'`);
await sleep(80);
check('生成提示词', (await clickByText('button', '生成提示词')) === 'OK');
await sleep(80);
await ev(`document.getElementById('p-move').value = '固定机位'`);
await clickByText('button', '生成提示词');
await sleep(80);
check('固定机位给出PPT诊断', ((await ev(`document.getElementById('p-out').textContent`)) || '').includes('标准配方'));
check('提示词实验记录', (await ev(`state.lab['shot-prompt']`)) === true);

// ⑧ 限速器：三模块走完 ≠ 完成；未复述不结算，且必须可跳过
await ev(`location.hash = '#/'`);
await sleep(120);
let homeText = (await ev(`document.querySelector('main').textContent`)) || '';
check('三模块走完但未复述 → 显示「尚未验收」', homeText.includes('本次尚未验收'));
check('未验收不等于已完成', (await ev(`stageDone().feyn`)) === false);
check('初始未跳过', (await ev(`state.feynSkipped`)) === false);

await ev(`location.hash = '#/feynman'`);
await sleep(120);
const feynBody = (await ev(`document.querySelector('main').textContent`)) || '';
check('验收标准写成可当场判定的动作', feynBody.includes('每个概念至少讲到位 2 条要点'));
check('标明这是限速器而非打分', feynBody.includes('限速器'));
check('跳过按钮存在（必须可跳过）', (await clickByText('button', '这次跳过验收')) === 'OK');
await sleep(120);
check('跳过后 state 记为未验收', (await ev(`state.feynSkipped`)) === true);
check('跳过不产生任何「未通过」', (await ev(`Object.values(state.feyn).every(v=>v==='none')`)) === true);
homeText = (await ev(`document.querySelector('main').textContent`)) || '';
check('首页显示「已跳过」且注明不算未通过', homeText.includes('已跳过验收') && homeText.includes('不算未通过'));

// ⑧b 费曼演练室（离线规则 + 真实检索证据 via serve 桥）
// 每次先清空报告再点检验，否则会轮询到上一轮的旧报告
async function runFeyn(text){
  await ev(`document.getElementById('feyn-out').innerHTML = ''`);
  await ev(`document.getElementById('feyn-input').value = ${JSON.stringify(text)}`);
  const clicked = await clickByText('button', '检验');
  if (clicked !== 'OK') return 'MISS:检验按钮';
  let t = '';
  for (let i = 0; i < 40; i++) { // 实时证据串行跑 3 次 zhihu CLI，最长等 20s
    await sleep(500);
    t = (await ev(`document.getElementById('feyn-out').textContent`)) || '';
    if (t.includes('检验报告')) break;
  }
  return t;
}
await ev(`location.hash = '#/feynman'`);
await sleep(120);
// 第一次只讲景别：真实制造漏点，验证「漏点 → 倒回 → 再讲一次才算补上」
const partial = '我觉得像PPT是因为全程用同一种景别，画面没有信息节奏。景别本质是镜头距离决定画面信息量，远景交代环境，特写给情绪细节。';
let feynText = await runFeyn(partial);
check('第一次检验（只讲景别）', feynText.includes('检验报告'));
check('第一次检验标出真实漏点', feynText.includes('有漏点'));
check('漏点记入待补清单 pending', (await ev(`state.remediation['camera-move']`)) === 'pending');
check('通过的概念不进待补清单', (await ev(`state.remediation['shot-size']`)) === 'none');

// 第二次讲全：只补不重讲不算补上，重讲通过才记 done
const speech = '我觉得像PPT是因为全程用同一种景别，画面没有信息节奏。景别本质是镜头距离决定画面信息量，远景交代环境，特写给情绪细节。另外运镜不写，模型默认固定机位，画面当然呆；提示词要写画面怎么变，比如金币从桌上滑落，而且要按镜头逐条写景别加运镜，用推镜头强调重点，观众的注意力会被镜头引导。';
feynText = await runFeyn(speech);
check('第二次检验（讲全）', feynText.includes('检验报告'));
check('三概念全部通过', (feynText.match(/讲到位了/g) || []).length === 3, feynText.slice(0, 120));
check('补上的漏点记为 done', (await ev(`state.remediation['camera-move']`)) === 'done');
check('报告标明「补上了上一轮的漏点」', feynText.includes('补上了上一轮的漏点'));
check('报告统计本轮闭环数', feynText.includes('本轮补上了'));
check('验收通过横幅', feynText.includes('验收通过'));
check('费曼状态=pass', (await ev(`Object.values(state.feyn).join(',')`)) === 'pass,pass,pass');
check('重新检验后清除跳过标记', (await ev(`state.feynSkipped`)) === false);
// 引擎标识必须与运行模式一致：服务端配了 LLM key 走 C1 管线，没配则回退离线规则（AB 实验的 A 组）
const llmOn = await ev(`MODE.llm`);
check(`引擎标识与运行模式一致（当前 ${llmOn ? 'C1-pipeline(llm+live-search)' : 'A-rules 离线规则'}）`,
  llmOn ? feynText.includes('C1-pipeline(llm+live-search)') : feynText.includes('A-rules'));
check('证据来源为知乎实时检索（C1 与裸 LLM 的分界）', feynText.includes('知乎实时检索'));

// ⑨ 断点
await ev(`saveCheckpoint()`);
await sleep(80);
check('断点已写入', (await ev(`!!localStorage.getItem('zss135.checkpoint.v1')`)) === true);
await ev(`resetAll()`);
await sleep(80);
check('清空后状态归零', (await ev(`state.lab['shot-size']`)) === false);

check('全程无JS异常', jsErrors.length === 0, jsErrors.join(' || ').slice(0, 200));

const failed = checks.filter(c => !c.ok).length;
console.log(`\n结果: ${checks.length - failed}/${checks.length} 通过`);
ws.close(); chrome.kill();
process.exit(failed ? 1 : 0);
