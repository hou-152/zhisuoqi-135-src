---
id: cm_858e3280
name: Tiny Engram
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: accept
centrality: 0.126
depth: 1
origin: [notion]
aliases: ["视觉 Engram", "Vision Engram"]
sources: 1
---

# Tiny Engram

> 基于 Qwen-3 复现文本 Engram 后，把 Engram 迁到 Stable Diffusion 的视觉版本。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.126

## 费曼一下

把 Engram 思路从文本迁移到视觉的工程实现。视觉 patch 经分层编码（纹理 → 部件 → 风格）后整套查表。

## 原文 context

> AutoArk 团队搞了 Tiny Engram……基于 Qwen-3 完整复现文本 Engram 之后，他们做了一件论文里没做的事，把 Engram 搬到 Stable Diffusion 上。视觉 patch 经过分层编码，底层抓纹理，中层抓部件，高层抓风格，然后整套丢进哈希查表。

## 掌握证据（做到这些才算会）

- 能说出视觉 patch 经分层编码后底层抓纹理、中层抓部件、高层抓风格
- 能说明最后一步是整套丢进哈希查表

## 验收问句

> {{name}} 把 Engram 搬到了什么载体，分层抓什么？

## 先懂这些（前置 2）

- [[Q、K、V]] · **hard** — 不懂 Q、K、V，就做不了 Tiny Engram 把 Engram 挂到 Stable Diffusion 交叉注意力层的迁移
- [[N-gram]] · **soft** — 不懂 N-gram，就做不了 Tiny Engram 里 Engram 记忆的哈希查找复现

## 相关

- [[VLM]] · rejected（audit） — VLM 是理解型多模态模型，Tiny Engram 视觉版是扩散生成；两者只是相邻，不构成前置依赖。
- [[multimodal Vision LLMs]] · related-to（audit） — Tiny Engram 迁到 Stable Diffusion 属视觉生成，不等同多模态 LLM；懂多模态只是背景，不是前置。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Tiny-Engram-5d1679b108ff82458a450136a2e3ef37

## 别名

`视觉 Engram`、`Vision Engram`

## 反链

- [[multimodal Vision LLMs]]
- [[Q、K、V]]
- [[VLM]]
- [[N-gram]]
