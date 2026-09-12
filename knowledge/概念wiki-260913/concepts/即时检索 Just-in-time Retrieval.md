---
id: cm_622b0b3b
name: 即时检索
nameEn: Just-in-time Retrieval
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: memory-retrieval
learningStage: when-needed
verification: use
centrality: 0.085
depth: 0
origin: [context, harness]
aliases: ["Just-in-time Retrieval"]
sources: 2
---

# 即时检索 · Just-in-time Retrieval

> 上下文里只保留轻量级标识符（路径、ID、链接），需要时再取全文，而不是把内容全塞进去。

**领域** memory-retrieval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.085

## 费曼一下

即时检索把上下文窗口当作缓存，而不是仓库。Harness 只放必要线索，等模型真正需要时再加载具体内容。

## 原文 context

“只保留轻量级标识符”

## 掌握证据（做到这些才算会）

- 能为一批内容设计标识符命名规则
- 能说明何时从标识符按需取回内容

## 验收问句

> 上下文里只放标识符时，{{name}} 靠什么把需要的内容取回来？

## 懂了它才能懂（解锁 2）

- [[上下文工程 context engineering]] — Just-in-Time Retrieval 是 Context Engineering 的生产策略之一。
- [[程序记忆（Procedural Memory Skills） progressive disclosure]] — 技能按需加载即渐进披露，不懂按需取全文就无法理解其组织方式。

## 相关

- [[可恢复的压缩 restorable compression]] · 常一起用（运行时组成） — 保留下来的引用需要在运行时按需取回原内容。
- [[观察掩码 Observation Masking]] · 常一起用（工作流） — 被移出窗口的旧观察可保留轻量线索，并在再次需要时按需取回。
- [[即时检索 Just-in-time Retrieval]] · 常一起用 — 即时检索把上下文窗口当缓存，只在需要时加载具体内容。
- [[即时检索 Just-in-time Retrieval]] · 常一起用 — 即时检索把上下文窗口当缓存，只在需要时加载具体内容。
- [[长上下文窗口]] · 常一起用（工作流） — Just-in-Time Retrieval 把 Context Window 当缓存，只在需要时加载详情。
- [[渐进式披露 progressive disclosure]] · 对照（概念边界） — JIT 强调取数时机；渐进披露强调逐层发现。
- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[非模型架构 Non-model Architecture]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[上下文工程 context engineering]] · 组成（工程范围轴） — Just-in-Time Retrieval 是 Context Engineering 的生产策略之一。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13

## 出场

- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922

## 别名

`Just-in-time Retrieval`

## 反链

- [[上下文工程 context engineering]]
- [[长上下文窗口]]
- [[程序记忆（Procedural Memory Skills） progressive disclosure]]
- [[渐进式披露 progressive disclosure]]
- [[AI Agent]]
- [[非模型架构 Non-model Architecture]]
- [[观察掩码 Observation Masking]]
- [[可恢复的压缩 restorable compression]]
