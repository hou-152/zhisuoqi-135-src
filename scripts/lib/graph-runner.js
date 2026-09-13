// 全链路 Graph 运行时（2026-09-14）
//
// 一份实现，两处使用：Node 里的验收脚本 require 它，浏览器里 build-shell.mjs 把它内联成 window.GRAPH_RUNNER。
// 因此 UMD 包一层，不写 import/export。
//
// 三条硬规则（对应任务书 §4 / §6 / §7，是代码强制的，不是注释）：
//   1. 只有 graph 里 kind==='transition' 的边参与 allowed()。出处边、知识边、弱相关边永远不能当"下一步"。
//   2. guard 与 effect 必须按名字查到注册表。查不到 = 系统未判定（notJudged），不许静默通过，也不许 eval。
//   3. 模型给的是候选语义判断；通过、解锁、记录写入一律由这里的规则决定。
//
// 补讲回到**发起它的那个活动**（阅读 / 某道题 / 章末验收 / 正式核对），不是一律回决策题。
// 暂停恢复回到保存的原节点，不是一律从阅读重来。

(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GRAPH_RUNNER = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const VERSION = 'v1';
  const CRITERIA_VERSION = 'v3-20260914';

  // 系统未判定 ≠ 学生不会（任务书 §6.4）。这些原因一律走 notJudged，既不通过也不记成缺口。
  const SYSTEM_ERRORS = ['timeout', 'bad-json', 'unknown-id', 'illegal-state', 'missing-source', 'stale-result', 'unknown-guard', 'unknown-effect'];

  const ACTIVITY_KINDS = ['Reading', 'Formative', 'Support', 'Decision', 'DecisionReview', 'Summative', 'ApplicationReview', 'ExperimentReference'];
  const isActivity = (n) => !!n && ACTIVITY_KINDS.indexOf(n.kind) >= 0;

  // ── 索引 ────────────────────────────────────────────────
  function index(graph) {
    const byId = new Map();
    for (const n of graph.nodes) byId.set(n.id, n);
    const transOut = new Map();   // 只有流程边
    const outAll = new Map();
    const inAll = new Map();
    const materials = new Map();  // 判据 → 补讲材料（curriculum: taught-by）
    const unitOfActivity = new Map();
    for (const e of graph.edges) {
      (outAll.get(e.from) || outAll.set(e.from, []).get(e.from)).push(e);
      (inAll.get(e.to) || inAll.set(e.to, []).get(e.to)).push(e);
      if (e.kind !== 'transition') {
        if (e.kind === 'curriculum' && e.relation === 'taught-by') {
          (materials.get(e.from) || materials.set(e.from, []).get(e.from)).push(e.to);
        }
        continue;
      }
      (transOut.get(e.from) || transOut.set(e.from, []).get(e.from)).push(e);
    }
    for (const n of graph.nodes) {
      if (isActivity(n) && n.meta && n.meta.unitId) unitOfActivity.set(n.id, n.meta.unitId);
    }
    return { byId, transOut, outAll, inAll, materials, unitOfActivity, graph };
  }

  // ── 守卫表（按名字注册，禁止 eval）─────────────────────────
  const top = (s) => (s.returnStack.length ? s.returnStack[s.returnStack.length - 1] : null);
  const kindOf = (idx, id) => (idx.byId.get(id) || {}).kind || '';
  const roleOf = (idx, id) => ((idx.byId.get(id) || {}).meta || {}).role || '';

  const GUARDS = {
    always: () => true,

    // 补讲：uncertain 先澄清，partial/missing/contradicted 才做误解纠正；notJudged 走 error，不算缺口
    needSupport: (s, p) => !p.systemError && ['partial', 'missing', 'contradicted', 'uncertain'].indexOf(p.status) >= 0,
    // 「我懂了 / 对 / 直接要求通过」不足以凭空增加理解证据：要真有学生原话才算这一处讲清了
    resolved: (s, p) => !p.systemError && p.status === 'met' && (p.criteria || []).some((it) => it && it.status === 'met' && String(it.evidence || '').trim().length >= 2),

    hasGap: (s, p) => !p.systemError && p.status !== 'met',
    // 系统未判定不是学生不会：超时 / 非法 JSON / 未知 ID / 非法状态 / 来源缺失 / 过期结果
    isSystemError: (s, p) => !!p.systemError,
    hasNextDecision: (s, p, c) => nextDecision(s, c) !== null,
    practiceComplete: (s, p, c) => nextDecision(s, c) === null,

    summativePass: (s, p) => !p.systemError && p.status === 'met' && !!p.attempt && p.attempt.passed === true,
    formallyPassed: (s) => s.summativePassed === true,

    // 路由点：按 returnStack 栈顶记的那个活动判断该回哪
    targetIsReading: (s, p, c) => kindAt(c, top(s)) === 'Reading',
    // 从某道题发起的补讲，讲清后回到**那一道题**重答（不自动把题算对）；决策反馈节点也归到同一道题
    targetIsDecision: (s, p, c) => ['Decision', 'DecisionReview'].indexOf(kindAt(c, top(s))) >= 0,
    targetIsFormative: (s, p, c) => kindAt(c, top(s)) === 'Formative',
    targetIsSummative: (s, p, c) => kindAt(c, top(s)) === 'Summative',
    targetIsApply: (s, p, c) => kindAt(c, top(s)) === 'ApplicationReview' && roleOf(c, top(s).returnTo) !== 'original',

    resumeTargetIsFormative: (s, p, c) => kindAt(c, s.undetermined) === 'Formative',
    resumeTargetIsSummative: (s, p, c) => kindAt(c, s.undetermined) === 'Summative',
    resumeTargetIsReading: (s, p, c) => kindAt(c, s.undetermined) === 'Reading',
    resumeTargetIsDecision: (s, p, c) => kindAt(c, s.undetermined) === 'Decision',
    canRetry: (s) => !!s.undetermined,

    hasNextUnit: (s, p, c) => { const e = c.nextUnitEdge(s.currentNodeId); return !!e; },
    routeComplete: (s, p, c) => { const e = c.nextUnitEdge(s.currentNodeId); return !e; },
    chooseContinue: (s, p) => p.choice !== 'learn-more',
    chooseLearnMore: (s, p) => p.choice === 'learn-more',
  };
  function kindAt(c, rec) { return rec ? kindOf(c.idx, rec.returnTo || rec.nodeId || rec) : ''; }
  function nextDecision(s, c) {
    const unit = s.unitId;
    if (!unit) return null;
    const answered = new Set(s.decisionAttempts.map((a) => a.activityId));
    for (let i = 1; i <= 12; i++) {
      const id = `activity:${unit}:decision:${i}`;
      if (!c.idx.byId.has(id)) return null;
      if (!answered.has(id)) return id;
    }
    return null;
  }

  // ── 效果表 ──────────────────────────────────────────────
  const EFFECTS = {
    noop: () => {},

    openTurn: (s, p, c) => {
      s.turns.push({ turnId: `turn:${++s.turnSeq}`, role: 'student', text: p.text || '', at: now(), activityId: s.currentNodeId });
      s.lastTurnId = s.turns[s.turns.length - 1].turnId;
    },
    openAttempt: () => {},

    // 开始一次阅读中费曼：记下这一轮学生原话，并记住讲清后回阅读
    openFormativeTurn: (s, p) => {
      EFFECTS.openTurn(s, p);
      s.returnStack.push({ returnTo: s.currentNodeId, criterionId: p.criterionId || s.focusCriterionId || '', at: now() });
    },

    // 一处没讲清：既记下这次诊断（学生自己的话），也记住"从哪里进补讲"，讲清后按栈顶回到原活动
    recordGapAndReturn: (s, p, c) => {
      mergeEvidence(s, p, c.idx, 'student');
      EFFECTS.pushReturnStack(s, p, c);
    },
    pushReturnStack: (s, p, c) => {
      s.returnStack.push({ returnTo: s.currentNodeId, criterionId: p.criterionId || s.focusCriterionId || '', at: now() });
    },
    popReturnStack: (s) => { s.returnStack.pop(); },

    // 学生的原话才进证据；模型示范与教学材料不算学生的原话证据（任务书 §6.1）
    recordEvidence: (s, p, c) => { mergeEvidence(s, p, c.idx, 'student'); },
    recordAttempt: (s, p, c) => {
      s.decisionAttempts.push({
        attemptId: `attempt:${s.attemptSeq++}`, activityId: p.activityId || s.currentNodeId,
        choice: p.choice, correct: !!p.correct, criterionId: p.criterionId || '',
        verdict: p.status || 'notJudged', at: now(),
      });
      if (p.recorded) mergeEvidence(s, p, c.idx, 'decision');
    },
    recordSummative: (s, p) => {
      const verdicts = p.verdicts || {};
      const ids = Object.keys(verdicts);
      const allMet = ids.length > 0 && ids.every((k) => verdicts[k] === 'met');
      const rec = {
        attemptId: `summative:${s.summativeSeq++}`, at: now(), unitId: s.unitId,
        verdicts, passed: allMet, note: p.note || '',
      };
      s.summativeAttempts.push(rec);
      // 章末验收是**独立**记录：它自己重判一遍，不把即时反馈直接搬成通过
      s.summativePassed = allMet;
      for (const k of ids) {
        s.evidenceByCriterion[k] = {
          status: verdicts[k], evidence: (p.quotes || {})[k] || '', source: 'summative',
          turnId: s.lastTurnId || '', version: CRITERIA_VERSION, at: now(), attemptId: rec.attemptId,
        };
      }
      s.summative = rec;
    },
    markUnitPass: (s) => { s.unitPassed[s.unitId] = true; },
    markUnitAdvance: (s, p, c) => {
      const e = c.nextUnitEdge(s.currentNodeId);
      if (!e) return;
      const uid = (c.idx.byId.get(e.to) || {}).meta.unitId;
      s.unitPassed[s.unitId] = true;
      s.currentUnitOrder = (c.idx.byId.get(e.to) || {}).meta.order;
      s.unitId = uid;
      s.focusCriterionId = null;
    },
    appendRecord: (s) => { s.records.push({ at: now(), nodeId: s.currentNodeId, note: '记录本次位置与证据' }); },
    saveCheckpoint: (s) => {
      s.checkpoint = { nodeId: s.currentNodeId, at: now(), unitId: s.unitId, returnStack: JSON.parse(JSON.stringify(s.returnStack)), draft: JSON.parse(JSON.stringify(s.draft)) };
      s.paused = true;
    },
    markNotJudged: (s, p) => {
      s.undetermined = s.currentNodeId;
      s.notJudged.push({ at: now(), nodeId: s.currentNodeId, reason: p.reason || p.systemError || 'unknown', detail: p.detail || '' });
    },
    clearUndetermined: () => {},
  };

  // ── 证据合并（任务书 §6.1 的九条规则）──────────────────────
  function mergeEvidence(s, p, idx, source) {
    if (p.systemError || SYSTEM_ERRORS.indexOf(p.systemError) >= 0) return;   // 异常不是学生不会
    if (p.source && p.source !== 'student') return;                            // 模型/材料不能当学生原话
    const list = p.criteria || (p.criterionId ? [{ id: p.criterionId, status: p.status, evidence: p.evidence }] : []);
    for (const item of list) {
      if (!item || !item.id) continue;
      if (!idx.byId.has(`criterion:${item.id}`) && !idx.byId.has(item.id)) {
        s.notJudged.push({ at: now(), nodeId: s.currentNodeId, reason: 'unknown-id', detail: `判据 ${item.id} 不在图里` });
        continue;
      }
      const cid = item.id;
      const prev = s.evidenceByCriterion[cid];
      const next = { status: item.status, evidence: item.evidence || '', source, turnId: s.lastTurnId || '', version: CRITERIA_VERSION, at: now() };
      if (prev) {
        // 新回答没提旧判据：保留旧证据，不新增 missing
        if (item.met === false || item.status === 'missing') {
          if (prev.status === 'met' && item.status === 'missing') {
            s.kept.push({ cid, at: now(), why: '新回答没有重述这条，保留旧证据，不记成新的缺口' });
            continue;
          }
        }
        // 新回答明确推翻旧关系：记冲突并重新核对
        if (item.status === 'contradicted' && prev.status === 'met') {
          next.previous = { status: prev.status, evidence: prev.evidence, at: prev.at };
          next.conflictAt = now();
        }
      }
      s.evidenceByCriterion[cid] = next;
    }
  }

  // ── 会话 ────────────────────────────────────────────────
  function createSession(opts) {
    const graph = opts.graph;
    if (!graph || !graph.nodes) throw new Error('createSession 需要 graph');
    const idx = index(graph);
    const entryNode = resolveEntry(idx, opts.entry);
    if (!entryNode) throw new Error(`入口不在图里：${JSON.stringify(opts.entry)}`);

    const unitKey = (entryNode.meta && entryNode.meta.unitId) || (entryNode.kind === 'Unit' ? entryNode.id : '');
    const unitNode = unitKey ? idx.byId.get(unitKey.startsWith('unit:') ? unitKey : 'unit:' + unitKey) : null;
    const unitMeta = (unitNode && unitNode.meta) || {};
    const state = {
      sessionId: `session:${opts.sessionId || Date.now().toString(36)}`,
      scope: 'local',
      graphVersion: graph.version, materialVersion: (graph.builtAt || '').slice(0, 10), criteriaVersion: CRITERIA_VERSION, skillVersion: VERSION,
      originalProblemId: '', goalId: '', routeId: unitMeta.routeId || (entryNode.meta && entryNode.meta.routeId) || '',
      routeStepId: unitMeta.routeId && unitMeta.order ? `routestep:${unitMeta.routeId}:${unitMeta.order}` : '', unitId: unitKey || '',
      currentNodeId: entryNode.id, phase: 'learning', focusCriterionId: null,
      returnStack: [],
      turns: [], turnSeq: 0, lastTurnId: '',
      evidenceByCriterion: {}, kept: [], notJudged: [],
      decisionAttempts: [], summativeAttempts: [], attemptSeq: 0, summativeSeq: 0,
      draft: {}, inputVersion: 0, requestId: null, checkpoint: null, paused: false, undetermined: null,
      unitPassed: {}, summativePassed: false, summative: null, records: [],
      modelMode: opts.modelMode || 'fixed',
    };
    // 入口如果在路线上，就把原问题与目标接上（回看原问题用）
    const route = state.routeId;
    if (route) {
      state.originalProblemId = `problem:${route}`;
      state.goalId = `goal:${route}`;
      const steps = (graph.edges || []).filter((e) => e.kind === 'curriculum' && e.relation === 'has-step' && e.from === `route:${route}`);
      const hit = steps.find((e) => (idx.byId.get(e.to) || {}).meta && idx.byId.get(e.to).meta.conceptId && idx.byId.has(entryNode.id) &&
        (idx.byId.get(entryNode.id).meta || {}).order === idx.byId.get(e.to).meta.order);
      if (hit) state.routeStepId = hit.to;
    }
    if (opts.entry && opts.entry.routeStepId) state.routeStepId = opts.entry.routeStepId;

    const log = [];
    const session = {
      state, log, idx, version: VERSION,
      current() {
        const n = idx.byId.get(state.currentNodeId) || null;
        return {
          nodeId: state.currentNodeId, node: n, kind: n ? n.kind : '', activityKind: n ? n.kind : '',
          prompt: promptOf(n, state),
        };
      },
      allowed() {
        return (idx.transOut.get(state.currentNodeId) || []).map((e) => ({
          event: e.event, to: routeTarget(session, e), guard: e.guard, effect: e.effect,
          label: e.label, edgeId: e.id,
        }));
      },
      fire(event, payload) {
        payload = normalize(state, payload || {}, idx);
        const cands = (idx.transOut.get(state.currentNodeId) || []).filter((e) => e.event === event);
        if (!cands.length) return fail(`当前活动 ${state.currentNodeId} 上没有注册事件 ${event}`);
        for (const e of cands) {
          const g = GUARDS[e.guard];
          if (!g) { noteNotJudged(state, 'unknown-guard', `${e.guard} @ ${e.id}`); return fail(`守卫 ${e.guard} 未注册（已记系统未判定，不静默通过）`); }
          let pass = false;
          try { pass = !!g(state, payload, session); } catch (err) { noteNotJudged(state, 'illegal-state', String(err && err.message || err)); return fail(`守卫 ${e.guard} 求值出错：${err && err.message}`); }
          if (!pass) continue;
          const eff = EFFECTS[e.effect];
          if (!eff) { noteNotJudged(state, 'unknown-effect', `${e.effect} @ ${e.id}`); return fail(`效果 ${e.effect} 未注册（已记系统未判定，不静默通过）`); }
          const from = state.currentNodeId;
          // 路由点的落点必须先算：popReturnStack 之类的效果会改掉 returnStack，落点靠的就是它
          const to = routeTarget(session, e);
          try { eff(state, payload, session); } catch (err) { noteNotJudged(state, 'illegal-state', String(err && err.message || err)); return fail(`效果 ${e.effect} 执行出错：${err && err.message}`); }
          state.currentNodeId = to;
          if (payload.text && payload.role !== 'model') { state.lastTurnId = state.turns.length ? state.turns[state.turns.length - 1].turnId : ''; }
          log.push({ seq: log.length + 1, at: now(), event, from, to, guard: e.guard, effect: e.effect, edgeId: e.id, note: e.label });
          state.inputVersion++;
          return { ok: true, to, from, edgeId: e.id, guard: e.guard, effect: e.effect, label: e.label };
        }
        return fail(`事件 ${event} 没有任何守卫通过（当前活动 ${state.currentNodeId}）`);
      },
      pause() { const r = session.fire('pause', {}); state.paused = true; return r; },
      resume(checkpoint) {
        if (checkpoint) state.checkpoint = checkpoint;
        if (!state.checkpoint) return { ok: false, reason: '没有保存过检查点，无法恢复' };
        state.currentNodeId = state.checkpoint.nodeId;
        state.returnStack = JSON.parse(JSON.stringify(state.checkpoint.returnStack || []));
        state.draft = JSON.parse(JSON.stringify(state.checkpoint.draft || {}));
        state.paused = false;
        log.push({ seq: log.length + 1, at: now(), event: 'resume', from: '', to: state.currentNodeId, guard: 'restoreCheckpoint', effect: 'restoreCheckpoint', edgeId: '', note: '恢复到保存的原节点' });
        return { ok: true, to: state.currentNodeId };
      },
      /** 链路面板：本次回答 → 核对了哪项理解 → 用哪段材料补讲 → 为何走这条边 → 回到哪 / 存了什么 */
      trace() {
        const n = idx.byId.get(state.currentNodeId) || {};
        const cid = state.focusCriterionId;
        const mats = (idx.materials.get(`criterion:${cid}`) || []).map((id) => idx.byId.get(id)).filter(Boolean);
        const lastTurn = state.turns.filter((t) => t.role === 'student').slice(-1)[0] || null;
        const lastEdge = log.slice(-1)[0] || null;
        const ev = cid ? state.evidenceByCriterion[cid] : null;
        const rec = state.records.slice(-1)[0] || null;
        return {
          empty: log.length === 0 && state.turns.length === 0,
          modelMode: state.modelMode,
          answer: lastTurn ? { turnId: lastTurn.turnId, text: lastTurn.text, at: lastTurn.at } : null,
          checked: cid ? {
            criterionId: cid, node: idx.byId.get(`criterion:${cid}`) || null,
            status: ev ? ev.status : 'notJudged', evidence: ev ? ev.evidence : '',
            source: ev ? ev.source : '', at: ev ? ev.at : '',
            conflict: ev && ev.conflictAt ? { at: ev.conflictAt, previous: ev.previous } : null,
          } : null,
          material: mats.map((m) => ({ id: m.id, label: m.label, text: (m.meta || {}).text || '', sourceRefs: m.sourceRefs, reviewState: '' })),
          edge: lastEdge ? { event: lastEdge.event, from: lastEdge.from, to: lastEdge.to, guard: lastEdge.guard, effect: lastEdge.effect, why: lastEdge.note } : null,
          returnedTo: state.returnStack.length ? state.returnStack[state.returnStack.length - 1] : null,
          saved: rec ? { at: rec.at, nodeId: rec.nodeId, note: rec.note } : null,
          currentNode: { id: n.id, label: n.label, kind: n.kind },
          notJudged: state.notJudged,
          kept: state.kept,
        };
      },
      snapshot() { return JSON.stringify({ state, log }); },
      restore(str) {
        const o = typeof str === 'string' ? JSON.parse(str) : str;
        Object.assign(state, o.state);
        log.length = 0; for (const l of o.log || []) log.push(l);
        return true;
      },
      /** 运行期把会话节点挂回图上（图与程序一致：显示的节点就是真实事件日志里的节点） */
      runtimeNodes() {
        const ns = [];
        for (const t of state.turns) ns.push({ id: t.turnId, kind: 'Turn', layer: 'runtime', label: t.text.slice(0, 40), sub: t.role, scope: 'personal', status: 'ready', statusReason: '', sourceRefs: [], meta: { activityId: t.activityId, at: t.at } });
        for (const [cid, e] of Object.entries(state.evidenceByCriterion)) ns.push({ id: `evidence:${cid}`, kind: 'Evidence', layer: 'runtime', label: `${cid} · ${e.status}`, sub: e.source, scope: 'personal', status: 'ready', statusReason: '', sourceRefs: [], meta: e });
        for (const a of state.decisionAttempts) ns.push({ id: a.attemptId, kind: 'Attempt', layer: 'runtime', label: `${a.activityId} · ${a.correct ? '对' : '错'}`, sub: a.verdict, scope: 'personal', status: 'ready', statusReason: '', sourceRefs: [], meta: a });
        for (const a of state.summativeAttempts) ns.push({ id: a.attemptId, kind: 'AssessmentRecord', layer: 'runtime', label: `章末验收 · ${a.passed ? '通过' : '未通过'}`, sub: a.unitId, scope: 'personal', status: 'ready', statusReason: '', sourceRefs: [], meta: a });
        if (state.checkpoint) ns.push({ id: 'checkpoint:last', kind: 'Checkpoint', layer: 'runtime', label: '暂停点', sub: state.checkpoint.nodeId, scope: 'personal', status: 'ready', statusReason: '', sourceRefs: [], meta: state.checkpoint });
        ns.push({ id: state.sessionId, kind: 'Session', layer: 'runtime', label: '本次会话', sub: state.unitId, scope: 'personal', status: 'ready', statusReason: '', sourceRefs: [], meta: { currentNodeId: state.currentNodeId, modelMode: state.modelMode } });
        return ns;
      },
      nextUnitEdge(from) { return session.nextUnitEdge(from); },
      setFocus(cid) { state.focusCriterionId = cid; return cid; },
    };
    session.nextUnitEdge = (from) => {
      const adv = (idx.transOut.get(from) || [])[0];
      // 通过 advance 节点找下一单元
      const advNode = idx.byId.get(from);
      if (advNode && (advNode.meta || {}).role === 'advance') {
        return (idx.transOut.get(from) || []).find((e) => e.guard === 'hasNextUnit') || null;
      }
      // 从活动找它所属单元的 advance 节点
      const unit = (advNode && advNode.meta && advNode.meta.unitId) || state.unitId;
      const advId = `activity:unit:${unit}:advance`;
      if (!idx.byId.has(advId)) return null;
      return (idx.transOut.get(advId) || []).find((e) => e.guard === 'hasNextUnit') || null;
    };
    return session;
  }

  function resolveEntry(idx, entry) {
    if (!entry) return null;
    if (typeof entry === 'string') return idx.byId.get(entry) || null;
    if (entry.nodeId) return idx.byId.get(entry.nodeId) || null;
    if (entry.ref) return idx.byId.get(entry.ref) || null;
    if (entry.kind === 'unit' && entry.unitId) return idx.byId.get(`unit:${entry.unitId}`) || null;
    return null;
  }

  /** 路由点：真实的落点由记录决定，不是边上写的那个代表性目标（任务书 §5.1）。 */
  function routeTarget(session, e) {
    const s = session.state, idx = session.idx;
    if (/^targetIs/.test(e.guard)) {
      const t = s.returnStack.length ? s.returnStack[s.returnStack.length - 1] : null;
      if (!t) return e.to;
      // review:N 是那道题的反馈节点，回题要回 decision:N
      return /^activity:.+:review:\d+$/.test(t.returnTo) ? t.returnTo.replace(':review:', ':decision:') : t.returnTo;
    }
    if (/^resumeTargetIs/.test(e.guard)) return s.undetermined || e.to;
    if (e.guard === 'hasNextUnit') {
      const ne = session.nextUnitEdge(e.from);
      return ne ? ne.to : e.to;
    }
    return e.to;
  }

  function promptOf(n, s) {
    if (!n) return '';
    const m = n.meta || {};
    if (n.kind === 'Formative') return '用你自己的话说一遍这一段：它在讲什么关系？';
    if (n.kind === 'Summative') return '章末验收：把这章要求的几件事一次讲清。';
    if (n.kind === 'Support') return m.role === 'router' ? '回到发起补讲的地方。' : '只回答刚才那一处。';
    if (n.kind === 'Decision') return m.prompt || '先选一个，再看依据。';
    if (n.kind === 'Reading') return '读完这一段，可以随时点「费曼一下」。';
    return n.label;
  }

  /** 任务书 §6.4：超时、非法 JSON、重复或未知 ID、非法状态、来源缺失、过期结果，一律先归到系统未判定。 */
  function normalize(state, p, idx) {
    if (p.systemError && SYSTEM_ERRORS.indexOf(p.systemError) < 0) p.systemError = 'illegal-state';
    if (p.stale === true) p.systemError = 'stale-result';
    // 只表态（我懂了 / 对 / 要求通过）＝证据不足，按 uncertain 先澄清，不当作讲对
    if (p.insufficient === true) { p.status = 'uncertain'; p.clarifyOnly = true; }
    // 说成 met 却拿不出学生原话 = 证据不足，先澄清，不当作讲对
    // 只对**带判据的核对**做这一条：reviewed 之类只报结果的载荷不该被当成"拿不出原话"
    const isEval = Array.isArray(p.criteria) || !!p.criterionId;
    if (!p.systemError && p.status === 'met' && isEval) {
      const real = (p.criteria || []).some((it) => it && it.status === 'met' && String(it.evidence || '').trim().length >= 2);
      if (!real) { p.status = 'uncertain'; p.clarifyOnly = true; p.insufficient = true; }
    }
    if (!p.systemError && p.status && ['met', 'partial', 'missing', 'contradicted', 'uncertain'].indexOf(p.status) < 0) p.systemError = 'illegal-state';
    if (!p.systemError) {
      const bad = (p.criteria || []).find((it) => it && it.id && !idx.byId.has(`criterion:${it.id}`) && !idx.byId.has(it.id));
      if (bad) p.systemError = 'unknown-id';
    }
    return p;
  }

  function noteNotJudged(s, reason, detail) {
    s.notJudged.push({ at: now(), nodeId: s.currentNodeId, reason, detail: String(detail || '') });
  }
  function fail(reason) { return { ok: false, reason, notJudged: true }; }
  function now() { return new Date().toISOString(); }

  return { VERSION, CRITERIA_VERSION, SYSTEM_ERRORS, createSession, index, GUARDS, EFFECTS, _nextDecision: nextDecision };
});
