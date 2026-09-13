---
id: cm_93c0b683
name: tools → system → messages 缓存顺序
type: PROCEDURAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: use
centrality: 0.126
depth: 2
origin: [context]
aliases: []
sources: 1
---

# tools → system → messages 缓存顺序

> 为命中提示缓存，应把最稳定的内容放前面：工具定义在前、系统提示居中、对话消息在后。

**领域** caching-cost ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

这是一条 prompt 布局原则：越靠前，越会影响整条缓存链。工具定义和系统提示如果乱变，消息层再稳定也救不回来。

## 原文 context

文章引用 Anthropic 的组织顺序：工具定义在前，系统提示在中间，对话消息在后。

## 掌握证据（做到这些才算会）

- 能按缓存友好顺序排列一次请求的三段内容
- 能解释顺序颠倒为何导致缓存不命中

## 验收问句

> 要提升缓存命中率，{{name}} 该怎么安排你请求里的各段内容？

## 先懂这些（前置 2）

- [[前缀匹配 Prefix Matching]] · **hard** — 不懂前缀匹配，就做不了tools→system→messages缓存顺序的设计（稳定内容前置以命中缓存）。
- [[稳定前缀 Stable Prefix]] · **hard** — 不懂【稳定前缀】，就排不出【tools → system → messages 缓存顺序】

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12
## 反链

- [[提示词缓存 Prompt Caching]]
- [[前缀匹配 Prefix Matching]]
- [[稳定前缀 Stable Prefix]]
- [[缓存断点 Cache Breakpoint]]
