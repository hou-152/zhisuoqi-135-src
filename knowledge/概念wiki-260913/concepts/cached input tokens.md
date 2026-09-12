---
id: cm_63e5d090
name: cached input tokens
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: compute
centrality: 0.072
depth: 1
origin: [context]
aliases: []
sources: 1
---

# cached input tokens

> 请求中与历史请求共享前缀、可被缓存复用从而降低处理成本的那部分输入 token。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.072

## 费曼一下

如果前面一大段上下文保持不变，供应商可以复用部分计算；所以 coding agent 会尽量不改早期上下文，以换取更低成本和更好延迟。

## 原文 context

共同前缀可被缓存并降低处理成本。

## 掌握证据（做到这些才算会）

- 能指出一段 prompt 中哪些 token 属于可缓存前缀
- 能估算缓存命中后成本与延迟的下降量

## 验收问句

> 这段 prompt 里哪些算 {{name}}，能省多少成本？

## 先懂这些（前置 1）

- [[提示词缓存（Prompt Caching）]] · **hard** — 该字段指被缓存复用的输入 token，由提示缓存产生。

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[Harness]]
- [[提示词缓存（Prompt Caching）]]
- [[coding agent]]
- [[LLM Large Language Model]]
