---
id: cm_c7901d9f
name: 缓存连续性
nameEn: Cache Continuity
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Cache Continuity"]
sources: 1
---

# 缓存连续性 · Cache Continuity

> 同一主对话中不随意切模型、不把分支探索混进主链路，以维持缓存前缀连续，避免反复重写缓存。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

缓存连续性就是主对话的记忆链不断。主链路越稳定，缓存越能滚动复用；分支任务应该独立跑，避免污染主对话的缓存结构。

## 原文 context

文章提醒，不要在同一条主对话里随便切模型，也不要把分支探索混进主链路。

## 掌握证据（做到这些才算会）

- 能列出破坏缓存连续性的常见操作
- 能说明切模型为何导致缓存失效

## 验收问句

> 能否指出哪些操作会破坏 {{name}}？

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Cache Continuity`

## 反链

- [[缓存断点 Cache Breakpoint]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
