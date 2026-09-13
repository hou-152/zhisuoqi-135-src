---
id: cm_d59c122f
name: 持久化代码图谱
nameEn: structural map / graph
type: REPRESENTATIONAL
subject: Context Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.126
depth: 3
origin: [context]
aliases: ["structural map / graph"]
sources: 1
---

# 持久化代码图谱 · structural map / graph

> 把代码库每个函数、类、导入、调用、继承与测试映射成图谱，构建后持久保存在本地，供查询与增量更新。

**领域** state-persistence ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

不是每次都临时给代码拍一张快照，而是造一张一直存在、可以反复查阅、还会自己更新的"代码关系网地图"。

## 原文 context

图谱"maps every function, class, import, call, inheritance relationship, and test in your codebase"，一旦构建完成就持久保存在本地，供后续查询和增量更新使用，而不是每次任务临时生成。

## 掌握证据（做到这些才算会）

- 能说明图谱覆盖哪些代码关系
- 能解释持久保存与每次任务临时生成的区别与收益

## 验收问句

> {{name}} 更新一次要多久，能支撑后续增量查询吗？

## 先懂这些（前置 2）

- [[Artifact Schema]] · **soft** — 不懂【Artifact Schema】，就做不了【持久化代码图谱】的「把图谱作为共享知识层定义 README、schema 与增量添加流程」
- [[对象-边模型与分区]] · **soft** — 不懂【对象-边模型与分区】，就做不了【持久化代码图谱】的 ⟨函数/类对象与调用/导入边的持久化建模⟩

## 相关

- [[增量更新 incremental update]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Token 优化的评审上下文 get_review_context_tool]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[MCP 工具层]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[语义搜索 semantic search embeddings]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[code-review-graphignore 排除配置]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Review Quality 评分方法]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Watch 模式与自动更新 hooks]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph

## 别名

`structural map / graph`

## 反链

- [[对象-边模型与分区]]
- [[Artifact Schema]]
- [[MCP 工具层]]
- [[code-review-graph]]
- [[code-review-graphignore 排除配置]]
- [[Review Quality 评分方法]]
- [[Token 优化的评审上下文 get_review_context_tool]]
- [[Watch 模式与自动更新 hooks]]
- [[语义搜索 semantic search embeddings]]
- [[增量更新 incremental update]]
- [[Tree-sitter]]
