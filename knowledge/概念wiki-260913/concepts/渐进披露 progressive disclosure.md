---
id: cm_99c2938a
name: 渐进披露
nameEn: progressive disclosure
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [context]
aliases: ["progressive disclosure"]
sources: 1
---

# 渐进披露 · progressive disclosure

> 在正确的时机加载正确的上下文，而不是一次性把所有信息常驻在 system prompt 里。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

不要开场就把整本手册念完，而是把手册放在它伸手就能拿到的地方。上下文的稀缺性决定了：能延后加载的东西，就不该提前占位。

## 原文 context

贯穿全文的机制，定义是「在正确的时机加载正确的上下文」。Claude Code 把 verification 与 code review 从 system prompt 挪进可被选择调用的 skill；CLAUDE.md 一节也要求「大量使用」它。

## 掌握证据（做到这些才算会）

- 能把常驻提示词的内容改造成按需选择调用的 skill
- 能举出把 verification、code review 挪进 skill 的实例

## 验收问句

> {{name}} 对 system prompt 的设计提出了什么要求？

## 先懂这些（前置 1）

- [[检索与推理的双任务负担]] · **soft** — 不懂【检索与推理的双任务负担】，就做不了【渐进披露】中「判断哪些信息该延后加载」这件事

## 相关

- [[护栏型指令的过期]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[判断力优先 let Claude use judgement]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[程序记忆（Procedural Memory Skills） progressive disclosure]] · 常一起用 — 渐进披露既用于 Skill，也用于工具定义的延迟加载。
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-21

## 出场

- Context Engineering ｜ 《Claude 5 世代的上下文工程，规则变了》 ｜ https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models

## 别名

`progressive disclosure`

## 反链

- [[判断力优先 let Claude use judgement]]
- [[护栏型指令的过期]]
- [[检索与推理的双任务负担]]
- [[程序记忆（Procedural Memory Skills） progressive disclosure]]
