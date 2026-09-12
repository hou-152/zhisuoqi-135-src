---
id: cm_5ae9faf9
name: Orchestration Loop / TAO Cycle / ReAct Loop
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: compute
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Orchestration Loop / TAO Cycle / ReAct Loop

> Agent 运行的心跳：循环执行 Thought-Action-Observation，机制上常只是一个 while 循环。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.072

## 费曼一下

agent 的心跳。一个 while 循环不断跑：装配 prompt → 调模型 → 解析输出 → 执行工具 → 把结果塞回去 → 再来一遍。循环本身是 "dumb" 的——智能全在模型里，循环只管 "下一轮"。

## 原文 context

This is the heartbeat. It implements the Thought-Action-Observation (TAO) cycle, also called the ReAct loop. Mechanically, it's often just a while loop. Anthropic describes their runtime as a "dumb loop" where all intelligence lives in the model.

## 掌握证据（做到这些才算会）

- 能画出 Thought→Action→Observation 的循环
- 能解释为何说它是'笨循环'、智能都在模型里

## 验收问句

> {{name}} 的每一步分别发生什么？

## 先懂这些（前置 1）

- [[ReAct loop]] · **soft** — 该命名是 ReAct 的扩展叫法，ReAct 是它的机制内核。

## 懂了它才能懂（解锁 1）

- [[Continuous orchestration loop]] — 连续编排循环是编排循环的长期监督扩展，先有编排循环才谈持续监督。

## 相关

- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27

## 出场

- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922
## 反链

- [[ReAct loop]]
- [[Agent vs Harness]]
- [[Continuous orchestration loop]]
