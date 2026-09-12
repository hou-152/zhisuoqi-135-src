---
id: cm_180723ac
name: Engram
type: CONCEPTUAL
subject: AI 概念库
domain: memory-retrieval
learningStage: deep-dive
verification: judge
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["条件记忆模块", "知识查表模块", "conditional memory module"]
sources: 1
---

# Engram

> 给 Transformer 加的原生知识查表模块：能查到的就不去算，先查一下再推理。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

在 Transformer 内部嵌入一张巨大的知识查表，遇到能直接查到的事实就不再算。它把"静态知识检索"从层层推理里抠出来，交给 O(1) 的哈希查表去做。

## 原文 context

> Engram 是给 Transformer 加的一个原生知识查表模块。能查的别算，先查一下。

## 掌握证据（做到这些才算会）

- 能说明查表模块与注意力、FFN 的分工
- 能判断哪些知识适合查表而非参数内计算

## 验收问句

> {{name}} 主张哪类知识不该算而该查？

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Engram-617679b108ff826ca63a81fd81756c7f

## 别名

`条件记忆模块`、`知识查表模块`、`conditional memory module`

## 反链

- [[外包思考，但不外包理解]]
- [[Agent-Native Infrastructure]]
- [[Sensors 与 Actuators]]
