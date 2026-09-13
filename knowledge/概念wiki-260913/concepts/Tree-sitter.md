---
id: cm_847c4f22
name: Tree-sitter
type: REPRESENTATIONAL
subject: Context Engineering
domain: code-engineering
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [context]
aliases: []
sources: 1
---

# Tree-sitter

> 解析器框架，为代码构建结构化语法地图，是多语言代码理解工具的底层基础。

**领域** code-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 费曼一下

一个能把各种编程语言的源代码精确拆解成结构化"语法树"的解析引擎，是很多代码工具（包括这里的图谱）用来"读懂代码"的地基。

## 原文 context

文章开篇点明工具的解析基础——"It builds a structural map of your code with Tree-sitter"，后文提到支持 12 种语言的解析都依赖这套底层技术。

## 掌握证据（做到这些才算会）

- 能说明它输出的是语法结构而非纯文本
- 能指出多语言支持依赖同一套底层解析

## 验收问句

> 代码工具要理解多语言结构，为什么绕不开 {{name}}？

## 相关

- [[增量更新 incremental update]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Token 优化的评审上下文 get_review_context_tool]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[MCP 工具层]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[语义搜索 semantic search embeddings]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[code-review-graphignore 排除配置]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Review Quality 评分方法]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Legible Codebase]] · rejected（audit） — custom lint/链接检查不必然基于 Tree-sitter，前置只是可选实现，不构成概念依赖。
- [[Watch 模式与自动更新 hooks]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Watch 模式与自动更新 hooks]] · rejected（audit） — Tree-sitter 只是可选解析实现，watch 模式的核心是文件变更触发同步，不懂它也能理解。
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph
## 反链

- [[Legible Codebase]]
- [[MCP 工具层]]
- [[持久化代码图谱 structural map graph]]
- [[code-review-graph]]
- [[code-review-graphignore 排除配置]]
- [[Review Quality 评分方法]]
- [[Token 优化的评审上下文 get_review_context_tool]]
- [[Watch 模式与自动更新 hooks]]
- [[语义搜索 semantic search embeddings]]
- [[增量更新 incremental update]]
