---
id: cm_b55ff5c3
name: 记忆
nameEn: Memory
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: memory-retrieval
learningStage: now
verification: judge
centrality: 0.308
depth: 0
origin: [context, harness]
aliases: ["Memory"]
sources: 2
---

# 记忆 · Memory

> 在不同时间尺度上运作的存储：会话内、跨会话、长期沉淀，各层服务于不同的取回需求。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.308

## 费曼一下

记忆不是一个单一存储，而是短期对话历史和长期跨会话信息的组合。Harness 要让模型既能延续当前任务，也能调用过去保存的知识。

## 原文 context

“不同的时间尺度上运作”

## 掌握证据（做到这些才算会）

- 能区分几种时间尺度各自该存什么
- 能说明某条经验该落在哪一层记忆

## 验收问句

> 这条经验该进哪一层 {{name}}，为什么？

## 懂了它才能懂（解锁 10）

- [[Harness]] — Memory 是 Agent Harness 管理跨步骤与跨会话信息的组成部分。
- [[程序记忆（Procedural Memory Skills） progressive disclosure]] — 程序记忆是记忆的一种亚型，不懂记忆分层就无从谈技能记忆。
- [[记忆冲刷（Memory Flush）]] — 冲刷是记忆写入的时机策略，先懂记忆才懂何时保存。
- [[记忆须改变回答实质]] — 被调用的先要是记忆，才有能否改变结论之问。
- [[Engram]] — Engram 是给模型加的知识查表记忆模块，先懂记忆才懂它。
- [[Honcho]] — Honcho 是跨设备记忆连续性的用户模型，不懂记忆连续性无从理解。
- [[Knowledge Graph vs Flat Files]] — 该对比讨论上下文/记忆的组织方式，先懂记忆才谈图与扁平之别。
- [[Signals]] — Signals 是可追加的观察记录，属记忆的素材层，先懂记忆才懂它。
- [[stated 出处纪律]] — 它是记忆写入的判据纪律，先懂记忆写入才懂出处优先。
- [[Hoard]] — 从命名看属囤积式保存，先理解记忆存储才谈其形态。

## 相关

- [[压缩 Compaction]] · 常一起用 — 可恢复压缩依靠外部记忆保留原始内容的回取路径。
- [[长上下文窗口]] · 常一起用（运行时组成） — Memory 把进度写出 Context Window，并在后续需要时重新取回。
- [[长上下文窗口]] · 常一起用 — 长期记忆把进度写出窗口，并在需要时取回，以支持跨会话恢复。
- [[渐进式披露 progressive disclosure]] · 常一起用（工作流） — Memory 可用路由文档与主题文件按 Progressive Disclosure 分层加载。
- [[渐进式披露 progressive disclosure]] · 常一起用 — Memory 用路由文档和主题文件分层，让详细知识按需披露。
- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[非模型架构 Non-model Architecture]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[Harness]] · 组成（运行时组成） — Memory 是 Agent Harness 管理跨步骤与跨会话信息的组成部分。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13

## 出场

- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922

## 别名

`Memory`

## 反链

- [[Harness]]
- [[长上下文窗口]]
- [[程序记忆（Procedural Memory Skills） progressive disclosure]]
- [[渐进式披露 progressive disclosure]]
- [[记忆冲刷（Memory Flush）]]
- [[Signals]]
- [[AI Agent]]
- [[压缩 Compaction]]
- [[记忆须改变回答实质]]
- [[Engram]]
- [[Hoard]]
- [[Honcho]]
- [[Knowledge Graph vs Flat Files]]
- [[stated 出处纪律]]
- [[非模型架构 Non-model Architecture]]
