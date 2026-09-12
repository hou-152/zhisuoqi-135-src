---
id: cm_b068ccc7
name: reasoning / thinking
type: CONCEPTUAL
subject: Context Engineering
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.099
depth: 0
origin: [context]
aliases: []
sources: 1
---

# reasoning / thinking

> 让模型花更多时间与 token 推演问题的推理/思考模式。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.099

## 费曼一下

reasoning 是给模型更多计算预算，让它在回答前先整理假设、追踪代码路径、比较解决方案，尤其适合调试。

## 原文 context

reasoning 让模型花更多时间和 token 推演问题。

## 掌握证据（做到这些才算会）

- 能区分普通回答与推理模式输出的差异
- 能说明它为何更慢更贵

## 验收问句

> {{name}} 打开之后，模型多花的是什么？

## 懂了它才能懂（解锁 3）

- [[reasoning effort]] — 推理强度是推理/思考模式的调节旋钮，不懂推理模式就不知道在调什么。
- [[RLVR 与编码 agent 的 RL 训练循环]] — RLVR 强化的 trace 是推理/思考过程，懂推理模式能更好理解被验证的对象。
- [[N-gram]] — 懂 N-gram 的局部依赖局限，才懂为何需要花更多 token 做长程推理。

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[Harness]]
- [[RLVR 与编码 agent 的 RL 训练循环]]
- [[LLM Large Language Model]]
- [[coding agent]]
- [[N-gram]]
- [[reasoning effort]]
