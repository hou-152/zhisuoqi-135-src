---
id: cm_a6beb11f
name: think → act → observe 循环
type: PROCEDURAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: compute
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# think → act → observe 循环

> 带 steps 的 while 循环：调 LLM 思考、执行工具、把结果回灌 messages，返回纯文本即本轮结束。

**领域** loop-autonomy ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.045

## 费曼一下

想一想、动动手、看看结果，然后再想一想——直到不需要再动手，直接把话说出来为止。agent 的循环就这么朴素。

## 原文 context

Utah 的 agent loop 形态，也是作者认为不需要框架就能写出来的东西：「一个带 steps 的 while 循环，step 里调 LLM、跑工具」。每轮调 LLM（think）、执行工具（act）、把结果喂回 messages（observe）；**LLM 返回文本且无工具调用即代表本轮结束**，不需要显式 done 信号。

## 掌握证据（做到这些才算会）

- 能不依赖框架写出这个循环并跑通一次任务
- 能解释为何不需要显式 done 信号

## 验收问句

> {{name}} 三步各做什么，何时算一轮结束？

## 先懂这些（前置 1）

- [[ReAct loop]] · **soft** — think-act-observe 骨架源自 ReAct，不懂 ReAct 就不知它为何分这三步。

## 相关

- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[Harness]]
- [[持久化执行 durable execution]]
- [[ReAct loop]]
- [[harness 与 framework 的分野]]
