---
id: cm_3a7b088a
name: Grading Criteria
type: PROCEDURAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: use
centrality: 0.181
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Grading Criteria

> 把“这设计美吗”这类难一致回答的问题，换成“是否符合我们的设计原则”这类可具体打分的标准。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.181

## 费曼一下

将主观判断转化为可操作的评分框架。作者设计了四个维度（Design quality、Originality、Craft、Functionality），并着重加权前两项（因为 Claude 默认已擅长后两项）。关键发现：标准的措辞会以意想不到的方式引导输出方向，即使在第一次迭代就能把模型从泛化默认中拉出来。

## 原文 context

“Is this design beautiful?” is hard to answer consistently, but “does this follow our principles for good design?” gives Claude something concrete to grade against.

## 掌握证据（做到这些才算会）

- 能为一个模糊评价问题写出可打分的评分标准
- 能指出哪类问题无法被一致评分并改写它

## 验收问句

> 把“这个方案好吗”改写成 {{name}} 式的可打分问句，你会怎么写？

## 懂了它才能懂（解锁 3）

- [[Sprint Contract]] — 不懂 Grading Criteria，就做不了 Sprint Contract 中把「什么叫完成」落成可打分标准
- [[Kappa 系数]] — 不懂 Grading Criteria，就做不了 Kappa 系数用于 AI 评分与人类专家按同一口径的一致性测量
- [[Mutation Testing 与前沿质量评测]] — 不懂 Grading Criteria，就做不了 Mutation Testing 中判官模型查质量的评分

## 相关

- [[弱而模糊的评估器]] · related-to（audit） — 弱而模糊的评估器只是动机背景；Grading Criteria 作为一种把审美问题改写成可打分标准的做法可独立成立，不构成定义/机制依赖。
- [[Context Anxiety]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Context Reset vs Compaction]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-09

## 出场

- Harness Engineering ｜ 《Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness》 ｜ https://www.anthropic.com/engineering/harness-design-long-running-apps
## 反链

- [[Context Reset vs Compaction]]
- [[Kappa 系数]]
- [[Mutation Testing 与前沿质量评测]]
- [[Sprint Contract]]
- [[弱而模糊的评估器]]
- [[Context Anxiety]]
