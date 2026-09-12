---
id: cm_066bbed0
name: Agent Drift
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.045
depth: 2
origin: [context]
aliases: []
sources: 1
---

# Agent Drift

> agent 在长任务中逐渐失去连贯性的现象；Anthropic 内部研究指其几乎全是上下文管理问题。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

Agent 做着做着"跑偏了"——忘记初始目标、风格前后不一、重复犯同类错误。大多数人以为是模型推理能力不足，但 Anthropic 的研究指出根因是 context 管理失败：随着任务推进，相关信息被稀释、关键指令被遗忘、噪音累积。

## 原文 context

Anthropic 内部研究发现：agent drift（AI 在长任务中逐渐失去连贯性）几乎完全是 **context management 问题**，而非 reasoning 问题。

## 掌握证据（做到这些才算会）

- 能复述该结论并区分其与 reasoning 问题
- 能针对长任务给出缓解 drift 的上下文做法

## 验收问句

> {{name}} 的根因是 context 还是 reasoning，依据是什么？

## 先懂这些（前置 1）

- [[Context Management 四策略]] · **soft** — 漂移几乎全源于上下文管理问题，对策即四策略

## 相关

- [[Codified Context]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Knowledge Graph vs Flat Files]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Self-Improving Context System]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Tacit Knowledge】]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Context 四种失败模式】 Context Pollution Distraction Confusion Clash]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-25

## 出场

- Context Engineering ｜ 《上下文工程：AI 时代的核心能力》 ｜ https://x.com/nyk_builderz/status/2031581912071127158/?s=12&rw_tt_thread=True
## 反链

- [[Context Management 四策略]]
- [[渐进式披露 progressive disclosure]]
- [[Codified Context]]
- [[Context 四种失败模式】 Context Pollution Distraction Confusion Clash]]
- [[Knowledge Graph vs Flat Files]]
- [[Self-Improving Context System]]
- [[Tacit Knowledge】]]
