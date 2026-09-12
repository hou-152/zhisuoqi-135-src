---
id: cm_33922d87
name: Configuration multiplier
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: compute
centrality: 0.072
depth: 2
origin: [context]
aliases: []
sources: 1
---

# Configuration multiplier

> 指令文件、MCP schema、插件与工作流模板叠加在 harness 基线上，使真实配置 token 膨胀约 12 倍。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.072

## 费曼一下

软件出厂重量只是底盘；装上工具箱、行李架和货物后，真正上路的重量可能完全不同。

## 原文 context

Instruction file、MCP schema、plugin 与 workflow template 会叠加在 harness floor 上。真实 OpenCode 配置从约 7K floor 增至 90,817 token，约 12 倍。

## 掌握证据（做到这些才算会）

- 能拆出自己配置里各项叠加的 token 占比
- 能从基线算出实际配置的放大倍数

## 验收问句

> {{name}} 是怎么把 7K 基线放大到九万 token 的？

## 先懂这些（前置 1）

- [[Harness token floor]] · **hard** — 配置膨胀是在 harness 基线之上做倍数放大。

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
