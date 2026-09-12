---
id: cm_f62b6821
name: 空间 Scalability / Spatial Scalability
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.067
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 空间 Scalability / Spatial Scalability

> 判断能否通过投入 10 倍计算获得 10 倍有意义吞吐量。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

让几百个 agent 同时干活而不互相踩脚。核心难点是协调——共享状态导致锁竞争，集中式规划导致瓶颈。Cursor 的解法是递归 Planner-Worker 架构：Worker 完全隔离、各自独立副本，信息严格向上流动，让并行度真正线性扩展。

## 原文 context

能否通过投入 10x 计算获得 10x 有意义吞吐量？

## 掌握证据（做到这些才算会）

- 能对某系统判断投入 10x 算力是否换来 10x 有意义产出
- 能区分原始算力增长与有意义吞吐量

## 验收问句

> {{name}}问的是哪两个量之间的比例？

## 懂了它才能懂（解锁 2）

- [[单用户假设的失效]] — 该失效本质是空间扩展性判据下的瓶颈暴露。
- [[反脆弱]] — 讨论并行 agent 失败率需先懂空间扩展性。

## 相关

- [[交互 Scalability Interaction Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[方向漂移 Direction Drift]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[自评失真 Self-evaluation Distortion]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[递归 Planner-Worker 架构]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Symphony]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 组件生命周期]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Context Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Generative Kernel]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[时间 Scalability Temporal Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1

## 出场

- Harness Engineering ｜ 《Harness Engineering 三个 Scaling 维度的统一框架》 ｜ https://yage.ai/share/harness-engineering-scalability-20260330.html
## 反链

- [[Symphony]]
- [[递归 Planner-Worker 架构]]
- [[时间 Scalability Temporal Scalability]]
- [[自评失真 Self-evaluation Distortion]]
- [[Context Infrastructure]]
- [[单用户假设的失效]]
- [[反脆弱]]
- [[方向漂移 Direction Drift]]
- [[交互 Scalability Interaction Scalability]]
- [[Generative Kernel]]
- [[Harness 组件生命周期]]
