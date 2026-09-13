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
const ARGV = (() => {                        // 两种写法都收：--issue 260913 与 --issue=260913
  const a = process.argv.slice(2), o = {};
  for (let i = 0; i < a.length; i++) {
    const m = a[i].match(/^--([^=]+)(?:=(.*))?$/);
    if (!m) continue;
    o[m[1]] = m[2] !== undefined ? m[2] : (a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true);
  }
  return o;
})();
const FORCE = 'force' in ARGV || process.argv.includes('--force');
/* 期号：--issue 指定；不给就取 knowledge/内参-* 里最新的一期（期号是 YYMMDD，字典序即时间序）。
   一期一个目录、一份页面数据，壳把全部期合成「内参日报集合」（build-shell.mjs）。 */
const ISSUE = String(ARGV.issue || '') || fs.readdirSync(path.join(ROOT, 'knowledge'))
  .filter((d) => /^内参-\d{6}$/.test(d) && fs.existsSync(path.join(ROOT, 'knowledge', d, '内参-页面数据.json')))
  .sort().pop()?.replace(/^内参-/, '');
if (!ISSUE) { console.error('❌ 找不到任何一期内参（knowledge/内参-YYMMDD/）'); process.exit(2); }
const SRC = path.join(ROOT, 'knowledge', `内参-${ISSUE}`);
const META_CACHE = path.join(SRC, '内参-元数据.json');
const OUT = path.join(SRC, '内参-页面数据.json');
const ISSUE_JSON = path.join(SRC, 'issue.json');
const ISSUE_META = fs.existsSync(ISSUE_JSON) ? JSON.parse(fs.readFileSync(ISSUE_JSON, 'utf8')) : null;

// ── 凭证：只补未设置的变量（与 serve-135.mjs 同规则），不打印任何值 ──────────
for (const line of fs.readFileSync(path.join(ROOT, '.private', 'llm.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*export\s+([A-Z_]+)=(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { LLM_API_BASE, LLM_API_KEY, LLM_MODEL } = process.env;
const llmReady = Boolean(LLM_API_BASE && LLM_API_KEY && LLM_MODEL);
if (!llmReady) console.warn('⚠ LLM 未配置 —— 只重建页面，不补元数据');

// ── 1. 篇目顺序与字数 ────────────────────────────────────────────────────
// 有 issue.json（pull-readwise-inbox.mjs 生成）就以它为准；没有则回退读编辑日志（260912 期那条路）。
const ITEMS = ISSUE_META
  ? ISSUE_META.items.map((it) => ({ title: it.title, slug: it.slug, words: it.words, tag: it.tag || '文章' }))
  : (() => {
    const log = fs.readFileSync(path.join(SRC, '编辑日志.md'), 'utf8');
    return [...log.matchAll(/^- ✅ (.+?)（([a-z0-9-]+)）原文 (\d+) 字$/gm)]
      .map((m) => ({ title: m[1], slug: m[2], words: Number(m[3]), tag: '文章' }));
  })();
if (!ITEMS.length) { console.error('❌ issue.json / 编辑日志里都没解析到篇目'); process.exit(2); }

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

/* ── 配图：按 Anthropic Newsroom 的**已验证**视觉体系程序化绘制 ─────────────
   来源：anthropic-art skill 的 references/style-spec.md（2026-07-18 从 Newsroom HTML /
   SVG 资产 / CSS 核过）。三层结构固定：
     ① 满幅不透明底色（下面 8 个 hex 是核过的原值，不许自己调）
     ② 一块不规则的象牙白承载形 #FAF9F5，占 55–80%，故意不对称
     ③ 近黑 #141413 的手势线：**粗、圆头、抖**，允许少量越出承载形
   2026-09-13 重画：上一版线只有 11px（参考约 45px），还把一个认不出的图形塞进小椭圆里，
   所有者当场说「内参的配图不行」。这一版把图形画大、画粗，并加了 feTurbulence 抖动。 */
const GLYPHS = {
  /* 硬规则（2026-09-13 第二版定的，别再违反）：
     ① 每个特征的长度 ≥ 0.20 单位。线宽 20px ÷ 图形边长 326px ≈ 0.061 单位，
        短于 0.20 的笔画（例如抽屉把手）会被线宽吞成黑疙瘩。
     ② 一个图形 3–6 条路径，宁可少画。参考图好看是因为它只有一根大线。
     ③ 段尽量长而连续，不要小碎块。 */
  // 三层抽屉柜，最下一格向右拉开
  cabinet: ['M .22 .14 H .78 V .86 H .22 Z', 'M .22 .38 H .78', 'M .22 .62 H .78',
            'M .78 .62 H 1.06 V .86 H .78'],
  // 一排抽屉，每个只露出标签（第 6 篇的隐喻）
  tags: ['M .14 .18 H .74 V .42 H .14 Z', 'M .74 .26 H .98',
         'M .14 .52 H .74 V .76 H .14 Z', 'M .74 .60 H .98',
         'M .14 .86 H .74 V .98 H .14 Z'],
  // 一排抽屉，两格各拉开一点
  drawers: ['M .16 .20 H .80 V .46 H .16 Z', 'M .80 .26 H .98 V .40 H .80',
            'M .16 .54 H .80 V .80 H .16 Z', 'M .80 .60 H .98 V .74 H .80'],
  // 飞行中换引擎：机身 + 机翼 + 螺旋桨十字
  engine: ['M .12 .52 H .74', 'M .74 .36 A .16 .16 0 0 1 .74 .68', 'M .38 .52 L .20 .24',
           'M .80 .20 L 1.06 .84', 'M .80 .84 L 1.06 .20'],
  // 指挥台 + 机械臂（底座 / 立柱 / 大臂 / 小臂 / 两根长手指；2026-09-13 重画，上一版读成了房子）
  arm: ['M .06 .90 H .94', 'M .24 .90 V .50', 'M .24 .50 L .62 .24', 'M .62 .24 L .72 .64',
        'M .72 .64 L .90 .50', 'M .72 .64 L .92 .76', 'M .46 .90 V .70', 'M .70 .90 V .78'],
  // 传送带 + 两股对拉
  conveyor: ['M .10 .68 H .88 A .11 .11 0 0 1 .88 .90 H .10 A .11 .11 0 0 1 .10 .68',
             'M .46 .48 H .18', 'M .34 .34 L .16 .48 L .34 .62',
             'M .54 .48 H .82', 'M .66 .34 L .84 .48 L .66 .62'],
  // 活页夹：封面 + 三条目录线 + 两个环
  binder: ['M .30 .14 H .88 V .88 H .30 Z', 'M .30 .40 H .88', 'M .30 .60 H .80', 'M .30 .78 H .74',
           'M .20 .24 A .09 .09 0 1 0 .20 .42 A .09 .09 0 1 0 .20 .24',
           'M .20 .58 A .09 .09 0 1 0 .20 .76 A .09 .09 0 1 0 .20 .58'],
  // 一串钥匙挂在同一根横杆上
  keyring: ['M .10 .20 H .90',
            'M .28 .20 V .56', 'M .28 .56 A .08 .08 0 1 0 .28 .72 A .08 .08 0 1 0 .28 .56', 'M .28 .64 H .46',
            'M .54 .20 V .44', 'M .54 .44 A .08 .08 0 1 0 .54 .60 A .08 .08 0 1 0 .54 .44', 'M .54 .52 H .70',
            'M .78 .20 V .66', 'M .78 .66 A .08 .08 0 1 0 .78 .82 A .08 .08 0 1 0 .78 .66'],
  // 三条管道汇入一个总阀门再输出
  pipes: ['M .06 .24 H .50', 'M .06 .50 H .50', 'M .06 .76 H .50', 'M .50 .24 V .76',
          'M .50 .50 H .66', 'M .66 .50 A .16 .16 0 1 0 .66 .82 A .16 .16 0 1 0 .66 .50',
          'M .84 .50 H 1.04', 'M .92 .38 L 1.06 .50 L .92 .62'],
  // 四格检修抽屉，每格一把扳手
  wrenchbox: ['M .12 .16 H .88 V .86 H .12 Z', 'M .50 .16 V .86', 'M .12 .52 H .88',
              'M .26 .28 V .44', 'M .17 .44 H .35', 'M .68 .28 V .44', 'M .59 .44 H .77',
              'M .26 .60 V .76', 'M .17 .76 H .35', 'M .68 .60 V .76', 'M .59 .76 H .77'],
  // ↓ 通用图形
  funnel: ['M .14 .16 H .86 L .60 .54 V .88 H .40 V .54 Z'],
  loop: ['M .50 .14 A .36 .36 0 1 1 .20 .40', 'M .10 .28 L .20 .44 L .36 .38'],
  net: ['M .50 .12 A .10 .10 0 1 0 .50 .32 A .10 .10 0 1 0 .50 .12',
        'M .86 .34 A .10 .10 0 1 0 .86 .54 A .10 .10 0 1 0 .86 .34',
        'M .68 .80 A .10 .10 0 1 0 .68 1.00 A .10 .10 0 1 0 .68 .80',
        'M .32 .80 A .10 .10 0 1 0 .32 1.00 A .10 .10 0 1 0 .32 .80',
        'M .14 .34 A .10 .10 0 1 0 .14 .54 A .10 .10 0 1 0 .14 .34',
        'M .50 .22 L .80 .40 M .80 .48 L .70 .88 M .62 .90 L .38 .90 M .30 .88 L .20 .48 M .20 .44 L .44 .24'],
  stack: ['M .18 .72 H .82 V .88 H .18 Z', 'M .26 .50 H .90 V .66 H .26 Z', 'M .12 .28 H .76 V .44 H .12 Z'],
  steps: ['M .10 .86 H .34 V .62 H .58 V .38 H .82 V .14 H 1.00'],
  gear: ['M .50 .18 A .32 .32 0 1 0 .50 .82 A .32 .32 0 1 0 .50 .18',
         'M .50 .16 V .00 M .74 .28 L .86 .16 M .84 .50 H 1.00 M .74 .72 L .86 .84',
         'M .50 .84 V 1.00 M .26 .72 L .14 .84 M .16 .50 H .00 M .26 .28 L .14 .16'],
  scales: ['M .50 .10 V .88', 'M .16 .24 H .84', 'M .08 .88 H .92',
           'M .02 .52 L .16 .26 L .30 .52', 'M .70 .52 L .84 .26 L .98 .52'],
  wave: ['M .06 .64 C .22 .24 .36 .80 .52 .44 C .66 .16 .78 .72 .92 .46 C .96 .38 .98 .42 1.00 .46'],
};
const GLYPH_KEYS = Object.keys(GLYPHS);
function pickGlyph(metaphor, seed) {
  const t = String(metaphor || '') + seed;
  const table = [
    [/检修|扳手|工具箱/, 'wrenchbox'],
    [/柜|文件柜/, 'cabinet'],
    [/标签/, 'tags'],
    [/抽屉/, 'drawers'],
    [/引擎|发动机|飞机|螺旋桨|飞行/, 'engine'],
    [/机械臂|指挥|作业|机器人/, 'arm'],
    [/传送带|传送|两条|来回|对拉|拉力/, 'conveyor'],
    [/活页|目录页|夹子|文件夹/, 'binder'],
    [/钥匙|一串|挂/, 'keyring'],
    [/管道|阀门|汇入|管/, 'pipes'],
    [/漏斗|筛|过滤|收窄|收敛/, 'funnel'],
    [/循环|回路|闭环|轮|反复/, 'loop'],
    [/网|节点|连接|关系|图谱/, 'net'],
    [/层|堆|叠|栈|积木/, 'stack'],
    [/台阶|阶梯|一步一步|爬|升级/, 'steps'],
    [/齿轮|机器|咬合|引擎|飞轮/, 'gear'],
    [/天平|权衡|平衡|取舍|秤/, 'scales'],
    [/水|流|波|河/, 'wave'],
  ];
  for (const [re, k] of table) if (re.test(t)) return k;
  return GLYPH_KEYS[hash(seed) % GLYPH_KEYS.length];
}

function heroSVG(slug, metaphor, paletteKey, topic) {
  const rand = rng(hash(slug));
  const bg = PALETTES[paletteKey][0];
  const W = 1000, H = 440;
  const seed = hash(slug) % 100;

  // ② 承载形：不规则、故意不对称（左右半径不同、上下偏心），22 个采样点 + 二次平滑
  const cx = W * (0.46 + rand() * 0.10), cy = H * (0.48 + rand() * 0.08);
  const rx = W * 0.30, ry = H * 0.38, N = 22;
  const pts = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    // 低频起伏 + 高频抖：低频负责「不规则」，高频负责「手画」
    const k = 1 + Math.sin(a * 2 + rand() * 3) * 0.10 + (rand() - 0.5) * 0.10;
    // 横向故意拉偏，避免变成规整椭圆
    const xk = i < N / 2 ? 1.06 : 0.94;
    pts.push([cx + Math.cos(a) * rx * k * xk, cy + Math.sin(a) * ry * k]);
  }
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${mid(pts[N - 1], pts[0]).map(v => v.toFixed(1)).join(' ')}`;
  for (let i = 0; i < N; i++) {
    const m = mid(pts[i], pts[(i + 1) % N]);
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  d += ' Z';

  // ③ 手势线：图形画大（占高度 74%），线画粗（26px ≈ 图形边长的 8%）
  const glyphKey = pickGlyph(metaphor, slug);
  const paths = GLYPHS[glyphKey] || GLYPHS.stack;
  const S = H * 0.84;
  const bx = cx - S / 2, by = cy - S / 2;
  const strokes = paths.map(p => `<path d="${p}"/>`).join('');
  // 实心黑点：3 个，落在承载形边缘附近，允许越出
  const dots = Array.from({ length: 3 }, () => {
    const a = rand() * Math.PI * 2;
    return `<circle cx="${(cx + Math.cos(a) * rx * (0.9 + rand() * 0.35)).toFixed(0)}" cy="${(cy + Math.sin(a) * ry * (0.9 + rand() * 0.35)).toFixed(0)}" r="${(5 + rand() * 6).toFixed(1)}" fill="${INK}"/>`;
  }).join('');

  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(topic)}">`
    + `<defs><filter id="hw${seed}" x="-8%" y="-8%" width="116%" height="116%">`
    + `<feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="${seed}" result="n"/>`
    + `<feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>`
    + `</filter></defs>`
    + `<rect width="${W}" height="${H}" fill="${bg}"/>`                                  // ① 满幅不透明底色
    + `<path d="${d}" fill="${IVORY}"/>`                                                  // ② 象牙白承载形
    // 滤镜挂**未缩放的外层**，否则 feDisplacementMap 的 scale 也会被放大 325 倍；
    // stroke-width 写在局部坐标系里，要除以 S 才能变回 26 个画布像素（2026-09-13 踩过：整柜糊成黑方块）
    + `<g filter="url(#hw${seed})">`
    + `<g fill="none" stroke="${INK}" stroke-width="${(22 / S).toFixed(4)}" `
    + `stroke-linecap="round" stroke-linejoin="round" transform="translate(${bx.toFixed(1)} ${by.toFixed(1)}) scale(${S.toFixed(1)})">`
    + strokes + `</g>`
    + dots + `</g>`                                                                        // ③ 手势线 + 实心点
    + '</svg>';
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
  // 五维（学习编译层试点）是**可选**的：260913 期只做三产物，没有拆解五维 → dim = null，壳里那一栏不出现
  const dimPath = path.join(SRC, '拆解五维', it.slug + '.json');
  const dim = fs.existsSync(dimPath) ? JSON.parse(fs.readFileSync(dimPath, 'utf8')) : null;
  const notes = fs.readFileSync(path.join(SRC, '三级笔记', it.slug + '.md'), 'utf8');
  const concepts = fs.readFileSync(path.join(SRC, '概念辞典', it.slug + '.md'), 'utf8');
  const feyn = fs.readFileSync(path.join(SRC, 'AI费曼', it.slug + '.md'), 'utf8');
  return {
    slug: it.slug, no: idx + 1, title: it.title, words: it.words, tag: it.tag || '文章',
    url: src.url, author: src.author, summary: src.summary, fetched: src.fetched,
    topic: m.topic || '', stars: m.stars || 3, starReason: m.starReason || '', why: m.why || '',
    metaphor: m.metaphor || '', palette: m.palette || 'heather',
    paletteBg: PALETTES[m.palette || 'heather'][0],
    hero: heroSVG(it.slug, m.metaphor, m.palette || 'heather', m.topic || it.title),
    notes: mdToHtml(notes),
    conceptCards: conceptCards(concepts),
    feynman: {
      short: dim?.feynman?.demo || '',
      long: mdToHtml(feyn),
      rubric: dim?.feynman?.rubric || [],
    },
    /* 五维（学习编译层试点）：reading / decisions / experiments 各自留出口。
       选项覆盖层（evidence/neican-fivedim/<slug>.json）只补干扰项——正确项逐字取自资产。 */
    dim: !dim ? null : (() => {
      const overlayPath = path.join(ROOT, 'evidence', 'neican-fivedim', it.slug + '.json');
      const overlay = fs.existsSync(overlayPath) ? JSON.parse(fs.readFileSync(overlayPath, 'utf8')) : null;
      const decisions = (dim.decisions || []).map((d, i) => {
        const ov = overlay?.decisions?.[i]?.options || null;
        return {
          id: `decisions[${i}]`, situation: d.situation, choice: d.choice, condition: d.condition,
          options: ov, optionsAuthored: !!ov,
        };
      });
      const focusIdx = overlay?.focusConceptIndex ?? 0;
      return {
        source: `knowledge/内参-${ISSUE}/拆解五维/${it.slug}.json`,
        contentStatus: 'generated-unreviewed',
        concepts: dim.concepts || [],
        reading: dim.reading || null,
        decisions,
        experiments: dim.experiments || [],
        focusConceptIndex: focusIdx,
        focusRubric: (dim.feynman?.rubric || [])[focusIdx] || null,
        trapNote: overlay?.trapNote || '',
        teachingMap: (() => {
          const p = path.join(ROOT, 'evidence', 'feynman-teaching-map', it.slug + '.json');
          if (!fs.existsSync(p)) return null;
          const m = JSON.parse(fs.readFileSync(p, 'utf8'));
          return {
            concept: m.concept,
            unit: m.unit?.slug || it.slug,
            criteriaVersion: m.criteriaVersion || m.version || '',
            sourceFile: m.unit?.sourceFile || null,
            sourceSha256: m.unit?.sourceSha256 || null,
            criteria: (m.criteria || []).map((c) => ({
              id: c.id, criterion: c.criterion,
              /* gradingRules 必须整段搬出来：B 层判定协议是「逐判据状态」，
                 每一档（met/partial/missing/contradicted/uncertain）的定义是唯一判定口径。
                 此前这一栏根本没进 payload → 页面就算想注入也拿不到（C 层真实请求也没用到）。 */
              gradingRules: c.gradingRules || null,
              misconception: c.misconception,
              teachingAction: c.teachingAction,
              material: (c.material || []).map((x) => ({ ref: x.ref, label: x.label, kind: x.kind, quote: x.quote })),
            })),
          };
        })(),
        gaps: [
          !dim.reading ? '缺 reading（分层阅读）' : '',
          !(dim.decisions || []).length ? '缺 decisions（决策）' : '',
          !(dim.experiments || []).length ? '缺 experiments（实验）' : '',
          !(dim.feynman?.rubric || []).length ? '缺 feynman.rubric' : '',
          decisions.some((d) => !d.options) ? '有决策缺三选项（需要覆盖层）' : '',
        ].filter(Boolean),
      };
    })(),
    oneLine: (notes.match(/^## 一句话主旨\s*\n+([\s\S]*?)(?=\n##|$)/m) || [])[1]?.trim().split('\n')[0] || '',
  };
});

const payload = {
  period: ISSUE,
  date: ISSUE_META?.date || `${ISSUE.slice(0, 2)}${ISSUE.slice(2, 4)}-${ISSUE.slice(4, 6)}`.replace(/^(\d\d)(\d\d)-(\d\d)/, '20$1-$2-$3'),
  weekday: ISSUE_META?.weekday || '',
  source: ISSUE_META?.source || `Readwise 精选 → 处理 ${ITEMS.length} 篇`,
  pipeline: `${ISSUE_META?.pipeline || '原文快照 → 三级笔记 → 概念辞典 → AI 费曼示范'}${articles.some((a) => a.dim) ? ' → 五维拆解' : ''} ｜ 模型 ${LLM_MODEL || '（未调用）'}`,
  generatedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
  llmCalls: calls, tokens,
  articles,
};
fs.writeFileSync(OUT, JSON.stringify(payload));
console.log(`✅ ${OUT}`);
console.log(`   ${articles.length} 篇 · LLM ${calls} 次 / ${tokens} tokens · ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
console.log('   证据等级：实测（LLM 产物为真调用输出，未做人核对，引用前抽查）');
