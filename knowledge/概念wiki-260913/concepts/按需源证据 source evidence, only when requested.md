---
id: cm_e6156f75
name: 按需源证据
nameEn: source evidence, only when requested
type: CONCEPTUAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["source evidence, only when requested"]
sources: 1
---

# 按需源证据 · source evidence, only when requested

> 只有显式请求证据时，节点才标 SRC 并打开绑定到某个公开 commit 的 Git 文件与行号。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

只有显式请求证据时，节点才标 SRC 并打开绑定到某个公开 commit 的 Git 文件和行号；普通工件不含源。它区分“描述性图”和“有来源证据的图”，避免所有图都被默认为有代码依据。

## 原文 context

Source evidence, only when requested — Evidence-backed Architecture nodes mark themselves `SRC n` and open Git-verified files and line ranges pinned to one public commit; ordinary artifacts stay source-free.

## 掌握证据（做到这些才算会）

- 能说明 SRC 标记与公开 commit、行号绑定的含义
- 能说明普通工件默认不含源证据

## 验收问句

> 什么时候才该让节点标上 SRC，{{name}} 怎么说？

## 出场

- AI 内参 260912 ｜ 《Archify》 ｜ https://github.com/tt-a1i/archify

## 别名

`source evidence, only when requested`
