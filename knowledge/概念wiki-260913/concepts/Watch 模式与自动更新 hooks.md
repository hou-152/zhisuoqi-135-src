---
id: cm_6881bd11
name: Watch 模式与自动更新 hooks
type: PROCEDURAL
subject: Context Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: []
sources: 1
---

# Watch 模式与自动更新 hooks

> CLI 的 watch 命令与自动更新 hooks，让图谱在每次文件编辑和 git commit 后自动同步代码库。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

图谱不是"手动按一下才更新"的死地图，而是像后台常驻的哨兵，你一保存文件、一提交 commit，它就自动把地图补上最新的那一块。

## 原文 context

CLI 中的 watch 命令对应"Auto-update on file changes"，特性表里同时列出"Auto-update hooks: Graph updates on every file edit and git commit without manual intervention"和"Watch mode: Continuous graph updates as you work"，两者共同保证图谱始终和代码库保持同步、无需用户手动触发。

## 掌握证据（做到这些才算会）

- 能说明 watch 模式与 hooks 各自覆盖的触发时机
- 能在不手动触发的情况下让图谱跟上一次代码改动

## 验收问句

> {{name}} 覆盖了哪些让图谱同步的触发点？

## 相关

- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph
## 反链

- [[持久化代码图谱 structural map graph]]
- [[code-review-graph]]
- [[Tree-sitter]]
