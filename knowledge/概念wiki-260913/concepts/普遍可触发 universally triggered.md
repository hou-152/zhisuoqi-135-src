---
id: cm_3f39fb13
name: 普遍可触发
nameEn: universally triggered
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.045
depth: 3
origin: [harness]
aliases: ["universally triggered"]
sources: 1
---

# 普遍可触发 · universally triggered

> Agent 不关心也不需知道自己如何被激活，触发方式与 agent loop 解耦，由 harness 路由。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

不管是有人敲门、闹钟响了，还是同事喊你一声，你干活的方式都一样。谁来叫你，和你怎么干活，是两件事。

## 原文 context

Utah 名字里的第一个词（Universally Triggered Agent Harness），作者强调「这部分很重要」：Telegram/Slack webhook、cron 定时、子 agent 调用、函数间事件——**agent 不知道也不关心自己是怎么被激活的**。触发与工作解耦，「明天加一个 Slack bot，agent loop 也不变，harness 负责路由」。

## 掌握证据（做到这些才算会）

- 能说明新增一个 Slack bot 触发源时 agent loop 无需改动
- 能画出 webhook／cron／子 agent 调用→harness 路由→loop 的结构

## 验收问句

> 新增一种触发源后，怎么证明{{name}}仍然成立？

## 先懂这些（前置 1）

- [[事件驱动编排与执行解耦]] · **soft** — 触发与 agent loop 解耦，靠的正是外部事件驱动的编排层。

## 相关

- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework

## 别名

`universally triggered`

## 反链

- [[Harness]]
- [[持久化执行 durable execution]]
- [[事件驱动编排与执行解耦]]
- [[harness 与 framework 的分野]]
