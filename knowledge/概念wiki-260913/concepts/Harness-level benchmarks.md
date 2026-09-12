---
id: cm_5465cd64
name: Harness-level benchmarks
type: REPRESENTATIONAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Harness-level benchmarks

> 一类评测 Agent 骨架能力的基准，考察工具调用、环境控制、状态验证与长任务推进，而非知识问答。

**领域** verification-eval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

这些 benchmark 像不同类型的试车场。它们不是只测发动机马力，而是测试整辆车在城市、山路、雨天和长途中的表现。

## 原文 context

清单中的 AppWorld、OSWorld、SWE-bench、Terminal-Bench、WebArena、MCPBench 等 benchmark 都测试工具调用、环境控制、状态验证和长任务推进，而不只是知识问答。

## 掌握证据（做到这些才算会）

- 能列举 AppWorld、OSWorld、SWE-bench、Terminal-Bench 等并说明各自测什么环境
- 能指出某类 benchmark 分数不能证明模型的知识问答水平

## 验收问句

> {{name}} 里哪些指标能证明 Agent 真把长任务推下去了？

## 先懂这些（前置 1）

- [[通用 harness 的公平性张力]] · **soft** — 评测 agent 骨架的基准，天然把 harness 设计摆上台面，触及公平性张力。

## 相关

- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Harness 工程 Harness Engineering]]
- [[Context as working memory budget]]
- [[通用 harness 的公平性张力]]
- [[Reliability-critical harness primitives]]
