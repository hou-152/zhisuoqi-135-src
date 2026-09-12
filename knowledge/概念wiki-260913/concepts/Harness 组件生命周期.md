---
id: cm_24c4322f
name: Harness 组件生命周期
type: PROCEDURAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.042
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Harness 组件生命周期

> 每个 harness 组件都是对模型能力边界的假设，过期速度各异；做法是逐一移除旧组件、验证质量是否真的下降。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

本文最有方法论价值的洞察。每个 harness 组件（context reset、sprint 分解、evaluator）本质上是在说「模型做不到 X」。但模型在进化，这些假设会过期。正确做法不是无脑叠加新组件，而是定期拆掉旧组件测试——如果质量没下降，说明模型已经补上了那个短板。

## 原文 context

每个 harness 组件都是对当前模型能力边界的一个假设。这些假设有不同的过期速度。关键做法：逐一移除旧组件、测试质量是否真的下降，而不是继续叠加新组件。

## 掌握证据（做到这些才算会）

- 能判断某个组件的假设过期快慢
- 能设计“移除组件后测质量”的验证步骤

## 验收问句

> 你怎么用 {{name}} 判断某个 harness 组件现在还能不能删？

## 懂了它才能懂（解锁 1）

- [[Harness evolution]] — 组件假设会过期，才需要持续演进 harness。

## 相关

- [[时间 Scalability Temporal Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[空间 Scalability Spatial Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1

## 出场

- Harness Engineering ｜ 《Harness Engineering 三个 Scaling 维度的统一框架》 ｜ https://yage.ai/share/harness-engineering-scalability-20260330.html
## 反链

- [[Harness 工程 Harness Engineering]]
- [[Harness evolution]]
- [[空间 Scalability Spatial Scalability]]
- [[时间 Scalability Temporal Scalability]]
