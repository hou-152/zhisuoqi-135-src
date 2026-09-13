---
id: cm_94bf8880
name: 真实交互
nameEn: truthful interaction
type: CONCEPTUAL
subject: AI 内参 260912
domain: spec-intent
learningStage: when-needed
verification: judge
centrality: 0.144
depth: 1
origin: [neican]
aliases: ["truthful interaction"]
sources: 1
---

# 真实交互 · truthful interaction

> 聚焦、上下游、路径、角色比较与故事只复用作者定义的节点关系，不发明拓扑、不声称运行时影响。

**领域** spec-intent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

查看器里的聚焦、上下游、路径、角色比较、故事都只复用作者定义的节点和关系，不发明拓扑，也不声称运行时影响。稳定链接和有限动态属于查看体验，不进入规范导出。它定义了交互的“真实”边界。

## 原文 context

Truthful interaction — focus, upstream/downstream reach, exact routes, role comparison, and stories reuse authored nodes and relationships instead of inventing topology or claiming runtime impact.

Stable links can restore `#focus=<id>`, `#focus=<id>&reach=upstream|downstream`, `#relation=<id>`, `#route=<source>~<target>`, `#lens=<kind>~<kind>`, and `#view=<view-id>`. Reader-driven motion is finite, respects `prefers-reduced-motion`, and never enters canonical exports.

## 掌握证据（做到这些才算会）

- 能区分查看体验与规范导出的边界
- 能举出交互中被禁止的行为

## 验收问句

> 某个交互声称展示了运行时影响，你如何用 {{name}} 判断它是否越界？

## 先懂这些（前置 2）

- [[类型化 JSON IR typed JSON IR]] · **hard** — 不懂类型化 JSON IR 里作者定义的节点关系，就做不了真实交互里的聚焦、上下游、路径、角色比较与故事——没有可复用的关系源，只能自己发明拓扑。
- [[沟通工件与非目标 communication artifact non-goals]] · **soft** — 不懂 Archify 定位为「把技术意图变成可沟通的图」这条非目标，就做不了真实交互中「不声称运行时影响」的边界判断——会把它当成运行时事实的推断工具。

## 出场

- AI 内参 260912 ｜ 《Archify》 ｜ https://github.com/tt-a1i/archify

## 别名

`truthful interaction`

## 反链

- [[类型化 JSON IR typed JSON IR]]
- [[沟通工件与非目标 communication artifact non-goals]]
