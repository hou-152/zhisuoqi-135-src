---
id: cm_dee9d8f3
name: 笨循环
nameEn: Dumb Loop
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.144
depth: 0
origin: [context, harness]
aliases: ["Dumb Loop"]
sources: 2
---

# 笨循环 · Dumb Loop

> 循环本身不含智能，只负责反复调用模型；所有判断与决策都来自模型的输出。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

笨循环不是说系统粗糙，而是说 Harness 尽量保持执行框架简单，把判断和推理留给模型，只负责稳定地推进回合和处理边界条件。

## 原文 context

“所有的智慧都存在于模型之中”

## 掌握证据（做到这些才算会）

- 能区分循环里哪部分是模型智能、哪部分只是调度代码
- 能举出把逻辑硬塞进循环反而降低泛化能力的例子

## 验收问句

> {{name}} 里除了把模型输出再喂回去，还该有什么？

## 懂了它才能懂（解锁 2）

- [[tool loop]] — 不懂【笨循环】，就做不了【tool loop】的“反复调用模型形成循环”。
- [[Model as subroutine]] — 不懂【笨循环】，就做不了【Model as subroutine】的“让模型被 loop 在某一步调用”。

## 相关

- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[非模型架构 Non-model Architecture]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13

## 出场

- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922

## 别名

`Dumb Loop`

## 反链

- [[Harness]]
- [[非模型架构 Non-model Architecture]]
- [[AI Agent]]
- [[Model as subroutine]]
- [[tool loop]]
