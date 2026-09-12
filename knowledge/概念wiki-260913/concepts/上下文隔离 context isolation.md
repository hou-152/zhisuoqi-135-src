---
id: cm_9b459d5c
name: 上下文隔离
nameEn: context isolation
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.042
depth: 2
origin: [context]
aliases: ["context isolation"]
sources: 1
---

# 上下文隔离 · context isolation

> 用独立上下文窗口、专属系统提示与受限工具权限切分并委派任务，避免污染主对话。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

别让所有事挤在一个脑子里。把子任务交给一个有独立记事本、只带必要工具的专职助手，做完把结论交回来，过程不脏主线。

## 原文 context

绕开窗口限制并降低上下文污染的策略。Claude Code 的 subagent 系统是范例：每个 subagent 有独立上下文窗口、定制系统提示、受限工具权限，任务匹配时被委派、独立运行而不污染主对话。切分可沿功能维度（分析、执行、验证）或层级维度（规划、实现、评审），每个单元只拿最小必要权限，同时提升可靠性与可解释性。

## 掌握证据（做到这些才算会）

- 能沿功能或层级维度切分任务单元
- 能说明最小权限带来可靠性与可解释性提升

## 验收问句

> 怎么用{{name}}绕开上下文窗口限制并减少污染？

## 先懂这些（前置 1）

- [[上下文工程 context engineering]] · **soft** — 隔离是上下文工程切分任务、防污染的一种手段，不懂上下文工程就不知为何要隔离。

## 相关

- [[熵减 entropy reduction]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文 context]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-01

## 出场

- Context Engineering ｜ 《论文《上下文工程 2.0》：给这门手艺补上它自己的上下文》 ｜ https://arxiv.org/pdf/2510.26493

## 别名

`context isolation`

## 反链

- [[上下文工程 context engineering]]
- [[上下文 context]]
- [[熵减 entropy reduction]]
