---
id: cm_6b2df7f0
name: Planner-Generator-Evaluator 三 Agent 架构
type: REPRESENTATIONAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Planner-Generator-Evaluator 三 Agent 架构

> 规划、生成、评估三个 Agent 分工，支撑多小时自主编码会话产出完整全栈应用。

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

将软件开发生命周期拆分为三个专业化角色：Planner 负责将简单 prompt 扩展为完整规格（重范围而非实现细节）；Generator 按 sprint 逐功能实现；Evaluator 像真实用户一样测试应用。三者分工明确，通过文件通信。

## 原文 context

The final result was a three-agent architecture—planner, generator, and evaluator—that produced rich full-stack applications over multi-hour autonomous coding sessions.

## 掌握证据（做到这些才算会）

- 能说出 planner/generator/evaluator 各自负责什么
- 能解释评估者介入如何提升长任务产出质量

## 验收问句

> {{name}} 里三个角色分别解决什么问题？

## 先懂这些（前置 2）

- [[Generator-Evaluator Loop]] · **soft** — 三 Agent 架构把生成-评估循环再加一层规划者
- [[Planner–Worker 角色分离]] · **soft** — 不懂 Planner-Worker 分离，就搭不出三 Agent 架构中规划与执行的分工

## 相关

- [[Context Anxiety]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Context Reset vs Compaction]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-09

## 出场

- Harness Engineering ｜ 《Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness》 ｜ https://www.anthropic.com/engineering/harness-design-long-running-apps
## 反链

- [[Harness]]
- [[Planner–Worker 角色分离]]
- [[Context Reset vs Compaction]]
- [[Generator-Evaluator Loop]]
- [[Context Anxiety]]
