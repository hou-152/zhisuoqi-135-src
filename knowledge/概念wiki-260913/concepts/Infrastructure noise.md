---
id: cm_cb97c505
name: Infrastructure noise
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.042
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Infrastructure noise

> 运行时配置与环境差异等基础设施噪声可能显著影响 coding benchmark 分数，解读成绩时需扣除。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

同一个模型在不同工作间里表现会不一样。工具速度、网络、沙箱、依赖和测试环境都会改变结果，所以 harness 评测必须控制环境。

## 原文 context

Anthropic 的 infrastructure noise 资源提醒，运行时配置、环境差异和基础设施噪声可能显著影响 coding benchmark 分数。

## 掌握证据（做到这些才算会）

- 能列举几类会造成噪声的配置或环境差异
- 能说明为何同一模型的不同跑分不必然可比

## 验收问句

> 读 {{name}} 相关成绩时，哪些因素可能污染分数？

## 先懂这些（前置 1）

- [[基准测试的捆绑测量性]] · **soft** — 基础设施噪声是捆绑测量里最隐形的一项，懂了捆绑才知要扣除它。

## 相关

- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Harness 工程 Harness Engineering]]
- [[Context as working memory budget]]
- [[基准测试的捆绑测量性]]
- [[Reliability-critical harness primitives]]
