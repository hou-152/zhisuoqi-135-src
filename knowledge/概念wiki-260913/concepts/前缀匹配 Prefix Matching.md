---
id: cm_036f0092
name: 前缀匹配
nameEn: Prefix Matching
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Prefix Matching"]
sources: 1
---

# 前缀匹配 · Prefix Matching

> 缓存命中依赖请求前缀完全一致，语义相近不等于前缀一致，前缀稳定性直接决定命中率。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

模型缓存不是按“意思相近”来找回忆，而是看前面的请求结构和内容是否对得上。意思差不多但顺序、字段、动态内容变了，缓存仍然可能 miss。

## 原文 context

文章区分了“语义差不多”和“前缀一致”，并指出缓存命中依赖后者。

## 掌握证据（做到这些才算会）

- 能区分『语义差不多』与『前缀一致』两种情况
- 能指出改动哪一段会打破前缀一致导致缓存失效

## 验收问句

> 这里缓存没命中，是{{name}}被破坏了吗？

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Prefix Matching`

## 反链

- [[缓存断点 Cache Breakpoint]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
