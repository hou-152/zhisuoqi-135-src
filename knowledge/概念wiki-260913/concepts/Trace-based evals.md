---
id: cm_b433c375
name: Trace-based evals
type: PROCEDURAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.067
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Trace-based evals

> 用 agent trace、JSONL、确定性验证器、baseline 与轨迹复盘来衡量 skill 或 harness 的改动。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

评测 agent 不能只看最后有没有答对，还要回看它怎么走到结果。轨迹能告诉我们失败是上下文错、工具错、规划错，还是验证不够。

## 原文 context

OpenAI、OpenHands、Anthropic 和 LangChain 的 eval 资源都强调用 agent traces、JSONL、deterministic verifiers、baselines 和 trajectory review 衡量 skill 或 harness 改动。

## 掌握证据（做到这些才算会）

- 能搭出一套含 baseline 与确定性验证器的评估流程
- 能拿轨迹复盘说明某次改动为何变好或变差

## 验收问句

> 你如何用 {{name}} 证明这次 harness 改动真的有提升？

## 先懂这些（前置 2）

- [[Tracing]] · **hard** — 轨迹评估建立在 trace 能被采集与回放之上。
- [[Measurement snapshot]] · **soft** — 轨迹评估结论必须绑定版本与样本快照才可复现。

## 相关

- [[harness over-fitting]] · 常一起用（工作流） — 固定模型、任务与评测条件的跨 Harness 轨迹比较可检验泛化下降。
- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[验证闭环 verification loop]] · 对照（概念边界） — 一个跨运行评估系统，一个在当前运行中检查并纠偏。
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[验证闭环 verification loop]]
- [[Context as working memory budget]]
- [[harness over-fitting]]
- [[Reliability-critical harness primitives]]
- [[Tracing]]
- [[Measurement snapshot]]
