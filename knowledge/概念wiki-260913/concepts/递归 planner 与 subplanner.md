---
id: cm_1031d6f6
name: 递归 planner 与 subplanner
type: REPRESENTATIONAL
subject: Harness Engineering
domain: multi-agent
learningStage: now
verification: use
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# 递归 planner 与 subplanner

> 根 planner 拥有全部指令范围但不写代码，按需 spawn 完全拥有窄范围的 subplanner。

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

不是把一个大老板换成一群小兵，而是让"负责"这件事本身可以分形地复制下去——每一片工作，总有且仅有一个 agent 对它整体负责。

## 原文 context

最终设计的核心结构。root planner 拥有用户指令的全部范围、不写代码、不知道任务被谁接走；当它觉得范围可以细分时，spawn 出完全拥有那一窄片的 subplanner，"This is recursive."。subplanner 既提升扇出速度，又保证"the whole system remains fully owned and responsible by an agent"，并避免单一 planner 陷入隧道视野。

## 掌握证据（做到这些才算会）

- 能说明 subplanner 与 root planner 的职责边界
- 能解释该结构为何既提速扇出又避免隧道视野

## 验收问句

> {{name}} 里谁对一段窄范围负完全责任？

## 先懂这些（前置 1）

- [[Planner–Worker 角色分离]] · **hard** — 根 planner 不写代码、subplanner 接管窄范围，仍是规划/执行分离

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
