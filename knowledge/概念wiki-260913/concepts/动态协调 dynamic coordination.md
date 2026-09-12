---
id: cm_4ecbd69b
name: 动态协调
nameEn: dynamic coordination
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 2
origin: [harness]
aliases: ["dynamic coordination"]
sources: 1
---

# 动态协调 · dynamic coordination

> 不预先分工，让每个 Agent 根据其他 Agent 当下在做什么来决定自己下一步做什么。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

不预先排班，大家到现场看着办。听上去灵活，实际是把调度成本平摊给每一个执行者，每个人都得先花时间搞清楚别人在干嘛。

## 原文 context

Cursor 的第一直觉是"planning ahead would be too rigid"，因为大项目的路径模糊、分工在一开始不明显；于是让 agent 根据其他 agent 当下在做什么来决定自己做什么。

## 掌握证据（做到这些才算会）

- 能解释大项目里预先 planning 为何过于僵化
- 能指出协调信号来自其他 agent 的实时状态

## 验收问句

> {{name}} 中 agent 的下一步由什么决定，为何不预先规划？

## 先懂这些（前置 1）

- [[多智能体架构]] · **hard** — 动态协调是多个 Agent 互相观察行为并决策，前提是多 Agent

## 懂了它才能懂（解锁 3）

- [[Executive LLM]] — 它需按剧本实时调整施压策略，依赖动态协调的判断能力。
- [[Orchestra Interface]] — 指挥式界面要求人按当下态势协调各 Agent，依赖动态协调。
- [[共享 多人 agent 会话]] — 多人进入同一会话后需按彼此当下动作协调，依赖动态协调。

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
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents

## 别名

`dynamic coordination`

## 反链

- [[多智能体架构]]
- [[Planner–Worker 角色分离]]
- [[漂移与隧道视野 drift & tunnel vision]]
- [[共享 多人 agent 会话]]
- [[共享文件加锁的协调机制]]
- [[Orchestra Interface]]
- [[单 agent 的速度天花板]]
- [[模型—角色适配]]
- [[锁竞争瓶颈 lock contention]]
- [[长时程自治编码 long-running autonomous coding]]
- [[Executive LLM]]
- [[结构适量原则]]
- [[无层级导致的风险规避 risk-averse agents]]
- [[judge agent 与周期性 fresh start]]
- [[prompt 主导论]]
- [[递归并行规划 sub-planner]]
- [[减法式改进 removing complexity]]
- [[乐观并发控制 optimistic concurrency control]]
