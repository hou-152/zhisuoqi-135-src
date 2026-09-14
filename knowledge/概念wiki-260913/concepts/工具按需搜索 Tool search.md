---
id: cm_9ee5650d
name: 工具按需搜索
nameEn: Tool search
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: caching-cost
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["Tool search"]
sources: 1
---

# 工具按需搜索 · Tool search

> 工具搜索按需加载相关工具定义，在保留模型缓存的同时减少 Token 用量和成本。

**领域** caching-cost ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

指不把上百个 API 工具文档一次性全塞进系统提示词，而是在 Agent 遇到具体问题时，才根据语义去搜索并临时加载相关的工具说明。既保护了提示词缓存（Prompt Cache）的高命中率，又大幅节省了输入 Token 的花费。

## 原文 context

[工具搜索⁠](https://developers.openai.com/api/docs/guides/tools-tool-search)会按需加载相关工具定义，在保留模型缓存的同时减少 Token 用量和成本。

## 掌握证据（做到这些才算会）

- 能说明为何不把大量工具定义一次性塞进提示词
- 能指出它同时服务省 Token 与保缓存命中两个目标

## 验收问句

> 与一次性注入全部工具定义相比，{{name}} 同时改善了什么？

## 出场

- AI 内参 260912 ｜ 《推出 Agents API | OpenAI》 ｜ https://openai.com/zh-Hans-CN/index/introducing-the-agents-api/

## 别名

`Tool search`
