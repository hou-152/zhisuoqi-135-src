#!/usr/bin/env node
// 概念地图 v2 · 第 5 步：产出 os-taxonomy 形态的地图（数据 + JSON Schema + manifest 校验和）。
//
// 对齐 https://github.com/withmarbleapp/os-taxonomy 的文件与字段约定：
//   data/topics.json        → knowledge/概念地图-260913/topics.json
//   data/dependencies.json  → knowledge/概念地图-260913/dependencies.json（topicId depends on prerequisiteId）
//   data/clusters.json      → knowledge/概念地图-260913/clusters.json
//   data/manifest.json      → knowledge/概念地图-260913/manifest.json（计数 + 逐文件 SHA-256）
//
// 用法：node scripts/cm-build-map.mjs
// 校验：node scripts/cm-validate.mjs

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'evidence', 'cm-260913');
const OUT = path.join(ROOT, 'knowledge', '概念地图-260913');
fs.mkdirSync(path.join(OUT, 'schema'), { recursive: true });

const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const { nodes, domains } = JSON.parse(fs.readFileSync(path.join(DIR, '03-enriched.json'), 'utf8'));
const { dependencies, relations } = JSON.parse(fs.readFileSync(path.join(DIR, '04-edges.json'), 'utf8'));

/* ── 中心度：度数 0.6 + 被提及次数 0.4（确定性，不假造） ──── */
const deg = new Map(nodes.map((n) => [n.id, 0]));
for (const e of dependencies) {
  deg.set(e.topicId, (deg.get(e.topicId) || 0) + 1);
  deg.set(e.prerequisiteId, (deg.get(e.prerequisiteId) || 0) + 1);
}
const maxDeg = Math.max(1, ...deg.values());
const maxMention = Math.max(1, ...nodes.map((n) => n.mentionCount));
const centrality = new Map(nodes.map((n) => [n.id,
  Number((0.6 * (deg.get(n.id) / maxDeg) + 0.4 * (n.mentionCount / maxMention)).toFixed(3))]));

/* ── 依赖深度（最长路径，环已在上一步剔除） ─────────────── */
const pre = new Map(nodes.map((n) => [n.id, []]));
for (const e of dependencies) pre.get(e.topicId).push(e.prerequisiteId);
const memo = new Map();
function depth(id, seen) {
  if (memo.has(id)) return memo.get(id);
  seen.add(id); let m = 0;
  for (const p of pre.get(id)) {
    if (seen.has(p)) { m = 0; break; }
    m = Math.max(m, depth(p, seen) + 1);
  }
  seen.delete(id); memo.set(id, m); return m;
}
const SUBJECT = { notion: 'AI 概念库', context: 'Context Engineering', harness: 'Harness Engineering', neican: 'AI 内参 260912' };

/* ── topics.json ───────────────────────────────────────── */
const topics = nodes.map((n) => {
  const subj = n.origin.length === 1 ? SUBJECT[n.origin[0]] : n.origin.map((o) => SUBJECT[o]).join(' × ');
  return {
    id: n.id,
    type: n.type,
    subject: subj,
    domain: n.domain,
    name: n.name,
    nameEn: n.nameEn || '',
    aliases: n.aliases,
    description: n.desc || n.gloss || n.feynmans[0]?.slice(0, 80) || n.name,
    feynman: n.feynmans[0] || '',
    sourceContext: n.bodies[0]?.text || '',
    evidence: n.evidence,
    assessmentPrompt: n.ap,
    centrality: centrality.get(n.id),
    depth: depth(n.id, new Set()),
    learningStage: n.stage,
    verification: n.k,
    mentionCount: n.mentionCount,
    origin: n.origin,
    sources: n.sources.map((s) => ({ type: s.type, label: s.label, article: s.article || '', url: s.url || '', id: s.id || '' })),
  };
}).sort((a, b) => b.centrality - a.centrality || a.name.localeCompare(b.name, 'zh'));

const topicsFile = { version: 'v1', generatedAt: new Date().toISOString(), count: topics.length, topics };
fs.writeFileSync(path.join(OUT, 'topics.json'), JSON.stringify(topicsFile, null, 1));

/* ── dependencies.json ─────────────────────────────────── */
const depsFile = {
  version: 'v1', generatedAt: new Date().toISOString(), count: dependencies.length,
  note: 'topicId depends on prerequisiteId；strength hard＝不懂就立不住，soft＝懂更好。',
  dependencies,
};
fs.writeFileSync(path.join(OUT, 'dependencies.json'), JSON.stringify(depsFile, null, 1));

/* ── relations.json（非前置的关联，供 llm_wiki 链接层用） ── */
const relAll = [
  ...relations,
  ...dependencies
    .filter((d) => !relations.some((r) => r.from === d.topicId && r.to === d.prerequisiteId && r.kind === 'prerequisite'))
    .map((d) => ({ from: d.topicId, to: d.prerequisiteId, kind: 'prerequisite', strength: d.strength,
      axis: d.axis, note: d.reason, origin: d.origin, evidence: '' })),
];
fs.writeFileSync(path.join(OUT, 'relations.json'), JSON.stringify({
  version: 'v1', generatedAt: new Date().toISOString(), count: relAll.length, relations: relAll,
}, null, 1));

/* ── clusters.json：按领域分簇 ─────────────────────────── */
const byDomain = new Map();
for (const t of topics) {
  if (!byDomain.has(t.domain)) byDomain.set(t.domain, []);
  byDomain.get(t.domain).push(t);
}
const domainMeta = new Map(domains.map((d) => [d.id, d]));
const clusters = [...byDomain.entries()].map(([id, list]) => {
  const meta = domainMeta.get(id) || { label: id, question: '', order: 99 };
  const top = [...list].sort((a, b) => b.centrality - a.centrality).slice(0, 8);
  return {
    id, label: meta.label, question: meta.question, order: meta.order,
    topicCount: list.length,
    subjects: tally(list, 'subject'),
    types: tally(list, 'type'),
    stages: tally(list, 'learningStage'),
    hubTopics: top.map((t) => t.id),
    hubNames: top.map((t) => t.name),
  };
}).sort((a, b) => a.order - b.order);
function tally(arr, k) { const o = {}; for (const x of arr) o[x[k]] = (o[x[k]] || 0) + 1; return o; }
fs.writeFileSync(path.join(OUT, 'clusters.json'), JSON.stringify({
  version: 'v1', generatedAt: new Date().toISOString(), count: clusters.length, clusters,
}, null, 1));

/* ── schema/（JSON Schema，跟着 os-taxonomy 的字段约定） ── */
const schema = {
  'topics.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Concept Map Topics', type: 'object', required: ['version', 'count', 'topics'],
    properties: {
      version: { type: 'string' }, generatedAt: { type: 'string' }, count: { type: 'integer' },
      topics: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'type', 'subject', 'domain', 'name', 'description'],
          properties: {
            id: { type: 'string', pattern: '^cm_[0-9a-f]{8}$' },
            type: { enum: ['CONCEPTUAL', 'PROCEDURAL', 'REPRESENTATIONAL', 'LANGUAGE', 'META'] },
            subject: { type: 'string' }, domain: { type: 'string' },
            name: { type: 'string' }, nameEn: { type: 'string' }, aliases: { type: 'array', items: { type: 'string' } },
            description: { type: 'string' }, feynman: { type: 'string' }, sourceContext: { type: 'string' },
            evidence: { type: 'array', items: { type: 'string' } },
            assessmentPrompt: { type: 'string' },
            centrality: { type: 'number', minimum: 0, maximum: 1 },
            depth: { type: 'integer', minimum: 0 },
            learningStage: { enum: ['now', 'when-needed', 'deep-dive'] },
            verification: { enum: ['compute', 'judge', 'use', 'accept'] },
            mentionCount: { type: 'integer', minimum: 0 },
            origin: { type: 'array', items: { enum: ['notion', 'context', 'harness', 'neican'] } },
            sources: { type: 'array', items: { type: 'object' } },
          },
        },
      },
    },
  },
  'dependencies.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Concept Map Dependencies', type: 'object', required: ['version', 'count', 'dependencies'],
    properties: {
      version: { type: 'string' }, count: { type: 'integer' },
      dependencies: {
        type: 'array',
        items: {
          type: 'object', required: ['topicId', 'prerequisiteId', 'strength', 'reason'],
          properties: {
            topicId: { type: 'string', pattern: '^cm_[0-9a-f]{8}$' },
            prerequisiteId: { type: 'string', pattern: '^cm_[0-9a-f]{8}$' },
            strength: { enum: ['hard', 'soft'] },
            reason: { type: 'string' },
            kind: { type: 'string' }, axis: { type: 'string' },
            origin: { enum: ['curated', 'source-network', 'llm'] },
          },
        },
      },
    },
  },
  'clusters.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Concept Map Clusters', type: 'object', required: ['version', 'count', 'clusters'],
    properties: {
      version: { type: 'string' }, count: { type: 'integer' },
      clusters: {
        type: 'array',
        items: {
          type: 'object', required: ['id', 'label', 'topicCount'],
          properties: {
            id: { type: 'string' }, label: { type: 'string' }, question: { type: 'string' },
            order: { type: 'integer' }, topicCount: { type: 'integer', minimum: 0 },
            hubTopics: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
  },
};
for (const [f, s] of Object.entries(schema)) fs.writeFileSync(path.join(OUT, 'schema', f), JSON.stringify(s, null, 1));

/* ── manifest.json ─────────────────────────────────────── */
const files = ['topics.json', 'dependencies.json', 'relations.json', 'clusters.json'];
const checksums = {};
for (const f of files) checksums[f] = 'sha256:' + sha256(fs.readFileSync(path.join(OUT, f)));
const manifest = {
  version: 'v1',
  generatedAt: new Date().toISOString(),
  name: '知所栖 135 · AI 时代怎么做事 概念地图',
  sources: {
    'notion-概念库': { raw: 509, nodes: nodes.filter((n) => n.origin.includes('notion')).length, note: '用户 Notion 概念库（原始 509 条，只读；跨源合并后落到节点的 502 个）' },
    'context-engineering': { raw: 358, nodes: nodes.filter((n) => n.origin.includes('context')).length, note: '飞书-Context-Engineering-26+2.md（28 篇）' },
    'harness-engineering': { raw: 432, nodes: nodes.filter((n) => n.origin.includes('harness')).length, note: '飞书-Harness-Engineering-28+2.md（30 篇）' },
    'neican-260912': { raw: 88, nodes: nodes.filter((n) => n.origin.includes('neican')).length, note: 'AI 内参 260912 期 · 10 篇概念辞典（88 条；撞已有 8 条、新增 80 条，见 08-neican-merge.json）' },
  },
  topics: topics.length,
  dependencies: dependencies.length,
  relations: relAll.length,
  clusters: clusters.length,
  byType: tally(topics, 'type'),
  byStage: tally(topics, 'learningStage'),
  byVerification: tally(topics, 'verification'),
  // 每个来源自动一个 *Only 桶 —— 2026-09-13 修。
  // 此前硬编码 notion/context/harness 三个，第 08 步并入第四个来源 neican 后，
  // 那 80 条既不算 *Only 也不算 multi，合计 856 ≠ topics 936，静默漏计。
  // 键名保持 notionOnly/contextOnly/harnessOnly 不变（向后兼容），只多出 neicanOnly。
  byOrigin: (() => {
    const groups = [...new Set(topics.flatMap((t) => t.origin))].sort();
    const out = {};
    for (const g of groups) out[`${g}Only`] = topics.filter((t) => t.origin.length === 1 && t.origin[0] === g).length;
    out.multi = topics.filter((t) => t.origin.length > 1).length;
    return out;
  })(),
  checksums,
  license: '源材料为用户私人收藏（Notion 概念库 / AI 内参），本图仅供本项目内部使用，不对外再分发。',
};
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 1));

console.log('✅ 地图产出');
console.log(`   ${path.relative(ROOT, OUT)}/`);
console.log(`   topics ${topics.length} · dependencies ${dependencies.length} · clusters ${clusters.length}`);
console.log(`   最大深度 ${Math.max(...topics.map((t) => t.depth))} 层 · 类型 ${JSON.stringify(manifest.byType)}`);
console.log(`   领域：` + clusters.map((c) => `${c.label}(${c.topicCount})`).join(' '));
