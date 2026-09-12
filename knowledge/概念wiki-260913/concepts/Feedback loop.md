---
id: cm_0db0f875
name: Feedback loop
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: use
centrality: 0.042
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Feedback loop

> 写代码、运行、读取结果、修正构成的闭环，是验证真正起作用、循环能自我纠偏的核心。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

反馈回路就是让 AI 做完后看到结果，再根据结果改。没有反馈，它只是闭眼往前冲。

## 原文 context

文章把 verification 视为 loop 真正工作的核心。写代码、运行、读取结果、修正，构成一个能纠偏的 feedback loop。

## 掌握证据（做到这些才算会）

- 能画出该闭环四步并说明每步的输入输出
- 能说明缺掉读取结果这一步会怎样

## 验收问句

> {{name}} 的四步是什么，缺哪一步会失效？

## 懂了它才能懂（解锁 1）

- [[形成性评估]] — 持续测量、持续反馈、持续调整，本质就是把写—跑—改的闭环搬进评估。

## 相关

- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15

## 出场

- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
## 反链

- [[Loop Engineering]]
- [[形成性评估]]
- [[Continuous orchestration loop]]
- [[Model as subroutine]]
