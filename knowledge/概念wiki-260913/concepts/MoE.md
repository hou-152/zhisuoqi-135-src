---
id: cm_63e885ca
name: MoE
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: accept
centrality: 0.045
depth: 1
origin: [notion]
aliases: ["Mixture of Experts", "混合专家", "专家模型"]
sources: 1
---

# MoE

> 把计算稀疏化，每次只激活部分专家，用更少算力换同等能力。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.045

## 费曼一下

经典稀疏 LLM 架构：每个 token 只激活少数几个"专家"前馈网络，所以参数量大但 FLOPs 不大。Engram 与之并列，是稀疏化的另一条轴：

## 原文 context

> MoE 是把计算稀疏化，只激活一部分专家。Engram 是把存储稀疏化，只查一部分条目。两者互补，不冲突。

## 掌握证据（做到这些才算会）

- 能区分 MoE 的计算稀疏与 Engram 的存储稀疏
- 能说明二者互补不冲突的原因

## 验收问句

> {{name}} 稀疏掉的是计算还是存储？

## 先懂这些（前置 1）

- [[Q、K、V]] · **soft** — MoE 在 Transformer 中替换 FFN，懂 QKV 才懂它在计算流里的位置。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/MoE-689679b108ff83c4b8d781363bd41f98

## 别名

`Mixture of Experts`、`混合专家`、`专家模型`

## 反链

- [[Q、K、V]]
