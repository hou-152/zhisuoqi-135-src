---
id: cm_2ee67864
name: 上下文自动压缩
nameEn: Context compaction
type: CONCEPTUAL
subject: AI 内参 260912
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [neican]
aliases: ["Context compaction"]
sources: 1
---

# 上下文自动压缩 · Context compaction

> 会话接近上下文上限时，Agents API 自动压缩较早上下文，同时保留继续工作所需的信息。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

当对话和代码越积越多、快要把模型窗口挤爆时，系统在后台自动把前期的历史细节摘要成高密度的关键信息，只保留当前任务不可缺少的因果链条。这使得开发者不用自己手写截断算法，就能让 Agent 永不中断地干活。

## 原文 context

当会话接近上下文上限时，Agents API 会[自动压缩⁠](https://developers.openai.com/api/docs/guides/compaction)较早的上下文，同时保留智能体继续工作所需的信息。开发者无需自行实现压缩逻辑，即可构建跨越多个上下文窗口的工作流。

## 掌握证据（做到这些才算会）

- 能说出压缩的触发时机与必须保留的目标
- 能说明开发者无需自行实现压缩即可构建跨多个上下文窗口的工作流

## 验收问句

> {{name}} 在什么时机发生，压缩后必须保住什么？

## 先懂这些（前置 1）

- [[基于文件的技能 File-based skills]] · **hard** — 不懂【基于文件的技能】就做不了【上下文自动压缩】的「判断哪些早期上下文可以安全压缩掉」这件事，因为无法区分哪些业务规范与领域知识已外置到 Markdown 文件、可按需重新查阅。

## 出场

- AI 内参 260912 ｜ 《推出 Agents API | OpenAI》 ｜ https://openai.com/zh-Hans-CN/index/introducing-the-agents-api/

## 别名

`Context compaction`

## 反链

- [[基于文件的技能 File-based skills]]
