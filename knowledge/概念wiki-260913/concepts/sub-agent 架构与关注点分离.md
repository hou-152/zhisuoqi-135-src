---
id: cm_63a18f9e
name: sub-agent 架构与关注点分离
type: CONCEPTUAL
subject: Context Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.042
depth: 0
origin: [context]
aliases: []
sources: 1
---

# sub-agent 架构与关注点分离

> 专门化子 agent 用干净窗口做聚焦任务，主 agent 靠高层计划协调并接收摘要

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

主编不亲自跑现场，而是派几个记者各查一条线，每人回来交一页纸。记者那边翻了多少材料主编不必知道，他要的是那一页纸——这样主编的桌面永远清爽，判断力也就不会被材料淹掉。

## 原文 context

绕开窗口限制的另一条路——专门化子 agent 用干净窗口处理聚焦任务，主 agent 用高层计划协调。关键在回传比：子 agent 可能用掉数万 token 探索，只返回 1000-2000 token 的浓缩摘要。详细搜索 context 隔离在子 agent 内，主 agent 专注综合分析，在复杂研究任务上相对单 agent 有实质提升。

## 掌握证据（做到这些才算会）

- 能说明回传比为什么是关键
- 能描述详细搜索如何被隔离在子 agent 内

## 验收问句

> {{name}} 里主 agent 从子 agent 拿到的是什么？

## 懂了它才能懂（解锁 1）

- [[context firewall]] — 隔离上下文窗口正是为聚焦任务做关注点分离的手段

## 相关

- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
## 反链

- [[上下文工程 context engineering]]
- [[注意力预算 attention budget]]
- [[上下文腐烂 Context Rot]]
- [[context firewall]]
