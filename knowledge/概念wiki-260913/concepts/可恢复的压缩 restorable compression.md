---
id: cm_7a183315
name: 可恢复的压缩
nameEn: restorable compression
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.126
depth: 0
origin: [context]
aliases: ["restorable compression"]
sources: 1
---

# 可恢复的压缩 · restorable compression

> 压缩上下文时保留可恢复的锚点：网页留 URL、文档留沙箱路径，缩短而不永久丢信息。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

扔掉正文、留下地址，跟撕掉整页纸是两回事。前者是收纳，后者是失忆。

## 原文 context

Manus 压缩策略的设计原则。网页内容可以从上下文中丢弃，只要 URL 还保留；文档正文可以省略，只要沙箱里的路径还在。这让上下文缩短而信息不永久丢失。

## 掌握证据（做到这些才算会）

- 能列出哪些内容可丢弃、对应的锚点是什么
- 能演示凭锚点重新取回被丢弃的原文

## 验收问句

> 按{{name}}，哪些内容可以从上下文里丢弃而信息不丢？

## 懂了它才能懂（解锁 2）

- [[上下文压缩与即时检索 compaction just-in-time retrieval]] — 不懂【可恢复的压缩】留下的 URL、沙箱路径等锚点，就做不了【上下文压缩与即时检索】中「按需 grep/glob 取回原文」这件事
- [[两级上下文剪枝 pruning]] — 不懂【可恢复的压缩】的锚点做法，就做不了【两级上下文剪枝】中「硬清历史但留占位符」这一步

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
- [[两级上下文剪枝 pruning]]
- [[上下文压缩与即时检索 compaction just-in-time retrieval]]
- [[押注 in-context learning]]
- [[与底层模型正交 orthogonal to the underlying models]]
