---
id: cm_fc9668d6
name: agent 模板的声明式持久化
type: PROCEDURAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# agent 模板的声明式持久化

> agent 模板（模型、system prompt、工具、MCP servers、skills）写成 YAML 存进 git，由 CLI 在流水线 apply。

**领域** state-persistence ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

把 agent 当基础设施代码来管：改动进版本库、走评审、随部署上线，而不是散落在某个人的本地脚本里。

## 原文 context

使用建议里最可迁移的做法——CLI 做 setup、SDK 做 runtime；agent 模板是持久的，可以存成一份 YAML（模型、system prompt、工具、MCP servers、skills）放进 git，由 CLI 在部署流水线里 apply。

## 掌握证据（做到这些才算会）

- 能写出含这五要素的一份 agent 模板 YAML
- 能说明 setup 交给 CLI、runtime 交给 SDK 的原因

## 验收问句

> {{name}}怎么做？模板里要写哪些字段？

## 先懂这些（前置 1）

- [[个人技能与项目技能]] · **soft** — 不懂【个人技能与项目技能】，就做不了【agent 模板的声明式持久化】的 ⟨skills 字段的声明与 apply⟩

## 相关

- [[文件系统即持久记忆]] · rejected（audit） — 两者是不同层面的东西：声明式持久化是把配置存文件，不是把运行状态写文件；不懂后者完全能懂前者，不构成前置依赖
- [[Git-backed state]] · related-to（audit） — 此处 git 用途是存模板配置，与 Git-backed state（循环状态崩溃恢复）并非同一概念，真正前置应是通用的 git 持久化
- [[Git-backed state]] · rejected（audit） — 两者只是都用 git；模板持久化存的是配置，不依赖循环状态持久化 Git-backed state。
- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[文件系统即持久记忆]]
- [[Claude Managed Agents]]
- [[Git-backed state]]
- [[个人技能与项目技能]]
- [[messages API 作为直连网关]]
