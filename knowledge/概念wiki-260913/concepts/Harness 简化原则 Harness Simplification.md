---
id: cm_94448257
name: Harness 简化原则
nameEn: Harness Simplification
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.017
depth: 0
origin: [harness]
aliases: ["Harness Simplification"]
sources: 1
---

# Harness 简化原则 · Harness Simplification

> 找最简单的解法，只在必要时增加复杂度——harness 里每个组件都编码了“模型自己做不到”的假设。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

不要假设 harness 的复杂度是永久必要的。每次新模型发布时，应该逐一移除组件观察影响，剥离不再承重的部分。作者从 Opus 4.5 到 4.6，移除了 sprint 结构和逐 sprint 评审，但保留了 planner 和 evaluator。关键洞察：harness 的有趣组合空间不会随模型进步而缩小——它会移动。

## 原文 context

find the simplest solution possible, and only increase complexity when needed. … every component in a harness encodes an assumption about what the model can’t do on its own.

## 掌握证据（做到这些才算会）

- 能判断某个 harness 组件是否可以删除
- 能说出增加复杂度的前提条件

## 验收问句

> 按 {{name}}，你新增一个组件前要先回答什么问题？

## 相关

- [[Context Anxiety]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Context Reset vs Compaction]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-09

## 出场

- Harness Engineering ｜ 《Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness》 ｜ https://www.anthropic.com/engineering/harness-design-long-running-apps

## 别名

`Harness Simplification`

## 反链

- [[Context Reset vs Compaction]]
- [[Context Anxiety]]
