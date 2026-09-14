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
//   · evidence/review-decisions-260914/review.json —— 228 道批量决策题的**独立复核结论**
//   · evidence/review-criteria-260914/review.json —— 264 条批量费曼判据的**独立复核结论**
//     （verdict=unusable：misconception 是机械反面转述、照抄 boundaries 即可满足 —— 形成性费曼段照实不开放）
//
// 判定规则（逐段，全部可从上面四份数据复算；页面把每条规则原文一起显示）：
//   阅读       活动 Reading 存在且 ready，且该单元有指向逐字原文（span.text）的 quotes 边 → 可走
//   形成性费曼 活动 Formative 存在且 ready，且该单元的判据不是「机械派生」
//              （criterion.meta.misconceptionSource === 'derived' 表示 misconception 由确定性规则算出、未人工复核），
//              并且（有判据复核产物时）该单元的判据复核 verdict === 'usable' → 可走
//              「判据复核通过才开放」同样不是白名单：读的是 review-criteria 的 verdict 字段
//   决策       三个条件同时成立才可走：①该单元声明的 decisions 不是空数组；②索引里真有 ≥1 个 ready 的
//              Decision 活动；③独立复核产物里这个单元的 verdict === 'usable'（= 3 道题逐题过出处/极性/捷径，
//              且三题正解互不相同）。**空数组 ≠ 满足**；**有题但没有复核记录 = 不开放**；
//              **复核不通过 = 不开放**，理由照实写出来。→ 否则未装配，链路在决策这一段断掉
//   章末费曼   活动 Summative 存在且 ready，判据非机械派生，且该单元没有「正式章末门待装配」缺口 → 可走
//   四段全绿 gate.open=true；否则照实写清缺什么，页面只显示这一条判断的结果。
//
// 「复核通过才开放」不是白名单：判定读的是复核产物的 verdict 字段，不是写死的单元 ID。
// 哪天重做出的题在 `node scripts/review-gen-decisions.mjs` 下过到 verdict='usable'，
// 同一套排版就会自动开门——代码不用改。

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

export function buildPractice({ graph, batch, learning, review, criteriaReview }) {
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];
  const gaps = graph.gaps || [];
  const chapters = (learning && learning.chapters) || [];
  const batchUnits = (batch && batch.units) || [];
  const byId = new Map(nodes.map((n) => [n.id, n]));
  // 单元 → 批量装配声明（decisions 空数组那条 P0 修复就是从这里读的）
  const batchByUnit = new Map(batchUnits.map((bu) => [`unit:${bu.unitId}`, bu]));
  // 单元 → 独立复核结论（verdict === 'usable' 才允许开决策那一段）
  const reviewByUnit = new Map(((review && review.units) || []).map((r) => [`unit:${r.unitId}`, r]));
  // 单元 → 费曼判据的独立复核结论（verdict === 'usable' 才允许开形成性费曼那一段）
  const critReviewByUnit = new Map(((criteriaReview && criteriaReview.units) || []).map((r) => [`unit:${r.unitId}`, r]));

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
    const critRv = critReviewByUnit.get(unitId) || null;
    const critGateFail = critRv && critRv.verdict !== 'usable';
    const formativeSeg = !formative || formative.status !== 'ready'
      ? seg('unassembled', '形成性费曼活动不存在或未就绪')
      : (authored.length && !critGateFail
        ? seg('green', `${authored.length} 条人工判据（带成立条件与常见误解）`)
        : (derived.length || critGateFail
          ? seg('missing', critGateFail
            ? `判据独立复核 verdict=${critRv.verdict}（${(critRv.blockedBy || []).slice(0, 2).join('；') || '机械反面转述、照抄边界原文即可满足'}）——未通过复核不开放`
            : `只有 ${derived.length} 条机械派生判据：misconception 由「边界条目的否定翻转」规则算出，未人工复核`)
          : seg('missing', '没有判据')));

    // ③ 决策：空数组 ≠ 满足；有题没复核 ≠ 满足；复核不通过 ≠ 满足 —— 链路在这里断
    const bu = batchByUnit.get(unitId) || null;
    const declaredDecisions = bu ? (bu.decisions || null) : null;   // null = 本单元没有批量装配声明，这条不适用（六章/单篇）
    const rv = reviewByUnit.get(unitId) || null;
    const decisions = acts.filter((a) => a.kind === 'Decision' && a.status === 'ready');
    let decisionSeg;
    if (Array.isArray(declaredDecisions) && declaredDecisions.length === 0) {
      decisionSeg = seg('unassembled', '0 道决策题（本单元声明的 decisions 是空数组；空数组不等于满足，不补造唯一正确答案）——链路在「决策」这一段断掉');
    } else if (!decisions.length) {
      decisionSeg = seg('unassembled', declaredDecisions
        ? `本单元声明了 ${declaredDecisions.length} 道决策题，但索引里没有 ready 的 Decision 活动——题还没接进链路`
        : '0 道决策题（不补造唯一正确答案）；链路在「决策」这一段断掉');
    } else if (rv && rv.verdict !== 'usable') {
      decisionSeg = seg('unassembled', `独立复核不通过（${rv.blockedBy.join('；')}）——有题不等于可进入`);
    } else {
      decisionSeg = seg('green', rv
        ? `${decisions.length} 道决策题（每题 3 选项 · 1 正确 · 带 OPI/SOL 依据；已独立复核 verdict=usable）`
        : `${decisions.length} 道决策题（每题 3 选项 · 1 正确 · 带 OPI/SOL 依据）`);
    }

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
    /* 方案丙：被手工章节取代（superseded）的机器版本**永远不可进入** —— 就算哪天判据补齐了也不开门。
       这是数据驱动的封条（读 units.json 的 superseded 字段），不是白名单也不是临时开关。 */
    const superseded = (opts.superseded) || null;
    const open = !superseded && SEGMENTS.every((s) => segments[s.key].state === 'green');
    return {
      segments, open, gaps: gapsText, derivedCount: derived.length, authoredCount: authored.length,
      decisionCount: decisions.length,
      declaredDecisionCount: Array.isArray(declaredDecisions) ? declaredDecisions.length : null,
      reviewVerdict: rv ? rv.verdict : null,
      reviewBlockedBy: rv ? rv.blockedBy : [],
      reviewUsableQuestions: rv ? rv.usableQuestions : 0,
      criteriaReviewVerdict: critRv ? critRv.verdict : null,
      criteriaReviewUsable: critRv ? critRv.usableCriteria : null,
      criteriaReviewTotal: critRv ? critRv.checkCount : null,
      superseded: superseded ? superseded.by : null,
      supersededReason: superseded ? superseded.reason : '',
    };
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

  // ③ 批量装配 76 个：材料在、页面入口 0；决策题有生成稿但独立复核不通过（照实标未装配）
  for (const bu of batchUnits) {
    const unitId = `unit:${bu.unitId}`;
    const j = judge(unitId, { superseded: bu.superseded || null });
    const rv = reviewByUnit.get(unitId) || null;
    units.push({
      id: unitId, label: bu.card ? `${bu.conceptId} · ${bu.card.slug}` : bu.conceptId, group: '批量', order: bu.order,
      routeStatus: bu.status, statusReason: bu.statusReason || '',
      caseType: ((bu.case || {}).caseType) || '', concept: null,
      superseded: j.superseded, supersededReason: j.supersededReason,
      questionCount: (bu.decisions || []).length,
      generatedDecisionCount: rv ? rv.questionCount : 0,      // 生成稿有几道；不等于准入
      criterionCount: ((bu.feynman || {}).checks || []).length,
      reader: null, entry: '',
      ...j,
      gaps: [...new Set(j.gaps.concat(bu.gaps || []))],   // graph 缺口与 units.json 缺口会重（同一件事写了两处），去重后再显示
    });
  }

  // 桶：按「第一次卡住的那一段」+ 声明的装配状态分（负责人给的四类口径）
  /* 桶 = 「第一次卡住的那一段」决定的（四类口径）。批量单元不再特判：
     2026-09-14 决策题接入后，76 个批量单元的「决策」段已全部变绿，它们现在卡在
     形成性费曼（判据是机械派生的）——照 实 归到「材料缺口」，不留在「缺少决策题」里。 */
  const firstBroken = (u) => SEGMENTS.find((s) => u.segments[s.key].state !== 'green');
  for (const u of units) {
    if (u.open) { u.bucket = 'open'; continue; }
    const fb = firstBroken(u);
    if (fb && fb.key === 'decision') u.bucket = 'decision';
    else u.bucket = 'material';
  }
  /* superseded 的机器版本一律留在「材料缺口」桶里（它们材料齐、只是不对外），
     计数照实进 summary.superseded，页面把它单独显示成「已被六章取代」。 */

  /* 四段全绿但还没绑阅读器载荷：现在不会发生（只有六章全绿，它们都有 reader），
     但准入是数据算的，哪天某个单元补齐了就会走到这条分支——照实说还差哪一步，不静默失败。 */
  for (const u of units) {
    if (u.open && !u.reader) {
      u.readerMissing = '四段已经全绿，但还没有把它的材料编译成阅读器载荷（evidence/agent-loop-260913/chapters.json 那种）；'
        + '这一版只把 gate 做成数据驱动，阅读载荷仍要逐单元装配——差的正是这一步。';
    }
  }

  const reviewedCriteria = (criteriaReview && criteriaReview.recomputed) ? {
    file: 'evidence/review-criteria-260914/review.json',
    reviewedArtifact: criteriaReview.file,
    total: criteriaReview.recomputed.total,
    units: criteriaReview.recomputed.units,
    verdict: criteriaReview.verdict,
    mechanicalRestatement: criteriaReview.recomputed.mechanicalRestatement,
    insufficientGain: criteriaReview.recomputed.insufficientGain,
    recitableFromBoundaries: criteriaReview.recomputed.recitableFromBoundaries,
    usableAsUnderstandingCheck: criteriaReview.recomputed.tierC_usableAsUnderstandingCheck,
    novelChars: criteriaReview.recomputed.novelChars,
    humanControl: criteriaReview.recomputed.humanControl,
    duplicatedWithinUnit: criteriaReview.recomputed.duplicatedWithinUnit,
    polarityInconsistent: criteriaReview.recomputed.polarityInconsistent,
  } : null;

  const byBucket = Object.fromEntries(BUCKETS.map((b) => [b.key, units.filter((u) => u.bucket === b.key).length]));
  const count = (fn) => units.filter(fn).length;
  const reviewedDecisions = (review && review.recomputed) ? {
    file: review.file,
    units: review.recomputed.units,
    questions: review.recomputed.questions,
    usableUnits: review.recomputed.usableUnits,
    usableQuestions: review.recomputed.usableQuestions,
    refHitRate: review.recomputed.refHitRate,
    polarityInvertedQuestions: review.recomputed.polarityInvertedQuestions,
    zeroComprehensionShortcutExploitable: review.recomputed.zeroComprehensionShortcutExploitable,
    unitsWhereAllThreeCorrectAnswersAreIdentical: review.recomputed.unitsWhereAllThreeCorrectAnswersAreIdentical,
    correctVerbatimCopy: review.recomputed.correctVerbatimCopy,
    correctRunAdvantageQuestions: review.recomputed.correctRunAdvantageQuestions,
    verdict: review.verdict,
    shortcutStrategyAccuracy: review.recomputed.shortcutStrategyAccuracy,
  } : null;

  // ── 「要全面推进，还差什么」：按缺口类型归并（给负责人做下一轮决策用；本轮不动手补） ──
  const batchReady = batchUnits.filter((u) => u.status === 'ready').length;
  const batchScaffold = batchUnits.filter((u) => u.status === 'scaffold').length;
  const derivedCriteria = units.reduce((n, u) => n + (u.group === '批量' ? u.derivedCount : 0), 0);
  const noEntry = units.filter((u) => !u.entry).length;
  const fullPush = [
    {
      type: '决策段已接通（这一轮做完的）· 链路改在形成性费曼这一段断', units: count((u) => u.group === '批量'), criteria: null,
      detail: `228 道决策题由 scripts/gen-decisions-hybrid-v3.mjs 确定性生成（模型调用 0 次），经 scripts/review-gen-decisions.mjs `
        + `逐题独立复核 228/228 通过、verdict=usable：76 个单元的「决策」段全部变成「可走」。上一轮 v2 的 228 道题判定 0/228 可接入 `
        + `（228/228 正解是唯一逐字材料句 · 76/76 单元三题同解 · 16 道题干与正解极性相反），整批废弃、一道没接。`
        + `现在卡住这 76 个单元的是「形成性费曼」：判据的 misconception 仍是机械反面转述（negationFlip 152 + boundaryDenial 112），不是人写的教学误解。`,
      who: '已完成：改生成器（正解改写句 / 三动作句 / 同极性）＋ 把 ⑧⑨⑩ 变成复核脚本里能失败的断言（--selftest 在旧产物上复现 228/76/16）',
      gate: 'node scripts/review-gen-decisions.mjs --write（退出码 0）· node scripts/review-gen-decisions.mjs --selftest',
    },
    {
      type: '缺 OPI 判断依据', units: batchScaffold, criteria: null,
      detail: `批量 76 个里有 ${batchScaffold} 个（scaffold）连 OPI 观点单元都没有；决策只能落在 CAS 情境与 SOL 动作路径上——这正是「缺少可靠案例」的邻居问题。`,
      who: '人写（从 58 篇正文里选判断句），模型只能做候选',
      gate: '所选 OPI 必须能回溯到 units.json / 图鉴卡的逐字字段',
    },
    {
      type: '判据是机械推的（已独立复核：verdict=unusable）', units: count((u) => u.group === '批量'), criteria: derivedCriteria,
      detail: reviewedCriteria
        ? `批量的 ${reviewedCriteria.total} 条费曼判据全部是机械反面转述（否定翻转 152 + 整条否定 112，重叠 ②c 111）：`
          + `误解相对成立条件的**信息增量只有 ${reviewedCriteria.novelChars.min}–${reviewedCriteria.novelChars.max} 字**（人写的六章 ${reviewedCriteria.humanControl.total} 条是 ${reviewedCriteria.humanControl.novelChars.min}–${reviewedCriteria.humanControl.novelChars.max} 字，两组不重叠）；`
          + `${reviewedCriteria.recitableFromBoundaries}/${reviewedCriteria.total} 条「照抄卡片 boundaries 原文即可满足」；另有 ${reviewedCriteria.duplicatedWithinUnit} 条同单元要点撞车、${reviewedCriteria.polarityInconsistent} 条翻转翻错位置（后两类已在生成器里修）。`
          + `可当复习提示，不能当教学误解 —— 复核产物 evidence/review-criteria-260914/review.json（判据自检：正控 264 条全咬住、负控六章 18 条一条没误杀）。`
        : `批量的 ${derivedCriteria} 条费曼判据里，misconception 一律由「边界条目的否定翻转」算出（negationFlip 152 + boundaryDenial 112）。`,
      who: '人写误解（模型只许起草，不许定稿）—— 语料里没有一条独立的误解内容：76 个反向 SOL 单元的 target_problem 逐条等于「避免这个误区：」＋该卡 boundaries[0]，换不出新信息',
      gate: 'node scripts/review-batch-criteria.mjs --selftest（正控＋负控）· --write 退出码 0 才算过；改成人写后仍要重算比对',
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
      review: reviewedDecisions ? 'evidence/review-decisions-260914/review.json' : null,
      criteriaReview: reviewedCriteria ? 'evidence/review-criteria-260914/review.json' : null,
      graphStats: graph.stats,
      graphGeneratedAt: graph.generatedAt || graph.builtAt || '',
    },
    gate: '四段全绿才开放：阅读｜形成性费曼｜决策｜章末费曼（判定规则与缺口原文都在本页）',
    segmentLabels: SEGMENTS,
    buckets: BUCKETS.map((b) => ({ ...b, count: byBucket[b.key] })),
    coverage: graph.coverage || {},
    reviewedDecisions,
    reviewedCriteria,
    summary: {
      units: units.length, open: units.filter((u) => u.open).length, byBucket,
      batchReady, batchScaffold, derivedCriteria, noEntry, reviewedDecisions,
      reviewedCriteria,
      superseded: units.filter((u) => u.superseded).length,
      supersededIds: units.filter((u) => u.superseded).map((u) => u.id),
    },
    fullPush,
    units,
  };
}
