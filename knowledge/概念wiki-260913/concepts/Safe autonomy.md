---
id: cm_6db6f598
name: Safe autonomy
type: CONCEPTUAL
subject: Harness Engineering
domain: safety-governance
learningStage: now
verification: judge
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Safe autonomy

> 在降低人工审批摩擦的同时保留权限边界与安全控制，让 Agent 能自主推进又不越界。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

让 agent 自主不是把钥匙全给它，而是把它放进有护栏的工作间。它能高效做事，但危险动作被隔离、记录或要求确认。

## 原文 context

Anthropic 的 sandboxing、MCP code execution、tool design，以及 OpenHands 的 prompt injection 防护，都在讨论如何降低审批摩擦，同时保留权限边界和安全控制。

## 掌握证据（做到这些才算会）

- 能指出审批摩擦与权限边界的取舍点，并举出沙箱、工具设计两类手段
- 能判断某个自主执行方案里哪些动作必须保留人工确认

## 验收问句

> {{name}} 的边界在哪，哪些动作必须被拦下？

## 先懂这些（前置 1）

- [[权限与推理的架构分离]] · **soft** — 自主推进同时不越界，前提是权限与推理已架构分离

## 相关

- [[审批疲劳]] · related-to（audit） — 审批疲劳是 Safe autonomy 的动机背景而非前置；其定义（降低审批摩擦＋保留权限边界）不依赖该概念即可理解，宜降级或删除。
- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Harness 工程 Harness Engineering]]
- [[权限与推理的架构分离]]
- [[Context as working memory budget]]
- [[审批疲劳]]
- [[Reliability-critical harness primitives]]
