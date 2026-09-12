---
id: cm_a46abbb1
name: Cross-session Work
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: now
verification: judge
centrality: 0.181
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Cross-session Work

> 任务由多个 agent session 各承担一部分并在循环中推进，因此要求外部状态能跨 session 保存与恢复。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

cross-session work 就像多人接力跑。每个人只跑一段，但接力棒必须清楚，上一棒要留下位置、速度和下一步，否则下一棒只能重跑。

## 原文 context

文中说新的任务形态不再是一个 agent 完成全部工作，而是多个 agent session 各自处理一部分，在循环中持续推进。它要求外部状态能跨 session 保存和恢复。

## 掌握证据（做到这些才算会）

- 能说明多 session 接力为什么必须依赖外部状态
- 能设计一份可被下一个 session 恢复的状态快照

## 验收问句

> {{name}} 对状态存放位置提出什么硬要求？

## 先懂这些（前置 2）

- [[Session]] · **hard** — 跨 session 任务由多个 Session 各承担一部分，不懂 Session 无法理解分工。
- [[状态子系统与进度持久化]] · **hard** — 不懂【状态子系统与进度持久化】就做不了【Cross-session Work】的『外部状态跨 session 保存与恢复』这件事

## 懂了它才能懂（解锁 1）

- [[Long-running agent handoff]] — 交接机制服务于跨 session 推进长任务，懂该场景让交接目的更清楚。

## 相关

- [[Artifact Schema]] · related-to（audit） — artifact schema 可在单会话或人类协作中独立成立；跨 session 复用只是动机/场景之一，非前置。
- [[Sessions]] · related-to（audit） — Sessions 被定义为「loop 内」记忆层，而 Cross-session 是跨 loop 的外部状态，作用域对不上；核心依赖已由 [6] 的 Session 承担，这条属冗余，建议降 soft。
- [[Git-backed state]] · related-to（audit） — 跨 session 需求只是 git 持久化的动机，非理解其定义所必需；可以懂 git 持久化而完全不知跨 session
- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[状态子系统与进度持久化]]
- [[Long-running agent handoff]]
- [[Session]]
- [[Agent loop]]
- [[Artifact Schema]]
- [[Git-backed state]]
- [[Loop Engineer]]
- [[Sessions]]
