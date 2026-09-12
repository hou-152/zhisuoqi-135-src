---
id: cm_34b33e00
name: Skill
type: CONCEPTUAL
subject: AI 概念库
domain: context-engineering
learningStage: now
verification: use
centrality: 0.263
depth: 1
origin: [notion]
aliases: ["Claude Code Skill", ".claude/skills", "SKILL.md", "技能文件夹"]
sources: 1
---

# Skill

> 放在 .claude/skills/ 下的文件夹，含声明触发条件的 frontmatter 与完整正文，按需加载。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.263

## 费曼一下

把「重复动作 + 判断框架」打包成可触发的小程序。description 决定它能不能被恰到好处地调起来；内容决定它做出来好不好。

## 原文 context

> Skill 本质就是一个文件夹，放在 .claude/skills/ 目录下，里面有个 [SKILL.md](http://SKILL.md) 写清楚什么时候用、要做什么。Claude Code 启动时只读 frontmatter，也就是描述触发条件的约 100 个字，真正调用时才加载完整内容，所以你装几十个 Skill 启动也不会变慢。

## 掌握证据（做到这些才算会）

- 能说出启动只读约 100 字 frontmatter、调用时才载入正文
- 能解释装几十个 Skill 启动仍不变慢的原因

## 验收问句

> {{name}} 为什么装很多也不会拖慢启动？

## 先懂这些（前置 2）

- [[Software 3.0]] · **soft** — 把 skill 看作 Software 3.0 的编程单元，更能理解它的定位。
- [[tokens]] · **soft** — 不懂 token 成本，就理解不了 skill 为何要按需加载而非全塞。

## 懂了它才能懂（解锁 7）

- [[Harness]] — Skill 是 Agent Harness 按需提供方法与能力的组成部分。
- [[Skill-as-method-call]] — 得先知道 skill 是什么，才能理解它像方法调用、传参产出不同能力。
- [[skill-creator 访谈式创建]] — 不知道 skill 的形态与用途，就无法让 Claude 访谈并生成它。
- [[Skills Hell]] — 不懂 skill 的数量与按需加载方式，就无法理解其膨胀与冲突之害。
- [[Skill Files]] — skill 的正文即可复用的 markdown 文档，懂 Skill Files 更清楚 skill 内容形态。
- [[skill-creator 访谈式创建]] — 生成产物需落成 SKILL.md 契约才算合格 skill。
- [[Skill-as-method-call]] — 方法调用式的参数化，正是靠 frontmatter 声明来承接。

## 相关

- [[渐进式披露 progressive disclosure]] · 常一起用（工作流） — Skill 通过按需加载文件与能力实现 Progressive Disclosure。
- [[Agent loop]] · 常一起用（工作流） — Agent Loop 调用经过测试的 Skill，形成可复用、可复利的工作流。
- [[验证闭环 verification loop]] · 常一起用（工作流） — Skill 可封装并触发可重复执行的 Verification Loop。
- [[验证闭环 verification loop]] · 常一起用 — Skill 可以承载并按指定位置触发验证闭环。
- [[Harness]] · 组成（运行时组成） — Skill 是 Agent Harness 按需提供方法与能力的组成部分。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Skill-e62679b108ff8219be12017fa76fad00

## 别名

`Claude Code Skill`、`.claude/skills`、`SKILL.md`、`技能文件夹`

## 反链

- [[Harness]]
- [[Agent loop]]
- [[验证闭环 verification loop]]
- [[tokens]]
- [[skill-creator 访谈式创建]]
- [[渐进式披露 progressive disclosure]]
- [[Skill Files]]
- [[Skill-as-method-call]]
- [[Skills Hell]]
- [[Software 3.0]]
