---
id: cm_e4f63171
name: 最慢 worker 瓶颈与刚性
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# 最慢 worker 瓶颈与刚性

> 角色分工版的性能天花板：系统被最慢 worker 卡住且过于刚性，规划全部前置也难动态重调，走偏的 agent 要等下一轮循环才自纠。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

把所有规划前置，等于把地图画死。路上发现桥塌了，队伍只能站在原地等下一次重新画图。

## 原文 context

角色分工版的天花板——"we found this system to be bottlenecked by the slowest worker. It was too rigid."；且"Doing all planning upfront also made it hard for the system to dynamically readjust"，走偏的 agent 要等到下一轮循环才能自我纠正。

## 掌握证据（做到这些才算会）

- 能指出角色分工方案的两个失效点：最慢 worker 与刚性
- 能对比说明什么编排方式可避免这两个问题

## 验收问句

> 你能用 {{name}} 说明角色分工为何会被卡住吗？

## 先懂这些（前置 1）

- [[Planner–Worker 角色分离]] · **hard** — 它是角色分工版的性能天花板，不懂分工就说不清瓶颈

## 相关

- [[自协调与共享协调文件]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[锁竞争与乐观并发控制]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-06

## 出场

- Harness Engineering ｜ 《Cursor 谈「会自动驾驶的代码库」：多 agent 研究 harness 开放预览》 ｜ https://cursor.com/blog/self-driving-codebases
## 反链

- [[Planner–Worker 角色分离]]
- [[自协调与共享协调文件]]
- [[锁竞争与乐观并发控制]]
