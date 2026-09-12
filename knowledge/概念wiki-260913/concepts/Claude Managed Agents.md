---
id: cm_ba8d0829
name: Claude Managed Agents
type: REPRESENTATIONAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.045
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Claude Managed Agents

> 预置、可配置、跑在托管基础设施上的 agent harness：你定义 agent 模板，harness 与 infra 由 Anthropic 提供。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

过去你租的是发动机（模型 API），车架、底盘、车库都得自己搭。Managed Agents 把车架和车库一起租给你，你只需要填一张「这台车怎么配」的表格。

## 原文 context

全文的主题对象。TL;DR 把它定义为一套「预置、可配置、跑在托管基础设施上的 agent harness」：你定义 agent 模板（工具、skills、文件与仓库），harness 和 infra 由 Anthropic 提供，整个系统的设计目标是跟上 Claude 快速增长的智能并支撑长周期任务。

## 掌握证据（做到这些才算会）

- 能列出 agent 模板需定义的工具、skills、文件与仓库三类要素
- 能说明托管侧与使用者侧的责任边界

## 验收问句

> 用 {{name}} 起一个 agent，你定义什么、Anthropic 负责什么？

## 先懂这些（前置 1）

- [[agent 作为 Claude API 的新核心原语]] · **soft** — 托管 harness 的产品形态，建立在 agent 成为 API 原语之上。

## 相关

- [[harness 的过时假设]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[任务时域 task horizon]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[长周期任务的基础设施压力]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Environment]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Session]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[brain hands session 解耦]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[基础设施挑战而非 harness 设计问题]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[触发模式谱系]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[agent 模板的声明式持久化]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[skill 作为 onboarding 载体]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[agent 作为 Claude API 的新核心原语]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[Agent]]
- [[Session]]
- [[agent 模板的声明式持久化]]
- [[harness 的过时假设]]
- [[agent 作为 Claude API 的新核心原语]]
- [[messages API 作为直连网关]]
- [[触发模式谱系]]
- [[基础设施挑战而非 harness 设计问题]]
- [[任务时域 task horizon]]
- [[长周期任务的基础设施压力]]
- [[brain hands session 解耦]]
- [[Environment]]
- [[skill 作为 onboarding 载体]]
