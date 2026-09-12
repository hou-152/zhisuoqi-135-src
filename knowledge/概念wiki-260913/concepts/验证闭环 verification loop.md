---
id: cm_7cd7335d
name: 验证闭环
nameEn: verification loop
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: verification-eval
learningStage: now
verification: use
centrality: 0.21
depth: 0
origin: [context, harness]
aliases: ["verification loop"]
sources: 2
---

# 验证闭环 · verification loop

> 把产出后必做的检查固化成可自动执行的一环，让 Claude 自己验证自己的产物。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.21

## 费曼一下

就像工厂流水线末端的质检工位。以前每做完一件产品你都得亲自拿卡尺量一遍；验证闭环就是把这道质检工序标准化、装到流水线上，让它自动量、自动挑出次品，你只在它报警时才出面。

## 原文 context

全文的核心对象。指把「产出某个东西之后总要做的那个检查」固化成可自动执行的一环，让 Claude 自己去验证自己的产物，而不是靠人每次记着做。文章开篇即以「把重复步骤编码进 verification loop 最常见的方式就是写成 skill」定义它，并以「验证闭环的创建流程是一致的」收尾。

## 掌握证据（做到这些才算会）

- 能为一个重复任务写出对应的验证步骤 skill
- 能说明为何验证不应依赖人每次记着做

## 验收问句

> {{name}} 建成后，谁来触发这次检查？

## 懂了它才能懂（解锁 7）

- [[Harness]] — Verification Loop 是 Agent Harness 检查结果并回灌反馈的组成部分。
- [[把重复步骤编码成 Skill]] — skill 是把验证闭环中重复步骤固化的可复用底座，不懂闭环就没有要编码的对象。
- [[端到端验证]] — e2e 是验证闭环里跑通完整流程的那一环，不懂闭环就无从谈端到端。
- [[验证循环：guides 与 sensors]] — guides 与 sensors 就是验证闭环的行动前/后两半，不懂闭环无法理解其分工。
- [[功能与行为验证的缺口]] — 缺口是相对验证闭环而言的：不懂闭环覆盖什么，就说不清缺了什么。
- [[行为提取]] — 行为提取是验证闭环中「看见什么」的一环，不懂闭环就不知它喂给谁。
- [[back-pressure]] — back-pressure 靠 agent 自我验证施压，不懂验证闭环就不知压力来自哪。

## 相关

- [[SKILL.md：frontmatter＋body 契约]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[description 作为触发条件]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[独立调用 Standalone]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[嵌入 Embedded]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[链式 Chained]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[PR 级门禁 On every PR]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[可编辑性边界]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[Wrapper skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[习惯变契约 habit → contract]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[个人基础设施 → 团队基础设施]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[循环工程 loop engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[灵活性与自动化的权衡]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[Trace-based evals]] · 对照（概念边界） — 一个跨运行评估系统，一个在当前运行中检查并纠偏。
- [[Skill]] · 常一起用（工作流） — Skill 可封装并触发可重复执行的 Verification Loop。
- [[Skill]] · 常一起用 — Skill 可以承载并按指定位置触发验证闭环。
- [[Sandbox]] · 常一起用（运行时组成） — Sandbox 为 Verification Loop 提供安全执行、日志、截图与测试环境。
- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[skill-creator 访谈式创建]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Agent loop]] · 常一起用（工作流） — 行动循环产生结果，验证循环用外部证据决定修正或退出。
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness]] · 组成（运行时组成） — Verification Loop 是 Agent Harness 检查结果并回灌反馈的组成部分。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27

## 出场

- Context Engineering ｜ 《用 Skills 在 Claude Code 里搭建验证闭环》 ｜ https://claude.com/blog/building-verification-loops-in-claude-code-with-skills
- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922

## 别名

`verification loop`

## 反链

- [[Harness]]
- [[Skill]]
- [[Agent loop]]
- [[Sandbox]]
- [[skill-creator 访谈式创建]]
- [[back-pressure]]
- [[Trace-based evals]]
- [[把重复步骤编码成 Skill]]
- [[端到端验证]]
- [[个人基础设施 → 团队基础设施]]
- [[功能与行为验证的缺口]]
- [[行为提取]]
- [[验证循环：guides 与 sensors]]
- [[description 作为触发条件]]
- [[Wrapper skill]]
- [[独立调用 Standalone]]
- [[可编辑性边界]]
- [[链式 Chained]]
- [[灵活性与自动化的权衡]]
- [[嵌入 Embedded]]
- [[习惯变契约 habit → contract]]
- [[循环工程 loop engineering]]
- [[Agent vs Harness]]
- [[PR 级门禁 On every PR]]
- [[SKILL.md：frontmatter＋body 契约]]
