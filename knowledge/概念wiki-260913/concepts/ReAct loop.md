---
id: cm_668a45c5
name: ReAct loop
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.067
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# ReAct loop

> 模型推理→通过 tool call 行动→观察结果，在 while 循环里重复，是当前 agent 的主执行模式。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

想一步、动一下、看一眼结果、再想下一步。这个循环本身很朴素，真正决定上限的是「动一下」这一步能动用什么——如果工具表是固定的，agent 的能力也就被这张表框死了。

## 原文 context

文中指出今天 agent 的主要执行模式——模型推理、通过 tool call 采取行动、观察结果，在 while loop 中重复。它同时暴露了一个结构性瓶颈：harness 只能执行它有逻辑的工具。

## 掌握证据（做到这些才算会）

- 能画出该循环并指出终止条件
- 能指出 harness 只能执行它有逻辑的工具这一瓶颈

## 验收问句

> {{name}} 的一轮里先后发生哪三件事？

## 懂了它才能懂（解锁 2）

- [[think → act → observe 循环]] — think-act-observe 骨架源自 ReAct，不懂 ReAct 就不知它为何分这三步。
- [[Orchestration Loop TAO Cycle ReAct Loop]] — 该命名是 ReAct 的扩展叫法，ReAct 是它的机制内核。

## 相关

- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[Agent = Model + Harness]]
- [[Orchestration Loop TAO Cycle ReAct Loop]]
- [[think → act → observe 循环]]
