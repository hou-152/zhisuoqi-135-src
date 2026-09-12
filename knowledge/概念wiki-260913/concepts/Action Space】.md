---
id: cm_86f56dae
name: Action Space】
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.099
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Action Space】

> 行动空间指 agent 可选择的动作集合，构建它是打造 agent harness 最难的部分之一。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.099

## 费曼一下

Agent 能做什么，取决于你给它的工具集合。Action space 就是 agent 的「手牌」——工具太少无法完成任务，太多则让模型困惑。关键是设计「刚好匹配模型能力」的工具集。

## 原文 context

One of the hardest parts of building an agent harness is constructing its action space.

## 掌握证据（做到这些才算会）

- 能说明行动空间在 harness 中的位置
- 能列出构建行动空间时需权衡的取舍

## 验收问句

> 构建 {{name}} 为什么被列为 harness 最难的部分？

## 先懂这些（前置 1）

- [[agent 与 harness 的分工]] · **hard** — 先分清 agent 与 harness，才知道行动空间由哪一侧构建与约束。

## 懂了它才能懂（解锁 2）

- [[action space 膨胀]] — 膨胀是对行动空间规模变化的描述，不懂行动空间就不知在膨胀什么。
- [[用工具调用联系人类]] — 把人当可调用资源，前提是理解工具调用构成的行动空间。

## 相关

- [[Tool Calling】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Agent Skills】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Subagent】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Elicitation】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-15

## 出场

- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
## 反链

- [[agent 与 harness 的分工]]
- [[上下文腐烂 Context Rot]]
- [[Subagent】]]
- [[渐进式披露 progressive disclosure]]
- [[Agent Skills】]]
- [[Elicitation】]]
- [[用工具调用联系人类]]
- [[action space 膨胀]]
- [[See Like an Agent】]]
- [[Tool Calling】]]
