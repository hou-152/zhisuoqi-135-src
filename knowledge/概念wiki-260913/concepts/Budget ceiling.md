---
id: cm_82e4b4e7
name: Budget ceiling
type: CONCEPTUAL
subject: Harness Engineering
domain: caching-cost
learningStage: now
verification: use
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Budget ceiling

> 为 token 或金额消耗设定的上限，防止无限 loop 把成本推到失控。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

给 loop 一张信用卡时，必须先设额度。否则它可能在你睡觉时把账单跑爆。

## 原文 context

作者用 Uber 的 AI 工具预算上限和无限 loop 的风险说明：成本已从写代码转移到管理 loop，因此 token 或 dollar budget ceiling 是必要边界。

## 掌握证据（做到这些才算会）

- 能给一个自主 loop 配上 token 或美元上限并说明超限动作
- 能举出成本从写代码转移到管理 loop 后失控的例子

## 验收问句

> 给一个自主 loop，你会把 {{name}} 设为多少、超限后怎么办？

## 先懂这些（前置 1）

- [[Token count]] · **hard** — 预算上限按 token 或金额设定，token 是计量基础。

## 相关

- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15

## 出场

- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
## 反链

- [[Loop Engineering]]
- [[Token count]]
- [[Continuous orchestration loop]]
- [[Model as subroutine]]
