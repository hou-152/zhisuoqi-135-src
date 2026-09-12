---
id: cm_e907a229
name: docs/decisions/
type: REPRESENTATIONAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.042
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# docs/decisions/

> docs/decisions/ 下的架构决策记录，让 AI 不仅知道代码是什么，还知道代码为什么是这样。

**领域** code-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

仓库里专门记录"为什么这么写"的文档。光有代码本身，AI 只知道现状；有了 decisions 记录，AI 才理解约束的来历，不会无脑改回去。最容易被忽略，但杠杆最大。

## 原文 context

\-

"让 AI 不仅知道代码『是什么』，还知道代码『为什么是这样』。这一项最容易被忽略，但也是 AI 协作最大的杠杆点。"

## 掌握证据（做到这些才算会）

- 能按背景、决策、后果的结构写出一条 ADR
- 能用 ADR 回答 agent 对某设计的为什么提问

## 验收问句

> 你如何用 {{name}} 让 agent 理解某模块为何这样设计？

## 先懂这些（前置 1）

- [[仓库即唯一事实来源]] · **soft** — ADR 落盘使“为什么”也进入仓库，强化仓库作为唯一事实来源。

## 相关

- [[AI 工程基础设施 AI engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[1.6% vs 98.4%]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[确定性工程基础设施 deterministic engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20

## 出场

- Harness Engineering ｜ 《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349
## 反链

- [[仓库即唯一事实来源]]
- [[1.6% vs 98.4%]]
- [[确定性工程基础设施 deterministic engineering infrastructure]]
- [[AI 工程基础设施 AI engineering infrastructure]]
