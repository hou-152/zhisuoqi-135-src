---
id: cm_acaf5e0a
name: Reasoning Model and Reasoning Trace / Chain of Thought
nameEn: reasoning model, reasoning trace, chain of thought
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: now
verification: judge
centrality: 0.035
depth: 0
origin: [neican]
aliases: ["reasoning model, reasoning trace, chain of thought"]
sources: 1
---

# Reasoning Model and Reasoning Trace / Chain of Thought · reasoning model, reasoning trace, chain of thought

> 推理模型先逐 token 生成中间文本（reasoning trace / CoT）再给答案，这些步骤起外部 scratch pad 作用。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.035

## 费曼一下

推理模型先逐步生成中间文本 token，再给最终答案；这些中间步骤就是 reasoning trace 或 chain of thought，充当 scratch pad，为最终答案增加外部计算。理解这一点，才能把它和 looped transformer 增加的内部计算对照起来。

## 原文 context

Reasoning models typically generate intermediate steps before producing a final answer. These steps use regular text token (that are optionally hidden from the user in some user interfaces) and called a reasoning trace or chain of thought.

> Note that the model still generates one token at a time, using the prompt and previous tokens as context. So, these intermediate steps work as a scratch pad and add computation before the final answer.

## 掌握证据（做到这些才算会）

- 能说明 reasoning trace 仍是逐 token 生成的文本
- 能解释它为何算额外的外部计算

## 验收问句

> {{name}} 的中间步骤为什么算额外计算，而不是架构上的循环？

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`reasoning model, reasoning trace, chain of thought`
