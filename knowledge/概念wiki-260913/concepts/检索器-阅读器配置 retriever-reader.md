---
id: cm_5caaad9a
name: 检索器-阅读器配置
nameEn: retriever-reader
type: REPRESENTATIONAL
subject: Context Engineering
domain: memory-retrieval
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["retriever-reader"]
sources: 1
---

# 检索器-阅读器配置 · retriever-reader

> 开放域问答标准配置：检索系统取回前 k 篇文档，语言模型作为阅读器据此作答。

**领域** memory-retrieval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

一个负责找资料，一个负责答题。这项研究测的是：找回来的资料变多以后，答题的那个到底还能不能吃得下。

## 原文 context

开放域问答的标准做法——检索系统取回前 k 篇文档，语言模型作为阅读器基于这些文档作答。本文用它做了"更多上下文是否总是更好"的案例研究。

## 掌握证据（做到这些才算会）

- 能画出检索器与阅读器两段流程
- 能说明它被用来检验更多上下文是否更好

## 验收问句

> 你能用 {{name}} 搭一个能跑的开放域问答流程吗？

## 相关

- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172

## 别名

`retriever-reader`

## 反链

- [[迷失在中间 lost in the middle]]
- [[首因偏置 primacy bias]]
- [[U 型性能曲线]]
