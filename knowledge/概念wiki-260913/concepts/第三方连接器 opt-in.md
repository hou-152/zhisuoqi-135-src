---
id: cm_e549dff0
name: 第三方连接器 opt-in
type: PROCEDURAL
subject: Context Engineering
domain: safety-governance
learningStage: now
verification: use
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# 第三方连接器 opt-in

> 第三方工具即使已连上，也必须由用户在选择器中点名，紧急也不构成例外。

**领域** safety-governance ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

当 agent 能直接下单时，"替你决定用哪家"就等于替你花钱和交数据。所以在便利和选择权之间，这份规范把默认值放在选择权一侧，并明确拒绝用紧急当理由——因为紧急正是最容易被用来绕过同意的借口。

## 原文 context

标着第三方 MCP App 的工具即使已连上，也要经选择器让用户选；禁止替一个没点名某家的人挑一家；紧急不构成例外——20 分钟内要用车仍然走选择器，因为它只要一点却保住了选服务商的权利；电商永不主动建议。

## 掌握证据（做到这些才算会）

- 能说明 20 分钟内紧急用车仍走选择器的理由
- 能说出电商场景永不主动建议的规则

## 验收问句

> {{name}} 之下，紧急场景可以跳过选择器吗？

## 先懂这些（前置 1）

- [[权限与推理的架构分离]] · **soft** — 由选择器而非模型决定工具权限，正是权限与推理分离的体现

## 相关

- [[判定程序化写法]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[反自我合理化条款]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[fail-closed 默认]] · 同篇出现（co-occurrence） — 同篇出现：context-20

## 出场

- Context Engineering ｜ 《Opus 5 系统提示词全文流出：一份近两万字的 agent 行为说明书》 ｜ https://github.com/Eversmile12/leaked-llm-prompts/blob/main/Anthropic/opus-5.md
## 反链

- [[权限与推理的架构分离]]
- [[判定程序化写法]]
- [[fail-closed 默认]]
- [[反自我合理化条款]]
