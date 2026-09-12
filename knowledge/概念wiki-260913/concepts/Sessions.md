---
id: cm_781791f5
name: Sessions
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: now
verification: use
centrality: 0.181
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Sessions

> 维持 agent loop 内工作上下文的持久记忆层，决定状态如何跨轮携带。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.181

## 费曼一下

agent 每一轮都要知道之前发生过什么。Sessions 就是替它保管这份工作记忆的地方，让状态跨轮次延续，而不必每次都把全部历史手工塞回提示词。

## 原文 context

A persistent memory layer for maintaining working context within an agent loop；在 Start here 里对应「decide how you want to carry state across turns」这一步。

## 掌握证据（做到这些才算会）

- 能说明为什么工作上下文需要跨轮持久化
- 能指出状态在轮与轮之间如何被带过去

## 验收问句

> {{name}} 让哪些状态活过了这一轮？

## 先懂这些（前置 2）

- [[Session]] · **hard** — Sessions 是维持 session 内上下文的持久记忆层，需先懂单次 Session。
- [[Session]] · **hard** — Sessions 是跨轮携带上下文的持久记忆层，建立在单次有状态运行之上。

## 懂了它才能懂（解锁 4）

- [[Cross-session Work]] — 跨 session 要求外部状态能跨 session 保存与恢复，需懂 Sessions 持久层。
- [[Long-running agent handoff]] — 长任务交接靠跨轮持久记忆层维持上下文，不懂 Sessions 无法理解交接载体。
- [[Shared File System]] — 共享文件系统供多 session 复用状态，不懂 Sessions 层无法理解共享需求。
- [[Long-running agent handoff]] — 交接要跨上下文窗口携带状态，前提是存在跨轮维持上下文的持久记忆层。

## 相关

- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent]]
- [[Cross-session Work]]
- [[Session]]
- [[primitives]]
- [[Long-running agent handoff]]
- [[Shared File System]]
- [[very few abstractions]]
