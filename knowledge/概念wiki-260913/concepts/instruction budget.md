---
id: cm_b46838eb
name: instruction budget
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# instruction budget

> 每条无关的工具描述都会消耗 agent 必须处理却毫无收益的注意力额度，这份预算是有限的。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

模型的注意力像一份有限的预算。你写进上下文的每条规则、每个工具说明都在花钱。花在无关处的每一块钱，都是从真正的任务那里挪走的。

## 原文 context

作者反复强调「每一条无关的工具描述都是 agent 必须处理却毫无收益的指令」；每条 user message 至少是一条指令，通常是好几条；skills 出现之前，他们「还没开工就烧光了指令预算」。

## 掌握证据（做到这些才算会）

- 能指出某次任务中哪些指令是纯消耗
- 能为一次任务列出指令清单并估算预算余量

## 验收问句

> {{name}} 为什么会『还没开工就烧光』？

## 先懂这些（前置 1）

- [[Context as working memory budget]] · **soft** — 注意力额度有限，是把上下文当有限预算经营的一面

## 相关

- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[Context as working memory budget]]
- [[configuration problem]]
