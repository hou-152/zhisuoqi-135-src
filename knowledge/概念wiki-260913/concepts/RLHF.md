---
id: cm_e3bf5147
name: RLHF
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.072
depth: 1
origin: [notion]
aliases: ["基于人类反馈的强化学习", "Reinforcement Learning from Human Feedback"]
sources: 1
---

# RLHF

> 用人类偏好训练奖励模型再用 RL 优化 LLM，是 GPT-3 到 InstructGPT 的关键一跳，PPO 为默认算法。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> 强化学习已成为 LLM 后训练技术栈中最重要的技术之一。它是促成 GPT-3 向 InstructGPT 转变的关键要素……第一代针对 LLM 的强化学习以 PPO 为主导。该方法最初为雅达利游戏和机器人等传统强化学习场景开发，后来极其成功地适配到了 RLHF 中。
**费曼一下**：用人类偏好（而不是任务正确性）训练出奖励模型，再用 RL 让 LLM 优化它——这就是 GPT-3 → InstructGPT 那一跳。RLHF 是 LLM RL 的"第一代场景"，PPO 是它的默认算法；后来所有"推理 RL"都是在这套架构上演化出来的。

## 掌握证据（做到这些才算会）

- 能说清奖励模型与 RL 优化两阶段的先后
- 能说明为何 RLHF 是 LLM RL 的第一代场景

## 验收问句

> {{name}} 的关键一跳体现在哪一步？

## 先懂这些（前置 1）

- [[Reward Signal]] · **hard** — RLHF 用人类偏好训练奖励模型，奖励信号是它的打分通道。

## 相关

- [[Nerdy Personality]] · related-to（audit） — 与[3]冗余，RLHF 是更上层流程，其塑形机制已被 Reward Signal 覆盖，非立得住的前提
- [[Reward Generalization]] · related-to（audit） — 奖励泛化是 RLHF 的风险或后果，不是理解 RLHF 训练机制的前置；不懂它仍能懂 RLHF。
- [[DPPO]] · rejected（audit） — DPPO 依赖的是 PPO/策略梯度，不是 RLHF；理由讲的是 RLHF 依赖 PPO，方向不对。
- [[ScaleRL]] · related-to（audit） — ScaleRL 是 RL 工程方法学，懂 RLHF 有助但非前提，S 曲线方法学可独立理解
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/RLHF-86b679b108ff826b905101e71b04e95f

## 别名

`基于人类反馈的强化学习`、`Reinforcement Learning from Human Feedback`

## 反链

- [[Reward Signal]]
- [[DPPO]]
- [[Nerdy Personality]]
- [[Reward Generalization]]
- [[ScaleRL]]
