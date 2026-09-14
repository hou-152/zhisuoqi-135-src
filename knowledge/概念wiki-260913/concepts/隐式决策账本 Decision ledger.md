---
id: cm_3107b939
name: 隐式决策账本
nameEn: Decision ledger
type: CONCEPTUAL
subject: AI 内参 260912
domain: code-engineering
learningStage: now
verification: use
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["Decision ledger"]
sources: 1
---

# 隐式决策账本 · Decision ledger

> 要求 Agent 交出所有规格未写、自己擅自拍板的决策清单，按把握度倒序排列供人专审。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

指要求 Agent 在交付代码的同时，交出一份清单，把所有“需求规格书没写明、但模型在编码时自己擅自拍板拿主意”的地方（如重试策略、并发锁选择、表结构合并等）逐条写下来，并按“自己最没把握”到“最有把握”倒序排列。人类不看万行代码，专审这几十条决策。

## 原文 context

Sensors and invariants tell you a piece does what it says. They don't tell you that the agent silently picked optimistic concurrency, or invented a retry policy nobody specified, or decided two features should share a table. Those aren't defects — the tests pass, the outputs are correct, the sensors are green. They're decisions, and they're what bites you three months later when you need to change something.

## 掌握证据（做到这些才算会）

- 能列出账本应记的决策类型，如重试策略、并发选择、表合并
- 能按最没把握到最有把握对决策逐条排序

## 验收问句

> 能否让 Agent 产出并审阅一份{{name}}？

## 出场

- AI 内参 260912 ｜ 《Building software factories (with no slop)》 ｜ https://x.com/dzhng/status/2090252351533973768/?rw_tt_thread=True

## 别名

`Decision ledger`
