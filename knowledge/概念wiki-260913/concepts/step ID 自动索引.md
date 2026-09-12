---
id: cm_2c7c13db
name: step ID 自动索引
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# step ID 自动索引

> SDK 自动为循环里的每次 step 调用生成唯一 ID，无需手工管理

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

你每次都喊同一个名字点名，系统自动在后面加编号区分是第几次，你不用费心给每一次都起个新名字。

## 原文 context

一个容易被忽略但很关键的工程细节。step.run("think") 在循环里被调用十次时，Inngest 内部把它们记作 think:0、think:1 等等——「你不需要自己管理唯一的 step ID，SDK 会处理」。这让「在循环里用持久化 step」这件事从繁琐变成自然。

## 掌握证据（做到这些才算会）

- 能说出循环里重复调用 step.run 时 ID 的编号方式
- 能在持久化循环中不手写唯一 ID

## 验收问句

> 循环里重复调用 step.run，{{name}} 如何保证 ID 唯一？

## 先懂这些（前置 1）

- [[step]] · **hard** — 自动索引是给循环里的 step 生成唯一 ID，不懂 step 就没有索引对象。

## 相关

- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[Harness]]
- [[持久化执行 durable execution]]
- [[harness 与 framework 的分野]]
- [[step]]
