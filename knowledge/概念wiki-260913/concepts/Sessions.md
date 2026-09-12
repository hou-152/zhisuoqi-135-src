---
id: cm_781791f5
name: Sessions
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

# Sessions

> 维持 agent loop 内工作上下文的持久记忆层，决定状态如何跨轮携带。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

agent 每一轮都要知道之前发生过什么。Sessions 就是替它保管这份工作记忆的地方，让状态跨轮次延续，而不必每次都把全部历史手工塞回提示词。

## 原文 context

A persistent memory layer for maintaining working context within an agent loop；在 Start here 里对应「decide how you want to carry state across turns」这一步。

## 掌握证据（做到这些才算会）

- 能说明为什么工作上下文需要跨轮持久化
- 能指出状态在轮与轮之间如何被带过去

## 验收问句

> {{name}} 让哪些状态活过了这一轮？

## 先懂这些（前置 1）

- [[Session]] · **hard** — 不懂【Session】就做不了【Sessions】的『在 agent loop 内跨轮携带上下文』这件事

## 懂了它才能懂（解锁 1）

- [[Long-running agent handoff]] — 长任务交接靠跨轮持久记忆层维持上下文，不懂 Sessions 无法理解交接载体。

## 相关

- [[Shared File System]] · related-to（audit） — 此处的 Sessions 被定义为 loop 内上下文层，与‘多 session 共享外存’的跨 session 需求错位，且共享文件夹本身可独立理解
- [[Cross-session Work]] · related-to（audit） — Sessions 被定义为「loop 内」记忆层，而 Cross-session 是跨 loop 的外部状态，作用域对不上；核心依赖已由 [6] 的 Session 承担，这条属冗余，建议降 soft。
- [[Session]] · related-to（audit） — Session（一次运行）与 Sessions（跨轮持久记忆层）是不同层面的东西，前者定义不了后者，懂单次运行并不能推出记忆层，属命名联想而非定义依赖。
- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Long-running agent handoff]]
- [[Session]]
- [[Cross-session Work]]
- [[primitives]]
- [[Agent]]
- [[Shared File System]]
- [[very few abstractions]]
