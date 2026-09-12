---
id: cm_4a78d263
name: Subagent】
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.089
depth: 0
origin: [context, harness]
aliases: []
sources: 2
---

# Subagent】

> 把一整个 session 的工作封装后派发：子代理拿全新小上下文与指令预算，只有浓缩结果回流父 agent。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.089

## 费曼一下

主 agent 生成的子任务执行者。就像一个项目经理把工作分派给团队成员——每个 subagent 独立工作，但需要共享状态和协调进度。Task Tool 就是为解决 subagent 间协作而设计的。

## 原文 context

We also saw Opus 4.5 also get much better at using subagents, but how could subagents coordinate on a shared Todo List?

## 掌握证据（做到这些才算会）

- 能说明子代理上下文隔离与结果回流的关系
- 能指出作者否定了按前端/后端角色分子代理的用法

## 验收问句

> 什么任务适合拆成 {{name}} 而不是按角色分工？

## 懂了它才能懂（解锁 2）

- [[子 agent 与 step.invoke()]] — step.invoke() 启动的正是带独立 session key 的子代理会话
- [[Symphony]] — 守护进程把工作派发给子代理执行，需先懂子代理封装与回流。

## 相关

- [[Action Space】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Elicitation】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
## 反链

- [[Action Space】]]
- [[Symphony]]
- [[Elicitation】]]
- [[子 agent 与 step.invoke()]]
- [[configuration problem]]
- [[See Like an Agent】]]
