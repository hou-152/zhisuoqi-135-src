---
id: cm_6b38efa5
name: Chat modes
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: []
sources: 1
---

# Chat modes

> 按任务类型切换模型角色与关注点的机制：架构设计、写码、审 PR、调试各有一套输出习惯。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 原文 context

Chat modes 是模型的角色切换机制。做架构设计、写代码、审查 PR、调试错误时，模型需要不同关注点和输出习惯。

## 掌握证据（做到这些才算会）

- 能针对不同任务选出合适的 mode 并说明差异
- 能举出用错 mode 导致输出跑偏的例子

## 验收问句

> 审查 PR 时你会切到哪个 {{name}}，为什么？

## 相关

- [[Markdown prompt engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[Agentic primitives]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[Agentic primitives]] · rejected（audit） — Chat modes 可由硬编码提示实现，不依赖 primitives 文件化；最多是 primitives 的一个应用实例。
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-23

## 出场

- Context Engineering ｜ 《构建可靠 AI 工作流：智能体原语与上下文工程》 ｜ https://github.blog/ai-and-ml/github-copilot/how-to-build-reliable-ai-workflows-with-agentic-primitives-and-context-engineering/
## 反链

- [[Agentic primitives]]
- [[Markdown prompt engineering]]
