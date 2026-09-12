---
id: cm_5c93f4e7
name: Handoffs / Agents as tools
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Handoffs / Agents as tools

> Agent 把特定任务委派给其他 Agent 的机制，是与 manager 式编排并列的一种编排风格选择。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

一个 agent 干不完的活，可以交给另一个更专的 agent。交法有两种：当成工具调一下再拿回控制权，或者干脆把整场对话交接出去。前者像请教同事，后者像转接电话。

## 原文 context

allow agents to delegate to other agents for specific tasks，被列为 a powerful mechanism for coordinating and delegating work across multiple agents。文档在 Start here 里把它与 manager-style orchestration 并列为需要抉择的两种编排风格。

## 掌握证据（做到这些才算会）

- 能举例说明哪些任务适合委派给子 Agent
- 能说出它与 manager 式编排的差别

## 验收问句

> 什么情况下你会选 {{name}} 而不是 manager 式编排？

## 先懂这些（前置 1）

- [[多智能体架构]] · **soft** — 委派机制只在多个 Agent 并存时才成立

## 相关

- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[多智能体架构]]
- [[primitives]]
- [[Agent]]
- [[very few abstractions]]
