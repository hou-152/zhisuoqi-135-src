---
id: cm_68c53198
name: 缓存断点
nameEn: Cache Breakpoint
type: REPRESENTATIONAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Cache Breakpoint"]
sources: 1
---

# 缓存断点 · Cache Breakpoint

> 缓存从请求开头一直延伸到明确标记位置，该标记点即缓存生效的边界。

**领域** caching-cost ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

缓存断点像一条分界线，告诉系统“到这里为止，这一段值得复用”。断点放得好，稳定内容被缓存；断点放在易变内容后面，缓存就容易失效。

## 原文 context

作者用 Anthropic 的机制说明，缓存会从请求开头延伸到明确标记的位置。

## 掌握证据（做到这些才算会）

- 能说出缓存的起点是请求开头
- 能指出缓存覆盖范围止于标记位置

## 验收问句

> {{name}} 决定缓存覆盖到哪一段？

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
- [[系统提示 System Prompt]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[上下文压缩 Context Compression Summarization]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Cache Breakpoint`

## 反链

- [[系统提示 System Prompt]]
- [[上下文压缩 Context Compression Summarization]]
- [[Automatic Caching]]
- [[tools → system → messages 缓存顺序]]
- [[TTL]]
- [[工具定义 Tool Definitions Tool Schema]]
- [[缓存连续性 Cache Continuity]]
- [[缓存命中读取成本 Cache Hit Read Cost]]
- [[缓存命中率 Cache Hit Rate]]
- [[缓存写入成本 Cache Write Cost]]
- [[前缀匹配 Prefix Matching]]
- [[首字输出延迟 Time to First Token Latency]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
- [[消息层 Messages Layer]]
- [[最小可缓存 token 门槛 Minimum Cacheable Tokens]]
- [[Explicit Breakpoints]]
