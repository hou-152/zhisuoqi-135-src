---
id: cm_d78a3680
name: SKILL.md 与 YAML 前置元数据
nameEn: SKILL.md / YAML frontmatter
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: context-engineering
learningStage: now
verification: use
centrality: 0.372
depth: 0
origin: [neican]
aliases: ["SKILL.md / YAML frontmatter"]
sources: 1
---

# SKILL.md 与 YAML 前置元数据 · SKILL.md / YAML frontmatter

> SKILL.md 的 YAML 前置元数据以 name 与 description 为必需字段，是技能的发现层。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.372

## 费曼一下

SKILL.md 是每个技能的入口文件，YAML 前置元数据是技能的“发现层”。其中 `name` 和 `description` 是必需字段，而 `description` 必须同时说明技能做什么、Claude 什么时候该用它。原因是 Claude 靠这段元数据判断是否触发技能。元数据之外的 SKILL.md 正文才承载具体工作流程和指南。字段限制则构成技能定义文件的边界。

## 原文 context

Every Skill requires a SKILL.md file with YAML frontmatter

Required fields: name and description

The description must include both what the Skill does and when Claude should use it.

name:

Maximum 64 characters

Must contain only lowercase letters, numbers, and hyphens

Cannot contain XML tags

Cannot contain reserved words: "anthropic", "claude"

description:

Must be non-empty

Maximum 1024 characters

Cannot contain XML tags

## 掌握证据（做到这些才算会）

- 能写出符合字符与命名规则的前置元数据
- 能说明 description 必须同时写清功能与使用时机

## 验收问句

> {{name}} 中 description 为什么必须同时写清功能与使用时机？

## 懂了它才能懂（解锁 3）

- [[启动时仅加载名称和描述]] — 不懂 SKILL.md 与 YAML 前置元数据，就做不了启动时仅加载名称和描述里的「从技能位置只读取 YAML 元数据中的 name 与 description 作为发现层」
- [[description]] — 不懂【SKILL.md 与 YAML 前置元数据】，就做不了 description 字段的编写——不知道它是前置元数据里的必需字段。
- [[Skill]] — 不懂【SKILL.md 与 YAML 前置元数据】，就做不了「SKILL.md 的最小结构」这件事——不知道 frontmatter 与 body 各自承担什么。

## 出场

- AI 内参 260912 ｜ 《Using Agent Skills with the API（用 API 使用 Agent Skills）》 ｜ https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

## 别名

`SKILL.md / YAML frontmatter`

## 反链

- [[Skill]]
- [[启动时仅加载名称和描述]]
- [[description]]
