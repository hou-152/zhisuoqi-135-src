---
id: cm_c7901d9f
name: 缓存连续性
nameEn: Cache Continuity
type: PROCEDURAL
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

> 同一条主对话不要随意切换模型、不要把分支探索混进主链路，否则缓存前缀失效、连续性被破坏。

**领域** caching-cost ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

缓存连续性就是主对话的记忆链不断。主链路越稳定，缓存越能滚动复用；分支任务应该独立跑，避免污染主对话的缓存结构。

## 原文 context

文章提醒，不要在同一条主对话里随便切模型，也不要把分支探索混进主链路。

## 掌握证据（做到这些才算会）

- 能说出切模型会打断缓存
- 能说明分支探索应另开会话而非混入主链路

## 验收问句

> 哪些操作会破坏 {{name}}？

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
