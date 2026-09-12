---
id: cm_98bb96e7
name: Git-backed state
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.154
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# Git-backed state

> 把循环状态落在 git 中获得显式持久性，从而支持系统重启后的崩溃恢复。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.154

## 费曼一下

loop 要长期运行，就不能只靠当前窗口里的记忆。把状态存进 git，就像每一步都留下可恢复的存档。

## 原文 context

第五阶段 loop 的新特征之一是显式 durability，包括 git-backed state 和 crash recovery。Ralph 假设终端一直开着，2026 版本假设系统可能重启。

## 掌握证据（做到这些才算会）

- 能对比 git-backed state 与假设终端常开的差别
- 能设计一次崩溃后的状态恢复流程

## 验收问句

> {{name}} 如何支撑崩溃恢复？

## 先懂这些（前置 4）

- [[文件系统即持久记忆]] · **hard** — 把循环状态落在 git 中，git 本身基于文件系统，不懂文件持久记忆无法理解。
- [[Cross-session Work]] · **hard** — git 提供显式持久性以支持系统重启后的崩溃恢复，不懂跨 session 需求就不知为何要 git。
- [[持久化执行 durable execution]] · **soft** — 把循环状态放 git 是为了崩溃恢复，需先懂 step 与检查点的持久化执行模型。
- [[文件系统即持久记忆]] · **soft** — git 状态最终落地为工作区文件，先懂状态以文件持久才懂 git 提供的显式持久性。

## 懂了它才能懂（解锁 1）

- [[agent 模板的声明式持久化]] — 把模型、prompt、工具等存成 YAML 放进 git，需先懂 git 持久状态。

## 相关

- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15

## 出场

- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
## 反链

- [[文件系统即持久记忆]]
- [[Loop Engineering]]
- [[Cross-session Work]]
- [[持久化执行 durable execution]]
- [[agent 模板的声明式持久化]]
- [[Continuous orchestration loop]]
- [[Model as subroutine]]
