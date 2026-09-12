---
id: cm_937edec6
name: ScaleRL
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.017
depth: 0
origin: [notion]
aliases: []
sources: 1
---

# ScaleRL

> 一份大规模算力下的 RL 工程方法学，用 S 型性能-算力曲线替代单点对比。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> ScaleRL 的重点并非在于发明一种全新的目标函数。它更侧重于探索在算力规模大幅扩张后，哪些设计选择依然至关重要……在评估不同方法时，他们通过拟合出类似 S 型的「性能与算力」曲线来进行分析。
**费曼一下**：不是新算法，而是一份"40 万 GPU 小时的工程方法学"。最大贡献是评估方式换轨：用 S 型「性能-算力」曲线代替单点对比，第一次清晰分离"早期上升速度 vs 渐近性能上限"。结论钦定 CISPO 为默认损失，背书 FP32 logits、token/prompt 级聚合、零方差过滤、无正向重采样这套配方。

## 掌握证据（做到这些才算会）

- 能解释为何用 S 型曲线分离早期上升速度与渐近上限
- 能列出被其背书的默认配方要素，如 CISPO 损失

## 验收问句

> 用 {{name}} 的曲线能分离出哪两个量？

## 相关

- [[PPO]] · rejected（audit） — PPO 只是被 scaling 的算法之一，S 型性能-算力曲线方法不依赖具体 RL 算法。
- [[RLVR 与编码 agent 的 RL 训练循环]] · related-to（audit） — RLVR 长循环是 ScaleRL 的一个测量实例，不懂该具体循环也能理解算力曲线主张
- [[RLHF]] · related-to（audit） — ScaleRL 是 RL 工程方法学，懂 RLHF 有助但非前提，S 曲线方法学可独立理解
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/ScaleRL-a3d679b108ff822cbd2c81eecf741c47
## 反链

- [[RLHF]]
- [[RLVR 与编码 agent 的 RL 训练循环]]
- [[PPO]]
