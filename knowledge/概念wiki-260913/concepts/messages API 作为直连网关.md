---
id: cm_c45d61bf
name: messages API 作为直连网关
type: REPRESENTATIONAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# messages API 作为直连网关

> messages API 是通往模型的直连网关，接收 messages 返回 content blocks；足够底层，所以 agent 必须自己补上 harness。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

这是一个只管一问一答的窗口。想让它连续办完一件复杂的事，中间的排队、跑腿、记账都得你自己雇人做。

## 原文 context

原文称 messages API 是「通往模型的直连网关：接收 messages，返回 content blocks」。它足够底层，也正因为底层，任何 agent 都得自己补上 harness 这一层。

## 掌握证据（做到这些才算会）

- 能说清 messages API 的输入与输出结构
- 能列出只用它时 harness 还需补哪些层

## 验收问句

> 为什么只用 {{name}} 还跑不起一个 agent，需要补什么？

## 懂了它才能懂（解锁 1）

- [[prefill 与 decode 的高度倾斜]] — 知道直连网关的请求响应形态，才能理解输入膨胀而输出短。

## 相关

- [[harness 的过时假设]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[任务时域 task horizon]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[长周期任务的基础设施压力]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Environment]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[基础设施挑战而非 harness 设计问题]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[触发模式谱系]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[agent 作为 Claude API 的新核心原语]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[brain hands session 解耦]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[skill 作为 onboarding 载体]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[agent 模板的声明式持久化]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Session]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[stateless]] · related-to（audit） — messages API 的收发语义可独立理解；无状态只支撑'需自补 harness'这一结论，非定义前提。
- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[Session]]
- [[Claude Managed Agents]]
- [[prefill 与 decode 的高度倾斜]]
- [[stateless]]
- [[Agent]]
- [[触发模式谱系]]
- [[任务时域 task horizon]]
- [[Environment]]
- [[harness 的过时假设]]
- [[基础设施挑战而非 harness 设计问题]]
- [[长周期任务的基础设施压力]]
- [[agent 模板的声明式持久化]]
- [[agent 作为 Claude API 的新核心原语]]
- [[skill 作为 onboarding 载体]]
- [[brain hands session 解耦]]
