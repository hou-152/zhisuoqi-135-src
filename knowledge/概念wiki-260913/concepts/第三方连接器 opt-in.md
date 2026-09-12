---
id: cm_e549dff0
name: 第三方连接器 opt-in
type: PROCEDURAL
subject: Context Engineering
domain: tools-sandbox
learningStage: now
verification: use
centrality: 0.072
depth: 1
origin: [context]
aliases: []
sources: 1
---

# 第三方连接器 opt-in

> 第三方 MCP 工具即便已连上也要经选择器由用户 opt-in；不得替用户挑服务商，紧急也不例外。

**领域** tools-sandbox ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

当 agent 能直接下单时，"替你决定用哪家"就等于替你花钱和交数据。所以在便利和选择权之间，这份规范把默认值放在选择权一侧，并明确拒绝用紧急当理由——因为紧急正是最容易被用来绕过同意的借口。

## 原文 context

标着第三方 MCP App 的工具即使已连上，也要经选择器让用户选；禁止替一个没点名某家的人挑一家；紧急不构成例外——20 分钟内要用车仍然走选择器，因为它只要一点却保住了选服务商的权利；电商永不主动建议。

## 掌握证据（做到这些才算会）

- 能说出紧急 20 分钟内用车仍走选择器这一反例
- 能说明电商场景永不主动建议

## 验收问句

> {{name}} 能在调用第三方工具时坚持 opt-in 且不代选吗？

## 先懂这些（前置 1）

- [[连接器]] · **hard** — 不懂【连接器】，就做不了【第三方连接器 opt-in】的选择器设计——不知道连上了哪些第三方服务，就无从让用户逐项授权

## 相关

- [[权限与推理的架构分离]] · rejected（audit） — opt-in 是权限分离的一个应用例子，不懂分离也能理解 opt-in，不构成前置依赖。
- [[判定程序化写法]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[反自我合理化条款]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[fail-closed 默认]] · 同篇出现（co-occurrence） — 同篇出现：context-20

## 出场

- Context Engineering ｜ 《Opus 5 系统提示词全文流出：一份近两万字的 agent 行为说明书》 ｜ https://github.com/Eversmile12/leaked-llm-prompts/blob/main/Anthropic/opus-5.md
## 反链

- [[权限与推理的架构分离]]
- [[判定程序化写法]]
- [[连接器]]
- [[反自我合理化条款]]
- [[fail-closed 默认]]
