---
id: cm_c14c7ca3
name: SKILL.md：frontmatter＋body 契约
type: REPRESENTATIONAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# SKILL.md：frontmatter＋body 契约

> skill 的最小结构：frontmatter 声明 name、description、allowed-tools，body 写清流程与报告方式。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

一张工作卡片分两半。上半是「标签栏」（叫什么、什么时候用、能动用哪些工具），下半是「操作步骤」。标签栏让系统知道何时该翻出这张卡，步骤栏才是真正要干的活。

## 原文 context

一个 skill 的最小结构。「最简单的验证 skill 就是几行 frontmatter 加一段 body。」frontmatter 声明 name、description、allowed-tools（如 [Read, Edit, Grep]），body 用大白话写清要做什么、怎么报告、怎么修。手写时就是往项目的 .claude/skills/ 丢一个这样的 SKILL.md。

## 掌握证据（做到这些才算会）

- 能手写一个含 frontmatter 与 body 的 SKILL.md 并跑通
- 能在 frontmatter 里正确限定 allowed-tools

## 验收问句

> 一份能跑的最小 {{name}}，frontmatter 要写哪些字段？

## 先懂这些（前置 1）

- [[指令子系统与渐进式展开]] · **soft** — SKILL.md正是渐进式展开结构中的一个最小指令单元

## 相关

- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[skill-creator 访谈式创建]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[验证闭环 verification loop]] · 同篇出现（co-occurrence） — 同篇出现：context-12

## 出场

- Context Engineering ｜ 《用 Skills 在 Claude Code 里搭建验证闭环》 ｜ https://claude.com/blog/building-verification-loops-in-claude-code-with-skills
## 反链

- [[验证闭环 verification loop]]
- [[skill-creator 访谈式创建]]
- [[把重复步骤编码成 Skill]]
- [[指令子系统与渐进式展开]]
