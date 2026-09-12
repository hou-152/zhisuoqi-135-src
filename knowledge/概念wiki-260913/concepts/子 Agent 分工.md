---
id: cm_9cc03c6d
name: 子 Agent 分工
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: multi-agent
learningStage: now
verification: use
centrality: 0.144
depth: 1
origin: [context, harness]
aliases: []
sources: 2
---

# 子 Agent 分工

> 把执行、审查、修复分给不同子 Agent 或模型，避免写代码的 Agent 给自己打分。

**领域** multi-agent ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.144

## 费曼一下

一个 AI 写作业，另一个 AI 批作业。这样比让写作业的 AI 自己宣布满分更可靠。

## 原文 context

作者强调“做事的和检查的分开”，因为写代码的 Agent 不应自己给自己打分。子 Agent 或不同模型可以承担执行、审查、修复等不同角色。

## 掌握证据（做到这些才算会）

- 能画出执行者与检查者分离的分工
- 能说明自评为何不可信

## 验收问句

> 在 {{name}} 中，为什么写代码的 Agent 不该给自己打分？

## 先懂这些（前置 2）

- [[多智能体架构]] · **hard** — 分工是把任务拆给多个 Agent，没有多 Agent 架构就无从分工
- [[Generator-Evaluator Loop]] · **soft** — 不懂生成-评估分离，就理解不了『不让写代码的 Agent 给自己打分』为何要拆执行与审查

## 相关

- [[所有权与问责]] · related-to（audit） — 所有权与问责只是角色分离的动机/理由，不是理解分工概念的前提，属相关性，降 soft 或删
- [[Generator-Evaluator Loop]] · related-to（audit） — 生成-评估循环是「子 Agent 分工」的一个特例，懂特例不必先懂泛化概念，方向应弱化（甚至可视为分工的实例而非依赖）
- [[模型—角色适配]] · related-to（audit） — 前置应是泛化的角色分工；子 Agent 分工只是实例，按角色选模型可独立理解。
- [[Prompt 到 Loop 的跃迁]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[自动循环的心跳]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-07

## 出场

- Context Engineering ｜ 《从 Prompt 转向 Loop Engineering 的工作流拐点》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzIyMzA5NjEyMA%3D%3D&mid=2647683561&idx=1&sn=cb696e11357022c64360c79bf9471f22&poc_token=HNz8L2qjHT7l7D-hSGkoiWTVrXB7ZPRuFeZy6Ptl
- Harness Engineering ｜ 《从 Prompt 转向 Loop Engineering 的工作流拐点》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzIyMzA5NjEyMA%3D%3D&mid=2647683561&idx=1&sn=cb696e11357022c64360c79bf9471f22&poc_token=HNz8L2qjHT7l7D-hSGkoiWTVrXB7ZPRuFeZy6Ptl
## 反链

- [[Loop Engineering]]
- [[多智能体架构]]
- [[自动循环的心跳]]
- [[所有权与问责]]
- [[Generator-Evaluator Loop]]
- [[模型—角色适配]]
- [[Prompt 到 Loop 的跃迁]]
