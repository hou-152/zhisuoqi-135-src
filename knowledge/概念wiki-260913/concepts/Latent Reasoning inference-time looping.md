---
id: cm_68fd0bbe
name: Latent Reasoning
nameEn: inference-time looping
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.089
depth: 2
origin: [neican]
aliases: ["inference-time looping"]
sources: 1
---

# Latent Reasoning · inference-time looping

> Latent reasoning 是推理时多跑循环、把计算放在内部的一种用法，但仍可生成文本 CoT，不等于隐藏推理。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

Latent reasoning 是 looped transformer 的一种推理时用法：多跑循环，让每个输出 token 前有更多内部计算，而不必全部写成外部 CoT。但它仍可生成文本 CoT，所以它不是“隐藏推理”的同义词，而是内部计算与外部 trace 分工的一种变体。

## 原文 context

Related to the Universal Transformer, the 2025 *Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach* paper studies how a model can use additional loops at inference time.

> However, while the title of the paper mentions “latent reasoning”, the model can still generate a textual chain of thought. Looping just gives it additional computation before each output token.

## 掌握证据（做到这些才算会）

- 能说出 latent reasoning 是在推理时用额外循环换取更多内部计算
- 能澄清它不是'隐藏推理'的同义词，因为模型仍可生成文本思维链

## 验收问句

> {{name}} 与'隐藏推理'的区别在哪里？

## 先懂这些（前置 1）

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]] · **hard** — 不懂【Looped Transformer / Recurrent Depth】，就无法理解 latent reasoning「推理时多跑循环、把计算放在内部」具体是在做什么。

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`inference-time looping`

## 反链

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]]
