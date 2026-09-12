---
id: cm_838289d1
name: KV-cache 命中率
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: now
verification: compute
centrality: 0.126
depth: 1
origin: [context]
aliases: []
sources: 1
---

# KV-cache 命中率

> 前缀相同的上下文命中缓存的比率，直接决定延迟与成本，缓存与未缓存输入单价可差十倍。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.126

## 费曼一下

模型每次都要把你给它的全部内容重读一遍。如果开头那段和上次一模一样，它可以直接沿用上次读过的记忆——省时也省钱，前提是你别去动开头。

## 原文 context

作者认为如果只能选一个指标，它就是生产阶段 AI agent 最重要的单一指标，直接影响延迟与成本。前缀相同的上下文能命中缓存，大幅降低 TTFT；以 Claude Sonnet 为例缓存输入 0.30 USD/MTok 对未缓存 3 USD/MTok，差 10 倍。

## 掌握证据（做到这些才算会）

- 能说出缓存与未缓存输入的单价差
- 能列出提高命中率的具体做法

## 验收问句

> {{name}} 为什么是生产阶段最重要的单一指标？

## 先懂这些（前置 1）

- [[前缀匹配 Prefix Matching]] · **soft** — 不懂前缀匹配，就做不了KV-cache命中率的统计口径（前缀相同才算命中）。

## 懂了它才能懂（解锁 1）

- [[缓存命中率 Cache Hit Rate]] — 不懂KV-cache命中率，就做不了缓存命中率的指标口径（命中率本质是前缀相同比率）。

## 相关

- [[押注 in-context learning]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[与底层模型正交 orthogonal to the underlying models]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-04

## 出场

- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
## 反链

- [[上下文工程 context engineering]]
- [[前缀匹配 Prefix Matching]]
- [[缓存命中率 Cache Hit Rate]]
- [[押注 in-context learning]]
- [[与底层模型正交 orthogonal to the underlying models]]
