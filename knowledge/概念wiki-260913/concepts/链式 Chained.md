---
id: cm_efd9e49f
name: 链式
nameEn: Chained
type: PROCEDURAL
subject: Context Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["Chained"]
sources: 1
---

# 链式 · Chained

> 把多个 skill 首尾相接，让「经过验证的交接」自动串成端到端流程，把习惯变成固定契约。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

像接力赛，每一棒跑到终点会主动把接力棒递给下一棒，而不是停下来等裁判喊。一串工序被串成一条自动传送带，你只在传送带卡住时才伸手。

## 原文 context

第三种接入方式。一个 skill 在结尾调用下一个，多个「经过验证的交接」端到端跑。Anthropic 的 Claude Code 团队日常这么用：/code-review 抓 bug → /simplify 清 diff → /verify 确认端到端行为 →（碰 UI 时）/design 对照 DESIGN.md。链式让「我总在某步之后做某检查」的习惯，变成 skill 之间的固定契约。

## 掌握证据（做到这些才算会）

- 能画出 /code-review → /simplify → /verify → /design 的链路并说出每步交接物
- 能说明链式与 standalone 在灵活性和自动化上的取舍

## 验收问句

> 请为 {{name}} 举一个该链、一个不该链的场景。

## 相关

- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[skill-creator 访谈式创建]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[验证闭环 verification loop]] · 同篇出现（co-occurrence） — 同篇出现：context-12

## 出场

- Context Engineering ｜ 《用 Skills 在 Claude Code 里搭建验证闭环》 ｜ https://claude.com/blog/building-verification-loops-in-claude-code-with-skills

## 别名

`Chained`

## 反链

- [[验证闭环 verification loop]]
- [[skill-creator 访谈式创建]]
- [[把重复步骤编码成 Skill]]
