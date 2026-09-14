---
id: cm_6d8095ba
name: 长期运行智能体执行框架
nameEn: Long-running agent execution framework
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [neican]
aliases: ["Long-running agent execution framework"]
sources: 1
---

# 长期运行智能体执行框架 · Long-running agent execution framework

> 支撑 Agent 连续运行数天的执行框架：管理上下文、高效用工具、协调子智能体并提供文件与代码环境。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

指支撑一个 AI 智能体连续稳定工作几天所需的完整操作系统底座。它不仅是给大模型发一条指令，而是包含了上下文压缩管理、沙箱文件存取、长会话恢复、异常重试与多任务协作的一整套系统级调度能力。

## 原文 context

实用的智能体需要一个强大的执行框架，用于管理上下文、高效使用工具并协调子智能体。它们还需要可靠支持其连续运行数天的基础设施，以及能让它们处理文件、运行代码并保存中间结果的环境。

## 掌握证据（做到这些才算会）

- 能列出框架需覆盖的能力：上下文管理、工具使用、子智能体协调、长时运行基础设施、可存取的环境
- 能区分“给模型发一条指令”与“系统级执行底座”的不同

## 验收问句

> 要让 {{name}} 连续跑几天，它必须提供哪几类能力？

## 先懂这些（前置 1）

- [[开源 Codex 执行线圈 Open-source Codex harness]] · **hard** — 不懂【开源 Codex 执行线圈】公开的模型调用、工具与上下文协调核心逻辑，就做不了长期运行智能体执行框架里跨天续跑的上下文与工具调度回路

## 懂了它才能懂（解锁 1）

- [[线束能力内化 Harness Capabilities Shifting Into the Model]] — 不懂【长期运行智能体执行框架】对上下文、工具、子智能体协调与文件代码环境的持续要求，就做不了「线束能力内化」中判断哪些外部线束职责该由模型本体接管的取舍

## 出场

- AI 内参 260912 ｜ 《推出 Agents API | OpenAI》 ｜ https://openai.com/zh-Hans-CN/index/introducing-the-agents-api/

## 别名

`Long-running agent execution framework`

## 反链

- [[开源 Codex 执行线圈 Open-source Codex harness]]
- [[线束能力内化 Harness Capabilities Shifting Into the Model]]
