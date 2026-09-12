---
id: cm_49b4fe8b
name: prefill 与 decode 的高度倾斜
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.181
depth: 1
origin: [context]
aliases: []
sources: 1
---

# prefill 与 decode 的高度倾斜

> Agent 每步追加 action 与 observation 使输入膨胀，输出却只是短 function call，如 Manus 约 100:1。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

agent 是"读一百个字、写一个字"的活。既然成本几乎全在"读"上，优化就该全部押在如何让读变便宜，而不是让写变短。

## 原文 context

agent 与 chatbot 的结构差异。agent 每一步都往上下文追加 action 与 observation，上下文持续增长，而输出通常只是一个短的结构化 function call。Manus 的平均输入输出 token 比约 100:1。

## 掌握证据（做到这些才算会）

- 能解释为何 agent 的输入输出比与 chatbot 相反
- 能用这个比例估算上下文增长速度

## 验收问句

> 为什么 {{name}} 会让上下文持续涨而输出很短？

## 先懂这些（前置 3）

- [[stateless]] · **hard** — 调用无状态，才需每步追加历史导致输入膨胀。
- [[messages API 作为直连网关]] · **soft** — 知道直连网关的请求响应形态，才能理解输入膨胀而输出短。
- [[context window 即 agent 状态]] · **soft** — 不懂【context window 即 agent 状态】，就做不了分析 prefill/decode 倾斜的成因

## 相关

- [[押注 in-context learning]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[与底层模型正交 orthogonal to the underlying models]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-04

## 出场

- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
## 反链

- [[上下文工程 context engineering]]
- [[stateless]]
- [[context window 即 agent 状态]]
- [[押注 in-context learning]]
- [[messages API 作为直连网关]]
- [[与底层模型正交 orthogonal to the underlying models]]
