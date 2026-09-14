---
id: cm_4f0a2560
name: 光路交换
nameEn: OCS, optical circuit switch
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: deep-dive
verification: judge
centrality: 0.052
depth: 0
origin: [neican]
aliases: ["OCS, optical circuit switch"]
sources: 1
---

# 光路交换 · OCS, optical circuit switch

> 3D-MEMS 微镜阵列的光路交换：开工时选好拓扑跑一周，一个器件同时解决重配、切分与容错。

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.052

## 费曼一下

OCS 是 3D-MEMS 微镜阵列：物理转动微镜，把任意输入光纤接到任意输出。它是电路交换——毫秒级重配置不碍事，因为开工时选好拓扑、一跑一周，下一个任务来了再重配。一个器件坍缩三个问题：按负载重配拓扑（扭曲环面让剖分带宽提升至多 70%）、按需切分子 pod、容错（芯片坏了光路换入备用 cube）。谷歌从机架（Palomar）到数据中心 spine（Apollo，2022 年起全光）用同一个原语，这正是光交换是通用可重构基底这一哲学的实体，也是英伟达没有对应物的部件。

## 原文 context

Tiny mirrors physically rotate to map any input fibre to any output.

pick a topology at job start, run it for a week, then reconfigure for the next workload.

Three problems collapse into one component: topology reconfiguration per workload (twisted tori give up to 70% better bisection), sub-pod slicing on demand, and

## 掌握证据（做到这些才算会）

- 能说明它是电路交换、毫秒级重配置不碍事，按负载重配拓扑可让剖分带宽提升至多 70%
- 能举出从 Palomar 机架到 Apollo 数据中心 spine 用同一原语，并指出英伟达没有对应部件

## 验收问句

> {{name}} 为什么能容忍毫秒级重配置？

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`OCS, optical circuit switch`
