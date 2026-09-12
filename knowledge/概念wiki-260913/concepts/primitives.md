---
id: cm_a3f25593
name: primitives
type: LANGUAGE
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: accept
centrality: 0.181
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# primitives

> SDK 中不可再拆的三个基本构件：Agents、Agents as tools/Handoffs、Guardrails。

**领域** harness-runtime ｜ **类型** LANGUAGE ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.181

## 费曼一下

原语就是这套积木里的基本块。块的种类越少，你越快学会；能不能搭出复杂东西，取决于块之间能不能自由组合——这里的组合能力由 Python 提供。

## 原文 context

文档用 primitives 指称 Agents、Agents as tools / Handoffs、Guardrails 这三个不可再拆的基本构件，并强调 few enough primitives to make it quick to learn。

## 掌握证据（做到这些才算会）

- 能说出三个原语分别是什么
- 能解释「原语少到能快速学会」的设计取舍

## 验收问句

> {{name}} 指的是哪三个构件，为什么强调要少？

## 懂了它才能懂（解锁 3）

- [[Agents SDK]] — 不懂【primitives】，就做不了【Agents SDK】里 Agents、Handoffs、Guardrails 这三个原语的 API 暴露。
- [[APM]] — 不懂【primitives】，就做不了【APM】对 agent 原语的安装、分发与配置。
- [[higher-level runtime]] — 不懂【primitives】，就做不了【higher-level runtime】对 guardrails 与 handoffs 的接管。

## 相关

- [[Handoffs Agents as tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Python-first]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Function tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[MCP server tool calling]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Sandbox agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Human in the loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Tracing]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[turnkey yet flexible]] · related-to（audit） — 原语少是支撑 turnkey yet flexible 的理由之一，不懂 primitives 也能理解该设计取向。
- [[Sessions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[higher-level runtime]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Guardrails]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Reliability-critical harness primitives]] · related-to（audit） — 子项筛的是 harness 可靠性原语，与 SDK 的 Agents/Handoffs/Guardrails 不是同一概念，属术语串味，依赖不成立。
- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[very few abstractions]] · related-to（audit） — '极少抽象'的定位宣言不是理解原语的前提，反而更像由原语反推出来的说法；方向可疑，宜降 soft。
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Guardrails]]
- [[Human in the loop]]
- [[Agent loop]]
- [[Tracing]]
- [[Agent]]
- [[Function tools]]
- [[higher-level runtime]]
- [[MCP server tool calling]]
- [[Sandbox agents]]
- [[Sessions]]
- [[Agents SDK]]
- [[APM]]
- [[Handoffs Agents as tools]]
- [[Reliability-critical harness primitives]]
- [[Python-first]]
- [[turnkey yet flexible]]
- [[very few abstractions]]
