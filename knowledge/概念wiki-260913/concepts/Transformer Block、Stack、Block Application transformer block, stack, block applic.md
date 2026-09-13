---
id: cm_533406a4
name: Transformer Block、Stack、Block Application
nameEn: transformer block, stack, block application
type: LANGUAGE
subject: AI 内参 260912
domain: model-training
learningStage: now
verification: judge
centrality: 0.107
depth: 0
origin: [neican]
aliases: ["transformer block, stack, block application"]
sources: 1
---

# Transformer Block、Stack、Block Application · transformer block, stack, block application

> block 是含注意力与前馈的结构单元，stack 是 block 序列，block application 是输入过一次 block。

**领域** model-training ｜ **类型** LANGUAGE ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.107

## 费曼一下

这三个词是后文数“深度”和“参数”的量尺。block 是基本结构单元；stack 是按顺序排起来的一串 block；block application 是输入过一次 block 这个动作。后文说 Nanbeige 有 22 个 block、跑两遍、得到 44 次 block application，就是用这个单位区分“有多少不同参数”和“实际经过多少次计算”。

## 原文 context

* A **transformer block** is a unit containing attention, a feedforward module, normalization, and shortcut connections. These blocks are often called “transformer layers” in papers.

* A **stack** is a sequence of transformer blocks.

* A **block application** means running an input through a transformer block once.

## 掌握证据（做到这些才算会）

- 能分别说出三个术语指什么
- 能用这套单位复述“22 个 block 跑两遍 = 44 次 block application”

## 验收问句

> 用 {{name}} 这套说法，22 个 block 跑两遍是多少次应用？

## 懂了它才能懂（解锁 1）

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]] — 不懂【Transformer Block、Stack、Block Application】，就无法说清「让中间表示多次通过同一批 blocks」到底重复的是什么——循环次数就是 block application 的次数。

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`transformer block, stack, block application`

## 反链

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]]
