---
id: cm_f2871b54
name: Harness 内 RL
nameEn: RL inside the harness
type: CONCEPTUAL
subject: Harness Engineering
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.042
depth: 1
origin: [harness]
aliases: ["RL inside the harness"]
sources: 1
---

# Harness 内 RL · RL inside the harness

> 用即将发布的确切工具集在 harness 内部对模型做 RL，而非事后适配，这是工具调用成功率优势的来源。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

同样是教人用一套厨具做菜，一种方法是写一本详尽的操作手册（打磨 harness）；另一种是从头把这个人训练成只会、且特别擅长用这套厨具的厨师（在 harness 内部做 RL）。前者进步有上限，后者能把工具和使用者拧成一体。

## 原文 context

作者给出的"Claude Code 为什么能赢"的解释——aider、cline、codebuff 等 CLI agent 更早出现、工具集和上下文工程也不差，但工具调用时常失败；Claude Code 的优势在于 Anthropic 第一次拿着即将发布的那套确切工具去 RL 训练模型本身，而不是事后适配。OpenAI 团队 11 月的演讲把这一点讲透：不掌握权重、无法在 harness 内部做 RL，就永远落后于同时拥有两者的团队。

## 掌握证据（做到这些才算会）

- 能说明为何事后适配不如训练时对齐
- 能解释同时掌握权重与 harness 的团队为何领先

## 验收问句

> 为什么 {{name}} 比事后适配工具更有优势？

## 先懂这些（前置 1）

- [[模型训练与 harness 设计的耦合]] · **hard** — Harness内RL正是耦合的落地，不懂耦合就抓不住其动机。

## 相关

- [[Lights-off 软件工厂]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[软件工厂 Software Factory]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-23

## 出场

- Harness Engineering ｜ 《为什么「软件工厂」会失败：光有 harness 工程还不够》 ｜ https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md

## 别名

`RL inside the harness`

## 反链

- [[模型训练与 harness 设计的耦合]]
- [[软件工厂 Software Factory]]
- [[Lights-off 软件工厂]]
