---
id: cm_66fcff60
name: Weight Sharing and Effective Depth
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: now
verification: judge
centrality: 0.089
depth: 2
origin: [neican]
aliases: ["权重共享、有效深度"]
sources: 1
---

# Weight Sharing and Effective Depth

> 循环展开后 token 经过更多次 block application，有效深度变大，参数却不按深度翻倍。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

把循环展开看，同一个 token 会经过更多次 block application，所以有效深度变大；但第 23 次用的仍是第 1 个 block 的权重，第 24 次用第 2 个 block 的权重。参数没有按深度翻倍，计算路径却变长了。这个区别是理解 looped transformer 为什么省参数但不省计算的前提。

## 原文 context

If we were to unroll this computation, we would have 44 transformer block applications. However, compared to a conventional transformer with 44 distinct blocks, the second stack of 22 block applications reuses the weights from the first stack.

> So, the whole idea here is that we increase the effective depth from 22 to 44 block applications without adding another set of transformer weights.

## 掌握证据（做到这些才算会）

- 能算出 22 个 block 跑两遍得到 44 次 block application
- 能说明第 23 次用的仍是第 1 个 block 的权重

## 验收问句

> 在 {{name}} 下，为什么 22 个 block 跑两遍不等于 44 个不同 block？

## 先懂这些（前置 1）

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]] · **hard** — 不懂【Looped Transformer / Recurrent Depth】，就算不出「循环展开后 token 经历更多次 block application、有效深度变大而参数不按深度翻倍」这笔账。

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`权重共享、有效深度`

## 反链

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]]
