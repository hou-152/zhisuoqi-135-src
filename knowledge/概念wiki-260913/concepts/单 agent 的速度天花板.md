---
id: cm_201c8b41
name: 单 agent 的速度天花板
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 单 agent 的速度天花板

> 现有 agent 对聚焦任务尚可，但复杂项目上很慢，问题不是做不对而是做不快。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

一个很强的工程师也架不住项目有三个月的量。瓶颈不在质量而在串行速度，所以下一步只能是并行——而并行立刻把问题从"能力"换成"协作"。

## 原文 context

"Today's agents work well for focused tasks, but are slow for complex projects." 这是全文的起点问题：不是做不对，是做不快。

## 掌握证据（做到这些才算会）

- 能区分“做不对”与“做不快”两类问题
- 能指出哪些复杂项目受单 agent 速度上限约束

## 验收问句

> {{name}} 描述的问题核心是做不对还是做不快？

## 懂了它才能懂（解锁 2）

- [[多智能体架构]] — 不懂单 agent 慢在哪，就说不清为何要引入多 Agent
- [[为吞吐量设计与可接受错误率]] — 追求100%正确会拖慢本就受速度上限约束的 agent。

## 相关

- [[共享文件加锁的协调机制]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[锁竞争瓶颈 lock contention]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[乐观并发控制 optimistic concurrency control]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[无层级导致的风险规避 risk-averse agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[Planner–Worker 角色分离]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[递归并行规划 sub-planner]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[judge agent 与周期性 fresh start]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[漂移与隧道视野 drift & tunnel vision]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[模型—角色适配]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[减法式改进 removing complexity]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[结构适量原则]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[prompt 主导论]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents
## 反链

- [[多智能体架构]]
- [[Planner–Worker 角色分离]]
- [[漂移与隧道视野 drift & tunnel vision]]
- [[动态协调 dynamic coordination]]
- [[共享文件加锁的协调机制]]
- [[模型—角色适配]]
- [[锁竞争瓶颈 lock contention]]
- [[为吞吐量设计与可接受错误率]]
- [[长时程自治编码 long-running autonomous coding]]
- [[结构适量原则]]
- [[无层级导致的风险规避 risk-averse agents]]
- [[judge agent 与周期性 fresh start]]
- [[prompt 主导论]]
- [[递归并行规划 sub-planner]]
- [[减法式改进 removing complexity]]
- [[乐观并发控制 optimistic concurrency control]]
