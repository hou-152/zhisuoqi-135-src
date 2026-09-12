---
id: cm_94dea071
name: harness 与 framework 的分野
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# harness 与 framework 的分野

> 框架替你决定 Agent 怎么想，还重造重试、状态持久化、任务队列与事件路由；harness 只保证这些动作可靠发生。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

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

- [[harness 厚薄 thin vs thick]] · **soft** — 不懂【harness 厚薄】，就画不出【harness 与 framework 的分野】里框架越界与只保证可靠发生的界线。

## 相关

- [[step ID 自动索引]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[普遍可触发 universally triggered]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[子 agent 与 step.invoke()]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[两级上下文剪枝 pruning]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[预算警告与溢出恢复]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[steering]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[step]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[think → act → observe 循环]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[事件驱动编排与执行解耦]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[webhook transform 与 connect()]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[小函数组合]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[压缩（compaction）与运行内外的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[基础设施问题，不是 AI 问题]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Runtime-harness separation]] · related-to（audit） — framework 与 harness 的分野靠『谁决定怎么想 / 谁保证动作可靠』即可立住；LangChain 的三层分解只是一例，不是理解该分野的前提。
- [[Harness Thickness]] · related-to（audit） — Harness Thickness 讨论的是 harness 与模型的边界，而非 harness 与 framework 的分野，给定前置错配；知其分野有帮助但非必需。
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[持久化执行 durable execution]]
- [[Runtime-harness separation]]
- [[事件驱动编排与执行解耦]]
- [[压缩（compaction）与运行内外的分工]]
- [[harness 厚薄 thin vs thick]]
- [[think → act → observe 循环]]
- [[基础设施问题，不是 AI 问题]]
- [[两级上下文剪枝 pruning]]
- [[普遍可触发 universally triggered]]
- [[小函数组合]]
- [[预算警告与溢出恢复]]
- [[子 agent 与 step.invoke()]]
- [[Harness Thickness]]
- [[steering]]
- [[step]]
- [[step ID 自动索引]]
- [[webhook transform 与 connect()]]
