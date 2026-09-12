---
id: cm_6a5b3651
name: chat templated prompts
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [context]
aliases: []
sources: 1
---

# chat templated prompts

> 对话式提示只是补全式提示的一种特殊包装。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

模型并没有天然“记住聊天”；产品把 user / assistant 的历史拼成模板，让模型继续补全下一条 assistant 消息。

## 原文 context

聊天格式只是 completion prompt 的特殊包装。

## 掌握证据（做到这些才算会）

- 能把一段 chat 模板还原成等价的 completion 文本
- 能指出模板中特殊 token 的位置与作用

## 验收问句

> 把这段对话模板写成等价的 {{name}}，特殊 token 放哪？

## 先懂这些（前置 1）

- [[prompt completion]] · **hard** — 对话式提示只是补全式提示的包装，不懂 prompt/completion 就无从理解它

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[Harness]]
- [[coding agent]]
- [[LLM Large Language Model]]
- [[prompt completion]]
