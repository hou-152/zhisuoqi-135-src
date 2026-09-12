---
id: cm_ca2c1a03
name: MCP schema amplification
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 2
origin: [context]
aliases: []
sources: 1
---

# MCP schema amplification

> 每个小型 MCP server 每请求约增 1000-1400 token，生产级 API 的 schema 更大，并与请求次数相乘。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

每接入一个外部系统，就要给模型多发一份接口手册。连接越多，每封信的附件越厚。

## 原文 context

小型 MCP server 每个每请求约增加 1,000 到 1,400 token；生产级丰富 API 的 schema 可能更大，并与请求次数相乘。

## 掌握证据（做到这些才算会）

- 能估算挂载 N 个 MCP server 的每轮 token 开销
- 能判断哪些 server 该常驻、哪些该按需加载

## 验收问句

> 挂载多个 MCP server 时，{{name}} 会怎样放大你的每轮成本？

## 先懂这些（前置 1）

- [[Tool-schema tax]] · **soft** — MCP schema 膨胀是工具 schema 税在具体场景下的放大。

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
