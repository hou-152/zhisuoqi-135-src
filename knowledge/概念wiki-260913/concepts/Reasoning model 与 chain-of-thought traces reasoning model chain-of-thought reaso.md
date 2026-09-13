---
id: cm_5fcd44e5
name: Reasoning model 与 chain-of-thought traces
nameEn: reasoning model / chain-of-thought reasoning
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: now
verification: judge
centrality: 0.089
depth: 0
origin: [neican]
aliases: ["reasoning model / chain-of-thought reasoning"]
sources: 1
---

# Reasoning model 与 chain-of-thought traces · reasoning model / chain-of-thought reasoning

> reasoning model 被训练成先出声思考再给答案，这些思考记成 chain-of-thought traces，是输出而非内部逻辑窗口。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

reasoning model 是被训练成先出声思考再给答案的 LLM；这些出声思考被记录成 chain-of-thought traces。本文的要点是：这些 traces 是 LLM 输出的一部分，不是它内部真实逻辑的透明窗口。它们可能让模型表现更好，但不能直接当作它在策划的证据。

## 原文 context

The LLM in question is a so-called reasoning model; a type of LLM that is tuned to discuss its reasoning before producing a final answer or suggestion.

If you tune a model to “think out loud” before deriving an answer or suggestion, you’re providing the LLM with the ability to temporarily store and use the intermediate computation en route to producing its final response. This can lead to sharper outputs.

## 掌握证据（做到这些才算会）

- 能说明 reasoning model 与普通 LLM 的差别
- 能说明 traces 不能直接当作真实推理的证据

## 验收问句

> {{name}} 能当作模型真实意图的证据吗？为什么？

## 懂了它才能懂（解锁 1）

- [[事后合理化与科幻叙事污染 post-hoc rationalizing sci-fi style narratives]] — 不懂【Reasoning model 与 chain-of-thought traces】是模型先出声生成、属输出的文本，就无法理解为何理由可以是事后编出、与答案无关的合理说辞。

## 出场

- AI 内参 260912 ｜ 《Are We at War with AI Agent “Civilizations”?》 ｜ https://calnewport.com/are-we-at-war-with-ai-agent-civilizations/

## 别名

`reasoning model / chain-of-thought reasoning`

## 反链

- [[事后合理化与科幻叙事污染 post-hoc rationalizing sci-fi style narratives]]
