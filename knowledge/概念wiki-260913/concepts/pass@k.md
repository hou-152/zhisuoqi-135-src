---
id: cm_9e82be87
name: pass@k
type: REPRESENTATIONAL
subject: AI 概念库
domain: verification-eval
learningStage: when-needed
verification: compute
centrality: 0.045
depth: 2
origin: [notion]
aliases: ["pass@1", "pass at k"]
sources: 1
---

# pass@k

> 采样 k 次至少一次答对的概率；优化 pass@1 往往以牺牲多样性和 pass@k 为代价。

**领域** verification-eval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.045

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> 标准的强化学习目标函数优化的是期望奖励（pass@1）。研究人员经常观察到一种现象：pass@1 的提升往往是以牺牲 pass@k 为代价的。
**费曼一下**：pass@1 = 一次答对的概率；pass@k = 采 k 次至少一次答对的概率。优化 pass@1 倾向把概率质量集中到"看起来最稳的那一条"，从而牺牲多样性 → pass@k 反而下降。这是 MaxRL 的出发点：换个目标，让 RL 不再以多样性为代价换 pass@1。

## 掌握证据（做到这些才算会）

- 能写出 pass@1 与 pass@k 的定义差别
- 能解释为何提升 pass@1 会压低 pass@k

## 验收问句

> 为什么优化 pass@1 反而可能让 {{name}} 下降？

## 先懂这些（前置 1）

- [[SWE-bench 与二元打分]] · **soft** — 有了 0/1 判定才能统计 k 次中至少一次通过。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/pass-k-b10679b108ff83af8401812671bf118d

## 别名

`pass@1`、`pass at k`

## 反链

- [[SWE-bench 与二元打分]]
