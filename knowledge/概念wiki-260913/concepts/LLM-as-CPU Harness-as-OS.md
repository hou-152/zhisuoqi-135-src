---
id: cm_75dd4394
name: LLM-as-CPU / Harness-as-OS
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.144
depth: 2
origin: [context, harness]
aliases: []
sources: 2
---

# LLM-as-CPU / Harness-as-OS

> 把 LLM 当作 CPU、把 Harness 当作操作系统的类比框架，用于界定二者的职责边界。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

裸 LLM 像没有外设的 CPU，只会计算。Harness 像操作系统，把内存、硬盘、设备驱动和权限机制组织起来，让计算变成可执行任务。

## 原文 context

“Harness，就是那个操作系统。”

## 掌握证据（做到这些才算会）

- 能用该类比解释模型的裸能力缺口
- 能列出自己 harness 承担的调度、约束、资源管理职责

## 验收问句

> 用 {{name}} 类比解释你的 harness 承担了哪些 OS 职责？

## 先懂这些（前置 1）

- [[非模型架构 Non-model Architecture]] · **soft** — 不懂非模型架构的组成，就分不清 CPU 侧与 OS 侧各自管什么职责

## 懂了它才能懂（解锁 1）

- [[脚手架化 LLM 与冯·诺依曼架构类比]] — 不懂 CPU 与 OS 的职责划分，就做不出上下文窗口=RAM、工具=设备驱动的映射

## 相关

- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[非模型架构 Non-model Architecture]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[Harness]] · related-to（audit） — 类比本身可用于解释 Harness，不懂 Harness 也能理解映射结构，不应是 hard 前置。

## 出场

- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
## 反链

- [[非模型架构 Non-model Architecture]]
- [[AI Agent]]
- [[脚手架化 LLM 与冯·诺依曼架构类比]]
