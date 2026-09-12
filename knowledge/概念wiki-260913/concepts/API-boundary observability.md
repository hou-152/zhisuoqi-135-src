---
id: cm_8b09eec8
name: API-boundary observability
type: PROCEDURAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: use
centrality: 0.042
depth: 2
origin: [context]
aliases: []
sources: 1
---

# API-boundary observability

> 在 API 边界用日志代理同时抓取完整请求 JSON 与 usage 计量块，作为发送内容与计量结果的真值。

**领域** caching-cost ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

不要只看电费账单，也要在电表前记录每台设备何时开启。两份数据合在一起，才能知道钱花在哪里。

## 原文 context

Logging proxy 同时捕获完整请求 JSON 和 API usage block，分别作为“实际发送内容”和“实际计量结果”的 ground truth。

## 掌握证据（做到这些才算会）

- 能说出需同时抓请求体与 usage block 两份 ground truth
- 能用抓取结果核对『实际发送』与『实际计量』的偏差

## 验收问句

> 如何用 {{name}} 同时拿到发送内容与计量结果两组真值？

## 先懂这些（前置 1）

- [[cached input tokens]] · **soft** — 边界计量块里 cached input tokens 是核心字段之一

## 相关

- [[Baseline-request product]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Configuration multiplier]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Instruction-file tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[MCP schema amplification]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Framework-template repetition]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Subagent bootstrap multiplier]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Cache prefix stability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Cache temperature]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Context-window tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tamper-evident audit trail]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Measurement snapshot]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tool-schema tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[Harness token floor]]
- [[Baseline-request product]]
- [[cached input tokens]]
- [[Tool-schema tax]]
- [[Configuration multiplier]]
- [[Context-window tax]]
- [[Framework-template repetition]]
- [[Instruction-file tax]]
- [[MCP schema amplification]]
- [[Measurement snapshot]]
- [[Subagent bootstrap multiplier]]
- [[Tamper-evident audit trail]]
- [[Cache prefix stability]]
- [[Cache temperature]]
