---
id: cm_be8b8c24
name: Skill as asset
type: CONCEPTUAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Skill as asset

> loop 只是管道，真正可复利的资产是它调用的、可复用且测试过的 skill。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

loop 像自动化流水线，skill 像流水线上的专用工具。流水线本身不值钱，值钱的是里面那些越用越成熟的工具。

## 原文 context

文章结尾说 loop 是 plumbing，资产是它调用的 skill。可复用、测试过、命名清楚的 skills 才能让 loop 复利。

## 掌握证据（做到这些才算会）

- 能列出自己 loop 中复用且测试过的 skill
- 能指出哪些 loop 环节没沉淀成 skill 因而没有复利

## 验收问句

> 你的 loop 里，真正算资产的部分如何体现在 {{name}} 上？

## 先懂这些（前置 1）

- [[Legible Codebase]] · **soft** — 不懂 Legible Codebase，就做不了 Skill as asset 的「让 agent 在代码库中发现、复用并测试 skill」

## 相关

- [[宏动作]] · related-to（audit） — 「skill 是可复用资产」本身自足，宏动作只是说明它被谁调用；不懂宏动作顶多少了调用场景，不影响该论断成立
- [[Watch 模式与自动更新 hooks]] · rejected（audit） — 完全不相干；watch/hooks 不帮助理解 skill 作为可复利资产，只是另一 CLI 功能，不构成依赖。
- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15

## 出场

- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
## 反链

- [[Loop Engineering]]
- [[Continuous orchestration loop]]
- [[Legible Codebase]]
- [[宏动作]]
- [[Model as subroutine]]
- [[Watch 模式与自动更新 hooks]]
