---
id: cm_95c0c22c
name: Sprint Contract
type: PROCEDURAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.067
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Sprint Contract

> 每个冲刺开始前，生成者与评估者先就「什么叫完成」达成一致，再动手写代码

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

在 generator 写任何代码之前，先和 evaluator 就「什么算完成」达成书面共识。这桥接了高层产品规格和可测试实现之间的鸿沟，确保 generator 构建的是正确的东西，且 evaluator 有明确的验收标准。

## 原文 context

Before each sprint, the generator and evaluator negotiated a sprint contract: agreeing on what “done” looked like for that chunk of work before any code was written.

## 掌握证据（做到这些才算会）

- 能为一段工作预先写出可判定的 done 定义
- 能在动手前与评估方确认验收标准条目

## 验收问句

> {{name}} 中，完成的定义应在什么时候、由谁确认？

## 先懂这些（前置 2）

- [[Rubric]] · **soft** — 契约本质就是开工前双方对齐的验收 rubric。
- [[Validation gates]] · **soft** — 契约是冲刺起点的一道验收门禁。

## 相关

- [[Context Anxiety]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Context Reset vs Compaction]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-09

## 出场

- Harness Engineering ｜ 《Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness》 ｜ https://www.anthropic.com/engineering/harness-design-long-running-apps
## 反链

- [[Rubric]]
- [[Context Reset vs Compaction]]
- [[Validation gates]]
- [[Context Anxiety]]
