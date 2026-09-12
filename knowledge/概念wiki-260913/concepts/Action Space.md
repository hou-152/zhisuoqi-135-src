---
id: cm_86f56dae
name: Action Space
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 2
origin: [context]
aliases: []
sources: 1
---

# Action Space

> 一个 agent 可执行的全部动作与工具的集合，构造它是搭建 harness 最难的部分之一。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

Agent 能做什么，取决于你给它的工具集合。Action space 就是 agent 的「手牌」——工具太少无法完成任务，太多则让模型困惑。关键是设计「刚好匹配模型能力」的工具集。

## 原文 context

One of the hardest parts of building an agent harness is constructing its action space.

## 掌握证据（做到这些才算会）

- 能列出所设计 agent 的可用动作清单
- 能指出缺哪个动作会导致任务做不成

## 验收问句

> {{name}}里包含哪些动作？缺了哪个任务就做不成？

## 先懂这些（前置 1）

- [[Filesystem 作为最基础的 harness 原语]] · **soft** — 文件系统用法是模型最熟练的那部分动作集合，构成动作空间底座。

## 懂了它才能懂（解锁 1）

- [[用工具调用联系人类]] — 把人当可调用资源，前提是动作空间里能容纳人类这个工具。

## 相关

- [[Tool Calling]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Agent Skills]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Subagent]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Elicitation]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-15

## 出场

- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
## 反链

- [[Tool Calling]]
- [[Subagent]]
- [[上下文腐烂 Context Rot]]
- [[渐进式披露 progressive disclosure]]
- [[Agent Skills]]
- [[Elicitation]]
- [[Filesystem 作为最基础的 harness 原语]]
- [[用工具调用联系人类]]
- [[See Like an Agent]]
