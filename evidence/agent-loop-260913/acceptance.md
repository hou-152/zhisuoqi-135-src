# Agent Loop 六章 · 验收记录

日期：2026-09-13（深夜跨 09-14）
入口：`http://127.0.0.1:5180/知所栖-壳.html`（**必须经 serve**，`/api/*` 才通）
直达某一章：`http://127.0.0.1:5180/知所栖-壳.html#learn=agent`（也可 `#learn=verification-loop` 等）
实现：`scripts/shell.template.html`（学习空间）＋ `evidence/agent-loop-260913/chapters.json`（章节数据）
材料来源：`内容结构化系统/模块/ai-concept-base/data/units.json`（五类语义单元）＋ `knowledge/概念地图-260913/topics.json`（cm_* 卡）

## 一、三份证据的分工（不许混）

| 证据 | 命令 | 它证明什么 | 它**不**证明什么 |
|---|---|---|---|
| 材料体检 | `node scripts/check-learning-materials.mjs` | 241 项：ID／类型／主案例属于候选／三题三选一恰好一对／正确答案有 OPI 或 SOL 逐字依据／正文逐字可回源／费曼要点按章不同 | 页面状态机、模型行为 |
| 页面黑盒 | `node scripts/test-learn-agent-loop.mjs` | 55 项：进入学习空间隐藏图谱与主题列表、一题一判、三题按顺序全过才出费曼、费曼门（过短／非 JSON／漏点都不算过）、**重新编辑清掉通过状态**、未通过不解锁下一章、返回恢复原路线原步骤原概念、地址可复现 | 学习效果；真模型行为（费曼走**固定响应**） |
| 真模型走查 | `node scripts/walk-learn-agent-loop.mjs agent`（另跑一次 `verification-loop`） | 真调本地 `/api/llm`：阅读 → 三题（含先答错一次）→ 费曼「未通过（列出漏点）」→ 补齐后「通过」→ 下一章解锁 → 编辑复述后锁定恢复 | 学习效果；样本各 1 章，不是统计实验 |

MVP 那一章同样有三份：`test-mvp-learning.mjs`（黑盒）· `walk-mvp-real-llm.mjs`（真模型）· 本文件。

## 二、材料配对与审核状态（逐章）

主线：`QST 章节问题 → CON 核心概念 → OPI 判断依据 → CAS 决策情境 → SOL 行动说明`。
**cm_\* 与 CON-\* 是两套独立 ID**（概念地图 vs 内容结构化系统），逐章对应关系写在 `pairings.json` 的 `correspondence`，页面「阅读」块也照贴。

| 章 | 概念地图卡（cm_\*） | 核心概念（CON-\*） | QST | 候选 CAS（主案例） | OPI | SOL | 状态 |
|---|---|---|---|---|---|---|---|
| 1 Agent | `cm_0608c405` | `CON-agent` | `QST-agent` | 1 个（`CAS-agent`，假设场景） | 2 条 | `SOL-agent`（2 步） | 候选装配稿 |
| 2 工具 | `cm_a72ef18d` | `CON-tool` | `QST-tool` | 1 个（`CAS-tool`，假设场景） | 3 条 | `SOL-tool`（3 步） | 候选装配稿 |
| 3 Agent loop | `cm_1973b1d3` | `CON-agent-loop` | `QST-agent-loop` | 1 个（`CAS-agent-loop`，假设场景） | **0 条** | `SOL-agent-loop`（3 步） | 候选装配稿 |
| 4 状态子系统与进度持久化 | `cm_be951649` | `CON-state-management` | `QST-state-management` | 1 个（`CAS-state-management`，假设场景） | 1 条 | `SOL-state-management`（3 步） | 候选装配稿 |
| 5 Harness | `cm_0a4ca4ce` | `CON-agent-harness` | `QST-agent-harness` | 1 个（`CAS-agent-harness`，假设场景） | 1 条 | `SOL-agent-harness`（3 步） | 候选装配稿 |
| 6 验证闭环 | `cm_7cd7335d` | `CON-verification-loop` | `QST-verification-loop` | 1 个（`CAS-verification-loop`，假设场景） | **0 条** | `SOL-verification-loop`（4 步） | 候选装配稿 |

**审核状态：六章全部是「候选装配稿」（`status: scaffold`）**，因为**负责人尚未确认主案例**。
判定依据（`pairings.json.caseReview.checkedAgainst`）：

- `docs/方法论-01案例决策场-MVP-20260913.md` 第 3 条要求「本轮由负责人选定一个案例」——该记录只覆盖 `CAS-context-rot` 那一轮；
- 全库检索 `docs/` 与 `内容结构化系统/`，**没有** Agent Loop 六章主案例的负责人确认记录；
- 因此页面 / 数据一律标 `pending-owner-confirmation`，不冒充已审核材料。

第 1 章另有一条**口径差异**（已登记未合并）：概念地图卡（Harness Engineering / OpenAI Agents SDK）说「Agent 即装备了指令与工具的 LLM，最小配置只要 name 与 instructions」，`CON-agent`（图鉴站）说「Agent 不等于 LLM」。页面在「阅读」块里同时给出，并加「口径注」，等负责人裁决以哪条为准。

## 三、黑盒与真模型分别覆盖到哪

黑盒（固定响应）实测：`✅ 学习空间黑盒验收全过`、`✅ 0 条 JS 报错`。
真模型实测（两次，各 2 次真实 `/api/llm` 调用、0 次知乎请求、0 条 JS 报错）：

- 第 1 章 Agent：漏点复述 → 未通过（漏「最小构成」）→ 补齐 → 通过 → 第 2 章解锁 → 编辑复述后重新锁上；
- 第 6 章 验证闭环：漏点复述 → 未通过（漏「独立检查／通过范围」）→ 补齐 → 通过。

**这两次只证明「接口 + 提示词 + 结构化协议 + 状态门」在真实调用下走得通，不代表学习效果，也不是统计样本。**

## 四、截图

| 文件 | 内容 |
|---|---|
| `prototype/预览/50-学习空间-第一章阅读.png` | 黑盒：学习空间静置态（图谱/主题列表/左栏全隐藏、五类材料 ID、候选标记） |
| `prototype/预览/51-学习空间-决策与费曼.png` | 黑盒：三题全过、费曼区出现 |
| `prototype/预览/52-学习空间-费曼通过.png` | 黑盒：固定响应下「费曼通过」 |
| `prototype/预览/53-学习空间-返回知识体系.png` | 黑盒：返回后恢复原路线第 1 步与原概念 |
| `prototype/预览/54-学习空间-真模型走查-阅读.png` | 真模型：第 1 章阅读态 |
| `prototype/预览/55-学习空间-真模型走查-三题通过.png` | 真模型：三题通过 |
| `prototype/预览/56-学习空间-真模型走查-费曼未通过.png` | 真模型：未通过 + 漏点 |
| `prototype/预览/57-学习空间-真模型走查-费曼通过.png` | 真模型：通过 + 下一章解锁 |
| `/tmp/mvp-decision-context-rot.png` | 原 MVP 黑盒截图（未变） |
| `evidence/agent-loop-260913/walk-{1..4}-*.png` | 原 MVP 真模型走查四步截图 |

## 五、未覆盖 / 缺口

- 六章主案例**全是假设场景**（源卡 `scenario.type: hypothetical`，内容结构化系统已把它记为已知问题）；要真实案例得另从 58 篇正文抽一批。
- 每章按 `relationships.target` 找到的候选 CAS **都只有 1 个**，没有第二候选；「一个概念可有多个候选案例」这条规则在本批材料上没被真正用上。
- 第 3、6 章**没有 OPI 直连**，三题依据全部落在 SOL 动作路径上（规则允许「OPI 或 SOL」，但依据面比其他章窄）。
- 只对第 1、6 章做过真模型走查；第 2/3/4/5 章只过了黑盒与材料体检。
- 没有做 03 费曼演练室 / 05 实验台；没有接知乎 API；没有让模型规划路线。
- 公网产物未重建（见回执「未执行事项」）。
