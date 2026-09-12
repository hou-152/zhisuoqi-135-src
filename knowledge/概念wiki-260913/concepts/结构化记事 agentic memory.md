---
id: cm_4b3d0d0a
name: 结构化记事 / agentic memory
type: PROCEDURAL
subject: Context Engineering
domain: memory-retrieval
learningStage: now
verification: use
centrality: 0.181
depth: 1
origin: [context]
aliases: []
sources: 1
---

# 结构化记事 / agentic memory

> agent 定期把笔记写到上下文窗口之外（待办清单或 NOTES.md）并在需要时取回，以跨上下文重置续接任务。

**领域** memory-retrieval ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.181

## 费曼一下

人做长期项目靠的不是记性，是笔记本。记性会断，笔记不会。agent 也一样——把状态写到窗口之外，重置之后回来读一遍，就还是那个知道自己干到哪儿的它。

## 原文 context

agent 定期把笔记写到上下文窗口之外并在需要时拉回，形态可以是 to-do 列表或一个 NOTES.md。Claude playing Pokémon 展示了它的威力：跨数千游戏步维持精确计数与目标，自发形成区域地图、成就记录、对战策略笔记，上下文重置后靠读自己的笔记续上。

## 掌握证据（做到这些才算会）

- 能描述 Claude playing Pokémon 中靠笔记跨数千步维持计数与地图的作用
- 能为一个长任务设计出上下文重置后可续接的笔记结构

## 验收问句

> 用 {{name}} 如何让 agent 跨上下文重置续上？

## 先懂这些（前置 1）

- [[多时间尺度记忆与「记忆只是 hint」]] · **soft** — 不懂【多时间尺度记忆与「记忆只是 hint」】就做不了【结构化记事 / agentic memory】里「写到上下文窗口之外、需要时再取回」的设计

## 懂了它才能懂（解锁 2）

- [[self-baking]] — self-baking 是 Agent 把上下文消化成持久知识结构，依赖结构化记事。
- [[跨轮次记忆与连贯策略]] — 不懂【结构化记事 / agentic memory】就做不了【跨轮次记忆与连贯策略】中上下文重置后续接任务的落地

## 相关

- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
## 反链

- [[上下文工程 context engineering]]
- [[注意力预算 attention budget]]
- [[多时间尺度记忆与「记忆只是 hint」]]
- [[跨轮次记忆与连贯策略]]
- [[上下文腐烂 Context Rot]]
- [[self-baking]]
