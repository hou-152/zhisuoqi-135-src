---
id: cm_7d0aaf27
name: 增量更新
nameEn: incremental update
type: CONCEPTUAL
subject: Context Engineering
domain: code-engineering
learningStage: when-needed
verification: compute
centrality: 0.017
depth: 0
origin: [context]
aliases: ["incremental update"]
sources: 1
---

# 增量更新 · incremental update

> 索引随每次文件编辑与 git commit 自动增量更新，CLI 的 update 只处理变更文件，后续更新在 2 秒内完成。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.017

## 费曼一下

地图第一次画好之后，以后每次你只改了几个文件，系统只重新画这几处，而不是把整张地图推倒重来，所以更新特别快。

## 原文 context

文中反复强调这一机制——"tracks changes incrementally"，安装后"the graph updates automatically on every file edit and git commit"，CLI 里专门有 update 命令做"Incremental update (changed files only)"，特性表里注明"Subsequent updates complete in under 2 seconds"。

## 掌握证据（做到这些才算会）

- 能说出 update 命令只处理 changed files
- 能复述后续更新完成时间在 2 秒内的特性

## 验收问句

> 编辑文件后执行 update，{{name}}会处理哪些文件？

## 相关

- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph

## 别名

`incremental update`

## 反链

- [[持久化代码图谱 structural map graph]]
- [[code-review-graph]]
- [[Tree-sitter]]
