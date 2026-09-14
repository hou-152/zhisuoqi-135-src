---
id: cm_223e91f3
name: PR 驱动的审查合并闭环
nameEn: PR-driven review and approval workflow
type: PROCEDURAL
subject: AI 内参 260912
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.072
depth: 2
origin: [neican]
aliases: ["PR-driven review and approval workflow"]
sources: 1
---

# PR 驱动的审查合并闭环 · PR-driven review and approval workflow

> 让 Agent 的技能改动走 Git PR，经人类审查合并后才生效的闭环

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

指 Agent 对自身技能的修改不直接在线热更新，而是通过 Git 创建一个 Pull Request。人类工程师对模型的修改方案进行 Code Review、讨论并点击 Merge，新技能才正式生效。既放手让模型自我迭代，又让人类保持绝对的终审权。

## 原文 context

Because skills are plain files, agents are extremely good at updating them. These updates, which are reviewable, approvable, and mergeable, can flow through a normal PR/code-review workflow; once merged, the next run of the inner skill inherits the improvement.

## 掌握证据（做到这些才算会）

- 能描述从提出改动到合并生效的完整流转
- 能指出人类在这一流程中保留的终审权

## 验收问句

> {{name}} 中，技能改动为什么不会立刻生效？

## 先懂这些（前置 1）

- [[单分支单一权威工作副本保证 One-branch-per-worktree rule]] · **hard** — 不懂【单分支单一权威工作副本保证】，就做不了【PR 驱动的审查合并闭环】的“让 Agent 的技能改动基于唯一权威分支状态产生并提交人类审查合并”这件事——因为多个工作树同检同一分支会让改动互相覆盖，审查合并失去可靠基线。

## 出场

- AI 内参 260912 ｜ 《https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude》 ｜ https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude

## 别名

`PR-driven review and approval workflow`

## 反链

- [[单分支单一权威工作副本保证 One-branch-per-worktree rule]]
