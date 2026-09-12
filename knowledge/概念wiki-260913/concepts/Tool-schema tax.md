---
id: cm_e17efd1f
name: Tool-schema tax
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 0
origin: [context]
aliases: []
sources: 1
---

# Tool-schema tax

> 工具越多、schema 越丰富，每次请求都要附带的静态 token 开销越高，与任务难度无关。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

每次请模型做事前，都先附上一本“所有工具说明书”。工具越多，模型在读用户问题前要先背的说明书越厚。

## 原文 context

Claude Code 27 个工具的 schema 约 99,778 字符，贡献约 24K token；OpenCode 10 个工具约 20,856 字符、4.8K token。工具越多、接口越丰富，静态税越高。

## 掌握证据（做到这些才算会）

- 能对比不同工具数量下的 schema 字符与 token 量级
- 能判断加工具前先算这笔固定成本

## 验收问句

> 再挂三个工具之前，你会怎样估算 {{name}} 的代价？

## 懂了它才能懂（解锁 2）

- [[Harness token floor]] — 工具 Schema 的固定载荷是 Harness Token 底座中可单独测量的一部分。
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
- [[Context-window tax]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Tamper-evident audit trail]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[Measurement snapshot]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[工具收窄 tool scoping]] · 常一起用（工作流） — 只暴露当前步骤必要工具可同时降低选择噪声与工具 Schema 静态载荷。
- [[API-boundary observability]] · 同篇出现（co-occurrence） — 同篇出现：context-19
- [[注意力预算 attention budget]] · 常一起用（运行时组成） — 大量工具说明会占用窗口并与任务信息争夺模型处理能力。
- [[Harness token floor]] · 组成（运行时组成） — 工具 Schema 的固定载荷是 Harness Token 底座中可单独测量的一部分。
- [[Harness token floor]] · 同篇出现（co-occurrence） — 同篇出现：context-19

## 出场

- Context Engineering ｜ 《Claude Code 在读提示词前为何已发送 3.3 万 Token》 ｜ https://systima.ai/blog/claude-code-vs-opencode-token-overhead
## 反链

- [[注意力预算 attention budget]]
- [[Harness token floor]]
- [[工具收窄 tool scoping]]
- [[Context-window tax]]
- [[Instruction-file tax]]
- [[API-boundary observability]]
- [[Baseline-request product]]
- [[Cache temperature]]
- [[Configuration multiplier]]
- [[Framework-template repetition]]
- [[MCP schema amplification]]
- [[Measurement snapshot]]
- [[Subagent bootstrap multiplier]]
- [[Tamper-evident audit trail]]
- [[Cache prefix stability]]
