---
id: cm_de3faada
name: Latent vs Deterministic
type: CONCEPTUAL
subject: AI 概念库 × Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.117
depth: 0
origin: [notion, harness]
aliases: ["Latent space", "Deterministic", "latent 空间", "确定性", "latent / deterministic 边界", "latent与确定性"]
sources: 2
---

# Latent vs Deterministic

> 系统每一步非 latent 即 deterministic：智能住在潜在空间，信任住在确定性层，混淆二者是最常见错误。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.117

## 费曼一下

agent 系统里每一步都必须落在其中一边。

## 原文 context

> Every step in your system is one or the other, and confusing them is the most common mistake in agent design.

## 掌握证据（做到这些才算会）

- 能逐一标注流程里每步属于 latent 还是 deterministic
- 能举出让确定性代码承担判断以换取信任的例子

## 验收问句

> 这套系统里哪几步是 {{name}} 中的潜在空间，哪几步必须确定性？

## 懂了它才能懂（解锁 3）

- [[1.6% vs 98.4%]] — 该统计正是 AI 决策与确定性工程的划分，需先懂此二分。
- [[会自己重写的地基]] — 模型是可被厂商重写的概率系统，需先懂 latent 与 deterministic。
- [[对话加确定性缝合]] — 缝合的前提是分清哪层 latent、哪层确定性。

## 相关

- [[Skill Files]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Thin Harness, Fat Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Latent-vs-Deterministic-c07679b108ff83b698b88128734652a2
- Harness Engineering ｜ 《Thin Harness, Fat Skills：harness 才是真正的产品》 ｜ https://x.com/garrytan/status/2042925773300908103/

## 别名

`Latent space`、`Deterministic`、`latent 空间`、`确定性`、`latent / deterministic 边界`、`latent与确定性`

## 反链

- [[对话加确定性缝合]]
- [[Skill Files]]
- [[1.6% vs 98.4%]]
- [[会自己重写的地基]]
- [[Thin Harness, Fat Skills]]
