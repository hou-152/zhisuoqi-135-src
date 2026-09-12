---
id: cm_a500a4cb
name: 提示词缓存
nameEn: Prompt Caching
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Prompt Caching"]
sources: 1
---

# 提示词缓存 · Prompt Caching

> 复用稳定前缀以压降长对话、Agent、文档问答 token 成本，而非普通开关。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

提示词缓存就是让模型别每轮都重新处理那段已经处理过、又几乎没变的输入前缀。它省下的不是回答本身，而是重复阅读同一大段上下文的计算成本。

## 原文 context

本文把提示词缓存放在长对话、Agent、编程助手和文档问答的成本结构里讨论，而不是把它当成一个普通 API 优化开关。

## 掌握证据（做到这些才算会）

- 能指出哪类场景从缓存中受益最大
- 能估算缓存前后成本结构的变化

## 验收问句

> {{name}} 在长对话里省下的是哪部分成本？

## 相关

- [[前缀匹配 Prefix Matching]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[tools → system → messages 缓存顺序]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[工具定义 Tool Definitions Tool Schema]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[消息层 Messages Layer]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存写入成本 Cache Write Cost]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存命中读取成本 Cache Hit Read Cost]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[TTL]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[最小可缓存 token 门槛 Minimum Cacheable Tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[Automatic Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[Explicit Breakpoints]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存连续性 Cache Continuity]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存命中率 Cache Hit Rate]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[首字输出延迟 Time to First Token Latency]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[系统提示 System Prompt]] · 常一起用（运行时组成） — 稳定的系统提示通常构成高复用缓存前缀的一部分。
- [[系统提示 System Prompt]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[上下文压缩 Context Compression Summarization]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Prompt Caching`

## 反链

- [[系统提示 System Prompt]]
- [[上下文压缩 Context Compression Summarization]]
- [[Automatic Caching]]
- [[Explicit Breakpoints]]
- [[TTL]]
- [[工具定义 Tool Definitions Tool Schema]]
- [[缓存断点 Cache Breakpoint]]
- [[缓存连续性 Cache Continuity]]
- [[缓存命中读取成本 Cache Hit Read Cost]]
- [[缓存命中率 Cache Hit Rate]]
- [[缓存写入成本 Cache Write Cost]]
- [[前缀匹配 Prefix Matching]]
- [[首字输出延迟 Time to First Token Latency]]
- [[稳定前缀 Stable Prefix]]
- [[消息层 Messages Layer]]
- [[最小可缓存 token 门槛 Minimum Cacheable Tokens]]
- [[tools → system → messages 缓存顺序]]
