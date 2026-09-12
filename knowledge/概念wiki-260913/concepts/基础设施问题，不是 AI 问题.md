---
id: cm_eeb4d9c2
name: 基础设施问题，不是 AI 问题
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 基础设施问题，不是 AI 问题

> 可观测性、重试、并发、状态管理、审计、调度这些墙是基础设施问题，所需原语可能已存在，不必以agent之名重造。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

agent 让人以为一切都是新问题，于是所有人从头造轮子。其实一大半麻烦，是软件工程二十年前就解决过的老麻烦，只是换了个场景出现。

## 原文 context

全文的价值主张，出现在列举编排层五项收益之后：「All of these problems are infrastructure problems, not AI problems.」可观测性、重试、并发、状态管理、审计、调度——这些墙不是模型能力问题，撞上它们说明**你需要的原语可能已经存在了**，不必以 agent 之名重造。

## 掌握证据（做到这些才算会）

- 能列出属于基础设施而非模型能力的几类问题
- 能指出哪些已有原语可复用而不必重造

## 验收问句

> 撞上{{name}}这类墙时，应该先去找什么？

## 懂了它才能懂（解锁 1）

- [[基础设施挑战而非 harness 设计问题]] — 不懂“这是基础设施问题”的判断，就会把规模化困难归错类、在 harness 里空转

## 相关

- [[单用户假设的失效]] · rejected（audit） — 单用户假设失效是“基础设施问题非 AI 问题”的一个实例/证据，不是由后者定义；理解该失效本身不必须先认同归类。
- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[持久化执行 durable execution]]
- [[基础设施挑战而非 harness 设计问题]]
- [[harness 与 framework 的分野]]
- [[单用户假设的失效]]
