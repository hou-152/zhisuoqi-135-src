---
id: cm_03d2000c
name: 非模型架构
nameEn: Non-model Architecture
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.144
depth: 1
origin: [context, harness]
aliases: ["Non-model Architecture"]
sources: 2
---

# 非模型架构 · Non-model Architecture

> 除模型之外的一切系统成分——Harness、循环、工具、上下文管理都属于这一层。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

文章把 Agent 能力拆成模型本体和模型之外的系统。凡是负责运行、组织、限制、连接、恢复和验证的部分，都属于非模型架构。

## 原文 context

“如果你不是模型本身，那你就是 Harness。”

## 掌握证据（做到这些才算会）

- 能把一个 Agent 系统切成模型层与非模型层两部分
- 能举出只改 harness 不改模型就提升表现的例子

## 验收问句

> 既然模型不变，{{name}} 具体能改变哪些结果？

## 先懂这些（前置 1）

- [[If you're not the model, you're the harness.]] · **soft** — 不懂划界公式，就列不全非模型架构到底该包含哪几层成分

## 懂了它才能懂（解锁 1）

- [[LLM-as-CPU Harness-as-OS]] — 不懂非模型架构的组成，就分不清 CPU 侧与 OS 侧各自管什么职责

## 相关

- [[编排循环 Orchestration Loop TAO ReAct]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[笨循环 Dumb Loop]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[记忆即提示 Memory as Prompt]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[执行可靠性机制 State Error Guardrails Verification]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[脚手架与 Harness 厚度 Scaffolding Harness Thickness]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[LLM-as-CPU Harness-as-OS]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[提示词工程 Prompt Engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[工具 Tools]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[观察掩码 Observation Masking]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[MCP Model Context Protocol]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[压缩 Compaction]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[记忆 Memory]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[即时检索 Just-in-time Retrieval]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[1.6% vs 98.4%]] · rejected（audit） — 这只是用统计数字举例说明非模型架构占比，不是理解非模型架构的前置
- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13

## 出场

- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922

## 别名

`Non-model Architecture`

## 反链

- [[工具 Tools]]
- [[记忆 Memory]]
- [[MCP Model Context Protocol]]
- [[上下文腐烂 Context Rot]]
- [[迷失在中间 lost in the middle]]
- [[If you're not the model, you're the harness.]]
- [[笨循环 Dumb Loop]]
- [[编排循环 Orchestration Loop TAO ReAct]]
- [[即时检索 Just-in-time Retrieval]]
- [[脚手架与 Harness 厚度 Scaffolding Harness Thickness]]
- [[提示词工程 Prompt Engineering]]
- [[AI Agent]]
- [[LLM-as-CPU Harness-as-OS]]
- [[压缩 Compaction]]
- [[记忆即提示 Memory as Prompt]]
- [[执行可靠性机制 State Error Guardrails Verification]]
- [[1.6% vs 98.4%]]
- [[观察掩码 Observation Masking]]
