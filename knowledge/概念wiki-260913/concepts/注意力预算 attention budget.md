---
id: cm_05146d91
name: 注意力预算
nameEn: attention budget
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.154
depth: 1
origin: [context]
aliases: ["attention budget"]
sources: 1
---

# 注意力预算 · attention budget

> 把 LLM 注意力类比为有限的工作记忆预算，每新增一个 token 都要从中支取，故上下文是有限资源。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.154

## 费曼一下

把模型的注意力想成一天的体力。每往它眼前多放一份材料，就要花掉一点体力去看、去比对。材料堆到一定量，人还在，但已经开始眼花——不是不认字了，是顾不过来了。

## 原文 context

文中把 LLM 的注意力类比为人类有限的工作记忆容量——模型在解析大量 context 时从一份预算里支取，「every new token introduced depletes this budget by some amount」。这是 context 必须被当作有限资源、且边际收益递减的直接理由。

## 掌握证据（做到这些才算会）

- 能据此解释长上下文的边际收益递减
- 能对给定任务判断上下文该留多少

## 验收问句

> 你能用 {{name}} 说明为何塞满窗口反而更差吗？

## 先懂这些（前置 1）

- [[有限的工作记忆 limited working memory]] · **hard** — 注意力预算把LLM注意力类比为有限工作记忆，前提是先懂工作记忆有限

## 懂了它才能懂（解锁 4）

- [[选择性注意力压缩]] — 远压近留的分层处理是在有限注意力预算下做的取舍
- [[延迟加载工具 deferred loading]] — 工具按需加载是为不在预算里白占token，先懂预算才懂渐进披露
- [[最小高信号 token 集合 smallest possible set of high-signal tokens]] — 追求最小高信号集合本身就是为了省下有限的注意力预算
- [[注意力之前的注意力 attention before attention]] — 选上下文前的过滤重排是因为预算有限，必须先做取舍

## 相关

- [[性能梯度而非硬悬崖 performance gradient rather than a hard cliff]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[最小高信号 token 集合 smallest possible set of high-signal tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[恰当高度 the right altitude]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[工具即契约 tools as the contract]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[臃肿工具集 bloated tool sets]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[典型示例策展 diverse, canonical examples]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[just in time 上下文检索]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[混合检索策略 hybrid strategy]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[结构化记事 agentic memory]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[sub-agent 架构与关注点分离]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[reasoning effort]] · 对照（概念边界） — 推理强度调节计算投入，注意力预算描述模型处理当前上下文信息的有限能力。
- [[上下文压缩 Context Compression Summarization]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[Tool-schema tax]] · 常一起用（运行时组成） — 大量工具说明会占用窗口并与任务信息争夺模型处理能力。
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 常一起用（概念边界） — 注意力预算是解释框架，不是 Context Rot 的唯一已证实原因。
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

## 别名

`attention budget`

## 反链

- [[上下文腐烂 Context Rot]]
- [[结构化记事 agentic memory]]
- [[渐进式披露 progressive disclosure]]
- [[工具即契约 tools as the contract]]
- [[有限的工作记忆 limited working memory]]
- [[注意力之前的注意力 attention before attention]]
- [[just in time 上下文检索]]
- [[Tool-schema tax]]
- [[上下文压缩 Context Compression Summarization]]
- [[性能梯度而非硬悬崖 performance gradient rather than a hard cliff]]
- [[选择性注意力压缩]]
- [[延迟加载工具 deferred loading]]
- [[臃肿工具集 bloated tool sets]]
- [[最小高信号 token 集合 smallest possible set of high-signal tokens]]
- [[reasoning effort]]
- [[sub-agent 架构与关注点分离]]
- [[典型示例策展 diverse, canonical examples]]
- [[混合检索策略 hybrid strategy]]
- [[恰当高度 the right altitude]]
