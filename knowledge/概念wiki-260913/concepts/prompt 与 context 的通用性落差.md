---
id: cm_136dab9c
name: prompt 与 context 的通用性落差
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# prompt 与 context 的通用性落差

> prompt 可以很具体，context 要跨很多请求通用，因此做不到那么具体。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

一次性便签可以写"今天下午三点把这份合同送到 A 公司"；但贴在墙上给所有人长期看的规程，只能写"外送文件要登记签收"。后者越想写具体，越容易在某些场景下变成错的。

## 原文 context

作者点出的核心结构性难点——"和 prompt 不同，context 会被跨很多请求通用使用，所以它不可能那么具体"。由此引出全文要解决的问题：在不知道用户会问什么的前提下，如何写通用的指引。

## 掌握证据（做到这些才算会）

- 能说明为何通用指引必然更模糊
- 能举出一个由此产生的设计难题

## 验收问句

> {{name}} 为什么让「写通用指引」这件事变难？

## 先懂这些（前置 1）

- [[prompt completion]] · **hard** — 该落差讲的是 prompt 与 context 可具体程度之差，先要知道 prompt 是什么

## 相关

- [[冲突指令的隐性成本]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[护栏与判断力的取舍 guardrail tradeoff]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[从禁止什么到对齐什么]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[示例会收窄探索空间]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[接口即指令 design interfaces]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[延迟加载工具与 ToolSearch]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[指令就近原则]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[Rubrics 与验证 agent]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[gotchas 优先的 CLAUDE.md]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[上下文文件树 tree of files]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[自动记忆 auto-memory]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[富引用 rich references]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[过度约束与松绑 over-constraining unhobbling]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-22

## 出场

- Context Engineering ｜ 《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》 ｜ https://x.com/trq212/status/2080710971228918066/?s=12
## 反链

- [[gotchas 优先的 CLAUDE.md]]
- [[渐进式披露 progressive disclosure]]
- [[接口即指令 design interfaces]]
- [[prompt completion]]
- [[Rubrics 与验证 agent]]
- [[冲突指令的隐性成本]]
- [[从禁止什么到对齐什么]]
- [[示例会收窄探索空间]]
- [[延迟加载工具与 ToolSearch]]
- [[指令就近原则]]
- [[富引用 rich references]]
- [[上下文文件树 tree of files]]
- [[自动记忆 auto-memory]]
- [[过度约束与松绑 over-constraining unhobbling]]
- [[护栏与判断力的取舍 guardrail tradeoff]]
