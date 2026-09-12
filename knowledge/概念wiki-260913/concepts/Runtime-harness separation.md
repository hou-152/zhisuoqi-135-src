---
id: cm_a47a4e89
name: Runtime-harness separation
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.236
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Runtime-harness separation

> LangChain 的 framework/runtime/harness 三层分解：执行环境与可靠工作循环不是同一层。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.236

## 费曼一下

runtime 负责“能运行”，harness 负责“能可靠完成任务”。有执行器不等于有好的工作流程、状态管理和验证闭环。

## 原文 context

LangChain 的 framework、runtime、harness 分解，以及 Claude Agent SDK、AgentKit、SWE-ReX 等资源，说明执行环境和可靠工作循环不是同一层。

## 掌握证据（做到这些才算会）

- 能把一个 agent 组件归入 framework、runtime 或 harness 之一
- 能说明为何执行环境层不能替代可靠工作循环层

## 验收问句

> 举例说明 {{name}} 中三层各自负责什么。

## 先懂这些（前置 2）

- [[stateless]] · **soft** — 不懂【stateless】，就做不了 Runtime-harness separation 里「为什么必须有 harness 这一层来承载可靠工作循环」这件事
- [[Tracing]] · **soft** — 不懂【Tracing】，就做不了判断「runtime 与 harness 是否真分离、工作循环是否可靠」这件事

## 懂了它才能懂（解锁 2）

- [[Reliability-critical harness primitives]] — 筛选运行时控制原语，需先区分执行环境与可靠工作循环。
- [[Von Neumann Architecture Analogy]] — 不懂【Runtime-harness separation】，就做不了 Von Neumann 类比中「把 harness 映射为操作系统」这件事

## 相关

- [[higher-level runtime]] · related-to（audit） — 三层分解是解释性框架；higher-level runtime 按其描述（接管 turns/工具/guardrails/sessions）本身即可理解，应降 soft。
- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[harness 与 framework 的分野]] · related-to（audit） — framework 与 harness 的分野靠『谁决定怎么想 / 谁保证动作可靠』即可立住；LangChain 的三层分解只是一例，不是理解该分野的前提。
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[stateless]]
- [[Tracing]]
- [[Context as working memory budget]]
- [[higher-level runtime]]
- [[Von Neumann Architecture Analogy]]
- [[harness 与 framework 的分野]]
- [[Reliability-critical harness primitives]]
