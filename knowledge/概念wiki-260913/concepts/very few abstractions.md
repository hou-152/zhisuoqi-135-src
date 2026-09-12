---
id: cm_3211d04e
name: very few abstractions
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.067
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# very few abstractions

> SDK 定位宣言：只暴露很小一组原语，抽象极少，学习曲线平缓。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

每多一层抽象，你就多一次翻译成本：出问题时要把框架的说法翻回你自己的说法。抽象极少的意思是，框架只发明它非发明不可的那几个词，剩下的用你本来就会的语言说。

## 原文 context

这是全文的第一句主张，也是 SDK 的定位宣言——build agentic AI apps in a lightweight, easy-to-use package with very few abstractions。它由「a very small set of primitives」和「without a steep learning curve」两处表述反复印证。

## 掌握证据（做到这些才算会）

- 能指出该主张由哪些表述反复印证
- 能用它判断一个 agent SDK 是否过度封装

## 验收问句

> {{name}} 对 SDK 设计意味着什么取舍？

## 懂了它才能懂（解锁 2）

- [[primitives]] — 只暴露极少抽象是 SDK 定位，不懂它就不理解原语为何不可再拆。
- [[turnkey yet flexible]] — 抽象极少才既默认能跑又方便改造。

## 相关

- [[Handoffs Agents as tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Python-first]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Function tools]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[MCP server tool calling]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Sessions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Sandbox agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Human in the loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Tracing]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[higher-level runtime]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Guardrails]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent]]
- [[Agent loop]]
- [[Sessions]]
- [[Guardrails]]
- [[higher-level runtime]]
- [[primitives]]
- [[Function tools]]
- [[Tracing]]
- [[turnkey yet flexible]]
- [[Handoffs Agents as tools]]
- [[Human in the loop]]
- [[MCP server tool calling]]
- [[Python-first]]
- [[Sandbox agents]]
