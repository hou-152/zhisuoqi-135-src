---
id: cm_319174c9
name: Function tools
type: REPRESENTATIONAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.067
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Function tools

> 把任意 Python 函数变成工具，自动生成 schema 并用 Pydantic 做参数校验。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

你写一个普通函数，框架读它的签名自动生成模型能看懂的工具描述，并用 Pydantic 校验模型传来的参数。工具定义与函数定义合并成同一份代码，不再两处维护。

## 原文 context

Turn any Python function into a tool with automatic schema generation and Pydantic-powered validation。

## 掌握证据（做到这些才算会）

- 能把一个普通 Python 函数注册成工具
- 能说明自动 schema 生成与校验解决了什么

## 验收问句

> 如何用 {{name}} 把一个函数接入 Agent？

## 懂了它才能懂（解锁 2）

- [[MCP server tool calling]] — 它与 function tools 走同一调用路径，先懂函数工具更易理解两者为何一致。
- [[工具即结构化输出]] — 函数自动生成 schema 与参数校验，是『工具即结构化输出』最直接的落地形态。

## 相关

- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent]]
- [[primitives]]
- [[very few abstractions]]
- [[工具即结构化输出]]
- [[MCP server tool calling]]
