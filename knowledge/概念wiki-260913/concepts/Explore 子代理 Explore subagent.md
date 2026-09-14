---
id: cm_9036fb68
name: Explore 子代理
nameEn: Explore subagent
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.107
depth: 0
origin: [neican]
aliases: ["Explore subagent"]
sources: 1
---

# Explore 子代理 · Explore subagent

> 智能体按需生成的搜索子代理，在独立上下文窗口用更快模型并行搜索，只返回发现结果。

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.107

## 费曼一下

Explore 子代理是智能体在需要时生成的搜索帮手。它有自己的上下文窗口，使用更快模型做大量并行搜索，只把发现结果交回来，所以不会把大量搜索内容塞进主对话。它解释了大型代码库搜索如何保持主对话聚焦。

## 原文 context

智能体还可以生成子代理，更高效地完成任务。

> 内置的 Explore 子代理可帮助您搜索代码库。Explore 子代理在独立于父智能体的上下文窗口中运行，并使用速度更快的模型，因此可以执行大量并行搜索，而不会占用过多主对话的上下文。

> 您无需手动调用它。智能体会在判断其适用时使用它。不过，您也可以直接要求使用该子代理。

## 掌握证据（做到这些才算会）

- 能说出它运行在独立于父智能体的上下文窗口并使用更快模型
- 能在需要时显式要求智能体使用 Explore 子代理

## 验收问句

> 什么情况下该让 {{name}} 去搜索，而不是主智能体自己搜？

## 懂了它才能懂（解锁 1）

- [[多模型并行与多智能体评判]] — 不懂【Explore 子代理】就做不了【多模型并行与多智能体评判】的 ⟨在隔离环境并行运行多个模型并只返回修复方案⟩

## 出场

- AI 内参 260912 ｜ 《理解您的代码库》 ｜ https://cursor.com/cn/learn/understanding-your-codebase

## 别名

`Explore subagent`

## 反链

- [[多模型并行与多智能体评判]]
