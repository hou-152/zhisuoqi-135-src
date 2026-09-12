---
id: cm_acc5b32d
name: Context Distraction】
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 2
origin: [context]
aliases: []
sources: 1
---

# Context Distraction】

> 上下文超过阈值后模型开始机械重复历史行为而非真正推理，窗口更大不等于结果更好。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

Context 塞得越多不等于越好。超过某个阈值后，模型反而被"淹没"，开始走捷径而非推理，出现退行行为。质量 > 数量。

## 原文 context

当 Context 超过某个阈值（比如 Llama 3.1 的 32k），模型开始机械重复历史行为，而不是真正推理。更大的 Context Window 不等于更好的结果。

## 掌握证据（做到这些才算会）

- 能指出触发分心的上下文量级
- 能举例说明重复历史行为的表现

## 验收问句

> 怎么判断模型进入了 {{name}} 而不是在推理？

## 先懂这些（前置 1）

- [[上下文占用率与性能衰减]] · **hard** — 分心是上下文超阈值后性能衰减的一种具体表现

## 相关

- [[Personal Context】]] · 同篇出现（co-occurrence） — 同篇出现：context-26
- [[长上下文窗口]] · 同篇出现（co-occurrence） — 同篇出现：context-26
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-26

## 出场

- Context Engineering ｜ 《什么是 Context？》 ｜ https://readwise.io/reader/shared/01khwm8y8twkr9g7f66wh459qf
## 反链

- [[长上下文窗口]]
- [[上下文占用率与性能衰减]]
- [[Personal Context】]]
