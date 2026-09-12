---
id: cm_39225cd5
name: Repo-local instructions
type: REPRESENTATIONAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.042
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Repo-local instructions

> 放在仓库内的 CLAUDE.md、AGENTS.md 等规则文件，是 agent 可反复读取的持久化协作接口。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

每个仓库都应该有一本给 agent 看的操作手册。它告诉 agent 怎么跑测试、哪些文件不能碰、何时停下、什么才算完成。

## 原文 context

[CLAUDE.md](http://claude.md/)、[AGENTS.md](http://agents.md/) 和 [agent.md](http://agent.md/) 被放在 context、memory、specs 和 workflow 附近，说明项目内规则是 agent 可反复读取的持久化协作接口。

## 掌握证据（做到这些才算会）

- 能在项目里放置并维护 AGENTS.md/CLAUDE.md
- 能说明为何它属于持久化协作接口而非一次性 prompt

## 验收问句

> 在项目里 {{name}} 应该写什么、放在哪里？

## 先懂这些（前置 1）

- [[仓库即唯一事实来源]] · **hard** — 仓库内规则文件可反复读取的前提，是仓库对 agent 才是唯一事实来源。

## 相关

- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Harness 工程 Harness Engineering]]
- [[仓库即唯一事实来源]]
- [[Context as working memory budget]]
- [[Reliability-critical harness primitives]]
