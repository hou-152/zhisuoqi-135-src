---
id: cm_b068ccc7
name: reasoning / thinking
type: CONCEPTUAL
subject: Context Engineering
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 0
origin: [context]
aliases: []
sources: 1
---

# reasoning / thinking

> 让模型花更多时间与 token 推演问题的推理/思考模式。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

reasoning 是给模型更多计算预算，让它在回答前先整理假设、追踪代码路径、比较解决方案，尤其适合调试。

## 原文 context

reasoning 让模型花更多时间和 token 推演问题。

## 掌握证据（做到这些才算会）

- 能区分普通回答与推理模式输出的差异
- 能说明它为何更慢更贵

## 验收问句

> {{name}} 打开之后，模型多花的是什么？

## 懂了它才能懂（解锁 2）

- [[reasoning effort]] — 推理强度调节的是思考模式花多少 token，不懂思考模式就不懂它在调什么。
- [[推理模型]] — 不懂 reasoning/thinking 的长思考链推演，就做不了推理模型出答案前先拆解推演的定义

## 相关

- [[RLVR 与编码 agent 的 RL 训练循环]] · rejected（audit） — reasoning/thinking 只是编码 trace 的可选内容，RL 训练循环机制不依赖它，应移出依赖图。
- [[Logits]] · related-to（audit） — reasoning/thinking 可在 token 生成层面理解，logits 是更底层输出分数；不懂 logits 不妨碍理解思考模式。
- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[coding agent]]
- [[推理模型]]
- [[LLM Large Language Model]]
- [[RLVR 与编码 agent 的 RL 训练循环]]
- [[Logits]]
- [[reasoning effort]]
