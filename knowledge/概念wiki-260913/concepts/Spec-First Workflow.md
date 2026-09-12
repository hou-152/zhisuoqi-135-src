---
id: cm_f6219aa0
name: Spec-First Workflow
type: PROCEDURAL
subject: AI 概念库
domain: spec-intent
learningStage: now
verification: use
centrality: 0.042
depth: 2
origin: [notion]
aliases: ["Spec-First Workflow", "Spec-First", "规格先行", "spec-first development", "spec-driven"]
sources: 1
---

# Spec-First Workflow

> 先与 agent 把规格/文档写细到能当蓝图，再让 agent 实现，review 对象主要是 spec

**领域** spec-intent ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 原文 context

<mention-page url="https://app.notion.com/p/d6d679b108ff82debc5181b2c1ced4ff"/>
> You have to work with your agent to design a spec that is very detailed, and maybe it's basically the docs, and then get the agents to write them.
**费曼一下**：在 agent 时代，人类的核心工作不再是写代码，而是**和 agent 一起把「规格 / 文档」写到极细**。
- spec 一旦清楚，实现是 agent 的事
- spec 不清楚，agent 写出来的代码再多也不算数
- spec 是新一代生产力的「真实代码」——它决定了 agent 输出的上限
Karpathy 的 MenuGen 反例：agent 用邮箱去匹配 Stripe 和 Google 账户的 funds——因为 spec 里没说「必须用持久 user ID」。这种问题不会被 agent 主动发现，必须在 spec 里写清楚。
实操：跟 agent 协作时，先把 docs 写到能直接当蓝图，再让 agent 实现；review 的对象主要是 spec 而不是 code。这也是 **Agentic Engineering** 的核心法门。

## 掌握证据（做到这些才算会）

- 能复述 MenuGen 反例说明 spec 没写清会出什么错
- 能把一个需求写成 agent 可直接实现的细粒度文档

## 验收问句

> 给我一个需求，你能写出 {{name}} 要求的 spec 吗？

## 先懂这些（前置 1）

- [[Spec-driven agent workflow]] · **hard** — Spec-First 是规格驱动工作流的具体形态，先写细规格再让 agent 实现。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Spec-First-Workflow-bc7679b108ff8387a00a0166e06b530c

## 别名

`Spec-First Workflow`、`Spec-First`、`规格先行`、`spec-first development`、`spec-driven`

## 反链

- [[Spec-driven agent workflow]]
