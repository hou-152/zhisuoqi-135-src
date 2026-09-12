---
id: cm_d4fab5a8
name: 干扰文档
nameEn: distractor documents
type: REPRESENTATIONAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["distractor documents"]
sources: 1
---

# 干扰文档 · distractor documents

> 与查询高度相关但不含答案的维基片段，共 k−1 篇，由 Contriever 检索并按相关性递减排列。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

故意混进去的"看起来很像但没有答案"的材料。它模拟的是真实检索回来的结果——大部分沾边，只有一篇真的有用。

## 原文 context

k−1 篇不含答案但与查询高度相关的维基百科片段，由 Contriever 检索得到，并按相关性递减排列。附录中还比较了随机干扰与随机排序两种变体。

## 掌握证据（做到这些才算会）

- 能说明干扰文档与答案段落的差别
- 能复述其构造方式与排序规则

## 验收问句

> {{name}}在长上下文评测中扮演什么角色？

## 相关

- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172

## 别名

`distractor documents`

## 反链

- [[迷失在中间 lost in the middle]]
- [[首因偏置 primacy bias]]
- [[U 型性能曲线]]
