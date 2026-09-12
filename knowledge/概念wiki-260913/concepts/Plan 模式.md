---
id: cm_46c26da4
name: Plan 模式
type: REPRESENTATIONAL
subject: AI 概念库
domain: spec-intent
learningStage: when-needed
verification: use
centrality: 0.072
depth: 0
origin: [notion]
aliases: ["Plan Mode", "先对答案再执行"]
sources: 1
---

# Plan 模式

> 让 Agent 先列出打算怎么做，方向确认后再执行，像开工前先开会过方案。

**领域** spec-intent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

在动手前先要一份计划。把「方向判断」和「执行判断」拆开——你看不懂代码也能判断「这一步要不要做、那一处理由对不对」。

## 原文 context

> 从那以后，复杂一点的任务我都会先按两次 Shift+Tab 切到 Plan 模式。它会先把打算怎么做列出来，方向对了你再让它执行。其实就跟工作场景一样：你不会直接让小李把功能做掉，先拉个会过下方案，觉得 OK 了再动手。

## 掌握证据（做到这些才算会）

- 能复述复杂任务先出计划再执行的流程
- 能举出一次用 Plan 模式避免返工的经历

## 验收问句

> 什么时候该切到 {{name}}，为什么？

## 懂了它才能懂（解锁 2）

- [[规划模式与边界问题清单]] — 它是 Plan 模式的一种用法：切规划模式后让模型先追问边界问题。
- [[Spec-driven agent workflow]] — 通过先列计划确认方向，是规格驱动流程里可用的执行前环节。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Plan-4a0679b108ff8267986d01a2d40cc14a

## 别名

`Plan Mode`、`先对答案再执行`

## 反链

- [[Spec-driven agent workflow]]
- [[规划模式与边界问题清单]]
