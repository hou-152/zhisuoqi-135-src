---
id: cm_fc9668d6
name: agent 模板的声明式持久化
type: PROCEDURAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.067
depth: 5
origin: [harness]
aliases: []
sources: 1
---

# agent 模板的声明式持久化

> agent 模板（模型、system prompt、工具、MCP servers、skills）写成 YAML 存进 git，由 CLI 在流水线 apply。

**领域** state-persistence ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

把 agent 当基础设施代码来管：改动进版本库、走评审、随部署上线，而不是散落在某个人的本地脚本里。

## 原文 context

使用建议里最可迁移的做法——CLI 做 setup、SDK 做 runtime；agent 模板是持久的，可以存成一份 YAML（模型、system prompt、工具、MCP servers、skills）放进 git，由 CLI 在部署流水线里 apply。

## 掌握证据（做到这些才算会）

- 能写出含这五要素的一份 agent 模板 YAML
- 能说明 setup 交给 CLI、runtime 交给 SDK 的原因

## 验收问句

> {{name}}怎么做？模板里要写哪些字段？

## 先懂这些（前置 2）

- [[Git-backed state]] · **hard** — 把模型、prompt、工具等存成 YAML 放进 git，需先懂 git 持久状态。
- [[文件系统即持久记忆]] · **soft** — 声明式配置以文件承载，懂文件系统持久记忆有帮助。

## 相关

- [[Session]] · 前置（同领域依赖） — 拉起一次 session 要用已声明好的 agent 配置与环境。
- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[文件系统即持久记忆]]
- [[Git-backed state]]
- [[Session]]
- [[Claude Managed Agents]]
- [[messages API 作为直连网关]]
