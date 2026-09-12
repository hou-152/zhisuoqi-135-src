---
id: cm_3391436a
name: tokens
type: LANGUAGE
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.126
depth: 0
origin: [context]
aliases: []
sources: 1
---

# tokens

> 模型处理的是 token，而不是直接处理词；token 是模型处理文本的基本单位。

**领域** context-engineering ｜ **类型** LANGUAGE ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

token 是模型真正看到的输入单位，也决定了成本、上下文长度和每次 agent 操作能塞进多少信息。

## 原文 context

模型处理 token，而不是直接处理词。

## 掌握证据（做到这些才算会）

- 能把一段中英文文本粗估成 token 数
- 能说明为何同一句中文与英文消耗的 token 不同

## 验收问句

> 给你一段文本，你能说出 {{name}} 大致数量并解释它为何不等于词数吗？

## 懂了它才能懂（解锁 2）

- [[Tool call offloading]] — 卸载由超出 token 阈值触发，不懂 token 计数就无法理解该机制。
- [[Skills Hell]] — 不懂 token，就说不清 skill 数量膨胀为什么会让 Agent 可靠性下降

## 相关

- [[Skill-as-method-call]] · rejected（audit） — 方法调用类比讲的是流程参数化，与 token 粒度无关；不懂 token 也能理解该注入思路。
- [[WebFetch 两阶段总结]] · related-to（audit） — 只回传一小段是为省 token，属动机层面；两阶段总结的机制不依赖 token 概念即可懂。
- [[the dumb zone the smart zone]] · related-to（audit） — 笨蛋区成因的关键是上下文窗口被工具描述等噪声占满，token 只是计量单位，不懂 token 定义也完全能理解该现象，hard 定高了
- [[Skill]] · related-to（audit） — token 只解释了「为何按需加载」的动机，skill 的定义与机制不依赖它，懂 token 更好懂但非必需，宜降 soft。
- [[系统提示 System Prompt]] · related-to（audit） — system prompt 是标准 API 概念，不靠 token 定义即可立住；token 只解释其上下文占用与成本，属额外增益。
- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[U 型性能曲线]] · related-to（audit） — 首尾高中间低是位置效应，在'头/尾/中间段'层面就能理解，无需 token=最小单位这一定义。
- [[skill-creator 访谈式创建]] · rejected（audit） — token 只是估算预算的通用背景，不影响对访谈式创建 skill 的理解，不构成前置依赖。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[Skill]]
- [[coding agent]]
- [[Skill-as-method-call]]
- [[skill-creator 访谈式创建]]
- [[Skills Hell]]
- [[系统提示 System Prompt]]
- [[LLM Large Language Model]]
- [[the dumb zone the smart zone]]
- [[Tool call offloading]]
- [[U 型性能曲线]]
- [[WebFetch 两阶段总结]]
