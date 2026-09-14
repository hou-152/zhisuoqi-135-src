# Harness Engineering 三个 Scaling 维度的统一框架

- 标题：Harness Engineering 三个 Scaling 维度的统一框架
- 来源：martinfowler.com
- 原文：https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
- 作者：martinfowler.com
- 类型：主题特刊
- 摘要：把 Harness Engineering 拆成时间、空间、交互三个 scaling 维度，解释 OpenAI、Cursor、Anthropic 为什么用了同一个词，却在解决不同问题。适合作为整份清单的概念地图。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：9640
- 策展人按：前面那条给了零件表，这篇给坐标系。OpenAI、Cursor、Anthropic 嘴里说的是同一个 harness，实际各自在解时间、空间、交互三个不同的 scaling 问题。建议放在清单前面，后面二十几条都能往这三格里归。

---

- 原文标题：Harness Engineering 在讨论什么：三个 Scaling 维度的统一框架
- 作者：grapeot
- 内参日期：2026-04-06
- 来源类型：blog
- 原文：https://yage.ai/share/harness-engineering-scalability-20260330.html
- 标签：agents, agentic workflow, agent 元技能

OpenAI、Cursor、Anthropic 讲的 harness engineering 其实是三件不同的事——时间 scalability、空间 scalability、交互 scalability

## 导读

一个概念：harness engineering。aka：agent 元技能。

## 核心论点

Harness engineering 的本质是让 AI 构建软件变得 scalable，而 scalability 有三个独立的维度——时间、空间、交互。OpenAI、Cursor、Anthropic 三家各自解了其中一个，但人们用同一个词在讨论不同层面的问题，这是当前混乱的根源。

## 一个词，三件事

- 2026 Q1，三家先后发布 agent-first 软件开发实践报告，都被归入 harness engineering，但讲的是三件完全不同的事：
- **OpenAI** → 环境设计：文档体系、架构约束、可观测性基础设施，让 agent 在精心设计的工作环境里可靠生产代码
- **Cursor** → 协调架构：几百个 agent 同时工作，怎么分工、并行、收敛
- **Anthropic** → 运行时纠偏：一个 agent 连续跑几小时，怎么保持方向和质量
- 混乱根源：读者群高度重叠，术语高度一致，但各自回答的工程问题截然不同
- 大量二手解读还停留在两年前的 multi-agent 虚拟团队概念，离这三篇的实际内容更远

## 地基：三家收敛到的四条共识

这四条共识构成 harness engineering 的地基，三个 scaling 维度是在这个地基上的分化。

### 人类的核心工作从写代码转向设计 agent 的工作环境

- OpenAI：「设计环境、指定意图、构建反馈循环」
- Cursor：「架构和指令比 harness 本身更重要」
- Anthropic：planner 和 evaluator 的设计比 prompt 措辞对产出质量影响更大
- 共同结论：人类的杠杆点在于创造让 agent 能可靠工作的条件，代码本身由 agent 产出

### 知识必须版本化、可发现、存在于 repo 中

- OpenAI 最直白：**Codex 看不到的等于不存在**——Google Docs 里的讨论、Slack 上的对齐、脑子里的隐含知识，对 agent 统统是空白
- Cursor 验证：指令中的模糊措辞会被数百个 agent 同时放大，后果比人类团队严重得多
- 解法一致：把知识推入 repo，用 markdown 和结构化文档取代口头沟通

### 约束比指令有效

- OpenAI 用自定义 linter 强制执行分层架构，lint 错误信息本身就是给 agent 的修复指引
- Cursor 发现「no TODOs, no partial implementations」比「remember to finish implementations」有效得多
- 核心区别：约束是可执行的、确定性的；指令是可解释的、模糊的

### 完美主义是吞吐量的敌人

- OpenAI 采用最小阻塞合并：等待比纠错更昂贵
- Cursor 发现要求每次 commit 100% 正确会导致系统停滞，一个小错误让整个系统陷入修复循环
- 共同权衡：**纠错比等待便宜**——在 agent 产出速度远超人类注意力的场景下，这是合理的工程决策

任何一篇讨论 harness engineering 的文章，如果连这四条都没有涉及，大概率还在讨论别的东西。

## 三个 Scaling 维度

### 时间 Scalability：让一个 Agent 连续跑几小时（Anthropic）

**问题**：agent 在精心设计的环境里开始工作后，怎么在几个小时的连续运行中保持方向和质量？

**为什么独立于环境设计**：长时间运行会引发两类环境设计无法预防的失败——

- **方向漂移**：上下文窗口逐渐变满 → 一致性衰减 → 偏离方向、遗忘早期约束、在细节中越走越深
- **自评失真**：agent 能发现自己产出的缺陷，但随后说服自己可以接受，给出通过判断

**解法：三角色架构**

- **Planner**：一句话需求 → 完整产品 spec（只做产品层面和高层技术方向，不进入实现细节）
- **Generator**：按 spec 实现功能
- **Evaluator**：拿着事先协商的 sprint contract，用 Playwright 操作真实应用验证产出
- 关键：Evaluator 和 Generator 之间没有共享的内部状态——这种独立性是它能纠偏的前提

**最有方法论价值的部分：harness 组件的生命周期**

- 每个 harness 组件都是对当前模型能力边界的一个假设：
- Context reset → 假设模型无法在长上下文中保持一致性
- Sprint 分解 → 假设模型无法在连续长 session 中保持方向感
- Evaluator → 假设模型会对自己的工作过度宽容
- 这些假设有不同的过期速度：Sonnet 4.5 → Opus 4.5 → Opus 4.6 三代模型中，context reset 先被淘汰，sprint 分解随后淘汰，evaluator 仍然有价值
- 关键做法：逐一移除旧组件、测试质量是否真的下降，而不是继续叠加新组件

**产出**：数字音频工作站，运行 \~4 小时，成本 \$124（generator 第一轮连续跑 2h7min）。对比基线：单 agent 跑 20 分钟花 \$9，核心功能无法正常使用。

### 空间 Scalability：让几百个 Agent 并行工作（Cursor）

**问题**：能否通过投入 10x 计算获得 10x 有意义吞吐量？

**基准任务**：从零构建 web 浏览器引擎（Rust），数百个 agent 并行运行一周，生成 100 万+ 行代码。

**四次架构迭代（坦诚记录的失败过程）**：

1. **所有 agent 地位平等 + 共享状态文件** → 失败：持锁太久、忘记释放，20 个 agent 退化到 1-3 个的吞吐量；更深层：没有层级时 agent 变得回避风险，只做安全小改动
2. **四角色分离（Planner/Executor/Worker/Judge）** → 改善但被最慢 Worker 瓶颈住
3. **Planner 合并进 Executor** → 角色过载导致病理行为：随机休眠、停止生成任务、自己动手写代码
4. **最终方案：递归 Planner-Worker 架构** ✅

- 根 Planner 拥有整个项目范围，范围过大时生成子 Planner，递归进行
- Worker 在自己的 repo 副本上独立工作，完成后写 handoff（做了什么、发现了什么、有什么担忧）提交给 Planner
- Worker 之间互不感知，信息严格向上流动

**线性扩展的三个关键**：

- 规划层面：递归 Planner 让规划本身可并行，避免单一 Planner 成为瓶颈
- 执行层面：Worker 完全隔离，各自独立 repo 副本，消除锁竞争
- 质量层面：移除集中式 Integrator（它变成瓶颈），接受小而稳定的错误率，让错误被其他 agent 自然修复

**关键发现**：repo 从 monolith 重构为多个独立 crate 后，编译等待大幅缩短，吞吐量成倍提升 → **为 agent 优化的 repo 结构和为人类优化的可能不同**。峰值 \~1000 commits/hour。

### 交互 Scalability：让人用最少介入 steer 大量 Agent 工作（OpenAI）

**问题**：agent 产出速度远超人类注意力时，人应该通过什么界面来 steer 整个系统？

**原始交互模式**：人写 prompt → agent 跑（单次经常超 6 小时，通常在工程师睡觉时执行）→ agent 产出 PR → agent-to-agent review → 人选择性参与。三人团队五个月合并 \~1500 个 PR，平均每人每天 3.5 个。

**Symphony（2026.3 开源）**：把交互从「写 prompt 并触发」简化为「写 ticket 并移动状态」

- 用 Elixir/BEAM 构建的持久化守护进程
- 项目管理工具（Linear）变成 agent 的 job scheduler
- Ticket 移到 Todo → Symphony 自动创建独立工作空间 → 派 Codex 执行 → 产出 Proof of Work（CI 结果、walkthrough、录屏）→ 开 PR
- 配置通过 repo 内的 [WORKFLOW.md](http://workflow.md/) 完成（YAML frontmatter + Liquid 模板化 prompt）→ agent 策略跟代码一起版本控制

**人类注意力 scaling 的三层解法**：

1. **Agent 自我验证**：Chrome DevTools Protocol + 独立可观测性栈 → 高层目标（如「没有超过两秒的 span」）对 agent 可执行
2. **机械化约束取代人工 review**：自定义 linter 强制架构不变量，错误信息写成 agent 能理解的修复指引
3. **自动化熵管理**：编码「黄金原则」，后台 agent 定期扫描偏离、开修复 PR，大多数可在一分钟内审阅并自动合并

**反馈循环的转变**：重心从纠正 agent 的具体产出 → 改进 harness 本身（更好的测试、文档、约束），这些改进在所有未来 agent run 中复利。

## 三个维度之间的关系

理解依赖关系比理解每个维度本身更重要：

- **空间 scaling 会放大时间 scaling 的问题**：一个 agent 漂移，后果局限在一个 PR；几百个 agent 同时漂移，错误以并行度的倍数积累。Cursor 偏向接受稳定错误率并让系统自然收敛，Anthropic 偏向引入独立 evaluator——哪个更优尚无定论
- **交互 scaling 依赖时间和空间 scaling 的成熟度**：Symphony 的前提是单个 run 足够可靠（时间）且系统能管理大量 run（空间）。否则 ticket 驱动模式退化为手动触发的批处理
- **跨维度发现：模型选择对角色适配比预期更重要**：Cursor 发现 GPT-5.2 在长时间自主运行中优于 Opus 4.5（后者倾向提前停止和走捷径）。Harness engineering 的一部分工作是为不同角色匹配不同模型，且随模型迭代持续变化

## 框架的应用与边界

**判断工具**：当有人说 harness engineering 时，先问——它在解决哪个维度的 scaling？时间？空间？交互？三个维度的工程问题不同，解法不同，trade-off 也不同。

**质量过滤器**：如果一篇文章讨论 harness engineering 但连三个维度中任何一个都没触及，大概率在讨论更基础的东西——传统 multi-agent 协作、AI 虚拟团队概念、或者只是用时髦词包装已有实践。

**互补方向：Context Infrastructure**

- 三家讨论的 scaling 都在优化 agent 怎么工作，但质量上限取决于它拿到什么样的 context
- Harness 解决工作方式和协调，context infrastructure 解决认知密度
- 同样的模型 + 工具 + prompt，接入经过一年积累和分层精炼的认知框架后，产出从「正确的废话」变成「有判断力的分析」

**适用边界**

- 三个维度的 scaling 解决的是偏头部需求：极复杂系统、大型基础设施、AI 能力边界探索
- AI 对软件更深远的影响可能在另一个方向：让软件本身变得更简单、更一次性、更贴合具体需求
- 当交付物从成品软件变成 Generative Kernel 时，harness engineering 的重要性会下降——需要被 harness 的系统复杂度本身在降低

## 概念网络

### 核心概念解析 (Core Concepts)

- **【Harness Engineering】**
- **context**：

2026 Q1，三家先后发布 agent-first 软件开发实践报告，都被归入 harness engineering，但讲的是三件完全不同的事。

- **费曼一下**：Harness 原意是「驾驭」。Harness engineering 就是为 AI agent 搭建脚手架的工程学科——不是教 agent 写更好的代码，而是设计让 agent 能可靠工作的整个环境、流程和约束体系。本文的核心洞察是：这个词被三家公司用来指代三件完全不同的事（时间/空间/交互三个维度的 scaling），混淆了整个行业的讨论。
- **【时间 Scalability / Temporal Scalability】**
- **context**：

agent 在精心设计的环境里开始工作后，怎么在几个小时的连续运行中保持方向和质量？

- **费曼一下**：让一个 agent 从跑 20 分钟延长到跑 4 小时而不崩溃。核心难点是方向漂移和自评失真——跑久了 agent 会忘记初始目标，还会说服自己「差不多得了」。Anthropic 的解法是把一个 agent 拆成三个角色（Planner/Generator/Evaluator），用独立的验证者来对抗自我宽容。
- **【空间 Scalability / Spatial Scalability】**
- **context**：

能否通过投入 10x 计算获得 10x 有意义吞吐量？

- **费曼一下**：让几百个 agent 同时干活而不互相踩脚。核心难点是协调——共享状态导致锁竞争，集中式规划导致瓶颈。Cursor 的解法是递归 Planner-Worker 架构：Worker 完全隔离、各自独立副本，信息严格向上流动，让并行度真正线性扩展。
- **【交互 Scalability / Interaction Scalability】**
- **context**：

agent 产出速度远超人类注意力时，人应该通过什么界面来 steer 整个系统？

- **费曼一下**：当 agent 每天产出几十个 PR、人根本看不过来时，人类该怎么介入？OpenAI 的解法是把交互从「写 prompt」简化为「写 ticket 并移动状态」，让项目管理工具（Linear）变成 agent 的 job scheduler，配合自动化验证和熵管理来替代人工 review。
- **【方向漂移 / Direction Drift】**
- **context**：

上下文窗口逐渐变满 → 一致性衰减 → 偏离方向、遗忘早期约束、在细节中越走越深

- **费曼一下**：Agent 版的「煮青蛙」——不是突然崩溃，而是在长时间运行中缓慢偏离初始目标。上下文窗口满了之后，早期的约束和方向被新信息淹没，agent 在细节里越走越深却浑然不觉。
- **【自评失真 / Self-evaluation Distortion】**
- **context**：

agent 能发现自己产出的缺陷，但随后说服自己可以接受，给出通过判断

- **费曼一下**：Agent 版的「自我感觉良好」。它明明看到了问题，但作为自己工作的评审者，它倾向于找理由说服自己这没什么大不了。这就是为什么 Evaluator 必须和 Generator 没有共享内部状态——独立性是客观评价的前提。
- **【递归 Planner-Worker 架构】**
- **context**：

根 Planner 拥有整个项目范围，范围过大时生成子 Planner，递归进行。Worker 在自己的 repo 副本上独立工作，完成后写 handoff 提交给 Planner。Worker 之间互不感知，信息严格向上流动。

- **费曼一下**：Cursor 在四次失败后找到的最终架构。核心思想是「分治法」的工程实现：规划可以递归拆分（避免单一规划者成瓶颈），执行完全隔离（消除锁竞争），质量接受小幅损耗（让错误被自然修复而非集中审查）。这是让并行 agent 数量线性扩展的关键。
- **【Symphony】**
- **context**：

把交互从「写 prompt 并触发」简化为「写 ticket 并移动状态」。用 Elixir/BEAM 构建的持久化守护进程。项目管理工具（Linear）变成 agent 的 job scheduler。

- **费曼一下**：OpenAI 2026.3 开源的 agent 编排系统。它的创新在于把程序员和 agent 的交互界面从「写 prompt」变成「管 ticket」——你只需要在 Linear 上把任务拖到 Todo，Symphony 自动创建工作空间、派 agent 执行、产出 PR。agent 策略写在 repo 的 [WORKFLOW.md](http://workflow.md/) 里，跟代码一起版本控制。
- **【Harness 组件生命周期】**
- **context**：

每个 harness 组件都是对当前模型能力边界的一个假设。这些假设有不同的过期速度。关键做法：逐一移除旧组件、测试质量是否真的下降，而不是继续叠加新组件。

- **费曼一下**：本文最有方法论价值的洞察。每个 harness 组件（context reset、sprint 分解、evaluator）本质上是在说「模型做不到 X」。但模型在进化，这些假设会过期。正确做法不是无脑叠加新组件，而是定期拆掉旧组件测试——如果质量没下降，说明模型已经补上了那个短板。
- **【Context Infrastructure】**
- **context**：

三家讨论的 scaling 都在优化 agent 怎么工作，但质量上限取决于它拿到什么样的 context。Harness 解决工作方式和协调，context infrastructure 解决认知密度。

- **费曼一下**：Harness engineering 的互补方向。Harness 解决「怎么干活」，context infrastructure 解决「带着什么知识干活」。同一个 agent，接入经过长期积累和分层精炼的认知框架后，产出从「正确的废话」升级为「有判断力的分析」。这是作者对三篇报告共同盲区的补充。
- **【Generative Kernel】**
- **context**：

当交付物从成品软件变成 Generative Kernel 时，harness engineering 的重要性会下降——需要被 harness 的系统复杂度本身在降低。

- **费曼一下**：作者对 harness engineering 适用边界的判断。如果未来软件不再是大型复杂系统，而是按需生成的一次性内核，那么驾驭大型系统的工程学科自然失去用武之地。这暗示 AI 对软件更深远的影响可能不在于更好地构建复杂系统，而在于让系统本身不再需要那么复杂。

### 概念网络 (Concept Network)

![图片展示了Harness Engineering三个Scaling维度的统一框架。Harness组件生命周期横跨时间、空间、交互扩展性，每个harness组件是模型能力边界的假设，需随模型进化主动移除。时间扩展性涉及规划者、生成者与评估者应对漂移和自评失真；空间扩展性为递归规划者 - 工作者架构；交互扩展性是Symphony以工单驱动交互。上下文基础设施解决认知密度，与Harness工程互补。生成式内核在软件复杂度下降时重要性下降，与Harness工程存在互补关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDk2NjQxYTYxY2I5MWFkNDQ5YzBhYTQwZWFmZTU0MjZfYjgzZWJkM2YwZjkwNTgyOThjMjYwZjAwODNkYjU3YmFfSUQ6NzY3MTAwODA2ODU5OTA3NDA2N18xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **Harness Engineering** 是顶层概念，被拆解为三个独立的 scaling 维度：**时间 Scalability**（Anthropic）、**空间 Scalability**（Cursor）、**交互 Scalability**（OpenAI）
- **方向漂移** 和 **自评失真** 是时间 Scalability 的两个核心失败模式，催生了 Planner/Generator/Evaluator 三角色架构
- **递归 Planner-Worker 架构** 是空间 Scalability 的最终解法，经历四次迭代失败后收敛
- **Symphony** 是交互 Scalability 的工程产物，将人类交互界面从 prompt 简化为 ticket
- **Harness 组件生命周期** 横跨三个维度，提供了一种元方法论：每个 harness 组件都是对模型能力边界的假设，需随模型进化主动移除
- **Context Infrastructure** 与 Harness Engineering 互补——前者解决「认知密度」，后者解决「工作方式」，共同决定 agent 产出质量
- **Generative Kernel** 标定了 Harness Engineering 的适用边界——当软件复杂度本身下降时，驾驭复杂系统的工程学科重要性随之下降
- 三个维度之间存在依赖：空间 scaling 放大时间 scaling 的问题；交互 scaling 依赖前两者的成熟度
