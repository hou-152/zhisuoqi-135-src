---
id: cm_8a295891
name: 功能清单作为 harness 原语
type: REPRESENTATIONAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.042
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# 功能清单作为 harness 原语

> feature_list.json 既是任务来源、进度记录又是范围边界，被视为 harness 的原语。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

便签上的手写清单只有人能读；JSON 清单机器也能读、能校验、能在流水线里当门禁。当边界写成机器能解析的格式，它就从「善意的提醒」变成了「绕不过去的判据」。

## 原文 context

L08 的主张，「机器可读的范围边界，agent 无法忽略」。feature_list.json 在课程里同时出现在指令、状态、范围三个子系统中：它既是任务来源，也是进度记录，还是范围边界，因此被称为 harness 的**原语**（primitive）。

## 掌握证据（做到这些才算会）

- 能说明 feature_list.json 同时出现在指令、状态、范围三个子系统
- 能解释它为何被称作 harness 的原语

## 验收问句

> {{name}} 为何同时属于指令、状态与范围三个子系统？

## 先懂这些（前置 1）

- [[Harness]] · **hard** — 要成为 harness 原语，得先懂 harness 需要什么。

## 相关

- [[能力鸿沟]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[指令子系统与渐进式展开]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-18

## 出场

- Harness Engineering ｜ 《Harness 工程学习仓库：从原始文献到能跑的 skill》 ｜ https://github.com/walkinglabs/learn-harness-engineering/blob/main/README-CN.md
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[能力鸿沟]]
- [[指令子系统与渐进式展开]]
