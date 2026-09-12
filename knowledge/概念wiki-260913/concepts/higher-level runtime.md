---
id: cm_561dcec8
name: higher-level runtime
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.117
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# higher-level runtime

> 在模型调用之上再叠一层运行时，接管 turns、工具执行、guardrails、handoffs、sessions，且可按场景分层选择。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.117

## 费曼一下

SDK 不是 API 的替代品，而是套在它外面的一层。你要么自己管循环、工具分发和状态，要么把这些交出去。关键在于这个选择是按路径做的：同一个应用里，托管流程走 SDK，低层调用直连 API，两者共存。

## 原文 context

The SDK uses the Responses API by default for OpenAI models, but it **adds a higher-level runtime around model calls**；由此引出「own the loop 自己扛」与「让 runtime 管 turns、tool execution、guardrails、handoffs、sessions」的选择表，并以 You do not need to choose one globally 收束。

## 掌握证据（做到这些才算会）

- 能列出这层 runtime 接管的具体职责
- 能说明'自己扛循环'与'交给 runtime'可以并存而不必全局二选一

## 验收问句

> {{name}} 除了模型调用本身还替你管哪些事？

## 先懂这些（前置 1）

- [[Runtime-harness separation]] · **hard** — 不懂运行时与 harness 分层，就不知道这层该接管什么。

## 懂了它才能懂（解锁 3）

- [[SayCan]] — SayCan 在模型调用上做接驳评估，类似运行时接管 handoffs/guardrails。
- [[Hermes Agent]] — 开源 Agent 源码体现运行时如何接管 turns/工具执行。
- [[webhook transform 与 connect()]] — 事件接入是运行时接管工具执行与路由的一部分。

## 相关

- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent]]
- [[primitives]]
- [[Runtime-harness separation]]
- [[Hermes Agent]]
- [[very few abstractions]]
- [[SayCan]]
- [[webhook transform 与 connect()]]
