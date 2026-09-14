---
id: cm_28fe50df
name: 会话与工作交接机制
nameEn: Handoff
type: PROCEDURAL
subject: AI 内参 260912
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [neican]
aliases: ["Handoff"]
sources: 1
---

# 会话与工作交接机制 · Handoff

> 在前台本地工作区与后台工作树之间安全搬迁工作的自动化流程，代你完成必要的 Git 操作。

**领域** multi-agent ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

指在用户当前的前台本地工作区与后台 Agent 工作树之间，无缝迁移对话上下文和代码修改状态的自动化流程。Codex 自动执行底层的 Git 分支切换与暂存操作，绕开同一分支不可在多处同时检出的限制。

## 原文 context

Under the hood, Handoff handles the Git operations required to move work between two checkouts safely. This matters because Git only allows a branch to be checked out in one place at a time.

## 掌握证据（做到这些才算会）

- 能说明它自动处理在两次检出之间移动工作所需的 Git 操作
- 能指出它正是为绕开同一分支只能在一处检出的限制而存在

## 验收问句

> {{name}} 要绕开 Git 的哪条限制？

## 先懂这些（前置 1）

- [[Git 工作树并发隔离 Git worktree isolation]] · **hard** — 不懂【Git 工作树并发隔离】，就做不了【会话与工作交接机制】的⟨在前后台工作树之间安全搬迁工作⟩——没有独立工作树，就没有可交接的「后台那一边」，交接无从谈起。

## 出场

- AI 内参 260912 ｜ 《Worktrees | ChatGPT Learn》 ｜ https://learn.chatgpt.com/docs/environments/git-worktrees

## 别名

`Handoff`

## 反链

- [[Git 工作树并发隔离 Git worktree isolation]]
