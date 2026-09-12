---
id: cm_103560db
name: RHAE
type: REPRESENTATIONAL
subject: Context Engineering × Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: compute
centrality: 0.06
depth: 2
origin: [context, harness]
aliases: []
sources: 2
---

# RHAE

> ARC-AGI-3 的评分指标，把模型表现与人类测试基线相比，得出相对人类动作效率。

**领域** verification-eval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.06

## 费曼一下

它不看你最终有没有通关，而看你用多少动作达成目标，再跟人类比。分数低可能不是因为不会玩，而是因为绕的弯太多。

## 原文 context

ARC-AGI-3 的评分指标，把模型表现与人类基线相比。基于官方人类测试日志，OpenAI 估计人类测试者平均约 48%，而 GPT-5.6 Sol 在两项设置开启后为 38.3%。

## 掌握证据（做到这些才算会）

- 能说出人类基线约 48%、GPT-5.6 Sol 为 38.3% 这一对比
- 能用该口径把模型分数换算成相对人类效率

## 验收问句

> 能否用 {{name}} 算出模型相对人类基线的百分比？

## 先懂这些（前置 1）

- [[通用 harness 的公平性张力]] · **soft** — 人类基线分随官方 harness 设置浮动，解读它需先懂公平性张力。

## 相关

- [[基准测试的捆绑测量性]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[保留推理 retained reasoning]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-A2

## 出场

- Context Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- Harness Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
## 反链

- [[Harness]]
- [[通用 harness 的公平性张力]]
- [[基准测试的捆绑测量性]]
- [[保留推理 retained reasoning]]
