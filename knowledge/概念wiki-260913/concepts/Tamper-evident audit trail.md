---
id: cm_5205e3fc
name: Tamper-evident audit trail
type: CONCEPTUAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: compute
centrality: 0.045
depth: 0
origin: [context]
aliases: []
sources: 1
---

# Tamper-evident audit trail

> 用哈希链串联请求与响应记录，使内容可被第三方检查、追溯并验证无断裂。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.045

## 费曼一下

每条记录都盖上前一条记录的指纹。中间改掉一页，后面所有指纹都会对不上，因此篡改会留下证据。

## 原文 context

150 条请求与响应被写入 SHA-256 hash chain，并验证无断裂，使 benchmark 数据能被第三方检查、追溯和重建。

## 掌握证据（做到这些才算会）

- 能说明 SHA-256 链如何让事后改动被检出
- 能重建 150 条记录并跑出无断裂的校验结果

## 验收问句

> 你能否为 {{name}} 设计哈希链并验证无断裂？

## 懂了它才能懂（解锁 1）

- [[Ledger of Record]] — 底账的不可篡改性正是哈希链审计机制。

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
- [[Ledger of Record]]
