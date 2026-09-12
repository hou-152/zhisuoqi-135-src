---
id: cm_5676c394
name: Rockset 离线二级视图
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: state-persistence
learningStage: when-needed
verification: accept
centrality: 0.198
depth: 2
origin: [neican]
aliases: ["CDC 逃生舱"]
sources: 1
---

# Rockset 离线二级视图

> 用变更数据捕获把在线存储变化近实时同步到隔离的 Rockset 实例，作为复杂查询的逃生舱。

**领域** state-persistence ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.198

## 费曼一下

Habitat 把简单查询作为默认路径，复杂查询通过变更数据捕获同步到隔离 Rockset 实例，由客户团队自行扩展。这样在线存储与读很重的分析、搜索负载隔离开来。它是约束型 API 的配套逃生舱，防止复杂查询破坏在线存储的可预测性。

## 原文 context

For clients with more complex querying needs, we do provide an offline secondary view of Habitat exposed via Rockset. We use change data capture (CDC) to stream changes from the online storage out to isolated Rockset instances in near-real-time.

> making simple queries the default while providing an escape hatch for those who need complex queries.

## 掌握证据（做到这些才算会）

- 能说明在线存储与读很重的分析、搜索负载如何被隔离
- 能说出复杂查询由客户团队自行在其 Rockset 实例上扩展

## 验收问句

> 什么情况下才应该动用 {{name}}？

## 先懂这些（前置 3）

- [[对象-边模型与分区]] · **hard** — 不懂在线存储是只查直接边、不支持图遍历的对象-边模型，就做不了「为什么必须专设一个 Rockset 复杂查询逃生舱」的判断
- [[从客户端库到独立服务]] · **soft** — 不懂存储已解耦为独立服务、有了部署与平台增强的统一控制点，就做不了用变更数据捕获把在线存储变化近实时同步到隔离实例这件事
- [[Habitat]] · **soft** — 不懂 Habitat 在线侧的规模（每秒超 7000 万请求、超 500PB），就做不了「复杂查询为何不能压在主库、须甩到隔离实例」的取舍

## 出场

- AI 内参 260912 ｜ 《Rapidly scaling online storage to serve over 1 billion ChatGPT users（存储平台 Habitat 的扩容复盘）》 ｜ https://openai.com/index/scaling-storage-one-billion-users-part-one/

## 别名

`CDC 逃生舱`

## 反链

- [[从客户端库到独立服务]]
- [[Habitat]]
- [[对象-边模型与分区]]
