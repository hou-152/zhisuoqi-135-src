// 全链路 Graph 适配器（2026-09-14）
//
// 作用：把工程里**已有的真实资产**读成一套统一节点/边索引。只读，不写公共源数据，
// 不迁移图数据库，不重写壳。产物由 scripts/build-graph.mjs 落盘。
//
// 设计口径（对应任务书 §4）：
//   - 五种边：provenance / knowledge / curriculum / transition / evidence。
//     **只有 transition 边能驱动学习状态跳转**，其余三类永远不能当"下一步"。
//   - 五类语义（QST/CON/OPI/CAS/SOL）与真五维是两套模型，分别建模再连接，不合成一套字段。
//   - 公共节点与个人/会话节点分命名空间（个人侧前缀 session:/turn:/evidence:/attempt:/checkpoint:/record:）。
//   - 缺来源、缺配对、未审核的**保留节点**并写清 statusReason，不把它变成 ready。
//
// 本文件里没有任何 LLM 调用，也没有非确定性行为：同样输入必然同样输出。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// ── 层定义（总图从左到右的列序）───────────────────────────────
export const LAYERS = [
  { id: 'source', label: '材料与出处', order: 1, kinds: ['SourceDocument', 'SourceSpan', 'DerivedAsset', 'FiveDimAsset'] },
  { id: 'semantics', label: '五类语义', order: 2, kinds: ['SemanticUnit'] },
  { id: 'knowledge', label: '公共知识与关系', order: 3, kinds: ['Concept', 'Topic'] },
  { id: 'curriculum', label: '问题与课程编排', order: 4, kinds: ['LearningProblem', 'Goal', 'GapHypothesis', 'Route', 'RouteStep', 'Unit', 'Criterion'] },
  { id: 'activity', label: '学习活动', order: 5, kinds: ['Reading', 'Formative', 'Support', 'Decision', 'DecisionReview', 'Summative', 'ApplicationReview', 'ExperimentReference'] },
  { id: 'runtime', label: '运行与记录', order: 6, kinds: ['Session', 'Turn', 'Attempt', 'Checkpoint', 'Evidence', 'AssessmentRecord'] },
  { id: 'ai', label: '模型与规则', order: 7, kinds: ['SkillPolicy', 'ModelAdapter', 'App'] },
];

const KIND_LAYER = {};
for (const l of LAYERS) for (const k of l.kinds) KIND_LAYER[k] = l.id;

// ── 小工具 ──────────────────────────────────────────────
const P = (...a) => path.posix.join(...a);

function sha256File(abs) {
  try { return crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex'); }
  catch { return null; }
}

/** 顶层 YAML 字段的极简读取器：只覆盖图鉴站卡片实际用到的写法（标量 / 行内数组 / 缩进列表 / 折叠块）。 */
export function readYamlFields(text) {
  const lines = String(text).split(/\r?\n/);
  const out = {};
  for (let i = 0; i < lines.length; i++) {
    const m = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(lines[i]);
    if (!m) continue;
    const key = m[1];
    let rest = m[2].trim();
    if (rest === '|' || rest === '>') {           // 折叠块：吃到下一个顶层键
      const buf = [];
      while (i + 1 < lines.length && !/^[A-Za-z_][A-Za-z0-9_]*:/.test(lines[i + 1])) buf.push(lines[++i]);
      out[key] = buf.join('\n').trim();
      continue;
    }
    if (rest === '') {                             // 可能是缩进列表
      const buf = [];
      while (i + 1 < lines.length && /^\s+-\s+/.test(lines[i + 1])) buf.push(lines[++i].replace(/^\s+-\s+/, '').trim());
      out[key] = buf.length ? buf : '';
      continue;
    }
    if (/^\[.*\]$/.test(rest)) { out[key] = rest.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean); continue; }
    out[key] = rest.replace(/^["']|["']$/g, '');
  }
  return out;
}

// ── 构建器 ──────────────────────────────────────────────
class Builder {
  constructor(root) {
    this.root = root;
    this.nodes = new Map();
    this.edges = new Map();
    this.gaps = [];
    this.entries = [];
    this.sources = [];
    this.warnings = [];
    this.counters = { edge: 0, gap: 0 };
  }

  abs(rel) { return path.join(this.root, rel); }
  exists(rel) { return fs.existsSync(this.abs(rel)); }

  /** 登记一份真实输入文件（带 sha256），产物里可反查构建基线。 */
  src(rel, note = '') {
    const abs = this.abs(rel);
    if (!fs.existsSync(abs)) { this.warn(`源文件不存在：${rel}`); return null; }
    const rec = { path: rel, sha256: sha256File(abs), note };
    if (!this.sources.some((s) => s.path === rel)) this.sources.push(rec);
    return rec;
  }

  json(rel) { return JSON.parse(fs.readFileSync(this.abs(rel), 'utf8')); }
  warn(msg) { if (!this.warnings.includes(msg)) this.warnings.push(msg); }

  node(n) {
    if (!n || !n.id) throw new Error('node 缺 id');
    if (this.nodes.has(n.id)) return this.nodes.get(n.id);
    const layer = n.layer || KIND_LAYER[n.kind];
    if (!layer) throw new Error(`未知 kind（没归层）：${n.kind} @ ${n.id}`);
    const rec = {
      id: n.id, kind: n.kind, layer,
      label: n.label || n.id,
      sub: n.sub || '',
      scope: n.scope || (layer === 'runtime' ? 'personal' : layer === 'knowledge' ? 'public' : 'curriculum'),
      status: n.status || 'ready',
      statusReason: n.statusReason || '',
      version: n.version || '',
      sourceRefs: n.sourceRefs || [],
      payloadRef: n.payloadRef || '',
      meta: n.meta || {},
      runnable: n.runnable || null,
    };
    this.nodes.set(rec.id, rec);
    return rec;
  }

  edge(e) {
    if (!e || !e.from || !e.to || !e.kind) throw new Error(`edge 字段不全：${JSON.stringify(e)}`);
    // 同一个 from→to 上可能挂两条不同守卫的流程边（例如 hasNextDecision 与 practiceComplete 都指向章末）
    // 所以流程边的身份必须把 event+guard 一起算进去，否则会被误当成重复边合并掉
    const id = e.id || (e.kind === 'transition'
      ? `e:transition:${e.from}|${e.event}|${e.guard}|${e.to}`
      : `e:${e.kind}:${e.from}|${e.relation || ''}|${e.to}`);
    if (this.edges.has(id)) return this.edges.get(id);
    const rec = {
      id, kind: e.kind, relation: e.relation || '', from: e.from, to: e.to,
      label: e.label || '', reviewState: e.reviewState || 'unreviewed',
      sourceRefs: e.sourceRefs || [],
    };
    if (e.kind === 'transition') {
      rec.event = e.event; rec.guard = e.guard; rec.effect = e.effect || 'noop';
      rec.label = e.label || `${e.event} → ${e.guard}`;
    }
    this.edges.set(id, rec);
    this.counters.edge++;
    return rec;
  }

  gap(g) {
    this.gaps.push({
      id: g.id || `gap:${++this.counters.gap}`,
      kind: g.kind || 'pending', layer: g.layer || '', label: g.label || '',
      why: g.why || '', where: g.where || '', affects: g.affects || [],
    });
  }

  /** 后建的适配器可以补全先建的节点（例如题目详情晚于活动骨架拿到）。 */
  update(id, patch) {
    const n = this.nodes.get(id);
    if (!n) throw new Error(`update 找不到节点：${id}`);
    for (const [k, v] of Object.entries(patch)) {
      if (k === 'meta') n.meta = { ...n.meta, ...v };
      else if (v !== undefined) n[k] = v;
    }
    return n;
  }

  entry(e) { this.entries.push(e); }

  /** 断链自检：任何边两端都必须是真实存在的节点。 */
  verifyIntegrity() {
    const bad = [];
    for (const e of this.edges.values()) {
      if (!this.nodes.has(e.from)) bad.push(`${e.id} from 缺节点 ${e.from}`);
      if (!this.nodes.has(e.to)) bad.push(`${e.id} to 缺节点 ${e.to}`);
    }
    if (bad.length) throw new Error(`图里有 ${bad.length} 条边指向不存在的节点：\n  ` + bad.slice(0, 12).join('\n  '));
    return true;
  }
}

// ── 1. 公共知识：概念地图（只读适配，不改源数据）────────────────
function adaptConceptMap(b, out) {
  const dir = 'knowledge/概念地图-260913';
  const topicsFile = P(dir, 'topics.json');
  const clustersFile = P(dir, 'clusters.json');
  const depsFile = P(dir, 'dependencies.json');
  const relsFile = P(dir, 'relations.json');
  if (!b.exists(topicsFile)) { b.warn(`概念地图不在：${topicsFile}`); return; }
  b.src(topicsFile, '概念唯一真源（只读）'); b.src(clustersFile); b.src(depsFile); b.src(relsFile);

  const topicsRaw = b.json(topicsFile);
  const topics = topicsRaw.topics || topicsRaw;
  const clustersRaw = b.json(clustersFile);
  const clusters = clustersRaw.clusters || clustersRaw;
  const depsRaw = b.json(depsFile);
  const deps = depsRaw.dependencies || depsRaw;
  const relsRaw = b.json(relsFile);
  const rels = relsRaw.relations || relsRaw;

  // 主题
  for (const c of clusters) {
    b.node({
      id: `topic:${c.id}`, kind: 'Topic', label: c.label || c.id, sub: `${c.topicCount ?? 0} 个概念`,
      status: 'ready', payloadRef: clustersFile,
      sourceRefs: [{ path: clustersFile, locator: `clusters[${clusters.indexOf(c)}]` }],
      meta: { label: c.label, question: c.question || '', topicCount: c.topicCount ?? 0 },
    });
  }

  // 概念
  const byCluster = new Map();
  topics.forEach((t, i) => {
    const dom = t.domain || '';
    if (!byCluster.has(dom)) byCluster.set(dom, []);
    byCluster.get(dom).push(t);
    b.node({
      id: `concept:${t.id}`, kind: 'Concept', label: t.name || t.id, sub: dom,
      scope: 'public', status: 'ready', payloadRef: topicsFile,
      sourceRefs: [{ path: topicsFile, locator: `topics[${i}]` }],
      meta: {
        name: t.name, nameEn: t.nameEn || '', aliases: t.aliases || [], domain: dom,
        description: t.description || '', feynman: t.feynman || '',
        evidence: t.evidence || [], stage: t.stage || '', verification: t.verification || '',
        difficulty: t.difficulty || '', type: t.type || '',
        origin: t.origin || (t.origin && t.origin.join ? t.origin.join('+') : ''),
        subject: t.subject || '',
      },
    });
  });
  for (const [dom, list] of byCluster) {
    const t = clusters.find((c) => c.id === dom);
    if (!t) {
      b.gap({ kind: 'pending', layer: 'knowledge', label: `领域 ${dom} 没有对应主题`,
        why: `${list.length} 个概念的 domain 在 clusters.json 里找不到同名主题`, where: topicsFile, affects: list.slice(0, 3).map((x) => `concept:${x.id}`) });
      continue;
    }
    for (const c of list) {
      b.edge({ kind: 'knowledge', relation: 'contains', from: `topic:${dom}`, to: `concept:${c.id}`,
        label: '包含', reviewState: 'sourced', sourceRefs: [{ path: topicsFile, locator: `topics[id=${c.id}].domain` }] });
    }
  }

  // 依赖（前置）：强度与来源照实保留，未审核的标 unreviewed（任务书 §3.2）
  let depUnreviewed = 0;
  deps.forEach((d, i) => {
    const review = d.origin === 'curated' ? 'curated' : (d.audit === 'yes' ? 'sourced' : 'unreviewed');
    if (review === 'unreviewed') depUnreviewed++;
    b.edge({ kind: 'knowledge', relation: d.kind || 'prerequisite', from: `concept:${d.prerequisiteId}`, to: `concept:${d.topicId}`,
      label: `${d.strength || ''} 前置`.trim(), reviewState: review,
      sourceRefs: [{ path: depsFile, locator: `dependencies[${i}]` }] });
  });

  // 关系（组成 / 相关 / 对照 …）：原义保留，不升级成先修
  let relUnreviewed = 0;
  rels.forEach((r, i) => {
    const review = r.origin === 'curated' ? 'curated' : 'unreviewed';
    if (review === 'unreviewed') relUnreviewed++;
    b.edge({ kind: 'knowledge', relation: r.kind || 'related-to', from: `concept:${r.from}`, to: `concept:${r.to}`,
      label: r.kind || 'related-to', reviewState: review,
      sourceRefs: [{ path: relsFile, locator: `relations[${i}]` }] });
  });

  // 源数据里有重复记录：按稳定身份去重（任务书 §4），但**必须报出来**，不能静默合并
  const dupKeys = (arr, key) => { const seen = new Set(); const d = []; for (const x of arr) { const k = key(x); if (seen.has(k)) d.push(k); else seen.add(k); } return d; };
  const depDup = dupKeys(deps, (x) => `${x.topicId}<-${x.prerequisiteId}`);
  const relDup = dupKeys(rels, (x) => `${x.from}>${x.to}/${x.kind}`);
  if (depDup.length) b.gap({ kind: 'pending', layer: 'knowledge', label: `概念依赖里有 ${depDup.length} 条重复记录（已按稳定身份去重）`, why: `重复键：${depDup.slice(0, 5).join('、')}`,
    where: depsFile, affects: depDup.slice(0, 3).map((k) => `concept:${k.split('<-')[0]}`) });
  if (relDup.length) b.gap({ kind: 'pending', layer: 'knowledge', label: `概念关系里有 ${relDup.length} 条重复记录（已按稳定身份去重）`, why: `重复键：${relDup.slice(0, 5).join('、')}`,
    where: relsFile, affects: relDup.slice(0, 3).map((k) => `concept:${k.split('>')[0]}`) });

  out.conceptMap = { topics: topics.length, clusters: clusters.length, dependencies: deps.length, relations: rels.length, depUnreviewed, relUnreviewed, depDuplicates: depDup.length, relDuplicates: relDup.length, depEdgesKept: deps.length - depDup.length, relEdgesKept: rels.length - relDup.length };
}

// ── 2. 五类语义（QST/CON/OPI/CAS/SOL）────────────────────────────
function adaptSemanticUnits(b, out) {
  const rel = '内容结构化系统/模块/ai-concept-base/data/units.json';
  if (!b.exists(rel)) { b.warn(`语义单元库不在：${rel}`); return; }
  b.src(rel, '538 个语义单元（五类）');
  const raw = b.json(rel);
  const units = raw.units || raw;
  const byType = {};
  let bodyLinked = 0;

  units.forEach((u, i) => {
    const prefix = String(u.id).split('-')[0];
    const typeMap = { QST: 'QST', CON: 'CON', OPI: 'OPI', CAS: 'CAS', SOL: 'SOL' };
    const code = typeMap[prefix] || prefix;
    byType[code] = (byType[code] || 0) + 1;
    b.node({
      id: `semunit:${u.id}`, kind: 'SemanticUnit', label: u.title || u.id, sub: `${code} · ${u.type || ''}`.trim(),
      scope: 'public', status: u.status && /已核对/.test(u.status) ? 'ready' : 'scaffold',
      statusReason: u.status && /已核对/.test(u.status) ? '' : `源数据 status=${u.status || '未标'}`,
      payloadRef: rel,
      sourceRefs: [{ path: rel, locator: `units[${i}]` }],
      meta: { unitType: code, title: u.title || '', themes: u.themes || [], keywords: u.keywords || [], sourceDocuments: u.source_documents || [] },
    });

    // 出处边：语义单元 → 来源登记
    for (const s of u.source_documents || []) {
      b.edge({ kind: 'provenance', relation: 'derived-from', from: `semunit:${u.id}`, to: `source:${s}`,
        label: '来源', reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[${i}].source_documents` }] });
    }

    // 五类语义之间的关系（材料网络内部）：落到 knowledge 边，因为既不是出处、不是课程、也不驱动跳转
    for (const r of u.relationships || []) {
      if (!r || !r.target) continue;
      b.edge({ kind: 'knowledge', relation: `semantic:${r.type || '关联'}`, from: `semunit:${u.id}`, to: `semunit:${r.target}`,
        label: r.type || '关联', reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[${i}].relationships` }] });
    }

    // 正文里逐字出现的图鉴站卡片路径 → 真实的"这份材料是从哪张卡派生的"证据
    const body = String(u.body || '');
    const seen = new Set();
    for (const m of body.matchAll(/concepts\/([a-z0-9][a-z0-9-]*)\.yaml/g)) {
      if (seen.has(m[1])) continue;
      seen.add(m[1]); bodyLinked++;
      b.edge({ kind: 'provenance', relation: 'derived-from', from: `semunit:${u.id}`, to: `card:${m[1]}`,
        label: '来源卡片', reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[id=${u.id}].body` }] });
    }
  });

  out.semantic = { total: units.length, byType, cardLinks: bodyLinked };
}

// ── 3. 来源链 + 图鉴站卡片 ────────────────────────────────
function adaptSourceChain(b, out) {
  const rel = 'evidence/agent-loop-260913/source-chain.json';
  const cardDir = '内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts';
  const cardFiles = b.exists(cardDir) ? fs.readdirSync(b.abs(cardDir)).filter((f) => f.endsWith('.yaml')) : [];

  // 三个来源登记（内容结构化系统 SOURCE_OF_TRUTH.md §来源注册表）——单位 units.json 用的是这套 ID
  const REG = [
    { id: 'SRC-EXT-001', label: 'Context Engineering 28 篇', file: '内容结构化系统/01-原始素材区/完整副本/飞书-Context-Engineering-26+2.md' },
    { id: 'SRC-EXT-002', label: 'Harness Engineering 30 篇', file: '内容结构化系统/01-原始素材区/完整副本/飞书-Harness-Engineering-28+2.md' },
    { id: 'SRC-EXT-003', label: '图鉴站产物（76 张概念卡）', file: cardDir },
  ];
  for (const r of REG) {
    const hasFile = b.exists(r.file);
    if (hasFile && !fs.statSync(b.abs(r.file)).isDirectory()) b.src(r.file);
    b.node({
      id: `source:${r.id}`, kind: 'SourceDocument', label: r.label, sub: '来源登记',
      scope: 'public', status: hasFile ? 'ready' : 'blocked',
      statusReason: hasFile ? '' : `本地找不到 ${r.file}`,
      payloadRef: hasFile ? r.file : '',
      sourceRefs: [{ path: '内容结构化系统/SOURCE_OF_TRUTH.md', locator: '§来源注册表' }],
      meta: { docType: 'source-registry', title: r.label },
    });
  }

  // 图鉴站 76 张卡（派生材料，不覆盖公共概念）
  const cardCats = {};
  cardFiles.forEach((f) => {
    const slug = f.replace(/\.yaml$/, '');
    const relPath = `${cardDir}/${f}`;
    const y = readYamlFields(fs.readFileSync(b.abs(relPath), 'utf8'));
    cardCats[y.category_id || '(无)'] = (cardCats[y.category_id || '(无)'] || 0) + 1;
    b.node({
      id: `card:${slug}`, kind: 'DerivedAsset', label: y.name_zh || slug, sub: `图鉴卡 · ${y.category_id || '未分类'}`,
      scope: 'public', status: 'ready', payloadRef: relPath,
      sourceRefs: [{ path: relPath, locator: `id: ${y.id || slug}` }],
      meta: { assetType: 'concept-card', slug, nameEn: y.name_en || '', aliases: y.aliases || [],
        categoryId: y.category_id || '', learningStage: y.learning_stage || '',
        definitionStatus: y.definition_status || '', sourceIds: y.source_ids || [] },
    });
    for (const s of y.source_ids || []) {
      b.edge({ kind: 'provenance', relation: 'derived-from', from: `card:${slug}`, to: `source:${s}`,
        label: '来源', reviewState: 'sourced', sourceRefs: [{ path: relPath, locator: 'source_ids' }] });
    }
  });

  // 来源链统计（58 篇 → 49 原始来源 → 76 张卡）
  let chain = null;
  if (b.exists(rel)) {
    b.src(rel, '58 篇 → 49 原始来源 → 76 张卡');
    chain = b.json(rel);
    for (const d of chain.docs || []) {
      const ok = b.exists(d.path);
      b.node({
        id: `source:${d.id}`, kind: 'SourceDocument', label: path.basename(d.path), sub: '58 篇合订正文',
        scope: 'public', status: ok ? 'ready' : 'blocked', statusReason: ok ? '' : `本地找不到 ${d.path}`,
        payloadRef: ok ? d.path : '',
        sourceRefs: [{ path: rel, locator: `docs[id=${d.id}]` }],
        meta: { docType: 'anthology', title: path.basename(d.path) },
      });
      if (ok) b.src(d.path);
    }
    for (const s of chain.sources || []) {
      // 49 个原始来源：本地只有标题/作者/链接，没有正文 → 照实标 scaffold，不假装成可读材料
      b.node({
        id: `source:${s.id}`, kind: 'SourceDocument', label: s.title || s.id, sub: `原始来源 · ${s.sourceType || ''}`,
        scope: 'public', status: 'scaffold',
        statusReason: '本地只有标题/作者/链接，没有正文快照；可回溯但不可直读',
        payloadRef: '', sourceRefs: [{ path: rel, locator: `sources[id=${s.id}]` }],
        meta: { title: s.title || '', author: s.author || '', url: s.url || '', docType: 'original-source', inDocs: !!s.inDocs, docIds: s.docIds || [] },
      });
      for (const docId of s.docIds || []) {
        b.edge({ kind: 'provenance', relation: 'quoted-in', from: `source:${s.id}`, to: `source:${docId}`,
          label: s.inDocs ? '正文里逐字可查' : '未在正文中找到', reviewState: s.inDocs ? 'sourced' : 'unreviewed',
          sourceRefs: [{ path: rel, locator: `sources[id=${s.id}].docIds` }] });
      }
    }
  } else {
    b.warn(`来源链不在：${rel}（先跑 scripts/build-source-chain.mjs）`);
  }

  // 真实缺口：语义单元里引用的来源 ID，如果没有任何节点定义它，保留一个 blocked 节点而不是静默丢边
  for (const e of [...b.edges.values()]) {
    if (e.kind !== 'provenance') continue;
    if (!e.to.startsWith('source:')) continue;
    if (b.nodes.has(e.to)) continue;
    const id = e.to.slice('source:'.length);
    b.node({ id: e.to, kind: 'SourceDocument', label: id, sub: '被引用但未登记',
      scope: 'public', status: 'blocked', statusReason: '有语义单元引用它，但来源链与来源注册表里都没有这条登记',
      sourceRefs: [], meta: { docType: 'unknown' } });
    b.gap({ kind: 'blocked', layer: 'source', label: `来源未登记：${id}`,
      why: '语义单元的 source_documents 引用了它，但 58 篇来源链与来源注册表都没有这条', where: '内容结构化系统/模块/ai-concept-base/data/units.json',
      affects: [e.from] });
  }

  // 真实缺口：图鉴站 7 类分类与概念地图 21 主题是两套分类，未建立映射
  b.gap({ kind: 'pending', layer: 'knowledge', label: '图鉴卡分类 ↔ 概念地图主题 未建立映射',
    why: `图鉴站用 7 个 category_id（${Object.keys(cardCats).join(' / ')}），概念地图用 21 个主题，两套分类没有逐条核对过的映射；本轮不按名字猜`,
    where: cardDir, affects: cardFiles.slice(0, 3).map((f) => `card:${f.replace(/\.yaml$/, '')}`) });

  out.cards = { files: cardFiles.length, byCategory: cardCats };
  out.chain = chain ? chain.stats : null;
}

// ── 4. 内参三产物 + 真五维 + 内参原文 ──────────────────────────
function adaptNeican(b, out) {
  const K = 'knowledge';
  const issues = fs.existsSync(b.abs(K))
    ? fs.readdirSync(b.abs(K)).filter((d) => /^内参-\d{6}$/.test(d)).sort()
    : [];
  const stat = { issues: issues.length, articles: 0, fivedim: 0, notes: 0, dicts: 0, feynmans: 0, raws: 0 };

  for (const iss of issues) {
    const base = P(K, iss);
    const payloadRel = P(base, '内参-页面数据.json');
    const articles = b.exists(payloadRel) ? (b.json(payloadRel).articles || []) : [];
    if (b.exists(payloadRel)) b.src(payloadRel, `${iss} 期页面数据`);
    stat.articles += articles.length;

    for (const a of articles) {
      const slug = a.slug;
      const srcId = `source:neican-${iss.slice(-6)}:${slug}`;
      const rawRel = P(base, '原文', `${slug}.md`);
      const hasRaw = b.exists(rawRel);
      if (hasRaw) { b.src(rawRel); stat.raws++; }
      const derived = [];
      for (const [sub, kind] of [['三级笔记', 'notes'], ['概念辞典', 'dict'], ['AI费曼', 'feynman']]) {
        const rel = P(base, sub, `${slug}.md`);
        if (b.exists(rel)) {
          b.src(rel); derived.push({ rel, kind });
          if (kind === 'notes') stat.notes++; else if (kind === 'dict') stat.dicts++; else stat.feynmans++;
          b.node({
            id: `derived:${kind}:${iss}:${slug}`, kind: 'DerivedAsset',
            label: `${a.title || slug} · ${sub}`, sub: `派生产物 · ${sub}`,
            scope: 'public', status: 'ready', payloadRef: rel,
            sourceRefs: [{ path: rel, locator: '全文' }],
            meta: { assetType: kind, slug, issue: iss, title: a.title || '' },
          });
        }
      }
      b.node({
        id: srcId, kind: 'SourceDocument', label: a.title || slug, sub: `${iss} 第 ${a.no} 篇 · ${a.tag || ''}`,
        scope: 'public', status: hasRaw ? 'ready' : 'scaffold',
        statusReason: hasRaw ? '' : '本地没有这一篇的原文快照，只有标题与链接',
        payloadRef: hasRaw ? rawRel : '',
        sourceRefs: [{ path: payloadRel, locator: `articles[slug=${slug}]` }],
        meta: { title: a.title || '', author: a.author || '', url: a.url || '', docType: 'neican-article', issue: iss, slug },
      });
      for (const d of derived) {
        b.edge({ kind: 'provenance', relation: 'derived-from', from: `derived:${d.kind}:${iss}:${slug}`, to: srcId,
          label: '派生自', reviewState: 'sourced', sourceRefs: [{ path: d.rel, locator: '首部来源' }] });
      }

      // 真五维：concepts / reading / decisions / experiments / feynman 五个字段分别建成资产节点
      const fiveRel = P(base, '拆解五维', `${slug}.json`);
      if (b.exists(fiveRel)) {
        b.src(fiveRel, `${iss} 真五维`);
        const d = b.json(fiveRel);
        stat.fivedim++;
        const fid = `fivedim:${iss}:${slug}`;
        b.node({
          id: fid, kind: 'FiveDimAsset', label: a.title || slug, sub: `真五维 · ${iss}`,
          scope: 'public', status: 'ready', payloadRef: fiveRel,
          sourceRefs: [{ path: fiveRel, locator: 'concepts/reading/decisions/experiments/feynman' }],
          meta: {
            slug, issue: iss, title: a.title || '',
            hasConcepts: Array.isArray(d.concepts) ? d.concepts.length : 0,
            hasReading: d.reading ? Object.keys(d.reading).length : 0,
            hasDecisions: Array.isArray(d.decisions) ? d.decisions.length : 0,
            hasExperiments: Array.isArray(d.experiments) ? d.experiments.length : 0,
            hasFeynman: d.feynman ? Object.keys(d.feynman).length : 0,
          },
        });
        b.edge({ kind: 'provenance', relation: 'derived-from', from: fid, to: srcId,
          label: '拆解自', reviewState: 'sourced', sourceRefs: [{ path: fiveRel, locator: '顶层' }] });
      }
    }

    // 这一期缺哪一类资产，是真实缺口，写进 gaps
    const missing = [];
    if (!articles.length) missing.push('没有文章');
    if (stat.notes === 0 && b.exists(P(base, '三级笔记'))) missing.push('三级笔记为空');
    b.gap({ kind: 'pending', layer: 'source', label: `${iss} 期资产清点`,
      why: `文章 ${articles.length} 篇；三级笔记 ${b.exists(P(base, '三级笔记')) ? fs.readdirSync(b.abs(P(base, '三级笔记'))).length : 0} 份；概念辞典 ${b.exists(P(base, '概念辞典')) ? fs.readdirSync(b.abs(P(base, '概念辞典'))).length : 0} 份；AI 费曼 ${b.exists(P(base, 'AI费曼')) ? fs.readdirSync(b.abs(P(base, 'AI费曼'))).length : 0} 份；真五维 ${b.exists(P(base, '拆解五维')) ? fs.readdirSync(b.abs(P(base, '拆解五维'))).filter((f) => f.endsWith('.json')).length : 0} 份`,
      where: base, affects: [] });
  }
  out.neican = stat;
}

// ── 5. 课程：问题 / 目标 / 缺口假设 / 路线 / 单元 / 判据 / 活动 ──
const ACTIVITY_KINDS = ['Reading', 'Formative', 'Support', 'Decision', 'DecisionReview', 'Summative', 'ApplicationReview', 'ExperimentReference'];

/** 给一个单元生成活动骨架（六章、单篇、夹具共用同一套生成器）。 */
function makeActivities(b, unit, opts) {
  // 活动节点的默认出处：本单元的编译材料 + 运行图契约。谁更具体，后面用 builder.update 覆盖。
  const baseRefs = opts.sourceRefs || (opts.payloadRef
    ? [{ path: opts.payloadRef, locator: `（编译自本单元材料）` }]
    : [{ path: 'docs/总图视图契约-20260914.md', locator: '§5.1 运行图' }]);
  const a = (suffix, kind, label, extra = {}) => {
    const id = `activity:${unit}${suffix}`;
    b.node({ id, kind, label, sub: extra.sub || unit, status: extra.status || 'ready', statusReason: extra.statusReason || '',
      scope: 'curriculum', payloadRef: extra.payloadRef || opts.payloadRef || '', sourceRefs: extra.sourceRefs || baseRefs,
      meta: { unitId: unit, ...(extra.meta || {}) }, runnable: { kind: 'activity', ref: id, entry: extra.entry || '' } });
    return id;
  };
  const n = opts.decisions;
  const dMeta = opts.decisionMeta || (() => ({}));
  const dRefs = opts.decisionRefs || null;
  const dStatus = opts.decisionStatus || 'ready';
  const reading = a(':reading', 'Reading', `${opts.title} · 阅读`, { sub: opts.sub, payloadRef: opts.readingRef, meta: { index: 0 } });
  const formative = a(':formative', 'Formative', `${opts.title} · 阅读中费曼`, { sub: opts.sub, meta: { kind: 'formative' } });
  const support = a(':support', 'Support', `${opts.title} · 补讲`, { sub: opts.sub, meta: { kind: 'support' } });
  const decisions = [], reviews = [];
  for (let i = 0; i < n; i++) {
    decisions.push(a(`:decision:${i + 1}`, 'Decision', `${opts.title} · 决策 ${i + 1}`, {
      sub: opts.sub, status: dStatus, payloadRef: opts.payloadRef,
      sourceRefs: dRefs || baseRefs, meta: { index: i + 1, ...dMeta(i) } }));
    reviews.push(a(`:review:${i + 1}`, 'DecisionReview', `${opts.title} · 决策 ${i + 1} 反馈`, {
      sub: opts.sub, status: dStatus, payloadRef: opts.payloadRef,
      sourceRefs: dRefs || baseRefs, meta: { index: i + 1, ...dMeta(i) } }));
  }
  const summative = a(':summative', 'Summative', `${opts.title} · 章末费曼验收`, { sub: opts.sub, meta: { kind: 'summative' } });
  const apply = a(':apply', 'ApplicationReview', `${opts.title} · 正式通过核对`, { sub: opts.sub, meta: { kind: 'application' } });
  const experiments = a(':experiment', 'ExperimentReference', `${opts.title} · 实验材料`, {
    sub: opts.sub,
    status: opts.experiments > 0 ? 'ready' : 'scaffold',
    statusReason: opts.experiments > 0 ? '' : (opts.experimentNote || '本单元材料里没有实验环节；本轮不新建实验台，节点保留但未启用'),
    meta: { count: opts.experiments, enabled: opts.experiments > 0, index: 0 },
  });
  // 路由点（不是让模型随便选出口，而是按 returnStack / checkpoint 记录恢复）
  const ret = a(':return', 'Support', `${opts.title} · 返回发起处`, { sub: opts.sub, meta: { role: 'router' } });
  const resume = a(':resume', 'Support', `${opts.title} · 恢复到失败前`, { sub: opts.sub, meta: { role: 'router' } });
  const error = a(':error', 'Support', `${opts.title} · 系统未判定`, { sub: opts.sub, meta: { role: 'error' } });
  const advance = a(':advance', 'ApplicationReview', `${opts.title} · 记录并前进`, { sub: opts.sub, meta: { role: 'advance' } });
  return { reading, formative, support, decisions, reviews, summative, apply, experiments, ret, resume, error, advance };
}

/** 把一个单元的活动用 transition 边连成可运行图。**只有这里的边能驱动跳转。** */
function wireUnit(b, unit, acts, opts) {
  const S = (from, to, event, guard, effect, label) => b.edge({
    kind: 'transition', from, to, event, guard, effect, label,
    reviewState: 'curated', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§5.1 运行图' }],
  });
  // 进阅读中费曼时先记住从阅读来，费曼过了解这一处后要回到阅读
  S(acts.reading, acts.formative, 'explain', 'always', 'openFormativeTurn', '想讲一讲或遇到困惑');
  // 没有决策题的单元（批量装配这一轮，决策题待装配）：阅读之后直接进章末独立验收，不编一道假题占位
  S(acts.reading, acts.decisions[0] ?? acts.summative, 'proceed', 'always', 'openAttempt',
    acts.decisions.length ? '按既有课程继续' : '本单元没有决策题（待装配），直接进章末独立验收');
  S(acts.formative, acts.support, 'evaluated', 'needSupport', 'recordGapAndReturn', '需要澄清或补充');
  S(acts.formative, acts.ret, 'evaluated', 'resolved', 'recordEvidence', '当前补讲目的完成');
  // 没有决策题时，回到阅读中费曼之后还要有一条继续向前的路（同样不编题）
  if (!acts.decisions.length) {
    S(acts.formative, acts.summative, 'proceed', 'always', 'openAttempt', '本单元没有决策题（待装配），直接进章末独立验收');
  }
  for (let i = 0; i < acts.decisions.length; i++) {
    S(acts.decisions[i], acts.reviews[i], 'answered', 'always', 'recordAttempt', '先选择再提交');
    S(acts.reviews[i], acts.support, 'reviewed', 'hasGap', 'recordGapAndReturn', '确有相关缺口');
    S(acts.reviews[i], acts.decisions[i + 1] ?? acts.summative, 'reviewed', 'hasNextDecision', 'openAttempt', '还有下一题');
    S(acts.reviews[i], acts.summative, 'reviewed', 'practiceComplete', 'openAttempt', '本章练习要求完成');
  }
  S(acts.summative, acts.support, 'assessed', 'needSupport', 'recordGapAndReturn', '需补充');
  S(acts.summative, acts.apply, 'assessed', 'summativePass', 'recordSummative', '提交独立验收');
  S(acts.apply, acts.advance, 'applied', 'formallyPassed', 'markUnitPass', '应用核对正式通过条件');
  // 补讲结束：不是一律回决策题，而是回到**发起补讲的那个活动**（阅读 / 某道题 / 章末验收 / 正式核对）
  S(acts.support, acts.ret, 'replied', 'always', 'recordEvidence', '学生只补当前问题，讲清后回发起处');
  // 路由点
  S(acts.ret, acts.reading, 'returned', 'targetIsReading', 'popReturnStack', '回到阅读');
  // 从某道题发起的补讲回到**那一道题**；没有决策题的单元就没有这条出口
  if (acts.decisions.length) S(acts.ret, acts.decisions[0], 'returned', 'targetIsDecision', 'popReturnStack', '回到发起补讲的那道题');
  S(acts.ret, acts.formative, 'returned', 'targetIsFormative', 'popReturnStack', '回到阅读中费曼');
  S(acts.ret, acts.summative, 'returned', 'targetIsSummative', 'popReturnStack', '回到章末验收（要重新提交一次，不由补讲 met 解锁）');
  S(acts.ret, acts.apply, 'returned', 'targetIsApply', 'popReturnStack', '回到正式核对');
  // 异常：系统未判定不是学生不会
  // 一次请求没判定出来（超时 / 非法 JSON / 未知 ID / 过期结果）→ 走这条，不记成学生缺口
  S(acts.formative, acts.error, 'evaluated', 'isSystemError', 'markNotJudged', '系统未能判定');
  S(acts.summative, acts.error, 'assessed', 'isSystemError', 'markNotJudged', '系统未能判定');
  for (const from of [acts.formative, acts.summative]) {
    S(from, acts.error, 'undetermined', 'always', 'markNotJudged', '系统未能判定');
    S(acts.error, acts.resume, 'retry', 'canRetry', 'clearUndetermined', '重试同一请求目的');
  }
  S(acts.resume, acts.formative, 'restored', 'resumeTargetIsFormative', 'noop', '恢复到失败前活动');
  S(acts.resume, acts.summative, 'restored', 'resumeTargetIsSummative', 'noop', '恢复到失败前活动');
  S(acts.resume, acts.reading, 'restored', 'resumeTargetIsReading', 'noop', '恢复到失败前活动');
  if (acts.decisions.length) S(acts.resume, acts.decisions[0], 'restored', 'resumeTargetIsDecision', 'noop', '恢复到失败前活动');
  // 暂停：记住原节点，不是一律从阅读重来
  for (const from of [acts.reading, ...acts.decisions, ...acts.reviews, acts.summative, acts.support, acts.formative, acts.apply]) {
    S(from, from, 'pause', 'always', 'saveCheckpoint', '暂停并保存原节点');
  }
  return acts;
}

/**
 * 收尾段：单元通过之后 → 回看最初的问题 → 用户决定下一行动 → 保存记录。
 * 六章挂路线级收尾（回用户原问题），单篇挂自己的收尾（没有用户背景就不编）。
 */
function wireTail(b, unit, opts) {
  const S = (from, to, event, guard, effect, label) => b.edge({
    kind: 'transition', from, to, event, guard, effect, label,
    reviewState: 'curated', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§5.1 运行图' }],
  });
  const base = { scope: 'curriculum', status: opts.status || 'ready', statusReason: opts.statusReason || '',
    payloadRef: opts.sourceRel || '', sourceRefs: [{ path: opts.sourceRel || 'docs/总图视图契约-20260914.md', locator: opts.locator || '收尾段' }] };
  const original = `activity:${unit}:original`, choice = `activity:${unit}:choice`, record = `activity:${unit}:record`;
  b.node({ id: original, kind: 'ApplicationReview', label: `${opts.title} · 回看原问题和仍未知的部分`, sub: opts.title, ...base,
    meta: { unitId: unit, role: 'original', problem: opts.problem || '' } });
  b.node({ id: choice, kind: 'ApplicationReview', label: `${opts.title} · 用户决定下一行动`, sub: opts.title, ...base,
    meta: { unitId: unit, role: 'choice', options: ['继续补知识', '换方案', '暂停'] } });
  b.node({ id: record, kind: 'ApplicationReview', label: `${opts.title} · 保存学习与决策记录`, sub: opts.title, ...base,
    meta: { unitId: unit, role: 'record' } });
  S(`activity:${unit}:advance`, original, 'advanced', 'routeComplete', 'appendRecord', '本次路线完成');
  S(original, choice, 'originalReviewed', 'always', 'appendRecord', '记录依据与仍未知');
  S(choice, record, 'choose', 'chooseContinue', 'appendRecord', '继续 / 换方案 / 暂停');
  S(choice, opts.learnMoreTo || record, 'choose', 'chooseLearnMore', 'appendRecord', '选择继续补知识');
  if (opts.problemNode) b.edge({ kind: 'curriculum', relation: 'returns-to', from: original, to: opts.problemNode, label: '回到最初的问题', reviewState: 'curated', sourceRefs: [{ path: opts.sourceRel, locator: opts.locator || '收尾段' }] });
  return { original, choice, record };
}

function adaptRoutesAndUnits(b, out) {
  const routesRel = 'evidence/paths-260913/routes.json';
  const chaptersRel = 'evidence/agent-loop-260913/chapters.json';
  const authoredRel = 'evidence/agent-loop-260913/authored.json';
  const pairingRel = 'evidence/agent-loop-260913/pairings.json';
  const fttmRel = 'evidence/feynman-teaching-map/agent-skills-api.json';
  const routes = b.exists(routesRel) ? b.json(routesRel) : { routes: [] };
  b.src(routesRel, '人工策展路线（只读，不改顺序）');
  const chapters = b.exists(chaptersRel) ? (b.json(chaptersRel).chapters || []) : [];
  b.src(chaptersRel, '六章已装配材料');
  const authored = b.exists(authoredRel) ? (b.json(authoredRel).chapters || {}) : {};
  b.src(authoredRel, '人工撰写的题目与费曼判据');
  const pairings = b.exists(pairingRel) ? b.json(pairingRel) : null;
  if (pairings) b.src(pairingRel, '六章 cm↔CON 配对与负责人裁决');

  const routeStats = { routes: 0, steps: 0, units: 0, criteria: 0, activities: 0 };

  for (const r of routes.routes || []) {
    const rid = r.routeId;
    routeStats.routes++;
    b.node({ id: `problem:${rid}`, kind: 'LearningProblem', label: r.entryQuestion || rid, sub: '入口问题',
      status: 'ready', payloadRef: routesRel,
      sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].entryQuestion` }],
      meta: { routeId: rid, title: r.title || '' } });
    b.node({ id: `goal:${rid}`, kind: 'Goal', label: r.target || rid, sub: '本次学习目标',
      status: 'ready', payloadRef: routesRel,
      sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].target` }],
      meta: { routeId: rid, stopCondition: r.stopCondition || '' } });
    b.node({ id: `gaphyp:${rid}`, kind: 'GapHypothesis', label: `${r.title || rid} · 待核对的知识缺口假设`, sub: '未核对',
      status: 'scaffold', statusReason: '只有入口问题与主题定位，没有任何关于"这位学习者不会什么"的证据；这里只是待核对假设',
      payloadRef: routesRel, sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}]` }],
      meta: { routeId: rid } });
    b.node({ id: `route:${rid}`, kind: 'Route', label: r.title || rid, sub: `${(r.steps || []).length} 步 · 策展人 ${r.curator || '未标'}`,
      status: 'ready', payloadRef: routesRel,
      sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}]` }],
      meta: { routeId: rid, title: r.title || '', curator: r.curator || '', curatorNote: r.curatorNote || '', stepCount: (r.steps || []).length },
      runnable: { kind: 'route', ref: `route:${rid}`, entry: `#route=${rid}` } });

    b.edge({ kind: 'curriculum', relation: 'raised-by', from: `problem:${rid}`, to: `goal:${rid}`, label: '形成目标', reviewState: 'curated', sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}]` }] });
    b.edge({ kind: 'curriculum', relation: 'hypothesis-for', from: `goal:${rid}`, to: `gaphyp:${rid}`, label: '提出缺口假设', reviewState: 'curated', sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}]` }] });
    b.edge({ kind: 'curriculum', relation: 'selected-for', from: `gaphyp:${rid}`, to: `route:${rid}`, label: '匹配已有路线', reviewState: 'curated', sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}]` }] });
    // 目标 → 路线：真边，视图不用再靠同名兜底
    b.edge({ kind: 'curriculum', relation: 'has-goal', from: `route:${rid}`, to: `goal:${rid}`, label: '这条路线为哪个目标', reviewState: 'curated', sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].target` }] });

    for (const s of r.steps || []) {
      routeStats.steps++;
      const sid = `routestep:${rid}:${s.order}`;
      const cn = b.nodes.get(`concept:${s.conceptId}`);
      const cnName = (cn && cn.label) || s.conceptId;
      b.node({ id: sid, kind: 'RouteStep', label: `第 ${s.order} 步 · ${cnName}`, sub: r.title || rid,
        status: 'ready', payloadRef: routesRel,
        sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].steps[order=${s.order}]` }],
        meta: { routeId: rid, order: s.order, conceptId: s.conceptId, title: cnName, why: s.why || '', type: s.type || 'main',
          prereq: s.prereq || null, fallback: s.fallback || null } });
      b.edge({ kind: 'curriculum', relation: 'has-step', from: `route:${rid}`, to: sid, label: `第 ${s.order} 步`, reviewState: 'curated', sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].steps[order=${s.order}]` }] });
      b.edge({ kind: 'curriculum', relation: 'targets-concept', from: sid, to: `concept:${s.conceptId}`, label: '这一步学哪个概念', reviewState: 'curated', sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].steps[order=${s.order}].conceptId` }] });
      // 顺序是人工策展，不是从图谱自动推出来的（任务书 §3.2）
      if (s.prereq && s.prereq.conceptId) {
        b.edge({ kind: 'knowledge', relation: 'route-prerequisite', from: `concept:${s.prereq.conceptId}`, to: `concept:${s.conceptId}`,
          label: `路线前置（依据：${s.prereq.basis || '未标'}）`, reviewState: s.prereq.basis === 'graph' ? 'sourced' : 'curated',
          sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].steps[order=${s.order}].prereq` }] });
      }
    }

    // 分支：策展人给的选项，不是模型临时规划
    for (const br of r.branches || []) {
      for (const o of br.options || []) {
        b.edge({ kind: 'curriculum', relation: o.role === 'branch' ? 'branch-option' : 'main-option',
          from: `routestep:${rid}:${(r.steps.find((s) => s.conceptId === br.after) || {}).order || 0}`, to: `concept:${o.conceptId}`,
          label: `${br.question || '分支'} → ${o.reason || ''}`.trim(), reviewState: 'curated',
          sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].branches` }] });
      }
    }
  }

  // ── 六章：每章一个 Unit，共用上面同一套活动生成器 ──
  const byOrder = [...chapters].sort((a, c) => a.order - c.order);
  for (const ch of byOrder) {
    const uid = `unit:chapter-${ch.chapterId}`;
    const a = authored[ch.chapterId] || {};
    const qs = ch.questions || [];
    const fxC = (ch.feynman && ch.feynman.checks) || [];
    routeStats.units++;
    b.node({
      id: uid, kind: 'Unit', label: ch.title, sub: `第 ${ch.order} 章 · ${ch.routeTitle}`,
      status: (ch.review && ch.review.status) || 'scaffold',
      statusReason: (ch.review && ch.review.statusNote) || '',
      version: ch.review && ch.review.confirmedAt ? `case-confirmed-${ch.review.confirmedAt}` : '',
      payloadRef: chaptersRel,
      sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}]` }, { path: authoredRel, locator: `chapters.${ch.chapterId}` }],
      meta: { unitId: ch.chapterId, title: ch.title, routeId: ch.routeId, order: ch.order, why: ch.why || '',
        questionCount: qs.length, criterionCount: fxC.length, caseType: (ch.case && ch.case.type) || '',
        caseState: (ch.review && ch.review.caseState) || '' },
      runnable: { kind: 'unit', ref: uid, entry: `#learn=${ch.chapterId}` },
    });
    b.entry({ id: uid, label: `${ch.order}. ${ch.title}`, kind: 'unit', entry: `#learn=${ch.chapterId}`, status: (ch.review && ch.review.status) || 'scaffold' });
    b.edge({ kind: 'curriculum', relation: 'has-unit', from: `routestep:${ch.routeId}:${ch.routeStep}`, to: uid, label: `第 ${ch.order} 章`, reviewState: 'curated', sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}]` }] });

    // 单元 → 概念（公共概念只保留一个稳定身份，路线位置与单元各自引用它）
    if (ch.cm && ch.cm.id) {
      b.edge({ kind: 'curriculum', relation: 'teaches-concept', from: uid, to: `concept:${ch.cm.id}`, label: '围绕哪个概念', reviewState: 'curated', sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}].cm` }] });
    }
    // 单元 → 五类语义
    for (const [slot, val] of [['qst', ch.qst], ['case', ch.case], ['solution', ch.solution]]) {
      if (val && val.id) {
        b.edge({ kind: 'curriculum', relation: `uses-${slot}`, from: uid, to: `semunit:${val.id}`, label: slot.toUpperCase(), reviewState: 'sourced', sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}].${slot}` }] });
      }
    }
    for (const o of ch.opinions || []) if (o && o.id) {
      b.edge({ kind: 'curriculum', relation: 'uses-opi', from: uid, to: `semunit:${o.id}`, label: 'OPI', reviewState: 'sourced', sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}].opinions` }] });
    }
    if (ch.concept && ch.concept.id && ch.concept.id !== (ch.cm && ch.cm.id)) {
      b.edge({ kind: 'curriculum', relation: 'uses-concept-unit', from: uid, to: `semunit:${ch.concept.id}`, label: 'CON', reviewState: 'sourced', sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}].concept` }] });
    }
    // 阅读材料的每一层都留出处：每一层建一个逐字原文片段节点，并接回它改写自哪个语义单元
    const rd = ch.reading || {};
    // 正文流的过渡句与关系句：每句都带一处**逐字原文**，所以出处落到具体的阅读梯度段落上。
    // quoteFrom 用的是阅读梯度的短名（definition 对应 reading.explain，其余同名），不是语义单元 ID。
    const LADDER = { original: 'original', definition: 'explain', explain: 'explain', intuition: 'intuition', mechanism: 'mechanism', boundary: 'boundary' };
    for (const [key, blk] of Object.entries(rd)) {
      if (!blk || typeof blk !== 'object') continue;
      const text = blk.text || (Array.isArray(blk.items) ? blk.items.join('\n') : '');
      if (!text) continue;
      const sid = `span:${ch.chapterId}:${key}`;
      b.node({
        id: sid, kind: 'SourceSpan', label: `${ch.title} · ${blk.label || key}`, sub: '逐字原文片段',
        status: 'ready', payloadRef: chaptersRel,
        sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}].reading.${key}` }],
        meta: { text, label: blk.label || key, docType: 'reading-ladder' },
      });
      b.edge({ kind: 'provenance', relation: 'quotes', from: uid, to: sid, label: `阅读梯度·${blk.label || key}`, reviewState: 'sourced', sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}].reading.${key}` }] });
      // 这一层解释是从哪个语义单元改写的
      if (blk.from) b.edge({ kind: 'provenance', relation: 'reading-from', from: sid, to: `semunit:${blk.from}`, label: '改写自', reviewState: 'sourced', sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}].reading.${key}.from` }] });
    }
    for (const [i, br] of ((ch.narrative && ch.narrative.bridges) || []).entries()) {
      const ref = { path: authoredRel, locator: `chapters.${ch.chapterId}.narrative.bridges[${i}]` };
      if (br.fromUnit) b.edge({ kind: 'provenance', relation: 'narrative-bridge', from: uid, to: `semunit:${br.fromUnit}`, label: `过渡句 ${i + 1} 从哪个单元接过来`, reviewState: 'authored', sourceRefs: [ref] });
      const sp = `span:${ch.chapterId}:${LADDER[br.quoteFrom] || br.quoteFrom}`;
      if (b.nodes.has(sp)) b.edge({ kind: 'provenance', relation: 'narrative-bridge-quote', from: uid, to: sp, label: `过渡句 ${i + 1} 的逐字原文`, reviewState: 'authored', sourceRefs: [ref] });
    }
    for (const [i, lk] of ((ch.narrative && ch.narrative.links) || []).entries()) {
      const ref = { path: authoredRel, locator: `chapters.${ch.chapterId}.narrative.links[${i}]` };
      const sp = `span:${ch.chapterId}:${LADDER[lk.quoteFrom] || lk.quoteFrom}`;
      if (b.nodes.has(sp)) b.edge({ kind: 'provenance', relation: 'narrative-link-quote', from: uid, to: sp, label: `关系句 ${i + 1}（${(lk.pair || []).join(' ↔ ')}）的逐字原文`, reviewState: 'authored', sourceRefs: [ref] });
    }

    // 判据（章末费曼的 checks）
    const critIds = [];
    for (const [i, c] of fxC.entries()) {
      const cid = `criterion:${c.id}`;
      critIds.push(cid); routeStats.criteria++;
      b.node({
        id: cid, kind: 'Criterion', label: c.point || c.id, sub: `第 ${ch.order} 章 · 章末判据 ${i + 1}`,
        status: 'ready', payloadRef: authoredRel,
        sourceRefs: [{ path: authoredRel, locator: `chapters.${ch.chapterId}.feynman.checks[${i}]` }],
        meta: { criterion: c.condition || '', condition: c.condition || '', misconception: c.misconception || '',
          point: c.point || '', unitId: ch.chapterId, kind: 'summative' },
      });
      b.edge({ kind: 'curriculum', relation: 'targets', from: uid, to: cid, label: '本章判据', reviewState: 'authored', sourceRefs: [{ path: authoredRel, locator: `chapters.${ch.chapterId}.feynman.checks[${i}]` }] });
      // 补讲材料：六章没有像单篇那样逐条指定段落，绑的是**整章阅读梯度**，这个差别照实标出来
      for (const key of Object.keys(rd)) {
        const spy = `span:${ch.chapterId}:${key}`;
        if (!b.nodes.has(spy)) continue;
        b.edge({ kind: 'curriculum', relation: 'taught-by', from: cid, to: spy, label: `补讲用哪段材料（本章·${(rd[key] || {}).label || key}）`,
          reviewState: 'sourced', sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}].reading.${key}` }] });
      }
      b.gap({ kind: 'pending', layer: 'curriculum', label: `${ch.title} 章判据：补讲材料只绑到整章阅读梯度`, why: '单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落',
        where: `${authoredRel}#chapters.${ch.chapterId}.feynman.checks`, affects: [cid] });
    }

    // 活动 + transition 边
    const acts = makeActivities(b, uid, {
      title: ch.title, sub: `第 ${ch.order} 章 · ${ch.routeTitle}`, decisions: qs.length,
      readingRef: chaptersRel, payloadRef: chaptersRel, experiments: 0,
      experimentNote: '六章材料里没有实验环节（真五维的 experiments 只在内参单篇）；节点保留并标未启用，不卡住既有学习流程',
    });
    wireUnit(b, uid, acts, {});
    routeStats.activities += 1 + 1 + 1 + acts.decisions.length * 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1;
    // 活动 → 判据：每道题与章末验收各自关联哪些理解（不把全章细节变成每道题的门槛）
    for (const [i, q] of qs.entries()) {
      const target = critIds[i] || critIds[critIds.length - 1];
      if (q && q.judgment) {
        b.update(`activity:${uid}:decision:${i + 1}`, {
          sub: q.judgment,
          label: `${ch.title} · 决策 ${i + 1}`,
          payloadRef: authoredRel,
          sourceRefs: [{ path: authoredRel, locator: `chapters.${ch.chapterId}.questions[${i}]` }],
          meta: { judgment: q.judgment, prompt: q.prompt || '', optionCount: (q.options || []).length,
            correctIndex: (q.options || []).findIndex((o) => o.correct) },
        });
      }
      if (target) b.edge({ kind: 'curriculum', relation: 'checks', from: `activity:${uid}:decision:${i + 1}`, to: target, label: '这道题对着哪项理解', reviewState: 'authored', sourceRefs: [{ path: authoredRel, locator: `chapters.${ch.chapterId}.questions[${i}]` }] });
      // 题目 → 主案例与依据
      if (ch.case && ch.case.id) b.update(`semunit:${ch.case.id}`, { meta: { caseType: ch.case.type || '' } });
      if (ch.case && ch.case.id) b.edge({ kind: 'curriculum', relation: 'uses-case', from: `activity:${uid}:decision:${i + 1}`, to: `semunit:${ch.case.id}`, label: `主案例（${ch.case.type || '未标类型'}）`, reviewState: 'owner-confirmed', sourceRefs: [{ path: chaptersRel, locator: `chapters[chapterId=${ch.chapterId}].case` }] });
      for (const o of (q.options || [])) for (const bs of (o.basis || [])) {
        const [sym] = String(bs).split('#');
        b.edge({ kind: 'provenance', relation: 'answer-basis', from: `activity:${uid}:decision:${i + 1}`, to: `semunit:${sym}`, label: '作答依据', reviewState: 'authored', sourceRefs: [{ path: authoredRel, locator: `chapters.${ch.chapterId}.questions[${i}].options` }] });
      }
    }
    for (const cid of critIds) {
      b.edge({ kind: 'curriculum', relation: 'assessed-by', from: acts.summative, to: cid, label: '章末验收核对', reviewState: 'authored', sourceRefs: [{ path: authoredRel, locator: `chapters.${ch.chapterId}.feynman.checks` }] });
    }
    b.edge({ kind: 'curriculum', relation: 'assessed-by', from: acts.formative, to: critIds[0] || uid, label: '阅读中费曼只核对当前一处', reviewState: 'authored', sourceRefs: [{ path: authoredRel, locator: `chapters.${ch.chapterId}.feynman.checks[0]` }] });

    // 章内缺口假设：主案例只有 1 个候选（真实缺口，来自 chapters.json 的 gaps）
    for (const [i, g] of ((b.json(chaptersRel).gaps) || []).entries()) {
      if (i < 3) b.gap({ kind: 'pending', layer: 'curriculum', label: `${ch.title} 章：材料侧已知问题`, why: g, where: `${chaptersRel}#gaps[${i}]`, affects: [uid] });
    }
  }

  // 六章 → 路线收尾：回原问题 → 用户决定 → 保存记录
  const firstRoute = (routes.routes || [])[0];
  if (firstRoute) {
    const rid = firstRoute.routeId;
    const lastUnit = `unit:chapter-${byOrder[byOrder.length - 1].chapterId}`;
    b.node({ id: `activity:${rid}:original`, kind: 'ApplicationReview', label: '回看原问题和仍未知的部分', sub: rid, status: 'ready', payloadRef: routesRel,
      sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].entryQuestion` }], meta: { role: 'original' },
      runnable: { kind: 'activity', ref: `activity:${rid}:original`, entry: '' } });
    b.node({ id: `activity:${rid}:choice`, kind: 'ApplicationReview', label: '用户决定下一行动', sub: rid, status: 'ready', payloadRef: routesRel,
      sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}]` }], meta: { role: 'choice', options: ['继续补知识', '换方案', '暂停'] } });
    b.node({ id: `activity:${rid}:record`, kind: 'ApplicationReview', label: '保存学习与决策记录', sub: rid, status: 'ready', payloadRef: routesRel,
      sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}]` }], meta: { role: 'record' } });
    // 章末通过后接下一个单元的阅读；最后一章接回原问题
    byOrder.forEach((ch, i) => {
      const adv = `activity:unit:chapter-${ch.chapterId}:advance`;
      const next = byOrder[i + 1];
      if (next) {
        b.edge({ kind: 'transition', from: adv, to: `activity:unit:chapter-${next.chapterId}:reading`, event: 'advanced', guard: 'hasNextUnit', effect: 'markUnitAdvance', label: '还有下一单元', reviewState: 'curated', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§5.1' }] });
      } else {
        b.edge({ kind: 'transition', from: adv, to: `activity:${rid}:original`, event: 'advanced', guard: 'routeComplete', effect: 'appendRecord', label: '本次路线完成', reviewState: 'curated', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§5.1' }] });
      }
    });
    b.edge({ kind: 'transition', from: `activity:${rid}:original`, to: `activity:${rid}:choice`, event: 'originalReviewed', guard: 'always', effect: 'appendRecord', label: '记录依据与仍未知', reviewState: 'curated', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§5.1' }] });
    b.edge({ kind: 'transition', from: `activity:${rid}:choice`, to: `activity:${rid}:record`, event: 'choose', guard: 'chooseContinue', effect: 'appendRecord', label: '继续 / 换方案 / 暂停', reviewState: 'curated', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§5.1' }] });
    b.edge({ kind: 'transition', from: `activity:${rid}:choice`, to: `gaphyp:${rid}`, event: 'choose', guard: 'chooseLearnMore', effect: 'appendRecord', label: '选择继续补知识', reviewState: 'curated', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§5.1' }] });
    // 原问题一直挂着，路线收尾时回看（不是重新问一遍）
    b.edge({ kind: 'curriculum', relation: 'returns-to', from: `activity:${rid}:original`, to: `problem:${rid}`, label: '回到最初的问题', reviewState: 'curated', sourceRefs: [{ path: routesRel, locator: `routes[routeId=${rid}].entryQuestion` }] });
    out.routeTail = { routeId: rid, lastUnit };
  }

  // ── 单篇：agent-skills-api 的全部四判据（不再只做 C2/C3）──
  if (b.exists(fttmRel)) {
    b.src(fttmRel, '单篇费曼教学映射（C1–C4）');
    const m = b.json(fttmRel);
    const uid = 'unit:agent-skills-api';
    routeStats.units++;
    b.node({
      id: uid, kind: 'Unit', label: 'Agent Skills 渐进式披露（单篇）', sub: '内参单篇 · 4 条判据全接入',
      status: 'ready', version: m.criteriaVersion || '',
      payloadRef: fttmRel,
      sourceRefs: [{ path: fttmRel, locator: 'unit' }, { path: m.unit && m.unit.sourceFile ? m.unit.sourceFile : fttmRel, locator: 'concepts/reading/decisions/experiments/feynman' }],
      meta: { unitId: 'agent-skills-api', title: 'Agent Skills 渐进式披露', routeId: '', order: 0,
        questionCount: 3, criterionCount: (m.criteria || []).length, caseType: '内参文章·真五维' },
      runnable: { kind: 'unit', ref: uid, entry: '#neican=agent-skills-api' },
    });
    b.entry({ id: uid, label: '单篇 · Agent Skills 渐进式披露', kind: 'unit', entry: '#neican=agent-skills-api', status: 'ready' });
    if (m.unit && m.unit.sourceFile) {
      const five = b.json(m.unit.sourceFile);
      const fid = 'fivedim:260912:agent-skills-api';
      if (!b.nodes.has(fid)) {
        b.node({ id: fid, kind: 'FiveDimAsset', label: 'Agent Skills 渐进式披露 · 真五维', sub: '内参-260912 · agent-skills-api', status: 'ready',
          payloadRef: m.unit.sourceFile, sourceRefs: [{ path: m.unit.sourceFile, locator: 'concepts/reading/decisions/experiments/feynman' }],
          meta: { slug: 'agent-skills-api', issue: '内参-260912', hasConcepts: (five.concepts || []).length, hasReading: Object.keys(five.reading || {}).length,
            hasDecisions: (five.decisions || []).length, hasExperiments: (five.experiments || []).length, hasFeynman: Object.keys(five.feynman || {}).length } });
      }
      b.edge({ kind: 'curriculum', relation: 'compiled-from', from: uid, to: fid, label: '材料来源', reviewState: 'sourced', sourceRefs: [{ path: fttmRel, locator: 'unit.sourceFile' }] });
      const srcId = 'source:neican-260912:agent-skills-api';
      if (b.nodes.has(srcId)) b.edge({ kind: 'provenance', relation: 'derived-from', from: fid, to: srcId, label: '拆解自', reviewState: 'sourced', sourceRefs: [{ path: m.unit.sourceFile, locator: '顶层' }] });
    }
    for (const [i, c] of (m.criteria || []).entries()) {
      const cid = `criterion:${c.id}`; routeStats.criteria++;
      b.node({
        id: cid, kind: 'Criterion', label: c.criterion, sub: `单篇 · 判据 ${c.id}`,
        status: 'ready', payloadRef: fttmRel,
        sourceRefs: [{ path: fttmRel, locator: `criteria[${i}]` }],
        meta: { criterion: c.criterion, condition: c.condition || '', misconception: c.misconception || '',
          teachingAction: c.teachingAction || '', keywords: c.keywords || [], materialCount: (c.material || []).length, unitId: 'agent-skills-api', kind: 'both' },
      });
      b.edge({ kind: 'curriculum', relation: 'targets', from: uid, to: cid, label: '单篇判据', reviewState: 'authored', sourceRefs: [{ path: fttmRel, locator: `criteria[${i}]` }] });
      // 判据 → 补讲材料（出处逐条留痕 + 当时读的那份文件 sha256）
      for (const [j, mt] of (c.material || []).entries()) {
        const sref = { path: mt.sourceFile || fttmRel, locator: `${mt.ref || ''}${mt.sourceSha256 ? ` @sha256:${String(mt.sourceSha256).slice(0, 12)}` : ''}` };
        const bnode = `material:${c.id}:${j}`;
        b.node({ id: bnode, kind: 'SourceSpan', label: mt.label || mt.kind || `材料 ${j + 1}`, sub: `补讲材料 · ${mt.kind || ''}`,
          status: 'ready', payloadRef: mt.sourceFile || fttmRel, sourceRefs: [sref],
          meta: { text: mt.quote || '', label: mt.label || '', kind: mt.kind || '', ref: mt.ref || '' } });
        b.edge({ kind: 'curriculum', relation: 'taught-by', from: cid, to: bnode, label: '补讲用哪段材料', reviewState: 'authored', sourceRefs: [sref] });
      }
    }
    const acts = makeActivities(b, uid, {
      title: 'Agent Skills 渐进式披露', sub: '内参单篇', decisions: 3, readingRef: m.unit ? m.unit.sourceFile : fttmRel,
      payloadRef: m.unit ? m.unit.sourceFile : fttmRel,
      experiments: (() => { try { return (b.json(m.unit.sourceFile).experiments || []).length; } catch { return 0; } })(),
    });
    wireUnit(b, uid, acts, {});
    // 单篇自己的收尾：没有用户个人问题，就用"这次要搞懂的那个问题"收尾，不编造用户背景（任务书 §5.5）
    wireTail(b, uid, { title: '单篇收尾', problem: '（单篇没有用户个人问题，用本次要搞懂的问题收尾）', sourceRel: fttmRel, status: 'scaffold',
      statusReason: '单篇没有已确认的路线目标与用户问题，收尾只呈现"这次要搞懂什么、现在有哪些依据、还不确定什么"' });
    routeStats.activities += 12;
    // 单篇的题目情境：五维 decisions[].situation 是逐字原文，建片段节点当主案例情境（不是 CAS 语义单元，照实标）
    const five = (() => { try { return b.json(m.unit.sourceFile); } catch { return null; } })();
    const critIds = (m.criteria || []).map((c) => `criterion:${c.id}`);
    for (const [i, d] of ((five && five.decisions) || []).entries()) {
      const sid = `span:agent-skills-api:decision:${i + 1}`;
      b.node({ id: sid, kind: 'SourceSpan', label: `单篇 · 决策 ${i + 1} 情境`, sub: '逐字原文片段 · 情境',
        status: 'ready', payloadRef: m.unit.sourceFile, sourceRefs: [{ path: m.unit.sourceFile, locator: `decisions[${i}].situation` }],
        meta: { text: d.situation || '', label: '情境', docType: 'decision-situation', caseType: '逐字原文情境（不是 CAS 语义单元，也不是真实复盘）' } });
      b.edge({ kind: 'curriculum', relation: 'uses-case', from: `activity:${uid}:decision:${i + 1}`, to: sid,
        label: '作答情境（逐字原文，不是 CAS 语义单元）', reviewState: 'sourced', sourceRefs: [{ path: m.unit.sourceFile, locator: `decisions[${i}].situation` }] });
      for (const key of ['choice', 'condition']) {
        if (!d[key]) continue;
        b.edge({ kind: 'provenance', relation: 'answer-basis', from: `activity:${uid}:decision:${i + 1}`, to: sid,
          label: `作答依据·${key}`, reviewState: 'sourced', sourceRefs: [{ path: m.unit.sourceFile, locator: `decisions[${i}].${key}` }] });
      }
    }
    for (const i of [0, 1, 2]) {
      const c = critIds[i];
      if (c) b.edge({ kind: 'curriculum', relation: 'checks', from: `activity:${uid}:decision:${i + 1}`, to: c, label: '这道题对着哪项理解', reviewState: 'authored', sourceRefs: [{ path: fttmRel, locator: `criteria[${i}]` }] });
    }
    for (const c of critIds) b.edge({ kind: 'curriculum', relation: 'assessed-by', from: acts.summative, to: c, label: '章末验收核对（本章四条全查）', reviewState: 'authored', sourceRefs: [{ path: fttmRel, locator: 'criteria' }] });
    b.edge({ kind: 'curriculum', relation: 'assessed-by', from: acts.formative, to: critIds[0], label: '阅读中费曼只核对当前一处', reviewState: 'authored', sourceRefs: [{ path: fttmRel, locator: 'criteria[0]' }] });
    // 单篇没有已确认的正式章末门 → 明确标待装配，不借用六章的通过标准
    b.gap({ kind: 'pending', layer: 'curriculum', label: '单篇的正式章末通过与解锁门待装配',
      why: '单篇材料有 4 条判据与章末费曼，但没有像六章那样已确认的「正式通过标准 / 解锁规则」；本轮照实标待装配，不借用六章的门',
      where: `${fttmRel}#criteria`, affects: [uid, acts.summative] });
    out.single = { unit: uid, criteria: (m.criteria || []).length, criteriaVersion: m.criteriaVersion };
  } else {
    b.warn(`单篇费曼映射不在：${fttmRel}`);
  }

  out.course = routeStats;
}

// ── 5b. 批量装配的学习单元：76 个 CON，走**同一份** makeActivities / wireUnit / wireTail ──
// 施工单：docs/批量装配学习单元-施工单-20260914.md。
// 材料与出处逐字来自 evidence/batch-units-260914/units.json（该文件由确定性脚本装配并自校验）。
// 决策题：**复核驱动**。evidence/batch-units-260914/units.json 里 decisions 非空（= 该单元已通过
// scripts/review-gen-decisions.mjs 的独立复核）才建 Decision / DecisionReview 节点；空数组照实不建，
// 缺口照写，不编假题占位。
function adaptBatchUnits(b, out) {
  const rel = 'evidence/batch-units-260914/units.json';
  if (!b.exists(rel)) { b.warn(`批量单元材料不在：${rel}（先跑 node scripts/build-batch-units.mjs）`); return; }
  b.src(rel, '76 个批量装配单元（逐字材料 + 出处 + 缺口）');
  const data = b.json(rel);
  const list = data.units || [];
  const stats = { units: 0, ready: 0, scaffold: 0, criteria: 0, activities: 0, materials: 0, decisionUnits: 0, decisionQuestions: 0 };
  const unitIds = [], critIds = [];

  for (const bu of list) {
    const uid = `unit:${bu.unitId}`;
    const slug = bu.card.slug;
    const title = (bu.concepts && bu.concepts[0] && bu.concepts[0].title && bu.concepts[0].title.text) || bu.unitId;
    const cardPath = bu.card.file;
    b.src(cardPath, '图鉴卡（只读，逐字材料来源）');
    const unitRef = { path: rel, locator: `units[unitId=${bu.unitId}]` };
    const checks = (bu.feynman && bu.feynman.checks) || [];

    stats.units++;
    unitIds.push(uid);
    if (bu.status === 'ready') stats.ready++; else stats.scaffold++;

    b.node({
      id: uid, kind: 'Unit', label: title, sub: `批量单元 · 图鉴卡 ${slug}`,
      status: bu.status, statusReason: bu.statusReason || '',
      payloadRef: rel,
      sourceRefs: [unitRef, { path: cardPath, locator: `remember / feynman / source_context / boundaries[0..${Math.max(checks.length - 1, 0)}] / how_to` }],
      meta: { unitId: uid, title, routeId: '', order: 0, questionCount: (bu.decisions || []).length, criterionCount: checks.length,
        caseType: bu.case.caseType, cardSlug: slug, decisionGap: (bu.decisions || []).length === 0 },
      runnable: null,   // 页面入口还没装配：给空按钮等于骗人，宁可不给（已登记缺口）
    });

    // 单元 → 五类语义（CON 是核心概念；QST / CAS / SOL / OPI 是反向关系单元）
    b.edge({ kind: 'curriculum', relation: 'uses-concept-unit', from: uid, to: `semunit:${bu.conceptId}`, label: 'CON',
      reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[unitId=${bu.unitId}].concepts[0]` }] });
    b.edge({ kind: 'provenance', relation: 'compiled-from', from: uid, to: `card:${slug}`, label: '阅读梯度来自这张图鉴卡',
      reviewState: 'sourced', sourceRefs: [unitRef] });
    for (const [slot, sm] of [['qst', bu.qst], ['case', bu.case], ['solution', bu.solution]]) {
      if (!sm || !sm.id) continue;
      b.edge({ kind: 'curriculum', relation: `uses-${slot}`, from: uid, to: `semunit:${sm.id}`, label: slot.toUpperCase(),
        reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[unitId=${bu.unitId}].${slot}` }] });
    }
    for (const o of bu.opinions || []) {
      b.edge({ kind: 'curriculum', relation: 'uses-opi', from: uid, to: `semunit:${o.id}`, label: 'OPI',
        reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[unitId=${bu.unitId}].opinions` }] });
    }
    // 主案例照实标类型（全部是「假设场景」）：贴到 CAS 语义单元节点上，视图直接读得到
    if (bu.case && bu.case.id) {
      b.update(`semunit:${bu.case.id}`, { meta: { caseType: bu.case.caseType } });
      b.edge({ kind: 'provenance', relation: 'case-honesty', from: uid, to: `semunit:${bu.case.id}`,
        label: `主案例类型：${bu.case.caseType}（不是真实复盘）`, reviewState: 'sourced',
        sourceRefs: [{ path: rel, locator: `units[unitId=${bu.unitId}].case.caseHonesty` }] });
    }

    // 阅读梯度：每一层一个逐字原文片段节点，出处带卡片路径 + 该卡的 sha256
    const LADDER = ['original', 'explain', 'intuition', 'mechanism', 'boundary'];
    for (const key of LADDER) {
      const blk = bu.reading[key];
      if (!blk) continue;
      const items = Array.isArray(blk.items) ? blk.items : null;
      const text = blk.text || (items ? items.map((x) => x.text).join('\n') : blk.text) || '';
      if (!text) continue;
      const locator = items ? items.map((x) => x.locator).join(' + ') : blk.locator;
      const sha = ((items && items[0]) || blk).sourceSha256 || '';
      const sid = `span:batch-${slug}:${key}`;
      b.node({
        id: sid, kind: 'SourceSpan', label: `${title} · ${blk.label || key}`, sub: '逐字原文片段 · 图鉴卡',
        status: 'ready', payloadRef: rel,
        sourceRefs: [{ path: cardPath, locator: `${locator}${sha ? ` @sha256:${String(sha).slice(0, 12)}` : ''}` }],
        meta: { text, label: blk.label || key, docType: 'reading-ladder', cardSlug: slug },
      });
      b.edge({ kind: 'provenance', relation: 'quotes', from: uid, to: sid, label: `阅读梯度·${blk.label || key}`,
        reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[unitId=${bu.unitId}].reading.${key}` }] });
      b.edge({ kind: 'provenance', relation: 'reading-from', from: sid, to: `card:${slug}`, label: '逐字来自这张卡',
        reviewState: 'sourced', sourceRefs: [{ path: cardPath, locator }] });
      stats.materials++;
    }

    // 判据（卡片 boundaries 一条一条当判据）+ 补讲材料（这条判据自己的那段边界原文，比六章精确）
    const myCritIds = [];
    for (const [i, c] of checks.entries()) {
      const cid = `criterion:${c.id}`;
      myCritIds.push(cid); critIds.push(cid); stats.criteria++;
      b.node({
        id: cid, kind: 'Criterion', label: c.point, sub: `批量单元 · 判据 ${i + 1}（卡片 boundaries[${i}]）`,
        status: 'ready', payloadRef: rel,
        sourceRefs: [{ path: cardPath, locator: `${c.locator} @sha256:${String(c.sourceSha256).slice(0, 12)}` }],
        meta: { criterion: c.condition, condition: c.condition, misconception: c.misconception,
          misconceptionSource: c.misconceptionSource, derivation: c.derivation, point: c.point,
          unitId: uid, kind: 'summative' },
      });
      b.edge({ kind: 'curriculum', relation: 'targets', from: uid, to: cid, label: '本单元判据',
        reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[unitId=${bu.unitId}].feynman.checks[${i}]` }] });
      const mid = `material:batch-${slug}:B${i + 1}`;
      b.node({
        id: mid, kind: 'SourceSpan', label: `${title} · 边界 ${i + 1}`, sub: '补讲材料 · 逐字原文',
        status: 'ready', payloadRef: rel,
        sourceRefs: [{ path: cardPath, locator: `${c.locator} @sha256:${String(c.sourceSha256).slice(0, 12)}` }],
        meta: { text: c.condition, label: `边界 ${i + 1}`, kind: 'boundary', ref: `boundaries[${i}]`, cardSlug: slug },
      });
      for (const [to, note] of [[mid, `这条判据自己那段原文（${c.locator}）`], [`span:batch-${slug}:explain`, '定义段'], [`span:batch-${slug}:mechanism`, '动作路径段']]) {
        if (!b.nodes.has(to)) continue;
        b.edge({ kind: 'curriculum', relation: 'taught-by', from: cid, to, label: `补讲用哪段材料（${note}）`,
          reviewState: 'sourced', sourceRefs: [{ path: cardPath, locator: c.locator }] });
      }
    }

    // 活动 + transition 边：和六章、单篇、夹具共用同一套生成器
    const myDecisions = bu.decisions || [];
    const decRel = 'evidence/gen-decisions-hybrid-v3-20260914.json';
    const revRel = 'evidence/review-decisions-260914/review.json';
    if (myDecisions.length) b.src(decRel, '决策题（确定性生成 v3 · 经独立复核 verdict=usable）');
    const acts = makeActivities(b, uid, {
      title, sub: `批量单元 · ${slug}`, decisions: myDecisions.length,
      decisionRefs: myDecisions.length ? [{ path: decRel, locator: `units[unitId=${bu.unitId}].questions` },
        { path: revRel, locator: `units[unitId=${bu.unitId}]` }] : null,
      decisionMeta: (i) => ({
        questionId: (myDecisions[i] || {}).id || '', prompt: ((myDecisions[i] || {}).prompt || '').slice(0, 120),
        optionCount: 1 + (((myDecisions[i] || {}).distractors || []).length || 0),
        reviewVerdict: myDecisions.length ? 'usable' : 'unreviewed',
      }),
      readingRef: rel, payloadRef: rel, experiments: 0,
      experimentNote: '本单元材料里没有实验环节（真五维的 experiments 只在内参单篇）；节点保留并标未启用，不卡住本单元的学习流程',
      sourceRefs: [unitRef],
    });
    wireUnit(b, uid, acts, {});
    stats.activities += 10 + myDecisions.length * 2;   // 活动骨架 10 + 每题 Decision/DecisionReview 各一
    if (myDecisions.length) { stats.decisionUnits++; stats.decisionQuestions += myDecisions.length; }
    for (const cid of myCritIds) {
      b.edge({ kind: 'curriculum', relation: 'assessed-by', from: acts.summative, to: cid, label: '章末独立验收核对',
        reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[unitId=${bu.unitId}].feynman.checks` }] });
    }
    if (checks.length) {
      b.edge({ kind: 'curriculum', relation: 'assessed-by', from: acts.formative, to: `criterion:${checks[0].id}`,
        label: '阅读中费曼只核对当前一处', reviewState: 'sourced', sourceRefs: [{ path: rel, locator: `units[unitId=${bu.unitId}].feynman.checks[0]` }] });
    }
    // 收尾段：这一轮没有用户个人问题，就用"这个单元要搞懂什么、还缺什么"收尾，不编用户背景
    wireTail(b, uid, {
      title, problem: '（批量单元没有用户个人问题，用这个单元要搞懂的问题收尾）',
      sourceRel: rel, locator: `units[unitId=${bu.unitId}]`,
      status: bu.status, statusReason: bu.statusReason || '',
    });

    // 缺口：照实写，不许为了"看起来完整"补造选项
    if (!myDecisions.length) {
      b.gap({ kind: 'pending', layer: 'curriculum', label: `「${title}」的三道决策题待装配`,
        why: (bu.gaps || [])[0] || '该单元的三道决策题待装配', where: `${rel}#units[unitId=${bu.unitId}].gaps[0]`, affects: [uid] });
    }
    if (bu.status === 'scaffold') {
      b.gap({ kind: 'pending', layer: 'curriculum', label: `「${title}」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上`,
        why: `本单元（${bu.conceptId}）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上`,
        where: `${rel}#units[unitId=${bu.unitId}].statusReason`, affects: [uid] });
    }
  }

  if (stats.units) {
    b.gap({ kind: 'pending', layer: 'curriculum', label: '76 个批量单元没有页面可运行入口',
      why: '这些单元能走同一份 graph-runner（scripts/test-batch-walk.mjs 逐个走通），但壳的学习空间只服务六章与内参单篇；页面入口待装配，本轮不给空按钮',
      where: rel, affects: unitIds });
    b.gap({ kind: 'pending', layer: 'curriculum', label: '批量单元的费曼误解是机械反面转述，未经人工复核',
      why: `misconception 由确定性规则从卡片 boundaries 原文算出（${(data.stats && data.stats.misconceptionRules) ? `否定翻转 ${data.stats.misconceptionRules.negationFlip} 条 / 整条否定 ${data.stats.misconceptionRules.boundaryDenial} 条` : '两条规则'}），不是人工撰写的教学误解；可逐条重算复核，但读起来可能生硬`,
      where: rel, affects: critIds });
  }
  out.batch = stats;
}

// ── 6. 开发夹具：验证运行器复用与共享概念（不是第二条正式课程）────
function adaptFixture(b, out) {
  const fid = 'fixture-shared-concept-v1';
  const shared = ['cm_0608c405', 'cm_0a4ca4ce'];   // Agent / Harness：与正式路线共用同一个公共概念
  if (!shared.every((c) => b.nodes.has(`concept:${c}`))) { b.warn('夹具依赖的公共概念不在图里，跳过夹具'); return; }
  b.node({
    id: `route:${fid}`, kind: 'Route', label: '开发夹具：同一个概念、两条不同目标的路线', sub: '夹具 · 不是正式课程',
    status: 'scaffold', statusReason: '开发夹具：只用于验证「同一份运行器能复用」与「共享概念被多个路线位置引用」，不是已审核路线，页面上必须显著标注',
    sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7 + 任务书 §11' }],
    meta: { routeId: fid, title: '开发夹具路线', curator: 'fixture', stepCount: 2, note: '本库当前只有 1 条已审核路线；按任务书 §11 用明确标注的夹具验证运行器复用，不伪造第二条正式课程' },
    runnable: { kind: 'route', ref: `route:${fid}`, entry: '' },
  });
  b.node({ id: `goal:${fid}`, kind: 'Goal', label: '夹具目标：能写出最小 Agent 配置 / 能说清 Harness 的范围', sub: '夹具目标（与正式路线不同）',
    status: 'scaffold', statusReason: '夹具目标，不是用户真实目标', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }], meta: { routeId: fid } });
  b.edge({ kind: 'curriculum', relation: 'has-goal', from: `route:${fid}`, to: `goal:${fid}`, label: '夹具路线为哪个目标', reviewState: 'unreviewed', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }] });

  const defs = [
    { slug: 'fixture-agent-config', order: 1, concept: 'cm_0608c405', target: '能写出最小 Agent 配置的字段', crit: '说出 name 与 instructions 各自提供什么', fallback: '不知道字段就先读概念卡原文' },
    { slug: 'fixture-harness-scope', order: 2, concept: 'cm_0a4ca4ce', target: '能说清 Harness 包住模型负责什么', crit: '说出 Harness 负责读文件、跑命令、改代码', fallback: '说不清就先回模型与外壳的分工' },
  ];
  for (const d of defs) {
    const sid = `routestep:${fid}:${d.order}`;
    const uid = `unit:${d.slug}`;
    b.node({ id: sid, kind: 'RouteStep', label: `夹具第 ${d.order} 步`, sub: '夹具', status: 'scaffold', statusReason: '夹具步骤',
      sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }],
      meta: { routeId: fid, order: d.order, conceptId: d.concept, title: (b.nodes.get(`concept:${d.concept}`) || {}).label || d.concept, why: '夹具：与正式路线引用同一个公共概念，但目标与判据不同', fallback: { reason: d.fallback } } });
    b.edge({ kind: 'curriculum', relation: 'has-step', from: `route:${fid}`, to: sid, label: `夹具第 ${d.order} 步`, reviewState: 'unreviewed', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }] });
    b.edge({ kind: 'curriculum', relation: 'targets-concept', from: sid, to: `concept:${d.concept}`, label: '与正式路线共享同一个公共概念', reviewState: 'unreviewed', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }] });

    b.node({ id: uid, kind: 'Unit', label: `夹具单元：${d.target}`, sub: '夹具 · 目标与正式路线不同',
      status: 'scaffold', statusReason: '开发夹具单元；共用同一份运行器，但判据与题目与正式路线不同，通过状态不通用',
      sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }],
      meta: { unitId: d.slug, title: `${d.target}（夹具）`, routeId: fid, order: d.order, questionCount: 1, criterionCount: 1 } });
    b.edge({ kind: 'curriculum', relation: 'has-unit', from: sid, to: uid, label: '夹具单元', reviewState: 'unreviewed', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }] });
    b.edge({ kind: 'curriculum', relation: 'teaches-concept', from: uid, to: `concept:${d.concept}`, label: '共享概念', reviewState: 'unreviewed', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }] });

    const cid = `criterion:${d.slug}-F1`;
    b.node({ id: cid, kind: 'Criterion', label: d.crit, sub: '夹具判据（与正式路线不同）', status: 'scaffold', statusReason: '夹具判据',
      sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }],
      meta: { criterion: d.crit, condition: d.crit, misconception: '夹具用，不是从真实材料里抽出来的误解', unitId: d.slug, kind: 'summative' } });
    b.edge({ kind: 'curriculum', relation: 'targets', from: uid, to: cid, label: '夹具判据', reviewState: 'unreviewed', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }] });

    const acts = makeActivities(b, uid, { title: d.target, sub: '夹具', decisions: 1, readingRef: '', experiments: 0,
      experimentNote: '夹具不接实验' });
    wireUnit(b, uid, acts, {});
    b.edge({ kind: 'curriculum', relation: 'assessed-by', from: acts.summative, to: cid, label: '夹具章末核对', reviewState: 'unreviewed', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }] });
  }
  b.edge({ kind: 'transition', from: `activity:unit:fixture-agent-config:advance`, to: `activity:unit:fixture-harness-scope:reading`,
    event: 'advanced', guard: 'hasNextUnit', effect: 'markUnitAdvance', label: '夹具：还有下一单元', reviewState: 'unreviewed', sourceRefs: [{ path: 'docs/总图视图契约-20260914.md', locator: '§7' }] });
  for (const d of defs) b.gap({ kind: 'pending', layer: 'curriculum', label: `夹具题没有主案例与作答依据：${d.slug}`,
    why: '夹具只验证运行器复用与共享概念，没有配案例与依据；正式单元必须有，缺了就得标待装配',
    where: 'docs/总图视图契约-20260914.md#§7', affects: [`activity:unit:${d.slug}:decision:1`] });
  b.gap({ kind: 'pending', layer: 'curriculum', label: '开发夹具不是第二条正式课程',
    why: '本库当前只有 1 条已审核路线（routes.json）。按任务书 §11，用明确标注的夹具验证运行器复用与共享概念，实际目录仍展示真实状态',
    where: 'evidence/paths-260913/routes.json', affects: [`route:${fid}`] });
  out.fixture = { routeId: fid, units: defs.length, sharedConcepts: shared };
}

// ── 7. AI 层：LLM / Skill / 应用各管什么（只登记真实的，不编）────
function adaptAiLayer(b, out) {
  const skillDir = '.agents/skills';
  const skills = b.exists(skillDir) ? fs.readdirSync(b.abs(skillDir)).filter((f) => fs.statSync(b.abs(P(skillDir, f))).isDirectory()) : [];
  b.node({ id: 'policy:project-teaching-rules', kind: 'SkillPolicy', label: '项目教学规则（本仓库）', sub: 'skill',
    status: 'scaffold',
    statusReason: skills.length ? `项目里装的 skill：${skills.join('、')}；但费曼补讲的具体教学 Skill 文件没有接入运行时，走的是 evidence/feynman-teaching-map 里的判据与动作表` : '找不到 .agents/skills，使用项目教学规则，原 Skill 未接入',
    sourceRefs: [{ path: 'scripts/lib/llm.mjs', locator: '调用点' }], meta: { skills } });
  b.node({ id: 'model:llm', kind: 'ModelAdapter', label: 'LLM（解释 / 诊断 / 补讲 / 追问）', sub: 'DeepSeek · /api/llm',
    status: 'ready', sourceRefs: [{ path: 'scripts/lib/llm.mjs', locator: '全文' }, { path: 'scripts/serve-lib.mjs', locator: '/api/llm' }],
    meta: { note: '模型给候选语义判断；通过与否由应用按正式规则决定' } });
  b.node({ id: 'app:runner', kind: 'App', label: '应用（校验状态并沿允许的边执行）', sub: 'graph-runner + 壳',
    status: 'ready', sourceRefs: [{ path: 'scripts/lib/graph-runner.js', locator: '全文' }, { path: 'scripts/serve-lib.mjs', locator: '/api/learn' }],
    meta: { note: '只有 transition 边驱动跳转；正式解锁由应用执行' } });
  b.edge({ kind: 'curriculum', relation: 'constrains', from: 'policy:project-teaching-rules', to: 'model:llm', label: '规定如何引导与补讲', reviewState: 'unreviewed', sourceRefs: [{ path: 'evidence/feynman-teaching-map/agent-skills-api.json', locator: 'criteria[].teachingAction' }] });
  b.edge({ kind: 'curriculum', relation: 'executes', from: 'model:llm', to: 'app:runner', label: '只返回诊断/证据/补讲/追问', reviewState: 'curated', sourceRefs: [{ path: 'scripts/serve-lib.mjs', locator: '/api/learn' }] });
  for (const u of [...b.nodes.values()].filter((n) => n.kind === 'Unit')) {
    b.edge({ kind: 'curriculum', relation: 'given-to-model', from: u.id, to: 'model:llm', label: '只给当前目标与相关材料', reviewState: 'curated', sourceRefs: [{ path: 'scripts/serve-lib.mjs', locator: '/api/learn' }] });
  }
  out.ai = { skills };
}

// ── 主入口 ──────────────────────────────────────────────
export function buildGraph({ root }) {
  const b = new Builder(root);
  const out = {};
  adaptConceptMap(b, out);
  adaptSemanticUnits(b, out);
  adaptSourceChain(b, out);
  adaptNeican(b, out);
  adaptRoutesAndUnits(b, out);
  adaptBatchUnits(b, out);
  adaptFixture(b, out);
  adaptAiLayer(b, out);

  b.verifyIntegrity();

  const nodes = [...b.nodes.values()];
  const edges = [...b.edges.values()];
  const count = (arr, f) => arr.reduce((m, x) => { const k = f(x); m[k] = (m[k] || 0) + 1; return m; }, {});
  const byKind = count(nodes, (n) => n.kind);
  const byLayer = count(nodes, (n) => n.layer);
  const byEdgeKind = count(edges, (e) => e.kind);
  const byStatus = count(nodes, (n) => n.status);
  const byReviewState = count(edges, (e) => e.reviewState);

  // 每个公共/课程节点都要有出处：没有的照实记缺口
  const noSource = nodes.filter((n) => n.layer !== 'runtime' && !n.sourceRefs.length);
  for (const n of noSource) {
    b.gap({ kind: 'pending', layer: n.layer, label: `节点没有出处：${n.label}`, why: '适配器没有为它找到可核对来源', where: n.payloadRef || '(无)', affects: [n.id] });
  }

  const layers = LAYERS.map((l) => ({ id: l.id, label: l.label, order: l.order, kinds: l.kinds,
    count: nodes.filter((n) => n.layer === l.id).length,
    pending: nodes.filter((n) => n.layer === l.id && n.status === 'scaffold').length,
    blocked: nodes.filter((n) => n.layer === l.id && n.status === 'blocked').length }));

  const stats = {
    nodes: nodes.length, edges: edges.length,
    byKind, byLayer, byEdgeKind, byStatus, byReviewState,
    routes: byKind.Route || 0, routeSteps: byKind.RouteStep || 0, units: byKind.Unit || 0,
    activities: nodes.filter((n) => ACTIVITY_KINDS.includes(n.kind)).length,
    criteria: byKind.Criterion || 0,
    transitions: byEdgeKind.transition || 0,
    indexed: nodes.length,
    pendingAssembly: nodes.filter((n) => n.status === 'scaffold').length,
    blocked: nodes.filter((n) => n.status === 'blocked').length,
    gaps: b.gaps.length,
  };

  const coverage = {
    fullIndex: `扫到的目录：knowledge/概念地图-260913（概念/主题/依赖/关系）· 内容结构化系统/模块/ai-concept-base/data/units.json（538 语义单元）· 内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/*.yaml（${out.cards ? out.cards.files : 0} 张卡）· knowledge/内参-*（三产物 + 真五维 + 原文）· evidence/paths-260913/routes.json · evidence/agent-loop-260913（六章）· evidence/feynman-teaching-map（单篇四判据）· evidence/batch-units-260914（76 个批量单元）。全量可读资产都建了节点，一个都没静默丢。`,
    playable: `能真正跑的单元：六章 ${out.course ? out.course.units - ((out.single) ? 1 : 0) - ((out.fixture) ? out.fixture.units : 0) : 0} 个（同一份运行器）＋ 单篇 1 个（${out.single ? out.single.criteria : 0} 条判据全接入）＋ 批量装配 ${out.batch ? out.batch.units : 0} 个（同一份运行器逐个走通，但**决策题一个都没装配**、也没有页面入口：${out.batch ? out.batch.ready : 0} 个四类齐的按 ready 显示、${out.batch ? out.batch.scaffold : 0} 个缺 OPI 的按 scaffold 显示）＋ 明确标注的开发夹具 ${out.fixture ? out.fixture.units : 0} 个（不是正式课程）。**「全量课程可学」不成立**：76 个批量单元都缺三道决策题，六章的 CAS 也仍全部是「假设场景」。有材料但没有已确认正式章末门的单元按待装配显示，不借用别的单元的通过标准。`,
  };

  return {
    version: 'v1',
    generatedAt: new Date().toISOString().slice(0, 10),
    builtAt: new Date().toISOString(),
    sources: b.sources,
    layers, nodes, edges, stats, coverage,
    gaps: b.gaps,
    entries: b.entries,
    adapters: out,
    warnings: b.warnings,
  };
}
