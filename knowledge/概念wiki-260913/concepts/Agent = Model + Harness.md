---
id: cm_253ad423
name: Agent = Model + Harness
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.16
depth: 4
origin: [harness]
aliases: []
sources: 2
---

# Agent = Model + Harness

> Agent = Model + Harness：模型只有在 harness 提供状态、工具执行、反馈回路与约束后才成为 agent。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.16

## 费曼一下

把「agent」这个模糊的词做了一次因式分解。以后评价一个 agent 好不好，可以分开问两个问题：模型这一项有多强？框架这一项做了多少事？两项是可以独立优化、也可以独立归因的。

## 原文 context

文章的核心等式，也是 TLDR 的第一句。作者强调 raw model is not an agent，模型只有在 harness 提供 state、tool execution、feedback loops 和 enforceable constraints 之后才成为 agent。

## 掌握证据（做到这些才算会）

- 能指出 raw model 为什么不算 agent
- 能列出 harness 至少四项能力中的三项

## 验收问句

> 在 {{name}} 里，缺了状态和反馈回路会怎样？

## 先懂这些（前置 2）

- [[Harness]] · **hard** — 等式右项的 Harness 不懂，等式无法成立。
- [[Agent]] · **hard** — 不懂 Agent 是什么，就理解不了这个等式在说什么。

## 懂了它才能懂（解锁 3）

- [[Agent as a New Type of Software]] — 它是一种新软件形态，先懂 agent 由模型加 harness 组成。
- [[Agent CLI runtimes]] — 能跑自然语言工作流的 CLI，先懂 agent 的模型加 harness 结构。
- [[「垃圾回收」型 agent]] — 它是周期性运行的 agent，先懂 agent 由模型加 harness 构成。

## 相关

- [[Harness level feature]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[从期望行为反推 harness 设计]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Filesystem 作为最基础的 harness 原语]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[ReAct loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[通用工具与「给模型一台计算机」]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Self-verification loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Context injection]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Memory file 与 continual learning]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Tool call offloading]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Progressive disclosure（渐进式披露）与 Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[模型训练与 harness 设计的耦合]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Ralph Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Sandbox]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[AI 工程基础设施 AI engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[1.6% vs 98.4%]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[确定性工程基础设施 deterministic engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[上下文压缩 Context Compression Summarization]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
- Harness Engineering ｜ 《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349
## 反链

- [[Harness]]
- [[Agent]]
- [[Sandbox]]
- [[上下文腐烂 Context Rot]]
- [[模型训练与 harness 设计的耦合]]
- [[Harness level feature]]
- [[Tool call offloading]]
- [[Ralph Loop]]
- [[通用工具与「给模型一台计算机」]]
- [[ReAct loop]]
- [[Self-verification loop]]
- [[上下文压缩 Context Compression Summarization]]
- [[「垃圾回收」型 agent]]
- [[1.6% vs 98.4%]]
- [[从期望行为反推 harness 设计]]
- [[Agent as a New Type of Software]]
- [[Agent CLI runtimes]]
- [[Context injection]]
- [[Filesystem 作为最基础的 harness 原语]]
- [[Memory file 与 continual learning]]
- [[Progressive disclosure（渐进式披露）与 Skills]]
- [[确定性工程基础设施 deterministic engineering infrastructure]]
- [[AI 工程基础设施 AI engineering infrastructure]]
