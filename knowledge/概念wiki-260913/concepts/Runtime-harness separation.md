---
id: cm_a47a4e89
name: Runtime-harness separation
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Runtime-harness separation

> LangChain 的 framework/runtime/harness 三层分解：执行环境与可靠工作循环不是同一层。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

runtime 负责“能运行”，harness 负责“能可靠完成任务”。有执行器不等于有好的工作流程、状态管理和验证闭环。

## 原文 context

LangChain 的 framework、runtime、harness 分解，以及 Claude Agent SDK、AgentKit、SWE-ReX 等资源，说明执行环境和可靠工作循环不是同一层。

## 掌握证据（做到这些才算会）

- 能把一个 agent 组件归入 framework、runtime 或 harness 之一
- 能说明为何执行环境层不能替代可靠工作循环层

## 验收问句

> 举例说明 {{name}} 中三层各自负责什么。

## 懂了它才能懂（解锁 2）

- [[harness 与 framework 的分野]] — 不先分清执行环境与工作循环两层，就分不清框架与 harness
- [[higher-level runtime]] — 框架/运行时/harness 三层分解正是运行时叠加的前提

## 相关

- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Harness 工程 Harness Engineering]]
- [[Context as working memory budget]]
- [[higher-level runtime]]
- [[harness 与 framework 的分野]]
- [[Reliability-critical harness primitives]]
