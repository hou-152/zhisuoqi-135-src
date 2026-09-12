---
id: cm_a5b4380f
name: Self-evaluation Failure】
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Self-evaluation Failure】

> Agent 评估自己的产出时倾向自信夸好，即使在人看来质量明显平庸。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

Agent 对自己的作品存在系统性的「自我感觉良好」偏差。这在主观任务（如设计）上尤其突出，因为没有二元化的通过/不通过测试。但即使在有客观验证的任务上，agent 也会展现糟糕判断力。这是 Generator-Evaluator 分离的核心动因。

## 原文 context

When asked to evaluate work they’ve produced, agents tend to respond by confidently praising the work—even when, to a human observer, the quality is obviously mediocre.

## 掌握证据（做到这些才算会）

- 能举出 agent 自评与人类判断背离的例子
- 能说明为何自评不能单独作为验收依据

## 验收问句

> 为什么不能让 {{name}} 单独判定做得好不好？

## 懂了它才能懂（解锁 2）

- [[Self-verification]] — 自检要解决的问题正是 Agent 自评偏乐观。
- [[Read-only Verifier Agent]] — 只读校验者存在的理由就是执行者自评会偏乐观。

## 相关

- [[Context Anxiety】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Context Reset vs Compaction】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-09

## 出场

- Harness Engineering ｜ 《Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness》 ｜ https://www.anthropic.com/engineering/harness-design-long-running-apps
## 反链

- [[Read-only Verifier Agent]]
- [[Self-verification]]
- [[Context Reset vs Compaction】]]
- [[Context Anxiety】]]
