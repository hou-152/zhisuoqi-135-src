---
id: cm_78a628e1
name: stateless
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 0
origin: [context]
aliases: []
sources: 1
---

# stateless

> 每次调用模型都从空白状态开始，不携带上一轮的上下文

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

模型本身没有会话记忆；agent 的连续性来自外层软件每次把历史上下文重新发给模型。

## 原文 context

每次调用模型都从空白状态开始。

## 掌握证据（做到这些才算会）

- 能举出一次无状态调用的输入与输出
- 能说明无状态与持久会话之间如何取舍

## 验收问句

> {{name}} 的调用为什么会丢失上一轮信息？

## 懂了它才能懂（解锁 4）

- [[messages API 作为直连网关]] — 网关本身不保存状态，每次调用都从空白开始
- [[Harness level feature]] — 跨交互持久状态这类能力，正因模型无状态才需要 harness 补
- [[Filesystem 作为最基础的 harness 原语]] — 正因为模型无状态，文件系统才成为最基础的持久化原语
- [[Von Neumann Architecture Analogy]] — 把上下文比作 RAM，前提是每次调用都不携带状态

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[Harness]]
- [[LLM Large Language Model]]
- [[coding agent]]
- [[Filesystem 作为最基础的 harness 原语]]
- [[Harness level feature]]
- [[messages API 作为直连网关]]
- [[Von Neumann Architecture Analogy]]
