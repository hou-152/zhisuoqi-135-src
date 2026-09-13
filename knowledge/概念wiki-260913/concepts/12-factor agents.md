---
id: cm_716dd66e
name: 12-factor agents
type: REPRESENTATIONAL
subject: Context Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: []
sources: 1
---

# 12-factor agents

> 一组让 LLM 软件达到生产可交付水准的工程要素纲领，非框架，可单独取用。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

就像当年 12 Factor Apps 不是一个 Web 框架，而是一份「你的服务要能上云、要能扩容，就得满足这几条」的检查表。12-factor agents 是同一种东西的 agent 版：不管你用什么语言、什么库，只要你的 LLM 软件要交给真实付费用户用，这十二条就是你迟早要面对的工程约束。

## 原文 context

全文的命名与纲领，"In the spirit of 12 Factor Apps"。它回答的是那个被作者单独提为引述块的问题——什么原则能让 LLM 软件「actually good enough to put in the hands of production customers」。作者明确它不是框架，而是一组可以被单独取用的工程要素。

## 掌握证据（做到这些才算会）

- 能列出其中若干条要素并说明用途
- 能说明它与框架的区别

## 验收问句

> {{name}} 里哪几条你最该先照做？

## 相关

- [[「扔掉 DAG」的承诺]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[agent 循环]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[context window 即 agent 状态]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[80% 质量墙]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[框架反向工程]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[小而模块化的概念]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[所有权原则]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[工具即结构化输出]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[用工具调用联系人类]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[统一执行状态与业务状态]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[Agentic Engineering]] · related-to（audit） — 12-factor agents 是可独立取用的具体纲领，属于 Agentic Engineering 的一个实例，不懂上位术语也能读懂 12 条；实例化不等于依赖
- [[「并不 agentic」的 AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[软件即有向图]] · 同篇出现（co-occurrence） — 同篇出现：context-06

## 出场

- Context Engineering ｜ 《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》 ｜ https://github.com/humanlayer/12-factor-agents
## 反链

- [[Agentic Engineering]]
- [[agent 循环]]
- [[统一执行状态与业务状态]]
- [[context window 即 agent 状态]]
- [[工具即结构化输出]]
- [[框架反向工程]]
- [[用工具调用联系人类]]
- [[「并不 agentic」的 AI Agent]]
- [[「扔掉 DAG」的承诺]]
- [[80% 质量墙]]
- [[软件即有向图]]
- [[所有权原则]]
- [[小而模块化的概念]]
