---
id: cm_463b3b95
name: configuration problem
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# configuration problem

> 失败根因多在配置而非模型能力；模型越强任务越难，失败仍会以意外方式出现。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

等下一代模型，是把自己能控制的部分交给别人。模型每升一级，你也会把任务难度升一级，失败率不会归零，只会换个位置出现。所以真正可优化的，是你这一侧。

## 原文 context

几十个项目、几百次 agent session 之后，作者反复得到同一结论：failures 的根因不在模型能力，而在配置；而且因为模型变强后我们会交给它更大更难的问题，它会「继续以出乎意料的方式失败」——非确定性系统的根本属性。

## 掌握证据（做到这些才算会）

- 能举出一次归因到配置而非模型的失败案例
- 能解释非确定性系统的失败为何不会消失

## 验收问句

> 面对一次 Agent 失败，怎么用 {{name}} 定位原因？

## 相关

- [[context firewall]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[长上下文的幻觉]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[agentfile CLAUDE.md 与 AGENTS.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[back-pressure]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[instruction budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[the dumb zone the smart zone]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Subagent]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[harness over-fitting]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[hooks .claudehooks]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[能力鸿沟]] · rejected（audit） — 地图理由把 configuration problem 说成能力鸿沟的一种具体表现，即前者是后者的实例；实例不依赖上位概念，反倒应并入或反向，不构成前置边。
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
## 反链

- [[Subagent]]
- [[上下文腐烂 Context Rot]]
- [[instruction budget]]
- [[渐进式披露 progressive disclosure]]
- [[能力鸿沟]]
- [[context firewall]]
- [[the dumb zone the smart zone]]
- [[长上下文的幻觉]]
- [[agentfile CLAUDE.md 与 AGENTS.md]]
- [[back-pressure]]
- [[harness over-fitting]]
- [[hooks .claudehooks]]
