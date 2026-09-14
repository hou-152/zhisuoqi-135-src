---
id: cm_2175bf27
name: Markdown 为真源，SQLite 为缓存
nameEn: Markdown is truth, SQLite is cache
type: CONCEPTUAL
subject: AI 内参 260912
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["Markdown is truth, SQLite is cache"]
sources: 1
---

# Markdown 为真源，SQLite 为缓存 · Markdown is truth, SQLite is cache

> 笔记以 Markdown 加 YAML 头为真源，SQLite 仅作可随时重建的检索缓存

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

指所有抓取的文献与笔记均以纯文本 Markdown 和标准 YAML 头持久化存储，无需任何专有工具即可在任意编辑器中阅读和 Git 追踪；而 SQLite 仅作为加速检索的只读缓存，即使删掉也能随时根据 Markdown 瞬间重建。

## 原文 context

Markdown is truth, SQLite is cache. Notes live as plain markdown with YAML frontmatter in research/notes/. The SQLite index is fully rebuildable: delete it and hyperresearch sync reconstructs it from the markdown.

## 掌握证据（做到这些才算会）

- 能说明删掉索引后如何从 Markdown 重建
- 能指出为何真源要选纯文本而非数据库

## 验收问句

> {{name}} 时，删掉 SQLite 会发生什么？

## 出场

- AI 内参 260912 ｜ 《jordan-gibbs/hyperresearch：基于智能体的研究知识库。智能体收集、搜索并将网络研究成果整合到一个持久的、可搜索的维基中。》 ｜ https://github.com/jordan-gibbs/hyperresearch

## 别名

`Markdown is truth, SQLite is cache`
