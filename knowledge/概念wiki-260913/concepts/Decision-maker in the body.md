---
id: cm_da1f0987
name: Decision-maker in the body
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.042
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Decision-maker in the body

> loop 区别于 cron 的关键：中间有一个决策者，模型按当前状态决定下一步，而不是执行固定脚本。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

cron 像闹钟，到点就按固定步骤做事；agent loop 像带判断力的闹钟，到点先看看现场，再决定该做哪一步。

## 原文 context

作者回应“loop 只是 cron”时提出，loop 的区别在于身体中间有一个 decision-maker：模型根据当前状态决定下一步，而不是执行固定脚本。

## 掌握证据（做到这些才算会）

- 能指出决策者依当前状态选下一步而非照脚本走
- 能据此反驳「loop 不过是 cron」的说法

## 验收问句

> {{name}} 如何区分 loop 和 cron？

## 先懂这些（前置 1）

- [[自动循环的心跳]] · **soft** — 理解它“区别于 cron”需先知道定时心跳式的固定脚本。

## 相关

- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15

## 出场

- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
## 反链

- [[Loop Engineering]]
- [[自动循环的心跳]]
- [[Continuous orchestration loop]]
- [[Model as subroutine]]
