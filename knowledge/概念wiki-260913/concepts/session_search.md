---
id: cm_c1139916
name: session_search
type: REPRESENTATIONAL
subject: AI 概念库
domain: memory-retrieval
learningStage: when-needed
verification: accept
centrality: 0.126
depth: 1
origin: [notion]
aliases: ["会话搜索", "情景回溯", "hermes session_search"]
sources: 1
---

# session_search

> Hermes 的长尾回溯系统，负责从历史会话里把需要的那一段过去翻出来。

**领域** memory-retrieval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.126

## 费曼一下

- Hermes 的「**长尾回溯系统**」。所有历史会话存在 SQLite 里，带完整索引和搜索。

## 原文 context

> 如果说 `MEMORY.md` 是 Hermes 的「短期热记忆」，那么 `session_search` 就是它的「长尾回溯系统」。

## 掌握证据（做到这些才算会）

- 能说出它与短期热记忆 MEMORY.md 的分工
- 能描述一次回溯查询的输入与返回

## 验收问句

> {{name}} 和短期热记忆各管哪一段？

## 先懂这些（前置 2）

- [[记忆 Memory]] · **hard** — 不懂【记忆】的跨会话沉淀，就做不了【session_search】的长尾历史会话翻找
- [[即时检索 Just-in-time Retrieval]] · **soft** — 不懂【即时检索】就做不了 session_search 的「只留索引、需要时再翻出那一段」

## 相关

- [[跨会话记忆文件系统]] · related-to（audit） — session_search 查的是原始会话历史，而「跨会话记忆文件系统」是经过提炼的、带版本令牌/frontmatter 的另一层策展式存储；两者是并列的记忆组件，前者不靠后者也能立住。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/session_search-3c8679b108ff8248818d019519a05a6b

## 别名

`会话搜索`、`情景回溯`、`hermes session_search`

## 反链

- [[记忆 Memory]]
- [[即时检索 Just-in-time Retrieval]]
- [[跨会话记忆文件系统]]
