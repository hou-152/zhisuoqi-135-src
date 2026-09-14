---
id: cm_778efcce
name: GEMM 与 GEMV
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: when-needed
verification: judge
centrality: 0.144
depth: 1
origin: [neican]
aliases: ["训练/预填充对解码"]
sources: 1
---

# GEMM 与 GEMV

> 训练与预填充是矩阵乘矩阵、计算密集，解码退化成矩阵乘向量、带宽受限

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

GEMM 是大矩阵乘大矩阵，GEMV 是矩阵只乘一个向量。训练和预填充把几千个词元同时堆上同一份权重，每一层都是 GEMM、计算密集；解码一次只出一个词元，矩阵乘退化成 GEMV，算术强度掉几个数量级，而且每个词元都要读完全部权重和 KV 缓存。这对概念承重，因为它解释了推理系统为什么靠连续批处理、推测解码、多词元预测把 GEMV 拼回 GEMM，为什么解码是纯带宽问题，也解释了 Cerebras 和 Groq 为什么都宣称自己为解码而生、而训练要另想办法。

## 原文 context

训练和预填充阶段都会将大量词元堆叠到同一个权重矩阵上

生成一个词元需要完整遍历模型中的每个权重，以及完整读取键值缓存以获取注意力信息。

## 掌握证据（做到这些才算会）

- 能说明解码为何每词元都要读完权重与 KV 缓存
- 能解释连续批处理为何要把 GEMV 拼回 GEMM

## 验收问句

> {{name}} 中，解码阶段为什么是纯带宽问题？

## 先懂这些（前置 1）

- [[内存墙 memory wall]] · **soft** — 不懂【内存墙】（算力指数增长而内存带宽跟不上、架构问题变成如何让数据靠近计算），就做不了【GEMM 与 GEMV】里「同一颗芯片上预填充计算密集、解码带宽受限」的对照判断

## 懂了它才能懂（解锁 1）

- [[脉动阵列与权重驻留 systolic array, weight-stationary]] — 不懂【GEMM 与 GEMV】（训练与预填充是矩阵乘矩阵、计算密集，解码退化成矩阵乘向量、带宽受限），就做不了【脉动阵列与权重驻留】里阵列形状与驻留策略的取舍——是按计算密集的 GEMM 堆乘加，还是按带宽受限的 GEMV 省访存，判据正来自这里

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`训练/预填充对解码`

## 反链

- [[脉动阵列与权重驻留 systolic array, weight-stationary]]
- [[内存墙 memory wall]]
