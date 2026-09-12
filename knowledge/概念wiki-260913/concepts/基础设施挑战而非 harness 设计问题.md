---
id: cm_1c61d688
name: 基础设施挑战而非 harness 设计问题
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

# 基础设施挑战而非 harness 设计问题

> 把规模化跑Agent遇到的困难归类为基础设施挑战，而非harness设计技巧问题。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

问题被重新归了类。原来大家以为这是「怎么写好一个程序」，其实是「怎么建好一座工厂」。

## 原文 context

工程博客分享的那条教训——building agents to scale with Claude's intelligence is an infrastructure challenge, not strictly a matter of harness design。这是把注意力从 harness 技巧转向 infra 的关键归类动作。

## 掌握证据（做到这些才算会）

- 能举出被归入infra而非harness设计的具体问题
- 遇到瓶颈时能先判断这是不是infra问题

## 验收问句

> 遇到Agent规模化瓶颈时，怎么判断它是否属于{{name}}？

## 先懂这些（前置 1）

- [[Harness 工程 Harness Engineering]] · **soft** — 判断它不是 harness 设计问题，先要懂 harness 设计是什么。

## 相关

- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[Harness 工程 Harness Engineering]]
- [[Claude Managed Agents]]
- [[messages API 作为直连网关]]
