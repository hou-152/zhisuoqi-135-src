---
id: cm_fbccd97c
name: 程序记忆（Procedural Memory / Skills）
nameEn: progressive disclosure
type: CONCEPTUAL
subject: AI 概念库 × Harness Engineering
domain: memory-retrieval
learningStage: when-needed
verification: use
centrality: 0.12
depth: 1
origin: [notion, harness]
aliases: ["Procedural Memory", "Skills", "智能体技能", "操作记忆", "progressive disclosure", ".claude/skills/"]
sources: 4
---

# 程序记忆（Procedural Memory / Skills） · progressive disclosure

> 智能体记住『如何做事』的记忆，以 Markdown 等声明文件编码工作流、质量门与最佳实践。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.12

## 费曼一下

- 借自**认知科学**的概念——记的不是「**是什么**」（语义记忆），而是「**怎么做**」（程序记忆）。

## 原文 context

> 大多数记忆系统只关注「语义回溯」（名字、偏好、事实），但智能体还需要记住**如何做事**。

## 掌握证据（做到这些才算会）

- 写出过一个可被 Agent 按需加载的 Skill 文件
- 能区分语义记忆与程序记忆各自存什么

## 验收问句

> {{name}} 该用什么形式存、又在什么时候被加载？

## 先懂这些（前置 2）

- [[记忆 Memory]] · **hard** — 程序记忆是记忆的一种亚型，不懂记忆分层就无从谈技能记忆。
- [[即时检索 Just-in-time Retrieval]] · **soft** — 技能按需加载即渐进披露，不懂按需取全文就无法理解其组织方式。

## 相关

- [[渐进披露 progressive disclosure]] · 常一起用 — 渐进披露既用于 Skill，也用于工具定义的延迟加载。
- [[Capability Overhang]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Inner Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[AI 工程基础设施 AI engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[1.6% vs 98.4%]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[确定性工程基础设施 deterministic engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[渐进式披露 progressive disclosure]] · 常一起用 — Skill 通过需要时才加载指令、知识或工具来实现渐进式披露。
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Procedural-Memory-Skills-bf3679b108ff826a9d6981f1b5c817e9
- Harness Engineering ｜ 《2026 AI 工程五大趋势：从模型能力转向可靠系统》 ｜ https://www.latent.space/p/aiewf26trends
- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
- Harness Engineering ｜ 《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349

## 别名

`Procedural Memory`、`Skills`、`智能体技能`、`操作记忆`、`progressive disclosure`、`.claude/skills/`

## 反链

- [[记忆 Memory]]
- [[model-native harness]]
- [[Capability Overhang]]
- [[渐进式披露 progressive disclosure]]
- [[即时检索 Just-in-time Retrieval]]
- [[Inner Loop]]
- [[1.6% vs 98.4%]]
- [[Agents SDK]]
- [[渐进披露 progressive disclosure]]
- [[确定性工程基础设施 deterministic engineering infrastructure]]
- [[AI 工程基础设施 AI engineering infrastructure]]
