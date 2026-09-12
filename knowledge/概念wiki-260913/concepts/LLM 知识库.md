---
id: cm_60d08d73
name: LLM 知识库
type: PROCEDURAL
subject: AI 概念库
domain: memory-retrieval
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["LLM Wiki", "LLM Knowledge Base", "llm wiki", "个人 wiki", "agent 维护的 wiki"]
sources: 1
---

# LLM 知识库

> agent 增量把杂乱原始资料编译成持久 markdown 知识库：摘要、实体页、概念页、矛盾、日志。

**领域** memory-retrieval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 原文 context

<mention-page url="https://app.notion.com/p/202679b108ff8386979a01933594c9bc"/>
> Instead of using retrieval-augmented generation to answer questions from raw documents each time, an agent incrementally compiles raw sources into a persistent Markdown wiki: summaries, entity pages, concept pages, contradictions, cross-links, logs, and evolving synthesis.
**费曼一下**：Karpathy 重点推的一个 LLM 应用模式，与 RAG 形成对比。
- **RAG**：每次查询都现场把原始文档检索一遍
- **LLM Wiki**：agent **增量地把杂乱原始资料编译成持久 markdown 知识库**——含摘要、实体页、概念页、矛盾标注、交叉引用、日志、演化合成
经典程序无法在杂乱人类文档之上稳健维护这种知识库；LLM 可以。
**为什么重要**：
- 是 "信息变换从不可能变自然" 的典型案例——以前根本不可编程的信息处理被 LLM 解锁
- 是 Karpathy 认为 enhance understanding 的核心工具
- 是 "You can outsource your thinking, but you can't outsource your understanding" 的具体落地：通过不同的信息投影，帮你获得 insight，是"在固定数据上做合成数据生成"
这是 Software 3.0 范式下 agent 能创造的新型知识 artifact。

## 掌握证据（做到这些才算会）

- 能说出它与 RAG 每次现场检索原始文档的区别
- 能设计一个知识库的页面结构与更新流程

## 验收问句

> {{name}} 相比 RAG 在长期积累上强在哪里？

## 相关

- [[项目知识体系]] · related-to（audit） — LLM 知识库是项目知识体系的子集/组件，子集不必依赖全集才能理解。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/LLM-ff3679b108ff8301a23681ec0907abaa

## 别名

`LLM Wiki`、`LLM Knowledge Base`、`llm wiki`、`个人 wiki`、`agent 维护的 wiki`

## 反链

- [[项目知识体系]]
