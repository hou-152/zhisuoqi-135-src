---
id: cm_a378789a
name: Automatic Caching
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: use
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Automatic Caching

> 多数普通多轮对话可直接启用的默认缓存方案。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

自动缓存是让系统帮你找合适断点。你不用精细规划每一层，但前提是 prompt 本身不要每轮乱变。

## 原文 context

文章把 automatic caching 定位为多数普通多轮对话的默认可用方案。

## 掌握证据（做到这些才算会）

- 能说出它适合普通多轮对话这一默认场景
- 能判断哪些对话可以不动脑直接开它

## 验收问句

> 什么场景下可以先默认启用 {{name}}？

## 先懂这些（前置 1）

- [[提示词缓存（Prompt Caching）]] · **hard** — 自动缓存是提示缓存的默认启用形态，属其子方案。

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12
## 反链

- [[提示词缓存（Prompt Caching）]]
- [[缓存断点 Cache Breakpoint]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
