---
id: cm_b74eee38
name: model-native harness
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# model-native harness

> 顺着模型自身擅长方式设计的 harness，让 agent 跨文件、跨工具完成任务。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

为特定模型量身定制的 harness。与 model-agnostic 的通用框架相比，model-native harness 能让 OpenAI 模型的能力得到最充分的释放——因为运行方式跟模型擅长的模式对齐了。

## 原文 context

a model-native harness that lets agents work across files and tools on a computer… The harness also helps developers unlock more of a frontier model’s capability by aligning execution with the way those models perform best.

## 掌握证据（做到这些才算会）

- 能说出 model-native 与通用 harness 的对齐对象不同
- 能举出 agent 跨文件跨工具跑起来需要哪些支撑

## 验收问句

> {{name}} 与普通 harness 的区别你指得出来吗？

## 先懂这些（前置 1）

- [[harness 厚薄 thin vs thick]] · **soft** — 不懂【harness 厚薄】，就做不了【model-native harness】中把多少逻辑交给模型的取舍。

## 懂了它才能懂（解锁 1）

- [[harness over-fitting]] — 不懂【model-native harness】，就做不了【harness over-fitting】中“模型在自家 harness 上后训练”的机制解释。

## 相关

- [[native sandbox execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[AGENTS.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[apply patch tool]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[snapshotting + rehydration]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[exfiltration]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[subagents]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[prompt-injection]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[code mode]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[turnkey yet flexible]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness Thickness]] · related-to（audit） — 厚度只是对比视角之一，不懂厚度也能理解顺着模型设计的 harness。
- [[Harness level feature]] · related-to（audit） — 只需对模型能力边界有大致认知即可，harness level feature 的完整清单不是理解 model-native harness 的必需前置。
- [[Hermes Agent]] · rejected（audit） — Hermes Agent 是开源实例，理解它不依赖先懂 model-native harness；最多是读源码有帮助。
- [[shell tool]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[harness–compute separation]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[harness over-fitting]] · related-to（audit） — over-fitting 的核心是后训练与特定 harness 耦合，不必先懂 model-native harness 概念。
- [[MCP Model Context Protocol]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Sandbox]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[程序记忆（Procedural Memory Skills） progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[Sandbox]]
- [[持久化执行 durable execution]]
- [[Agent loop]]
- [[MCP Model Context Protocol]]
- [[AGENTS.md]]
- [[exfiltration]]
- [[harness 厚薄 thin vs thick]]
- [[Harness level feature]]
- [[harness–compute separation]]
- [[prompt-injection]]
- [[snapshotting + rehydration]]
- [[subagents]]
- [[Agents SDK]]
- [[harness over-fitting]]
- [[Harness Thickness]]
- [[native sandbox execution]]
- [[shell tool]]
- [[程序记忆（Procedural Memory Skills） progressive disclosure]]
- [[apply patch tool]]
- [[code mode]]
- [[Hermes Agent]]
- [[turnkey yet flexible]]
