---
id: cm_98e85c1e
name: Executable Codebase
type: CONCEPTUAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.045
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Executable Codebase

> 让 agent 能低成本启动 dev server、进入特定状态并测试场景的代码库形态。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

如果每次开工都要先花半小时装机器，loop 就跑不起来。executable codebase 是“一键开机”的工作台。

## 原文 context

executable 指 agent 能低成本启动 dev server、进入特定状态并测试场景。作者提到 dev.local 脚本、worktree friendly、状态跳转脚本，都是为了让 agent 把注意力放在任务本身，而不是环境摸索。

## 掌握证据（做到这些才算会）

- 能列出让仓库可执行的脚本与约定（dev.local、状态跳转脚本）
- 能为新仓库补上这些脚本使 agent 免于环境摸索

## 验收问句

> 你的仓库要补上什么才算 {{name}}？

## 先懂这些（前置 1）

- [[Agent-driven CICD]] · **soft** — 可执行代码库让 agent 低成本启动并测试，是 CI 自动验证的前提。

## 相关

- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Agent loop]]
- [[Agent-driven CICD]]
- [[Loop Engineer]]
