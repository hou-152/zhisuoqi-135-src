---
id: cm_31ec728d
name: 观察掩码
nameEn: Observation Masking
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.035
depth: 0
origin: [context, harness]
aliases: ["Observation Masking"]
sources: 2
---

# 观察掩码 · Observation Masking

> 上下文管理策略：把旧的工具输出隐藏起来，只保留动作与结论，从而压低窗口占用。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.035

## 费曼一下

观察掩码不是删除历史，而是降低旧工具结果对当前推理的干扰。模型仍知道发生过调用，但不必反复看到沉重的输出细节。

## 原文 context

“隐藏旧的工具输出”

## 掌握证据（做到这些才算会）

- 能指出哪些旧工具输出可以安全隐藏
- 能对比掩码前后上下文占用与任务表现的差异

## 验收问句

> 上下文快满时，{{name}} 该丢掉什么、保留什么？

## 相关

- [[即时检索 Just-in-time Retrieval]] · 常一起用（工作流） — 被移出窗口的旧观察可保留轻量线索，并在再次需要时按需取回。
- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[非模型架构 Non-model Architecture]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[上下文腐烂 Context Rot]] · 常一起用（工作流） — 掩码旧工具输出用于降低低信号历史对当前推理的干扰。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13

## 出场

- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922

## 别名

`Observation Masking`

## 反链

- [[上下文腐烂 Context Rot]]
- [[即时检索 Just-in-time Retrieval]]
- [[AI Agent]]
- [[非模型架构 Non-model Architecture]]
