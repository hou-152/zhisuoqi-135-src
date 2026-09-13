---
id: cm_8089ce21
name: 工具定义
nameEn: Tool Definitions / Tool Schema
type: REPRESENTATIONAL
subject: Context Engineering
domain: tools-sandbox
learningStage: now
verification: use
centrality: 0.454
depth: 0
origin: [context]
aliases: ["Tool Definitions / Tool Schema"]
sources: 1
---

# 工具定义 · Tool Definitions / Tool Schema

> 描述工具名称、参数与用途的 schema，在 Agent 场景常占大量 token，且位于缓存前缀最前部。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.454

## 费曼一下

工具定义不是附属品，而是缓存地基的一部分。频繁增删工具、重排工具、让 JSON key 顺序漂移，本质上是在反复拆地基。

## 原文 context

在 Agent 场景里，工具 schema 本身常常占据大量 token，并且位于缓存前缀的最前部。

## 掌握证据（做到这些才算会）

- 能写出一份简洁完整的工具 schema
- 能估算其 token 占用并说明它处在缓存前缀最前部的影响

## 验收问句

> 你能说明 {{name}} 为什么值得放进缓存前缀吗？

## 懂了它才能懂（解锁 8）

- [[工具接口的表达力设计]] — 不懂【工具定义】，就做不了【工具接口的表达力设计】——表达力全靠定义里的参数与枚举来表达
- [[任务特定工具说明]] — 不懂【工具定义】，就做不了【任务特定工具说明】的配置——instructions 字段本身就是工具定义的组成部分
- [[延迟加载工具与 ToolSearch]] — 不懂【工具定义】，就做不了【延迟加载工具与 ToolSearch】——ToolSearch 搜到并注入的正是完整工具定义
- [[Rationale 参数]] — 不懂【工具定义】，就做不了【Rationale 参数】——它必须作为必填参数加进每个工具的 schema
- [[工具 Tools]] — 不懂【工具定义】，就做不了【工具】的任何一次调用——模型没有名称与参数 schema 就无从生成合法调用
- [[MCP Model Context Protocol]] — 不懂【工具定义】，就做不了【MCP】的工具接入设计——MCP 服务端的 tools/list 必须给出 name/description/inputSchema
- [[工具即契约 tools as the contract]] — 不懂【工具定义】，就做不了【工具即契约】的契约撰写——参数、返回结构与用途约束都写在定义里
- [[logits 掩码与 context-aware 状态机]] — 不懂【工具定义】，就做不了【logits 掩码与状态机】的动作名前缀约束——掩码要按定义里的动作名逐位对齐

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Tool Definitions / Tool Schema`

## 反链

- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
- [[工具 Tools]]
- [[MCP Model Context Protocol]]
- [[工具即契约 tools as the contract]]
- [[工具接口的表达力设计]]
- [[缓存断点 Cache Breakpoint]]
- [[任务特定工具说明]]
- [[延迟加载工具与 ToolSearch]]
- [[logits 掩码与 context-aware 状态机]]
- [[Rationale 参数]]
