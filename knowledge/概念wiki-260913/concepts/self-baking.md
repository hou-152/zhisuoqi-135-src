---
id: cm_5973b47c
name: self-baking
type: CONCEPTUAL
subject: Context Engineering
domain: memory-retrieval
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# self-baking

> Agent 有选择地把自己的上下文消化成持久知识结构，是记忆存储与学习的分界。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

光把笔记堆着不叫学会，得定期把它嚼碎、变成自己的结论。agent 也一样：会翻记录只是检索，能把记录炼成知识才是长本事。

## 原文 context

论文对上下文抽象的命名——agent 有选择地"消化"自己的上下文，转成持久的知识结构，对应人从情节记忆生成语义记忆、把重复动作沉淀为习惯的过程。四种代表实现：层级记忆组织、自然语言摘要、按固定 schema 抽关键事实（如 CodeRabbit 的结构化案卷）、渐进压缩成语义向量。论文的判词是：self-baking 是记忆"存储"与"学习"的分界——没有它，agent 只是回忆；有了它，agent 才在积累知识。

## 掌握证据（做到这些才算会）

- 能列出层级记忆、摘要、schema 抽事实、语义压缩等实现
- 能解释没有它只是回忆、有了它才在积累知识

## 验收问句

> {{name}} 之后，agent 的上下文变成了什么？

## 先懂这些（前置 1）

- [[结构化记事 agentic memory]] · **hard** — self-baking 是 Agent 把上下文消化成持久知识结构，依赖结构化记事。

## 相关

- [[熵减 entropy reduction]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文 context]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-01

## 出场

- Context Engineering ｜ 《论文《上下文工程 2.0》：给这门手艺补上它自己的上下文》 ｜ https://arxiv.org/pdf/2510.26493
## 反链

- [[上下文工程 context engineering]]
- [[上下文 context]]
- [[结构化记事 agentic memory]]
- [[熵减 entropy reduction]]
