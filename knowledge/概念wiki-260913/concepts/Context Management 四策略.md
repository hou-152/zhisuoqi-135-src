---
id: cm_ed6d76b6
name: Context Management 四策略
type: PROCEDURAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Context Management 四策略

> 把上下文当内存来管：该压缩就压缩、该外置就外置、该懒加载就懒加载。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

context 是稀缺资源，不是 "越大越好"。真正的 harness 工程是把 context 当内存管理——**该压就压，该藏就藏，该懒加载就懒加载**。

## 掌握证据（做到这些才算会）

- 能为一个具体任务分配压缩/外置/懒加载策略
- 能说明为什么上下文不是越大越好

## 验收问句

> 给这个任务套用 {{name}}，你会怎么取舍？

## 懂了它才能懂（解锁 1）

- [[the dumb zone the smart zone]] — 不懂【Context Management 四策略】，就做不了【the dumb zone / the smart zone】的 ⟨通过拆分子任务让主线程留在聪明区⟩

## 相关

- [[just in time 上下文检索]] · related-to（audit） — JIT 检索概念自包含，四策略中「懒加载」只是归类标签，非依赖
- [[Context Reset vs Compaction]] · related-to（audit） — reset/compaction 可独立定义，四策略只是事后归类，非理解前提
- [[Context as working memory budget]] · related-to（audit） — 预算节点列的 KV-cache 局部性/文件系统记忆/压缩/背压正是所谓「四策略」本身，二者实为同一件事的抽象与具体两面，不构成独立前置
- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27

## 出场

- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922
## 反链

- [[Agent vs Harness]]
- [[Context Reset vs Compaction]]
- [[Context as working memory budget]]
- [[the dumb zone the smart zone]]
- [[just in time 上下文检索]]
