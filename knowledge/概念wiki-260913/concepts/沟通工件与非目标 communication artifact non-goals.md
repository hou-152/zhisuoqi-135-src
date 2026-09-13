---
id: cm_a9aea49f
name: 沟通工件与非目标
nameEn: communication artifact / non-goals
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: spec-intent
learningStage: when-needed
verification: judge
centrality: 0.107
depth: 0
origin: [neican]
aliases: ["communication artifact / non-goals"]
sources: 1
---

# 沟通工件与非目标 · communication artifact / non-goals

> Archify 定位为把技术意图变成可沟通的图，非通用绘图编辑器，也非 Mermaid 主题。

**领域** spec-intent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.107

## 费曼一下

Archify 的定位不是通用画布，也不是 Mermaid 主题，而是把技术意图变成可沟通的图。布局由代理按语义判断层级、间距、路由和强调，不是交给通用自动布局；自动端点只做确定性的分散。非目标划清了边界：不解析 Mermaid、不做通用自动布局、不托管共享、不做所见即所得。

## 原文 context

Archify is not a general-purpose drawing editor or a Mermaid theme. It turns technical intent into a communication artifact.

Layout judgment over generic auto-layout — the agent chooses hierarchy, spacing, routes, and emphasis; shared automatic endpoints spread deterministically instead of piling arrows on one midpoint.

自动 Mermaid 解析、通用自动布局、托管共享和 WYSIWYG 编辑功能有意不在当前范围内。

## 掌握证据（做到这些才算会）

- 能列出至少两项非目标：不解析 Mermaid、不做通用自动布局、不托管共享、不做所见即所得
- 能说明布局层级、间距、路由与强调由代理按语义判断而非通用自动布局

## 验收问句

> {{name}} 明确不做的事里，有哪些？

## 懂了它才能懂（解锁 1）

- [[真实交互 truthful interaction]] — 不懂 Archify 定位为「把技术意图变成可沟通的图」这条非目标，就做不了真实交互中「不声称运行时影响」的边界判断——会把它当成运行时事实的推断工具。

## 出场

- AI 内参 260912 ｜ 《Archify》 ｜ https://github.com/tt-a1i/archify

## 别名

`communication artifact / non-goals`

## 反链

- [[真实交互 truthful interaction]]
