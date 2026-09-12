---
id: cm_b6cabad1
name: 工具收窄
nameEn: tool scoping
type: CONCEPTUAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: now
verification: use
centrality: 0.099
depth: 1
origin: [harness]
aliases: ["tool scoping"]
sources: 1
---

# 工具收窄 · tool scoping

> 工具越多往往表现越差：只暴露当前步骤所需的最小工具集，重叠工具超过约 10 个时应考虑拆分多 agent。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.099

## 费曼一下

给人一把螺丝刀，他会去拧螺丝；给他一整面工具墙，他会先站着发呆。选项本身是有成本的。

## 原文 context

反直觉的经验规律——工具越多往往表现越差。Vercel 从 v0 中删掉 80% 的工具后结果更好，Claude Code 靠懒加载实现约 95% 的上下文缩减。原则是只暴露当前步骤所需的最小工具集；文章同时给出拆分多 agent 的经验阈值：重叠工具超过约 10 个。

## 掌握证据（做到这些才算会）

- 能给出裁剪工具集后效果改善的实例
- 能按重叠工具数量判断是否需要拆分多 agent

## 验收问句

> 按{{name}}，什么时候该考虑拆分多 agent？

## 先懂这些（前置 1）

- [[臃肿工具集 bloated tool sets]] · **hard** — 收窄正是针对工具过多导致表现变差的问题，不懂臃肿就不知为何要缩减。

## 懂了它才能懂（解锁 2）

- [[延迟加载工具与 ToolSearch]] — 渐进式披露本质是另一种收窄手段，不懂最小工具集就理解不了它要解决什么。
- [[logits 掩码与 context-aware 状态机]] — 掩码 logits 本质是动态约束可选工具范围，是收窄思想在解码层的实现。

## 相关

- [[MCP Model Context Protocol]] · 常一起用（工作流） — Tool Scoping 可关闭当前不用的 MCP 工具面，减少误选与 Context 占用。
- [[Tool-schema tax]] · 常一起用（工作流） — 只暴露当前步骤必要工具可同时降低选择噪声与工具 Schema 静态载荷。
- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[长上下文窗口]] · 常一起用（工作流） — Tool Scoping 减少进入 Context Window 的无关工具描述。
- [[Harness token floor]] · 常一起用（工作流） — 收窄暴露工具与 Schema 可降低每次请求的固定工具说明负担。
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`tool scoping`

## 反链

- [[agent 与 harness 的分工]]
- [[长上下文窗口]]
- [[MCP Model Context Protocol]]
- [[Harness token floor]]
- [[Tool-schema tax]]
- [[If you're not the model, you're the harness.]]
- [[延迟加载工具与 ToolSearch]]
- [[臃肿工具集 bloated tool sets]]
- [[logits 掩码与 context-aware 状态机]]
