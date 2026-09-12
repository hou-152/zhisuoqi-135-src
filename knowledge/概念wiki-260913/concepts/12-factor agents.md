---
id: cm_716dd66e
name: 12-factor agents
type: REPRESENTATIONAL
subject: Context Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# 12-factor agents

> 仿 12 Factor Apps 的 LLM 软件工程纲领，回答什么原则能让 LLM 软件好到交给生产客户，它不是框架。

**领域** code-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

就像当年 12 Factor Apps 不是一个 Web 框架，而是一份「你的服务要能上云、要能扩容，就得满足这几条」的检查表。12-factor agents 是同一种东西的 agent 版：不管你用什么语言、什么库，只要你的 LLM 软件要交给真实付费用户用，这十二条就是你迟早要面对的工程约束。

## 原文 context

全文的命名与纲领，"In the spirit of 12 Factor Apps"。它回答的是那个被作者单独提为引述块的问题——什么原则能让 LLM 软件「actually good enough to put in the hands of production customers」。作者明确它不是框架，而是一组可以被单独取用的工程要素。

## 掌握证据（做到这些才算会）

- 能列出其中几条可单独取用的工程要素
- 能说明它为什么自称不是框架

## 验收问句

> {{name}} 里哪几条你现在就能用在项目上？

## 先懂这些（前置 1）

- [[Agentic Engineering]] · **soft** — 该纲领在 Agentic Engineering 语境下回答 LLM 软件生产化原则。

## 相关

- [[DAG 编排器]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[扔掉 DAG」的承诺]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[agent 循环]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[context window 即 agent 状态]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[80% 质量墙]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[框架反向工程]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[小而模块化的概念]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[所有权原则]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[工具即结构化输出]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[统一执行状态与业务状态]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[用工具调用联系人类]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[并不 agentic」的 AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[软件即有向图]] · 同篇出现（co-occurrence） — 同篇出现：context-06

## 出场

- Context Engineering ｜ 《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》 ｜ https://github.com/humanlayer/12-factor-agents
## 反链

- [[Agentic Engineering]]
- [[统一执行状态与业务状态]]
- [[80% 质量墙]]
- [[并不 agentic」的 AI Agent]]
- [[工具即结构化输出]]
- [[框架反向工程]]
- [[扔掉 DAG」的承诺]]
- [[软件即有向图]]
- [[所有权原则]]
- [[小而模块化的概念]]
- [[用工具调用联系人类]]
- [[agent 循环]]
- [[context window 即 agent 状态]]
- [[DAG 编排器]]
