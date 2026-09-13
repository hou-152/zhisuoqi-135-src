---
id: cm_bf008303
name: 判断力优先
nameEn: let Claude use judgement
type: CONCEPTUAL
subject: Context Engineering
domain: spec-intent
learningStage: when-needed
verification: judge
centrality: 0.181
depth: 1
origin: [context]
aliases: ["let Claude use judgement"]
sources: 1
---

# 判断力优先 · let Claude use judgement

> 把结论式规定换成取向式指令，只给对齐对象与判断依据，具体决策留给模型的判断力。

**领域** spec-intent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

不说「注释一行封顶」，而说「跟周围的代码一个样」。前者是替它决定，后者是告诉它拿什么当参照，剩下的它自己看着办。

## 原文 context

第一组 then / now 的落点。做法是把结论式规定换成取向式指令，例如新 system prompt 那句 "Write code that reads like the surrounding code: match its comment density, naming, and idiom."——给对齐对象，不给具体答案。

## 掌握证据（做到这些才算会）

- 能指出 system prompt 里哪些句子是结论式规定、哪些是取向式指令
- 能把一条硬编码规则改写为『对齐周围代码风格』式的取向指令

## 验收问句

> 这段 system prompt 里，哪些规定该按{{name}}改成取向式指令？

## 先懂这些（前置 2）

- [[mind meld]] · **soft** — 不懂【mind meld】，就做不了「只给对齐对象与判断依据、决策交给模型」这件事
- [[目标清楚 + 结果好验收]] · **soft** — 不懂【目标清楚 + 结果好验收】，就判断不了能否把具体决策交给模型的判断力

## 懂了它才能懂（解锁 1）

- [[从禁止什么到对齐什么]] — 不懂【判断力优先】，就做不了【从"禁止什么"到"对齐什么"】里「把禁令换成只给对齐对象与判断依据」的改写

## 相关

- [[工具接口的表达力设计]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[延迟加载工具 deferred loading]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[代码即高保真引用]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[示例的探索空间约束]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[渐进披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[Rubric 与 verifier agent]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[gotchas 优先原则]] · 同篇出现（co-occurrence） — 同篇出现：context-21
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

- [[上下文文件树 tree of files]]
- [[从禁止什么到对齐什么]]
- [[工具接口的表达力设计]]
- [[目标清楚 + 结果好验收]]
- [[gotchas 优先原则]]
- [[Rubric 与 verifier agent]]
- [[自动记忆 auto-memory]]
- [[护栏型指令的过期]]
- [[渐进披露 progressive disclosure]]
- [[延迟加载工具 deferred loading]]
- [[mind meld]]
- [[富引用 rich references]]
- [[代码即高保真引用]]
- [[示例的探索空间约束]]
