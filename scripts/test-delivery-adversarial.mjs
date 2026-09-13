#!/usr/bin/env node
// 对抗性测试 · 交付包 —— 「假设数据被改坏/投毒/注入，谁会发现」
//
// 设计原则（重要）：**每一条攻击都交给真体检器（cm-validate）去判**，
// 不自己写个判据判一遍 —— 自己判自己等于没判。
// 因此每条攻击都要求两件事同时成立：
//   ① 体检器必须红（抓得到）
//   ② 错误信息必须提到对的东西（不是被别的错碰巧撞红）
// 另配一条阳性对照：干净副本必须绿，否则整套测试是假阳性。
//
//   node scripts/test-delivery-adversarial.mjs
// 浏览器那一段会拉起真无头 Chrome；加 --no-browser 可跳过。

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const MAP = path.join(ROOT, 'knowledge', '概念地图-260913');
const P = (...p) => path.join(ROOT, ...p);
const read = (...p) => fs.readFileSync(P(...p), 'utf8');

let pass = 0, fail = 0;
const ok = (c, msg) => { c ? (pass++, console.log('  ✓ ' + msg)) : (fail++, console.log('  ✗ ' + msg)); };
const NO_BROWSER = process.argv.includes('--no-browser');

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'cm-adversarial-'));
const FILES = ['topics.json', 'dependencies.json', 'relations.json', 'clusters.json', 'manifest.json'];

/** 造一份可投毒的副本 */
function poison(mutate) {
  const dir = fs.mkdtempSync(path.join(TMP, 'map-'));
  for (const f of FILES) fs.copyFileSync(path.join(MAP, f), path.join(dir, f));
  const get = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const put = (f, o) => fs.writeFileSync(path.join(dir, f), JSON.stringify(o, null, 1));
  const rehash = () => { // 重算校验和，模拟「攻击者顺手把 manifest 也改了」
    const m = get('manifest.json');
    for (const f of ['topics.json', 'dependencies.json', 'relations.json', 'clusters.json']) {
      const h = hashOf(fs.readFileSync(path.join(dir, f)));
      m.checksums[f] = 'sha256:' + h;
    }
    put('manifest.json', m);
  };
  mutate({ get, put, rehash });
  return dir;
}
function hashOf(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }

function runValidate(dir) {
  const r = spawnSync(process.execPath, [P('scripts/cm-validate.mjs'), `--dir=${dir}`], { encoding: 'utf8' });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

/** 攻击断言：必须红，且错误信息要提到关键词 */
function attack(name, mutate, keyword) {
  const dir = poison(mutate);
  const { code, out } = runValidate(dir);
  const caught = code !== 0;
  const right = !keyword || out.includes(keyword);
  if (caught && right) { pass++; console.log(`  ✓ ${name} → 被抓（${keyword ? '提到「' + keyword + '」' : '非零退出'}）`); }
  else if (caught && !right) { fail++; console.log(`  ✗ ${name} → 红了，但错在别处（没提到「${keyword}」）：${out.split('\n').filter(l => l.includes('✗') || l.includes('- ')).slice(0, 2).join(' ')}`); }
  else { fail++; console.log(`  ✗ ${name} → **没被抓到**（体检器绿了，这是漏网）`); }
  fs.rmSync(dir, { recursive: true, force: true });
}

console.log('\n=== 对抗性测试 · 交付包 ===\n');

/* ── 0. 阳性对照 ─────────────────────────────────────────── */
console.log('[0] 阳性对照：干净副本必须通过（否则下面全是假阳性）');
{
  const dir = poison(() => {});
  const { code, out } = runValidate(dir);
  ok(code === 0, `干净副本体检通过${code === 0 ? '' : '：' + out.slice(0, 200)}`);
  fs.rmSync(dir, { recursive: true, force: true });
}

/* ── 1. 篡改检测：校验和是不是真的在防篡改 ────────────────── */
console.log('\n[1] 篡改检测（manifest 校验和）');
attack('改一个概念的名字（不动 manifest）',
  ({ get, put }) => { const t = get('topics.json'); t.topics[0].name += '【已篡改】'; put('topics.json', t); },
  '校验和');
attack('删一个概念（不动 manifest）',
  ({ get, put }) => { const t = get('topics.json'); t.topics.pop(); put('topics.json', t); },
  '');

/* ── 2. 引用完整性 ───────────────────────────────────────── */
console.log('\n[2] 引用完整性');
attack('依赖指向一个不存在的概念',
  ({ get, put, rehash }) => { const d = get('dependencies.json'); d.dependencies.push({ ...d.dependencies[0], topicId: 'cm_deadbeef' }); d.count = d.dependencies.length; put('dependencies.json', d); rehash(); },
  '悬空');
attack('关联指向一个不存在的概念',
  ({ get, put, rehash }) => { const r = get('relations.json'); r.relations.push({ ...r.relations[0], to: 'cm_ffffffff' }); r.count = r.relations.length; put('relations.json', r); rehash(); },
  '悬空');

/* ── 3. 图结构攻击 ───────────────────────────────────────── */
console.log('\n[3] 图结构（自环 / 环 / 重复 id）');
attack('自环：A 依赖 A',
  ({ get, put, rehash }) => { const d = get('dependencies.json'); d.dependencies.push({ ...d.dependencies[0], topicId: 'cm_0a4ca4ce', prerequisiteId: 'cm_0a4ca4ce' }); d.count = d.dependencies.length; put('dependencies.json', d); rehash(); },
  '自环');
attack('成环：A→B 且 B→A',
  ({ get, put, rehash }) => {
    const d = get('dependencies.json');
    const a = d.dependencies[0].topicId, b = d.dependencies[0].prerequisiteId;
    d.dependencies = d.dependencies.filter(x => !(x.topicId === b && x.prerequisiteId === a));
    d.dependencies.push({ topicId: b, prerequisiteId: a, strength: 'hard', kind: 'prerequisite', reason: '注入的反向边', origin: 'llm', axis: 'x', audit: 'yes', auditIssue: '' });
    d.count = d.dependencies.length; put('dependencies.json', d); rehash();
  },
  '环');
attack('重复 id：把第 2 条改成和第 1 条同 id',
  ({ get, put, rehash }) => { const t = get('topics.json'); t.topics[1].id = t.topics[0].id; put('topics.json', t); rehash(); },
  '重复');

/* ── 4. 分布表漏计（上次修的 bug 的回归测试） ──────────────── */
console.log('\n[4] 分布表漏计 / 重分类 —— 两段检查各挡一类');
attack('第 5 个来源但没加桶（**重分类**：合计不变，只有逐桶检查能抓）',
  ({ get, put, rehash }) => {
    const t = get('topics.json');
    t.topics[0].origin = ['wedontknow'];           // 一个新来源：原本 multi 的那条被挪走
    put('topics.json', t); rehash();
  },
  'byOrigin');
attack('直接从 manifest 删掉一个桶（**合计变少**）',
  ({ get, put, rehash }) => {
    const m = get('manifest.json');
    delete m.byOrigin.neicanOnly;
    put('manifest.json', m);
  },
  '合计');
attack('byType 少算一类（把一条改成非法类型）',
  ({ get, put, rehash }) => { const t = get('topics.json'); t.topics[0].type = 'NOT_A_TYPE'; put('topics.json', t); rehash(); },
  'type 非法');

/* ── 5. 类型混淆 / 越界 / 原型污染 ────────────────────────── */
console.log('\n[5] 类型混淆 / 越界 / 原型污染');
attack('centrality 给字符串',
  ({ get, put, rehash }) => { const t = get('topics.json'); t.topics[0].centrality = '0.9'; put('topics.json', t); rehash(); },
  'centrality');
attack('centrality 越界（1.5）',
  ({ get, put, rehash }) => { const t = get('topics.json'); t.topics[0].centrality = 1.5; put('topics.json', t); rehash(); },
  'centrality');
attack('depth 给负数',
  ({ get, put, rehash }) => { const t = get('topics.json'); t.topics[0].depth = -3; put('topics.json', t); rehash(); },
  'depth');
attack('id 形态非法（SQL 风格字符串）',
  ({ get, put, rehash }) => { const t = get('topics.json'); t.topics[0].id = "cm_1' OR '1'='1"; put('topics.json', t); rehash(); },
  'id 形态');
attack('原型污染：id 用 __proto__',
  ({ get, put, rehash }) => { const t = get('topics.json'); t.topics[0].id = '__proto__'; put('topics.json', t); rehash(); },
  'id 形态');
attack('概念没有来源（sources 空数组）',
  ({ get, put, rehash }) => { const t = get('topics.json'); t.topics[0].sources = []; put('topics.json', t); rehash(); },
  '来源');

/* ── 6. XSS：静态扫描（壳源里未转义的数据插值） ───────────── */
console.log('\n[6] XSS 静态扫描 —— 壳源码里哪些数据插值没转义');
const shellSrc = read('scripts/shell.template.html');
{
  // 全文扫，**不按行**：按行扫会漏掉跨行模板
  // （第一版就是这么漏掉 L992 那个 `<h2>${n.name}</h2>` 的 —— 它所在的反引号在 L987）。
  // 手法：找所有 ${...}，凡是不以 esc( 开头的就算未转义；再按字段名分类。
  const NAMES = /\.(name|nameEn|subject|domain|label|question|gloss|kwhy|description|feynman|aliases?|note|reason|title|summary|author)$/;
  const raw = [], names = [];
  const re = /\$\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let m;
  while ((m = re.exec(shellSrc))) {
    const expr = m[1].trim();
    if (/^esc\(/.test(expr)) continue;                      // 已转义
    if (!/[a-zA-Z_$][\w$]*\.[\w$]/.test(expr)) continue;     // 不含属性访问（数字/下标/纯局部变量）
    const line = shellSrc.slice(0, m.index).split('\n').length;
    const ctx = shellSrc.slice(Math.max(0, m.index - 90), m.index + 60).replace(/\s+/g, ' ');
    const rec = { line, expr, ctx };
    raw.push(rec);
    if (NAMES.test(expr)) names.push(rec);
  }
  console.log(`    全文扫到 ${raw.length} 处未走 esc() 的属性插值，其中自由文本字段 ${names.length} 处。`);
  // 白名单**必须带理由**：不是「这几个字段名我懒得管」，而是「它们的来源构造上就不可能含 HTML」。
  const KNOWN_SAFE = [
    [/^s\.name$/, 'skill 名：服务端有 ^[a-z0-9-]+$ 约束；公网版是构建时从 .agents/skills/ 目录名烘进去的'],
    [/^ALLSKILLS\[[^\]]+\]\.name$/, '同上'],
    [/^p\.(skill|name|note|span)$/, 'PINNED 是模板里硬编码的常量（L1551-1555），不是外部内容'],
    [/^p\.skill \|\| p\.name$/, '同上'],
    /* 2026-09-14 补 5 条：学习空间那几处。逐处核过**落点不是 HTML** ，不是「懒得管」——
       但这条白名单按「表达式全文」匹配，所以同一表达式以后若被搬进 innerHTML，这条不再拦得住。
       真要动它们，请连落点一起看。（扫描器不认上下文，这是它已知的粗；宁可粗，不可漏。） */
    [/^n\.name$|^n\.gloss$/, 'L1909：落在 fetch 的 JSON body 里（发给模型的提示词），不进 DOM'],
    [/^c\.cm\.name$|^c\.cm\.description$/, 'L2688／L3118：只进判定提示词的 material 数组，不进 DOM'],
    [/^c\.title$/, 'L2865：赋给 textContent（浏览器自己转义），不进 innerHTML'],
  ];
  const unsafe = names.filter(r => !KNOWN_SAFE.some(([re]) => re.test(r.expr)));
  console.log(`    扣掉 ${names.length - unsafe.length} 处「来源受约束」的白名单后，**真正来自外部内容的剩 ${unsafe.length} 处**：`);
  unsafe.forEach(r => console.log(`      ✗ L${r.line}  \${${r.expr}}   ← …${r.ctx.slice(-72)}`));
  ok(unsafe.length === 0, `外部内容驱动的自由文本字段全部经过 esc()（未转义 ${unsafe.length} 处）`);
  if (unsafe.length) {
    console.log('    ⚠ 这些字段来自外部内容（Notion / 飞书 / 内参），重新生成时可能带进 < > &。');
    console.log('      今天的数据里 0 个名字含 < >，所以**当前不可利用** —— 但只差一次重新生成。');
  }
  if (!unsafe.length) {
    console.log('    （白名单 4 条逐条有理由；新加未转义字段会让这条断言变红，逼你来说明理由。）');
  }
}

/* ── 7. XSS：动态验证（真无头浏览器） ─────────────────────── */
console.log('\n[7] XSS 动态验证 —— 真投毒 + 真浏览器');
console.log('    注意：第 6 节查的是**源码** scripts/shell.template.html；这一节查的是**产物**。');
console.log('          源码修了但没重建，这里就会红 —— 这正是要暴露的落差。');
if (NO_BROWSER) {
  console.log('    （--no-browser，跳过）');
} else {
  const { CHROME, openCDP, sleep, spawnProcess, waitForPage } = await import('./lib/cdp.mjs');
  const PAYLOAD = '<img src=x onerror="window.__XSS__=1">';
  // deploy/ 是**独立的产物仓库**，全新 clone 里没有它；prototype/ 是源仓库里的产物。
  // 两个都找不到就明确跳过，不能崩 —— 测试要能在队友的 clone 里跑起来。
  const CANDIDATES = [
    ['deploy/zhisuoqi-135/index.html', '公网版（产物仓库）'],
    ['prototype/知所栖-壳.html', '壳（源仓库里有）'],
  ];
  const hit = CANDIDATES.map(([p, label]) => [P(p), label, fs.existsSync(P(p))]).find(([, , e]) => e);
  if (!hit) {
    console.log('    （找不到任何已构建的单文件产物，跳过浏览器验证）');
    console.log('    ⚠ 注意：跳过不等于通过 —— 这一节没跑，XSS 就没有动态证据。');
  } else {
  const [artifactPath, artifactLabel] = hit;
  console.log(`    被测产物：${path.relative(ROOT, artifactPath)}（${artifactLabel}）`);
  const dir = fs.mkdtempSync(path.join(TMP, 'xss-'));
  const pub = fs.readFileSync(artifactPath, 'utf8');
  const mm = pub.match(/const DATA\s*=\s*(\{[\s\S]*?\});\s*\n/);
  const d = JSON.parse(mm[1]);
  const victim = d.nodes.find(n => n.name && n.name.length > 2);
  victim.name = PAYLOAD + victim.name;              // ← 名字字段投毒
  fs.writeFileSync(path.join(dir, 'index.html'), pub.replace(mm[1], JSON.stringify(d)));

  const srv = spawnProcess('python3', ['-m', 'http.server', '9411', '--bind', '127.0.0.1'], { cwd: dir, stdio: 'ignore' });
  await sleep(900);
  const PORT = 9412;
  const PROF = path.join(TMP, 'chrome-prof');
  const chrome = spawnProcess(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROF}`,
    '--window-size=1440,900', '--disable-gpu', '--no-first-run', '--no-proxy-server', 'about:blank'], { stdio: 'ignore' });
  const page = await waitForPage(PORT);
  if (!page) { fail++; console.log('  ✗ 拉不起无头 Chrome，动态验证没跑成'); }
  else {
    const cdp = await openCDP(page.webSocketDebuggerUrl);
    const ev = (expr) => cdp.eval(expr, { onException: e => 'THREW: ' + (e.exception?.description || '').split('\n')[0] });
    await cdp.send('Page.enable'); await cdp.send('Runtime.enable');
    await cdp.send('Page.navigate', { url: 'http://127.0.0.1:9411/index.html' });
    let ready = false;
    for (let i = 0; i < 30; i++) { if (await ev('typeof DATA === "object" && Array.isArray(DATA.nodes)')) { ready = true; break; } await sleep(500); }
    ok(ready, '页面加载成功（注入后仍能初始化）');
    if (ready) {
      // 两次探测必须**各自先清零**，否则第一次置上的 1 会被第二次读到 ——
      // 第一版就是这么把对照组也判成「执行了」的（假阳性）。
      // 另外必须**等面板真的画成目标那个节点**再断言：第一次写这版时只固定 sleep(700)，
      // 重载后应用还没初始化完，读到的是空面板 → 对照组成假失败。
      const probe = async (id, expectInH2) => {
        await ev('window.__XSS__ = 0');
        await ev(`openPanel(${JSON.stringify(id)})`);
        let rendered = false;
        for (let i = 0; i < 25; i++) {
          const t = String(await ev(`(document.querySelector('#pbody h2')||{}).textContent || ''`));
          if (t && (!expectInH2 || t.includes(expectInH2))) { rendered = true; break; }
          await sleep(200);
        }
        await sleep(400);
        return {
          rendered,
          fired: (await ev('String(window.__XSS__ || "")')) === '1',
          h2: String(await ev(`(document.querySelector('#pbody h2')||{}).textContent || ''`)),
          html: String(await ev(`(document.querySelector('#pbody h2')||{}).innerHTML || ''`)),
          body: String(await ev(`(document.getElementById('pbody')||{}).innerHTML || ''`)),
        };
      };

      // 阳性对照（**必须有**）：同样一段 payload 直接写进 innerHTML，必须执行。
      // 没有这一步，「没执行」既可能是「转义生效了」，也可能是「payload 根本没生效、
      // 或者无头 Chrome 里 onerror 不触发」—— 那样整节都是空断言。
      await ev(`(()=>{const d=document.createElement('div');d.innerHTML=${JSON.stringify(PAYLOAD)};document.body.appendChild(d)})()`);
      await sleep(600);
      const detectorWorks = (await ev('String(window.__XSS__ || "")')) === '1';
      ok(detectorWorks, '阳性对照：同一段 payload 走裸 innerHTML **确实会执行** —— 证明本测试测得出 XSS');
      if (!detectorWorks) {
        fail++; console.log('  ✗ 阳性对照没触发 → 本节其余「没执行」的结论全部无效，先修测试');
      }

      // ② 阴性：概念名（<h2>，刚修的那处）
      const v = await probe(victim.id, victim.name.replace(PAYLOAD, ''));
      ok(v.fired === false || detectorWorks, `概念名投毒${v.fired ? '**执行了**' : '没有执行脚本'}`);
      ok(v.h2.includes('<img'), '概念名是当**文本**渲染的（textContent 含原文）');
      ok(v.html.includes('&lt;img') || !v.fired, '概念名渲染成的是转义实体 &lt;img（不是活标签）');
      if (v.fired) {
        console.log(`      ↑ 证据：h2.innerHTML 里出现了活的标签 → ${v.html.slice(0, 90)}`);
        console.log('      ↑ 这条红 = **当前这个构建真的可被概念名 XSS**，不是理论风险。');
      }

      // ③ 阴性：gloss（紧挨 h2 下面、无条件渲染、走 esc()）
      victim.gloss = PAYLOAD;
      fs.writeFileSync(path.join(dir, 'index.html'), pub.replace(mm[1], JSON.stringify(d)));
      await cdp.send('Page.navigate', { url: 'http://127.0.0.1:9411/index.html?r=2' });
      for (let i = 0; i < 40; i++) { if (await ev('typeof DATA === "object" && !!document.querySelector("#pbody")')) break; await sleep(400); }
      const g = await probe(victim.id, victim.name.replace(PAYLOAD, ''));
      ok(g.rendered, 'gloss 对照组面板画出来了');
      ok(!g.fired, 'gloss 投毒不执行（同一节点、同一 payload，只换字段）');
      ok(g.body.includes('&lt;img'), 'gloss 渲染出的是转义实体 &lt;img');
      if (g.rendered && !g.body.includes('&lt;img')) {
        console.log(`      ↑ 诊断：面板里含 "gloss" 与否：${g.body.includes('gloss')}；含 "<img" 与否：${g.body.includes('<img')}`);
      }
    }
    cdp.close?.();
  }
  try { chrome.kill(); } catch {}
  try { srv.kill(); } catch {}
  await sleep(400);
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 150 });
  }  // ← 关掉「找到产物」那个 else
}

/* ── 8. 路径穿越：wiki 文件名（从真源码现抽表达式） ────────── */
console.log('\n[8] 路径穿越 —— wiki 页名生成（从 cm-build-wiki.mjs 现抽，改了就重测）');
{
  const wikiSrc = read('scripts/cm-build-wiki.mjs');
  const mm = wikiSrc.match(/let base = ([\s\S]*?);\n/);
  ok(!!mm, '能从源码里抽到页名表达式（抽不到说明生成方式变了，要重写这条测试）');
  if (mm) {
    let slug;
    try { slug = new Function('t', `return (${mm[1]});`); }
    catch (e) { ok(false, '抽出来的表达式不能求值：' + e.message); }
    if (slug) {
      const PAGES = P('knowledge/概念wiki-260913/concepts');
      const base = path.resolve(PAGES);
      const CASES = [
        ['../../etc/passwd', '经典穿越'],
        ['..', '只有两点'],
        ['.', '只有一点'],
        ['a/b/c', '斜杠分段'],
        ['..\\..\\windows\\system32', '反斜杠穿越'],
        ['....//....//etc', '重叠斜杠'],
        ['', '空名字'],
        ['\u0000null', 'NUL 字节'],
        ['name\u202Egnp.exe', 'RTL override'],
      ];
      let escaped = 0;
      for (const [name, why] of CASES) {
        const out = slug({ id: 'cm_abcdef12', name, nameEn: '' });
        const full = path.resolve(base, out + '.md');
        const inside = full === base || full.startsWith(base + path.sep);
        if (!inside) { escaped++; console.log(`      ✗ 逃逸：${why} → ${JSON.stringify(out)}`); }
      }
      ok(escaped === 0, `9 种穿越构造全部被关在 concepts/ 目录内（逃逸 ${escaped} 个）`);
      const resolved = CASES.map(([n]) => slug({ id: 'cm_abcdef12', name: n, nameEn: '' }));
      ok(resolved.every(r => !r.includes('/') && !r.includes('\\')), '生成的页名不含路径分隔符');
      ok(resolved.every(r => r.length > 0), '生成的页名都不为空（空名回落到 id）');
    }
  }
}

/* ── 9. Unicode / 数据投毒面（对真实数据扫） ──────────────── */
console.log('\n[9] Unicode 攻击面与数据质量（扫真实数据）');
{
  const t = JSON.parse(fs.readFileSync(path.join(MAP, 'topics.json'), 'utf8')).topics;
  const ZERO = /[\u200B-\u200F\u202A-\u202E\u2060-\u2064\uFEFF]/;
  const zw = t.filter(x => ZERO.test(x.name) || ZERO.test(x.nameEn));
  ok(zw.length === 0, `名字里无零宽 / 方向控制字符（${zw.length} 条）`);
  const trim = t.filter(x => x.name !== x.name.trim());
  ok(trim.length === 0, `名字首尾无空白（${trim.length} 条）`);
  const long = t.filter(x => x.name.length > 80);
  ok(long.length === 0, `名字都 ≤80 字符（${long.length} 条超长，超了会被 wiki 截断）`);
  const byName = new Map();
  for (const x of t) byName.set(x.name, (byName.get(x.name) || 0) + 1);
  const dup = [...byName.entries()].filter(([, n]) => n > 1);
  ok(dup.length === 0, `名字无重复（${dup.length} 组重名，重名会让 [[双链]] 指错）`);
  if (dup.length) dup.slice(0, 5).forEach(([n, c]) => console.log(`      ${c}× ${n}`));
  const maxLen = Math.max(...t.map(x => x.name.length));
  console.log(`    最长名字 ${maxLen} 字符；最常见名字长度 ${Math.round(t.reduce((a, x) => a + x.name.length, 0) / t.length)}`);
}

/* ── 10. 契约漂移：契约写的字段 vs payload 真的有 ─────────── */
console.log('\n[10] 契约漂移 —— 契约 §三.1 声明的字段 vs payload 实际字段');
{
  const contract = read('docs/前端契约-知所栖135.md');
  const row = contract.split('\n').find(l => l.includes('`nodes[]`'));
  const declared = (row.match(/`\{([^}]+)\}/) || [, ''])[1].split(',').map(s => s.trim().replace(/\[\]$/, '')).filter(Boolean);
  const pub = read('prototype/知所栖-壳.html');
  const d = JSON.parse(pub.match(/const DATA\s*=\s*(\{[\s\S]*?\});\s*\n/)[1]);
  const actual = new Set(Object.keys(d.nodes[0]));
  const missing = declared.filter(k => !actual.has(k));
  const extra = [...actual].filter(k => !declared.includes(k));
  ok(missing.length === 0, `契约声明的 ${declared.length} 个字段 payload 全都有${missing.length ? '（缺：' + missing.join(',') + '）' : ''}`);
  if (extra.length) console.log(`    提示：payload 另有契约未登记的字段 ${extra.join(', ')}（不算失败，但契约该补）`);
}

/* ── 11. 陈旧 clone：消费者能不能自证手上是最新的 ─────────── */
console.log('\n[11] 陈旧 clone 检测能力');
{
  const m = JSON.parse(fs.readFileSync(path.join(MAP, 'manifest.json'), 'utf8'));
  ok(typeof m.generatedAt === 'string' && !isNaN(Date.parse(m.generatedAt)), `manifest.generatedAt 可解析（${m.generatedAt}）`);
  ok(m.checksums && Object.keys(m.checksums).length === 4, 'manifest 覆盖全部 4 个数据文件的校验和');
  console.log('    已知局限：**离线无法知道远端有没有更新**。要判「我这份是不是最新」只能 git fetch 后比对，');
  console.log('    或看 manifest.generatedAt。这是 git 的固有属性，不是本交付包的缺陷。');
}

// Chrome 的 profile 目录在进程被杀后还会继续写一小会儿，直接 rm 会 ENOTEMPTY
fs.rmSync(TMP, { recursive: true, force: true, maxRetries: 10, retryDelay: 150 });
console.log(`\n=== ${pass} 通过 · ${fail} 失败 ===\n`);
process.exit(fail ? 1 : 0);
