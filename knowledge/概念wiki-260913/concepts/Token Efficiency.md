---
id: cm_09566489
name: Token Efficiency
type: CONCEPTUAL
subject: AI 概念库
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [notion]
aliases: ["词元效率", "token efficiency", "token 效率"]
sources: 1
---

# Token Efficiency

> 单位算力能换到的有效智能，是从 demo 走到产品与基础设施的门槛。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 原文 context

<mention-page url="https://app.notion.com/p/e14679b108ff82a79c9781937cfb2880"/>
- **context**：
	> 「在提高 token efficiency（词元效率）上，继续一骑绝尘。」
	> 「Token efficiency（词元效率）是达到 AGI，或者更强 agent system（智能体系统）的，必备之路或者是基础条件。没有效率，AGI 就只能是个 demo。但是有了效率 AGI 才能成为真正的产品和基础设施。」
- **费曼一下**：每个 token（词元）都要花算力。token efficiency 就是「单位算力能换多少有效智能」。它把 AGI 从「能不能 demo 出来」拉到「能不能跑成产品和基础设施」——能效本身就是智能的一部分，也是 DeepSeek V4 这一代模型设计的核心赌注。

## 掌握证据（做到这些才算会）

- 能比较两次同任务实现的 token 消耗与效果
- 能说明为何没有效率 AGI 只能停在 demo

## 验收问句

> 怎么判断一次改动是否提升了 {{name}}？

## 先懂这些（前置 1）

- [[Token count]] · **hard** — 单位算力换智能的度量以 token 计量为分母基础。

## 相关

- [[输出 token 效率]] · related-to（audit） — 输出 token 效率自明（同能力输出更少即更省），只是 Token Efficiency 的一个子情形／例子，不属于必须先懂前置才能立住，宜降 soft 或踢出。
- [[大小模型分工]] · related-to（audit） — Token Efficiency 是「为什么这么做」的收益论证，不是理解大小模型分工的前提；不懂 token efficiency 也能理解分工机制
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Token-Efficiency-7ec679b108ff82cf92a2817477ac296e

## 别名

`词元效率`、`token efficiency`、`token 效率`

## 反链

- [[Token count]]
- [[输出 token 效率]]
- [[大小模型分工]]
