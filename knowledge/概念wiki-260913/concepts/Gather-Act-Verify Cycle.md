---
id: cm_1bb0da58
name: Gather-Act-Verify Cycle
type: PROCEDURAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.042
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Gather-Act-Verify Cycle

> 收集上下文、动手修改、验证结果、再重复，构成 Agent 的执行节奏。

**领域** loop-autonomy ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

ReAct 的一个具体变种——**先搜集情报，再动手，再复查**。顺序不能乱，复查不能省。这就是 Claude Code 跑得比其他 coding agent 稳的原因。

## 原文 context

Claude Code uses a Gather-Act-Verify cycle: gather context (search files, read code), take action (edit files, run commands), verify results (run tests, check output), repeat.

## 掌握证据（做到这些才算会）

- 能按该循环拆解一次真实的编码任务
- 能指出缺少验证环节时的失败模式

## 验收问句

> {{name}} 的三个阶段各自做什么？

## 懂了它才能懂（解锁 1）

- [[浏览循环]] — 浏览循环是收集—行动—验证节奏在代码阅读上的体现。

## 相关

- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27

## 出场

- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922
## 反链

- [[浏览循环]]
- [[Agent vs Harness]]
