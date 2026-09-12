---
id: cm_248f7baa
name: 限界上下文
nameEn: bounded context
type: CONCEPTUAL
subject: Context Engineering
domain: code-engineering
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["bounded context"]
sources: 1
---

# 限界上下文 · bounded context

> 限界上下文是应用内使用同一套共享语言的范围，大型 monorepo 可包含多个此类上下文。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

限界上下文是在说语言的适用边界；同一个词可能在不同系统区域有不同含义，所以要划清范围。

## 原文 context

作者把 context 解释成应用里使用同一套 shared language 的范围，大型 monorepo 可以有多个 context。

## 掌握证据（做到这些才算会）

- 能在给定仓库中划出至少一个上下文边界
- 能说明边界内术语一致、边界外需翻译的原因

## 验收问句

> 在一个大 monorepo 里，你如何用 {{name}} 判断哪些模块该共用同一套术语？

## 相关

- [[统一语言 ubiquitous language]] · 常一起用（概念边界） — 统一语言只有在声明的领域边界内才能保持稳定含义。
- [[追问式对齐 Grill Me]] · 同篇出现（co-occurrence） — 同篇出现：context-08
- [[共享理解 shared understanding]] · 同篇出现（co-occurrence） — 同篇出现：context-08
- [[设计树 design tree]] · 同篇出现（co-occurrence） — 同篇出现：context-08
- [[上下文 context]] · 对照（概念边界） — 限界上下文规定领域语言的适用边界，LLM 上下文则是当前推理可获得的信息集合。

## 出场

- Context Engineering ｜ 《从 /grill-me 到 /grill-with-docs：用对话先对齐领域语言》 ｜ https://www.youtube.com/watch?v=6BB6exR8Zd8

## 别名

`bounded context`

## 反链

- [[上下文 context]]
- [[共享理解 shared understanding]]
- [[设计树 design tree]]
- [[统一语言 ubiquitous language]]
- [[追问式对齐 Grill Me]]
