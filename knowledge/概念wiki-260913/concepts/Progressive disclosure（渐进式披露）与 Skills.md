---
id: cm_a09398f3
name: Progressive disclosure（渐进式披露）与 Skills
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.042
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Progressive disclosure（渐进式披露）与 Skills

> harness 启动时不把 Skill 全部载入，按需逐步披露，避免 agent 开工前就拖垮性能。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

先给一份目录，用到哪一章再翻哪一章。它的深层含义是：能力的「存在」和能力的「在场」应该分开——你可以拥有一百个技能，但不必让这一百个同时占着注意力。

## 原文 context

Skills 被定位为 harness 级原语，解决启动时载入过多工具或 MCP server、在 agent 开始干活前就拖垮性能的问题。作者特别强调归属——模型并没有选择让 Skill front-matter 在启动时进入 context，是 harness 替它做了这个保护性取舍。

## 掌握证据（做到这些才算会）

- 能指出这是 harness 而非模型做的取舍
- 能说明它解决启动载入过多工具或 MCP server 的问题

## 验收问句

> {{name}} 中，是谁决定 Skill 何时进入 context？

## 先懂这些（前置 1）

- [[Agent Skills]] · **hard** — 渐进披露讲的正是 Skill 的按需加载，没有 Skill 就没有披露对象

## 相关

- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[Agent = Model + Harness]]
- [[Agent Skills]]
