---
id: cm_78a628e1
name: stateless
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.142
depth: 0
origin: [context]
aliases: []
sources: 1
---

# stateless

> 每次调用模型都从空白状态开始，不携带上一轮的上下文

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.142

## 费曼一下

模型本身没有会话记忆；agent 的连续性来自外层软件每次把历史上下文重新发给模型。

## 原文 context

每次调用模型都从空白状态开始。

## 掌握证据（做到这些才算会）

- 能举出一次无状态调用的输入与输出
- 能说明无状态与持久会话之间如何取舍

## 验收问句

> {{name}} 的调用为什么会丢失上一轮信息？

## 懂了它才能懂（解锁 5）

- [[Harness level feature]] — 每次调用从空白开始，才需要 harness 提供跨交互持久状态。
- [[messages API 作为直连网关]] — 直连网关无状态，agent 才必须自己补上 harness。
- [[Skills as permanent upgrades]] — 与每次空白相对，skill 才成为不遗忘不退化的永久升级。
- [[Von Neumann Architecture Analogy]] — 裸 LLM 如无 RAM 的 CPU，因为每次调用无状态，不懂就看不懂类比。
- [[prefill 与 decode 的高度倾斜]] — 调用无状态，才需每步追加历史导致输入膨胀。

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
- [[Harness level feature]]
- [[messages API 作为直连网关]]
- [[prefill 与 decode 的高度倾斜]]
- [[Skills as permanent upgrades]]
- [[Von Neumann Architecture Analogy]]
