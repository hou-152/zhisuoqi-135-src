#!/usr/bin/env node
// 260912 期「内参」一栏：把已加工的三产物渲染成 AI 内参图文格式（主题 / 重要等级 / 地址 /
// Claude 官方手绘编辑插画风格配图 / 原文子链接 / 原文简介 / 入选理由 / 三级笔记 / 概念网络 / 费曼×3）。
//
// 输入：knowledge/内参-260912/{编辑日志.md, 原文/, 三级笔记/, 概念辞典/, AI费曼/, 拆解五维/}
// 输出：knowledge/内参-260912/内参-页面数据.json   ← build-shell.mjs 注入壳
// 缓存：knowledge/内参-260912/内参-元数据.json     ← 真 LLM 产物，断点续跑
//
// 用法：node scripts/build-neican.mjs [--force]       --force 重烧 LLM 元数据
// 证据等级：实测（LLM 产物为真调用输出，未做人核对，引用前抽查；配图为程序化 SVG，非位图生成）

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chatCompletion } from './lib/llm.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'knowledge', '内参-260912');
const META_CACHE = path.join(SRC, '内参-元数据.json');
const OUT = path.join(SRC, '内参-页面数据.json');
const FORCE = process.argv.includes('--force');

// ── 凭证：只补未设置的变量（与 serve-135.mjs 同规则），不打印任何值 ──────────
for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Z_]+)=(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE, LLM_API_KEY, LLM_MODEL } = process.env;
const llmReady = Boolean(LLM_API_BASE && LLM_API_KEY && LLM_MODEL);
if (!llmReady) console.warn('⚠ LLM 未配置 —— 只重建页面，不补元数据');

// ── 1. 篇目顺序与字数：直接读编辑日志（它就是那一轮的记账） ────────────────
const log = fs.readFileSync(path.join(SRC, '编辑日志.md'), 'utf8');
const ITEMS = [...log.matchAll(/^- ✅ (.+?)（([a-z0-9-]+)）原文 (\d+) 字$/gm)]
  .map(m => ({ title: m[1], slug: m[2], words: Number(m[3]) }));
if (!ITEMS.length) { console.error('❌ 编辑日志里没解析到篇目'); process.exit(2); }

// ── 2. 原文头部元信息 ────────────────────────────────────────────────────
function parseSource(slug) {
  const md = fs.readFileSync(path.join(SRC, '原文', slug + '.md'), 'utf8');
  const field = (k) => (md.match(new RegExp(`^- ${k}：(.*)$`, 'm')) || [])[1]?.trim() || '';
  return {
    url: field('原文'),
    author: field('作者'),
    summary: field('摘要'),
    fetched: field('抓取'),
    body: md.split(/\n---\n/).slice(1).join('\n---\n').trim(),
  };
}

// ── 3. 元数据（主题 / 重要等级 / 入选理由 / 视觉隐喻 / 配色）：真 LLM，带缓存 ──
const PALETTES = {
  cactus: ['#BCD1CA', '深思 · 系统 · 机构'],
  heather: ['#CBCADB', '技术 · 研究 · 反身'],
  oat: ['#E3DACC', '人 · 平稳 · 协作'],
  clay: ['#D97757', '发布 · 紧迫 · 强编辑'],
  olive: ['#788C5D', '生长 · 韧性 · 环境'],
  sky: ['#6A9BCC', '开放 · 基础设施 · 沟通'],
  fig: ['#C46686', '创造 · 文化 · 身份'],
  coral: ['#EBCECE', '照护 · 社群 · 可及'],
};
let cache = {};
if (fs.existsSync(META_CACHE)) cache = JSON.parse(fs.readFileSync(META_CACHE, 'utf8'));

const SYS = `你在给一份中文 AI 内参做条目卡。只输出 JSON，不要解释。
字段：
- topic：主题标签，6–12 个汉字，是这一篇讲的那个东西（不是标题的缩写）。
- stars：重要等级，1–5 的整数。判据是三件事——对「AI 时代怎么做事」的通用性、信息的不可替代性（有没有别人没有的一手事实或机制）、时效性。四星以上要能说出具体理由。
- starReason：为什么给这个等级，一句话，40 字以内。
- why：入选理由，2 句以内，说清今天为什么值得读它，不要复述标题。
- metaphor：一个可以画出来的视觉隐喻，一个名词短语（例：一只手托着一块方砖 / 三级台阶 / 漏斗 / 分叉的路 / 咬合的齿轮），不要抽象概念。
- palette：从这些里选一个最贴的：cactus（系统·机构）heather（技术·研究）oat（人·协作）clay（发布·紧迫）olive（生长）sky（基础设施·沟通）fig（创造）coral（社群）。`;

const materials = (slug) => {
  const src = parseSource(slug);
  const notes = fs.readFileSync(path.join(SRC, '三级笔记', slug + '.md'), 'utf8');
  const item = ITEMS.find(i => i.slug === slug);
  return `标题：${item.title}\n来源：${src.author || ''}（${src.url}）\n原文字数：${item.words}\n原文摘要：${src.summary}\n\n三级笔记前 3000 字：\n${notes.slice(0, 3000)}`;
};

let tokens = 0, calls = 0;
for (const it of ITEMS) {
  if (!FORCE && cache[it.slug]?.stars) continue;
  if (!llmReady) break;
  const r = await chatCompletion({
    base: LLM_API_BASE, key: LLM_API_KEY, model: LLM_MODEL, json: true, maxTokens: 1600,
    messages: [{ role: 'system', content: SYS }, { role: 'user', content: materials(it.slug) }],
  });
  calls++; tokens += r.tokens || 0;
  if (!r.ok) { console.warn(`⚠ ${it.slug} LLM 失败：${r.error} ${r.detail || ''}`); continue; }
  try {
    const j = JSON.parse(r.content);
    cache[it.slug] = {
      topic: String(j.topic || '').slice(0, 20),
      stars: Math.min(5, Math.max(1, Math.round(Number(j.stars) || 3))),
      starReason: String(j.starReason || '').slice(0, 80),
      why: String(j.why || '').slice(0, 160),
      metaphor: String(j.metaphor || '').slice(0, 40),
      palette: PALETTES[j.palette] ? j.palette : 'heather',
    };
    fs.writeFileSync(META_CACHE, JSON.stringify(cache, null, 1));
    console.log(`  · ${it.slug} ★${cache[it.slug].stars} ${cache[it.slug].topic}`);
  } catch (e) { console.warn(`⚠ ${it.slug} 返回不是 JSON：${r.content.slice(0, 80)}`); }
}

// ── 4. Claude 官方手绘编辑插画风格配图（程序化 SVG，非位图） ─────────────────
// 三层结构照 anthropic-art 的规格：满幅不透明accent 底 + 不规则象牙白承载形 + 近黑手势线。
// 调色板与画法取自该 skill 的 references/style-spec.md（#141413 线 / #FAF9F5 承载形）。
const INK = '#141413', IVORY = '#FAF9F5';
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const rng = (seed) => { let a = seed; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };

const GLYPHS = {
  block: [[[.28, .52], [.72, .52], [.72, .93], [.28, .93], [.28, .52]],
          [[.40, .52], [.40, .24], [.44, .20], [.47, .24], [.47, .40]],
          [[.50, .52], [.50, .17], [.54, .13], [.57, .17], [.57, .52]],
          [[.60, .52], [.60, .22], [.63, .18], [.66, .22], [.66, .34]]],
  steps: [[[.20, .90], [.42, .90], [.42, .66], [.58, .66], [.58, .42], [.74, .42], [.74, .20]],
          [[.80, .20], [.74, .20], [.74, .30]]],
  funnel: [[[.22, .20], [.78, .20], [.58, .58], [.58, .86]],
           [[.44, .86], [.72, .86]]],
  fork: [[[.50, .88], [.50, .52], [.28, .30], [.28, .16]],
         [[.50, .52], [.72, .30], [.72, .16]],
         [[.20, .26], [.28, .16], [.36, .26]],
         [[.64, .26], [.72, .16], [.80, .26]]],
  loop: [[[.50, .86], [.24, .62], [.24, .34], [.50, .16], [.76, .34], [.76, .62], [.62, .74]],
         [[.56, .80], [.50, .86], [.60, .88]]],
  stack: [[[.22, .24], [.78, .24]], [[.22, .48], [.78, .48]], [[.22, .72], [.78, .72]],
          [[.44, .31], [.56, .31]], [[.44, .55], [.56, .55]], [[.44, .79], [.56, .79]]],
  scales: [[[.50, .14], [.50, .84]], [[.22, .24], [.78, .24]], [[.16, .86], [.84, .86]],
           [[.10, .46], [.24, .30], [.38, .46]], [[.62, .46], [.76, .30], [.90, .46]]],
  net: [[[.24, .34], [.50, .18], [.76, .36], [.62, .74], [.34, .72], [.24, .34]],
        [[.50, .18], [.62, .74]], [[.76, .36], [.34, .72]]],
  ladder: [[[.34, .90], [.34, .14]], [[.66, .90], [.66, .14]],
           [[.34, .72], [.66, .72]], [[.34, .52], [.66, .52]], [[.34, .32], [.66, .32]]],
  gear: [[[.50, .18], [.62, .28], [.74, .26], [.78, .40], [.88, .48], [.82, .60], [.84, .74],
          [.70, .78], [.62, .88], [.50, .82], [.38, .88], [.30, .78], [.16, .74], [.18, .60],
          [.12, .48], [.22, .40], [.26, .26], [.38, .28], [.50, .18]]],
  wave: [[[.14, .62], [.28, .40], [.40, .58], [.52, .32], [.64, .56], [.78, .34], [.88, .50]]],
};
const GLYPH_KEYS = Object.keys(GLYPHS);
function pickGlyph(metaphor, seed) {
  const t = String(metaphor || '') + seed;
  const table = [[/手|托|拿|握|搬/, 'block'], [/台阶|阶梯|一步一步|爬|升级/, 'steps'],
    [/漏斗|筛|过滤|收窄|收敛/, 'funnel'], [/分叉|两条|选择|岔路|分支/, 'fork'],
    [/循环|回路|闭环|轮|反复/, 'loop'], [/层|堆|叠|栈|积木/, 'stack'],
    [/天平|权衡|平衡|取舍|秤/, 'scales'], [/网|节点|连接|关系|图谱/, 'net'],
    [/梯|层级|梯度|刻度/, 'ladder'], [/齿轮|机器|咬合|引擎|飞轮/, 'gear'],
    [/水|流|波|河|管道/, 'wave']];
  for (const [re, k] of table) if (re.test(t)) return k;
  return GLYPH_KEYS[hash(seed) % GLYPH_KEYS.length];
}
function heroSVG(slug, metaphor, paletteKey, topic) {
  const rand = rng(hash(slug));
  const bg = PALETTES[paletteKey][0];
  const W = 1000, H = 440;
  // 承载形：不规则圆角块，采样后加抖动，再用二次平滑连成闭合路径
  const cx = W * 0.5, cy = H * 0.52, rx = W * 0.235, ry = H * 0.30, N = 14;
  const pts = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const k = 1 + (rand() - 0.5) * 0.16;
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${mid(pts[N - 1], pts[0]).map(v => v.toFixed(1)).join(' ')}`;
  for (let i = 0; i < N; i++) {
    const m = mid(pts[i], pts[(i + 1) % N]);
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  d += ' Z';
  // 手势线：归一化坐标 → 画布，逐点轻微抖动，圆头粗线
  const glyph = GLYPHS[pickGlyph(metaphor, slug)];
  const bw = W * 0.30, bh = H * 0.58, bx = cx - bw / 2, by = cy - bh / 2;
  const strokes = glyph.map(line => {
    const p = line.map(([x, y], i) => {
      const jx = i === 0 || i === line.length - 1 ? 0 : (rand() - 0.5) * 6;
      const jy = i === 0 || i === line.length - 1 ? 0 : (rand() - 0.5) * 6;
      return `${(bx + x * bw + jx).toFixed(1)} ${(by + y * bh + jy).toFixed(1)}`;
    });
    return `<path d="M ${p.join(' L ')}"/>`;
  }).join('');
  const dots = Array.from({ length: 3 }, () =>
    `<circle cx="${(cx + (rand() - 0.5) * W * 0.5).toFixed(0)}" cy="${(cy + (rand() - 0.5) * H * 0.7).toFixed(0)}" r="${(3 + rand() * 4).toFixed(1)}" fill="${INK}"/>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(topic)}">`
    + `<rect width="${W}" height="${H}" fill="${bg}"/>`
    + `<path d="${d}" fill="${IVORY}"/>`
    + `<g fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${strokes}</g>`
    + dots + '</svg>';
}

// ── 5. Markdown 渲染（只覆盖这批文件真实用到的构造） ────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
  .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
function mdToHtml(md, { dropFirstH1 = true } = {}) {
  const lines = md.split('\n');
  const out = []; let inCode = false, list = null, quote = null;
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  const closeQuote = () => { if (quote) { out.push(`<blockquote>${quote.join(' ')}</blockquote>`); quote = null; } };
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i], line = raw.trim();
    if (line.startsWith('```')) {
      closeList(); closeQuote();
      if (inCode) { out.push('</code></pre>'); inCode = false; } else { out.push('<pre><code>'); inCode = true; }
      continue;
    }
    if (inCode) { out.push(esc(raw)); continue; }
    if (!line) { closeList(); closeQuote(); continue; }
    if (line === '---') { closeList(); closeQuote(); out.push('<hr>'); continue; }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      closeList(); closeQuote();
      const lv = h[1].length;
      if (dropFirstH1 && lv === 1) { dropFirstH1 = false; continue; }
      out.push(`<h${Math.min(6, lv + 1)}>${inline(h[2])}</h${Math.min(6, lv + 1)}>`);
      continue;
    }
    if (line.startsWith('> ')) { quote.push(inline(line.slice(2))); continue; }
    const li = raw.match(/^(\s*)-\s+(.*)$/);
    if (li) {
      closeQuote();
      const depth = Math.floor(li[1].length / 2);
      if (!list) { out.push(depth ? '<ul class="sub">' : '<ul>'); list = 'ul'; }
      else if (depth > 0) { /* 二级条目仍留在同一列表里，用样式区分 */ }
      out.push(`<li${depth ? ' class="s"' : ''}>${inline(li[2])}</li>`);
      continue;
    }
    closeList(); closeQuote();
    out.push(`<p>${inline(line)}</p>`);
  }
  closeList(); closeQuote();
  return out.join('\n');
}

// 概念辞典 → 卡片（每个概念一张：名称 + 原文 context 引文 + 费曼一下）
function conceptCards(md) {
  const blocks = md.split(/\n###\s+/).slice(1);
  return blocks.map(b => {
    const [head, ...rest] = b.split('\n');
    const name = head.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').trim();
    const body = rest.join('\n');
    const quotes = [...body.matchAll(/^\s*>\s?(.*)$/gm)].map(m => m[1].trim()).filter(Boolean);
    const feyn = (body.match(/- \*\*费曼一下\*\*：([\s\S]*?)(?=\n- \*\*|\n###|$)/) || [])[1]?.trim() || '';
    return { name, quotes, feynman: inline(feyn) };
  }).filter(c => c.name);
}

// ── 6. 组装 ────────────────────────────────────────────────────────────────
const articles = ITEMS.map((it, idx) => {
  const src = parseSource(it.slug);
  const m = cache[it.slug] || {};
  const dim = JSON.parse(fs.readFileSync(path.join(SRC, '拆解五维', it.slug + '.json'), 'utf8'));
  const notes = fs.readFileSync(path.join(SRC, '三级笔记', it.slug + '.md'), 'utf8');
  const concepts = fs.readFileSync(path.join(SRC, '概念辞典', it.slug + '.md'), 'utf8');
  const feyn = fs.readFileSync(path.join(SRC, 'AI费曼', it.slug + '.md'), 'utf8');
  return {
    slug: it.slug, no: idx + 1, title: it.title, words: it.words,
    url: src.url, author: src.author, summary: src.summary, fetched: src.fetched,
    topic: m.topic || '', stars: m.stars || 3, starReason: m.starReason || '', why: m.why || '',
    metaphor: m.metaphor || '', palette: m.palette || 'heather',
    paletteBg: PALETTES[m.palette || 'heather'][0],
    hero: heroSVG(it.slug, m.metaphor, m.palette || 'heather', m.topic || it.title),
    notes: mdToHtml(notes),
    conceptCards: conceptCards(concepts),
    feynman: {
      short: dim.feynman?.demo || '',
      long: mdToHtml(feyn),
      rubric: dim.feynman?.rubric || [],
    },
    oneLine: (notes.match(/^## 一句话主旨\s*\n+([\s\S]*?)(?=\n##|$)/m) || [])[1]?.trim().split('\n')[0] || '',
  };
});

const payload = {
  period: '260912', date: '2026-09-12', weekday: '星期六',
  source: `今日 Readwise 精选 ${ITEMS.length + 1} 篇 → 处理 ${ITEMS.length} 篇，跳过 1 篇（The Information · Cloudflare 反爬）`,
  pipeline: `原文快照 → 三级笔记 → 概念辞典 → AI 费曼示范 → 五维拆解 ｜ 模型 ${LLM_MODEL || '（未调用）'}`,
  generatedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
  llmCalls: calls, tokens,
  articles,
};
fs.writeFileSync(OUT, JSON.stringify(payload));
console.log(`✅ ${OUT}`);
console.log(`   ${articles.length} 篇 · LLM ${calls} 次 / ${tokens} tokens · ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
console.log('   证据等级：实测（LLM 产物为真调用输出，未做人核对，引用前抽查）');
