---
id: cm_b6cabad1
name: 工具收窄
nameEn: tool scoping
type: CONCEPTUAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: now
verification: judge
centrality: 0.072
depth: 1
origin: [harness]
aliases: ["tool scoping"]
sources: 1
---

# 工具收窄 · tool scoping

> 只向 agent 暴露当前步骤所需的最小工具集；工具越多，表现往往越差。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

给人一把螺丝刀，他会去拧螺丝；给他一整面工具墙，他会先站着发呆。选项本身是有成本的。

## 原文 context

反直觉的经验规律——工具越多往往表现越差。Vercel 从 v0 中删掉 80% 的工具后结果更好，Claude Code 靠懒加载实现约 95% 的上下文缩减。原则是只暴露当前步骤所需的最小工具集；文章同时给出拆分多 agent 的经验阈值：重叠工具超过约 10 个。

## 掌握证据（做到这些才算会）

- 能举出 Vercel 从 v0 删掉 80% 工具后结果更好的例子
- 能为某步骤列出最小工具集，并用「重叠工具超过约 10 个」判断是否该拆多 agent

## 验收问句

> 按 {{name}}，某步骤该保留哪些工具、何时该拆多 Agent？

## 先懂这些（前置 1）

- [[臃肿工具集 bloated tool sets]] · **soft** — 不懂【臃肿工具集】，就做不了【工具收窄】的取舍——判断不出哪些工具制造了模糊决策点

## 相关

- [[MCP Model Context Protocol]] · 常一起用（工作流） — Tool Scoping 可关闭当前不用的 MCP 工具面，减少误选与 Context 占用。
- [[Tool-schema tax]] · 常一起用（工作流） — 只暴露当前步骤必要工具可同时降低选择噪声与工具 Schema 静态载荷。
- [[长上下文窗口]] · 常一起用（工作流） — Tool Scoping 减少进入 Context Window 的无关工具描述。
- [[Harness token floor]] · 常一起用（工作流） — 收窄暴露工具与 Schema 可降低每次请求的固定工具说明负担。
- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`tool scoping`

## 反链

- [[长上下文窗口]]
- [[MCP Model Context Protocol]]
- [[Harness token floor]]
- [[If you're not the model, you're the harness.]]
- [[agent 与 harness 的分工]]
- [[Tool-schema tax]]
- [[臃肿工具集 bloated tool sets]]
