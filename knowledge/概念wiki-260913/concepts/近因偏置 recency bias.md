---
id: cm_0f3d389d
name: 近因偏置
nameEn: recency bias
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["recency bias"]
sources: 1
---

# 近因偏置 · recency bias

> U 型曲线的右半边：模型更善用出现在输入上下文最末尾的信息，未做指令微调的模型尤甚。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

刚说完的话记得最牢。挨着问题最近的那段材料，模型用得最顺手。

## 原文 context

U 型曲线的右半边——模型更善于使用出现在输入上下文最末尾的相关信息。既有研究早就发现未做指令微调的模型偏向近期 token，本文把它放回位置效应的完整图景里。

## 掌握证据（做到这些才算会）

- 能描述位置效应的 U 型曲线形状
- 能据此把最关键信息放到上下文末尾

## 验收问句

> 你会怎样利用{{name}}来安排上下文里的关键信息？

## 相关

- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172

## 别名

`recency bias`

## 反链

- [[迷失在中间 lost in the middle]]
- [[首因偏置 primacy bias]]
- [[U 型性能曲线]]
