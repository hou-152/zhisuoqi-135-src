---
id: cm_2b232258
name: 模糊与确定性解耦范式
nameEn: Fuzzy-Deterministic split
type: CONCEPTUAL
subject: AI 内参 260912
domain: memory-retrieval
learningStage: now
verification: judge
centrality: 0.072
depth: 1
origin: [neican]
aliases: ["Fuzzy-Deterministic split"]
sources: 1
---

# 模糊与确定性解耦范式 · Fuzzy-Deterministic split

> 把问题拆成两半：LLM 负责把模糊非结构化输入转成结构化事实，确定性引擎负责状态推导与一致性。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

模型擅长处理非结构化、充满噪音的“模糊”输入（如阅读源码、解析调试器输出），但极不擅长做长程确定性状态推导。该范式让 LLM 专心把输入翻译成结构化事实，状态推导与一致性维护全权交给确定性的 Datalog 引擎。

## 原文 context

The basic idea is that an LLM should not necessarily be responsible for maintaining its own knowledge. Instead, I split the problem into two parts.

## 掌握证据（做到这些才算会）

- 能指出 LLM 擅长模糊输入、不擅长长程确定性状态推导
- 能说明模糊层与确定性层各自承担什么

## 验收问句

> {{name}} 把职责如何在 LLM 与确定性引擎之间切分？

## 先懂这些（前置 1）

- [[状态维护型记忆 State-maintaining memory vs. Conversational memory]] · **hard** — 不懂状态维护型记忆，就做不了模糊与确定性解耦中确定性引擎负责的状态推导与一致性维护。

## 出场

- AI 内参 260912 ｜ 《Some things should probably stay fuzzy》 ｜ https://pwning.systems/posts/llm-memory-program-analysis/

## 别名

`Fuzzy-Deterministic split`

## 反链

- [[状态维护型记忆 State-maintaining memory vs. Conversational memory]]
