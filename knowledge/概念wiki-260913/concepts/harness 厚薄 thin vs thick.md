---
id: cm_3e211f91
name: harness 厚薄
nameEn: thin vs thick
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 0
origin: [harness]
aliases: ["thin vs thick"]
sources: 1
---

# harness 厚薄 · thin vs thick

> 架构决策：多少逻辑住在 harness、多少留给模型；Anthropic 押薄 harness，图式框架押显式控制。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

这是一场关于「信任模型到什么程度」的赌注。押模型会变强，就少写代码；押要可控，就把流程钉死在代码里。押错了要么脆弱，要么臃肿。

## 原文 context

七个架构决策中最根本的一个——多少逻辑住在 harness、多少留给模型。Anthropic 押注薄 harness 与模型进步，图式框架押注显式控制，CrewAI Flows 一类走混合路线。Anthropic 会随新模型内化规划能力，定期从 Claude Code 的 harness 里删掉规划步骤。

## 掌握证据（做到这些才算会）

- 能说出薄与厚 harness 各自押注的前提
- 能举出混合路线的代表做法

## 验收问句

> {{name}} 这个决策要权衡的两端分别是什么？

## 懂了它才能懂（解锁 2）

- [[model-native harness]] — 不懂【harness 厚薄】，就做不了【model-native harness】中把多少逻辑交给模型的取舍。
- [[harness 与 framework 的分野]] — 不懂【harness 厚薄】，就画不出【harness 与 framework 的分野】里框架越界与只保证可靠发生的界线。

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`thin vs thick`

## 反链

- [[If you're not the model, you're the harness.]]
- [[agent 与 harness 的分工]]
- [[model-native harness]]
- [[harness 与 framework 的分野]]
