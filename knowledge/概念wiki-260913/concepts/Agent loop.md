---
id: cm_1973b1d3
name: Agent loop
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.243
depth: 1
origin: [harness]
aliases: []
sources: 3
---

# Agent loop

> SDK 内置的循环：发起工具调用、把结果送回模型、持续迭代直到任务完成。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.243

## 费曼一下

模型调工具、拿到结果、再喂回模型、判断是否结束——这个来回的循环谁都要写一遍。SDK 把它内置了，你只描述 agent 是什么，不用描述它怎么转。

## 原文 context

A built-in agent loop that handles tool invocation, sends results back to the LLM, and continues until the task is complete。它是 SDK 作为 higher-level runtime 的核心承载。

## 掌握证据（做到这些才算会）

- 能说明循环的终止由谁判定
- 能说清没有内置循环时要自己补多少胶水代码

## 验收问句

> {{name}} 的一步迭代包含哪几个动作、何时停？

## 先懂这些（前置 1）

- [[tool loop]] · **hard** — agent loop 每轮的核心就是工具调用与结果回灌，即 tool loop。

## 懂了它才能懂（解锁 6）

- [[Harness]] — Agent Harness 负责组织模型、工具与观察之间的运行循环。
- [[Ralph Loop]] — Ralph Loop 靠 hook 拦截 agent loop 的退出企图，没有 agent loop 就没有可拦截的循环。
- [[Agentic Coding]] — 自主读改写测依赖循环反复驱动，正是 agent loop。
- [[steering]] — steering 是 agent 运行中途的介入，不懂循环过程就无从谈介入。
- [[TodoWrite 与 TodoRead]] — 待办工具嵌在 agent 循环里高频调用，不懂循环就不懂它为何高频。
- [[Inner Loop]] — Inner Loop 就是主 agent 的执行循环，即 agent loop 的另一种叫法。

## 相关

- [[Shared File System]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Signals]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Loop Contract]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Legible Codebase]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Executable Codebase]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Verifiable Codebase]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Artifact Schema]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Cross-session Work]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Read-only Verifier Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Skill]] · 常一起用（工作流） — Agent Loop 调用经过测试的 Skill，形成可复用、可复利的工作流。
- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[持久化执行 durable execution]] · 常一起用（工作流） — Durable Execution 把 Agent Loop 的每次模型与工具调用变成可独立重试步骤。
- [[持久化执行 durable execution]] · 常一起用 — 持久化执行把 Agent Loop 的每次模型和工具调用变成可独立重试的步骤。
- [[验证闭环 verification loop]] · 常一起用（工作流） — 行动循环产生结果，验证循环用外部证据决定修正或退出。
- [[Harness]] · 组成（运行时组成） — Agent Harness 负责组织模型、工具与观察之间的运行循环。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Harness]]
- [[Skill]]
- [[Agent]]
- [[Cross-session Work]]
- [[验证闭环 verification loop]]
- [[primitives]]
- [[Read-only Verifier Agent]]
- [[持久化执行 durable execution]]
- [[Artifact Schema]]
- [[Shared File System]]
- [[Verifiable Codebase]]
- [[Ralph Loop]]
- [[Agentic Coding]]
- [[Inner Loop]]
- [[Signals]]
- [[steering]]
- [[TodoWrite 与 TodoRead]]
- [[Agents SDK]]
- [[Executable Codebase]]
- [[Loop Contract]]
- [[Loop Engineer]]
- [[model-native harness]]
- [[tool loop]]
- [[very few abstractions]]
- [[Legible Codebase]]
