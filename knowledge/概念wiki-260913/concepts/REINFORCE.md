---
id: cm_9191c944
name: REINFORCE
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: compute
centrality: 0.117
depth: 1
origin: [notion]
aliases: []
sources: 1
---

# REINFORCE

> 按奖励对同策略采样答案加权强化的策略梯度基础形式，相当于带权 SFT，方差大需靠基线降。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.117

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> 这一对比表明，REINFORCE 本质上是一种带有权重的 SFT 形式。我们不再强化外部提供的异策略答案 y\^\*。相反，我们根据奖励对采样的同策略答案 y 进行加权，以此来强化或惩罚它们。
**费曼一下**：把 SFT 的"照抄答案"换成"按奖励加权的照抄"。奖励高的多学，奖励低的少学甚至反着学。简单粗暴但方差极大，所以后来所有方法（基线、PPO、GRPO…）都在想办法降它的方差。它是所有策略梯度方法的基础形式。

## 掌握证据（做到这些才算会）

- 能写出 REINFORCE 的梯度估计含采样子与奖励权重
- 能解释它为何被称为带权重的 SFT 且方差大

## 验收问句

> 用一句话说明 {{name}} 与 SFT 的关系及其主要缺陷。

## 先懂这些（前置 1）

- [[Reward Signal]] · **hard** — REINFORCE 按奖励对采样答案加权，没有奖励信号就无从加权。

## 懂了它才能懂（解锁 3）

- [[DPPO]] — PPO 是带裁剪与重要性加权的策略梯度，基础是 REINFORCE 的加权采样。
- [[RLOO]] — RLOO 放弃裁剪回到纯 REINFORCE，不懂 REINFORCE 就理解不了它的优势定义。
- [[MaxRL]] — MaxRL 仍是策略梯度，只对成功样本平均梯度，基础是 REINFORCE 的加权形式。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/REINFORCE-88e679b108ff83519333013d977820b9
## 反链

- [[DPPO]]
- [[Reward Signal]]
- [[外包思考，但不外包理解]]
- [[MaxRL]]
- [[RLOO]]
- [[Agent-Native Infrastructure]]
- [[Sensors 与 Actuators]]
