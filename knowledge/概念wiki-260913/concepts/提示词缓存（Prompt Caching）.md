---
id: cm_f5944e33
name: 提示词缓存（Prompt Caching）
type: PROCEDURAL
subject: AI 概念库
domain: caching-cost
learningStage: when-needed
verification: use
centrality: 0.236
depth: 0
origin: [notion]
aliases: ["Prompt Caching", "缓存提示词", "prompt cache"]
sources: 1
---

# 提示词缓存（Prompt Caching）

> 把稳定前缀放在 prompt 前部并尽量保持不变，以命中供应商缓存。

**领域** caching-cost ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.236

## 费曼一下

- 大模型 API 的一种省钱机制：**如果两次请求的前缀（系统提示词部分）一字不差，供应商可以复用上次的计算结果**——价格更便宜、延迟更低。

## 原文 context

> Hermes 正在针对大模型供应商的**提示词缓存（Prompt Caching）**机制进行优化……让稳定的前缀部分尽可能长时间地保持不变。

## 掌握证据（做到这些才算会）

- 能重排 prompt 顺序以提高缓存命中
- 能解释前缀一改动缓存为何失效

## 验收问句

> 怎么让 {{name}} 的命中率最大化？

## 懂了它才能懂（解锁 4）

- [[TTL]] — TTL 是提示缓存的有效期参数，脱离缓存无法理解。
- [[cached input tokens]] — 该字段指被缓存复用的输入 token，由提示缓存产生。
- [[Automatic Caching]] — 自动缓存是提示缓存的默认启用形态，属其子方案。
- [[模型一致性与 prompt caching]] — 该原则是为保住提示缓存前缀而设，无缓存即无此约束。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Prompt-Caching-e67679b108ff8240b294011af7f8c1e0

## 别名

`Prompt Caching`、`缓存提示词`、`prompt cache`

## 反链

- [[外包思考，但不外包理解]]
- [[cached input tokens]]
- [[Agent-Native Infrastructure]]
- [[模型一致性与 prompt caching]]
- [[TTL]]
- [[Automatic Caching]]
- [[Sensors 与 Actuators]]
