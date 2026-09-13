---
id: cm_34b33e00
name: Skill
type: REPRESENTATIONAL
subject: AI 概念库
domain: context-engineering
learningStage: now
verification: use
centrality: 0.563
depth: 1
origin: [notion]
aliases: ["Claude Code Skill", ".claude/skills", "SKILL.md", "技能文件夹"]
sources: 1
---

# Skill

> 放在 .claude/skills/ 下的文件夹，含声明触发条件的 frontmatter 与完整正文，按需加载。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.563

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

- [[SKILL.md 与 YAML 前置元数据 SKILL.md YAML frontmatter]] · **hard** — 不懂【SKILL.md 与 YAML 前置元数据】，就做不了「SKILL.md 的最小结构」这件事——不知道 frontmatter 与 body 各自承担什么。
- [[Skill Files]] · **soft** — 不懂【SKILL.md】的 frontmatter＋body 契约，就做不了【Skill Files】的 ⟨按最小结构编写可复用 skill⟩

## 懂了它才能懂（解锁 8）

- [[Skills Hell]] — 不懂 skill 的数量与按需加载方式，就无法理解其膨胀与冲突之害。
- [[Skill-as-method-call]] — 得先知道 skill 是什么，才能理解它像方法调用、传参产出不同能力。
- [[skill-creator 访谈式创建]] — 不知道 skill 的形态与用途，就无法让 Claude 访谈并生成它。
- [[skill-creator 访谈式创建]] — 生成产物需落成 SKILL.md 契约才算合格 skill。
- [[Skill-as-method-call]] — 方法调用式的参数化，正是靠 frontmatter 声明来承接。
- [[description 作为触发条件]] — 不懂【Skill】，就做不了【description 作为触发条件】里在 frontmatter 写清何时加载该技能
- [[Progressive disclosure（渐进式披露）与 Skills]] — 不懂【Skill】，就做不了【Progressive disclosure（渐进式披露）与 Skills】里按需逐步披露的加载编排
- [[共享上下文窗口]] — 不懂【SKILL.md】，就说不清技能激活时被整份载入上下文的是什么。

## 相关

- [[Software 3.0]] · related-to（audit） — Software 3.0 是给 Skill 附加的一种解读视角/类比，不用这个框架 skill 文件夹照样能懂，属可选背景。
- [[Skill Files]] · related-to（audit） — 两者几乎是同一物的两种表述（Skill 文件夹里的 markdown 正文），甚至更像反向包含关系；作为前置依赖冗余，应合并或删除。
- [[tokens]] · related-to（audit） — token 只解释了「为何按需加载」的动机，skill 的定义与机制不依赖它，懂 token 更好懂但非必需，宜降 soft。
- [[渐进式披露 progressive disclosure]] · 常一起用（工作流） — Skill 通过按需加载文件与能力实现 Progressive Disclosure。
- [[Agent loop]] · 常一起用（工作流） — Agent Loop 调用经过测试的 Skill，形成可复用、可复利的工作流。
- [[验证闭环 verification loop]] · 常一起用（工作流） — Skill 可封装并触发可重复执行的 Verification Loop。
- [[验证闭环 verification loop]] · 常一起用 — Skill 可以承载并按指定位置触发验证闭环。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Harness]] · 组成（运行时组成） — Skill 是 Agent Harness 按需提供方法与能力的组成部分。

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Skill-e62679b108ff8219be12017fa76fad00

## 别名

`Claude Code Skill`、`.claude/skills`、`SKILL.md`、`技能文件夹`

## 反链

- [[SKILL.md 与 YAML 前置元数据 SKILL.md YAML frontmatter]]
- [[Skill-as-method-call]]
- [[skill-creator 访谈式创建]]
- [[Skills Hell]]
- [[Agent loop]]
- [[验证闭环 verification loop]]
- [[渐进式披露 progressive disclosure]]
- [[共享上下文窗口]]
- [[description 作为触发条件]]
- [[Progressive disclosure（渐进式披露）与 Skills]]
- [[tokens]]
- [[Skill Files]]
- [[Software 3.0]]
