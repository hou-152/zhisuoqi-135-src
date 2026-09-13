---
id: cm_68c53198
name: 缓存断点
nameEn: Cache Breakpoint
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: now
verification: use
centrality: 0.126
depth: 0
origin: [context]
aliases: ["Cache Breakpoint"]
sources: 1
---

# 缓存断点 · Cache Breakpoint

> 缓存从请求开头延伸到显式标记的位置，标记之后的内容不参与缓存，用于划定可复用的前缀范围。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

缓存断点像一条分界线，告诉系统“到这里为止，这一段值得复用”。断点放得好，稳定内容被缓存；断点放在易变内容后面，缓存就容易失效。

## 原文 context

作者用 Anthropic 的机制说明，缓存会从请求开头延伸到明确标记的位置。

## 掌握证据（做到这些才算会）

- 能指出一次请求中缓存覆盖到哪一段
- 能正确放置标记使前缀被复用

## 验收问句

> 能否在请求里正确放置 {{name}} 以复用前缀？

## 懂了它才能懂（解锁 2）

- [[稳定前缀 Stable Prefix]] — 不懂缓存断点，就做不了稳定前缀的范围界定（从请求开头到断点）。
- [[提示词缓存 Prompt Caching]] — 不懂缓存断点，就做不了提示词缓存的复用范围划定（从开头到标记）。

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
- [[缓存连续性 Cache Continuity]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存命中率 Cache Hit Rate]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[首字输出延迟 Time to First Token Latency]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[Explicit Breakpoints]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[系统提示 System Prompt]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[上下文压缩 Context Compression Summarization]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Cache Breakpoint`

## 反链

- [[工具定义 Tool Definitions Tool Schema]]
- [[提示词缓存 Prompt Caching]]
- [[前缀匹配 Prefix Matching]]
- [[稳定前缀 Stable Prefix]]
- [[上下文压缩 Context Compression Summarization]]
- [[缓存命中率 Cache Hit Rate]]
- [[缓存连续性 Cache Continuity]]
- [[缓存命中读取成本 Cache Hit Read Cost]]
- [[系统提示 System Prompt]]
- [[tools → system → messages 缓存顺序]]
- [[TTL]]
- [[缓存写入成本 Cache Write Cost]]
- [[消息层 Messages Layer]]
- [[最小可缓存 token 门槛 Minimum Cacheable Tokens]]
- [[Automatic Caching]]
- [[首字输出延迟 Time to First Token Latency]]
- [[Explicit Breakpoints]]
