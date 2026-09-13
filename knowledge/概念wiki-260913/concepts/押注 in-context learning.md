---
id: cm_eb3087aa
name: 押注 in-context learning
type: CONCEPTUAL
subject: Context Engineering
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [context]
aliases: []
sources: 1
---

# 押注 in-context learning

> 因微调迁移任务成本高、自研模型被通用大模型一夜超越，选择把宝押在模型的上下文内学习能力上。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

以前教会模型做新事得回炉重炼几周；现在只要在对话里把事情说清楚，它当场就会。既然如此，把力气花在"怎么说清楚"上，比花在重炼上划算得多。

## 原文 context

项目起点的关键决策。作者在 BERT 时代经历过"必须 fine-tune 才能迁移新任务、一轮迭代要几周"的苦，又亲眼看到 GPT-3 与 Flan-T5 让自研模型"irrelevant overnight"，因此选择把宝押在模型的上下文内学习能力上。

## 掌握证据（做到这些才算会）

- 能说明 BERT 时代必须 fine-tune 与迭代周期长的痛点
- 能论证在什么条件下该路线会被重新评估

## 验收问句

> {{name}}这个选择在什么条件下会需要推倒重来？

## 先懂这些（前置 1）

- [[LLM Large Language Model]] · **soft** — 押注ICL是押LLM的上下文学习能力，不懂LLM就无法理解该策略。

## 相关

- [[局部最优 local optima]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[KV-cache 命中率]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[prefill 与 decode 的高度倾斜]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[稳定的 prompt 前缀]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[action space 膨胀]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[logits 掩码与 context-aware 状态机]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[文件系统即终极上下文]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[复述（recitation）与 lost-in-the-middle]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[保留错误证据与错误恢复]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[Stochastic Graduate Descent]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[可恢复的压缩 restorable compression]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[few-shot 套路化与受控多样性]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[与底层模型正交 orthogonal to the underlying models]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-04

## 出场

- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
## 反链

- [[prefill 与 decode 的高度倾斜]]
- [[局部最优 local optima]]
- [[可恢复的压缩 restorable compression]]
- [[稳定的 prompt 前缀]]
- [[KV-cache 命中率]]
- [[LLM Large Language Model]]
- [[复述（recitation）与 lost-in-the-middle]]
- [[logits 掩码与 context-aware 状态机]]
- [[保留错误证据与错误恢复]]
- [[文件系统即终极上下文]]
- [[与底层模型正交 orthogonal to the underlying models]]
- [[action space 膨胀]]
- [[few-shot 套路化与受控多样性]]
- [[Stochastic Graduate Descent]]
