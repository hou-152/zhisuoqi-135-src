---
id: cm_1c882ecb
name: Symphony
type: REPRESENTATIONAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.092
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Symphony

> 用 Elixir/BEAM 构建的持久守护进程，把交互从写 prompt 变成写 ticket 并移动状态

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.092

## 费曼一下

OpenAI 2026.3 开源的 agent 编排系统。它的创新在于把程序员和 agent 的交互界面从「写 prompt」变成「管 ticket」——你只需要在 Linear 上把任务拖到 Todo，Symphony 自动创建工作空间、派 agent 执行、产出 PR。agent 策略写在 repo 的 [WORKFLOW.md](http://workflow.md/) 里，跟代码一起版本控制。

## 原文 context

把交互从「写 prompt 并触发」简化为「写 ticket 并移动状态」。用 Elixir/BEAM 构建的持久化守护进程。项目管理工具（Linear）变成 agent 的 job scheduler。

## 掌握证据（做到这些才算会）

- 能说明 Linear 在其中充当什么角色
- 能描述 ticket 状态变化如何驱动 agent 执行

## 验收问句

> 在 {{name}} 里，你怎么触发一个 agent 任务？

## 先懂这些（前置 3）

- [[共享文件加锁的协调机制]] · **soft** — 以 ticket 与状态流转协作，本质是共享状态加锁协调的持久化。
- [[Subagent]] · **soft** — 守护进程把工作派发给子代理执行，需先懂子代理封装与回流。
- [[多智能体架构]] · **soft** — 它是编排多个 Agent 的持久化运行时，前提是多 Agent 架构。

## 相关

- [[时间 Scalability Temporal Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[空间 Scalability Spatial Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1

## 出场

- Harness Engineering ｜ 《Harness Engineering 三个 Scaling 维度的统一框架》 ｜ https://yage.ai/share/harness-engineering-scalability-20260330.html
## 反链

- [[Harness 工程 Harness Engineering]]
- [[多智能体架构]]
- [[共享文件加锁的协调机制]]
- [[Subagent]]
- [[空间 Scalability Spatial Scalability]]
- [[时间 Scalability Temporal Scalability]]
