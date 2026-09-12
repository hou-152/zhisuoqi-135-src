---
id: cm_a5573df7
name: SKILL.md 与前置信息
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.107
depth: 0
origin: [neican]
aliases: []
sources: 1
---

# SKILL.md 与前置信息

> SKILL.md 上为前置信息（名称、描述），下为任务说明，如审阅清单或格式偏好。

**领域** harness-runtime ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.107

## 费曼一下

SKILL.md 是技能的文件形态。它上面有前置信息，至少包含名称和描述；下面是真正的任务说明，比如审阅清单或格式偏好。这个结构很重要，因为 Claude 一开始只用前置信息来发现和匹配技能，不必先加载完整正文。

## 原文 context

每个技能都存在于一个SKILL.md文件中，其前端包含名称和描述。

以下是技能的前置信息示例：

在前言下方，你可以写出实际的说明——你的审阅清单、格式偏好，或者克劳德需要知道的关于该任务的任何信息。

## 掌握证据（做到这些才算会）

- 能写出含名称与描述的前置信息示例
- 能指出 Claude 起初只用前置信息发现技能

## 验收问句

> {{name}} 中前置信息下方应该写什么内容？

## 懂了它才能懂（解锁 1）

- [[自动激活]] — 不懂 SKILL.md 顶部的名称与描述就是前置信息、决定技能何时被识别，就写不出让 Claude 自动激活该技能的触发条件。

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 1 课：什么是 Agent Skills》 ｜ https://academy.claude.com/courses/introduction-to-agent-skills/what-are-skills
## 反链

- [[自动激活]]
