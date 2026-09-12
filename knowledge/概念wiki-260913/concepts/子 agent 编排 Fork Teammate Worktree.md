---
id: cm_197a049b
name: 子 agent 编排
nameEn: Fork / Teammate / Worktree
type: REPRESENTATIONAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [harness]
aliases: ["Fork / Teammate / Worktree"]
sources: 1
---

# 子 agent 编排 · Fork / Teammate / Worktree

> 三种子 agent 执行模型：Fork 逐字节复制父上下文、Teammate 独立终端加文件信箱、Worktree 各自 git 分支；同时是上下文管理手段。

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

派实习生去翻三小时资料，只让他交回一页纸。你的注意力被保护了，工作量却外包出去了。

## 原文 context

Claude Code 的三种执行模型——Fork（父上下文的逐字节副本）、Teammate（独立终端窗格 + 基于文件的信箱通信）、Worktree（各自的 git worktree 与隔离分支）。OpenAI SDK 提供 agents-as-tools 与 handoffs 两种形态，LangGraph 把子 agent 实现为嵌套状态图。子 agent 同时也是上下文管理手段：广泛探索、只回传浓缩摘要。

## 掌握证据（做到这些才算会）

- 能说出 Fork / Teammate / Worktree 各自的隔离与通信方式
- 能把子 agent 用作广泛探索、只回传浓缩摘要的手段

## 验收问句

> 你会用 {{name}} 的哪种形态隔离并行任务？

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`Fork / Teammate / Worktree`

## 反链

- [[agent 与 harness 的分工]]
- [[If you're not the model, you're the harness.]]
