---
id: cm_b8127840
name: Harness Thickness
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.092
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Harness Thickness

> 多少逻辑住在 harness 而非模型里：Anthropic 押薄 harness 与模型进步，图式框架押显式控制。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.092

## 费曼一下

一个产品要把多少逻辑写在代码里（**厚 harness**），多少交给模型自己处理（**薄 harness**）？这是个哲学问题：相信模型会越来越强 → harness 越写越薄；相信确定性控制更重要 → harness 越写越厚。Anthropic 选前者，还会主动**删掉**老的规划步骤。

## 原文 context

Harness thickness. How much logic lives in the harness versus the model. Anthropic bets on thin harnesses and model improvement. Graph-based frameworks bet on explicit control.

## 掌握证据（做到这些才算会）

- 能用具体框架判断其厚度并给出理由
- 能说出厚度押注背后的模型能力假设

## 验收问句

> 某框架把规划逻辑写死在代码里，按 {{name}} 它属于哪种押注？

## 先懂这些（前置 2）

- [[harness 与 framework 的分野]] · **soft** — 先分清 harness 与 framework 职责，才能讨论逻辑住在 harness 还是模型。
- [[Harness level feature]] · **soft** — 先知道模型开箱缺什么，才能讨论多少逻辑放 harness。

## 懂了它才能懂（解锁 1）

- [[model-native harness]] — 顺着模型设计常对应薄 harness，不懂厚度就难把握取向。

## 相关

- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27

## 出场

- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922
## 反链

- [[model-native harness]]
- [[Harness level feature]]
- [[harness 与 framework 的分野]]
- [[Agent vs Harness]]
