---
id: cm_9ed037b8
name: Sandbox
type: CONCEPTUAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.16
depth: 0
origin: [harness]
aliases: []
sources: 2
---

# Sandbox

> 解决代码在哪跑的隔离执行环境，可叠加命令白名单与网络隔离，按需创建、扇出、用完销毁。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.16

## 费曼一下

给 agent 一间一次性实验室——它可以在里面随便炸，炸完把房间扔掉再开一间新的。安全和扩展性其实是同一件事的两面：因为环境是隔离且可抛弃的，所以既能放心让它折腾，也能同时开一百间。

## 原文 context

解决「代码在哪里跑」的问题。本地跑 agent 生成的代码有风险，单个本地环境也无法扩展到大规模负载。沙箱提供安全隔离的执行环境，可叠加命令 allow-list 与网络隔离，并支持按需创建、扇出、用完销毁。

## 掌握证据（做到这些才算会）

- 能说明本地跑 agent 代码与大规模负载各自的风险
- 能为一个 agent 任务设计可销毁的隔离执行环境

## 验收问句

> 你的 {{name}} 是否做到按需创建、用完即毁并限制网络？

## 懂了它才能懂（解锁 5）

- [[Harness]] — Sandbox 是 Agent Harness 隔离执行环境的组成部分。
- [[沙箱化自主]] — 沙箱化自主就是把人机隔离执行搬进沙箱，不懂沙箱隔离就没法理解为何能放心自主。
- [[native sandbox execution]] — 原生沙箱执行是 SDK 内置的沙箱能力，不懂沙箱概念就抓不住它隔离受控的含义。
- [[Sandbox agents]] — Sandbox agents 在隔离工作区跑任务，不懂沙箱就理解不了其工作区与可恢复会话的前提。
- [[Environment]] — Environment 是配置沙箱如何被 provision 的模板，不懂沙箱就不知这些字段在定义什么。

## 相关

- [[harness–compute separation]] · 常一起用（运行时组成） — 沙箱承担被隔离的计算侧，是该分层模式的执行端。
- [[Guardrails]] · 对照（概念边界） — Sandbox 遏制后果，Guardrails 检查并尝试阻断路径。
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[持久化执行 durable execution]] · 常一起用（工作流） — Sandbox 与 Durable Execution 配合，让环境失效后仍能从检查点恢复。
- [[持久化执行 durable execution]] · 常一起用 — 状态外置和检查点让运行在沙箱失效后仍可恢复。
- [[验证闭环 verification loop]] · 常一起用（运行时组成） — Sandbox 为 Verification Loop 提供安全执行、日志、截图与测试环境。
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 组成（运行时组成） — Sandbox 是 Agent Harness 隔离执行环境的组成部分。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[Harness]]
- [[验证闭环 verification loop]]
- [[Agent = Model + Harness]]
- [[Guardrails]]
- [[model-native harness]]
- [[持久化执行 durable execution]]
- [[harness–compute separation]]
- [[沙箱化自主]]
- [[Agents SDK]]
- [[Environment]]
- [[native sandbox execution]]
- [[Sandbox agents]]
