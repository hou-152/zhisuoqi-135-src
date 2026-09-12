---
id: cm_c1139916
name: session_search
type: REPRESENTATIONAL
subject: AI 概念库
domain: memory-retrieval
learningStage: when-needed
verification: use
centrality: 0.045
depth: 2
origin: [notion]
aliases: ["会话搜索", "情景回溯", "hermes session_search"]
sources: 1
---

# session_search

> Hermes 的长尾回溯系统，负责从历史会话里把需要的那一段过去翻出来。

**领域** memory-retrieval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

- Hermes 的「**长尾回溯系统**」。所有历史会话存在 SQLite 里，带完整索引和搜索。

## 原文 context

> 如果说 `MEMORY.md` 是 Hermes 的「短期热记忆」，那么 `session_search` 就是它的「长尾回溯系统」。

## 掌握证据（做到这些才算会）

- 能说出它与短期热记忆 MEMORY.md 的分工
- 能描述一次回溯查询的输入与返回

## 验收问句

> {{name}} 和短期热记忆各管哪一段？

## 先懂这些（前置 1）

- [[跨会话记忆文件系统]] · **hard** — session_search 从历史会话翻出长尾信息，依赖跨会话记忆文件系统。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/session_search-3c8679b108ff8248818d019519a05a6b

## 别名

`会话搜索`、`情景回溯`、`hermes session_search`

## 反链

- [[跨会话记忆文件系统]]
