---
id: cm_96526063
name: Sandbox agents
type: CONCEPTUAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Sandbox agents

> 在真实隔离工作区里跑任务，用 manifest 定义文件、选定沙箱客户端，会话可恢复。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

当 agent 要真的读写文件、跑代码，它需要一间自己的房间，而不是在你的机器上乱翻。沙箱给它这间房间，而且中断之后还能回到原处继续，不用从头再来。

## 原文 context

Run specialists inside real isolated workspaces with manifest-defined files, sandbox client choice, and resumable sandbox sessions；文档把「任务依赖真实文件、仓库或隔离的 per-agent workspace 状态」列为读它的触发条件。

## 掌握证据（做到这些才算会）

- 能说出何时需要 per-agent 隔离工作区而非共享环境
- 能描述可恢复沙箱会话依赖哪些状态

## 验收问句

> {{name}} 依赖哪些文件和状态才能恢复执行？

## 先懂这些（前置 1）

- [[Sandbox]] · **hard** — Sandbox agents 在隔离工作区跑任务，不懂沙箱就理解不了其工作区与可恢复会话的前提。

## 相关

- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent]]
- [[Sandbox]]
- [[primitives]]
- [[very few abstractions]]
