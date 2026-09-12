---
id: cm_2944fd6c
name: 编排循环与「dumb loop」
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.126
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 编排循环与「dumb loop」

> 组装提示、调模型、解析输出、执行工具、回喂结果并重复的编排心跳循环。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

循环本身笨得像洗衣机的定时器，真正难的是往里放什么、什么时候停、脏东西怎么处理。

## 原文 context

harness 的心跳，实现 Thought-Action-Observation（ReAct）循环：组装提示、调 LLM、解析输出、执行工具、结果回喂、重复。机制上常常就是一个 while 循环，「the complexity lives in everything the loop manages」；Anthropic 把自家 runtime 描述为 dumb loop，智能全在模型。

## 掌握证据（做到这些才算会）

- 能列出 Thought-Action-Observation 循环的各步骤
- 能解释复杂度在循环所管理的东西、而非循环本身

## 验收问句

> 用 {{name}} 说出一次完整 ReAct 循环的步骤。

## 懂了它才能懂（解锁 2）

- [[Harness 与 Loop 的配合]] — 要先懂 loop 才能谈 harness 与 loop 的分工。
- [[Continuous orchestration loop]] — 不懂【编排循环与「dumb loop」】，就做不了【Continuous orchestration loop】的 ⟨长期监督多线程的编排心跳⟩

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · related-to（audit） — 循环可独立理解，Harness 只帮助定位其位置，不应是 hard 前置。

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12
## 反链

- [[If you're not the model, you're the harness.]]
- [[agent 与 harness 的分工]]
- [[Continuous orchestration loop]]
- [[Harness 与 Loop 的配合]]
