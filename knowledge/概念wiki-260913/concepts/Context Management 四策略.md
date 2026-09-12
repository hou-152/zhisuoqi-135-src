---
id: cm_ed6d76b6
name: Context Management 四策略
type: PROCEDURAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Context Management 四策略

> 把上下文当内存来管：该压缩就压缩、该外置就外置、该懒加载就懒加载。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

context 是稀缺资源，不是 "越大越好"。真正的 harness 工程是把 context 当内存管理——**该压就压，该藏就藏，该懒加载就懒加载**。

## 掌握证据（做到这些才算会）

- 能为一个具体任务分配压缩/外置/懒加载策略
- 能说明为什么上下文不是越大越好

## 验收问句

> 给这个任务套用 {{name}}，你会怎么取舍？

## 先懂这些（前置 1）

- [[Context as working memory budget]] · **hard** — 四策略就是按内存预算来管理上下文的具体操作

## 懂了它才能懂（解锁 3）

- [[Context Infrastructure]] — 基础设施决定给 agent 什么信息，四策略是其落地手段
- [[just in time 上下文检索]] — 按引用懒加载正属于该外置、该懒加载的策略
- [[Agent Drift]] — 漂移几乎全源于上下文管理问题，对策即四策略

## 相关

- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27

## 出场

- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922
## 反链

- [[Context as working memory budget]]
- [[just in time 上下文检索]]
- [[Agent Drift]]
- [[Agent vs Harness]]
- [[Context Infrastructure]]
