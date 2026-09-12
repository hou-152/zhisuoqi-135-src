---
id: cm_7e14e299
name: just in time 上下文检索
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.072
depth: 0
origin: [context]
aliases: []
sources: 1
---

# just in time 上下文检索

> agent 只维护轻量标识符（路径、查询、链接），运行时用工具按引用动态加载真实数据。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

不把整个图书馆搬进书房，只在书桌上放一张索书号清单，要用哪本再去取。人本来就这么活——我们不背下所有资料，而是靠文件夹、收件箱、书签这些外部系统，需要时再翻出来。

## 原文 context

与「推理前把相关数据全预处理铺进 context」相对的策略——agent 只维护轻量标识符（文件路径、存好的查询、网页链接），运行时用工具按引用动态加载。Claude Code 借此在大型数据库上做分析，用 head、tail 处理大批数据而不载入完整对象。

## 掌握证据（做到这些才算会）

- 能设计一套按引用加载而非全量预载的检索流程
- 能说出用 head、tail 处理大批数据而不载入全对象的做法

## 验收问句

> {{name}} 与预先灌满 context 的做法差别在哪？

## 懂了它才能懂（解锁 1）

- [[Token 优化的评审上下文 get_review_context_tool]] — 不懂【just in time 上下文检索】，就做不了【Token 优化的评审上下文】的 ⟨按需拉取评审摘要而非全量注入⟩

## 相关

- [[Context Management 四策略]] · related-to（audit） — JIT 检索概念自包含，四策略中「懒加载」只是归类标签，非依赖
- [[code-review-graph]] · related-to（audit） — 工具本身可独立理解，JIT 只是其所体现的方法，非机制前提
- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
## 反链

- [[注意力预算 attention budget]]
- [[上下文腐烂 Context Rot]]
- [[code-review-graph]]
- [[Context Management 四策略]]
- [[Token 优化的评审上下文 get_review_context_tool]]
