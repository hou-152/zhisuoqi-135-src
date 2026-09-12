---
id: cm_b8dff81c
name: Bedrock Managed Agents
type: REPRESENTATIONAL
subject: AI 概念库
domain: harness-runtime
learningStage: when-needed
verification: accept
centrality: 0.117
depth: 4
origin: [notion]
aliases: ["AWS 上的 Codex", "Bedrock 托管 Agent"]
sources: 1
---

# Bedrock Managed Agents

> AWS 原生的托管 agent 运行时，打包身份、权限、状态、日志、治理与部署。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.117

## 费曼一下

把 OpenAI 的前沿模型**直接装进 AWS 的「Agent 运行时整套」里**——身份、权限、状态、日志、治理、部署都是 AWS 原生件。客户不再自己拼，AWS 把「成品 Agent 平台」端给你。Ben 的最佳类比：**「AWS 上的 Codex」**。

## 原文 context

> "OpenAI's frontier models are being packaged inside an AWS-native agent runtime, identity, permission state, logging, governance, and deployment. ... we are packaging a new product that we're working on together to help enable companies that want to build these sorts of stateful agents and make them available."

## 掌握证据（做到这些才算会）

- 能列出托管运行时包含的身份/权限/状态/日志/治理要素
- 能说出它面向想建有状态 agent 的企业

## 验收问句

> {{name}} 替企业托管了哪些 agent 运行要素？

## 先懂这些（前置 4）

- [[Harness]] · **hard** — 它本质是 AWS 官方托管的 harness，不懂 harness 职责就看不懂它打包了什么。
- [[部署系统层]] · **hard** — 身份、权限、状态、日志、治理都属部署系统层要解决的问题，不懂这层便无法理解其定位。
- [[Agent]] · **soft** — 它托管的是 agent，不懂 agent 的最小构成就理解不了被托管的单位。
- [[操作系统类比]] · **soft** — 托管平台以稳定接口封装身份与权限，正是 OS 式抽象的体现，不懂类比就看不出其结构。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Bedrock-Managed-Agents-1c4679b108ff830391258100bba2d4e9

## 别名

`AWS 上的 Codex`、`Bedrock 托管 Agent`

## 反链

- [[Harness]]
- [[Agent]]
- [[操作系统类比]]
- [[部署系统层]]
