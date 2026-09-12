---
id: cm_01e0efb3
name: Token 优化的评审上下文
nameEn: get_review_context_tool
type: REPRESENTATIONAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["get_review_context_tool"]
sources: 1
---

# Token 优化的评审上下文 · get_review_context_tool

> MCP 工具 get_review_context_tool，输出 156–207 token 的结构化评审摘要。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

不是把整个改动文件甩给 AI 去读，而是先浓缩成一份几百 token 的"体检报告"，告诉它这次改动影响了哪些地方、测试有没有覆盖、依赖链是什么样，AI 读这份报告就够了。

## 原文 context

这是图谱落地到 code review 场景的具体产出物——"a compact structural summary (156 to 207 tokens) covering blast radius, test coverage gaps, and dependency chains"，对应 MCP 工具里的 get_review_context_tool（"Token-optimised review context with structural summary"）。

## 掌握证据（做到这些才算会）

- 能调用它并读出 156–207 token 的摘要
- 能指出摘要覆盖 blast radius、测试覆盖缺口与依赖链

## 验收问句

> {{name}} 返回什么，覆盖哪三类结构信息？

## 相关

- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph

## 别名

`get_review_context_tool`

## 反链

- [[code-review-graph]]
- [[Tree-sitter]]
- [[持久化代码图谱 structural map graph]]
