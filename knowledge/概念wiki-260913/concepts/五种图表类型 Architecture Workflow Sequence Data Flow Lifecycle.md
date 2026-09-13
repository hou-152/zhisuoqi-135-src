---
id: cm_d3ec66a4
name: 五种图表类型
nameEn: Architecture / Workflow / Sequence / Data Flow / Lifecycle
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: spec-intent
learningStage: when-needed
verification: judge
centrality: 0.176
depth: 1
origin: [neican]
aliases: ["Architecture / Workflow / Sequence / Data Flow / Lifecycle"]
sources: 1
---

# 五种图表类型 · Architecture / Workflow / Sequence / Data Flow / Lifecycle

> Archify 的五类图：Architecture、Workflow、Sequence、Data Flow、Lifecycle，各对应一种 prompt 要提供的信息骨架。

**领域** spec-intent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.176

## 费曼一下

Archify 不是任意画布，而是五类语义模式。Architecture 讲组件边界，Workflow 讲流程分支，Sequence 讲调用时序，Data Flow 讲数据移动，Lifecycle 讲状态生命周期。选类型就是选图的骨架，也决定 prompt 要提供什么信息。

## 原文 context

| Type | Best for | Include in your prompt |

| --- | --- | --- |

| **Architecture** | Components, services, storage, boundaries | Scope, core components, primary path |

| **Workflow** | CI/CD, approvals, tool calls, runbooks | Participants, order, branches, exceptions |

| **Sequence** | API calls, cache fallback, auth, async traces | Callers, callees, returns, timing |

| **Data Flow** | Pipelines, lineage, PII, consumers | Sources, transforms, stores, boundaries |

| **Lifecycle** | States, retries, waits, terminal outcomes | States, events, retry and cancellation paths |

## 掌握证据（做到这些才算会）

- 能说出五类图各自最适合表达什么
- 能说出某一类图需要在 prompt 里写进哪些信息

## 验收问句

> 给你一个系统需求，你能说明该用 {{name}} 里的哪一类图吗？

## 先懂这些（前置 1）

- [[类型化 JSON IR typed JSON IR]] · **hard** — 不懂类型化 JSON IR 的 schema 与字段，就做不了五种图表类型各自的 prompt 信息骨架——不知道 Architecture/Workflow/Sequence/Data Flow/Lifecycle 每类该让代理产出哪些节点、哪些字段。

## 出场

- AI 内参 260912 ｜ 《Archify》 ｜ https://github.com/tt-a1i/archify

## 别名

`Architecture / Workflow / Sequence / Data Flow / Lifecycle`

## 反链

- [[类型化 JSON IR typed JSON IR]]
