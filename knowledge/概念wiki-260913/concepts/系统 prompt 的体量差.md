---
id: cm_b8aa3676
name: 系统 prompt 的体量差
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 系统 prompt 的体量差

> claude code 的 system prompt 约 13k 字符，cursor 不到 6k。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 费曼一下

prompt 的长度是一个可观测的用心程度指标。它相当于给员工写的入职手册——手册越细，说明产品越清楚自己要什么行为，而不是把一切交给模型即兴发挥。

## 原文 context

正式请求的观察之一：claude code 的 prompt 有 13k 字符，「相比之下 cursor 的 prompt 只有不到 6k」。这份 prompt 详尽规定了语气、简洁度上限、主动性边界、代码风格与工具使用纪律。

## 掌握证据（做到这些才算会）

- 能给出两者 prompt 的体量对比
- 能列出这份 prompt 详尽规定的几类内容

## 验收问句

> {{name}} 主要差在哪几类规定上？

## 相关

- [[对话加确定性缝合]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[反向代理式窥探]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[看对话 log]] · 同篇出现（co-occurrence） — 同篇出现：harness-21

## 出场

- Harness Engineering ｜ 《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》 ｜ https://xxchan.me/ai/2025/05/06/claude-code.html
## 反链

- [[看对话 log]]
- [[对话加确定性缝合]]
- [[反向代理式窥探]]
