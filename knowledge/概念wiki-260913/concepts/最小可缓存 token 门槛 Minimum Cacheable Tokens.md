---
id: cm_9bbb52e5
name: 最小可缓存 token 门槛
nameEn: Minimum Cacheable Tokens
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Minimum Cacheable Tokens"]
sources: 1
---

# 最小可缓存 token 门槛 · Minimum Cacheable Tokens

> Anthropic 各模型可缓存内容的最小 token 门槛不同，不能默认所有新模型是同一个数。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 费曼一下

缓存不是任何长度都能触发。上下文太短时，系统可能根本不会创建缓存；这时看不到 cache read/write 不是 bug，而是没过门槛。

## 原文 context

文章强调 Anthropic 不同模型的最小可缓存 token 门槛不同，不能简单说所有新模型都是同一个数。

## 掌握证据（做到这些才算会）

- 能说出不同模型的最小可缓存 token 数并不相同
- 在配置缓存前会先查该模型的具体门槛

## 验收问句

> {{name}}在不同 Anthropic 模型上是同一个数吗？该怎么查？

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Minimum Cacheable Tokens`

## 反链

- [[缓存断点 Cache Breakpoint]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
