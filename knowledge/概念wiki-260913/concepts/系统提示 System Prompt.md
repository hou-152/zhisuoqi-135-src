---
id: cm_980c195f
name: 系统提示
nameEn: System Prompt
type: REPRESENTATIONAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.126
depth: 1
origin: [context]
aliases: ["System Prompt"]
sources: 1
---

# 系统提示 · System Prompt

> 调用前注入的系统级指令；文中批评每轮把当前时间、当前模式、当前状态写回它的做法。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

系统提示应该承担稳定规则，而不是每轮变化的状态栏。把动态信息塞进系统提示，就等于把最该缓存的层改成了最不稳定的层。

## 原文 context

文章批评了每轮把当前时间、当前模式、当前状态写回系统提示的做法。

## 掌握证据（做到这些才算会）

- 能说明把易变状态写回 system prompt 的缓存与注意力代价
- 能区分哪些内容该留在系统提示、哪些该外移

## 验收问句

> {{name}} 里到底该不该放当前时间和当前模式？

## 先懂这些（前置 1）

- [[tokens]] · **soft** — system prompt 占用并消耗上下文 token，懂 token 才知其代价。

## 懂了它才能懂（解锁 3）

- [[Harness]] — System Prompt 是 Agent Harness 配置模型行为的组成部分。
- [[上下文 context]] — System Prompt 是模型生成响应前可见 Context 的组成之一。
- [[系统 prompt 的体量差]] — 比较claude code与cursor的体量差，先要知道system prompt是什么

## 相关

- [[MCP Model Context Protocol]] · 常一起用（运行时组成） — MCP 接入暴露的工具列表与描述会进入 System Prompt，影响模型可见能力。
- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[Harness token floor]] · 常一起用（运行时组成） — 系统提示是 Harness Token 底座的固定组成之一。
- [[提示词缓存 Prompt Caching]] · 常一起用（运行时组成） — 稳定的系统提示通常构成高复用缓存前缀的一部分。
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[上下文 context]] · 组成（运行时组成） — System Prompt 是模型生成响应前可见 Context 的组成之一。
- [[上下文 context]] · 常一起用 — System Prompt 和可用工具定义都是来源列出的 Context 构成。
- [[Harness]] · 组成（运行时组成） — System Prompt 是 Agent Harness 配置模型行为的组成部分。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`System Prompt`

## 反链

- [[Harness]]
- [[MCP Model Context Protocol]]
- [[tokens]]
- [[Harness token floor]]
- [[上下文 context]]
- [[LLM Large Language Model]]
- [[coding agent]]
- [[系统 prompt 的体量差]]
- [[缓存断点 Cache Breakpoint]]
- [[提示词缓存 Prompt Caching]]
- [[稳定前缀 Stable Prefix]]
