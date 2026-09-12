---
id: cm_ed8dcd39
name: multimodal / Vision LLMs
type: CONCEPTUAL
subject: Context Engineering
domain: model-training
learningStage: now
verification: accept
centrality: 0.099
depth: 1
origin: [context]
aliases: []
sources: 1
---

# multimodal / Vision LLMs

> 把图像等非文本输入也编码成模型可处理的 token，一并进入同一套处理流程。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.099

## 费曼一下

多模态不是在旁边外挂一个 OCR 工具，而是把图片、截图、草图等输入纳入同一套模型 token 处理流程。

## 原文 context

图像也会转成模型可处理的 token。

## 掌握证据（做到这些才算会）

- 能说出图像进入模型前被转成了什么
- 能指出多模态与纯文本模型输入上的差别

## 验收问句

> {{name}} 里一张图片最后变成了什么？

## 先懂这些（前置 1）

- [[Q、K、V]] · **soft** — 多模态 token 进入同一套注意力处理，懂 QKV 才懂图文融合的机制。

## 懂了它才能懂（解锁 2）

- [[VLM]] — VLM 就是多模态大模型，不懂图像编码成 token 的流程就不知道图文如何进同一套处理。
- [[Tiny Engram]] — Tiny Engram 把 Engram 迁到视觉模型，懂多模态编码才懂视觉版改了什么。

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[Harness]]
- [[LLM Large Language Model]]
- [[coding agent]]
- [[Q、K、V]]
- [[Tiny Engram]]
- [[VLM]]
