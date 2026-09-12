---
id: cm_894f275b
name: Stateful Runtime Environment (SRE)
type: REPRESENTATIONAL
subject: AI 概念库
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.067
depth: 0
origin: [notion]
aliases: ["SRE", "有状态 Agent 运行时", "Bedrock SRE"]
sources: 1
---

# Stateful Runtime Environment (SRE)

> 把持久化与状态管理封装进运行环境，构建 agent 时无需再操心这些

**领域** state-persistence ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

Bedrock Managed Agents 的内部系统名——**有状态的 Agent 运行时**。

## 原文 context

> "When you go put something into Codex or when you go build a new kind of agent in the SRE \[Stateful Runtime Environment\], you should never have to think about that..."

## 掌握证据（做到这些才算会）

- 能说明 SRE 替开发者接管了哪些状态问题
- 能对比它与自建无状态调用链的差别

## 验收问句

> 在 {{name}} 里构建 agent，你需要自己管状态吗？

## 懂了它才能懂（解锁 2）

- [[Session]] — 一次有状态运行需靠 SRE 拉起沙箱并挂载环境，不懂 SRE 无法理解运行基础。
- [[统一执行状态与业务状态]] — SRE 常配合无状态 reducer 管理统一状态，懂 SRE 更懂落地方式。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Stateful-Runtime-Environment-SRE-922679b108ff8340a0f48178449d272c

## 别名

`SRE`、`有状态 Agent 运行时`、`Bedrock SRE`

## 反链

- [[Session]]
- [[统一执行状态与业务状态]]
