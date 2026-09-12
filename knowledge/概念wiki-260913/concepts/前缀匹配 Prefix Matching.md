---
id: cm_036f0092
name: 前缀匹配
nameEn: Prefix Matching
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: now
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Prefix Matching"]
sources: 1
---

# 前缀匹配 · Prefix Matching

> 缓存命中要求请求前缀逐 token 一致；语义相近但前缀不同不算命中。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

模型缓存不是按“意思相近”来找回忆，而是看前面的请求结构和内容是否对得上。意思差不多但顺序、字段、动态内容变了，缓存仍然可能 miss。

## 原文 context

文章区分了“语义差不多”和“前缀一致”，并指出缓存命中依赖后者。

## 掌握证据（做到这些才算会）

- 能解释为什么在 prompt 前部插入时间戳会破坏命中
- 能重排 prompt，把稳定内容放前面、变量放后面以提高命中

## 验收问句

> 这样改 prompt 之后还能命中{{name}}吗，为什么？

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
