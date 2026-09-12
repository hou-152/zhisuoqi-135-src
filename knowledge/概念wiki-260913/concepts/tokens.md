---
id: cm_3391436a
name: tokens
type: LANGUAGE
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.181
depth: 0
origin: [context]
aliases: []
sources: 1
---

# tokens

> 模型实际处理的最小单位是 token 而非字或词，上下文长度与计费都按 token 序列计数。

**领域** context-engineering ｜ **类型** LANGUAGE ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.181

## 费曼一下

token 是模型真正看到的输入单位，也决定了成本、上下文长度和每次 agent 操作能塞进多少信息。

## 原文 context

模型处理 token，而不是直接处理词。

## 掌握证据（做到这些才算会）

- 能把一段中英文文本粗估成 token 数
- 能说明为何同一句中文与英文消耗的 token 不同

## 验收问句

> 给你一段文本，你能说出 {{name}} 大致数量并解释它为何不等于词数吗？

## 懂了它才能懂（解锁 6）

- [[the dumb zone the smart zone]] — 上下文被工具描述填满按 token 计，不懂 token 就无法理解笨蛋区成因。
- [[Tool call offloading]] — 卸载由超出 token 阈值触发，不懂 token 计数就无法理解该机制。
- [[Skill]] — 不懂 token 成本，就理解不了 skill 为何要按需加载而非全塞。
- [[系统提示 System Prompt]] — system prompt 占用并消耗上下文 token，懂 token 才知其代价。
- [[U 型性能曲线]] — 位置效应发生在 token 序列上，懂 token 更易理解首尾高中间低。
- [[WebFetch 两阶段总结]] — 只回传一小段是为省 token，不懂 token 成本难理解其动机。

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[Harness]]
- [[Skill]]
- [[系统提示 System Prompt]]
- [[LLM Large Language Model]]
- [[coding agent]]
- [[the dumb zone the smart zone]]
- [[Tool call offloading]]
- [[WebFetch 两阶段总结]]
- [[U 型性能曲线]]
