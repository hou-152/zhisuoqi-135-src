---
id: cm_ff09ab2a
name: Read-only Verifier Agent
type: PROCEDURAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.117
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Read-only Verifier Agent

> 执行 agent 另起一个只读验证 agent，按详细 spec 检查结果，避免执行者自我确认。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.117

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

## 懂了它才能懂（解锁 3）

- [[Rubric 与 verifier agent]] — 这类 verifier agent 是只读校验者的具体用法。
- [[Rubrics 与验证 agent]] — 它同样依托独立验证 agent 来校准品味判断。
- [[Verifiable Codebase]] — 只读验证 agent 是可验证代码库所依赖的工具之一。

## 相关

- [[Loop Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[Agent loop]]
- [[Verifiable Codebase]]
- [[Rubric 与 verifier agent]]
- [[Rubrics 与验证 agent]]
- [[Self-evaluation Failure]]
- [[Loop Engineer]]
