---
id: cm_9654c780
name: steering
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# steering

> 用户在 agent 运行中途发来新消息时的介入问题，目前仍无优雅解法

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

你正在给人干活，对方半路改口。现在的做法是把手上的活全扔掉重新开始——不会错，但浪费。怎么让人「边干边听改口」，还没有好答案。

## 原文 context

作者明确标记的**未解问题**。用户在 agent 运行中途发来新消息时该怎么办？当前方案是 singleton 取消当前 run、带最新消息重启，代价是「任何在途的工作都丢失了」，新 run 从持久化的会话状态接上但「并不无缝」。这是他们正在积极探索的领域。

## 掌握证据（做到这些才算会）

- 能说明取消重启方案丢失在途工作的代价
- 能指出新 run 接上持久状态为何并不无缝

## 验收问句

> {{name}} 现在用什么方案，代价是什么？

## 先懂这些（前置 1）

- [[agent 循环]] · **hard** — 不懂【agent 循环】，就做不了【steering】的“在 agent 运行中途介入”。

## 相关

- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[Harness]]
- [[持久化执行 durable execution]]
- [[agent 循环]]
- [[harness 与 framework 的分野]]
