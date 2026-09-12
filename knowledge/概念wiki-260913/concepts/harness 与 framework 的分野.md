---
id: cm_94dea071
name: harness 与 framework 的分野
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.067
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# harness 与 framework 的分野

> 框架替你决定 Agent 怎么想，还重造重试、状态持久化、任务队列与事件路由；harness 只保证这些动作可靠发生。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

框架是给你一套写好的剧本让你填空，harness 是给你一个稳固的舞台让你随便演。前者管「做什么」，后者管「怎么不出事」。作者认为大部分人真正缺的是后者。

## 原文 context

标题即论点——「Your Agent Needs a Harness, Not a Framework」。作者的指控是每个 agent 框架都在从零重造 harness：自己的重试逻辑、自己的状态持久化、自己的任务队列、自己的事件路由。框架替你决定 agent 怎么想；harness 只保证这些动作可靠发生。

## 掌握证据（做到这些才算会）

- 能说出框架重复造了哪些 harness 组件
- 能区分“决定怎么想”与“保证可靠发生”

## 验收问句

> {{name}} 里，harness 负责而 framework 不负责的是什么？

## 先懂这些（前置 1）

- [[Runtime-harness separation]] · **soft** — 三层分解把 framework 与 harness 分开，才能准确说两者分野。

## 懂了它才能懂（解锁 1）

- [[Harness Thickness]] — 先分清 harness 与 framework 职责，才能讨论逻辑住在 harness 还是模型。

## 相关

- [[step]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[step ID 自动索引]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[think → act → observe 循环]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[事件驱动编排与执行解耦]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[普遍可触发 universally triggered]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[webhook transform 与 connect()]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[小函数组合]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[子 agent 与 step.invoke()]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[两级上下文剪枝 pruning]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[压缩（compaction）与运行内外的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[预算警告与溢出恢复]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[steering]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[基础设施问题，不是 AI 问题]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[持久化执行 durable execution]]
- [[Harness Thickness]]
- [[Runtime-harness separation]]
- [[steering]]
- [[基础设施问题，不是 AI 问题]]
- [[事件驱动编排与执行解耦]]
- [[小函数组合]]
- [[压缩（compaction）与运行内外的分工]]
- [[预算警告与溢出恢复]]
- [[子 agent 与 step.invoke()]]
- [[step]]
- [[step ID 自动索引]]
- [[think → act → observe 循环]]
- [[webhook transform 与 connect()]]
- [[两级上下文剪枝 pruning]]
- [[普遍可触发 universally triggered]]
