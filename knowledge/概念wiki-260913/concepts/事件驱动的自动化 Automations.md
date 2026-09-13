---
id: cm_c3a45aa3
name: 事件驱动的自动化
nameEn: Automations
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 1
origin: [context]
aliases: ["Automations"]
sources: 1
---

# 事件驱动的自动化 · Automations

> 事件驱动的自动化：issue 进入系统那一刻即触发 agent 工作流，即时精炼或行动。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

不用等人有空来处理，事情一发生就自动开跑。新问题一进来，系统立刻去归类、去查重、去补充关联信息，甚至直接动手。把"人来了才处理"变成"事一来就处理"，等待时间被压到接近零。

## 原文 context

今日发布之一，从 Triage 起步。"在一个 issue 进入系统的那一刻触发 agent 工作流（trigger agent workflows the moment an issue enters）"；每个新 issue 都增添上下文，系统能"在它到达的那一刻"就精炼、综合或采取行动。

## 掌握证据（做到这些才算会）

- 能说出触发时机是“到达那一刻”而非定时批处理
- 能举出一个事件触发工作流的实例

## 验收问句

> {{name}} 用什么时机触发 agent 工作流？

## 先懂这些（前置 2）

- [[事件驱动编排与执行解耦]] · **soft** — 不懂事件驱动编排与执行解耦，就做不了事件驱动自动化里「issue 一进系统就触发工作流」
- [[普遍可触发 universally triggered]] · **soft** — 不懂普遍可触发，就做不了事件驱动自动化里「不管被 webhook 还是 cron 激活」的触发接线

## 出场

- Context Engineering ｜ 《产品开发的下一阶段由上下文与行动能力驱动》 ｜ https://linear.app/next

## 别名

`Automations`

## 反链

- [[普遍可触发 universally triggered]]
- [[事件驱动编排与执行解耦]]
