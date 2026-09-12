---
id: cm_222e47e9
name: Python-first
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.045
depth: 5
origin: [harness]
aliases: []
sources: 1
---

# Python-first

> 用语言内置特性直接编排与串联 agent，而不引入需要另学的新抽象。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

编排逻辑就用普通的 if、for、函数调用写，不用学框架自造的一套流程语言。好处是你原有的调试器、类型检查和测试工具全都还能用。

## 原文 context

Use built-in language features to orchestrate and chain agents, rather than needing to learn new abstractions。它是两条设计原则在 API 形态上的直接落地。

## 掌握证据（做到这些才算会）

- 能用原生控制流写出一段串联两个 agent 的代码
- 能说明为何刻意避免新增抽象层

## 验收问句

> {{name}} 之下你用什么来串联多个 agent？

## 先懂这些（前置 1）

- [[开箱即用的编排与子 agent]] · **soft** — 用语言内置特性串联 agent，需先懂开箱即用的编排机制。

## 相关

- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent]]
- [[primitives]]
- [[开箱即用的编排与子 agent]]
- [[very few abstractions]]
