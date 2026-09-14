# 项目内 skills

这个目录放**项目自己带得走的 skill**，让任何 agent（Codex / Claude Code / 其他）在**不依赖这台机器的用户目录**的前提下也能用。

## 目录里有什么

| 目录 | 是什么 | 归属 |
|---|---|---|
| `zhihu/` | 知乎开放平台 skill（项目自建，SKILL.md 含 CLI 用法与接口矩阵） | 项目所有 |
| `concept-net/` | 概念网络图产线（2026-09-15）：生成「节点＋带标签有向边＋分层」图并接进网站；规格 R1—R8、产线命令、行为验证标准 | 项目所有 |
| `dbs*`（14 个） | **dontbesilent 商业工具箱**里本项目实际用到的子集，见下表 | 所有者自己的方法论体系 |

## 14 个 dbs skill：各自是什么、用在哪

### A. 产品内部要用（Codex 实现模块时会读）

| skill | 一句话 | 落在产品哪 |
|---|---|---|
| `dbs-learning` | 把课题拆成连续学习文章，按反馈调深度/角度/节奏 | **模块 1 互动阅读器**（三层梯度 L1 直觉 / L2 机制 / L3 应用） |
| `dbs-standard-answer` | 两部分固定动作：① 知识与理论挖掘 ② 历史同构与标准答案（成功/失败/反例） | **模块 3 案例决策场**（先自己选 → 看真实案例 → 拿带条件的答案表 → 修订） |
| `dbs-learning-beta` | 处理**「没有标准答案」的课题**：先判课题类型（伪问题/主观判断/个人决策/价值问题），再输出判据、代价、只有你能回答的裁决点、最小实验 | **入口分流**（见交接件 §16）：知识型 → 135 通路；无标准答案 → 这一条 |

### B. 做决策时用过（Codex 理解「结论是怎么来的」时会读）

| skill | 用在本项目的哪 |
|---|---|
| `dbs-deconstruct` | 概念拆解（维特根斯坦「意义即使用」+ 奥派「主观价值」）→ 判定 6 条决策里哪些是**真冲突**、哪些是**措辞漂移** |
| `dbs-jtbd` | 任务澄清 → 拆开 **用户 A（所有者自己）vs 用户 B（终端学习者）**；D2/D5/D6 的矛盾根源都在这 |
| `dbs-knowledge` | 知识库治理 → `SOURCE_OF_TRUTH.md` 的分层与版本规则；只读审计（62 条路径 59 存，3 条假阳性） |
| `dbs-decision` | 决策工程四层（事实/规律/定格/待解）→ `决策/知乎黑客松/` |
| `dbs-chatroom` | 多角色专家对话 → 四轮（Ashby / Bainbridge / Sweller / Chi），D4 的四个命名来自这里 |
| `dbs-theory-grounding` | 理论溯源 → `research/2Sigma-理论锚定.md` |
| `dbs-good-question` | 问题说明书 → `research/APP-Agent形态与标准答案融合-20260912.md` §1 |
| `dbs-diagnosis` | 09-12 凌晨那一轮（记忆方案 5 路极端推演） |
| `dbs-report` / `dbs-save` | 诊断存档与汇总 |
| `dbs` | 工具箱入口（任务编排），也是「该叫哪个 skill」的路由 |

## ⚠️ 副本会漂移——这是已知代价

- **上游真身**在 `~/.agents/skills/`（这台机器的用户目录），用 `/dbs-update` 更新。
- **本目录是副本**，为的是让项目自包含。**上游更新后这里不会自动同步。**
- 判定规则：**跑产品用这里的副本；改方法论去上游改，改完再同步回来。** 不要在项目副本上单独改，否则两边会分叉。

## 工具箱完整清单（38 个），这里只放了 14 个

**没放进来**（与本项目无关）：`dbs-action`（拖延诊断）· `dbs-agent-migration` · `dbs-ai-check`（AI 味检测）· `dbs-benchmark`（对标）· `dbs-bridge` · `dbs-chatroom-austrian` · `dbs-content` · `dbs-content-risk-check` · `dbs-content-system` · `dbs-goal` · `dbs-hook`（短视频开头）· `dbs-install-skill` · `dbs-learning-strict`（**空目录**）· `dbs-resonate` · `dbs-restore` · `dbs-script-flow` · `dbs-skill-cleaner` · `dbs-skill-maker` · `dbs-slowisfast` · `dbs-spread` · `dbs-update` · `dbs-video-extract` · `dbs-wechat-html` · `dbs-xhs-title`

**要补齐**：`cp -R ~/.agents/skills/<名字> .agents/skills/`。

## 边界

- 这 14 个是**所有者自己的方法论 skill**，不是第三方代码；`dbs` 系由官方 marketplace 分发。
- **凭证不在这里**。知乎的 Access Secret 在 `.private/zhihu/access-secret`（600，不入库）；LLM key 在 `.private/llm.env`（600，gitignored）。
