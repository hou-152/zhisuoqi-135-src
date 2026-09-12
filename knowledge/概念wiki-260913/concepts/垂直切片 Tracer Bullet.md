---
id: cm_97a6fc8a
name: 垂直切片 / Tracer Bullet
type: PROCEDURAL
subject: Harness Engineering
domain: code-engineering
learningStage: now
verification: use
centrality: 0.042
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# 垂直切片 / Tracer Bullet

> 不按技术分层横向推进，而从中间打通一条端到端可运行可测的通路，每步都能摸到并随时评审。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

横向计划像先把整栋楼所有楼层的地基、所有楼层的墙、所有楼层的水电都分别一次性做完，直到全部完工才第一次尝试开灯；垂直切片则是先盖出一间能住人、能开灯、能用水的样板间，验证整个链路走得通，再复制去盖下一间。

## 原文 context

第四阶段，针对模型偏爱的"横向计划"（按数据库迁移→服务层→API→前端的技术分层顺序）提出的替代方案——从中间向外打通一条完整可测试的通路（API 契约配 mock 数据加 curl 测试 → 前端接 mock 数据 → 服务层 → 数据库迁移 → 业务逻辑 → 错误处理），每一步都能实际"摸到"、随时评审 100-200 行并重新引导。

## 掌握证据（做到这些才算会）

- 能列出 API 契约配 mock 加 curl 测试 → 前端 → 服务层 → 迁移 的切片顺序
- 能把单次改动控制在 100-200 行并给出可运行的验证点

## 验收问句

> 用{{name}}推进时，你会先写哪一段、怎么证明它跑通了？

## 先懂这些（前置 1）

- [[宏动作]] · **soft** — 垂直切片每步就是委派整块可测通路，先懂宏动作才懂其粒度。

## 相关

- [[Lights-off 软件工厂]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[软件工厂 Software Factory]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-23

## 出场

- Harness Engineering ｜ 《为什么「软件工厂」会失败：光有 harness 工程还不够》 ｜ https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md
## 反链

- [[宏动作]]
- [[软件工厂 Software Factory]]
- [[Lights-off 软件工厂]]
