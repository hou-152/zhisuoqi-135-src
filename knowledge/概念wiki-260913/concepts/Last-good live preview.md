---
id: cm_b17b604d
name: Last-good live preview
type: CONCEPTUAL
subject: AI 内参 260912
domain: state-persistence
learningStage: when-needed
verification: judge
centrality: 0.035
depth: 0
origin: [neican]
aliases: []
sources: 1
---

# Last-good live preview

> 可选预览只监听一个 JSON 文件，且仅在最新候选通过全部门后才刷新，否则保留上次已验证图。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.035

## 费曼一下

可选预览只监听一个 JSON 文件，并且只显示通过全部门的最新版本；保存不完整或非法时，继续显示上次验证图。它是本地 loopback 模式，不给生成的 HTML 增加运行时代码。这个机制让迭代可见，但不让坏图冒充好图。

## 原文 context

Last-good live preview — an optional desktop loop watches one JSON file, refreshes only after the latest candidate passes every gate, and keeps the previous verified diagram visible when a save is incomplete or invalid.

`preview` is an explicit loopback-only desktop mode: it watches one JSON file on a random `127.0.0.1` port, keeps the last verified output through failures, stops with Ctrl-C, and adds no generated-HTML runtime.

## 掌握证据（做到这些才算会）

- 能说明预览为何只显示已验证版本
- 能说出它是 loopback 模式且不给 HTML 加运行时代码

## 验收问句

> 保存的 JSON 不完整或非法时，{{name}} 下用户会看到什么？

## 出场

- AI 内参 260912 ｜ 《Archify》 ｜ https://github.com/tt-a1i/archify