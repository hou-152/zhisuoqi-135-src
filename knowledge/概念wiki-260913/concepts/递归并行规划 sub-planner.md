---
id: cm_b8ef30e6
name: 递归并行规划
nameEn: sub-planner
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: now
verification: judge
centrality: 0.072
depth: 2
origin: [harness]
aliases: ["sub-planner"]
sources: 1
---

# 递归并行规划 · sub-planner

> planner 可为特定区域生成子 planner，使规划本身变得并行且递归。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

规划本身也会堵。所以让规划者按领域再派规划者，规划这件事也并行起来——否则执行端扩容再多，也会被上游那一个大脑限速。

## 原文 context

planner "can spawn sub-planners for specific areas, making planning itself parallel and recursive"。

## 掌握证据（做到这些才算会）

- 能复述「planning itself parallel and recursive」这一机制
- 能说出它与单层规划在扇出上的差别

## 验收问句

> {{name}} 能解释规划为何可以并行且递归吗？

## 先懂这些（前置 1）

- [[递归 planner 与 subplanner]] · **hard** — 不懂【递归 planner 与 subplanner】，就做不了【递归并行规划】的 ⟨把规划本身拆成可递归展开的子规划层⟩

## 相关

- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents

## 别名

`sub-planner`

## 反链

- [[长时程自治编码 long-running autonomous coding]]
- [[递归 planner 与 subplanner]]
- [[动态协调 dynamic coordination]]
- [[单 agent 的速度天花板]]
