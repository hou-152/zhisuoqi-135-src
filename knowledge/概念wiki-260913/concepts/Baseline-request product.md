---
id: cm_c5c2a8cb
name: Baseline-request product
type: REPRESENTATIONAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: compute
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Baseline-request product

> 任务输入≈baseline×请求次数+对话增长量，可用来比较不同 agent 的实际开销。

**领域** caching-cost ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.045

## 费曼一下

单程车票便宜不代表整趟行程便宜；如果要来回九次，可能比贵票但只跑三次花得更多。

## 原文 context

整项任务输入近似等于 baseline × request count + conversation growth。T3 中 Claude Code 虽底座大，却用 3 次请求完成；OpenCode 以小底座请求 9 次，累计反而略高。

## 掌握证据（做到这些才算会）

- 能写出该近似式并指明各因子含义
- 能用它解释小底座多次请求为何累计更高

## 验收问句

> 用 {{name}} 算，为什么请求次数多的小底座反而更贵？

## 先懂这些（前置 1）

- [[Token count]] · **hard** — 基线×请求次数的估算以 token 为单位计算。

## 相关

- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tool-schema tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[Harness token floor]]
- [[Token count]]
- [[Tool-schema tax]]
- [[API-boundary observability]]
