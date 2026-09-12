---
id: cm_94db716e
name: Self-verification
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: judge
centrality: 0.181
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Self-verification

> 让 Agent 具备端到端检查自己工作的能力，loop 的可信度取决于这份自检能力。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

会干活的 AI 不够，必须会检查自己有没有干成。没有自检，loop 只是在更快地制造错误。

## 原文 context

Boris 的五条建议里最关键的是让 Claude 有端到端自验证能力。作者认为 loop 的可信度取决于它检查自己工作的能力。

## 掌握证据（做到这些才算会）

- 能说明为何 loop 可信度取决于自检能力
- 能指出端到端自验证覆盖了哪些环节

## 验收问句

> {{name}} 覆盖到哪一步才算够用？

## 先懂这些（前置 1）

- [[Verifiability]] · **soft** — 任务有无自动成功信号，决定自检能否闭环。

## 懂了它才能懂（解锁 2）

- [[Self-verification loop]] — 回路是自检能力在写码-跑测-改错上的具体形态。
- [[Wrapper skill]] — 包装 skill 的核心是给原 skill 补上自检环节。

## 相关

- [[Self-evaluation Failure]] · related-to（audit） — B 是自检要解决的动机/问题，不懂它仍能理解 self-verification 是让 agent 检查自己工作。
- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15

## 出场

- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
## 反链

- [[Loop Engineering]]
- [[Self-verification loop]]
- [[Continuous orchestration loop]]
- [[Verifiability]]
- [[Model as subroutine]]
- [[Self-evaluation Failure]]
- [[Wrapper skill]]
