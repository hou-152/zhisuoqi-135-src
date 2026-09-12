---
id: cm_3c530f4a
name: reasoning effort
type: CONCEPTUAL
subject: Context Engineering
domain: model-training
learningStage: when-needed
verification: use
centrality: 0.042
depth: 3
origin: [context]
aliases: []
sources: 1
---

# reasoning effort

> coding agent 可调高或调低的推理强度，在输出质量与 token 成本之间取舍。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

这是 agent 在速度、成本和质量之间的旋钮；难题值得多花 token，简单任务不一定需要。

## 原文 context

coding agents 可调高或调低 reasoning effort。

## 掌握证据（做到这些才算会）

- 能对不同任务给出调高或调低的理由
- 能观察同一任务在不同档位下的 token 差异

## 验收问句

> 什么情况下该把 {{name}} 调低？

## 先懂这些（前置 1）

- [[reasoning thinking]] · **hard** — 推理强度调节的是思考模式花多少 token，不懂思考模式就不懂它在调什么。

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 常一起用（运行时组成） — 推理强度控制一次模型运行中分配给推理过程的额外计算预算。
- [[注意力预算 attention budget]] · 对照（概念边界） — 推理强度调节计算投入，注意力预算描述模型处理当前上下文信息的有限能力。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[注意力预算 attention budget]]
- [[LLM Large Language Model]]
- [[coding agent]]
- [[reasoning thinking]]
