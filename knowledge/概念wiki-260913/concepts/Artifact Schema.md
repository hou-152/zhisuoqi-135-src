---
id: cm_ae93d5b5
name: Artifact Schema
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.099
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# Artifact Schema

> 把 artifacts 当作共享知识层，每种都配 README、schema、添加流程与 timeline。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.099

## 费曼一下

artifact schema 是统一表格格式。大家都按同一列写，后面的 agent 和人类才能排序、筛选、追踪和复用。

## 原文 context

作者把 artifacts 看作 shared knowledge layer，并建议每种 artifact 都有 README、schema、添加流程和 timeline。schema 让不同 loop 产生的文件可读、可合并、可被小应用展示。

## 掌握证据（做到这些才算会）

- 能说出 artifact 需要 README/schema/流程/timeline 四件套
- 能解释 schema 让不同 loop 产出的文件可读、可合并

## 验收问句

> {{name}} 为什么能让不同 loop 的文件可读可合并？

## 先懂这些（前置 3）

- [[Shared File System]] · **hard** — artifacts 作为共享知识层存放在共享文件系统中，不懂共享文件系统无法理解其位置。
- [[Cross-session Work]] · **soft** — artifact 要跨 session 复用，懂跨 session 工作更懂为何需要 schema。
- [[文件系统即持久记忆]] · **soft** — artifacts 以文件加 README/schema 落地为共享知识层，依赖把状态写进文件系统。

## 相关

- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[文件系统即持久记忆]]
- [[Agent loop]]
- [[Cross-session Work]]
- [[Shared File System]]
- [[Loop Engineer]]
