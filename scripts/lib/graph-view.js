/* ══════════════════════════════════════════════════════════════════════════════
   知所栖 135 · 总图视图（graph-view.js）

   契约：docs/总图视图契约-20260914.md（冻结）。本文件只读契约 §6 白名单里的字段。

   为什么这样分层（不是随手拆的）：
     1) 读取层（readNode / readEdge / readStats …）：只此一处接触原始 graph。
        白名单是硬边界，把它收进一个函数，越界就只可能越在这一处，回归时逐行可查。
     2) 索引层（buildIndex）：一次性把 nodes/edges 折成 Map 形态（byId/出边/入边/layer→kind）。
        999 概念 + 边的量级下，边点边扫全表会让"点一个层"都卡；索引算一次，之后 O(1) 查。
     3) 纯函数层（_filterNodes / _counts / _layerSummaries / _edgeLayerSummary / _routeModel /
        _traceSegments）：不碰 DOM，可被 node 直接断言。搜索、筛选、聚合口径都住在这里，
        渲染层不许再算第二遍，避免"表头数字"和"列表内容"各算各的对不上。
     4) 渲染层（renderMap / renderRoute / renderTrace）：只吃索引 + 视图状态，产出 DOM。
        全部经 h()/textContent 建节点，没有一处 innerHTML —— 真实数据（节点 label 等）
        不以字符串拼接进 HTML，转义问题从"记得转义"变成"结构上不可能"。
     5) 状态层（view）：tab、展开、分页、选中、筛选。交互只改状态再重画，
        不就地改 DOM，所以 refresh() 能安全重画任意一次会话变化。

   视图不做任何教学判断（通过／未通过／会不会）。判定只来自 session。
   ══════════════════════════════════════════════════════════════════════════════ */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GRAPH_VIEW = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var VERSION = 'v1';
  var PAGE_SIZE = 80;        // 契约 §7：每页 ≤ 80，带"加载更多"
  var EDGE_PREVIEW = 8;      // 详情面板里每种边先摆几条（"各列几条"），其余折叠

  /* ── 文案 ──────────────────────────────────────────────────────────────── */

  var TAB_TITLE = { map: '系统总图', route: '当前路线', trace: '学习与轨迹' };

  var STATUS_LABEL = { ready: '已就绪', scaffold: '待装配', blocked: '阻塞', missing: '缺口（图中不存在）' };

  // 契约 §2 对 status 的定义，逐条摆到界面上：ready 最容易被误读，单独写死口径。
  var READY_SCOPE_NOTE = '「已就绪」只指该节点所指范围内材料齐、已审核；不代表模型稳定、学习有效或已上线。';
  var STATUS_HINT = {
    ready: READY_SCOPE_NOTE,
    scaffold: '节点存在、有出处，但缺配对／缺判据／缺材料——保留节点并显示 statusReason。',
    blocked: '外部条件缺失（源文件不在／原始材料未提供）。',
    missing: '图里应当有这个节点但实际不存在；只出现在 gaps[]，不作为节点。'
  };

  var REVIEW_LABEL = {
    'owner-confirmed': '已由负责人确认',
    curated: '已策展',
    sourced: '有出处',
    unreviewed: '候选／未核实'
  };
  var REVIEW_ORDER = ['owner-confirmed', 'curated', 'sourced', 'unreviewed'];

  var SCOPE_LABEL = { public: '公共', curriculum: '课程', personal: '个人' };

  var EDGE_KIND_LABEL = {
    provenance: '出处', knowledge: '知识', curriculum: '课程编排',
    weak: '弱相关', transition: '状态转移'
  };

  // 层顺序兜底：只在 graph.layers 缺失时用，取自契约 §1 的层表。
  var LAYER_FALLBACK = [
    { id: 'source', label: '材料与出处', order: 1 },
    { id: 'semantics', label: '五类语义', order: 2 },
    { id: 'knowledge', label: '公共知识与关系', order: 3 },
    { id: 'curriculum', label: '问题与课程编排', order: 4 },
    { id: 'activity', label: '学习活动', order: 5 },
    { id: 'runtime', label: '运行与记录', order: 6 },
    { id: 'ai', label: '模型与规则', order: 7 }
  ];

  // 契约 §6 meta 白名单，按 kind 分组。readMeta 之外的 meta 字段一律不读。
  var META_FIELDS = {
    SemanticUnit: ['unitType', 'sourceDocuments', 'themes', 'keywords', 'title'],
    Concept: ['name', 'nameEn', 'aliases', 'domain', 'description', 'feynman', 'evidence', 'difficulty', 'stage', 'verification'],
    Topic: ['label', 'question', 'topicCount'],
    SourceDocument: ['title', 'author', 'url', 'docType', 'issue', 'slug'],
    SourceSpan: ['title', 'author', 'url', 'docType', 'issue', 'slug'],
    DerivedAsset: ['assetType', 'slug'],
    FiveDimAsset: ['slug', 'hasConcepts', 'hasReading', 'hasDecisions', 'hasExperiments', 'hasFeynman'],
    Route: ['routeId', 'title', 'why', 'prereq', 'fallback', 'order'],
    RouteStep: ['routeId', 'title', 'why', 'prereq', 'fallback', 'order'],
    Unit: ['unitId', 'title', 'routeId', 'order', 'questionCount', 'criterionCount'],
    Criterion: ['criterion', 'condition', 'keywords', 'misconception', 'teachingAction', 'materialCount'],
    Reading: ['label', 'index'],
    Decision: ['label', 'index'],
    Summative: ['label', 'index'],
    Formative: ['label', 'index']
  };

  /* ── 小工具 ────────────────────────────────────────────────────────────── */

  function isObj(v) { return !!v && typeof v === 'object'; }
  function s(v) { return typeof v === 'string' ? v : (typeof v === 'number' ? String(v) : ''); }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function num(v, d) { return (typeof v === 'number' && isFinite(v)) ? v : d; }
  function hasDom() {
    return typeof document !== 'undefined' && !!document && typeof document.createElement === 'function';
  }
  function esc(sel) { return String(sel).replace(/[^a-zA-Z0-9_-]/g, '_'); }

  // 安全取值：白名单字段可能是字符串/数字/数组/对象，一律变成"文本"，
  // 最终由 textContent 落 DOM —— 不经过 HTML 解析，标签与引号都只是字符。
  function plain(v) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'string') return v;
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (Array.isArray(v)) return v.map(plain).filter(Boolean).join('、');
    try { return JSON.stringify(v); } catch (e) { return '[无法显示的字段]'; }
  }

  // 宿主回调一律隔离：宿主抛错不该把整个视图画崩。
  function safeCall(fn, args, what) {
    if (typeof fn !== 'function') return false;
    try { fn.apply(null, args); return true; }
    catch (e) {
      if (typeof console !== 'undefined' && console.error) console.error('[总图视图] ' + what + ' 回调抛错：', e);
      return false;
    }
  }

  /* ── 1. 读取层：契约 §6 白名单是硬边界 ─────────────────────────────────── */

  function readRefs(v) {
    var out = [], i, r;
    for (i = 0; i < arr(v).length; i++) {
      r = arr(v)[i];
      if (!isObj(r)) continue;
      out.push({ path: s(r.path), locator: s(r.locator) });
    }
    return out;
  }

  function readRunnable(r) {
    if (!isObj(r)) return null;
    return { kind: s(r.kind), ref: s(r.ref), entry: s(r.entry) };
  }

  function readMeta(kind, meta) {
    var fields = META_FIELDS[kind], out = {}, i, k;
    if (!fields || !isObj(meta)) return out;
    for (i = 0; i < fields.length; i++) {
      k = fields[i];
      if (Object.prototype.hasOwnProperty.call(meta, k) && meta[k] !== null && meta[k] !== undefined) out[k] = meta[k];
    }
    return out;
  }

  function readNode(n) {
    if (!isObj(n)) return null;
    var kind = s(n.kind);
    return {
      id: s(n.id), kind: kind, layer: s(n.layer), label: s(n.label), sub: s(n.sub),
      scope: s(n.scope), status: s(n.status), statusReason: s(n.statusReason),
      version: s(n.version), sourceRefs: readRefs(n.sourceRefs),
      runnable: readRunnable(n.runnable), meta: readMeta(kind, n.meta)
    };
  }

  function readEdge(e) {
    if (!isObj(e)) return null;
    var out = {
      id: s(e.id), kind: s(e.kind), relation: s(e.relation), from: s(e.from), to: s(e.to),
      label: s(e.label), reviewState: s(e.reviewState), sourceRefs: readRefs(e.sourceRefs)
    };
    if (out.kind === 'transition') {   // 只有 transition 边有这三个字段（契约 §3）
      out.event = s(e.event); out.guard = s(e.guard); out.effect = s(e.effect);
    }
    return out;
  }

  function readLayers(v) {
    var list = arr(v).map(function (l) {
      return { id: s(l && l.id), label: s(l && l.label), order: num(l && l.order, 999), count: num(l && l.count, -1) };
    }).filter(function (l) { return !!l.id; });
    if (!list.length) list = LAYER_FALLBACK.map(function (l) { return { id: l.id, label: l.label, order: l.order, count: -1 }; });
    list.sort(function (a, b) { return a.order - b.order; });
    return list;
  }

  function countMap(v) {
    var out = {}, k;
    if (!isObj(v)) return out;
    for (k in v) if (Object.prototype.hasOwnProperty.call(v, k) && typeof v[k] === 'number') out[k] = v[k];
    return out;
  }

  function readStats(v) {
    var g = isObj(v) ? v : {};
    return {
      nodes: num(g.nodes, -1), edges: num(g.edges, -1), indexed: num(g.indexed, -1),
      pendingAssembly: num(g.pendingAssembly, -1), blocked: num(g.blocked, -1),
      byKind: countMap(g.byKind), byEdgeKind: countMap(g.byEdgeKind),
      byStatus: countMap(g.byStatus), byReviewState: countMap(g.byReviewState)
    };
  }

  function readGap(g) {
    if (!isObj(g)) return null;
    return {
      id: s(g.id), kind: s(g.kind), layer: s(g.layer), label: s(g.label),
      why: s(g.why), where: s(g.where), affects: arr(g.affects).map(s)
    };
  }

  /* ── 2. 索引层 ─────────────────────────────────────────────────────────── */

  function isIndex(x) { return isObj(x) && x.__gvIndex === true; }

  function buildIndex(graph) {
    if (isIndex(graph)) return graph;
    var g = isObj(graph) ? graph : {};
    var nodes = arr(g.nodes).map(readNode).filter(Boolean);
    var edges = arr(g.edges).map(readEdge).filter(Boolean);
    var rawById = {}, i, n, e, id;

    for (i = 0; i < arr(g.nodes).length; i++) {
      n = arr(g.nodes)[i];
      if (isObj(n) && s(n.id)) rawById[s(n.id)] = n;   // 只用于回传宿主，不参与渲染
    }

    var idx = {
      __gvIndex: true,
      layers: readLayers(g.layers),
      nodes: nodes, edges: edges,
      rawById: rawById,
      byId: {}, layerNodes: {}, kindNodes: {}, statusNodes: {}, kindOfLayer: {},
      outEdges: {}, inEdges: {}, nodeReview: {},
      stats: readStats(g.stats),
      coverage: isObj(g.coverage) ? { fullIndex: plain(g.coverage.fullIndex), playable: plain(g.coverage.playable) } : null,
      gaps: arr(g.gaps).map(readGap).filter(Boolean)
    };

    for (i = 0; i < nodes.length; i++) {
      n = nodes[i]; id = n.id;
      idx.byId[id] = n;
      (idx.layerNodes[n.layer] = idx.layerNodes[n.layer] || []).push(n);
      (idx.kindNodes[n.kind] = idx.kindNodes[n.kind] || []).push(n);
      (idx.statusNodes[n.status] = idx.statusNodes[n.status] || []).push(n);
      idx.kindOfLayer[n.layer] = idx.kindOfLayer[n.layer] || {};
      idx.kindOfLayer[n.layer][n.kind] = (idx.kindOfLayer[n.layer][n.kind] || 0) + 1;
      idx.outEdges[id] = []; idx.inEdges[id] = []; idx.nodeReview[id] = {};
    }

    for (i = 0; i < edges.length; i++) {
      e = edges[i];
      if (idx.outEdges[e.from]) idx.outEdges[e.from].push(e);
      if (idx.inEdges[e.to]) idx.inEdges[e.to].push(e);
      // 契约没给 node.reviewState；reviewState 筛选按"该节点参与的边里有这个 reviewState"解释。
      if (e.reviewState) {
        if (idx.nodeReview[e.from]) idx.nodeReview[e.from][e.reviewState] = true;
        if (idx.nodeReview[e.to]) idx.nodeReview[e.to][e.reviewState] = true;
      }
    }

    // 层表里可能有一层此刻没有节点，也要出卡（契约要求 7 层各一张）。
    idx.layerIds = idx.layers.map(function (l) { return l.id; });
    for (i = 0; i < nodes.length; i++) if (idx.layerIds.indexOf(nodes[i].layer) < 0) idx.layerIds.push(nodes[i].layer);
    return idx;
  }

  /* ── 3. 纯函数层：搜索 / 筛选 / 聚合（可被 node 直接断言） ──────────────── */

  function normalizeQuery(q) {
    if (typeof q === 'string') q = { q: q };
    q = isObj(q) ? q : {};
    return {
      q: s(q.q || q.search || q.text).trim().toLowerCase(),
      layer: s(q.layer), kind: s(q.kind), status: s(q.status), reviewState: s(q.reviewState)
    };
  }

  function queryActive(q) { return !!(q.q || q.layer || q.kind || q.status || q.reviewState); }

  function matchNode(n, q, idx) {
    if (q.q) {
      var hay = (n.label + ' ' + n.sub + ' ' + n.id).toLowerCase();
      if (hay.indexOf(q.q) < 0) return false;
    }
    if (q.layer && n.layer !== q.layer) return false;
    if (q.kind && n.kind !== q.kind) return false;
    if (q.status && n.status !== q.status) return false;
    if (q.reviewState && !(idx.nodeReview[n.id] && idx.nodeReview[n.id][q.reviewState])) return false;
    return true;
  }

  function _filterNodes(graphOrIndex, query) {
    var idx = buildIndex(graphOrIndex), q = normalizeQuery(query), out = [], i;
    for (i = 0; i < idx.nodes.length; i++) if (matchNode(idx.nodes[i], q, idx)) out.push(idx.nodes[i]);
    return out;
  }

  // 顶部那三个数：全部索引 / 当前可见 / 待装配。
  // 全部索引与待装配以 graph.stats 为准（那是构建期的口径），stats 缺了才退回数节点——
  // 视图不另立口径，否则同一屏会出现两个"总数"。
  function _counts(graphOrIndex, query) {
    var idx = buildIndex(graphOrIndex), q = normalizeQuery(query);
    var visible = _filterNodes(idx, q);
    var total = idx.stats.indexed >= 0 ? idx.stats.indexed : idx.nodes.length;
    var pending = idx.stats.pendingAssembly >= 0
      ? idx.stats.pendingAssembly
      : (num(idx.stats.byStatus.scaffold, -1) >= 0 ? idx.stats.byStatus.scaffold : (idx.statusNodes.scaffold || []).length);
    var blocked = idx.stats.blocked >= 0
      ? idx.stats.blocked
      : (idx.statusNodes.blocked || []).length;
    return {
      indexed: total, total: total, visible: visible.length,
      pending: pending, blocked: blocked,
      nodes: visible, active: queryActive(q), query: q
    };
  }

  // 每层：节点数 + 待装配/阻塞（层卡上的三个数）。
  function _layerSummaries(graphOrIndex) {
    var idx = buildIndex(graphOrIndex);
    return idx.layerIds.map(function (lid) {
      var layer = null, i;
      for (i = 0; i < idx.layers.length; i++) if (idx.layers[i].id === lid) layer = idx.layers[i];
      var ns = idx.layerNodes[lid] || [];
      var pending = 0, blocked = 0;
      for (i = 0; i < ns.length; i++) {
        if (ns[i].status === 'scaffold') pending++;
        else if (ns[i].status === 'blocked') blocked++;
      }
      return {
        id: lid,
        label: layer ? layer.label : lid,
        order: layer ? layer.order : 999,
        total: ns.length, pending: pending, blocked: blocked,
        kinds: Object.keys(idx.kindOfLayer[lid] || {}).sort().map(function (k) {
          return { kind: k, count: idx.kindOfLayer[lid][k] };
        })
      };
    });
  }

  // 层到层靠哪种边连、各多少条：从 graph.edges 现算，并按 edge.kind 分开计。
  // 契约允许直接用 stats.byEdgeKind；但同时要"哪层到哪层"，所以两种口径都摆出来，
  // 一个回答"总共多少条这种边"，一个回答"层与层之间靠什么连"。
  function _edgeLayerSummary(graphOrIndex) {
    var idx = buildIndex(graphOrIndex), pairs = {}, order = [], i, e, a, b, key;
    for (i = 0; i < idx.edges.length; i++) {
      e = idx.edges[i];
      a = idx.byId[e.from] ? idx.byId[e.from].layer : '';
      b = idx.byId[e.to] ? idx.byId[e.to].layer : '';
      key = a + '\u0000' + b;
      if (!pairs[key]) { pairs[key] = { from: a, to: b, kinds: {}, total: 0, unreviewed: 0 }; order.push(key); }
      var k = e.kind || '(未标 kind)';
      pairs[key].kinds[k] = (pairs[key].kinds[k] || 0) + 1;
      pairs[key].total++;
      if (e.reviewState === 'unreviewed') pairs[key].unreviewed++;
    }
    var rows = order.map(function (k) { return pairs[k]; });
    rows.sort(function (x, y) { return y.total - x.total; });
    var totals = Object.keys(idx.stats.byEdgeKind).sort().map(function (k) {
      return { kind: k, count: idx.stats.byEdgeKind[k] };
    });
    return { rows: rows, totals: totals, computedTotal: idx.edges.length };
  }

  function isFixtureRoute(route) {
    // 契约 §9.2：夹具标记 = Route.meta.curator === 'fixture'（id / label 里也带着，meta 优先）。
    // 原注（保留）：契约 §6 的 Route.meta 白名单里
    // 没有"这是开发夹具"的字段，所以只能按 id/label/title 里的关键字识别；
    // 命中即显著标注，命中不了就不标——不替数据猜。
    // meta.curator 优先（契约 §9.2 冻结），没有才退回关键字；命中不了就不标，不替数据猜。
    if (String(route.meta.curator || '') === 'fixture') return true;
    var hay = [route.id, route.label, route.sub, route.meta.title, route.meta.routeId].join(' ');
    return /fixture|夹具|dev[-_]|mock|sample[-_]?route/i.test(hay);
  }

  function readSessionState(session) {
    try { return (isObj(session) && isObj(session.state)) ? session.state : {}; }
    catch (e) { return {}; }
  }

  function readCurrent(session) {
    try { return (isObj(session) && typeof session.current === 'function') ? session.current() : null; }
    catch (e) { return null; }
  }

  // 路线模型：Route → RouteStep(order) → Unit，加"被多个 RouteStep 引用的共享概念"。
  // 关系一律走边；边里没有的（例如 step 与 route 之间没建 has-step），才退回 meta.routeId 归拢。
  function _routeModel(graphOrIndex, session) {
    var idx = buildIndex(graphOrIndex);
    var state = readSessionState(session);
    var cur = readCurrent(session);
    var curStepId = s(state.routeStepId) || s(cur && cur.nodeId);
    var routes = idx.kindNodes.Route || [];

    return routes.map(function (route) {
      var steps = [], seen = {}, i, j, e, step, unit, cid;

      // 1) 先收 RouteStep：优先 has-step 出边，其次 meta.routeId 相同者。
      var stepIds = [];
      var outs = idx.outEdges[route.id] || [];
      for (i = 0; i < outs.length; i++) {
        if (outs[i].relation === 'has-step' && idx.byId[outs[i].to] && idx.byId[outs[i].to].kind === 'RouteStep') stepIds.push(outs[i].to);
      }
      if (!stepIds.length) {
        var allSteps = idx.kindNodes.RouteStep || [];
        for (i = 0; i < allSteps.length; i++) {
          if (route.meta.routeId && allSteps[i].meta.routeId === route.meta.routeId) stepIds.push(allSteps[i].id);
          else if (!route.meta.routeId && allSteps[i].id.indexOf(route.id.replace(/^route:/, 'routestep:')) === 0) stepIds.push(allSteps[i].id);
        }
      }
      stepIds = stepIds.filter(function (id) { if (seen[id]) return false; seen[id] = true; return true; });

      var conceptRefs = {};   // conceptId -> [stepId]
      for (i = 0; i < stepIds.length; i++) {
        step = idx.byId[stepIds[i]];
        if (!step) continue;
        var units = [], knowledge = [], targets = [], o = idx.outEdges[step.id] || [];
        for (j = 0; j < o.length; j++) {
          e = o[j];
          var peer = idx.byId[e.to];
          if (peer && peer.kind === 'Unit') units.push({ edge: e, unit: peer });
          if (peer && peer.kind === 'Concept') {
            (conceptRefs[peer.id] = conceptRefs[peer.id] || []).push(step.id);
            targets.push({ edge: e, node: peer });
          }
        }
        var inc = idx.inEdges[step.id] || [];
        for (j = 0; j < inc.length; j++) {
          if (inc[j].kind === 'knowledge') knowledge.push(inc[j]);
        }
        steps.push({
          node: step, order: num(step.meta.order, 999), units: units, knowledge: knowledge, targets: targets,
          // 真库里 why 是字符串、fallback 是对象（{conceptId, reason}），所以两者都保留原值：
          // 用 s() 会让对象变成空串，页面就会谎报"没有 fallback"。
          why: plain(step.meta.why), fallbackText: plain(step.meta.fallback),
          fallbackRaw: step.meta.fallback, isCurrent: step.id === curStepId
        });
      }
      steps.sort(function (a, b) {
        if (a.order !== b.order) return a.order - b.order;
        return a.node.id < b.node.id ? -1 : (a.node.id > b.node.id ? 1 : 0);
      });

      // 2) 关联 Goal：Route 的任一方向边上挂着的 Goal 都算（契约没规定关系名，不猜关系名，只按 kind 认）。
      var goals = [], gseen = {};
      var touch = (idx.outEdges[route.id] || []).concat(idx.inEdges[route.id] || []);
      for (i = 0; i < touch.length; i++) {
        var other = idx.byId[touch[i].from === route.id ? touch[i].to : touch[i].from];
        if (other && other.kind === 'Goal' && !gseen[other.id]) { gseen[other.id] = true; goals.push({ node: other, edge: touch[i], via: 'edge' }); }
      }
      // 真库里 route:<稳定身份> 与 goal:<稳定身份> 用同一个稳定身份（契约 §2 的 id 格式），
      // 但构建器没连 Goal 边——agent-continuous-action-v1 就是这种。按稳定身份补一条，
      // 页面上标清"同名匹配、不是边"，不把推断说成图上存在的事实。
      var identity = route.id.indexOf(':') >= 0 ? route.id.slice(route.id.indexOf(':') + 1) : route.id;
      var goalNodes = idx.kindNodes.Goal || [];
      for (i = 0; i < goalNodes.length; i++) {
        var gn = goalNodes[i];
        if (gseen[gn.id]) continue;
        var gid = gn.id.indexOf(':') >= 0 ? gn.id.slice(gn.id.indexOf(':') + 1) : gn.id;
        if (gid !== identity) continue;
        gseen[gn.id] = true;
        goals.push({ node: gn, edge: null, via: 'identity' });
      }

      // 3) 共享概念：同一个 Concept 被 ≥2 个 RouteStep 引用。
      var shared = [];
      Object.keys(conceptRefs).forEach(function (id2) {
        cid = conceptRefs[id2];
        var uniq = cid.filter(function (v, ix) { return cid.indexOf(v) === ix; });
        if (uniq.length >= 2) shared.push({ concept: idx.byId[id2], steps: uniq });
      });
      shared.sort(function (a, b) { return b.steps.length - a.steps.length; });

      return {
        node: route, title: s(route.meta.title) || route.label || route.id,
        routeId: s(route.meta.routeId), why: s(route.meta.why),
        goals: goals, steps: steps, shared: shared,
        fixture: isFixtureRoute(route),
        currentStepId: steps.some(function (x) { return x.isCurrent; }) ? curStepId : ''
      };
    });
  }

  /* trace()：契约 §5 只写了它是"五段链路"，没冻结字段名。
     【契约缺字段：session.trace() 的返回结构】所以这里既不假设是数组也不假设键名，
     按五段的语义各给一组候选键去探测；探不到就照实说"本段无记录"，
     整个对象认不出来时原样展示 + 注明"契约未冻结字段名"——不编。
     2026-09-14 实测 graph-runner 返回：{ empty, modelMode, answer, checked, material,
     edge:{event,from,to,guard,effect,why}, returnedTo, saved, currentNode, notJudged, kept }，
     下面的候选表按它对齐；认不出的键不会被丢掉，落到"额外字段"里。 */
  var TRACE_SEGMENTS = [
    { key: 'answer', title: '本次回答', probes: ['answer', 'response', 'lastAnswer', 'studentAnswer', 'thisAnswer', 'utterance', 'reply'] },
    { key: 'check', title: '核对了哪项理解', probes: ['checked', 'check', 'criterion', 'criteria', 'understanding', 'checkedCriteria', 'judged'] },
    { key: 'support', title: '用哪段材料补讲', probes: ['material', 'support', 'materials', 'supportMaterial', 'reteach', 'remediation'] },
    { key: 'edge', title: '为何走这条边', probes: ['edge', 'edges', 'transition', 'whyEdge', 'edgeWhy', 'decision'] },
    { key: 'return', title: '回到哪／保存了什么', probes: ['returnedTo', 'returnTo', 'returned', 'saved', 'savedState', 'checkpoint', 'persist', 'snapshot', 'back'] }
  ];

  function _traceSegments(session) {
    var t = null;
    try { t = (isObj(session) && typeof session.trace === 'function') ? session.trace() : null; }
    catch (e) { t = null; }
    if (t === null || t === undefined) return { empty: true, segments: [], raw: null, matched: false, extra: [] };

    var segs = TRACE_SEGMENTS.map(function (d) { return { key: d.key, title: d.title, items: [], empty: true }; });
    var extra = [], matched = false, i, j, k;

    if (Array.isArray(t)) {
      for (i = 0; i < t.length; i++) {
        if (i < segs.length) { segs[i].items.push({ label: '', value: t[i] }); segs[i].empty = false; matched = true; }
        else extra.push({ label: '第 ' + (i + 1) + ' 段', value: t[i] });
      }
    } else if (isObj(t)) {
      // trace() 明确说 empty（会话没跑过）→ 照实写"尚无运行记录"，不要走五段渲染
      if (t.empty === true) return { empty: true, segments: [], raw: t, matched: false, extra: [] };
      var used = {};
      for (i = 0; i < segs.length; i++) {
        for (j = 0; j < TRACE_SEGMENTS[i].probes.length; j++) {
          k = TRACE_SEGMENTS[i].probes[j];
          if (Object.prototype.hasOwnProperty.call(t, k) && t[k] !== null && t[k] !== undefined) {
            segs[i].items.push({ label: TRACE_SEGMENTS[i].probes.length > 1 ? k : '', value: t[k] });
            segs[i].empty = false; matched = true; used[k] = true;
          }
        }
      }
      // 认不出的键一律落到"额外字段"：真 runner 的 notJudged / kept / currentNode
      // 就是这样露出来的——宁可多摆一块，也不把会话里的字段悄悄咽掉。
      Object.keys(t).forEach(function (kk) {
        if (!used[kk]) extra.push({ label: kk, value: t[kk] });
      });
    } else {
      segs[0].items.push({ label: '', value: t }); segs[0].empty = false; matched = true;
    }

    var any = segs.some(function (x) { return !x.empty; });
    return { empty: !any && !extra.length, segments: segs, raw: t, matched: matched, extra: extra };
  }

  // evidenceByCriterion 的条目字段名同样没在冻结文档里。
  // 【契约缺字段：evidenceByCriterion 条目的字段名】按候选探测，探不到就显示"—"。
  var EVIDENCE_PROBES = {
    status: ['status', 'state', 'result'],
    quote: ['quote', 'studentQuote', 'text', 'answer', 'utterance', 'said'],
    turn: ['sourceTurn', 'turn', 'turnId', 'turnSeq'],
    version: ['version', 'criterionVersion', 'v'],
    at: ['at', 'time', 'ts', 'updatedAt', 'createdAt']
  };

  function pickField(obj, probes) {
    for (var i = 0; i < probes.length; i++) {
      if (isObj(obj) && Object.prototype.hasOwnProperty.call(obj, probes[i]) && obj[probes[i]] !== null && obj[probes[i]] !== undefined) {
        return { key: probes[i], value: obj[probes[i]] };
      }
    }
    return null;
  }

  function _evidenceList(session) {
    var st = readSessionState(session), src = st.evidenceByCriterion;
    var list = [], i;
    if (Array.isArray(src)) {
      for (i = 0; i < src.length; i++) list.push({ id: s(src[i] && (src[i].criterionId || src[i].id)) || ('#' + (i + 1)), raw: src[i] });
    } else if (isObj(src)) {
      Object.keys(src).forEach(function (k) { list.push({ id: k, raw: src[k] }); });
    }
    return list.map(function (it) {
      var o = { id: it.id, raw: it.raw };
      Object.keys(EVIDENCE_PROBES).forEach(function (f) { o[f] = pickField(it.raw, EVIDENCE_PROBES[f]); });
      return o;
    });
  }

  // 未启用的活动节点：activity 层里 status 不是 ready 的（有 statusReason 的正是它们）。
  // 这是"数状态"，不是"判学习效果"。
  function _disabledActivities(graphOrIndex) {
    var idx = buildIndex(graphOrIndex);
    return (idx.layerNodes.activity || []).filter(function (n) { return n.status !== 'ready'; });
  }

  function _gapsFor(graphOrIndex, nodeId) {
    var idx = buildIndex(graphOrIndex);
    return idx.gaps.filter(function (g) { return g.affects.indexOf(nodeId) >= 0; });
  }

  /* ── 4. DOM 构建（无 innerHTML；文本一律 textContent） ─────────────────── */

  var KEYS = {};   // 本次重画的 key→元素表，用于重画后把键盘焦点放回原处

  function h(tag, attrs, kids) {
    var el = document.createElement(tag), k, v, d;
    if (attrs) for (k in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
      v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'key') { el.setAttribute('data-k', String(v)); KEYS[v] = el; }
      else if (k === 'value' || k === 'checked' || k === 'disabled') { el[k] = v; }
      else if (k === 'style') { for (d in v) if (Object.prototype.hasOwnProperty.call(v, d)) el.style[d] = v[d]; }
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, String(v));
    }
    return appendKids(el, kids);
  }

  function appendKids(el, kids) {
    if (kids === null || kids === undefined) return el;
    if (!Array.isArray(kids)) kids = [kids];
    for (var i = 0; i < kids.length; i++) {
      var c = kids[i];
      if (c === null || c === undefined || c === false) continue;
      el.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  // select 的选中项必须在 option 挂上之后用属性赋，不能靠 value 属性。
  function select(key, value, options, onchange, ariaLabel) {
    var el = h('select', { class: 'gv-sel', key: key, onchange: onchange, 'aria-label': ariaLabel });
    for (var i = 0; i < options.length; i++) {
      el.appendChild(h('option', { value: options[i].value, text: options[i].label }));
    }
    try { el.value = value; } catch (e) {}
    return el;
  }

  function tag(txt, cls) { return h('span', { class: 'gv-tag ' + (cls || ''), text: txt }); }
  function statusDot(st) { return h('i', { class: 'gv-dot gv-s-' + esc(st || 'none'), 'aria-hidden': 'true' }); }
  function reviewBadge(rs) {
    if (!rs) return null;
    // 契约 §3：unreviewed 必须显式标"候选／未核实"，所以单独一个高对比类。
    return tag(REVIEW_LABEL[rs] || rs, rs === 'unreviewed' ? 'gv-unrev' : 'gv-rev');
  }
  function statusLabel(st) { return STATUS_LABEL[st] || st || '（无 status）'; }

  /* ── 5. 视图状态 ───────────────────────────────────────────────────────── */

  var view = {
    mounted: false, root: null, index: null, session: null, handlers: {},
    tab: 'map',
    filters: { q: '', layer: '', kind: '', status: '', reviewState: '' },
    openLayers: {}, openKinds: {}, pages: {}, openSteps: {}, openEdgeGroups: {}, selectedId: '',
    elSearch: null, styleDone: false
  };

  function index() { return view.index || buildIndex(null); }
  function rawNode(id) { return view.index.rawById[id] || null; }

  // 真库的 fallback.conceptId 是"稳定身份"（cm_0608c405），图里的 id 是 concept:cm_0608c405。
  // 契约 §2 写明 id = <kind小写>:<稳定身份>，所以按这个格式补前缀再查一次；
  // 补不出来才说"不在图里"——不因为查不到就谎报节点不存在。
  function resolveRef(refStr) {
    var v = s(refStr), i;
    if (!v) return null;
    if (view.index.byId[v]) return view.index.byId[v];
    var prefixes = ['concept:', 'unit:', 'routestep:', 'route:', 'criterion:', 'goal:'];
    for (i = 0; i < prefixes.length; i++) if (view.index.byId[prefixes[i] + v]) return view.index.byId[prefixes[i] + v];
    return null;
  }

  // 新宿主 = 干净起点。搜索框节点也一起丢掉，否则会把上一个宿主的 DOM 搬过来。
  function resetViewState() {
    view.tab = 'map';
    view.filters = { q: '', layer: '', kind: '', status: '', reviewState: '' };
    view.openLayers = {}; view.openKinds = {}; view.pages = {}; view.openSteps = {}; view.openEdgeGroups = {};
    view.selectedId = ''; view.elSearch = null;
  }

  function currentFocusKey() {
    try {
      var ae = typeof document !== 'undefined' ? document.activeElement : null;
      return (ae && typeof ae.getAttribute === 'function') ? ae.getAttribute('data-k') : null;
    } catch (e) { return null; }
  }

  function restoreFocus(key) {
    if (!key) return;
    var el = KEYS[key];
    if (!el || typeof el.focus !== 'function') return;
    try { el.focus({ preventScroll: true }); } catch (e) { try { el.focus(); } catch (e2) {} }
  }

  function setTabState(tab, rerender) {
    if (tab !== 'map' && tab !== 'route' && tab !== 'trace') return false;
    view.tab = tab;
    if (rerender && view.mounted) render();
    return true;
  }

  /* ── 6. 渲染：外壳 ─────────────────────────────────────────────────────── */

  function render() {
    if (!view.mounted || !hasDom()) return false;
    var focusKey = currentFocusKey();
    KEYS = {};
    var host = view.root;
    while (host.firstChild) host.removeChild(host.firstChild);   // 重画：宿主只当容器，视图自持全部 DOM
    host.appendChild(h('div', { class: 'gv' }, [renderTools(), renderBody()]));
    restoreFocus(focusKey);
    return true;
  }

  function modelMode(state) {
    var m = s(state.modelMode);
    if (m === 'fixed') return { mode: 'fixed', label: '固定响应演示', note: '走的是固定响应：只证明连线与状态，不证明模型理解力。' };
    if (m === 'real') return { mode: 'real', label: '真实模型调用', note: '走的是真实模型：只证明这些样例的行为，不证明学习效果。' };
    return { mode: '', label: '证据级别未标注', note: 'session.state.modelMode 不是 fixed/real，无法判断本次证据级别。' };
  }

  function renderTools() {
    var state = readSessionState(view.session);
    var mm = modelMode(state);
    var tabs = ['map', 'route', 'trace'].map(function (t) {
      return h('button', {
        class: 'tab gv-tab' + (view.tab === t ? ' on' : ''), key: 'tab:' + t,
        'aria-pressed': view.tab === t ? 'true' : 'false',
        onclick: function () { setTabState(t, true); }
      }, TAB_TITLE[t]);
    });
    var counts = _counts(view.index, view.filters);
    return h('div', { class: 'gv-tools' }, [
      h('div', { class: 'gv-tabs' }, tabs),
      h('span', { class: 'gv-spacer' }),
      h('span', { class: 'gv-mm', text: '全部索引 ' + counts.indexed + ' · 当前可见 ' + counts.visible + ' · 待装配 ' + counts.pending }),
      tag(mm.label, 'gv-mode-' + (mm.mode || 'none'))
    ]);
  }

  function renderBody() {
    if (view.tab === 'route') return renderRoute();
    if (view.tab === 'trace') return renderTrace();
    return renderMap();
  }

  /* ── 7. A：系统总图 ────────────────────────────────────────────────────── */

  function renderMap() {
    var idx = index(), counts = _counts(idx, view.filters);
    var main = h('div', { class: 'gv-main' }, [
      h('div', { class: 'gv-head' }, [
        h('b', { text: '全部索引 ' + counts.indexed }),
        h('span', { class: 'gv-sep', text: '·' }),
        h('b', { text: '当前可见 ' + counts.visible }),
        h('span', { class: 'gv-sep', text: '·' }),
        h('b', { text: '待装配 ' + counts.pending }),
        h('span', { class: 'gv-note', text: '（当前可见跟着搜索／筛选变；待装配与全部索引取 graph.stats 口径）' })
      ]),
      renderFilters()
    ]);
    var scroll = h('div', { class: 'gv-scroll' });
    main.appendChild(scroll);

    // 搜索/筛选开着的时候，先给一张平铺结果——否则用户得自己一层层点开找命中项。
    if (counts.active) scroll.appendChild(renderFilterResults(counts));

    scroll.appendChild(h('div', { class: 'gv-h', text: '7 层（按 graph.layers[].order）' }));
    var grid = h('div', { class: 'gv-grid' });
    _layerSummaries(idx).forEach(function (L) { grid.appendChild(renderLayerCard(L)); });
    scroll.appendChild(grid);

    scroll.appendChild(renderEdgeLayerSummary(_edgeLayerSummary(idx)));
    if (idx.coverage) scroll.appendChild(renderCoverage(idx.coverage));

    return h('div', { class: 'gv-mapwrap' }, [main, renderDetail()]);
  }

  function renderFilters() {
    var idx = index();
    if (!view.elSearch) {
      view.elSearch = h('input', {
        type: 'search', class: 'gv-input', key: 'search',
        placeholder: '搜索 label / sub / id', 'aria-label': '搜索节点',
        oninput: function (ev) {
          view.filters.q = ev && ev.target ? String(ev.target.value || '') : '';
          resetPages(); render();
        }
      });
    }
    if (view.elSearch.value !== view.filters.q) view.elSearch.value = view.filters.q;

    var layerOpts = [{ value: '', label: '全部层' }].concat(_layerSummaries(idx).map(function (L) {
      return { value: L.id, label: L.label + '（' + L.total + '）' };
    }));
    var kindOpts = [{ value: '', label: '全部 kind' }].concat(Object.keys(idx.kindNodes).sort().map(function (k) {
      return { value: k, label: k + '（' + idx.kindNodes[k].length + '）' };
    }));
    var statusSet = {};
    idx.nodes.forEach(function (n) { if (n.status) statusSet[n.status] = true; });
    Object.keys(idx.stats.byStatus).forEach(function (k) { statusSet[k] = true; });
    var statusOpts = [{ value: '', label: '全部 status' }].concat(['ready', 'scaffold', 'blocked'].filter(function (k) { return statusSet[k]; }).map(function (k) {
      return { value: k, label: statusLabel(k) + '（' + k + '）' };
    }));
    var rsSet = {};
    idx.edges.forEach(function (e) { if (e.reviewState) rsSet[e.reviewState] = true; });
    var rsOrder = REVIEW_ORDER.concat(Object.keys(rsSet).filter(function (k) { return REVIEW_ORDER.indexOf(k) < 0; }));
    var rsOpts = [{ value: '', label: '全部 reviewState' }].concat(rsOrder.filter(function (k) { return rsSet[k]; }).map(function (k) {
      return { value: k, label: REVIEW_LABEL[k] || k };
    }));

    function bind(field) {
      return function (ev) { view.filters[field] = ev && ev.target ? String(ev.target.value || '') : ''; resetPages(); render(); };
    }

    return h('div', { class: 'gv-filters' }, [
      h('div', { class: 'gv-search' }, [view.elSearch]),
      select('f-layer', view.filters.layer, layerOpts, bind('layer'), '按层筛选'),
      select('f-kind', view.filters.kind, kindOpts, bind('kind'), '按 kind 筛选'),
      select('f-status', view.filters.status, statusOpts, bind('status'), '按 status 筛选'),
      select('f-review', view.filters.reviewState, rsOpts, bind('reviewState'), '按 reviewState 筛选（命中该节点参与的边）'),
      h('button', {
        class: 'gv-btn', key: 'f-clear',
        onclick: function () { view.filters = { q: '', layer: '', kind: '', status: '', reviewState: '' }; resetPages(); render(); }
      }, '清空筛选')
    ]);
  }

  function resetPages() { view.pages = {}; }

  function renderFilterResults(counts) {
    var box = h('div', { class: 'gv-block' }, [
      h('div', { class: 'gv-h', text: '筛选结果 ' + counts.visible + ' 个' + (counts.query.q ? '（含 "' + counts.query.q + '"）' : '') })
    ]);
    box.appendChild(renderNodeList('__filtered', counts.nodes));
    return box;
  }

  function renderLayerCard(L) {
    var open = !!view.openLayers[L.id];
    var card = h('div', { class: 'gv-card' + (open ? ' on' : '') }, [
      h('button', {
        class: 'gv-cardhead', key: 'layer:' + L.id, 'aria-expanded': open ? 'true' : 'false',
        onclick: function () { view.openLayers[L.id] = !open; render(); }
      }, [
        h('span', { class: 'gv-ord', text: String(L.order) }),
        h('b', { text: L.label }),
        h('span', { class: 'gv-mut', text: L.id })
      ]),
      h('div', { class: 'gv-cardmeta' }, [
        h('span', { text: L.total + ' 个节点' }),
        h('span', { class: 'gv-sep', text: '·' }),
        h('span', { text: '待装配 ' + L.pending }),
        h('span', { class: 'gv-sep', text: '·' }),
        h('span', { text: '阻塞 ' + L.blocked })
      ])
    ]);
    if (!open) return card;
    var kinds = h('div', { class: 'gv-kinds' });
    if (!L.kinds.length) kinds.appendChild(h('div', { class: 'gv-none', text: '该层当前没有节点' }));
    L.kinds.forEach(function (K) {
      var kk = L.id + '|' + K.kind;
      var kopen = !!view.openKinds[kk];
      kinds.appendChild(h('button', {
        class: 'gv-kindrow' + (kopen ? ' on' : ''), key: 'kind:' + kk, 'aria-expanded': kopen ? 'true' : 'false',
        onclick: function () { view.openKinds[kk] = !kopen; render(); }
      }, [
        h('span', { class: 'gv-kn', text: K.kind }),
        h('span', { class: 'gv-kc', text: String(K.count) })
      ]));
      if (kopen) kinds.appendChild(renderNodeList(kk, nodesOfKind(L.id, K.kind)));
    });
    card.appendChild(kinds);
    return card;
  }

  function nodesOfKind(layerId, kind) {
    return _filterNodes(view.index, view.filters).filter(function (n) { return n.layer === layerId && n.kind === kind; });
  }

  // 分页：一次最多 80 行进 DOM，999 个概念不许一次性塞进来。
  function renderNodeList(key, nodes) {
    var shown = num(view.pages[key], PAGE_SIZE);
    var slice = nodes.slice(0, shown);
    var box = h('div', { class: 'gv-nodes' });
    if (!nodes.length) { box.appendChild(h('div', { class: 'gv-none', text: '没有匹配的节点' })); return box; }
    slice.forEach(function (n) { box.appendChild(renderNodeRow(n, key)); });
    if (nodes.length > slice.length) {
      box.appendChild(h('button', {
        class: 'gv-btn gv-more', key: 'more:' + key,
        onclick: function () { view.pages[key] = shown + PAGE_SIZE; render(); }
      }, '加载更多（已显示 ' + slice.length + ' / ' + nodes.length + '）'));
    } else if (nodes.length > PAGE_SIZE) {
      box.appendChild(h('div', { class: 'gv-none', text: '已全部显示 ' + nodes.length + ' 个' }));
    }
    return box;
  }

  function renderNodeRow(n, listKey) {
    // 行里不放 id：真库里 id 是 concept:cm_0a4ca4ce 这种，占掉宽度后 label 只剩"H…"。
    // id 放 title 提示 + 详情面板，列表以认得出名字为准。
    return h('button', {
      class: 'gv-row' + (view.selectedId === n.id ? ' on' : ''), key: 'node:' + listKey + ':' + n.id,
      title: n.id + (n.sub ? ' · ' + n.sub : ''),
      onclick: function () { selectNode(n.id); }
    }, [
      statusDot(n.status),
      h('span', { class: 'gv-rl', text: n.label || n.id }),
      h('span', { class: 'gv-rs', text: n.sub || '' }),
      tag(n.kind, 'gv-k')
    ]);
  }

  function selectNode(id) {
    view.selectedId = id;
    var raw = rawNode(id), clean = view.index.byId[id] || null;
    safeCall(view.handlers.onSelectNode, [raw, clean], 'onSelectNode');
    render();
  }

  function renderEdgeLayerSummary(sum) {
    var box = h('div', { class: 'gv-block' }, [
      h('div', { class: 'gv-h', text: '层间连接摘要' }),
      h('div', { class: 'gv-note', text: '按 graph.edges 现算：每种边从哪层到哪层、各多少条。未核实的边单独计数，不当先修。' })
    ]);
    if (!sum.rows.length) box.appendChild(h('div', { class: 'gv-none', text: 'graph.edges 为空，层与层之间暂无连线' }));
    var tbl = h('div', { class: 'gv-edges' });
    sum.rows.forEach(function (r) {
      var kinds = Object.keys(r.kinds).sort().map(function (k) {
        return tag((EDGE_KIND_LABEL[k] || k) + ' ' + r.kinds[k], 'gv-ek');
      });
      if (r.unreviewed) kinds.push(tag('候选／未核实 ' + r.unreviewed, 'gv-unrev'));
      tbl.appendChild(h('div', { class: 'gv-edgerow' }, [
        h('span', { class: 'gv-ea', text: layerLabel(r.from) }),
        h('span', { class: 'gv-arrow', text: '→' }),
        h('span', { class: 'gv-ea', text: layerLabel(r.to) }),
        h('span', { class: 'gv-eb', text: String(r.total) + ' 条' }),
        h('span', { class: 'gv-echips' }, kinds)
      ]));
    });
    box.appendChild(tbl);
    if (sum.totals.length) {
      box.appendChild(h('div', { class: 'gv-foot' }, [
        h('span', { class: 'gv-note', text: 'graph.stats.byEdgeKind：' }),
        h('span', { class: 'gv-echips' }, sum.totals.map(function (t) {
          return tag((EDGE_KIND_LABEL[t.kind] || t.kind) + ' ' + t.count, 'gv-ek');
        }))
      ]));
    }
    return box;
  }

  function layerLabel(id) {
    var ls = index().layers;
    for (var i = 0; i < ls.length; i++) if (ls[i].id === id) return ls[i].label;
    return id || '（层未标）';
  }

  function renderCoverage(cov) {
    return h('div', { class: 'gv-block' }, [
      h('div', { class: 'gv-h', text: '口径（contract §4：全量索引 与 全量课程 分开陈述）' }),
      h('div', { class: 'gv-kvrow' }, [h('span', { class: 'gv-kvk', text: 'coverage.fullIndex' }), h('span', { class: 'gv-kvv', text: cov.fullIndex || '（未提供）' })]),
      h('div', { class: 'gv-kvrow' }, [h('span', { class: 'gv-kvk', text: 'coverage.playable' }), h('span', { class: 'gv-kvv', text: cov.playable || '（未提供）' })])
    ]);
  }

  /* ── 8. 节点详情：六段 ─────────────────────────────────────────────────── */

  function renderDetail() {
    var aside = h('aside', { class: 'gv-detail' });
    var n = view.selectedId ? view.index.byId[view.selectedId] : null;
    if (!n) {
      aside.appendChild(h('div', { class: 'gv-none', text: '点左侧任一节点，这里出六段：它是什么 · 来自哪里 · 连接到什么 · 当前状态 · 缺口 · 可运行入口。' }));
      return aside;
    }
    aside.appendChild(h('div', { class: 'gv-dhead' }, [statusDot(n.status), h('b', { text: n.label || n.id }), tag(n.kind, 'gv-k')]));
    aside.appendChild(h('div', { class: 'gv-dsub', text: n.id + (n.sub ? ' · ' + n.sub : '') }));

    aside.appendChild(detailWhat(n));
    aside.appendChild(detailFrom(n));
    aside.appendChild(detailLinks(n));
    aside.appendChild(detailStatus(n));
    aside.appendChild(detailGaps(n));
    aside.appendChild(detailRunnable(n));
    return aside;
  }

  function sec(no, title) {
    return h('div', { class: 'gv-sec' }, [h('span', { class: 'gv-no', text: no }), h('b', { text: title })]);
  }

  function detailWhat(n) {
    var box = h('div', { class: 'gv-dsec' }, [sec('1', '它是什么')]);
    var kv = h('div', { class: 'gv-kv' });
    kv.appendChild(kvrow('kind', n.kind));
    kv.appendChild(kvrow('layer', layerLabel(n.layer) + '（' + n.layer + '）'));
    kv.appendChild(kvrow('scope', (SCOPE_LABEL[n.scope] || n.scope || '（未标）') + (n.scope === 'personal' ? '——个人状态不写回公共图谱' : '')));
    if (n.sub) kv.appendChild(kvrow('sub', n.sub));
    if (n.version) kv.appendChild(kvrow('version', n.version));
    box.appendChild(kv);
    var mk = Object.keys(n.meta);
    if (mk.length) {
      box.appendChild(h('div', { class: 'gv-note', text: 'meta（契约 §6 白名单字段）' }));
      var km = h('div', { class: 'gv-kv' });
      mk.forEach(function (k) { km.appendChild(kvrow(k, plain(n.meta[k]))); });
      box.appendChild(km);
    }
    return box;
  }

  function kvrow(k, v) {
    return h('div', { class: 'gv-kvrow' }, [
      h('span', { class: 'gv-kvk', text: k }),
      h('span', { class: 'gv-kvv', text: v === '' ? '—' : v })
    ]);
  }

  function detailFrom(n) {
    var box = h('div', { class: 'gv-dsec' }, [sec('2', '来自哪里')]);
    if (!n.sourceRefs.length) { box.appendChild(h('div', { class: 'gv-none', text: 'sourceRefs 为空——这个节点没有登记出处' })); return box; }
    n.sourceRefs.forEach(function (r, i) {
      var line = r.path + (r.locator ? '#' + r.locator : '');
      if (typeof view.handlers.onOpenSource === 'function') {
        box.appendChild(h('button', {
          class: 'gv-ref', key: 'src:' + n.id + ':' + i,
          onclick: function () { safeCall(view.handlers.onOpenSource, [r, rawNode(n.id)], 'onOpenSource'); }
        }, line));
      } else {
        box.appendChild(h('div', { class: 'gv-ref gv-refro', text: line }));
      }
    });
    return box;
  }

  function detailLinks(n) {
    var box = h('div', { class: 'gv-dsec' }, [sec('3', '连接到什么')]);
    box.appendChild(edgeGroup('出边', view.index.outEdges[n.id] || [], n.id));
    box.appendChild(edgeGroup('入边', view.index.inEdges[n.id] || [], n.id));
    return box;
  }

  function edgeGroup(title, edges, selfId) {
    var wrap = h('div', { class: 'gv-egroup' }, [h('div', { class: 'gv-note', text: title + ' ' + edges.length + ' 条' })]);
    if (!edges.length) { wrap.appendChild(h('div', { class: 'gv-none', text: '无' })); return wrap; }
    var byKind = {}, order = [];
    edges.forEach(function (e) {
      var k = e.kind || '(未标 kind)';
      if (!byKind[k]) { byKind[k] = []; order.push(k); }
      byKind[k].push(e);
    });
    order.forEach(function (k) {
      wrap.appendChild(h('div', { class: 'gv-egk' }, [
        h('span', { class: 'gv-kn', text: k }),
        h('span', { class: 'gv-kc', text: String(byKind[k].length) })
      ]));
      // 契约说"各列几条"：一个概念可能有 60+ 条 knowledge 出边，全铺出来会把面板冲垮。
      // 先摆前 EDGE_PREVIEW 条，剩下的给一个展开按钮——不隐藏，只是折叠。
      var gkey = 'eg:' + selfId + ':' + title + ':' + k;
      var expanded = !!view.openEdgeGroups[gkey];
      var list = expanded ? byKind[k] : byKind[k].slice(0, EDGE_PREVIEW);
      list.forEach(function (e) { wrap.appendChild(edgeRow(e, selfId)); });
      if (byKind[k].length > list.length) {
        wrap.appendChild(h('button', {
          class: 'gv-btn gv-more', key: 'more:' + gkey,
          onclick: function () { view.openEdgeGroups[gkey] = true; render(); }
        }, '显示全部 ' + byKind[k].length + ' 条（还藏着 ' + (byKind[k].length - list.length) + ' 条）'));
      }
    });
    return wrap;
  }

  function edgeRow(e, selfId) {
    var otherId = e.from === selfId ? e.to : e.from;
    var other = view.index.byId[otherId];
    var badges = [reviewBadge(e.reviewState)];
    if (e.kind === 'transition' && e.event) badges.push(tag('event ' + e.event, 'gv-ek'));
    return h('button', {
      class: 'gv-erow' + (e.reviewState === 'unreviewed' ? ' unrev' : ''), key: 'edge:' + e.id,
      onclick: function () { selectNode(otherId); }
    }, [
      h('span', { class: 'gv-erd', text: (e.from === selfId ? '→ ' : '← ') }),
      h('span', { class: 'gv-erel', text: (e.relation || '(无 relation)') + (e.label ? ' · ' + e.label : '') }),
      h('span', { class: 'gv-eother', text: other ? (other.label || other.id) : (otherId + '（不在图中）') }),
      h('span', { class: 'gv-echips' }, badges)
    ]);
  }

  function detailStatus(n) {
    var box = h('div', { class: 'gv-dsec' }, [sec('4', '当前状态')]);
    box.appendChild(h('div', { class: 'gv-kvrow' }, [
      statusDot(n.status),
      h('span', { class: 'gv-kvv', text: statusLabel(n.status) + '（' + (n.status || '未标') + '）' })
    ]));
    if (n.statusReason) box.appendChild(h('div', { class: 'gv-p', text: 'statusReason：' + n.statusReason }));
    if (n.status === 'ready') box.appendChild(h('div', { class: 'gv-callout', text: READY_SCOPE_NOTE }));
    else if (STATUS_HINT[n.status]) box.appendChild(h('div', { class: 'gv-note', text: STATUS_HINT[n.status] }));
    // 视图只摆 status 字段，不推断"学会了没有"。
    box.appendChild(h('div', { class: 'gv-note', text: '视图不判断学习结果；通过／未通过只来自 runner 的 session。' }));
    return box;
  }

  function detailGaps(n) {
    var gaps = _gapsFor(view.index, n.id);
    var box = h('div', { class: 'gv-dsec' }, [sec('5', '缺口')]);
    if (!gaps.length) { box.appendChild(h('div', { class: 'gv-none', text: 'graph.gaps 里没有 affects 命中该节点的条目' })); return box; }
    gaps.forEach(function (g) {
      box.appendChild(h('div', { class: 'gv-gap' }, [
        h('div', { class: 'gv-gaphead' }, [tag(g.kind || 'gap', 'gv-unrev'), h('b', { text: g.label || g.id })]),
        h('div', { class: 'gv-p', text: '缺什么：' + (g.why || '（未写 why）') }),
        h('div', { class: 'gv-p', text: '在哪：' + (g.where || '（未写 where）') })
      ]));
    });
    return box;
  }

  function detailRunnable(n) {
    var box = h('div', { class: 'gv-dsec' }, [sec('6', '可运行入口')]);
    if (n.runnable) {
      var r = n.runnable;
      var txt = r.entry || r.ref || '(runnable 未给 entry/ref)';
      box.appendChild(h('button', {
        class: 'gv-cta', key: 'run:' + n.id,
        onclick: function () { safeCall(view.handlers.onOpenEntry, [r, rawNode(n.id)], 'onOpenEntry'); }
      }, '打开入口 ' + txt));
      box.appendChild(h('div', { class: 'gv-note', text: 'runnable.kind = ' + (r.kind || '（未标）') }));
    } else {
      box.appendChild(h('div', { class: 'gv-none', text: 'node.runnable 为空——这个节点没有可运行入口（有值才给按钮）' }));
    }
    if (n.kind === 'Unit' && typeof view.handlers.onOpenUnit === 'function') {
      var ref = n.meta.unitId || n.id;
      box.appendChild(h('button', {
        class: 'gv-btn', key: 'unit:' + n.id,
        onclick: function () { safeCall(view.handlers.onOpenUnit, [ref, rawNode(n.id)], 'onOpenUnit'); }
      }, '打开单元 ' + ref));
    }
    return box;
  }

  /* ── 9. B：当前路线 ────────────────────────────────────────────────────── */

  function renderRoute() {
    var models = _routeModel(view.index, view.session);
    var wrap = h('div', { class: 'gv-scroll gv-page' });
    if (!models.length) {
      wrap.appendChild(h('div', { class: 'gv-none', text: 'graph 里没有 kind === "Route" 的节点——当前没有可显示的路线' }));
      return wrap;
    }
    wrap.appendChild(h('div', { class: 'gv-h', text: '共 ' + models.length + ' 条 Route 节点' }));
    models.forEach(function (m) { wrap.appendChild(renderOneRoute(m)); });
    return wrap;
  }

  function renderOneRoute(m) {
    var box = h('div', { class: 'gv-route' });
    if (m.fixture) {
      // 契约没给"夹具"字段，命中关键字才标；标了就必须显眼。
      box.appendChild(h('div', { class: 'gv-fixture', text: '开发夹具 · 不是正式课程（按 id/label 关键字识别，契约未冻结夹具标记字段）' }));
    }
    box.appendChild(h('div', { class: 'gv-routehead' }, [
      h('b', { text: m.title }),
      tag(m.routeId || m.node.id, 'gv-k'),
      statusDot(m.node.status),
      tag(statusLabel(m.node.status), 'gv-rev')
    ]));
    // meta.title 是"目标"，节点 label 是这条路线在图里叫什么；两者常常不同，都摆出来。
    if (m.node.label && m.node.label !== m.title) {
      box.appendChild(h('div', { class: 'gv-note', text: 'Route 节点 label：' + m.node.label }));
    }

    var goalBox = h('div', { class: 'gv-kv' });
    goalBox.appendChild(kvrow('目标（Route.meta.title）', m.title));
    if (m.routeId) goalBox.appendChild(kvrow('目标（Route.meta.routeId）', m.routeId));
    if (m.why) goalBox.appendChild(kvrow('Route.meta.why', m.why));
    if (!m.goals.length) goalBox.appendChild(kvrow('关联 Goal', '边上没有挂 Goal 节点，也没有 id 稳定身份同名的 Goal'));
    box.appendChild(goalBox);
    var notedIdentity = false;
    m.goals.forEach(function (g) {
      if (!g.edge) {
        if (!notedIdentity) {
          notedIdentity = true;
          box.appendChild(h('div', { class: 'gv-note', text: '以下 Goal 按 id 稳定身份同名匹配（图上没有这条 Goal 边）：' }));
        }
      }
      box.appendChild(h('button', {
        class: 'gv-erow' + (g.edge && g.edge.reviewState === 'unreviewed' ? ' unrev' : ''),
        key: 'goal:' + m.node.id + ':' + g.node.id,
        onclick: function () { openNodeInMap(g.node.id); }
      }, [
        h('span', { class: 'gv-erd', text: 'Goal ' }),
        h('span', { class: 'gv-erel', text: g.node.label || g.node.id }),
        h('span', { class: 'gv-echips' }, [
          g.edge ? reviewBadge(g.edge.reviewState) : tag('同名匹配，非边', 'gv-ek')
        ])
      ]));
    });

    box.appendChild(h('div', { class: 'gv-note', text: m.currentStepId ? '当前位置（session.state.routeStepId）：' + m.currentStepId : '会话未给出当前位置（session.state.routeStepId 为空）' }));

    box.appendChild(h('div', { class: 'gv-h', text: '全部 RouteStep（按 meta.order）· ' + m.steps.length + ' 步' }));
    if (!m.steps.length) box.appendChild(h('div', { class: 'gv-none', text: '这条路线没有挂上 RouteStep' }));
    m.steps.forEach(function (st, i) { box.appendChild(renderStep(m, st, i)); });

    box.appendChild(h('div', { class: 'gv-h', text: '共享概念（被 ≥2 个 RouteStep 引用的 Concept）· ' + m.shared.length + ' 个' }));
    if (!m.shared.length) box.appendChild(h('div', { class: 'gv-none', text: '没有跨多个 RouteStep 的共享概念' }));
    m.shared.forEach(function (sh) {
      box.appendChild(h('button', {
        class: 'gv-row', key: 'shared:' + m.node.id + ':' + (sh.concept ? sh.concept.id : ''),
        onclick: function () { if (sh.concept) openNodeInMap(sh.concept.id); }
      }, [
        h('span', { class: 'gv-rl', text: sh.concept ? (sh.concept.label || sh.concept.id) : '（概念不在图中）' }),
        h('span', { class: 'gv-rs', text: sh.steps.length + ' 个 RouteStep 引用' }),
        h('span', { class: 'gv-rid', text: sh.steps.join('、') })
      ]));
    });
    return box;
  }

  function renderStep(m, st, i) {
    var key = 'step:' + st.node.id;
    var open = !!view.openSteps[st.node.id];
    var box = h('div', { class: 'gv-step' + (st.isCurrent ? ' cur' : '') });
    box.appendChild(h('button', {
      class: 'gv-stephead', key: key, 'aria-expanded': open ? 'true' : 'false',
      onclick: function () { view.openSteps[st.node.id] = !open; render(); }
    }, [
      h('span', { class: 'gv-no', text: String(num(st.node.meta.order, i + 1)) }),
      h('b', { text: st.node.meta.title || st.node.label || st.node.id }),
      st.isCurrent ? tag('当前位置', 'gv-cur') : null,
      h('span', { class: 'gv-spacer' }),
      tag(st.node.status || '未标', 'gv-rev'),
      h('span', { class: 'gv-chev', text: open ? '收起' : '展开' })
    ]));

    var units = h('div', { class: 'gv-units' });
    if (!st.units.length) units.appendChild(h('div', { class: 'gv-none', text: '这一步还没挂 Unit' }));
    st.units.forEach(function (u) {
      units.appendChild(h('button', {
        class: 'gv-chip', key: 'unitrow:' + st.node.id + ':' + u.unit.id,
        onclick: function () { openNodeInMap(u.unit.id); }
      }, 'Unit · ' + (u.unit.meta.title || u.unit.label || u.unit.id)));
    });
    box.appendChild(units);
    // 真库的 RouteStep label 是"第 N 步 · cm_xxxx"，光看 label 认不出这一步学什么。
    // 把这一步指向的 Concept 的 label 摆出来——认得出的名字来自图，不是视图编的。
    if (st.targets.length) {
      var tg = h('div', { class: 'gv-units' }, [h('span', { class: 'gv-note', text: '本步概念：' })]);
      st.targets.forEach(function (t) {
        tg.appendChild(h('button', {
          class: 'gv-chip', key: 'target:' + st.node.id + ':' + t.node.id,
          onclick: function () { openNodeInMap(t.node.id); }
        }, (t.node.label || t.node.id) + (t.node.sub ? '（' + t.node.sub + '）' : '')));
      });
      box.appendChild(tg);
    }

    if (!open) return box;
    var body = h('div', { class: 'gv-stepbody' });
    body.appendChild(h('div', { class: 'gv-why' }, [
      h('b', { text: '为什么现在学（step.meta.why）' }),
      h('div', { class: 'gv-p', text: st.why || '（该 step 没有 why）' })
    ]));
    body.appendChild(h('div', { class: 'gv-why' }, [
      h('b', { text: '用了哪条知识关系（该 step 的 knowledge 入边）' })
    ]));
    if (!st.knowledge.length) body.appendChild(h('div', { class: 'gv-none', text: '没有 kind === "knowledge" 的入边' }));
    st.knowledge.forEach(function (e) { body.appendChild(knowledgeRow(e, 'in', 'kedge')); });
    // 契约只要求列 knowledge 入边；但真库里 step→概念 的边是 curriculum/targets-concept，
    // 只列 knowledge 入边，这一段在真数据上永远是空的。其余指向 Concept/Criterion 的出边
    // 单列一块，逐行带 kind·relation——看得见真实关系，也不冒充 knowledge 边。
    var kout = (view.index.outEdges[st.node.id] || []).filter(function (e) {
      if (e.kind === 'knowledge') return true;
      var peer = view.index.byId[e.to];
      return peer && (peer.kind === 'Concept' || peer.kind === 'Criterion');
    });
    if (kout.length) {
      body.appendChild(h('div', { class: 'gv-why' }, [h('b', { text: '本步用到的知识关系（出边，逐行带 kind·relation）' })]));
      kout.forEach(function (e) { body.appendChild(knowledgeRow(e, 'out', 'kedgeout')); });
    }
    body.appendChild(h('div', { class: 'gv-why' }, [h('b', { text: '卡住回哪里（step.meta.fallback）' })]));
    var fb = st.fallbackRaw;
    if (fb === undefined || fb === null || fb === '') {
      body.appendChild(h('div', { class: 'gv-none', text: '（该 step 没有 fallback）' }));
    } else if (isObj(fb)) {
      // 真库的 fallback 是 {conceptId, reason}：reason 是给人看的，conceptId 指回图里的节点。
      if (fb.reason) body.appendChild(h('div', { class: 'gv-p', text: plain(fb.reason) }));
      if (fb.conceptId) {
        var fbId = s(fb.conceptId), fbNode = resolveRef(fbId);
        body.appendChild(h('button', {
          class: 'gv-erow', key: 'fb:' + st.node.id,
          onclick: function () { if (fbNode) openNodeInMap(fbNode.id); }
        }, [
          h('span', { class: 'gv-erd', text: '↩ ' }),
          h('span', { class: 'gv-erel', text: fbNode ? (fbNode.label || fbNode.id) : fbId }),
          h('span', { class: 'gv-eother', text: fbNode ? '' : '（该节点不在图里）' })
        ]));
      } else {
        body.appendChild(h('div', { class: 'gv-p', text: st.fallbackText }));
      }
    } else {
      body.appendChild(h('div', { class: 'gv-p', text: st.fallbackText }));
    }
    box.appendChild(body);
    return box;
  }

  function openNodeInMap(id) {
    view.selectedId = id;
    setTabState('map', true);
  }

  // 知识关系一行：方向 + relation/label + 对端节点 + reviewState（unreviewed 必须显眼）。
  function knowledgeRow(e, dir, keyPrefix) {
    var otherId = dir === 'in' ? e.from : e.to;
    var other = view.index.byId[otherId];
    return h('button', {
      class: 'gv-erow' + (e.reviewState === 'unreviewed' ? ' unrev' : ''), key: keyPrefix + ':' + e.id,
      onclick: function () { openNodeInMap(otherId); }
    }, [
      h('span', { class: 'gv-erd', text: dir === 'in' ? '← ' : '→ ' }),
      h('span', { class: 'gv-erel', text: (e.relation || '(无 relation)') + (e.label ? ' · ' + e.label : '') }),
      e.kind === 'knowledge' ? null : tag(e.kind, 'gv-ek'),
      h('span', { class: 'gv-eother', text: other ? (other.label || otherId) : otherId }),
      h('span', { class: 'gv-echips' }, [reviewBadge(e.reviewState)])
    ]);
  }

  /* ── 10. C：学习与轨迹 ─────────────────────────────────────────────────── */

  function renderTrace() {
    var state = readSessionState(view.session);
    var tr = _traceSegments(view.session);
    var wrap = h('div', { class: 'gv-scroll gv-page' });

    var mm = modelMode(state);
    wrap.appendChild(h('div', { class: 'gv-banner gv-mode-' + (mm.mode || 'none') }, [
      h('b', { text: '证据级别：' + mm.label }),
      h('div', { class: 'gv-p', text: mm.note })
    ]));
    wrap.appendChild(renderDisabledActivities());
    var njBox = renderNotJudged(tr, state);
    if (njBox) wrap.appendChild(njBox);

    if (tr.empty) {
      wrap.appendChild(h('div', { class: 'gv-empty' }, [
        h('b', { text: '尚无运行记录' }),
        h('div', { class: 'gv-p', text: view.session ? 'session.trace() 没有返回任何内容；本页不填任何示意数据。' : '本次没有传入 session；本页不填任何示意数据。' })
      ]));
    } else {
      wrap.appendChild(h('div', { class: 'gv-h', text: '五段链路（session.trace()）' }));
      if (!tr.matched && tr.extra.length) {
        wrap.appendChild(h('div', { class: 'gv-note', text: '契约未冻结 trace() 的字段名，认不出五段键名，下面原样展示返回值。' }));
        var rawBox = h('div', { class: 'gv-dsec' });
        tr.extra.forEach(function (it) { rawBox.appendChild(valueBlock(it.value, it.label)); });
        wrap.appendChild(rawBox);
      } else {
        tr.segments.forEach(function (sg, i) {
          var box = h('div', { class: 'gv-dsec' }, [sec(String(i + 1), sg.title)]);
          if (sg.empty) box.appendChild(h('div', { class: 'gv-none', text: '本段无记录' }));
          sg.items.forEach(function (it) { box.appendChild(valueBlock(it.value, it.label)); });
          wrap.appendChild(box);
        });
        if (tr.extra.length) {
          var ex = h('div', { class: 'gv-dsec' }, [sec('+', 'trace() 里的其余字段')]);
          ex.appendChild(h('div', { class: 'gv-note', text: '五段之外、trace() 还返回了的键，原样列出（不吞字段）。' }));
          tr.extra.forEach(function (it) { ex.appendChild(valueBlock(it.value, it.label)); });
          wrap.appendChild(ex);
        }
      }
    }

    wrap.appendChild(renderCurrentActivity(state));
    wrap.appendChild(renderReturnStack(state));
    wrap.appendChild(renderEvidence(state));
    wrap.appendChild(renderAttempts(state, 'decisionAttempts', 'decisionAttempts（决策作答记录）'));
    wrap.appendChild(renderAttempts(state, 'summativeAttempts', 'summativeAttempts（章末验收记录）'));
    wrap.appendChild(renderTurns(state));
    return wrap;
  }

  function renderDisabledActivities() {
    var list = _disabledActivities(view.index);
    var box = h('div', { class: 'gv-banner gv-banner2' }, [
      h('b', { text: '未启用的活动节点：' + list.length + ' 个（activity 层里 status ≠ ready）' })
    ]);
    if (!list.length) box.appendChild(h('div', { class: 'gv-p', text: '活动层没有未启用节点。' }));
    list.forEach(function (n) {
      // 未启用要连"为什么没启用"一起给（statusReason），否则只看到一排状态色。
      box.appendChild(h('button', {
        class: 'gv-erow', key: 'dis:' + n.id, onclick: function () { openNodeInMap(n.id); }
      }, [
        h('span', { class: 'gv-erel', text: n.label || n.id }),
        tag(statusLabel(n.status), 'gv-unrev'),
        h('span', { class: 'gv-eother', text: n.statusReason || '（未写 statusReason）' })
      ]));
    });
    return box;
  }

  // 未判定项：契约 §5 规则 5 要求系统异常一律 notJudged（不通过、也不记成学生缺口）。
  // 这是会话自己给的字段，视图只负责把它摆到显眼处。
  function renderNotJudged(tr, state) {
    var seen = {}, list = [], i;
    function take(v) {
      if (Array.isArray(v)) {
        for (var n = 0; n < v.length; n++) {
          var key = plain(v[n]);
          if (!seen[key]) { seen[key] = true; list.push(v[n]); }
        }
      } else if (isObj(v) && Object.keys(v).length) {
        var k2 = plain(v);
        if (!seen[k2]) { seen[k2] = true; list.push(v); }
      }
    }
    take(tr && isObj(tr.raw) ? tr.raw.notJudged : null);
    take(state ? state.notJudged : null);
    if (!list.length) return null;
    var box = h('div', { class: 'gv-banner gv-banner2' }, [
      h('b', { text: '未判定项（notJudged）：' + list.length + ' 项' }),
      h('div', { class: 'gv-p', text: '契约 §5 规则 5：系统异常一律记 notJudged —— 既不通过、也不记成学生缺口，草稿与旧证据保留。' })
    ]);
    box.appendChild(valueInner(list));
    return box;
  }

  function renderCurrentActivity(state) {
    var cur = readCurrent(view.session);
    var box = h('div', { class: 'gv-dsec' }, [sec('·', '当前活动（session.current()）')]);
    if (!cur) { box.appendChild(h('div', { class: 'gv-none', text: 'session 没有给出当前活动' })); return box; }
    var kv = h('div', { class: 'gv-kv' });
    var cn = cur.nodeId ? view.index.byId[s(cur.nodeId)] : null;
    kv.appendChild(kvrow('nodeId', s(cur.nodeId) || '—'));
    if (cn) kv.appendChild(kvrow('节点', (cn.label || cn.id) + '（' + cn.kind + '）'));
    kv.appendChild(kvrow('kind', s(cur.kind) || '—'));
    kv.appendChild(kvrow('activityKind', s(cur.activityKind) || '—'));
    box.appendChild(kv);
    if (cur.prompt) box.appendChild(h('div', { class: 'gv-p', text: 'prompt：' + plain(cur.prompt) }));
    if (cn) box.appendChild(h('button', { class: 'gv-btn', key: 'cur:node', onclick: function () { openNodeInMap(cn.id); } }, '在总图里看这个节点'));
    return box;
  }

  function renderReturnStack(state) {
    var rs = state.returnStack;
    var box = h('div', { class: 'gv-dsec' }, [sec('·', 'returnStack（补讲结束回到哪）')]);
    if (rs === undefined || rs === null) { box.appendChild(h('div', { class: 'gv-none', text: 'session.state 里没有 returnStack' })); return box; }
    if (Array.isArray(rs) && !rs.length) { box.appendChild(h('div', { class: 'gv-none', text: 'returnStack 为空（当前不在补讲中）' })); return box; }
    box.appendChild(valueInner(rs));
    return box;
  }

  function renderEvidence(state) {
    var list = _evidenceList(view.session);
    var box = h('div', { class: 'gv-dsec' }, [sec('·', 'evidenceByCriterion（每项理解证据）· ' + list.length)]);
    box.appendChild(h('div', { class: 'gv-note', text: '字段口径见 docs/总图视图契约-20260914.md §9.1（status·evidence·source·turnId·version·at；补讲过的还有 previous·conflictAt）。' }));
    if (!list.length) { box.appendChild(h('div', { class: 'gv-none', text: '没有理解证据记录' })); return box; }
    list.forEach(function (it) {
      var card = h('div', { class: 'gv-evi' }, [
        h('div', { class: 'gv-gaphead' }, [
          h('b', { text: it.id }),
          it.status ? tag(plain(it.status.value), 'gv-rev') : tag('无 status 字段', 'gv-unrev')
        ])
      ]);
      var kv = h('div', { class: 'gv-kv' });
      kv.appendChild(kvrow('学生原话' + (it.quote ? '（' + it.quote.key + '）' : ''), it.quote ? plain(it.quote.value) : '—'));
      kv.appendChild(kvrow('所属 turn' + (it.turn ? '（' + it.turn.key + '）' : ''), it.turn ? plain(it.turn.value) : '—'));
      kv.appendChild(kvrow('版本' + (it.version ? '（' + it.version.key + '）' : ''), it.version ? plain(it.version.value) : '—'));
      kv.appendChild(kvrow('时间' + (it.at ? '（' + it.at.key + '）' : ''), it.at ? plain(it.at.value) : '—'));
      card.appendChild(kv);
      box.appendChild(card);
    });
    return box;
  }

  function renderAttempts(state, field, title) {
    var box = h('div', { class: 'gv-dsec' }, [sec('·', title)]);
    var v = state[field];
    if (v === undefined || v === null) { box.appendChild(h('div', { class: 'gv-none', text: 'session.state 里没有 ' + field })); return box; }
    if (typeof v === 'number') { box.appendChild(h('div', { class: 'gv-p', text: '共 ' + v + ' 次' })); return box; }
    if (Array.isArray(v)) {
      box.appendChild(h('div', { class: 'gv-note', text: '共 ' + v.length + ' 条（判定只来自 runner，本页不判通过与否）' }));
      if (!v.length) { box.appendChild(h('div', { class: 'gv-none', text: '没有记录' })); return box; }
    }
    box.appendChild(valueInner(v));
    return box;
  }

  function renderTurns(state) {
    var turns = state.turns;
    var box = h('div', { class: 'gv-dsec' }, [sec('·', 'turns（本次会话轮次）')]);
    if (turns === undefined || turns === null) { box.appendChild(h('div', { class: 'gv-none', text: 'session.state 里没有 turns' })); return box; }
    if (Array.isArray(turns)) {
      box.appendChild(h('div', { class: 'gv-note', text: '共 ' + turns.length + ' 轮' }));
      if (!turns.length) { box.appendChild(h('div', { class: 'gv-none', text: '还没有轮次' })); return box; }
    }
    box.appendChild(valueInner(turns));
    return box;
  }

  // 会话数据（trace/state）形状未冻结，用通用值渲染：文本一律走 textContent。
  function valueBlock(v, label) {
    var wrap = h('div', { class: 'gv-v' });
    if (label) wrap.appendChild(h('div', { class: 'gv-vk', text: label }));
    wrap.appendChild(valueInner(v));
    return wrap;
  }

  function valueInner(v) {
    if (v === null || v === undefined || v === '') return h('div', { class: 'gv-none', text: '（空）' });
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      return h('div', { class: 'gv-p', text: String(v) });
    }
    var i, keys;
    if (Array.isArray(v)) {
      if (!v.length) return h('div', { class: 'gv-none', text: '（空）' });
      var box = h('div', { class: 'gv-vlist' });
      for (i = 0; i < v.length; i++) {
        if (v[i] === null || typeof v[i] !== 'object') box.appendChild(h('div', { class: 'gv-p', text: '· ' + String(v[i]) }));
        else box.appendChild(h('div', { class: 'gv-vitem' }, [valueInner(v[i])]));
      }
      return box;
    }
    keys = Object.keys(v);
    if (!keys.length) return h('div', { class: 'gv-none', text: '（空对象）' });
    var kv = h('div', { class: 'gv-kv' });
    for (i = 0; i < keys.length; i++) kv.appendChild(kvrow(keys[i], plain(v[keys[i]])));
    return kv;
  }

  /* ── 11. 样式（沿用壳的 CSS 变量；变量不在时给同样的兜底色） ───────────── */

  var CSS = [
    '.gv{display:flex;flex-direction:column;height:100%;min-height:320px;min-width:0;overflow:hidden;',
    'background:var(--bg,#08090a);color:var(--fg,#f7f8f8);font-size:13px;line-height:1.5;',
    'font-family:-apple-system,BlinkMacSystemFont,"Inter","PingFang SC","Helvetica Neue",Arial,sans-serif}',
    '.gv *{box-sizing:border-box}',
    '.gv button{font-family:inherit;font-size:inherit;color:inherit;background:none;border:0;text-align:left;cursor:pointer}',
    '.gv button:focus-visible,.gv input:focus-visible,.gv select:focus-visible{outline:1px solid var(--accent2,#7c86e8);outline-offset:1px}',
    '.gv-tools{display:flex;align-items:center;gap:6px;height:44px;flex:0 0 44px;padding:0 12px 0 14px;border-bottom:1px solid var(--line,#1b1c1e)}',
    '.gv-tabs{display:flex;gap:6px}',
    '.gv-tab{background:none;border:1px solid var(--line,#1b1c1e);color:var(--fg3,#62666d);font-size:11.5px;height:24px;padding:0 11px;border-radius:5px}',
    '.gv-tab:hover{color:var(--fg2,#8a8f98);border-color:var(--line2,#232426)}',
    '.gv-tab.on{background:#1d1e21;color:var(--fg,#f7f8f8);border-color:var(--line2,#232426)}',
    '.gv-spacer{flex:1}',
    '.gv-mm{font-size:11.5px;color:var(--fg4,#3c3f44)}',
    '.gv-tag{display:inline-block;font-size:10.5px;color:var(--fg3,#62666d);border:1px solid var(--line2,#232426);border-radius:4px;padding:0 5px;line-height:16px;white-space:nowrap}',
    '.gv-k{color:var(--fg3,#62666d)}',
    '.gv-rev{color:var(--fg3,#62666d)}',
    '.gv-unrev{color:var(--warn,#f2c94c);border-color:#4a4020}',
    '.gv-mode-fixed{color:var(--warn,#f2c94c);border-color:#4a4020}',
    '.gv-mode-real{color:var(--ok,#4cb782);border-color:#24462f}',
    '.gv-mode-none{color:var(--fg3,#62666d)}',
    '.gv-mapwrap{display:grid;grid-template-columns:minmax(0,1fr) 380px;flex:1 1 auto;min-height:0}',
    '.gv-main{display:flex;flex-direction:column;min-width:0;min-height:0;border-right:1px solid var(--line,#1b1c1e)}',
    '.gv-page{flex:1 1 auto;min-height:0}',
    '.gv-scroll{overflow:auto;padding:10px 14px 26px;scrollbar-width:thin;flex:1 1 auto;min-height:0}',
    '.gv-scroll::-webkit-scrollbar{width:8px}.gv-scroll::-webkit-scrollbar-thumb{background:#232426;border-radius:4px}',
    '.gv-head{display:flex;align-items:center;gap:7px;flex-wrap:wrap;padding:11px 14px 8px;font-size:12.5px}',
    '.gv-head b{font-weight:550;font-variant-numeric:tabular-nums}',
    '.gv-sep{color:var(--fg4,#3c3f44)}',
    '.gv-note{font-size:11px;color:var(--fg4,#3c3f44);line-height:1.7}',
    '.gv-none{font-size:11.5px;color:var(--fg4,#3c3f44);padding:6px 0;line-height:1.8}',
    '.gv-filters{display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:0 14px 10px}',
    '.gv-search{flex:1 1 200px;min-width:140px}',
    '.gv-input{width:100%;height:26px;background:var(--panel2,#0b0c0d);border:1px solid var(--line,#1b1c1e);border-radius:6px;color:var(--fg,#f7f8f8);font-size:12.5px;padding:0 8px;outline:none;font-family:inherit}',
    '.gv-input::placeholder{color:var(--fg4,#3c3f44)}',
    '.gv-sel{height:26px;background:var(--panel2,#0b0c0d);border:1px solid var(--line,#1b1c1e);border-radius:6px;color:var(--fg2,#8a8f98);font-size:11.5px;padding:0 4px;font-family:inherit;outline:none;max-width:180px}',
    '.gv-btn{background:#17181b;border:1px solid var(--line2,#232426);border-radius:6px;color:var(--fg2,#8a8f98);font-size:11.5px;padding:4px 9px}',
    '.gv-btn:hover{background:#1d1e21;color:var(--fg,#f7f8f8)}',
    '.gv-h{font-size:11.5px;color:var(--fg3,#62666d);margin:14px 0 7px;letter-spacing:.02em}',
    '.gv-block{margin-top:14px}',
    '.gv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(196px,1fr));gap:8px}',
    '.gv-card{border:1px solid var(--line,#1b1c1e);border-radius:8px;background:var(--panel2,#0b0c0d);padding:8px 9px}',
    '.gv-card.on{border-color:var(--line2,#232426);background:#101113;grid-column:span 2}',
    '.gv-cardhead{display:flex;align-items:center;gap:6px;width:100%;font-size:12.5px;color:var(--fg,#f7f8f8)}',
    '.gv-cardhead:hover b{color:var(--accent2,#7c86e8)}',
    '.gv-ord{font-size:10px;color:var(--fg4,#3c3f44);border:1px solid var(--line2,#232426);border-radius:4px;padding:0 4px;line-height:15px}',
    '.gv-mut{font-size:10.5px;color:var(--fg4,#3c3f44)}',
    '.gv-cardmeta{display:flex;gap:5px;flex-wrap:wrap;font-size:11px;color:var(--fg3,#62666d);margin-top:5px}',
    '.gv-kinds{margin-top:8px;border-top:1px solid var(--line,#1b1c1e);padding-top:6px}',
    '.gv-kindrow{display:flex;align-items:center;gap:7px;width:100%;height:24px;padding:0 6px;border-radius:5px;color:var(--fg2,#8a8f98);font-size:11.5px}',
    '.gv-kindrow:hover{background:#161719;color:var(--fg,#f7f8f8)}',
    '.gv-kindrow.on{background:#1d1e21;color:var(--fg,#f7f8f8)}',
    '.gv-kn{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.gv-kc{font-size:10.5px;color:var(--fg4,#3c3f44);font-variant-numeric:tabular-nums}',
    '.gv-nodes{margin:4px 0 6px 8px;border-left:1px solid var(--line,#1b1c1e);padding-left:6px}',
    '.gv-row{display:flex;align-items:center;gap:7px;width:100%;min-height:26px;padding:3px 7px;border-radius:6px;color:var(--fg2,#8a8f98);font-size:12px}',
    '.gv-row:hover{background:#161719;color:var(--fg,#f7f8f8)}',
    '.gv-row.on{background:#1d1e21;color:var(--fg,#f7f8f8)}',
    '.gv-rl{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.gv-rs{flex:0 1 auto;color:var(--fg4,#3c3f44);font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:34%}',
    '.gv-rid{margin-left:auto;color:var(--fg4,#3c3f44);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:34%;direction:rtl;text-align:right}',
    '.gv-dot{width:6px;height:6px;border-radius:50%;flex:0 0 6px;display:inline-block;background:var(--fg4,#3c3f44)}',
    '.gv-s-ready{background:var(--ok,#4cb782)}.gv-s-scaffold{background:var(--warn,#f2c94c)}',
    '.gv-s-blocked{background:var(--bad,#eb5757)}.gv-s-missing{background:var(--fg4,#3c3f44)}',
    '.gv-more{margin-top:6px}',
    '.gv-edges{display:flex;flex-direction:column;gap:1px}',
    '.gv-edgerow{display:flex;align-items:center;gap:7px;flex-wrap:wrap;padding:4px 6px;border-radius:6px;font-size:11.5px;color:var(--fg2,#8a8f98)}',
    '.gv-edgerow:hover{background:#131416}',
    '.gv-ea{color:var(--fg,#f7f8f8)}',
    '.gv-arrow{color:var(--fg4,#3c3f44)}',
    '.gv-eb{color:var(--fg3,#62666d);font-variant-numeric:tabular-nums}',
    '.gv-echips{display:inline-flex;gap:4px;flex-wrap:wrap}',
    '.gv-ek{color:var(--fg3,#62666d)}',
    '.gv-foot{margin-top:7px;display:flex;gap:6px;align-items:center;flex-wrap:wrap}',
    '.gv-detail{overflow:auto;padding:11px 13px 30px;background:var(--panel2,#0b0c0d);scrollbar-width:thin;min-height:0}',
    '.gv-detail::-webkit-scrollbar{width:8px}.gv-detail::-webkit-scrollbar-thumb{background:#232426;border-radius:4px}',
    '.gv-dhead{display:flex;align-items:center;gap:7px;font-size:13.5px}',
    '.gv-dsub{font-size:10.5px;color:var(--fg4,#3c3f44);margin-top:4px;word-break:break-all}',
    '.gv-dsec{margin-top:14px;border-top:1px solid var(--line,#1b1c1e);padding-top:9px}',
    '.gv-sec{display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg3,#62666d);margin-bottom:6px}',
    '.gv-no{font-size:10px;color:var(--fg4,#3c3f44);border:1px solid var(--line2,#232426);border-radius:4px;padding:0 4px;line-height:15px;flex:0 0 auto}',
    '.gv-kv{display:flex;flex-direction:column;gap:2px}',
    '.gv-kvrow{display:flex;gap:7px;font-size:11.5px;line-height:1.7;align-items:baseline}',
    '.gv-kvk{flex:0 0 34%;color:var(--fg4,#3c3f44);word-break:break-all}',
    '.gv-kvv{flex:1;color:var(--fg2,#8a8f98);word-break:break-word;white-space:pre-wrap}',
    '.gv-p{font-size:11.5px;color:var(--fg2,#8a8f98);line-height:1.8;white-space:pre-wrap;word-break:break-word}',
    '.gv-callout{font-size:11.5px;color:var(--warn,#f2c94c);line-height:1.8;border-left:2px solid #4a4020;padding:4px 0 4px 8px;margin-top:5px}',
    '.gv-ref{display:block;width:100%;font-size:11px;color:var(--fg2,#8a8f98);word-break:break-all;padding:3px 6px;border-radius:5px;border-bottom:1px dashed var(--line2,#232426)}',
    '.gv-ref:hover{color:var(--accent2,#7c86e8);background:#131416}',
    '.gv-refro{border-bottom:0;color:var(--fg3,#62666d)}',
    '.gv-egroup{margin-top:6px}',
    '.gv-egk{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--fg3,#62666d);margin:6px 0 2px}',
    '.gv-erow{display:flex;align-items:center;gap:6px;width:100%;padding:3px 6px;border-radius:6px;font-size:11.5px;color:var(--fg2,#8a8f98);border-left:2px solid var(--line,#1b1c1e)}',
    '.gv-erow:hover{background:#161719;color:var(--fg,#f7f8f8)}',
    '.gv-erow.unrev{border-left-color:#4a4020}',
    '.gv-erd{color:var(--fg4,#3c3f44);flex:0 0 auto}',
    '.gv-erel{color:var(--fg,#f7f8f8);flex:0 0 auto}',
    '.gv-eother{color:var(--fg3,#62666d);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.gv-gap{border:1px solid var(--line,#1b1c1e);border-radius:7px;padding:7px 8px;margin-top:6px;background:#101113}',
    '.gv-gaphead{display:flex;align-items:center;gap:6px;font-size:12px;margin-bottom:4px}',
    '.gv-cta{background:#1b1d2b;border:1px solid #39406b;border-radius:6px;color:var(--accent2,#7c86e8);font-size:12px;padding:5px 10px}',
    '.gv-cta:hover{background:#20233a}',
    '.gv-route{border:1px solid var(--line,#1b1c1e);border-radius:9px;padding:10px 11px;margin-bottom:12px;background:var(--panel2,#0b0c0d)}',
    '.gv-fixture{border:1px solid #4a4020;background:#1a1608;color:var(--warn,#f2c94c);border-radius:6px;padding:5px 8px;font-size:11.5px;margin-bottom:8px;line-height:1.7}',
    '.gv-routehead{display:flex;align-items:center;gap:7px;flex-wrap:wrap;font-size:13.5px;margin-bottom:7px}',
    '.gv-step{border-left:2px solid var(--line,#1b1c1e);padding:3px 0 3px 8px;margin:5px 0}',
    '.gv-step.cur{border-left-color:var(--accent,#5e6ad2);background:#14151a}',
    '.gv-stephead{display:flex;align-items:center;gap:7px;width:100%;font-size:12.5px;color:var(--fg,#f7f8f8);padding:3px 5px;border-radius:6px}',
    '.gv-stephead:hover{background:#161719}',
    '.gv-cur{color:var(--accent2,#7c86e8);border-color:#39406b}',
    '.gv-chev{font-size:10.5px;color:var(--fg4,#3c3f44)}',
    '.gv-units{display:flex;gap:5px;flex-wrap:wrap;margin:4px 0 2px 6px}',
    '.gv-chip{background:#141519;border:1px solid var(--line,#1b1c1e);border-radius:5px;color:var(--fg2,#8a8f98);font-size:11px;padding:3px 7px}',
    '.gv-chip:hover{border-color:var(--line2,#232426);color:var(--fg,#f7f8f8)}',
    '.gv-stepbody{margin:5px 0 7px 6px}',
    '.gv-why{margin-top:7px}',
    '.gv-why b{display:block;font-size:10.5px;color:var(--fg4,#3c3f44);font-weight:500;letter-spacing:.03em;margin-bottom:3px}',
    '.gv-banner{border:1px solid var(--line2,#232426);border-radius:8px;padding:8px 10px;margin-bottom:8px;background:#101113;font-size:12px}',
    '.gv-banner.gv-mode-fixed{border-color:#4a4020;color:var(--warn,#f2c94c);background:#16130a}',
    '.gv-banner.gv-mode-real{border-color:#24462f;color:var(--ok,#4cb782);background:#0c1512}',
    '.gv-banner2{border-color:var(--line,#1b1c1e);color:var(--fg2,#8a8f98)}',
    '.gv-empty{border:1px dashed var(--line2,#232426);border-radius:8px;padding:18px;text-align:center;color:var(--fg3,#62666d);font-size:12.5px}',
    '.gv-v{margin:4px 0}',
    '.gv-vk{font-size:10.5px;color:var(--fg4,#3c3f44);margin-bottom:2px}',
    '.gv-vlist{display:flex;flex-direction:column;gap:4px}',
    '.gv-vitem{border-left:2px solid var(--line,#1b1c1e);padding-left:7px}',
    '.gv-evi{border:1px solid var(--line,#1b1c1e);border-radius:7px;padding:7px 8px;margin-top:6px;background:#101113}'
  ].join('\n');

  function injectStyle() {
    if (view.styleDone || !hasDom()) return;
    var doc = document, host = doc.head || doc.documentElement;
    if (!host || typeof host.appendChild !== 'function') return;
    var st = doc.createElement('style');
    st.setAttribute('data-gv-style', '1');
    st.textContent = CSS;   // 样式是模块常量，不是数据，仍然不用 innerHTML
    host.appendChild(st);
    view.styleDone = true;
  }

  /* ── 12. 导出 ──────────────────────────────────────────────────────────── */

  var api = {
    version: VERSION,

    mount: function (rootEl, opts) {
      if (!hasDom()) {
        // 没有 DOM 就直接说清楚并返回，不抛异常（Node 侧只当纯函数库用）。
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('[总图视图] 当前环境没有 DOM（typeof document === "undefined" 或没有 createElement），未挂载；' +
            '本模块在 Node 里只提供 _filterNodes/_counts/_routeModel/_traceSegments 等纯函数。');
        }
        return { ok: false, reason: 'no-dom', version: VERSION };
      }
      if (!rootEl || typeof rootEl.appendChild !== 'function') {
        if (typeof console !== 'undefined' && console.warn) console.warn('[总图视图] mount 的第一个参数不是可挂载的元素，未挂载。');
        return { ok: false, reason: 'no-root', version: VERSION };
      }
      opts = isObj(opts) ? opts : {};
      // 换宿主元素 = 重新起画：回到契约默认的 map，清掉上一个宿主的展开/筛选/选中。
      // 同一个宿主重挂（数据换了再挂一次）则保留用户当前所在的 tab 与筛选。
      if (view.root !== rootEl) resetViewState();
      view.root = rootEl;
      view.index = buildIndex(opts.graph);
      view.session = opts.session || null;
      view.handlers = {
        onOpenUnit: opts.onOpenUnit, onOpenEntry: opts.onOpenEntry,
        onSelectNode: opts.onSelectNode, onOpenSource: opts.onOpenSource
      };
      view.mounted = true;
      injectStyle();
      render();
      return { ok: true, version: VERSION, tab: view.tab, nodes: view.index.nodes.length, edges: view.index.edges.length };
    },

    setTab: function (tab) {
      if (tab !== 'map' && tab !== 'route' && tab !== 'trace') return false;
      if (!view.mounted) return false;   // 没有视图可切：不偷偷记下，免得调用顺序改变结果
      return setTabState(tab, true);
    },

    refresh: function () {
      // 会话状态变了（fire/pause/resume 之后）重画；视图状态（展开/筛选/选中）保留。
      if (!view.mounted) return false;
      return render();
    },

    /* 以下为测试用纯函数（不碰 DOM） */
    _index: buildIndex,
    _filterNodes: _filterNodes,
    _counts: _counts,
    _layerSummaries: _layerSummaries,
    _edgeLayerSummary: _edgeLayerSummary,
    _routeModel: _routeModel,
    _traceSegments: _traceSegments,
    _evidenceList: _evidenceList,
    _disabledActivities: _disabledActivities,
    _gapsFor: _gapsFor,
    _isFixtureRoute: isFixtureRoute,
    _PAGE_SIZE: PAGE_SIZE
  };

  return api;
});
