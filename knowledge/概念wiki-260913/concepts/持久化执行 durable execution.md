---
id: cm_10cbe746
name: 持久化执行
nameEn: durable execution
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: now
verification: judge
centrality: 0.253
depth: 0
origin: [harness]
aliases: ["durable execution"]
sources: 2
---

# 持久化执行 · durable execution

> 把每次 LLM 或工具调用变成一个可独立重试的 step，进程崩溃后从已持久化的检查点继续。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.253

## 费曼一下

像玩游戏时每过一关自动存档。第五关挂了，你从第五关重开，前四关不用重打。持久化执行就是把这套存档机制装进程序的每一步。

## 原文 context

全文的技术底座。「每一次 LLM 调用或工具调用都成为一个 step——一个可独立重试的工作单元。如果进程在第五轮死掉，第一到第四轮已经持久化了。」作者特别点明这不是为 agent 发明的新东西，而是**为结账工作流设计的持久化执行，原封不动地用到了 agent loop 上**。

## 掌握证据（做到这些才算会）

- 能说出第 N 轮崩溃时哪些轮次已经落盘
- 能解释为何丢失沙箱容器不等于丢失整个 run

## 验收问句

> 进程在第五轮挂掉，{{name}} 为什么还能让这次 run 继续？

## 懂了它才能懂（解锁 4）

- [[snapshotting + rehydration]] — 不懂【持久化执行】，就做不了【snapshotting + rehydration】的「在新容器里从上次检查点恢复状态并继续跑完未完成 step」
- [[统一执行状态与业务状态]] — 不懂【持久化执行】，就做不了【统一执行状态与业务状态】的「崩溃后通过启动/暂停/恢复 API 让执行从检查点继续」
- [[Git-backed state]] — 不懂【持久化执行】，就做不了【Git-backed state】的「把循环状态落 git 后按检查点语义支持系统重启崩溃恢复」
- [[Stateful Runtime Environment (SRE)]] — 不懂【持久化执行】，就做不了【Stateful Runtime Environment (SRE)】的「把可重试 step 与检查点恢复封装进运行环境」

## 相关

- [[step ID 自动索引]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[普遍可触发 universally triggered]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[子 agent 与 step.invoke()]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[两级上下文剪枝 pruning]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[预算警告与溢出恢复]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[steering]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[step]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[think → act → observe 循环]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[事件驱动编排与执行解耦]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[webhook transform 与 connect()]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[小函数组合]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[压缩（compaction）与运行内外的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[基础设施问题，不是 AI 问题]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Sandbox]] · 常一起用（工作流） — Sandbox 与 Durable Execution 配合，让环境失效后仍能从检查点恢复。
- [[Sandbox]] · 常一起用 — 状态外置和检查点让运行在沙箱失效后仍可恢复。
- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Agent loop]] · 常一起用（工作流） — Durable Execution 把 Agent Loop 的每次模型与工具调用变成可独立重试步骤。
- [[Agent loop]] · 常一起用 — 持久化执行把 Agent Loop 的每次模型和工具调用变成可独立重试的步骤。
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 组成（运行时组成） — Durable Execution 是 Agent Harness 提供可靠重试与恢复的组成部分。
- [[Harness]] · 常一起用 — 解耦的编排层为 harness 带来可观测性、持久化执行和重试。

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/

## 别名

`durable execution`

## 反链

- [[Sandbox]]
- [[Agent loop]]
- [[Stateful Runtime Environment (SRE)]]
- [[事件驱动编排与执行解耦]]
- [[统一执行状态与业务状态]]
- [[压缩（compaction）与运行内外的分工]]
- [[Git-backed state]]
- [[model-native harness]]
- [[snapshotting + rehydration]]
- [[think → act → observe 循环]]
- [[基础设施问题，不是 AI 问题]]
- [[两级上下文剪枝 pruning]]
- [[普遍可触发 universally triggered]]
- [[小函数组合]]
- [[预算警告与溢出恢复]]
- [[子 agent 与 step.invoke()]]
- [[Agents SDK]]
- [[harness 与 framework 的分野]]
- [[steering]]
- [[step]]
- [[step ID 自动索引]]
- [[webhook transform 与 connect()]]
