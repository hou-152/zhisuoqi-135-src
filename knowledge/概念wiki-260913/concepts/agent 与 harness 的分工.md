---
id: cm_4cd0f50d
name: agent 与 harness 的分工
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.208
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# agent 与 harness 的分工

> agent 是目标导向、会用工具、能自纠错的涌现行为；harness 是产生该行为的机器。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.208

## 费曼一下

agent 是你看到的舞台效果，harness 是舞台背后的灯光、绳索和机关。观众谈论演出，工程师谈论机关。

## 原文 context

文章反复强调的、最容易被混淆的一处区分：agent 是「the emergent behavior：目标导向、会用工具、能自我纠错的实体」，是用户交互的对象；harness 是产生这一行为的机器。所以「I built an agent」的真实含义是「我造了个 harness，然后把它指向一个模型」。

## 掌握证据（做到这些才算会）

- 能区分用户交互的对象与背后的机器
- 能说明「我造了个 agent」实际含义是造了 harness 并指向模型

## 验收问句

> {{name}} 中哪部分是涌现行为，哪部分是机器？

## 懂了它才能懂（解锁 7）

- [[Action Space】]] — 先分清 agent 与 harness，才知道行动空间由哪一侧构建与约束。
- [[协同进化与紧耦合 co-evolution principle]] — 模型与 harness 一起后训练，前提是两者可分离且可配对。
- [[brain hands session 解耦]] — 三段接口拆分，是对 agent 与 harness 分工的进一步切分。
- [[agent 作为 Claude API 的新核心原语]] — 把 agent 升为原语，前提是明白 harness 与基础设施由谁承担。
- [[context window 即 agent 状态]] — 明白 harness 负责上下文管理，才理解上下文为何就是 agent 状态。
- [[确定性工程基础设施】 deterministic engineering infrastructure]] — 先分清 agent 与 harness，才知道权限、恢复等确定性组件装在哪侧。
- [[所有权原则]] — 知道哪些环节属于 harness，才谈得上不把关键环节外包。

## 相关

- [[脚手架化 LLM 与冯·诺依曼架构类比]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[三层工程 prompt context harness engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[编排循环与「dumb loop」]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[context rot（上下文腐烂）与 Lost in the Middle]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[上下文压缩与即时检索 compaction just-in-time retrieval]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[多时间尺度记忆与「记忆只是 hint]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[错误复利 compounding errors]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[权限与推理的架构分离]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[验证循环：guides 与 sensors]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[子 agent 编排 Fork Teammate Worktree]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[harness 厚薄 thin vs thick]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[未来防腐测试 future-proofing test]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[能力外置化决策]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[协同进化与紧耦合 co-evolution principle]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[工具收窄 tool scoping]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12
## 反链

- [[权限与推理的架构分离]]
- [[协同进化与紧耦合 co-evolution principle]]
- [[编排循环与「dumb loop」]]
- [[工具收窄 tool scoping]]
- [[确定性工程基础设施】 deterministic engineering infrastructure]]
- [[三层工程 prompt context harness engineering]]
- [[Action Space】]]
- [[多时间尺度记忆与「记忆只是 hint]]
- [[验证循环：guides 与 sensors]]
- [[agent 作为 Claude API 的新核心原语]]
- [[context rot（上下文腐烂）与 Lost in the Middle]]
- [[If you're not the model, you're the harness.]]
- [[脚手架化 LLM 与冯·诺依曼架构类比]]
- [[能力外置化决策]]
- [[上下文压缩与即时检索 compaction just-in-time retrieval]]
- [[所有权原则]]
- [[未来防腐测试 future-proofing test]]
- [[brain hands session 解耦]]
- [[context window 即 agent 状态]]
- [[错误复利 compounding errors]]
- [[子 agent 编排 Fork Teammate Worktree]]
- [[harness 厚薄 thin vs thick]]
