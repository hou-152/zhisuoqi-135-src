---
id: cm_6b151e00
name: 权重流
nameEn: weight streaming
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: deep-dive
verification: judge
centrality: 0.089
depth: 1
origin: [neican]
aliases: ["weight streaming"]
sources: 1
---

# 权重流 · weight streaming

> 晶圆级引擎让激活驻留片上 SRAM、权重从 MemoryX 逐层流入，模型大小与晶圆内存解耦。

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

别家训练是权重驻留、激活流过；晶圆级引擎反着来——激活钉在片上 SRAM，权重从旁边的 MemoryX（DRAM+闪存一体机）逐层流进来、触发乘加、流走。它解决了两个难点：模型大小与晶圆内存解耦（由 MemoryX 决定，44 GB 只管激活和批次）；集群扩展坍缩成纯数据并行——GPU 训练那套并行策略组合在 Cerebras 上没有对应页。代价是训练规模证据薄弱（最大披露集群 64 台、最大模型 70B），而推理时这套玩法在算术上致命，只能反过来把权重泊进 SRAM。

## 原文 context

on a GPU or TPU, weights are resident and activations stream through; on a WSE, ***activations are resident and weights stream through***

The wafer never stores weights, "not even temporarily"

## 掌握证据（做到这些才算会）

- 能复述与 GPU/TPU 相反的驻留方向：激活驻留、权重流过，晶圆从不暂存权重
- 能指出集群扩展坍缩成纯数据并行，并说出其训练规模证据薄弱（最大披露 64 台、70B）

## 验收问句

> {{name}} 把模型大小的上限交给了什么？

## 先懂这些（前置 1）

- [[软件管理暂存器 software-managed scratchpad，no caches]] · **hard** — 不懂【软件管理暂存器】，就做不了【权重流】里「激活常驻片上 SRAM、权重逐层从 MemoryX 流入」这件事——激活要长住不走，靠的正是无逐出、无一致性、由编译器指定位置的片上暂存器

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`weight streaming`

## 反链

- [[软件管理暂存器 software-managed scratchpad，no caches]]
