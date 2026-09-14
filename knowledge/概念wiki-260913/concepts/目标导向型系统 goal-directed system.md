---
id: cm_73deaac3
name: 目标导向型系统
nameEn: goal-directed system
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.144
depth: 2
origin: [neican]
aliases: ["goal-directed system"]
sources: 1
---

# 目标导向型系统 · goal-directed system

> 训练结束后仍像奖励持续存在一样行动、会计算行为影响并选择实现目标行为的系统。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

目标导向型系统指训练结束后，系统仍然像奖励还在一样行动。它会计算不同行动对目标的影响，并选择更可能实现目标的行为。模型越大、训练越久，这种搜索越好。本文用这个概念解释：能力更强的 AI 更可能找到实现目标的路径，包括作弊路径。

## 原文 context

训练结束后，系统会继续像奖励仍在持续一样运行，即使这些奖励在训练期间仅仅用于调整神经网络。研究人员称这类系统 **为目标导向型**系统，因为它们经过训练会“考虑”（或计算）自身行为的影响，并选择能够实现特定目标的行为。

> 因此，我们可以从优化的角度来分析这样的系统。它会近似地搜索最有可能实现其目标的行动，而模型越大、训练时间越长，搜索效果就越好。所以，要预测能力更强的智能体会做什么，就问问一个理性的目标追求者会怎么做。

## 掌握证据（做到这些才算会）

- 能解释为何能力更强的系统更可能找到实现目标的路径
- 能说出模型越大、训练越久其搜索效果越好

## 验收问句

> 为什么可以从 {{name}} 的角度预测强智能体会怎么做？

## 先懂这些（前置 1）

- [[强化学习 reinforcement learning]] · **hard** — 不懂强化学习中奖励如何反复塑造网络行为，就做不了目标导向型系统的判定——看不出一个系统是在「训练结束后仍像奖励持续存在一样行动」

## 懂了它才能懂（解锁 1）

- [[Scientist 人工智能框架]] — 不懂目标导向型系统会计算行为影响、按自身目标行事，就做不了 Scientist 框架的核心设计——让 AI 的预测不受自身目标影响

## 出场

- AI 内参 260912 ｜ 《What can be done to mitigate loss-of-control risks》 ｜ https://yoshuabengio.org/en/publication/why-are-ai-agents-lying-cheating-and-coordinating

## 别名

`goal-directed system`

## 反链

- [[强化学习 reinforcement learning]]
- [[Scientist 人工智能框架]]
