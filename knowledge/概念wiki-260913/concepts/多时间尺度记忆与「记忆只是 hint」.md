---
id: cm_1d5a247c
name: 多时间尺度记忆与「记忆只是 hint」
type: CONCEPTUAL
subject: Harness Engineering
domain: memory-retrieval
learningStage: when-needed
verification: judge
centrality: 0.236
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 多时间尺度记忆与「记忆只是 hint」

> 短期为单会话历史，长期跨会话持久化并分层索引；agent 应把记忆当提示，行动前校验真实状态。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.236

## 费曼一下

笔记本上写着「钥匙在抽屉里」，出门前还是要拉开抽屉看一眼。记忆是线索，不是事实。

## 原文 context

短期记忆是单会话对话历史，长期记忆跨会话持久化（CLAUDE.md、自动生成的 MEMORY.md、命名空间 JSON Store、SQLite/Redis Sessions）。Claude Code 用三层结构：常驻轻量索引、按需拉取的主题文件、只可搜索的原始 transcript。关键原则是 agent 把自己的记忆当作提示，行动前对真实状态做校验。

## 掌握证据（做到这些才算会）

- 能说出常驻轻量索引／按需主题文件／可搜索 transcript 三层
- 能指出记忆可能过期，行动前须对真实状态做校验

## 验收问句

> 面对 {{name}} 里的旧记忆，动手前要不要核对？

## 懂了它才能懂（解锁 4）

- [[跨轮次记忆与连贯策略]] — 跨轮次记忆保留推理历史，依赖多时间尺度记忆的分层设计。
- [[结构化记事 agentic memory]] — 不懂【多时间尺度记忆与「记忆只是 hint」】就做不了【结构化记事 / agentic memory】里「写到上下文窗口之外、需要时再取回」的设计
- [[self-baking]] — 不懂【多时间尺度记忆与「记忆只是 hint」】就做不了【self-baking】判定持久知识结构该落在哪一层
- [[知识端点]] — 不懂【多时间尺度记忆与「记忆只是 hint」】就做不了【知识端点】该把哪些内容收敛进单一入口的取舍

## 相关

- [[分层记忆架构]] · related-to（audit） — 多时间尺度记忆可独立理解，分层架构只是上位框架，不构成必要前置。
- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12
## 反链

- [[跨轮次记忆与连贯策略]]
- [[结构化记事 agentic memory]]
- [[self-baking]]
- [[If you're not the model, you're the harness.]]
- [[分层记忆架构]]
- [[知识端点]]
- [[agent 与 harness 的分工]]
