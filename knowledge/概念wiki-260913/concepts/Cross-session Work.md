---
id: cm_a46abbb1
name: Cross-session Work
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: now
verification: judge
centrality: 0.217
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# Cross-session Work

> 任务由多个 agent session 各承担一部分并在循环中推进，因此要求外部状态能跨 session 保存与恢复。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.217

## 费曼一下

cross-session work 就像多人接力跑。每个人只跑一段，但接力棒必须清楚，上一棒要留下位置、速度和下一步，否则下一棒只能重跑。

## 原文 context

文中说新的任务形态不再是一个 agent 完成全部工作，而是多个 agent session 各自处理一部分，在循环中持续推进。它要求外部状态能跨 session 保存和恢复。

## 掌握证据（做到这些才算会）

- 能说明多 session 接力为什么必须依赖外部状态
- 能设计一份可被下一个 session 恢复的状态快照

## 验收问句

> {{name}} 对状态存放位置提出什么硬要求？

## 先懂这些（前置 3）

- [[Session]] · **hard** — 跨 session 任务由多个 Session 各承担一部分，不懂 Session 无法理解分工。
- [[Sessions]] · **hard** — 跨 session 要求外部状态能跨 session 保存与恢复，需懂 Sessions 持久层。
- [[Sessions]] · **hard** — 跨 session 推进前，得先懂单次 session 内上下文如何携带。

## 懂了它才能懂（解锁 5）

- [[Git-backed state]] — git 提供显式持久性以支持系统重启后的崩溃恢复，不懂跨 session 需求就不知为何要 git。
- [[Long-running agent handoff]] — 交接跨上下文窗口，前提是状态能跨 session 保存与恢复。
- [[Long-running agent handoff]] — 交接机制服务于跨 session 推进长任务，懂该场景让交接目的更清楚。
- [[Artifact Schema]] — artifact 要跨 session 复用，懂跨 session 工作更懂为何需要 schema。
- [[乐观并发控制 optimistic concurrency control]] — 只有存在多 session 并发写入，写冲突检测才有实际必要。

## 相关

- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Agent loop]]
- [[Sessions]]
- [[Git-backed state]]
- [[Long-running agent handoff]]
- [[Session]]
- [[乐观并发控制 optimistic concurrency control]]
- [[Artifact Schema]]
- [[Loop Engineer]]
