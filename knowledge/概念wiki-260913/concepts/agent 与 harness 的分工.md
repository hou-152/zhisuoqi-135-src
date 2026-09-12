---
id: cm_4cd0f50d
name: agent 与 harness 的分工
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# agent 与 harness 的分工

> agent 是目标导向、会用工具、能自我纠错的涌现行为；harness 是产生这一行为的机器。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

agent 是你看到的舞台效果，harness 是舞台背后的灯光、绳索和机关。观众谈论演出，工程师谈论机关。

## 原文 context

文章反复强调的、最容易被混淆的一处区分：agent 是「the emergent behavior：目标导向、会用工具、能自我纠错的实体」，是用户交互的对象；harness 是产生这一行为的机器。所以「I built an agent」的真实含义是「我造了个 harness，然后把它指向一个模型」。

## 掌握证据（做到这些才算会）

- 能对同一系统分别指出 agent 面与 harness 面
- 能解释「我造了个 agent」的真实含义

## 验收问句

> {{name}}里谁是行为、谁是产生行为的机器？

## 先懂这些（前置 1）

- [[Harness]] · **hard** — 不懂【Harness】，就做不了区分 agent 与 harness 的分工

## 懂了它才能懂（解锁 1）

- [[Claude Managed Agents]] — 你定义 agent 模板、harness 由 Anthropic 提供，正建立在这一分工上。

## 相关

- [[三层工程 prompt context harness engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[上下文压缩与即时检索 compaction just-in-time retrieval]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[错误复利 compounding errors]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[验证循环：guides 与 sensors]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[子 agent 编排 Fork Teammate Worktree]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[harness 厚薄 thin vs thick]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[未来防腐测试 future-proofing test]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[能力外置化决策]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[脚手架化 LLM 与冯·诺依曼架构类比]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[编排循环与「dumb loop」]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[多时间尺度记忆与「记忆只是 hint」]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[brain hands session 解耦]] · related-to（audit） — 解耦讲的是接口拆分这一独立设计思想，模型/harness 分工只是其被切分的对象之一；不懂分工也能理解『三个可独立替换的接口』，宜降为关联而非前置。
- [[权限与推理的架构分离]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[context rot（上下文腐烂）与 Lost in the Middle]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[协同进化与紧耦合 co-evolution principle]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[工具收窄 tool scoping]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[coding agent]] · related-to（audit） — coding agent 的定义只用到 harness 本身（包裹 LLM + 工具），agent/harness 的涌现哲学分工不是理解的必要条件，应降为 soft。
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12
## 反链

- [[Harness]]
- [[多时间尺度记忆与「记忆只是 hint」]]
- [[coding agent]]
- [[权限与推理的架构分离]]
- [[子 agent 编排 Fork Teammate Worktree]]
- [[Claude Managed Agents]]
- [[If you're not the model, you're the harness.]]
- [[编排循环与「dumb loop」]]
- [[三层工程 prompt context harness engineering]]
- [[harness 厚薄 thin vs thick]]
- [[错误复利 compounding errors]]
- [[工具收窄 tool scoping]]
- [[脚手架化 LLM 与冯·诺依曼架构类比]]
- [[上下文压缩与即时检索 compaction just-in-time retrieval]]
- [[协同进化与紧耦合 co-evolution principle]]
- [[验证循环：guides 与 sensors]]
- [[能力外置化决策]]
- [[未来防腐测试 future-proofing test]]
- [[brain hands session 解耦]]
- [[context rot（上下文腐烂）与 Lost in the Middle]]
