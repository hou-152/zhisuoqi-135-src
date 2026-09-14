---
id: cm_26e584e0
name: 事实与推导的自动级联失效
nameEn: Automatic invalidation of derived facts
type: CONCEPTUAL
subject: AI 内参 260912
domain: memory-retrieval
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 1
origin: [neican]
aliases: ["Automatic invalidation of derived facts"]
sources: 1
---

# 事实与推导的自动级联失效 · Automatic invalidation of derived facts

> 观察变化时，依赖该事实的结论自动变为失效，无需模型重读历史去发现全部连锁后果。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

当现实中的某条事实发生变化时，我们不需要模型去重新阅读长篇历史记录并赌它能发现所有连锁反应；底层数据库直接像多米诺骨牌一样，把所有依赖于该事实的推论全自动标记为失效。

## 原文 context

If an observation changes, I don’t want the model to reconstruct the entire investigation from a transcript and hopefully notice all of the consequences. I want the affected conclusions to become invalid automatically.

## 掌握证据（做到这些才算会）

- 能说明为何不让模型从 transcript 重建整个调查再赌它注意到后果
- 能描述受影响结论被自动标记失效的传播方式

## 验收问句

> {{name}} 发生时是系统自动处理，还是靠模型重读历史发现？

## 先懂这些（前置 2）

- [[状态维护型记忆 State-maintaining memory vs. Conversational memory]] · **hard** — 不懂状态维护型记忆，就做不了观察变化时前提被推翻后相应认知随之更新的级联失效。
- [[推论因果溯源图 Provenance of conclusions]] · **hard** — 不懂推论因果溯源图，就做不了级联失效中顺藤摸瓜找到所有依赖该事实的结论。

## 出场

- AI 内参 260912 ｜ 《Some things should probably stay fuzzy》 ｜ https://pwning.systems/posts/llm-memory-program-analysis/

## 别名

`Automatic invalidation of derived facts`

## 反链

- [[推论因果溯源图 Provenance of conclusions]]
- [[状态维护型记忆 State-maintaining memory vs. Conversational memory]]
