---
id: cm_e907a229
name: docs/decisions/
type: REPRESENTATIONAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.126
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# docs/decisions/

> docs/decisions/ 下的架构决策记录，让 AI 不仅知道代码是什么，还知道代码为什么是这样。

**领域** code-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

仓库里专门记录"为什么这么写"的文档。光有代码本身，AI 只知道现状；有了 decisions 记录，AI 才理解约束的来历，不会无脑改回去。最容易被忽略，但杠杆最大。

## 原文 context

\-

"让 AI 不仅知道代码『是什么』，还知道代码『为什么是这样』。这一项最容易被忽略，但也是 AI 协作最大的杠杆点。"

## 掌握证据（做到这些才算会）

- 能按背景、决策、后果的结构写出一条 ADR
- 能用 ADR 回答 agent 对某设计的为什么提问

## 验收问句

> 你如何用 {{name}} 让 agent 理解某模块为何这样设计？

## 懂了它才能懂（解锁 2）

- [[Agent-driven CICD]] — 不懂【docs/decisions/】，就做不了【Agent-driven CI/CD】的「让 Agent 按既有架构决策正确分诊修复」
- [[service template 与 golden path]] — 不懂【docs/decisions/】，就做不了【service template 与 golden path】的「在模板中固化并解释关键架构决策」

## 相关

- [[仓库即唯一事实来源]] · rejected（audit） — docs/decisions/ 是「仓库即唯一事实来源」这条原则的一个落地实例，方向上是原则支撑 ADR 才有意义，不构成前置。
- [[AI 工程基础设施 AI engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[确定性工程基础设施 deterministic engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[1.6% vs 98.4%]] · 同篇出现（co-occurrence） — 同篇出现：harness-20

## 出场

- Harness Engineering ｜ 《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349
## 反链

- [[service template 与 golden path]]
- [[Agent-driven CICD]]
- [[1.6% vs 98.4%]]
- [[仓库即唯一事实来源]]
- [[确定性工程基础设施 deterministic engineering infrastructure]]
- [[AI 工程基础设施 AI engineering infrastructure]]
