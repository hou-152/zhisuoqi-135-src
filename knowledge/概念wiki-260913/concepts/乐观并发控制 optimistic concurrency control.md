---
id: cm_b851c4b8
name: 乐观并发控制
nameEn: optimistic concurrency control
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.117
depth: 5
origin: [harness]
aliases: ["optimistic concurrency control"]
sources: 1
---

# 乐观并发控制 · optimistic concurrency control

> agent 可自由读状态，但状态自上次读取后被改动则写入失败，比加锁更简单稳健。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.117

## 费曼一下

不再抢笔，而是先写下来再检查"我看到的版本还是最新的吗"，不是就重来。机制上确实更干净，但它只解决了"谁能写"，没解决"谁该扛难活"。

## 原文 context

第二版机制——agent 可自由读状态，但如果状态自上次读取后发生改变，写入就失败。原文评价是"simpler and more robust"，但"there were still deeper problems"。

## 掌握证据（做到这些才算会）

- 能说明读后状态变更导致写入失败的条件
- 能说出它相比悲观加锁为何更简单

## 验收问句

> {{name}}在什么条件下写入失败，代价是什么？

## 先懂这些（前置 4）

- [[统一执行状态与业务状态]] · **hard** — 判断状态自读取后是否被改动，前提是状态可统一版本化。
- [[本地状态层]] · **soft** — 需要本地存储层承载可比较、可回读的状态版本。
- [[Git-backed state]] · **soft** — git 的快照与比较机制正是乐观并发控制的现成基础。
- [[Cross-session Work]] · **soft** — 只有存在多 session 并发写入，写冲突检测才有实际必要。

## 相关

- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents

## 别名

`optimistic concurrency control`

## 反链

- [[Cross-session Work]]
- [[本地状态层]]
- [[Git-backed state]]
- [[动态协调 dynamic coordination]]
- [[统一执行状态与业务状态]]
- [[单 agent 的速度天花板]]
- [[长时程自治编码 long-running autonomous coding]]
