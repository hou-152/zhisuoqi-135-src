---
id: cm_600a5349
name: 软件工厂
nameEn: Software Factory
type: REPRESENTATIONAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.099
depth: 2
origin: [harness]
aliases: ["Software Factory"]
sources: 1
---

# 软件工厂 · Software Factory

> 以流水线视角看软件交付：需求进 tracker、建造、评审、上线、监控、用户反馈再回到 tracker 的反馈环。

**领域** code-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.099

## 费曼一下

把开发一款软件想象成一条工厂流水线——想法进料，经过设计、制造、质检、发货、返修几道工序，循环往复。这个比喻本身没有对错，关键是"AI 进场后，流水线上哪道工序被替换、哪道工序被直接砍掉"。

## 原文 context

文章用"软件工厂"贯穿全文的分析框架。术语可追溯到 1968 年 NATO 会议（与"software engineering"同源）；作者把 2022 年（AI 之前）的形态定义为基线：人决定做什么 → 进 tracker → 有人建造 → PR 评审 → 上线 → 监控 → 用户反馈回到 tracker 的完整反馈环。

## 掌握证据（做到这些才算会）

- 能画出 2022 年基线的完整反馈环并标出每个环节的产物
- 能用它对比 AI 介入后哪一环被改变、哪一环不变

## 验收问句

> 按{{name}}说出从需求到用户反馈的完整环节。

## 先懂这些（前置 2）

- [[管理 Agent]] · **hard** — 长期运行的 agent 覆盖生命周期，瓶颈在目标、资源与反馈的管理。
- [[Tiger Team]] · **soft** — 软件工厂保留的人工检查点常由临时跨职能小队承担，不懂 Tiger Team 难理解其组织前提。

## 懂了它才能懂（解锁 1）

- [[Vantage]] — 两者都以 agent 承担流程角色、人保留判断；懂 Software Factory 更易定位 Vantage 的边界。

## 相关

- [[前置对齐 front-loading alignment]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[RLVR 与编码 agent 的 RL 训练循环]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[SWE-bench 与二元打分]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[可维护性 霰弹式手术]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[可维护性没有惩罚项]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[可维护性缺一个可靠的打分预言机]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Mutation Testing 与前沿质量评测]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 内 RL RL inside the harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[产品评审 Product Review]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[系统架构评审]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[程序设计 Program Design]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[垂直切片 Tracer Bullet]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[2026 版约束理论]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Capability Overhang]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Inner Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Lights-off 软件工厂]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-10

## 出场

- Harness Engineering ｜ 《为什么「软件工厂」会失败：光有 harness 工程还不够》 ｜ https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md

## 别名

`Software Factory`

## 反链

- [[RLVR 与编码 agent 的 RL 训练循环]]
- [[可维护性没有惩罚项]]
- [[Capability Overhang]]
- [[管理 Agent]]
- [[Inner Loop]]
- [[SWE-bench 与二元打分]]
- [[Tiger Team]]
- [[Vantage]]
- [[2026 版约束理论]]
- [[垂直切片 Tracer Bullet]]
- [[可维护性 霰弹式手术]]
- [[可维护性缺一个可靠的打分预言机]]
- [[Harness 内 RL RL inside the harness]]
- [[Lights-off 软件工厂]]
- [[Mutation Testing 与前沿质量评测]]
- [[产品评审 Product Review]]
- [[程序设计 Program Design]]
- [[前置对齐 front-loading alignment]]
- [[系统架构评审]]
