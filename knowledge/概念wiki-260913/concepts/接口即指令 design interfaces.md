---
id: cm_d8b3f368
name: 接口即指令
nameEn: design interfaces
type: CONCEPTUAL
subject: Context Engineering
domain: tools-sandbox
learningStage: now
verification: use
centrality: 0.072
depth: 2
origin: [context]
aliases: ["design interfaces"]
sources: 1
---

# 接口即指令 · design interfaces

> 通过重新设计工具、脚本、文件的参数与枚举取值，让接口本身就在提示 agent 的正确用法。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

好工具不需要说明书。插头只能按一个方向插进插座，你不用读手册也不会插反——形状本身就是指令。

## 原文 context

替代示例的方案。作者要求重新思考工具、脚本、文件的**设计**：Claude 有哪些参数，这些参数怎样更有表达力。Todo 工具的例子说明了机制：把 status 写成 pending / in_progress / completed 的枚举，本身就在提示用法；"同时只保留一项 in_progress"则定义了期望行为。

## 掌握证据（做到这些才算会）

- 能举出 Todo 工具用 pending/in_progress/completed 枚举暗示用法的例子
- 能为一个易误用的工具重新设计出更少歧义的参数

## 验收问句

> 你能否用 {{name}} 改造一个易误用的工具？

## 先懂这些（前置 1）

- [[工具接口的表达力设计]] · **soft** — 不懂【工具接口的表达力设计】，就做不了【接口即指令】的落地——枚举取值等提示手法都属表达力设计范畴

## 相关

- [[prompt 与 context 的通用性落差]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[过度约束与松绑 over-constraining unhobbling]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-22

## 出场

- Context Engineering ｜ 《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》 ｜ https://x.com/trq212/status/2080710971228918066/?s=12

## 别名

`design interfaces`

## 反链

- [[上下文工程 context engineering]]
- [[工具接口的表达力设计]]
- [[过度约束与松绑 over-constraining unhobbling]]
- [[prompt 与 context 的通用性落差]]
