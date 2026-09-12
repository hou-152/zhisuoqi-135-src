---
id: cm_e09e7cfa
name: coding agent
type: LANGUAGE
subject: Context Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.099
depth: 1
origin: [context]
aliases: []
sources: 1
---

# coding agent

> 由 harness 包裹的 LLM，并借工具获得读写代码等额外能力的代理。

**领域** harness-runtime ｜ **类型** LANGUAGE ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.099

## 费曼一下

coding agent 不是“一个会写代码的模型”，而是一套把模型接到文件系统、终端、代码执行器和项目上下文上的软件系统。

## 原文 context

文章把它定义为由 harness 包住的 LLM，并通过工具获得额外能力。

## 掌握证据（做到这些才算会）

- 能说明 harness 与模型在编码代理中的分工
- 能举出编码代理借工具获得的具体能力

## 验收问句

> {{name}} 由哪两部分构成，工具起什么作用？

## 先懂这些（前置 1）

- [[Agent vs Harness]] · **hard** — coding agent 的定义就是被 harness 包裹、借工具获得读写代码能力的 LLM。

## 懂了它才能懂（解锁 2）

- [[Claude Code]] — Claude Code 是 coding agent 的一个具体产品实例。
- [[Codex]] — Codex 是编码代理产品，不理解 coding agent 就看不懂它。

## 相关

- [[tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[prompt completion]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[multimodal Vision LLMs]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[chat templated prompts]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[stateless]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[cached input tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[reasoning thinking]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[tool loop]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[reasoning effort]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[工具 Tools]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[系统提示 System Prompt]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[tokens]]
- [[系统提示 System Prompt]]
- [[LLM Large Language Model]]
- [[stateless]]
- [[multimodal Vision LLMs]]
- [[reasoning thinking]]
- [[cached input tokens]]
- [[prompt completion]]
- [[工具 Tools]]
- [[Agent vs Harness]]
- [[chat templated prompts]]
- [[Claude Code]]
- [[Codex]]
- [[reasoning effort]]
- [[tool loop]]
