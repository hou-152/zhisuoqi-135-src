---
id: cm_226cbc01
name: 预构建技能与自定义技能
nameEn: Pre-built vs Custom Skills
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.089
depth: 1
origin: [neican]
aliases: ["Pre-built vs Custom Skills"]
sources: 1
---

# 预构建技能与自定义技能 · Pre-built vs Custom Skills

> 技能分两类：Anthropic 预置文档技能与用户自定义技能，运行方式相同，来源与共享范围不同。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

技能按来源分成两类：Anthropic 提供的预构建文档技能，以及用户自己打包组织经验的自定义技能。关键点是，两类技能在运行方式上没有区别；一旦进入某个环境，Claude 都会在相关时自动使用。但它们的来源、上传方式和后续的共享范围不同，这会影响“谁能用、在哪里用”。

## 原文 context

Anthropic 提供预置的代理技能，用于处理常见的文档任务（PowerPoint、Excel、Word、PDF），您也可以创建自定义技能。两者的工作方式相同：一旦技能在您的环境中可用，Claude 就会在与您的请求相关时自动使用它。

自定义技能可让您将领域专业知识和组织经验打包在一起。它们适用于 Claude 的所有产品：您可以在 Claude Code 中创建自定义技能，通过 Claude API 上传，或在 claude.ai 设置中添加。

## 掌握证据（做到这些才算会）

- 能说出预构建与自定义技能在运行方式上没有区别
- 能指出自定义技能可在 Claude Code、API 或 claude.ai 中创建与上传

## 验收问句

> {{name}} 与预构建技能在运行方式上有什么区别？

## 先懂这些（前置 1）

- [[跨产品面的同步与共享边界 Surface-specific Sync and Sharing]] · **soft** — 不懂自定义技能不跨产品面同步、claude.ai、API、Claude Code 各自独立，就说不清两类技能在来源与共享范围上的区别。

## 出场

- AI 内参 260912 ｜ 《Using Agent Skills with the API（用 API 使用 Agent Skills）》 ｜ https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

## 别名

`Pre-built vs Custom Skills`

## 反链

- [[跨产品面的同步与共享边界 Surface-specific Sync and Sharing]]
