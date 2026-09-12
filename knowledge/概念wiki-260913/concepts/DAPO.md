---
id: cm_34451fc9
name: DAPO
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.072
depth: 1
origin: [notion]
aliases: ["解耦优势策略优化", "Decoupled Advantage Policy Optimization"]
sources: 1
---

# DAPO

> 解耦优势策略优化：在 GRPO 上把裁剪上下界解耦为 0.28/0.2、损失改 token 级、截断加软惩罚、动态采样过滤。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> DAPO（解耦优势策略优化）对 GRPO 的多个组件进行了另一种深入分析，并提出了四项改进……DAPO 解耦了裁剪边界。它采用了一个更大的上界 ε_high = 0.28，同时保留了原有的下界 ε_low = 0.2（即非对称裁剪）。
**费曼一下**：在 GRPO 上做四件事：(1) 损失从样本级换到 token 级；(2) 裁剪上下界解耦——上界放宽到 0.28、下界保留 0.2，让低概率推理 token 有空间被强化；(3) 截断回复加软惩罚，区分"太长"和"完全错"；(4) 动态采样过滤全对/全错的 prompt。是 GRPO 框架下的"工程级"改进。

## 掌握证据（做到这些才算会）

- 能列出 DAPO 相对 GRPO 的四项改动
- 能解释放宽上界为何给低概率推理 token 留出强化空间

## 验收问句

> {{name}} 对 GRPO 做了哪四件事，为何放宽上界？

## 先懂这些（前置 1）

- [[GRPO]] · **hard** — 不懂【GRPO】，就做不了 DAPO 的⟨在 GRPO 上解耦裁剪上下界、改 token 级损失的设计⟩

## 相关

- [[Dr. GRPO]] · related-to（audit） — DAPO 的硬前置是 GRPO，不是 Dr. GRPO；二者是 GRPO 的平行改进分支，理由里给的也是 GRPO。懂 Dr. GRPO 有帮助但非必需，应降 soft 或改边指向 GRPO。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/DAPO-549679b108ff8340b396814108f8fd89

## 别名

`解耦优势策略优化`、`Decoupled Advantage Policy Optimization`

## 反链

- [[Dr. GRPO]]
- [[GRPO]]
