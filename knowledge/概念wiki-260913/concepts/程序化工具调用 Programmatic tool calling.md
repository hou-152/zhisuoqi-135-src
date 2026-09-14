---
id: cm_2a78bb06
name: 程序化工具调用
nameEn: Programmatic tool calling
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["Programmatic tool calling"]
sources: 1
---

# 程序化工具调用 · Programmatic tool calling

> 让智能体并行执行调用、串联操作，并用代码筛选或合并结果，只把相关结果送回上下文。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

以往模型每调一次工具，都要把长篇累牍的原始 JSON 数据全灌进对话框里。程序化调用让模型在沙箱内用一段脚本直接并行调好几个接口、过滤出最后那几条关键结果，再交回给上下文，有效阻断了数据洪水对注意力的污染。

## 原文 context

[程序化工具调用⁠](https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling)可让智能体并行执行调用、串联相关操作，并通过代码筛选或合并结果，从而处理海量数据，同时只将相关结果送回上下文。

## 掌握证据（做到这些才算会）

- 能说明它如何避免原始工具返回数据灌满上下文
- 能举出并行调用后按代码过滤、只回传关键结果的用法

## 验收问句

> {{name}} 为什么能把回灌上下文的数据量压下来？

## 出场

- AI 内参 260912 ｜ 《推出 Agents API | OpenAI》 ｜ https://openai.com/zh-Hans-CN/index/introducing-the-agents-api/

## 别名

`Programmatic tool calling`
