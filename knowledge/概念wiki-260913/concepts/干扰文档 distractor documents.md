---
id: cm_d4fab5a8
name: 干扰文档
nameEn: distractor documents
type: CONCEPTUAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["distractor documents"]
sources: 1
---

# 干扰文档 · distractor documents

> 评测中插入的 k−1 篇不含答案但与查询高度相关的维基片段，按相关性递减排列，用来测长上下文的抗干扰。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

故意混进去的"看起来很像但没有答案"的材料。它模拟的是真实检索回来的结果——大部分沾边，只有一篇真的有用。

## 原文 context

k−1 篇不含答案但与查询高度相关的维基百科片段，由 Contriever 检索得到，并按相关性递减排列。附录中还比较了随机干扰与随机排序两种变体。

## 掌握证据（做到这些才算会）

- 能构造按相关性递减排列的干扰文档集
- 能说明随机干扰与随机排序两种变体的差别

## 验收问句

> 你能否说明 {{name}} 在你的评测集里是怎么生成的？

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
