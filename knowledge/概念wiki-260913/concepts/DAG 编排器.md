---
id: cm_69531898
name: DAG 编排器
type: REPRESENTATIONAL
subject: Context Engineering
domain: loop-autonomy
learningStage: when-needed
verification: use
centrality: 0.045
depth: 0
origin: [context]
aliases: []
sources: 1
---

# DAG 编排器

> 用有向无环图描述任务依赖的编排工具（Airflow、Prefect、dagster 等），另带观测、模块化、重试与管理。

**领域** loop-autonomy ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

这是把流程图工业化的产物：每一步是什么、失败了重试几次、跑到哪一步了、谁能看，全都被管起来。代价是这张图必须由人事先画完。它可靠，但不灵活——所有没画进去的情况，运行时都不存在。

## 原文 context

约 20 年前流行起来的一类工具——Airflow、Prefect，以及 dagster、inngest、windmill。它们沿用图模式，额外提供 observability、modularity、retries、administration。

## 掌握证据（做到这些才算会）

- 能用 DAG 画出多步骤任务的前后依赖
- 能指出它比裸脚本多出的重试与可观测性

## 验收问句

> {{name}} 比定时脚本多了哪些能力？

## 懂了它才能懂（解锁 1）

- [[扔掉 DAG」的承诺]] — 要理解“扔掉 DAG”必须先懂被扔掉的 DAG 编排器。

## 相关

- [[12-factor agents]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[并不 agentic」的 AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[软件即有向图]] · 同篇出现（co-occurrence） — 同篇出现：context-06

## 出场

- Context Engineering ｜ 《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》 ｜ https://github.com/humanlayer/12-factor-agents
## 反链

- [[12-factor agents]]
- [[并不 agentic」的 AI Agent]]
- [[扔掉 DAG」的承诺]]
- [[软件即有向图]]
