---
id: cm_3fef769a
name: 首字输出延迟
nameEn: Time to First Token Latency
type: LANGUAGE
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Time to First Token Latency"]
sources: 1
---

# 首字输出延迟 · Time to First Token Latency

> 从请求发出到输出第一个 token 的延迟，是提示词缓存收益的一个维度。

**领域** caching-cost ｜ **类型** LANGUAGE ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

首字输出延迟就是用户等模型开始说话的时间。缓存命中后，模型少处理重复前缀，第一句话出来得更快，体验也更接近实时协作。

## 原文 context

文章把提示词缓存的收益同时放在成本和首字输出延迟两个维度上。

## 掌握证据（做到这些才算会）

- 能解释缓存为何同时省成本与降低首字延迟
- 能区分首字输出延迟与总时长

## 验收问句

> {{name}} 衡量的是哪一段耗时？

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Time to First Token Latency`

## 反链

- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
- [[缓存断点 Cache Breakpoint]]
