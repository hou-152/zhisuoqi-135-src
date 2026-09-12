---
id: cm_50e4c470
name: Session Management】
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 2
origin: [context]
aliases: []
sources: 1
---

# Session Management】

> 管理会话的实践取舍：开几个会话、何时 compact、何时 rewind 或改用 subagent。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

Session Management 不是“开几个聊天窗口”的小技巧，而是 Claude Code 的上下文治理能力。每一个 session 都是一段带着历史、工具输出、文件读取和错误路径的工作记忆。你要决定什么时候继续沿用它，什么时候回退它，什么时候压缩它，什么时候清空它，什么时候把子任务外包给 subagent。1M context 只是把窗口变大；session management 才决定窗口里放什么、丢什么、什么时候换一个干净窗口。

## 原文 context

What came up again and again in these calls is that there is a lot of variance in how you might manage your sessions, especially with our new update to 1 million context in Claude Code.

Do you only use one session or two sessions that you keep open in a terminal? Do you start a new session with every prompt? When do you use compact, rewind or subagents? What causes a bad compact?

## 掌握证据（做到这些才算会）

- 能针对任务选择合适的会话数量与压缩时机
- 能解释什么样的 compact 会让上下文变坏

## 验收问句

> {{name}} 里何时该 compact、何时该开新会话？

## 先懂这些（前置 1）

- [[Context Reset vs Compaction】]] · **hard** — 会话管理要决定何时 compact、何时重来，先懂两者区别

## 出场

- Context Engineering ｜ 《Claude Code 的 1M Context 让会话管理变成核心技能》 ｜ https://x.com/trq212/status/2044548257058328723/?rw_tt_thread=True
## 反链

- [[Context Reset vs Compaction】]]
