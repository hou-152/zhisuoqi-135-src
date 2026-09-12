---
id: cm_6ae99955
name: name
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: spec-intent
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["必填字段"]
sources: 1
---

# name

> SKILL.md 必填字段，只能用小写字母、数字、连字符，≤64 字符，须与目录同名

**领域** spec-intent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 费曼一下

name 解决的是"这个技能叫什么、放在哪个目录下"的身份问题：必填，只能用小写字母、数字和连字符，最长 64 字符，并且必须和技能所在目录同名。它管的是标识，不管触发——正文把"最重要"的判语留给了 description，因为真正决定技能会不会被用上的是描述匹配。

## 原文 context

名称（必填）— 用于标识您的技能。仅使用小写字母、数字和连字符。最多 64 个字符。名称应与您的目录名称一致。

## 掌握证据（做到这些才算会）

- 能写出一个合法的 name 取值示例
- 能指出 name 必须与技能目录名一致

## 验收问句

> {{name}}有哪些字符与长度限制？要和什么保持一致？

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 3 课：写好 name 与 description》 ｜ https://academy.claude.com/courses/introduction-to-agent-skills/configuration-and-multi-file-skills

## 别名

`必填字段`
