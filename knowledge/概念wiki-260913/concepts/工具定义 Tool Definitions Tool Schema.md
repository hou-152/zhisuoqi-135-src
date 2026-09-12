---
id: cm_8089ce21
name: 工具定义
nameEn: Tool Definitions / Tool Schema
type: REPRESENTATIONAL
subject: Context Engineering
domain: tools-sandbox
learningStage: now
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Tool Definitions / Tool Schema"]
sources: 1
---

# 工具定义 · Tool Definitions / Tool Schema

> 描述工具名称、参数与用途的 schema，在 Agent 场景常占大量 token，且位于缓存前缀最前部。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

工具定义不是附属品，而是缓存地基的一部分。频繁增删工具、重排工具、让 JSON key 顺序漂移，本质上是在反复拆地基。

## 原文 context

在 Agent 场景里，工具 schema 本身常常占据大量 token，并且位于缓存前缀的最前部。

## 掌握证据（做到这些才算会）

- 能写出一份简洁完整的工具 schema
- 能估算其 token 占用并说明它处在缓存前缀最前部的影响

## 验收问句

> 你能说明 {{name}} 为什么值得放进缓存前缀吗？

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Tool Definitions / Tool Schema`

## 反链

- [[缓存断点 Cache Breakpoint]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
