// 费曼检验 AB 实验：A 规则基线 / B 裸 LLM / C1 轻量管线(检索+判定) / C2 参考 agent(占位)
// 用法：
//   1. 编辑 scripts/ab-samples.json：填 10 份真实复述 + 人工标注真值
//   2. A 组（零成本）：node scripts/ab-feynman-test.mjs
//   3. B/C1 组（OpenAI 兼容接口）：
//      LLM_API_BASE=https://api.example.com/v1 LLM_API_KEY=sk-xx LLM_MODEL=xxx node scripts/ab-feynman-test.mjs
//   4. 结果写入 evidence/ab-feynman-results.json
// 注意：checklist 与 prototype/知所栖-135-基础框架.html 内的费曼引擎是同一份，改动须两处同步。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const OUT = join(ROOT, 'evidence', 'ab-feynman-results.json');

const CFG = {
  apiBase: process.env.LLM_API_BASE || '',
  apiKey: process.env.LLM_API_KEY || '',
  model: process.env.LLM_MODEL || '',
  pricePerMTok: Number(process.env.LLM_PRICE_PER_M_TOK || 0), // 每百万 token 单价（元），用于成本估算
};

// ---------- checklist（与 HTML 内费曼引擎同步） ----------
const CHECKLIST = {
  'shot-size': [
    { label: '景别 = 取景距离决定画面信息量', words: ['距离', '远近', '信息', '多少', '范围'] },
    { label: '远景环境 / 近景情绪细节，各司其职', words: ['环境', '情绪', '细节', '交代', '聚焦'] },
    { label: '单一景别连续使用 ≈ 幻灯片感', words: ['ppt', '幻灯', '单一', '单调', '节奏'] },
  ],
  'camera-move': [
    { label: '运镜 = 时间轴上的注意力引导', words: ['注意', '引导', '视线', '眼睛'] },
    { label: '推强调 / 拉交代 / 摇展示空间 / 移跟随', words: ['推', '拉', '摇', '移', '强调', '跟随'] },
    { label: '不写运镜 → 默认固定机位 → 画面呆板', words: ['固定', '呆', '不动', '默认', '静止'] },
  ],
  'shot-prompt': [
    { label: '提示词结构 = 景别 + 运镜 + 主体 + 光线风格', words: ['景别', '运镜', '结构', '光线', '风格'] },
    { label: '逐镜头写，不是一句话生成整段', words: ['逐', '每个镜头', '分镜', '一句'] },
    { label: '不写 → 模型随机发挥 → 不可控', words: ['随机', '不可控', '发挥', '失控'] },
  ],
};
const CONCEPT_NAMES = { 'shot-size': '景别', 'camera-move': '运镜', 'shot-prompt': '镜头提示词' };

// ---------- A：离线规则 ----------
function groupA(speech) {
  const t = speech.toLowerCase();
  const result = {};
  for (const [cid, points] of Object.entries(CHECKLIST)) {
    const detail = points.map(p => ({ label: p.label, hit: p.words.some(w => t.includes(w.toLowerCase())) }));
    result[cid] = { pass: detail.filter(d => d.hit).length >= 2, detail };
  }
  return { engine: 'A-rules', result, tokens: 0 };
}

// ---------- LLM 单轮调用（OpenAI 兼容） ----------
async function llm(messages) {
  if (!CFG.apiBase || !CFG.apiKey) throw new Error('未配置 LLM_API_BASE / LLM_API_KEY');
  const started = Date.now();
  const res = await fetch(`${CFG.apiBase.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CFG.apiKey}` },
    body: JSON.stringify({ model: CFG.model, messages, temperature: 0, response_format: { type: 'json_object' } }),
  });
  if (!res.ok) throw new Error(`LLM HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  let parsed;
  try { parsed = JSON.parse(text); } catch { throw new Error('LLM 返回非 JSON: ' + text.slice(0, 120)); }
  const tokens = (data.usage?.total_tokens ?? 0);
  return { parsed, tokens, ms: Date.now() - started };
}

function checklistPrompt(speech, evidenceBlock = '') {
  const cl = Object.fromEntries(Object.entries(CHECKLIST).map(([k, v]) => [k, v.map(p => p.label)]));
  return `你是学习产品的费曼检验引擎。学习者复述了所学内容，请逐概念判断其讲解是否覆盖了每个要点（pass=true 表示该要点已覆盖）。
每个概念 ≥2/3 要点覆盖才算通过(pass)。只输出 JSON：{"result":{"概念id":{"pass":bool,"covered":[要点下标数组]}}}
${evidenceBlock ? `可参考的知乎检索证据（仅作对照，不作为判定标准）：\n${evidenceBlock}\n` : ''}
概念id与要点：${JSON.stringify(cl, null, 1)}

学习者复述：${speech}`;
}

// ---------- B：裸 LLM 单次调用 ----------
async function groupB(speech) {
  const { parsed, tokens, ms } = await llm([{ role: 'user', content: checklistPrompt(speech) }]);
  return { engine: 'B-bare-llm', result: normalize(parsed), tokens, ms };
}

// ---------- C1：轻量管线（知乎检索 → 对照 → 单轮判定） ----------
function zhihuSearch(query) {
  return new Promise((resolve) => {
    const p = spawn(join(ROOT, 'scripts', 'zhihu'), ['search', 'zhihu', '--query', query, '--count', '2'], { cwd: ROOT });
    let out = '';
    p.stdout.on('data', d => out += d);
    p.on('error', () => resolve(null));
    p.on('close', code => {
      try {
        const j = JSON.parse(out);
        // CLI 返回 PascalCase：Data.Items[].Title / .ContentText（与 scripts/serve-135.mjs 一致）。
        // 2026-09-12 修：此处原写作 j.data?.items（小写），检索 100% 失败 → C1 静默回退成 B，
        // 会让「B 与 C1 打平就用 B」的预注册决策规则拿到假阴性结论。主流程前的预检防止复发。
        const items = (j.Data?.Items || []).slice(0, 2)
          .map(it => `- ${it.Title || ''}：${(it.ContentText || '').replace(/\s+/g, ' ').slice(0, 120)}`);
        resolve(items.length ? items.join('\n') : null);
      } catch { resolve(null); }
    });
  });
}

async function groupC1(speech) {
  const queries = { 'shot-size': 'AI视频 景别', 'camera-move': 'AI视频 运镜', 'shot-prompt': '视频 镜头提示词' };
  const blocks = [];
  for (const [cid, q] of Object.entries(queries)) {
    const r = await zhihuSearch(q);
    if (r) blocks.push(`【${CONCEPT_NAMES[cid]}】\n${r}`);
  }
  const evidence = blocks.join('\n');
  if (!evidence) { // 检索失败 → 回退 B
    const b = await groupB(speech);
    return { ...b, engine: 'C1-fallback-to-B' };
  }
  const { parsed, tokens, ms } = await llm([{ role: 'user', content: checklistPrompt(speech, evidence) }]);
  return { engine: 'C1-lightweight-pipeline', result: normalize(parsed), tokens, ms, evidenceQueries: Object.keys(queries).length };
}

// ---------- C2：PIA / Penguin 参考 agent（接口定义待补） ----------
async function groupC2() {
  throw new Error('C2 待接入：需要 PIA / Penguin 接口定义（飞书手册）');
}

function normalize(parsed) {
  // 兼容模型输出：转为 {cid:{pass:bool}}，缺概念视为 fail
  const out = {};
  for (const cid of Object.keys(CHECKLIST)) {
    const r = parsed?.result?.[cid] ?? parsed?.[cid];
    out[cid] = { pass: Boolean(r?.pass), detail: [] };
  }
  return out;
}

// ---------- 主流程 ----------
const samplesPath = join(ROOT, 'scripts', 'ab-samples.json');
if (!existsSync(samplesPath)) {
  console.error('缺少 scripts/ab-samples.json（模板见 scripts/ab-samples.template.json），先填 10 份真实复述+真值');
  process.exit(2);
}
const { samples } = JSON.parse(readFileSync(samplesPath, 'utf8'));
const groups = ['A', 'B', 'C1', 'C2'].filter(g => g !== 'C2' || process.env.RUN_C2 === '1');
const rows = [];

/* 预检（开环报警）：C1 的全部价值在于「判定前先取到证据」。
   检索不通时 groupC1 会静默回退成 B，实验就变成 A vs B vs B —— 结论必然指向「B 够用」，是假阴性。
   宁可在这里硬失败，也不要产出一份看起来正常、实则无效的对比。 */
if (groups.includes('C1')) {
  const probe = await zhihuSearch('AI视频 运镜');
  if (!probe) {
    console.error('FATAL: 知乎检索不通。C1 会静默回退成 B，实验结论无意义。先修 zhihuSearch 的响应解析（CLI 返回 Data.Items）再跑。');
    process.exit(3);
  }
  console.log('预检通过：知乎检索可用，C1 走真实管线');
}

for (const s of samples) {
  for (const g of groups) {
    const t0 = Date.now();
    try {
      const r = g === 'A' ? groupA(s.speech) : g === 'B' ? await groupB(s.speech) : g === 'C1' ? await groupC1(s.speech) : await groupC2();
      // 准确率：逐概念 预测pass 与 真值(覆盖要点数>=2) 比对
      let ok = 0, total = 0;
      for (const [cid, covered] of Object.entries(s.truth)) {
        total++;
        if (r.result[cid]?.pass === (covered.length >= 2)) ok++;
      }
      rows.push({ sample: s.id, group: r.engine, accuracy: +(ok / total).toFixed(2), tokens: r.tokens, ms: (r.ms ?? Date.now() - t0) });
      console.log(`s=${s.id} ${r.engine} 准确率=${(ok / total * 100).toFixed(0)}% tokens=${r.tokens} 耗时=${r.ms ?? Date.now() - t0}ms`);
    } catch (e) {
      rows.push({ sample: s.id, group: g, error: e.message.slice(0, 120) });
      console.log(`s=${s.id} ${g} 失败: ${e.message.slice(0, 120)}`);
    }
  }
}

const summary = {};
for (const r of rows.filter(r => !r.error)) {
  const s = summary[r.group] ||= { n: 0, acc: 0, tokens: 0, ms: 0 };
  s.n++; s.acc += r.accuracy; s.tokens += r.tokens; s.ms += r.ms;
}
for (const [g, s] of Object.entries(summary)) {
  s.avgAccuracy = +(s.acc / s.n).toFixed(2);
  s.avgTokens = Math.round(s.tokens / s.n);
  s.avgMs = Math.round(s.ms / s.n);
  s.estCostPerCheckYuan = +(s.avgTokens / 1e6 * CFG.pricePerMTok).toFixed(4);
  delete s.acc;
}
console.log('\n== 汇总 ==\n' + JSON.stringify(summary, null, 1));
writeFileSync(OUT, JSON.stringify({ at: new Date().toISOString(), model: CFG.model || 'A-only', summary, rows }, null, 1));
console.log('已写入 ' + OUT);
