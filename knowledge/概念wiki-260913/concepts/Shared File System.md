---
id: cm_448f21b3
name: Shared File System
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: now
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Shared File System

> 多 session、多 agent 共用的文件夹系统，用 signals／artifacts／tasks／logs 记录状态供各 loop 复用。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

共享文件系统就是团队白板。每个 agent 都把看到的问题、做过的动作、下一步线索写上去，其他 agent 进来后不用重新问一遍，就能接着干。

## 原文 context

多 session、多 agent 工作需要一个 shared folder system 来记录状态。support、SEO、ads、growth 等不同 loop 都会读写 signals、artifacts、tasks 和 logs，使各自观察到的信息能被其他 loop 复用。

## 掌握证据（做到这些才算会）

- 能画出 shared folder 内 signals、artifacts、tasks、logs 四类目录的读写关系
- 能让两个不同 loop 读写同一条状态并互相看到对方更新

## 验收问句

> 两个 loop 要共用同一条状态，{{name}} 里该怎么分工？

## 先懂这些（前置 2）

- [[Session]] · **hard** — 不懂【Session】就做不了【Shared File System】的『多 session 共用同一文件夹』这件事
- [[文件系统即持久记忆]] · **soft** — 多 session 共用文件夹系统记录状态，需先懂文件系统作为持久记忆。

## 相关

- [[Artifact Schema]] · related-to（audit） — 共享文件系统只是 artifacts 的存放位置，Artifact Schema 的组织/文档概念（README、schema、timeline）不依赖它
- [[Sessions]] · related-to（audit） — 此处的 Sessions 被定义为 loop 内上下文层，与‘多 session 共享外存’的跨 session 需求错位，且共享文件夹本身可独立理解
- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Session]]
- [[Agent loop]]
- [[文件系统即持久记忆]]
- [[Artifact Schema]]
- [[Loop Engineer]]
- [[Sessions]]
