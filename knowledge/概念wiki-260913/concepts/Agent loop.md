---
id: cm_1973b1d3
name: Agent loop
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.216
depth: 1
origin: [harness]
aliases: []
sources: 3
---

# Agent loop

> SDK 内置的循环：发起工具调用、把结果送回模型、持续迭代直到任务完成。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.216

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

- [[Orchestration Loop TAO Cycle ReAct Loop]] · **soft** — 不懂【Orchestration Loop / TAO Cycle / ReAct Loop】，就做不了【Agent loop】的 ⟨调工具—回喂—再调用的迭代机制⟩

## 懂了它才能懂（解锁 2）

- [[Ralph Loop]] — Ralph Loop 靠 hook 拦截 agent loop 的退出企图，没有 agent loop 就没有可拦截的循环。
- [[Agentic Coding]] — 自主读改写测依赖循环反复驱动，正是 agent loop。

## 相关

- [[Executable Codebase]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Loop Contract]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Legible Codebase]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[tool loop]] · related-to（audit） — tool loop 与 agent loop 基本是同一机制，agent loop 定义已自含工具调用与结果回灌，作为独立前置过强，宜降 soft 或合并。
- [[Shared File System]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Verifiable Codebase]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Artifact Schema]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Cross-session Work]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Read-only Verifier Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Skill]] · 常一起用（工作流） — Agent Loop 调用经过测试的 Skill，形成可复用、可复利的工作流。
- [[Inner Loop]] · rejected（audit） — 两者更像同义/同指（内循环=主 agent 执行循环），应合并而非依赖边。
- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[持久化执行 durable execution]] · 常一起用（工作流） — Durable Execution 把 Agent Loop 的每次模型与工具调用变成可独立重试步骤。
- [[持久化执行 durable execution]] · 常一起用 — 持久化执行把 Agent Loop 的每次模型和工具调用变成可独立重试的步骤。
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[验证闭环 verification loop]] · 常一起用（工作流） — 行动循环产生结果，验证循环用外部证据决定修正或退出。
- [[Harness]] · 组成（运行时组成） — Agent Harness 负责组织模型、工具与观察之间的运行循环。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Skill]]
- [[持久化执行 durable execution]]
- [[验证闭环 verification loop]]
- [[Cross-session Work]]
- [[primitives]]
- [[Agent]]
- [[Agentic Coding]]
- [[Artifact Schema]]
- [[Executable Codebase]]
- [[Legible Codebase]]
- [[Loop Contract]]
- [[Loop Engineer]]
- [[model-native harness]]
- [[Orchestration Loop TAO Cycle ReAct Loop]]
- [[Shared File System]]
- [[tool loop]]
- [[Ralph Loop]]
- [[Agents SDK]]
- [[Inner Loop]]
- [[Read-only Verifier Agent]]
- [[Verifiable Codebase]]
- [[very few abstractions]]
