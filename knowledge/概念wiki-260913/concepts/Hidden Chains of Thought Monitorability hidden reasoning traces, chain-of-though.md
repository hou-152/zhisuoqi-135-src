---
id: cm_9657e384
name: Hidden Chains of Thought / Monitorability
nameEn: hidden reasoning traces, chain-of-thought monitoring
type: CONCEPTUAL
subject: AI 内参 260912
domain: safety-governance
learningStage: deep-dive
verification: judge
centrality: 0.07
depth: 0
origin: [neican]
aliases: ["hidden reasoning traces, chain-of-thought monitoring"]
sources: 1
---

# Hidden Chains of Thought / Monitorability · hidden reasoning traces, chain-of-thought monitoring

> 对用户隐藏 CoT 与开发者能否监控 CoT 是两回事；Astra 的 trace 更短更少信息，监控变差。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.07

## 费曼一下

对用户隐藏 CoT 和开发者能否监控 CoT 是两件事。OpenAI 从 o1 起就对用户隐藏大部分 trace；文章中真正讨论的是 monitorability 下降。Astra 的 system card 提到 trace 更短、信息更少导致监控变差，但作者强调这不能 establishing looping 是根因。

## 原文 context

First, OpenAI has been hiding (most of) the reasoning traces from users from the very beginning, since OpenAI o1, anyway. So, for the end-user, there shouldn’t be a big difference.

> So, the interpretation-concern is mostly with respect to the model developers.

> Either way, I don’t think that looped transformers are significant contributors towards hiding or obscuring chains of thought.

> Now, Astra’s system card does state that there is also evidence of reduced monitorability of their reasoning traces, and there is a bit of regression relative to Sol. It’s mostly associated with shorter, less informative traces. But again, this doesn’t establish looping as the root cause.

## 掌握证据（做到这些才算会）

- 能区分“对用户隐藏”与“可监控性下降”两个问题
- 能说明作者为何不把监控变差归因于 looping

## 验收问句

> {{name}} 是针对谁的问题，文章为何拒绝把它归因于 looped transformer？

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`hidden reasoning traces, chain-of-thought monitoring`
