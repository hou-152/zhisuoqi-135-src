---
id: cm_1da0e9a6
name: Habitat
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: state-persistence
learningStage: when-needed
verification: accept
centrality: 0.144
depth: 0
origin: [neican]
aliases: ["在线存储平台"]
sources: 1
---

# Habitat

> OpenAI 的在线存储平台，每秒超 7000 万请求、超 500PB 数据，源自一个 Python 客户端库。

**领域** state-persistence ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.144

## 费曼一下

Habitat 是 OpenAI 产品与底层存储之间的平台。产品工程师不必关心数据库管理、路由、授权、加密、序列化、请求整形和连接池等问题。全文讨论的扩容、服务化、Python 性能、API 约束、Rust 重写，都是围绕 Habitat 如何从一个 Python 库长成大规模在线存储平台展开的。

## 原文 context

Habitat 是我们构建的在线存储平台，旨在让 OpenAI 产品能够快速可靠地访问所需信息。Habitat 目前每秒处理超过 7000 万个请求，为每周超过 10 亿用户使用的产品提供支持，覆盖近 40 个地理区域。

> Habitat 最初于 2023 年的 DevDay 大会上发布，旨在支持 GPT 模型，最初只是一个简单的 Python 客户端库，连接到单个数据库。如今，它已发展成为一个复杂的分布式系统，能够处理超过 500 PB 的数据。

## 掌握证据（做到这些才算会）

- 能说出 Habitat 替产品工程师屏蔽了哪些存储与路由细节
- 能说出它从连接单个数据库的客户端库长成分布式系统的过程

## 验收问句

> {{name}} 替产品工程师屏蔽掉了哪些底层工作？

## 懂了它才能懂（解锁 2）

- [[从客户端库到独立服务]] — 不懂 Habitat 是从一个 Python 客户端库长出来的在线存储平台，就做不了「把存储逻辑从客户端库解耦为独立服务」这条演化路径的判断
- [[Rockset 离线二级视图]] — 不懂 Habitat 在线侧的规模（每秒超 7000 万请求、超 500PB），就做不了「复杂查询为何不能压在主库、须甩到隔离实例」的取舍

## 出场

- AI 内参 260912 ｜ 《Rapidly scaling online storage to serve over 1 billion ChatGPT users（存储平台 Habitat 的扩容复盘）》 ｜ https://openai.com/index/scaling-storage-one-billion-users-part-one/

## 别名

`在线存储平台`

## 反链

- [[Rockset 离线二级视图]]
- [[从客户端库到独立服务]]
