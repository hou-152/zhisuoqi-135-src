---
id: cm_a9b26989
name: Memory file 与 continual learning
type: CONCEPTUAL
subject: Harness Engineering
domain: memory-retrieval
learningStage: when-needed
verification: use
centrality: 0.045
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Memory file 与 continual learning

> harness 支持 AGENTS.md 等 memory file 标准，启动时注入 context，agent 编辑后重新载入，实现跨 session 的持续学习。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

给模型一本它自己写、自己每天开工前先读一遍的工作笔记。权重改不了，但笔记可以改——于是「学习」这件事被从训练环节挪到了运行环节，由框架而不是训练管道来承担。

## 原文 context

harness 支持 AGENTS.md 这类 memory file 标准，在 agent 启动时注入 context；agent 编辑后 harness 再载入更新版本。作者称其为一种 continual learning——agent 把一次 session 的知识持久存下来并注入未来的 session。

## 掌握证据（做到这些才算会）

- 能说明 memory file 的注入与回写时机
- 能举出一个 session 知识被带入下一 session 的例子

## 验收问句

> {{name}} 是怎么让一次 session 的知识进入未来 session 的？

## 懂了它才能懂（解锁 1）

- [[Memory-driven development]] — 把过去决策写成记忆作为开发流程，依赖 memory file 的持续学习机制。

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
- [[Memory-driven development]]
