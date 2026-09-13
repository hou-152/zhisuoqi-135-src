---
id: cm_b87e2d6f
name: 稳定的 prompt 前缀
type: PROCEDURAL
subject: Context Engineering
domain: caching-cost
learningStage: now
verification: use
centrality: 0.126
depth: 2
origin: [context]
aliases: []
sources: 1
---

# 稳定的 prompt 前缀

> 把 system prompt 等前缀写成逐字稳定的内容，避开时间戳之类易变项，以命中 KV-cache。

**领域** caching-cost ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

缓存像是从头开始的一条链，任何一环换了，后面整条都得重打。为了让模型知道现在几点而牺牲整条链，是极不划算的交易。

## 原文 context

围绕 KV-cache 设计的第一条实践。由于 LLM 的自回归性质，单个 token 的差异就会让该位置之后的缓存全部失效；典型错误是在 system prompt 开头放精确到秒的时间戳。

## 掌握证据（做到这些才算会）

- 能指出 system prompt 开头放秒级时间戳会打掉该位置之后的全部缓存
- 能把易变信息移出前缀并对比缓存命中变化

## 验收问句

> 为什么 {{name}} 里不能放精确到秒的时间戳？

## 先懂这些（前置 2）

- [[前缀匹配 Prefix Matching]] · **hard** — 不懂前缀匹配，就做不了稳定的prompt前缀的写法（system prompt等逐字稳定以命中KV-cache）。
- [[稳定前缀 Stable Prefix]] · **hard** — 不懂【稳定前缀】，就写不出真正能命中 KV-cache 的【稳定的 prompt 前缀】

## 相关

- [[押注 in-context learning]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[与底层模型正交 orthogonal to the underlying models]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-04

## 出场

- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
## 反链

- [[上下文工程 context engineering]]
- [[前缀匹配 Prefix Matching]]
- [[稳定前缀 Stable Prefix]]
- [[押注 in-context learning]]
- [[与底层模型正交 orthogonal to the underlying models]]
