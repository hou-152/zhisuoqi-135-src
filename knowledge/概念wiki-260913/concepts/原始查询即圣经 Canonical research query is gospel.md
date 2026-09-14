---
id: cm_b7b56e2b
name: 原始查询即圣经
nameEn: Canonical research query is gospel
type: CONCEPTUAL
subject: AI 内参 260912
domain: spec-intent
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["Canonical research query is gospel"]
sources: 1
---

# 原始查询即圣经 · Canonical research query is gospel

> 用户原始提示词被逐字持久化，后续每一步与子智能体都必须重读它

**领域** spec-intent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

指用户的原始输入提示词被逐字持久化为一个静态文件，流水线中派生出的所有子智能体在每一步都必须重新阅读这份原始文本。外围的格式要求与路径配置作为独立契约隔离，确保核心研究主旨绝不因多代转述而走样。

## 原文 context

Canonical research query is gospel. The verbatim user prompt is persisted to research/runs/<vault_tag>/query.md once and re-read by every subsequent step and every spawned subagent.

## 掌握证据（做到这些才算会）

- 能说出原始查询被存到哪个文件、被谁重读
- 能区分核心研究主旨与外围格式契约

## 验收问句

> {{name}} 是为了防止什么在流水线中走样？

## 出场

- AI 内参 260912 ｜ 《jordan-gibbs/hyperresearch：基于智能体的研究知识库。智能体收集、搜索并将网络研究成果整合到一个持久的、可搜索的维基中。》 ｜ https://github.com/jordan-gibbs/hyperresearch

## 别名

`Canonical research query is gospel`
