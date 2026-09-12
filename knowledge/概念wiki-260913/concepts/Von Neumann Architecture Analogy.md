---
id: cm_8d161688
name: Von Neumann Architecture Analogy
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Von Neumann Architecture Analogy

> 把裸 LLM 比作无 RAM 无磁盘无 IO 的 CPU：上下文是 RAM，外部库是磁盘，工具是驱动，harness 是操作系统。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

LLM = CPU，context window = RAM，外部数据库 = 磁盘，工具 = 设备驱动，**harness = 操作系统**。这不是比喻——是**同构**。我们又一次重新发明了计算机。

## 原文 context

A raw LLM is a CPU with no RAM, no disk, and no I/O. The context window serves as RAM. External databases function as disk storage. Tool integrations act as device drivers. The harness is the operating system. "We have reinvented the Von Neumann architecture."

## 掌握证据（做到这些才算会）

- 能把 CPU、RAM、磁盘、驱动、OS 五个角色一一对应
- 能用该类比解释 harness 为何必需

## 验收问句

> 用 {{name}} 说明 harness 扮演什么角色？

## 先懂这些（前置 1）

- [[stateless]] · **soft** — 把上下文比作 RAM，前提是每次调用都不携带状态

## 相关

- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27

## 出场

- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922
## 反链

- [[stateless]]
- [[Agent vs Harness]]
