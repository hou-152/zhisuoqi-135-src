---
id: cm_01908681
name: Blast radius
type: CONCEPTUAL
subject: Context Engineering
domain: code-engineering
learningStage: now
verification: judge
centrality: 0.067
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Blast radius

> 一处改动会波及到的函数、类与文件范围，用于判断改动影响面。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

你改了一行代码，这行代码会像水波一样影响到哪些函数、哪些文件、哪些测试——"影响半径"就是把这圈涟漪精确画出来，让 AI 知道除了你改的地方，还该关心哪些地方。

## 原文 context

这是全文评审和编码场景共用的核心概念——查询图谱后"reads only the relevant files along with their blast-radius information"；MCP 工具里专门有 get_impact_radius_tool（"Blast radius of changed files"）；特性表里也称之为"Shows exactly which functions, classes, and files are affected by any change"。

## 掌握证据（做到这些才算会）

- 能列出改某函数后被牵连的调用方与文件清单
- 能用图谱工具（如 get_impact_radius_tool）产出变更影响半径

## 验收问句

> 改一处代码前，你能说出 {{name}} 覆盖哪些文件和函数吗？

## 先懂这些（前置 1）

- [[可维护性 霰弹式手术]] · **soft** — 霰弹式手术就是 blast radius 过大的表现，用它衡量影响面。

## 懂了它才能懂（解锁 1）

- [[Diff 锚定]] — 从 diff 出发审查需参考 blast radius 限定探索范围。

## 相关

- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph
## 反链

- [[持久化代码图谱 structural map graph]]
- [[code-review-graph]]
- [[可维护性 霰弹式手术]]
- [[Diff 锚定]]
- [[Tree-sitter]]
