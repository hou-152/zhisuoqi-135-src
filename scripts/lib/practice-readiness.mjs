// 实践空间 · 单元链路就绪度（把「条件允许全面推进」变成一条**可计算的闸门**）。
//
// 背景（负责人 2026-09-14 两条指示）：
//   · 裁决记录：实践空间第一版 = Agent Loop 六章阅读器（不是 6 + 19）；19 条 ready 只显示「准备中 / 目录候选」。
//   · 补充方向：「条件允许全面推进像 agent loop 的链路」——凡材料真撑得住的单元，都按
//     `阅读 → 形成性费曼 → 补讲 → 决策 → 章末费曼` 走同一份 graph-runner。
//   本文件把「条件允许」落成四个可判定的段，每段只有四种取值：可走 / 缺材料 / 未装配 / 不可进入。
//   准入规则只有一条：**四段全绿才开放**（gate.open）。六章不是写死在页面里的白名单，
//   它们是当前唯一四段全绿的单元；以后哪个单元补齐了，同一套排版就能进去。
//
// 数据来源（只读，不改公共源数据）：
//   · knowledge/graph-260914/graph.json      —— 单元 / 活动 / 判据 / 缺口 / 入口
//   · evidence/batch-units-260914/units.json —— 76 个批量装配单元的声明状态与缺口
//   · evidence/agent-loop-260913/chapters.json —— 六章的章级材料（判据、审核状态、题目）
//
// 判定规则（逐段，全部可从上面三份数据复算；页面把每条规则原文一起显示）：
//   阅读       活动 Reading 存在且 ready，且该单元有指向逐字原文（span.text）的 quotes 边 → 可走
//   形成性费曼 活动 Formative 存在且 ready，且该单元的判据不是「机械派生」
//              （criterion.meta.misconceptionSource === 'derived' 表示 misconception 由确定性规则算出、未人工复核）→ 可走
//   决策       该单元至少 1 个 Decision 活动 → 可走；0 个 = 未装配（不编假题占位）→ 链路在决策这一段断掉
//   章末费曼   活动 Summative 存在且 ready，判据非机械派生，且该单元没有「正式章末门待装配」缺口 → 可走
//   四段全绿 gate.open=true；否则照实写清缺什么，页面只显示这一条判断的结果。

export const SEGMENTS = [
  { key: 'reading', label: '阅读' },
  { key: 'formative', label: '形成性费曼' },
  { key: 'decision', label: '决策' },
  { key: 'summative', label: '章末费曼' },
];

export const SEGMENT_STATE_LABELS = {
  green: '可走',
  missing: '缺材料',
  unassembled: '未装配',
  blocked: '不可进入',
};

/** 首次卡住的那一段决定这个单元进哪个桶（负责人给的四类口径）。 */
export const BUCKETS = [
  { key: 'open', label: '已装配课程：可进入' },
  { key: 'material', label: '材料缺口：待装配' },
  { key: 'decision', label: '缺少决策题：不可进入' },
  { key: 'case', label: '缺少可靠案例：不可进入' },
];

const has = (arr, x) => (arr || []).includes(x);

export function buildPractice({ graph, batch, learning }) {
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];
  const gaps = graph.gaps || [];
  const chapters = (learning && learning.chapters) || [];
  const batchUnits = (batch && batch.units) || [];
  const byId = new Map(nodes.map((n) => [n.id, n]));

  const actsOf = (unitId) => nodes.filter((n) => n.id.startsWith(`activity:${unitId}:`));
  const gapsOf = (unitId) => gaps.filter((g) => has(g.affects, unitId));
  const critsOf = (unitId) => nodes.filter((n) => n.kind === 'Criterion'
    && ((n.meta || {}).unitId === unitId || (byId.get(unitId) && (n.meta || {}).unitId === (byId.get(unitId).meta || {}).unitId)));
  const quoteSpans = (unitId) => edges.filter((e) => e.from === unitId && /quote|narrative/.test(e.relation) && String(e.to).startsWith('span:'))
    .map((e) => byId.get(e.to)).filter((n) => n && (n.meta || {}).text);

  const seg = (state, why) => ({ state, stateLabel: SEGMENT_STATE_LABELS[state], why });

  function judge(unitId, opts = {}) {
    const acts = actsOf(unitId);
    const act = (kind) => acts.find((a) => a.kind === kind);
    const crits = critsOf(unitId);
    const derived = crits.filter((c) => (c.meta || {}).misconceptionSource === 'derived');
    const authored = crits.filter((c) => (c.meta || {}).misconceptionSource !== 'derived');
    const unitGaps = gapsOf(unitId);
    const gapsText = unitGaps.map((g) => `${g.label}：${g.why}`);

    // ① 阅读
    const reading = act('Reading');
    const spans = quoteSpans(unitId);
    const readingSeg = reading && reading.status === 'ready' && spans.length
      ? seg('green', `${spans.length} 条逐字原文（span）可回溯`)
      : seg('unassembled', reading && reading.status === 'ready'
        ? '这份索引里没有该单元指向逐字原文（span）的出处边——它的正文在别的阅读页，没接进这份索引'
        : '没有该单元的 Reading 活动');

    // ② 形成性费曼
    const formative = act('Formative');
    const formativeSeg = !formative || formative.status !== 'ready'
      ? seg('unassembled', '形成性费曼活动不存在或未就绪')
      : (authored.length
        ? seg('green', `${authored.length} 条人工判据（带成立条件与常见误解）`)
        : seg('missing', crits.length
          ? `只有 ${derived.length} 条机械派生判据：misconception 由「边界条目的否定翻转」规则算出，未人工复核`
          : '没有判据'));

    // ③ 决策：0 道题就是 0 道题，不编假题占位 —— 链路在这里断
    const decisions = acts.filter((a) => a.kind === 'Decision' && a.status === 'ready');
    const decisionSeg = decisions.length
      ? seg('green', `${decisions.length} 道决策题（每题 3 选项 · 1 正确 · 带 OPI/SOL 依据）`)
      : seg('unassembled', '0 道决策题（不补造唯一正确答案）；链路在「决策」这一段断掉');

    // ④ 章末费曼
    const summative = act('Summative');
    const gateGap = unitGaps.find((g) => /章末通过|解锁门|章末验收|正式通过标准/.test(`${g.label}${g.why}`));
    const summativeSeg = !summative || summative.status !== 'ready'
      ? seg('unassembled', '章末验收活动不存在或未就绪')
      : gateGap
        ? seg('unassembled', gateGap.why)
        : (authored.length
          ? seg('green', `${authored.length} 条章末判据（人写的成立条件，逐条判定）`)
          : seg('missing', `章末判据同样是机械派生的（${derived.length} 条），未人工复核`));

    const segments = {
      reading: readingSeg, formative: formativeSeg, decision: decisionSeg, summative: summativeSeg,
    };
    const open = SEGMENTS.every((s) => segments[s.key].state === 'green');
    return { segments, open, gaps: gapsText, derivedCount: derived.length, authoredCount: authored.length, decisionCount: decisions.length };
  }

  const units = [];

  // ① 六章（已装配课程）：标题/入口/题目数来自 chapters.json（同一份 LEARN）
  for (const c of chapters) {
    const unitId = `unit:chapter-${c.chapterId}`;
    const j = judge(unitId);
    units.push({
      id: unitId, label: `${c.order}. ${c.title}`, group: '六章', order: c.order,
      routeStatus: c.review.status, statusReason: c.review.statusNote || '',
      caseType: c.case.type, concept: { id: c.cm.id, name: c.cm.name, unit: c.concept.id },
      questionCount: (c.questions || []).length, criterionCount: j.authoredCount,
      reader: c.chapterId, entry: `#learn=${c.chapterId}`,
      ...j,
    });
  }

  // ② 单篇试点：材料在，但没有已确认的正式章末门（graph 缺口原文）
  const SINGLE = 'unit:agent-skills-api';
  if (byId.has(SINGLE)) {
    const j = judge(SINGLE);
    units.push({
      id: SINGLE, label: `单篇 · ${byId.get(SINGLE).meta.title}`, group: '单篇', order: 0,
      routeStatus: byId.get(SINGLE).status, statusReason: byId.get(SINGLE).statusReason || '',
      caseType: (byId.get(SINGLE).meta || {}).caseType || '',
      concept: null, questionCount: (byId.get(SINGLE).meta || {}).questionCount || 0,
      criterionCount: j.authoredCount,
      reader: null, entry: '#neican=agent-skills-api',
      ...j,
    });
  }

  // ③ 批量装配 76 个：材料在、页面入口 0、决策题 0
  for (const bu of batchUnits) {
    const unitId = `unit:${bu.unitId}`;
    const j = judge(unitId);
    units.push({
      id: unitId, label: bu.card ? `${bu.conceptId} · ${bu.card.slug}` : bu.conceptId, group: '批量', order: bu.order,
      routeStatus: bu.status, statusReason: bu.statusReason || '',
      caseType: ((bu.case || {}).caseType) || '', concept: null,
      questionCount: (bu.decisions || []).length,
      criterionCount: ((bu.feynman || {}).checks || []).length,
      reader: null, entry: '',
      ...j,
      gaps: [...new Set(j.gaps.concat(bu.gaps || []))],   // graph 缺口与 units.json 缺口会重（同一件事写了两处），去重后再显示
    });
  }

  // 桶：按「第一次卡住的那一段」+ 声明的装配状态分（负责人给的四类口径）
  const firstBroken = (u) => SEGMENTS.find((s) => u.segments[s.key].state !== 'green');
  for (const u of units) {
    if (u.open) { u.bucket = 'open'; continue; }
    const fb = firstBroken(u);
    if (u.group === '批量') u.bucket = u.routeStatus === 'ready' ? 'decision' : 'material';
    else if (fb && fb.key === 'decision') u.bucket = 'decision';
    else u.bucket = 'material';
  }

  const byBucket = Object.fromEntries(BUCKETS.map((b) => [b.key, units.filter((u) => u.bucket === b.key).length]));
  const count = (fn) => units.filter(fn).length;

  // ── 「要全面推进，还差什么」：按缺口类型归并（给负责人做下一轮决策用；本轮不动手补） ──
  const batchReady = batchUnits.filter((u) => u.status === 'ready').length;
  const batchScaffold = batchUnits.filter((u) => u.status === 'scaffold').length;
  const derivedCriteria = units.reduce((n, u) => n + (u.group === '批量' ? u.derivedCount : 0), 0);
  const noEntry = units.filter((u) => !u.entry).length;
  const fullPush = [
    {
      type: '缺决策题', units: count((u) => u.segments.decision.state !== 'green'), criteria: null,
      detail: `批量 76 个单元 0 道决策题（ready ${batchReady} + scaffold ${batchScaffold}）；单篇与六章各 3 道。链路断在「决策」这一段：没有题就没有「一题一判」，也没有可回的那道题。`,
      who: '模型可起草选项，但唯一正确答案必须人工认定',
      gate: '每题 3 选项、恰好 1 个正确、正解必须带 OPI/SOL 依据（现有 test-graph 已有这条断言）；起草稿不得直接进页面',
    },
    {
      type: '缺 OPI 判断依据', units: batchScaffold, criteria: null,
      detail: `批量 76 个里有 ${batchScaffold} 个（scaffold）连 OPI 观点单元都没有；决策只能落在 CAS 情境与 SOL 动作路径上——这正是「缺少可靠案例」的邻居问题。`,
      who: '人写（从 58 篇正文里选判断句），模型只能做候选',
      gate: '所选 OPI 必须能回溯到 units.json / 图鉴卡的逐字字段',
    },
    {
      type: '判据是机械推的', units: count((u) => u.group === '批量'), criteria: derivedCriteria,
      detail: `批量的 ${derivedCriteria} 条费曼判据里，misconception 一律由「边界条目的否定翻转」算出（negationFlip 152 + boundaryDenial 112）；point 只是边界条目的前 12 字。它可以当复习提示，不能当教学误解。`,
      who: '人写误解（模型只许起草，不许定稿）',
      gate: 'check-batch-units.mjs 逐条重算复核；改成人写后仍要重算比对，防止又被脚本覆盖回去',
    },
    {
      type: '无页面入口', units: noEntry, criteria: null,
      detail: `批量 ${noEntry} 个单元在 graph.entries 里一条入口都没有（entries 只有六章 6 + 单篇 1）。`,
      who: '已解决一半：准入判断已改成数据驱动（gate 四段全绿就开放），本轮不补入口',
      gate: '入口与阅读器同一套（#learn），不新造第二套视觉；补入口前先让 gate 变绿',
    },
    {
      type: '缺可靠案例（真实复盘）', units: count((u) => /假设场景/.test(u.caseType || '')), criteria: null,
      detail: `六章 6 + 批量 76 的主案例全部自述「假设场景」（源卡 scenario.type: hypothetical）；六章候选 CAS 各只有 1 个，没有第二候选。六章那 6 个已由负责人确认为本章主案例（不因此挡在门外），批量 76 个没有任何确认记录。`,
      who: '人写（要真实复盘得从 58 篇正文另抽一批）',
      gate: '案例必须保留原始出处与「假设场景 / 真实复盘」标记，不许把假设写成复盘',
    },
    {
      type: '缺正式章末通过与解锁门', units: count((u) => u.group === '单篇'), criteria: null,
      detail: '单篇有 4 条判据与章末费曼，但没有像六章那样已确认的正式通过标准 / 解锁规则（graph 缺口原文）。',
      who: '负责人确认口径',
      gate: '不借用六章的通过标准（裁决记录 §1 的边界）',
    },
  ];

  return {
    builtFrom: {
      graph: 'knowledge/graph-260914/graph.json',
      batch: 'evidence/batch-units-260914/units.json',
      learning: 'evidence/agent-loop-260913/chapters.json',
      graphStats: graph.stats,
      graphGeneratedAt: graph.generatedAt || graph.builtAt || '',
    },
    gate: '四段全绿才开放：阅读｜形成性费曼｜决策｜章末费曼（判定规则与缺口原文都在本页）',
    segmentLabels: SEGMENTS,
    buckets: BUCKETS.map((b) => ({ ...b, count: byBucket[b.key] })),
    coverage: graph.coverage || {},
    summary: {
      units: units.length, open: units.filter((u) => u.open).length, byBucket,
      batchReady, batchScaffold, derivedCriteria, noEntry,
    },
    fullPush,
    units,
  };
}
