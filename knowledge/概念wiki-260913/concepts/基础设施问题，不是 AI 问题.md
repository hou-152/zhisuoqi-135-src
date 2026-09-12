---
id: cm_eeb4d9c2
name: 基础设施问题，不是 AI 问题
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.042
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# 基础设施问题，不是 AI 问题

> 可观测性、重试、并发、状态管理、审计、调度这些墙是基础设施问题，所需原语可能已存在，不必以agent之名重造。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

agent 让人以为一切都是新问题，于是所有人从头造轮子。其实一大半麻烦，是软件工程二十年前就解决过的老麻烦，只是换了个场景出现。

## 原文 context

全文的价值主张，出现在列举编排层五项收益之后：「All of these problems are infrastructure problems, not AI problems.」可观测性、重试、并发、状态管理、审计、调度——这些墙不是模型能力问题，撞上它们说明**你需要的原语可能已经存在了**，不必以 agent 之名重造。

## 掌握证据（做到这些才算会）

- 能列出属于基础设施而非模型能力的几类问题
- 能指出哪些已有原语可复用而不必重造

## 验收问句

> 撞上{{name}}这类墙时，应该先去找什么？

## 先懂这些（前置 1）

- [[Harness 工程 Harness Engineering]] · **soft** — 把墙归为基础设施问题，先要懂 harness 工程能解决什么。

## 相关

- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[持久化执行 durable execution]]
- [[harness 与 framework 的分野]]
