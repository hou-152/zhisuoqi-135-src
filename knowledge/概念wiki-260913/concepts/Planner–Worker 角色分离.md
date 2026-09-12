---
id: cm_511bf6de
name: Planner–Worker 角色分离
type: REPRESENTATIONAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.181
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Planner–Worker 角色分离

> planner 持续探索代码库并拆任务，worker 领任务后埋头做完，不互相协调、不管大局。

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

把"想做什么"和"把它做完"拆成两种岗位。执行者不再需要环顾四周，专注度和吞吐同时上来；协调成本被集中到少数规划者身上，而不是每个人身上摊一份。

## 原文 context

解法性架构——planner 持续探索代码库并创建任务，worker 领任务后"grind on their assigned task until it's done"，不与其他 worker 协调、不操心大局。原文说它"solved most of our coordination problems"。

## 掌握证据（做到这些才算会）

- 能解释该分工为什么解决了大部分协调问题
- 能说出 worker 被要求不做哪些事

## 验收问句

> {{name}} 为什么能减少多 Agent 之间的互相踩踏？

## 懂了它才能懂（解锁 6）

- [[递归 Planner-Worker 架构]] — 该架构就是 planner/worker 分离的递归扩展，不懂角色分离就没有原型
- [[handoff 交接]] — 交接存在的前提是有人只管规划、有人只管执行
- [[planner–executor–judge 角色分工]] — executor 兼 lead 与 worker 的角色划分源自 planner/worker 分离
- [[最慢 worker 瓶颈与刚性]] — 它是角色分工版的性能天花板，不懂分工就说不清瓶颈
- [[递归 planner 与 subplanner]] — 根 planner 不写代码、subplanner 接管窄范围，仍是规划/执行分离
- [[连续执行器]] — 它取消了独立 planner，需先知道原本是谁在规划

## 相关

- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents
## 反链

- [[动态协调 dynamic coordination]]
- [[handoff 交接]]
- [[单 agent 的速度天花板]]
- [[递归 Planner-Worker 架构]]
- [[连续执行器]]
- [[长时程自治编码 long-running autonomous coding]]
- [[递归 planner 与 subplanner]]
- [[最慢 worker 瓶颈与刚性]]
- [[planner–executor–judge 角色分工]]
