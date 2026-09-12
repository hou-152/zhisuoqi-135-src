---
id: cm_7fdc01a5
name: Harness level feature
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Harness level feature

> 模型开箱做不到、必须由 harness 提供的能力：跨交互持久状态、执行代码、访问实时知识、搭环境装依赖。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

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

- [[Harness]] · **hard** — 不懂【Harness】，就做不了判断哪些能力属于 Harness level feature

## 懂了它才能懂（解锁 1）

- [[Harness Thickness]] — 先知道模型开箱缺什么，才能讨论多少逻辑放 harness。

## 相关

- [[stateless]] · related-to（audit） — harness 级能力多源于模型能力缺口，只有'跨交互持久状态'一项靠无状态对照，不构成整体前提。
- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[model-native harness]] · related-to（audit） — 只需对模型能力边界有大致认知即可，harness level feature 的完整清单不是理解 model-native harness 的必需前置。
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[Harness]]
- [[stateless]]
- [[model-native harness]]
- [[Agent = Model + Harness]]
- [[Harness Thickness]]
