---
id: cm_5face436
name: 三类内容：说明、代码、资源
nameEn: Instructions, Code, Resources
type: CONCEPTUAL
subject: AI 内参 260912
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.142
depth: 2
origin: [neican]
aliases: ["Instructions, Code, Resources"]
sources: 1
---

# 三类内容：说明、代码、资源 · Instructions, Code, Resources

> 技能内容分说明、代码、资源三类，加载时机不同，代码只把输出带入上下文。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.142

## 费曼一下

技能内部不是只有一段说明，而是分成三类内容。说明适合灵活指导；代码通过 bash 执行，只把输出带进上下文，因此可靠且省 token；资源是数据库结构、API 文档、模板、示例等事实材料，被引用时才读取。这个分类决定了每种内容如何加载、为什么能节省成本，以及它们在技能里各自承担什么角色。

## 原文 context

技能可以包含三种类型的内容，每种内容的加载时间都不同：

说明：包含专门指导和工作流程的附加 Markdown 文件（FORMS.md、REFERENCE.md）

代码： Claude 使用 bash 运行的可执行脚本（fill_form.py、validate.py），无需将代码加载到上下文中即可提供确定性操作。

Resources: Reference materials such as database schemas, API documentation, templates, or examples

The filesystem model means each content type has different strengths: instructions for flexible guidance, code for reliability, resources for factual lookup.

## 掌握证据（做到这些才算会）

- 能把技能中的文件归入说明、代码、资源三类
- 能说明代码类内容为何确定性强且省 token

## 验收问句

> {{name}} 中哪类内容不必把代码本身载入上下文？

## 先懂这些（前置 1）

- [[按需加载]] · **hard** — 不懂按需加载，就做不了三类内容里的「按加载时机区分说明、代码、资源，并让代码只把输出带入上下文」

## 出场

- AI 内参 260912 ｜ 《Using Agent Skills with the API（用 API 使用 Agent Skills）》 ｜ https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

## 别名

`Instructions, Code, Resources`

## 反链

- [[按需加载]]
