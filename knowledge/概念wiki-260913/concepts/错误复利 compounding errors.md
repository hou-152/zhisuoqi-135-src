---
id: cm_44d86f15
name: 错误复利
nameEn: compounding errors
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: compute
centrality: 0.072
depth: 0
origin: [harness]
aliases: ["compounding errors"]
sources: 1
---

# 错误复利 · compounding errors

> 多步流程里每步微小失败率会累乘：10 步各 99% 成功率，端到端只剩约 90.4%。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.072

## 费曼一下

单步「几乎不出错」在多步流程里是一句安慰话。可靠性像利息，只是复的是负利。

## 原文 context

文章给出的硬数字——10 步流程、每步 99% 成功率，端到端只剩约 90.4%。由此推出 LangGraph 的四类错误分诊（瞬时、LLM 可恢复、用户可修、意外），以及把工具失败作为 error result 返回、Stripe 把重试上限设为两次这类具体做法。

## 掌握证据（做到这些才算会）

- 能算出 0.99 的 10 次方约为 90.4% 并解释衰减
- 能按瞬时、可恢复、用户可修、意外四类分诊错误

## 验收问句

> 10 步每步 99% 成功率，{{name}}下端到端还剩多少？

## 懂了它才能懂（解锁 1）

- [[收敛式失败恢复]] — 不懂【错误复利】，就做不了【收敛式失败恢复】的“失败时收敛修正避免错误累乘”。

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`compounding errors`

## 反链

- [[If you're not the model, you're the harness.]]
- [[agent 与 harness 的分工]]
- [[收敛式失败恢复]]
