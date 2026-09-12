---
id: cm_6d45fdf6
name: Handoff Artifact
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.042
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# Handoff Artifact

> 彻底清空上下文窗口并启动新 Agent 时，用结构化交接工件携带上一个 Agent 的状态与下一步。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

在 context reset 时，上一个 agent 留给下一个 agent 的结构化状态文件。它必须包含足够的信息让新 agent 能干净利落地接手工作。质量好坏直接决定 context reset 的效果。

## 原文 context

Context resets—clearing the context window entirely and starting a fresh agent, combined with a structured handoff that carries the previous agent’s state and the next steps—addresses both these issues.

## 掌握证据（做到这些才算会）

- 能说明为何要整体清空上下文而非压缩
- 能列出交接工件必须承载的状态与下一步信息

## 验收问句

> {{name}} 解决了上下文重置后的什么问题？

## 先懂这些（前置 1）

- [[Context Reset vs Compaction]] · **hard** — 交接物是为重置服务的，不懂重置与压缩之别就不知它为何存在

## 相关

- [[Context Anxiety]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Context Reset vs Compaction]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-09

## 出场

- Harness Engineering ｜ 《Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness》 ｜ https://www.anthropic.com/engineering/harness-design-long-running-apps
## 反链

- [[Context Reset vs Compaction]]
- [[Context Anxiety]]
