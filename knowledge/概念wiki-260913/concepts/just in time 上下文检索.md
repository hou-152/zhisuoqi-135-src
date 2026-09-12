---
id: cm_7e14e299
name: just in time 上下文检索
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.067
depth: 2
origin: [context]
aliases: []
sources: 1
---

# just in time 上下文检索

> agent 只维护轻量标识符（路径、查询、链接），运行时用工具按引用动态加载真实数据。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

不把整个图书馆搬进书房，只在书桌上放一张索书号清单，要用哪本再去取。人本来就这么活——我们不背下所有资料，而是靠文件夹、收件箱、书签这些外部系统，需要时再翻出来。

## 原文 context

与「推理前把相关数据全预处理铺进 context」相对的策略——agent 只维护轻量标识符（文件路径、存好的查询、网页链接），运行时用工具按引用动态加载。Claude Code 借此在大型数据库上做分析，用 head、tail 处理大批数据而不载入完整对象。

## 掌握证据（做到这些才算会）

- 能设计一套按引用加载而非全量预载的检索流程
- 能说出用 head、tail 处理大批数据而不载入全对象的做法

## 验收问句

> {{name}} 与预先灌满 context 的做法差别在哪？

## 先懂这些（前置 1）

- [[Context Management 四策略]] · **soft** — 它实现的是四策略中该懒加载就懒加载那一条

## 懂了它才能懂（解锁 1）

- [[code-review-graph]] — 只让 Claude 读相关文件，正是按引用动态取数的即时检索思路

## 相关

- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
## 反链

- [[上下文工程 context engineering]]
- [[注意力预算 attention budget]]
- [[上下文腐烂 Context Rot]]
- [[Context Management 四策略]]
- [[code-review-graph]]
