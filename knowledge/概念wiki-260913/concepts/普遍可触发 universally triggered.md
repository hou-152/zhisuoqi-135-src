---
id: cm_3f39fb13
name: 普遍可触发
nameEn: universally triggered
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [harness]
aliases: ["universally triggered"]
sources: 1
---

# 普遍可触发 · universally triggered

> Harness 设计原则：触发与工作解耦，agent 不关心自己是被 webhook、cron 还是子调用激活的。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

不管是有人敲门、闹钟响了，还是同事喊你一声，你干活的方式都一样。谁来叫你，和你怎么干活，是两件事。

## 原文 context

Utah 名字里的第一个词（Universally Triggered Agent Harness），作者强调「这部分很重要」：Telegram/Slack webhook、cron 定时、子 agent 调用、函数间事件——**agent 不知道也不关心自己是怎么被激活的**。触发与工作解耦，「明天加一个 Slack bot，agent loop 也不变，harness 负责路由」。

## 掌握证据（做到这些才算会）

- 能列出至少三种触发源并说明 agent loop 不变
- 能接入一个新触发源而不改动 agent 主体逻辑

## 验收问句

> 加一个 Slack bot 触发，在{{name}}下 agent 主体要不要改？

## 懂了它才能懂（解锁 1）

- [[事件驱动的自动化 Automations]] — 不懂普遍可触发，就做不了事件驱动自动化里「不管被 webhook 还是 cron 激活」的触发接线

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
- [[事件驱动的自动化 Automations]]
- [[harness 与 framework 的分野]]
