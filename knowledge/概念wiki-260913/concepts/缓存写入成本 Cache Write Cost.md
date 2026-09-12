---
id: cm_cb785e57
name: 缓存写入成本
nameEn: Cache Write Cost
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Cache Write Cost"]
sources: 1
---

# 缓存写入成本 · Cache Write Cost

> 缓存写入按 Anthropic 定价高于基准输入价，5 分钟档较便宜，1 小时档更贵。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 费曼一下

写入缓存像第一次建索引，要先多花一点钱。它的价值不在第一次请求，而在后面能不能反复复用这笔预处理成本。

## 原文 context

文章列出 Anthropic 的定价逻辑：5 分钟缓存写入高于基准输入价，1 小时写入更高。

## 掌握证据（做到这些才算会）

- 能说出写入价高于基准输入价
- 能比较 5 分钟与 1 小时写入的成本高低

## 验收问句

> {{name}} 中 1 小时档比 5 分钟档贵在哪？

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Cache Write Cost`

## 反链

- [[缓存断点 Cache Breakpoint]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
