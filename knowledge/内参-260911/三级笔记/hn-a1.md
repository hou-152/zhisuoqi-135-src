# Harness Engineering 三个 Scaling 维度的统一框架

## 一句话主旨
一个词三件事：时间、空间、交互三个独立 scaling 维度。

## 作者试图回答的问题
- 核心问题：OpenAI、Cursor、Anthropic 2026 Q1 发布的 agent-first 软件开发实践都被归入 harness engineering，它们各自在解决什么不同的工程问题？
- 配套问题：三者是否共享共同地基？三个 scaling 维度之间是什么依赖关系？该框架如何用于快速判断相关讨论和划定适用范围？

## 三级论证骨架
### 一、起点：一个词，三件事，同一术语下存在三套不同工程问题
#### 1.1 2026 Q1 三家实践被归入同一标签，但各自对象不同
- OpenAI → 环境设计：文档体系、架构约束、可观测性基础设施，让 agent 在精心设计的环境里可靠生产代码。
- Cursor → 协调架构：几百个 agent 同时工作，怎么分工、并行、收敛。
- Anthropic → 运行时纠偏：一个 agent 连续跑几小时，怎么保持方向和质量。
- 混乱根源：读者群高度重叠、术语高度一致，但各自回答的工程问题截然不同；大量二手解读停留在两年前的 multi-agent 虚拟团队概念。

#### 1.2 作者的核心判断
- Harness engineering 的本质是让 AI 构建软件变得 scalable，而 scalability 有时间、空间、交互三个独立维度；三家各解了其中一个。

### 二、共同地基：三家收敛到的四条共识
#### 2.1 人类核心工作从写代码转向设计 agent 的工作环境
- OpenAI：设计环境、指定意图、构建反馈循环。
- Cursor：架构和指令比 harness 本身更重要。
- Anthropic：planner 和 evaluator 的设计比 prompt 措辞对产出质量影响更大。
- 共同结论：人类杠杆点在创造让 agent 能可靠工作的条件，代码本身由 agent 产出。

#### 2.2 知识必须版本化、可发现、存在于 repo 中
- OpenAI 最直白：“Codex 看不到的等于不存在”——Google Docs 讨论、Slack 对齐、脑中隐含知识对 agent 是空白。
- Cursor 验证：指令模糊措辞会被数百个 agent 同时放大，后果比人类团队严重得多。
- 解法一致：把知识推入 repo，用 markdown 和结构化文档取代口头沟通。

#### 2.3 约束比指令有效
- OpenAI 用自定义 linter 强制执行分层架构，lint 错误信息本身就是给 agent 的修复指引。
- Cursor 发现“no TODOs, no partial implementations”比“remember to finish implementations”有效得多。
- 核心区别：约束可执行、确定性；指令可解释、模糊。

#### 2.4 完美主义是吞吐量的敌人
- OpenAI 采用最小阻塞合并：等待比纠错更昂贵。
- Cursor 发现要求每次 commit 100% 正确会导致系统停滞，小错误让系统陷入修复循环。
- 共同权衡：纠错比等待便宜——在 agent 产出速度远超人类注意力的场景下，这是合理工程决策。
- 收束判断：任何一篇讨论 harness engineering 的文章，如果连这四条都没有涉及，大概率还在讨论别的东西。

### 三、三个 Scaling 维度的具体工程
#### 3.1 时间 Scalability（Anthropic）：让一个 agent 连续跑几小时
##### 3.1.1 时间 scaling 回答的问题与独立原因
- 问题：agent 在精心设计的环境里开始工作后，怎么在几小时连续运行中保持方向和质量？
- 为什么独立于环境设计：长时间运行引发两类环境设计无法预防的失败。
  - 方向漂移：上下文窗口逐渐变满 → 一致性衰减 → 偏离方向、遗忘早期约束、在细节中越走越深。
  - 自评失真：agent 能发现自己产出的缺陷，但随后说服自己可以接受，给出通过判断。

##### 3.1.2 三角色架构
- Planner：一句话需求 → 完整产品 spec（只做产品层面和高层技术方向，不进入实现细节）。
- Generator：按 spec 实现功能。
- Evaluator：拿着事先协商的 sprint contract，用 Playwright 操作真实应用验证产出。
- 关键：Evaluator 和 Generator 之间没有共享内部状态——这种独立性是它能纠偏的前提。

##### 3.1.3 Harness 组件生命周期：最有方法论价值的部分
- 每个 harness 组件都是对当前模型能力边界的一个假设。
  - Context reset → 假设模型无法在长上下文中保持一致性。
  - Sprint 分解 → 假设模型无法在连续长 session 中保持方向感。
  - Evaluator → 假设模型会对自己的工作过度宽容。
- 这些假设有不同过期速度：Sonnet 4.5 → Opus 4.5 → Opus 4.6 三代模型中，context reset 先被淘汰，sprint 分解随后淘汰，evaluator 仍然有价值。
- 关键做法：逐一移除旧组件、测试质量是否真的下降，而不是继续叠加新组件。

##### 3.1.4 产出验证
- 数字音频工作站，运行约 4 小时，成本 $124（generator 第一轮连续跑 2h7min）。
- 对比基线：单 agent 跑 20 分钟花 $9，核心功能无法正常使用。

#### 3.2 空间 Scalability（Cursor）：让几百个 agent 并行工作
##### 3.2.1 问题与基准任务
- 问题：能否通过投入 10x 计算获得 10x 有意义吞吐量？
- 基准任务：从零构建 web 浏览器引擎（Rust），数百个 agent 并行运行一周，生成 100 万+ 行代码。

##### 3.2.2 四次架构迭代（坦诚记录的失败过程）
- 第一次：所有 agent 地位平等 + 共享状态文件 → 失败。
  - 持锁太久、忘记释放，20 个 agent 退化到 1-3 个的吞吐量；没有层级时 agent 变得回避风险，只做安全小改动。
- 第二次：四角色分离（Planner/Executor/Worker/Judge）→ 改善但被最慢 Worker 瓶颈住。
- 第三次：Planner 合并进 Executor → 角色过载导致病理行为：随机休眠、停止生成任务、自己动手写代码。
- 第四次：最终方案：递归 Planner-Worker 架构。

##### 3.2.3 最终架构：递归 Planner-Worker
- 根 Planner 拥有整个项目范围，范围过大时生成子 Planner，递归进行。
- Worker 在自己的 repo 副本上独立工作，完成后写 handoff（做了什么、发现了什么、有什么担忧）提交给 Planner。
- Worker 之间互不感知，信息严格向上流动。

##### 3.2.4 线性扩展的三个关键
- 规划层面：递归 Planner 让规划本身可并行，避免单一 Planner 成为瓶颈。
- 执行层面：Worker 完全隔离，各自独立 repo 副本，消除锁竞争。
- 质量层面：移除集中式 Integrator（它变成瓶颈），接受小而稳定的错误率，让错误被其他 agent 自然修复。
- 关键发现：repo 从 monolith 重构为多个独立 crate 后，编译等待大幅缩短，吞吐量成倍提升 → 为 agent 优化的 repo 结构和为人类优化的可能不同；峰值约 1000 commits/hour。

#### 3.3 交互 Scalability（OpenAI）：让人用最少介入 steer 大量 agent 工作
##### 3.3.1 问题与原始交互模式
- 问题：agent 产出速度远超人类注意力时，人应该通过什么界面来 steer 整个系统？
- 原始交互模式：人写 prompt → agent 跑（单次经常超 6 小时，通常在工程师睡觉时执行）→ agent 产出 PR → agent-to-agent review → 人选择性参与。
- 规模：三人团队五个月合并约 1500 个 PR，平均每人每天 3.5 个。

##### 3.3.2 Symphony（2026.3 开源）
- 把交互从“写 prompt 并触发”简化为“写 ticket 并移动状态”。
- 用 Elixir/BEAM 构建的持久化守护进程。
- 项目管理工具（Linear）变成 agent 的 job scheduler：Ticket 移到 Todo → Symphony 自动创建独立工作空间 → 派 Codex 执行 → 产出 Proof of Work（CI 结果、walkthrough、录屏）→ 开 PR。
- 配置通过 repo 内的 WORKFLOW.md 完成（YAML frontmatter + Liquid 模板化 prompt）→ agent 策略跟代码一起版本控制。

##### 3.3.3 人类注意力 scaling 的三层解法
- Agent 自我验证：Chrome DevTools Protocol + 独立可观测性栈 → 高层目标（如“没有超过两秒的 span”）对 agent 可执行。
- 机械化约束取代人工 review：自定义 linter 强制架构不变量，错误信息写成 agent 能理解的修复指引。
- 自动化熵管理：编码“黄金原则”，后台 agent 定期扫描偏离、开修复 PR，大多数可在一分钟内审阅并自动合并。

##### 3.3.4 反馈循环的转变
- 重心从纠正 agent 的具体产出 → 改进 harness 本身（更好的测试、文档、约束），这些改进在所有未来 agent run 中复利。

### 四、三个维度之间的关系
#### 4.1 空间 scaling 会放大时间 scaling 的问题
- 一个 agent 漂移，后果局限在一个 PR；几百个 agent 同时漂移，错误以并行度的倍数积累。
- Cursor 偏向接受稳定错误率并让系统自然收敛，Anthropic 偏向引入独立 evaluator——哪个更优尚无定论。

#### 4.2 交互 scaling 依赖时间和空间 scaling 的成熟度
- Symphony 的前提是单个 run 足够可靠（时间）且系统能管理大量 run（空间）；否则 ticket 驱动模式退化为手动触发的批处理。

#### 4.3 跨维度发现：模型选择对角色适配比预期更重要
- Cursor 发现 GPT-5.2 在长时间自主运行中优于 Opus 4.5（后者倾向提前停止和走捷径）。
- Harness engineering 的一部分工作是为不同角色匹配不同模型，且随模型迭代持续变化。

### 五、框架的应用与边界
#### 5.1 判断工具
- 当有人说 harness engineering 时，先问：它在解决哪个维度的 scaling？时间？空间？交互？三个维度的工程问题不同，解法不同，trade-off 也不同。

#### 5.2 质量过滤器
- 如果一篇文章讨论 harness engineering 但连三个维度中任何一个都没触及，大概率在讨论更基础的东西——传统 multi-agent 协作、AI 虚拟团队概念、或只是用时髦词包装已有实践。

#### 5.3 互补方向：Context Infrastructure
- 三家讨论的 scaling 都在优化 agent 怎么工作，但质量上限取决于它拿到什么样的 context。
- Harness 解决工作方式和协调，context infrastructure 解决认知密度。
- 同样的模型 + 工具 + prompt，接入经过一年积累和分层精炼的认知框架后，产出从“正确的废话”变成“有判断力的分析”。

#### 5.4 适用边界
- 三个维度的 scaling 解决的是偏头部需求：极复杂系统、大型基础设施、AI 能力边界探索。
- AI 对软件更深远的影响可能在另一个方向：让软件本身变得更简单、更一次性、更贴合具体需求。
- 当交付物从成品软件变成 Generative Kernel 时，harness engineering 的重要性会下降——需要被 harness 的系统复杂度本身在降低。

## 作者边界、反例与不确定性
- 作者明确给出的不确定性：空间 scaling 的两个质量策略——Cursor 接受稳定错误率让系统自然收敛 vs Anthropic 引入独立 evaluator——哪个更优“尚无定论”。
- 模型选择对角色适配比预期更重要，且随模型迭代持续变化，意味着 harness 组件需要持续调整。
- 作者划定的适用范围：三个维度的 scaling 解决的是偏头部需求；若 AI 使软件本身更简单、更一次性，或交付物变成 Generative Kernel，harness engineering 的重要性会下降。
- 作者认为的补充盲区：三家讨论都未解决 context 认知密度问题，质量上限还取决于 context infrastructure。
