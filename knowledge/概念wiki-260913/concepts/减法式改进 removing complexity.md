---
id: cm_ba01f641
name: 减法式改进
nameEn: removing complexity
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [harness]
aliases: ["removing complexity"]
sources: 1
---

# 减法式改进 · removing complexity

> 改进常来自删除复杂度而非增加组件，例如删掉制造的瓶颈比解决的问题还多的协调角色。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

发现问题就加一个角色，是系统复杂化最常见的路径。但每个新增的中间人都会变成新的排队点。先问"能不能删掉一层"，常常比"再加一层"更有效。

## 原文 context

"Many of our improvements came from removing complexity rather than adding it." 典型证据是专为质量控制与冲突解决建立的 integrator 角色被删除——它制造的瓶颈比解决的问题更多，worker 本来就能自己处理冲突。

## 掌握证据（做到这些才算会）

- 能指出某个协调角色制造的瓶颈大于它解决的问题
- 能举出删除组件后系统反而更好的具体案例

## 验收问句

> 判断一个中间协调角色是否该删，{{name}} 的依据是什么？

## 相关

- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents

## 别名

`removing complexity`

## 反链

- [[动态协调 dynamic coordination]]
- [[单 agent 的速度天花板]]
- [[长时程自治编码 long-running autonomous coding]]
