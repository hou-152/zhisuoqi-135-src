---
id: cm_963f0df3
name: Compute-Matched Looped Transformer
nameEn: SMELT
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: model-training
learningStage: deep-dive
verification: accept
centrality: 0.107
depth: 3
origin: [neican]
aliases: ["SMELT"]
sources: 1
---

# Compute-Matched Looped Transformer · SMELT

> SMELT 在相同每 token 计算、相同非嵌入参数与 KV cache 条件下比较 looped 与传统 transformer。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.107

## 费曼一下

SMELT 把比较条件收紧到相同每 token 计算、相同非嵌入参数、相同 KV cache，再比较 looped/MoE 与传统 transformer。在这个公平比较下，looped 版仍可用更少训练计算达到同样 validation loss。这是作者判断 looped transformer 值得的关键证据。

## 原文 context

What happens if we compare looped and conventional transformers with approximately the same compute per token, total non-embedding parameters, and KV cache requirements?

> ... the researchers estimate that SMELT requires about 6.8-18% less training compute to reach the same validation loss within the studied compute range.

> So, this answers the question of whether looped transformers are worth it computationally: Yes! They give us a slightly better model when using the same compute budget.

## 掌握证据（做到这些才算会）

- 能列出比较所收紧的三个条件：每 token 计算、非嵌入参数量、KV cache
- 能说出研究估计 looped 版少用约 6.8–18% 训练计算即达到同等 validation loss

## 验收问句

> {{name}} 为了让 looped 与传统 transformer 的比较公平，控制了哪几个变量？

## 先懂这些（前置 1）

- [[Looping Costs：参数、计算与 KV Cache looping costs]] · **hard** — 不懂【Looping Costs：参数、计算与 KV Cache】，就没法设定并解释 SMELT 的对照条件——相同每 token 计算与相同 KV cache 究竟怎么算。

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`SMELT`

## 反链

- [[Looping Costs：参数、计算与 KV Cache looping costs]]
