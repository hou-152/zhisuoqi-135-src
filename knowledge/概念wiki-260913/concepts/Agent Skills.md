---
id: cm_094c89da
name: Agent Skills
type: REPRESENTATIONAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.126
depth: 0
origin: [context]
aliases: []
sources: 1
---

# Agent Skills

> Claude 可读的技能文件，文件能递归引用其他文件，常用于教它调用 API 或查询数据库。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

写在文件中的“技能说明书”，告诉 Claude 在特定场景下怎么做。Skills 是 progressive disclosure 的具体载体——模型读取技能文件后，还能顺着引用链找到更多相关信息，实现逍归式的上下文构建。

## 原文 context

Claude could read skill files and those files could then reference other files that the model could read recursively. In fact, a common use of skills is to add more search capabilities to Claude like giving it instructions on how to use an API or query a database.

## 掌握证据（做到这些才算会）

- 能写出一个会被 Claude 读取的 skill 文件
- 能说明 skill 如何引用其他文件扩展检索能力

## 验收问句

> {{name}}怎么用给 Claude 加检索能力？

## 懂了它才能懂（解锁 2）

- [[description 作为触发条件]] — description 是 skill frontmatter 的字段，不懂 Skill 结构就无从谈触发
- [[Progressive disclosure（渐进式披露）与 Skills]] — 渐进披露讲的正是 Skill 的按需加载，没有 Skill 就没有披露对象

## 相关

- [[Action Space]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Elicitation]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[渐进式披露 progressive disclosure]] · 常一起用 — Skill 文件及其递归引用是渐进式披露的实现载体。

## 出场

- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
## 反链

- [[渐进式披露 progressive disclosure]]
- [[Action Space]]
- [[description 作为触发条件]]
- [[Elicitation]]
- [[Progressive disclosure（渐进式披露）与 Skills]]
- [[See Like an Agent]]
