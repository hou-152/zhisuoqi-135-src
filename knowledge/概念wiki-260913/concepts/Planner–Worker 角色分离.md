---
id: cm_511bf6de
name: Planner–Worker 角色分离
type: REPRESENTATIONAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.236
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Planner–Worker 角色分离

> planner 持续探索代码库并拆任务，worker 领任务后埋头做完，不互相协调、不管大局。

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.236

## 费曼一下

把"想做什么"和"把它做完"拆成两种岗位。执行者不再需要环顾四周，专注度和吞吐同时上来；协调成本被集中到少数规划者身上，而不是每个人身上摊一份。

## 原文 context

解法性架构——planner 持续探索代码库并创建任务，worker 领任务后"grind on their assigned task until it's done"，不与其他 worker 协调、不操心大局。原文说它"solved most of our coordination problems"。

## 掌握证据（做到这些才算会）

- 能解释该分工为什么解决了大部分协调问题
- 能说出 worker 被要求不做哪些事

## 验收问句

> {{name}} 为什么能减少多 Agent 之间的互相踩踏？

## 懂了它才能懂（解锁 4）

- [[递归 Planner-Worker 架构]] — 该架构就是 planner/worker 分离的递归扩展，不懂角色分离就没有原型
- [[最慢 worker 瓶颈与刚性]] — 它是角色分工版的性能天花板，不懂分工就说不清瓶颈
- [[handoff 交接]] — 交接存在的前提是有人只管规划、有人只管执行
- [[Planner-Generator-Evaluator 三 Agent 架构]] — 不懂 Planner-Worker 分离，就搭不出三 Agent 架构中规划与执行的分工

## 相关

- [[planner–executor–judge 角色分工]] · related-to（audit） — planner–executor–judge 是对 planner/worker 的平行演化加一个 judge，可独立理解，非派生性的理解前提，降 soft
- [[递归 planner 与 subplanner]] · related-to（audit） — 递归 planner 只是「规划不写码/worker 执行」这一分离的一个实例，不懂前置也能直接从 subplanner 的 spawn 机制理解，属例化而非依赖，应降 soft。
- [[连续执行器]] · related-to（audit） — 连续执行器自身定义已完整（唯一 executor 兼规划与派发），懂 Planner–Worker 只是有助于理解其相对什么演进
- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents
## 反链

- [[长时程自治编码 long-running autonomous coding]]
- [[handoff 交接]]
- [[递归 planner 与 subplanner]]
- [[递归 Planner-Worker 架构]]
- [[动态协调 dynamic coordination]]
- [[Planner-Generator-Evaluator 三 Agent 架构]]
- [[planner–executor–judge 角色分工]]
- [[连续执行器]]
- [[最慢 worker 瓶颈与刚性]]
- [[单 agent 的速度天花板]]
