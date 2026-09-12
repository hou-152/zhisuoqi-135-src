---
id: cm_463b3b95
name: configuration problem
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.067
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# configuration problem

> 失败根因多在配置而非模型能力；模型越强任务越难，失败仍会以意外方式出现。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

等下一代模型，是把自己能控制的部分交给别人。模型每升一级，你也会把任务难度升一级，失败率不会归零，只会换个位置出现。所以真正可优化的，是你这一侧。

## 原文 context

几十个项目、几百次 agent session 之后，作者反复得到同一结论：failures 的根因不在模型能力，而在配置；而且因为模型变强后我们会交给它更大更难的问题，它会「继续以出乎意料的方式失败」——非确定性系统的根本属性。

## 掌握证据（做到这些才算会）

- 能举出一次归因到配置而非模型的失败案例
- 能解释非确定性系统的失败为何不会消失

## 验收问句

> 面对一次 Agent 失败，怎么用 {{name}} 定位原因？

## 先懂这些（前置 2）

- [[能力鸿沟]] · **soft** — 失败根因在配置而非模型能力，是能力鸿沟的一种具体表现形式。
- [[Harness 工程 Harness Engineering]] · **soft** — 失败多源于配置，先懂 harness 工程才知道在哪配置。

## 相关

- [[instruction budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[the dumb zone the smart zone]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[context firewall]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[长上下文的幻觉]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[agentfile CLAUDE.md 与 AGENTS.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[back-pressure]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[harness over-fitting]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Subagent]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[hooks .claudehooks]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
## 反链

- [[Harness 工程 Harness Engineering]]
- [[上下文腐烂 Context Rot]]
- [[the dumb zone the smart zone]]
- [[渐进式披露 progressive disclosure]]
- [[Subagent]]
- [[能力鸿沟]]
- [[back-pressure]]
- [[harness over-fitting]]
- [[长上下文的幻觉]]
- [[agentfile CLAUDE.md 与 AGENTS.md]]
- [[context firewall]]
- [[instruction budget]]
- [[hooks .claudehooks]]
