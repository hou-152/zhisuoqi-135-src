---
id: cm_4ecbd69b
name: 动态协调
nameEn: dynamic coordination
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: ["dynamic coordination"]
sources: 1
---

# 动态协调 · dynamic coordination

> 让 agent 依据其他 agent 当下的动作决定自己做什么，而非开工前排定固定分工。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

不预先排班，大家到现场看着办。听上去灵活，实际是把调度成本平摊给每一个执行者，每个人都得先花时间搞清楚别人在干嘛。

## 原文 context

Cursor 的第一直觉是"planning ahead would be too rigid"，因为大项目的路径模糊、分工在一开始不明显；于是让 agent 根据其他 agent 当下在做什么来决定自己做什么。

## 掌握证据（做到这些才算会）

- 能解释大项目路径模糊、分工初期不明显为何使预先规划过僵
- 能设计按同伴实时状态分派的协作方式

## 验收问句

> {{name}} 中，你的 agent 下一步由什么决定？

## 先懂这些（前置 1）

- [[多智能体架构]] · **hard** — 动态协调是多个 Agent 互相观察行为并决策，前提是多 Agent

## 懂了它才能懂（解锁 1）

- [[自协调与共享协调文件]] — 不懂动态协调，就做不了『看别人当下在做什么再决定自己做什么』的共享文件协议

## 相关

- [[共享文件加锁的协调机制]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[乐观并发控制 optimistic concurrency control]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[递归并行规划 sub-planner]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[judge agent 与周期性 fresh start]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[锁竞争瓶颈 lock contention]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[无层级导致的风险规避 risk-averse agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[结构适量原则]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[prompt 主导论]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[漂移与隧道视野 drift & tunnel vision]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[模型—角色适配]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[Planner–Worker 角色分离]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents

## 别名

`dynamic coordination`

## 反链

- [[Planner–Worker 角色分离]]
- [[多智能体架构]]
- [[长时程自治编码 long-running autonomous coding]]
- [[共享文件加锁的协调机制]]
- [[漂移与隧道视野 drift & tunnel vision]]
- [[自协调与共享协调文件]]
- [[递归并行规划 sub-planner]]
- [[模型—角色适配]]
- [[锁竞争瓶颈 lock contention]]
- [[无层级导致的风险规避 risk-averse agents]]
- [[judge agent 与周期性 fresh start]]
- [[prompt 主导论]]
- [[单 agent 的速度天花板]]
- [[结构适量原则]]
- [[乐观并发控制 optimistic concurrency control]]
