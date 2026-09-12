---
id: cm_83367caa
name: prompt / completion
type: LANGUAGE
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: accept
centrality: 0.072
depth: 0
origin: [context]
aliases: []
sources: 1
---

# prompt / completion

> 模型的输入称 prompt，输出称 completion 或 response。

**领域** context-engineering ｜ **类型** LANGUAGE ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.072

## 费曼一下

所有聊天、工具调用和 agent 步骤，归根到底都是在构造一个 prompt，然后让模型补全下一段。

## 原文 context

输入叫 prompt，输出叫 completion 或 response。

## 掌握证据（做到这些才算会）

- 能在 API 文档中指认这两个字段
- 能正确区分输入文本与输出文本

## 验收问句

> 在 {{name}} 里，输出那一侧叫什么？

## 懂了它才能懂（解锁 2）

- [[chat templated prompts]] — 对话模板只是 prompt/completion 的一种包装，先懂输入输出基本框架
- [[prompt 与 context 的通用性落差]] — 该落差讲的是 prompt 与 context 可具体程度之差，先要知道 prompt 是什么

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[Harness]]
- [[LLM Large Language Model]]
- [[coding agent]]
- [[chat templated prompts]]
- [[prompt 与 context 的通用性落差]]
