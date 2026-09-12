---
id: cm_b7424773
name: 滚动截断
nameEn: rolling truncation
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.035
depth: 0
origin: [context, harness]
aliases: ["rolling truncation"]
sources: 2
---

# 滚动截断 · rolling truncation

> 官方 harness 的上下文管理：超过约 175,000 字符就丢弃最旧消息，代价是丢失早期观察且常运行在更满窗口。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.035

## 费曼一下

像一条只能记住最近几步的传送带，旧的东西自动掉出去。你不会收到任何提示，只会发现自己反复回到同一个死胡同。

## 原文 context

官方 harness 的上下文管理方式，超过 175,000 字符就丢弃最旧的消息。文中列出两个弊端：丢失更早的观察与动作，以及大部分时间运行在更满的上下文窗口下从而轻微损害表现。

## 掌握证据（做到这些才算会）

- 能说出滚动截断的两个已知弊端
- 能对比它与其他上下文管理策略的取舍

## 验收问句

> {{name}} 会丢什么样的信息，什么时候会害到 Agent？

## 相关

- [[保留推理 retained reasoning]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[基准测试的捆绑测量性]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-A2

## 出场

- Context Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- Harness Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores

## 别名

`rolling truncation`

## 反链

- [[Harness]]
- [[基准测试的捆绑测量性]]
- [[保留推理 retained reasoning]]
