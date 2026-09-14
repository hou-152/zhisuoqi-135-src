# 上下文工程：AI 时代的核心能力

- 标题：上下文工程：AI 时代的核心能力
- 来源：x.com
- 原文：https://x.com/nyk_builderz/status/2031581912071127158/?s=12&rw_tt_thread=True
- 作者：Nyk 🌱
- 类型：主题特刊
- 摘要：管理与优化上下文已成为 AI 驱动开发中最关键的工程环节，直接决定模型输出质量。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：10185
- 策展人按：和上一篇一个功能，更短更早。三月写的，现在回头看像一份还没被验证的预言。

---

- 原文标题：Context Engineering Is The Only Engineering That Matters Now
- 作者：Nyk 🌱
- 内参日期：2026-03-12
- 来源类型：twitter
- 原文：https://x.com/nyk_builderz/status/2031581912071127158/?s=12&rw_tt_thread=True
- 标签：agents, agentic workflow, ai 时代

管理与优化上下文已成为 AI 驱动开发中最关键的工程环节，直接决定模型输出质量。

## 导读

上下文工程是 AI 时代的核心能力。

**作者**: Nyk | **来源**: X (Twitter) 长推文 | **日期**: 2026年3月11日

## 核心观点

AI 工程的瓶颈从来不是模型的智能，而是没有人认真工程化"模型开始工作时看到什么"。Prompt engineering 只是热身——真正的学科叫 **context engineering**：设计什么信息到达模型、以什么结构、在什么时候。2025 是模型之年，2026 是 context 之年。



## 从 Prompt Engineering 到 Context Engineering

### Prompt Engineering 的陷阱

- Prompt engineering 教你 **ask better questions**；Context engineering 教你 **build better environments**
- 一个完美的 prompt 在破碎的 context 里依然输出垃圾；一个平庸的 prompt 在结构丰富的 context 里每次都能输出有用的东西
- Anthropic 内部研究发现：agent drift（AI 在长任务中逐渐失去连贯性）几乎完全是 **context management 问题**，而非 reasoning 问题

### 数据印证：vibe coding 危机

- GitClear 分析 2.11 亿行代码：AI 工具使代码产出增加 10%，但质量指标全面崩溃——重构下降 60%，复制粘贴代码上升 48%，代码流失率跳涨 44%
- 模型写了更多代码，但对已有代码的理解更少——这是一个 context problem
- Forrester 预测：75% 的技术领导者在 2026 年底前将面临严重的 AI 生成技术债务
- 8000 个 vibe-coded 创业项目现在每个需要 5 万到 50 万美元的 rescue rebuild

### Context Engineering 的定义

- **设计什么信息到达模型、什么时候、以什么结构的学科**
- 不是 prompt engineering（怎么问），不是 fine-tuning（改模型），而是**你的知识与模型注意力之间的架构**
- 三个层次：
- **Layer 1: Selection** — 什么进入窗口
- **Layer 2: Architecture** — 如何结构化
- **Layer 3: Lifecycle** — 什么时候刷新
- 大多数人只想到 Layer 1，把所有东西塞进 prompt，然后困惑模型为什么幻觉——context pollution 会复合累积

### Manus 的核心洞察

- 当任务 context 增长时，context management 本身就变成了整个问题
- 其他一切能力在 context 退化时都跟着退化



## 四种 Context 失败模式

每一个 AI 失败都可以映射到以下四种 context 失败之一：

### Context Pollution（上下文污染）

- 幻觉或过时的信息进入窗口并复合放大
- 模型信任窗口里的一切——一个坏数据，下游全部继承错误

### Context Distraction（上下文干扰）

- 太多无关信息淹没相关信号
- 200K 的窗口，如果 180K 是噪音，没有任何帮助
- 模型对窗口中的一切 roughly equal weight 对待，无法区分重要和偶然

### Context Confusion（上下文混乱）

- 太多工具、太多冲突指令
- MCP 在变好之前先让这个问题更严重了——50 个 tool definitions 在 system prompt 里意味着模型把注意力花在不需要的工具上

### Context Clash（上下文冲突）

- 同一窗口里的矛盾信息
- [CLAUDE.md](http://claude.md/) 说 "use pnpm"，但项目 README 说 "use npm"——模型随机选一个，或更糟，在两者之间交替
- 这就是为什么团队在不同 session 中看到不一致的 agent 行为

**统一解法**: Don't dump, curate.（不要倾倒，要策展。）



## Codified Context 革命——把 Context 当基础设施

### 26,000 行 context 架构的案例

- 一篇 2026 年 2 月的 arXiv 论文跟踪了专业团队如何管理 context
- 一个 Claude Code 项目演化出 26,000 行 codified context——比某些模块的实际代码还多
- 结果：agent 停止了幻觉

### 正确的做法

- [\*\*CLAUDE.md\*\*](http://claude.md/) **不是配置文件，是教学文档**——最好的写法读起来像给一个已经会写代码但不了解你代码库的高级工程师的 onboarding docs
- **Memory 层级与渐进式披露**（progressive disclosure）——不是所有东西都需要同时在窗口里，引导模型去找它需要的东西
- **关注点分离**——架构 context 一个文件，编码规范另一个，领域知识第三个，模型按任务需要加载

### 推荐的目录结构

**代码块：plain text**

project/

├── CLAUDE.md            # architecture + boundaries

├── .claude/memory/

│   ├── MEMORY.md        # routing document (< 200 lines)

│   ├── patterns.md      # confirmed conventions

│   ├── decisions.md     # architectural choices with reasoning

│   └── debugging.md     # solutions to recurring problems

├── docs/

│   ├── architecture.md  # system design (the model's map)

│   └── domain/          # business logic the model needs

└── src/                 # the actual code



### 关键研究发现

- 专门化的 agent + 预加载的领域 context，比通用 agent 做同样任务产生显著更少的错误
- 有效的 agent 规格中，超过一半是 context，不是 instructions
- **More context architecture, fewer instructions. That's the pattern.**



## Knowledge Graph 优于 Flat Files

### 线性 vs 组合式扩展

- Flat context（一个巨大的 [CLAUDE.md](http://claude.md/)、一个长 system prompt）线性扩展——每个新事实增加一个单位的价值
- Knowledge graph 组合式扩展——每个新节点连接已有节点，关系涌现，整体大于部分之和

### Tools for Thought 社区意外建好了 LLM 的完美架构

- 他们多年来打磨的方法论恰好是 agent 高效遍历知识库所需要的：
- **Atomic notes**：一个概念一个文件，可组合
- **Wikilinks 作为语义连接**：关系本身就是链接文本
- **Maps of Content**：路由文档，告诉 agent 去哪里找
- **Metadata 用于过滤**：frontmatter 实现渐进式披露
- **Prose-as-title**：笔记名称是 claim，不是 category
- 不是 architecture-decisions.md，而是 we chose PostgreSQL because our query patterns are relational.md
- agent 搜索时，光看标题就知道要不要打开——这是**文件命名层面的 context engineering**



## 企业级 Context Engineering

### 问题：每个公司已经是一个 graph，问题是它是否 traversable

- 8 个月前的 Slack threads 没人找得到
- 12 个版本的 Google Docs
- 更新过一次就被遗弃的 Notion 页面
- 大部分组织知识活在人的脑袋里，人离开知识就消失了

### Balaji Srinivasan 的观察

- "现在大部分数字工作都是在为 AI 模型准备 context——组织文件到文件夹、正确命名一切、以正确的顺序介绍事物"
- 这描述了痛苦，但也描述了机会

### 企业知识图谱结构

- 一个领域 = 一个可组合的 markdown 文件网络
- Agent 遍历的是 graph，不是 document

### 隐性知识（Tacit Knowledge）问题

- 这是最难的部分：CTO 选 PostgreSQL 而非 MongoDB，决策也许被记录了，但推理过程、她考虑的 tradeoffs、让她觉得显而易见但对别人不可见的 context——通常都丢失了
- **解法**：录制会议，agent 从中挖掘 claims、decisions、action items、strategic shifts
- 这不是"没人读的会议纪要"，而是**人类思维与 agent 外化表征之间的主动同步**



## Self-Improving Context System——自我改进的 Context 系统

### 为什么以前的知识管理系统都死了

- 杀死每一个 wiki、知识库、"single source of truth" 的，是维护
- 有人必须持续更新它们。他们从来没做到过

### Agent 天生擅长维护

- Agent 不会对维护感到无聊，不会因为赶着开会而跳过更新
- **杀死每一个知识管理系统的恰恰是 agent 天生就能做的事**

### 一个有 agent operator 的结构化 context graph 根本不同于 wiki

- Agent 注意到两条笔记互相矛盾，标记张力
- 注意到 spec 与代码库不同步
- 摩擦信号在日常工作中自动积累
- 当足够多的观察堆积，agent 提议对系统本身的结构性变更
- **它重构自己的指令。它演化自己的架构——当当前架构产生太多阻力时**

### 核心洞察

- Context engineering 不是一次性设置，而是一个**每次 agent 工作都在改进的活系统**



## 实操 Checklist

1. **审计你的** [\*\*CLAUDE.md\*\*](http://claude.md/)——它是配置文件还是教学文档？把它改写成给一个不了解你项目的高级工程师的 onboarding
2. **关注点分离**——架构 context、编码规范、领域知识放不同文件，按任务需要加载
3. **添加渐进式披露**——[MEMORY.md](http://memory.md/) 作为路由文档控制在 200 行以内，详细主题文件从中链接
4. **用 claim 来命名**——文件名要能回答"这跟我相关吗？"而不需要打开。we chose X because Y.md，不是 decisions.md
5. **挖掘你的会议**——录制、提取 claims 和 decisions、加入 graph。会议中锁住的隐性知识是最大的 context leak
6. **让 agent 来维护**——设置 hooks 来标记矛盾、过时 context 和结构性漂移。agent 应该在正常工作中作为副产品改进 context 系统
7. **衡量 context 健康**——追踪 session re-explanation time、agent drift rate、decision consistency across sessions。如果你的 agent 问了同一个问题两次，你的 context 架构就有一个洞



## 关键概念

- **Context Engineering**：设计什么信息到达模型、什么时候、以什么结构的学科——模型能力与实际产出之间的架构层
- **Agent Drift**：AI 在长任务中逐渐失去连贯性，本质上是 context management 问题而非 reasoning 问题
- **Context Pollution / Distraction / Confusion / Clash**：四种 context 失败模式，覆盖了所有 AI 灾难的根因
- **Codified Context**：将 context 当作基础设施来工程化，用结构化文件（而非一个大 prompt）来组织模型需要知道的一切
- **Progressive Disclosure**：渐进式披露，不把所有东西同时塞进窗口，而是引导模型按需查找
- **Knowledge Graph vs Flat Files**：平面 context 线性扩展，知识图谱组合式扩展——Tools for Thought 社区的方法论恰好是 LLM agent 的完美架构
- **Tacit Knowledge**：隐性知识，锁在人脑袋里的决策推理和 tradeoffs，是企业最大的 context leak
- **Self-Improving Context System**：agent 在日常工作中自动维护和演化 context 架构的活系统，解决了传统知识管理"没人维护"的致命问题

## 概念网络

### 核心概念解析 (Core Concepts)

- **【Context Engineering】**
- **context**：

Prompt engineering 教你 ask better questions；Context engineering 教你 build better environments。不是 prompt engineering（怎么问），不是 fine-tuning（改模型），而是**你的知识与模型注意力之间的架构**——设计什么信息到达模型、什么时候、以什么结构的学科。

- **费曼一下**：模型够不够聪明不是问题，它"看到什么"才是问题。Context engineering 就是设计模型的「信息环境」——决定哪些知识进入窗口、以什么结构呈现、在什么时机刷新。Prompt 只是一次性的提问，context 是持续运作的架构。
- **【Agent Drift】**
- **context**：

Anthropic 内部研究发现：agent drift（AI 在长任务中逐渐失去连贯性）几乎完全是 **context management 问题**，而非 reasoning 问题。

- **费曼一下**：Agent 做着做着"跑偏了"——忘记初始目标、风格前后不一、重复犯同类错误。大多数人以为是模型推理能力不足，但 Anthropic 的研究指出根因是 context 管理失败：随着任务推进，相关信息被稀释、关键指令被遗忘、噪音累积。
- **【Context 四种失败模式】(Context Pollution / Distraction / Confusion / Clash)**
- **context**：

每一个 AI 失败都可以映射到四种 context 失败之一。**统一解法**: Don't dump, curate.（不要倾倒，要策展。）

- **费曼一下**：
- **Pollution**：坏信息进窗口，下游全部继承错误，雪球越滚越大
- **Distraction**：200K 窗口塞了 180K 噪音，模型对一切 roughly equal weight，相关信号被淹没
- **Confusion**：50 个 tool definitions 堆在 system prompt，模型不知道用哪个
- **Clash**：[CLAUDE.md](http://claude.md/) 说 pnpm，README 说 npm——模型随机选一个，行为不可预测
- **【Codified Context】**
- **context**：

一个 Claude Code 项目演化出 26,000 行 codified context——比某些模块的实际代码还多。结果：agent 停止了幻觉。[\*\*CLAUDE.md\*\*](http://claude.md/) **不是配置文件，是教学文档**——最好的写法读起来像给一个已经会写代码但不了解你代码库的高级工程师的 onboarding docs。有效的 agent 规格中，超过一半是 context，不是 instructions。More context architecture, fewer instructions.

- **费曼一下**：把 context 当基础设施来工程化——不是一个大 prompt，而是一套结构化文件网络（架构说明、编码规范、领域知识、决策记录……）。
- **【Progressive Disclosure】(渐进式披露)**
- **context**：

Memory 层级与渐进式披露（progressive disclosure）——不是所有东西都需要同时在窗口里，引导模型去找它需要的东西。[MEMORY.md](http://memory.md/) 作为路由文档控制在 200 行以内，详细主题文件从中链接。

- **费曼一下**：别把所有知识一次性塞给模型。用一个简短的「路由文档」告诉 agent 去哪里找什么，让它按需加载详细内容。就像好的 API 文档——首页简洁，细节按需展开。
- **【Knowledge Graph vs Flat Files】**
- **context**：

Flat context 线性扩展——每个新事实增加一个单位的价值。Knowledge graph 组合式扩展——每个新节点连接已有节点，关系涌现，整体大于部分之和。Tools for Thought 社区意外建好了 LLM 的完美架构。

- **费曼一下**：一个大文件 vs 一张互联的笔记网络。前者加一条信息只多一条信息；后者加一条信息，它和所有相关节点形成新连接，价值指数级涌现。Obsidian/Roam 那套 atomic notes + wikilinks 的方法论，恰好就是 agent 高效遍历知识库所需的架构。
- **【Tacit Knowledge】(隐性知识)**
- **context**：

CTO 选 PostgreSQL 而非 MongoDB，决策也许被记录了，但推理过程、她考虑的 tradeoffs、让她觉得显而易见但对别人不可见的 context——通常都丢失了。这是企业最大的 context leak。

- **费曼一下**：锁在人脑袋里、写不进文档的那部分知识——为什么这么选、当时考虑了哪些权衡、什么事情「不言而喻」却从未明说。人一离开，知识就消失。解法：录制会议，让 agent 从中主动挖掘 claims、decisions、strategic shifts。
- **【Self-Improving Context System】**
- **context**：

杀死每一个 wiki、知识库的，是维护——有人必须持续更新它们，他们从来没做到过。而杀死每一个知识管理系统的恰恰是 agent 天生就能做的事。Context engineering 不是一次性设置，而是一个**每次 agent 工作都在改进的活系统**。

- **费曼一下**：传统知识库死于「没人愿意维护」。但 agent 不会对维护感到无聊。当 context graph 里有矛盾、spec 与代码不同步时，agent 自动标记、自动提议结构性修改、甚至重构自己的指令。知识库从一次性建设变成随每次工作自动演化的活体系统。



### 概念网络 (Concept Network)

![图片为Context Engineering概念网络图，展示了Context Engineering解决Agent Drift等四类失败模式，通过Codified Context、Progressive Disclosure、Knowledge Graph等实践，最终形成Self-improving System。Codified Context是核心实践方法，持续挑战是Tacit Knowledge带来的问题。该图与上下文紧密相关，直观呈现了Context Engineering的实践逻辑和目标，是对上下文概念网络文字内容的可视化总结。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGY5YzRlNjMzNTMyYWU4MmU4NGVkZTM0ODEzOGFlNDlfM2NmOWZiYWEwMDcyNWY0YzNkMjJmYjhhMGFkNGQ3YWFfSUQ6NzY2OTUxNjU4ODMxMTE4NjM2Ml8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **Context Engineering** 是本文的中心概念，其他所有概念都是它的展开和支撑
- **Agent Drift** 和 **Context 四种失败模式** 是 context engineering 要解决的问题——描述了「不做 context engineering 会发生什么」
- **Codified Context** 是 context engineering 的核心实践方法——把 context 当基础设施来工程化
- **Progressive Disclosure** 是 Codified Context 的具体架构策略——解决「信息太多怎么管理」的问题
- **Knowledge Graph vs Flat Files** 是 context 架构的底层选择——支撑了为什么要用结构化文件网络而非一个大 prompt
- **Tacit Knowledge** 是企业级 context engineering 的核心挑战——隐性知识是最难被 codified 的部分，也是最大的 context leak
- **Self-Improving Context System** 是整个体系的终极形态——将以上所有实践整合成一个能自我维护、自我演化的活系统，从根本上解决了传统知识管理「没人维护」的死亡螺旋

---
