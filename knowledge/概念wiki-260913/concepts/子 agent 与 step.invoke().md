---
id: cm_d9636b24
name: 子 agent 与 step.invoke()
type: PROCEDURAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# 子 agent 与 step.invoke()

> 用 step.invoke() 启动独立 agent run 并 fork 带自己 session key 的子会话，工具集去掉 delegate_task 禁止递归，最后向父级回摘要。

**领域** multi-agent ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

活太大自己干会脑子塞满，就交给一个助理，给他一个清晰的任务，他单独去做完，只把结论交回来。而且规定助理不能再找助理。

## 原文 context

应对 context window 撑爆的手段。delegate_task 工具被调用时，用 step.invoke() 启动一次完全独立的 agent function run，fork 出带自己 session key 的子会话，**工具集里去掉 \`delegate_task\` 以禁止递归派生**，最后向父级返回摘要。作者的结论是「编排已经解决了，不需要 agent-to-agent 协议，只是函数在调用函数」。

## 掌握证据（做到这些才算会）

- 能写出禁止递归派生的实现要点：工具集里移除 delegate_task
- 能说明子会话如何只把摘要返回父级

## 验收问句

> 你如何用 {{name}} 防止子会话无限制递归派生？

## 先懂这些（前置 1）

- [[Subagent】]] · **hard** — step.invoke() 启动的正是带独立 session key 的子代理会话

## 相关

- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[Harness]]
- [[持久化执行 durable execution]]
- [[Subagent】]]
- [[harness 与 framework 的分野]]
