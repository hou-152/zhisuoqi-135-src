---
id: cm_98b9a0aa
name: context firewall
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# context firewall

> 让离散任务在隔离子上下文窗口里跑，中间噪音不污染父线程，维持长会话连贯性。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

让助手去查资料，你只要他回来说结论，不需要他把翻过的每一页都念给你听。中间过程留在他那边，你的脑子才留得住整件事的全貌。

## 原文 context

作者对 sub-agents 最核心的判断——它们「扮演上下文防火墙」，让离散任务在隔离的上下文窗口里跑，中间噪音不会累积到负责编排的父线程里，从而在很多个 session 上维持连贯性。

## 掌握证据（做到这些才算会）

- 能说明子 Agent 如何隔离噪音
- 能解释它为何提升多 session 的连贯性

## 验收问句

> {{name}} 在父线程与子 Agent 之间怎么分工？

## 懂了它才能懂（解锁 2）

- [[Subagent]] — 不懂 context firewall，就做不了 Subagent『独立小上下文、只回流浓缩结果、不污染父线程』的隔离设计
- [[sub-agent 架构与关注点分离]] — 隔离上下文窗口正是为聚焦任务做关注点分离的手段

## 相关

- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[Subagent]]
- [[sub-agent 架构与关注点分离]]
- [[configuration problem]]
