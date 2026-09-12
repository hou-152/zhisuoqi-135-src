---
id: cm_d4a0e687
name: 技能与 SKILL.md 结构
nameEn: Skill / SKILL.md
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.035
depth: 0
origin: [neican]
aliases: ["Skill / SKILL.md"]
sources: 1
---

# 技能与 SKILL.md 结构 · Skill / SKILL.md

> 技能是一个目录加入口文件 SKILL.md：前置元数据，其下为说明，激活后才执行。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.035

## 费曼一下

在本文里，技能不是一段单独的提示词，而是一个目录加一个入口文件 SKILL.md。SKILL.md 又分成两段：前面放元数据，也就是名称和描述；后面放说明，也就是 Claude 激活技能后要执行的指令。名称用来标识技能，描述用来后续匹配；说明不是启动时就读，而是匹配确认后才执行。拿掉这个结构，后面“只加载名称和描述”“第二组破折号后是指令”都无从理解。

## 原文 context

技能是一个目录，其中包含一个SKILL.md文件，该文件的前言部分包含元数据（名称、描述），后言部分包含说明。

第二组破折号之后的所有内容是克劳德激活技能后需要执行的指令。

## 掌握证据（做到这些才算会）

- 能指出 SKILL.md 中元数据与说明的分界（第二组破折号）
- 能说明说明部分在激活后才作为指令执行

## 验收问句

> {{name}} 中第二组破折号之后的内容何时被执行？

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 2 课：技能的结构（SKILL.md 与 frontmatter）》 ｜ https://academy.claude.com/courses/introduction-to-agent-skills/creating-your-first-skill

## 别名

`Skill / SKILL.md`
