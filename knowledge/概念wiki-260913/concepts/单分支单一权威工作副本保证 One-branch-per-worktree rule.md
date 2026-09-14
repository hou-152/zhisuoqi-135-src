---
id: cm_dfa03e4c
name: 单分支单一权威工作副本保证
nameEn: One-branch-per-worktree rule
type: CONCEPTUAL
subject: AI 内参 260912
domain: code-engineering
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 1
origin: [neican]
aliases: ["One-branch-per-worktree rule"]
sources: 1
---

# 单分支单一权威工作副本保证 · One-branch-per-worktree rule

> 每个分支同一时刻只能在一个工作树检出的规则，保证每个分支只有一个权威可变工作副本。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

指每个分支只能同时在一个工作区被检出的硬性规则。它保证了每一个可变分支指针在同一时刻只有一个合法的修改入口，避免多会话并发写入时产生竞态条件和提交丢失。

## 原文 context

By enforcing a one-branch-per-worktree rule, Git guarantees that each branch has a single authoritative working copy, while still allowing other worktrees to safely reference the same commits via detached HEADs or separate branches.

## 掌握证据（做到这些才算会）

- 能说出该规则保证每个分支有单一权威工作副本
- 能说明其他工作树仍可通过 detached HEAD 或别的分支安全引用同一批提交

## 验收问句

> {{name}} 保证了什么，又允许了什么？

## 先懂这些（前置 1）

- [[单分支单一可变引用限制 Single mutable reference rule]] · **hard** — 不懂【单分支单一可变引用限制】，就做不了【单分支单一权威工作副本保证】的“确立每个分支同一时刻只能在一个工作树检出的规则”这件事——因为不知道分支本质是 refs/heads/<name> 单一可变引用，就无法论证多处同检会破坏权威可变工作副本。

## 懂了它才能懂（解锁 1）

- [[PR 驱动的审查合并闭环 PR-driven review and approval workflow]] — 不懂【单分支单一权威工作副本保证】，就做不了【PR 驱动的审查合并闭环】的“让 Agent 的技能改动基于唯一权威分支状态产生并提交人类审查合并”这件事——因为多个工作树同检同一分支会让改动互相覆盖，审查合并失去可靠基线。

## 出场

- AI 内参 260912 ｜ 《Worktrees | ChatGPT Learn》 ｜ https://learn.chatgpt.com/docs/environments/git-worktrees

## 别名

`One-branch-per-worktree rule`

## 反链

- [[单分支单一可变引用限制 Single mutable reference rule]]
- [[PR 驱动的审查合并闭环 PR-driven review and approval workflow]]
