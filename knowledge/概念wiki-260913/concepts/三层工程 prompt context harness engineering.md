---
id: cm_7675253d
name: 三层工程
nameEn: prompt / context / harness engineering
type: REPRESENTATIONAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: ["prompt / context / harness engineering"]
sources: 1
---

# 三层工程 · prompt / context / harness engineering

> prompt、context、harness三层同心工程，harness包住前两者并加上工具编排、状态持久化与验证。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

这是一组包含关系，不是三个并列流派。只谈提示词，等于只讨论怎么写一封信，却不管邮局、地址簿和收发流程。

## 原文 context

文章给出的三个同心层级——prompt engineering 打磨指令，context engineering 管理模型看到什么与何时看到，harness engineering 包住前两者并加上工具编排、状态持久化、错误恢复、验证循环、安全执行与生命周期管理。

## 掌握证据（做到这些才算会）

- 能说清三层各自负责什么
- 能列出harness层额外提供的能力清单

## 验收问句

> {{name}}中哪一层负责状态持久化与错误恢复？

## 先懂这些（前置 1）

- [[Agent vs Harness]] · **soft** — 不懂 Agent 与 Harness 的区分，就做不了三层工程里「harness 包住 prompt 和 context」的层次划分

## 懂了它才能懂（解锁 1）

- [[优化对象的阶梯]] — 不懂三层工程，就做不了优化对象阶梯里「prompt→context→harness code」逐级的排序

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`prompt / context / harness engineering`

## 反链

- [[Agent vs Harness]]
- [[If you're not the model, you're the harness.]]
- [[agent 与 harness 的分工]]
- [[优化对象的阶梯]]
