---
id: cm_754efbf8
name: Looping Costs：参数、计算与 KV Cache
nameEn: looping costs
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.179
depth: 2
origin: [neican]
aliases: ["looping costs"]
sources: 1
---

# Looping Costs：参数、计算与 KV Cache · looping costs

> 循环省下的是不同 block 的权重参数，不省前向与反向计算；二次进 block 的 keys/values 不同，需分开缓存。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.179

## 费曼一下

循环省下的是不同 block 权重的参数/显存，不省前向和反向计算，也不省 KV cache。因为第二次进 block 时中间状态不同，产生的 keys/values 也不同，必须分开缓存。作者用这个成本边界判断 looped transformer 是否真的划算。

## 原文 context

a model that uses 22 transformer blocks twice has roughly half as many (transformer-block) parameters compared to a model with 44 conventional blocks.

> Of course, reusing the same blocks in a loop still requires computation. More precisely, we pass the intermediate inputs through 44 block applications during the forward pass. And, during training, gradients flow backward through both repetitions of the shared stack. So, compared to using the 22 blocks only once, this adds substantial work. Actually, it’s similarly expensive as having 44 distinct blocks (except the optimizer has fewer distinct parameters to update; backprop still runs through all 44 block applications).

> ... there are no KV cache-related savings either.

> ... the repeated stack of 22 blocks has the same KV cache requirements as a conventional transformer with 44 distinct blocks.

## 掌握证据（做到这些才算会）

- 能列出循环省掉和没省掉的开销
- 能解释为什么 KV cache 不能因循环而复用

## 验收问句

> {{name}} 中哪些开销减少了、哪些没有减少？

## 先懂这些（前置 1）

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]] · **hard** — 不懂【Looped Transformer / Recurrent Depth】，就分不清循环省下的是不同 block 的权重参数、而不省前向反向计算，也想不到二次进 block 的 keys/values 不同、需分开缓存。

## 懂了它才能懂（解锁 1）

- [[Compute-Matched Looped Transformer SMELT]] — 不懂【Looping Costs：参数、计算与 KV Cache】，就没法设定并解释 SMELT 的对照条件——相同每 token 计算与相同 KV cache 究竟怎么算。

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`looping costs`

## 反链

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]]
- [[Compute-Matched Looped Transformer SMELT]]
