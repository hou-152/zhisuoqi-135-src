---
id: cm_2733c0ea
name: 检索池 vs 引用
type: CONCEPTUAL
subject: AI 概念库
domain: memory-retrieval
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["Retrieval Pool vs Citation"]
sources: 1
---

# 检索池 vs 引用

> 进入检索池只是第一关，被检索页面中约 85% 从未被模型引用。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

AI 引用是两阶段 —— 先被检索到（进入候选池），再被模型选中作答。85% 进了池子也用不上。提升 AI 可见性 = 同时优化两关：进得去 + 配得上被引用。llms.txt 和 Markdown 路由有效的本质就是：给模型一个干净、明确的信号说明这个页面是什么。

## 原文 context

> ChatGPT 检索到的页面里只有 15% 最终出现在回答中，85% 从未被引用。进入检索池只是第一关，模型还要判断哪些值得引用。

## 掌握证据（做到这些才算会）

- 能引用 15% 被引用比例的数据
- 能区分「被检索到」与「被引用」两步

## 验收问句

> 你如何判断 {{name}} 只是进了检索池而没被引用？

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/vs-b62679b108ff834ea8ff81cafa636199

## 别名

`Retrieval Pool vs Citation`
