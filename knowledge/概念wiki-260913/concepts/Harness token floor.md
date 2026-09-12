---
id: cm_e00f590e
name: Harness token floor
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: now
verification: compute
centrality: 0.117
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Harness token floor

> 用户任务进入前，harness 已发送的 system prompt、tool schema 与 scaffolding 所占的固定 token 量。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.117

## 费曼一下

像打车的起步价，车还没走就已经计费。Agent 的起步价不仅占钱，也占上下文座位。

## 原文 context

在用户任务进入前，Agent harness 已经发送 system prompt、tool schema 和 scaffolding。实验中 Claude Code floor 约 32.8K token，OpenCode 约 6.9K。

## 掌握证据（做到这些才算会）

- 能说出 Claude Code 约 32.8K、OpenCode 约 6.9K 的对比
- 能解释固定开销如何影响每次调用的成本

## 验收问句

> {{name}} 由哪几部分组成，Claude Code 与 OpenCode 各约多少？

## 先懂这些（前置 2）

- [[Tool-schema tax]] · **hard** — 工具 Schema 的固定载荷是 Harness Token 底座中可单独测量的一部分。
- [[Token count]] · **hard** — harness 固定开销以 token 数计量，先懂 token 才能量化。

## 懂了它才能懂（解锁 2）

- [[Configuration multiplier]] — 配置膨胀是在 harness 基线之上做倍数放大。
- [[Subagent bootstrap multiplier]] — 子 agent 独立 bootstrap 即重复支付 harness 固定开销。

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
- [[工具收窄 tool scoping]] · 常一起用（工作流） — 收窄暴露工具与 Schema 可降低每次请求的固定工具说明负担。
- [[系统提示 System Prompt]] · 常一起用（运行时组成） — 系统提示是 Harness Token 底座的固定组成之一。
- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tool-schema tax]] · 组成（运行时组成） — 工具 Schema 的固定载荷是 Harness Token 底座中可单独测量的一部分。
- [[Tool-schema tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[长上下文窗口]] · 常一起用（运行时组成） — 固定系统输入会占用 Context Window 容量，即使缓存命中也不消失。
- [[Harness]] · 常一起用（运行时组成） — Token 底座由 Agent Harness 随每次模型请求附带的静态运行信息产生，但它是负担指标而非 Harness 组件。

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[长上下文窗口]]
- [[Token count]]
- [[系统提示 System Prompt]]
- [[工具收窄 tool scoping]]
- [[Baseline-request product]]
- [[Tool-schema tax]]
- [[API-boundary observability]]
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
