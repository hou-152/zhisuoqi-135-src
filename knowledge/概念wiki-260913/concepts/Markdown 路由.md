---
id: cm_f2b65d01
name: Markdown 路由
type: PROCEDURAL
subject: AI 概念库
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.045
depth: 1
origin: [notion]
aliases: ["Markdown Routing"]
sources: 1
---

# Markdown 路由

> 为站点每个页面提供 .md 版本，把约 15000 token 的 HTML 页压到约 3000 token，减少约 80%。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

给每个 HTML 页面再做一个 .md 版本，并在 `<head>` 里用 `<link rel="alternate" type="text/markdown">` 告诉 AI。AI 拿到的是干净的 Markdown，不用从导航、脚本、广告里挖内容。

## 原文 context

> Markdown 路由更进一步，Evil Martians 建议给站点的每个页面提供 .md 版本。一个 15000 token 的 HTML 页面变成 3000 token 的 Markdown 文档，减少 80%。

## 掌握证据（做到这些才算会）

- 能算出同一页面 HTML 与 Markdown 版本的 token 差
- 能说明 .md 版本为何对 AI 读取更友好

## 验收问句

> 你怎么为站点实现 {{name}} 并验证 token 降幅？

## 先懂这些（前置 1）

- [[长上下文窗口]] · **soft** — 提供.md版本压token，目的就是节省长上下文窗口

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Markdown-87c679b108ff83f3b6c6816d45b6fbf7

## 别名

`Markdown Routing`

## 反链

- [[长上下文窗口]]
