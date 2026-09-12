---
id: cm_085b498a
name: Cache temperature
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: compute
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Cache temperature

> 同任务的缓存写入量随缓存冷热与漂移而变化的程度：预热后几乎不写，冷或漂移时整段重写。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.045

## 费曼一下

刚烧热的炉子做饭省燃料，冷炉子要重新点火。比较成本时，如果一边是热炉、一边是冷炉，结论会严重偏斜。

## 原文 context

Claude Code 同任务的 cache-write volume 随缓存冷热从 OpenCode 的 5.9 倍到 54 倍；刚预热的第三轮几乎不写，冷或漂移时会整段重写。

## 掌握证据（做到这些才算会）

- 能算出同任务冷热两态下 cache-write 量的倍数差
- 能说出刚预热的第三轮为何几乎不写

## 验收问句

> 同一任务冷缓存与热缓存的 {{name}} 差多少倍？

## 先懂这些（前置 1）

- [[KV-cache 命中率]] · **hard** — 缓存冷热决定命中率高低，不懂命中率就理解不了写入量的波动。

## 相关

- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tool-schema tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[Harness token floor]]
- [[Tool-schema tax]]
- [[API-boundary observability]]
- [[KV-cache 命中率]]
