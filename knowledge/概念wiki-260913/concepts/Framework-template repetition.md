---
id: cm_ca227b76
name: Framework-template repetition
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: now
verification: compute
centrality: 0.042
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Framework-template repetition

> 模板本身 token 不多，但会被每个后续请求重复携带，真实成本是模板体积乘以请求次数。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.042

## 费曼一下

会议议程只有两页，但每次发言前都要重新朗读一遍。发言次数一多，两页也会变成大开销。

## 原文 context

8,405 字符的 workflow template 约 2,100 token，但进入会话后会被每个后续请求重带；真实成本是 template size 乘以请求次数。

## 掌握证据（做到这些才算会）

- 能算出某模板在多轮会话中的累计 token 成本
- 能给出减少重复携带的可行方案

## 验收问句

> {{name}} 的真实成本应该怎么算？

## 先懂这些（前置 1）

- [[Token count]] · **hard** — 模板成本以 token 计且随请求重复，需先懂 token 计量。

## 相关

- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tool-schema tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[Token count]]
- [[Harness token floor]]
- [[Tool-schema tax]]
- [[API-boundary observability]]
