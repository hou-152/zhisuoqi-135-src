// 实践空间 · 单元链路就绪度（把「条件允许全面推进」变成一条**可计算的闸门**）。
//
// 背景：
//   · 负责人 2026-09-14 两条指示：实践空间第一版 = 六章阅读器；「条件允许全面推进像 agent loop 的链路」。
//   · **准入门改版（2026-09-14 定稿，本轮落地）**：`docs/准入门改版-区分度自证-20260914.md`
//     —— 准入从「上线前人工审」改成**三条机器条件**（绑逐字原文 · 有真实轨迹走过 · 缺口真的下降过）。
//     不满足三条的判据照实标「待验证区分度」：**可以看、不参与通过判定、也不挡单元进入**。
//     这是和上一版最重要的区别：上一版把「判据复核没过」当成不开放的理由，76 个单元永远停在未装配。
//
// 本文件把「条件允许」落成四个可判定的段，每段只有四种取值：可走 / 缺材料 / 未装配 / 不可进入。
// 准入规则只有一条、且是数据算出来的：**四段全绿才开放**（gate.open）。六章不是写死在页面里的白名单，
// 76 个批量单元也不是——它们是同一份判定跑出来的结果；以后哪个单元补齐了，同一套排版就能进去。
//
// 数据来源（只读，不改公共源数据）：
//   · knowledge/graph-260914/graph.json            —— 单元 / 活动 / 判据 / 缺口 / 入口
//   · evidence/batch-units-260914/units.json       —— 76 个批量装配单元的声明状态与缺口
//   · evidence/batch-units-260914/readers.json     —— 76 份**阅读器载荷**（本轮编译；含逐字校验与准入结论）
//   · evidence/agent-loop-260913/chapters.json     —— 六章的章级材料
//   · evidence/review-decisions-260914/review.json —— 228 道批量决策题的独立复核结论
//   · evidence/review-criteria-260914/review.json  —— 264 条批量费曼判据的独立复核结论
//     （verdict=blocked：misconception 是机械反面转述 —— **不再阻挡进入**，照实标「待验证区分度」）
//   · evidence/trajectories-260914/trajectories.json —— 真实轨迹（准入门第二条、第三条的唯一来源）
//
// 判定规则（逐段，全部可从上面几份数据复算；页面把每条规则原文一起显示）：
//   阅读       活动 Reading 存在且 ready，且该单元有指向逐字原文（span）的 quotes 边，
//              且（批量单元）阅读器载荷已编译并 isAllowedToOpen → 可走
//              「绑不到逐字原文就不写、不开放」：载荷编译时逐条过 indexOf + sha256 + locator，
//              任何一条过不了就不进载荷，也不开放这个单元
//   形成性费曼 活动 Formative 存在且 ready → 可走；判据按三条机器条件标「已激活 / 待验证区分度」
//              **待验证区分度不挡进入**（这正是本轮改版的核心），只是不参与通过判定
//   决策       三个条件同时成立才可走：①该单元声明的 decisions 不是空数组；②索引里真有 ≥1 个 ready 的
//              Decision 活动；③独立复核产物里这个单元的 verdict === 'usable'。**空数组 ≠ 满足**；
//              **有题但没有复核记录 = 不开放**；**复核不通过 = 不开放**
//   章末费曼   活动 Summative 存在且 ready，且该单元没有「正式章末门待装配」缺口 → 可走
//   四段全绿 gate.open=true；否则照实写清缺什么，页面只显示这一条判断的结果。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { machineQuestionsOf } from './machine-questions.mjs';
import { judgeCriterion, verbatimBinding, PENDING_LABEL } from './criteria-activation.mjs';

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

export function buildPractice({ graph, batch, learning, review, criteriaReview, batchReaders, allowRealTrajectories, root }) {
  /* 逐字绑定的**磁盘核查**：光看字段形状不够 —— sha256 必须真的等于磁盘上那份文件，
     引文也必须真的能在文件里逐字 indexOf 到。绑不上就不算绑定，这个单元当场不开放。 */
  const ROOT_DIR = root || path.resolve(import.meta.dirname, '..', '..');
  const fileCache = new Map();
  const fileOf = (rel) => {
    if (!fileCache.has(rel)) {
      const abs = path.join(ROOT_DIR, rel);
      try { fileCache.set(rel, { raw: fs.readFileSync(abs, 'utf8'), sha: crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex') }); }
      catch { fileCache.set(rel, null); }
    }
    return fileCache.get(rel);
  };
  const bindOnDisk = (c) => {
    const f = fileOf(c.sourceFile);
    if (!f || f.sha !== c.sourceSha256) return false;
    if (!f.raw.includes(c.text)) return false;
    return true;
  };
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];
  const gaps = graph.gaps || [];
  const chapters = (learning && learning.chapters) || [];
  const batchUnits = (batch && batch.units) || [];
  const readerUnits = (batchReaders && batchReaders.readers) || [];
  /* 真实轨迹（准入门第二、三条的唯一来源）：只认 learnerIs.realHuman === true，
     脚本扮演的合成轨迹不算。allowRealTrajectories=false 是**验收用的探针开关**：
     把真实轨迹抽掉，单元必须照实退回「待验证区分度」（证明激活真的读轨迹）。 */
  const realTrajectories = (allowRealTrajectories === false) ? []
    : ((batchReaders && batchReaders.trajectories) || []).filter((t) => t && t.learnerIs && t.learnerIs.realHuman === true);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  // 单元 → 批量装配声明（decisions 空数组那条 P0 修复就是从这里读的）
  const batchByUnit = new Map(batchUnits.map((bu) => [`unit:${bu.unitId}`, bu]));
  // 单元 → 阅读器载荷（本轮编译；逐字校验与三条机器条件的结论都在载荷里）
  const readerByUnit = new Map(readerUnits.map((r) => [`unit:${r.chapterId}`, r]));
  /* 章级单元在索引里的节点 ID 不带 `chapter-` 前缀（`unit:agent` vs practice 的 `unit:chapter-agent`），
     两边各按各的写法查，免得一个都查不到、把「有 3 条人工判据」误报成「没有判据」。 */
  const graphUnitIdOf = (id) => {
    const m = /^unit:chapter-(.+)$/.exec(String(id));
    if (m && byId.has(`unit:${m[1]}`) && !byId.has(id)) return `unit:${m[1]}`;
    return id;
  };
  // 单元 → 独立复核结论（verdict === 'usable' 才允许开决策那一段）
  const reviewByUnit = new Map(((review && review.units) || []).map((r) => [`unit:${r.unitId}`, r]));
  // 单元 → 费曼判据的独立复核结论（只用来在页面上写清"为什么它还是待验证"）
  const critReviewByUnit = new Map(((criteriaReview && criteriaReview.units) || []).map((r) => [`unit:${r.unitId}`, r]));

  const actsOf = (unitId) => nodes.filter((n) => n.id.startsWith(`activity:${unitId}:`));
  const gapsOf = (unitId) => gaps.filter((g) => has(g.affects, unitId));
  /* 判据节点在索引里用 `meta.unitId` 归属单元；章级记的是章 id（`agent`），批量记的是 `unit:batch-*`。
     两种形状都认，免得一个都查不到、把「有 3 条人工判据」误报成「没有判据」。
     人写 / 机器派生不按 meta 猜，按边判：`targets`（reviewState=authored）＝人写；`supplements`＝方案丙并入的机器派生。 */
  const critsOf = (gid, metaUnit) => nodes.filter((n) => n.kind === 'Criterion'
    && ((n.meta || {}).unitId === gid || (metaUnit && (n.meta || {}).unitId === metaUnit)));
  const supplementsOf = (gid) => new Set(edges.filter((e) => e.relation === 'supplements' && e.from === gid).map((e) => e.to));
  const quoteSpans = (gid) => edges.filter((e) => e.from === gid && /quote|narrative/.test(e.relation) && String(e.to).startsWith('span:'))
    .map((e) => byId.get(e.to)).filter((n) => n && (n.meta || {}).text);

  const seg = (state, why) => ({ state, stateLabel: SEGMENT_STATE_LABELS[state], why });

  function judge(unitId, opts = {}) {
    const gid = graphUnitIdOf(unitId);              // 索引里的节点 ID（章级节点不带 `unit:` 前缀，判据 meta.unitId 记的是章 id）
    const metaUnit = /^unit:chapter-(.+)$/.test(unitId) ? unitId.replace(/^unit:chapter-/, '') : unitId;
    const acts = actsOf(gid);
    const act = (kind) => acts.find((a) => a.kind === kind);
    const crits = critsOf(gid, metaUnit);
    const supplements = supplementsOf(gid);
    const derived = crits.filter((c) => supplements.has(c.id) || (c.meta || {}).misconceptionSource === 'derived');
    const authored = crits.filter((c) => !supplements.has(c.id) && (c.meta || {}).misconceptionSource !== 'derived');
    const unitGaps = gapsOf(gid);
    const gapsText = unitGaps.map((g) => `${g.label}：${g.why}`);
    const reader = readerByUnit.get(unitId) || null;

    /* 判据的三条机器条件：**在这里现算一遍**，不直接采信载荷里那份 admission。
       理由：准入必须踩在「当前这份数据」上——引文被打断、sha256 对不上，单元当场就不该开放，
       而不是等编译器重跑才发现。现算的结果与载荷里的 admission 逐条比对（不一致就是漂移，页面照实红）。
       citation 从载荷形状里解（原文/定义/直觉/机制/边界都带 sourceFile + sha256 + locator）。 */
    const citationsOf = (rd) => {
      const out = [];
      /* 载荷里带出处的材料有两种埋法：reading.*.citation 是**整个材料对象**（text 在外面），
         boundary.citations / feynman.checks 是**材料本身**（text 就在里面）。两种都按同一形状取出来。 */
      const fields = (x) => {
        const cit = (x && x.citation) || {};
        const text = (x && typeof x.text === 'string' && x.text) || (typeof cit.text === 'string' && cit.text) || '';
        return { text, sourceFile: cit.sourceFile, sourceSha256: cit.sourceSha256, locator: cit.locator };
      };
      const rdg = (rd && rd.reading) || {};
      for (const x of [rdg.original, rdg.explain, rdg.intuition, rdg.mechanism]) {
        /* 块上带 citations[]（逐条材料各带出处）就逐条收；否则收它那一处 citation。 */
        const list = (x && x.citations) || null;
        if (Array.isArray(list)) {
          for (const y of list) if (y && y.sourceFile && y.locator) out.push({ text: y.text, sourceFile: y.sourceFile, sourceSha256: y.sourceSha256, locator: y.locator });
          continue;
        }
        const n = fields(x);
        if (n.sourceFile && n.locator) out.push(n);
      }
      /* boundary.citations 与 feynman.checks 本身就是「材料 + 出处」，字段平铺。 */
      for (const x of ((rdg.boundary && rdg.boundary.citations) || [])) {
        if (x && x.sourceFile && x.locator) out.push({ text: x.text, sourceFile: x.sourceFile, sourceSha256: x.sourceSha256, locator: x.locator });
      }
      for (const c of ((rd && rd.feynman && rd.feynman.checks) || [])) {
        if (c && c.sourceFile && c.locator) out.push({ text: c.condition, sourceFile: c.sourceFile, sourceSha256: c.sourceSha256, locator: c.locator });
      }
      return out;
    };
    const citations = reader ? citationsOf(reader) : [];
    const boundCitations = citations.filter((c) => verbatimBinding(c).ok && bindOnDisk(c));
    const unboundWhy = citations.filter((c) => !(verbatimBinding(c).ok && bindOnDisk(c)))
      .map((c) => `${String(c.sourceFile || '').split('/').pop()}#${c.locator}（${!verbatimBinding(c).ok ? verbatimBinding(c).why : (fileOf(c.sourceFile) ? 'sha256 或逐字命中与磁盘不一致' : '来源文件不在')}）`);
    /* 判据的三条机器条件：有阅读器载荷的单元现算，没有的（六章/单篇）照实说没有轨迹。 */
    const checks = reader ? (reader.feynman.checks || []) : [];
    const admissions = checks.map((c) => judgeCriterion(c, { trajectories: realTrajectories }));
    const activeChecks = checks.filter((c, i) => admissions[i].active === true);
    const pendingChecks = checks.filter((c, i) => admissions[i].active !== true);
    const checkSummary = reader
      ? { total: checks.length, active: activeChecks.length, pending: pendingChecks.length,
        label: pendingChecks.length ? PENDING_LABEL : (activeChecks.length ? '已激活（区分度自证通过）' : '无判据'),
        activeIds: activeChecks.map((c) => c.id), pendingIds: pendingChecks.map((c) => c.id),
        citationsTotal: citations.length, citationsBound: boundCitations.length,
        citationsUnbound: citations.length - boundCitations.length, unboundWhy,
        quoteBound: boundCitations.length > 0,
        realTrajectories: realTrajectories.length }
      : null;

    // ① 阅读
    const reading = act('Reading');
    const spans = quoteSpans(gid);
    let readingSeg;
    if (reader && reader.isAllowedToOpen === false) {
      readingSeg = seg('blocked', `阅读器载荷已编译但不允许开放：${(reader.blockedBy || []).join('；') || '照实标不开放'}`);
    } else if (reader && boundCitations.length !== citations.length) {
      /* 硬条件：**每一条**逐字材料都要同时满足 indexOf ＋ sha256 ＋ locator。
         有一条绑不上，这个单元就不开放（编译器的口径是「过不了就不写」，这里是它的执行面——
         载荷被人动过、或磁盘上那份来源变了，这里当场就挡住，不等重跑编译器）。 */
      readingSeg = seg('blocked', `逐字材料绑定不全：共 ${citations.length} 条，绑定失败 ${citations.length - boundCitations.length} 条（${unboundWhy.slice(0, 2).join('；')}）——绑不到原文就不开放`);
    } else if (reader && spans.length) {
      const rs = (batchReaders && batchReaders.stats) || {};
      readingSeg = seg('green', `阅读器载荷已编译（正文逐字搬自 units.json 与图鉴卡；${rs.citationsChecked || 0} 条材料逐条过 indexOf + sha256 + locator）`
        + `；${reader.feynman.checks.length} 条判据、${spans.length} 条出处边都在`);
    } else if (reader) {
      readingSeg = seg('unassembled', '阅读器载荷已编译，但这份索引里没有该单元指向逐字原文（span）的出处边');
    } else if (reading && reading.status === 'ready' && spans.length) {
      readingSeg = seg('green', `${spans.length} 条逐字原文（span）可回溯`);
    } else {
      readingSeg = seg('unassembled', reading && reading.status === 'ready'
        ? '这份索引里没有该单元指向逐字原文（span）的出处边——它的正文在别的阅读页，没接进这份索引'
        : '没有该单元的 Reading 活动');
    }

    // ② 形成性费曼：**待验证区分度不挡进入**（本轮改版的核心）；它只是不进通过判定
    const formative = act('Formative');
    let formativeSeg;
    if (!formative || formative.status !== 'ready') {
      formativeSeg = seg('unassembled', '形成性费曼活动不存在或未就绪');
    } else if (reader && checks.length) {
      formativeSeg = pendingChecks.length
        ? seg('green', `${checks.length} 条判据（已激活 ${activeChecks.length} · ${pendingChecks.length} 条标「待验证区分度」：`
          + `misconception 是卡片 boundaries 的机械反面转述，独立复核 verdict=${(critReviewByUnit.get(unitId) || {}).verdict || 'unreviewed'}）`
          + `——**待验证区分度不挡进入**，它们只是不参与通过判定；走出一条真实轨迹后会按三条机器条件自动激活`)
        : seg('green', `${activeChecks.length} 条判据已激活（三条机器条件全过：绑了逐字原文 ＋ 真实轨迹走过 ＋ 缺口真的下降过）`);
    } else if (authored.length) {
      /* 人写的判据（六章那 18 条：reviewState=authored 的 targets 边）本来就带成立条件与常见误解，
         不需要外部复核；方案丙并入的机器派生判据另算（supplements 边），它们不适用这一段。 */
      const sup = derived.length ? `；另有 ${derived.length} 条方案丙并入的机器派生补充判据（不参与本章通过判定）` : '';
      formativeSeg = seg('green', `${authored.length} 条人工判据（带成立条件与常见误解）${sup}`);
    } else if (derived.length) {
      formativeSeg = seg('missing', `只有 ${derived.length} 条机械派生判据：misconception 由「边界条目的否定翻转」规则算出，未人工复核`);
    } else {
      formativeSeg = seg('missing', '没有判据');
    }

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
        : (reader && checks.length
          ? seg('green', pendingChecks.length
            ? `章末验收活动就绪；判据 ${activeChecks.length} 条已激活 + ${pendingChecks.length} 条「待验证区分度」（不参与通过判定）`
            : `章末验收活动就绪；${activeChecks.length} 条判据全部已激活`)
          : (authored.length
            ? seg('green', `${authored.length} 条章末判据（人写的成立条件，逐条判定）`)
            : seg('missing', `章末判据同样是机械派生的（${derived.length} 条），未人工复核`)));

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
      criteriaReviewVerdict: critReviewByUnit.has(unitId) ? critReviewByUnit.get(unitId).verdict : null,
      criteriaActivation: checkSummary,
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

  // ③ 批量装配 76 个：阅读器载荷已编译（本轮），除 6 个 superseded 外全部开放
  for (const bu of batchUnits) {
    const unitId = `unit:${bu.unitId}`;
    const j = judge(unitId, { superseded: bu.superseded || null });
    const rv = reviewByUnit.get(unitId) || null;
    const rd = readerByUnit.get(unitId) || null;
    const buQuestions = rd ? machineQuestionsOf({
      unitId: bu.unitId, decisions: bu.decisions || [], verdict: rv ? rv.verdict : null,
      artifactRel: 'evidence/batch-units-260914/units.json',
      decisionsRel: 'evidence/gen-decisions-hybrid-v3-20260914.json',
      reviewRel: 'evidence/review-decisions-260914/review.json',
    }) : [];
    units.push({
      id: unitId, label: `${bu.order}. ${(rd && rd.title) || bu.conceptId}`, group: '批量', order: bu.order,
      routeStatus: bu.status, statusReason: bu.statusReason || '',
      caseType: ((bu.case || {}).caseType) || '', concept: rd ? { id: rd.cm.id, name: rd.cm.name, unit: rd.concept.id } : null,
      superseded: j.superseded, supersededReason: j.supersededReason,
      questionCount: (bu.decisions || []).length,
      generatedDecisionCount: rv ? rv.questionCount : 0,      // 生成稿有几道；不等于准入
      criterionCount: ((bu.feynman || {}).checks || []).length,
      entry: `#learn=${bu.unitId}`,
      reader: (rd && rd.isAllowedToOpen) ? rd.chapterId : null,
      readerCompiled: !!rd,
      questionsPlayable: buQuestions.length,
      ...j,
      gaps: [...new Set(j.gaps.concat(bu.gaps || []))],   // graph 缺口与 units.json 缺口会重（同一件事写了两处），去重后再显示
    });
  }

  // 桶：按「第一次卡住的那一段」+ 声明的装配状态分（负责人给的四类口径）
  const firstBroken = (u) => SEGMENTS.find((s) => u.segments[s.key].state !== 'green');
  for (const u of units) {
    if (u.open) { u.bucket = 'open'; continue; }
    const fb = firstBroken(u);
    if (fb && fb.key === 'decision') u.bucket = 'decision';
    else u.bucket = 'material';
  }
  /* superseded 的机器版本一律留在「材料缺口」桶里（它们材料齐、只是不对外），
     计数照实进 summary.superseded，页面把它单独显示成「已被六章取代」。 */

  /* 四段全绿但还没绑阅读器载荷：批量单元里 superseded 的 6 个走这条（它们四段全绿、载荷也有，
     但 superseded 封条让 open=false）；六章与批量其余单元都有 reader。照实说还差哪一步，不静默失败。 */
  for (const u of units) {
    if (u.open && !u.reader) {
      u.readerMissing = '四段已经全绿，但还没有把它的材料编译成阅读器载荷（evidence/agent-loop-260913/chapters.json 或 '
        + 'evidence/batch-units-260914/readers.json 那种）；差的正是这一步。';
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

  // 阅读载荷体检（本轮编译）：多少份编译出来、多少份逐字校验没过、多少份没开放
  const readerStats = batchReaders ? {
    file: 'evidence/batch-units-260914/readers.json',
    builtAt: batchReaders.builtAt,
    readers: (batchReaders.stats || {}).readers || 0,
    allowedToOpen: (batchReaders.stats || {}).allowedToOpen || 0,
    superseded: (batchReaders.stats || {}).superseded || 0,
    pendingAssembly: (batchReaders.stats || {}).pendingAssembly || 0,
    citationsChecked: (batchReaders.stats || {}).citationsChecked || 0,
    citationsRejected: 0,
    criteriaTotal: (batchReaders.stats || {}).criteriaTotal || 0,
    criteriaActive: (batchReaders.stats || {}).criteriaActive || 0,
    criteriaPending: (batchReaders.stats || {}).criteriaPending || 0,
    realTrajectories: (batchReaders.stats || {}).realTrajectories || 0,
    trajectoryFiles: (batchReaders.stats || {}).trajectoryFiles || 0,
    policy: batchReaders.policy || {},
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
      type: '阅读载荷已编译（这一轮做完的）· 76 个批量单元接进同一套 #learn 阅读器', units: count((u) => u.group === '批量'), criteria: null,
      detail: `76 份阅读器载荷由 scripts/build-batch-materials.mjs 确定性编译（模型调用 0 次）：每份的正文逐字搬自 `
        + `evidence/batch-units-260914/units.json 与图鉴卡，${readerStats ? readerStats.citationsChecked : 0} 条材料逐条重做 indexOf + sha256 + locator 三查，`
        + `过不了就**不写进载荷、也不开放那个单元**。除 ${readerStats ? readerStats.superseded : 6} 个 superseded（已被六章取代、永久不开放）外全部接入实践空间阅读器。`,
      who: '已完成：scripts/build-batch-materials.mjs（编译）＋ scripts/lib/criteria-activation.mjs（准入三条机器条件）',
      gate: 'node scripts/build-batch-materials.mjs（退出码 0）· node scripts/check-batch-units.mjs',
    },
    {
      type: `判据的区分度还没自证：${readerStats ? readerStats.criteriaPending : 264} 条全部标「待验证区分度」`, units: count((u) => u.group === '批量'), criteria: readerStats ? readerStats.criteriaPending : null,
      detail: `准入改成三条机器条件后：①绑逐字原文 ${readerStats ? readerStats.criteriaTotal : 0}/${readerStats ? readerStats.criteriaTotal : 0} 条都过（机器可查、零人力）；`
        + `②③要有**真实轨迹**走过一遍。现在全库真实轨迹只有 ${readerStats ? readerStats.realTrajectories : 0} 份（负责人本人走第 1 章 `+"`agent`"+` 的两轮读中反馈），`
        + `而那条轨迹里三条缺口两轮都在、没有任何一条判据从 not-met 走到 met —— 所以按条件 ②③ 全部还是「待验证区分度」。`
        + `**它们照实标注、不参与通过判定，也不再阻挡单元进入**（这是本轮改版与上一版最重要的区别）。`,
      who: '负责人本人再走一遍（哪怕只是把第 1 章那个复述改对一处）——这是这套机制的启动条件，脚本补不了',
      gate: '轨迹落进 evidence/trajectories-260914/ → 重跑 build-batch-materials.mjs，三条条件全过的判据自动激活（gate 字段从 false 变 true）',
    },
    {
      type: '缺 OPI 判断依据', units: batchScaffold, criteria: null,
      detail: `批量 76 个里有 ${batchScaffold} 个（scaffold）连 OPI 观点单元都没有；决策只能落在 CAS 情境与 SOL 动作路径上——这正是「缺少可靠案例」的邻居问题。`,
      who: '人写（从 58 篇正文里选判断句），模型只能做候选',
      gate: '所选 OPI 必须能回溯到 units.json / 图鉴卡的逐字字段',
    },
    {
      type: '判据是机械推的（独立复核 verdict=blocked · 照实标待验证区分度）', units: count((u) => u.group === '批量'), criteria: derivedCriteria,
      detail: reviewedCriteria
        ? `批量的 ${reviewedCriteria.total} 条费曼判据全部是机械反面转述（否定翻转 152 + 整条否定 112，重叠 ②c 111）：`
          + `误解相对成立条件的**信息增量只有 ${reviewedCriteria.novelChars.min}–${reviewedCriteria.novelChars.max} 字**（人写的六章 ${reviewedCriteria.humanControl.total} 条是 ${reviewedCriteria.humanControl.novelChars.min}–${reviewedCriteria.humanControl.novelChars.max} 字，两组不重叠）；`
          + `${reviewedCriteria.recitableFromBoundaries}/${reviewedCriteria.total} 条「照抄卡片 boundaries 原文即可满足」。`
          + `**本轮口径**：这不再等于「不可进入」，只等于「不参与通过判定」——页面逐条标出来源与复核结论。`
        : `批量的 ${derivedCriteria} 条费曼判据里，misconception 一律由「边界条目的否定翻转」算出。`,
      who: '人写误解（模型只许起草，不许定稿）—— 语料里没有一条独立的误解内容',
      gate: 'node scripts/review-batch-criteria.mjs --selftest（正控＋负控）· --write 退出码 0 才算过；改成人写后仍要重算比对',
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
      batchReaders: readerStats ? readerStats.file : null,
      learning: 'evidence/agent-loop-260913/chapters.json',
      review: reviewedDecisions ? 'evidence/review-decisions-260914/review.json' : null,
      criteriaReview: reviewedCriteria ? 'evidence/review-criteria-260914/review.json' : null,
      trajectories: 'evidence/trajectories-260914/trajectories.json',
      graphStats: graph.stats,
      graphGeneratedAt: graph.generatedAt || graph.builtAt || '',
    },
    gate: '四段全绿才开放：阅读｜形成性费曼｜决策｜章末费曼（判定规则与缺口原文都在本页）；'
      + '判据按三条机器条件标「已激活 / 待验证区分度」，待验证照实标注、不参与通过判定、也不挡进入',
    segmentLabels: SEGMENTS,
    buckets: BUCKETS.map((b) => ({ ...b, count: byBucket[b.key] })),
    coverage: graph.coverage || {},
    reviewedDecisions,
    reviewedCriteria,
    readerStats,
    summary: {
      units: units.length, open: units.filter((u) => u.open).length, byBucket,
      batchReady, batchScaffold, derivedCriteria, noEntry, reviewedDecisions,
      reviewedCriteria, readerStats,
      superseded: units.filter((u) => u.superseded).length,
      supersededIds: units.filter((u) => u.superseded).map((u) => u.id),
      pendingAssembly: units.filter((u) => u.group === '批量' && !u.open).length,
    },
    fullPush,
    units,
  };
}
