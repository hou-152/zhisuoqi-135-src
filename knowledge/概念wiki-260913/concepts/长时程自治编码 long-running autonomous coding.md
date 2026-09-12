---
id: cm_b2154cb8
name: 长时程自治编码
nameEn: long-running autonomous coding
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.072
depth: 1
origin: [harness]
aliases: ["long-running autonomous coding"]
sources: 1
---

# 长时程自治编码 · long-running autonomous coding

> 把 coding agent 的使用场景推到以周为单位的连续自治运行，目标是自主跑数周、完成人类团队通常要数月完成的项目。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

不是"你问一句它改一段代码"，而是把一个大工程交出去，让 agent 自己连轴转几周，期间没人盯着。时间尺度一变，原本不重要的问题（协调、漂移、责任归属）全都变成主要矛盾。

## 原文 context

全文的目标设定——"running coding agents autonomously for weeks"，要处理的是"人类团队通常需要数月完成"的项目。它把 agent 的使用场景从单次会话内的聚焦任务，推到以周为单位的连续自治运行。

## 掌握证据（做到这些才算会）

- 能说出目标时长是「自主运行数周」
- 能区分单次会话内聚焦任务与长时程自治编码

## 验收问句

> {{name}}把 agent 的任务时长从单次会话推到了什么量级？

## 先懂这些（前置 2）

- [[任务时域 task horizon]] · **hard** — 长时程自治编码就是把任务时域推到以周为单位。
- [[漂移与隧道视野 drift & tunnel vision]] · **hard** — 长时程运行必然面对漂移与隧道视野两种退化。

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
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents

## 别名

`long-running autonomous coding`

## 反链

- [[Planner–Worker 角色分离]]
- [[漂移与隧道视野 drift & tunnel vision]]
- [[动态协调 dynamic coordination]]
- [[共享文件加锁的协调机制]]
- [[单 agent 的速度天花板]]
- [[模型—角色适配]]
- [[锁竞争瓶颈 lock contention]]
- [[结构适量原则]]
- [[任务时域 task horizon]]
- [[无层级导致的风险规避 risk-averse agents]]
- [[judge agent 与周期性 fresh start]]
- [[prompt 主导论]]
- [[递归并行规划 sub-planner]]
- [[减法式改进 removing complexity]]
- [[乐观并发控制 optimistic concurrency control]]
