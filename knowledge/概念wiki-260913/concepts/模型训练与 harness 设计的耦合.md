---
id: cm_3db52bcb
name: 模型训练与 harness 设计的耦合
type: CONCEPTUAL
subject: Harness Engineering
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 模型训练与 harness 设计的耦合

> 模型与 harness 在同一 loop 中做 post-training，形成「发现原语→加进 harness→训下一代」回环，并带来过拟合副作用。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

模型和框架一起长大，会长出默契，也会长出依赖——换一副框架就手生。这有两个后果：一是模型的分数从来不是模型一个人的分数；二是「原厂框架」并不等于「最优框架」，为自己的任务重调框架，往往比换模型划算得多。

## 原文 context

Claude Code、Codex 这类产品是模型与 harness 同在 loop 中做的 post-training，形成「发现原语 → 加进 harness → 训练下一代模型」的反馈回路，模型在自己被训练的 harness 里越来越强。副作用是过拟合——改动工具逻辑会让表现变差（作者以 Codex-5.3 prompting guide 中的 apply_patch 为例）。反转在于：Terminal Bench 2.0 上 Opus 4.6 在 Claude Code 里的得分远低于它在其他 harness 里的得分，LangChain 只改 harness 就把自家 coding agent 从 Top 30 提到 Top 5。

## 掌握证据（做到这些才算会）

- 能说明该反馈回路的两端各自是什么
- 能举出改工具逻辑后表现变差的过拟合案例

## 验收问句

> {{name}}的反馈回路包含哪几步，过拟合会以什么现象暴露？

## 懂了它才能懂（解锁 1）

- [[Co-evolution Principle]] — 不懂【模型训练与 harness 设计的耦合】，就做不了 Co-evolution Principle 的⟨工具实现一改就掉性能的机制说明⟩

## 相关

- [[Harness 内 RL RL inside the harness]] · related-to（audit） — 「耦合」是更抽象的同源概括（甚至可能由该实践归纳而来），Harness 内 RL 的定义已自足；不懂耦合仍能懂它，更像 soft 或方向应反过来。
- [[协同进化与紧耦合 co-evolution principle]] · related-to（audit） — 两条几乎同义重叠，协同进化描述本身已自足，回环机制只是补充解释，宜降 soft。
- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[Co-evolution Principle]]
- [[Agent = Model + Harness]]
- [[协同进化与紧耦合 co-evolution principle]]
- [[Harness 内 RL RL inside the harness]]
