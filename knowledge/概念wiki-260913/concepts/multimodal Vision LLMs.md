---
id: cm_ed8dcd39
name: multimodal / Vision LLMs
type: CONCEPTUAL
subject: Context Engineering
domain: model-training
learningStage: now
verification: accept
centrality: 0.126
depth: 0
origin: [context]
aliases: []
sources: 1
---

# multimodal / Vision LLMs

> 把图像等非文本输入也编码成模型可处理的 token，一并进入同一套处理流程。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.126

## 费曼一下

多模态不是在旁边外挂一个 OCR 工具，而是把图片、截图、草图等输入纳入同一套模型 token 处理流程。

## 原文 context

图像也会转成模型可处理的 token。

## 掌握证据（做到这些才算会）

- 能说出图像进入模型前被转成了什么
- 能指出多模态与纯文本模型输入上的差别

## 验收问句

> {{name}} 里一张图片最后变成了什么？

## 懂了它才能懂（解锁 2）

- [[原始上下文容忍度 tolerance for raw context]] — 不懂【multimodal / Vision LLMs】，就做不了原始上下文容忍度的⟨2.0 直接吃图像视频的度量实施⟩
- [[VLM]] — 不懂把图像编码成模型可处理 token，就做不了 VLM 的图文同流程前向

## 相关

- [[VLM]] · related-to（audit） — VLM 与 multimodal/Vision LLM 基本是上下位或近义关系，VLM 定义可自含，不构成 hard 前置。
- [[Tiny Engram]] · related-to（audit） — Tiny Engram 迁到 Stable Diffusion 属视觉生成，不等同多模态 LLM；懂多模态只是背景，不是前置。
- [[Q、K、V]] · related-to（audit） — 多模态 LLM 的核心是不同模态的编码与对齐；QKV 是 Transformer 底层机制，不懂它仍可理解多模态概念，只是帮助理解融合。
- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[coding agent]]
- [[LLM Large Language Model]]
- [[Q、K、V]]
- [[Tiny Engram]]
- [[VLM]]
- [[原始上下文容忍度 tolerance for raw context]]
