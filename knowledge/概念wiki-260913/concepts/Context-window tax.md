---
id: cm_b28a9fc2
name: Context-window tax
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.042
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Context-window tax

> 即便缓存命中省了钱，固定内容仍占用窗口容量：85K bootstrap 占 200K 窗口四成以上，并提前触发 compaction。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

一本书打折不代表它变薄了。即使读取便宜，厚书仍占满书包，留给代码和对话的空间就更少。

## 原文 context

Cache hit 只降低计费，不减少上下文占用。85K bootstrap 仍占 200K window 的 40% 以上，并提前触发 compaction。

## 掌握证据（做到这些才算会）

- 能算出 85K 固定内容在 200K 窗口中的占比并说明其后果
- 能区分 cache hit 的计费收益与上下文占用成本不是一回事

## 验收问句

> {{name}} 省的是钱还是窗口？两者差别在哪？

## 先懂这些（前置 1）

- [[Context as working memory budget]] · **soft** — 固定内容占用的是有限窗口容量，预算视角才让这笔税可量化

## 相关

- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tool-schema tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[Harness token floor]]
- [[Context as working memory budget]]
- [[Tool-schema tax]]
- [[API-boundary observability]]
