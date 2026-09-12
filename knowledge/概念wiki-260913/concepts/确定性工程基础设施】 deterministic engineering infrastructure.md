---
id: cm_122b687d
name: 确定性工程基础设施】
nameEn: deterministic engineering infrastructure
type: REPRESENTATIONAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.099
depth: 1
origin: [harness]
aliases: ["deterministic engineering infrastructure"]
sources: 1
---

# 确定性工程基础设施】 · deterministic engineering infrastructure

> 支撑 Agent 稳定运行的确定性组件：权限网关、上下文管理、工具路由、错误恢复。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.099

## 费曼一下

那 98.4% 的具体构成。"确定性"是核心修饰词——这些代码不依赖 AI 推理，给定输入永远给出相同输出，因此能用来约束、兜底那个不确定的模型。四大件：权限网关、上下文管理、工具路由、错误恢复。

## 原文 context

\-

"具体说就是权限网关、上下文管理、工具路由、错误恢复这四类。"

## 掌握证据（做到这些才算会）

- 能列出四类组件并各举一个具体实现
- 能指出自己系统里最缺哪一类并说明后果

## 验收问句

> {{name}} 的四类组件分别解决什么问题？

## 先懂这些（前置 1）

- [[agent 与 harness 的分工]] · **soft** — 先分清 agent 与 harness，才知道权限、恢复等确定性组件装在哪侧。

## 懂了它才能懂（解锁 2）

- [[长周期任务的基础设施压力]] — 时域一长，压力全落在权限网关、错误恢复等确定性组件上。
- [[事件驱动编排与执行解耦]] — 持久重试、审计与可观测来自确定性基础设施提供的机制。

## 相关

- [[docsdecisions]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[AI 公司岗位编制】]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[层级架构强约束 + 给 Agent 读的 lint 错误]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[0 人工代码、0 人工 review 极限形态]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[为 AI 设计工作环境]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[CLAUDE.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[hooks .claudehooks]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[AI 工程基础设施】 AI engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[1.6% vs 98.4%]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[程序记忆（Procedural Memory Skills） progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-20

## 出场

- Harness Engineering ｜ 《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349

## 别名

`deterministic engineering infrastructure`

## 反链

- [[agent 与 harness 的分工]]
- [[Agent = Model + Harness]]
- [[程序记忆（Procedural Memory Skills） progressive disclosure]]
- [[事件驱动编排与执行解耦]]
- [[AI 工程基础设施】 AI engineering infrastructure]]
- [[CLAUDE.md]]
- [[0 人工代码、0 人工 review 极限形态]]
- [[1.6% vs 98.4%]]
- [[层级架构强约束 + 给 Agent 读的 lint 错误]]
- [[为 AI 设计工作环境]]
- [[长周期任务的基础设施压力]]
- [[docsdecisions]]
- [[hooks .claudehooks]]
- [[AI 公司岗位编制】]]
