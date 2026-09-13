---
id: cm_eb2850df
name: Per-token Routing：Expert-choice vs Token-choice
nameEn: Mixture-of-Recursions, routing
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.107
depth: 2
origin: [neican]
aliases: ["Mixture-of-Recursions, routing"]
sources: 1
---

# Per-token Routing：Expert-choice vs Token-choice · Mixture-of-Recursions, routing

> 用小的 learned router 按 token 隐表示决定它过几次共享 stack，分 expert-choice 与 token-choice。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.107

## 费曼一下

这是比 adaptive halting 更细的循环决策：由 learned router 根据 token 的隐藏表示和上下文决定它过几次共享 stack。expert-choice 是每一步挑选哪些 token 继续走；token-choice 是一开始就给 token 分配路径。它解释了灵活循环如何按 token 粒度实现。

## 原文 context

This Mixture-of-Recursion approach here uses a small, learned router. This is similar to the routing idea in a mixture-of-experts model, except that here the routing decision determines how many times to apply the shared stack.

> The router operates on a token’s hidden representation, which also contains information about its context. So, we shouldn’t think of this as assigning every occurrence of a particular token the same number of passes...

> In *expert-choice routing*... each recursion step selects which tokens it will process. Tokens that exit are excluded from later steps. In *token-choice routing*... the router makes one decision at the beginning, assigning each token to a path with one, two, or three passes.

## 掌握证据（做到这些才算会）

- 能说出 expert-choice 与 token-choice 的差别
- 能指出 router 决定的是循环次数而非选哪个专家

## 验收问句

> {{name}} 里 router 决定的到底是什么，两种做法差在哪？

## 先懂这些（前置 1）

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]] · **hard** — 不懂【Looped Transformer / Recurrent Depth】，就无法理解 router 决定的「这个 token 过几次共享 stack」是在决定什么。

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`Mixture-of-Recursions, routing`

## 反链

- [[Looped Transformer Recurrent Depth looped transformer, recurrent depth]]
