---
id: cm_48ea99ce
name: 插件与市场
nameEn: Plugin / Marketplace
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: agent-org
learningStage: when-needed
verification: use
centrality: 0.052
depth: 0
origin: [neican]
aliases: ["Plugin / Marketplace"]
sources: 1
---

# 插件与市场 · Plugin / Marketplace

> 插件按类似 .claude 的结构打包技能，分发到市场供他人自行发现安装

**领域** agent-org ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.052

## 费曼一下

插件把技能从单个仓库里解放出来。它的目录结构模仿 `.claude`（一个 skills 目录，每个技能一个文件夹，内含 SKILL.md），但分发不走仓库，而走市场：别人自己发现、自己安装。作者给的适用标准是"技能对直接团队以外的人也有用"——反过来说，过度绑定某个项目的技能就不该走这条路。

## 原文 context

插件是一种通过自定义功能扩展 Claude Code 的方式，旨在跨团队和项目共享。在您的插件项目中，创建一个遵循与 .claude 目录类似文件结构的 skills 目录——每个技能都有自己的文件夹，里面包含一个 SKILL.md 文件。

在您将插件分发到市场后，其他用户可以自行发现并将其安装到 Claude Code 中。

当您的技能不是过于特定于某个项目，并且对直接团队以外的社区成员也有用时，这种方法是最佳选择。

## 掌握证据（做到这些才算会）

- 能描述插件中 skills 目录与 SKILL.md 的结构
- 能判断技能是否值得做成插件对外分发

## 验收问句

> 什么情况下该走 {{name}}，而不是提交到仓库？

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 5 课：技能的分发与共享》 ｜ https://academy.claude.com/zh-CN/courses/introduction-to-agent-skills/sharing-skills

## 别名

`Plugin / Marketplace`
