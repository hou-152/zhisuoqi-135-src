---
id: cm_950e6265
name: Subagent bootstrap multiplier
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: deep-dive
verification: compute
centrality: 0.072
depth: 2
origin: [context]
aliases: []
sources: 1
---

# Subagent bootstrap multiplier

> 每个子 agent 有独立 bootstrap、父 agent 又摄入其 transcript，导致 token 成倍放大

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.072

## 费曼一下

分工不只是多请两个人；每个人都要重新培训、配工具，最后主管还要把所有人的完整报告再读一遍。

## 原文 context

两个 Claude Code subagent 使同一任务从 121K 增至 513K、放大 4.2 倍，因为每个 worker 有独立 bootstrap，parent 还会摄入其 transcript。

## 掌握证据（做到这些才算会）

- 能算出两个 subagent 带来的 token 放大倍数
- 能指出放大来自哪两处重复消耗

## 验收问句

> 同一任务为何在 {{name}} 下从 121K 涨到 513K？

## 先懂这些（前置 1）

- [[Harness token floor]] · **hard** — 子 agent 独立 bootstrap 即重复支付 harness 固定开销。

## 相关

- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tool-schema tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[Harness token floor]]
- [[Tool-schema tax]]
- [[API-boundary observability]]
