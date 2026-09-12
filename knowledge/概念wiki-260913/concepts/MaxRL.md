---
id: cm_aadd5ef8
name: MaxRL
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.045
depth: 5
origin: [notion]
aliases: ["最大似然强化学习", "Maximum Likelihood RL"]
sources: 1
---

# MaxRL

> 把 RL 目标从 pass@1 期望奖励改为 N 次采样至少一次成功，只对成功样本求平均梯度，困难 prompt 自动获高权重。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> MaxRL（最大似然强化学习）从一个完全不同的视角出发。标准的强化学习目标函数优化的是期望奖励（pass@1）……因此，最大似然的梯度实际上是 pass@k 梯度的无限调和混合，而不仅仅是 pass@1 的梯度。
**费曼一下**：标准 RL 在偷偷只优化 pass@1，常以牺牲 pass@k 为代价。MaxRL 把目标改成"最大化 N 次采样里至少一次成功的概率"——理论上就是 pass@k 梯度的无穷调和加权。实操：一个 prompt 采 N 次，只对成功那几条求平均梯度；困难 prompt（成功率低）自动获高权重。结果：pass@k 提升、多样性更好、测试时算力扩展更划算。概念意义：把"可验证任务的 RL"重述为"不可微采样下的近似最大似然训练"。

## 掌握证据（做到这些才算会）

- 能解释 MaxRL 的梯度是 pass@k 梯度的调和混合
- 能说明困难 prompt 为何自动获得更高权重

## 验收问句

> {{name}} 与标准 RL 的目标差在哪里，为何对测试时扩展更划算？

## 先懂这些（前置 1）

- [[Dr. GRPO]] · **hard** — MaxRL沿用组采样与相对思路，只把目标换成至少一次成功，不懂GRPO就接不上它的基线设定。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/MaxRL-d03679b108ff83ed848e0156ce4beb85

## 别名

`最大似然强化学习`、`Maximum Likelihood RL`

## 反链

- [[Dr. GRPO]]
