---
id: cm_19f7de6c
name: VLM
type: LANGUAGE
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: accept
centrality: 0.072
depth: 1
origin: [notion]
aliases: ["Vision-Language Model / 视觉-语言模型 / 视觉语言模型"]
sources: 1
---

# VLM

> 视觉-语言模型，能同时处理图像与文字的多模态大模型。

**领域** model-training ｜ **类型** LANGUAGE ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.072

## 原文 context

<mention-page url="https://app.notion.com/p/ffc679b108ff823ba0e901e51459673b"/>
- **context**：
	> 对于视觉-语言-模型 (VLM) 也是同理。举个例子，你有一张信息量很大的照片，并将其上传给模型，并询问「图片里有一只灰色的猫吗？请用一个词回答」。
- **费曼一下**：能同时吃图像和文字的多模态大模型。本论文的 "被告"——所有隐私泄露发现都建立在 VLM 在视觉问答任务上的行为之上。

## 掌握证据（做到这些才算会）

- 能举出 VLM 视觉问答的输入输出形式
- 能说明本论文的隐私泄露发现建立在其行为之上

## 验收问句

> 为什么 {{name}} 是这项隐私泄露研究的对象？

## 先懂这些（前置 1）

- [[Q、K、V]] · **soft** — 不懂 Q、K、V，就做不了 VLM 的跨模态注意力融合（图像 token 对文本 token 的加权）

## 相关

- [[Tiny Engram]] · rejected（audit） — VLM 是理解型多模态模型，Tiny Engram 视觉版是扩散生成；两者只是相邻，不构成前置依赖。
- [[multimodal Vision LLMs]] · related-to（audit） — VLM 与 multimodal/Vision LLM 基本是上下位或近义关系，VLM 定义可自含，不构成 hard 前置。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/VLM-6b4679b108ff827aa2e601af903d0e4f

## 别名

`Vision-Language Model / 视觉-语言模型 / 视觉语言模型`

## 反链

- [[Q、K、V]]
- [[Tiny Engram]]
- [[multimodal Vision LLMs]]
