---
id: cm_a3f25593
name: primitives
type: LANGUAGE
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: accept
centrality: 0.154
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# primitives

> SDK 中不可再拆的三个基本构件：Agents、Agents as tools/Handoffs、Guardrails。

**领域** harness-runtime ｜ **类型** LANGUAGE ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.154

## 费曼一下

原语就是这套积木里的基本块。块的种类越少，你越快学会；能不能搭出复杂东西，取决于块之间能不能自由组合——这里的组合能力由 Python 提供。

## 原文 context

文档用 primitives 指称 Agents、Agents as tools / Handoffs、Guardrails 这三个不可再拆的基本构件，并强调 few enough primitives to make it quick to learn。

## 掌握证据（做到这些才算会）

- 能说出三个原语分别是什么
- 能解释「原语少到能快速学会」的设计取舍

## 验收问句

> {{name}} 指的是哪三个构件，为什么强调要少？

## 先懂这些（前置 1）

- [[very few abstractions]] · **hard** — 只有极少抽象才能把构件收敛成 Agents、Handoffs、Guardrails

## 懂了它才能懂（解锁 4）

- [[higher-level runtime]] — handoffs、guardrails 等原语是运行时接管的构件
- [[turnkey yet flexible]] — 默认能跑靠原语开箱可用，可改造靠原语留出接口
- [[Reliability-critical harness primitives]] — 筛选标准围绕可靠性原语，先有原语概念才谈筛选
- [[SayCan]] — 出主意与评估的结合，可看作 agent 与工具原语的接驳

## 相关

- [[Handoffs Agents as tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Python-first]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Function tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[MCP server tool calling]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Sessions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Sandbox agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Human in the loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Tracing]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[higher-level runtime]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Guardrails]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent loop]]
- [[Agent]]
- [[Sessions]]
- [[Guardrails]]
- [[higher-level runtime]]
- [[Function tools]]
- [[Tracing]]
- [[Handoffs Agents as tools]]
- [[Human in the loop]]
- [[MCP server tool calling]]
- [[Python-first]]
- [[Reliability-critical harness primitives]]
- [[Sandbox agents]]
- [[SayCan]]
- [[turnkey yet flexible]]
- [[very few abstractions]]
