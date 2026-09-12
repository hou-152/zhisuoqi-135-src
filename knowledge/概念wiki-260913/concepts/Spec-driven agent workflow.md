---
id: cm_67aa1645
name: Spec-driven agent workflow
type: PROCEDURAL
subject: Harness Engineering
domain: spec-intent
learningStage: now
verification: use
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Spec-driven agent workflow

> 用明确规格、状态所有权、暂停恢复与工具边界来组织 agent 工作的开发流程

**领域** spec-intent ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

复杂任务不能只说“帮我做完”。要把目标、约束、验收和步骤写成 agent 能执行的协议，让它知道每一步该做什么、做到哪里算停。

## 原文 context

GitHub Spec Kit、spec-driven development、12 Factor Agents 和 12-Factor AgentOps 强调用明确规格、状态所有权、暂停恢复和工具边界组织 agent 工作。

## 掌握证据（做到这些才算会）

- 能画出从规格到实现的工作流各环节与产物
- 能在自己的项目里按规格、状态所有权、工具边界三项检查并落地

## 验收问句

> 你能说明 {{name}} 里状态所有权与工具边界分别由谁负责吗？

## 先懂这些（前置 1）

- [[Spec-First Workflow]] · **soft** — 不懂【Spec-First Workflow】，就做不了【Spec-driven agent workflow】里「先把规格写细再放行实现」这一步

## 相关

- [[Spec-First Workflow]] · related-to（audit） — 二者近乎同义，Spec-First 可独立理解；作为‘具体形态’的 is-a 关系不构成硬前置
- [[Plan 模式]] · rejected（audit） — Plan 模式只是规格驱动流程里一个可选环节，不是定义或机制上必需的前置
- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Context as working memory budget]]
- [[Plan 模式]]
- [[Reliability-critical harness primitives]]
- [[Spec-First Workflow]]
