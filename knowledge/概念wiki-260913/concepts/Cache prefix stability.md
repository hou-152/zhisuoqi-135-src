---
id: cm_b9c659d4
name: Cache prefix stability
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.181
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Cache prefix stability

> 请求前缀在多次运行间保持逐字节一致，才能命中缓存、避免中途重写。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

缓存像按文件指纹找副本。哪怕内容意思一样，只要字节变化，系统就会当成新文件重新存一次。

## 原文 context

OpenCode 的 tools、system 与 message prefix 在 run 间 byte-identical；Claude Code 的 request class、system bytes 和 scaffolding 会变化，导致新的 cache entry 与中途重写。

## 掌握证据（做到这些才算会）

- 能对比两版提示指出哪些字节变化会破坏前缀
- 能解释 byte-identical 与缓存命中率的关系

## 验收问句

> 改了 system prompt 后，{{name}} 会怎样影响缓存命中？

## 先懂这些（前置 1）

- [[前缀匹配 Prefix Matching]] · **soft** — 不懂前缀匹配，就做不了Cache prefix stability的判定（前缀是否逐字节一致到能命中）。

## 懂了它才能懂（解锁 2）

- [[缓存连续性 Cache Continuity]] — 不懂Cache prefix stability，就做不了缓存连续性的维护（不切模型、不混分支以保持前缀一致）。
- [[Cache temperature]] — 不懂Cache prefix stability，就做不了Cache temperature的归因（漂移导致整段重写）。

## 相关

- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tool-schema tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[前缀匹配 Prefix Matching]]
- [[Harness token floor]]
- [[缓存连续性 Cache Continuity]]
- [[Tool-schema tax]]
- [[API-boundary observability]]
- [[Cache temperature]]
