---
id: cm_561b8021
name: harness over-fitting
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# harness over-fitting

> 前沿模型在自家 harness 上后训练，与特定工具深度耦合；换到没见过的 harness 后名次可能反转。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

模型和它出生的那副装备磨合得太熟，既可能是优势，也可能是路径依赖。「官方配置最好」是个待验证的假设，不是定律。

## 原文 context

前沿模型在自家 harness 上做后训练，因此 Codex 模型与 apply_patch 深度耦合（OpenCode 不得不专门补一个同名工具）；但反面证据同样存在——Terminal Bench 2.0 上 Opus 4.6 在 Claude Code 里排第 33，换到后训练时没见过的 harness 里排第 5。

## 掌握证据（做到这些才算会）

- 能举出 Codex 与 apply_patch 深度耦合的例子
- 能说明 Terminal Bench 上名次反转说明了什么

## 验收问句

> {{name}} 的正反两面证据分别是什么？

## 先懂这些（前置 1）

- [[model-native harness]] · **soft** — 不懂【model-native harness】，就做不了【harness over-fitting】中“模型在自家 harness 上后训练”的机制解释。

## 相关

- [[Harness evolution]] · related-to（audit） — harness 演进动机多元，over-fitting 只是其中一个促因，不构成理解依赖。
- [[Trace-based evals]] · 常一起用（工作流） — 固定模型、任务与评测条件的跨 Harness 轨迹比较可检验泛化下降。
- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[model-native harness]] · related-to（audit） — over-fitting 的核心是后训练与特定 harness 耦合，不必先懂 model-native harness 概念。
- [[Harness 工程 Harness Engineering]] · 常一起用（工作流） — Harness Engineering 需要用真实任务比较原生与替代接口，而不是假设官方配置恒优。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
## 反链

- [[model-native harness]]
- [[Trace-based evals]]
- [[Harness evolution]]
- [[configuration problem]]
