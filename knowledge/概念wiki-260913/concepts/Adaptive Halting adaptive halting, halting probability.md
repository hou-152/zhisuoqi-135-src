---
id: cm_2ca4e836
name: Adaptive Halting
nameEn: adaptive halting, halting probability
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.089
depth: 2
origin: [neican]
aliases: ["adaptive halting, halting probability"]
sources: 1
---

# Adaptive Halting · adaptive halting, halting probability

> 按学习到的 halting probability 累积到阈值即停止，并用最大循环数兜底，把额外计算给更需要的 token。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

不是所有 token 都固定跑同样次数。模型用学习到的 halting probability 累积到阈值就停止，并用最大循环数兜底，从而把额外计算分配给更需要它的 token。它回答了“循环次数能不能不是固定值”的问题。

## 原文 context

the paper also explores adaptive halting. For example, a token at a particular position may only go through one or two loops. Another may go through three or four loops, and so on. This gives the model flexibility to allocate the compute to those tokens that benefit from extra computation.

> Here, the model uses a small, trained function that outputs a so-called halting probability for each position at each step. It adds up these probabilities over these successive loops and then stops looping at a given position once the sum exceeds a threshold value. In addition, a maximum loop count also limits the computation just in case.

## 掌握证据（做到这些才算会）

- 能说出用 halting probability 决定何时停止
- 能解释为什么不同 token 的循环次数不同

## 验收问句

> {{name}} 靠什么决定一个 token 要不要再循环一次？

## 先懂这些（前置 1）

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]] · **hard** — 不懂【Looped Transformer / Recurrent Depth】，就无法定义「累积 halting probability 到阈值即停、并用最大循环数兜底」停的到底是哪个循环。

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`adaptive halting, halting probability`

## 反链

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]]
