---
id: cm_74099998
name: 迁移到 Rust
nameEn: Python→Rust
type: CONCEPTUAL
subject: AI 内参 260912
domain: code-engineering
learningStage: when-needed
verification: accept
centrality: 0.072
depth: 1
origin: [neican]
aliases: ["Python→Rust"]
sources: 1
---

# 迁移到 Rust · Python→Rust

> 平台成熟后，两名工程师用 Codex 与 GPT-5.5 把整个 Python 服务重写为 Rust，承接 95% 生产请求。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.072

## 费曼一下

这是战略性技术债务的收束。平台成熟、增长继续加速，团队终于把 Python 服务重写为 Rust。两名工程师借助 Codex 和 GPT-5.5 完成整个服务重写，Rust 服务处理 95% 生产请求，并且 CPU 效率、内存效率和延迟都显著优于 Python。它验证了先前“未来编码模型会让迁移成为可能”的赌注。

## 二、概念架构图

```mermaid
flowchart TD
  subgraph P[问题与目标层]
    A["每年超过 10 倍增长"]
    B["尾部延迟"]
    C["集中式数据安全与隐私控制点"]
  end

  subgraph S[架构选择层]
    D["Habitat 在线存储平台"]
    E["从客户端库到独立服务（统一控制点）"]
    F["约束型 API 与成本不平衡"]
    G["战略性技术债务：Python 服务"]
  end

  subgraph M[机制与边界层]
    H["asyncio 调度延迟"]
    I["亚稳态故障与 LIFO/FIFO 连接重用"]
    J["连接扇入（Envoy / 雷霆之群）"]
    K["对象-边模型与分区"]
    L["Rockset 离线二级视图 / CDC"]
  end

  subgraph R[结果层]
    N["迁移到 Rust"]
  end

  A -->|迫使| D
  D -->|需要| E
  E -->|集中执行| C
  D -->|采用| F
  F -->|支撑| G
  G -->|引入| H
  H -->|放大| B
  I -->|恶化| B
  J -->|保护下游，支撑多进程| G
  F -->|定义| K
  F -->|复杂查询出口| L
  L -->|隔离读重负载| D
  E -->|使能重写| N
  N -->|替换| G
```

## 原文 context

In Q2 2026, with just 2 engineers, Codex, and GPT‑5.5, we were able to rewrite the entire service in Rust. This new Rust service is now handling 95% of our production requests; we’ll be deprecating Python entirely in the coming weeks. Our data shows the Rust service is 6x more CPU efficient and 15x more memory efficient than the Python version, with significantly lower average and tail latencies.

## 掌握证据（做到这些才算会）

- 能说出重写由 2 名工程师借助 Codex 与 GPT-5.5 完成，Rust 服务已处理 95% 生产请求
- 能指出 Rust 服务在 CPU 效率、内存效率与延迟上显著优于 Python，且将停用 Python

## 验收问句

> {{name}} 如何兑现了先前承担技术债的赌注？

## 先懂这些（前置 1）

- [[分解为小颗粒度工作]] · **soft** — 不懂【分解为小颗粒度工作】，就做不了【迁移到 Rust】的「两名工程师把整个 Python 服务的重写切成小颗粒、逐块建问题、逐块交付与审查」这件事——整块重写既无法审查，也拿不到逐块完成的推进反馈。

## 出场

- AI 内参 260912 ｜ 《Rapidly scaling online storage to serve over 1 billion ChatGPT users（存储平台 Habitat 的扩容复盘）》 ｜ https://openai.com/index/scaling-storage-one-billion-users-part-one/

## 别名

`Python→Rust`

## 反链

- [[分解为小颗粒度工作]]
