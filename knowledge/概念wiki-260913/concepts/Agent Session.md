---
id: cm_f47cd4ad
name: Agent Session
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.017
depth: 0
origin: [neican]
aliases: []
sources: 1
---

# Agent Session

> 一次上下文窗口有限的工作会话，阶段切换往往开新 Session。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

Agent Session 是一次上下文有限的工作会话。阶段切换常开新 Session，旧 Session 的记忆不会自动延续。文档因此成为跨 Session 传递上下文的载体。它是理解文档作用的机制性概念。

## 原文 context

每一个 Agent Session 的上下文窗口是有限的，当你从“设计”进入“开发”，往往是一个新的 Session。前一个 Session 的思考过程、决策依据、技术方案，都需要通过文档传递给下一个 Session。没有文档，下一个 Session 就是从零开始。

## 掌握证据（做到这些才算会）

- 能说明旧 Session 的思考与决策不会自动延续
- 能指出跨 Session 要靠文档传递上下文，否则从零开始

## 验收问句

> {{name}} 的上下文限制带来什么问题？

## 出场

- AI 内参 260912 ｜ 《我的 AI 原生开发流程：一个真实案例的完整复盘》 ｜ https://baoyu.io/blog/2026-08-24/ai-native-dev-workflow