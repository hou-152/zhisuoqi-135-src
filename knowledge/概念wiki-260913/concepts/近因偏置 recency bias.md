---
id: cm_0f3d389d
name: 近因偏置
nameEn: recency bias
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [context]
aliases: ["recency bias"]
sources: 1
---

# 近因偏置 · recency bias

> 模型更善于使用出现在输入上下文最末尾的相关信息，这是位置效应 U 型曲线的右半边。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

刚说完的话记得最牢。挨着问题最近的那段材料，模型用得最顺手。

## 原文 context

U 型曲线的右半边——模型更善于使用出现在输入上下文最末尾的相关信息。既有研究早就发现未做指令微调的模型偏向近期 token，本文把它放回位置效应的完整图景里。

## 掌握证据（做到这些才算会）

- 能画出或描述上下文位置效应的 U 型曲线
- 能把关键指令放到末尾以提升利用率

## 验收问句

> {{name}} 提示关键信息该放在上下文哪里？

## 懂了它才能懂（解锁 1）

- [[滑动窗口]] — 不懂【近因偏置】说明末尾信息最好用，就做不了【滑动窗口】中「给最近若干词留 VIP 通道」的设计

## 相关

- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172

## 别名

`recency bias`

## 反链

- [[迷失在中间 lost in the middle]]
- [[滑动窗口]]
- [[首因偏置 primacy bias]]
- [[U 型性能曲线]]
