---
id: cm_691a420e
name: Token count
type: LANGUAGE
subject: AI 概念库
domain: caching-cost
learningStage: when-needed
verification: compute
centrality: 0.345
depth: 0
origin: [notion]
aliases: ["token count", "headcount to token count"]
sources: 1
---

# Token count

> 一段文本消耗的词元数量，是计费、上下文预算与成本估算的基本计量单位。

**领域** caching-cost ｜ **类型** LANGUAGE ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.345

## 掌握证据（做到这些才算会）

- 能用 tokenizer 统计给定文本的 token 数
- 能对比两种写法下的 token 数差异并估算费用

## 验收问句

> 你能算出这段文本的 {{name}} 并估算成本吗？

## 懂了它才能懂（解锁 6）

- [[Harness token floor]] — harness 固定开销以 token 数计量，先懂 token 才能量化。
- [[Token Efficiency]] — 单位算力换智能的度量以 token 计量为分母基础。
- [[Tool-schema tax]] — 不懂 Token count，就量不出工具数增加带来的每请求静态开销
- [[Framework-template repetition]] — 模板成本以 token 计且随请求重复，需先懂 token 计量。
- [[Baseline-request product]] — 基线×请求次数的估算以 token 为单位计算。
- [[Budget ceiling]] — 预算上限按 token 或金额设定，token 是计量基础。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Token-count-6df679b108ff830c95f3014dba7dcf19

## 别名

`token count`、`headcount to token count`

## 反链

- [[Harness token floor]]
- [[Tool-schema tax]]
- [[Baseline-request product]]
- [[Budget ceiling]]
- [[Framework-template repetition]]
- [[Token Efficiency]]
