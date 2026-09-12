---
id: cm_d0269dfa
name: 泄露能力的 U 型曲线
type: CONCEPTUAL
subject: AI 概念库
domain: safety-governance
learningStage: deep-dive
verification: judge
centrality: 0.072
depth: 1
origin: [notion]
aliases: ["Logits Leakage U-Curve / U 型泄密曲线"]
sources: 1
---

# 泄露能力的 U 型曲线

> 仅看前 2 个候选词几乎只有噪声，取 30 至 80 个 logits 时探针准确率最高，再扩大反而跌破随机水平。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 原文 context

<mention-page url="https://app.notion.com/p/ffc679b108ff823ba0e901e51459673b"/>
- **context**：
	> 仅看排名前 2 的候选词时，模型几乎只暴露噪声信息；增加观察数量后，探针的预测准确率会迅速攀升，并在截取 30 至 80 个 Logits（视具体模型深度 1L 或 2L 而定）时达到顶峰。如果继续扩大 Logits 集合到 4L 或 5L 以上，预测能力反而会因为高维噪声干扰而跌落回随机水平。
- **费曼一下**：泄露并不是 "看得越多越多"。Top-2 太少、Top-几百又太杂；正中间 30–80 个 logits（约 1L–2L）才是泄密重灾区——攻击者根本不用拿到完整词表。

## 掌握证据（做到这些才算会）

- 能说出泄露能力随 logits 数量呈倒 U 型，峰值约 1L–2L
- 能解释高维噪声为何使更大集合的预测回落到随机

## 验收问句

> 按 {{name}}，攻击者为什么不需拿到完整词表也能做泄露探针？

## 先懂这些（前置 1）

- [[灰盒场景]] · **hard** — 曲线讲的是灰盒下取多少 logits 最能泄露，先须有灰盒访问前提

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/U-439679b108ff83c0b366812b8f94470e

## 别名

`Logits Leakage U-Curve / U 型泄密曲线`

## 反链

- [[灰盒场景]]
