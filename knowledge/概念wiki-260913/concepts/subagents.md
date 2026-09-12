---
id: cm_b2c9fd9e
name: subagents
type: REPRESENTATIONAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.099
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# subagents

> 把子 agent 路由到隔离环境执行，用来扩展 agent 的能力与并行度

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.099

## 费曼一下

主 agent 把子任务外包给子 agent。每个 subagent 跨着自己的 context 和 sandbox 干活，互不干扰。类比：项目经理分派任务给专家小组。

## 原文 context

route subagents to isolated environments… We’re also working to bring additional agent capabilities, including code mode and subagents…

## 掌握证据（做到这些才算会）

- 能说明子 agent 为什么要隔离环境
- 能举出适合交给子 agent 的任务类型

## 验收问句

> 什么任务适合交给 {{name}} 去做？

## 先懂这些（前置 1）

- [[工作树隔离]] · **soft** — 子 agent 要路由到隔离环境执行，隔离是并行的前提

## 懂了它才能懂（解锁 2）

- [[显式且可检查的并行]] — 它派生的就是多个 subagent，不懂 subagent 无从调度
- [[开箱即用的编排与子 agent]] — 编排器调度的对象就是探查与通用子 agent

## 相关

- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[开箱即用的编排与子 agent]]
- [[工作树隔离]]
- [[显式且可检查的并行]]
- [[Agents SDK]]
- [[model-native harness]]
