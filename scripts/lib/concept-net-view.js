/* ══════════════════════════════════════════════════════════════════════════════
   知所栖 135 · 概念网络图（concept-net-view.js）

   规格：docs/概念网络图-产出规格-20260915.md（R1—R8）
   数据：knowledge/概念网络-260915/<unitId>.json（scripts/build-concept-net.mjs 产出）

   为什么是「Node 端算数据 + 浏览器端画 SVG」：
     · 层与边是数据，不是样式 —— 层排错等于内容错，所以层在数据里（JSON 的 layers/node.layer），
       视图只按 layer 顺序排，不自己发明分层；
     · 布局（节点坐标 / 边曲线 / 标签避让）是纯函数，浏览器与 Node 都能跑同一个函数
       （见 layout()），验收脚本不用开浏览器就能断言「有没有重叠、有没有出画布」；
     · 只有 basis==='quote' 的边会画出来（R1）。其余在体检里，不在这儿悄悄补一条。

   本模块不判断教学内容，也不联网。
   ══════════════════════════════════════════════════════════════════════════════ */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CONCEPT_NET = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var VERSION = 'v1';

  /* ── 布局常量（世界尺寸，不随容器变，缩放交给 viewBox） ─────────────────── */
  var NODE_W = 168, NODE_H = 46, H_GAP = 30, LAYER_GAP = 118, PAD = 26;
  var TAIL = 42;                     // 末层同层弧与标签要的地方（不给就在画布外）
  var LABEL_H = 17;

  function s(v) { return typeof v === 'string' ? v : (typeof v === 'number' ? String(v) : ''); }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function esc(v) {
    return s(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ══ 纯函数层：吃 net，出坐标。Node 端验收脚本直接调这个。 ══════════════ */

  function layout(net) {
    var layers = arr(net && net.layers).filter(function (l) { return l && l.id; });
    var nodes = arr(net && net.nodes).filter(function (n) { return n && n.id; });
    var edges = arr(net && net.edges).filter(function (e) { return e && e.basis === 'quote'; });

    var byLayer = new Map();
    layers.forEach(function (l) { byLayer.set(l.id, []); });
    var orphans = [];
    nodes.forEach(function (n) {
      var k = byLayer.has(n.layer) ? n.layer : null;
      if (k === null) { orphans.push(n.id); byLayer.get(layers[0] && layers[0].id).push(n); }
      else byLayer.get(k).push(n);
    });

    // 节点坐标：每层居中，层内按「先 core 后 linked」排
    var pos = {};
    var maxRow = 1;
    layers.forEach(function (l) { maxRow = Math.max(maxRow, byLayer.get(l.id).length); });
    var contentW = maxRow * NODE_W + (maxRow - 1) * H_GAP;
    var width = contentW + PAD * 2;
    var height = layers.length * (NODE_H + LAYER_GAP) - LAYER_GAP + PAD * 2 + TAIL;
    var centers = {};

    layers.forEach(function (l, li) {
      var row = byLayer.get(l.id).slice().sort(function (a, b) {
        var ra = a.role === 'core' ? 0 : 1, rb = b.role === 'core' ? 0 : 1;
        return ra - rb;
      });
      byLayer.set(l.id, row);
      var total = row.length * NODE_W + (row.length - 1) * H_GAP;
      var x0 = PAD + (contentW - total) / 2;
      var cy = PAD + li * (NODE_H + LAYER_GAP) + NODE_H / 2;
      centers[l.id] = cy;
      row.forEach(function (n, i) {
        pos[n.id] = { x: x0 + i * (NODE_W + H_GAP), y: cy - NODE_H / 2, cx: x0 + i * (NODE_W + H_GAP) + NODE_W / 2, cy: cy, w: NODE_W, h: NODE_H, layer: l.id, layerIndex: li };
      });
    });

    // 边：三次贝塞尔；向下走用底→顶，向上/同层走侧边绕行
    var geo = [];
    edges.forEach(function (e) {
      var a = pos[e.from], b = pos[e.to];
      if (!a || !b) return;                    // 断链由体检报，不在这儿画
      var p, c1, c2, q;
      if (b.layerIndex > a.layerIndex) {
        var y1 = a.y + a.h, y2 = b.y;
        p = [a.cx, y1]; q = [b.cx, y2];
        var dy = Math.max(26, (y2 - y1) / 2);
        c1 = [a.cx, y1 + dy]; c2 = [b.cx, y2 - dy];
      } else if (b.layerIndex < a.layerIndex) {
        // 向上/回指的边：走单侧边道，整条曲线留在画布里（两侧都走 = S 形，读不出方向）
        var mid2 = (a.cx + b.cx) / 2, side = mid2 <= width / 2 ? -1 : 1;
        var channel = side < 0 ? PAD / 2 + 8 : width - PAD / 2 - 8;
        p = [side < 0 ? a.x : a.x + a.w, a.cy];
        q = [side < 0 ? b.x : b.x + b.w, b.cy];
        c1 = [channel, a.cy]; c2 = [channel, b.cy];
      } else {
        // 同层：走一条从两个节点下方绕过去的小弧，标签落在弧底（两个节点之间只有 30px，塞不下标签）
        var lr = a.cx <= b.cx ? 1 : -1;
        var yb = a.cy + a.h / 4;
        p = [a.cx + lr * a.w / 2, yb]; q = [b.cx - lr * b.w / 2, yb];
        c1 = [p[0] + lr * 46, yb + 52]; c2 = [q[0] - lr * 46, yb + 52];
      }
      var mid = bez(p, c1, c2, q);
      geo.push({ edge: e, d: 'M' + r(p[0]) + ',' + r(p[1]) + ' C' + r(c1[0]) + ',' + r(c1[1]) + ' ' + r(c2[0]) + ',' + r(c2[1]) + ' ' + r(q[0]) + ',' + r(q[1]), mid: mid, lx: mid[0], ly: mid[1] });
    });

    // 标签避让：先把**节点**占位（标签压到节点上等于没画），再贪心放标签，压不住就上下挪，
    // 还压不住就沿边方向横向让位；全部失败才保留 overlap 标记（体检会抓）。
    var placed = Object.keys(pos).map(function (id) { return { x: pos[id].x, y: pos[id].y, w: pos[id].w, h: pos[id].h }; });
    geo.forEach(function (g) {
      var w = labelW(g.edge.label);
      var lx = Math.min(Math.max(g.lx, 6 + w / 2), width - 6 - w / 2);   // 先夹进画布，再避让
      var cands = [[0, 0], [0, -13], [0, 13], [0, -26], [0, 26], [0, -39], [0, 39], [0, -52], [0, 52],
        [-1, 0], [1, 0], [-1, -13], [1, 13], [-1, 13], [1, -13], [-1, -26], [1, 26]];
      for (var i = 0; i < cands.length; i++) {
        var dx = cands[i][0] * (w / 2 + 12);
        var box = { x: lx + dx - w / 2, y: g.ly + cands[i][1] - LABEL_H / 2, w: w, h: LABEL_H };
        if (box.x < 4 || box.x + box.w > width - 4) continue;
        var hit = placed.some(function (b) { return !(box.x + box.w < b.x || b.x + b.w < box.x || box.y + box.h < b.y || b.y + b.h < box.y); });
        if (!hit) { placed.push(box); g.label = box; break; }
      }
      if (!g.label) { var b2 = { x: lx - w / 2, y: g.ly - LABEL_H / 2, w: w, h: LABEL_H }; placed.push(b2); g.label = b2; g.overlap = true; }
    });

    return { width: Math.round(width), height: Math.round(height), layers: layers, rows: byLayer, pos: pos, geo: geo, orphans: orphans, contentW: contentW };
  }

  function bez(p, c1, c2, q) { var t = 0.5, mt = 1 - t; return [mt * mt * mt * p[0] + 3 * mt * mt * t * c1[0] + 3 * mt * t * t * c2[0] + t * t * t * q[0], mt * mt * mt * p[1] + 3 * mt * mt * t * c1[1] + 3 * mt * t * t * c2[1] + t * t * t * q[1]]; }
  function r(n) { return Math.round(n * 10) / 10; }
  // 中文按 12px 一字、西文按 6.6px 估宽：只用于避让，不用于排版
  function labelW(t) { var x = s(t), w = 0; for (var i = 0; i < x.length; i++) w += /[\u4e00-\u9fa5\uff00-\uffef]/.test(x[i]) ? 12 : 6.6; return Math.max(18, Math.ceil(w) + 8); }

  /* ══ 渲染层 ═══════════════════════════════════════════════════════════ */

  /* 深色主题（页面 --bg #08090a / --panel2 #0b0c0d）：层带用低透明染色，节点用面板色＋层色描边。
     颜色写在这里而不是 CSS 里，是因为层色要跟层的顺序绑定（第 i 层一个色），CSS 拿不到这个序号。 */
  var LAYER_TINT = ['rgba(94,106,210,.13)', 'rgba(63,160,120,.13)', 'rgba(224,169,74,.12)', 'rgba(150,110,220,.13)', 'rgba(70,160,180,.13)', 'rgba(210,110,110,.12)'];
  var LAYER_LINE = ['#5e6ad2', '#3fa078', '#e0a94a', '#966edc', '#46a0b4', '#d26e6e'];

  function svg(net, opts) {
    opts = opts || {};
    var L = layout(net);
    var hi = opts.highlightLayer || null;
    var out = [];
    out.push('<svg class="cn-svg" viewBox="0 0 ' + L.width + ' ' + L.height + '" width="100%" role="img" aria-label="' + esc((net.title || '概念网络') + '：' + L.layers.length + ' 层 ' + arr(net.nodes).length + ' 个概念 ' + L.geo.length + ' 条带标签的关系') + '">');
    out.push('<defs><marker id="cn-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#8a8f98"/></marker>'
      + '<marker id="cn-arrow-hot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e07a2f"/></marker></defs>');

    // 层带
    L.layers.forEach(function (l, i) {
      var row = L.rows.get(l.id) || [];
      var y = PAD + i * (NODE_H + LAYER_GAP) - 21;
      out.push('<rect class="cn-band" x="' + PAD / 2 + '" y="' + y + '" width="' + (L.width - PAD) + '" height="' + (NODE_H + 34) + '" rx="12" fill="' + LAYER_TINT[i % LAYER_TINT.length] + '"' + (hi && hi !== l.id ? ' opacity="0.35"' : '') + '/>');
      out.push('<text class="cn-layer" x="' + (PAD / 2 + 10) + '" y="' + (y + 13) + '">' + esc(l.name) + '</text>');
    });

    // 边（先画，压在节点下面）
    L.geo.forEach(function (g) {
      var e = g.edge;
      out.push('<path class="cn-edge" data-a="' + esc(e.from) + '" data-b="' + esc(e.to) + '" d="' + g.d + '" fill="none" marker-end="url(#cn-arrow)"/>');
    });

    // 节点
    L.layers.forEach(function (l, i) {
      (L.rows.get(l.id) || []).forEach(function (n) {
        var p = L.pos[n.id];
        var cls = 'cn-node' + (n.role === 'core' ? ' cn-core' : '');
        out.push('<g class="' + cls + '" data-id="' + esc(n.id) + '"' + (n.ref && n.ref.kind === 'cm' && n.ref.id ? ' data-cm="' + esc(n.ref.id) + '"' : '')
          + (typeof n.card === 'number' ? ' data-card="' + n.card + '"' : '') + '>'
          + '<rect x="' + r(p.x) + '" y="' + r(p.y) + '" width="' + p.w + '" height="' + p.h + '" rx="10" fill="#111216" stroke="' + LAYER_LINE[i % LAYER_LINE.length] + '" stroke-width="' + (n.role === 'core' ? 2 : 1) + '"/>'
          + '<text x="' + r(p.cx) + '" y="' + r(p.cy + 5) + '" text-anchor="middle">' + esc(n.name) + '</text></g>');
      });
    });

    // 边标签最后画：避让算过节点，再被节点盖住就等于没画
    L.geo.forEach(function (g) {
      var e = g.edge, b = g.label;
      out.push('<g class="cn-elabel' + (g.overlap ? ' cn-elabel-warn' : '') + '" data-a="' + esc(e.from) + '" data-b="' + esc(e.to) + '">'
        + '<rect x="' + r(b.x) + '" y="' + r(b.y) + '" width="' + b.w + '" height="' + b.h + '" rx="8"/>'
        + '<text x="' + r(b.x + b.w / 2) + '" y="' + r(b.y + b.h / 2 + 4) + '" text-anchor="middle">' + esc(e.label) + '</text></g>');
    });
    out.push('</svg>');
    return out.join('');
  }

  function legend(net) {
    var L = layout(net);
    var direct = arr(net.edges).filter(function (e) { return e.evidenceStrength === 'direct'; }).length;
    return '<div class="cn-legend"><b>' + L.layers.length + '</b> 层 · <b>' + arr(net.nodes).length + '</b> 个概念 · <b>' + L.geo.length + '</b> 条带标签的关系'
      + '<span class="cn-sep">·</span>每条关系都带逐字原文（点节点可看）'
      + (direct ? '<span class="cn-sep">·</span>其中 ' + direct + ' 条原句同时提到两端' : '')
      + '<span class="cn-sep">·</span><span class="cn-warn">机器生成，未经人工审核</span></div>';
  }

  function render(net, opts) {
    opts = opts || {};
    if (!net || !arr(net.layers).length) return '<div class="cn-empty">这一篇还没有概念网络图。</div>';
    var id = 'cn-' + esc(net.unitId || 'x');
    return '<figure class="cn-fig" id="' + id + '" data-unit="' + esc(net.unitId || '') + '">'
      + '<div class="cn-head">' + esc(net.title || '') + (net.entryQuestion ? '<span class="cn-eq">' + esc(net.entryQuestion) + '</span>' : '') + '</div>'
      + '<div class="cn-canvas">' + svg(net, opts) + '</div>'
      + legend(net)
      + '<div class="cn-detail" hidden></div>'
      + '</figure>';
  }

  /* 交互：悬停高亮邻域 + 点节点看那条边的原文 + 跳概念地图。全部走 addEventListener，不拼 inline handler。 */
  function mount(host, net, opts) {
    if (!host) return null;
    host.innerHTML = render(net, opts);
    var fig = host.querySelector('.cn-fig');
    if (!fig) return null;
    var detail = fig.querySelector('.cn-detail');
    var edges = Array.prototype.slice.call(fig.querySelectorAll('.cn-edge'));
    var labels = Array.prototype.slice.call(fig.querySelectorAll('.cn-elabel'));
    var nodes = Array.prototype.slice.call(fig.querySelectorAll('.cn-node'));
    var byId = new Map(arr(net.nodes).map(function (n) { return [n.id, n]; }));
    var edgeByPair = new Map(arr(net.edges).map(function (e) { return [e.from + '|' + e.to, e]; }));

    function focus(id) {
      fig.classList.add('cn-focusing');
      edges.concat(labels).forEach(function (el) {
        var hit = el.getAttribute('data-a') === id || el.getAttribute('data-b') === id;
        el.classList.toggle('cn-hot', hit);
      });
      nodes.forEach(function (el) { el.classList.toggle('cn-dim', el.getAttribute('data-id') !== id); });
    }
    function clear() {
      fig.classList.remove('cn-focusing');
      edges.concat(labels).forEach(function (el) { el.classList.remove('cn-hot'); });
      nodes.forEach(function (el) { el.classList.remove('cn-dim'); });
    }
    nodes.forEach(function (el) {
      el.addEventListener('mouseenter', function () { focus(el.getAttribute('data-id')); });
      el.addEventListener('mouseleave', clear);
      el.addEventListener('click', function () {
        var id = el.getAttribute('data-id');
        var mine = arr(net.edges).filter(function (e) { return e.from === id || e.to === id; });
        var n = byId.get(id) || {};
        detail.hidden = false;
        detail.innerHTML = '<div class="cn-dt-h">' + esc(n.name || '') + '</div>'
          + (mine.length ? mine.map(function (e) {
            var a = byId.get(e.from) || {}, b = byId.get(e.to) || {};
            return '<div class="cn-dt-e"><b>' + esc(a.name || '') + '</b> —' + esc(e.label) + '→ <b>' + esc(b.name || '') + '</b>'
              + (e.quote ? '<div class="cn-q">「' + esc(String(e.quote).slice(0, 240)) + '」<span class="cn-src">' + esc(e.quoteFrom || '') + '</span></div>' : '')
              + (e.sentence ? '<div class="cn-sent">' + esc(String(e.sentence).slice(0, 240)) + '</div>' : '') + '</div>';
          }).join('') : '<div class="cn-mut">这个节点在这张图里没有连线。</div>')
          + (n.ref && n.ref.id ? '<button class="cn-jump" data-cm="' + esc(n.ref.id) + '">在地图里打开这张概念卡 →</button>' : '');
        var jb = detail.querySelector('.cn-jump');
        if (jb) jb.addEventListener('click', function () {
          var cm = jb.getAttribute('data-cm');
          if (typeof window !== 'undefined' && typeof window.mapFromNeican === 'function') window.mapFromNeican(cm);
        });
        // 同一篇里点了节点 → 顺带滚到那张概念卡（旧高亮清掉，只留当前一张）
        var card = el.getAttribute('data-card');
        if (card !== null && typeof document !== 'undefined') {
          var t = document.getElementById('nei-card-' + card);
          if (t) {
            var prev = document.querySelector('.cn-card-hit');
            if (prev) prev.classList.remove('cn-card-hit');
            t.classList.add('cn-card-hit');
            if (typeof t.scrollIntoView === 'function') t.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
    return { layout: layout(net), destroy: function () { host.innerHTML = ''; } };
  }

  return { VERSION: VERSION, render: render, svg: svg, layout: layout, mount: mount, legend: legend, _internals: { esc: esc, labelW: labelW, bez: bez } };
});
