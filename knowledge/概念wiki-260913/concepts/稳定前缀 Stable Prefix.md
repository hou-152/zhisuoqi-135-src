---
id: cm_668cf70f
name: 稳定前缀
nameEn: Stable Prefix
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [context]
aliases: ["Stable Prefix"]
sources: 1
---

# 稳定前缀 · Stable Prefix

> 缓存真正复用的是请求开头到缓存断点之间的稳定内容，而不是整段 prompt。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

稳定前缀就是每轮请求最前面那块最好别动的地基。地基越稳定，缓存越容易命中；地基一变，后面的缓存也跟着松掉。

## 原文 context

文章强调，缓存真正复用的是从请求开头到缓存断点之间的稳定内容。

## 掌握证据（做到这些才算会）

- 能定位缓存断点并判断哪些内容落在复用区间内
- 能通过重排前缀内容提升缓存命中率

## 验收问句

> {{name}} 复用的到底是哪一段内容？

## 先懂这些（前置 1）

- [[缓存断点 Cache Breakpoint]] · **hard** — 不懂缓存断点，就做不了稳定前缀的范围界定（从请求开头到断点）。

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
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Stable Prefix`

## 反链

- [[工具定义 Tool Definitions Tool Schema]]
- [[提示词缓存 Prompt Caching]]
- [[前缀匹配 Prefix Matching]]
- [[上下文压缩 Context Compression Summarization]]
- [[缓存命中率 Cache Hit Rate]]
- [[缓存断点 Cache Breakpoint]]
- [[系统提示 System Prompt]]
- [[TTL]]
- [[缓存连续性 Cache Continuity]]
- [[缓存命中读取成本 Cache Hit Read Cost]]
- [[缓存写入成本 Cache Write Cost]]
- [[消息层 Messages Layer]]
- [[最小可缓存 token 门槛 Minimum Cacheable Tokens]]
- [[Automatic Caching]]
- [[tools → system → messages 缓存顺序]]
- [[首字输出延迟 Time to First Token Latency]]
- [[Explicit Breakpoints]]
