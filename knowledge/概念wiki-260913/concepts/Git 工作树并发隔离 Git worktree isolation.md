---
id: cm_f69f2345
name: Git 工作树并发隔离
nameEn: Git worktree isolation
type: PROCEDURAL
subject: AI 内参 260912
domain: multi-agent
learningStage: now
verification: use
centrality: 0.144
depth: 0
origin: [neican]
aliases: ["Git worktree isolation"]
sources: 1
---

# Git 工作树并发隔离 · Git worktree isolation

> 为每个 AI 会话用 git worktree 单独检出工作目录，共用同一 .git 元数据，物理上互不覆盖。

**领域** multi-agent ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.144

## 费曼一下

指借助 Git 原生的 `git worktree` 功能，为每个 AI 会话在硬盘上单独克隆一份工作目录，但底层共用同一个 `.git` 元数据仓库。这让前台开发者与多个后台 AI 助手能够同时修改不同分支的代码，物理上互不干扰、互不覆盖。

## 原文 context

Worktrees let Codex run multiple independent chats in the same project without interfering with each other. The repository, worktree, and commands remain on the computer or remote development environment that contains the project.

Each worktree has its own copy of every file in your repo but they all share the same metadata (.git folder) about commits, branches, etc. This allows you to check out and work on multiple branches in parallel.

## 掌握证据（做到这些才算会）

- 能为一个项目开出多个工作树，使多个会话在不同分支上同时改代码
- 能说明各工作树有独立文件副本但共享同一仓库元数据，代码与命令仍留在项目所在环境

## 验收问句

> 用 {{name}} 怎样让两个会话同时改同一仓库？

## 懂了它才能懂（解锁 2）

- [[会话与工作交接机制 Handoff]] — 不懂【Git 工作树并发隔离】，就做不了【会话与工作交接机制】的⟨在前后台工作树之间安全搬迁工作⟩——没有独立工作树，就没有可交接的「后台那一边」，交接无从谈起。
- [[子智能体并行委派 Subagent delegation and orchestration]] — 不懂【Git 工作树并发隔离】，就做不了【子智能体并行委派】的⟨多个子智能体同时动同一仓库而不互相覆盖⟩。

## 出场

- AI 内参 260912 ｜ 《Worktrees | ChatGPT Learn》 ｜ https://learn.chatgpt.com/docs/environments/git-worktrees

## 别名

`Git worktree isolation`

## 反链

- [[子智能体并行委派 Subagent delegation and orchestration]]
- [[会话与工作交接机制 Handoff]]
