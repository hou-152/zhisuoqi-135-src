---
id: cm_b77b7537
name: Reliability-critical harness primitives
type: META
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.067
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Reliability-critical harness primitives

> 只收录直接影响 harness 设计、上下文管理、评测与运行时控制等可靠性原语的资源筛选标准。

**领域** harness-runtime ｜ **类型** META ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

不是所有工具都能让 agent 更可靠。真正关键的是那些能减少漂移、限制破坏、发现错误、恢复状态和验证结果的基础部件。

## 原文 context

清单排除泛泛 agent tooling，只收录直接影响 harness design、context management、evaluation、runtime control 等可靠性原语的资源。

## 掌握证据（做到这些才算会）

- 能判断某资源是否属于可靠性关键原语而非泛化 agent 工具
- 能按 harness/context/eval/runtime 四类归档一条资源

## 验收问句

> 给一份资源，你依 {{name}} 判断它该不该收？

## 先懂这些（前置 2）

- [[primitives]] · **hard** — 筛选标准针对 SDK 原语，不懂 primitives 就不知道在筛什么。
- [[Runtime-harness separation]] · **soft** — 筛选运行时控制原语，需先区分执行环境与可靠工作循环。

## 相关

- [[Repo-local instructions]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Safe autonomy]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Spec-driven agent workflow]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Infrastructure noise]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness-level benchmarks]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Runtime-harness separation]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Long-running agent handoff]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness evolution]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Trace-based evals]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Long-running agent handoff]]
- [[Context as working memory budget]]
- [[Harness evolution]]
- [[primitives]]
- [[Runtime-harness separation]]
- [[Safe autonomy]]
- [[Spec-driven agent workflow]]
- [[Trace-based evals]]
- [[Harness-level benchmarks]]
- [[Infrastructure noise]]
- [[Repo-local instructions]]
