---
id: cm_307d9aaf
name: 递归 Planner-Worker 架构
type: REPRESENTATIONAL
subject: Harness Engineering
domain: multi-agent
learningStage: now
verification: use
centrality: 0.067
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# 递归 Planner-Worker 架构

> 根 Planner 拥有全项目范围并按需递归生成子 Planner；Worker 在各自 repo 副本上工作，完成后 handoff 上交。

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

Cursor 在四次失败后找到的最终架构。核心思想是「分治法」的工程实现：规划可以递归拆分（避免单一规划者成瓶颈），执行完全隔离（消除锁竞争），质量接受小幅损耗（让错误被自然修复而非集中审查）。这是让并行 agent 数量线性扩展的关键。

## 原文 context

根 Planner 拥有整个项目范围，范围过大时生成子 Planner，递归进行。Worker 在自己的 repo 副本上独立工作，完成后写 handoff 提交给 Planner。Worker 之间互不感知，信息严格向上流动。

## 掌握证据（做到这些才算会）

- 能画出 Planner 递归分叉与 Worker 独立副本的结构
- 能说明 Worker 互不感知、信息严格向上流动

## 验收问句

> {{name}} 能画出并落地递归 Planner-Worker 的分工吗？

## 先懂这些（前置 2）

- [[Planner–Worker 角色分离]] · **hard** — 该架构就是 planner/worker 分离的递归扩展，不懂角色分离就没有原型
- [[handoff 交接]] · **hard** — worker 上交结果靠 handoff，机制不懂则架构无法运转

## 相关

- [[时间 Scalability Temporal Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[空间 Scalability Spatial Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1

## 出场

- Harness Engineering ｜ 《Harness Engineering 三个 Scaling 维度的统一框架》 ｜ https://yage.ai/share/harness-engineering-scalability-20260330.html
## 反链

- [[Harness 工程 Harness Engineering]]
- [[Planner–Worker 角色分离]]
- [[handoff 交接]]
- [[空间 Scalability Spatial Scalability]]
- [[时间 Scalability Temporal Scalability]]
