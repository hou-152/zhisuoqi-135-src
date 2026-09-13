---
id: cm_602ca158
name: Looped Transformer / Recurrent Depth
nameEn: looped transformer, recurrent depth
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: now
verification: judge
centrality: 0.399
depth: 1
origin: [neican]
aliases: ["looped transformer, recurrent depth"]
sources: 1
---

# Looped Transformer / Recurrent Depth · looped transformer, recurrent depth

> 让中间表示多次通过同一批 transformer blocks，权重在多次循环间保持不变。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.399

## 费曼一下

它不是把模型做成更多不同的层，而是让同一批 transformer blocks 被反复使用：中间表示绕回 stack 再走一遍。这样模型的有效计算深度增加，但权重不随循环次数增加。它是文章讨论 Astra 架构传闻和隐藏推理争议的中心机制。

## 原文 context

A Looped Transformer is essentially an architectural tweak, with the main idea being to pass the intermediate representations through the same transformer blocks multiple times (instead of just once). Compared to just adding more blocks, the “trick” here is that the weights stay the same across these passes.

## 掌握证据（做到这些才算会）

- 能说明它与“增加更多不同 block”的区别
- 能解释为何有效计算深度增加而权重数不增加

## 验收问句

> {{name}} 与单纯堆更多 block 的关键差别是什么？

## 先懂这些（前置 1）

- [[Transformer Block、Stack、Block Application transformer block, stack, block applic]] · **hard** — 不懂【Transformer Block、Stack、Block Application】，就无法说清「让中间表示多次通过同一批 blocks」到底重复的是什么——循环次数就是 block application 的次数。

## 懂了它才能懂（解锁 6）

- [[Weight Sharing and Effective Depth]] — 不懂【Looped Transformer / Recurrent Depth】，就算不出「循环展开后 token 经历更多次 block application、有效深度变大而参数不按深度翻倍」这笔账。
- [[Looping Costs：参数、计算与 KV Cache looping costs]] — 不懂【Looped Transformer / Recurrent Depth】，就分不清循环省下的是不同 block 的权重参数、而不省前向反向计算，也想不到二次进 block 的 keys/values 不同、需分开缓存。
- [[Adaptive Halting adaptive halting, halting probability]] — 不懂【Looped Transformer / Recurrent Depth】，就无法定义「累积 halting probability 到阈值即停、并用最大循环数兜底」停的到底是哪个循环。
- [[Per-token Routing：Expert-choice vs Token-choice Mixture-of-Recursions, routing]] — 不懂【Looped Transformer / Recurrent Depth】，就无法理解 router 决定的「这个 token 过几次共享 stack」是在决定什么。
- [[RNN Recurrence vs Looped Transformer Depth Recurrence]] — 不懂【Looped Transformer / Recurrent Depth】，就无法把「沿架构深度复用权重」与 RNN「沿时间步、以 hidden state 传递来复用权重」对照起来。
- [[Latent Reasoning inference-time looping]] — 不懂【Looped Transformer / Recurrent Depth】，就无法理解 latent reasoning「推理时多跑循环、把计算放在内部」具体是在做什么。

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`looped transformer, recurrent depth`

## 反链

- [[Looping Costs：参数、计算与 KV Cache looping costs]]
- [[Per-token Routing：Expert-choice vs Token-choice Mixture-of-Recursions, routing]]
- [[Transformer Block、Stack、Block Application transformer block, stack, block applic]]
- [[Adaptive Halting adaptive halting, halting probability]]
- [[Latent Reasoning inference-time looping]]
- [[RNN Recurrence vs Looped Transformer Depth Recurrence]]
- [[Weight Sharing and Effective Depth]]
