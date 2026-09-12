---
id: cm_f9eca213
name: 协同进化与紧耦合
nameEn: co-evolution principle
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: ["co-evolution principle"]
sources: 1
---

# 协同进化与紧耦合 · co-evolution principle

> 模型是带着特定 harness 一起做后训练的，harness 与模型紧耦合，换掉工具实现可能反而降低性能。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

像给一个用惯了某套工具的老师傅换全新工具箱，短期内效率不升反降。工具与手是一起长出来的。

## 原文 context

模型如今是带着特定 harness 一起做后训练的，Claude Code 的模型学会的是它训练时那套 harness。因此换掉工具实现可能反而降低性能——harness 与模型之间存在紧耦合。

## 掌握证据（做到这些才算会）

- 能解释 Claude Code 模型学的是训练时那套 harness
- 能预测更换工具实现后性能可能下降的原因

## 验收问句

> 为什么在 {{name}} 下，替换工具实现不必然带来性能提升？

## 先懂这些（前置 3）

- [[agent 与 harness 的分工]] · **hard** — 模型与 harness 一起后训练，前提是两者可分离且可配对。
- [[模型训练与 harness 设计的耦合]] · **hard** — 共同演化原则以模型-harness耦合为前提，不懂耦合就无从谈起。
- [[模型训练与 harness 设计的耦合]] · **hard** — 共同演化说的正是模型与harness在同一训练环里互相塑造，不懂这个耦合回路就无从谈共演化。

## 懂了它才能懂（解锁 1）

- [[Model-relative Curriculum]] — 课程随模型换代重写是共同演化的一种表现，懂它更易理解课程设计。

## 相关

- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`co-evolution principle`

## 反链

- [[agent 与 harness 的分工]]
- [[模型训练与 harness 设计的耦合]]
- [[If you're not the model, you're the harness.]]
- [[Agent vs Harness]]
- [[Model-relative Curriculum]]
