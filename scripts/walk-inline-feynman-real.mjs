#!/usr/bin/env node
// D 层走查（**真调 /api/llm**）：内参单篇「阅读中的即时费曼」的连续反馈记录。
//
// 目的：把「输入 → 诊断 → 材料 → 新诊断」逐轮留下原始记录，证明两件事：
//   ① 同一学习者把 C3 讲对后，系统不再重复补 C3（换焦点，不重播旧动作）；
//   ② 负对照：错误没纠正就再点一次提交，系统不会因为"又提交了一次"就停止补讲。
//
// 这不是学习效果实验：学习者是用脚本合成的，判据也只有 C1/C2/C4 被刻意写成可接受的表达，
// 只让 C3 形成目标差异。一次走通只证明这一次走通，不能宣称可靠率，更不能宣称教学有效。
//
// 用法：node scripts/walk-inline-feynman-real.mjs [url]
// 前置：node scripts/serve-135.mjs（/api/health 的 llm 必须为 true）
// 输出：evidence/feynman-teaching-map/inline-feedback-<时间戳>.json

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { CHROME, openCDP, sleep, spawnProcess, waitForPage } from './lib/cdp.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASE = (process.argv[2] || 'http://127.0.0.1:5180/知所栖-壳.html').split('#')[0];
const PILOT = BASE + '#neican=agent-skills-api';
const ORIGIN = new URL(BASE).origin;          // /api/* 挂在站点根上，不在壳那个路径下
const SHOT_DIR = path.join(ROOT, 'prototype', '预览');
const OUT_DIR = path.join(ROOT, 'evidence', 'feynman-teaching-map');
fs.mkdirSync(SHOT_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

function stamp() { return new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14); }

const health = await (await fetch(`${ORIGIN}/api/health`)).json().catch((e) => ({ error: e.message }));
const record = {
  generatedAt: new Date().toISOString(),
  endpoint: `${BASE}/api/llm`,
  mode: health.llm ? 'real' : 'not-run',
  notRun: health.llm ? null : `llm 未配置或服务不可用（${JSON.stringify(health)}）——按未执行记录，不用固定响应冒充`,
  learnerIs: '合成学习者（脚本扮演，不是真人，也不是学习效果实验）',
  unit: 'agent-skills-api',
  rounds: [],
  screenshots: [],
  assertions: [],
};

/* ── 合成学习者：只让 C3 形成目标差异，C1/C2/C4 固定为按冻结判据可接受的表达 ── */
const C1C2 = '技能里的内容不是一次性全塞进模型的：启动时只有名字和一句描述，请求匹配上 description 之后才去读 SKILL.md 正文，正文里引用的附件要等真的用到、被读进来的时候才进上下文；存在技能目录里和正文已经被读进来是两回事。';
const C4_WEAK = '至于它在不同产品面上是不是都能用，我还没想过。';
const D1 = `${C1C2}脚本运行的时候，脚本的代码本身也会一起进上下文，所以脚本越长越占地方。${C4_WEAK}`;
const D2 = `${C1C2}顺便说一句，这个技能我上周刚用过一次，界面挺顺手的。脚本运行的时候，脚本的代码本身也会一起进上下文，所以脚本越长越占地方。${C4_WEAK}`;
const D3 = `${C1C2}脚本是交给 bash 去执行的，回到上下文里的只有执行输出，源码本身不进上下文；只有真的去读源码，读多少才占多少。${C4_WEAK}`;

if (record.notRun) {
  fs.writeFileSync(path.join(OUT_DIR, `inline-feedback-${stamp()}.json`), JSON.stringify({ ...record, rounds: [] }, null, 1));
  console.log(`⚠ 未执行：${record.notRun}`);
  process.exit(2);
}

const port = 9800 + (process.pid % 90);
const profile = path.join(os.tmpdir(), 'nfx-real-profile-' + process.pid);
const chrome = spawnProcess(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--window-size=1440,1000', '--hide-scrollbars', '--disable-gpu', '--no-first-run', '--no-proxy-server',
  '--disable-features=Translate', 'about:blank',
], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill('SIGKILL'); } catch {} });

const target = await waitForPage(port);
if (!target) throw new Error('Chrome 调试端口没起来');
const cdp = await openCDP(target.webSocketDebuggerUrl);
const ex = (expression) => cdp.eval(expression, { onException: (d) => 'THREW: ' + (d.exception?.description || d.text || '') });
await cdp.send('Page.enable');
await cdp.send('Runtime.enable');
await cdp.send('Network.enable');
await cdp.send('Log.enable');
await cdp.send('Page.navigate', { url: PILOT });
await sleep(1800);

/* 真实调用记录：拦 Network 事件，取发往 /api/llm 的请求体（含提示词）与上游状态 */
const calls = [];
cdp.events.push = new Proxy(cdp.events.push, {
  apply(t, self, args) {
    const e = args[0];
    if (e?.method === 'Network.requestWillBeSent' && String(e.params?.request?.url || '').includes('/api/llm')) {
      let body = null; try { body = JSON.parse(e.params.request.postData || 'null'); } catch {}
      calls.push({ at: new Date().toISOString(), url: e.params.request.url, body });
    }
    if (e?.method === 'Network.responseReceived' && String(e.params?.response?.url || '').includes('/api/llm')) {
      const c = calls.filter((x) => !x.status).slice(-1)[0];
      if (c) c.status = e.params.response.status;
    }
    return Reflect.apply(t, self, args);
  },
});
const waitRound = async (before, timeoutMs = 40000) => {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const n = await ex(`nfxState('agent-skills-api').rounds.length`);
    if (n > before) return n;
    await sleep(400);
  }
  return await ex(`nfxState('agent-skills-api').rounds.length`);
};
const snap = async () => await ex(`(()=>{
  const st = nfxState('agent-skills-api');
  const r = st.rounds.slice(-1)[0];
  return JSON.stringify({
    round: r, draftVersion: st.draftVer, roundsTotal: st.rounds.length,
    focusRef: (document.querySelector('#nfx-res .nfx-focus')||{}).dataset ? document.querySelector('#nfx-res .nfx-focus').dataset.ref : null,
    focusCid: (document.querySelector('#nfx-res .nfx-focus')||{}).dataset ? document.querySelector('#nfx-res .nfx-focus').dataset.cid : null,
    resultText: document.getElementById('nfx-res').innerText,
    statusLine: document.getElementById('nfx-status').innerText,
  });
})()`);
const submit = async (text) => {
  const before = await ex(`nfxState('agent-skills-api').rounds.length`);
  const callBefore = calls.length;
  await ex(`(()=>{const b=document.getElementById('nfx-said'); b.value=${JSON.stringify(text)}; nfxChanged(); return true})()`);
  await ex('void nfxSubmit(neiSlug); "sent"');
  const total = await waitRound(before);
  await sleep(400);
  const s = JSON.parse(await snap());
  return { s, total, callBefore };
};
const shot = async (file) => { await ex(`(()=>{const e=document.getElementById('nfx-res'); if(e&&e.scrollIntoView) e.scrollIntoView({block:'center'}); return true})()`); await sleep(280); await cdp.screenshot(path.join(SHOT_DIR, file)); record.screenshots.push(`prototype/预览/${file}`); };
const assert = (label, cond, detail = '') => {
  record.assertions.push({ label, ok: !!cond, detail: String(detail).slice(0, 400) });
  console.log(`  ${cond ? '·' : '⚠'} ${label}${detail ? ' ｜ ' + String(detail).slice(0, 160) : ''}`);
};

/* 记录每轮：学习者输入、真实请求（提示词摘要）、上游原始返回、解析结果、页面焦点与材料 */
const keep = (tag, said, out, extra = {}) => {
  const req = calls[out.callBefore] || {};
  const usrMsg = (req.body?.messages || []).find((m) => m.role === 'user')?.content || '';
  record.rounds.push({
    tag, at: new Date().toISOString(), learnerInput: said,
    learnerInputSha256: crypto.createHash('sha256').update(said).digest('hex'),
    request: {
      url: req.url, httpStatus: req.status ?? null, jsonMode: req.body?.json,
      criteriaVersionInPrompt: (usrMsg.match(/判据版本：(\S+)/) || [])[1] || null,
      unitInPrompt: (usrMsg.match(/单元：([^\s，）]+)/) || [])[1] || null,
      promptHasAllFourRuleBlocks: ['C1｜', 'C2｜', 'C3｜', 'C4｜'].every((k) => usrMsg.includes(k)),
      promptRulesCount: ['met：', 'partial：', 'missing：', 'contradicted：', 'uncertain：'].reduce((n, k) => n + (usrMsg.split(k).length - 1), 0),
      promptChars: usrMsg.length,
      promptDigest: usrMsg.slice(0, 160),
    },
    api: {
      model: extra.model ?? null, tokens: extra.tokens ?? null,
      pageMeasuredMs: out.s.round?.ms ?? null,
      notJudged: out.s.round?.notJudged || null,
      note: '响应正文由页面消费；模型名/tokens 见本文件 callLog',
    },
    page: {
      statuses: out.s.round?.statuses || null,
      gaps: out.s.round?.gaps || null,
      focusCid: out.s.focusCid, focusRef: out.s.focusRef,
      focusText: (out.s.resultText.match(/重点补讲[\s\S]{0,320}/) || [''])[0] || null,
      nextPrompt: out.s.round?.nextPrompt || '',
      notJudged: out.s.round?.notJudged || null,
      passed: out.s.round?.passed ?? null,
      rawModelReturn: String(out.s.round?.raw || '').slice(0, 900),
      resultText: out.s.resultText.slice(0, 1200),
    },
  });
  console.log(`\n【${tag}】判据状态：${JSON.stringify(out.s.round?.statuses || out.s.round?.notJudged)} ｜ 页面测得 ${out.s.round?.ms}ms`);
  console.log(`  缺口：${(out.s.round?.gaps || []).join(',') || '无'} ｜ 本轮只展示：${out.s.focusCid || '—'}${out.s.focusRef ? ' → ' + out.s.focusRef : ''}`);
  console.log(`  原始返回：${String(out.s.round?.raw || '').slice(0, 220).replace(/\n/g, ' ')}`);
};

/* ── 第一轮：C3 明确讲错 ── */
console.log('D 层走查（真调 /api/llm）：C3 错 → 补讲 → 再讲对 → 不再重复补 C3');
console.log('\n① 第一轮：学习者把「跑脚本」和「读源码」混成一件事');
const r1 = await submit(D1);
keep('D1-C3讲错', D1, r1, { model: r1.s.round?.model, tokens: r1.s.round?.tokens });
const st1 = r1.s.round?.statuses || {};
assert('第一轮判出 C3 是缺口（contradicted 或 missing）', st1.C3 === 'contradicted' || st1.C3 === 'missing', JSON.stringify(st1));
assert('第一轮页面只展示一处重点（第一个非 met 的判据）', !!r1.s.focusCid, `focus=${r1.s.focusCid}`);
const firstUser = (calls[r1.callBefore]?.body?.messages || []).find((m) => m.role === 'user')?.content || '';
assert('第一轮发出去的请求带上了 v3-20260914', firstUser.includes('判据版本：v3-20260914'), '');
assert('第一轮发出去的请求带上了 C1～C4 全部判据与五档规则',
  ['C1｜', 'C2｜', 'C3｜', 'C4｜'].every((k) => firstUser.includes(k))
  && ['met：', 'partial：', 'missing：', 'contradicted：', 'uncertain：'].every((k) => (firstUser.split(k).length - 1) >= 4),
  `规则档位出现 ${['met：', 'partial：', 'missing：', 'contradicted：', 'uncertain：'].reduce((n, k) => n + (firstUser.split(k).length - 1), 0)} 次`);
await shot('70-即时费曼-真模型第一轮-C3讲错.png');

/* ── 负对照：C3 没纠正，再点一次提交 ── */
console.log('\n② 负对照：C3 没纠正，再提交一次');
const r2 = await submit(D2);
keep('D2-负对照-错误未纠正', D2, r2, { model: r2.s.round?.model, tokens: r2.s.round?.tokens });
const st2 = r2.s.round?.statuses || {};
assert('负对照：C3 仍然是缺口', st2.C3 !== 'met', JSON.stringify(st2));
assert('负对照：页面仍在补讲（没有因为又提交一次就放行）', !!r2.s.focusCid, `focus=${r2.s.focusCid}`);
assert('负对照：没有显示"都讲到了"', !String(r2.s.resultText).includes('都讲到了'), String(r2.s.resultText).slice(0, 80));
assert('负对照：不问"过了吗"就算过 —— passed 为 false', r2.s.round?.passed === false, String(r2.s.round?.passed));

/* ── 第三轮：用另一种表述把 C3 讲对 ── */
console.log('\n③ 第三轮：用另一种表述纠正 C3');
const r3 = await submit(D3);
keep('D3-C3讲对', D3, r3, { model: r3.s.round?.model, tokens: r3.s.round?.tokens });
const st3 = r3.s.round?.statuses || {};
assert('第三轮 C3 变成 met', st3.C3 === 'met', JSON.stringify(st3));
assert('C3 讲对后不再重复补 C3', r3.s.focusCid !== 'C3', `focus=${r3.s.focusCid}`);
assert('焦点换到还没讲到的判据', !!r3.s.focusCid && r3.s.focusCid !== 'C3', `focus=${r3.s.focusCid}`);
assert('第三轮不再出现 C3 的补讲材料', r3.s.focusRef !== 'experiments[2]', `ref=${r3.s.focusRef}`);
/* 第三轮的真实状态并进同一张图：C3 翻成 met、焦点已经离开 C3 落到还没讲到的那条 */
assert('第三轮截图前焦点已不在 C3', r3.s.focusCid !== 'C3', `focus=${r3.s.focusCid} → ${r3.s.focusRef}`);
await shot('71-即时费曼-真模型第三轮-C3讲对.png');

/* ── 形式门与既有决策题 ── */
console.log('\n④ 不越权 ＋ 沿用已有决策题入口');
const unlock = await ex(`(()=>{const s=JSON.parse(localStorage.getItem('zss135.learn.v1')||'{}');return JSON.stringify({keys:Object.keys(s).length, marks:Object.keys(marks).length, nfxKey:localStorage.getItem('zss135.neican.feynman.v1')!==null})})()`);
record.unlockProbe = JSON.parse(unlock);
assert('即时反馈没有写正式掌握状态（zss135.learn.v1 仍是空）', record.unlockProbe.keys === 0, unlock);
assert('没有解锁任何一章、也没碰倒逼记录 marks', record.unlockProbe.marks === 0, unlock);
assert('即时反馈存在自己的键上', record.unlockProbe.nfxKey === true, unlock);
const dec = await ex(`(()=>{const d=document.getElementById('nfx-fold-decisions');
  if(!d) return null;
  const boxes=d.querySelectorAll('.fybox').length;
  const summary=(d.querySelector('summary')||{}).innerText||'';
  const beforeOpen=d.open;
  d.open=true;                                            // 展开只为核对内容，核对完还原
  const txt=d.innerText;
  const hasDecision1=txt.includes('决策 1 ·');
  const hasCondition=txt.includes('适用条件');
  d.open=beforeOpen;
  return {defaultOpen:beforeOpen, boxes, summary, hasDecision1, hasCondition}})()`);
record.decisionEntry = dec;
assert('已有的三道决策题仍在（不要求先答，也不被即时反馈替代）', dec && dec.boxes === 3 && dec.hasDecision1 && dec.hasCondition, JSON.stringify(dec));
assert('决策题默认折叠，不构成完成本轮学习的必经步骤', dec && dec.defaultOpen === false, JSON.stringify(dec));
assert('决策题入口写明"不必先答，即时费曼不要求答完"', dec && dec.summary.includes('不必先答') && dec.summary.includes('即时费曼不要求答完'), JSON.stringify(dec && dec.summary));

const errs = cdp.events.filter((e) => e.method === 'Runtime.exceptionThrown').length;
assert('全程 0 条 JS 报错', errs === 0, `${errs} 条`);
assert('全程没有知乎请求', !cdp.events.some((e) => e.method === 'Network.requestWillBeSent' && /zhihu/i.test(e.params?.request?.url || '')), '');

record.callLog = calls.map((c) => ({
  at: c.at, url: c.url, httpStatus: c.status ?? null, jsonMode: c.body?.json,
  messages: (c.body?.messages || []).map((m) => ({ role: m.role, chars: String(m.content || '').length, head: String(m.content || '').slice(0, 120) })),
}));

const file = path.join(OUT_DIR, `inline-feedback-${stamp()}.json`);
fs.writeFileSync(file, JSON.stringify(record, null, 1));
const failed = record.assertions.filter((a) => !a.ok);
console.log(`\n真实连续反馈记录：${path.relative(ROOT, file)}`);
console.log(`截图：${record.screenshots.join(' · ')}`);
console.log('⚠ 合成学习者、单次走查：只证明这一次链路走通，不构成学习效果证据，也不能宣称可靠率。');
console.log(failed.length ? `❌ ${failed.length} 项断言未过\n${failed.map((f) => '  · ' + f.label + ' ｜ ' + f.detail).join('\n')}` : '✅ 连续反馈两轮 + 负对照：本次走通');
cdp.close();
chrome.kill();
try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5 }); } catch {}
process.exit(failed.length ? 1 : 0);
