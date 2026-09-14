# Claude Code 的 1M Context 让会话管理变成核心技能

- 标题：Claude Code 的 1M Context 让会话管理变成核心技能
- 来源：x.com
- 原文：https://x.com/trq212/status/2044548257058328723
- 作者：Thariq Shihipar
- 类型：主题特刊
- 摘要：1M context 不等于自动理解，真正稀缺的是 session management：分段、命名、交接与复用上下文。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：5291
- 策展人按：它被放进成本组而不是新世代组，是因为讲的其实也是一笔账，只是单位不是钱是精力。会话管理这事没人教，只能自己摸。

---

- 原文标题：Using Claude Code: Session Management & 1M Context
- 作者：Thariq
- 内参日期：2026-04-28
- 来源类型：twitter
- 原文：https://x.com/trq212/status/2044548257058328723/?rw_tt_thread=True
- 标签：agents, agentic workflow

1M context 不等于自动理解，真正稀缺的是 session management：分段、命名、交接与复用上下文。

## 导读

只为一个概念：session management

## 文章主旨

Claude Code 的 1M context 不是“可以无限续杯”的魔法。它真正放大的，是一个更基础的技能：**session management**。当每一轮对话结束，你都站在一个分叉点：继续、rewind、clear、compact，还是交给 subagent。高手和普通用户的差别，不在于谁更会写 prompt，而在于谁更会管理上下文。

## 为什么 1M context 反而让 session management 更重要

- Anthropic 更新 /usage 的背景，是他们在客户访谈中发现：不同用户管理 Claude Code session 的方式差异很大。
- 核心问题不是“窗口有多大”，而是：
- 你是一直开一个长 session，还是每个任务都新开？
- 什么时候应该继续？
- 什么时候应该 /rewind？
- 什么时候应该 /clear？
- 什么时候应该 /compact？
- 什么时候应该让 subagent 接手？
- 这些选择都会影响 Claude Code 的输出质量，因为它们本质上都在管理同一件事：**context window**。

## Context window 是模型一次能看到的全部世界

- context window 包含：
- system prompt
- 当前对话历史
- tool calls
- tool outputs
- 已读取的文件
- Claude Code 现在有 1M tokens 的 context window，但它仍然是一个窗口，不是长期记忆。
- 窗口越大，不代表模型越聪明；窗口越大，反而越需要整理。

## Context rot：上下文越长，模型越容易被噪音拖慢

- 文章把 context 使用的代价称为 **context rot**：
- context 变长后，模型注意力被分散；
- 旧的、不相关的信息开始干扰当前任务；
- 模型在长 session 后会更容易忘记真正重要的约束。
- 这解释了为什么“继续聊下去”并不总是最自然的正确选择。
- 1M context 只是让你更晚撞墙，但不会取消“上下文会腐化”这件事。

## 每一轮结束，都是一个 branching point

当 Claude 完成一个 turn 后，你并不是只有“继续输入下一句”这一种选择。你至少有五种路径：

- **Continue**：在同一个 session 里继续发消息。
- **/rewind**：跳回之前某条消息，从那里重新提示。
- **/clear**：开始一个新 session，带着自己提炼好的 brief 重新开始。
- **Compact**：让 Claude 把当前 session 压缩成摘要，再继续工作。
- **Subagents**：把某个子任务交给拥有干净上下文的新 agent，只把结论带回主 session。

这篇文章最好的地方，就是把“下一步发什么 prompt”改写成了“下一步怎么处理 context”。

## 新任务，通常应该新开 session

- 作者给出的经验法则：**when you start a new task, you should also start a new session**。
- 1M context 让更长任务变得更可靠，例如从零构建一个 full-stack app。
- 但如果任务已经切换，继续沿用旧 session 往往会带入不必要的噪音。
- 例外是：两个任务相关，而且前一个任务中的部分 context 仍然有价值。
- 例如刚实现一个 feature，接着写这个 feature 的文档。
- 如果直接开新 session，Claude 需要重新读取刚刚改过的文件，成本更高。

## Rewind 比“纠正”更干净

- 作者说：如果只能选一个代表好 context management 的习惯，那就是 **rewind**。
- 普通做法：
- Claude 读了 5 个文件，尝试方案 A，失败。
- 你输入：“that didn’t work, try X instead.”
- 问题是，失败尝试和无效中间产物也被留在 context 里。
- 更好的做法：
- rewind 到刚读完文件的位置；
- 用你刚学到的信息重新 prompt；
- 例如：“Don’t use approach A, the foo module doesn’t expose that — go straight to B.”
- Rewind 的价值是：保留有效发现，丢掉错误路径。

## Compact 和 clear 看起来相似，其实完全不同

- session 变长后，有两种减重方式：/compact 和 /clear。
- **Compact**：
- 让模型自己总结到目前为止的对话；
- 用摘要替换完整历史；
- 优点是省力，Claude 可能记得你漏掉的细节；
- 缺点是有损，模型决定什么重要。
- **Clear**：
- 由你自己写下真正重要的内容；
- 例如当前目标、约束、相关文件、已经排除的方案；
- 优点是干净、可控；
- 缺点是需要你亲自做抽象。
- 简单说：compact 是让 Claude 整理房间；clear 是你自己打包行李换房间。

## Bad compact 的根源：模型不知道你下一步要去哪

- bad compact 常发生在模型无法预测工作方向的时候。
- 例子：
- 你经历了一段很长的 debugging session；
- auto-compact 把重点总结成“刚才调试的主线”；
- 你下一句却说：“now fix that other warning we saw in bar.ts.”
- 由于那个 warning 不是刚才主线，它可能已经被摘要丢掉。
- 更麻烦的是：context rot 最严重的时候，往往正是模型需要做 compact 的时候。
- 所以 1M context 的真正好处，是给你更多时间**主动 compact**，并明确告诉它接下来要保留什么。

## Subagents 是一种 context management，不只是并行工具

- subagent 的价值不只是“多一个 agent 干活”，而是它有自己的 fresh context window。
- 它适合处理会产生大量中间输出、但最终只需要结论的任务。
- 作者给出的心智测试：
- **will I need this tool output again, or just the conclusion?**
- 如果只需要结论，就让 subagent 读、查、验证、总结，再把最终结果带回主 session。

## 最终 takeaway

- Claude Code 的每一轮交互，本质上都是一次上下文治理决策。
- 1M context 降低了爆窗频率，但没有取消 context rot。
- 好的 Claude Code 使用者，会像管理项目一样管理 session：
- 新任务新 session；
- 错路用 rewind；
- 长 session 主动 compact；
- 复杂探索交给 subagent；
- 关键 context 自己写 brief。
- 真正稀缺的不是 prompt 技巧，而是判断：**这段上下文还值得继续带着吗？**

## 概念网络

### 核心概念解析 (Core Concepts)

- **【Session Management】(会话管理)**
- **context**：

What came up again and again in these calls is that there is a lot of variance in how you might manage your sessions, especially with our new update to 1 million context in Claude Code.

Do you only use one session or two sessions that you keep open in a terminal? Do you start a new session with every prompt? When do you use compact, rewind or subagents? What causes a bad compact?

- **费曼一下**：Session Management 不是“开几个聊天窗口”的小技巧，而是 Claude Code 的上下文治理能力。每一个 session 都是一段带着历史、工具输出、文件读取和错误路径的工作记忆。你要决定什么时候继续沿用它，什么时候回退它，什么时候压缩它，什么时候清空它，什么时候把子任务外包给 subagent。1M context 只是把窗口变大；session management 才决定窗口里放什么、丢什么、什么时候换一个干净窗口。

### 概念网络 (Concept Network)

![图片展示了Claude Code的1M Context下Session Management的流程。1M Context通过只推迟撞墙影响Context Window和Context Rot，使Session Management成为必要。Session Management有Continue、Rewind、Clear、Compact、Subagent等操作，其中Context Window和Context Rot是其输入。该图与上下文紧密相关，直观呈现了上下文长度对Session Management的影响及操作流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTQ0NjQ3ZmI4ZmJmMDYzZDE0ZGMxMWQ1MmQ4NjZiMjhfNjUzMGI0ZTY1ZDcwNDlhOTU5OTZlMDk5NTNjN2JkNmJfSUQ6NzY2OTUxNjYxMTM3OTgyNTYzNF8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **Context Window → Session Management**：context window 是 session 的工作记忆边界；session management 管的是这个边界内的信息质量。
- **Context Rot → Session Management 的必要性**：上下文越长，噪音越多，模型越容易被旧信息分散；所以不能无脑 continue。
- **Branching Point → Session Management 的操作界面**：每一轮结束后，continue / rewind / clear / compact / subagents 都是不同的上下文处理动作。
- **Rewind → 删除错误路径**：回到错误发生前，用新信息重新提示，避免把失败尝试继续留在上下文里。
- **Compact / Clear → 两种减重方式**：compact 让模型总结，clear 让人自己提炼；前者省力但有损，后者费力但可控。
- **Subagents → 隔离中间噪音**：把只需要结论的子任务放进新上下文里完成，避免主 session 被大量工具输出污染。
- **1M Context → 更长缓冲区，不是免维护系统**：大窗口让你更晚撞墙，但不让你免于管理上下文。

---
