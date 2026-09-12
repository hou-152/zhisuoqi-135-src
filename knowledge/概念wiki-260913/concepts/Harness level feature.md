---
id: cm_7fdc01a5
name: Harness level feature
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.092
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Harness level feature

> 模型开箱做不到、必须由 harness 提供的能力：跨交互持久状态、执行代码、访问实时知识、搭环境装依赖。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.092

## 费曼一下

一个判断归属的分诊标准。遇到 agent 做不到的事，先问它属于「模型不够聪明」还是「没人给它这个能力」。绝大多数看起来像智力问题的失败，其实是第二类——那就不该等模型升级，而该动手改框架。

## 原文 context

指模型开箱即用做不到、必须由 harness 提供的能力。作者列举四项：维持跨交互的 durable state、执行代码、访问 realtime knowledge、搭建环境并安装依赖包。

## 掌握证据（做到这些才算会）

- 能完整列出四项框架级能力
- 能判断某项能力是否属于框架级

## 验收问句

> {{name}} 包含哪四项，各自为什么模型开箱做不到？

## 先懂这些（前置 1）

- [[stateless]] · **hard** — 每次调用从空白开始，才需要 harness 提供跨交互持久状态。

## 懂了它才能懂（解锁 2）

- [[Harness Thickness]] — 先知道模型开箱缺什么，才能讨论多少逻辑放 harness。
- [[model-native harness]] — 顺着模型设计的前提是知道模型开箱做不到什么。

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
- [[stateless]]
- [[model-native harness]]
- [[Harness Thickness]]
