---
id: cm_bc76d880
name: Knowledge Retrieval vs Reasoning
nameEn: memorization vs reasoning
type: CONCEPTUAL
subject: AI 内参 260912
domain: memory-retrieval
learningStage: when-needed
verification: judge
centrality: 0.052
depth: 0
origin: [neican]
aliases: ["memorization vs reasoning"]
sources: 1
---

# Knowledge Retrieval vs Reasoning · memorization vs reasoning

> 存储信息与用它解题是两回事：参数量固定时循环几乎不增加知识存储，只帮助多步推理。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.052

## 费曼一下

这个区分说明循环的收益边界：固定参数数时，循环几乎不增加存储知识的能力；要增加知识容量得增加不同参数。循环能帮助多步数学推理，因为推理更依赖计算深度而不是知识存储。它解释了 looped transformer 为什么更像“多想几步”，不是“多记知识”。

## 原文 context

There’s a useful distinction between storing information and using it to solve a problem.

> First, in the memorization experiments, looping leaves the amount of stored information nearly unchanged when the parameter count stays fixed. Increasing the number of distinct parameters does increase this capacity. From this, we can conclude that looping doesn’t add or let’s the model retrieve more knowledge. ... looping in itself is computing not “storing” mechanism.

> Second, in separate reasoning experiments, reusing the blocks improves performance on multi-step math problems without adding parameters. ... extra computation can help a model solve problems even when it doesn’t have more space to store information.

## 掌握证据（做到这些才算会）

- 能复述记忆实验中循环几乎不改变存储信息量，增加不同参数才提升容量
- 能解释循环为何对多步数学推理有帮助、对知识记忆帮助有限

## 验收问句

> 按 {{name}} 的区分，为什么循环更像'多想几步'而不是'多记知识'？

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`memorization vs reasoning`
