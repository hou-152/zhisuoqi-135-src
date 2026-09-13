---
id: cm_10db34e6
name: code-review-graph
type: REPRESENTATIONAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.072
depth: 0
origin: [context]
aliases: []
sources: 1
---

# code-review-graph

> 用 Tree-sitter 为代码库构建结构化图谱并增量追踪变化，让 Claude 只读相关文件的工具。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

给你的代码库先画一张随时更新的"结构地图"，这样 AI 每次帮你改代码或做评审时，不用把整个项目重新翻一遍，直接按图索骥找到该看的地方。

## 原文 context

文章标题工具本身，定位是解决"Claude Code re-reads your entire codebase on every task"的问题，用 Tree-sitter 构建结构化代码地图、增量追踪变化，给 Claude "precise context so it reads only what matters"。

## 掌握证据（做到这些才算会）

- 能在仓库中生成并随改动更新代码图谱
- 能让 Agent 只加载相关文件而非整个代码库

## 验收问句

> {{name}} 相比每次全库重读，给模型的上下文少了什么？

## 懂了它才能懂（解锁 1）

- [[code-review-graphignore 排除配置]] — 它是图谱索引的排除清单，没有图谱这个工具就无所谓排除

## 相关

- [[增量更新 incremental update]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Token 优化的评审上下文 get_review_context_tool]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[MCP 工具层]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[语义搜索 semantic search embeddings]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[code-review-graphignore 排除配置]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Review Quality 评分方法]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Watch 模式与自动更新 hooks]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[just in time 上下文检索]] · related-to（audit） — 工具本身可独立理解，JIT 只是其所体现的方法，非机制前提
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph
## 反链

- [[MCP 工具层]]
- [[持久化代码图谱 structural map graph]]
- [[code-review-graphignore 排除配置]]
- [[just in time 上下文检索]]
- [[Review Quality 评分方法]]
- [[Token 优化的评审上下文 get_review_context_tool]]
- [[Watch 模式与自动更新 hooks]]
- [[语义搜索 semantic search embeddings]]
- [[增量更新 incremental update]]
- [[Tree-sitter]]
