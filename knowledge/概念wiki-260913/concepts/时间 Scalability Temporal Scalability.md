---
id: cm_2be548ed
name: 时间 Scalability / Temporal Scalability
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 时间 Scalability / Temporal Scalability

> Agent在精心设计的环境中连续运行数小时，仍能保持方向与质量的能力。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

让一个 agent 从跑 20 分钟延长到跑 4 小时而不崩溃。核心难点是方向漂移和自评失真——跑久了 agent 会忘记初始目标，还会说服自己「差不多得了」。Anthropic 的解法是把一个 agent 拆成三个角色（Planner/Generator/Evaluator），用独立的验证者来对抗自我宽容。

## 原文 context

agent 在精心设计的环境里开始工作后，怎么在几个小时的连续运行中保持方向和质量？

## 掌握证据（做到这些才算会）

- 能说出长时间运行中方向漂移与质量下降的具体表现
- 能给出维持数小时稳定运行的检查点或机制

## 验收问句

> {{name}}要解决几小时连续运行中的什么问题？

## 相关

- [[交互 Scalability Interaction Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[方向漂移 Direction Drift]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[自评失真 Self-evaluation Distortion]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[递归 Planner-Worker 架构]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Symphony]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 组件生命周期]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Context Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Generative Kernel]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[空间 Scalability Spatial Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1

## 出场

- Harness Engineering ｜ 《Harness Engineering 三个 Scaling 维度的统一框架》 ｜ https://yage.ai/share/harness-engineering-scalability-20260330.html
## 反链

- [[Symphony]]
- [[递归 Planner-Worker 架构]]
- [[空间 Scalability Spatial Scalability]]
- [[自评失真 Self-evaluation Distortion]]
- [[Harness 组件生命周期]]
- [[方向漂移 Direction Drift]]
- [[交互 Scalability Interaction Scalability]]
- [[Context Infrastructure]]
- [[Generative Kernel]]
