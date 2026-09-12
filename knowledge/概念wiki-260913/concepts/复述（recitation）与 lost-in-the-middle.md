---
id: cm_1d86964c
name: 复述（recitation）与 lost-in-the-middle
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: []
sources: 1
---

# 复述（recitation）与 lost-in-the-middle

> 通过不断重写 todo 把目标复述到上下文末尾，让全局计划落在模型最近的注意力跨度内，避开中段被忽略。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

开长会容易忘了议题，所以每隔一会儿就把议题重念一遍。念的不是给别人听，是给自己听。

## 原文 context

Manus 让复杂任务持续创建并更新 todo.md 的原因。典型任务平均约 50 次工具调用，长循环中模型容易跑题；不断重写待办清单等于把目标复述到上下文末尾，把全局计划推进模型最近的注意力跨度，避开中段被忽略的问题。

## 掌握证据（做到这些才算会）

- 能解释 lost-in-the-middle 现象及其成因
- 能为长任务设计持续更新的 todo 复述机制

## 验收问句

> 你怎么用{{name}}让长循环任务不跑题？

## 相关

- [[押注 in-context learning]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[与底层模型正交 orthogonal to the underlying models]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-04

## 出场

- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
## 反链

- [[上下文工程 context engineering]]
- [[押注 in-context learning]]
- [[与底层模型正交 orthogonal to the underlying models]]
