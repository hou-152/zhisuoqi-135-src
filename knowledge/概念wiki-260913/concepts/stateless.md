---
id: cm_78a628e1
name: stateless
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.181
depth: 0
origin: [context]
aliases: []
sources: 1
---

# stateless

> 每次调用模型都从空白状态开始，不携带上一轮的上下文

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

模型本身没有会话记忆；agent 的连续性来自外层软件每次把历史上下文重新发给模型。

## 原文 context

每次调用模型都从空白状态开始。

## 掌握证据（做到这些才算会）

- 能举出一次无状态调用的输入与输出
- 能说明无状态与持久会话之间如何取舍

## 验收问句

> {{name}} 的调用为什么会丢失上一轮信息？

## 懂了它才能懂（解锁 3）

- [[Von Neumann Architecture Analogy]] — 裸 LLM 如无 RAM 的 CPU，因为每次调用无状态，不懂就看不懂类比。
- [[prefill 与 decode 的高度倾斜]] — 调用无状态，才需每步追加历史导致输入膨胀。
- [[Runtime-harness separation]] — 不懂【stateless】，就做不了 Runtime-harness separation 里「为什么必须有 harness 这一层来承载可靠工作循环」这件事

## 相关

- [[Skills as permanent upgrades]] · related-to（audit） — skill 的持久性来自外部存储，'永久升级'可独立理解，无状态只是可选对照，宜降 soft。
- [[Tracing]] · rejected（audit） — Tracing 可追踪有状态调用；stateless 只影响单次调用分 span/重放的便利性，不是理解 Tracing 的前提。
- [[Harness level feature]] · related-to（audit） — harness 级能力多源于模型能力缺口，只有'跨交互持久状态'一项靠无状态对照，不构成整体前提。
- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[messages API 作为直连网关]] · related-to（audit） — messages API 的收发语义可独立理解；无状态只支撑'需自补 harness'这一结论，非定义前提。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[coding agent]]
- [[Runtime-harness separation]]
- [[prefill 与 decode 的高度倾斜]]
- [[Tracing]]
- [[Harness level feature]]
- [[LLM Large Language Model]]
- [[Von Neumann Architecture Analogy]]
- [[messages API 作为直连网关]]
- [[Skills as permanent upgrades]]
