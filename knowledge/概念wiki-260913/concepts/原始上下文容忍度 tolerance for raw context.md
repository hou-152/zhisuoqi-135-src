---
id: cm_91d3545d
name: 原始上下文容忍度
nameEn: tolerance for raw context
type: CONCEPTUAL
subject: Context Engineering
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["tolerance for raw context"]
sources: 1
---

# 原始上下文容忍度 · tolerance for raw context

> 论文提出的智能度量：智能约等于类人度，而类人度看能消化多高熵的原始输入——1.0 吃结构化信号，2.0 直接吃文本图像视频。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

判断一个系统聪明不聪明，看它能不能直接吃"生的"东西。要你切好摆盘才吃的是弱的，端上一堆乱七八糟也能吃的是强的。

## 原文 context

论文提出的智能度量：在达到人类级智能之前，系统的智能主要由它的"类人度"决定，而类人度最好的衡量方式是它能消化多高熵的原始输入。1.0 只能吃 GPS 坐标、时间、预定义状态这类简单结构化信号；2.0 能吃自由文本、图像、视频这类接近人类自然表达的信号，因此上下文可以以原生形态直接摄入，无需重度预处理。

## 掌握证据（做到这些才算会）

- 能区分 1.0 与 2.0 各自可消化的输入类型
- 能解释为何高熵原始输入可直接摄入而无需重度预处理

## 验收问句

> 按{{name}}，什么样的输入可以直接进上下文而无需预处理？

## 相关

- [[熵减 entropy reduction]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文 context]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-01

## 出场

- Context Engineering ｜ 《论文《上下文工程 2.0》：给这门手艺补上它自己的上下文》 ｜ https://arxiv.org/pdf/2510.26493

## 别名

`tolerance for raw context`

## 反链

- [[上下文工程 context engineering]]
- [[上下文 context]]
- [[熵减 entropy reduction]]
