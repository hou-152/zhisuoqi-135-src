---
id: cm_3a51a33e
name: 熵与腐化
nameEn: entropy and decay
type: CONCEPTUAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [harness]
aliases: ["entropy and decay"]
sources: 1
---

# 熵与腐化 · entropy and decay

> 老代码库往往非标准化、充满熵，是判断能否补harness进行改造的依据，也是垃圾回收agent的对手。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

熵在这里是很具体的东西：文档和代码对不上、模块边界越界、同一件事有五种写法。它不会一次性爆发，只会日积月累，直到没人能说清系统的真实结构——那时你想加任何自动化都无处下手。

## 原文 context

既是「垃圾回收」agent 的对手，也是作者判断老代码库能否改造的依据——老应用往往「so non-standardized and full of entropy」，补 harness 未必划算。

## 掌握证据（做到这些才算会）

- 能判断某个老应用补harness是否划算
- 能说明熵与垃圾回收agent之间的关系

## 验收问句

> 怎么用{{name}}判断老代码库值不值得改造？

## 相关

- [[无手打代码 no manually typed code at all]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-01

## 出场

- Harness Engineering ｜ 《Martin Fowler 为「harness 工程」站台：Thoughtworks 的一线笔记》 ｜ https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html

## 别名

`entropy and decay`

## 反链

- [[Harness]]
- [[上下文工程 context engineering]]
- [[无手打代码 no manually typed code at all]]
