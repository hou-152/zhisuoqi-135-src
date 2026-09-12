---
id: cm_6072455f
name: Filesystem 作为最基础的 harness 原语
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Filesystem 作为最基础的 harness 原语

> 文件系统被称为最基础的 harness 原语：模型在海量文件系统用法上训练过，还解锁工作区与协作面。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

给模型一块能写字的白板，而且是它从小就学会用的那种白板。context window 是短期记忆，文件系统是长期记忆兼公共桌面——后面的记忆、Ralph Loop、长时程协作，全都要回到这块白板上。

## 原文 context

作者称文件系统「arguably the most foundational harness primitive」。理由不只是好用，还包括一条训练侧的论证——世界本来就用文件系统干活，模型天然在数十亿 token 的文件系统用法上训练过。它解锁工作区、增量卸载与持久状态、以及多 agent 与人类共享的协作面（Agent Teams 依赖它）。

## 掌握证据（做到这些才算会）

- 能列出它解锁的工作区、增量卸载与协作面
- 能说明训练侧为何让它比其他原语更可靠

## 验收问句

> 为什么说 {{name}} 是最基础的 harness 原语？

## 先懂这些（前置 1）

- [[stateless]] · **soft** — 正因为模型无状态，文件系统才成为最基础的持久化原语

## 懂了它才能懂（解锁 1）

- [[Skills as permanent upgrades]] — skill 作为文件落盘，才谈得上不遗忘、不退化

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
- [[stateless]]
- [[Skills as permanent upgrades]]
