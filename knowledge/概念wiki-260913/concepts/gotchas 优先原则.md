---
id: cm_8b69f567
name: gotchas 优先原则
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [context]
aliases: []
sources: 1
---

# gotchas 优先原则

> token 分配原则：简要说明 repo 用途，大部分 token 留给代码库内部的反直觉约定，避免陈述显而易见的事。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

只写它猜不到的那部分。它能自己读代码看出来的事，你写一遍等于浪费预算；它一定会踩的那个坑，你不写就一定会踩。

## 原文 context

CLAUDE.md 一节给出的 token 分配原则：保持轻量，简要说明 repo 用途，把大部分 token 花在 codebase 内部的 gotchas 上（如类型集中在一个 monolithic 文件里），并避免陈述 Claude 看文件系统或 repo 就知道的显而易见的事。

## 掌握证据（做到这些才算会）

- 能判断一条 CLAUDE.md 条目属于 gotcha 还是显而易见
- 能说明简要用途与 gotchas 之间的篇幅取舍

## 验收问句

> 按 {{name}}，一份 CLAUDE.md 的 token 该往哪里分配？

## 懂了它才能懂（解锁 1）

- [[gotchas 优先的 CLAUDE.md]] — 不懂【gotchas 优先原则】，就做不了【gotchas 优先的 CLAUDE.md】的 ⟨把 token 主要分配给反直觉 gotchas 而不是显而易见的事⟩

## 相关

- [[gotchas 优先的 CLAUDE.md]] · related-to（audit） — 两个节点描述几乎逐字重合，是同一 token 分配原则与其 CLAUDE.md 实例化，属同层重复而非前置；说「CLAUDE.md 立不住」不成立，建议合并或降为 soft
- [[护栏型指令的过期]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[判断力优先 let Claude use judgement]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-21

## 出场

- Context Engineering ｜ 《Claude 5 世代的上下文工程，规则变了》 ｜ https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
## 反链

- [[护栏型指令的过期]]
- [[判断力优先 let Claude use judgement]]
- [[gotchas 优先的 CLAUDE.md]]
