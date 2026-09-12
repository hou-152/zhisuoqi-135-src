---
id: cm_4eda0819
name: AWS VPC
type: REPRESENTATIONAL
subject: AI 概念库
domain: safety-governance
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["Virtual Private Cloud", "AWS 私有网络隔离区"]
sources: 1
---

# AWS VPC

> 数据库认证在 AWS VPC 内完成，数据在 Bedrock 环境内受到保护。

**领域** safety-governance ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 费曼一下

客户在 AWS 上**自己的私有网络隔离区**——20 年前 AWS 就攒下来的安全原语。

## 原文 context

> "the ability to go authenticate to your database all happens inside of your AWS VPC ... data is protected inside of the Bedrock environment."

## 掌握证据（做到这些才算会）

- 能说出认证与数据访问都发生在 VPC 内
- 能指出数据不出 Bedrock 保护环境

## 验收问句

> {{name}} 如何让数据留在受保护的环境里？

## 相关

- [[harness–compute separation]] · rejected（audit） — VPC 是独立的云网络概念，其含义不依赖 harness–compute separation；这里只是「落地环境/例子」，关系反而更接近反向（分离目标才需要 VPC 这类网络层隔离）。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/AWS-VPC-682679b108ff83e49ae4012ba7690f56

## 别名

`Virtual Private Cloud`、`AWS 私有网络隔离区`

## 反链

- [[harness–compute separation]]
