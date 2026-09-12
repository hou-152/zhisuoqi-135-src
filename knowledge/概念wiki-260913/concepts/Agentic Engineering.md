---
id: cm_f45e5118
name: Agentic Engineering
type: CONCEPTUAL
subject: AI 概念库 × Harness Engineering
domain: code-engineering
learningStage: now
verification: judge
centrality: 0.135
depth: 0
origin: [notion, harness]
aliases: ["Agentic Engineering", "agentic engineering", "智能体工程", "agent 工程"]
sources: 2
---

# Agentic Engineering

> 协调可错、随机而强大的 agent 快速产出，同时守住正确性、安全、品味与可维护性的工程纪律。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.135

## 费曼一下

Agentic Engineering 是「骑马出行」这件事本身。由 Andrej Karpathy（2026.01）命名，对标的是 Vibe Coding。核心变化是工程师的角色从「写代码的人」变成「编排 Agent 组合、定义目标和护栏、审查输出的人」——从 creator 变为 curator。它关注的是委派、审查、所有权等工作流问题。

## 原文 context

<mention-page url="https://app.notion.com/p/202679b108ff8386979a01933594c9bc"/>
> Agentic engineering raises the ceiling. It is the professional discipline of coordinating fallible agents while preserving correctness, security, taste, and maintainability.
**费曼一下**：Vibe Coding 的对偶概念——**"抬高天花板"** 的工程纪律。
	agent 是 spiky entities：可错、随机、但极其强大。agentic engineer 的任务是**协调它们快速产出，又不放弃专业软件的质量底线**。
具体做法：
- 不盲目接受生成的代码
- 设计 spec、监督计划、检查 diff、写测试
- 建评测循环、管 permissions、隔离 worktree
- 维护品味、安全性、可维护性
**经典反例**：MenuGen 支付 bug——agent 想用 email 把 Stripe 购买匹配到 Google 账号；可信代码，但糟糕系统设计（Stripe email 与 Google login email 可能不同）。需要工程师**坚持用持久 user ID**。
前沿技能不是记 API 细节（agent 能记 `dim/axis/keepdim`），而是懂**底层概念**——storage、views、内存拷贝、不变量、身份、安全边界、系统形状。
Karpathy 说：旧的"10x 工程师"概念会被极大放大——掌握 agentic engineering 的人**远超 10x**。
---
来源：<mention-page url="https://app.notion.com/p/d6d679b108ff82debc5181b2c1ced4ff"/>（Sequoia AI Ascent 演讲原文）
> Vibe coding is about raising the floor for everyone. Agentic engineering is about preserving the quality bar of what existed before in professional software.
**费曼一下（2026-05-03 补充）**：演讲里 Karpathy 给 agentic engineering 一个具体的**招聘范式**：不要再出 puzzle，应该让候选人写一个完整大项目（如 agent 用 Twitter clone），然后用多个高强度 codex / agent 试图攻破它，看候选人能否撑住。这是 agentic engineering 是不是真技能的「压力测试」。

## 掌握证据（做到这些才算会）

- 能说出设计 spec、查 diff、写测试、建评测循环等做法
- 能用一个具体反例说明为何要工程师坚守底层概念

## 验收问句

> {{name}} 与 vibe coding 的分界在哪里？

## 懂了它才能懂（解锁 4）

- [[宏动作]] — 宏动作是 Agentic Engineering 中编程的最小单位，不懂范式就无法理解委派整块工作。
- [[Vibe Coding]] — Vibe Coding 是抬高地板子集，不懂工程纪律就守不住质量底线。
- [[12-factor agents]] — 该纲领在 Agentic Engineering 语境下回答 LLM 软件生产化原则。
- [[准比快重要]] — 准比快是 agentic engineering 守正确性纪律的一环。

## 相关

- [[Bitter Lesson]] · 同篇出现（co-occurrence） — 同篇出现：harness-26
- [[Creator → Curator 角色转换]] · 同篇出现（co-occurrence） — 同篇出现：harness-26
- [[Vibe Coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-26
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-26
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-26
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Agentic-Engineering-8e2679b108ff83118a9381bb0968d204
- Harness Engineering ｜ 《Harness Engineering vs Agentic Engineering：两种工程范式的概念辨析》 ｜ n/a

## 别名

`Agentic Engineering`、`agentic engineering`、`智能体工程`、`agent 工程`

## 反链

- [[宏动作]]
- [[Creator → Curator 角色转换]]
- [[Vibe Coding]]
- [[12-factor agents]]
- [[准比快重要]]
- [[Bitter Lesson]]
