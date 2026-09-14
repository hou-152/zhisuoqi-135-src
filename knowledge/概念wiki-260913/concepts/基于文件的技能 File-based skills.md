---
id: cm_c828d428
name: 基于文件的技能
nameEn: File-based skills
type: CONCEPTUAL
subject: AI 内参 260912
domain: context-engineering
learningStage: now
verification: use
centrality: 0.072
depth: 0
origin: [neican]
aliases: ["File-based skills"]
sources: 1
---

# 基于文件的技能 · File-based skills

> 把业务规范与领域知识从提示词抽成 Markdown 文件，Agent 按需查阅

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

指将操作指令、业务规范和领域知识从巨大的系统提示词中抽离出来，保存为纯文本 Markdown 文件的工程范式。Agent 在执行任务时按需查阅该文件，且模型自身可以像编辑代码一样对其进行增删改查。

## 原文 context

“File-based skills are a way of encoding knowledge for agents without putting that knowledge directly in the prompt, as something the agent can simply look up in the course of doing its job,” says Zach.

## 掌握证据（做到这些才算会）

- 能指出该文件与系统提示词在加载时机上的差别
- 能说明为何模型可以像改代码一样增删改查这些技能文件

## 验收问句

> {{name}} 相比把同一段知识写进系统提示词，解决的是什么问题？

## 懂了它才能懂（解锁 1）

- [[上下文自动压缩 Context compaction]] — 不懂【基于文件的技能】就做不了【上下文自动压缩】的「判断哪些早期上下文可以安全压缩掉」这件事，因为无法区分哪些业务规范与领域知识已外置到 Markdown 文件、可按需重新查阅。

## 出场

- AI 内参 260912 ｜ 《https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude》 ｜ https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude

## 别名

`File-based skills`

## 反链

- [[上下文自动压缩 Context compaction]]
