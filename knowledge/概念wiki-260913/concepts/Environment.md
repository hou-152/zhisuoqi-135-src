---
id: cm_c6e454d9
name: Environment
type: REPRESENTATIONAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Environment

> 描述如何 provision agent 工具所运行沙箱的模板：runtime 类型、网络策略、包配置。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

它是「工位标准」：装什么软件、能不能上网、放在哪个房间。每次开工都按这张标准现搭一个新工位。

## 原文 context

三个中心概念之一——一份模板，描述如何 provision agent 工具所运行的沙箱：runtime 类型、网络策略、包配置。

## 掌握证据（做到这些才算会）

- 能写出含 runtime、网络、依赖三部分的模板
- 能按模板复现出一个 agent 可用的沙箱环境

## 验收问句

> 一份 {{name}} 至少要写清哪三项配置？

## 先懂这些（前置 1）

- [[Sandbox]] · **hard** — Environment 是配置沙箱如何被 provision 的模板，不懂沙箱就不知这些字段在定义什么。

## 懂了它才能懂（解锁 1）

- [[Sandbox agents]] — 不懂【Environment】就做不了【Sandbox agents】的工作区 runtime 与依赖配置

## 相关

- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[Sandbox]]
- [[Claude Managed Agents]]
- [[Sandbox agents]]
- [[messages API 作为直连网关]]
