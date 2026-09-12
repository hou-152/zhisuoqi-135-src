---
id: cm_b3f7d7cc
name: Responses API 与生产设置对齐
type: REPRESENTATIONAL
subject: Context Engineering × Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.062
depth: 3
origin: [context, harness]
aliases: []
sources: 2
---

# Responses API 与生产设置对齐

> 用 Responses API 而非 legacy Chat Completions API 重新实现 harness，以更贴合生产设置。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.062

## 费曼一下

把评测环境改造成和产品线上一模一样，再去量成绩。你想知道车在高速上跑多快，就别在停车场里测。

## 原文 context

修复的实现路径。OpenAI 用 Responses API 重新实现 harness，理由是「To better match our production setup」；最终建议开发者用 Responses API 而非 legacy Chat Completions API。

## 掌握证据（做到这些才算会）

- 能说出理由「To better match our production setup」
- 能建议开发者改用 Responses API

## 验收问句

> 为什么这个 harness 要用 {{name}} 重写而不是旧接口？

## 先懂这些（前置 1）

- [[Harness 工程 Harness Engineering]] · **soft** — 用新 API 重实现 harness，先要懂 harness 工程怎么搭。

## 相关

- [[基准测试的捆绑测量性]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[保留推理 retained reasoning]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-A2

## 出场

- Context Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- Harness Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[基准测试的捆绑测量性]]
- [[保留推理 retained reasoning]]
