---
id: cm_999f2a7c
name: GQA
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 3
origin: [notion]
aliases: ["Grouped Query Attention", "分组查询注意力"]
sources: 1
---

# GQA

> 多个查询 Q 共享同一对 K/V，如 32 个 Q 分 8 组共用 KV，KV 显存降为 1/4，Q 的提问独立性不变。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 原文 context

<mention-page url="https://app.notion.com/p/dd2679b108ff8334b27601ede39a4a2e"/>
> 不再让每个查询Q都有独立对应的标签K和含义V，而是让**多个查询Q共享同一对标签K和含义V**……比如把32个查询Q分成8组，每组4个查询Q共用同一对KV。
**费曼一下**：把多头注意力的 KV 共享化——多个 Q 共用一对 K/V，KV 显存直接降为 1/4，但 Q 的提问独立性不变。LLaMA 2/3、Mistral、Gemma 都用它。

## 掌握证据（做到这些才算会）

- 能说明 GQA 与 MHA、MQA 的区别
- 能算出 32 个 Q 分 8 组时 KV 显存降为 1/4

## 验收问句

> {{name}} 下 32 个查询分成 8 组，KV 显存变成原来的几分之几？

## 先懂这些（前置 1）

- [[多头注意力]] · **hard** — GQA按组共享KV，不懂多头中Q/KV的分组关系就无从理解。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/GQA-b1a679b108ff825b806e81ae0a4446d0

## 别名

`Grouped Query Attention`、`分组查询注意力`

## 反链

- [[多头注意力]]
