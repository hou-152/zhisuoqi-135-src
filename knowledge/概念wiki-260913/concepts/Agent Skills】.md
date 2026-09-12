---
id: cm_094c89da
name: Agent Skills】
type: REPRESENTATIONAL
subject: Context Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.072
depth: 0
origin: [context]
aliases: []
sources: 1
---

# Agent Skills】

> Claude 可读的 skill 文件，可递归引用其他文件，常用于教会模型调用 API 或查询数据库。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

写在文件中的“技能说明书”，告诉 Claude 在特定场景下怎么做。Skills 是 progressive disclosure 的具体载体——模型读取技能文件后，还能顺着引用链找到更多相关信息，实现逍归式的上下文构建。

## 原文 context

Claude could read skill files and those files could then reference other files that the model could read recursively. In fact, a common use of skills is to add more search capabilities to Claude like giving it instructions on how to use an API or query a database.

## 掌握证据（做到这些才算会）

- 能写一个引用其他文件的 skill
- 能说明 skill 如何为模型补充检索或调用能力

## 验收问句

> {{name}} 的常见用法是什么，如何递归引用文件？

## 懂了它才能懂（解锁 2）

- [[嵌入 Embedded]] — 嵌入即作为 skill 产出物的一部分触发，不懂 skill 就无从谈嵌入。
- [[能力外置化决策]] — 要判断打法是否放进 skills，得先知道 skill 是什么。

## 相关

- [[Action Space】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Elicitation】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[渐进式披露 progressive disclosure]] · 常一起用 — Skill 文件及其递归引用是渐进式披露的实现载体。

## 出场

- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
## 反链

- [[Action Space】]]
- [[渐进式披露 progressive disclosure]]
- [[嵌入 Embedded]]
- [[Elicitation】]]
- [[能力外置化决策]]
- [[See Like an Agent】]]
