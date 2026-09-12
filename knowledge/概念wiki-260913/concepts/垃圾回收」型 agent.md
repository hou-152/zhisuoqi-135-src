---
id: cm_143bc730
name: 垃圾回收」型 agent
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.045
depth: 6
origin: [harness]
aliases: []
sources: 1
---

# 垃圾回收」型 agent

> harness 中周期性运行的 agent，专找文档不一致与架构约束违规，对抗系统的熵增与腐化。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

软件不会自己变好，只会自己变乱。这类 agent 相当于给代码库雇了个巡道工：不产出新功能，只在后台不断把跑偏的地方拨回来，让熵增的速度慢于修复的速度。

## 原文 context

harness 的第三类组件，周期性运行的 agent，专找文档不一致与架构约束违规，用作者的话说是在 fighting entropy and decay。

## 掌握证据（做到这些才算会）

- 能说明它为何要周期性而非一次性运行
- 能举出它应检查的两类问题：文档不一致与架构违规

## 验收问句

> {{name}} 负责检查什么，为什么必须周期性跑？

## 先懂这些（前置 1）

- [[Agent = Model + Harness]] · **soft** — 它是周期性运行的 agent，先懂 agent 由模型加 harness 构成。

## 相关

- [[无手打代码 no manually typed code at all]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-01

## 出场

- Harness Engineering ｜ 《Martin Fowler 为「harness 工程」站台：Thoughtworks 的一线笔记》 ｜ https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
## 反链

- [[Harness]]
- [[Agent = Model + Harness]]
- [[无手打代码 no manually typed code at all]]
