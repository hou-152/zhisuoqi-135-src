---
id: cm_44d86f15
name: 错误复利
nameEn: compounding errors
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: compute
centrality: 0.017
depth: 0
origin: [harness]
aliases: ["compounding errors"]
sources: 1
---

# 错误复利 · compounding errors

> 多步流程中每步成功率相乘，10 步各 99% 端到端只剩约 90.4%，故需错误分诊与重试上限。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.017

## 费曼一下

单步「几乎不出错」在多步流程里是一句安慰话。可靠性像利息，只是复的是负利。

## 原文 context

文章给出的硬数字——10 步流程、每步 99% 成功率，端到端只剩约 90.4%。由此推出 LangGraph 的四类错误分诊（瞬时、LLM 可恢复、用户可修、意外），以及把工具失败作为 error result 返回、Stripe 把重试上限设为两次这类具体做法。

## 掌握证据（做到这些才算会）

- 能算出任意步数与单步成功率下的端到端成功率
- 能把失败按瞬时、模型可恢复、用户可修、意外四类分诊并给出对策

## 验收问句

> 10 步各 99% 成功率，按 {{name}} 端到端约剩多少？

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`compounding errors`

## 反链

- [[agent 与 harness 的分工]]
- [[If you're not the model, you're the harness.]]
