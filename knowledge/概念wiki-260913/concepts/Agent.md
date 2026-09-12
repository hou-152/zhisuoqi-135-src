---
id: cm_0608c405
name: Agent
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.144
depth: 0
origin: [harness]
aliases: []
sources: 2
---

# Agent

> Agent 即装备了指令与工具的 LLM；最小配置只需 name 与 instructions。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

agent 不是一个神秘的智能体，而是「模型 + 一段说明它该做什么的话 + 一组它能调用的工具」的打包。去掉包装，里面就这三样。

## 原文 context

定义极简——Agents, which are LLMs equipped with instructions and tools。Hello world 中一个 Agent 只需要 name 与 instructions。

## 掌握证据（做到这些才算会）

- 能写出一个最小 Agent 配置的字段
- 能说明 instructions 与 tools 各自提供什么

## 验收问句

> 按最小定义，{{name}} 至少要有哪两个字段？

## 懂了它才能懂（解锁 2）

- [[AI Agent]] — AI Agent 被定义为 Agent 的对外表现。
- [[coding agent]] — 不懂【Agent】，就做不了 coding agent 作为“借工具读写代码的代理”定义

## 相关

- [[Handoffs Agents as tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Python-first]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Function tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[MCP server tool calling]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Sandbox agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Human in the loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Tracing]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Sessions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[higher-level runtime]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Guardrails]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[LLM Large Language Model]] · 组成（运行时组成） — 模型提供推理与生成，Agent 还需要外部运行系统。
- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent = Model + Harness]] · related-to（audit） — 等式本身在定义/解释 Agent，先懂 Agent 并非必要，非 hard 前置。
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Harness]] · 组成（运行时组成） — 来源提出 Agent = Model + Harness；本站在运行组成轴接纳该关系，同时保留 Agent 与 Agent Harness 不同义的行为视角。
- [[Harness]] · 常一起用 — 来源用 Agent = Model + Harness 定义组合关系，并列出系统提示、工具、Skill、MCP、沙箱、交接和压缩中间件。

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[coding agent]]
- [[Guardrails]]
- [[Human in the loop]]
- [[Agent loop]]
- [[Claude Managed Agents]]
- [[primitives]]
- [[Tracing]]
- [[Function tools]]
- [[higher-level runtime]]
- [[LLM Large Language Model]]
- [[MCP server tool calling]]
- [[Sandbox agents]]
- [[Sessions]]
- [[Agent = Model + Harness]]
- [[AI Agent]]
- [[Handoffs Agents as tools]]
- [[messages API 作为直连网关]]
- [[Python-first]]
- [[very few abstractions]]
