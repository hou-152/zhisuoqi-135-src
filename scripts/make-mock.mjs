#!/usr/bin/env node
// 生成 evidence/mock/ —— 「真结构、假内容」的前端离线开发包（边 1 的交付物）。
//
// 为什么要有它：前端（肖力臣）能不能开工，取决于这份 mock 到不到；
// 没有它，前端只能等后端 → 串行 → 48 小时里白白空转一段。
//
// 两种模式：
//   node scripts/make-mock.mjs            # 结构样本（不调 LLM，只读项目内真数据文件）
//   node scripts/make-mock.mjs --record   # 额外录两条真 LLM 响应（需要 serve-135 在跑 + 有凭证）
//
// 「真结构」的意思：每个键、每个类型都来自真实代码与真实数据文件，不是我编的。
// 录不到的部分写 "_mockStatus": "unrecorded"，**绝不假装是录到的**。

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'evidence', 'mock');
const RECORD = process.argv.includes('--record');
const ENDPOINT = process.env.MOCK_ENDPOINT || 'http://127.0.0.1:5180';

const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

// ---- 1. 屏幕 0：壳 payload 的结构样本（真数据，只抽 3 个点，避免把 1.1MB 复制一份）----
const payload = read('evidence/cm-260913/05-shell-payload.json');
const NODE_IDS = ['cm_0a4ca4ce'];                                   // Harness：k=judge，字段最全
const byId = Object.fromEntries(payload.nodes.map(n => [n.id, n]));
// 再挑两个与它相连的点，让前端能画出「选中 → 邻居」这条真交互
for (const [from, to] of payload.edges) {
  if (from === NODE_IDS[0] && !NODE_IDS.includes(to)) NODE_IDS.push(to);
  if (to === NODE_IDS[0] && !NODE_IDS.includes(from)) NODE_IDS.push(from);
  if (NODE_IDS.length >= 3) break;
}
const sampleNodes = NODE_IDS.filter(id => byId[id]).map(id => byId[id]);
const sampleEdges = payload.edges.filter(([a, b]) => NODE_IDS.includes(a) && NODE_IDS.includes(b));

const payloadSample = {
  _why: '壳 payload 的真结构样本。完整 856 点/491 边在 prototype/知所栖-壳.html 的 const DATA 里，不要复制整份。',
  _fullSource: 'evidence/cm-260913/05-shell-payload.json',
  _counts: { nodes: payload.nodes.length, edges: payload.edges.length, tags: payload.curation.tags.length },
  generatedAt: payload.generatedAt,
  nodes: sampleNodes,
  edges: sampleEdges,
  curation: {
    tags: payload.curation.tags.slice(0, 3),
    collections: payload.curation.collections.slice(0, 1),
    edgeAuto: payload.curation.edgeAuto?.slice?.(0, 3) ?? [],
    edgeHuman: payload.curation.edgeHuman?.slice?.(0, 3) ?? [],
  },
  kinds: payload.kinds,
};

// ---- 2. 屏幕 2/3：五语义单元（真数据，案例 → 决策场，方案 → 实验台）----
const units = read('内容结构化系统/模块/ai-concept-base/data/units.json');
const pick = (t) => units.filter(u => String(u.id).startsWith(t)).slice(0, 2);
const unitsSample = {
  _why: '五语义 538 单元的真结构样本。决策场吃 CAS-*，实验台吃 SOL-*，费曼判据吃 OPI-*。',
  _fullSource: '内容结构化系统/模块/ai-concept-base/data/units.json',
  _counts: units.reduce((a, u) => (a[u.type] = (a[u.type] || 0) + 1, a), {}),
  CAS: pick('CAS'),
  SOL: pick('SOL'),
  OPI: pick('OPI'),
};

// ---- 3. 三个接口的真响应 ----
const fixtures = {
  _what: '前端离线开发用的接口样本。真结构；标注 mock 的内容只用来做界面，不要当产品输出。',
  _generatedAt: new Date().toISOString(),
  _contract: 'docs/前端契约-知所栖135.md §二 §三',
  endpoints: {},
};

async function post(url, body) {
  const r = await fetch(ENDPOINT + url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  return r.json();
}

// /api/health
try {
  const h = await (await fetch(ENDPOINT + '/api/health')).json();
  fixtures.endpoints['GET /api/health'] = { ok: true, body: h };
} catch {
  fixtures.endpoints['GET /api/health'] = {
    ok: true,
    body: { ok: true, llm: true, app: false, dataDir: null, packaged: false, root: ROOT },
    _mockStatus: 'unrecorded（serve 没跑，这份是按 serve-lib.mjs 的返回字段手写的真结构）',
  };
}

// /api/search —— 知乎全网检索（前端「挖掘 · 提问」与费曼证据都吃它）
try {
  const s = await post('/api/search', { query: 'Harness 是什么 AI Agent' });
  fixtures.endpoints['POST /api/search'] = { ok: true, body: s };
} catch (e) {
  fixtures.endpoints['POST /api/search'] = {
    ok: true,
    body: { items: [] },
    _mockStatus: 'unrecorded：' + e.message,
  };
}

// /api/llm —— 两个 skill 形状：① 1 阅读（dbs-learning，自由文本）② 费曼判定（JSON）
const node = sampleNodes[0];
const checklist = { [node.id]: (node.evidence || []).slice(0, 3) };
const judgePrompt = (retell) =>
  '学习者复述了所学内容。请逐概念判断每条要点是否被覆盖（covered 为要点下标数组），每概念 ≥2 条覆盖才 pass。'
  + '知乎证据仅作对照。输出：{"result":{"概念id":{"pass":bool,"covered":[下标]}}}\n'
  + `要点：${JSON.stringify(checklist)}\n知乎证据：${JSON.stringify({ [node.id]: ['（样例）'] })}\n复述：${retell}`;

const RETELL_PASS =
  'Harness 就是模型外面那一整套软件架构。模型权重本身只会算下一个 token，'
  + '是 Harness 让它能读文件、跑命令、改代码。所以同一个模型换一套 Harness，'
  + '表现会差很多，因为项目级的目录、规则、依赖这些上下文是 Harness 喂进去的。';
const RETELL_MISS = 'Harness 就是包在模型外面的东西吧，好像是让 AI 用工具的。';

if (RECORD) {
  fixtures.endpoints['POST /api/llm · 1 阅读（skill=dbs-learning）'] = {
    ok: true,
    body: await post('/api/llm', {
      json: false, skill: 'dbs-learning',
      messages: [{ role: 'user', content: `我想学「${node.name}」。先给我三层梯度（L1 直觉 / L2 机制 / L3 应用）。` }],
    }),
  };
  fixtures.endpoints['POST /api/llm · 费曼判定（过）'] = {
    ok: true,
    body: await post('/api/llm', {
      messages: [
        { role: 'system', content: '你是学习产品的费曼检验引擎。只输出 JSON。' },
        { role: 'user', content: judgePrompt(RETELL_PASS) },
      ],
    }),
  };
  fixtures.endpoints['POST /api/llm · 费曼判定（有漏点）'] = {
    ok: true,
    body: await post('/api/llm', {
      messages: [
        { role: 'system', content: '你是学习产品的费曼检验引擎。只输出 JSON。' },
        { role: 'user', content: judgePrompt(RETELL_MISS) },
      ],
    }),
  };
}

// 失败态：前端必须做「加载 / 失败 / 空态」三种反馈，失败态不再靠猜
fixtures.endpoints['POST /api/llm · 失败态'] = {
  ok: false,
  body: { error: 'llm-not-configured（设 LLM_API_BASE / LLM_API_KEY / LLM_MODEL）' },
  _why: '服务端未配凭证时 /api/llm 的真实返回。前端照这个做失败态。',
};

fixtures.payloadSample = payloadSample;
fixtures.unitsSample = unitsSample;

// ---- 不重录时保住已录到的真响应（否则跑一次不带 --record 就把真数据冲成占位）----
const EXISTING = path.join(OUT_DIR, 'fixtures.json');
let kept = [];
if (!RECORD && fs.existsSync(EXISTING)) {
  try {
    const old = JSON.parse(fs.readFileSync(EXISTING, 'utf8'));
    for (const [k, v] of Object.entries(old.endpoints || {})) {
      if (!v._mockStatus && !fixtures.endpoints[k]) { fixtures.endpoints[k] = v; kept.push(k); }
    }
  } catch { /* 旧文件坏了就重来 */ }
}

// ---- 写出 ----
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(EXISTING, JSON.stringify(fixtures, null, 1));
if (kept.length) console.log('保留上次录到的真响应：' + kept.join(' | '));

// mock-fetch.js：丢进页面就能离线开发（拦截 4 个端点，不改业务代码）
const client = `/* 知所栖 135 · 前端离线开发用的 fetch 拦截器（真结构假内容）
 * 用法：在你的页面里，**在业务脚本之前**加一行
 *   <script src="evidence/mock/mock-fetch.js"></script>
 * 之后 /api/health /api/search /api/llm /api/save 全部走本地 fixtures，
 * 不需要 serve、不需要 API key。要接真接口：删掉这一行即可，业务代码一行不用改。
 * 生成：node scripts/make-mock.mjs [--record]   校验：node scripts/verify-mock.mjs
 */
(function () {
  var F = ${JSON.stringify(fixtures.endpoints, null, 1)};
  var real = window.fetch.bind(window);
  var HIT = {
    'GET /api/health': 'GET /api/health',
    'POST /api/llm': 'POST /api/llm · 1 阅读（skill=dbs-learning）',
    'POST /api/search': 'POST /api/search',
  };
  window.__MOCK__ = F;
  // 想稳定地做出某个状态，就强制某一条样本：
  //   __MOCK__.force('POST /api/llm · 费曼判定（过）')   // 强制通过态
  //   __MOCK__.force('POST /api/llm · 失败态')           // 强制失败态
  //   __MOCK__.force(null)                               // 取消强制
  window.__mockForce = null;
  F.force = function (k) { window.__mockForce = k || null; return k ? 'forced: ' + k : 'cleared'; };
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    var p = url.split('?')[0];
    if (window.__mockForce && F[window.__mockForce]) {
      return Promise.resolve(json(F[window.__mockForce].body || F[window.__mockForce]));
    }
    if (p === '/api/save') return Promise.resolve(json({ ok: true, path: '(mock) 没有真写文件' }));
    var key = HIT[method + ' ' + p];
    if (key && F[key]) {
      // 费曼判定按复述长短挑「有漏点 / 过」两条样本，方便把两种状态都做出来
      if (method === 'POST' && p === '/api/llm') {
        try {
          var bodyStr = (init && init.body) || '';
          if (bodyStr.indexOf('费曼检验') >= 0 || bodyStr.indexOf('covered') >= 0) {
            key = bodyStr.length > 400 ? 'POST /api/llm · 费曼判定（过）' : 'POST /api/llm · 费曼判定（有漏点）';
          }
        } catch (e) {}
      }
      return Promise.resolve(json((F[key] && F[key].body) || F[key]));
    }
    return real(input, init);
  };
  function json(o) {
    return new Response(JSON.stringify(o), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  console.log('[mock] 已接管 /api/*（真结构假内容）。接真接口请删掉 mock-fetch.js 这一行。');
})();
`;
fs.writeFileSync(path.join(OUT_DIR, 'mock-fetch.js'), client);

fs.writeFileSync(path.join(OUT_DIR, 'README.md'), `# evidence/mock —— 前端离线开发包（边 1 的交付物）

**这份是给前端（肖力臣）的。** 拿它做界面，不用等后端、不用 serve、不用 API key。

## 怎么用（两步）

1. 页面里**在业务脚本之前**加一行：\`<script src="evidence/mock/mock-fetch.js"></script>\`
2. 改界面。\`/api/health\` \`/api/search\` \`/api/llm\` \`/api/save\` 全部返回本地样本。

**接真接口时删掉那一行就行，业务代码一行都不用改**（这是契约 §二 的意义）。

## 里面有什么

| 文件 | 是什么 |
|---|---|
| \`mock-fetch.js\` | 拦截器。覆盖四个端点，含「费曼判定：过 / 有漏点」两种样本 |
| \`fixtures.json\` | 原始样本。每个响应的**真结构**；标 \`_mockStatus: unrecorded\` 的是没录到的，别当真的用 |
| \`screens.md\` | 5 屏各吃什么数据（对着契约 §四 看） |

## 想稳定做出某个状态：force()

不靠「复述写长一点」这种碰运气的方式切状态，直接点名要哪一条：

\`\`\`js
__MOCK__.force('POST /api/llm · 费曼判定（过）')   // 强制通过态
__MOCK__.force('POST /api/llm · 失败态')           // 强制失败态，做降级界面
__MOCK__.force(null)                               // 取消强制
\`\`\`

## 怎么算通过（两条命令）

\`\`\`sh
node scripts/verify-mock.mjs          # 59 项：断言 mock 的键与真实代码读的键一致（不需要 serve）
node scripts/verify-mock-browser.mjs  # 11 项：真无头 Chrome，在 about:blank 上验证「真的接管了」
\`\`\`

第二条是关键：它先证明「没有 mock 时 fetch 到不了后端」，再证明注入后四个端点都通 ——
**「前端不连服务就能做 5 屏」是实跑出来的，不是我说的。**

**通过标准不是「看着对」，是这两条命令绿。**

## 重新生成

\`\`\`sh
node scripts/make-mock.mjs            # 抽真结构；**已录到的真 LLM 响应会被保留**，不会冲掉
node scripts/make-mock.mjs --record   # 重新录 LLM 响应（需 serve-135 在跑 + 凭证）
\`\`\`

## 边界（照实标）

- LLM 那两条若显示 \`unrecorded\`，说明生成时没连上服务；**形状是真的，内容是占位的**。
- 样本内容只用来做界面，**不要当产品输出、不要当实验证据**（AGENTS.md：不得伪造样本或把示例数据当实验结果）。
`);

console.log('写出：' + path.relative(ROOT, path.join(OUT_DIR, 'fixtures.json')));
console.log('      ' + path.relative(ROOT, path.join(OUT_DIR, 'mock-fetch.js')));
console.log('      ' + path.relative(ROOT, path.join(OUT_DIR, 'README.md')));
const missing = Object.entries(fixtures.endpoints).filter(([, v]) => v._mockStatus).map(([k]) => k);
console.log(missing.length ? '未录到（形状为真、内容占位）：' + missing.join(' | ') : '全部端点已录到真响应。');
