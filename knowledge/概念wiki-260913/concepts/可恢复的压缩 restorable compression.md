---
id: cm_7a183315
name: 可恢复的压缩
nameEn: restorable compression
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["restorable compression"]
sources: 1
---

# 可恢复的压缩 · restorable compression

> 压缩时只丢可再取回的内容：正文可弃，只要 URL 或沙箱路径还在。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

扔掉正文、留下地址，跟撕掉整页纸是两回事。前者是收纳，后者是失忆。

## 原文 context

Manus 压缩策略的设计原则。网页内容可以从上下文中丢弃，只要 URL 还保留；文档正文可以省略，只要沙箱里的路径还在。这让上下文缩短而信息不永久丢失。

## 掌握证据（做到这些才算会）

- 能说出哪些内容可丢、哪些引用必须保留
- 能设计一个凭引用即可还原的压缩方案

## 验收问句

> 上下文超长时，你能按 {{name}} 压缩而不永久丢信息吗？

## 相关

- [[即时检索 Just-in-time Retrieval]] · 常一起用（运行时组成） — 保留下来的引用需要在运行时按需取回原内容。
- [[押注 in-context learning]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[与底层模型正交 orthogonal to the underlying models]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-04

## 出场

- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus

## 别名

`restorable compression`

## 反链

- [[即时检索 Just-in-time Retrieval]]
- [[押注 in-context learning]]
- [[与底层模型正交 orthogonal to the underlying models]]
