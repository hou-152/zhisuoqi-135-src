---
id: cm_fa24d6ae
name: RNN Recurrence vs Looped Transformer Depth Recurrence
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.089
depth: 2
origin: [neican]
aliases: ["RNN 对比"]
sources: 1
---

# RNN Recurrence vs Looped Transformer Depth Recurrence

> 两者都复用权重：RNN 沿时间步并以 hidden state 传递，looped transformer 沿架构深度复用。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

两者都复用权重，但复用轴不同：RNN 沿时间步复用，把 hidden state 从上一个 token 带到下一个；looped transformer 沿架构深度复用，同一个 token 的表示多次穿过 transformer stack，token 间仍靠 attention 通信。这个对比防止把 recurrent depth 误当成 RNN 回归。

## 原文 context

The main distinction is that RNNs reuse their weights across time steps. That is, the hidden state is carried forward from one token to the next. In the looped transformer, the looping of a token is across the architecture depth.

> In a looped transformer, the intermediate representation of a given token goes through the transformer stack multiple times. The model still uses attention to pass information between tokens.

## 掌握证据（做到这些才算会）

- 能指出复用轴不同（时间步 vs 深度）
- 能说明为何不该把 recurrent depth 当成 RNN 回归

## 验收问句

> {{name}} 中 RNN 与 looped transformer 各沿哪个轴复用权重？

## 先懂这些（前置 1）

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]] · **hard** — 不懂【Looped Transformer / Recurrent Depth】，就无法把「沿架构深度复用权重」与 RNN「沿时间步、以 hidden state 传递来复用权重」对照起来。

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`RNN 对比`

## 反链

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]]
