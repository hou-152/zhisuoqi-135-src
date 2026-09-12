---
id: cm_80b8a64a
name: 从期望行为反推 harness 设计
type: PROCEDURAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.045
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# 从期望行为反推 harness 设计

> 从期望模型表现的行为出发，反推需要哪些 harness 功能，而不做穷举清单。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

不是先看别人的框架有什么组件然后照抄，而是先说清楚「我希望它表现成什么样」，再倒推需要什么机制。这样得到的每个组件都带着理由，日后模型变了、任务变了，你知道哪些该留哪些该扔。

## 原文 context

全文的推导方法，作者写成 Behavior we want (or want to fix) → Harness Design to help the model achieve this，并明确说不做穷举清单，而是从「帮模型做有用的工作」这个起点推导出一组功能。

## 掌握证据（做到这些才算会）

- 能写出“期望行为 → harness 设计”的推导链条
- 能依据“帮模型做有用的工作”这一出发点筛掉无关功能

## 验收问句

> 设计 harness 时，{{name}} 的推导起点是什么？

## 先懂这些（前置 1）

- [[Harness]] · **hard** — 反推的产物是 harness 功能，前提是懂 harness。

## 相关

- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[Agent = Model + Harness]]
