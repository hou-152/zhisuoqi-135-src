---
id: cm_894f275b
name: Stateful Runtime Environment (SRE)
type: REPRESENTATIONAL
subject: AI 概念库
domain: state-persistence
learningStage: when-needed
verification: accept
centrality: 0.181
depth: 2
origin: [notion]
aliases: ["SRE", "有状态 Agent 运行时", "Bedrock SRE"]
sources: 1
---

# Stateful Runtime Environment (SRE)

> 把持久化与状态管理封装进运行环境，构建 agent 时无需再操心这些

**领域** state-persistence ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.181

## 费曼一下

Bedrock Managed Agents 的内部系统名——**有状态的 Agent 运行时**。

## 原文 context

> "When you go put something into Codex or when you go build a new kind of agent in the SRE \[Stateful Runtime Environment\], you should never have to think about that..."

## 掌握证据（做到这些才算会）

- 能说明 SRE 替开发者接管了哪些状态问题
- 能对比它与自建无状态调用链的差别

## 验收问句

> 在 {{name}} 里构建 agent，你需要自己管状态吗？

## 先懂这些（前置 3）

- [[持久化执行 durable execution]] · **soft** — 不懂【持久化执行】，就做不了【Stateful Runtime Environment (SRE)】的「把可重试 step 与检查点恢复封装进运行环境」
- [[snapshotting + rehydration]] · **soft** — 不懂【snapshotting + rehydration】，就做不了【Stateful Runtime Environment (SRE)】的「在新容器里从上次检查点恢复 agent 状态继续跑」
- [[统一执行状态与业务状态]] · **soft** — 不懂【统一执行状态与业务状态】，就做不了【Stateful Runtime Environment (SRE)】的「对外提供简单启动/暂停/恢复 API 并让业务状态随执行状态走」

## 相关

- [[统一执行状态与业务状态]] · related-to（audit） — SRE 只是统一状态的一种落地实现方式，属于可选的实现例子，不懂 SRE 也能立住统一状态概念
- [[Session]] · related-to（audit） — Session 自身定义已含「有状态运行」，懂了单次运行不必先懂 SRE 这个抽象层；SRE 更像 Session 的上位/同义概念，方向可疑，建议降 soft 或反向。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Stateful-Runtime-Environment-SRE-922679b108ff8340a0f48178449d272c

## 别名

`SRE`、`有状态 Agent 运行时`、`Bedrock SRE`

## 反链

- [[持久化执行 durable execution]]
- [[Session]]
- [[统一执行状态与业务状态]]
- [[snapshotting + rehydration]]
