---
id: cm_a87b8600
name: 缓存命中读取成本
nameEn: Cache Hit Read Cost
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Cache Hit Read Cost"]
sources: 1
---

# 缓存命中读取成本 · Cache Hit Read Cost

> 缓存命中读取的成本远低于普通输入处理，命中越多整体越省。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 费曼一下

缓存命中之后，模型不用重新消化那段前缀，只需要读取已处理结果。对长上下文多轮任务来说，这才是成本下降的主要来源。

## 原文 context

文章指出缓存命中读取远低于普通输入处理成本。

## 掌握证据（做到这些才算会）

- 能说出缓存读取价低于基准输入价
- 能据此估算同一上下文的成本差

## 验收问句

> {{name}} 为什么能显著省钱？

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Cache Hit Read Cost`

## 反链

- [[缓存断点 Cache Breakpoint]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
