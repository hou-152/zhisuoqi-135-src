---
id: cm_31a86272
name: 脚手架化 LLM 与冯·诺依曼架构类比
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.042
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# 脚手架化 LLM 与冯·诺依曼架构类比

> 把裸 LLM 比作无内存 CPU，上下文窗口是 RAM，外部数据库是磁盘，工具集成是设备驱动，harness 是操作系统。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

CPU 再快，没有操作系统也开不了机。把 LLM 当 CPU 看，很多设计问题就不再新鲜——它们是计算机体系结构里已经解过一遍的老题。

## 原文 context

Beren Millidge 2023 年文章《Scaffolded LLMs as Natural Language Computers》提出的映射——裸 LLM 是没有内存、硬盘和 I/O 的 CPU，上下文窗口是 RAM，外部数据库是磁盘，工具集成是设备驱动，harness 是操作系统。他的结论是「We have reinvented the Von Neumann architecture」。

## 掌握证据（做到这些才算会）

- 能复述该类比中的五组对应关系
- 能据此判断某项功能该落在 harness 层还是模型层

## 验收问句

> 按 {{name}}，上下文窗口相当于什么？

## 先懂这些（前置 1）

- [[操作系统类比]] · **soft** — 冯·诺依曼类比是操作系统类比的延伸与细化。

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12
## 反链

- [[操作系统类比]]
- [[agent 与 harness 的分工]]
- [[If you're not the model, you're the harness.]]
