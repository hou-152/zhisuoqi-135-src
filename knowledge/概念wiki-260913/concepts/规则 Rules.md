---
id: cm_ed904c68
name: 规则
nameEn: Rules
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: context-engineering
learningStage: now
verification: use
centrality: 0.089
depth: 1
origin: [neican]
aliases: ["Rules"]
sources: 1
---

# 规则 · Rules

> 放在 .cursor/rules/ 的 markdown 文件，每次对话开始时智能体都会看到。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.089

## 费曼一下

规则是始终进入每次对话的自定义指令，放在 `.cursor/rules/` 里，用 markdown 写。它补足智能体不了解团队习惯、偏好工具和业务上下文的问题。因为智能体每次都会看到规则，规则会一直占用上下文，所以作者强调它应简短、具体、引用权威示例，而不是照搬整套风格指南或记录所有命令。它是两层自定义的第一层，也是理解“始终生效的约定”与“按需技能”区别的基础。

## 原文 context

规则是存储在 `.cursor/rules/` 中的 markdown 文件，智能体会在每次对话开始时看到这些文件。您可以将其视为始终包含的指令，用于指导智能体如何处理您的代码。

好的规则文件应简短、具体，引用示例而非直接复制示例：

## 掌握证据（做到这些才算会）

- 能写出一个简短具体、引用示例而非照搬的规则文件
- 能说出规则适合承载哪类内容

## 验收问句

> 什么内容适合写进{{name}}而不是技能里？

## 先懂这些（前置 1）

- [[上下文用量 上下文管理 context usage context management]] · **soft** — 不懂【上下文用量 / 上下文管理】，就做不了决定「每次对话开始时都注入哪些规则文件、注入多少」这件事。

## 出场

- AI 内参 260912 ｜ 《自定义 Agent》 ｜ https://cursor.com/cn/learn/customizing-agents

## 别名

`Rules`

## 反链

- [[上下文用量 上下文管理 context usage context management]]
