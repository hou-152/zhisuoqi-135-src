---
id: cm_2c214b3c
name: 独立调用
nameEn: Standalone
type: CONCEPTUAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Standalone"]
sources: 1
---

# 独立调用 · Standalone

> 最松的接入方式：产物已存在后手动触发一次，适合不必每次都做的横切检查。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

像家里的体重秤，想称的时候自己走上去称。适合偶尔查一次的事；但如果你发现自己每顿饭后都要称，那就该换成「吃完自动记录」的机制了。

## 原文 context

四种接入方式里最松的一种。你在产物已经存在之后，刻意手动调用它，适合那些「不必每次都做」的横切检查——提交前安全扫描、发 PR 前无障碍审计、整个 repo 的 license-header 校验。代价是每次都要你记着调用；当你开始「每次改动后都在跑它」，就该升级成嵌入或链式了。

## 掌握证据（做到这些才算会）

- 能列出提交前安全扫描、PR 前无障碍审计、license 校验等适用场景
- 能判断何时该从独立调用升级为嵌入或链式

## 验收问句

> 什么场景该用 {{name}}，何时该升级成嵌入或链式？

## 相关

- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[skill-creator 访谈式创建]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[验证闭环 verification loop]] · 同篇出现（co-occurrence） — 同篇出现：context-12

## 出场

- Context Engineering ｜ 《用 Skills 在 Claude Code 里搭建验证闭环》 ｜ https://claude.com/blog/building-verification-loops-in-claude-code-with-skills

## 别名

`Standalone`

## 反链

- [[验证闭环 verification loop]]
- [[skill-creator 访谈式创建]]
- [[把重复步骤编码成 Skill]]
