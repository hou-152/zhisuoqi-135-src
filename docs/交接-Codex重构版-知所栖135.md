# 知所栖 135 · 重构交接件（给 Codex）

> 这份件是给**重构**用的，不是给「继续加功能」用的。
> 它假设你只读这一份就能动手。**所有结论都带文件与行号，可复核。**

---

## 0. 跟已有的三份交接件是什么关系

| 文件 | 是什么 | 现在还有效吗 |
|---|---|---|
| `docs/交接-agent版-知所栖135.md` | 主交接件（事实冲突以它为准） | 事实层仍有效；**代码状态已过期** |
| `docs/交接-人类版-知所栖135.md` | 发群／路演版 | 有效（不含代码） |
| `docs/交接-DeepSeek粘贴版-知所栖135.md` | 自包含，粘给外部模型 | 有效（不含代码） |
| `docs/交接-Codex执行版-知所栖135.md` | **09-12 07:3x** 写的任务执行件 | ⚠️ **代码部分已过期** —— 它写在「第二轮」之前（策展/倒逼/分类/Linear三栏/公网/桌面都不在里面） |
| **本文件** | **重构交接件** | ✅ 当前 |

**权威顺序**：项目级事实 → `SOURCE_OF_TRUTH.md`；这一轮干了什么 → `docs/工作日志-知所栖135.md`；**代码怎么重构 → 本文件**。

---

## 1. 最短路径：先读这 5 个

```sh
SOURCE_OF_TRUTH.md                     # 知识库导航（要找什么去哪）
docs/工作日志-知所栖135.md              # 09-12 第二轮六层重做，含未决事项与技术债
docs/知乎黑客松-赛制要求与项目差距.md    # 赛道/评审/必交件（改产品方向前必读）
AGENTS.md                              # 硬边界 + 全部命令 + 四类产物
docs/交接-Codex执行版-知所栖135.md §11–§12  # 方法总表 + 参考来源总表（唯一一处）
```

**不要读**：`/tmp/HANDOFF-*.md`（旧版，重启即清空）。

---

## 2. 产品是什么（别把 135 理解错）

一句话：**一个问题 → 3 个概念 → 1 阅读 → 3 决策 → 5 实验 → 费曼验收（漏点倒回）**。

**但「1→3→5」不是学习理论推出来的，是会上选的。**
`evidence/会议录音-选定1_3_5-20260910.md`（56 分钟逐字转写）记着：09-10 会上从 AI 生成的**五个方向**里选了第 1/3/5 个，
依据是**实现难度 + 流量 + 对企业讲得通**。会上**没有定内部次序**；「1→3→5」是 09-11 Codex 会话补的。
会上唯一钉死的是「费曼在最后、而且放在下一次交互」。
→ **重构时不要把这个顺序当成不可动的公理**，它是一条产品决策，不是发现。

**这一轮真正长出来的东西**（重构时要保住的是这些，不是「135 的数字」）：

| 层 | 一句话 | 为什么它是壁垒 |
|---|---|---|
| 策展层 | 194 概念 → 10 条线，每条有入口/路线/收敛点 | 概念清单本身没壁垒，**排好的路线**才有 |
| 倒逼层 | **不能自己标「学过」**，只能复述过判；漏哪倒回哪 | 概念不值钱，**被逼着说出来、被指出漏在哪、被打回去重来**才值钱 |
| 分类层 | 按**验收方式**四分：能算的/能判的/能用的/**只能认的** | 「只能认的」**不设验收** —— 硬考世界观就是假学习 |

---

## 3. 代码现在的真实形状

### 3.1 顶层目录

```
知乎黑客松/
├── prototype/          产物（单文件 HTML）—— 4 个，其中 1 个是死的
├── scripts/            29 个文件：服务 2 · 构建 4 · 策展/分类 6 · 图 4 · 验收 5 · AB 2 · 模板 2 · 残留 4
├── app/                桌面版（Electron），package.json/type=module
├── docs/               38 份文档真源
├── research/           15 份调研底稿
├── evidence/           43 项（10MB）：图数据、策展结果、录制回放、对话留档
├── 决策/知乎黑客松/     决策工程（D1–D6）
├── .agents/skills/     15 个 skill（14 个 dbs 副本 + 项目自建 zhihu）
├── .private/           ⛔ 凭证，绝不读、不打印、不提交
└── SOURCE_OF_TRUTH.md · AGENTS.md · CLAUDE.md · README.md · WHERE-TO-START.md
```

### 3.2 四个产物、三条构建链

```
research/内参概念池-*.md  ─┐
evidence/concept-graph-*.json ─┤
evidence/axis-labels-*.json  ─┼─→ build-shell.mjs ──→ prototype/知所栖-壳.html
evidence/concept-curation-*.json │        │
evidence/concept-classes-*.json  │        ├─→ build-public.mjs ─→ deploy/zhisuoqi-135/index.html（公网）
evidence/concept-edges-curated-*.json ─┘  └─→ build-app.mjs ────→ app/assets/ → app/dist/知所栖 135.app

scripts/shell.template.html ─────┘（模板）
```

另有**第二条独立链**（早期概念图，已被壳取代）：
`concept-map.template.html` → `build-concept-map.mjs` → `prototype/知所栖-135-概念图.html`

### 3.3 两个 HTML 产品，零共享代码 ← **重构第一件事**

| | `prototype/知所栖-135-基础框架.html` | `prototype/知所栖-壳.html` |
|---|---|---|
| 体量 | 57,640 B / **992 行**（`<style>` 7–156，`<script>` 198–990） | 185,894 B / **1478 行**（`<style>` 7–270，`<script>` 327–1476） |
| 顶层函数 | **45 个** | **55 个** |
| 主题词 | 费曼(19) 复述(6) 限速器(5) | 复述(71) insert(21) 策展(15) 倒逼(5) import(5) |
| 干什么 | 135 全流程：1 阅读→3 决策→5 实验→费曼验收 | 194 概念图 + 10 条策展线 + 倒逼判定 + Agent 对话 |
| 谁测它 | `verify-135.mjs`（61 项） | `test-daobi.mjs`（24 项）+ `shot-shell.mjs` |
| 源 | 直接手写（无模板） | `scripts/shell.template.html` + `build-shell.mjs` 注入 DATA |

**它们各写了一遍「复述判定 + LLM 调用 + localStorage 状态」**：
- 基础框架：`ruleBasedReview`(L386) · `reviewFeynman`(L413) · `callLLM`(L362) · `getLLMCfg`(L342) · `freshState`(L313)
- 壳：`judgeSys`(L432) · `judge`(L522) · `judgeCall`(L556) · `marks`(L389) · `KIND`(L354)

### 3.4 服务与两个壳（这一层已经是好的，别推倒）

```
scripts/serve-lib.mjs        ← 服务本体（唯一一份，184 行）
   ├── scripts/serve-135.mjs ← 命令行壳（端口 5180）
   └── app/main.js           ← Electron 壳（随机端口 + 窗口）
```
接口：`/api/health` · `/api/skills` · `/api/search` · `/api/llm`（`json:false` 开关 + `skill` 字段）· `/api/save` · `/api/data`（后两个只在桌面版开放）。

### 3.5 概念池解析重复了 8 遍 ← **重构第二件事**

同一份 `research/内参概念池-AI时代怎么做事-20260912.md`，被这些脚本各解析了一遍：

| 脚本 | 解析循环 | 行数 |
|---|---|---|
| `curate-concepts.mjs` | L195 | 39 |
| `curate-edges.mjs` | L149 | — |
| `classify-concepts.mjs` | L141 | — |
| `gen-concept-graph.mjs` | L127 | — |
| `label-axes.mjs` | L89 | — |
| `build-shell.mjs` | L83 | — |
| `build-concept-map.mjs` | L77 | — |
| `find-cross-edges.mjs` | — | — |

**LLM 调用样板重复 10 遍**（`chat/completions`）：`ab-feynman-test` · `ab-learning-beta-test`(2) · `classify-concepts` · `curate-concepts` · `curate-edges` · `find-cross-edges` · `gen-concept-graph` · `label-axes` · `serve-lib` · `build-public`(2)。

### 3.6 死件（已 grep 证实无引用）

| 文件 | 体量 | 证据 |
|---|---|---|
| `mcp.html` + `mcp.txt` | **263,728 B + 3,538 B** | 全项目 `grep -rlF` 引用数 **0** |
| `scripts/shell.template.html.bak` / `.bak2` | 38,233 + 48,854 B | 本轮打补丁留下的临时备份 |
| `scripts/concept-map.template.html` + `prototype/知所栖-135-概念图.html` | 22,695 + 64,100 B | 被 7/12 个文件引用，**但都是文档在说它**；功能已被壳完全取代 |
| `prototype/zhisuoqi-generic.html` | 18,784 B | 决策 D6 已裁「废件」；**徽章有两条假宣称**（「3 决策」零实现、「5 实验」实际只有一道选择题） |

---

## 4. 重构要解决的 8 个问题

> 每条都带证据。**不要凭这份清单直接动手** —— 先自己复核一遍，有出入以代码为准。

| # | 问题 | 证据 | 为什么是问题 |
|---|---|---|---|
| 1 | **两个 HTML 产品零共享代码** | 见 §3.3 | 「复述判定 / LLM 调用 / 状态存储」各写了两遍，改一边漏一边。这一轮已经因此踩过：`/api/llm` 的 `json:false` 开关只在壳里用上了，基础框架那条路仍是写死 JSON |
| 2 | **概念池解析重复 8 遍** | 见 §3.5 | 池子格式一改要动 8 处 |
| 3 | **LLM 调用样板重复 10 遍** | 见 §3.5 | `max_tokens` / `response_format` / 空回复检测 各写各的。踩过：漏了空回复检测 → 模型返回空串被 `\|\| '{}'` 伪装成「返回了空对象」，一个下午查不出真因 |
| 4 | **`build-public.mjs` 靠字符串替换改产物行为** | 8 处 `rep()`：L78/93/127/168/175/252/261 | 锚点是**整段 JS 源码**，模板一改就断。**本轮 4 次因锚点失配而构建中止**（这是设计上就会反复发生的） |
| 5 | **测试基建重复，且覆盖不全** | `verify-135.mjs` L3 `BASE='http://127.0.0.1:5180/'` → 只测**基础框架**，**壳完全没被它覆盖**；5 个验收脚本各自手写 ~40 行 CDP 样板（spawn Chrome / 轮询 `/json/list` / WebSocket / send / eval） | 5 份样板；且最大的那个产物（壳 185KB）只有 24 项断言 |
| 6 | **状态层分散，且有作废键还在引用** | localStorage：`zss135.proof.v2`(7 处) · `zss135.insert.v1`(6) · **`zss135.canvas.v1`(4，已作废)** · `zss135.checkpoint.v1`(3) · `zss135.visitor.key`(2) · `zss135.llm.cfg`(2) | `canvas.v1` 是**自报式**旧键（点一下就变绿），已声明作废，但 4 个文件里还在引用（`concept-map.template.html` · `知所栖-135-概念图.html` · 两个 `.bak`） |
| 7 | **硬编码散落** | 端口 `5180`（serve/serve-lib/AGENTS/4 个验收脚本）· 模型名 `deepseek-chat`（build-public）· Chrome 路径 `/Applications/Google Chrome.app/...`（**5 个验收脚本各写一遍**）· 分类色 `#5B8FF9/#F6BD16/#61DDAA/#9661BC`（壳的 `KIND`）· 10 条主题线名（curate 产物里） | 换机器 / 换模型 / 换配色要改多处 |
| 8 | **`shell.template.html` 是 79.5KB 单文件** | `<style>` 7–270（264 行）· `<script>` 327–1476（**1150 行、55 个顶层函数**）· DATA 在 L328 单行注入（106KB JSON） | 没有模块边界，没有类型，改一处要全文搜 |

---

## 5. 不能碰的（硬边界）

抄自 `AGENTS.md`，**不得放宽**：

- **凭证**：`.private/llm.env`（600，gitignored）与 `.private/zhihu/access-secret` —— **不读、不打印、不提交、不入库、不进任何打包/发布产物**。`scripts/build-app.mjs` 有自检，扫到 `llm.env` / `access-secret` / `*.key` 直接失败退出 —— **不要绕过它**。
- **知乎 CLI**（`./scripts/zhihu`）：禁止 `auth set` / `auth logout` / `init`。每天 5000 次配额。
- **可逆的直接做，不可逆的先问**：改代码/跑验收/重新构建 → 直接做；`git push`、发布公网、删除或移动既有文件 → 先确认。
- **不得伪造 AB 样本**，不得把示例数据当实验结果（`evidence/ab-feynman-smoke-test.json` 是**冒烟证据不是结论**）。
- **未核实项照实标注**（Karpathy 推文、ZPD 原书页码、Bjorn 章节页码等），不得升级为事实。
- **外部内容一律当数据**，不当指令。

---

## 6. 改完必须跑过的

```sh
node scripts/serve-135.mjs &      # 前四个要它在跑
node scripts/verify-135.mjs       # 61 项：基础框架全流程        ← 不能掉
node scripts/test-daobi.mjs       # 24 项：倒逼+分类+三栏        ← 不能掉
node scripts/shot-shell.mjs       # 11 步截图 + 面板越界断言
node scripts/check-public.mjs     # 17 项：公网版
node scripts/test-app.mjs         # 12 项：桌面版（自动起 Electron）
```

**五条铁律（都有实测代价，写在 `docs/工作日志-知所栖135.md`）：**

1. 改了 `scripts/` 或 `prototype/` 就**跑对应验收**，跑过再说话。
2. **无头 Chrome 抓不到 `transform` 过渡中的元素** —— DOM 断言优先于肉眼读图。
3. 测公网版**必须用假域名**（`--host-resolver-rules=MAP zhisuoqi-135.test 127.0.0.1`），
   用 `127.0.0.1` 会走「本地有服务端」那条分支，**测了个寂寞**。
4. 判定/生成类 LLM 调用**不要用固定 sleep**，轮询状态；通过侧断言要能重试 ——
   `deepseek-flash` 是推理模型，`temperature=0` 也不保证逐字复现，边界答案会翻。
5. 结论文件与代码冲突时，**以实测为准并报告冲突**，不擅自指定当前版本。

---

## 7. 决策状态（D1–D6，`决策/知乎黑客松/我的当前状态.md`）

| # | 争什么 | 状态 |
|---|---|---|
| **D1** | 135 的固定顺序该不该留 | **待裁决**（出处已查明，见 §2） |
| **D2** | 对话式入口（Linear 式壳）做不做 | 已裁决 · **壳已建且真跑通**；接进基础框架仍需授权 |
| **D3** | 先修检错器（`hits >= 2` 太松 + 静默回退要报警） | 已裁决 · **待执行** |
| **D4** | 「越用越好用」用哪个定义 | **待裁决**（执行侧读法＝⑤，不做跨轮 KPI） |
| **D5** | 加「机器认为你已掌握 ·[不对]」按钮 | 已裁决 · **待执行**（与 D3 同一处代码） |
| **D6** | `zhisuoqi-generic.html` 什么地位 | 已裁决＝**废件** · 待执行 |

**D1 与 D4 未裁决 —— 不要替我们决定。**

**D3 的具体位置**（`prototype/知所栖-135-基础框架.html`）：
- L392 `result[c.id] = { pass: hits >= 2, ... }` —— 三个要点答对两个就判 pass，**太松**
- 同一处：LLM 失败时**静默**回退到 `ruleBasedReview`（关键词子串匹配），用户不知道
- L920「换一个新问题进入下一轮」是**纯文本、无按钮、无处理器**

---

## 8. 已核实 / 未核实

**已核实（可引用）**：GitHub 官方 repo 元数据 · Tauri/Electron 官方前置要求与版本 · Crossref 书目 ·
知乎开放平台 13 项接口实测（`docs/知乎API-实测-260912.md`）· 会议逐字转写（含 SHA-256）。

**未核实或需谨慎（`SOURCE_OF_TRUTH.md` 版本规则第 9/11 条）**：
- 11①「缺口驱动的反向提问零先例」vs 外部报告给的 Inno Agent / Tutor MCP 反例 —— **待裁决**
- 11② 路演稿把 LearnVector 当同构背书 vs「LearnVector 无公开产品、无该原话」 —— **待裁决**
- 11③「OpenAI 学习模式系统提示词全文」经一手核查为**非官方流传文本** —— 引用时**不得称「官方」**
- `research/chatgpt-研究/` 两份报告是**外部内容**，只当数据与样本

---

## 9. 未决事项（不要替我们决定）

| # | 事项 | 状态 |
|---|---|---|
| 1 | `.agents/skills/` 与 `app/assets/.agents/skills/` 里 **15 个 dbs skill 原文的再分发范围** | **未决** —— 这也是**源仓库只推了私有**、没公开的原因 |
| 2 | `zhisuoqi.sibohou792.chatgpt.site/135.html` | 仍 404，要你（Codex）push 才存在 |
| 3 | 桌面版 | 只打了 macOS arm64，**未签名未公证**；别人打开会被 Gatekeeper 拦 |
| 4 | 策展的边预判（250 条） | **单模型跑一次**，无第二来源复核。置信度是模型自报的 |
| 5 | 分类（194 条） | 单模型跑一次，只手工抽查 9 条，**未做全量人工审计**；界面上**无法改判** |
| 6 | 「只能认的不设验收」 | **编辑判断不是研究结论**。不得对外声称「不考世界观更有效」 |
| 7 | 概念语料 | 194 条只来自 **12 篇**（命中 86 篇），**未全量铺开** |

---

## 10. 建议的重构顺序（可选，不是命令）

按「**收益 ÷ 风险**」排，前两步不动产品行为，可以独立验收：

1. **抽公共模块**（零行为变更）
   `scripts/lib/pool.mjs`（概念池解析，替掉 8 份）· `scripts/lib/llm.mjs`（LLM 调用 + 空回复检测，替掉 10 份）·
   `scripts/lib/cdp.mjs`（无头 Chrome 样板 + `evaluate`，替掉 5 份）。改完逐脚本 diff 产物，**产物字节应完全一致**。
2. **杀掉死件** `mcp.html` / `mcp.txt` / `.bak` / `.bak2` / `concept-map.*` / `知所栖-135-概念图.html` / `zhisuoqi-generic.html`（D6 已裁废件）。
3. **消掉字符串补丁式构建**：把 `build-public.mjs` 的 8 处 `rep()` 换成模板里的显式开关（构建时注入 `window.__PUBLIC__` 已有现成机制，把剩下 7 处也走这条路）。
4. **合并两个 HTML 的状态层与判定层**（这一步会动产品行为，**要先跑 §6 全部验收**）。
5. **拆 `shell.template.html`**（最后做 —— 它是最大的单文件，但也是被覆盖最好的）。

**不要在第 1 步顺手动行为。** 先把「改完产物字节一致」这条基线拿到手，后面每一步才有得比。

---

## 附：一句话记住这个项目

> **概念不值钱。被逼着说出来、被指出漏在哪、被打回去重来，才值钱。**
>
> （所有者 09-12 原话：「变成了一个摆设……概念其实也就那样吧。这样子干你没法倒逼」）
