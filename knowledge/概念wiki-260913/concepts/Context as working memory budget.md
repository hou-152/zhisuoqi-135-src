---
id: cm_f5d40204
name: Context as working memory budget
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.092
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Context as working memory budget

> 把上下文窗口当有限工作记忆经营，配套 KV-cache 局部性、文件系统记忆、压缩与背压。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.092

## 费曼一下

agent 的上下文像一张工作台。好 harness 不是把所有材料倒上去，而是只摆当前任务真正需要的工具、图纸和失败记录。

## 原文 context

Anthropic、Manus、OpenHands 和 HumanLayer 相关资源都把上下文窗口视为有限工作记忆，强调 KV-cache locality、filesystem memory、context condensation 和 backpressure。

## 掌握证据（做到这些才算会）

- 能列出这套工作记忆管理的几种手段
- 能说明上下文为何是稀缺而非越大越好

## 验收问句

> 按 {{name}} 的观点，上下文该被当成什么来管？

## 懂了它才能懂（解锁 3）

- [[Context Management 四策略]] — 四策略就是把窗口当内存预算来经营，没有预算观就没有这些策略
- [[Context-window tax]] — 固定内容占用的是有限窗口容量，预算视角才让这笔税可量化
- [[instruction budget]] — 把注意力当作有限的窗口额度，才谈得上这份预算是共用的

## 相关

- [[Repo-local instructions]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Safe autonomy]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Spec-driven agent workflow]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Infrastructure noise]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness-level benchmarks]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Runtime-harness separation]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Long-running agent handoff]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness evolution]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Trace-based evals]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Long-running agent handoff]]
- [[Context Management 四策略]]
- [[Harness evolution]]
- [[Runtime-harness separation]]
- [[Reliability-critical harness primitives]]
- [[Safe autonomy]]
- [[Spec-driven agent workflow]]
- [[Trace-based evals]]
- [[Context-window tax]]
- [[Harness-level benchmarks]]
- [[Infrastructure noise]]
- [[instruction budget]]
- [[Repo-local instructions]]
