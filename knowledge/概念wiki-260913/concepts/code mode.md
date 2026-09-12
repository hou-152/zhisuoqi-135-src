---
id: cm_40c8f5ff
name: code mode
type: CONCEPTUAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# code mode

> Agent 以写代码并执行代码来完成任务的能力模式，与 subagents 等并列的额外能力。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

让 agent 通过写代码来调用工具，而不是通过 tool calling JSON。代码是表达力更强的「编排语言」，特别适合多步骤、多工具的复杂任务。

## 原文 context

additional agent capabilities, including code mode and subagents

## 掌握证据（做到这些才算会）

- 能说明 code mode 适合哪一类任务
- 能举出用一段代码替代一串工具调用的例子

## 验收问句

> 什么任务你会让 agent 走 {{name}} 而不是逐个调工具？

## 相关

- [[shell tool]] · related-to（audit） — code mode 靠的是代码执行原语，shell tool 只是其中一种落地方式；不懂 shell tool 也能理解 code mode，应降 soft。
- [[shell tool]] · rejected（audit） — code mode 不依赖 shell tool，可用其他代码执行/沙箱实现。
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[model-native harness]]
- [[Agents SDK]]
- [[shell tool]]
