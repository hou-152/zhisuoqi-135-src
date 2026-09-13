---
id: cm_ff09ab2a
name: Read-only Verifier Agent
type: PROCEDURAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Read-only Verifier Agent

> 执行 agent 另起一个只读验证 agent，按详细 spec 检查结果，避免执行者自我确认。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

这是把“做题的人”和“改卷的人”分开。做题的人可能看漏自己的错误，独立改卷更可靠。

## 原文 context

作者在 PR skill 中要求执行 agent spawn 一个 read-only verifier agent，并提供详细 spec。这样验证者不修改代码，只检查结果是否符合要求，避免执行者自我确认。

## 掌握证据（做到这些才算会）

- 能写出一份 verifier agent 的详细 spec
- 能说明为何 verifier 不允许修改代码

## 验收问句

> {{name}} 产出后谁来检查，为什么不让执行者自己查？

## 先懂这些（前置 1）

- [[Self-evaluation Failure]] · **soft** — 只读校验者存在的理由就是执行者自评会偏乐观。

## 相关

- [[Rubric 与 verifier agent]] · related-to（audit） — rubric verifier agent 定义自足，是 read-only verifier 的一个具体实例；懂一般概念有帮助但非理解前提。
- [[Rubrics 与验证 agent]] · related-to（audit） — A 只需一般验证 agent；B 是执行侧只读 verifier 的具体实现，不是理解 A 的必需前提。
- [[Verifiable Codebase]] · related-to（audit） — B 只是 A 列举的验证工具之一；不懂只读 verifier 仍能通过测试/Playwright 理解可验证代码库。
- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Agent loop]]
- [[Loop Engineer]]
- [[Rubric 与 verifier agent]]
- [[Self-evaluation Failure]]
- [[Rubrics 与验证 agent]]
- [[Verifiable Codebase]]
