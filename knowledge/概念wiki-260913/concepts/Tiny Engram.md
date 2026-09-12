---
id: cm_858e3280
name: Tiny Engram
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: accept
centrality: 0.067
depth: 3
origin: [notion]
aliases: ["视觉 Engram", "Vision Engram"]
sources: 1
---

# Tiny Engram

> 基于 Qwen-3 复现文本 Engram 后，把 Engram 迁到 Stable Diffusion 的视觉版本。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.067

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

- [[multimodal Vision LLMs]] · **soft** — Tiny Engram 把 Engram 迁到视觉扩散，懂多模态视觉处理更易理解其迁移。
- [[VLM]] · **soft** — 视觉版 Engram 与 VLM 同属视觉-语言处理，懂 VLM 更易定位它的目标。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Tiny-Engram-5d1679b108ff82458a450136a2e3ef37

## 别名

`视觉 Engram`、`Vision Engram`

## 反链

- [[外包思考，但不外包理解]]
- [[multimodal Vision LLMs]]
- [[VLM]]
- [[Agent-Native Infrastructure]]
- [[Sensors 与 Actuators]]
