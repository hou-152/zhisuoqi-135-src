---
id: cm_e09e7cfa
name: coding agent
type: LANGUAGE
subject: Context Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.236
depth: 1
origin: [context]
aliases: []
sources: 1
---

# coding agent

> 由 harness 包裹的 LLM，并借工具获得读写代码等额外能力的代理。

**领域** harness-runtime ｜ **类型** LANGUAGE ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.236

## 费曼一下

coding agent 不是“一个会写代码的模型”，而是一套把模型接到文件系统、终端、代码执行器和项目上下文上的软件系统。

## 原文 context

文章把它定义为由 harness 包住的 LLM，并通过工具获得额外能力。

## 掌握证据（做到这些才算会）

- 能说明 harness 与模型在编码代理中的分工
- 能举出编码代理借工具获得的具体能力

## 验收问句

> {{name}} 由哪两部分构成，工具起什么作用？

## 先懂这些（前置 2）

- [[Harness]] · **hard** — 不懂【Harness】，就做不了 coding agent 的“harness 包裹 LLM”定义
- [[Agent]] · **soft** — 不懂【Agent】，就做不了 coding agent 作为“借工具读写代码的代理”定义

## 懂了它才能懂（解锁 2）

- [[Claude Code]] — 先知道 coding agent 是什么，才不至于把 Claude Code 当成聊天工具。
- [[Codex]] — Codex 是编码代理产品，理解它先要理解 harness 包裹 LLM 这一形态。

## 相关

- [[prompt completion]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[chat templated prompts]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[cached input tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[reasoning effort]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[tool loop]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[工具 Tools]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[reasoning thinking]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[multimodal Vision LLMs]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[stateless]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[系统提示 System Prompt]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[agent 与 harness 的分工]] · related-to（audit） — coding agent 的定义只用到 harness 本身（包裹 LLM + 工具），agent/harness 的涌现哲学分工不是理解的必要条件，应降为 soft。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[Harness]]
- [[工具 Tools]]
- [[cached input tokens]]
- [[stateless]]
- [[Agent]]
- [[系统提示 System Prompt]]
- [[agent 与 harness 的分工]]
- [[LLM Large Language Model]]
- [[multimodal Vision LLMs]]
- [[reasoning thinking]]
- [[tokens]]
- [[tool loop]]
- [[chat templated prompts]]
- [[Claude Code]]
- [[Codex]]
- [[prompt completion]]
- [[reasoning effort]]
