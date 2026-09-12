---
id: cm_1531fbe3
name: 工具即契约
nameEn: tools as the contract
type: CONCEPTUAL
subject: Context Engineering
domain: tools-sandbox
learningStage: now
verification: judge
centrality: 0.067
depth: 0
origin: [context]
aliases: ["tools as the contract"]
sources: 1
---

# 工具即契约 · tools as the contract

> 工具是 Agent 与其信息/行动空间之间的契约，须返回 token 高效的信息，并像良好代码库函数那样自包含、健壮、用途清晰。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

工具不只是能力，更是一份说明书，规定了 agent 能碰什么、怎么碰、碰完拿回什么。说明书写歪了，能力再强也用不对地方；而且工具吐回来的每个字都要占注意力预算，所以「说得少而准」本身就是工具的设计目标。

## 原文 context

文中把工具定义为「the contract between agents and their information/action space」，因此工具必须促进效率：返回 token 高效的信息，并鼓励高效的 agent 行为；工具应像设计良好的代码库函数一样自包含、对错误健壮、用途清晰。

## 掌握证据（做到这些才算会）

- 能按自包含、对错误健壮、用途清晰三条评审一个工具定义
- 能判断某工具返回的信息是否 token 高效

## 验收问句

> 你能按 {{name}} 的标准评审这个工具定义吗？

## 懂了它才能懂（解锁 2）

- [[工具接口的表达力设计]] — 只有先接受工具是契约，才会去追问参数与枚举如何表达期望用法。
- [[Rationale 参数]] — 契约要求调用自包含且用途清晰，rationale 正是让意图事后可重建的手段。

## 相关

- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

## 别名

`tools as the contract`

## 反链

- [[上下文工程 context engineering]]
- [[注意力预算 attention budget]]
- [[上下文腐烂 Context Rot]]
- [[工具接口的表达力设计]]
- [[Rationale 参数]]
