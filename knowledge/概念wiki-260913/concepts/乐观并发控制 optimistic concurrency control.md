---
id: cm_b851c4b8
name: 乐观并发控制
nameEn: optimistic concurrency control
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [harness]
aliases: ["optimistic concurrency control"]
sources: 1
---

# 乐观并发控制 · optimistic concurrency control

> 允许自由读状态，但若状态自上次读取后已改变则写入失败，实现更简单稳健。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

不再抢笔，而是先写下来再检查"我看到的版本还是最新的吗"，不是就重来。机制上确实更干净，但它只解决了"谁能写"，没解决"谁该扛难活"。

## 原文 context

第二版机制——agent 可自由读状态，但如果状态自上次读取后发生改变，写入就失败。原文评价是"simpler and more robust"，但"there were still deeper problems"。

## 掌握证据（做到这些才算会）

- 能描述读—校验—写失败的完整流程
- 能指出它比加锁方案更简单在哪

## 验收问句

> {{name}} 在什么情况下写入失败，为什么仍更稳健？

## 相关

- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents

## 别名

`optimistic concurrency control`

## 反链

- [[动态协调 dynamic coordination]]
- [[单 agent 的速度天花板]]
- [[长时程自治编码 long-running autonomous coding]]
