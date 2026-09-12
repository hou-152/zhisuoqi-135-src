---
id: cm_14ba4d5c
name: harness 的过时假设
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.067
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# harness 的过时假设

> harness 编码的是“Claude 做不到什么”的假设，模型变强后这些假设会陈旧，反过来成为性能瓶颈。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

你给新人写的防呆手册，写的是他刚入职时的短板。人成长了，手册没改，手册本身就成了绊脚石。

## 原文 context

全文最锋利的判断——agent harness 编码的是「Claude 做不到什么」的假设；这些假设会随模型变强而陈旧（grow stale），并反过来 bottleneck Claude 的表现，因此 harness 需要被持续更新。

## 掌握证据（做到这些才算会）

- 能举出一个因模型变强而失效的 harness 假设
- 能解释陈旧假设为何会 bottleneck 表现

## 验收问句

> {{name}} 为什么会随模型变强而变成瓶颈？

## 先懂这些（前置 2）

- [[Harness 工程 Harness Engineering]] · **hard** — 过时假设正是 harness 工程要外科式修正的对象，不懂工程就不知假设从哪来、如何改。
- [[Harness]] · **soft** — 假设是编码在 harness 里的，不懂 harness 装了什么就无从谈其过时。

## 相关

- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[Claude Managed Agents]]
- [[messages API 作为直连网关]]
