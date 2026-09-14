---
id: cm_64cf3dd2
name: 特定领域架构
nameEn: DSA
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["DSA"]
sources: 1
---

# 特定领域架构 · DSA

> 只为某类工作负载定制的芯片架构，追求通用 CPU 之外的量级收益

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

DSA 指不为通用计算、只为某一类工作负载定制的芯片架构。当通用 CPU 的单线程性能年增长从 52% 跌到 3%，专用化反而能换来数量级收益，TPU v1 就是他们举的在产例子。它是全文的前提：如今数十种在研架构（GPU、TPU、LPU、NPU、晶圆级引擎、光子计算等）正是这个预言的展开，文章要比较的是其中真正部署了的几家。

## 原文 context

该架构已投入生产：在神经网络推理方面，其吞吐量是CPU的29倍，能效提高了80倍。最后他们预测：***“未来十年将迎来计算机架构的寒武纪式爆发。”***

## 掌握证据（做到这些才算会）

- 能举出文中在产的 DSA 实例及其吞吐与能效数字
- 能说明通用单线程性能停滞与专用化的关系

## 验收问句

> {{name}} 为什么在通用性能停滞时反而更划算？

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`DSA`
