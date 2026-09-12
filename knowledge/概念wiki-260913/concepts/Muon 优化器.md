---
id: cm_a9c55d8b
name: Muon 优化器
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: accept
centrality: 0.067
depth: 1
origin: [notion]
aliases: ["Muon optimizer", "Muon"]
sources: 1
---

# Muon 优化器

> 一种基于矩阵几何改造的训练优化器，替代 AdamW，让同等算力下 loss 降得更快更稳。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.067

## 原文 context

<mention-page url="https://app.notion.com/p/e14679b108ff82a79c9781937cfb2880"/>
- **context**：
	> 「混合注意力机制，CSA（压缩稀疏注意力），加 HCA（重度压缩注意力），mHC（流形约束超连接），还有就是那个 Muon 的优化器。」
- **费曼一下**：Muon 是一种新的训练优化器，被 DeepSeek V4 用来替代主流的 AdamW。优化器决定模型在训练过程中怎么「下山」——同样的算力、同样的数据，好的优化器能让 loss 下得更快、更稳。Muon 在矩阵几何上做了改造，让大模型训练在同等算力下走得更远。它是「token efficiency」叙事里另一只看不见的手：注意力机制省的是推理算力，优化器省的是训练算力。

## 掌握证据（做到这些才算会）

- 能说明优化器决定的是训练怎么下山
- 能区分注意力省推理算力、优化器省训练算力

## 验收问句

> {{name}} 相比 AdamW 省的是训练还是推理算力？

## 先懂这些（前置 2）

- [[Q、K、V]] · **soft** — Muon 更新 Transformer 中的矩阵参数，懂 QKV 矩阵更易理解它优化什么。
- [[模型训练与 harness 设计的耦合]] · **soft** — 模型与harness同环迭代的post-training对优化器稳定性与速度要求更高，先懂该回路才懂Muon的诉求。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Muon-df9679b108ff838d8b7d0125e1329d8c

## 别名

`Muon optimizer`、`Muon`

## 反链

- [[模型训练与 harness 设计的耦合]]
- [[Q、K、V]]
