---
id: cm_e17efd1f
name: Tool-schema tax
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Tool-schema tax

> 工具越多、schema 越丰富，每次请求都要附带的静态 token 开销越高，与任务难度无关。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

每次请模型做事前，都先附上一本“所有工具说明书”。工具越多，模型在读用户问题前要先背的说明书越厚。

## 原文 context

Claude Code 27 个工具的 schema 约 99,778 字符，贡献约 24K token；OpenCode 10 个工具约 20,856 字符、4.8K token。工具越多、接口越丰富，静态税越高。

## 掌握证据（做到这些才算会）

- 能对比不同工具数量下的 schema 字符与 token 量级
- 能判断加工具前先算这笔固定成本

## 验收问句

> 再挂三个工具之前，你会怎样估算 {{name}} 的代价？

## 先懂这些（前置 1）

- [[Token count]] · **hard** — 不懂 Token count，就量不出工具数增加带来的每请求静态开销

## 懂了它才能懂（解锁 1）

- [[MCP schema amplification]] — MCP schema 膨胀是工具 schema 税在具体场景下的放大。

## 相关

- [[Baseline-request product]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Configuration multiplier]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Instruction-file tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[MCP schema amplification]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Framework-template repetition]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Subagent bootstrap multiplier]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Cache prefix stability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Cache temperature]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tamper-evident audit trail]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Context-window tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Measurement snapshot]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[工具收窄 tool scoping]] · 常一起用（工作流） — 只暴露当前步骤必要工具可同时降低选择噪声与工具 Schema 静态载荷。
- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[注意力预算 attention budget]] · 常一起用（运行时组成） — 大量工具说明会占用窗口并与任务信息争夺模型处理能力。
- [[Harness token floor]] · 组成（运行时组成） — 工具 Schema 的固定载荷是 Harness Token 底座中可单独测量的一部分。
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Harness token floor]] · related-to（audit） — 方向上是「组成」：tool-schema tax 是 harness token floor 的一个子构件，懂子构件不要求先懂整体；反之整体才需要子构件，应降 soft 或把方向倒过来。

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[Token count]]
- [[注意力预算 attention budget]]
- [[Cache prefix stability]]
- [[Harness token floor]]
- [[Context-window tax]]
- [[Measurement snapshot]]
- [[工具收窄 tool scoping]]
- [[API-boundary observability]]
- [[Baseline-request product]]
- [[Cache temperature]]
- [[Configuration multiplier]]
- [[Framework-template repetition]]
- [[Instruction-file tax]]
- [[MCP schema amplification]]
- [[Subagent bootstrap multiplier]]
- [[Tamper-evident audit trail]]
