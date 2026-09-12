---
id: cm_30fb0c9b
name: skill-creator 访谈式创建
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.236
depth: 4
origin: [context]
aliases: []
sources: 1
---

# skill-creator 访谈式创建

> 装上 skill-creator，让 Claude 反过来访谈你的工作流，快速生成 skill。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.236

## 费曼一下

不用自己憋着写说明书，而是让一个懂行的编辑坐下来采访你「你平时这活儿到底怎么干」，他边问边帮你把流程整理成一份规范文档。

## 原文 context

创建 skill 最快的方式。装上 skill-creator 插件，让 Claude 反过来访谈你的工作流，例如 /skill-creator Create a skill for verifying frontend changes end-to-end. Interview me about my workflow.；在标准六步流程里，「交给 skill-creator」也被列为落地一步。

## 掌握证据（做到这些才算会）

- 能用一句 /skill-creator 指令触发访谈并产出 SKILL.md
- 能说出访谈式创建比手写快在哪里

## 验收问句

> 怎么用 {{name}} 把你的一次工作流变成可复用 skill？

## 先懂这些（前置 4）

- [[Skill]] · **hard** — 不知道 skill 的形态与用途，就无法让 Claude 访谈并生成它。
- [[Skill]] · **hard** — 生成产物需落成 SKILL.md 契约才算合格 skill。
- [[Skill-as-method-call]] · **soft** — 不懂 skill 是「流程+参数」的可调用形态，就定不出访谈该问出哪些可变参数
- [[Skills Hell]] · **soft** — 不懂 Skills Hell，就判断不出批量访谈生成是否已把 skill 库做失控

## 相关

- [[SKILL.md：frontmatter＋body 契约]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[description 作为触发条件]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[独立调用 Standalone]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[PR 级门禁 On every PR]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[可编辑性边界]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[Wrapper skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[习惯变契约 habit → contract]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[个人基础设施 → 团队基础设施]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[循环工程 loop engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[灵活性与自动化的权衡]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[嵌入 Embedded]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[链式 Chained]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[Skill Files]] · related-to（audit） — 与 [6] 重复：产出物本质是 skill 契约，Skill Files 只是其内容形态的局部视角，单独作为前置立不住，建议合并进 [6]。
- [[tokens]] · rejected（audit） — token 只是估算预算的通用背景，不影响对访谈式创建 skill 的理解，不构成前置依赖。
- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[验证闭环 verification loop]] · 同篇出现（co-occurrence） — 同篇出现：context-12

## 出场

- Context Engineering ｜ 《用 Skills 在 Claude Code 里搭建验证闭环》 ｜ https://claude.com/blog/building-verification-loops-in-claude-code-with-skills
## 反链

- [[Skill]]
- [[循环工程 loop engineering]]
- [[Skill-as-method-call]]
- [[Skills Hell]]
- [[验证闭环 verification loop]]
- [[description 作为触发条件]]
- [[tokens]]
- [[把重复步骤编码成 Skill]]
- [[PR 级门禁 On every PR]]
- [[Skill Files]]
- [[Wrapper skill]]
- [[独立调用 Standalone]]
- [[个人基础设施 → 团队基础设施]]
- [[可编辑性边界]]
- [[链式 Chained]]
- [[灵活性与自动化的权衡]]
- [[嵌入 Embedded]]
- [[习惯变契约 habit → contract]]
- [[SKILL.md：frontmatter＋body 契约]]
