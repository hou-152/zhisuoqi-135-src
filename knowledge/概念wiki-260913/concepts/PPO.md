---
id: cm_27e4e0df
name: PPO
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["近端策略优化", "Proximal Policy Optimization"]
sources: 1
---

# PPO

> 近端策略优化：带信任域裁剪与重要性加权的策略梯度，用价值模型降方差，曾是 RLHF 的默认算法。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> PPO（近端策略优化）曾是占据主导地位的通用策略梯度算法。在过去几年里，它也是 RLHF 的默认选择……因此，PPO 本质上是一个带有信任域掩码、经过重要性加权的策略梯度方法。
**费曼一下**：用"重要性采样比例 + 裁剪 + 学到的价值模型"把 REINFORCE 改造成可以反复利用同一批生成数据的稳定版本。"裁剪"是对信任域的粗略近似——超出范围就把整条更新扔掉；"价值模型"用来削减方差，代价是多一个与策略同等大的网络。完整 PPO 内存里要同时驻留四个大组件：可训练策略 / 推演策略 / 参考策略 / 价值模型。

## 掌握证据（做到这些才算会）

- 能说出裁剪与价值模型各自解决什么问题
- 能列出内存中需同时驻留的四个大组件

## 验收问句

> {{name}} 的裁剪在做什么，为什么要引入价值模型？

## 相关

- [[SFT Feedback Loop]] · rejected（audit） — PPO 只是产生 rollout 的一种可选算法，回收 rollout 作 SFT 不依赖它。
- [[ScaleRL]] · rejected（audit） — PPO 只是被 scaling 的算法之一，S 型性能-算力曲线方法不依赖具体 RL 算法。

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/PPO-2c1679b108ff8229b9c081fb4afedd6d

## 别名

`近端策略优化`、`Proximal Policy Optimization`

## 反链

- [[ScaleRL]]
- [[SFT Feedback Loop]]
