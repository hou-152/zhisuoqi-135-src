---
id: cm_8fabdf4b
name: few-shot 套路化与受控多样性
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.042
depth: 2
origin: [context]
aliases: []
sources: 1
---

# few-shot 套路化与受控多样性

> 上下文里堆满彼此相似的 action-observation 对时，模型会照着旧模式走下去，需引入结构化变化。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

给模型看太多整齐划一的样例，它会以为节奏本身就是任务。适度打乱，是提醒它每一步都要重新看一眼。

## 原文 context

语言模型强模仿能力的反面。上下文里堆满彼此相似的 action-observation 对时，模型会照着那个模式走下去，哪怕已非最优；批量审阅 20 份简历这类重复性任务尤其容易漂移、过度泛化甚至幻觉。Manus 的解法是在动作与观察中引入结构化变化——不同的序列化模板、替代措辞、顺序与格式上的轻微噪声。

## 掌握证据（做到这些才算会）

- 能指出批量重复任务中漂移与幻觉的具体表现
- 能设计模板、措辞与顺序上的受控扰动

## 验收问句

> {{name}} 为何会让模型在批量任务中漂移？

## 先懂这些（前置 1）

- [[Context Distraction]] · **soft** — 相似样例导致机械重复，正是分心机制在样本层面的表现

## 相关

- [[押注 in-context learning]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[与底层模型正交 orthogonal to the underlying models]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-04

## 出场

- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
## 反链

- [[上下文工程 context engineering]]
- [[Context Distraction]]
- [[押注 in-context learning]]
- [[与底层模型正交 orthogonal to the underlying models]]
