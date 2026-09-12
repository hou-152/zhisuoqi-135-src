---
id: cm_98bb96e7
name: Git-backed state
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Git-backed state

> 把循环状态落在 git 中获得显式持久性，从而支持系统重启后的崩溃恢复。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

loop 要长期运行，就不能只靠当前窗口里的记忆。把状态存进 git，就像每一步都留下可恢复的存档。

## 原文 context

第五阶段 loop 的新特征之一是显式 durability，包括 git-backed state 和 crash recovery。Ralph 假设终端一直开着，2026 版本假设系统可能重启。

## 掌握证据（做到这些才算会）

- 能对比 git-backed state 与假设终端常开的差别
- 能设计一次崩溃后的状态恢复流程

## 验收问句

> {{name}} 如何支撑崩溃恢复？

## 先懂这些（前置 1）

- [[持久化执行 durable execution]] · **soft** — 不懂【持久化执行】，就做不了【Git-backed state】的「把循环状态落 git 后按检查点语义支持系统重启崩溃恢复」

## 懂了它才能懂（解锁 1）

- [[Artifact Schema]] — 不懂【Git-backed state】，就做不了【Artifact Schema】的「把 artifacts 作为共享知识层做版本化持久化并维护 timeline」

## 相关

- [[文件系统即持久记忆]] · related-to（audit） — git 是文件系统之上的抽象，理解 git 持久状态不必然要先掌握‘文件系统即持久记忆’这一原则，最多降为 soft/weak
- [[Cross-session Work]] · related-to（audit） — 跨 session 需求只是 git 持久化的动机，非理解其定义所必需；可以懂 git 持久化而完全不知跨 session
- [[agent 模板的声明式持久化]] · related-to（audit） — 此处 git 用途是存模板配置，与 Git-backed state（循环状态崩溃恢复）并非同一概念，真正前置应是通用的 git 持久化
- [[agent 模板的声明式持久化]] · rejected（audit） — 两者只是都用 git；模板持久化存的是配置，不依赖循环状态持久化 Git-backed state。
- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15

## 出场

- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
## 反链

- [[持久化执行 durable execution]]
- [[Loop Engineering]]
- [[文件系统即持久记忆]]
- [[Cross-session Work]]
- [[Artifact Schema]]
- [[Continuous orchestration loop]]
- [[Model as subroutine]]
- [[agent 模板的声明式持久化]]
