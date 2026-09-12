---
id: cm_c3027f5b
name: GRPO
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.072
depth: 0
origin: [notion]
aliases: ["组相对策略优化", "Group Relative Policy Optimization"]
sources: 1
---

# GRPO

> 组相对策略优化：每个 prompt 采一组回复，以同组均值为基线算相对优势，省掉 PPO 的 critic 模型。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> GRPO（组相对策略优化）最初在 DeepSeekMath 中提出，随后被 DeepSeek-R1 发扬光大。它移除了 PPO 的价值模型，取而代之的是一个相对组内的基线……然而，GRPO 成功的更重要原因非常简单：它移除了 critic 模型。
**费曼一下**：每个 prompt 采一组回复，把"这条比同组其他回复好多少"作为优势——基线就是同组的均值。等于把 PPO 里那个又大又贵的 critic 模型换成"自己人比一比"。真正让 GRPO 火起来的不是数学多漂亮，而是省掉 critic 后省下的那一大块内存，让大规模推理 RL 跑得动。

## 掌握证据（做到这些才算会）

- 能说明 GRPO 与 PPO 的关键差异是移除 critic 模型
- 能解释省掉 critic 为何让大规模推理 RL 跑得动

## 验收问句

> {{name}} 相比 PPO 去掉了什么模型，换来的是什么？

## 懂了它才能懂（解锁 1）

- [[DAPO]] — 不懂【GRPO】，就做不了 DAPO 的⟨在 GRPO 上解耦裁剪上下界、改 token 级损失的设计⟩

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/GRPO-8ca679b108ff830aaec4814a62ea1002

## 别名

`组相对策略优化`、`Group Relative Policy Optimization`

## 反链

- [[DAPO]]
