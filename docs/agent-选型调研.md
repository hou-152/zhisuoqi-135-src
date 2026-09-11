# Agent 选型调研（dbs-standard-answer · 2026-09-11）

## 直接答案

我们的费曼检验管线**不该叫「轻量 agent」，它是 workflow**——按 Anthropic 的定义："Workflows are systems where LLMs and tools are orchestrated through predefined code paths"（LLM 和工具走预先写死的代码路径）。这正适合我们：任务步骤可预知（检索→对照→判定），需要可预测和一致。结论：**保持 serve-135.mjs 的自建 workflow，不引入任何框架，不借鉴任何框架代码**；候选中只有 PI 值得作为「薄循环即可」的佐证，Penguin 系两个项目剔除（一个不成熟，一个与我们无关）。

## 第一部分：知识与理论挖掘

### 命题审查

- 原命题：「我们要做一个轻量 agent；PI / Penguin 是参考对象」。
- 审查状态：**重构**。「轻量 agent」一词不准确——按业界权威定义，写死步骤的是 workflow，模型自主驱动循环的才是 agent；我们的判定管线是前者。参考对象经核实只有 PI 成立，Penguin（Maximooch）被剔除，penguin-harness 与 Penguin 并非同源项目（此前搜索摘要造成的混淆）。
- 修正后的标准：选型问题应表述为「这个管线该用单轮调用、workflow，还是 agent」。

### 相关领域、人物与理论地图

| 关系 | 领域 | 作者/出处 | 对应机制 | 能解释什么 | 解释不了什么 | 核实状态 |
|---|---|---|---|---|---|---|
| 支持 | LLM 工程 | Anthropic《Building Effective Agents》（Erik Schluntz & Barry Zhang，2024-12-19） | 复杂度匹配任务：workflow 保可预测，agent 换灵活性 | 为什么固定管线是对的选择 | 具体到知乎检索的质量问题 | 已核实（官方博客原话，见下） |
| 支持 | 开源工程 | earendil-works/pi（103.8k star，MIT，TypeScript） | 薄循环 + 工具表就是主流 agent 内核 | 为什么不需要重框架 | 不涉及学习产品语义 | 已核实（仓库页面） |
| 纠偏 | 行业史 | AutoGPT 2023–2024 转向 | 自主循环在生产中可靠性崩塌 | 什么条件下 agent 形态失败 | 不覆盖 workflow 场景 | 已核实（多方来源，见第二部分） |
| 补充 | 学习科学 | Bastani 等（2025），项目已有 | 裸辅助有害，教学设计消除 | 为什么判定要带结构，不由模型自由发挥 | 非技术选型 | 已核实（项目内文档） |

### 主理论卡

- 理论名称：Building Effective Agents（复杂度匹配原则）
- 理论要解决的问题：agent 系统什么时候值得建、建多重
- 核心机制：从最简方案起步；workflow 给「定义良好的任务」可预测性；agent 只在「需要规模化的灵活性、模型驱动决策」时使用；框架增加抽象层、遮蔽提示词与响应、诱使过度复杂
- 原文关键句（核实状态：官方原文）："workflows offer predictability and consistency for well-defined tasks" / "optimizing single LLM calls with retrieval and in-context examples is usually enough" / "We suggest that developers start by using LLM APIs directly" / 框架 "create extra layers of abstraction that can obscure the underlying prompts and responses"
- 原始出处：Anthropic 工程博客，2024-12-19
- 核实状态：原始来源（本次直接读取）

### 理论如何解释当前问题

| 当前问题 | 理论解释 | 得出的判断 |
|---|---|---|
| 「轻量 agent」这个提法对不对 | 写死步骤的是 workflow，不是 agent | 改口：我们交付的是 workflow（检索→对照→判定） |
| 要不要上框架 | 框架遮蔽提示词/响应、诱使复杂度 | 不上；serve-135 约 80 行已覆盖 |
| 判定步要不要模型自主决策 | 任务步骤完全可预知 | 不需要；单轮调用 + 规则回退足够 |

### 第一部分边界

适合：步骤可预知、需要可预测一致性的判定/生成任务。不适合：开放性研究、无法预知步骤的任务。反例：自主 agent 在开放任务上是正确形态（但那不是我们的任务）。仍需核实：Anthropic 博客注明工具生态自 2024-12 有变化（Managed Agents），结论原则未变。

## 第二部分：历史同构与标准答案

### 结构命题

> 一个处于「48 小时比赛交付」阶段的二人小团队，依赖「检索增强的判定管线」这一核心交付，受「工程成本敏感、故障不可控即失败」的压力牵引，需要决定判定层的形态（单轮 / workflow / agent 框架）。

### 历史案例（四类证据角色）

**1. 最近成功案例：Anthropic 自家生产实践（2024–2025）**
- 决策：多数生产级增强用 workflow 与单轮优化，agent 留给开放任务；建议直接用 LLM API 起步。
- 结果：该指引成为行业事实标准。证据状态：官方一手来源（已核实）。
- 与我们相同：判定类任务、要可预测。不同：他们规模大。类比有效性：高。

**2. 跨域重复样本：earendil-works/pi（2024–2026）**
- 编程 agent 域的头部开源项目（103.8k star），内核同样是「薄循环 + 工具表」，无多 agent 编排、无内置权限。
- 可提取机制：连「需要循环」的场景，正确形态也是薄循环。类比有效性：高（域不同、结构同）。证据状态：已核实（仓库）。

**3. 失败案例：AutoGPT（2023）**
- 自主 agent 框架的现象级项目（2023 年 GitHub 增速第一），但任务规划失败被系统记录（vectara/awesome-agent-failures 有专案），媒体当时即质疑「只是 GPT-4 循环」（Ars Technica, 2023-04）；对 14,489 个 commit 的分析结论：**这个史上最成功的 agent 项目自己放弃了全自主路线**（MMNTM）。
- 可提取机制：步骤不可预知的任务 + 自主循环 = 可靠性崩塌；我们任务步骤可预知，但失败案例提醒「agent 光环」不是选型理由。类比有效性：中高。证据状态：多方二手来源已核实。

**4. 反例/边界案例：GitHub Copilot（2021 起）**
- 无 agent 循环、无框架，纯单轮补全/对话，创造了 LLM 应用最大的商业成功之一。证明「单轮裸调用」在无需多步证据的任务上可以独立成立。
- 边界：它的任务不需要证据管线；一旦需要引用与查证（我们的场景），就要加检索编排——但仍是 workflow。类比有效性：中。证据状态：公认事实（本次未单独核实）。

**补充数据点**：生产 agent 失败率被报告为 70–95%，主因是误差级联与工具故障（Fiddler AI, 2025）——支持「能不用自主循环就不用」。

### 类比有效性（摘要）

| 案例 | 阶段相似 | 资源约束相似 | 结果可比 | 总体可信度 |
|---|---|---|---|---|
| Anthropic 实践 | 高 | 中 | 高 | 高 |
| pi | 中 | 高 | 高 | 高 |
| AutoGPT | 中 | 中 | 高（反例） | 中高 |
| Copilot | 中 | 低 | 中 | 中 |

### 反复出现的机制

| 重复机制 | 出现在 | 成立条件 | 失效边界 | 证据强度 |
|---|---|---|---|---|
| 步骤可预知 → workflow/单轮胜出 | Anthropic 指引、pi、Copilot | 步骤可枚举 | 步骤需模型自主规划时 | 强（多独立来源） |
| 自主循环放大不可靠性 | AutoGPT、Fiddler 统计 | 开放任务 | 封闭任务中无此问题 | 强 |
| 框架抽象增加调试成本 | Anthropic 指引、pi（无框架直供 API） | 比赛等短周期 | 长期大团队可能换算 | 中 |

### 标准答案判断

**结论等级：条件性答案**（从业者权威指引 + 多案例支持，但非实验室共识）。

> 当管线步骤**可以预先写死**、且需要**可预测、可审计**时（我们的费曼检验），用**单轮 LLM 调用组成的 workflow**，每步可测可回退——因为误差不级联、调试面最小。当判定**不需要证据检索**时，裸单轮调用就够，连 workflow 都不用。只有当任务**步骤不可预知、需要模型自主规划工具调用**时才用 agent 形态——且历史显示（AutoGPT）自主循环的可靠性代价极高；重型框架（认知架构/多 agent 运行时）只在长时任务、会话回滚、多 agent 委托需求出现时才考虑，并须检查许可证（AGPL 对商业闭源有传染性）。

失效边界：如果黑客松评委会额外奖励「agent 架构展示」，或产品后期需要「模型自主决定查几次、查什么」的开放研究体验，上述结论需要重估。

### 结合我现在怎么办（3 个现实动作）

1. **保持 serve-135.mjs 的 workflow 不动**（已建成、43/43 验证通过）；对外表述统一改为「检索增强的判定 workflow」，弃用「轻量 agent」的说法。
2. **AB 实验照跑**：key 到位后跑 A（规则）/B（裸单轮）/C1（workflow），用数据确认「单轮+检索上下文已足够」（Anthropic 原话的我们版本）。
3. **备一句评委问答**：「为什么不用 LangChain/pi 等框架？」——答：「Anthropic 官方建议直接用 LLM API 起步，框架的抽象层会遮蔽提示词和响应；pi 的 103k star 也证明薄循环自建就是主流做法。我们的管线 80 行、每步可回退。」

### 尚待确认

- PI 的 star 数（103.8k）取自仓库页面本次读取，正式引用前建议再点开确认。
- Fiddler「70–95% 失败率」为厂商博客口径，只能作量级参考，不能当精确统计。

## 补充：视频逐字稿核查（2026-09-11 深夜补充）

团队说的「Penguin agent」出处已定位：一段 **penguin-harness 的推广视频**（逐字稿见群聊记录）。修正与核查如下。

**先修正我自己**：团队指的应该是 **penguin-harness**（Prism-Shadow / hiyouga 团队，2.1k star，Apache-2.0，活跃），不是我上一轮剔除的 Maximooch/penguin（6 star、WIP、AGPL）——那是一个名字相近的无关项目。剔除结论对 Maximooch/penguin 仍然成立，但它不该顶替在「团队参考」的位置上。

**视频宣称 vs 核实结果**（逐字稿按推广材料对待，宣称不当作事实）：

| 视频宣称 | 核实结果 |
|---|---|
| 「penguin-harness 很轻，100 倍速度用 agent 构建 agent」 | "100x speed" 是仓库自己的宣传语。产品实为完整平台（桌面端 + Docker + SDK + 评测中心 + 自进化引擎），比 Dify/LangGraph 轻，但仍是框架 |
| 「coding 能力比 Codex 好，仅次于 Claude Code」 | 无基准来源，KOL 口径，未核实 |
| 「成本对比：你好五毛 vs 两分钱」 | 方向可信（长会话产品成本更高），无测算方法，未核实 |
| 「解决方案能力超越豆包无数」 | 类目错位（豆包是消费级助手），营销话术 |
| 「harness 越薄，能力越强」 | **这条与我们结论一致**，且被 Anthropic 指引支持（直接用 LLM API、减少抽象层）。但按这条原则推到底：我们只有一个 3 步管线时，最薄的 harness 就是 80 行自建脚本，而不是引入一个 agent 构建平台 |
| 「未来竞争在编排和资源」 | 观点表达，与本次选型无关 |

**对选型结论的影响：不改变，反而加固。** 视频的核心原则（薄 harness 胜重框架）和我们 serve-135 的做法是同一件事。penguin-harness 的正确定位：**当需要快速搭建很多个 agent 应用/评测体系时**，它是值得考虑的工具（Apache-2.0 宽松、作者 hiyouga 是 LlamaFactory 作者、维护活跃）；**为单一证据判定管线引入它仍是过度设计**——它解决「构建很多 agent」，我们只交付一条 workflow。

## 资料来源

- [Anthropic — Building Effective Agents（2024-12-19）](https://www.anthropic.com/research/building-effective-agents)（已直接读取）
- [earendil-works/pi](https://github.com/earendil-works/pi)、[Maximooch/penguin](https://github.com/Maximooch/penguin)、[Prism-Shadow/penguin-harness](https://github.com/Prism-Shadow/penguin-harness)（仓库页面，已直接读取）
- [Ars Technica：Hype grows over 'autonomous' AI agents（2023-04）](https://arstechnica.com/information-technology/2023/04/hype-grows-over-autonomous-ai-agents-that-loop-gpt-4-outputs/)
- [vectara/awesome-agent-failures：AutoGPT planning failures](https://github.com/vectara/awesome-agent-failures/blob/main/docs/case-studies/autogpt-planning-failures.md)
- [MMNTM：What AutoGPT Taught Me About Production AI Agents（14,489 commits 分析）](https://www.mmntm.net/articles/autogpt-lessons)
- [Fiddler AI：AI Agent Failure Rate](https://www.fiddler.ai/blog/ai-agent-failure-rate)
- [Wikipedia：AutoGPT](https://en.wikipedia.org/wiki/AutoGPT)
