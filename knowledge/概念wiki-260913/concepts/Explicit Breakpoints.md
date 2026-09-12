---
id: cm_95f5ef7c
name: Explicit Breakpoints
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.042
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Explicit Breakpoints

> 在上下文中显式标出分层边界（长期稳定层、中期变化层、短期动态层），适合层次清楚的场景。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

显式断点就是手动告诉系统每层稳定边界在哪里。它适合复杂系统，但不是越多越好，因为断点数量和回看窗口都有约束。

## 原文 context

作者认为显式断点更适合上下文分层清楚的场景，例如长期稳定层、中期变化层、短期动态层并存。

## 掌握证据（做到这些才算会）

- 能画出三层上下文并在正确位置标出断点
- 能说明何种场景下显式断点优于自动划分

## 验收问句

> 什么场景下该用 {{name}} 而不是自动分层？

## 先懂这些（前置 1）

- [[Context discipline]] · **soft** — 显式分层边界是约束上下文的做法之一，属于上下文纪律

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12
## 反链

- [[Context discipline]]
- [[缓存断点 Cache Breakpoint]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
