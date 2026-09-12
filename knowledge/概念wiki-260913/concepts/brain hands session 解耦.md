---
id: cm_ad8666e5
name: brain / hands / session 解耦
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# brain / hands / session 解耦

> 把模型与 harness、沙箱工具、会话事件日志拆成三个互相假设极少、可独立失败或被替换的接口。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

大脑、双手、日记本各管各的。手断了可以换假肢，日记本丢了可以换本子，不必推倒重来。

## 原文 context

全文的设计取舍核心。Anthropic 没有设计特定 harness，而是把 brain（Claude 及其 harness）、hands（沙箱与工具）、session（会话事件日志）拆成三个「对其他部分假设极少」的接口，各自可以独立失败或被替换。

## 掌握证据（做到这些才算会）

- 能画出 brain、hands、session 三者边界并说明各自失败后果
- 能指出替换其中一部分而不动其余部分所需条件

## 验收问句

> {{name}} 中三部分各自的职责与失败边界是什么？

## 相关

- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[agent 与 harness 的分工]] · related-to（audit） — 解耦讲的是接口拆分这一独立设计思想，模型/harness 分工只是其被切分的对象之一；不懂分工也能理解『三个可独立替换的接口』，宜降为关联而非前置。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[Claude Managed Agents]]
- [[agent 与 harness 的分工]]
- [[messages API 作为直连网关]]
