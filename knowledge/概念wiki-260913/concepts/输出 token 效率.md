---
id: cm_652d3291
name: 输出 token 效率
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: caching-cost
learningStage: when-needed
verification: compute
centrality: 0.06
depth: 2
origin: [context, harness]
aliases: []
sources: 2
---

# 输出 token 效率

> 同能力下输出 token 越少越省；材料中改版后分数约 3 倍，输出 token 少 6 倍。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.06

## 费曼一下

省钱和提分在这里不是取舍，而是同一个原因的两个结果。让模型少做无用的重复思考，账单和成绩会同时变好。

## 原文 context

本次改动的第二个量化结果：约 3 倍分数的同时，输出 token 少 6 倍。原因在于模型不再需要每个动作前重新解读游戏，思考时间随之缩短。

## 掌握证据（做到这些才算会）

- 能说出 token 减少的原因是模型不必每个动作前重新解读
- 能用分数与 token 的对比量化这次改动收益

## 验收问句

> {{name}} 提升后，为什么思考时间也随之缩短？

## 先懂这些（前置 1）

- [[Token Efficiency]] · **hard** — 输出省 token 是 token 效率在生成侧的具体体现。

## 相关

- [[基准测试的捆绑测量性]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[保留推理 retained reasoning]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-A2

## 出场

- Context Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- Harness Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
## 反链

- [[Harness]]
- [[Token Efficiency]]
- [[基准测试的捆绑测量性]]
- [[保留推理 retained reasoning]]
