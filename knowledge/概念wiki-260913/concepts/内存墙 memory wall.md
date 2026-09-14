---
id: cm_f155c3b7
name: 内存墙
nameEn: memory wall
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [neican]
aliases: ["memory wall"]
sources: 1
---

# 内存墙 · memory wall

> 算力指数增长而内存带宽跟不上，架构问题变成如何让数据靠近计算

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

内存墙是算力与喂料速度的裂缝：计算涨得指数级，内存带宽跟不上，于是架构问题不再只是算多快，而是如何把计算任务搬到数据够近、矩阵乘够快的地方。它是承重中的承重：后文四个问题（数据住哪、怎么搬到计算单元、计算单元长什么样、芯片怎么互联）都是对它的回答，六家方案的全部差异都从这里长出来。Cerebras 更是把整家公司建立在对它的另一种诊断上（墙是切晶圆切出来的）。

## 原文 context

这就是所谓的***内存墙***：计算能力呈指数级增长，而内存带宽却没有相应提升。

## 掌握证据（做到这些才算会）

- 能复述算力与带宽增长的不对称
- 能指出后文四个架构问题都由它派生

## 验收问句

> {{name}} 由哪两条曲线的不对称造成？

## 懂了它才能懂（解锁 1）

- [[GEMM 与 GEMV]] — 不懂【内存墙】（算力指数增长而内存带宽跟不上、架构问题变成如何让数据靠近计算），就做不了【GEMM 与 GEMV】里「同一颗芯片上预填充计算密集、解码带宽受限」的对照判断

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`memory wall`

## 反链

- [[GEMM 与 GEMV]]
