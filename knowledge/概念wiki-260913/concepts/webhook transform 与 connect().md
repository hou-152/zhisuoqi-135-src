---
id: cm_1d3875f8
name: webhook transform 与 connect()
type: REPRESENTATIONAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.042
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# webhook transform 与 connect()

> transform 在云端把原始 http payload 转成带类型的 event；connect() 从本地建持久 WebSocket，无需公网 endpoint。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

前者是海关，把外面五花八门的包裹拆开、贴上统一标签；后者是一条你主动拨出去的专线，这样别人不用知道你家地址也能把包裹送到。

## 原文 context

打通「公网 webhook」与「本地 worker」的两个具体机件。webhook transform 在 Inngest Cloud 把原始 http payload 转成带类型的 Inngest event；connect() API 则从你的本机、mac mini 或远程服务器建立一条到 Inngest Cloud 的持久 WebSocket 连接，**不需要公网 endpoint**。

## 掌握证据（做到这些才算会）

- 能说明 transform 与 connect() 各自解决哪一段
- 能描述本地 worker 接入云端的连接形态

## 验收问句

> {{name}} 如何让本地 worker 收到公网事件？

## 先懂这些（前置 1）

- [[higher-level runtime]] · **soft** — 事件接入是运行时接管工具执行与路由的一部分。

## 相关

- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[Harness]]
- [[higher-level runtime]]
- [[持久化执行 durable execution]]
- [[harness 与 framework 的分野]]
