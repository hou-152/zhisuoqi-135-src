---
id: cm_bf008303
name: 判断力优先
nameEn: let Claude use judgement
type: CONCEPTUAL
subject: Context Engineering
domain: spec-intent
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["let Claude use judgement"]
sources: 1
---

# 判断力优先 · let Claude use judgement

> 把结论式规定换成取向式指令，只给对齐对象与判断依据，具体决策留给模型的判断力。

**领域** spec-intent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

不说「注释一行封顶」，而说「跟周围的代码一个样」。前者是替它决定，后者是告诉它拿什么当参照，剩下的它自己看着办。

## 原文 context

第一组 then / now 的落点。做法是把结论式规定换成取向式指令，例如新 system prompt 那句 "Write code that reads like the surrounding code: match its comment density, naming, and idiom."——给对齐对象，不给具体答案。

## 掌握证据（做到这些才算会）

- 能指出 system prompt 里哪些句子是结论式规定、哪些是取向式指令
- 能把一条硬编码规则改写为『对齐周围代码风格』式的取向指令

## 验收问句

> 这段 system prompt 里，哪些规定该按{{name}}改成取向式指令？

## 相关

- [[示例的探索空间约束]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[工具接口的表达力设计]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[延迟加载工具 deferred loading]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[Rubric 与 verifier agent]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[gotchas 优先原则]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[代码即高保真引用]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[渐进披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[上下文文件树 tree of files]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[自动记忆 auto-memory]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[富引用 rich references]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[护栏型指令的过期]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-21

## 出场

- Context Engineering ｜ 《Claude 5 世代的上下文工程，规则变了》 ｜ https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models

## 别名

`let Claude use judgement`

## 反链

- [[工具接口的表达力设计]]
- [[示例的探索空间约束]]
- [[Rubric 与 verifier agent]]
- [[延迟加载工具 deferred loading]]
- [[gotchas 优先原则]]
- [[富引用 rich references]]
- [[上下文文件树 tree of files]]
- [[自动记忆 auto-memory]]
- [[代码即高保真引用]]
- [[护栏型指令的过期]]
- [[渐进披露 progressive disclosure]]
