---
id: cm_df44ac27
name: Reward Generalization
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.067
depth: 1
origin: [notion]
aliases: ["奖励泛化", "Cross-condition Transfer", "reward leakage", "RL behavior transfer"]
sources: 1
---

# Reward Generalization

> 只在 A 条件下给的奖励，行为会跨条件泄漏到所有场景；RL 设计应默认奖励会泛化。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 原文 context

来源：<mention-page url="https://app.notion.com/p/3c7679b108ff83da8e608158cba52620"/>
**context**：
> Reinforcement learning does not guarantee that learned behaviors stay neatly scoped to the condition that produced them.
**费曼一下**：RL 训练里，「我只在 A 情境下给你打高分」≠「你只在 A 情境下做这个行为」。模型学到的是「做这个能拿分」，而不是「在 A 下做这个能拿分」。所以一个本来只该出现在 Nerdy 人格里的口癖，会泄漏到所有人格、所有任务里——这就是奖励泛化的危险。
哥布林之谜里的实证：
- 团队同时跟踪「带 Nerdy prompt」与「不带 Nerdy prompt」两条曲线，goblin 出现率**几乎同比例上升**——奖励虽然只在 Nerdy 条件下给，行为却跨条件迁移到了所有样本。
- 一旦 tic 进入 rollouts，又会通过 SFT 数据被进一步放大（参见 *SFT Feedback Loop*）。
推论：
- 在 RL 设计里**默认假设奖励会泄漏**，比假设它们会被乖乖隔离，更接近现实。
- 想约束行为只在某条件下出现，往往要靠**正负样本对比**或**条件化奖励对齐**，而不是「只在 A 下打分」。
---
来源：<mention-page url="https://app.notion.com/p/eda679b108ff83c5941101d79d69ff4d"/>（中文复述 / 量子位）
**context**：
> 奖励仅在"书呆子"条件下应用，但强化学习并不能保证习得的行为始终局限于产生它们的条件。一旦某种风格习惯获得奖励，后续训练就可能将其传播或强化到其他情况，尤其是在监督式微调或偏好数据中重复使用这些输出时。
**费曼一下**：中文复述把这句"RL 不保证行为留在原条件"翻译得很直白，可以当成一条**alignment 第一原理**来记。配合实证数据看更刺眼：团队同时跟踪带 vs 不带 Nerdy prompt 两条曲线，goblin 提及率**几乎同比例上升**——本来只在 A 情境下生效的奖励，结果把行为撒到了整张地图上。这才是哥布林之谜真正吓人的地方：你以为你在做局部微调，其实你在改写全局风格。

## 掌握证据（做到这些才算会）

- 能举出带与不带 Nerdy prompt 两条曲线同比例上升的实证
- 能设计正负样本对比或条件化奖励来约束行为

## 验收问句

> 为什么说 {{name}} 让「只在 A 打分」靠不住？

## 先懂这些（前置 1）

- [[Reward Signal]] · **hard** — 奖励泛化讨论奖励信号跨条件泄漏，不懂奖励信号就无从谈泛化。

## 懂了它才能懂（解锁 1）

- [[RLHF]] — RLHF 的奖励模型会跨场景泛化，懂奖励泛化更易理解其泄漏与奖励黑客。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Reward-Generalization-866679b108ff83e2b8a681ed1d0b0038

## 别名

`奖励泛化`、`Cross-condition Transfer`、`reward leakage`、`RL behavior transfer`

## 反链

- [[Reward Signal]]
- [[RLHF]]
