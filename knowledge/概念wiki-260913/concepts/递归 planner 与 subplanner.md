---
id: cm_1031d6f6
name: 递归 planner 与 subplanner
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# 递归 planner 与 subplanner

> 根 planner 掌握全部指令范围、不写代码，遇到可细分的窄片就递归 spawn 拥有该片的 subplanner。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

不是把一个大老板换成一群小兵，而是让"负责"这件事本身可以分形地复制下去——每一片工作，总有且仅有一个 agent 对它整体负责。

## 原文 context

最终设计的核心结构。root planner 拥有用户指令的全部范围、不写代码、不知道任务被谁接走；当它觉得范围可以细分时，spawn 出完全拥有那一窄片的 subplanner，"This is recursive."。subplanner 既提升扇出速度，又保证"the whole system remains fully owned and responsible by an agent"，并避免单一 planner 陷入隧道视野。

## 掌握证据（做到这些才算会）

- 能说明 root planner 与 subplanner 的范围归属关系
- 能解释为何递归细分可避免单一 planner 的隧道视野

## 验收问句

> {{name}} 能说明 subplanner 如何避免 planner 的隧道视野吗？

## 先懂这些（前置 1）

- [[子 agent 编排 Fork Teammate Worktree]] · **soft** — 不懂【子 agent 编排】，就做不了【递归 planner 与 subplanner】的 ⟨递归 spawn 持有窄片的 subplanner 并管理其上下文与工作区⟩

## 懂了它才能懂（解锁 1）

- [[递归并行规划 sub-planner]] — 不懂【递归 planner 与 subplanner】，就做不了【递归并行规划】的 ⟨把规划本身拆成可递归展开的子规划层⟩

## 相关

- [[Planner–Worker 角色分离]] · related-to（audit） — 递归 planner 只是「规划不写码/worker 执行」这一分离的一个实例，不懂前置也能直接从 subplanner 的 spawn 机制理解，属例化而非依赖，应降 soft。
- [[自协调与共享协调文件]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[锁竞争与乐观并发控制]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-06

## 出场

- Harness Engineering ｜ 《Cursor 谈「会自动驾驶的代码库」：多 agent 研究 harness 开放预览》 ｜ https://cursor.com/blog/self-driving-codebases
## 反链

- [[Planner–Worker 角色分离]]
- [[子 agent 编排 Fork Teammate Worktree]]
- [[递归并行规划 sub-planner]]
- [[自协调与共享协调文件]]
- [[锁竞争与乐观并发控制]]
