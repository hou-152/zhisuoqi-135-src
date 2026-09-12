---
id: cm_0767b398
name: N-gram
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: accept
centrality: 0.042
depth: 0
origin: [notion]
aliases: ["N-gram 查表", "N-gram 模型"]
sources: 1
---

# N-gram

> 经典局部依赖语言模型，用 O(1) 复杂度捕捉邻近词之间的关系。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.042

## 费曼一下

把当前 token 和前面几个 token 组成的固定长度片段（N-gram）当作 key，在一张巨大的嵌入表里直接取向量。这是 NLP 时代最古老的统计套路，被现在的大模型借回来当"小抄本"。

## 原文 context

> 既然经典的 N-gram 模型就能用 O(1) 的时间复杂度捕获这些局部依赖，那干脆把这能力直接嵌进 Transformer。

## 掌握证据（做到这些才算会）

- 能说出 N-gram 捕捉的是多长范围内的依赖
- 能解释为何把这能力直接嵌进 Transformer

## 验收问句

> {{name}} 捕捉的是哪一段范围内的依赖？

## 懂了它才能懂（解锁 1）

- [[Logits]] — N-gram 的下一词概率是 logits 的简化前身，先懂它更易理解原始得分。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/N-gram-32a679b108ff83d7813f8158222d153c

## 别名

`N-gram 查表`、`N-gram 模型`

## 反链

- [[Logits]]
