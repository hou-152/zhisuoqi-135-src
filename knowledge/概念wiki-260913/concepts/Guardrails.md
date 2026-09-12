---
id: cm_285b2834
name: Guardrails
type: CONCEPTUAL
subject: Harness Engineering
domain: safety-governance
learningStage: when-needed
verification: use
centrality: 0.154
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Guardrails

> 在 Agent 执行的同时并行做输入输出校验与安全检查，不通过就快速失败。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.154

## 费曼一下

护栏不是排在主流程前面挡路的关卡，而是与主流程同时跑的一条检查线。一旦检查不过就立刻中止，不让错误输入白白消耗一整轮推理。

## 原文 context

enable validation of agent inputs and outputs；特性清单里进一步说明它 run input validation and safety checks **in parallel with agent execution**，并且 fail fast when checks do not pass。

## 掌握证据（做到这些才算会）

- 能说明护栏与 Agent 执行是并行而非串行
- 能指出 fail fast 在实际流程中的表现

## 验收问句

> {{name}} 在检查不通过时会怎样，它与 Agent 执行是什么关系？

## 先懂这些（前置 1）

- [[fail-closed 默认]] · **soft** — 护栏不通过即快速失败，其失败语义取自 fail-closed 默认

## 懂了它才能懂（解锁 4）

- [[Harness]] — Guardrails 是 Agent Harness 约束输入、输出与行动路径的组成部分。
- [[Harness 工程 Harness Engineering]] — Guardrails 是 Harness Engineering 约束循环行动路径的实践之一。
- [[Human in the loop]] — 它与 Guardrails 并列构成控制面，先懂护栏才懂其定位
- [[安全路由与能力分层]] — 把高风险请求路由到加装安全措施的模型，先要懂护栏

## 相关

- [[prompt-injection]] · 常一起用（系统职责轴） — 护栏需要识别或限制不受信指令引发的危险行为。
- [[Sandbox]] · 对照（概念边界） — Sandbox 遏制后果，Guardrails 检查并尝试阻断路径。
- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Harness 工程 Harness Engineering]] · 组成（工程范围轴） — Guardrails 是 Harness Engineering 约束循环行动路径的实践之一。
- [[Harness]] · 组成（运行时组成） — Guardrails 是 Agent Harness 约束输入、输出与行动路径的组成部分。

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[Agent]]
- [[Sandbox]]
- [[primitives]]
- [[fail-closed 默认]]
- [[prompt-injection]]
- [[安全路由与能力分层]]
- [[Human in the loop]]
- [[very few abstractions]]
