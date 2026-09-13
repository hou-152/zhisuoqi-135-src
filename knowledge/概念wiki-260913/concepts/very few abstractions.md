---
id: cm_3211d04e
name: very few abstractions
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# very few abstractions

> SDK 定位宣言：只暴露很小一组原语，抽象极少，学习曲线平缓。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

每多一层抽象，你就多一次翻译成本：出问题时要把框架的说法翻回你自己的说法。抽象极少的意思是，框架只发明它非发明不可的那几个词，剩下的用你本来就会的语言说。

## 原文 context

这是全文的第一句主张，也是 SDK 的定位宣言——build agentic AI apps in a lightweight, easy-to-use package with very few abstractions。它由「a very small set of primitives」和「without a steep learning curve」两处表述反复印证。

## 掌握证据（做到这些才算会）

- 能指出该主张由哪些表述反复印证
- 能用它判断一个 agent SDK 是否过度封装

## 验收问句

> {{name}} 对 SDK 设计意味着什么取舍？

## 相关

- [[Handoffs Agents as tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Python-first]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Function tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[MCP server tool calling]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Sandbox agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Human in the loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Tracing]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[turnkey yet flexible]] · related-to（audit） — 抽象极少是该取向的机制之一，但不是理解 turnkey yet flexible 的必需前置。
- [[Sessions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[higher-level runtime]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Guardrails]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · related-to（audit） — '极少抽象'的定位宣言不是理解原语的前提，反而更像由原语反推出来的说法；方向可疑，宜降 soft。
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Guardrails]]
- [[Human in the loop]]
- [[Agent loop]]
- [[Handoffs Agents as tools]]
- [[primitives]]
- [[Tracing]]
- [[Agent]]
- [[Function tools]]
- [[higher-level runtime]]
- [[MCP server tool calling]]
- [[Sandbox agents]]
- [[Sessions]]
- [[Python-first]]
- [[turnkey yet flexible]]
