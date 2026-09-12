---
id: cm_143bc730
name: 「垃圾回收」型 agent
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# 「垃圾回收」型 agent

> harness 的第三类组件：周期性运行的 agent，专找文档不一致与架构约束违规，对抗熵增腐化。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

软件不会自己变好，只会自己变乱。这类 agent 相当于给代码库雇了个巡道工：不产出新功能，只在后台不断把跑偏的地方拨回来，让熵增的速度慢于修复的速度。

## 原文 context

harness 的第三类组件，周期性运行的 agent，专找文档不一致与架构约束违规，用作者的话说是在 fighting entropy and decay。

## 掌握证据（做到这些才算会）

- 能说出它周期性运行而非随任务触发的特点
- 能列出它要扫的两类目标：文档不一致与架构违规

## 验收问句

> 你能否配置一个 {{name}} 定期扫出文档与架构的不一致？

## 先懂这些（前置 1）

- [[架构约束的确定性执行]] · **soft** — 约束没写成 linter 与结构性测试，GC agent 就没有可对照的违规判据去巡检

## 相关

- [[无手打代码 no manually typed code at all]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-01

## 出场

- Harness Engineering ｜ 《Martin Fowler 为「harness 工程」站台：Thoughtworks 的一线笔记》 ｜ https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
## 反链

- [[Harness]]
- [[上下文工程 context engineering]]
- [[架构约束的确定性执行]]
- [[无手打代码 no manually typed code at all]]
