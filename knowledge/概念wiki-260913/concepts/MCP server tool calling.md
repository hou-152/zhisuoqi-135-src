---
id: cm_9c15cd8d
name: MCP server tool calling
type: CONCEPTUAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# MCP server tool calling

> 内置 MCP server 的工具接入与 function tools 走同一路径，调用方式完全一致。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

外部 MCP 服务器提供的工具，和你自己写的 Python 函数工具，在调用面上长得一模一样。工具从哪来对 agent 是透明的，这让本地能力和外部能力可以随意互换。

## 原文 context

Built-in MCP server tool integration that **works the same way as function tools**。

## 掌握证据（做到这些才算会）

- 能说明 MCP 工具与 function tool 在调用侧没有差别
- 能据此用同一套代码接入两类工具

## 验收问句

> 你能证明 {{name}} 与 function tool 调用是同一套接法吗？

## 先懂这些（前置 1）

- [[Function tools]] · **soft** — 它与 function tools 走同一调用路径，先懂函数工具更易理解两者为何一致。

## 相关

- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent]]
- [[primitives]]
- [[Function tools]]
- [[very few abstractions]]
