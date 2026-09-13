---
id: cm_4b769318
name: 名称与描述
nameEn: name / description
type: CONCEPTUAL
subject: AI 内参 260912
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.144
depth: 0
origin: [neican]
aliases: ["name / description"]
sources: 1
---

# 名称与描述 · name / description

> 名称是技能标识，描述是匹配条件；请求先与描述做语义匹配，允许意图重叠

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

名称和描述不是同一类东西。名称是技能的身份标识，用来在列表、冲突优先级里识别技能。描述是匹配条件，告诉 Claude 什么时候该使用这个技能。用户请求不是直接匹配完整技能内容，而是先匹配描述，而且匹配是语义上的，允许意图重叠。所以描述写的是使用场景，不是技能内容摘要。这个区分是本文匹配机制的核心。

## 原文 context

技能名称代表你的技能。技能描述告诉克劳德何时使用该技能——这是匹配条件。

当你发送请求时，Claude 会将你的消息与所有可用技能的描述进行比对。例如，“解释这个函数的作用”会匹配到“用图表解释代码”这项技能，因为它们的意图有所重叠。

## 掌握证据（做到这些才算会）

- 能说出请求匹配的是描述而非整份 SKILL.md
- 能举例'解释这个函数'命中'用图表解释代码'因意图重叠

## 验收问句

> {{name}}分别解决什么问题？请求匹配的到底是哪一个？

## 懂了它才能懂（解锁 2）

- [[按需加载]] — 不懂名称与描述，就做不了按需加载里的「起初只加载名称与描述，请求匹配时才加载正文」
- [[启动时仅加载名称和描述]] — 不懂【名称与描述】，就做不了启动时的懒加载设计——不知道加载进上下文的那两项分别是什么。

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 2 课：技能的结构（SKILL.md 与 frontmatter）》 ｜ https://academy.claude.com/courses/introduction-to-agent-skills/creating-your-first-skill

## 别名

`name / description`

## 反链

- [[按需加载]]
- [[启动时仅加载名称和描述]]
