---
id: cm_8d5752d9
name: Agent-driven CI/CD
type: PROCEDURAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Agent-driven CI/CD

> 把规则或单测驱动的 CI/CD 升级为 AI 驱动测试、日志与事故读取、Agent 驱动的缺陷分诊与修复。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

过去是流水线按固定规则检查代码；现在是多个 AI 质检员同时看代码、看日志、看用户反馈，发现问题后直接叫对应的人或 Agent 去修。

## 原文 context

Creao 将传统 rule-based 或 unit testing driven 的 CI/CD 升级为 AI-driven testing、log/error/incident 读取和 Agent-driven bug triage，用 AI 并行发现、分派和修复问题。

## 掌握证据（做到这些才算会）

- 能说出被替换掉的旧环节有哪些
- 能描述 AI 并行发现、分派、修复的流程

## 验收问句

> {{name}}相比传统 CI/CD 多了哪几步？

## 先懂这些（前置 2）

- [[Executable Codebase]] · **soft** — 可执行代码库让 agent 低成本启动并测试，是 CI 自动验证的前提。
- [[docsdecisions]] · **soft** — 不懂【docs/decisions/】，就做不了【Agent-driven CI/CD】的「让 Agent 按既有架构决策正确分诊修复」

## 相关

- [[工具—工作流适配]] · related-to（audit） — 「工具—工作流适配」是引入 AI 驱动 CI 后的连带后果/权衡，不是理解 CI/CD 升级本身的前提。
- [[AI-First]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[信任机制重构]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-14

## 出场

- Harness Engineering ｜ 《Harness Engineering：AI-First 组织的信任机制重构》 ｜ https://app.podwise.ai/dashboard/episodes/8185395
## 反链

- [[Harness 工程 Harness Engineering]]
- [[AI-First]]
- [[信任机制重构]]
- [[docsdecisions]]
- [[Executable Codebase]]
- [[工具—工作流适配]]
