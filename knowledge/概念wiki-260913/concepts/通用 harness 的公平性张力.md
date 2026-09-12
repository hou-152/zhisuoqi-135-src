---
id: cm_8897d219
name: 通用 harness 的公平性张力
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: verification-eval
learningStage: deep-dive
verification: judge
centrality: 0.089
depth: 1
origin: [context, harness]
aliases: []
sources: 2
---

# 通用 harness 的公平性张力

> 通用 harness 让模型对比更公平、缺陷更可见，但也让评测偏离真实部署形态。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

统一考场对所有考生一视同仁，却也剥夺了每个人惯用的工具。公平和代表性在这里是一对拉扯：越标准化，越可比；越贴近真实，越有预测力。

## 原文 context

ARC 采用通用 harness 的理由是让模型缺陷更可见、让模型比较更公平；而 OpenAI 的发现表明，这种公平同时让评测远离了真实部署形态。文末以致谢方式承认了 ARC 工作的价值。

## 掌握证据（做到这些才算会）

- 能复述 ARC 采用通用 harness 的理由
- 能指出公平性与真实部署形态之间的取舍

## 验收问句

> {{name}} 的代价是什么，评测因此损失了什么？

## 先懂这些（前置 1）

- [[基准测试的捆绑测量性]] · **hard** — 不知道基准捆绑了 harness 与提示词等选择，就看不出公平与真实部署的张力。

## 相关

- [[Harness-level benchmarks]] · related-to（audit） — 公平性张力是相关议题，不是 harness-level benchmarks 的定义前置。
- [[RHAE]] · related-to（audit） — 公平性张力有助于解读人类基线浮动，但 RHAE 指标本身可独立理解。
- [[保留推理 retained reasoning]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[基准测试的捆绑测量性]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-A2

## 出场

- Context Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- Harness Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
## 反链

- [[基准测试的捆绑测量性]]
- [[Harness-level benchmarks]]
- [[保留推理 retained reasoning]]
- [[RHAE]]
