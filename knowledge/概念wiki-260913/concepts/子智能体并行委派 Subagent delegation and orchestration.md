---
id: cm_384a9cd4
name: 子智能体并行委派
nameEn: Subagent delegation and orchestration
type: CONCEPTUAL
subject: AI 内参 260912
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.181
depth: 1
origin: [neican]
aliases: ["Subagent delegation and orchestration"]
sources: 1
---

# 子智能体并行委派 · Subagent delegation and orchestration

> 主智能体把复杂任务拆成相互独立的部分委派给子智能体并行处理，各自维护上下文，主智能体汇总结果。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.181

## 费曼一下

主智能体像项目经理一样把大任务拆成几个模块，分别指派给几个副手（子智能体）去独立跑。每个副手各自带着干净的上下文专心排查（互不干扰），主智能体最后只收集它们的汇报并拍板，大幅压缩了等待时间。

## 原文 context

借助[多智能体支持⁠](https://developers.openai.com/api/docs/guides/agents-api/multi-agent)，Agents API 可将复杂任务拆分为相互独立的部分，并委派给多个子智能体并行处理。每个子智能体都维护各自的上下文，以便专注于分配到的任务；主智能体则协调它们的工作并汇总结果。

## 掌握证据（做到这些才算会）

- 能说明子智能体各自维护独立上下文、专注分配任务的意义
- 能描述主智能体负责协调与汇总结果的角色

## 验收问句

> 在 {{name}} 中，主智能体与子智能体各自承担什么职责？

## 先懂这些（前置 1）

- [[Git 工作树并发隔离 Git worktree isolation]] · **soft** — 不懂【Git 工作树并发隔离】，就做不了【子智能体并行委派】的⟨多个子智能体同时动同一仓库而不互相覆盖⟩。

## 懂了它才能懂（解锁 2）

- [[子智能体编排 Multi-Agent Orchestration]] — 不懂【子智能体并行委派】，就做不了【子智能体编排】的⟨主模型拆活给子智能体并行再汇总⟩——编排要编的就是这套「拆分—并行—汇总」的动作。
- [[独立只读审计智能体 Independent read-only auditor]] — 不懂【子智能体并行委派】，就做不了【独立只读审计智能体】的⟨把审查交给一个独立副手而非生产者自己兼审⟩——没有把活派给另一个智能体的机制，独立性就落不了地。

## 出场

- AI 内参 260912 ｜ 《推出 Agents API | OpenAI》 ｜ https://openai.com/zh-Hans-CN/index/introducing-the-agents-api/

## 别名

`Subagent delegation and orchestration`

## 反链

- [[Git 工作树并发隔离 Git worktree isolation]]
- [[独立只读审计智能体 Independent read-only auditor]]
- [[子智能体编排 Multi-Agent Orchestration]]
