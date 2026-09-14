#!/usr/bin/env node
// 实践空间路线草案生成器（确定性、不调模型、不改任何既有产物）。
// 数据源：
//   内容结构化系统/01-原始素材区/完整副本/图鉴站产物/categories.yaml   站方七类（站序依据）
//   内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/*.yaml   76 张图鉴卡（category_id / learning_stage / name_zh）
//   evidence/batch-units-260914/units.json                            76 个批量单元（unitId / superseded 取代关系）
// 站内顺序规则：主线锚点(superseded，置顶并指回六章) → now（打底）→ when-needed（用到再学）→ deep-dive（深挖）；
// 组内先后是课程组建议序，负责人拍板时可改——本脚本只负责把草案变成可校验的确定性 JSON。
// unitId 用页面口径（unit:batch-*，与 DATA.practice.units 一致），下游不再二次映射。
// 校验失败（数量/归类/阶段/单元对不上）exit 1 且不写产物。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { readYamlFields } from './lib/graph-adapter.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CARD_DIR = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
const CAT_FILE = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/categories.yaml';
const UNITS_FILE = 'evidence/batch-units-260914/units.json';
const OUT_FILE = 'evidence/practice-route-260915/route-draft.json';

// 站内建议序（课程组草案，拍板对象）。每站数组顺序即路线顺序。
const SUGGESTED_ORDER = {
  'current-view': [
    'large-language-model', 'llm-token', 'context-window', 'attention-budget', 'context', 'llm-statelessness',
    'harness-token-floor', 'retrieval-reasoning-dual-task-load',
  ],
  'information-storage': [
    'memory', 'filesystem-workspace', 'repository-source-of-truth', 'tacit-knowledge',
    'restorable-compression', 'persistent-code-graph', 'state-management',
  ],
  'continuous-action': [
    'agent', 'agent-loop', 'agent-harness', 'harness-engineering',
    'agent-cli-runtime', 'agent-lifecycle', 'error-handling', 'agent-handoff',
    'skill-chaining', 'subagent-orchestration', 'browsing-loop', 'durable-execution',
    'event-driven-agent-automation', 'prompt-caching',
  ],
  'external-access': [
    'tool', 'tool-workflow-fit', 'code-execution',
    'agent-action-space', 'agent-tool-contract', 'model-context-protocol', 'tool-scoping', 'tool-schema-tax',
  ],
  'human-control': [
    'prompt', 'prompt-engineering', 'system-prompt',
    'system-prompt-altitude', 'instruction-locality', 'agent-elicitation', 'reasoning-effort',
    'agent-stop-conditions', 'permission-boundary', 'sandbox', 'guardrails',
    'human-escalation-tool-call', 'skill', 'harness-compute-separation',
  ],
  'context-delivery': [
    'context-engineering', 'context-selection', 'minimal-sufficient-context', 'dynamic-context-assembly', 'context-rot',
    'lost-in-the-middle', 'progressive-disclosure', 'just-in-time-retrieval', 'observation-masking',
    'context-compaction', 'bounded-context', 'chat-template', 'skill-trigger-condition',
    'agent-session-management', 'ubiquitous-language',
  ],
  'result-trust': [
    'verifiable-goal', 'runnable-evidence', 'multi-step-reliability-decay', 'prompt-injection',
    'verification-loop', 'observability', 'change-impact-analysis', 'risk-tiered-autofixing',
    'trace-based-evals', 'harness-overfitting',
  ],
};

const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };

// ── 站方七类 ──
const catRaw = fs.readFileSync(path.join(ROOT, CAT_FILE), 'utf8');
const categories = [];
let cur = null;
for (const line of catRaw.split('\n')) {
  const m = line.match(/^-\s+id:\s*(\S+)/);
  if (m) { if (cur) categories.push(cur); cur = { id: m[1] }; continue; }
  if (!cur) continue;
  const f = line.match(/^\s+(label|question|order):\s*(.+)$/);
  if (f) cur[f[1]] = f[1] === 'order' ? Number(f[2].trim()) : f[2].trim().replace(/^['"]|['"]$/g, '');
}
if (cur) categories.push(cur);
if (categories.length !== 7) fail(`站方七类应有 7 条，实得 ${categories.length}`);

// ── 76 张图鉴卡 ──
const cardDir = path.join(ROOT, CARD_DIR);
const cards = new Map();
for (const f of fs.readdirSync(cardDir).filter((x) => x.endsWith('.yaml')).sort()) {
  const raw = fs.readFileSync(path.join(cardDir, f), 'utf8');
  const fields = readYamlFields(raw);
  const id = fields.id ?? f.replace(/\.yaml$/, '');
  cards.set(id, { slug: id, name: fields.name_zh ?? id, categoryId: fields.category_id ?? null, stage: fields.learning_stage ?? null, remember: fields.remember ?? '' });
}
if (cards.size !== 76) fail(`图鉴卡应有 76 张，实得 ${cards.size}`);

// ── 76 个批量单元 ──
const units = JSON.parse(fs.readFileSync(path.join(ROOT, UNITS_FILE), 'utf8')).units;
const unitBySlug = new Map(units.map((u) => [u.card.slug, u]));
if (units.length !== 76) fail(`批量单元应有 76 个，实得 ${units.length}`);

// ── 校验建议序：覆盖、归类、阶段、单元存在 ──
const seen = new Set();
const STAGE_RANK = { now: 0, 'when-needed': 1, 'deep-dive': 2 };
for (const cat of categories) {
  const order = SUGGESTED_ORDER[cat.id];
  if (!order) fail(`站 ${cat.id} 缺建议序`);
  const inCat = [...cards.values()].filter((c) => c.categoryId === cat.id);
  if (order.length !== inCat.length) fail(`站 ${cat.id} 建议序 ${order.length} 条 ≠ 该站卡片 ${inCat.length} 张`);
  for (const slug of order) {
    if (seen.has(slug)) fail(`卡 ${slug} 重复出现在建议序里`);
    seen.add(slug);
    const card = cards.get(slug);
    if (!card) fail(`建议序里的 ${slug} 不存在卡片`);
    if (card.categoryId !== cat.id) fail(`卡 ${slug} 属站 ${card.categoryId}，却被排进 ${cat.id}`);
    if (!(card.stage in STAGE_RANK)) fail(`卡 ${slug} 的 learning_stage 非法：${card.stage}`);
    if (!unitBySlug.has(slug)) fail(`卡 ${slug} 没有对应批量单元`);
  }
}
if (seen.size !== 76) fail(`建议序共覆盖 ${seen.size} 张，应为 76`);

// ── 组装 ──
const stations = categories
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((cat) => ({
    order: cat.order,
    id: cat.id,
    label: cat.label,
    question: cat.question,
    units: SUGGESTED_ORDER[cat.id].map((slug, i) => {
      const card = cards.get(slug);
      const unit = unitBySlug.get(slug);
      const row = {
        order: i + 1,
        unitId: 'unit:' + unit.unitId,
        slug,
        name: card.name,
        stage: card.stage,
        remember: card.remember || '',
      };
      if (unit.superseded) {
        row.superseded = true;
        row.replacedBy = unit.superseded.by;
        row.replacedByTitle = unit.superseded.byTitle;
        row.supersedeNote = '与主线六章同概念，点进去引导去学六章对应章（方案丙封条）';
      }
      return row;
    }),
  }));

const out = {
  version: 'practice-route-draft-v1',
  builtAt: new Date().toISOString(),
  status: 'draft-待负责人拍板',
  source: { categories: CAT_FILE, cards: CARD_DIR, units: UNITS_FILE },
  rules: [
    '站序 = 图鉴站方 categories.yaml 的 order 1-7（七问递进）',
    '站内 = 主线锚点(superseded，置顶指回六章) → now(打底) → when-needed(用到再学) → deep-dive(深挖)',
    '组内先后是课程组建议序：负责人拍板时直接改本文件各站 units 数组顺序即可',
    '开放与否不由本文件决定：仍由 practice-readiness 准入门现算，本文件只定路线顺序',
  ],
  stats: {
    stations: stations.length,
    units: stations.reduce((n, s) => n + s.units.length, 0),
    superseded: stations.reduce((n, s) => n + s.units.filter((u) => u.superseded).length, 0),
  },
  stations,
};

const sha = crypto.createHash('sha256').update(JSON.stringify(out.stations)).digest('hex').slice(0, 12);
const outDir = path.join(ROOT, path.dirname(OUT_FILE));
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(ROOT, OUT_FILE), JSON.stringify(out, null, 2) + '\n');
console.log(`✓ ${OUT_FILE}（站 ${out.stats.stations} · 单元 ${out.stats.units} · 其中 superseded ${out.stats.superseded} · 站序校验和 ${sha}）`);
