---
id: cm_5103a6a6
name: Human in the loop
type: CONCEPTUAL
subject: Harness Engineering
domain: safety-governance
learningStage: now
verification: use
centrality: 0.042
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Human in the loop

> 在 Agent 运行过程中引入人类参与的机制，与 Guardrails、Tracing 并列构成控制面能力。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

不是所有决定都该让 agent 自己拍板。人在环中是框架预留的插入点，让人在运行过程中确认、修正或叫停，而不是只能在事后看结果。

## 原文 context

Built-in mechanisms for involving humans across agent runs，与 Guardrails、Tracing 并列为控制面能力。

## 掌握证据（做到这些才算会）

- 能指出可以在哪几个环节插入人工介入
- 能说明它与 Guardrails、Tracing 各自的分工

## 验收问句

> {{name}} 在控制面里承担什么角色？

## 先懂这些（前置 1）

- [[Guardrails]] · **soft** — 它与 Guardrails 并列构成控制面，先懂护栏才懂其定位

## 相关

- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent]]
- [[Guardrails]]
- [[primitives]]
- [[very few abstractions]]
