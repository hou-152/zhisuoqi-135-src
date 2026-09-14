# 构建 Claude Code 的经验教训：如何让 Agent「看见」世界

- 标题：构建 Claude Code 的经验教训：如何让 Agent「看见」世界
- 来源：anthropic.com
- 原文：https://www.anthropic.com/news/skills
- 作者：Anthropic
- 类型：主题特刊
- 摘要：Anthropic 工程师分享打造 Claude Code 的核心洞察：agent 需要像人一样感知代码环境，而非仅执行命令。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：6396
- 策展人按：结构说得差不多了，缺的是感官。agent 怎么「看见」一个代码库，这篇是造 Claude Code 的人自己写的。

---

- 原文标题：Lessons from Building Claude Code: Seeing like an Agent
- 作者：Anthropic
- 内参日期：2026-03-23
- 来源类型：twitter
- 原文：https://x.com/trq212/status/2027463795355095314
- 标签：claude cowork, agentic engineering

Anthropic 工程师分享打造 Claude Code 的核心洞察：agent 需要像人一样感知代码环境，而非仅执行命令。

## 导读

Claude Code 系列文章，了解 agent 工程实践。

## 核心论点

构建 agent 最难的部分是设计它的 **action space**（行动空间）。好的工具设计不是给模型越多选择越好，而是要「shaped to its own abilities」——匹配模型自身的能力。要做到这一点，你必须学会 **see like an agent**：仔细观察模型的输出，不断实验，理解它「看到」的世界。

## 工具设计的核心框架：像 agent 一样思考

- Claude 通过 Tool Calling 行动，可用的原语包括 bash、skills、code execution 等
- 设计工具时的思维实验：想象自己面对一道难题，你想要什么工具？
- 纸笔 → 最基本，但受限于手动计算
- 计算器 → 更好，但你得会操作高级功能
- 电脑 → 最强大，但你得会写代码
- **关键原则**：工具要匹配模型的能力边界。你需要通过观察、阅读输出、反复实验来了解这些能力

## 案例 1：AskUserQuestion 工具的三次迭代

- **目标**：提升 Claude 的 elicitation（提问）能力，降低用户回答问题的摩擦，提高人机通信带宽
- **Attempt #1 — 在 ExitPlanTool 中加参数**
- 方案：在计划工具中附带一组问题
- 问题：让 Claude 同时生成计划和问题，导致困惑——用户的回答可能与计划冲突，Claude 是否需要调用两次？
- **Attempt #2 — 修改输出格式**
- 方案：让 Claude 用特定 markdown 格式输出问题（带括号的选项列表），然后解析为 UI
- 问题：最通用，但不可靠——Claude 会额外加句子、遗漏选项、换格式
- **Attempt #3 — 独立的 AskUserQuestion Tool** ✅
- Claude 可在任意时刻调用，触发时弹出 modal 阻塞 agent 循环，等用户回答
- 好处：结构化输出、强制提供多选项、可组合（Agent SDK / skills 中引用）
- **最重要的发现**：Claude 似乎「喜欢」调用这个工具，输出效果好。即使设计再好的工具，如果模型不理解怎么调用，也没用
- **启示**：什么对一个模型有效，对另一个模型未必有效

## 案例 2：从 Todo 到 Task 的演进

- **早期**：Claude Code 需要 Todo List 来保持任务追踪
- 提供 TodoWrite 工具，在开始时写 todo、完成时打勾
- 即便如此，Claude 仍会忘记待办，于是每 5 轮插入系统提醒
- **模型变强后的问题**：
- 不再需要被提醒，但提醒反而让 Claude 觉得必须死板遵循列表而不去修改它
- Opus 4.5 擅长使用 subagent，但多个 subagent 如何共享 Todo List？
- **解决方案**：用 Task Tool 替代 TodoWrite
- Todo 的目标是 keeping the model on track（让模型不偏航）
- Task 的目标是 helping agents communicate with each other（帮助 agent 间通信）
- Task 支持依赖关系、跨 subagent 共享更新、可修改和删除
- **关键教训**：随着模型能力提升，曾经需要的工具可能变成约束。要不断重新审视之前的假设，持续迭代工具集

## 案例 3：搜索界面的设计——从 RAG 到 Grep

- **早期**：用 RAG 向量数据库为 Claude 提供上下文
- 问题：需要索引和配置，在不同环境中脆弱，且上下文是 **被给予的** 而非模型自己找到的
- **转变**：给 Claude 一个 Grep 工具，让它自己搜索代码库、自己构建上下文
- **核心模式**：Claude 越聪明，越擅长在给定正确工具后自己构建上下文
- 引入 **Agent Skills** 后，正式提出 **Progressive Disclosure**（渐进式披露）：
- agent 通过探索逐步发现相关上下文
- 技能文件可以引用其他文件，模型可以递归读取
- 常见用法：在 skill 中添加搜索能力（如 API 使用说明、数据库查询方法）
- 一年之内，Claude 从「不太会自己构建上下文」进化到「能跨多层文件嵌套搜索，精确定位所需上下文」

## 案例 4：Claude Code Guide Agent —— 不加工具也能扩展能力

- **问题**：Claude 不了解自己（Claude Code 的功能），问它如何加 MCP 或 slash command 会答不上来
- **排除方案**：
- 放进 system prompt → 造成 context rot（上下文腐烂），干扰主任务（写代码）
- 给文档链接让 Claude 自行加载 → 它会加载过多结果到上下文
- **最终方案**：构建 Claude Code Guide subagent
- Claude 被 prompted 在用户问关于自身的问题时调用这个 subagent
- subagent 有专门的搜索文档指令和返回格式
- **核心启示**：通过 progressive disclosure，无需添加新工具就能扩展 agent 的行动空间

## 总结：Art, not Science

- 设计 agent 工具没有一套固定规则
- 取决于三要素：**模型本身**、**agent 的目标**、**运行环境**
- 方法论：频繁实验，阅读输出，尝试新东西。**See like an agent.**

## 概念网络

### 核心概念解析 (Core Concepts)

- **【Action Space】（行动空间）**
- **context**：

One of the hardest parts of building an agent harness is constructing its action space.

- **费曼一下**：Agent 能做什么，取决于你给它的工具集合。Action space 就是 agent 的「手牌」——工具太少无法完成任务，太多则让模型困惑。关键是设计「刚好匹配模型能力」的工具集。
- **【See Like an Agent】（像 Agent 一样看世界）**
- **context**：

You want to give it tools that are shaped to its own abilities. But how do you know what those abilities are? You pay attention, read its outputs, experiment. You learn to see like an agent.

- **费曼一下**：设计 agent 工具的核心方法论。不是想当然地给工具，而是把自己放到模型的位置上，观察它的输出、理解它的困惑、感受它的能力边界。这是一种“设身处地”的工程实践。
- **【Elicitation】（信息引出 / 提问能力）**
- **context**：

When building the AskUserQuestion tool, our goal was to improve Claude's ability to ask questions (often called elicitation).

- **费曼一下**：Agent 主动向用户提问以获取关键信息的能力。好的 elicitation 能降低用户回答的摩擦，提高人机通信带宽——一问一答就能快速对齐，而不是往复拉扯。
- **【Tool Calling】（工具调用）**
- **context**：

Claude acts through Tool Calling, but there are a number of ways tools can be constructed in the Claude API with primitives like bash, skills and recently code execution.

- **费曼一下**：Claude 与外部世界交互的唯一方式。模型不能直接操作环境，而是通过“调用工具”这个标准接口来行动。bash、code execution、skills 都是不同类型的工具原语。
- **【Progressive Disclosure】（渐进式披露）**
- **context**：

When we introduced Agent Skills we formalized the idea of progressive disclosure, which allows agents to incrementally discover relevant context through exploration.

- **费曼一下**：不是一次性把所有信息塞给模型，而是让模型通过探索逐步发现所需上下文。就像翻读一本书——先看目录，再翻到相关章节，而不是把整本书背下来。这个模式让 Claude 从「被喊信息」变成「自己找信息」。
- **【Context Rot】（上下文腐烂）**
- **context**：

We could have put all of this information in the system prompt, but given that users rarely asked about this, it would have added context rot and interfered with Claude Code's main job: writing code.

- **费曼一下**：当你往 system prompt 里塞太多不常用的信息时，这些“废话”会稀释模型对核心任务的注意力，让整体表现下降。就像工作台上堆满杂物，找工具反而更慢。
- **【Subagent】（子代理）**
- **context**：

We also saw Opus 4.5 also get much better at using subagents, but how could subagents coordinate on a shared Todo List?

- **费曼一下**：主 agent 生成的子任务执行者。就像一个项目经理把工作分派给团队成员——每个 subagent 独立工作，但需要共享状态和协调进度。Task Tool 就是为解决 subagent 间协作而设计的。
- **【Agent Skills】（代理技能）**
- **context**：

Claude could read skill files and those files could then reference other files that the model could read recursively. In fact, a common use of skills is to add more search capabilities to Claude like giving it instructions on how to use an API or query a database.

- **费曼一下**：写在文件中的“技能说明书”，告诉 Claude 在特定场景下怎么做。Skills 是 progressive disclosure 的具体载体——模型读取技能文件后，还能顺着引用链找到更多相关信息，实现逍归式的上下文构建。

### 概念网络 (Concept Network)

![这张图是概念网络图，是Codex根据原文概念网络文字整理而成，用于呈现Claude Code相关核心概念的关联关系。图中的核心为Action Space，它直接关联“Agent看见并作用于世界”的结果，同时是全文围绕的核心问题。See Like an Agent是设计Action Space的方法论，Tool Calling是Action Space的实现机制。Progressive Disclosure作为Action Space的扩展策略，其落地依赖Skills、组织依托Subagent、相关反面教训为Context Rot。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTcwMDk0MDU1MTMxZGFmMjNiZDQ5NTI5NjdhNzBkYThfMTU4OTE4Y2Q2Zjg3NGE1N2Q1MmQzMWYzYWE1YjZiZWNfSUQ6NzY2OTUxNjYxMTkzMzQ1NzM3Nl8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **Action Space** 是全文的核心问题，所有案例都围绕「如何设计更好的 action space」展开
- **See Like an Agent** 是设计 action space 的方法论，贯穿全文
- **Tool Calling** 是 action space 的实现机制，Elicitation、Task Tool、Grep 都是具体的 tool 实例
- **Elicitation** 是一种特定类型的工具能力，解决「人机通信」问题，与 action space 的交互维度相关
- **Progressive Disclosure** 是 action space 的扩展策略——不加新工具，而是让现有工具能「解锁」更多能力
- **Agent Skills** 是 progressive disclosure 的具体实现方式
- **Subagent** 是 action space 的组织模式，通过任务分解实现复杂能力
- **Context Rot** 是设计 action space 时的反面教训——解释了为什么不能简单地往 prompt 里塞东西，而需要 progressive disclosure

---
