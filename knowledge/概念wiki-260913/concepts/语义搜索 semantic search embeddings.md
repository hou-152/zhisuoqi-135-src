---
id: cm_6f5b5fa0
name: 语义搜索
nameEn: semantic search / embeddings
type: REPRESENTATIONAL
subject: Context Engineering
domain: memory-retrieval
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["semantic search / embeddings"]
sources: 1
---

# 语义搜索 · semantic search / embeddings

> 基于向量嵌入按名字或含义检索代码实体的可选特性，依赖 sentence-transformers。

**领域** memory-retrieval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

默认的图谱查询是按名字、按调用关系精确匹配；语义搜索是额外装一层"理解意思"的能力，让你可以用意思相近的描述去找代码，而不必记住确切的函数名。

## 原文 context

作为可选特性出现两次——特性表里的"Semantic search: Optional vector embeddings via sentence-transformers"，以及配置章节的可选依赖"pip install code-review-graph[embeddings]"；对应 MCP 工具里的 embed_graph_tool（"Compute vector embeddings for semantic search"）和 semantic_search_nodes_tool（"Search code entities by name or meaning"）。

## 掌握证据（做到这些才算会）

- 能写出安装可选依赖 code-review-graph[embeddings]
- 能对应到 embed_graph_tool 与 semantic_search_nodes_tool 两个 MCP 工具

## 验收问句

> 开启{{name}}要装什么依赖、对应哪两个 MCP 工具？

## 相关

- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph

## 别名

`semantic search / embeddings`

## 反链

- [[code-review-graph]]
- [[Tree-sitter]]
- [[持久化代码图谱 structural map graph]]
