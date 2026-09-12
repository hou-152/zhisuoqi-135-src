---
id: cm_859f857b
name: Elicitation
type: PROCEDURAL
subject: Context Engineering
domain: spec-intent
learningStage: when-needed
verification: use
centrality: 0.067
depth: 0
origin: [context]
aliases: []
sources: 1
---

# Elicitation

> 通过主动提问把用户未说清的需求、偏好与约束引出来，即信息引出能力。

**领域** spec-intent ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

Agent 主动向用户提问以获取关键信息的能力。好的 elicitation 能降低用户回答的摩擦，提高人机通信带宽——一问一答就能快速对齐，而不是往复拉扯。

## 原文 context

When building the AskUserQuestion tool, our goal was to improve Claude's ability to ask questions (often called elicitation).

## 掌握证据（做到这些才算会）

- 能设计多轮提问把模糊需求收敛成明确规格
- 能在信息不足时先提问而不是猜测

## 验收问句

> 需求模糊时，{{name}} 该问出哪些关键问题？

## 懂了它才能懂（解锁 2）

- [[意图规约与可引导性]] — 该瓶颈的核心就是引出、规约与理解意图，不懂信息引出便无从谈起。
- [[bits]] — bits 指描述意图的信息量不足，需要靠信息引出把缺失部分补上。

## 相关

- [[Tool Calling]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Agent Skills]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Subagent]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Action Space]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-15

## 出场

- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
## 反链

- [[上下文腐烂 Context Rot]]
- [[渐进式披露 progressive disclosure]]
- [[Subagent]]
- [[Action Space]]
- [[Agent Skills]]
- [[意图规约与可引导性]]
- [[bits]]
- [[See Like an Agent]]
- [[Tool Calling]]
