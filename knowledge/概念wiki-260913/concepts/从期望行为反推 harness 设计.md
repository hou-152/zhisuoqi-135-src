---
id: cm_80b8a64a
name: 从期望行为反推 harness 设计
type: PROCEDURAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.126
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# 从期望行为反推 harness 设计

> 不从功能清单出发，而由希望模型做出的行为反推 harness 需要提供哪些能力。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

不是先看别人的框架有什么组件然后照抄，而是先说清楚「我希望它表现成什么样」，再倒推需要什么机制。这样得到的每个组件都带着理由，日后模型变了、任务变了，你知道哪些该留哪些该扔。

## 原文 context

全文的推导方法，作者写成 Behavior we want (or want to fix) → Harness Design to help the model achieve this，并明确说不做穷举清单，而是从「帮模型做有用的工作」这个起点推导出一组功能。

## 掌握证据（做到这些才算会）

- 能写出一对「期望行为 → 设计支撑」的推导示例
- 能说明为何不做穷举功能清单

## 验收问句

> 给你一个期望行为，你怎么用{{name}}推出所需功能？

## 先懂这些（前置 2）

- [[Harness]] · **hard** — 反推的产物是 harness 功能，前提是懂 harness。
- [[AI Agent]] · **soft** — 不懂【AI Agent】，就做不了 ⟨从期望的对外行为出发反推所需能力⟩

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
- [[AI Agent]]
