---
id: cm_d8b3f368
name: 接口即指令
nameEn: design interfaces
type: PROCEDURAL
subject: Context Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.072
depth: 2
origin: [context]
aliases: ["design interfaces"]
sources: 1
---

# 接口即指令 · design interfaces

> 用接口设计本身传达用法：参数更有表达力，枚举与约束直接定义期望行为，替代示例说明。

**领域** tools-sandbox ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

好工具不需要说明书。插头只能按一个方向插进插座，你不用读手册也不会插反——形状本身就是指令。

## 原文 context

替代示例的方案。作者要求重新思考工具、脚本、文件的**设计**：Claude 有哪些参数，这些参数怎样更有表达力。Todo 工具的例子说明了机制：把 status 写成 pending / in_progress / completed 的枚举，本身就在提示用法；"同时只保留一项 in_progress"则定义了期望行为。

## 掌握证据（做到这些才算会）

- 能设计一个用 pending/in_progress/completed 枚举表达状态与约束的工具 schema
- 能指出哪些示例可以被接口约束取代

## 验收问句

> 你会怎样让{{name}}替你说清工具用法而不靠示例？

## 先懂这些（前置 1）

- [[工具接口的表达力设计]] · **hard** — 用接口本身传达用法，是接口表达力设计的核心手法，不懂表达力就无从谈起。

## 懂了它才能懂（解锁 1）

- [[任务特定工具说明]] — 先理解接口自身能传达用法，才能判断何时仍需按产品边界另写说明。

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
- [[任务特定工具说明]]
- [[prompt 与 context 的通用性落差]]
- [[过度约束与松绑 over-constraining unhobbling]]
