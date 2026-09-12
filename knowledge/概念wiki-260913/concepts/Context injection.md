---
id: cm_d10f0a1e
name: Context injection
type: CONCEPTUAL
subject: Harness Engineering
domain: memory-retrieval
learningStage: now
verification: judge
centrality: 0.045
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Context injection

> 不改权重时，给模型加知识的唯一通道是把内容放进上下文；记忆文件、检索、MCP 都是它的实现。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

你没法给模型动脑手术，只能在它每次开口之前，往它面前的桌子上多放几张纸。一切「让 AI 知道更多」的花样，本质上都是在决定往桌上放什么、什么时候放、放多少。

## 原文 context

作者的硬约束推论——模型除权重和当前 context 之外没有额外知识；在无法编辑权重的前提下，「the only way to add knowledge is via context injection」。记忆文件、Web Search、MCP 工具都是这条通道上的具体实现。

## 掌握证据（做到这些才算会）

- 能说明记忆文件本质就是上下文注入
- 能举出三种注入通道的实现

## 验收问句

> {{name}} 为什么说加知识只能走上下文这条路？

## 懂了它才能懂（解锁 1）

- [[知识端点]] — 知识端点集中整理内容到一个入口，依赖 Context injection 注入模型。

## 相关

- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[Agent = Model + Harness]]
- [[知识端点]]
