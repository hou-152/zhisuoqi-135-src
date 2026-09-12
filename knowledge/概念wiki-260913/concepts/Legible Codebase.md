---
id: cm_ddb0ab8c
name: Legible Codebase
type: CONCEPTUAL
subject: Harness Engineering
domain: code-engineering
learningStage: now
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Legible Codebase

> 让 agent 容易判断该改哪里的代码库，靠 AGENTS.md、文档索引、custom lint 与链接检查维持。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

legible codebase 就是路标清楚的城市。agent 不需要在每个路口猜方向，规则和入口会在它要走错时及时提醒。

## 原文 context

作者强调代码库要让 agent 容易理解哪里该改。AGENTS.md、文档索引、custom lint、programmatic link check 都是 context engineering 的一部分，目的是减少 agent 找错入口或误用旧模块。

## 掌握证据（做到这些才算会）

- 能指出一处 agent 容易找错入口的地方并给出改法
- 能说明 custom lint 与程序化链接检查在其中起的作用

## 验收问句

> {{name}} 对 agent 改码的命中率有什么影响？

## 先懂这些（前置 1）

- [[Watch 模式与自动更新 hooks]] · **soft** — 不懂 Watch 模式与自动更新 hooks，就做不了 Legible Codebase 的「在每次编辑和 commit 后自动维持文档索引与链接检查的时效性」

## 懂了它才能懂（解锁 1）

- [[Skill as asset]] — 不懂 Legible Codebase，就做不了 Skill as asset 的「让 agent 在代码库中发现、复用并测试 skill」

## 相关

- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Tree-sitter]] · rejected（audit） — custom lint/链接检查不必然基于 Tree-sitter，前置只是可选实现，不构成概念依赖。
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Agent loop]]
- [[Loop Engineer]]
- [[Skill as asset]]
- [[Watch 模式与自动更新 hooks]]
- [[Tree-sitter]]
