---
id: cm_b55ff5c3
name: 记忆
nameEn: Memory
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: memory-retrieval
learningStage: now
verification: judge
centrality: 0.253
depth: 0
origin: [context, harness]
aliases: ["Memory"]
sources: 2
---

# 记忆 · Memory

> 在不同时间尺度上运作的存储：会话内、跨会话、长期沉淀，各层服务于不同的取回需求。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.253

## 费曼一下

记忆不是一个单一存储，而是短期对话历史和长期跨会话信息的组合。Harness 要让模型既能延续当前任务，也能调用过去保存的知识。

## 原文 context

“不同的时间尺度上运作”

## 掌握证据（做到这些才算会）

- 能区分几种时间尺度各自该存什么
- 能说明某条经验该落在哪一层记忆

## 验收问句

> 这条经验该进哪一层 {{name}}，为什么？

## 懂了它才能懂（解锁 4）

- [[项目知识体系]] — 不懂【记忆】，就做不了【项目知识体系】里的经验沉淀与启动上下文装配
- [[Memory-driven development]] — 不懂【记忆】，就做不了【Memory-driven development】里可被后续 agent 读取的决策与踩坑留存
- [[跨会话记忆文件系统]] — 不懂【记忆】的跨会话取回需求，就做不了【跨会话记忆文件系统】的六种操作与分主题文件设计
- [[session_search]] — 不懂【记忆】的跨会话沉淀，就做不了【session_search】的长尾历史会话翻找

## 相关

- [[压缩 Compaction]] · 常一起用 — 可恢复压缩依靠外部记忆保留原始内容的回取路径。
- [[渐进式披露 progressive disclosure]] · 常一起用（工作流） — Memory 可用路由文档与主题文件按 Progressive Disclosure 分层加载。
- [[长上下文窗口]] · 常一起用（运行时组成） — Memory 把进度写出 Context Window，并在后续需要时重新取回。
- [[长上下文窗口]] · 常一起用 — 长期记忆把进度写出窗口，并在需要时取回，以支持跨会话恢复。
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

- [[长上下文窗口]]
- [[非模型架构 Non-model Architecture]]
- [[渐进式披露 progressive disclosure]]
- [[压缩 Compaction]]
- [[项目知识体系]]
- [[AI Agent]]
- [[跨会话记忆文件系统]]
- [[Memory-driven development]]
- [[session_search]]
