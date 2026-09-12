---
id: cm_063155cf
name: Verifiable Codebase
type: PROCEDURAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.092
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Verifiable Codebase

> 让 agent 有可靠工具验证改动的代码库，如 Playwright CLI、关键 E2E 测试、只读 verifier agent。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.092

## 费曼一下

可验证的代码库不是让 agent 说“我觉得好了”，而是让它交出录像、测试结果和独立检查。结果能被复核，循环才敢自动化。

## 原文 context

verifiable 指 agent 有可靠工具验证改动。作者推荐 Playwright CLI、关键 E2E tests、PR skill 和 read-only verifier agent，强调不要只让执行 agent 自己证明自己做对了。

## 掌握证据（做到这些才算会）

- 能列出至少三种让改动可被验证的工具或流程
- 能说明为何不能让执行 agent 自己证明自己做对了

## 验收问句

> 你会怎样把一个代码库改造成 {{name}}？

## 先懂这些（前置 2）

- [[Verifiability]] · **hard** — 可验证代码库是可验证性在工程环境中的落地形态。
- [[Read-only Verifier Agent]] · **soft** — 只读验证 agent 是可验证代码库所依赖的工具之一。

## 懂了它才能懂（解锁 1）

- [[Self-verification loop]] — 闭环靠浏览器、测试等可验证工具支撑。

## 相关

- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Agent loop]]
- [[Read-only Verifier Agent]]
- [[Self-verification loop]]
- [[Verifiability]]
- [[Loop Engineer]]
