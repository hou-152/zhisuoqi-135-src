---
id: cm_f4ee6204
name: Context 四种失败模式】
nameEn: Context Pollution / Distraction / Confusion / Clash
type: REPRESENTATIONAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.045
depth: 2
origin: [context]
aliases: ["Context Pollution / Distraction / Confusion / Clash"]
sources: 1
---

# Context 四种失败模式】 · Context Pollution / Distraction / Confusion / Clash

> 把上下文失效归为污染、分心、混淆、冲突四类，统一解法是不倾倒、只策展。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

- **Pollution**：坏信息进窗口，下游全部继承错误，雪球越滚越大
- **Distraction**：200K 窗口塞了 180K 噪音，模型对一切 roughly equal weight，相关信号被淹没
- **Confusion**：50 个 tool definitions 堆在 system prompt，模型不知道用哪个
- **Clash**：[CLAUDE.md](http://claude.md/) 说 pnpm，README 说 npm——模型随机选一个，行为不可预测

## 原文 context

每一个 AI 失败都可以映射到四种 context 失败之一。**统一解法**: Don't dump, curate.（不要倾倒，要策展。）

## 掌握证据（做到这些才算会）

- 能把一次失败映射到四类中的一类
- 能说明 Don't dump, curate 的具体做法

## 验收问句

> 用 {{name}} 把这次失败归类，并给出解法？

## 先懂这些（前置 1）

- [[上下文工程 context engineering]] · **hard** — 污染/分心/混淆/冲突是上下文工程要解决的失效分类，先懂工程才知其意

## 相关

- [[Codified Context]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Knowledge Graph vs Flat Files]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Self-Improving Context System]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Tacit Knowledge】]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Agent Drift]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-25

## 出场

- Context Engineering ｜ 《上下文工程：AI 时代的核心能力》 ｜ https://x.com/nyk_builderz/status/2031581912071127158/?s=12&rw_tt_thread=True

## 别名

`Context Pollution / Distraction / Confusion / Clash`

## 反链

- [[上下文工程 context engineering]]
- [[渐进式披露 progressive disclosure]]
- [[Agent Drift]]
- [[Codified Context]]
- [[Knowledge Graph vs Flat Files]]
- [[Self-Improving Context System]]
- [[Tacit Knowledge】]]
