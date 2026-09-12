---
id: cm_0e153b8f
name: Rationale 参数
type: PROCEDURAL
subject: AI 概念库
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [notion]
aliases: ["理由参数｜让 Agent 在每次工具调用里自报\"为什么\""]
sources: 1
---

# Rationale 参数

> 每次 MCP 或 CLI 工具调用都强制带上 rationale 参数，用以事后重建意图。

**领域** tools-sandbox ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

- 在隐私不允许 SaaS 厂商看用户与 Agent 的聊天记录的前提下，**让 Agent 自己写一句"我为什么这么调"**，是最便宜的意图采集方式。

## 原文 context

> 每一次 MCP 或 CLI 工具调用，都要求 AI 智能体带上一个 `rationale` 参数，解释它为什么要发起这个请求。我们看不到聊天内容，但这个理由可以重建意图。

## 掌握证据（做到这些才算会）

- 能在工具调用日志中看到 rationale 字段
- 能仅凭 rationale 说出该次调用的目的

## 验收问句

> 看不到聊天记录时，{{name}} 帮你还原什么？

## 先懂这些（前置 1）

- [[工具定义 Tool Definitions Tool Schema]] · **hard** — 不懂【工具定义】，就做不了【Rationale 参数】——它必须作为必填参数加进每个工具的 schema

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Rationale-f88679b108ff8256960101d90393cbde

## 别名

`理由参数｜让 Agent 在每次工具调用里自报"为什么"`

## 反链

- [[工具定义 Tool Definitions Tool Schema]]
