# 上下文工程：AI 时代的核心能力

## 一句话主旨
AI 工程瓶颈不在模型智能，而在上下文工程化。

## 作者试图回答的问题
- 为什么 AI 输出/agent 失败的根因不是模型智能或 reasoning，而是没有人认真工程化“模型开始工作时看到什么”？
- 如何从 prompt engineering 转向 context engineering：设计什么信息到达模型、以什么结构、在什么时候，并把它变成可维护、可自我改进的系统？
- 关联子问题：四种 context 失败模式如何覆盖 AI 失败？企业隐性知识如何进入 agent 可遍历的 graph？

## 三级论证骨架

### 一、判断：瓶颈不是模型智能，而是 context
#### 1.1 Prompt engineering 只是热身，context engineering 才是学科
- Prompt engineering 教 “ask better questions”；context engineering 教 “build better environments”。
  - “一个完美的 prompt 在破碎的 context 里依然输出垃圾；一个平庸的 prompt 在结构丰富的 context 里每次都能输出有用的东西。”
  - 作者判断：“2025 是模型之年，2026 是 context 之年。”
- Context engineering 的定义：设计什么信息到达模型、什么时候、以什么结构的学科。
  - “不是 prompt engineering（怎么问），不是 fine-tuning（改模型）”，而是“你的知识与模型注意力之间的架构”。

#### 1.2 证据：agent drift 与 vibe coding 危机
- Anthropic 内部研究发现：agent drift“几乎完全是 context management 问题，而非 reasoning 问题”。
- GitClear 分析 2.11 亿行代码：AI 工具使代码产出增加 10%，但重构下降 60%，复制粘贴代码上升 48%，代码流失率跳涨 44%。
  - 作者解释：模型写了更多代码，但对已有代码的理解更少——这是一个 context problem。
- Forrester 预测：75% 的技术领导者在 2026 年底前将面临严重的 AI 生成技术债务。
- 8000 个 vibe-coded 创业项目，现在每个需要 5 万到 50 万美元的 rescue rebuild。
- Manus 的核心洞察：当任务 context 增长时，context management 本身就变成了整个问题；其他一切能力在 context 退化时都跟着退化。

#### 1.3 Context engineering 的三个层次
- Layer 1: Selection——什么进入窗口。
- Layer 2: Architecture——如何结构化。
- Layer 3: Lifecycle——什么时候刷新。
  - 大多数人只想到 Layer 1，把所有东西塞进 prompt，然后困惑模型为什么幻觉；context pollution 会复合累积。

### 二、诊断：四种 context 失败模式与统一解法
#### 2.1 每一个 AI 失败都可映射到四类 context 失败之一
- Context Pollution（上下文污染）：幻觉或过时信息进入窗口并复合放大。
  - 模型信任窗口里的一切——一个坏数据，下游全部继承错误。
- Context Distraction（上下文干扰）：太多无关信息淹没相关信号。
  - 200K 的窗口，如果 180K 是噪音，没有任何帮助；模型对窗口中的一切 “roughly equal weight” 对待，无法区分重要和偶然。
- Context Confusion（上下文混乱）：太多工具、太多冲突指令。
  - “MCP 在变好之前先让这个问题更严重了——50 个 tool definitions 在 system prompt 里意味着模型把注意力花在不需要的工具上。”
- Context Clash（上下文冲突）：同一窗口里的矛盾信息。
  - CLAUDE.md 说 “use pnpm”，但项目 README 说 “use npm”——模型随机选一个，或更糟，在两者之间交替；这就是团队在不同 session 中看到不一致 agent 行为的原因。

#### 2.2 统一解法
- “Don't dump, curate.”（不要倾倒，要策展。）

### 三、核心实践：把 context 工程化成基础设施（Codified Context）
#### 3.1 案例与原则
- 一篇 2026 年 2 月的 arXiv 论文跟踪专业团队如何管理 context。
  - 一个 Claude Code 项目演化出 26,000 行 codified context，比某些模块的实际代码还多。
  - 结果：agent 停止了幻觉。
- CLAUDE.md“不是配置文件，是教学文档”。
  - 最好的写法读起来像给一个已经会写代码但不了解你代码库的高级工程师的 “onboarding docs”。
- Memory 层级与渐进式披露（progressive disclosure）：不是所有东西都需要同时在窗口里，引导模型去找它需要的东西。
- 关注点分离：架构 context 一个文件，编码规范另一个，领域知识第三个，模型按任务需要加载。
- 专门化的 agent + 预加载的领域 context，比通用 agent 做同样任务产生显著更少的错误。
  - 有效的 agent 规格中，超过一半是 context，不是 instructions。
  - “More context architecture, fewer instructions. That's the pattern.”

#### 3.2 推荐的目录结构
- project/CLAUDE.md——architecture + boundaries。
- .claude/memory/MEMORY.md——routing document（< 200 lines）。
- .claude/memory/patterns.md——confirmed conventions。
- .claude/memory/decisions.md——architectural choices with reasoning。
- .claude/memory/debugging.md——solutions to recurring problems。
- docs/architecture.md——system design（the model's map）。
- docs/domain/——business logic the model needs。
- src/——the actual code。

### 四、知识组织：Knowledge Graph 优于 Flat Files
#### 4.1 线性扩展 vs 组合式扩展
- Flat context（一个巨大的 CLAUDE.md、一个长 system prompt）线性扩展：每个新事实增加一个单位的价值。
- Knowledge graph 组合式扩展：每个新节点连接已有节点，关系涌现，整体大于部分之和。

#### 4.2 Tools for Thought 社区的方法论恰好是 LLM 的完美架构
- Atomic notes：一个概念一个文件，可组合。
- Wikilinks 作为语义连接：关系本身就是链接文本。
- Maps of Content：路由文档，告诉 agent 去哪里找。
- Metadata 用于过滤：frontmatter 实现渐进式披露。
- Prose-as-title：笔记名称是 claim，不是 category。
  - 不是 architecture-decisions.md，而是 “we chose PostgreSQL because our query patterns are relational.md”。
  - agent 搜索时，光看标题就知道要不要打开——这是文件命名层面的 context engineering。

### 五、企业级：把组织知识变成可遍历 graph，并捕获隐性知识
#### 5.1 每个公司已经是一个 graph，问题是它是否 traversable
- 8 个月前的 Slack threads 没人找得到。
- 12 个版本的 Google Docs。
- 更新过一次就被遗弃的 Notion 页面。
- 大部分组织知识活在人的脑袋里，人离开知识就消失了。

#### 5.2 Balaji Srinivasan 的观察
- “现在大部分数字工作都是在为 AI 模型准备 context——组织文件到文件夹、正确命名一切、以正确的顺序介绍事物。”
  - 作者说：这描述了痛苦，但也描述了机会。

#### 5.3 企业知识图谱与隐性知识问题
- 企业知识图谱结构：一个领域 = 一个可组合的 markdown 文件网络；agent 遍历的是 graph，不是 document。
- Tacit knowledge 是最难的部分：CTO 选 PostgreSQL 而非 MongoDB，决策也许被记录了，但推理过程、她考虑的 tradeoffs、让她觉得显而易见但对别人不可见的 context，通常都丢失了。
- 解法：录制会议，agent 从中挖掘 claims、decisions、action items、strategic shifts。
  - 这不是“没人读的会议纪要”，而是“人类思维与 agent 外化表征之间的主动同步”。

### 六、终极形态：Self-Improving Context System
#### 6.1 传统知识管理死于维护，agent 天生擅长维护
- 杀死每一个 wiki、知识库、“single source of truth”的，是维护：有人必须持续更新它们，他们从来没做到过。
- Agent 不会对维护感到无聊，不会因为赶着开会而跳过更新。
  - “杀死每一个知识管理系统的恰恰是 agent 天生就能做的事。”

#### 6.2 agent operator 的结构化 context graph 不同于 wiki
- Agent 注意到两条笔记互相矛盾，标记张力。
- Agent 注意到 spec 与代码库不同步。
- 摩擦信号在日常工作中自动积累。
- 当足够多的观察堆积，agent 提议对系统本身的结构性变更。
  - “它重构自己的指令。它演化自己的架构——当当前架构产生太多阻力时。”
- 核心洞察：context engineering 不是一次性设置，而是一个每次 agent 工作都在改进的活系统。

### 七、作者给出的落地检查
- 审计你的 CLAUDE.md：它是配置文件还是教学文档？把它改写成给一个不了解你项目的高级工程师的 onboarding。
- 关注点分离：架构 context、编码规范、领域知识放不同文件，按任务需要加载。
- 添加渐进式披露：MEMORY.md 作为路由文档控制在 200 行以内，详细主题文件从中链接。
- 用 claim 来命名：文件名要能回答“这跟我相关吗？”而不需要打开。
- 挖掘你的会议：录制、提取 claims 和 decisions、加入 graph；会议中锁住的隐性知识是最大的 context leak。
- 让 agent 来维护：设置 hooks 标记矛盾、过时 context 和结构性漂移。
- 衡量 context 健康：追踪 session re-explanation time、agent drift rate、decision consistency across sessions；“如果你的 agent 问了同一个问题两次，你的 context 架构就有一个洞”。

## 作者边界、反例与不确定性
- 原文没有明确给出适用边界或反例；作者反而用全称判断提高结论强度，例如“每一个 AI 失败都可以映射到四种 context 失败之一”。
- 若干关键证据只以二手或未具名形式出现：Anthropic 内部研究、2026 年 2 月 arXiv 论文、Forrester 预测、8000 个 vibe-coded 项目、GitClear 分析，材料未给可核验链接或方法细节。
- “MCP 在变好之前先让这个问题更严重了”是带时间性的判断，并非定论。
- 概念网络图注明“Codex 据原文概念网络文字整理（非原文配图）”；“费曼一下”是材料中的解释层，不等同原文原话。
