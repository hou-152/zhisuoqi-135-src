---
id: cm_9e10ff83
name: SayCan
type: REPRESENTATIONAL
subject: AI 概念库
domain: harness-runtime
learningStage: when-needed
verification: accept
centrality: 0.042
depth: 2
origin: [notion]
aliases: ["Do as I can", "not as I say"]
sources: 1
---

# SayCan

> Google 提出的「LLM 出主意、机器人评估能不能做」的接驳框架，常被当作主流基线。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.042

## 原文 context

来源：<mention-page url="https://app.notion.com/p/dfc679b108ff825eac7b01a50bcec8e1"/>
> 团队比较了三种大语言模型 (GPT-4o-mini、LLaMA3.1-8B、DeepSeekMath-7B) 的表现，同时还包括「GPT-4o + SayCan」组合方案以及人类基线……LLaMA3.1-8B+SayCan 的成功率也从基础的 57.7% 直接掉到了 46.9%。
**费曼一下**：Google 提出的经典「LLM 出主意 + 机器人评估能不能做」的 LLM-机器人接驳框架。本文用它当主流基线。

## 掌握证据（做到这些才算会）

- 能复述提议与可执行性评估两段式结构
- 能指出它在对比实验中被用作基线的角色

## 验收问句

> {{name}} 里由谁判断这个动作当前能不能做？

## 先懂这些（前置 1）

- [[higher-level runtime]] · **soft** — SayCan 在模型调用上做接驳评估，类似运行时接管 handoffs/guardrails。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/SayCan-1c9679b108ff83fbb06181b11a347d97

## 别名

`Do as I can`、`not as I say`

## 反链

- [[higher-level runtime]]
