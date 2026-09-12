---
id: cm_ecf56dd0
name: 弱 harness / 强 harness 对照与消融实验
type: PROCEDURAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# 弱 harness / 强 harness 对照与消融实验

> 同一任务分别用弱harness与强harness跑两次并对比效果，关心效果变化而非写了多少说明文档。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

想知道某个零件有没有用，最直接的办法是把它拆掉再跑一次。对照与消融把 harness 从一堆看起来很讲究的规范，变成一组可以被度量效果的机制。

## 原文 context

课程的方法论骨架。「每个项目都要做弱 harness / 强 harness 对照」，P01 直接就是「跑两次同样的任务：只写提示词 vs 定好规则」，P06 收在消融实验。它对应的评价立场是：「我们关心的是效果变化，而不是『写了多少说明文档』。」

## 掌握证据（做到这些才算会）

- 能设计一次只写提示词vs定好规则的对照实验
- 能用消融实验说明某条规则带来的收益

## 验收问句

> 怎么用{{name}}证明某条harness规则真的有用？

## 先懂这些（前置 1）

- [[Agent vs Harness]] · **hard** — 不懂 Agent vs Harness，就做不了消融实验里「哪部分算 harness、哪部分算 agent」的界定

## 相关

- [[指令子系统与渐进式展开]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[能力鸿沟]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-18

## 出场

- Harness Engineering ｜ 《Harness 工程学习仓库：从原始文献到能跑的 skill》 ｜ https://github.com/walkinglabs/learn-harness-engineering/blob/main/README-CN.md
## 反链

- [[Harness 工程 Harness Engineering]]
- [[Agent vs Harness]]
- [[能力鸿沟]]
- [[指令子系统与渐进式展开]]
