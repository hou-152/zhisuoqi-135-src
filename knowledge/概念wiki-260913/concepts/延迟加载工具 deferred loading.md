---
id: cm_e4b6932b
name: 延迟加载工具
nameEn: deferred loading
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.042
depth: 2
origin: [context]
aliases: ["deferred loading"]
sources: 1
---

# 延迟加载工具 · deferred loading

> 渐进披露在工具层的实现：部分工具须先用 ToolSearch 搜到完整定义才能使用，被需要前不消耗上下文。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

工具箱里放一百把工具，但只在台面上摆目录。要用哪把再去取——工具数量的上限，就不再由台面大小决定。

## 原文 context

渐进披露在工具层的实现。部分工具是 deferred loading，agent 必须先用 ToolSearch 搜索到完整定义才能使用；这让系统可以拥有更多工具（如 Task 系列），而它们在被需要前不消耗上下文。

## 掌握证据（做到这些才算会）

- 能指出哪些工具被设为 deferred loading 及其调用前提
- 能说明 Task 类工具为何可大量挂载而不吃上下文

## 验收问句

> 不先搜索的情况下，{{name}} 会占用上下文吗？

## 先懂这些（前置 1）

- [[上下文工程 context engineering]] · **soft** — 延迟加载是上下文工程控制工具占用的手段，不懂上下文工程就不懂其动机。

## 相关

- [[护栏型指令的过期]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[判断力优先 let Claude use judgement]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-21

## 出场

- Context Engineering ｜ 《Claude 5 世代的上下文工程，规则变了》 ｜ https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models

## 别名

`deferred loading`

## 反链

- [[上下文工程 context engineering]]
- [[护栏型指令的过期]]
- [[判断力优先 let Claude use judgement]]
