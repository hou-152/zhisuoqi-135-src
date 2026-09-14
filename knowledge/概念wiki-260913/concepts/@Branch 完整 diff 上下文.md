---
id: cm_beb73224
name: @Branch 完整 diff 上下文
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [neican]
aliases: []
sources: 1
---

# @Branch 完整 diff 上下文

> 提示词中的 @Branch 把当前分支的完整 diff 提供给智能体，用于跨文件评审。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

`@Branch` 的作用是给智能体完整分支差异，而不是零散片段。完整 diff 让评审能看到文件之间的关系，从而发现单个文件视角看不到的跨文件问题。

## 原文 context

在提示词中添加 `@Branch`，即可将当前分支的完整 diff 提供给智能体。您可以说“评审此分支上的更改”或“我现在正在做什么？”，为智能体提供丰富的上下文，并发现跨多个文件的问题。

## 掌握证据（做到这些才算会）

- 能在提示词里用 @Branch 把完整分支 diff 交给智能体
- 能说明完整 diff 让它发现单文件视角看不到的跨文件问题

## 验收问句

> {{name}} 在提示词里给智能体补上了什么上下文？

## 先懂这些（前置 1）

- [[上下文用量 上下文管理 context usage context management]] · **hard** — 不懂【上下文用量 / 上下文管理】，就做不了把当前分支的完整 diff 塞进提示词做跨文件评审的取舍。

## 出场

- AI 内参 260912 ｜ 《评审和测试代码》 ｜ https://cursor.com/cn/learn/reviewing-testing
## 反链

- [[上下文用量 上下文管理 context usage context management]]
