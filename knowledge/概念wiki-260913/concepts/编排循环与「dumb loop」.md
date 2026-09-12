---
id: cm_2944fd6c
name: 编排循环与「dumb loop」
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.099
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# 编排循环与「dumb loop」

> Harness 的心跳：组装提示→调 LLM→解析输出→执行工具→结果回喂并重复，机制上常只是一个 while 循环。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.099

## 费曼一下

循环本身笨得像洗衣机的定时器，真正难的是往里放什么、什么时候停、脏东西怎么处理。

## 原文 context

harness 的心跳，实现 Thought-Action-Observation（ReAct）循环：组装提示、调 LLM、解析输出、执行工具、结果回喂、重复。机制上常常就是一个 while 循环，「the complexity lives in everything the loop manages」；Anthropic 把自家 runtime 描述为 dumb loop，智能全在模型。

## 掌握证据（做到这些才算会）

- 能画出 ReAct 循环的五个步骤并指出代码里的对应位置
- 能解释 Anthropic 为何把自家 runtime 称为 dumb loop、智能全在模型

## 验收问句

> 请用 {{name}} 说明一次任务从提示到工具回喂的完整循环步骤。

## 先懂这些（前置 1）

- [[Harness]] · **hard** — 循环是 Harness 的心跳，先懂 Harness 才懂循环的位置。

## 懂了它才能懂（解锁 2）

- [[Harness 与 Loop 的配合]] — 要先懂 loop 才能谈 harness 与 loop 的分工。
- [[会话生命周期]] — 16 步生命周期是循环开工到收尾的结构化，先懂循环。

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12
## 反链

- [[Harness]]
- [[agent 与 harness 的分工]]
- [[If you're not the model, you're the harness.]]
- [[Harness 与 Loop 的配合]]
- [[会话生命周期]]
