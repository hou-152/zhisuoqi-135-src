---
id: cm_7c40465d
name: TOCC
type: REPRESENTATIONAL
subject: AI 概念库
domain: spec-intent
learningStage: when-needed
verification: use
centrality: 0.072
depth: 2
origin: [notion]
aliases: ["Task-Oriented Coreference Chain（即插即用指代解析层）"]
sources: 1
---

# TOCC

> 前置指令重写的轻量即插即用解法，把指代解析与任务规划解耦以提高成功率。

**领域** spec-intent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 原文 context

来源：<mention-page url="https://app.notion.com/p/dfc679b108ff825eac7b01a50bcec8e1"/>
> 团队在文中也提供了一个名为 TOCC 的轻量级即插即用的解法，通过前置指令重写，将指代解析与任务规划解耦，有效提高成功率。
**费曼一下**：插在 LLM-机器人前面的「翻译层」——先把「那家伙」翻成「锅」，再让任务规划器干活。把「听懂人话」和「做事」拆成两步，而不是混在一起一气呵成。

## 掌握证据（做到这些才算会）

- 能描述先把「那家伙」翻成「锅」再交给规划器的两段式
- 能对比解耦与一体化在指代密集任务上的成功率

## 验收问句

> {{name}} 为什么要把指代解析与任务规划解耦？

## 先懂这些（前置 2）

- [[指代表达]] · **hard** — TOCC 把指代解析与任务规划解耦，前提是懂指代表达及其难听的档位。
- [[隐式指代]] · **soft** — 它主要处理难解析的隐式指称，理解隐式指代更懂它为何要前置重写。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/TOCC-0dc679b108ff82cdb3ae81e9aabb0ace

## 别名

`Task-Oriented Coreference Chain（即插即用指代解析层）`

## 反链

- [[指代表达]]
- [[隐式指代]]
