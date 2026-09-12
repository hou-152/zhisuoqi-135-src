---
id: cm_b74eee38
name: model-native harness
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.117
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# model-native harness

> 顺着模型自身擅长方式设计的 harness，让 agent 跨文件、跨工具完成任务。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.117

## 费曼一下

为特定模型量身定制的 harness。与 model-agnostic 的通用框架相比，model-native harness 能让 OpenAI 模型的能力得到最充分的释放——因为运行方式跟模型擅长的模式对齐了。

## 原文 context

a model-native harness that lets agents work across files and tools on a computer… The harness also helps developers unlock more of a frontier model’s capability by aligning execution with the way those models perform best.

## 掌握证据（做到这些才算会）

- 能说出 model-native 与通用 harness 的对齐对象不同
- 能举出 agent 跨文件跨工具跑起来需要哪些支撑

## 验收问句

> {{name}} 与普通 harness 的区别你指得出来吗？

## 先懂这些（前置 2）

- [[Harness Thickness]] · **soft** — 顺着模型设计常对应薄 harness，不懂厚度就难把握取向。
- [[Harness level feature]] · **soft** — 顺着模型设计的前提是知道模型开箱做不到什么。

## 懂了它才能懂（解锁 2）

- [[harness over-fitting]] — 不懂顺着模型设计的 harness，就难理解换 harness 后名次反转。
- [[Hermes Agent]] — 可读源码的 Agent 是 model-native harness 的实例，不懂设计方式就难读结构。

## 相关

- [[native sandbox execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[AGENTS.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[shell tool]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[apply patch tool]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[snapshotting + rehydration]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[exfiltration]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[subagents]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[code mode]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[turnkey yet flexible]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[prompt-injection]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[harness–compute separation]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[舱单]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
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

- [[Agent loop]]
- [[MCP Model Context Protocol]]
- [[Sandbox]]
- [[程序记忆（Procedural Memory Skills） progressive disclosure]]
- [[持久化执行 durable execution]]
- [[Harness level feature]]
- [[Harness Thickness]]
- [[shell tool]]
- [[subagents]]
- [[AGENTS.md]]
- [[exfiltration]]
- [[harness over-fitting]]
- [[harness–compute separation]]
- [[Hermes Agent]]
- [[prompt-injection]]
- [[turnkey yet flexible]]
- [[舱单]]
- [[Agents SDK]]
- [[apply patch tool]]
- [[code mode]]
- [[native sandbox execution]]
- [[snapshotting + rehydration]]
