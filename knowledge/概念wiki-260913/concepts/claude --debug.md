---
id: cm_c2266b88
name: claude --debug
type: PROCEDURAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.072
depth: 0
origin: [neican]
aliases: []
sources: 1
---

# claude --debug

> 查看加载错误的诊断命令，运行后留意提及你技能名称的消息。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

一条用于查看加载错误的诊断命令。用法是运行后留意输出里提到你技能名称的消息——很多时候仅凭这一行提示就能直接定位问题，是"无法加载"场景的专用观察窗口。

## 原文 context

运行 claude --debug 查看加载错误。留意提及您技能名称的消息。有时仅凭这一点就能直接指向问题所在。

## 掌握证据（做到这些才算会）

- 能说出该命令用于查看加载错误
- 能说明要在输出中留意提到技能名称的消息

## 验收问句

> 排查加载失败时，用 {{name}} 看什么线索？

## 懂了它才能懂（解锁 1）

- [[四类故障分类框架]] — 不懂用 claude --debug 查看加载错误、留意提及技能名称的消息，就查不下去「无法加载」这一类故障。

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 6 课：技能排障》 ｜ https://academy.claude.com/zh-CN/courses/introduction-to-agent-skills/troubleshooting-skills
## 反链

- [[四类故障分类框架]]
