---
id: cm_f4ccedd3
name: 扔掉 DAG」的承诺
type: CONCEPTUAL
subject: Context Engineering
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# 扔掉 DAG」的承诺

> 不再逐步写死流程，给 agent 目标与转移让 LLM 实时定路径；承诺少写软件、能从错恢复，但实际并不完全成立。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

等于说「你只要告诉司机目的地，路线交给他」。听起来省事得多，但真拉上乘客跑城市配送时你就会发现，你需要的不是一位天才司机，而是可预期、可复盘、出事能定位的运输系统。承诺本身没错，错的是以为它可以免掉工程。

## 原文 context

作者学 agent 时最大的心得，是 "you get to throw the DAG away"：不再逐步骤、逐 edge case 写代码，而是给 agent 一个目标和一组转移，让 LLM 实时决策路径。承诺是写更少的软件、能从错误中恢复、甚至找到 novel solutions。紧接着他写道：「it turns out this doesn't quite work.」

## 掌握证据（做到这些才算会）

- 能说出该承诺的三项收益
- 能解释为何它 in practice 不完全 work

## 验收问句

> {{name}} 承诺了什么，又为什么没完全兑现？

## 先懂这些（前置 1）

- [[DAG 编排器]] · **hard** — 要理解“扔掉 DAG”必须先懂被扔掉的 DAG 编排器。

## 相关

- [[12-factor agents]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[并不 agentic」的 AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[软件即有向图]] · 同篇出现（co-occurrence） — 同篇出现：context-06

## 出场

- Context Engineering ｜ 《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》 ｜ https://github.com/humanlayer/12-factor-agents
## 反链

- [[12-factor agents]]
- [[并不 agentic」的 AI Agent]]
- [[软件即有向图]]
- [[DAG 编排器]]
