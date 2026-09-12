---
id: cm_264fbc7c
name: 臃肿工具集
nameEn: bloated tool sets
type: CONCEPTUAL
subject: Context Engineering
domain: tools-sandbox
learningStage: now
verification: judge
centrality: 0.042
depth: 0
origin: [context]
aliases: ["bloated tool sets"]
sources: 1
---

# 臃肿工具集 · bloated tool sets

> 工具覆盖功能过宽或制造「该用哪个」的模糊决策点，让 agent 无法确定应调用哪一个。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

厨房里摆了七把功能重叠的刀，新来的厨师第一反应是发愣。工具多不等于能力强，重叠和歧义会直接转化成犹豫和出错。判断标准很简单：让一个熟手来看，他能不能一口说出该用哪把。

## 原文 context

文中点名的最常见失败模式——工具覆盖功能过宽，或制造出「该用哪个」的模糊决策点。判据极为锋利：「If a human engineer can't definitively say which tool should be used in a given situation, an AI agent can't be expected to do better.」

## 掌握证据（做到这些才算会）

- 能指出臃肿工具集的两种典型表现：覆盖过宽、决策模糊
- 能用人能明确选哪个工具这一判据反推 agent 的可选性

## 验收问句

> 用作者判据说明怎样断定一组工具已构成{{name}}？

## 懂了它才能懂（解锁 1）

- [[工具收窄 tool scoping]] — 收窄正是针对工具过多导致表现变差的问题，不懂臃肿就不知为何要缩减。

## 相关

- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

## 别名

`bloated tool sets`

## 反链

- [[上下文工程 context engineering]]
- [[注意力预算 attention budget]]
- [[上下文腐烂 Context Rot]]
- [[工具收窄 tool scoping]]
