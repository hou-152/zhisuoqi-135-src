---
id: cm_dafd9d2f
name: Instruction-file tax
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.042
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Instruction-file tax

> 过大的 AGENTS.md/CLAUDE.md 会在每个请求上多花大量 token，且是否被识别取决于 harness 与启动方式。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

仓库说明不是只在开工前读一次，而是每次和模型说话都重新夹带一份。文件越长、轮次越多，重复成本越大。

## 原文 context

72KB AGENTS.md 或 CLAUDE.md 为两种 harness 每个请求增加约 20K token，而且文件是否被识别取决于 harness 与启动方式。

## 掌握证据（做到这些才算会）

- 能估算 72KB 指令文件折算的每请求 token 开销
- 能说明同一文件在不同 harness 下是否生效

## 验收问句

> {{name}} 的成本会在哪一步体现出来？

## 先懂这些（前置 1）

- [[agentfile CLAUDE.md 与 AGENTS.md]] · **hard** — 该税指的正是 AGENTS.md/CLAUDE.md 的 token 开销，不懂 agentfile 就无从谈税。

## 相关

- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tool-schema tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[Harness token floor]]
- [[Tool-schema tax]]
- [[agentfile CLAUDE.md 与 AGENTS.md]]
- [[API-boundary observability]]
