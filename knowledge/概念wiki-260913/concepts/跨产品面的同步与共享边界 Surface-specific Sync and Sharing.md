---
id: cm_ad086a79
name: 跨产品面的同步与共享边界
nameEn: Surface-specific Sync and Sharing
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.211
depth: 0
origin: [neican]
aliases: ["Surface-specific Sync and Sharing"]
sources: 1
---

# 跨产品面的同步与共享边界 · Surface-specific Sync and Sharing

> 自定义技能不跨产品面同步，claude.ai、API、Claude Code 各自独立，共享范围也不同。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.211

## 费曼一下

技能在不同产品面之间不会自动同步。上传到 claude.ai 的技能不会自动出现在 API，API 上传的也不会出现在 claude.ai，Claude Code 的技能则基于文件系统，和两者分开。共享范围也不同：claude.ai 是个人级，API 是工作区级，Claude Code 是个人或项目级。理解“技能在哪里可用、谁能看到”必须看这个边界，不能假设一次上传处处可用。

## 原文 context

Custom Skills do not sync across surfaces. Skills uploaded to one surface are not automatically available on others:

Skills uploaded to claude.ai must be separately uploaded to the API

Skills uploaded through the API are not available on claude.ai

Claude Code Skills are filesystem-based and separate from both claude.ai and API

Skills have different sharing models depending on where you use them:

claude.ai: Individual user only. Each team member must upload separately.

Claude API: Workspace-wide. All workspace members can access uploaded Skills.

Claude Code: Personal (~/.claude/skills/) or project-based (.claude/skills/). Can also be shared through Claude Code Plugins.

claude.ai does not support centralized admin management or org-wide distribution of custom Skills.

## 掌握证据（做到这些才算会）

- 能说出三个产品面之间技能不自动同步
- 能指出各面共享范围分别是个人级、工作区级或项目级

## 验收问句

> 上传到 claude.ai 的 {{name}} 会自动出现在 API 吗？

## 懂了它才能懂（解锁 1）

- [[预构建技能与自定义技能 Pre-built vs Custom Skills]] — 不懂自定义技能不跨产品面同步、claude.ai、API、Claude Code 各自独立，就说不清两类技能在来源与共享范围上的区别。

## 出场

- AI 内参 260912 ｜ 《Using Agent Skills with the API（用 API 使用 Agent Skills）》 ｜ https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

## 别名

`Surface-specific Sync and Sharing`

## 反链

- [[预构建技能与自定义技能 Pre-built vs Custom Skills]]
