---
id: cm_32fe6bc6
name: Diff 锚定
type: CONCEPTUAL
subject: Context Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.045
depth: 2
origin: [context]
aliases: []
sources: 1
---

# Diff 锚定

> 代码审查从 PR diff 出发，围绕变更提具体问题，并把探索限定在确认或排除这些问题所需的范围内。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

diff 像调查的案发现场。先看现场发生了什么，再去找相关证据，而不是先把整座城市翻一遍。

## 原文 context

代码审查的正确起点是 pull request diff。agent 应围绕变更提出具体问题，并把探索限制在确认或排除这些问题所需的范围内。

## 掌握证据（做到这些才算会）

- 能针对一个 PR 的 diff 写出 3 个具体待验证问题
- 能为每个问题列出需要查看的文件并说明范围边界

## 验收问句

> 给你一个 PR，你如何用 {{name}} 限定审查范围？

## 先懂这些（前置 1）

- [[Blast radius]] · **soft** — 从 diff 出发审查需参考 blast radius 限定探索范围。

## 相关

- [[工具—工作流适配]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[共享 harness]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[浏览循环]] · 同篇出现（co-occurrence） — 同篇出现：context-A1

## 出场

- Context Engineering ｜ 《工具更多反而让 Copilot 代码审查变差，GitHub 如何修正》 ｜ https://github.blog/ai-and-ml/github-copilot/better-tools-made-copilot-code-review-worse-heres-how-we-actually-improved-it/
## 反链

- [[工具—工作流适配]]
- [[Blast radius]]
- [[共享 harness]]
- [[浏览循环]]
