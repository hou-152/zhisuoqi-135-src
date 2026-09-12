---
id: cm_063155cf
name: Verifiable Codebase
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Verifiable Codebase

> 让 agent 有可靠工具验证改动的代码库，如 Playwright CLI、关键 E2E 测试、只读 verifier agent。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

可验证的代码库不是让 agent 说“我觉得好了”，而是让它交出录像、测试结果和独立检查。结果能被复核，循环才敢自动化。

## 原文 context

verifiable 指 agent 有可靠工具验证改动。作者推荐 Playwright CLI、关键 E2E tests、PR skill 和 read-only verifier agent，强调不要只让执行 agent 自己证明自己做对了。

## 掌握证据（做到这些才算会）

- 能列出至少三种让改动可被验证的工具或流程
- 能说明为何不能让执行 agent 自己证明自己做对了

## 验收问句

> 你会怎样把一个代码库改造成 {{name}}？

## 懂了它才能懂（解锁 1）

- [[Self-verification loop]] — 闭环靠浏览器、测试等可验证工具支撑。

## 相关

- [[Verifiability]] · related-to（audit） — Verifiability 是任务级的 RL 奖励信号属性，Verifiable Codebase 是工程落地形态，二者更像并列的抽象/实例关系；不懂 RL 意义上的 verifiability，靠字面「可验证」也能立住，甚至方向很可能是反
- [[Read-only Verifier Agent]] · related-to（audit） — B 只是 A 列举的验证工具之一；不懂只读 verifier 仍能通过测试/Playwright 理解可验证代码库。
- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Agent loop]]
- [[Self-verification loop]]
- [[Loop Engineer]]
- [[Verifiability]]
- [[Read-only Verifier Agent]]
