---
id: cm_dcb78706
name: 验证循环：guides 与 sensors
type: PROCEDURAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: use
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 验证循环：guides 与 sensors

> 由规则式反馈、视觉反馈、LLM-as-judge 组成的验证通路，分为行动前的 guides 与行动后的 sensors。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

一种是提前给你划好车道线，一种是事后告诉你压线了。两种都要，前者省事，后者兜底。

## 原文 context

区分玩具 demo 与生产 agent 的关键组件。Anthropic 推荐规则式反馈（测试、linter、类型检查）、视觉反馈（Playwright 截图）、LLM-as-judge 三种；Boris Cherny 观察到给模型验证通路能把质量提升 2 到 3 倍。Martin Fowler 的 Thoughtworks 团队把计算式与推断式验证表述为 guides（前馈，行动前引导）与 sensors（反馈，行动后观察）。

## 掌握证据（做到这些才算会）

- 能说出三类反馈手段并各举一例
- 能说明 guides 与 sensors 分别对应前馈和反馈

## 验收问句

> {{name}} 里的 guides 和 sensors 各在什么时候起作用？

## 懂了它才能懂（解锁 1）

- [[形成性评估]] — 不懂【验证循环：guides 与 sensors】，就做不了【形成性评估】的「持续测量、反馈与调整」

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12
## 反链

- [[If you're not the model, you're the harness.]]
- [[agent 与 harness 的分工]]
- [[形成性评估]]
