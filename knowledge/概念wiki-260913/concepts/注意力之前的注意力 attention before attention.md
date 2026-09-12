---
id: cm_f27655ca
name: 注意力之前的注意力
nameEn: attention before attention
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.042
depth: 5
origin: [context]
aliases: ["attention before attention"]
sources: 1
---

# 注意力之前的注意力 · attention before attention

> 窗口变长不等于能随便塞：选上下文要看语义相关性、逻辑依赖、新近性、重叠与用户偏好，并做过滤重排。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

模型自己的注意力机制只在进了窗口之后起作用；决定"什么配进窗口"是更早、也更要紧的一次注意力。喂多了和喂少了，都会变笨。

## 原文 context

论文对上下文选择的定位。即使窗口变长，模型仍受限于输入 token 的质量：无关或嘈杂的记忆片段会干扰推理、抬高成本，经验上 AI 编程表现常在窗口填充度超过约 50% 后下降。选择的考量因素包括语义相关性、逻辑依赖（如 MEM1 的依赖图遍历）、新近性与频率、信息重叠、用户偏好与反馈；常见过滤策略含分块（可用 AST 尊重语义边界）、embedding 检索、Grep 式非语义检索、知识图谱结构化检索与重排。

## 掌握证据（做到这些才算会）

- 能列出至少三种上下文过滤或检索策略
- 能解释填充度超过约五成后编程表现下降

## 验收问句

> 按 {{name}} 的哪些考量，你会筛掉这批记忆片段？

## 先懂这些（前置 1）

- [[注意力预算 attention budget]] · **hard** — 先说清注意力是有限预算，才谈得上在它之前做筛选与重排。

## 相关

- [[熵减 entropy reduction]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文 context]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-01

## 出场

- Context Engineering ｜ 《论文《上下文工程 2.0》：给这门手艺补上它自己的上下文》 ｜ https://arxiv.org/pdf/2510.26493

## 别名

`attention before attention`

## 反链

- [[上下文工程 context engineering]]
- [[上下文 context]]
- [[注意力预算 attention budget]]
- [[熵减 entropy reduction]]
