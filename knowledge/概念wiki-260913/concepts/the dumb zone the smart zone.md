---
id: cm_60c1be3b
name: the dumb zone / the smart zone
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.099
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# the dumb zone / the smart zone

> 上下文被工具描述等填充后模型变笨为笨蛋区；把子任务拆给 sub-agents 可让主线程留在聪明区。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.099

## 费曼一下

同一个模型在窗口干净时聪明，在窗口塞满噪音时变笨。这不是两个模型，是同一个模型的两种状态；你的配置决定它待在哪一侧。

## 原文 context

插入过多 MCP 工具会让上下文窗口被工具描述填满，「把你更快地推进笨蛋区」；而把工作拆给 sub-agents，是他们让主线程留在「聪明区」的办法。

## 掌握证据（做到这些才算会）

- 能判断当前会话落在哪个区并给出依据
- 能说出把主线程拉回聪明区的一种具体做法

## 验收问句

> {{name}} 由什么决定，怎么把主线程拉回聪明区？

## 先懂这些（前置 1）

- [[tokens]] · **hard** — 上下文被工具描述填满按 token 计，不懂 token 就无法理解笨蛋区成因。

## 懂了它才能懂（解锁 2）

- [[Tool call offloading]] — 卸载的动机是让主线程不至于掉进笨蛋区。
- [[Skills Hell]] — skill 膨胀填充上下文会让模型掉进笨蛋区，二者互为印证。

## 相关

- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[tokens]]
- [[Tool call offloading]]
- [[Skills Hell]]
- [[configuration problem]]
