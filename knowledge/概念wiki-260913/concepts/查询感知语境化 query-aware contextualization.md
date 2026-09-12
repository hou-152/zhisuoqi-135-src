---
id: cm_2fd13e0c
name: 查询感知语境化
nameEn: query-aware contextualization
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["query-aware contextualization"]
sources: 1
---

# 查询感知语境化 · query-aware contextualization

> 把查询同时放在待处理数据的前面和后面，让 decoder-only 模型在编码材料时就能注意到查询。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

先告诉模型"你要找什么"，再给材料，最后再问一遍。找一个具体的东西时这招极灵；需要综合判断时就没什么用。

## 原文 context

把查询同时放在待处理数据的前面和后面，使 decoder-only 模型在编码材料时就能注意到查询。它在合成键值任务上带来近乎完美的成绩，在多文档问答上却几乎无效。

## 掌握证据（做到这些才算会）

- 能解释为何前置加后置查询在合成键值任务上近乎完美
- 能指出同一手法在多文档问答上几乎无效

## 验收问句

> {{name}} 在什么任务上有效、什么任务上无效？

## 相关

- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172

## 别名

`query-aware contextualization`

## 反链

- [[迷失在中间 lost in the middle]]
- [[首因偏置 primacy bias]]
- [[U 型性能曲线]]
