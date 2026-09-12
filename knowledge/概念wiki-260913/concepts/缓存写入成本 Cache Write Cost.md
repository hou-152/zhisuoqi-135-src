---
id: cm_cb785e57
name: 缓存写入成本
nameEn: Cache Write Cost
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: compute
centrality: 0.072
depth: 0
origin: [context]
aliases: ["Cache Write Cost"]
sources: 1
---

# 缓存写入成本 · Cache Write Cost

> Anthropic 定价中，5 分钟缓存写入高于基准输入价，1 小时写入更高。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.072

## 费曼一下

写入缓存像第一次建索引，要先多花一点钱。它的价值不在第一次请求，而在后面能不能反复复用这笔预处理成本。

## 原文 context

文章列出 Anthropic 的定价逻辑：5 分钟缓存写入高于基准输入价，1 小时写入更高。

## 掌握证据（做到这些才算会）

- 能说出两个缓存时长档位的相对价格高低
- 能比较一次写入与多次普通输入的成本

## 验收问句

> 能否比较 {{name}} 与重复普通输入谁更便宜？

## 懂了它才能懂（解锁 1）

- [[提示词缓存 Prompt Caching]] — 不懂缓存写入成本，就做不了提示词缓存的成本核算（写缓存是否划算）。

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Cache Write Cost`

## 反链

- [[提示词缓存 Prompt Caching]]
- [[缓存断点 Cache Breakpoint]]
- [[稳定前缀 Stable Prefix]]
