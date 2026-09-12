---
id: cm_f6006789
name: 方向漂移 / Direction Drift
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# 方向漂移 / Direction Drift

> 上下文窗口渐满导致一致性衰减：偏离方向、遗忘早期约束、在细节里越走越深。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

Agent 版的「煮青蛙」——不是突然崩溃，而是在长时间运行中缓慢偏离初始目标。上下文窗口满了之后，早期的约束和方向被新信息淹没，agent 在细节里越走越深却浑然不觉。

## 原文 context

上下文窗口逐渐变满 → 一致性衰减 → 偏离方向、遗忘早期约束、在细节中越走越深

## 掌握证据（做到这些才算会）

- 能指出某次长任务跑偏对应上下文膨胀
- 能说出复述、压缩、todo 等缓解手段

## 验收问句

> 你怎么发现并缓解{{name}}？

## 先懂这些（前置 1）

- [[上下文占用率与性能衰减]] · **hard** — 方向漂移是窗口渐满导致一致性衰减的具体表现，先懂衰减。

## 相关

- [[时间 Scalability Temporal Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[空间 Scalability Spatial Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1

## 出场

- Harness Engineering ｜ 《Harness Engineering 三个 Scaling 维度的统一框架》 ｜ https://yage.ai/share/harness-engineering-scalability-20260330.html
## 反链

- [[Harness 工程 Harness Engineering]]
- [[上下文占用率与性能衰减]]
- [[空间 Scalability Spatial Scalability]]
- [[时间 Scalability Temporal Scalability]]
