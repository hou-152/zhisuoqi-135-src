---
id: cm_f67b66b8
name: 消息层
nameEn: Messages Layer
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [context]
aliases: ["Messages Layer"]
sources: 1
---

# 消息层 · Messages Layer

> 把真正会变化的信息放进消息层，而非频繁改动前面的固定指令，保持提示前缀稳定。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

消息层是动态水流，系统提示是稳定河床。变化信息应该顺着消息层往后追加，而不是回头修改河床。

## 原文 context

作者建议把真正会变的信息放进消息层，而不是频繁改动前面的固定指令。

## 掌握证据（做到这些才算会）

- 能在自己写的提示中区分固定指令与易变信息
- 改写提示时保持前缀不动、只改消息层

## 验收问句

> 为什么应当把易变内容放进 {{name}}，而不是改固定指令？

## 先懂这些（前置 1）

- [[系统提示 System Prompt]] · **hard** — 不懂【系统提示】，就做不了【消息层】的 ⟨与固定指令前缀分离的定义⟩

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Messages Layer`

## 反链

- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
- [[缓存断点 Cache Breakpoint]]
- [[系统提示 System Prompt]]
