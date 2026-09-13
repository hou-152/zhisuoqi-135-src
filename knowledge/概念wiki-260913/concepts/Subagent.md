---
id: cm_4a78d263
name: Subagent
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.253
depth: 1
origin: [context, harness]
aliases: []
sources: 2
---

# Subagent

> 把一整个 session 工作封装、只回流浓缩结果的子代理，拥有全新而小的上下文窗口与指令预算。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.253

## 费曼一下

主 agent 生成的子任务执行者。就像一个项目经理把工作分派给团队成员——每个 subagent 独立工作，但需要共享状态和协调进度。Task Tool 就是为解决 subagent 间协作而设计的。

## 原文 context

We also saw Opus 4.5 also get much better at using subagents, but how could subagents coordinate on a shared Todo List?

## 掌握证据（做到这些才算会）

- 能解释子代理如何靠多个上下文窗口拼出一个问题的解
- 能指出派发方只看提示与最终结果这一边界

## 验收问句

> 你能否用 {{name}} 并行解一个超长任务并只回收结论？

## 先懂这些（前置 1）

- [[context firewall]] · **hard** — 不懂 context firewall，就做不了 Subagent『独立小上下文、只回流浓缩结果、不污染父线程』的隔离设计

## 懂了它才能懂（解锁 3）

- [[子 agent 与 step.invoke()]] — step.invoke() 启动的正是带独立 session key 的子代理会话
- [[sub-agent 架构与关注点分离]] — 不懂 Subagent，就做不了『专门化子 agent 用干净窗口做聚焦任务、主 agent 收摘要』这件事
- [[显式且可检查的并行]] — 不懂 Subagent，就做不了 harness 派生多个可监控后台子作业并合并结果

## 相关

- [[Action Space]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Elicitation]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
## 反链

- [[子 agent 与 step.invoke()]]
- [[显式且可检查的并行]]
- [[Action Space]]
- [[context firewall]]
- [[Elicitation]]
- [[sub-agent 架构与关注点分离]]
- [[configuration problem]]
- [[See Like an Agent]]
