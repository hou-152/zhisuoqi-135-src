---
id: cm_97a6fc8a
name: 垂直切片 / Tracer Bullet
type: PROCEDURAL
subject: Harness Engineering
domain: code-engineering
learningStage: now
verification: use
centrality: 0.045
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# 垂直切片 / Tracer Bullet

> 从中间向外打通一条完整可测试通路，替代按技术分层的横向计划，每步都能摸到、可随时评审 100-200 行。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

横向计划像先把整栋楼所有楼层的地基、所有楼层的墙、所有楼层的水电都分别一次性做完，直到全部完工才第一次尝试开灯；垂直切片则是先盖出一间能住人、能开灯、能用水的样板间，验证整个链路走得通，再复制去盖下一间。

## 原文 context

第四阶段，针对模型偏爱的"横向计划"（按数据库迁移→服务层→API→前端的技术分层顺序）提出的替代方案——从中间向外打通一条完整可测试的通路（API 契约配 mock 数据加 curl 测试 → 前端接 mock 数据 → 服务层 → 数据库迁移 → 业务逻辑 → 错误处理），每一步都能实际"摸到"、随时评审 100-200 行并重新引导。

## 掌握证据（做到这些才算会）

- 能列出切片顺序：契约＋mock＋curl→前端→服务层→迁移→逻辑→错误处理
- 能说明它为何优于数据库到前端的横向分层计划

## 验收问句

> 你能把当前计划改成 {{name}} 吗？

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
