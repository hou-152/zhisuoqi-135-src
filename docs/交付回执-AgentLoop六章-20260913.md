# 交付回执 · Agent Loop 六章学习路线（MVP 方法扩展到第一章→第六章）

日期：2026-09-13（跨 09-14）
交接件：`docs/交接-DeepSeek-Harness-135-MVP扩展-20260913.md`（第 8 节回执格式）
验收记录：`evidence/agent-loop-260913/acceptance.md`

---

## 1. 修改文件

**新增**

| 文件 | 是什么 |
|---|---|
| `evidence/agent-loop-260913/pairings.json` | 材料配对索引：六章 `cm_* ↔ CON-* ↔ QST/CAS/OPI/SOL`，含候选案例、主案例、审核状态、口径差异、缺口 |
| `evidence/agent-loop-260913/authored.json` | 18 道题的题面／选项／依据（`basis` 指向 OPI/SOL 字段 ＋ `basisQuote` 逐字片段）与六章费曼要点 |
| `evidence/agent-loop-260913/chapters.json` | 装配产物（正文逐字搬运，除题目与口径注外无新写内容）——由 `build-learning-materials.mjs` 生成 |
| `evidence/agent-loop-260913/acceptance.md` | 验收记录（三份证据的分工、逐章配对、截图、缺口） |
| `evidence/agent-loop-260913/learn-real-llm-walk-{agent,verification-loop}.json` | 两次真模型走查的原始记录 |
| `evidence/agent-loop-260913/mvp-real-llm-walk.json` + `walk-{1..4}-*.png` | 原 MVP 的真模型走查证据（本轮补做） |
| `scripts/build-learning-materials.mjs` | 确定性装配器（不调模型）；ID／类型／主案例／题目结构／依据逐字可回源，任一项不成立即失败退出 |
| `scripts/check-learning-materials.mjs` | 材料体检 241 项（只读、不需要 serve） |
| `scripts/test-learn-agent-loop.mjs` | 学习空间黑盒验收 55 项（固定响应验证状态门） |
| `scripts/walk-learn-agent-loop.mjs` | 学习空间真模型走查（不替换 fetch，真调 `/api/llm`） |
| `scripts/walk-mvp-real-llm.mjs` | 原 MVP 真模型走查 |
| `prototype/预览/50..57-学习空间-*.png` | 8 张截图（4 张黑盒 ＋ 4 张真模型） |
| `docs/交付回执-AgentLoop六章-20260913.md` | 本文件 |

**修改**

| 文件 | 改动 |
|---|---|
| `scripts/shell.template.html` | 新增独立学习空间（全屏 `#learn`、`body.learning` 隐藏左栏／主题列表／画布）；`pathBlock` 的「学习这个」接进学习空间；概念卡、实践空间加学习入口；`#learn=<chapterId>` 可直达；顺手修一个**已存在**的 bug（`askConceptHelp` 引用了只在公网版注入的 `LOCAL`，本地壳点「让 AI 解释这一步」必抛 ReferenceError） |
| `scripts/build-shell.mjs` | 新增 `loadLearning()`：把 `chapters.json` 注入壳 payload 的 `learning` |
| `scripts/build-public.mjs` | 新增边界 ④：`review.status !== 'ready'` 的章节**一律从公网产物剥离**（候选装配稿不进公网） |
| `scripts/test-path.mjs` | 第 ⑪ 节一条断言**因产品事实变化**更新（路线第三步此前没有材料、现在有了），并**新增**一条「没装配的概念仍然照实说没装配」；没有删除任何断言 |
| `docs/工作日志-知所栖135.md` | 追加本轮工作日志 |
| `prototype/知所栖-壳.html` | 重新构建（1.16 MB → 1.28 MB，多出来的是六章章节数据） |
| `evidence/paths-260913/validate.json` | 路线体检重跑，只有 `generatedAt` 变了 |

> `scripts/serve-lib.mjs` 的缓存头改动、以及 `prototype/预览/21/22/23/24/26/27/40/41/42` 的 PNG 变化**是并行改动的产物**（我进来时工作区就是脏的），不是我改的，我也没有覆盖它们。

## 2. 章节、材料索引与候选配对数量

- 章节：**6 章**（Agent → 工具 → Agent loop → 状态子系统与进度持久化 → Harness → 验证闭环），顺序逐条对上 `evidence/paths-260913/routes.json` 的 `agent-continuous-action-v1`。
- 材料索引：1 份（`pairings.json`），登记 6 组配对、**30 个语义单元 ID**（6 CON ＋ 6 QST ＋ 6 CAS ＋ 7 OPI ＋ 6 SOL 去重后 31 个，其中 OPI 有重复引用）。
- 候选配对：每章候选 CAS **1 个**（按 `relationships.target` 现查，不按标题猜）；主案例 = 该唯一候选，共 6 个，**全部 `case_type: 假设场景`**。
- 题目：**18 道**（6 章 × 3），每题 3 选项、恰好 1 个正确；18 个正确选项全部带 OPI／SOL 依据与逐字 `basisQuote`。
- 费曼：**6 套要点**（各 3 条，两两不同，且都不含「变量／证据／边界」）。

## 3. Agent Loop 六章逐章状态

| 章 | 状态 | 说明 |
|---|---|---|
| 1 Agent | `scaffold`（候选装配稿） | 材料齐全；主案例未确认。另有一条口径差异待裁决 |
| 2 工具 | `scaffold` | 材料齐全；主案例未确认 |
| 3 Agent loop | `scaffold` | 材料齐全；**无 OPI 直连**，依据全在 SOL |
| 4 状态子系统与进度持久化 | `scaffold` | 材料齐全；主案例未确认 |
| 5 Harness | `scaffold` | 材料齐全；主案例未确认 |
| 6 验证闭环 | `scaffold` | 材料齐全；**无 OPI 直连**，依据全在 SOL |

**没有一章是 `ready`** —— 「ready」在本轮的定义是「负责人已确认主案例」，而负责人尚未确认。
六章页面都照实显示「主案例是候选（假设场景），负责人尚未确认」。

## 4. 可复现入口和截图路径

```text
入口（必须经 serve）：node scripts/serve-135.mjs
  → http://127.0.0.1:5180/知所栖-壳.html            路径视图 → 任一步的「学习这个 · 第 N 章」
  → http://127.0.0.1:5180/知所栖-壳.html#learn=agent            直达第 1 章
  → http://127.0.0.1:5180/知所栖-壳.html#learn=verification-loop 直达第 6 章
  → 实践空间 → 「独立学习空间 · Agent Loop 六章」→ 进入学习空间
原 MVP（未接概念卡的那一版，保持可用）：
  → http://127.0.0.1:5180/mvp-decision-context-rot.html
```

截图：`prototype/预览/50..57-学习空间-*.png`（8 张）· `evidence/agent-loop-260913/walk-{1..4}-*.png`（4 张）· `/tmp/mvp-decision-context-rot.png`。

## 5. 验收命令及逐条结果

全部在本机实跑（serve 在 5180 跑着；`check-public` 另起静态服务）。

| 命令 | 结果 |
|---|---|
| `node scripts/check-learning-materials.mjs` | ✅ **241 项通过**（材料体检） |
| `node scripts/test-mvp-learning.mjs` | ✅ MVP 黑盒验收全过 · 0 条 JS 报错 |
| `node scripts/walk-mvp-real-llm.mjs` | ✅ 走完阅读 → 3 题（含先错一次）→ 真费曼「未通过（列漏点）」→「通过」；真实 `/api/llm` 2 次 · 知乎请求 0 次 · 0 条 JS 报错 |
| `node scripts/test-learn-agent-loop.mjs` | ✅ 学习空间黑盒验收全过 · 0 条 JS 报错 |
| `node scripts/walk-learn-agent-loop.mjs agent` | ✅ 真模型：未通过（漏「最小构成」）→ 通过 → 第 2 章解锁 → 编辑后重新锁上 |
| `node scripts/walk-learn-agent-loop.mjs verification-loop` | ✅ 真模型：未通过（漏「独立检查／通过范围」）→ 通过 |
| `node scripts/test-path.mjs` | ✅ 断言全过（**56 项**，改动前 55 项，比改动前多 1 条）· 0 条 JS 报错 |
| `node scripts/test-case-mvp.mjs` | ✅ 通过：3 个概念 → 3 个候选案例 → 选定 `CAS-context-rot`（产物逐字节未变） |
| `node scripts/test-daobi.mjs` | ✅ 断言全过 · 0 条 JS 报错 |
| `node scripts/shot-shell.mjs` | ✅ 13 步截图 · 0 条 JS 报错 |
| `node scripts/check-public.mjs` | ✅ 公网版验收全过（**必须先起静态服务**，见下） |
| `node scripts/paths-validate.mjs` | ✅ 路线配置合法 |

### 固定响应测试 vs 真实模型测试（分开说）

- **固定响应**：`test-mvp-learning.mjs`、`test-learn-agent-loop.mjs`、`test-path.mjs`、`test-daobi.mjs`、`check-public.mjs`、`shot-shell.mjs`。它们证明**状态机与页面行为**，与模型输出无关。
- **真实模型**：`walk-mvp-real-llm.mjs`、`walk-learn-agent-loop.mjs`（各 2 次真实 `/api/llm` 调用，`deepseek-flash`）。它们证明**接口 + 提示词 + 结构化协议**可用。样本量：MVP 1 章、学习路线 2 章。**都不是学习效果样本。**
- `/api/health` 返回 `llm:true` 只说明本机接口已配置，不代表学习已经通过。

### 失败与环境问题的区分（本轮实际踩到的）

1. **`check-public.mjs` 第一次跑成「页面就绪：超时 → 页面没初始化」**：不是产品缺陷，是**测试环境问题**——脚本按设计要一个假域名下的本地静态服务（`python3 -m http.server 5199`，目录 `/tmp/pubtest`），当时那个服务没在跑。把服务起起来后同一条命令**23/23 全过**。
2. **`test-path.mjs` 改完后先是 2 条失败 ＋ 1 条 JS 报错**：这是我改动引起的**产品问题**，两处都修了——
   ① 我一度把「让 AI 解释这一步」也标成 `jbtn ghost`，使测试选中的第一个 ghost 按钮不再是「返回这一步」，已改回原样；
   ② 那条 JS 报错暴露了一个**此前就存在、只是没被点到过**的 bug：本地壳模板里没有 `const LOCAL`（它只由 `build-public.mjs` 注入），所以 `askConceptHelp` 一点就抛 ReferenceError。已按「有注入就用注入的，没有就按地址自己判」修好。
3. **断言没有为了通过而删除**：`test-path.mjs` 第 ⑪ 节那条「没有材料时明确待装配」的产品事实变了（路线第三步现在**有**材料了，这正是本轮要做的事），改成断言新事实「已装配章节材料且标明候选装配稿」，并**新增**一条断言「没装配的概念仍然照实说没装配」。

## 6. 待装配章节及缺口

- **待装配章节：0 章**（六章都有可靠案例、原文定位和答案依据）。
- 但六章**全部只到候选装配稿**，缺的是负责人的确认，不是缺材料。其他缺口逐条登记在 `pairings.json.gaps`，并原样显示在每章页面底部的「材料缺口」块里：
  1. 六章主案例全是「假设场景」，没有真实复盘；
  2. 每章候选 CAS 只有 1 个，没有第二候选可比；
  3. 第 3、6 章没有 OPI 直连，依据面窄；
  4. 第 1 章 `cm_0608c405`（最小配置口径）与 `CON-agent`（行为口径）不是同一条定义。

## 7. 未执行事项

- **未接知乎 API**（全程 0 次知乎请求，`test-learn-agent-loop` 与两份真模型走查都有断言/记录）。
- **未做技术实验台（05）**，也未做 03 费曼演练室。
- **未让 LLM 运行时重排路线**：章节顺序读 `routes.json`，模型只参与费曼漏点判定。
- **未改概念地图源数据**：`knowledge/概念地图-260913/topics.json`、`dependencies.json`、`relations.json` 一字未动（`test-path.mjs` ⑩ 有断言）。
- **未重建、未发布公网产物**：`deploy/zhisuoqi-135/index.html` 与 `prototype/知所栖-135-公网版.html` 保持仓库里的原状。我**验证过** `build-public.mjs` 的新边界（试跑一次：6 章候选装配稿被剥离、`DATA` 行仍可解析、`</` 转义保留、对**新产物**跑 `check-public` 22/23），随后把这两份产物还原成仓库里的那一份，**没有把它留在工作区**。
- **未 push**、未发布、未改 `.private/`、未读取或展示任何凭证。
- **未对第 2/3/4/5 章做真模型走查**（只有黑盒 ＋ 材料体检）。
- **未做 21 个主题的批量路线**（只做了这一条人工策展路线）。

## 8. 需要产品负责人裁决的事项

1. **六章主案例要不要确认？** 现在六章都是候选（`CAS-agent` / `CAS-tool` / `CAS-agent-loop` / `CAS-state-management` / `CAS-agent-harness` / `CAS-verification-loop`），且都是图鉴站的「假设场景」。确认后我把 `status` 改成 `ready`；不确认就一直是候选装配稿。要不要先补真实案例再确认？
2. **第 1 章的口径以哪条为准？** 概念地图 `cm_0608c405` 说「Agent = 装备了指令与工具的 LLM（最小只要 name 与 instructions）」，`CON-agent` 说「Agent 不等于 LLM」。现在两条都在页面上、并标了「口径注」。
3. **公网产物要不要重建？** 重建会把 **实践空间** 这个导航项和「学习空间」的壳代码带进公网版（候选章节已被边界块自动剥离），并会让 `check-public.mjs` 里那条**已知过期**的「首屏 2 格导航」断言变成红 —— AGENTS.md 与工作日志第十六轮都记过这条断言已过期，我没有擅自改它，也没把重建后的产物留在工作区。
4. **`scripts/walk-learn-agent-loop.mjs` 通过侧用的是一段「按本章材料组织的复述」**（要点逐字取自本章、正文取自 reading 原文重组），它只用来验证「通过」这条协议走得通，**不是用户复述**。如果你要求真模型走查必须用人类写的复述，我按你的稿子重跑。
