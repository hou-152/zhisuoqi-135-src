---
id: cm_75ee7205
name: Loop Contract
type: REPRESENTATIONAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: when-needed
verification: use
centrality: 0.126
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Loop Contract

> 每个 loop 目录中的 README 契约，写明 goal、workflow、boundaries、backlog 与 timeline，供 agent 每轮读取。

**领域** loop-autonomy ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

loop contract 像岗位说明书加交接班记录。它告诉 agent：你负责什么、不负责什么、按什么流程做、上次做到哪、现在还有哪些待办。

## 原文 context

每个 loop domain 里有 README 作为 contract，写清 goal、workflow、boundaries、backlog 和 timeline。agent 每次触发时读取 contract，理解这个 loop 的目标和历史，再执行下一轮工作。

## 掌握证据（做到这些才算会）

- 能写出一个 loop contract 的五个字段
- 能说明 agent 每轮触发为何必须先读 contract

## 验收问句

> 你能为一个 loop 写出符合 {{name}} 要求的 README 吗？

## 懂了它才能懂（解锁 2）

- [[循环工程 loop engineering]] — 不懂【Loop Contract】，就做不了【循环工程】的“写流程”。
- [[会话生命周期]] — 不懂【Loop Contract】，就做不了【会话生命周期】的“开工读状态”。

## 相关

- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Loop Engineering]] · related-to（audit） — Loop Contract 只是循环工程落地的实例之一，不懂循环工程也能读懂一份 README 契约，属例子关系，应降级或移除
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[循环工程 loop engineering]]
- [[Agent loop]]
- [[Loop Engineering]]
- [[Loop Engineer]]
- [[会话生命周期]]
