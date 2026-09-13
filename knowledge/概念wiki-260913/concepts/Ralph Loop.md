---
id: cm_01671cb1
name: Ralph Loop
type: PROCEDURAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: deep-dive
verification: use
centrality: 0.107
depth: 2
origin: [harness]
aliases: []
sources: 3
---

# Ralph Loop

> 一种 harness 模式：用 hook 拦截模型退出企图，在干净上下文中重注入原始 prompt，逼 Agent 继续。

**领域** loop-autonomy ｜ **类型** PROCEDURAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.107

## 费曼一下

模型想收工时，框架把它叫回来，递上同一份任务书和一张干净的桌子，说「接着干」。它把「长时间工作」拆成了许多次短时间工作，靠磁盘上的状态接力——连贯性不来自记忆，来自留在外部的痕迹。

## 原文 context

一种 harness 模式——用 hook 拦截模型的退出企图，在干净的 context window 中重新注入原始 prompt，迫使 agent 对着完成目标继续工作。作者指出它之所以可行是因为文件系统在：每次迭代都从新鲜上下文开始，但会读取上一次迭代留下的状态。

## 掌握证据（做到这些才算会）

- 能说明它靠文件系统承接跨迭代的状态
- 能实现一次 prompt 重注入的单 agent 长任务循环

## 验收问句

> {{name}} 为什么能跑很久？靠什么记住上一轮？

## 先懂这些（前置 1）

- [[Agent loop]] · **hard** — Ralph Loop 靠 hook 拦截 agent loop 的退出企图，没有 agent loop 就没有可拦截的循环。

## 相关

- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922
## 反链

- [[Agent vs Harness]]
- [[Agent loop]]
- [[Loop Engineering]]
- [[Agent = Model + Harness]]
- [[Continuous orchestration loop]]
- [[Model as subroutine]]
