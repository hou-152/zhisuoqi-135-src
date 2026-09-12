---
id: cm_c88b81b3
name: Harness evolution
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.092
depth: 5
origin: [harness]
aliases: []
sources: 1
---

# Harness evolution

> harness 本身可在任务、trace、benchmark 与隔离实验中持续改进，相关工具如 Harness Evolver 与 Harbor。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.092

## 费曼一下

我们不只是用 agent 做项目，也可以用评测和实验不断改造 agent 的工作环境，让它下一次更稳、更少犯同类错误。

## 原文 context

Harness Evolver、Harbor 和 eval-oriented resources 指向一个方向：harness 本身可以在任务、trace、benchmark 和隔离实验中持续改进。

## 掌握证据（做到这些才算会）

- 能说出用哪些信号驱动 harness 改进
- 能举出至少一个相关工具或资源名

## 验收问句

> {{name}} 靠哪些信号来推动 harness 本身的改进？

## 先懂这些（前置 2）

- [[Harness 组件生命周期]] · **hard** — 组件假设会过期，才需要持续演进 harness。
- [[harness over-fitting]] · **soft** — 模型与 harness 耦合导致换 harness 失效，才需持续演进隔离验证。

## 懂了它才能懂（解锁 1）

- [[service template 与 golden path]] — 类比 harness 按拓扑挑选，需先懂 harness 会持续演进。

## 相关

- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Harness 工程 Harness Engineering]]
- [[Context as working memory budget]]
- [[harness over-fitting]]
- [[Reliability-critical harness primitives]]
- [[Harness 组件生命周期]]
- [[service template 与 golden path]]
