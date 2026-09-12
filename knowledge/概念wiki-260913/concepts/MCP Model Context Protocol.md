---
id: cm_c3ecbf70
name: MCP
nameEn: Model Context Protocol
type: REPRESENTATIONAL
subject: Context Engineering × Harness Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.177
depth: 0
origin: [context, harness]
aliases: ["Model Context Protocol"]
sources: 3
---

# MCP · Model Context Protocol

> 一种开放的工具接入标准，让 Agent 以统一协议接上外部工具与数据源。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.177

## 费曼一下

MCP 在文中代表一种工具接入方式。它让不同工具可以被标准化接入 Harness，使模型不必只依赖框架内置能力。

## 原文 context

“一种开放的工具接入标准”

## 掌握证据（做到这些才算会）

- 能接上一个 MCP server 并让 Agent 调用其中工具
- 能说明 MCP 相比自写工具封装的优势

## 验收问句

> 接一个新工具时，为什么用 {{name}} 而不是自己写适配？

## 懂了它才能懂（解锁 5）

- [[Harness]] — MCP 是 Agent Harness 接入外部工具与服务的组成部分。
- [[连接器]] — 连接器就是通过 MCP 等协议接上的外部接口，不懂 MCP 便无法理解连接器如何被发现和调用。
- [[原生工具与 MCP 外挂]] — 该取舍就是要不要外挂 MCP 工具，不懂 MCP 就无法判断外挂是否更复杂。
- [[Headless 架构]] — 把每项能力暴露成 API/MCP 工具是 Headless 的核心，不懂 MCP 就无法理解这种暴露方式。
- [[MCP 工具层]] — 八个图谱工具都跑在 MCP 之上，不懂 MCP 就不知这些工具如何被 agent 调用。

## 相关

- [[工具收窄 tool scoping]] · 常一起用（工作流） — Tool Scoping 可关闭当前不用的 MCP 工具面，减少误选与 Context 占用。
- [[系统提示 System Prompt]] · 常一起用（运行时组成） — MCP 接入暴露的工具列表与描述会进入 System Prompt，影响模型可见能力。
- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[非模型架构 Non-model Architecture]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 组成（运行时组成） — MCP 是 Agent Harness 接入外部工具与服务的组成部分。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13

## 出场

- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922

## 别名

`Model Context Protocol`

## 反链

- [[Harness]]
- [[系统提示 System Prompt]]
- [[model-native harness]]
- [[工具收窄 tool scoping]]
- [[连接器]]
- [[AI Agent]]
- [[原生工具与 MCP 外挂]]
- [[Agents SDK]]
- [[Headless 架构]]
- [[MCP 工具层]]
- [[非模型架构 Non-model Architecture]]
