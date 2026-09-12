---
id: cm_916d7db2
name: 渐进式披露
nameEn: progressive disclosure
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.087
depth: 0
origin: [context, harness]
aliases: ["progressive disclosure"]
sources: 5
---

# 渐进式披露 · progressive disclosure

> Agent 通过探索逐层发现相关上下文、工作记忆只保留必要部分的检索与认知模式。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.087

## 费曼一下

像走进一座陌生城市，不是先背下整张地图，而是从街名、门牌、店铺招牌一点点认出这是什么区域。每看一眼就多知道一点，也就知道下一眼该往哪看——理解是层层长出来的，不是一次性灌进去的。

## 原文 context

just in time 检索带来的认知模式——agent 通过探索增量发现相关 context，每次交互产出的信息又指导下一步决策：文件大小暗示复杂度、命名约定暗示用途、时间戳可作相关性代理。agent 逐层拼装理解，工作记忆只保留必要部分。

## 掌握证据（做到这些才算会）

- 能利用文件大小、命名约定、时间戳等线索推断下一步该读什么
- 设计过只按需加载的技能或文档结构

## 验收问句

> 怎么用 {{name}} 让 Agent 不一次性把窗口塞满？

## 相关

- [[Agent Skills】]] · 常一起用 — Skill 文件及其递归引用是渐进式披露的实现载体。
- [[Action Space】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Elicitation】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Agent Drift]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Context 四种失败模式】 Context Pollution Distraction Confusion Clash]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Skill]] · 常一起用（工作流） — Skill 通过按需加载文件与能力实现 Progressive Disclosure。
- [[记忆 Memory]] · 常一起用（工作流） — Memory 可用路由文档与主题文件按 Progressive Disclosure 分层加载。
- [[记忆 Memory]] · 常一起用 — Memory 用路由文档和主题文件分层，让详细知识按需披露。
- [[即时检索 Just-in-time Retrieval]] · 对照（概念边界） — JIT 强调取数时机；渐进披露强调逐层发现。
- [[程序记忆（Procedural Memory Skills） progressive disclosure]] · 常一起用 — Skill 通过需要时才加载指令、知识或工具来实现渐进式披露。
- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[prompt 与 context 的通用性落差]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[过度约束与松绑 over-constraining unhobbling]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
- Context Engineering ｜ 《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》 ｜ https://x.com/trq212/status/2080710971228918066/?s=12
- Context Engineering ｜ 《上下文工程：AI 时代的核心能力》 ｜ https://x.com/nyk_builderz/status/2031581912071127158/?s=12&rw_tt_thread=True
- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents

## 别名

`progressive disclosure`

## 反链

- [[记忆 Memory]]
- [[Skill]]
- [[注意力预算 attention budget]]
- [[上下文腐烂 Context Rot]]
- [[程序记忆（Procedural Memory Skills） progressive disclosure]]
- [[Action Space】]]
- [[即时检索 Just-in-time Retrieval]]
- [[Agent Skills】]]
- [[Elicitation】]]
- [[Agent Drift]]
- [[configuration problem]]
- [[Context 四种失败模式】 Context Pollution Distraction Confusion Clash]]
- [[prompt 与 context 的通用性落差]]
- [[See Like an Agent】]]
- [[过度约束与松绑 over-constraining unhobbling]]
