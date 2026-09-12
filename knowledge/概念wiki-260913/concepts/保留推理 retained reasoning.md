---
id: cm_42f28056
name: 保留推理
nameEn: retained reasoning
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.035
depth: 0
origin: [context, harness]
aliases: ["retained reasoning"]
sources: 2
---

# 保留推理 · retained reasoning

> 跨工具调用与轮次保留模型私有推理，让它看到此前的计划与思路，而不只是动作记录。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.035

## 费曼一下

让模型把自己的草稿纸留在桌上，而不是每做完一步就撕掉。有草稿在，它不必重新推导已经想明白的事，因此反而想得更少、走得更快。

## 原文 context

两个被打开的 API 设置之一。原 harness 在每次动作后丢弃全部私有推理，模型只能看到过去的动作记录，看不到「the plans, insights, or thoughts that led to them」；在 Responses API 中传入上一条 response ID 即可跨工具调用与轮次自动保留。

## 掌握证据（做到这些才算会）

- 能说出开启前后模型可见信息的差别
- 能在多轮任务中通过 response ID 保留推理并观察效果

## 验收问句

> 开启 {{name}} 后，模型多看到了哪些信息？

## 相关

- [[滚动截断 rolling truncation]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[跨轮次记忆与连贯策略]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[RHAE]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[Responses API 与生产设置对齐]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[通用 harness 的公平性张力]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[上下文占用率与性能衰减]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[输出 token 效率]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[基准测试的捆绑测量性]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[上下文压缩 Context Compression Summarization]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-A2

## 出场

- Context Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- Harness Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores

## 别名

`retained reasoning`

## 反链

- [[上下文占用率与性能衰减]]
- [[通用 harness 的公平性张力]]
- [[基准测试的捆绑测量性]]
- [[跨轮次记忆与连贯策略]]
- [[输出 token 效率]]
- [[Responses API 与生产设置对齐]]
- [[RHAE]]
- [[上下文压缩 Context Compression Summarization]]
- [[滚动截断 rolling truncation]]
