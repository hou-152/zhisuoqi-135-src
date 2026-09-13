---
id: cm_7cd7335d
name: 验证闭环
nameEn: verification loop
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: verification-eval
learningStage: now
verification: use
centrality: 0.198
depth: 1
origin: [context, harness]
aliases: ["verification loop"]
sources: 2
---

# 验证闭环 · verification loop

> 把产出后必做的检查固化成可自动执行的一环，让 Claude 自己验证自己的产物。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.198

## 费曼一下

就像工厂流水线末端的质检工位。以前每做完一件产品你都得亲自拿卡尺量一遍；验证闭环就是把这道质检工序标准化、装到流水线上，让它自动量、自动挑出次品，你只在它报警时才出面。

## 原文 context

全文的核心对象。指把「产出某个东西之后总要做的那个检查」固化成可自动执行的一环，让 Claude 自己去验证自己的产物，而不是靠人每次记着做。文章开篇即以「把重复步骤编码进 verification loop 最常见的方式就是写成 skill」定义它，并以「验证闭环的创建流程是一致的」收尾。

## 掌握证据（做到这些才算会）

- 能为一个重复任务写出对应的验证步骤 skill
- 能说明为何验证不应依赖人每次记着做

## 验收问句

> {{name}} 建成后，谁来触发这次检查？

## 先懂这些（前置 1）

- [[Feedback loop]] · **soft** — 不懂【Feedback loop】，就做不了【验证闭环】的「让 Claude 自己运行、读结果、修正」

## 懂了它才能懂（解锁 2）

- [[把重复步骤编码成 Skill]] — 不懂【验证闭环】，就做不了【把重复步骤编码成 Skill】的「把重复步骤挂到产出后必做检查上」
- [[back-pressure]] — 不懂【验证闭环】，就做不了【back-pressure】的「用自动自我验证持续施压」

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
- [[Trace-based evals]] · 对照（概念边界） — 一个跨运行评估系统，一个在当前运行中检查并纠偏。
- [[Skill]] · 常一起用（工作流） — Skill 可封装并触发可重复执行的 Verification Loop。
- [[Sandbox]] · 常一起用（运行时组成） — Sandbox 为 Verification Loop 提供安全执行、日志、截图与测试环境。
- [[Skill]] · 常一起用 — Skill 可以承载并按指定位置触发验证闭环。
- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[skill-creator 访谈式创建]] · 同篇出现（co-occurrence） — 同篇出现：context-12
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

- [[Skill]]
- [[Sandbox]]
- [[循环工程 loop engineering]]
- [[Agent vs Harness]]
- [[skill-creator 访谈式创建]]
- [[Agent loop]]
- [[把重复步骤编码成 Skill]]
- [[description 作为触发条件]]
- [[Feedback loop]]
- [[Trace-based evals]]
- [[back-pressure]]
- [[PR 级门禁 On every PR]]
- [[Wrapper skill]]
- [[独立调用 Standalone]]
- [[个人基础设施 → 团队基础设施]]
- [[可编辑性边界]]
- [[链式 Chained]]
- [[灵活性与自动化的权衡]]
- [[嵌入 Embedded]]
- [[习惯变契约 habit → contract]]
- [[SKILL.md：frontmatter＋body 契约]]
